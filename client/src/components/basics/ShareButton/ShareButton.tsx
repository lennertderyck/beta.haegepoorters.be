import { FC } from 'react';
import Button from '../Button/Button';
import { useShare } from '../../../utils/hooks';
import Icon from '../Icon/Icon';
// @ts-ignore
import { escape } from 'lodash/string';

interface Props {};

const ShareButton: FC<Props> = () => {
    const [ share, { isAvailable }] = useShare();
    
    const encodedPageUrl = encodeURIComponent(window.location.href);
    
    const fbLink = `https://www.facebook.com/dialog/share?app_id=1769003506807115&display=page&href=${encodedPageUrl}&redirect_uri=${encodedPageUrl}`;
    // const twitterLink = `http://twitter.com/share?text=${encodeURIComponent('Haegepoorters Destelbergen')}&url=${encodedPageUrl}`;
    const mailLink = `mailto:?SUBJECT=${ 'Haegepoorters Destelbergen' }&body=${ window.location.href }`;
    const waLink = `whatsapp://send?text=${ window.location.href }`;
    
    if (!isAvailable) return (
        <div>
            <p className="uppercase font-semibold tracking-widest text-xs mb-2 text-gray-400">Deel deze pagina</p>
            <div className="flex items-center gap-3 text-red-500">
                <a href={ fbLink }>
                    <Icon name="facebook-circle" size="1.6rem" />
                </a>
                <a href={ waLink }>
                    <Icon name="whatsapp" size="1.6rem" />
                </a>
                <a href={ mailLink }>
                    <Icon name="mail" size="1.6rem" />
                </a>
            </div>
        </div>
    )
    else return (
        <div>
            <Button theme="simple" icon="share-box" onClick={ share }>Deel deze pagina</Button>
        </div>
    )
}

export default ShareButton;