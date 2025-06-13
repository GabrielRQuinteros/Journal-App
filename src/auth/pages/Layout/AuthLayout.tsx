import { Outlet } from "react-router"

import { Grid} from "@mui/material";

export const AuthLayout = () => {
  return (
    <>
      <Grid container
         sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "primary.main",
          }}
        >
        <Grid className="box-shadow"
            sx={{ bgcolor: "white",
            padding: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            }}
            size={ { xs: 10, md:6, lg: 4 }}
          >
            <Outlet/>
        </Grid>      
      </Grid>
    </>
  );
}
