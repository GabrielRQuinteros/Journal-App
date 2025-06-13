import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

export const NavBar = ({drawerWidth}: {drawerWidth: number}) => {
  return (
    <>
        <AppBar position="fixed"
                sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                }}

            >

        <Toolbar>
            <IconButton color="inherit"
                        edge='start'
                        sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                <MenuOutlined  sx={{ color: 'white' }}/>
            </IconButton>
            
            <Grid container sx={{ flexGrow: 1 }} direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Journal APP</Typography>
                <IconButton>
                     <LogoutOutlined sx={{color: 'white'}} />
                </IconButton>
            </Grid>

        </Toolbar>
    

        </AppBar>
    </>
  );
}
