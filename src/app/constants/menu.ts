import { environment } from 'src/environments/environment';
import { UserPermission } from '../shared/auth.roles';
const adminRoot = '/app';

export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
  permission?: UserPermission[];
}

const data: IMenuItem[] = [


  //setting tab
  {
    icon: 'simple-icon-settings',
    label: 'menu.setting.setting',
    to: `${adminRoot}/setting`,
    subs:[
      {
        icon: 'iconsminds-map2',
        label: 'menu.setting.cities',
        to: `${adminRoot}/setting/cities`,
      },
      {
        icon: 'iconsminds-map2',
        label: 'menu.setting.regions',
        to: `${adminRoot}/setting/regions`,
      },
      {
        icon: 'simple-icon-layers',
        label: 'menu.setting.departments',
        to: `${adminRoot}/setting/departments`,
      },
      {
        icon: 'iconsminds-inbox-out',
        label: 'menu.setting.exportTypes',
        to: `${adminRoot}/setting/exportTypes`,
      },
      {
        icon: 'iconsminds-inbox-into',
        label: 'menu.setting.importTypes',
        to: `${adminRoot}/setting/importTypes`,
      },
      {
        icon: 'iconsminds-box-close',
        label: 'menu.setting.shipmentsTypes',
        to: `${adminRoot}/setting/shipmentsTypes`,
      },
      {
        icon: 'iconsminds-coins',
        label: 'menu.setting.coins',
        to: `${adminRoot}/setting/coins`,
      }
    ]
  },
 //imports tab
 {
  icon: 'iconsminds-inbox-into',
  label: 'menu.imports',
  to: `${adminRoot}/setting`,
},
 //exports tab
 {
  icon: 'iconsminds-inbox-out',
  label: 'menu.exports',
  to: `${adminRoot}/setting`,
},
 //exports tab
 {
  icon: 'iconsminds-inbox-out',
  label: 'menu.employees',
  to: `${adminRoot}/setting`,
},
 //employees
 {
  icon: 'simple-icon-people',
  label: 'menu.employees',
  to: `${adminRoot}/setting`,
},




];
export default data;
