// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { UserPermission } from '../app/shared/auth.roles';

export const environment = {
  // baseUrl: "http://tariqhajeer2-001-site1.etempurl.com/",
  baseUrl:"https://localhost:44333/",
  production: true,
  SCARF_ANALYTICS: false,
  adminRoot: '/app',
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
  //defaultRole: UserPermission.Admin,
  // firebase: {
  //   apiKey: 'AIzaSyCqoNLB_jTw4nncO12qR-eDH9gAeWiZVaw',
  //   authDomain: 'vien-angular-login.firebaseapp.com',
  //   databaseURL: 'https://vien-angular-login.firebaseio.com',
  //   projectId: 'vien-angular-login',
  //   storageBucket: 'vien-angular-login.appspot.com',
  //   messagingSenderId: '16217062888',
  //   appId: '1:16217062888:web:6b08232ca0c9662fedb85d',
  //   measurementId: 'G-8ETT79WRRN'
  // }
};
