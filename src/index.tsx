import { useContext } from 'react';
import { AuthContext } from './common';

export {AuthProvider as default} from './AuthProvider';

export const useAuth = () => useContext(AuthContext);
