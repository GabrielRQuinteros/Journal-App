import { CircularProgress, Grid } from "@mui/material"


export const CheckingAuth = () => {
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
            <Grid size={ { xs: 10, md:6, lg: 4 }}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <CircularProgress 
                        sx={{ color: "white" }}
                        size={60}
                        />
            </Grid>      
      </Grid>

    </>
  )
}
