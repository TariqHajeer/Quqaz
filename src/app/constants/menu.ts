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
    subs: [
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
        icon: 'iconsminds-box-close',
        label: 'استلام حالة الشحنة ',
        to: `${adminRoot}/reports/ReceiptShipmentAgentComponent`,
      },
      {
        icon: 'iconsminds-add',
        label: 'إضافة طلب',
        to: `${adminRoot}/order/addorder`,
      },
      {
        icon: 'iconsminds-add',
        label: 'إضافة طلبات متعددة ',
        to: `${adminRoot}/order/addMulitpleOrders`,
      },
      {
        icon: 'iconsminds-add',
        label: 'إضافة طلبات متعددة للعميل',
        to: `${adminRoot}/order/addMulitpleOrdersfromClient`,
      },
      // {
      //   icon: 'iconsminds-add',
      //   label: 'طلبات لم يتم سداد مبلغها كاملا',
      //   to: `${adminRoot}/order/OrderNotBeenFullyPaid`,
      // },
      
    ]
  },
  //reports
  {
    icon: 'simple-icon-layers',
    label: 'التقارير',
    to: `${adminRoot}/reports`,
    subs: [
      {//agent
        icon: 'simple-icon-layers',
        label: 'المندوب',
        to: `${adminRoot}/reports/ShipmentInStock`,
        subs: [
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
          {
            icon: 'simple-icon-layers',
            label: 'تفاصيل المندوبين ',
            to: `${adminRoot}/reports/AgentStatistics`,
    
          },
          {
            icon: 'simple-icon-layers',
            label: 'شحنات حسب رقم الطباعة ',
            to: `${adminRoot}/reports/printsetprintnumberagentpreview`,
    
          },
        ]
      },
      {//client
        icon: 'simple-icon-layers',
        label: 'العميل',
        to: `${adminRoot}/reports/Shipmentonway`,
        subs: [
         
         
          {
            icon: 'simple-icon-layers',
            label: 'تسديد العميل',
            to: `${adminRoot}/reports/Shipmentsnotbeendelivered`,
          },
          // {
          //   icon: 'simple-icon-layers',
          //   label: 'ارجاع الشحنات',
          //   to: `${adminRoot}/reports/clientorder`,
          // },
          {
            icon: 'simple-icon-layers',
            label: 'شحنات حسب رقم الطباعة ',
            to: `${adminRoot}/reports/printsetprintnumberclientpreview`,
    
          },
        ]
      },
      
    
      {
        icon: 'simple-icon-layers',
        label: ' أرباح الطلبات ',
        to: `${adminRoot}/order/ProfitsOfOrders`,

      },
      {
        icon: 'simple-icon-layers',
        label: ' الإحصائيات  ',
        to: `${adminRoot}/reports/Statistics`,

      },
      
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
    subs: [
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
      // {
      //   icon: 'iconsminds-coins',
      //   label: 'menu.setting.coins',
      //   to: `${adminRoot}/setting/coins`,
      // }
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
