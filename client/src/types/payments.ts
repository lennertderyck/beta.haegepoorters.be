export interface GeneratedPayment {
    reciever: string;
    customAccount: string | undefined;
    customReciever: string | undefined;
    description: string | undefined;
    blank: boolean;
    amount: number;
}

export interface Payment extends GeneratedPayment {
    id: string;
}