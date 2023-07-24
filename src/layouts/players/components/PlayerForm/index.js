import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

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

const PlayerForm = ({ initialData, readOnly, title, onClose }) => {
  const classes = useStyles();
  const [playerData, setPlayerData] = useState(
    initialData || {
      name: "",
      fullName: "",
      nickName: "",
      isCaptain: false,
      role: "",
      isKeeper: false,
      isSubstitute: false,
      teamShortName: "",
      battingStyle: "",
      bowlingStyle: "",
      image: "",
      playingXIChange: "",
      isSupportStaff: false,
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlayerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission logic here
      console.log("Form submitted:", playerData);
      // Reset form fields
      setPlayerData({
        name: "",
        fullName: "",
        nickName: "",
        isCaptain: false,
        role: "",
        isKeeper: false,
        isSubstitute: false,
        teamShortName: "",
        battingStyle: "",
        bowlingStyle: "",
        image: "",
        playingXIChange: "",
        isSupportStaff: false,
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!playerData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!playerData.role) {
      validationErrors.role = "Role is required";
    }

    if (!playerData.battingStyle) {
      validationErrors.battingStyle = "Batting style is required";
    }

    if (!playerData.bowlingStyle) {
      validationErrors.bowlingStyle = "Bowling style is required";
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
                name="name"
                value={playerData.name}
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
                label="Full Name"
                name="fullName"
                value={playerData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Nick Name"
                name="nickName"
                value={playerData.nickName}
                onChange={handleChange}
                error={!!errors.nickName}
                helperText={errors.nickName}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              >
                <InputLabel>Is Captain</InputLabel>
                <Select
                  name="isCaptain"
                  value={playerData.isCaptain}
                  onChange={handleChange}
                  error={!!errors.isCaptain}
                  label="Is Captain"
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Role"
                name="role"
                value={playerData.role}
                onChange={handleChange}
                error={!!errors.role}
                helperText={errors.role}
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              >
                <InputLabel>Is Keeper</InputLabel>
                <Select
                  name="isKeeper"
                  value={playerData.isKeeper}
                  onChange={handleChange}
                  error={!!errors.isKeeper}
                  label="Is Keeper"
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              >
                <InputLabel>Is Substitute</InputLabel>
                <Select
                  name="isSubstitute"
                  value={playerData.isSubstitute}
                  onChange={handleChange}
                  error={!!errors.isSubstitute}
                  label="Is Substitute"
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Team Short Name"
                name="teamShortName"
                value={playerData.teamShortName}
                onChange={handleChange}
                error={!!errors.teamShortName}
                helperText={errors.teamShortName}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Batting Style"
                name="battingStyle"
                value={playerData.battingStyle}
                onChange={handleChange}
                error={!!errors.battingStyle}
                helperText={errors.battingStyle}
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Bowling Style"
                name="bowlingStyle"
                value={playerData.bowlingStyle}
                onChange={handleChange}
                error={!!errors.bowlingStyle}
                helperText={errors.bowlingStyle}
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={6}>
              <MDInput
                label="Image"
                name="image"
                type="file"
                value={playerData.image}
                onChange={handleChange}
                error={!!errors.image}
                helperText={errors.image}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Playing XI Change"
                name="playingXIChange"
                value={playerData.playingXIChange}
                onChange={handleChange}
                error={!!errors.playingXIChange}
                helperText={errors.playingXIChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                disabled={readOnly}
              >
                <InputLabel>Is Support Staff</InputLabel>
                <Select
                  name="isSupportStaff"
                  value={playerData.isSupportStaff}
                  onChange={handleChange}
                  error={!!errors.isSupportStaff}
                  label="Is Support Staff"
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={onClose}>Cancel</MDButton>
        {!readOnly && (
          <MDButton
            type="button"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </MDButton>
        )}
      </DialogActions>
    </>
  );
};

export default PlayerForm;
