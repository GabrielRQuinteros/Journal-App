import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as ReactRouterLink  } from 'react-router'
import { useForm, type FormValidations } from "../../../shared/hooks";
import type { RegisterForm } from "./interfaces/RegisterForm";
import { useMemo, useState } from "react";
import { AuthStatus, startCreatingUserWithEmailPassword, useAppDispatch, useAppSelector } from "../../../store";

const initialForm: RegisterForm = {
    username: '',
    email: '',
    password1: '',
    password2: '',
}


export const RegisterPage = () => {

  const dispatch = useAppDispatch();
   const formValidation = useMemo<FormValidations<RegisterForm>>(() => ({
    email: [ (value: string) => value.includes('@') , 'El email debe incluir un @.'],
    username: [ (value: string) => value.length > 3 , 'El username debe tener mas de 3 caracteres.'],
    password1: [ (value: string) => value.length >= 6 , 'La contraseña debe tener 6 o mas caracteres.'],
    password2: [ (value, formState) => value === formState.password1,'La contraseña debe coincidir con la contraseña anterior.'],
  }), []);

  const [isFormSubmited, setIsFormSubmited] = useState(false);
    const { username, email, password1, password2,
            usernameValid, emailValid, password1Valid, password2Valid,
            isFormValid,
            onInputChange, formState } = useForm( initialForm, formValidation );

    const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
      event.preventDefault();
      setIsFormSubmited(true);
      if( !isFormValid ) return;
      dispatch(startCreatingUserWithEmailPassword( username, email, password1 ));
    }

    const { errorMessage, status }= useAppSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === AuthStatus.CHECKING && isFormSubmited , [status, isFormSubmited]  );

  return (
    <>
        <Typography
          variant="h5"
          sx={{ mb: 2 }}
          >
          Crear una cuenta
        </Typography>

        <Grid component="form"
              size={12}
              justifyContent="center"
              alignContent="center"
              onSubmit={ onSubmit  }
          >
            <TextField
              id="username"
              label="Username"
              type="text"
              placeholder="Username"
              size="small"
              margin="normal"
              sx={{display: 'block'}}
              fullWidth

              name="username"
              value={username}
              onChange={onInputChange}

              error={ !!usernameValid && isFormSubmited}
              helperText= { usernameValid }
            />

            <TextField
              id="email"
              label="Correo"
              type="email"
              placeholder="email@google.com"
              size="small"
              margin="normal"
              sx={{display: 'block'}}
              fullWidth

              name="email"
              value={email}
              onChange={onInputChange}

              error={ !!emailValid && isFormSubmited }
              helperText= { emailValid }
            />

            <TextField
              id="password1"
              label="Contraseña"
              type="password"
              size="small"
              margin="normal"
              sx={{display: 'block'}}
              fullWidth

              name="password1"
              value={password1}
              onChange={onInputChange}

              error={ !!password1Valid && isFormSubmited }
              helperText= { password1Valid }

            />


            <TextField
              id="password2"
              label="Repetir Contraseña"
              type="password"
              size="small"
              margin="normal"
              sx={{display: 'block'}}
              fullWidth

              name="password2"
              value={password2}
              onChange={onInputChange}

              error={ !!password2Valid && isFormSubmited}
              helperText= { password2Valid }

            />


          <Grid container
                spacing={2}
                sx={{ mb: 2, mt: 3 }}
                >
              <Grid size={12}
                    display={ isFormSubmited && errorMessage ? '': 'none' }
                    >
                <Alert severity="error" >
                    { errorMessage }
                </Alert>
              </Grid>
              <Grid size={12} >
                <Button variant="contained"
                        fullWidth
                        type="submit"
                        disabled={ !isFormValid || isCheckingAuthentication }
                        >
                    Crear Cuenta
                </Button>
              </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end' >
            
            <Link to="/auth/login"
                  color="inherit"
                  component={ ReactRouterLink }
                  >
                Ya tengo una cuenta
            </Link>
          </Grid>
        
        </Grid>
    </>
  )
}
