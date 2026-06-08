import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import type { MenuConfig, MenuButton, ToggleSection } from '@domain/configs'

type TopLevelItem =
  | { type: 'button'; index: number; data: MenuButton }
  | { type: 'section'; index: number; data: ToggleSection }

// Type aliases for better readability
type SubSectionDragState = {
  sectionIndex: number
  subSectionIndex: number
}

type ButtonDragState = {
  sectionIndex: number
  subSectionIndex: number
  buttonIndex: number
}

interface UseMenuDragAndDropOptions {
  config: MenuConfig
  onConfigChange: (config: MenuConfig) => void
}

interface UseMenuDragAndDropReturn {
  // Top-level drag state
  draggedIndex: number | null
  dragOverIndex: number | null
  handleDragStart: (e: React.DragEvent, index: number) => void
  handleDragOver: (e: React.DragEvent, index: number) => void
  handleDragLeave: () => void
  handleDrop: (e: React.DragEvent, dropIndex: number) => void

  // Sub-section drag state
  draggedSubSection: SubSectionDragState | null
  dragOverSectionIndex: number | null
  dragOverSubSection: SubSectionDragState | null
  handleSubSectionDragStart: (
    e: React.DragEvent,
    sectionIndex: number,
    subSectionIndex: number,
  ) => void
  handleSubSectionDragOver: (
    e: React.DragEvent,
    targetSectionIndex: number,
    targetSubSectionIndex?: number,
  ) => void
  handleSubSectionDragLeave: () => void
  handleSubSectionDrop: (
    e: React.DragEvent,
    targetSectionIndex: number,
    targetSubSectionIndex?: number,
  ) => void

  // Button drag state
  draggedButton: ButtonDragState | null
  dragOverButton: ButtonDragState | null
  handleButtonDragStart: (
    sectionIndex: number,
    subSectionIndex: number,
    buttonIndex: number,
  ) => void
  handleButtonDragOver: (
    e: React.DragEvent,
    sectionIndex: number,
    subSectionIndex: number,
    targetButtonIndex: number,
  ) => void
  handleButtonDragLeave: () => void
  handleButtonDrop: (
    e: React.DragEvent,
    sectionIndex: number,
    subSectionIndex: number,
    targetButtonIndex: number,
  ) => void

  // Combined drag end
  handleDragEnd: () => void

  // Computed values
  topLevelItems: TopLevelItem[]
}

// Helper function to reset all drag state
const resetDragState = (setters: {
  setDraggedIndex: (value: number | null) => void
  setDragOverIndex: (value: number | null) => void
  setDraggedSubSection: (value: SubSectionDragState | null) => void
  setDragOverSectionIndex: (value: number | null) => void
  setDragOverSubSection: (value: SubSectionDragState | null) => void
  setDraggedButton: (value: ButtonDragState | null) => void
  setDragOverButton: (value: ButtonDragState | null) => void
}) => {
  setters.setDraggedIndex(null)
  setters.setDragOverIndex(null)
  setters.setDraggedSubSection(null)
  setters.setDragOverSectionIndex(null)
  setters.setDragOverSubSection(null)
  setters.setDraggedButton(null)
  setters.setDragOverButton(null)
}

// Helper function to reorder array items
const reorderArray = <T>(
  array: T[],
  sourceIndex: number,
  targetIndex: number,
): T[] => {
  const newArray = [...array]
  const [removed] = newArray.splice(sourceIndex, 1)
  const adjustedTargetIndex =
    sourceIndex < targetIndex ? targetIndex - 1 : targetIndex
  newArray.splice(adjustedTargetIndex, 0, removed)
  return newArray
}

