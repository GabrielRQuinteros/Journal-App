import { TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../../store";

export const SideBar = ({drawerWidth}: {drawerWidth: number}) => {

  const { name } = useAppSelector( state=> state.auth );


  return (
    <>
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth },
                  flexShrink: { sm: 0 }
                }}     
          >

            <Drawer
                variant="permanent" //temporary
                open={ true }
                sx={{ display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: "border-box", width: drawerWidth }
             }}
                >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        {name} 
                    </Typography>
                </Toolbar>
                <Divider/>
                <List>
                    {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text =>
                         <ListItem key={text} disablePadding >
                            <ListItemButton  >
                              <ListItemIcon>
                                <TurnedInNot/>
                              </ListItemIcon>
                              <Grid container >
                                <ListItemText primary={text} />
                                <ListItemText secondary={'Voluptate aliqua proident ex enim cupidatat incididunt exercitation deserunt duis pariatur veniam.'} />
                              </Grid>
                            </ListItemButton>

                         </ListItem>)
                    
                    }
                </List>


            </Drawer>

        </Box>
    </>
  );
}
