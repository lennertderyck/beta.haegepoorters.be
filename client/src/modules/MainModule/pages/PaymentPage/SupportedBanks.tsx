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
    
    const banks = {
        'KBC': 'https://play-lh.googleusercontent.com/AkRITJFeOLctUbSmqqg3yJ5bGT0wTqz4drRxE3-l5XYu7ChG4rZihN70DQ8UzD4clw=w480-h960-rw',
        'Argenta': 'https://play-lh.googleusercontent.com/Qpl8t2yJhMjSHaeyZX8cs5cIV8AePg2Qj726-Zt5IlvPJie1H-E5ipvUhsJ7i2tRWKU=w480-h960-rw',
        'Belfius': 'https://play-lh.googleusercontent.com/-2Ig9a2k3CIZHJqKcjuPUEu7Z7AoAVqLGyuOdK_-awx5q7Y9bq8PfTcYkeR0eYWqOv0=w480-h960-rw',
        'ING': 'https://play-lh.googleusercontent.com/7_nknvByeVGfQ7XhrY15nlOEbRKJuMmALD7QMtKWS6HS8v4ip5mVbWTX4RVvrwFDSg=w480-h960-rw',
        'BNP Paribas': 'https://play-lh.googleusercontent.com/863gXOcEJwXQ9c56Qfk5fznn_h50t5EL4xvdhIQTbM71vr4uTB19AM24QLMoKl784HP-=w480-h960-rw',
        'VDK': 'https://play-lh.googleusercontent.com/6WPVi9ORGpfUqmKAXKoCzIQsHtwHD1YNZ85dVWgkKpg98xhOt63Rj4jCDP1rcNg1u0c=w480-h960-rw',
    }
    
    return (
        <div className={classNames(
            'flex flex-wrap items-center gap-4',
            alignmentClassMapping[align]
        )}>
            { Object.entries(banks).map(([ bankName, appLogo ], index) => (
                <img 
                    key={ index } 
                    src={ appLogo } 
                    className="h-8 rounded-md" 
                    alt={`logo ${ bankName }`} 
                    height="35px"
                />
            ))}
        </div>
    )
}

export default SupportedBanks;