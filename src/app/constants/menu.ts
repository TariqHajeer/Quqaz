import { UserPermission } from '../shared/auth.roles';
const adminRoot = '/app';
const agentRoot = '/app/agent';

export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
  permission?: UserPermission[];
  badge?: boolean;
  badgeLable?;
  enabled?: boolean;
}

const data: IMenuItem[] = [
  //order
  {
    icon: 'iconsminds-box-close',
    label: 'الطلبات',
    to: `${adminRoot}/order`,
    badge: true,
    permission: [UserPermission.ShowOrder],
    subs: [
      {
        icon: 'iconsminds-box-close',
        label: 'الطلبات ',
        to: `${adminRoot}/order/`,
        permission: [UserPermission.ShowOrder],
        subs: [
          {
            icon: 'iconsminds-box-close',
            label: 'الطلبات الجديدة',
            to: `${adminRoot}/order/neworders`,
            permission: [UserPermission.ShowOrder],
            badge: true,
          },
          {
            icon: 'iconsminds-box-close',
            label: 'عرض الطلبات',
            to: `${adminRoot}/order/`,
            permission: [UserPermission.ShowOrder],
          },
          {
            icon: 'iconsminds-box-close',
            label: ' طلبات عند العميل ',
            to: `${adminRoot}/order/orderswithclient`,
            permission: [UserPermission.AddOrder],
            badge: true,
          },
          {
            icon: 'simple-icon-layers',
            label: 'طلبات تعديل حالة الشحنة',
            to: `${adminRoot}/reports/agentOrderstaterequests`,
            badge: true,
            permission: [UserPermission.ShowOrder],
          },
          {
            icon: 'simple-icon-layers',
            label: 'اعادة ارسال',
            to: `${adminRoot}/order/resend`,
            badge: true,
            permission: [UserPermission.ShowOrder],
          },
        ]
      },

      {
        icon: 'iconsminds-box-close',
        label: 'استلام حالة الشحنة',
        to: `${adminRoot}/order/ReceiptfReceivingShipment`,
        permission: [UserPermission.ShowOrder],
        subs: [
          {
            icon: 'iconsminds-box-close',
            label: 'استلام حالة الشحنة المستلمة ',
            to: `${adminRoot}/reports/ReceiptfReceivingShipment`,
            permission: [UserPermission.ReceiptOfTheStatusOfTheDeliveredShipment],
          },
          {
            icon: 'iconsminds-box-close',
            label: 'استلام حالة الشحنة المرتجعة ',
            to: `${adminRoot}/reports/rejectShipments`,
            permission: [UserPermission.ReceiptOfTheStatusOfTheReturnedShipment],
          },
        ]
      },

      {
        icon: 'iconsminds-box-close',
        label: 'نقل الطلبات ',
        to: `${adminRoot}/order/moveorder`,
        permission: [UserPermission.ShowOrder],
        subs: [
          {
            icon: 'iconsminds-box-close',
            label: 'نقل الطلبات الى مندوب آخر',
            to: `${adminRoot}/reports/changeagentbyorders`,
            permission: [UserPermission.ShowOrder],
          },
          {
            icon: 'iconsminds-box-close',
            label: 'نقل الطلبات الى الفرع التالي',
            to: `${adminRoot}/order/transferToSecondBranch`,
            permission: [UserPermission.ShowOrder],
          },
          {
            icon: 'iconsminds-box-close',
            label: 'الشحنات القادمة من فرع آخر',
            to: `${adminRoot}/order/getOrdersComeToMyBranch`,
            permission: [UserPermission.ShowOrder],
          },
          {
            icon: 'iconsminds-box-close',
            label: 'اعادة الطلبات المرتجعة',
            to: `${adminRoot}/order/GetOrderReturnedToSecondBranch`,
            permission: [UserPermission.ShowOrder],
          },
          {
            icon: 'iconsminds-box-close',
            label: 'استلام الطلبات المرتجعة من فرع اخر',
            to: `${adminRoot}/order/GetOrdersReturnedToMyBranch`,
            permission: [UserPermission.ShowOrder],
          },
          {
            icon: 'iconsminds-box-close',
            label: 'الشحنات المرفوضة من قبل الفرع',
            to: `${adminRoot}/order/getdisapprovedreturnedorderbybranch`,
            permission: [UserPermission.ShowOrder],
          },
        ]

      },


      {
        icon: 'iconsminds-add',
        label: 'إضافة طلب',
        to: `${adminRoot}/order/addorder`,
        permission: [UserPermission.AddOrder],
        subs: [
          {
            icon: 'iconsminds-add',
            label: 'إضافة طلب',
            to: `${adminRoot}/order/addorder`,
            permission: [UserPermission.AddOrder],
          },
          {
            icon: 'iconsminds-add',
            label: 'إضافة طلبات متعددة ',
            to: `${adminRoot}/order/addMulitpleOrders`,
            permission: [UserPermission.AddOrder],
          },
          {
            icon: 'iconsminds-add',
            label: ' إضافة  طلبات متعددة مع المنطقة  ',
            to: `${adminRoot}/order/addMulitpleOrdersWithRegion`,
            permission: [UserPermission.AddOrder],
          },
          {
            icon: 'iconsminds-add',
            label: 'إضافة طلبات متعددة للعميل',
            to: `${adminRoot}/order/addMulitpleOrdersfromClient`,
            permission: [UserPermission.AddOrder],
          },
          {
            icon: 'iconsminds-add',
            label: 'إضافة طلبات متعددة للمندوب',
            to: `${adminRoot}/order/addMulitpleOrdersfromAgent`,
            permission: [UserPermission.AddOrder],
          },
          {
            icon: 'iconsminds-add',
            label: ' إضافة  متعددة للعميل والمندوب',
            to: `${adminRoot}/order/addMulitpleOrdersfromClientandAgent`,
            permission: [UserPermission.AddOrder],
          },
          {
            icon: 'iconsminds-add',
            label: ' إضافة  متعددة للمندوب و المنطقة',
            to: `${adminRoot}/order/addMulitpleOrdersAgentWithRegion`,
            permission: [UserPermission.AddOrder],
          },
        ]
      },
    ],
  },
  //reports
  {
    icon: 'simple-icon-layers',
    label: 'التقارير',
    to: `${adminRoot}/reports`,
    permission: [UserPermission.ShowReports],
    subs: [
      {
        //agent
        icon: 'simple-icon-layers',
        label: 'المندوب',
        to: `${adminRoot}/reports/ShipmentInStock`,
        subs: [
          {
            icon: 'simple-icon-layers',
            label: 'كشف شحنات  في المخزن',
            to: `${adminRoot}/reports/ShipmentInStock`,
            permission: [UserPermission.ShowReports],
          },
          {
            icon: 'simple-icon-layers',
            label: 'كشف شحنات   في الطريق',
            to: `${adminRoot}/reports/Shipmentonway`,
            permission: [UserPermission.ShowReports],
          },
          {
            icon: 'simple-icon-layers',
            label: 'تفاصيل المندوبين ',
            to: `${adminRoot}/reports/AgentStatistics`,
            permission: [UserPermission.ShowReports],
          },
          {
            icon: 'simple-icon-layers',
            label: ' طلبات في ذمة المندوب ',
            to: `${adminRoot}/reports/OrderVicdanAgent`,
            permission: [UserPermission.ShowReports],
          },
          {
            icon: 'simple-icon-layers',
            label: 'عمليات الطباعة ',
            to: `${adminRoot}/reports/agentprint`,
            permission: [UserPermission.PrintAgent],
          },
        ],
      },
      {
        //client
        icon: 'simple-icon-layers',
        label: 'العميل',
        to: `${adminRoot}/reports/Shipmentonway`,
        permission: [UserPermission.ShowReports],
        subs: [
          {
            icon: 'simple-icon-layers',
            label: 'تسديد العميل',
            to: `${adminRoot}/reports/Shipmentsnotbeendelivered`,
            permission: [
              UserPermission.Pay,
              UserPermission.PayInWay,
              UserPermission.PayCompletelyReturned,
              UserPermission.PayPartialReturned,
              UserPermission.PayDelivered,
              UserPermission.PayUnacceptable,
            ],
          },
          {
            icon: 'simple-icon-layers',
            label: 'تسديد الشركات ',
            to: `${adminRoot}/reports/orderincompany`,
            permission: [UserPermission.Pay],
          },
          {
            icon: 'simple-icon-layers',
            label: ' صرف وقبض ',
            to: `${adminRoot}/reports/receiptsandexchanges`,
            permission: [UserPermission.ShowReports],
          },
          {
            icon: 'simple-icon-layers',
            label: 'عمليات الطباعة ',
            to: `${adminRoot}/reports/clientprint`,
            permission: [UserPermission.PrintClient],
          },
        ],
      },
      {
        icon: 'simple-icon-layers',
        label: '   ادارةالصناديق ',
        to: `${adminRoot}/reports/showtreasury`,
        permission: [
          UserPermission.TreasuryManagment,
        ],
        subs: [
          {
            icon: 'simple-icon-layers',
            label: '  الصناديق ',
            to: `${adminRoot}/reports/showtreasury`,
            permission: [
              UserPermission.TreasuryManagment,
            ],
          },
          {
            icon: 'simple-icon-layers',
            label: 'الأخذ والاعطاء',
            to: `${adminRoot}/reports/cashMovment`,
            permission: [
              UserPermission.TreasuryManagment,
            ],
          },
        ],
      },
      {
        icon: 'simple-icon-layers',
        label: ' تقرير استلام حالة الشحنة  ',
        to: `${adminRoot}/reports/showreceiptshipment`,
        permission: [UserPermission.ShowReports],
      },
      {
        icon: 'simple-icon-layers',
        label: ' تقرير الشحنات المنقولة الى فرع اخر  ',
        to: `${adminRoot}/reports/ViewsPrintTransferToSecondBranch`,
        permission: [UserPermission.ShowReports],
      },
      {
        icon: 'simple-icon-layers',
        label: ' أرباح الطلبات ',
        to: `${adminRoot}/order/ProfitsOfOrders`,
        permission: [UserPermission.ShowReports],
      },
      {
        icon: 'simple-icon-layers',
        label: ' الإحصائيات  ',
        to: `${adminRoot}/reports/Statistics`,
        permission: [UserPermission.ShowReports],
      },
      {
        icon: 'simple-icon-layers',
        label: ' القاصة  ',
        to: `${adminRoot}/reports/pay`,
        permission: [UserPermission.ShowReports],
      },
      {
        icon: 'simple-icon-layers',
        label: ' شحنات حسب تاريخ  ',
        to: `${adminRoot}/reports/orderstoday`,
        permission: [UserPermission.ShowReports],
      },
      {
        icon: 'simple-icon-layers',
        label: ' شحنات مرفوضة  ',
        to: `${adminRoot}/reports/ordersUnacceptable`,
        permission: [UserPermission.ShowReports],
      },
    ],
  },
  //clients
  {
    icon: 'simple-icon-people',
    label: 'menu.clients',
    to: `${adminRoot}/client`,
    permission: [UserPermission.ShowClient, UserPermission.AddClient],
    badge: true,
    subs: [
      {
        icon: 'iconsminds-box-close',
        label: 'عرض العملاء',
        to: `${adminRoot}/client/`,
        permission: [UserPermission.ShowClient, UserPermission.AddClient],
      },
      {
        icon: 'simple-icon-people',
        label: 'طلبات تعديل العملاء',
        to: `${adminRoot}/order/editclientorders`,
        permission: [UserPermission.ShowClient],
      },
      {
        icon: 'iconsminds-box-close',
        label: 'طلبات دفع العملاءالجديدة ',
        to: `${adminRoot}/payment/paymentrequest/`,
        badge: true,
        permission: [UserPermission.ShowClient],
      },
      {
        icon: 'iconsminds-box-close',
        label: 'طلبات دفع العملاء ',
        to: `${adminRoot}/payment/oldpaymentrequest/`,
        permission: [UserPermission.ShowClient],
      },
      {
        icon: 'simple-icon-layers',
        label: 'خصم و إعطاء النقاط ',
        to: `${adminRoot}/client/clientPoint`,
        permission: [UserPermission.ShowClient],
      },
    ],
  },
  //store
  {
    icon: 'iconsminds-box-close',
    label: 'المتجر',
    to: `${adminRoot}/store`,
    permission: [UserPermission.ShowOrder],
    subs: [
      {
        icon: 'iconsminds-add',
        label: 'اضافة متجر ',
        to: `${adminRoot}/store/addstore`,
        permission: [UserPermission.ShowOrder],
      },
      {
        icon: 'iconsminds-box-close',
        label: 'عرض المتاجر ',
        to: `${adminRoot}/store/`,
        permission: [UserPermission.ShowOrder],
      },
    ],
  },

  //income tab
  {
    icon: 'iconsminds-inbox-into',
    label: 'menu.income',
    to: `${adminRoot}/income`,
    permission: [UserPermission.ShowIncome, UserPermission.AddIncome],
  },
  //outcom tab
  {
    icon: 'iconsminds-inbox-out',
    label: 'menu.outcome',
    to: `${adminRoot}/outcome`,
    permission: [UserPermission.ShowOutCome, UserPermission.AddOutCome],
  },
  //users
  {
    icon: 'simple-icon-people',
    label: 'menu.employees',
    to: `${adminRoot}/user`,
    permission: [UserPermission.ShowUser, UserPermission.AddUser],
  },
  //setting tab
  {
    icon: 'simple-icon-settings',
    label: 'menu.setting.setting',
    to: `${adminRoot}/setting`,
    permission: [
      UserPermission.ShowCountry,
      UserPermission.AddCountry,
      UserPermission.ShowRegion,
      UserPermission.AddRegion,
      UserPermission.ShowOutComeType,
      UserPermission.AddOutComeType,
      UserPermission.ShowIncomeType,
      UserPermission.AddIncomeType,
      UserPermission.ShowOrderType,
      UserPermission.AddOrderType,
      UserPermission.ShowGroup,
      UserPermission.AddGroup,
    ],
    subs: [
      {
        icon: 'iconsminds-map2',
        label: 'menu.setting.cities',
        to: `${adminRoot}/setting/cities`,
        permission: [UserPermission.ShowCountry, UserPermission.AddCountry],
      },
      {
        icon: 'iconsminds-map2',
        label: 'المدينة الرئيسية',
        to: `${adminRoot}/setting/maincity`,
        permission: [UserPermission.ShowCountry, UserPermission.AddCountry],
      },
      {
        icon: 'iconsminds-map2',
        label: 'ادارة النقاط',
        to: `${adminRoot}/setting/pointsetting`,
        permission: [UserPermission.ShowCountry],
      },
      {
        icon: 'iconsminds-map2',
        label: 'menu.setting.regions',
        to: `${adminRoot}/setting/regions`,
        permission: [UserPermission.ShowRegion, UserPermission.AddRegion],
      },
      {
        icon: 'iconsminds-inbox-out',
        label: 'menu.setting.exportTypes',
        to: `${adminRoot}/setting/exportTypes`,
        permission: [
          UserPermission.ShowOutComeType,
          UserPermission.AddOutComeType,
        ],
      },
      {
        icon: 'iconsminds-inbox-into',
        label: 'menu.setting.importTypes',
        to: `${adminRoot}/setting/importTypes`,
        permission: [
          UserPermission.ShowIncomeType,
          UserPermission.AddIncomeType,
        ],
      },
      {
        icon: 'iconsminds-box-close',
        label: 'menu.setting.shipmentsTypes',
        to: `${adminRoot}/setting/shipmentsTypes`,
        permission: [UserPermission.ShowOrderType, UserPermission.AddOrderType],
      },
      {
        icon: 'simple-icon-people',
        label: 'المجموعات',
        to: `${adminRoot}/setting/group`,
        permission: [UserPermission.ShowGroup, UserPermission.AddGroup],
      },
      {
        icon: 'iconsminds-basket-coins',
        label: 'طرق الدفع',
        to: `${adminRoot}/payment`,
        permission: [UserPermission.ShowIncome],
      },
      {
        icon: 'simple-icon-grid',
        label: 'الأفرع',
        to: `${adminRoot}/setting/Branch`,
      },
    ],
  },
];
export const agentmenu: IMenuItem[] = [
  {
    icon: 'iconsminds-box-close',
    label: 'طلبات التي في المخزن',
    to: `${agentRoot}/instock`,
  },
  {
    icon: 'iconsminds-box-close',
    label: 'طلبات التي في الطريق',
    to: `${agentRoot}/onway`,
  },
  {
    icon: 'iconsminds-box-close',
    label: 'طلبات المعلقة',
    to: `${agentRoot}/Suspended`,
  },

  {
    icon: 'iconsminds-box-close',
    label: 'طلبات في الذمة',
    to: `${agentRoot}/owed`,
  },
  {
    icon: 'iconsminds-box-close',
    label: 'عرض بواسطة الكود',
    to: `${agentRoot}/bycode`,
  },
  {
    icon: 'iconsminds-box-close',
    label: 'الكشوفات',
    to: `${agentRoot}/Report`,
  },
];
export default data;
