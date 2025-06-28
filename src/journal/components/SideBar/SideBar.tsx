import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../../store";
import { SideBarItem } from "./SideBarItem/SideBarItem";

export const SideBar = ({drawerWidth}: {drawerWidth: number}) => {

  const { name } = useAppSelector( state=> state.auth );
  const { notes } = useAppSelector( state=> state.journal );


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
                    { notes.map( note => <SideBarItem key={note.id} note = { note } /> ) }
                </List>
            </Drawer>

        </Box>
    </>
  );
}
