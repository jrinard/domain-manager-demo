export class NotDownloadable extends Error {
  constructor() {
    super('No encoding available for download')
  }
}
