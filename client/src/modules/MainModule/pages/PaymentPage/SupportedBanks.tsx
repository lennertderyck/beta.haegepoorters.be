import classNames from 'classnames';
import { FC } from 'react';

interface Props {
    align?: 'start' | 'center';
};

const SupportedBanks: FC<Props> = ({ align = 'center' }) => {
    const alignmentClassMapping = {
        'start': 'justify-start',
        'center': 'justify-center'
    }
    
    return (
        <div className={classNames(
            'flex flex-wrap items-center gap-4',
            alignmentClassMapping[align]
        )}>
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/ml36ldb4bqmjanut38sr.svg" className="h-7" alt="Logo Kbc" height="35px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/ignqtssujkocqd8oklqr.svg" className="h-7" alt="Logo Argenta" height="35px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/jt41u1euwcfqghiqsw2u.svg" className="h-5" alt="Logo Belfius" height="20px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1632171970/tfak2eyntzba2qtxnei8.svg" className="h-6" alt="Logo ING" height="35px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/hhoar3wstamzzfg3dcci.svg" className="h-7" alt="Logo BNP Paribas" height="35px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1680731686/vtd8a2esoi2yajhchyob.svg" className="h-7" alt="Logo VDK" height="35px" />
        </div>
    )
}

export default SupportedBanks;