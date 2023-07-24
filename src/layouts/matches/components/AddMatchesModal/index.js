import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import AuthorForm from "../MatchesForm";
import MDButton from "components/MDButton";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AddMatchesModal = ({ title }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Perform form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  return (
    <>
      <MDButton variant="contained" color="primary" onClick={handleOpen}>
        {title}
      </MDButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        className={classes.modal}
      >
        <DialogTitle>{title}</DialogTitle>
        <AuthorForm onSubmit={handleFormSubmit} onClose={handleClose} />
        {/* <DialogContent dividers>
          <AuthorForm onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default AddMatchesModal;
