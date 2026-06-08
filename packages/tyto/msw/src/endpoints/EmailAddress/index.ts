import { rest } from 'msw'
import { EmailAddressEndpointResponses } from '@tyto/lore'

export const EmailAddressEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/emailAddress`, (req, res, ctx) => {
      const requiredProps = ['']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(EmailAddressEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EmailAddressEndpointResponses.get.success())
      )
    }),
    rest.post(`${baseUrl}/api/emailAddress`, async (req, res, ctx) => {
      const requiredProps = ['aboutID', 'aboutType', 'address']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(EmailAddressEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EmailAddressEndpointResponses.post.success())
      )
    }),
    rest.put(`${baseUrl}/api/emailAddress`, async (req, res, ctx) => {
      const requiredProps = ['emailID', 'address']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(EmailAddressEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EmailAddressEndpointResponses.put.success())
      )
    }),
    rest.delete(`${baseUrl}/api/emailAddress`, async (req, res, ctx) => {
      const requiredProps = ['emailID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(EmailAddressEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EmailAddressEndpointResponses.delete.success())
      )
    }),
  ],
}
