import { rest } from 'msw'
import { DomainEndpointResponses } from '@tyto/lore'

export const DomainEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/domain`, async (req, res, ctx) => {
      const requiredProps = ['primaryElementID', 'teamName']
      const data = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(data).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(DomainEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(ctx.status(200), ctx.json(DomainEndpointResponses.success()))
    }),
    rest.put(`${baseUrl}/api/domain`, async (req, res, ctx) => {
      const requiredPropsAgain = ['domainID']
      const data = await req.json()
      for (const prop of requiredPropsAgain) {
        if (Object.keys(data).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(DomainEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(DomainEndpointResponses.put.success())
      )
    }),
    rest.get(`${baseUrl}/api/domain`, (req, res, ctx) => {
      if (req.url.searchParams.toString().indexOf('domainID=-1') >= 0) {
        return res(
          ctx.status(400),
          ctx.json(DomainEndpointResponses.invalidMissingRequired('domainID'))
        )
      }
      return res(
        ctx.status(200),
        ctx.json(DomainEndpointResponses.get.success())
      )
    }),
  ],
}
