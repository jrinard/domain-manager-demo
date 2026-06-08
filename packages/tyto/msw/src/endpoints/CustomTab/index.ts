import { rest } from 'msw'
import { CustomTabEndpointResponses } from '@tyto/lore'

export const CustomTabEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/CustomTab`, async (req, res, ctx) => {
      const requiredProps = [
        'name',
        'teamRoot',
        'methodType',
        'destinationURI',
        'navigationTarget',
      ]
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(CustomTabEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CustomTabEndpointResponses.post.success())
      )
    }),

    rest.put(`${baseUrl}/api/CustomTab`, async (req, res, ctx) => {
      const requiredProps = [
        'traitID',
        'name',
        'destinationURI',
        'navigationTarget',
      ]
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(CustomTabEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CustomTabEndpointResponses.put.success())
      )
    }),

    rest.delete(`${baseUrl}/api/CustomTab`, async (req, res, ctx) => {
      const requiredProps = ['traitID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(CustomTabEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CustomTabEndpointResponses.delete.success())
      )
    }),
  ],
}
