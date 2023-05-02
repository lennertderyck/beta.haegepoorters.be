import { FC, useMemo } from 'react';
import { useStoryblok } from '../../../../utils/hooks';
import { Leader } from '../../../../types/content';
// @ts-ignore
import array from 'lodash/collection';
import groups from '../../../../utils/data/groups';
import { StoryBlokResponse } from '../../../../utils/hooks/useStoryblok/useStoryblok.types';
import { Button, Icon } from '../../../../components/basics';
import TeamMemberCard from './TeamMemberCard';
import usePreferencesStore from '../../../../state/stores/usePreferencesStore/usePreferencesStore';
import TeamPageLoader from './TeamPageLoader';
import Dialog from '../../../../components/basics/Dialog/Dialog';

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
    const [{ data: groupFunctions, loading: functionsLoading }] = useStoryblok<any>('cdn/stories', {
        'starts_with': 'groups/',
        'per_page': 60,
    });
    
    useMemo(() => {
        if (!groupFunctions && !data) return [];
        else return data?.stories.map((leader) => {
            const groupFunction = groupFunctions?.stories.find((f) => (leader.content.functions as unknown as string) === f.uuid);
            if (groupFunction) {
                leader.content.functions = groupFunction;
            }
            return leader;
        })
    }, [data, groupFunctions]);
    
    const grouped = array.groupBy(data?.stories, (entry: any) => entry.content.functions.content?.shortcode);
    const grl = data?.stories?.filter((leader) => leader.content.functions_extra.includes('grl'));
        
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title">Leiding</h1>
                <p>Ons team van gemotiveerde leiding</p>
            </div>
            {  peopleLoading || functionsLoading ? <TeamPageLoader /> : (
                <div className="page__content">
                    <div className="mb-12">
                        <div className="mb-6">
                            <h3 className="font-serif capitalize font-bold text-3xl mb-3">Groepsleiding</h3>
                            <Button theme="simple" icon="arrow-right" to="/contact?r=grl">Contacteer de groepsleiding</Button>
                        </div>
                        <div className="card-group -mt-6 grid grid-cols-4 gap-6">
                            { grl?.map((leader: StoryBlokResponse<Leader>) => (
                                <TeamMemberCard showPhonenumber={ showPhonenumbers } leader={ leader } />
                            ))}
                        </div>
                    </div>
                    { Object.entries(groups)?.map(([shortcode, group]) => (
                        <div className="mb-12" key={ shortcode }>
                            <div className="mb-6">
                                <h3 className="font-serif capitalize font-bold text-3xl mb-3">{ group.name }</h3>
                                <Button theme="simple" icon="arrow-right" to={ '/contact?r=' + shortcode }>Contacteer de { group.name }</Button>
                            </div>
                            <div className="card-group -mt-6 grid grid-cols-4 gap-6">
                                { grouped[shortcode]?.map((leader: StoryBlokResponse<Leader>) => (
                                    <TeamMemberCard key={ leader.id } showPhonenumber={ showPhonenumbers } leader={ leader } />
                                ))}
                            </div>
                        </div>
                    ))}
                    { !showPhonenumbers && (
                        <>
                            <Dialog>
                                <div className="p-6">
                                    <div className="content content--inline content--compact">
                                        <h4>Gsm-nummers</h4>
                                        <p>Nummers van de leiding worden standaard verborgen vanwege hun privacy.</p>
                                    </div>
                                    <Button className="mt-4" onClick={() => enablePhonenumbers()}>Gsm-nummers weergeven</Button>
                                </div>
                            </Dialog>
                            {/* <div className="sticky left-0 right-0 bottom-0 w-full px-8">
                                <button 
                                    className="flex items-center gap-3 w-full bg-red-100 py-4 px-4 uppercase tracking-wider text-xs text-red-500 font-semibold text-right" 
                                    onClick={() => enablePhonenumbers()}
                                >
                                    <Icon name="eye-close" />
                                    <span>Gsm-nummers weergeven</span>
                                </button>
                            </div> */}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default TeamPage;