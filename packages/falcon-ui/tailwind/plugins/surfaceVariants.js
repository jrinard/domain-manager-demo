import plugin from 'tailwindcss/plugin'

function dataSurfaceVariant(
  surface,
  {
    addVariant, // for registering custom variants
    e, // for manually escaping strings meant to be used in class names
  }
) {
  addVariant(`data-surface-${surface}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(
        `data-surface-${surface}${separator}${className}`
      )}[data-surface='${surface}']`
    })
  })

  addVariant(`group-surface-${surface}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group[data-surface='${surface}'] .${e(
        `group-surface-${surface}${separator}${className}`
      )}`
    })
  })

  addVariant(`peer-surface-${surface}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.peer[data-surface='${surface}'] ~ .${e(
        `peer-surface-${surface}${separator}${className}`
      )}`
    })
  })
}

module.exports = plugin((helpers) => {
  dataSurfaceVariant('dark', helpers)
  dataSurfaceVariant('light', helpers)
})
