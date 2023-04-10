import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { className } from '../../../../utils/funcs/dom';
import { Icon } from '../../../../components/basics';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

const HeroBanner: FC<Props> = ({ children, className: cls, ...otherProps }) => {
    return (
        <div 
            {...className(
                'container bg-gray-200 relative',
                cls
            )}
            { ...otherProps }
        >
            <img 
                src="https://res.cloudinary.com/haegepoortersbe/image/upload/v1628940149/bxkwl4yli627r8dzfv2k.jpg" 
                alt=""
                className="w-full h-full absolute top-0 left-0 right-0 bottom-0 object-cover filter brightness-[0.6]"
            />
            <div className="p-10 md:p-16 text-white relative z-10">
                <h2 className="text-5xl font-serif mb-6">Wij zijn scouts en gidsen ...</h2>
                <div className="lg:max-w-[50%]">
                    <p className="font-medium text-lg">Deel uitmaken van onze scouts is meer dan een hobby. De Haegepoorters, ook wel "HP" in de volksmond, zijn een thuis voor meer dan 200 jongeren.</p>
                </div>
                <div className="mt-5 flex flex-col xl:flex-row xl:items-center">
                    <button className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white font-semibold uppercase tracking-widest">
                        <a href="/geschiedenis">Lees onze geschiedenis</a>
                        <Icon name="arrow-right" size="1rem" />
                    </button>
                    <div className="opacity-80 mt-4 xl:mt-0">
                        <div className="tracking-widest uppercase text-xs">
                            <span className="mx-4 hidden xl:inline">|</span>
                            <span className="font-bold">235 leden</span> tussen 6 en 17 jaar
                            <span className="mx-2">•</span>
                            <span className="font-bold">37 leiding</span> waarvan 3 groepsleiding
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner