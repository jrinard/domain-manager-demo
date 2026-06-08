import { rest } from 'msw'
import { RoleEndpointResponses } from '@tyto/lore'

export const RoleEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Role`, (req, res, ctx) => {
      const requiredProps = ['roleID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(RoleEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(ctx.status(200), ctx.json(RoleEndpointResponses.get.success()))
    }),
    rest.post(`${baseUrl}/api/Role`, async (req, res, ctx) => {
      const requiredProps = ['teamRoot', 'roleName']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(RoleEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(RoleEndpointResponses.post.success()),
      )
    }),
    rest.put(`${baseUrl}/api/Role`, async (req, res, ctx) => {
      const requiredProps = ['roleID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(RoleEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(ctx.status(200), ctx.json(RoleEndpointResponses.put.success()))
    }),
    rest.delete(`${baseUrl}/api/Role`, async (req, res, ctx) => {
      const requiredProps = ['roleID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(RoleEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(RoleEndpointResponses.delete.success()),
      )
    }),
  ],
}
