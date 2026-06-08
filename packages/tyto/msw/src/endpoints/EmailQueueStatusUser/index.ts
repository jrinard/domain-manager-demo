import { rest } from 'msw'
import { EmailQueueStatusUserEndpointResponses } from '@tyto/lore'

export const EmailQueueStatusUserEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/EmailQueueStatus/User`, (req, res, ctx) => {
      const requiredProps = ['']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              EmailQueueStatusUserEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EmailQueueStatusUserEndpointResponses.get.success())
      )
    }),
  ],
}
