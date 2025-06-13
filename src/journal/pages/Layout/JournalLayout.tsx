import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { NavBar } from "../../components/NavBar/NavBar";
import { SideBar } from "../../components";


const drawerWidth = 240;

export const JournalLayout = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }} >
        
          {/* NavBar */}
          <NavBar drawerWidth={drawerWidth}/>
          {/* SideBar */}
          <SideBar drawerWidth={drawerWidth} />
          
          <Box component='main'
            sx={{ flexGrow: 1, p: 3 }}
            
            >
              {/* ToolBar */}
              
              {/* Contenido que cambia*/}
              <Outlet/>


          </Box>

      </Box> 
    </>
   );
}
