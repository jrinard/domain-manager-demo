import { rest } from 'msw'
import { ClientServiceNoteAttachEndpointResponses } from '@tyto/lore'

export const ClientServiceNoteAttachEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.delete(
      `${baseUrl}/api/ClientServiceNote/Attach`,
      async (req, res, ctx) => {
        const requiredProps = ['clientServiceNoteAttachID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                ClientServiceNoteAttachEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(ClientServiceNoteAttachEndpointResponses.delete.success()),
        )
      },
    ),
    rest.post(
      `${baseUrl}/api/ClientServiceNote/Attach`,
      async (req, res, ctx) => {
        const requiredProps = ['clientServiceNoteID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                ClientServiceNoteAttachEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(ClientServiceNoteAttachEndpointResponses.success()),
        )
      },
    ),
  ],
}
