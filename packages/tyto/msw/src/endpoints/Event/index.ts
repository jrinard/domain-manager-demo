import { rest } from 'msw'
import { EventEndpointResponses } from '@tyto/lore'

export const EventEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/event`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(EventEndpointResponses.post.success()),
      )
    }),
    rest.put(`${baseUrl}/api/event`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(EventEndpointResponses.put.success()),
      )
    }),
    rest.delete(`${baseUrl}/api/event`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(EventEndpointResponses.delete.success()),
      )
    }),
    rest.get(`${baseUrl}/api/event`, (req, res, ctx) => {
      const requiredProps = ['eventID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(EventEndpointResponses.get.invalidMissingRequired(prop)),
          )
        }
      }
      if ((req.url.searchParams.get('eventID') || '').match(/^(3|-1)$/i)) {
        return res(ctx.delay('infinite'))
      }
      if ((req.url.searchParams.get('eventID') || '') === '404') {
        return res(
          ctx.status(200),
          ctx.json(EventEndpointResponses.get.errorNotFound()),
        )
      }
      return res(
        ctx.status(200),
        ctx.json(
          EventEndpointResponses.get.success(
            ['2'].includes(req.url.searchParams.get('eventID') || '')
              ? 'with-agenda'
              : 'no-agenda',
          ),
        ),
      )
    }),
  ],
}
