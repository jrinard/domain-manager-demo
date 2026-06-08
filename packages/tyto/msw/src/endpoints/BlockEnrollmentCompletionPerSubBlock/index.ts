import { rest } from 'msw'
import { BlockEnrollmentCompletionPerSubBlockEndpointResponses } from '@tyto/lore'

export const BlockEnrollmentCompletionPerSubBlockEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(
      `${baseUrl}/api/BlockEnrollment/CompletionPerSubBlock`,
      (req, res, ctx) => {
        const requiredProps = ['teamID', 'blockID']
        for (const prop of requiredProps) {
          if (req.url.searchParams.toString().indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                BlockEnrollmentCompletionPerSubBlockEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            BlockEnrollmentCompletionPerSubBlockEndpointResponses.get.success(),
          ),
        )
      },
    ),
  ],
}
