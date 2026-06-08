import { rest } from 'msw'
import { RobotAccountEndpointResponses } from '@tyto/lore'

export const RobotAccountEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(`${baseUrl}/api/robot/account`, async (req, res, ctx) => {
      const requiredProps = ['personID']

      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              RobotAccountEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(RobotAccountEndpointResponses.put.success()),
      )
    }),
    rest.post(`${baseUrl}/api/robot/account`, async (req, res, ctx) => {
      const requiredProps = ['company', 'experience']

      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              RobotAccountEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(RobotAccountEndpointResponses.post.success()),
      )
    }),
  ],
}
