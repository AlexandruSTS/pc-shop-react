import { ReactNode, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type PermissionGuardProps = {
    permissions: string | string[];
    children: ReactNode;
};

export default function PermissionGuard({ permissions, children }: PermissionGuardProps): JSX.Element {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        const checkPermission = async (): Promise<void> => {
            if (!isAuthenticated) {
                setHasPermission(false);
                return;
            }

            try {
                const token = await getAccessTokenSilently();
                const decodedToken = JSON.parse(atob(token.split('.')[1])) as { permissions: string[] };
                const userPermissions = decodedToken.permissions || [];
                const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
                const hasRequiredPermission = requiredPermissions.every(permission => userPermissions.includes(permission));
                setHasPermission(hasRequiredPermission);
            } catch (error) {
                console.error('Error retrieving user permissions:', error);
                setHasPermission(false);
            }
        };

        checkPermission();
    }, [isAuthenticated, getAccessTokenSilently, permissions]);

    // console.log("children: " + children)
    return <>{hasPermission ? <>{children}</> : null}</>;
}
