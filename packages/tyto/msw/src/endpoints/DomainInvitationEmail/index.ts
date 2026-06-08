import { rest } from 'msw'
import { DomainInvitationEmailEndpointResponses } from '@tyto/lore'

export const DomainInvitationEmailEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/DomainInvitationEmail`, async (req, res, ctx) => {
      const requiredProps = [
        'memberID',
        'subject',
        'body',
        'fromName',
        'replyAddress',
      ]
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              DomainInvitationEmailEndpointResponses.invalidMissingRequired(
                prop
              )
            )
          )
        }
      }
      if (body.memberID === 3) {
        return res(ctx.delay('infinite'))
      }
      return res(
        ctx.status(200),
        ctx.json(DomainInvitationEmailEndpointResponses.post.success())
      )
    }),
  ],
}
