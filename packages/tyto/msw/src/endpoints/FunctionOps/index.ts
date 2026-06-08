import { rest } from 'msw'
import { FunctionOpsEndpointResponses } from '@tyto/lore'

export const FunctionOpsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Function/Ops`, (req, res, ctx) => {
      const requiredProps = ['functionName', 'operation']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(FunctionOpsEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(FunctionOpsEndpointResponses.get.success()),
      )
    }),
  ],
}
