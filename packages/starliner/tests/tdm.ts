import { User } from '../src/data/user'
import { faker } from '@faker-js/faker/locale/en_US'
export const createUser = (overrides?: Partial<User>): User => {
  return {
    team: faker.company.name(),
    avatar: `https://i.pravatar.cc/?img=${faker.helpers.rangeToNumber({
      min: 1,
      max: 40,
    })}`,
    displayName: faker.person.fullName(),
    id: faker.helpers.rangeToNumber({
      min: 1,
      max: 4000,
    }),
    ...overrides,
  }
}
