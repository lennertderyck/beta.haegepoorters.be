import { FC } from 'react';
import { UserAddress, UserContactPerson } from '../../../../types/requests/adminPlatform';
import { Icon } from '../../../../components/basics';

interface Props {
    address: UserAddress;
};

const AddressCard: FC<Props> = ({ address }) => {
    return (
        <div className="flex items-center justify-between bg-gray-100 p-6 rounded-lg">
            <div>
                <h4>{ address.straat } { address.nummer }</h4>
                <p>{ address.gemeente }</p>
            </div>
            { address.postadres && (
                <div className="chip">
                    postadres
                </div>
            )}
        </div>
    )
}

export default AddressCard;