import { rest } from 'msw'
import { DomainUIImageEndpointResponses } from '@tyto/lore'

export const DomainUIImageEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.delete(`${baseUrl}/api/domain/ui/image`, async (req, res, ctx) => {
      const requiredProps = ['imageID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              DomainUIImageEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(DomainUIImageEndpointResponses.delete.success()),
      )
    }),
  ],
}
