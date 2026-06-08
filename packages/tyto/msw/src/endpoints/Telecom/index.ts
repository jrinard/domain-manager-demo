import { rest } from 'msw'
import { TelecomEndpointResponses } from '@tyto/lore'

export const TelecomEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Telecom`, (req, res, ctx) => {
      const requiredProps = ['elementID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TelecomEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TelecomEndpointResponses.get.success())
      )
    }),
    rest.post(`${baseUrl}/api/Telecom`, async (req, res, ctx) => {
      const requiredProps = ['elementID', 'label', 'address']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TelecomEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TelecomEndpointResponses.post.success())
      )
    }),
    rest.put(`${baseUrl}/api/Telecom`, async (req, res, ctx) => {
      const requiredProps = ['telecomGUID', 'label', 'address']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TelecomEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TelecomEndpointResponses.put.success())
      )
    }),
  ],
}
