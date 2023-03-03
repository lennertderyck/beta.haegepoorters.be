import { FC } from 'react';
import { Button, Loader } from '../../../../components/basics';
import classNames from 'classnames';

interface Props {
    imageUrl: string;
    bouncing?: boolean;
};

const QRCodePreview: FC<Props> = ({ imageUrl, bouncing }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative"> 
                <img src={ imageUrl } width={ 110 } className={classNames(bouncing && 'opacity-20')} />
                { bouncing && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Loader />
                    </div>
                )}
            </div>
            <div className=" text-center md:text-left">
                <h3 className="font-serif">Scan met je bank app</h3>
                <p className="text-sm">Je kan deze qr-code scannen met de app<br/>van onderstaande banken</p>
                <Button theme="simple" className="mt-4 mx-auto md:mx-0" icon="download" href={ imageUrl + '&download=true&qunit=Mm&quiet=3&eclevel=M' } download target="_self">Download QR code</Button>
            </div>
        </div>
    )
}

export default QRCodePreview;