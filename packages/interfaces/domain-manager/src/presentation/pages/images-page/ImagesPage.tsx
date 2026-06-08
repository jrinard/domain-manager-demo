import { Icon } from '@falcon/icons'
import { useCallback, useState, useRef, useEffect } from 'react'
import { TextBody, TextHeading, useToast } from '@spacedock/falcon-ui'
import { TytoData } from '@spacedock/manifest'
import { useDomainUIImageDeleteMutation } from '@tyto/query'
import { useTryybServices } from '@spacedock/tryyb-services'
import type { UploadAssetResult } from '@spacedock/tryyb-services'

import { useKeyedDomainImages } from '../../../data/hooks/useKeyedDomainImages'
import { useUpdateDomainUIMutation } from '../../../data/hooks/useUpdateDomainPropertiesMutation'
import { useDomainProperties } from '../../../data/hooks/useDomainProperties'
import {
  SidebarNavigation,
  NavigationSection,
} from '../../organisms/sidebarNavigation'
import { ImageCard } from '../../organisms/imageCard'
import { ImagesPageLoading } from './imagesPageLoading'
import { createFileURL } from '../../../data/utils/file-path'

interface ImagesPageProps {
  domainID?: number
  teamID?: number
}

export const ImagesPage = ({ domainID, teamID }: ImagesPageProps) => {
  const toast = useToast()
  const [uploadProgress, setUploadProgress] = useState<
    Record<TytoData.DomainUIImageType, number>
  >({} as Record<TytoData.DomainUIImageType, number>)
  const currentUploadingImageType = useRef<TytoData.DomainUIImageType | null>(
    null,
  )
  const contextID = domainID || teamID || 0
  const [activeSection, setActiveSection] = useState('main-logo')
  const { keyedImages, refetch: refetchDomainUI } = useKeyedDomainImages({
    domainID: contextID,
  })
  const { domainProperties, isPending } = useDomainProperties({
    domainID: contextID,
  })
  const [colorSchemes, setColorSchemes] =
    useState<TytoData.DomainProperties['colorSchemes']>('dark')

  useEffect(() => {
    if (domainProperties?.colorSchemes) {
      setColorSchemes(domainProperties.colorSchemes)
    }
  }, [domainProperties?.colorSchemes])

  // Helper to check if a specific color scheme mode is activated
  const isSchemeModeActivated = (mode: 'light' | 'dark') => {
    if (!colorSchemes) return true // Default to true if not loaded yet
    return colorSchemes.includes(mode)
  }

  // Helper to get the dimmed message based on color scheme
  const getDimmedMessage = (variety: 'light' | 'dark') => {
    if (!colorSchemes) return ''

    // Determine which mode is active (the one that's NOT the variety)
    if (variety === 'light' && !isSchemeModeActivated('light')) {
      // Light card is dimmed, so dark mode must be active
      const activeMode = colorSchemes.includes('dark') ? 'dark' : 'light'
      return `Your scheme is set to ${activeMode} mode so you do not need to set this image`
    } else if (variety === 'dark' && !isSchemeModeActivated('dark')) {
      // Dark card is dimmed, so light mode must be active
      const activeMode = colorSchemes.includes('light') ? 'light' : 'dark'
      return `Your scheme is set to ${activeMode} mode so you do not need to set this image`
    }
    return ''
  }

  const isLoading = isPending

  const navSections: NavigationSection[] = [
    { id: 'main-logo', label: 'Main Logo', required: true },
    { id: 'login-logo', label: 'Login Logo', required: true },
    { id: 'email-logo', label: 'Email Logo', required: true },
    { id: 'background-image', label: 'Background Image', required: true },
    { id: 'login-back-image', label: 'Login Back Image', required: true },
    { id: 'favicon', label: 'Favicon', required: false },
    {
      id: 'mastery-background-image',
      label: 'Mastery Background Assets',
      required: false,
    },
  ]

  const domainUIMutator = useUpdateDomainUIMutation({
    domainID: contextID || 0,
  })

  const deleteImageMutator = useDomainUIImageDeleteMutation({
    onSuccess: () => {
      toast.toastSuccess({ description: 'Image Deleted Successfully' })
    },
    onError: (error) => {
      toast.toastError({ description: 'Failed to delete image' })
    },
  })

  const services = useTryybServices()

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  const isSectionRequired = (sectionId: string) => {
    const section = navSections.find((s) => s.id === sectionId)
    return section?.required || false
  }

  // Helper to check if a card is required and missing an image
  const isCardRequiredAndMissing = (
    sectionId: string,
    imageUrl: string | undefined,
  ) => {
    if (!isSectionRequired(sectionId)) return false
    return !imageUrl
  }

  // Req is met when the required images based on color scheme are loaded.
  // For example if scheme is "dark" mode and the user uploaded a light mode image then the requirement would not be met.
  const hasMetReq = (sectionId: string): boolean => {
    if (!colorSchemes) return false

    const isDarkModeRequired = isSchemeModeActivated('dark')
    const isLightModeRequired = isSchemeModeActivated('light')

    switch (sectionId) {
      case 'main-logo': {
        const hasDark = !!keyedImages['logo_link_DARK']?.pathURL
        const hasLight = !!keyedImages['logo_link']?.pathURL
        if (isDarkModeRequired && isLightModeRequired) {
          return hasDark && hasLight
        } else if (isDarkModeRequired) {
          return hasDark
        } else if (isLightModeRequired) {
          return hasLight
        }
        return false
      }
      case 'login-logo': {
        // Login logo is a single image that is always required
        return !!keyedImages['logoImagePath']?.pathURL
      }
      case 'email-logo': {
        // Email logo only requires light mode image
        return !!keyedImages['emailLogo']?.pathURL
      }
      case 'background-image': {
        // Background image requirement is met if desktop image exists
        const hasDesktop = !!keyedImages['homeBackgroundImagePath']?.pathURL
        return hasDesktop
      }
      case 'login-back-image': {
        // Login back image requirement is met if desktop image exists
        const hasDesktop = !!keyedImages['backgroundImagePath']?.pathURL
        return hasDesktop
      }
      case 'favicon': {
        return !!keyedImages['favicon']?.pathURL
      }
      case 'mastery-background-image': {
        return !!keyedImages['masteryBackgroundVideoPosterPath']?.pathURL
      }
      case 'mastery-background-video': {
        return !!keyedImages['masteryBackgroundVideoPath']?.pathURL
      }
      case 'training-link-step-default-thumbnail': {
        return (
          !!keyedImages['trainingLinkStepDefaultThumbnail']?.pathURL ||
          !!keyedImages['trainingLinkStepDefaultThumbnail_DARK']?.pathURL
        )
      }
      default:
        return false
    }
  }

  const handleFileChange = useCallback(
    async (imageType: TytoData.DomainUIImageType) => {
      currentUploadingImageType.current = imageType
      setUploadProgress((prev) => ({ ...prev, [imageType]: 0 }))

      try {
        const uploadResult = (await services.uploadFileViaChooser()) as
          | UploadAssetResult
          | TytoData.Upload

        const tempKey =
          'uploadFiles' in uploadResult &&
          uploadResult.uploadFiles?.[0]?.fileUploadKey
            ? uploadResult.uploadFiles[0].fileUploadKey
            : 'url' in uploadResult
              ? uploadResult.url
              : undefined

        if (!tempKey) {
          toast.toastError({
            description: 'Upload did not return an upload key',
          })
          setUploadProgress((prev) => {
            const updated = { ...prev }
            delete (updated as any)[imageType]
            return updated
          })
          currentUploadingImageType.current = null
          return
        }

        await domainUIMutator.updateDomainUI({
          domainImages: {
            [imageType]: tempKey,
          },
        })

        setUploadProgress((prev) => ({ ...prev, [imageType]: 100 }))
        setTimeout(() => {
          setUploadProgress((prev) => {
            const updated = { ...prev }
            delete (updated as any)[imageType]
            return updated
          })
          currentUploadingImageType.current = null
        }, 500)

        toast.toastSuccess({ description: 'Image Uploaded Successfully' })
      } catch (err) {
        console.error(err)
        toast.toastError({ description: 'Failed to upload image' })
        setUploadProgress((prev) => {
          const updated = { ...prev }
          delete (updated as any)[imageType]
          return updated
        })
        currentUploadingImageType.current = null
      }
    },
    [domainUIMutator, services, toast],
  )

  if (isLoading) {
    return (
      <ImagesPageLoading
        navSections={navSections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        hasMetReq={hasMetReq}
      />
    )
  }

  return (
    <div className="bg-site-bg flex h-full w-full flex-col">
      {/* Header - Sticky */}
      <div className="border-grayscale-600 bg-site-bg flex w-full flex-row justify-between border-b">
        <nav className="mt-2 flex items-center gap-2 px-8 py-4 text-sm">
          <TextHeading size={3}>Images & Assets</TextHeading>
        </nav>
      </div>

      <div className="flex min-h-0 grow flex-col lg:flex-row">
        {/* Left Sidebar - Fixed Position */}
        <div className="sticky top-[calc(var(--site-top-height)+170px)] h-auto w-full lg:h-auto lg:w-[280px] lg:self-start">
          <SidebarNavigation
            sections={navSections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
            hasMetReq={hasMetReq}
            scrollContainer="#images-main-content"
          />
        </div>

        <main
          id="images-main-content"
          className="flex-1 overflow-y-auto py-6 pt-2 lg:pt-4"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            scrollbarColor: '#525252 #262626',
          }}
        >
          <div className="flex gap-2 px-2">
            <div className="w-full space-y-4 pb-48 pl-4 pr-4 sm:space-y-6 lg:space-y-8 lg:pl-8 lg:pr-8">
              {/* Main Logo Section */}
              <section id="main-logo">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Main Logo</TextHeading>
                    {isSectionRequired('main-logo') ? (
                      <Icon
                        color={hasMetReq('main-logo') ? 'success' : 'warning'}
                        icon={
                          hasMetReq('main-logo')
                            ? 'check-circle'
                            : 'alert-circle'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
                    <ImageCard
                      title="Light Mode"
                      description="Recommended Size: 320x480"
                      variety="light"
                      imageUrl={getImagePath(keyedImages, 'logo_link')}
                      onFileChange={() => handleFileChange('logo_link')}
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID: keyedImages['logo_link']?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={uploadProgress['logo_link']}
                      isDimmed={!isSchemeModeActivated('light')}
                      dimmedMessage={getDimmedMessage('light')}
                      isRequiredAndMissing={
                        !isSchemeModeActivated('light')
                          ? false
                          : isCardRequiredAndMissing(
                              'main-logo',
                              getImagePath(keyedImages, 'logo_link'),
                            )
                      }
                      className={
                        !isSchemeModeActivated('light')
                          ? 'lg:order-2'
                          : 'lg:order-1'
                      }
                    />

                    <ImageCard
                      title="Dark Mode"
                      description="Recommended Size: 320x480"
                      imageUrl={getImagePath(keyedImages, 'logo_link_DARK')}
                      onFileChange={() => handleFileChange('logo_link_DARK')}
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['logo_link_DARK']?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={uploadProgress['logo_link_DARK']}
                      isDimmed={!isSchemeModeActivated('dark')}
                      dimmedMessage={getDimmedMessage('dark')}
                      isRequiredAndMissing={
                        !isSchemeModeActivated('dark')
                          ? false
                          : isCardRequiredAndMissing(
                              'main-logo',
                              getImagePath(keyedImages, 'logo_link_DARK'),
                            )
                      }
                      className={
                        !isSchemeModeActivated('dark')
                          ? 'lg:order-2'
                          : 'lg:order-1'
                      }
                    />
                  </div>
                </div>
              </section>

              {/* Login Logo Section */}
              <section id="login-logo">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Login Logo</TextHeading>
                    {isSectionRequired('login-logo') ? (
                      <Icon
                        color={hasMetReq('login-logo') ? 'success' : 'warning'}
                        icon={
                          hasMetReq('login-logo')
                            ? 'check-circle'
                            : 'alert-circle'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* <ImageCard
                      title="Dark Mode"
                      description="Recommended Size: 1920x1080"
                      imageUrl={getImagePath(keyedImages, 'logoImagePath')}
                      onFileChange={noop}
                    /> */}
                    <ImageCard
                      title="Login Logo"
                      description="Recommended Size: 320x480"
                      variety="neutral"
                      imageUrl={getImagePath(keyedImages, 'logoImagePath')}
                      onFileChange={() => handleFileChange('logoImagePath')}
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID: keyedImages['logoImagePath']?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={uploadProgress['logoImagePath']}
                      isRequiredAndMissing={isCardRequiredAndMissing(
                        'login-logo',
                        getImagePath(keyedImages, 'logoImagePath'),
                      )}
                    />
                  </div>
                </div>
              </section>

              {/* Email Logo Section */}
              <section id="email-logo">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Email Logo</TextHeading>
                    {isSectionRequired('email-logo') ? (
                      <Icon
                        color={hasMetReq('email-logo') ? 'success' : 'warning'}
                        icon={
                          hasMetReq('email-logo')
                            ? 'check-circle'
                            : 'alert-circle'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
                    {/* //TODO DEV NOTE THERE IS NO DARK EMAIL - THIS IS JUST PREP FOR WHEN THERE IS. */}
                    <ImageCard
                      title="Dark Mode"
                      description="Recommended Size: 320x480"
                      imageUrl={getImagePath(keyedImages, 'emailLogo_DARK')}
                      onFileChange={() => handleFileChange('emailLogo_DARK')}
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['emailLogo_DARK']?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={uploadProgress['emailLogo_DARK']}
                      isDimmed={!isSchemeModeActivated('dark')}
                      dimmedMessage={getDimmedMessage('dark')}
                      className={
                        isSchemeModeActivated('light')
                          ? 'lg:order-2'
                          : 'lg:order-1'
                      }
                    />
                    <ImageCard
                      title="Light Mode"
                      description="Recommended Size: 320x480"
                      variety="light"
                      imageUrl={getImagePath(keyedImages, 'emailLogo')}
                      onFileChange={() => handleFileChange('emailLogo')}
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID: keyedImages['emailLogo']?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={uploadProgress['emailLogo']}
                      isDimmed={false}
                      isRequiredAndMissing={isCardRequiredAndMissing(
                        'email-logo',
                        getImagePath(keyedImages, 'emailLogo'),
                      )}
                      className={
                        !isSchemeModeActivated('light')
                          ? 'lg:order-2'
                          : 'lg:order-1'
                      }
                    />
                  </div>
                </div>
              </section>

              {/* Background Image Section */}
              <section id="background-image">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Home Background Image</TextHeading>
                    {isSectionRequired('background-image') ? (
                      <Icon
                        color={
                          hasMetReq('background-image') ? 'success' : 'warning'
                        }
                        icon={
                          hasMetReq('background-image')
                            ? 'check-circle'
                            : 'alert-circle'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
                    <ImageCard
                      title="Desktop"
                      description="Recommended Size: 1920x1080"
                      imageUrl={getImagePath(
                        keyedImages,
                        'homeBackgroundImagePath',
                      )}
                      onFileChange={() =>
                        handleFileChange('homeBackgroundImagePath')
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['homeBackgroundImagePath']?.imageID ||
                              0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={uploadProgress['homeBackgroundImagePath']}
                      isDimmed={false}
                      isRequiredAndMissing={isCardRequiredAndMissing(
                        'background-image',
                        getImagePath(keyedImages, 'homeBackgroundImagePath'),
                      )}
                    />
                    <ImageCard
                      title="Tablet"
                      description="Recommended Size: 768x1024"
                      imageUrl={getImagePath(
                        keyedImages,
                        'homeBackgroundImagePathTablet',
                      )}
                      onFileChange={() =>
                        handleFileChange('homeBackgroundImagePathTablet')
                      }
                      uploadProgress={
                        uploadProgress['homeBackgroundImagePathTablet']
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['homeBackgroundImagePathTablet']
                                ?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      isDimmed
                      dimmedMessage="Tablet image is optional"
                    />
                    <ImageCard
                      title="Mobile"
                      description="Recommended Size: 320x480"
                      imageUrl={getImagePath(
                        keyedImages,
                        'homeBackgroundImagePathMobile',
                      )}
                      onFileChange={() =>
                        handleFileChange('homeBackgroundImagePathMobile')
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['homeBackgroundImagePathMobile']
                                ?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={
                        uploadProgress['homeBackgroundImagePathMobile']
                      }
                      isDimmed
                      dimmedMessage="Mobile image is optional"
                    />
                  </div>
                </div>
              </section>

              {/* Login Back Image Section */}
              <section id="login-back-image">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Login Background Image</TextHeading>
                    {isSectionRequired('login-back-image') ? (
                      <Icon
                        color={
                          hasMetReq('login-back-image') ? 'success' : 'warning'
                        }
                        icon={
                          hasMetReq('login-back-image')
                            ? 'check-circle'
                            : 'alert-circle'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
                    <ImageCard
                      title="Desktop"
                      description="Recommended Size: 1920x1080"
                      imageUrl={getImagePath(
                        keyedImages,
                        'backgroundImagePath',
                      )}
                      onFileChange={() =>
                        handleFileChange('backgroundImagePath')
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['backgroundImagePath']?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={uploadProgress['backgroundImagePath']}
                      isDimmed={false}
                      isRequiredAndMissing={isCardRequiredAndMissing(
                        'login-back-image',
                        getImagePath(keyedImages, 'backgroundImagePath'),
                      )}
                    />
                    <ImageCard
                      title="Tablet"
                      description="Recommended Size: 768x1024"
                      imageUrl={getImagePath(
                        keyedImages,
                        'backgroundImagePathTablet',
                      )}
                      onFileChange={() =>
                        handleFileChange('backgroundImagePathTablet')
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['backgroundImagePathTablet']
                                ?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={
                        uploadProgress['backgroundImagePathTablet']
                      }
                      isDimmed
                      dimmedMessage="Tablet image is optional"
                    />
                    <ImageCard
                      title="Mobile"
                      description="Recommended Size: 320x480"
                      imageUrl={getImagePath(
                        keyedImages,
                        'backgroundImagePathMobile',
                      )}
                      onFileChange={() =>
                        handleFileChange('backgroundImagePathMobile')
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['backgroundImagePathMobile']
                                ?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={
                        uploadProgress['backgroundImagePathMobile']
                      }
                      isDimmed
                      dimmedMessage="Mobile image is optional"
                    />
                  </div>
                </div>
              </section>

              {/* Favicon Section */}
              <section id="favicon">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Favicon</TextHeading>
                    {isSectionRequired('favicon') ? (
                      <Icon
                        color={hasMetReq('favicon') ? 'success' : 'current'}
                        icon={
                          hasMetReq('favicon')
                            ? 'checkbox-blank-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
                    <ImageCard
                      title="Favicon"
                      description="Upload your favicon (16x16 or32x32)"
                      imageUrl={getImagePath(keyedImages, 'favicon')}
                      acceptableMimeTypes="image/x-icon"
                      onFileChange={() => handleFileChange('favicon')}
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID: keyedImages['favicon']?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={uploadProgress['favicon']}
                      isDimmed={false}
                    />
                  </div>
                </div>
              </section>

              {/* Mastery Background Assets Section */}
              <section id="mastery-background-image">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>
                      Mastery Background Assets
                    </TextHeading>
                    {isSectionRequired('mastery-background-image') ||
                    isSectionRequired('mastery-background-video') ? (
                      <Icon
                        color={
                          (hasMetReq('mastery-background-image') &&
                            hasMetReq('mastery-background-video')) ||
                          (!isSectionRequired('mastery-background-image') &&
                            !isSectionRequired('mastery-background-video'))
                            ? 'success'
                            : 'current'
                        }
                        icon={
                          (hasMetReq('mastery-background-image') &&
                            hasMetReq('mastery-background-video')) ||
                          (!isSectionRequired('mastery-background-image') &&
                            !isSectionRequired('mastery-background-video'))
                            ? 'checkbox-blank-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
                    <ImageCard
                      title="Mastery Background Image"
                      description="Upload background image for the training home page"
                      imageUrl={getImagePath(
                        keyedImages,
                        'masteryBackgroundVideoPosterPath',
                      )}
                      acceptableMimeTypes="image/jpg,image/jpeg,image/png"
                      onFileChange={() =>
                        handleFileChange('masteryBackgroundVideoPosterPath')
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['masteryBackgroundVideoPosterPath']
                                ?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={
                        uploadProgress['masteryBackgroundVideoPosterPath']
                      }
                      isDimmed={false}
                    />
                    <ImageCard
                      title="Mastery Background Video"
                      description="Upload background video for the training home page"
                      imageUrl={getImagePath(
                        keyedImages,
                        'masteryBackgroundVideoPath',
                      )}
                      acceptableMimeTypes="video/mp4"
                      onFileChange={() =>
                        handleFileChange('masteryBackgroundVideoPath')
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['masteryBackgroundVideoPath']
                                ?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={
                        uploadProgress['masteryBackgroundVideoPath']
                      }
                      isDimmed={false}
                    />
                  </div>
                </div>
              </section>

              <section id="training-link-step-default-thumbnail">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Training</TextHeading>
                    {isSectionRequired('favicon') ? (
                      <Icon
                        color={
                          hasMetReq('trainingLinkStepDefaultThumbnail')
                            ? 'success'
                            : 'current'
                        }
                        icon={
                          hasMetReq('trainingLinkStepDefaultThumbnail')
                            ? 'checkbox-blank-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <TextBody className="text-site-fg pt-2 text-sm italic opacity-50">
                      These Images are only used in the Training section of the
                      Platform. "Links" refer to Steps inside of a Course that
                      link to something and not generically Menu Links pointed
                      at the Training Page(s).
                    </TextBody>
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-1 sm:gap-2 sm:py-2">
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
                    <ImageCard
                      title="Light Mode"
                      description="Upload A Default Image for Links in Courses (Any Size)"
                      imageUrl={getImagePath(
                        keyedImages,
                        'trainingLinkStepDefaultThumbnail',
                      )}
                      acceptableMimeTypes="image/jpg,image/jpeg,image/png"
                      onFileChange={() =>
                        handleFileChange('trainingLinkStepDefaultThumbnail')
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages['trainingLinkStepDefaultThumbnail']
                                ?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={
                        uploadProgress['trainingLinkStepDefaultThumbnail']
                      }
                      isDimmed={!isSchemeModeActivated('light')}
                      dimmedMessage={getDimmedMessage('light')}
                      className={
                        !isSchemeModeActivated('light')
                          ? 'lg:order-2'
                          : 'lg:order-1'
                      }
                    />

                    <ImageCard
                      title="Dark Mode"
                      description="Upload A Default Image for Links in Courses in Dark Mode (Any Size)"
                      imageUrl={getImagePath(
                        keyedImages,
                        'trainingLinkStepDefaultThumbnail_DARK',
                      )}
                      acceptableMimeTypes="image/jpg,image/jpeg,image/png"
                      onFileChange={() =>
                        handleFileChange(
                          'trainingLinkStepDefaultThumbnail_DARK',
                        )
                      }
                      onRemoveFile={() =>
                        deleteImageMutator
                          .mutateAsync({
                            imageID:
                              keyedImages[
                                'trainingLinkStepDefaultThumbnail_DARK'
                              ]?.imageID || 0,
                          })
                          .then(() => refetchDomainUI())
                      }
                      uploadProgress={
                        uploadProgress['trainingLinkStepDefaultThumbnail_DARK']
                      }
                      isDimmed={!isSchemeModeActivated('dark')}
                      dimmedMessage={getDimmedMessage('dark')}
                      className={
                        isSchemeModeActivated('light')
                          ? 'lg:order-2'
                          : 'lg:order-1'
                      }
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function getImagePath(
  keyedImages: ReturnType<typeof useKeyedDomainImages>['keyedImages'],
  type: TytoData.DomainUIImageType,
) {
  const path = keyedImages[type as keyof typeof keyedImages]?.pathURL

  if (!path) {
    return ''
  }

  return createFileURL(path)
}
