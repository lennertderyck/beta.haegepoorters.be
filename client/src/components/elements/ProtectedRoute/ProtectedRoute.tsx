import { FC } from 'react';

interface ProtectedFirst {
    requiredRoles: string[];
    
    redirectRoles: undefined;
    to: undefined;
};

interface RedirectFirst {
    redirectRoles: string[];
    to: string;
    
    requiredRoles: undefined;
}

type Props = ProtectedFirst | RedirectFirst;

const ProtectedRoute: FC<Props> = ({ to, redirectRoles, requiredRoles }) => {
    return (
        <div>
            
        </div>
    )
}

export default ProtectedRoute;