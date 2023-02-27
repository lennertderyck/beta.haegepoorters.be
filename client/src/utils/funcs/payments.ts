export const generatePaymentQR = ({ reciever = 'Groepskas', account = 'BE', amount = 0, descr = 'betaling'}) => {
    // const urlBase = 'https://qrcode.tec-it.com/API/QRCode';
    const urlBase = 'https://barcode.tec-it.com/barcode.ashx';
    const separator = '%0a';
    // const rec = reciever + '+HAEGEPOORTERS';
    const bic = 'KREDBEBB';
        
    const dataParts = [
        'BCD',
        '001',
        '1',
        'SCT',
        bic,
        reciever || '',
        account || '',
        amount || 0,
        '', // keep spacer for correct parsing by service
        descr || ''
    ]
    
    const params = {
        'code': 'EPCQRCode',
        'data': dataParts.join(separator),
        'backcolor': '%23ffffff',
        'method': 'image'
    }
    
    const searchParams = Object.entries(params).map((param) => param.join('=')).join('&');
    
    return urlBase + '?' + searchParams;
    
    // return `https://qrcode.tec-it.com/API/QRCode?data=BCD%0a001%0a1%0aSCT%0aKREDBEBB%0a${ reciever }+HAEGEPOORTERS%0a${ account }%0a${ amount }%0a%0a${ descr }&backcolor=%23ffffff&method=image`
}