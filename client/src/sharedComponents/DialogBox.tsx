import React, { FC, useState } from 'react';
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteMyTour } from "../services/BookTours";
import { deleteBookedTour } from "../redux/actions/filesActions";
import { BookedTourSchema } from '../models/BookedTourSchema';

interface Props{
  deleteCheck: boolean;
  setDeleteCheck: React.Dispatch<React.SetStateAction<boolean>>;
  bookedTour: BookedTourSchema;
  setTourDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  tourDateCheck:boolean;
  tourName:string;
}

const DialogBox:FC<Props> = (
    {
        deleteCheck,
        setDeleteCheck,
        bookedTour,
        setTourDeleted,
        tourDateCheck,
        tourName,
      }) => {
      const [open, setOpen] = useState(deleteCheck);

      const dispatch = useDispatch();
    
      const handleClose = async () => {
        if (!tourDateCheck) {
          await deleteMyTour(bookedTour._id);
          dispatch(deleteBookedTour(bookedTour));
          setTourDeleted(true);
        } else {
          setOpen(false);
        }
    
        setDeleteCheck(false);
      };
    
      const handleCancel = () => {
        setOpen(false);
      };
    
 
  return (
    <div className="dialog-box-container">
      {tourDateCheck ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogTitle
            color="error"
            sx={{ fontSize: 20, fontWeight: "Bold" }}
            id="alert-dialog-title"
          >
            {"Delete Tour"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Unable to delete! 3 or less days remaining.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogTitle
            color="error"
            sx={{ fontSize: 20, fontWeight: "Bold" }}
            id="alert-dialog-title"
          >
            {"Delete Tour"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Are you sure to delete '${tourName}'?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default DialogBox
