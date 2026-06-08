import { Endpoints } from '@tyto/client'

export const fixtureClientConfigGet =
  (): Endpoints.Tyto.Configuration.Client.Get.Response => {
    return {
      uploadServices: [
        'https://localhost:8080',
        'https://cherry-upload.mocaworks.com',
      ],
      chatServices: ['EMPTY'],
      encoderServices: ['EMPTY'],
      jsLogService: 'http://ironman.mocaworks.com:7777',
      tytoBuildTag: 'jenkins-KnowledgeVaultDB.Package(Tyto)-801 ',
      paymentEnvironment: 'Sandbox',
      discEnvironment: 'Production',
      onCourseConnectionHash: 'dCSNXqOiHhXkH2Pe55Uwxw==',
      webSocCommandChannelUri: 'wss://cherryservices.mocaworks.com:9999/ws',
      tytoBuildNumber: 801,
    }
  }
