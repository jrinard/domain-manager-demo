import { demoAssets } from '../demo/demoAssetPaths'
import { getDemoSession } from './demoStore'

type MenuItem = {
  functionID: number
  displayName: string
  functionName: string
  iconPath: string
  iconPathLarge: string
  iconName: string
  menuGroup: string
  links: {
    encType: string
    contentType: string
    href: string
    media: string
    method: string
    targetPref: string
    title: string
    parameters: unknown[]
    rel: string[]
  }[]
  param1Desc: string
  param2Desc: string
  param3Desc: string
  param4Desc: string
  longName: string
}

function menuItem(
  functionID: number,
  displayName: string,
  iconPath: string,
  iconPathLarge: string,
): MenuItem {
  return {
    functionID,
    displayName,
    functionName: displayName.replace(/\s+/g, ''),
    iconPath,
    iconPathLarge,
    iconName: '',
    menuGroup: '/',
    links: [
      {
        encType: 'application/x-www-form-urlencoded',
        contentType: 'text/html',
        href: '#',
        media: 'screen',
        method: 'get',
        targetPref: '_top',
        title: displayName,
        parameters: [],
        rel: [],
      },
    ],
    param1Desc: '',
    param2Desc: '',
    param3Desc: '',
    param4Desc: '',
    longName: '',
  }
}

/** Portfolio demo Menu API — local assets only, no lore/Cherry. */
export function getDemoMenuResponse() {
  const a = demoAssets
  return {
    menuItems: [
      menuItem(24, 'Statistics', a.menuIconSmall('statistics.png'), a.menuIcon('Statistics.png')),
      menuItem(37, 'Inbox', a.menuIconSmall('inbox.png'), a.menuIcon('CEO Icons_inbox.png')),
      menuItem(48, 'Library', a.menuIconSmall('library.png'), a.menuIcon('CEO Icons_library.png')),
      menuItem(49, 'Teamboards', a.menuIcon('Team.png'), a.menuIcon('CEO Icons_teamboards.png')),
      menuItem(50, 'News', a.menuIconSmall('news.png'), a.menuIcon('News.png')),
      menuItem(51, 'Search', a.menuIconSmall('search.png'), a.menuIcon('search-2.png')),
      menuItem(55, 'Manage', a.menuIconSmall('manage.png'), a.menuIcon('Manage.png')),
      menuItem(67, 'Training', a.menuIconSmall('training.png'), a.menuIcon('CEO Icons_training.png')),
      menuItem(68, 'Reports', a.menuIconSmall('statistics.png'), a.menuIcon('Statistics.png')),
      menuItem(73, 'To Do', a.menuIconSmall('to dos.png'), a.menuIcon('CEO Icons_to do.png')),
      menuItem(99, 'Calendar', a.menuIconSmall('events.png'), a.menuIcon('CEO Icons_events.png')),
      menuItem(101, 'Bug', '', a.menuIcon('Bug.png')),
      menuItem(107, 'Team', '', a.menuIcon('Team.png')),
      menuItem(114, 'R3', a.menuIcon('r3-logo.png'), a.menuIcon('CEO Icons_R3.png')),
      menuItem(117, 'VCEP', a.menuIconSmall('VCEP.png'), a.menuIcon('VCEP-Editor.png')),
      menuItem(118, 'PPF', a.menuIconSmall('PPF.png'), a.menuIcon('ppf-logo.png')),
      menuItem(119, '10X Plan', a.menuIconSmall('10X Action Plan.png'), a.menuIcon('10X.png')),
      menuItem(121, 'Dashboard', '', a.menuIcon('Dashboard.png')),
      menuItem(122, 'News Admin', a.menuIconSmall('news.png'), a.menuIcon('News.png')),
      menuItem(123, 'Security Roles', '', a.menuIcon('icon-security-role.png')),
      menuItem(124, '10X Team Plus', '', a.menuIcon('10X-Employee-Team-Plus.png')),
      menuItem(125, 'Ability List', '', a.menuIcon('Ability-List.png')),
      menuItem(126, 'Event Templates', '', a.menuIcon('Event-Templates.png')),
      menuItem(127, 'Courses', '', a.menuIcon('Courses.png')),
      menuItem(128, 'Credit Types', '', a.menuIcon('Credit-Types.png')),
      menuItem(129, 'Plan Templates', '', a.menuIcon('Plan-Templates.png')),
      menuItem(130, 'Catalog', '', a.menuIcon('Catalog.png')),
      menuItem(131, 'Catalog Admin', '', a.menuIcon('Catalog.png')),
      menuItem(132, 'Category Manager', '', a.menuIcon('Category-Manager.png')),
      menuItem(133, 'Exams', '', a.menuIcon('Exams.png')),
      menuItem(134, 'Surveys', '', a.menuIcon('Surveys.png')),
      menuItem(135, 'TPA', '', a.menuIcon('TPA.png')),
      menuItem(150, 'Projects', a.menuIconSmall('projects.png'), a.menuIcon('Projects.png')),
      menuItem(155, 'Service Request', '', a.menuIcon('icon-service-request.png')),
      menuItem(156, 'Playbook', '', a.menuIcon('icon-playbook.png')),
      menuItem(161, 'Restore User', '', a.menuIcon('icon-restore-user.png')),
    ],
    session: getDemoSession(),
  }
}

export function getDemoMenuManageResponse() {
  return {
    menuItems: [
      menuItem(24, 'Statistics', demoAssets.menuIconSmall('statistics.png'), demoAssets.menuIcon('Statistics.png')),
      menuItem(55, 'Manage', demoAssets.menuIconSmall('manage.png'), demoAssets.menuIcon('Manage.png')),
    ],
    session: getDemoSession(),
  }
}
