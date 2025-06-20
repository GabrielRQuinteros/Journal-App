import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as ReactRouterLink  } from 'react-router'
import { useForm } from "../../../shared/hooks";
import type { LoginForm } from "./interfaces/LoginInterfaces";
import { checkingAuthentication, startGoogleSignIn, useAppDispatch } from "../../../store";



export const LoginPage = () => {

  const dispatch = useAppDispatch();
  const initialForm: LoginForm = {
      email: 'gabriel@gmail.com',
      password: '123456'
  }
  const { email, password, onInputChange, formState } = useForm( initialForm );

  const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    console.log(formState);
    dispatch( checkingAuthentication( email, password ) );
  }

  const onGoogleSignIn = () => {
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
                        >
                    Login
                </Button>
              </Grid>
              
              
              <Grid  size={ { xs: 12, sm: 6, md: 6,  lg: 6 } } >
                <Button variant="contained"
                        fullWidth
                        onClick={ onGoogleSignIn }
                        >
                    <Google/>
                    <Typography sx={{ ml: 1 }} >
                        Google
                    </Typography>
                </Button>
              </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end' >
            
            <Link to="/auth/register"
                  color="inherit"
                  component={ ReactRouterLink }
                  >
                Register
            </Link>
          </Grid>
        
        </Grid>
    </>
  );

};