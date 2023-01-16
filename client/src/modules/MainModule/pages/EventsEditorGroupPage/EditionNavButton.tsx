import { FC } from 'react';
import { Edition } from '../../../../types/content';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../../../components/basics';
import classNames from 'classnames';

interface Props {
    edition: Edition;
};

const EditionNavButton: FC<Props> = ({ edition }) => {
    const params = useParams<any>();
    const active = params.edition === edition.id;
        
    return (
        <Button theme="simple" to={ !!params.edition ? '../' + edition.id : edition.id } relative="path">
            <span className={classNames( active && 'border-b-2 border-red-500 pb-1')}>
                { edition.title }
            </span>
        </Button>
    )
}

export default EditionNavButton;