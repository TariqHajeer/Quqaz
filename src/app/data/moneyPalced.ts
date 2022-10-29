import { MoneyPalcedEnum } from '../Models/Enums/MoneyPalcedEnum'
import IIndex from '../shared/interfaces/IIndex'
const moneyPlaceds: IIndex[] = [
    {
        id: MoneyPalcedEnum.OutSideCompany,
        name: 'خارج الشركة'
    },
    {
        id: MoneyPalcedEnum.WithAgent,
        name: 'مندوب'
    },
    {
        id: MoneyPalcedEnum.InsideCompany,
        name: 'داخل الشركة'
    },
    {
        id: MoneyPalcedEnum.Delivered,
        name: 'تم تسليمها'
    },

]
export default moneyPlaceds;
