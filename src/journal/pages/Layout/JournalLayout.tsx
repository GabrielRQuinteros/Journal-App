import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router";
import { SideBar, NavBar } from "../../components";


const drawerWidth = 280;

export const JournalLayout = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }} >
        
          {/* NavBar */}
          <NavBar drawerWidth={drawerWidth}/>
          {/* SideBar --> En Material UI se lo llama Drawer */}
          <SideBar drawerWidth={drawerWidth} />
          
          <Box component='main'
            sx={{ flexGrow: 1, p: 3 }}
            >
              {/* ToolBar */}
              <Toolbar/>
              
              {/* Contenido que cambia*/}
              <Outlet/>


          </Box>

      </Box> 
    </>
   );
}
