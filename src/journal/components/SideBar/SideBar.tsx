import { Box, Drawer, Toolbar, Typography } from "@mui/material";

export const SideBar = ({drawerWidth}: {drawerWidth: number}) => {
  return (
    <>
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth },
                  flexShrink: { sm: 0 }
                }}     
          >

            <Drawer
                variant="permanent"
                open={ true }
                sx={{ display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: "border-box", width: drawerWidth }
             }}
                >
                <Toolbar>

                    <Typography variant="h6" noWrap component='div'>
                        Gabriel 
                    </Typography>

                </Toolbar>



            </Drawer>

        </Box>
    </>
  );
}
