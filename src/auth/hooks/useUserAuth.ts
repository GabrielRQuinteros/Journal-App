import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/AppStoreHooks";
import { checkingAuthentication } from "../../store/auth/authThunks";



export function usePokemon() {
    
  const authState = useAppSelector( appState =>  appState.auth);
  const dispatch = useAppDispatch();
//   const handleLogin = useCallback( (): void => dispatch(login()), [dispatch]);
//   const handleLogout = useCallback( (): void => dispatch(logout()), [dispatch]);
  const handleCheckingAuthentication = useCallback( (email: string, password: string) => (dispatch(checkingAuthentication(email, password)) ), [dispatch]);

  return useMemo(() => ({
        authState,
        ...authState,
        handleCheckingAuthentication,
  }), [authState, handleCheckingAuthentication]);
}