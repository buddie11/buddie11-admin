import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { object } from "prop-types";
import ApiServices from "services/ApiServices";
import axios from "axios";
const SERIES_GENRE = {
  INTERNATIONAL: "International",
  DOMESTIC: "Domestic",
  LEAGUE: "League",
  WOMEN: "Women",
};

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const SeriesForm = ({
  initialData,
  readOnly,
  onClose,
  title,
  getSeriesData,
}) => {
  const classes = useStyles();
  const [seriesData, setSeriesData] = useState(
    initialData || {
      seriesName: "",
      seriesGener: "",
      //seriesDesc: "",
      seriesStartDate: "",
      seriesEndDate: "",
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSeriesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission logic here
    const res=await  axios.post(
        "http://buddie11server-env.eba-2kf2ar47.us-east-1.elasticbeanstalk.com/v1/series/create",
        {
          seriesName: seriesData.seriesName,
          seriesGener: seriesData.seriesGener,
          seriesStartDate: seriesData.seriesStartDate,
          seriesEndDate: seriesData.seriesEndDate,
        }
      );
      console.log(res)
      //console.log("Form submitted:", seriesData);
      //getSeriesData(seriesData);

      // Reset form fields
      setSeriesData({
        seriesName: "",
        seriesGener: "",
        //seriesDesc: "",
        seriesStartDate: "",
        seriesEndDate: "",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!seriesData.seriesName.trim()) {
      validationErrors.seriesName = "Series name is required";
    }

    if (!seriesData.seriesStartDate) {
      validationErrors.seriesStartDate = "Start date is required";
    }

    if (!seriesData.seriesEndDate) {
      validationErrors.seriesEndDate = "End date is required";
    }

    return validationErrors;
  };

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {/* <AuthorForm onSubmit={handleFormSubmit} /> */}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MDInput
                label="Name"
                name="seriesName"
                value={seriesData.seriesName}
                onChange={handleChange}
                error={!!errors.seriesName}
                helperText={errors.seriesName}
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                required
                disabled={readOnly}
              >
                <InputLabel>Genre</InputLabel>
                <Select
                  label="Genre"
                  name="seriesGener"
                  value={seriesData.seriesGener}
                  onChange={handleChange}
                  error={!!errors.seriesGener}
                  helperText={errors.seriesGener}
                  variant="outlined"
                  fullWidth
                  required
                  disabled={readOnly}
                >
                  {Object.values(SERIES_GENRE).map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <MDInput
                label="Series Description"
                name="seriesDesc"
                value={seriesData.seriesDesc}
                onChange={handleChange}
                error={!!errors.seriesDesc}
                helperText={errors.seriesDesc}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid> */}
            <Grid item xs={12}>
              <MDInput
                label="Start Date"
                name="seriesStartDate"
                type="date"
                value={seriesData.seriesStartDate}
                onChange={handleChange}
                error={!!errors.seriesStartDate}
                helperText={errors.seriesStartDate}
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="End Date"
                name="seriesEndDate"
                type="date"
                value={seriesData.seriesEndDate}
                onChange={handleChange}
                error={!!errors.seriesEndDate}
                helperText={errors.seriesEndDate}
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* {!readOnly && (
          <Grid item xs={12} className={classes.buttonContainer}>
            <MDButton type="submit" variant="contained" color="primary">
              Submit
            </MDButton>
          </Grid>
        )} */}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <MDButton
          type="button"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </MDButton>
      </DialogActions>
    </>
  );
};

export default SeriesForm;
