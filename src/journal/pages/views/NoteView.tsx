import { useEffect, useMemo } from "react";

import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from 'sweetalert2';

import { ImageGalery } from "../../components/ImageGalery/ImageGalery";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useForm } from "../../../shared/hooks";
import { setActiveNoteFromNote, startSavingNote, startUploadingFiles, type Note } from "../../../store/journal";
import { VisuallyHiddenInput } from "../../../shared/components/VisuallyHiddenInput";


export const NoteView = () => {

    const { activeNote, messageSaved, isSaving } = useAppSelector( state => state.journal );
    const dispatch = useAppDispatch();

    const { title, body, date, imageUrls, onInputChange, formState } = useForm( activeNote! );

    const dateString = useMemo( () => {
        const noteDate = new Date( date! );
        return noteDate.toUTCString(); 
        }
        , [date] );

    const onSaveNote = () => {
        const updatedNote: Note = {id: activeNote?.id, title, body, date, imageUrls }
        dispatch( startSavingNote( updatedNote ) );
    }

    useEffect( () => {
        const updatedNote: Note = { ...formState };
        dispatch( setActiveNoteFromNote( updatedNote ) );
    }, [ title, body , imageUrls ] );

    useEffect(() => {
        if( messageSaved.length > 0 )
            Swal.fire( 'Nota actualizada', messageSaved, 'success' );
    }, [messageSaved]);

    const onFileInputChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        const filesList: FileList = event.target.files!;
        if( filesList.length === 0 ) return;
        const files: File[] = Array.from(filesList);
        dispatch( startUploadingFiles( files ) );
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
                <Button
                    sx={{ margin:2 }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    startIcon={ <CloudUploadIcon />}
                    disabled={ isSaving }
                        >
                        Subir fotos
                        <VisuallyHiddenInput
                            type="file"
                            onChange={ onFileInputChange }
                            multiple 
                        />
                    </Button>

                <Button color="primary"
                        sx={{ padding: 2 }}
                        onClick={ onSaveNote }
                        disabled={ isSaving }
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
