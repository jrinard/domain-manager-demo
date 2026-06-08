import { faker } from '@faker-js/faker/locale/en'
import { random } from 'lodash'
import { ContactCardProps } from '../../src/organisms/contactCard/ContactCard'
import type {
  DiscGraphValues,
  DiscGraphValuesExtended,
} from '../../src/molecules/discQuadrants/types'
const createContactCardProps = (
  item?: Partial<ContactCardProps>,
): ContactCardProps => {
  return {
    displayName: faker.person.fullName(),
    avatar: `https://i.pravatar.cc/?img=${random(1, 40)}`,
    discValues: createDiscGraphValues(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    title: faker.person.jobTitle(),
    ...item,
  }
}

const createDiscGraphValues = (
  overrides?: Partial<DiscGraphValues>,
): DiscGraphValues => ({
  c1: faker.number.int({ min: 1, max: 8 }),
  c2: faker.number.int({ min: -8, max: 8 }),
  c3: faker.number.int({ min: -8, max: 8 }),
  d1: faker.number.int({ min: -8, max: 8 }),
  d2: faker.number.int({ min: -8, max: 8 }),
  d3: faker.number.int({ min: -8, max: 8 }),
  s1: faker.number.int({ min: -8, max: 8 }),
  s2: faker.number.int({ min: -8, max: 8 }),
  s3: faker.number.int({ min: -8, max: 8 }),
  i1: faker.number.int({ min: -8, max: 8 }),
  i2: faker.number.int({ min: -8, max: 8 }),
  i3: faker.number.int({ min: -8, max: 8 }),
  styleKey3: 'DISC',
  ...overrides,
})

const createDiscGraphExtendedValues = (
  overrides?: Partial<DiscGraphValuesExtended>,
): DiscGraphValuesExtended => ({
  ...createDiscGraphValues(),
  personID: faker.number.int({ min: 100_000, max: 3_999_999 }),
  personName: faker.person.fullName(),
  ...overrides,
})

export default {
  createContactCardProps,
  createDiscGraphValues,
  createDiscGraphExtendedValues,
}
