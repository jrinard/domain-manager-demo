import { rest } from 'msw'
import { RobotAccountsEndpointResponses } from '@tyto/lore'

export const RobotAccountsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/robot/accounts`, (req, res, ctx) => {
      const requiredProps = ['experience']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              RobotAccountsEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(RobotAccountsEndpointResponses.get.success()),
      )
    }),
  ],
}
