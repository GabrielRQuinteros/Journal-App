import { useEffect } from "react";
import { login, logout, useAppDispatch, useAppSelector, type LoginPayload } from "../../store";
import { onAuthStateChanged, type User } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";
import { startLoadingNotes } from "../../store/journal";


export const useCheckAuth = () => {

const dispatch= useAppDispatch();
const { status } = useAppSelector( store => store.auth );
  useEffect(() => {
  // Firebase proporciona esta función para escuchar en tiempo real los cambios 
  // en el estado de autenticación del usuario. Esto incluye logins, logouts, 
  // o si ya existe una sesión activa cuando se recarga la página.
  //
  // Es esencial para mantener sincronizado el estado global de autenticación 
  // de tu aplicación con Firebase. Por ejemplo, si un usuario ya está logueado 
  // y recarga la página, esta función permite detectar automáticamente su sesión 
  // y evitar redirigirlo al login innecesariamente.
  //
  // Normalmente se llama una sola vez al montar el componente y debería 
  // actualizar el store (por ejemplo con Redux) con los datos del usuario.
  onAuthStateChanged( firebaseAuth, async (user: User | null) => {
     if( !user ) return dispatch( logout() );
     const payload: LoginPayload = { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL, token: await user.getIdToken() }
     dispatch( login(payload) );
     dispatch( startLoadingNotes() );
     
    } );
  }, [dispatch]);

    return {
        status,
    };
}
