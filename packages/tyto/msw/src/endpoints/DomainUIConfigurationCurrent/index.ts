import { rest } from 'msw'
import { DomainUIConfigurationCurrentEndpointResponses } from '@tyto/lore'

export const DomainUIConfigurationCurrentEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(
      `${baseUrl}/api/domain/ui/configuration/current`,
      (req, res, ctx) => {
        const requiredProps = ['configType', 'domainID']
        for (const prop of requiredProps) {
          if (!req.url.searchParams.has(prop)) {
            return res(
              ctx.status(400),
              ctx.json(
                DomainUIConfigurationCurrentEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(DomainUIConfigurationCurrentEndpointResponses.get.success()),
        )
      },
    ),
  ],
}
