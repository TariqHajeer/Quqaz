import { MoneyPalcedEnum } from '../Models/Enums/MoneyPalcedEnum'
export interface IMoneyPalced {
    id: number;
    name: string;
}
const data: IMoneyPalced[] = [
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
export default data;
