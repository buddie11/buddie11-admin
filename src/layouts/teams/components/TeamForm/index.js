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
  const [teamData, setTeamData] = useState(
    initialData || {
      name: "",
      shortName: "",
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeamData((prevData) => ({
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
        "http://buddie11server-env.eba-2kf2ar47.us-east-1.elasticbeanstalk.com/v1/teams/create",
        {
          name: teamData.name,
          shortName: teamData.shortName,
        }
      );
      console.log(res)
      getSeriesData(teamData);

      // Reset form fields
      setTeamData({
        name: "",
        shortName: "",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!teamData.name.trim()) {
      validationErrors.name = "Series name is required";
    }

    if (!teamData.shortName) {
      validationErrors.shortName = "Start date is required";
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
                label="Team Name"
                name="name"
                value={teamData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Short Name"
                name="shortName"
                value={teamData.shortName}
                onChange={handleChange}
                error={!!errors.shortName}
                helperText={errors.shortName}
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
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
