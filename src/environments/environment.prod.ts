// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { UserPermission } from '../app/shared/auth.roles';

export const environment = {
  production: true,
  // baseUrl: "https://backend.quqaz.com/",
  // clientApp:"https://client.quqaz.com",
  baseUrl: "http://mohammedhatem-001-site4.itempurl.com/",
  clientApp:"http://mohammedhatem-001-site6.itempurl.com",
  SCARF_ANALYTICS: false,
  adminRoot: '/',
  apiUrl: 'https://api.coloredstrategies.com',
  defaultMenuType: 'menu-default',
  subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 768,
  themeColorStorageKey: 'vien-themecolor',
  isMultiColorActive: true,
  /*
  Color Options:
  'light.blueyale', 'light.blueolympic', 'light.bluenavy', 'light.greenmoss', 'light.greenlime', 'light.yellowgranola', 'light.greysteel', 'light.orangecarrot', 'light.redruby', 'light.purplemonster'
  'dark.blueyale', 'dark.blueolympic', 'dark.bluenavy', 'dark.greenmoss', 'dark.greenlime', 'dark.yellowgranola', 'dark.greysteel', 'dark.orangecarrot', 'dark.redruby', 'dark.purplemonster'
  */
  defaultColor: 'light.blueyale',
  isDarkSwitchActive: true,
  defaultDirection: 'rtl',
  themeRadiusStorageKey: 'vien-themeradius',
  isAuthGuardActive: false,
  
};
