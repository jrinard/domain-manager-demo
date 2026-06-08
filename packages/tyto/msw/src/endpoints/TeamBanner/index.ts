import { rest } from 'msw'
import { TeamBannerEndpointResponses } from '@tyto/lore'

export const TeamBannerEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/team/banner`, async (req, res, ctx) => {
      const requiredProps = ['teamID', 'uploadKey']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TeamBannerEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamBannerEndpointResponses.post.success())
      )
    }),

    rest.put(`${baseUrl}/api/team/banner`, async (req, res, ctx) => {
      const requiredProps = ['assetID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TeamBannerEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamBannerEndpointResponses.put.success())
      )
    }),

    rest.delete(`${baseUrl}/api/team/banner`, async (req, res, ctx) => {
      const requiredProps = ['assetID', 'activeStatus']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TeamBannerEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamBannerEndpointResponses.delete.success())
      )
    }),
  ],
}
