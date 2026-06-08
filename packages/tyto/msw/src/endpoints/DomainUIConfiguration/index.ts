import { rest } from 'msw'
import { DomainUIConfigurationEndpointResponses } from '@tyto/lore'

export const DomainUIConfigurationEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/domain/ui/configuration`, (req, res, ctx) => {
      const requiredProps = ['UIconfigGUID']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              DomainUIConfigurationEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(DomainUIConfigurationEndpointResponses.get.success()),
      )
    }),
    rest.post(
      `${baseUrl}/api/domain/ui/configuration`,
      async (req, res, ctx) => {
        const requiredProps = [
          'mimeType',
          'domainID',
          'configType',
          'attachments',
        ]
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                DomainUIConfigurationEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(DomainUIConfigurationEndpointResponses.post.success()),
        )
      },
    ),
    rest.put(
      `${baseUrl}/api/domain/ui/configuration`,
      async (req, res, ctx) => {
        const requiredProps = ['UIconfigGUID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                DomainUIConfigurationEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(DomainUIConfigurationEndpointResponses.put.success()),
        )
      },
    ),
  ],
}
