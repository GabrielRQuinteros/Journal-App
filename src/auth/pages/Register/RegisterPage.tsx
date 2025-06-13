import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as ReactRouterLink  } from 'react-router'

export const RegisterPage = () => {
  return (
    <>
        <Typography
          variant="h5"
          sx={{ mb: 2 }}
          >
          Crear Cuenta
        </Typography>

        <Grid component="form"
              size={12}
              justifyContent="center"
              alignContent="center"
          >
          <TextField
            id="nombreCompleto"
            label="Nombre Completo"
            type="text"
            size="small"
            margin="normal"
            sx={{display: 'block'}}
            fullWidth
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
          />

          <TextField
            id="username"
            label="Username"
            type="text"
            placeholder="Username"
            size="small"
            margin="normal"
            sx={{display: 'block'}}
            fullWidth
          />

          <TextField
            id="password1"
            label="Password"
            type="password"
            size="small"
            margin="normal"
            sx={{display: 'block'}}
            fullWidth
          />

          <TextField
            id="password2"
            label="Repeat password"
            type="password"
            size="small"
            margin="normal"
            sx={{display: 'block'}}
            fullWidth
          />


          <Grid container
                spacing={2}
                sx={{ mb: 2, mt: 3 }}
                >
              <Grid size={12} >
                <Button variant="contained" fullWidth>
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
