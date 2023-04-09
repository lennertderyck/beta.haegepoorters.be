import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'
import { GeneratedPayment, Payment } from "../../../types/payments";

interface PaymentsStore {
    payments: Payment[];
    
    create: (details: GeneratedPayment) => Payment;
    delete: (paymentId: string) => void;
    update: (paymentId: string, details: GeneratedPayment) => Payment | undefined;
    findById: (paymentId: string) => Payment | undefined;
    
    controlled: (paymentId?: string) => {
        payment: GeneratedPayment | undefined;
        update: PaymentsStore['update'];
    };
}

const usePaymentsStore = create(
    persist(
        immer<PaymentsStore>(
            (set, get) => ({
                payments: [],
                
                create: (details) => {
                    const id = crypto.randomUUID();
                    const newPayment = {
                        id,
                        ...details
                    }
                    
                    set((store) => {
                        store.payments.push(newPayment)
                    })
                    
                    return newPayment;
                },
                
                delete: (paymentId) => set((store) => {
                    store.payments.filter((payment) => payment.id !== paymentId)
                }),
                
                update: (paymentId, details) => {
                    const store = get();
                    const previousState = store.findById(paymentId);
                    
                    if (previousState) {
                        const index = store.payments.findIndex((payment) => payment.id === paymentId);
                        const updatedPayment = {
                            ...previousState,
                            ...details
                        }
                        
                        set((store) => {
                            store.payments[index] = updatedPayment;
                        })
                        
                        return updatedPayment;
                    } else throw new Error('Payment doens\'t exist');
                },
                
                findById: (paymentId) => {
                    const store = get();
                    const payments = store.payments;
                    return payments.find((payment) => payment.id === paymentId);
                },
                
                controlled: (paymentId) => {
                    const store = get();
                    
                    return {
                        payment: paymentId ? store.findById(paymentId) : undefined,
                        update: store.update
                    }
                },
            })
        ), {
            name: 'storedGeneratedPayments'
        }
    )
);

export default usePaymentsStore