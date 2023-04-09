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
            <img src="https://play-lh.googleusercontent.com/AkRITJFeOLctUbSmqqg3yJ5bGT0wTqz4drRxE3-l5XYu7ChG4rZihN70DQ8UzD4clw=w480-h960-rw" className="h-8" alt="Logo Kbc" height="35px" />
            <img src="https://play-lh.googleusercontent.com/Qpl8t2yJhMjSHaeyZX8cs5cIV8AePg2Qj726-Zt5IlvPJie1H-E5ipvUhsJ7i2tRWKU=w480-h960-rw" className="h-8" alt="Logo Argenta" height="35px" />
            <img src="https://play-lh.googleusercontent.com/-2Ig9a2k3CIZHJqKcjuPUEu7Z7AoAVqLGyuOdK_-awx5q7Y9bq8PfTcYkeR0eYWqOv0=w480-h960-rw" className="h-8" alt="Logo Belfius" height="35px" />
            <img src="https://play-lh.googleusercontent.com/7_nknvByeVGfQ7XhrY15nlOEbRKJuMmALD7QMtKWS6HS8v4ip5mVbWTX4RVvrwFDSg=w480-h960-rw" className="h-8" alt="Logo ING" height="35px" />
            <img src="https://play-lh.googleusercontent.com/863gXOcEJwXQ9c56Qfk5fznn_h50t5EL4xvdhIQTbM71vr4uTB19AM24QLMoKl784HP-=w480-h960-rw" className="h-8" alt="Logo BNP Paribas" height="35px" />
            <img src="https://play-lh.googleusercontent.com/6WPVi9ORGpfUqmKAXKoCzIQsHtwHD1YNZ85dVWgkKpg98xhOt63Rj4jCDP1rcNg1u0c=w480-h960-rw" className="h-8" alt="Logo VDK" height="35px" />
            {/* <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/ml36ldb4bqmjanut38sr.svg" className="h-7" alt="Logo Kbc" height="35px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/ignqtssujkocqd8oklqr.svg" className="h-7" alt="Logo Argenta" height="35px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/jt41u1euwcfqghiqsw2u.svg" className="h-5" alt="Logo Belfius" height="20px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1632171970/tfak2eyntzba2qtxnei8.svg" className="h-6" alt="Logo ING" height="35px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1569434104/hhoar3wstamzzfg3dcci.svg" className="h-7" alt="Logo BNP Paribas" height="35px" />
            <img src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1680731686/vtd8a2esoi2yajhchyob.svg" className="h-7" alt="Logo VDK" height="35px" /> */}
        </div>
    )
}

export default SupportedBanks;