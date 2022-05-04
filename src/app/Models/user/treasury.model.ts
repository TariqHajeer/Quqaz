export class Treasury {
    id: number;
    total: number;
    createOnUtc: Date;
    isActive: boolean;
    History: TreasuryHistory[];
}
export class TreasuryHistory {
    amount: number;
    type: string;
    createdOnUtc: Date;
    clientPaymentId: number;
    cashMovmentId: number;
}
