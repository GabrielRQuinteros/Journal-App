import { useMemo, useState } from "react";
import { Link as ReactRouterLink  } from 'react-router'

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { useForm } from "../../../shared/hooks";
import type { LoginForm } from "./interfaces/LoginInterfaces";
import { AuthStatus, startGoogleSignIn, startSignInWithEmailAndPassword, useAppDispatch, useAppSelector } from "../../../store";

export const LoginPage = () => {

  const dispatch = useAppDispatch();
  const initialForm: LoginForm = {
      email: 'gabriel@gmail.com',
      password: '123456'
  }
  const { email, password, onInputChange } = useForm( initialForm );

  const { status, errorMessage } = useAppSelector( state => state.auth);
  const [isSubmited, setIsSubmited] = useState(false);
  
  const isAuthenticating = useMemo( ()=> () => status === AuthStatus.CHECKING && isSubmited, [status, isSubmited] );
  
  const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setIsSubmited(true);
    dispatch( startSignInWithEmailAndPassword( email, password ) );
  }

  const onGoogleSignIn = () => {
    setIsSubmited(true);
    dispatch( startGoogleSignIn() );
  }
  
  return (
        <>
        <Typography
          variant="h5"
          sx={{ mb: 2 }}
          >
          Login
        </Typography>

        <Grid component="form"
              size={12}
              justifyContent="center"
              alignContent="center"
              onSubmit={ onSubmit }
          >
            
          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="email@google.com"
            size="small"
            margin="normal"
            sx={{display: 'block'}}
            fullWidth
            autoComplete="email"
            /// CAMPOS NECESARIOS PARA EL useForm
            name="email"
            value={ email }
            onChange={ onInputChange }
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            placeholder="password"
            size="small"
            margin="normal"
            sx={{display: 'block'}}
            fullWidth
            autoComplete="current-password"
            /// CAMPOS NECESSARIOS PARA EL useForm
            name="password"
            value={password}
            onChange={ onInputChange }
          />


          <Grid container
                spacing={2}
                sx={{ mb: 2, mt: 3 }}
                >
              <Grid  size={ { xs: 12, sm: 6, md: 6,  lg: 6 } } >
                <Button variant="contained"
                        fullWidth
                        type="submit"
                        disabled={ isAuthenticating() }
                        >
                    Login
                </Button>
              </Grid>
              
              
              <Grid  size={ { xs: 12, sm: 6, md: 6,  lg: 6 } } >
                <Button variant="contained"
                        fullWidth
                        onClick={ onGoogleSignIn }
                        disabled={ isAuthenticating() }
                        >
                    <Google/>
                    <Typography sx={{ ml: 1 }} >
                        Google
                    </Typography>
                </Button>
              </Grid>
              <Grid  size={ 12 }
                 sx={{ display: isSubmited && errorMessage ? 'block' : 'none' }}
                >
                 <Alert severity="error">{errorMessage}</Alert>
              </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end' >
            
            <Link to="/auth/register"
                  color="inherit"
                  component={ ReactRouterLink }
                  >
                Crear una cuenta
            </Link>
          </Grid>
        
        </Grid>
    </>
  );

};