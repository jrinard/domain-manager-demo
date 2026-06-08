import { rest } from 'msw'
import { DomainUIConfigurationsEndpointResponses } from '@tyto/lore'

export const DomainUIConfigurationsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/domain/ui/configurations`, (req, res, ctx) => {
      const requiredProps = ['domainID', 'configType']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              DomainUIConfigurationsEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(DomainUIConfigurationsEndpointResponses.get.success()),
      )
    }),
  ],
}
