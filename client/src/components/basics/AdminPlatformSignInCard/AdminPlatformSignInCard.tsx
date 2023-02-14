import { FC } from 'react';
import logoGroepsadministratie from '../../../assets/images/logo_groepsadministratie.png';
import Icon from '../Icon/Icon';

interface Props {};

const AdminPlatformSignInCard: FC<Props> = () => {
    return (
        <div className="text-left w-full flex items-center justify-between gap-12">
            <div className="flex flex-col lg:flex-row items-center gap-6">
                <img src={ logoGroepsadministratie } alt="" className="w-24 mb-3 lg:mb-0" />
                <div className="content">
                    <h3>Aanmelden bij Groepsadministratie</h3>
                    <p className="!mt-0">Beheer je persoonlijke gegevens via onze site</p>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <Icon name="arrow-right-s"/>
                </div>
            </div>
        </div>
    )
}

export default AdminPlatformSignInCard;