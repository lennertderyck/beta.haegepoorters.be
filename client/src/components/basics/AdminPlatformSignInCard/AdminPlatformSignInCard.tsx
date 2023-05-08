import { FC } from 'react';
import logoGroepsadministratie from '../../../assets/images/logo_groepsadministratie.png';
import Icon from '../Icon/Icon';
import classNames from 'classnames';

interface Props {
    loading?: boolean;
};

const AdminPlatformSignInCard: FC<Props> = ({ loading }) => {
    return (
        <div className="text-left w-full flex items-center justify-between gap-12">
            <div className={classNames(
                'flex items-center gap-8',
                loading ? 'flex-col' : 'flex-col lg:flex-row'
            )}>
                <img src={ logoGroepsadministratie } alt="" className="w-24 mb-3 lg:mb-0" />
               { !loading ? (
                    <div className="content content--compact text-center xl:text-left">
                        <h3>Aanmelden bij Groepsadministratie</h3>
                        <p className="xl:!mt-0">Beheer je persoonlijke gegevens via onze site</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Icon name="loader-5" className="animate-spin duration-500" />
                        <h3 className="label mt-3">We laden je profiel</h3>
                    </div>
                )
            }
            </div>
           { !loading && (
                <div className="hidden lg:block">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                        <Icon name="arrow-right-s"/>
                    </div>
                </div>
           )}
        </div>
    )
}

export default AdminPlatformSignInCard;