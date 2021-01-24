export class CreateIncome {
    /**
     *
     */
    constructor() {
        this.Date= new Date();
    }
    Id:number
    Amount:number;
    Date:Date;
    Source:string;
    Earining:number;
    Note:string;
    IncomeTypeId:number;
    CurrencyId:number;
}
