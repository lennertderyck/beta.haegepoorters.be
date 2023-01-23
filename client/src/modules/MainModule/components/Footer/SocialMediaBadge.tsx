import { FC } from 'react';
import { secondaryContactPlatforms, socialMediaPlatforms } from '../../../../utils/data/contact';
import { Icon } from '../../../../components/basics';

interface Props {};

const SocialMediaBadge: FC<Props> = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center bg-white w-fit rounded-lg">
                <h4 className="font-semibold pl-4 pr-3">Volg ons op</h4>
                <ul className="flex gap-2 py-2.5 pr-3">
                    { socialMediaPlatforms.map((platform, index) => (
                        <li key={ index }>
                            <a href={ platform.baseUrl + '/' + platform.userName } target="_blank" rel="noopener norefferer">
                                <span className="hidden">{ platform.name }</span>
                                <Icon className="text-red-500" name={ platform.icon } size="2rem" />
                            </a>
                        </li>
                    ))}
                </ul>
                {/* <span className="label !text-2xl !font-normal">+</span> */}
                <ul className="flex gap-1 bg-gray-50 py-2.5 px-3 rounded-r-lg">
                    { secondaryContactPlatforms.map((platform, index) => (
                        <li key={ index }>
                            <a href={ platform.baseUrl + '/' + platform.userName } target="_blank" rel="noopener norefferer">
                                <span className="hidden">{ platform.name }</span>
                                <Icon className="text-red-500" name={ platform.icon } size="2rem" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* <span className="label !text-2xl !font-normal">+</span>
            <div className="flex items-center gap-3 bg-white w-fit rounded-lg py-2.5 px-3">
                <ul className="flex gap-1">
                    { secondaryContactPlatforms.map((platform) => (
                        <li>
                            <a href={ platform.baseUrl + '/' + platform.userName } target="_blank" rel="noopener norefferer">
                                <span className="hidden">{ platform.name }</span>
                                <Icon className="text-red-500" name={ platform.icon } size="2rem" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    )
}

export default SocialMediaBadge;