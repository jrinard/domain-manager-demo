const { join } = require('node:path')
// Portfolio demo: no Nx workspace — repo root is four levels up from this file
const workspaceRoot = join(__dirname, '../../../..')
const createGlobPatternsForDependencies = () => []
const { flattenDeep } = require('lodash')

// Domain style tokens as Tailwind colors
// This matches the token definitions from @domain/styles
function getDomainStyleColors() {
  const tokens = [
    'site-bg',
    'site-fg',
    'primary',
    'primary-fg',
    'primary-subtle',
    'primary-subtle-fg',
    'action',
    'action-fg',
    'active',
    'active-fg',
    'secondary',
    'secondary-fg',
    'accent',
    'accent-fg',
    'highlight',
    'highlight-fg',
    'muted',
    'muted-fg',
    'overlay',
    'overlay-fg',
    'info',
    'info-fg',
    'info-subtle',
    'info-subtle-fg',
    'success',
    'success-fg',
    'success-subtle',
    'success-subtle-fg',
    'warning',
    'warning-fg',
    'warning-subtle',
    'warning-subtle-fg',
    'danger',
    'danger-fg',
    'danger-subtle',
    'danger-subtle-fg',
    'error',
    'error-fg',
    'error-subtle',
    'error-subtle-fg',
    'border',
    'input',
    'input-border',
    'ring',
    'chart-1',
    'chart-2',
    'chart-3',
    'chart-4',
    'chart-5',
    'topbar',
    'topbar-fg',
    'topbar-subtle',
    'topbar-subtle-fg',
    'navbar',
    'navbar-fg',
    'navbar-subtle',
    'navbar-subtle-fg',
    'sidebar',
    'sidebar-fg',
    'sidebar-subtle',
    'sidebar-subtle-fg',
    'homepage',
    'homepage-fg',
    'bg-contrast-low',
    'bg-contrast-medium',
    'bg-contrast-high',
    'list-item-odd',
    'list-item-even',
    'list-item-odd-selected',
    'list-item-even-selected',
    'status-complete',
    'status-incomplete',
    'status-overdue',
    'status-atrisk',
    'status-notapplicable',
    'status-postponed',
    'title',
    'title-2',
    'title-3',
    'title-4',
    'title-5',
    'title-6',
    'label',
    // Asset colors
    'asset',
    'asset-fg',
    'asset-document',
    'asset-document-subtle',
    'asset-plaintext',
    'asset-plaintext-subtle',
    'asset-pdf',
    'asset-pdf-subtle',
    'asset-csv',
    'asset-csv-subtle',
    'asset-excel',
    'asset-excel-subtle',
    'asset-speedsheet',
    'asset-speedsheet-subtle',
    'asset-md',
    'asset-md-subtle',
    'asset-quickart',
    'asset-quickart-subtle',
    'asset-quickdoc',
    'asset-quickdoc-subtle',
    'asset-video',
    'asset-video-subtle',
    'asset-image',
    'asset-image-subtle',
    'asset-photoalbum',
    'asset-photoalbum-subtle',
    'asset-elearning',
    'asset-elearning-subtle',
    'asset-scorm',
    'asset-scorm-subtle',
    'asset-url',
    'asset-url-subtle',
    'asset-zip',
    'asset-zip-subtle',
    'folder-1',
    'folder-2',
    'folder-3',
    'folder-4',
    'folder-5',
    'folder-6',
    // DISC colors
    'disc-d',
    'disc-d-subtle',
    'disc-i',
    'disc-i-subtle',
    'disc-s',
    'disc-s-subtle',
    'disc-c',
    'disc-c-subtle',
    // Mastery colors
    'assignment-list',
    'assignment-list-subtle',
    'exam',
    'exam-subtle',
    // Notice colors
    'other',
    'other-fg',
    'self',
    'self-fg',
    'robot',
    'robot-fg',
    // Grayscale
    'grayscale-50',
    'grayscale-100',
    'grayscale-200',
    'grayscale-300',
    'grayscale-400',
    'grayscale-500',
    'grayscale-600',
    'grayscale-700',
    'grayscale-800',
    'grayscale-900',
    'grayscale-950',
    // Tryyb UI Parts
    'topbar-height',
    'chat-width',
    'menu-width',
  ]

  const colors = {}
  tokens.forEach((token) => {
    colors[token] = `var(--${token})`
  })
  return colors
}

// Accent is usually Brand
const themeColors = ['primary', 'secondary', 'accent', 'muted']
const statusColors = ['info', 'warn', 'success', 'error', 'future']

