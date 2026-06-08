import { rest } from 'msw'
import { PlatformReviewTeamInitializeEndpointResponses } from '@tyto/lore'

export const PlatformReviewTeamInitializeEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(
      `${baseUrl}/api/platformreview/team/initialize`,
      async (req, res, ctx) => {
        const requiredProps = ['srcTaskID', 'destTeamID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                PlatformReviewTeamInitializeEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            PlatformReviewTeamInitializeEndpointResponses.post.success(),
          ),
        )
      },
    ),
  ],
}
