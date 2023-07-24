import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import MDInput from "components/MDInput";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}));

const AuthorForm = ({ initialData, readOnly }) => {
  const classes = useStyles();
  const [authorData, setAuthorData] = useState(
    initialData || {
      name: "",
      email: "",
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission logic here
      console.log("Form submitted:", authorData);
      // Reset form fields
      setAuthorData({
        name: "",
        email: "",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!authorData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!authorData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(authorData.email)) {
      validationErrors.email = "Invalid email address";
    }

    return validationErrors;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MDInput
            label="Name"
            name="name"
            value={authorData.name}
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
            label="Email"
            name="email"
            value={authorData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            fullWidth
            required
            disabled={readOnly}
          />
        </Grid>
        {!readOnly && (
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default AuthorForm;
