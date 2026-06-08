import { rest } from 'msw'
import { PeopleBrowseEndpointResponses } from '@tyto/lore'

export const PeopleBrowseEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/people/browse`, (req, res, ctx) => {
      if (req.url.searchParams.size > 1) {
        return res(
          ctx.status(400),
          ctx.json(
            PeopleBrowseEndpointResponses.invalidPresentArguments(
              req.url.searchParams.toString(),
            ),
          ),
        )
      }

      return res(
        ctx.status(200),
        ctx.json(PeopleBrowseEndpointResponses.get.success()),
      )
    }),
  ],
}
