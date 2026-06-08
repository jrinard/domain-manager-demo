/**
 * We cannot use any imports right now due to https://github.com/vitejs/vite/issues/5370
 */
interface ResultHack {
  google: {
    families: {
      name: string
      styles: string
    }[]
  }
}
export const createUnfontsConfig = (): ResultHack => {
  return {
    google: {
      /**
       * Fonts families lists
       */
      families: [
        {
          /**
           * Family name (required)
           */
          name: 'Montserrat',

          /**
           * Family styles
           */
          styles: 'wght@400;500;600;700;900',
        },
        {
          /**
           * Family name (required)
           */
          name: 'Oswald',

          /**
           * Family styles
           */
          styles: 'wght@400;700',
        },
      ],
    },
  }
}

export default createUnfontsConfig
