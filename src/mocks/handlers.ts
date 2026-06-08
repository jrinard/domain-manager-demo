import { rest } from 'msw'
import {
  DEFAULT_DEMO_DOMAIN_ID,
  getConfiguration,
  getDemoDomain,
  getDemoDomainUI,
  getDemoSession,
  getDemoTeam,
  getDemoTeamAdmin,
  getDemoTeamsByFunction,
  listConfigurations,
  saveConfiguration,
  updateConfigurationStatus,
  type ConfigType,
} from './demoStore'
import { getDemoMenuManageResponse, getDemoMenuResponse } from './demoMenu'
import { getDemoRolesResponse } from './demoRoles'

const successEnvelope = { error: { logID: -1, sts: 200, msg: 'ok', technical: '' } }

/** Path-only patterns so MSW works on whatever port Vite picks. */
export const demoOverrideHandlers = [
  rest.get('/api/TeamsByFunction', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ teams: getDemoTeamsByFunction() }))
  }),

  rest.get('/api/team', (req, res, ctx) => {
    const teamID = Number(req.url.searchParams.get('teamID') ?? 0)
    if (!teamID) {
      return res(ctx.status(400), ctx.json({ error: { msg: 'teamID required' } }))
    }
    return res(ctx.status(200), ctx.json(getDemoTeam(teamID)))
  }),

  rest.get('/api/team/admin', (req, res, ctx) => {
    const teamID = Number(
      req.url.searchParams.get('teamID') ?? DEFAULT_DEMO_DOMAIN_ID,
    )
    return res(ctx.status(200), ctx.json(getDemoTeamAdmin(teamID)))
  }),

  rest.get('/api/domain', (req, res, ctx) => {
    const domainID = Number(req.url.searchParams.get('domainID') ?? 0)
    return res(ctx.status(200), ctx.json(getDemoDomain(domainID)))
  }),

  rest.put('/api/domain', async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ recordsAffected: 1, session: getDemoSession() }))
  }),

  rest.get('/api/Domain/UI', (req, res, ctx) => {
    const domainID = Number(req.url.searchParams.get('domainID') ?? DEFAULT_DEMO_DOMAIN_ID)
    return res(ctx.status(200), ctx.json(getDemoDomainUI(domainID)))
  }),

  rest.put('/api/Domain/UI', async (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ uiImages: [], recordsAffected: 1, ...successEnvelope }),
    )
  }),

  rest.get('/api/domain/ui/configurations', (req, res, ctx) => {
    const domainID = Number(req.url.searchParams.get('domainID') ?? 0)
    const configType = req.url.searchParams.get('configType') as ConfigType
    const items = listConfigurations(domainID, configType)
    return res(
      ctx.status(200),
      ctx.json({ UIConfigurations: items, ...successEnvelope }),
    )
  }),

  rest.get('/api/domain/ui/configuration', (req, res, ctx) => {
    const guid = req.url.searchParams.get('UIconfigGUID') ?? ''
    const config = getConfiguration(guid)
    if (!config) {
      return res(ctx.status(404), ctx.json({ error: { msg: 'not found' } }))
    }
    return res(ctx.status(200), ctx.json({ UIConfiguration: config, ...successEnvelope }))
  }),

  rest.post('/api/domain/ui/configuration', async (req, res, ctx) => {
    const body = await req.json()
    const guid = body.UIconfigGUID as string
    const updated = saveConfiguration(guid, {
      mainBody: body.mainBody,
      configName: body.configName ?? undefined,
      configDescription: body.configDescription ?? undefined,
      authorNote: body.authorNote ?? undefined,
      mainBodyIsValid: body.mainBodyIsValid ?? true,
    })
    if (!updated) {
      return res(ctx.status(404), ctx.json({ error: { msg: 'not found' } }))
    }
    return res(
      ctx.status(200),
      ctx.json({
        recordsAffected: 1,
        configName: updated.configName,
        UIconfigGUID: updated.UIconfigGUID,
        lastModifiedOfstDate: updated.modifiedDate,
        ...successEnvelope,
      }),
    )
  }),

  rest.put('/api/domain/ui/configuration', async (req, res, ctx) => {
    const body = await req.json()
    const guid = body.UIconfigGUID as string
    const updated = body.activeStatus
      ? updateConfigurationStatus(guid, body.activeStatus)
      : saveConfiguration(guid, body)
    if (!updated) {
      return res(ctx.status(404), ctx.json({ error: { msg: 'not found' } }))
    }
    return res(
      ctx.status(200),
      ctx.json({ recordsAffected: 1, ...successEnvelope }),
    )
  }),

  rest.get('/api/Roles', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getDemoRolesResponse()))
  }),

  rest.get('/api/Menu', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getDemoMenuResponse()))
  }),

  rest.get('/api/Menu/Manage', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getDemoMenuManageResponse()))
  }),

  // Catch unmocked API calls so the real network doesn't spin forever.
  rest.get('/api/*', (req, res, ctx) => {
    console.warn('[demo MSW] unhandled GET', req.url.pathname)
    return res(
      ctx.status(200),
      ctx.json({ error: { sts: 0, msg: 'demo stub' }, session: getDemoSession() }),
    )
  }),
]

export const handlers = demoOverrideHandlers
