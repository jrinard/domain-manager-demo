import { rest } from 'msw'
import { LoginResetPasswordValidateEndpointResponses } from '@tyto/lore'

export const LoginResetPasswordValidateEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Login/ResetPassword/validate`, (req, res, ctx) => {
      const requiredProps = ['']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              LoginResetPasswordValidateEndpointResponses.invalidMissingRequired(
                prop
              )
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LoginResetPasswordValidateEndpointResponses.get.success())
      )
    }),
  ],
}
