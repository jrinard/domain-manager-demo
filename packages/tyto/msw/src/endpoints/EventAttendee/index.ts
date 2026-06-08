import { rest } from 'msw'
import {
  CustomTabEndpointResponses,
  EventAttendeeEndpointResponses,
} from '@tyto/lore'

export const EventAttendeeEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/EventAttendee`, async (req, res, ctx) => {
      const requiredProps = [
        'isCascade',
        'memberID',
        'attendanceType',
        'eventID',
      ]
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              EventAttendeeEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EventAttendeeEndpointResponses.post.success()),
      )
    }),
    rest.delete(`${baseUrl}/api/EventAttendee`, async (req, res, ctx) => {
      const requiredProps = ['memberID', 'eventAttendeeID', 'eventID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(CustomTabEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CustomTabEndpointResponses.delete.success()),
      )
    }),
    rest.put(`${baseUrl}/api/EventAttendee`, async (req, res, ctx) => {
      const requiredProps = [
        'memberID',
        'eventAttendeeID',
        'attendanceType',
        'eventID',
      ]
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              EventAttendeeEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EventAttendeeEndpointResponses.delete.success()),
      )
    }),
  ],
}
