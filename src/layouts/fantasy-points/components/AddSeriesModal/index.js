import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SeriesForm from "../SeriesForm";
import MDButton from "components/MDButton";
import { Dialog } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AddSeriesModal = ({ title, setParentSeriesData, openModal }) => {
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

  const getSeriesData = (seriesData) => {
    setParentSeriesData(seriesData);
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
        <SeriesForm
          onSubmit={handleFormSubmit}
          onClose={handleClose}
          title={title}
          getSeriesData={getSeriesData}
        />
      </Dialog>
    </>
  );
};

export default AddSeriesModal;
