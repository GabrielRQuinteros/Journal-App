import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGalery } from "../../components/ImageGalery/ImageGalery";

export const NoteView = () => {
  return (
        <>
            <Grid   container 
                    direction='row'
                    justifyContent='space-between'
                    sx={{ mb: 1 }}
                    alignItems='center'
                    >
            <Grid>
                <Typography fontSize={39}
                        fontWeight='light'
                    >
                    13 de Junio, 2025
                </Typography>
            </Grid>
            
            <Grid>
                <Button color="primary" sx={{ padding: 2 }} >
                    <SaveOutlined sx={{ fontSize: 30 , mr: 1}} />
                    Guardar
                </Button>
            </Grid>
            
            <Grid container sx={{width: '100%'}}>

                <TextField type="text"
                            variant="filled"
                            fullWidth
                            label='Titulo'
                            placeholder="Ingrese un titulo"
                            sx={{ border: 'none', mb: 1 }}
                        

                    />
                
                <TextField type="text"
                            variant="filled"
                            fullWidth
                            label='Nota'
                            multiline
                            placeholder="¿Qué paso el día hoy?"
                            sx={{ border: 'none', mb: 1 }}

                    />
            </Grid>
            
            {/* Galeria de Imagenes */}
            <ImageGalery/>

            </Grid>
        </>
  );
}
