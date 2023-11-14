import { useAppSelector } from './reduxhooks';

function useIsAuthenticated() {
   const auth = useAppSelector((state) => state.auth);
   console.log('auth:', auth);

   // useEffect(() => {
   //     if (auth?.isLoggedIn === undefined) {
   //         dispatch(refreshToken())
   //     }
   // }, [auth?.isLoggedIn, dispatch])

   return {
      isAuthenticated: auth.login?.isAuthenticated,
   };
}

export default useIsAuthenticated;
