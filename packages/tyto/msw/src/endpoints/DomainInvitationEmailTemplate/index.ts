import { rest } from 'msw'
import { DomainInvitationEmailTemplateEndpointResponses } from '@tyto/lore'

export const DomainInvitationEmailTemplateEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(
      `${baseUrl}/api/DomainInvitationEmail/Template`,
      (req, res, ctx) => {
        const requiredProps = ['domainID']
        for (const prop of requiredProps) {
          if (req.url.searchParams.toString().indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                DomainInvitationEmailTemplateEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            DomainInvitationEmailTemplateEndpointResponses.get.success(),
          ),
        )
      },
    ),
  ],
}
