import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as ReactRouterLink  } from 'react-router'
export const LoginPage = () => {

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
          />


          <Grid container
                spacing={2}
                sx={{ mb: 2, mt: 3 }}
                >
              <Grid  size={ { xs: 12, sm: 6, md: 6,  lg: 6 } } >
                <Button variant="contained" fullWidth>
                    Login
                </Button>
              </Grid>
              
              
              <Grid  size={ { xs: 12, sm: 6, md: 6,  lg: 6 } } >
                <Button variant="contained" fullWidth>
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