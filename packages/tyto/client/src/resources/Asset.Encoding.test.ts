import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { PathParams, rest } from 'msw'

import { AssetEncoding } from './Asset.Encoding'
import { Endpoints } from '../typings'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(
  ...[
    rest.post<
      Endpoints.Tyto.Asset.Encoding.PostParameters,
      PathParams,
      Endpoints.Tyto.Asset.Encoding.PostResponse
    >(
      `https://localhost:8080/api${AssetEncoding.endpoint}`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json<Endpoints.Tyto.Asset.Encoding.PostResponse>({
            session: {
              adminID: 0,
              changePassword: false,
              domainID: 0,
              koPermissionSyncDate: '',
              roleID: 0,
              sessionKey: '',
              teamRootID: 0,
              teamListSyncDate: '',
              termsOfServiceSignatureRequired: false,
              timeOutMnts: 0,
              userID: 0,
              userName: '',
            },
            error: { logID: 0, msg: '', sts: 0, technical: '' },
            job: {
              asset: {
                assetDesc: '',
                assetID: 0,
                assetName: '',
                assetType: 'ocAudio',
                courseItemID: 0,
                createdByID: 0,
                createdByName: '',
                createdDate: '',
                domainID: 0,
                encodings: [''],
                modifiedByID: 0,
                modifiedDate: '',
                orientation: '',
                originalMD5: '',
                sequence: 0,
                softwareRequirements: '',
              },
              status: 'Succeeded',
              trasncodeSteps: [
                {
                  firstIn: false,
                  percentComplete: 1,
                  remoteInventory: {
                    createdDate: '',
                    height: 0,
                    isAborting: false,
                    label: '',
                    length: 0,
                    productPath: '',
                    relativeProductPath: '',
                    sourceFileName: '',
                    specialInstructions: '',
                    status: '',
                    statusDate: '',
                    statusDetail: '',
                    technote: '',
                    width: 0,
                    workType: '',
                  },
                  status: 'Succeeded',
                  workType: '',
                },
              ],
            },
          })
        )
      }
    ),
  ]
)

describe('Resource Asset.Encoding', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has get() method returns', async () => {
    const axiosInstance = axios.create({
      baseURL: 'https://localhost:8080/api',
      data: {
        sessionKey: 'key',
      },
    })

    const resource = new AssetEncoding(axiosInstance)

    //
    const result = await resource.post({ assetID: 0 })
    expect(result).toHaveProperty('job.asset.assetType')
  })
})
