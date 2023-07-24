import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";
import ContestForm from "../ContestForm";
import MDButton from "components/MDButton";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AddContestModal = ({ title }) => {
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
        <ContestForm
          onSubmit={handleFormSubmit}
          onClose={handleClose}
          title={title}
        />

        {/* <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <AuthorForm onSubmit={handleFormSubmit} />
        </DialogContent> */}
      </Dialog>
    </>
  );
};

export default AddContestModal;
