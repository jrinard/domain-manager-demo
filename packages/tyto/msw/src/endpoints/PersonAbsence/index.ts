import { rest } from 'msw'
import { PersonAbsenceEndpointResponses } from '@tyto/lore'

export const PersonAbsenceEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/PersonAbsence`, (req, res, ctx) => {
      const requiredProps = ['personID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonAbsenceEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonAbsenceEndpointResponses.get.success())
      )
    }),
    rest.put(`${baseUrl}/api/PersonAbsence`, async (req, res, ctx) => {
      const requiredProps = ['personID', 'timeZoneNameGeneral']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonAbsenceEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonAbsenceEndpointResponses.put.success())
      )
    }),
  ],
}
