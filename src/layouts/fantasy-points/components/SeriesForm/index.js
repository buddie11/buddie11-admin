import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { DialogTitle, DialogContent, DialogActions } from "@material-ui/core";

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
  const [playerData, setPlayerData] = useState(
    initialData || {
      batting: [{ type: "", points: 1 }],
      bowling: [{ type: "", points: 1 }],
      fielding: [{ type: "", points: 1 }],
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (event, index, field) => {
    const { name, value } = event.target;
    setPlayerData((prevData) => {
      const newData = { ...prevData };
      newData[field][index] = { ...newData[field][index], [name]: value };
      return newData;
    });
  };

  const handleAddField = (field) => {
    setPlayerData((prevData) => {
      const newData = { ...prevData };
      newData[field].push({ type: "", points: 1 });
      return newData;
    });
  };

  const handleRemoveField = (index, field) => {
    setPlayerData((prevData) => {
      const newData = { ...prevData };
      newData[field].splice(index, 1);
      return newData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission logic here
      console.log("Form submitted:", playerData);
      // Reset form fields
      setPlayerData({
        batting: [{ type: "", points: 1 }],
        bowling: [{ type: "", points: 1 }],
        fielding: [{ type: "", points: 1 }],
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    // Additional validation for batting, bowling, and fielding point fields can be added here

    return validationErrors;
  };
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!readOnly && (
              <Grid item xs={12}>
                <MDButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleAddField("batting")}
                >
                  Add Batting Field
                </MDButton>
              </Grid>
            )}
            {playerData.batting.map((battingItem, index) => (
              <React.Fragment key={index}>
                <Grid item xs={5}>
                  <MDInput
                    label="Batting Type"
                    name={`batting[${index}].type`}
                    value={battingItem.type}
                    onChange={(event) => handleChange(event, index, "batting")}
                    variant="outlined"
                    fullWidth
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={5}>
                  <MDInput
                    label="Points"
                    name={`batting[${index}].points`}
                    value={battingItem.points}
                    onChange={(event) => handleChange(event, index, "batting")}
                    variant="outlined"
                    fullWidth
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={2}>
                  {!readOnly && (
                    <MDButton
                      variant="outlined"
                      color="primary"
                      onClick={() => handleRemoveField(index, "batting")}
                    >
                      Remove
                    </MDButton>
                  )}
                </Grid>
              </React.Fragment>
            ))}
            {!readOnly && (
              <Grid item xs={12}>
                <MDButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleAddField("bowling")}
                >
                  Add Bowling Field
                </MDButton>
              </Grid>
            )}
            {playerData.bowling.map((bowlingItem, index) => (
              <React.Fragment key={index}>
                <Grid item xs={5}>
                  <MDInput
                    label="Bowling Type"
                    name={`bowling[${index}].type`}
                    value={bowlingItem.type}
                    onChange={(event) => handleChange(event, index, "bowling")}
                    variant="outlined"
                    fullWidth
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={5}>
                  <MDInput
                    label="Points"
                    name={`bowling[${index}].points`}
                    value={bowlingItem.points}
                    onChange={(event) => handleChange(event, index, "bowling")}
                    variant="outlined"
                    fullWidth
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={2}>
                  {!readOnly && (
                    <MDButton
                      variant="outlined"
                      color="primary"
                      onClick={() => handleRemoveField(index, "bowling")}
                    >
                      Remove
                    </MDButton>
                  )}
                </Grid>
              </React.Fragment>
            ))}
            {!readOnly && (
              <Grid item xs={12}>
                <MDButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleAddField("fielding")}
                >
                  Add Fielding Field
                </MDButton>
              </Grid>
            )}
            {playerData.fielding.map((fieldingItem, index) => (
              <React.Fragment key={index}>
                <Grid item xs={5}>
                  <MDInput
                    label="Fielding Type"
                    name={`fielding[${index}].type`}
                    value={fieldingItem.type}
                    onChange={(event) => handleChange(event, index, "fielding")}
                    variant="outlined"
                    fullWidth
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={5}>
                  <MDInput
                    label="Points"
                    name={`fielding[${index}].points`}
                    value={fieldingItem.points}
                    onChange={(event) => handleChange(event, index, "fielding")}
                    variant="outlined"
                    fullWidth
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={2}>
                  {!readOnly && (
                    <MDButton
                      variant="outlined"
                      color="primary"
                      onClick={() => handleRemoveField(index, "fielding")}
                    >
                      Remove
                    </MDButton>
                  )}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </MDButton>
        {!readOnly && (
          <MDButton
            type="button"
            onClick={handleSubmit}
            variant="contained"
            color="info"
          >
            Submit
          </MDButton>
        )}
      </DialogActions>
    </>
  );
};

export default SeriesForm;