/** @type {import('tailwindcss').Config} (string, string[]):Config */
module.exports = (dirname, appsAndPackages) => {
  let content = []
  try {
    content = [...createGlobPatternsForDependencies(dirname)]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      'Warning: Error creating glob patterns for dependencies:',
      error.message,
    )
    // Fallback to empty array if there's an error
    content = []
  }
  if (appsAndPackages) {
    content.push(
      ...appsAndPackages.map((item) => {
        return join(
          workspaceRoot,
          `${item}/{src,pages,components,storybook}/**/*!(*.stories|*.spec).{ts,tsx,html,mdx}`,
        )
      }),
    )
  }
  content.push(
    join(
      workspaceRoot,
      'packages/falcon-ui/',
      '{src,pages,components,storybook}/**/*!(*.stories|*.spec).{ts,tsx,html,mdx}',
    ),
  )
  content.push(
    join(
      workspaceRoot,
      'packages/falcon/**',
      '{src,pages,components,storybook}/**/*!(*.stories|*.spec).{ts,tsx,html,mdx}',
    ),
  )

  return {
    safelist: [
      ...flattenDeep(
        themeColors.map((item) => [
          `bg-${item}`,
          `bg-${item}-foreground`,
          `text-${item}`,
          `text-${item}-foreground`,
          `fill-${item}`,
        ]),
      ),
      ...flattenDeep(
        statusColors.map((item) => [
          `bg-${item}`,
          `text-${item}`,
          `fill-${item}`,
        ]),
      ),
      { pattern: /bg-./ },
      { pattern: /text-./ },
      { pattern: /border-./ },
      // Oddities
      'bg-primary-selected',
      'bg-primary-new',
      'bg-ring',
      'text-primary-selected',
      'text-primary-new',
      'bg-surface-light',
      // Text Sizes
      'text-base',
      'text-xs',
      'text-sm',
      'text-lg',
      'text-xl',
      'text-2xl',
      'text-3xl',
      'text-4xl',
      'text-5xl',
      'text-6xl',
      'text-7xl',
      'text-8xl',
      'z-0',
      'z-10',
      'z-20',
      'z-30',
      'z-40',
      'z-50',
      'z-100',
    ],
    content,
    darkMode: ['selector', '[data-sitetheme="dark"]'],
    theme: {
      fontFamily: {
        body: ['Montserrat'],
        heading: ['Montserrat'],
        subheading: ['Oswald'],
        label: ['Oswald'],
      },
      extend: {
        fontSize: {
          '2xs': '0.625rem',
          '3xs': '0.5rem',
        },
        zIndex: {
          60: '60',
          70: '70',
          80: '80',
          90: '90',
          100: '100',
        },
        colors: getDomainStyleColors(),
        borderRadius: {
          sm: 'var(--radius-sm)',
          DEFAULT: 'var(--radius-md)',
          md: 'var(--radius-md)',
          lg: 'var(--radius-lg)',
          xl: 'var(--radius-xl)',
          '2xl': 'var(--radius-2xl)',
          full: 'var(--radius-full)',
        },
        keyframes: {
          'accordion-down': {
            from: { height: 0 },
            to: {
              height:
                'rgb(var(--radix-accordion-content-height) / <alpha-value>)',
            },
          },
          'accordion-up': {
            from: {
              height:
                'rgb(var(--radix-accordion-content-height) / <alpha-value>)',
            },
            to: { height: 0 },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        },
        animationDuration: {
          200: '200ms',
          300: '300ms',
          500: '500ms',
          700: '700ms',
          1000: '1000ms',
          1300: '1300ms',
          1500: '1300ms',
          1700: '1700ms',
          2000: '2000ms',
        },
        translate: {
          z: {
            0: 'translateZ(0)',
          },
        },
        screens: {
          xs: '430px',
        },
        height: {
          15: '3.75rem',
          trainingtile: '240px',
          topbar: 'var(--site-top-height)',
          'screen-minus-topbar': 'calc(100dvh - var(--site-top-height))',
        },
        width: {
          15: '3.75rem',
          132: '32.5rem',
          trainingtile: '308px',
          'chat-width': 'var(--chat-width)',
          'menu-width': 'var(--menu-width)',
        },
        inset: {
          'topbar-height': 'var(--site-top-height)',
        },
        minWidth: {
          4: '1rem',
          8: '2rem',
          12: '3rem',
          14: '3.5rem',
          16: '4rem',
          20: '5rem',
          24: '6rem',
          28: '7rem',
          30: '7.5rem',
          31: '7.75rem',
          32: '8rem',
          36: '9rem',
          40: '10rem',
          44: '11rem',
          48: '12rem',
          52: '13rem',
          60: '15rem',
          96: '24rem',
          132: '33rem',
          136: '34rem',
          140: '35rem',
          144: '36rem',
          148: '37rem',
          152: '38rem',
          156: '39rem',
          160: '40rem',
          trainingtile: '308px',
        },
        maxWidth: {
          72: '17rem',
          130: '32.5rem',
          '1/2': '50%',
          '1/4': '25%',
          trainingtile: '308px',
        },
        maxHeight: {
          125: '32rem',
          '70vh': '70vh',
          trainingtile: '240px',
        },
        transitionTimingFunction: {
          'out-progress': 'cubic-bezier(0.65, 0, 0.35, 1)',
        },
        minHeight: {
          25: '6.25rem',
          'screen-almost': '95vh',
          trainingtile: '240px',
        },
      },
      states: {
        on: {
          element: true, // boolean
          children: true, // boolean
          group: 'group', // prefix | boolean
        },
        activated: {
          element: true, // boolean
          children: true, // boolean
          group: 'group', // prefix | boolean
        },
        expanded: {
          element: true, // boolean
          children: true, // boolean
          group: 'group', // prefix | boolean
        },
        opened: {
          element: true, // boolean
          children: true, // boolean
          group: 'group', // prefix | boolean
        },
        'on-open': {
          element: true, // boolean
          children: true, // boolean
          group: 'group', // prefix | boolean
        },
        'on-expand': {
          element: true, // boolean
          children: true, // boolean
          group: 'group', // prefix | boolean
        },
      },
    },
    plugins: [
      require('../tailwind-surfaces'),
      require('tailwindcss-animate'),
      require('tailwindcss-radix')({ variantPrefix: false }),
      require('tailwindcss-cmdk'),
    ],
  }
}
