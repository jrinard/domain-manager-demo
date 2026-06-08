import { rest } from 'msw'
import { DomainUIConfigurationLibraryImageUploadEndpointResponses } from '@tyto/lore'

export const DomainUIConfigurationLibraryImageUploadEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(
      `${baseUrl}/api/domain/ui/configuration/library/imageUpload`,
      async (req, res, ctx) => {
        const requiredProps = ['UIconfigGUID', 'domainID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (!body[prop]) {
            return res(
              ctx.status(400),
              ctx.json({ error: `${prop} is required` }),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            DomainUIConfigurationLibraryImageUploadEndpointResponses.post.success(),
          ),
        )
      },
    ),
  ],
}
