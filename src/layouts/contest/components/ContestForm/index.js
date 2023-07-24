// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid } from "@material-ui/core";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import { DialogTitle, DialogContent, DialogActions } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },
// }));

// const ContestForm = ({ initialData, readOnly, title, onClose }) => {
//   const classes = useStyles();
//   const [authorData, setAuthorData] = useState(
//     initialData || {
//       cbTeamId: "",
//       name: "",
//       shortName: "",
//     }
//   );
//   const [errors, setErrors] = useState({});

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setAuthorData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       // Perform form submission logic here
//       console.log("Form submitted:", authorData);
//       // Reset form fields
//       setAuthorData({
//         cbTeamId: "",
//         name: "",
//         shortName: "",
//       });
//       onClose();
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const validateForm = () => {
//     let validationErrors = {};

//     if (!authorData.name.trim()) {
//       validationErrors.name = "Name is required";
//     }

//     return validationErrors;
//   };

//   return (
//     <>
//       <DialogTitle>{title}</DialogTitle>
//       <DialogContent dividers>
//         {/* <AuthorForm onSubmit={handleFormSubmit} /> */}
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <MDInput
//                 label="Team ID"
//                 name="cbTeamId"
//                 value={authorData.cbTeamId}
//                 onChange={handleChange}
//                 variant="outlined"
//                 fullWidth
//                 disabled={readOnly}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <MDInput
//                 label="Name"
//                 name="name"
//                 value={authorData.name}
//                 onChange={handleChange}
//                 error={!!errors.name}
//                 helperText={errors.name}
//                 variant="outlined"
//                 fullWidth
//                 required
//                 disabled={readOnly}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <MDInput
//                 label="Short Name"
//                 name="shortName"
//                 value={authorData.shortName}
//                 onChange={handleChange}
//                 variant="outlined"
//                 fullWidth
//                 disabled={readOnly}
//               />
//             </Grid>
//             {/* {!readOnly && (
//               <Grid item xs={12} className={classes.buttonContainer}>
//                 <MDButton type="submit" variant="contained" color="primary">
//                   Submit
//                 </MDButton>
//               </Grid>
//             )} */}
//           </Grid>
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <MDButton onClick={onClose}>Cancel</MDButton>
//         <MDButton
//           type="button"
//           onClick={handleSubmit}
//           variant="contained"
//           color="primary"
//         >
//           Submit
//         </MDButton>
//       </DialogActions>
//     </>
//   );
// };

// export default ContestForm;

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import ApiServices from "services/ApiServices";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}));
const contestTypes = [
  "Mega Or Grand Contests",
  "Trending",
  "HeadToHead",
  "WinnerstakesAll",
  "WinBig",
  "HotContests",
];
const feeType=["Free","Paid"]

const isBonus = ["Yes","No"];

