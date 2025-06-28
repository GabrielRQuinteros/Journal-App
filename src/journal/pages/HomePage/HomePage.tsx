import { IconButton } from '@mui/material';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../store';
import { savingNewNote, startNewNote } from '../../../store/journal';
export const HomePage = () => {

  const dispatch = useAppDispatch();
  const { isSaving, activeNote } = useAppSelector( state => state.journal );

  const onNewNoteClick = () => {
    dispatch( savingNewNote() )
    dispatch( startNewNote() );
  }

  return (
    <>
        { activeNote? <NoteView/>: <NothingSelectedView/> }
        <IconButton
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50,
            '&.Mui-disabled': {
              backgroundColor: 'grey.500', // o un valor como '#9e9e9e'
              color: 'white', // asegura que el icono siga blanco
            },
          }}
          onClick={ onNewNoteClick }
          disabled= { isSaving }
          
          >
            <AddOutlined sx={{ fontSize: 30}} />
        </IconButton>
    </>
  )
}
