import { StarOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignContent='center'
    sx={{
      width: '100%',
      minHeight: 'calc(100vh - 110px)',
      bgcolor: 'primary.main',
      borderRadius: 5,
    }}
  >
    <Grid item xs={12} justifyContent='center' display='flex'>
      <StarOutlined sx={{ fontSize: 100, color: 'white' }} />
    </Grid>
    <Grid item xs={12}>
      <Typography sx={{ color: 'white' }} variant="h5">
        Selecciona o crea una nota
      </Typography>
    </Grid>
  </Grid>
);
