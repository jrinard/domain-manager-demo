import { rest } from 'msw'
import { DomainUIEndpointResponses } from '@tyto/lore'

export const DomainUIEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Domain/UI`, (req, res, ctx) => {
      const requiredProps = ['domainID', 'onCourseURL', 'loginDomainID']
      const oneMatches = requiredProps.some((prop) =>
        req.url.searchParams.has(prop),
      )

      if (!oneMatches) {
        return res(
          ctx.status(400),
          ctx.json(
            DomainUIEndpointResponses.invalidMissingRequired(
              'one of the following: domainID, onCourseURL, loginDomainID',
            ),
          ),
        )
      }

      return res(
        ctx.status(200),
        ctx.json(DomainUIEndpointResponses.get.success()),
      )
    }),
    rest.put(`${baseUrl}/api/Domain/UI`, async (req, res, ctx) => {
      const requiredProps = ['uiImages', 'uiKeyValues']
      const body = await req.json()
      const oneMatches = requiredProps.some((prop) =>
        Object.keys(body).includes(prop),
      )

      if (!oneMatches) {
        return res(
          ctx.status(400),
          ctx.json(
            DomainUIEndpointResponses.invalidMissingRequired(
              'one of the following: uiImages, uiKeyValues',
            ),
          ),
        )
      }

      return res(
        ctx.status(200),
        ctx.json(DomainUIEndpointResponses.put.success()),
      )
    }),
  ],
}
