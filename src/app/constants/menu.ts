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


  //order
{
  icon: 'iconsminds-box-close',
  label: 'الطلبات',
  to: `${adminRoot}/order`,
  subs:[
    {
      icon: 'iconsminds-box-close',
      label: 'الطلبات الجديدة',
      to: `${adminRoot}/order/neworders`,
     
    },
    {
      icon: 'iconsminds-box-close',
      label: 'عرض الطلبات',
      to: `${adminRoot}/order/`,
    },
    {
      icon: 'iconsminds-add',
      label: 'إضافة طلب',
      to: `${adminRoot}/order/addorder`,
    },
    {
      icon: 'iconsminds-add',
      label: 'إضافة طلبات متعددة',
      to: `${adminRoot}/order/addMulitpleOrders`,
    },
  ]
},
 //reports
 {
  icon: 'simple-icon-layers',
  label: 'التقارير',
  to: `${adminRoot}/reports`,
  subs:[
    {
      icon: 'simple-icon-layers',
      label: 'المندوب',
      to: `${adminRoot}/reports/ShipmentInStock`,
      subs:[
        {
          icon: 'simple-icon-layers',
          label: 'كشف شحنات  في المخزن',
          to: `${adminRoot}/reports/ShipmentInStock`,
        },
        {
          icon: 'simple-icon-layers',
      label: 'كشف شحنات   في الطريق',
      to: `${adminRoot}/reports/Shipmentonway`,
        },
      ]
    },
    {
      icon: 'simple-icon-layers',
      label: 'العميل',
      to: `${adminRoot}/reports/Shipmentonway`,
      subs:[
        // {
        //   icon: 'simple-icon-layers',
        //   label: ' كشف   شحنات  داخل الشركة',
        //   to: `${adminRoot}/reports/clientinsidecompany`,
        // },
        {
          icon: 'simple-icon-layers',
          label: 'كشف الشحنات الغير مسلم مبلغها',
          to: `${adminRoot}/reports/Shipmentsnotbeendelivered`,
        },
      ]
    },
    // {
    //   icon: 'simple-icon-layers',
    //   label: ' كشف   شحنات العميل في المخزن',
    //   to: `${adminRoot}/reports/clientorder`,
    // },
    // {
    //   icon: 'simple-icon-layers',
    //   label: ' كشف   شحنات العميل في الطريق',
    //   to: `${adminRoot}/reports/clientorderonway`,
    // },
    
    
  ]
},
   //clients  
 {
  icon: 'simple-icon-people',
  label: 'menu.clients',
  to: `${adminRoot}/client`,
},
 //income tab
 {
  icon: 'iconsminds-inbox-into',
  label: 'menu.income',
  to: `${adminRoot}/income`,
},
 //outcom tab
 {
  icon: 'iconsminds-inbox-out',
  label: 'menu.outcome',
  to: `${adminRoot}/outcome`,
},
//users
{
  icon: 'simple-icon-people',
  label: 'menu.employees',
  to: `${adminRoot}/user`,
},

 
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
    ,
    {
      icon: 'simple-icon-layers',
      label: 'المجموعات',
      to: `${adminRoot}/setting/group`,
    }
  ]
},



];
export default data;
