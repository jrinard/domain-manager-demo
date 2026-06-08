import { TytoData } from '@spacedock/manifest'

export const LINK_MEDIA_OPTIONS: {
  label: string
  value: TytoData.MenuItemLink['media']
}[] = [
  {
    label: 'Screen',
    value: 'screen',
  },
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'None',
    value: '',
  },
]

export const LINK_ENC_TYPE_OPTIONS: {
  label: string
  value: TytoData.MenuItemLink['encType']
}[] = [
  {
    label: 'Form (Standard)',
    value: 'application/x-www-form-urlencoded',
  },
  {
    label: 'JSON',
    value: 'application/json',
  },
  {
    label: 'JavaScript',
    value: 'application/javascript',
  },
]

export const LINK_METHOD_OPTIONS: {
  label: string
  value: TytoData.MenuItemLink['method']
}[] = [
  {
    label: 'Get (Standard)',
    value: 'get',
  },
  {
    label: 'GET (Fetch)',
    value: 'GET',
  },
  {
    label: 'Post',
    value: 'post',
  },
]

export const LINK_TARGET_PREF_OPTIONS: {
  label: string
  value: TytoData.MenuItemLink['targetPref']
}[] = [
  {
    label: 'Top (Standard)',
    value: '_top',
  },
  {
    label: 'Self',
    value: '_self',
  },
  {
    label: 'Blank (New Page)',
    value: '_blank',
  },
  {
    label: 'Iframe',
    value: 'iframe',
  },
]

export const LINK_CONTENT_TYPE_OPTIONS: {
  label: string
  value: TytoData.MenuItemLink['contentType']
}[] = [
  {
    label: 'HTML (Standard)',
    value: 'text/html',
  },
  {
    label: 'JSON',
    value: 'application/json',
  },
  {
    label: 'KVault',
    value: 'application/x-kvault',
  },
]

export const LINK_STANDARD_RELATION_OPTIONS: {
  label: string
  value: TytoData.MenuRelation
}[] = [
  { label: 'Mobile UI', value: 'http://kvau.lt/legacy/mobile/ui' },
  { label: 'Mobile Native', value: 'http://kvau.lt/mobileapp/native' },
  { label: 'Legacy V2 UI', value: 'http://kvau.lt/legacy/v2/ui' },
  { label: 'NL', value: 'http://kvau.lt/nl' },
  { label: 'Default', value: 'http://kvau.lt/default' },
  { label: '_Beta', value: 'http://kvau.lt/_beta' },
  { label: 'Home', value: 'http://kvau.lt/home' },
  { label: 'Client Portal', value: 'http://kvau.lt/clientportal' },
  {
    label: 'Client Portal Mobile',
    value: 'http://kvau.lt/clientportal/mobile',
  },
  { label: 'People Search (API)', value: 'http://kvau.lt/api/search+people' },
  {
    label: 'Platform Review (API)',
    value: 'http://kvau.lt/api/cvPlatformreview/tasks',
  },
  { label: 'Inbox (API)', value: 'http://kvau.lt/api/inbox' },
  { label: 'Playbook (API)', value: 'http://kvau.lt/api/CatalogPlaybook' },
  {
    label: 'Members Search (Legacy API)',
    value: 'http://kvau.lt/legacy/api/search+members',
  },
  {
    label: 'User Inbox (Legacy API)',
    value: 'http://kvau.lt/legacy/api/getuserinbox',
  },
  { label: 'My Account (API)', value: 'http://kvau.lt/api/MyAccount' },
]

export const LINK_NON_API_STANDARD_RELATION_OPTIONS =
  LINK_STANDARD_RELATION_OPTIONS.filter((item) => !item.value.includes('/api/'))

export const STANDARD_RELATIONS = {
  Mobile_UI: 'http://kvau.lt/legacy/mobile/ui',
  Mobile_Native: 'http://kvau.lt/mobileapp/native',
  Legacy_V2_UI: 'http://kvau.lt/legacy/v2/ui',
  NL: 'http://kvau.lt/nl',
  Default: 'http://kvau.lt/default',
  _Beta: 'http://kvau.lt/_beta',
  Home: 'http://kvau.lt/home',
  Client_Portal: 'http://kvau.lt/clientportal',
  Client_Portal_Mobile: 'http://kvau.lt/clientportal/mobile',
}

export const RELATIONS_NL = {
  Default: 'http://kvau.lt/nl/default',
  Beta: 'http://kvau.lt/nl/beta',
  Alpha: 'http://kvau.lt/nl/alpha',
  Development: 'http://kvau.lt/nl/development',
  Legacy: 'http://kvau.lt/nl/legacy',
  Iframe: 'http://kvau.lt/nl/iframe',
}

export const DYNAMIC_HREF_ORIGIN = '%httpserver%'