export function useMenuDragAndDrop({
  config,
  onConfigChange,
}: UseMenuDragAndDropOptions): UseMenuDragAndDropReturn {
  // Use ref to avoid stale closures in callbacks
  const configRef = useRef(config)
  useEffect(() => {
    configRef.current = config
  }, [config])

  // Top-level drag state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  // Sub-section drag state
  const [draggedSubSection, setDraggedSubSection] =
    useState<SubSectionDragState | null>(null)
  const [dragOverSectionIndex, setDragOverSectionIndex] = useState<
    number | null
  >(null)
  const [dragOverSubSection, setDragOverSubSection] =
    useState<SubSectionDragState | null>(null)

  // Button drag state
  const [draggedButton, setDraggedButton] = useState<ButtonDragState | null>(
    null,
  )
  const [dragOverButton, setDragOverButton] = useState<ButtonDragState | null>(
    null,
  )

  // Build flat list of top-level items
  const topLevelItems = useMemo<TopLevelItem[]>(() => {
    const items: TopLevelItem[] = []

    config.topButtons.forEach((button, index) => {
      items.push({ type: 'button', index, data: button })
    })

    config.toggleSections.forEach((section, index) => {
      if (section.title !== 'Manage') {
        items.push({ type: 'section', index, data: section })
      }
    })

    return items
  }, [config.topButtons, config.toggleSections])

  // Top-level handlers
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', String(index))
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault()
      setDragOverIndex(null)

      if (draggedIndex === null || draggedIndex === dropIndex) {
        setDraggedIndex(null)
        return
      }

      // Reorder items
      const newItems = reorderArray(topLevelItems, draggedIndex, dropIndex)

      // Reconstruct config with new order
      const newTopButtons: MenuButton[] = []
      const newToggleSections: ToggleSection[] = []

      newItems.forEach((item) => {
        if (item.type === 'button') {
          newTopButtons.push(item.data)
        } else {
          newToggleSections.push(item.data)
        }
      })

      const manageSection = configRef.current.toggleSections.find(
        (s) => s.title === 'Manage',
      )
      if (manageSection) {
        newToggleSections.push(manageSection)
      }

      onConfigChange({
        ...configRef.current,
        topButtons: newTopButtons,
        toggleSections: newToggleSections,
      })

      setDraggedIndex(null)
    },
    [draggedIndex, topLevelItems, onConfigChange],
  )

  // Sub-section handlers
  const handleSubSectionDragStart = useCallback(
    (e: React.DragEvent, sectionIndex: number, subSectionIndex: number) => {
      setDraggedSubSection({ sectionIndex, subSectionIndex })
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData(
        'text/html',
        JSON.stringify({ sectionIndex, subSectionIndex }),
      )
      e.stopPropagation()
    },
    [],
  )

  const handleSubSectionDragOver = useCallback(
    (
      e: React.DragEvent,
      targetSectionIndex: number,
      targetSubSectionIndex?: number,
    ) => {
      if (draggedSubSection === null) return

      const isDifferentSection =
        draggedSubSection.sectionIndex !== targetSectionIndex
      const isSameSectionDifferentPosition =
        draggedSubSection.sectionIndex === targetSectionIndex &&
        targetSubSectionIndex !== undefined &&
        draggedSubSection.subSectionIndex !== targetSubSectionIndex

      if (isDifferentSection || isSameSectionDifferentPosition) {
        e.preventDefault()
        e.stopPropagation()
        e.dataTransfer.dropEffect = 'move'
        setDragOverSectionIndex(targetSectionIndex)
        if (targetSubSectionIndex !== undefined) {
          setDragOverSubSection({
            sectionIndex: targetSectionIndex,
            subSectionIndex: targetSubSectionIndex,
          })
        }
      }
    },
    [draggedSubSection],
  )

  const handleSubSectionDragLeave = useCallback(() => {
    setDragOverSectionIndex(null)
    setDragOverSubSection(null)
  }, [])

  const handleSubSectionDrop = useCallback(
    (
      e: React.DragEvent,
      targetSectionIndex: number,
      targetSubSectionIndex?: number,
    ) => {
      e.preventDefault()
      e.stopPropagation()

      if (draggedSubSection === null) {
        setDragOverSectionIndex(null)
        setDragOverSubSection(null)
        return
      }

      const { sectionIndex: sourceSectionIndex, subSectionIndex } =
        draggedSubSection

      const currentConfig = configRef.current
      const sourceSection = currentConfig.toggleSections[sourceSectionIndex]
      const categoryToMove = sourceSection.categories?.[subSectionIndex]

      if (!categoryToMove) {
        resetDragState({
          setDraggedIndex,
          setDragOverIndex,
          setDraggedSubSection,
          setDragOverSectionIndex,
          setDragOverSubSection,
          setDraggedButton,
          setDragOverButton,
        })
        return
      }

      const newToggleSections = [...currentConfig.toggleSections]

      if (sourceSectionIndex === targetSectionIndex) {
        if (
          targetSubSectionIndex === undefined ||
          subSectionIndex === targetSubSectionIndex
        ) {
          resetDragState({
            setDraggedIndex,
            setDragOverIndex,
            setDraggedSubSection,
            setDragOverSectionIndex,
            setDragOverSubSection,
            setDraggedButton,
            setDragOverButton,
          })
          return
        }

        const targetSection = newToggleSections[targetSectionIndex]
        const newCategories = reorderArray(
          targetSection.categories || [],
          subSectionIndex,
          targetSubSectionIndex,
        )

        newToggleSections[targetSectionIndex] = {
          ...targetSection,
          categories: newCategories,
        }
      } else {
        const newSourceCategories = [...(sourceSection.categories || [])]
        newSourceCategories.splice(subSectionIndex, 1)
        newToggleSections[sourceSectionIndex] = {
          ...sourceSection,
          categories: newSourceCategories,
        }

        const targetSection = newToggleSections[targetSectionIndex]
        const newTargetCategories = [...(targetSection.categories || [])]

        if (targetSubSectionIndex !== undefined) {
          newTargetCategories.splice(targetSubSectionIndex, 0, categoryToMove)
        } else {
          newTargetCategories.push(categoryToMove)
        }

        newToggleSections[targetSectionIndex] = {
          ...targetSection,
          categories: newTargetCategories,
        }
      }

      onConfigChange({
        ...currentConfig,
        toggleSections: newToggleSections,
      })

      setDraggedSubSection(null)
      setDragOverSectionIndex(null)
      setDragOverSubSection(null)
    },
    [draggedSubSection, onConfigChange],
  )

  // Button handlers
  const handleButtonDragStart = useCallback(
    (sectionIndex: number, subSectionIndex: number, buttonIndex: number) => {
      setDraggedButton({ sectionIndex, subSectionIndex, buttonIndex })
    },
    [],
  )

  const handleButtonDragOver = useCallback(
    (
      e: React.DragEvent,
      sectionIndex: number,
      subSectionIndex: number,
      targetButtonIndex: number,
    ) => {
      if (draggedButton === null) return

      // Always allow drag over (same category for reordering, different for moving)
      e.preventDefault()
      e.stopPropagation()
      e.dataTransfer.dropEffect = 'move'
      setDragOverButton({
        sectionIndex,
        subSectionIndex,
        buttonIndex: targetButtonIndex,
      })
    },
    [draggedButton],
  )

  const handleButtonDragLeave = useCallback(() => {
    setDragOverButton(null)
  }, [])

  const handleButtonDrop = useCallback(
    (
      e: React.DragEvent,
      sectionIndex: number,
      subSectionIndex: number,
      targetButtonIndex: number,
    ) => {
      e.preventDefault()
      e.stopPropagation()

      if (draggedButton === null) {
        setDragOverButton(null)
        return
      }

      const {
        sectionIndex: sourceSectionIndex,
        subSectionIndex: sourceSubSectionIndex,
        buttonIndex: sourceButtonIndex,
      } = draggedButton

      const currentConfig = configRef.current
      const sourceSection = currentConfig.toggleSections[sourceSectionIndex]
      const sourceCategory = sourceSection.categories?.[sourceSubSectionIndex]
      const buttonToMove = sourceCategory?.buttons?.[sourceButtonIndex]

      if (!buttonToMove) {
        setDraggedButton(null)
        setDragOverButton(null)
        return
      }

      const newToggleSections = [...currentConfig.toggleSections]

      if (
        sourceSectionIndex === sectionIndex &&
        sourceSubSectionIndex === subSectionIndex
      ) {
        if (sourceButtonIndex === targetButtonIndex) {
          setDraggedButton(null)
          setDragOverButton(null)
          return
        }

        const category = sourceCategory
        if (!category || !category.buttons) {
          setDraggedButton(null)
          setDragOverButton(null)
          return
        }

        const newButtons = reorderArray(
          category.buttons,
          sourceButtonIndex,
          targetButtonIndex,
        )

        const updatedCategory = { ...category, buttons: newButtons }
        const updatedCategories = [...(sourceSection.categories || [])]
        updatedCategories[subSectionIndex] = updatedCategory

        newToggleSections[sectionIndex] = {
          ...sourceSection,
          categories: updatedCategories,
        }
      } else {
        const newSourceButtons = [...(sourceCategory.buttons || [])]
        newSourceButtons.splice(sourceButtonIndex, 1)
        const updatedSourceCategory = {
          ...sourceCategory,
          buttons: newSourceButtons,
        }
        const updatedSourceCategories = [...(sourceSection.categories || [])]
        updatedSourceCategories[sourceSubSectionIndex] = updatedSourceCategory

        newToggleSections[sourceSectionIndex] = {
          ...sourceSection,
          categories: updatedSourceCategories,
        }

        const targetSection = newToggleSections[sectionIndex]
        const targetCategory = targetSection.categories?.[subSectionIndex]

        if (!targetCategory) {
          setDraggedButton(null)
          setDragOverButton(null)
          return
        }

        const newTargetButtons = [...(targetCategory.buttons || [])]
        newTargetButtons.splice(targetButtonIndex, 0, buttonToMove)
        const updatedTargetCategory = {
          ...targetCategory,
          buttons: newTargetButtons,
        }
        const updatedTargetCategories = [...(targetSection.categories || [])]
        updatedTargetCategories[subSectionIndex] = updatedTargetCategory

        newToggleSections[sectionIndex] = {
          ...targetSection,
          categories: updatedTargetCategories,
        }
      }

      onConfigChange({
        ...currentConfig,
        toggleSections: newToggleSections,
      })

      setDraggedButton(null)
      setDragOverButton(null)
    },
    [draggedButton, onConfigChange],
  )

  const handleDragEnd = useCallback(() => {
    resetDragState({
      setDraggedIndex,
      setDragOverIndex,
      setDraggedSubSection,
      setDragOverSectionIndex,
      setDragOverSubSection,
      setDraggedButton,
      setDragOverButton,
    })
  }, [])

  return {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    draggedSubSection,
    dragOverSectionIndex,
    dragOverSubSection,
    handleSubSectionDragStart,
    handleSubSectionDragOver,
    handleSubSectionDragLeave,
    handleSubSectionDrop,
    draggedButton,
    dragOverButton,
    handleButtonDragStart,
    handleButtonDragOver,
    handleButtonDragLeave,
    handleButtonDrop,
    handleDragEnd,
    topLevelItems,
  }
}
