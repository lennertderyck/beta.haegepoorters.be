import { FC, useMemo } from 'react';
import { StoryBlokResponse } from '../../../../utils/hooks/useStoryblok/useStoryblok.types';
import { Leader } from '../../../../types/content';
import { Icon, Img } from '../../../../components/basics';
import classNames from 'classnames';

interface Props {
    showPhonenumber?: boolean;
    leader: StoryBlokResponse<Leader>
};

const TeamMemberCard: FC<Props> = ({ leader, showPhonenumber }) => {
    const showTelNumber = useMemo(() => {
        return leader.content.functions_extra.includes('group_resp') || leader.content.functions_extra.includes('grl')
    }, [ leader.content.functions_extra ]);
    
    return (
        <div className="card col-span-4 md:col-span-2 lg:col-span-1">
            <div className="h-60 mb-4">
                { leader.content.image.filename && (
                    <>
                        {/* <img src={ leader.content.image.filename } className="h-full w-full object-cover" alt="" /> */}
                        <Img src={ leader.content.image.filename } width="100%" height="100%" className="h-full w-full object-cover" />
                    </>
                )}
            </div>
            <h4 className="card__title !-mb-1">
                { leader.content.first_name }
            </h4>
            { leader.content.functions.content?.shortcode === 'wel' && <p className="font-serif text-xl">{ leader.content.wel_name }</p>}
            { showTelNumber && (
                <a 
                    className={classNames(
                        'flex items-center gap-2 mt-3',
                        !showPhonenumber && 'pointer-events-none select-none'
                    )} 
                    href={ showPhonenumber ? 'tel:' + leader.content.tel : '' }
                >
                    <Icon name="phone" />
                    <span className={classNames(
                        'underline underline-offset-4',
                        showPhonenumber ? 'blur-none' : 'blur-sm'
                    )}>{ showPhonenumber ? leader.content.tel : '+320412345678' }</span>
                </a>
            )}
        </div>
    )
}

export default TeamMemberCard;