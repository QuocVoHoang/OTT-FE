import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, IconButton, TextField } from '@mui/material';
import { DeleteIcon } from 'lucide-react';
import useConversation from '@/hooks/useConversation';
import useUser from '@/hooks/useUser';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateGroupDialog() {
  const [open, setOpen] = React.useState(false)
  const [groupName, setGroupName] = useState<string>('')
  const [participants, setParticipants] = useState<string[]>([""])
  const [participantIds, setParticipantIds] = useState<string[]>([""])

  const {
    createNewGroupChat
  } = useConversation()

  const {
    getIdFromUserMailPhone
  } = useUser()

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAddParticipant = () => {
    setParticipants([...participants, ``]);
  }

  const handleDeleteUser = (index: number) => {
    const newUsers = participants.filter((_, i) => i !== index);
    setParticipants(newUsers);
  }

  const processParticipants = async (participants: string[]) => {
    for (const participant of participants) {
      const id = await getIdFromUserMailPhone(participant)
      setParticipantIds(prev => {
        if (id && id !== "" && !prev.includes(id)) {
          return [...prev, id]
        }
        return prev
      })
    }
  };

  const onCreateNewGroupChat = useCallback(() => {
    processParticipants(participants)
    setParticipantIds(prev => [...new Set(prev.filter(id => id !== ""))])
    createNewGroupChat(groupName, participantIds)
  }, [groupName, participants, participantIds])

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Group
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create new group chat"}</DialogTitle>
        <DialogContent
          sx={{
            width: "500px"
          }}
        >
          <Box>Input group name</Box>
          <TextField
            id="filled-multiline-flexible"
            label="name"
            multiline
            maxRows={4}
            variant="filled"
            onChange={(e) => {
              setGroupName(e.target.value)
            }}
            sx={{
              width: "100%",
              color: "black",
              marginTop: "5px"
            }}
            InputLabelProps={{
              style: { color: "#F26B42" },
            }}
          />

          <Box
            sx={{marginTop: "10px"}}
          >Input user email or phone number</Box>
          {participants.map((participant, index) => (
            <Box key={index} sx={{display: "flex"}}>
              <TextField
                id="filled-multiline-flexible"
                label={`new member`}
                multiline
                maxRows={4}
                variant="filled"
                value={participant}
                onChange={(e) => {
                  const newParticipants = [...participants];
                  newParticipants[index] = e.target.value;
                  setParticipants(newParticipants);
                }}
                sx={{
                  width: "100%",
                  color: "black",
                  marginTop: "5px"
                }}
                InputLabelProps={{
                  style: { color: "#F26B42" },
                }}
              />
              {
                participants.length > 1 && 
                <IconButton color="error" onClick={() => handleDeleteUser(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            </Box>
          ))}

          <Button variant="contained" color="primary" sx={{marginTop: "10px"}} onClick={handleAddParticipant}>
            Add User
          </Button>

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onCreateNewGroupChat}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}