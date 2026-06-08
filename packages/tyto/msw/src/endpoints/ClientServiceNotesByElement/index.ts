import { rest } from 'msw'
import { ClientServiceNotesByElementEndpointResponses } from '@tyto/lore'

export const ClientServiceNotesByElementEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/ClientServiceNotes/ByElement`, (req, res, ctx) => {
      const requiredProps = ['elementID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              ClientServiceNotesByElementEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(ClientServiceNotesByElementEndpointResponses.success()),
      )
    }),
  ],
}
