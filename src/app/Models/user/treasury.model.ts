export class Treasury {
    id: number;
    total: number;
    createOnUtc: Date;
    isActive: boolean;
    History: {
        data: TreasuryHistory[],
        total:number
    };
}
export class TreasuryHistory {
    amount: number;
    type: string;
    createdOnUtc: Date;
    clientPaymentId: number;
    cashMovmentId: number;
}
