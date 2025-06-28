import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote, type Note } from "../../../../store/journal"
import { useAppDispatch } from "../../../../store"

export const SideBarItem = ( { note }: {  note: Note }) => {

    const dispatch = useAppDispatch();
    const onClickNote = () => {
        dispatch( setActiveNote( note.id! ) );
    };

  return (
    <>
        <ListItem disablePadding >
            <ListItemButton onClick={ onClickNote } >
                <ListItemIcon>
                <TurnedInNot/>
                </ListItemIcon>
                <Grid container >
                <ListItemText   primary={ note.title }
                                sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 1,
                                    overflow: 'hidden',
                                }}
                    />
                <ListItemText   secondary={ note.body }
                                sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                    overflow: 'hidden',
                                }}
                    />
                </Grid>
            </ListItemButton>
        </ListItem>
    </>
  )
}
