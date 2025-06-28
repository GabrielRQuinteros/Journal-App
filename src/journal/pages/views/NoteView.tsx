import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGalery } from "../../components/ImageGalery/ImageGalery";
import { useAppSelector } from "../../../store";
import { useForm } from "../../../shared/hooks";
import { useMemo } from "react";

export const NoteView = () => {

    const { activeNote } = useAppSelector( state => state.journal );

    const { title, body, date, imageUrls, onInputChange, formState } = useForm( activeNote! );

    const dateString = useMemo( () => {
        const noteDate = new Date( date! );
        return noteDate.toUTCString(); 
        }
        , [date] )

    const onSaveNote = () => {

    }

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
                    { dateString }
                </Typography>
            </Grid>
            
            <Grid>
                <Button color="primary"
                        sx={{ padding: 2 }}
                        onClick={ onSaveNote }
                        >
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

                            value={ title }
                            name="title"
                            onChange={ onInputChange }

                    />
                
                <TextField type="text"
                            variant="filled"
                            fullWidth
                            label='Nota'
                            multiline
                            placeholder="¿Qué paso el día hoy?"
                            sx={{ border: 'none', mb: 1 }}

                            value={ body }
                            name="body"
                            onChange={ onInputChange }

                    />
            </Grid>
            
            {/* Galeria de Imagenes */}
            <ImageGalery/>

            </Grid>
        </>
  );
}
