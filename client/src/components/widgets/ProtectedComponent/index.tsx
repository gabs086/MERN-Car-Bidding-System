import { Navigate, Outlet } from 'react-router-dom';
import useIsAuthenticated from '@/hooks/useIsAuthenticated';

const ProtectedRoute = ({ children }: any) => {
   const { isAuthenticated } = useIsAuthenticated();
   console.log('isAuthenticated:', isAuthenticated);
   if (!isAuthenticated) {
      return <Navigate to='/' replace />;
   }

   return children ? children : <Outlet />;
};

export default ProtectedRoute;

//TODO: Fixed code for front end login