const ContestForm = ({ initialData, readOnly, title, onClose }) => {
  const classes = useStyles();
  const [contestData, setContestData] = useState({
    isFee: "",
    cricketMatch:"",
    entryFee:"",
    type:"",
    totalSpots:"",
    minSpots:"",
    firstPrize:"",
    usableBonusPercent:"",
    isBonusContest:false,
    maxTeamAllowed:"",
    contesStartDate:""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission logic here
      console.log("Form submitted:", contestData);
      // Reset form fields
      setContestData({
        isFree: "",
        cricketMatch:"",
        entryFee:"",
        type:"",
        totalSpots:"",
        minSpots:"",
        firstPrize:"",
        usableBonusPercent:"",
        isBonusContest:false,
        maxTeamAllowed:"",
        contesStartDate:""
      });
      return
    } else {
      //setErrors(validationErrors);
      ApiServices.addContest(contestData)
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!contestData.isFee.trim()) {
      validationErrors.isFee = "Free contest type is required";
    }

    if (!contestData.cricketMatch.trim()) {
      validationErrors.cricketMatch = "Match ID is required";
    }

    if (!contestData.entryFee.trim()) {
      validationErrors.entryFee = "Entry fee is required";
    }

    if (!contestData.type.trim()) {
      validationErrors.type = "Contest type is required";
    }

    if (!contestData.totalSpots.trim()) {
      validationErrors.totalSpots = "Total spots is required";
    }

    if (!contestData.minSpots.trim()) {
      validationErrors.minSpots = "Total winners is required";
    }

    if (!contestData.firstPrize.trim()) {
      validationErrors.firstPrize = "First prize is required";
    }

    if (!contestData.winnerPercentage.trim()) {
      validationErrors.winnerPercentage = "Winner percentage is required";
    }

    if (!contestData.cancellation.trim()) {
      validationErrors.cancellation = "Cancellation is required";
    }

    if (!contestData.totalWinningPrize.trim()) {
      validationErrors.totalWinningPrize = "Total winning prize is required";
    }

    if (!contestData.usableBonusPercent.trim()) {
      validationErrors.usableBonusPercent = "Usable bonus percent is required";
    }

    // if (!contestData.isBonusContest.trim()) {
    //   validationErrors.isBonusContest = "Bonus contest is required";
    // }

    if (!contestData.maxTeamAllowed.trim()) {
      validationErrors.maxTeamAllowed = "Maximum team allowed is required";
    }

    if(!contestData.contesStartDate.trim()){
      validationErrors.maxTeamAllowed="Star Date is required";
      
    }

    return validationErrors;
  };

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <MDInput
                label="Free Contest Type"
                name="freeContestType"
                value={contestData.freeContestType}
                onChange={handleChange}
                error={!!errors.freeContestType}
                helperText={errors.freeContestType}
                variant="outlined"
                fullWidth
                required
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="bonus-contest">
                  &nbsp; <span style={{ fontSize: "13px" }}>Entry Type</span>
                </InputLabel>
                <Select
                  label="Entry Type"
                  labelId="isFee"
                  name="isFee"
                  value={contestData.isFee}
                  onChange={handleChange}
                  error={!!errors.isFee}
                  helperText={errors.isFee}
                  variant="outlined"
                  fullWidth
                  required
                >
                  {feeType.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Match Category"
                name="cricketMatch"
                value={contestData.cricketMatch}
                onChange={handleChange}
                error={!!errors.cricketMatch}
                helperText={errors.cricketMatch}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Entry Fee"
                name="entryFee"
                value={contestData.entryFee}
                onChange={handleChange}
                error={!!errors.entryFee}
                helperText={errors.entryFee}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="bonus-contest">
                  &nbsp; <span style={{ fontSize: "13px" }}>Contest Type</span>
                </InputLabel>
                <Select
                  label="Contest Type"
                  labelId="contest-type"
                  name="type"
                  value={contestData.type}
                  onChange={handleChange}
                  error={!!errors.type}
                  helperText={errors.type}
                  variant="outlined"
                  fullWidth
                  required
                >
                  {contestTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Total Spots"
                name="totalSpots"
                value={contestData.totalSpots}
                onChange={handleChange}
                error={!!errors.totalSpots}
                helperText={errors.totalSpots}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Minimum Spots"
                name="minSpots"
                value={contestData.minSpots>0?contestData.minSpots:0}
                onChange={handleChange}
                error={!!errors.totalWinner}
                helperText={errors.totalWinner}
                variant="outlined"
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="First Prize"
                name="firstPrize"
                value={contestData.firstPrize>0?contestData.firstPrize:0}
                onChange={handleChange}
                error={!!errors.firstPrize}
                helperText={errors.firstPrize}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            {/* <Grid item xs={12}>
              <MDInput
                label="Maximum Team Allowed"
                name="maxTeamAllowed"
                value={contestData.maxTeamAllowed}
                onChange={handleChange}
                error={!!errors.winnerPercentage}
                helperText={errors.winnerPercentage}
                variant="outlined"
                fullWidth
                required
              />
            </Grid> */}
            <Grid item xs={12}>
              <MDInput
                label="Usable Bonus Percent"
                name="usableBonusPercent"
                value={contestData.usableBonusPercent}
                onChange={handleChange}
                error={!!errors.cancellation}
                helperText={errors.cancellation}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Total Winning Prize"
                name="totalWinningPrize"
                value={contestData.totalWinningPrize}
                onChange={handleChange}
                error={!!errors.totalWinningPrize}
                helperText={errors.totalWinningPrize}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="bonus-contest">
                  &nbsp;{" "}
                  <span style={{ fontSize: "13px" }}>Is Bonus Contest</span>
                </InputLabel>
                <Select
                  labelId="bonus-contest"
                  label="Is Bonus Contest"
                  name="bonusContest"
                  value={contestData.isBonusContest}
                  onChange={handleChange}
                  error={!!errors.isBonusContest}
                  helperText={errors.isBonusContest}
                  variant="outlined"
                  fullWidth
                  required
                >
                  {isBonus.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Contes Start Date"
                name="contesStartDate"
                value={contestData.contesStartDate}
                onChange={handleChange}
                error={!!errors.contesStartDate}
                helperText={errors.contesStartDate}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                label="Maximum Team Allowed"
                name="maxTeamAllowed"
                value={contestData.maxTeamAllowed>0?contestData.maxTeamAllowed:0}
                onChange={handleChange}
                error={!!errors.maxTeamAllowed}
                helperText={errors.maxTeamAllowed}
                type="number"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={onClose}>Cancel</MDButton>
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

export default ContestForm;
