import { FC, useMemo, useState } from 'react';
import Input from '../../../../components/basics/Input/Input';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { ExpansionPane } from '../../../../components/basics';


const contactRecievers = [
    { id: 'grl', label: 'Groepsleiding', prefix: 'groepsleiding' },
    { id: 'vzw', label: 'VZW', prefix: 'vzw' },
    { id: 'kap', label: 'Kapoenen', prefix: 'kapoenen' },
    { id: 'wel', label: 'Welpen', prefix: 'welpen' },
    { id: 'wol', label: 'Woudlopers', prefix: 'woudlopers' },
    { id: 'jgv', label: 'Jonggivers', prefix: 'jonggivers' },
    { id: 'giv', label: 'Givers', prefix: 'givers' },
    { id: 'web', label: 'Webmasters', prefix: 'webmaster' },
]

type Reciever = typeof contactRecievers[0];

interface Props {};

const ContactMailInfo: FC<Props> = () => {
    const [ searchParams ] = useSearchParams();
    const preselectReciever = useMemo(() => {
        const recieverParamValue = searchParams.get('r') || searchParams.get('reciever');
        return contactRecievers.find((reciever) => reciever.id === recieverParamValue); 
    }, [])
    const [ selectedReciever, selectReciever ] = useState<Reciever | undefined>(preselectReciever);
    
    const email = useMemo(() => {
        return selectedReciever?.prefix + '@haegepoorters.be'
    }, [selectedReciever]);
    
    const selectAndDeselect = (reciever: Reciever) => {
        if (reciever.id === selectedReciever?.id) {
            selectReciever(undefined);
        } else {
            selectReciever(reciever);
        }
    }
    
    return (
        <div>
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Wie wil je bereiken?</h3>
                <ul className="flex flex-wrap gap-3">
                    { contactRecievers.map((reciever) => (
                        <li className={classNames(
                            selectedReciever && selectedReciever?.id !== reciever.id && 'opacity-50'
                        )}>
                            <button 
                                onClick={() => selectAndDeselect(reciever)}
                                className="bg-red-100 text-red-500 px-3 py-2 font-medium"
                            >{ reciever.label }</button>
                        </li>
                    ))}
                </ul>
            </div>
            <ExpansionPane active={ !!selectedReciever }>
                <p>Je kan de <span className="font-semibold lowercase">{ selectedReciever?.label }</span> bereiken via <a href={ email } className="text-red-500 underline underline-offset-8">{ email }</a></p>
            </ExpansionPane>
        </div>
    )
}

export default ContactMailInfo;