import {OrderplacedEnum} from '../Models/Enums/OrderplacedEnum'
export interface IOrderPalced{
    id:number;
    name:string;
}
const data:IOrderPalced[]=[
    {
        id:OrderplacedEnum.Client,
        name:"عند العميل"
    },
    {
        id:OrderplacedEnum.Store,
        name:"في المخزن"
    },
    {
        id:OrderplacedEnum.Way,
        name:"في الطريق"
    },
    {
        id:OrderplacedEnum.Delivered,
        name:"تم التسليم"
    },
    {
        id:OrderplacedEnum.CompletelyReturned,
        name:"مرتجع كلي"
    },
    {
        id:OrderplacedEnum.PartialReturned,
        name:"مرتجع جزئي"
    },
    
    {
        id:OrderplacedEnum.Unacceptable,
        name:"مرفوض"
    },
    {
        id:OrderplacedEnum.Delayed,
        name:"مؤجل"
    },
]