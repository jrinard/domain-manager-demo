import { Resource } from '../utils/helpers'

type ElementType = 'ocNOTICE' | 'ocDEVPLAN' | 'ocBLOCK'

export interface CatalogItemDeleteParameters {
  catalogID: number
  locID?: number
}

export interface CatalogItemDeleteResponse {
  recordsAffected: number
}

export interface CatalogItemPostParameters {
  locID: number
  ocType: ElementType
  parentCatalogID?: number
}

export interface CatalogItemPostResponse {
  recordsAffected: number
  catalogID: number
}

export interface CatalogItemPutParameters {
  parentCatalogID?: number
  catalogID: number
}

export interface CatalogItemPutResponse {
  recordsAffected: number
  catalogID: number
}

export class CatalogItem extends Resource {
  override endpoint = '/CatalogItem'

  delete({ locID, catalogID }: CatalogItemDeleteParameters) {
    return new Promise<CatalogItemDeleteResponse>((res, rej) => {
      this.axiosInstance
        .delete<CatalogItemDeleteResponse>(this.endpoint, {
          data: {
            locID,
            catalogID,
          },
        })
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }

  /**
   *    RETURN -310 '@ParentCatalogID record not found'
   *    RETURN -312 'parent catalog activeStatus must equal ocENABLED'
   *    RETURN -313 'parent catalog must be a @CatalogItemType = ocCATALOG to contain child catalog'
   *    RETURN -321 '@CatalogItemType and @CatalogItemID do not match elementid and elementType '
   *    RETURN -321 '@CatalogItemType and @CatalogItemID do not match @CatalogItemType ocTASK '
   *    RETURN -321 '@CatalogItemType and @CatalogItemID do not match @CatalogItemType ocNOTICE '
   *    RETURN -320 'Unsupported @CatalogItemType:' + @CatalogItemType
   *    RETURN -315 'Only container catalogs can exist at the root. @CatalogItemType must equal ocCATALOG when ParentCatalog = 0'
   *    RETURN -316 '@elementSubType cannot be empty when adding a root catalog: ocSHAREDSERVICE ocCURRICULUMPUB ocCURRICULUMDEV'
   *    RETURN -301 'invalid @primaryElementID'
   *    RETURN -341  'An identical item already exists in the catalog '
   *
   * Not setting the `parentCatalogID` will result in it being uncategorized
   */
  post({
    locID,
    parentCatalogID,
    ocType = 'ocNOTICE',
  }: CatalogItemPostParameters) {
    return new Promise<CatalogItemPostResponse>((res, rej) => {
      this.axiosInstance
        .post<CatalogItemPostResponse>(this.endpoint, {
          locID,
          parentCatalogID,
          ocType,
        })
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }

  put({
    catalogID,
    parentCatalogID,
  }: CatalogItemPutParameters): Promise<CatalogItemPutResponse> {
    return new Promise<CatalogItemPutResponse>((res, rej) => {
      this.axiosInstance
        .put<CatalogItemPutResponse>(this.endpoint, {
          catalogID,
          parentCatalogID,
        })
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }
}
