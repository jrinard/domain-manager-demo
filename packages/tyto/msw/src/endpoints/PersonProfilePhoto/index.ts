import { rest } from 'msw'
import { PersonProfilePhotoEndpointResponses } from '@tyto/lore'

export const PersonProfilePhotoEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Person/ProfilePhoto`, (req, res, ctx) => {
      const requiredProps = ['silhouette', 'personID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonProfilePhotoEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonProfilePhotoEndpointResponses.success())
      )
    }),
  ],
}
