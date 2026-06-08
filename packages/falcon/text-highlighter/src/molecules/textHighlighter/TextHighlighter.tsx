import React, { useMemo } from 'react'
import { escapeRegExp } from 'lodash'
import { cva, VariantProps, mergeClasses } from '@falcon/style'
const primaryVariants = cva('', {
  variants: {
    highlight: {
      yellow: 'bg-highlight text-highlight-fg',
      red: 'bg-red-300/80',
      blue: 'bg-blue-300/80',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      none: '',
    },
  },
  defaultVariants: {
    highlight: 'yellow',
  },
})

const secondaryVariants = cva('', {
  variants: {
    secondaryHighlight: {
      underline: 'underline decoration-yellow-300/80 underline-offset-4',
      outline: 'mr-2 outline outline-offset-1 outline-yellow-300/80',
      none: '',
    },
  },
  defaultVariants: {
    secondaryHighlight: 'outline',
  },
})

export interface SecondaryMatchData {
  propertyName: string
  value: string | number
}

export interface TextHighlighterProps
  extends VariantProps<typeof primaryVariants>,
    VariantProps<typeof secondaryVariants> {
  text: string
  searchTerm?: string
  secondaryMatches?: SecondaryMatchData[]
}

const TextHighlighter = ({
  highlight,
  searchTerm,
  secondaryMatches,
  text,
  ...props
}: TextHighlighterProps) => {
  const { renderValue, hasSubStringMatch } = useSubStringMatches({
    text,
    searchTerm,
    highlight,
  })
  const hasSecondaryMatch = useHasSecondaryMatch({
    searchTerm,
    secondaryMatches,
  })

  return (
    <div
      className={mergeClasses(
        secondaryVariants({
          secondaryHighlight:
            hasSecondaryMatch && !hasSubStringMatch
              ? props.secondaryHighlight
              : 'none',
        }),
        'inline text-nowrap',
      )}
      {...props}
    >
      {!searchTerm ? text : renderValue}
    </div>
  )
}

function useSubStringMatches({
  text,
  searchTerm,
  highlight,
}: Pick<TextHighlighterProps, 'text' | 'searchTerm' | 'highlight'>): {
  hasSubStringMatch: boolean
  renderValue: (string | JSX.Element)[]
} {
  const matchesData = useMemo(() => {
    let hasSubStringMatch = false

    if (!searchTerm) {
      return { renderValue: [text], hasSubStringMatch }
    }

    const regex = new RegExp(escapeRegExp(searchTerm), 'gi')
    const matches = text.match(regex)

    if (!matches || !matches.length) {
      return { renderValue: [text], hasSubStringMatch }
    } else {
      hasSubStringMatch = true
    }

    const split = text.split(regex)

    const arr: Array<string | JSX.Element> = []

    split.forEach((str, index) => {
      arr.push(str)
      if (matches[index]) {
        arr.push(
          <mark
            key={index}
            className={mergeClasses(primaryVariants({ highlight }), '')}
          >
            {matches[index]}
          </mark>,
        )
      }
    })

    return { renderValue: arr, hasSubStringMatch }
  }, [text, searchTerm, highlight])

  return matchesData
}

function useHasSecondaryMatch({
  searchTerm,
  secondaryMatches,
}: Pick<TextHighlighterProps, 'searchTerm' | 'secondaryMatches'>) {
  return useMemo(() => {
    if (!searchTerm || !secondaryMatches?.length) {
      return false
    }

    return secondaryMatches.some((match) => {
      return match.value
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    })
  }, [searchTerm, secondaryMatches])
}

TextHighlighter.displayName = 'TextHighlighter'

export { TextHighlighter }
