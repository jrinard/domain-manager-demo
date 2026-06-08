import { cva } from '@falcon/style'

export default cva('', {
  variants: {
    size: {
      '4': 'size-4',
      '6': 'size-6',
      '8': 'size-8',
      '10': 'size-10',
      '12': 'size-12',
      '14': 'size-14',
      '16': 'size-16',
      '20': 'size-20',
      '24': 'size-24',
      '28': 'size-28',
      '32': 'size-32',
      '36': 'size-36',
      '40': 'size-40',
      '44': 'size-44',
      '96': 'size-96',
      '1/2': 'size-1/2',
      '1/3': 'size-1/3',
      '1/4': 'size-1/4',
      '3/4': 'size-3/4',
      fit: 'size-fit',
      full: 'size-full',
    },
  },
  defaultVariants: {
    size: '4',
  },
})
