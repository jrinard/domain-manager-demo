import { Team as TeamResource } from '@tyto/client'

export type Team = Awaited<
  ReturnType<typeof TeamResource.prototype.get>
>['team']

/**
 * https://refactoring.guru/design-patterns/factory-method
 */
export const TeamFactory = {
  fromTytoTeam: (
    response: Awaited<ReturnType<typeof TeamResource.prototype.get>>,
  ) => {
    return response.team
  },
}
