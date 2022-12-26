import { FC } from 'react';
import { useStoryblok } from '../../../../utils/hooks';
import { Leader } from '../../../../types/content';
// @ts-ignore
import array from 'lodash/collection';
import groups from '../../../../utils/data/groups';
import { StoryBlokResponse } from '../../../../utils/hooks/useStoryblok/useStoryblok.types';
import { Icon } from '../../../../components/basics';
import TeamMemberCard from './TeamMemberCard';
import usePreferencesStore from '../../../../state/stores/usePreferencesStore/usePreferencesStore';

interface Props {};

const TeamPage: FC<Props> = () => {
    const showPhonenumbers = usePreferencesStore((state) => state.allowShowPhonenumbers);
    const enablePhonenumbers = usePreferencesStore((state) => state.showPhonenumbers);
    
    const [{ data, loading: peopleLoading }] = useStoryblok<Leader>('cdn/stories', {
        'starts_with': 'leiding/',
        'sort_by': 'content.functions_extra:desc, content.first_name:desc',
        'per_page': 60,
        'resolve_relations': 'team_member.functions'
    });
    
    const grouped = array.groupBy(data?.stories, (entry: any) => entry.content.functions.content?.shortcode);
    const grl = data?.stories?.filter((leader) => leader.content.functions_extra.includes('grl'))
    
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title">Leiding</h1>
                <p>Ons team van gemotiveerde leiding</p>
            </div>
            
            <div className="page__content">
                <div className="mb-12">
                    <h3 className="font-serif mb-6 capitalize font-bold text-3xl">Groepsleiding</h3>
                    <div className="card-group -mt-6 grid grid-cols-4 gap-6">
                        { grl?.map((leader: StoryBlokResponse<Leader>) => (
                            <TeamMemberCard showPhonenumber={ showPhonenumbers } leader={ leader } />
                        ))}
                    </div>
                </div>
                { Object.entries(groups)?.map(([shortcode, group]) => (
                    <div className="mb-12">
                        <h3 className="font-serif mb-6 capitalize font-bold text-3xl">{ group.name }</h3>
                        <div className="card-group -mt-6 grid grid-cols-4 gap-6">
                            { grouped[shortcode]?.map((leader: StoryBlokResponse<Leader>) => (
                                <TeamMemberCard showPhonenumber={ showPhonenumbers } leader={ leader } />
                            ))}
                        </div>
                    </div>
                ))}
                { !showPhonenumbers && (
                    <div className="sticky left-0 right-0 bottom-0 w-full px-8">
                        <button 
                            className="flex items-center gap-3 w-full bg-red-100 py-4 px-4 uppercase tracking-wider text-xs text-red-500 font-semibold text-right" 
                            onClick={() => enablePhonenumbers()}
                        >
                            <Icon name="eye-close" />
                            <span>Gsm-nummers weergeven</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeamPage;