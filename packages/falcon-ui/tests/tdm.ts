import { AvatarProps } from '../src'
import { random } from 'lodash'
import { faker } from '@faker-js/faker/locale/en'

export const createAvatarProps = (
  overrides?: Partial<AvatarProps>
): AvatarProps => {
  return {
    src: `https://i.pravatar.cc/?img=${random(1, 40)}`,
    name: faker.person.fullName(),
    ...overrides,
  }
}
