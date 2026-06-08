import { rest } from 'msw'
import { ClientServiceNoteEndpointResponses } from '@tyto/lore'

export const ClientServiceNoteEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.delete(`${baseUrl}/api/ClientServiceNote`, async (req, res, ctx) => {
      const requiredProps = ['clientServiceNoteID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              ClientServiceNoteEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(ClientServiceNoteEndpointResponses.delete.success()),
      )
    }),
    rest.get(`${baseUrl}/api/ClientServiceNote`, (req, res, ctx) => {
      const requiredProps = ['clientServiceNoteID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              ClientServiceNoteEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(ClientServiceNoteEndpointResponses.get.success()),
      )
    }),
    rest.post(`${baseUrl}/api/ClientServiceNote`, async (req, res, ctx) => {
      const requiredProps = ['elementID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              ClientServiceNoteEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(ClientServiceNoteEndpointResponses.post.success()),
      )
    }),
  ],
}
