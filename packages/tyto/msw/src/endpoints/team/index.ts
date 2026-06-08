import { TeamsEndpointResponses } from '@tyto/lore'
import { rest } from 'msw'

export const createTeamEndpoint = (baseUrl: string) => [
  rest.get(`${baseUrl}/api/team`, (req, res, ctx) => {
    if (req.url.searchParams.toString().indexOf(':') >= 0) {
      return res(
        ctx.status(400),
        ctx.json({
          links: [],
          error: {
            logID: -1,
            msg: 'Error',
            sts: -1000,
            technical: 'Technical Error',
          },
        }),
      )
    }
    const requiredProps = ['teamID']
    for (const prop of requiredProps) {
      if (req.url.searchParams.toString().indexOf(prop) < 0) {
        return res(
          ctx.status(400),
          ctx.json({
            links: [],
            error: {
              logID: -1,
              msg: `validation error: ${prop} required`,
              sts: -1000,
              technical: `parameters must contain ${prop}`,
            },
          }),
        )
      }
    }
    return res(ctx.status(200), ctx.json(TeamsEndpointResponses.success()))
  }),
  rest.post(`${baseUrl}/api/team`, async (req, res, ctx) => {
    if (req.url.searchParams.toString().indexOf(':') >= 0) {
      return res(
        ctx.status(400),
        ctx.json({
          links: [],
          error: {
            logID: -1,
            msg: 'Error',
            sts: -1000,
            technical: 'Technical Error',
          },
        }),
      )
    }
    const requiredProps = ['primaryElementID']
    const data = await req.json()
    for (const prop of requiredProps) {
      if (Object.keys(data).indexOf(prop) < 0) {
        return res(
          ctx.status(400),
          ctx.json({
            links: [],
            error: {
              logID: -1,
              msg: `validation error: ${prop} required`,
              sts: -1000,
              technical: `parameters must contain ${prop}`,
            },
          }),
        )
      }
    }
    return res(
      ctx.status(200),
      ctx.json(TeamsEndpointResponses.successCreate()),
    )
  }),
  rest.put(`${baseUrl}/api/team`, async (req, res, ctx) => {
    const requiredProps = ['teamID']
    const data = await req.json()
    for (const prop of requiredProps) {
      if (Object.keys(data).indexOf(prop) < 0) {
        return res(
          ctx.status(400),
          ctx.json({
            links: [],
            error: {
              logID: -1,
              msg: `validation error: ${prop} required`,
              sts: -1000,
              technical: `parameters must contain ${prop}`,
            },
          }),
        )
      }
    }
    return res(ctx.status(200), ctx.json(TeamsEndpointResponses.put.success()))
  }),
  rest.delete(`${baseUrl}/api/team`, async (req, res, ctx) => {
    const requiredProps = ['teamID']
    const body = await req.json()
    for (const prop of requiredProps) {
      if (Object.keys(body).indexOf(prop) < 0) {
        return res(
          ctx.status(400),
          ctx.json(TeamsEndpointResponses.invalidMissingRequired(prop)),
        )
      }
    }
    return res(
      ctx.status(200),
      ctx.json(TeamsEndpointResponses.delete.success()),
    )
  }),
]
