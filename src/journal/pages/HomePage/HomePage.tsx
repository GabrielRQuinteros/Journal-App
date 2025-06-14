import { IconButton, Toolbar } from '@mui/material';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
export const HomePage = () => {
  return (
    <>
        <NothingSelectedView/>
        {/* <NoteView/> */}
        <IconButton
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
          >
            <AddOutlined sx={{ fontSize: 30}} />
        </IconButton>
    </>
  )
}
