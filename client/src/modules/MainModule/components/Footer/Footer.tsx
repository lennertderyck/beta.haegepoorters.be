import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Date } from '../../../../components/basics';

interface Props {};

const Footer: FC<Props> = () => {
    return (
        <footer className="bg-gray-200 px-8 2xl:px-0">
            <div className="container py-8">
                <div className="grid grid-cols-12 gap-6 lg:gap-0">
                    <div className="col-span-12 lg:col-span-4">
                        <h4 className="font-semibold">Scouts & Gidsen Haegepoorters</h4>
                        <address className="not-italic">
                            Bijlokestraat 18<br />
                            9070 Destelbergen
                        </address>
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                        <h4 className="font-semibold">HP Rénové vzw</h4>
                        <p></p>
                    </div>
                </div>
                
                <p className="mt-5 text-gray-400 font-medium flex flex-col lg:flex-row gap-4 items-baseline justify-between">
                    <small className="inline-block leading-5">
                        © 2007 - <Date format="YYYY" /> Scouts & Gidsen Haegepoorters Destelbergen  
                        &nbsp; |  &nbsp;
                        <a href="https://www.jung.gent" rel="noreferrer" target="_blank">Ontwikkeld door JUNG&nbsp;･&nbsp;Gent</a>
                        &nbsp; |  &nbsp;
                        <a href="https://app.storyblok.com/#/me/spaces/106950/stories/0/0/index/0" rel="noreferrer" target="_blank">Aanmelden als webmaster</a>
                    </small>
                    <small className="inline-block leading-5">
                        <Link to="/privacy">Privacy & cookiebeleid</Link>
                    </small>
                </p>
            </div>
        </footer>
    )
}

export default Footer;