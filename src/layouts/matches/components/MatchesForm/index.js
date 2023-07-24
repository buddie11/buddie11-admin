import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import MDButton from "components/MDButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MDInput from "components/MDInput";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}));

const MATCH_GENRE = {
  INTERNATIONAL: "International",
  DOMESTIC: "Domestic",
  LEAGUE: "League",
  WOMEN: "Women",
};

const MATCH_STAGE ={
  UPCOMING: "Upcoming",
  PREVIEW: "Preview",
  LIVE: "Live",
  RECENT: "Recent"
};

const AuthorForm = ({ initialData, readOnly, onClose }) => {
  const classes = useStyles();
  const [authorData, setAuthorData] = useState(
    initialData || {
      series: "",
      matchGener: "",
      isWomen: false,
      matchStage: "",
      matchDesc: "",
      matchFormat: "",
      matchStartDate: "",
      matchEndDate: "",
      team1: {
        teamId: "",
        playersInfo: ["team1"],
        playingXIInfo: ["team1 player"],
        bench: ["bench players"],
      },
      team2: {
        teamId: "",
        playersInfo: ["team2"],
        playingXIInfo: ["team2 player"],
        bench: ["bench player"],
      },
      venueInfo: {
        ground: "",
        city: "",
        timezone: "",
        lat: "",
        long: "",
        country: "",
        imageUrl: "",
      },
      isFantasyEnabled: true,
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("value", name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission logic here
      console.log("Form submitted:", authorData);
      // Reset form fields
      setAuthorData({
        series: "",
        matchGener: "",
        isWomen: false,
        matchStage: "",
        matchDesc: "",
        matchFormat: "",
        matchStartDate: "",
        matchEndDate: "",
        team1: {
          teamId: "",
          playersInfo: [],
          playingXIInfo: [],
          bench: [],
        },
        team2: {
          teamId: "",
          playersInfo: [],
          playingXIInfo: [],
          bench: [],
        },
        venueInfo: {
          ground: "",
          city: "",
          timezone: "",
          lat: "",
          long: "",
          country: "",
          imageUrl: "",
        },
        isFantasyEnabled: true,
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!authorData.series.trim()) {
      validationErrors.series = "Series is required";
    }

    if (!authorData.matchGener.trim()) {
      validationErrors.matchGener = "Match genre is required";
    }

    // Add additional validation rules for other fields

    return validationErrors;
  };

  return (
    <>
      <DialogContent dividers>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                required
                disabled={readOnly}
              >
                <InputLabel>Series</InputLabel>
                <Select
                  name="series"
                  value={authorData.series}
                  onChange={handleChange}
                  error={!!errors.series}
                  helperText={errors.series}
                  label="Series"
                >
                  <MenuItem value={"series1"}>series1</MenuItem>
                  <MenuItem value={"series2"}>series2</MenuItem>
                </Select>
              </FormControl>
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
                  name="matchGener"
                  value={authorData.matchGener}
                  onChange={handleChange}
                  error={!!errors.matchGener}
                  helperText={errors.matchGener}
                  variant="outlined"
                  fullWidth
                  required
                  disabled={readOnly}
                >
                  {Object.values(MATCH_GENRE).map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="Is Women"
                control={<Checkbox onChange={handleChange} />}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Match Stage"
                name="matchStage"
                value={authorData.matchStage}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Match Description"
                name="matchDesc"
                value={authorData.matchDesc}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Match Format"
                name="matchFormat"
                value={authorData.matchFormat}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Start Date"
                name="matchStartDate"
                type="date"
                value={authorData.matchStartDate}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="End Date"
                name="matchEndDate"
                type="date"
                value={authorData.matchEndDate}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MDInput
                label="Team 1 ID"
                name="team1.teamId"
                value={authorData.team1.teamId}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Input fields for team1.playersInfo */}
              {authorData.team1.playersInfo.map((player, index) => (
                <MDInput
                  key={index}
                  label={`Player ${index + 1}`}
                  name={`team1.playersInfo[${index}]`}
                  value={player}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  disabled={readOnly}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              {/* Input fields for team1.playingXIInfo */}
              {authorData.team1.playingXIInfo.map((player, index) => (
                <MDInput
                  key={index}
                  label={`Playing XI ${index + 1}`}
                  name={`team1.playingXIInfo[${index}]`}
                  value={player}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  disabled={readOnly}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              {/* Input fields for team1.bench */}
              {authorData.team1.bench.map((player, index) => (
                <MDInput
                  key={index}
                  label={`Bench Player ${index + 1}`}
                  name={`team1.bench[${index}]`}
                  value={player}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  disabled={readOnly}
                />
              ))}
            </Grid>
            {/* Input fields for team2 */}
            <Grid item xs={12}>
              <MDInput
                label="Team 2 ID"
                name="team2.teamId"
                value={authorData.team2.teamId}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Input fields for team2.playersInfo */}
              {authorData.team2.playersInfo.map((player, index) => (
                <MDInput
                  key={index}
                  label={`Player ${index + 1}`}
                  name={`team2.playersInfo[${index}]`}
                  value={player}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  disabled={readOnly}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              {/* Input fields for team2.playingXIInfo */}
              {authorData.team2.playingXIInfo.map((player, index) => (
                <MDInput
                  key={index}
                  label={`Playing XI ${index + 1}`}
                  name={`team2.playingXIInfo[${index}]`}
                  value={player}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  disabled={readOnly}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              {/* Input fields for team2.bench */}
              {authorData.team2.bench.map((player, index) => (
                <MDInput
                  key={index}
                  label={`Bench Player ${index + 1}`}
                  name={`team2.bench[${index}]`}
                  value={player}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  disabled={readOnly}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Team 2 ID"
                name="team2.teamId"
                value={authorData.team2.teamId}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Venue Ground"
                name="venueInfo.ground"
                value={authorData.venueInfo.ground}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Venue City"
                name="venueInfo.city"
                value={authorData.venueInfo.city}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Venue Timezone"
                name="venueInfo.timezone"
                value={authorData.venueInfo.timezone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Venue Latitude"
                name="venueInfo.lat"
                value={authorData.venueInfo.lat}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Venue Longitude"
                name="venueInfo.long"
                value={authorData.venueInfo.long}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Venue Country"
                name="venueInfo.country"
                value={authorData.venueInfo.country}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Venue Image URL"
                name="venueInfo.imageUrl"
                value={authorData.venueInfo.imageUrl}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            {/* {!readOnly && (
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            )} */}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={onClose}>Cancel</MDButton>
        <MDButton
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </MDButton>
      </DialogActions>
    </>
  );
};

export default AuthorForm;
