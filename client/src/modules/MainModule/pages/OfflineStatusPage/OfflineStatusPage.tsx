import { FC } from 'react';
import { Button, Icon } from '../../../../components/basics';

interface Props {};

const OfflineStatusPage: FC<Props> = () => {
    return (
        <div className="page page--wide h-full flex items-center">
            <div className="page__content">
                <Icon name="signal-wifi-error" className="block mx-auto mb-4" size="1.8rem" />
                <h2 className="font-serif text-2xl text-center">Je bent offline</h2>
                <p className="text-center">Kijk je internetverbinding na en probeer opnieuw</p>
                <div className="whitespace-nowrap w-fit text-xs text-red-500 font-semibold uppercase tracking-widest pl-2 pr-3 py-2 bg-red-100 flex items-center gap-2 mx-auto mt-4">
                    <span>We proberen opnieuw</span>
                    <Icon name="restart" size="1rem" className="animate-spin" />
                </div>
            </div>
        </div>
    )
}

export default OfflineStatusPage;