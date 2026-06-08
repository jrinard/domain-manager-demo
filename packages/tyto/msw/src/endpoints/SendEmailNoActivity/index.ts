import { rest } from 'msw'
import { SendEmailNoActivityEndpointResponses } from '@tyto/lore'

export const SendEmailNoActivityEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(
      `${baseUrl}/api/sendEmail/noactivityAnnouncement`,
      async (req, res, ctx) => {
        const requiredProps = ['memberID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                SendEmailNoActivityEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(SendEmailNoActivityEndpointResponses.success()),
        )
      },
    ),
  ],
}
