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
  badge?:boolean
  badgeLable?
}

const data: IMenuItem[] = [


  //order
  {
    icon: 'iconsminds-box-close',
    label: 'الطلبات',
    to: `${adminRoot}/order`,
    badge:true,
    subs: [
      {
        icon: 'iconsminds-box-close',
        label: 'الطلبات الجديدة',
        to: `${adminRoot}/order/neworders`,
        //permission:[UserPermission.ShowOrder]

      },

      {
        icon: 'iconsminds-box-close',
        label: 'عرض الطلبات',
        to: `${adminRoot}/order/`,
        //permission:[UserPermission.ShowOrder]

      },
      {
        icon: 'iconsminds-box-close',
        label: 'استلام حالة الشحنة ',
        to: `${adminRoot}/reports/ReceiptShipmentAgentComponent`,
        //permission:[UserPermission.AddOrder]

      },
      {
        icon: 'iconsminds-box-close',
        label: 'نقل الطلبات ',
        to: `${adminRoot}/order/moveorder`,
        //permission:[UserPermission.AddOrder]

      },
      {
        icon: 'iconsminds-add',
        label: 'إضافة طلب',
        to: `${adminRoot}/order/addorder`,
        //permission:[UserPermission.AddOrder]

      },
      {
        icon: 'iconsminds-add',
        label: 'إضافة طلبات متعددة ',
        to: `${adminRoot}/order/addMulitpleOrders`,
        //permission:[UserPermission.AddOrder]

      },
      {
        icon: 'iconsminds-add',
        label: 'إضافة طلبات متعددة للعميل',
        to: `${adminRoot}/order/addMulitpleOrdersfromClient`,
        //permission:[UserPermission.AddOrder]

      },
      {
        icon: 'iconsminds-add',
        label: 'إضافة طلبات متعددة للمندوب',
        to: `${adminRoot}/order/addMulitpleOrdersfromAgent`,
        //permission:[UserPermission.AddOrder]

      },
      {
        icon: 'iconsminds-add',
        label: ' إضافة  متعددة للعميل والمندوب',
        to: `${adminRoot}/order/addMulitpleOrdersfromClientandAgent`,
        //permission:[UserPermission.AddOrder]

      },
      // {
      //   icon: 'iconsminds-add',
      //   label: 'طلبات لم يتم سداد مبلغها كاملا',
      //   to: `${adminRoot}/order/OrderNotBeenFullyPaid`,
      // },
      
    ],
    //permission:[UserPermission.ShowOrder]

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
            //permission:[UserPermission.ShowOrder]

          },
          {
            icon: 'simple-icon-layers',
            label: 'كشف شحنات   في الطريق',
            to: `${adminRoot}/reports/Shipmentonway`,
            //permission:[UserPermission.ShowOrder]

          },
          {
            icon: 'simple-icon-layers',
            label: 'تفاصيل المندوبين ',
            to: `${adminRoot}/reports/AgentStatistics`,
            //permission:[UserPermission.ShowOrder]

          },
          {
            icon: 'simple-icon-layers',
            label: ' طلبات في ذمة المندوب ',
            to: `${adminRoot}/reports/OrderVicdanAgent`,
            //permission:[UserPermission.ShowOrder]

          },
          // {
          //   icon: 'simple-icon-layers',
          //   label: 'شحنات حسب رقم الطباعة ',
          //   to: `${adminRoot}/reports/printsetprintnumberagentpreview`,
          //   //permission:[UserPermission.ShowOrder]

          // },
          {
            icon: 'simple-icon-layers',
            label: 'عمليات الطباعة ',
            to: `${adminRoot}/reports/agentprint`,
            //permission:[UserPermission.ShowOrder]

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
            //permission:[UserPermission.ShowOrder]

          },
          {
            icon: 'simple-icon-layers',
            label: 'تسديد الشركات ',
            to: `${adminRoot}/reports/orderincompany`,
            //permission:[UserPermission.ShowOrder]

          },
          // {
          //   icon: 'simple-icon-layers',
          //   label: 'ارجاع الشحنات ',
          //   to: `${adminRoot}/reports/clientorder`,
          //   //permission:[UserPermission.ShowOrder]

          // },
          {
            icon: 'simple-icon-layers',
            label: ' صرف وقبض ',
            to: `${adminRoot}/reports/receiptsandexchanges`,
          },
          // {
          //   icon: 'simple-icon-layers',
          //   label: 'شحنات حسب رقم الطباعة ',
          //   to: `${adminRoot}/reports/printsetprintnumberclientpreview`,
          //   //permission:[UserPermission.ShowOrder]

    
          // },
          {
            icon: 'simple-icon-layers',
            label: 'عمليات الطباعة ',
            to: `${adminRoot}/reports/clientprint`,
            //permission:[UserPermission.ShowOrder]

    
          },
        ]
      },
      
    
      {
        icon: 'simple-icon-layers',
        label: ' أرباح الطلبات ',
        to: `${adminRoot}/order/ProfitsOfOrders`,
        //permission:[UserPermission.ShowOrder]


      },
      {
        icon: 'simple-icon-layers',
        label: ' الإحصائيات  ',
        to: `${adminRoot}/reports/Statistics`,
        //permission:[UserPermission.ShowOrder]
      },
      {
        icon: 'simple-icon-layers',
        label: ' القاصة  ',
        to: `${adminRoot}/reports/pay`,
        //permission:[UserPermission.ShowOrder]
      },
      {
        icon: 'simple-icon-layers',
        label: ' شحنات حسب تاريخ  ',
        to: `${adminRoot}/reports/orderstoday`,
        //permission:[UserPermission.ShowOrder]
      },
      {
        icon: 'simple-icon-layers',
        label: ' شحنات مرفوضة  ',
        to: `${adminRoot}/reports/ordersUnacceptable`,
        //permission:[UserPermission.ShowOrder]
      },
    ]
  },
  //clients 
  {
    icon: 'simple-icon-people',
    label: 'menu.clients',
    to: `${adminRoot}/client`,
    badge:true,
    subs: [
     

      {
        icon: 'iconsminds-box-close',
        label: 'عرض العملاء',
        to: `${adminRoot}/client/`,
        //permission:[UserPermission.ShowOrder]

      },
      {
        icon: 'simple-icon-people',
        label: 'طلبات تعديل العملاء',
        to: `${adminRoot}/order/editclientorders`,
        //permission:[UserPermission.ShowClient]
    
      },
      {
        icon: 'iconsminds-box-close',
        label: 'طلبات دفع العملاءالجديدة ',
        to: `${adminRoot}/payment/paymentrequest/`,
        //permission:[UserPermission.ShowOrder]

      },
      {
        icon: 'iconsminds-box-close',
        label: 'طلبات دفع العملاء ',
        to: `${adminRoot}/payment/oldpaymentrequest/`,
        //permission:[UserPermission.ShowOrder]

      },

      
    ],
    //permission:[UserPermission.ShowClient]

  },
  
  //store
  {
    icon: 'iconsminds-box-close',
    label: 'المتجر',
    to: `${adminRoot}/store`,
    subs: [
      {
        icon: 'iconsminds-add',
        label: 'اضافة متجر ',
        to: `${adminRoot}/store/addstore`,
        //permission:[UserPermission.ShowOrder]

      },
      {
        icon: 'iconsminds-box-close',
        label: 'عرض المتاجر ',
        to: `${adminRoot}/store/`,
        //permission:[UserPermission.ShowOrder]

      },

     
     
    ],

  },
   //payment tab paymentrequest
   {
    icon: 'iconsminds-basket-coins',
    label: 'طرق الدفع',
    to: `${adminRoot}/payment`,
    // subs: [
    //   {
    //     icon: 'iconsminds-add',
    //     label: ' طرق الدفع ',
    //     to: `${adminRoot}/payment`,
    //     //permission:[UserPermission.ShowOrder]

    //   },
     
     
     
    // ],
    //permission:[UserPermission.ShowOutCome]

  },
  //income tab
  {
    icon: 'iconsminds-inbox-into',
    label: 'menu.income',
    to: `${adminRoot}/income`,
    //permission:[UserPermission.ShowIncome]

  },
  //outcom tab
  {
    icon: 'iconsminds-inbox-out',
    label: 'menu.outcome',
    to: `${adminRoot}/outcome`,
    //permission:[UserPermission.ShowOutCome]

  },
  //users
  {
    icon: 'simple-icon-people',
    label: 'menu.employees',
    to: `${adminRoot}/user`,
    //permission:[UserPermission.ShowUser]

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
        //permission:[UserPermission.ShowCountry]

      },
      {
        icon: 'iconsminds-map2',
        label: 'المدينة الرئيسية',
        to: `${adminRoot}/setting/maincity`,
        //permission:[UserPermission.ShowCountry]

      },
      {
        icon: 'iconsminds-map2',
        label: 'menu.setting.regions',
        to: `${adminRoot}/setting/regions`,
        //permission:[UserPermission.ShowRegion]

      },

      {
        icon: 'iconsminds-inbox-out',
        label: 'menu.setting.exportTypes',
        to: `${adminRoot}/setting/exportTypes`,
        //permission:[UserPermission.ShowOutComeType]

      },
      {
        icon: 'iconsminds-inbox-into',
        label: 'menu.setting.importTypes',
        to: `${adminRoot}/setting/importTypes`,
        //permission:[UserPermission.ShowIncomeType]

      },
      {
        icon: 'iconsminds-box-close',
        label: 'menu.setting.shipmentsTypes',
        to: `${adminRoot}/setting/shipmentsTypes`,
        //permission:[UserPermission.ShowOrderType]

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
        //permission:[UserPermission.ShowGroup]

      }
    ]
  },



];
export default data;
