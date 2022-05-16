import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteMyTour } from "../services/BookTours";
import { userDeleteTour } from "../redux/actions/filesActions";

export default function DialogBox({
  deleteCheck,
  setDeleteCheck,
  bookedTour,
  setTourDeleted,
}) {
  const [open, setOpen] = useState(deleteCheck);

  const dispatch = useDispatch();

  const handleClose = async () => {
    await deleteMyTour(bookedTour._id);
    dispatch(userDeleteTour(bookedTour));
    setTourDeleted(true);
    setOpen(false);
    setDeleteCheck(false);
  };

  return (
    <div className="dialog-box-container">
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
            Are you sure to delete 'Perez Art Meuseum Miami'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
