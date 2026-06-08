import { rest } from 'msw'
import { PersonEndpointResponses } from '@tyto/lore'

export const PersonEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/Person`, async (req, res, ctx) => {
      const requiredProps = ['primaryElementID', 'roleID', 'logonName']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(PersonEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonEndpointResponses.post.success()),
      )
    }),

    rest.get(`${baseUrl}/api/person`, (req, res, ctx) => {
      if (req.url.searchParams.toString().indexOf(':') >= 0) {
        return res(
          ctx.status(400),
          ctx.json(PersonEndpointResponses.invalidFilter()),
        )
      }
      const requiredProps = ['personID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(PersonEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonEndpointResponses.get.success()),
      )
    }),

    rest.put(`${baseUrl}/api/Person`, async (req, res, ctx) => {
      const requiredProps = ['personID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(PersonEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      if (body.personID === 3) {
        return res(ctx.delay('infinite'))
      }
      return res(
        ctx.status(200),
        ctx.json(PersonEndpointResponses.put.success()),
      )
    }),
    rest.delete(`${baseUrl}/api/Person`, async (req, res, ctx) => {
      const requiredProps = ['personID', 'activeStatus', 'reason']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(PersonEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonEndpointResponses.delete.success()),
      )
    }),
  ],
}
