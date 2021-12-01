export const generatePaymentQR = ({ reciever = 'Groepskas', account = 'BE', amount = 0, descr = 'betaling'}) => {
    return `https://qrcode.tec-it.com/API/QRCode?data=BCD%0a001%0a1%0aSCT%0aKREDBEBB%0a${ reciever }+HAEGEPOORTERS%0a${ account }%0a${ amount }%0a%0a${ descr }&backcolor=%23ffffff&method=image`
}
export const generatePaymentCode = ({ reciever = 'grk', amount = 0, descr }) => {
    const composedString = [reciever, amount, descr].join(';')
    return btoa(composedString)
}

export const decodePaymentCode = (code) => {
    if (!code) return;
    
    const [ reciever, amount, descr ] = atob(code).split(';')
    return {
        reciever,
        amount,
        descr
    }
}