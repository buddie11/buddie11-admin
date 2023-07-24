import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import AddSeriesModal from "./components/AddSeriesModal";
import seriesTableData from "layouts/series/data/seriesTableData";
import { useState } from "react";

function Series() {
  const { columns, rows } = seriesTableData();
  const [seriesObj, setSeriesObj] = useState("");

  const openModal = () => {
    return true;
  };

  const setSeriesData = (seriesData) => {
    console.log("series obj", seriesData);
    setSeriesObj(seriesData);
  };

  const handleOpen = () => {};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <span style={{ fontSize: "14px" }}>Name :</span>
      <MDInput style={{ height: "40px" }}/>
      <span style={{ fontSize: "14px" }}>Genre :</span>
      <MDInput style={{ height: "40px" }}/>
        <MDButton
          type="button"
          //onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Apply
        </MDButton>
        <MDButton
          type="reset"
          //onClick={handleSubmit}
          variant="contained"
          color="secondary"
        >
          Reset
        </MDButton>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h6" color="white">
                    Series List
                  </MDTypography>
                  {/* <MDButton
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                  >
                    Add Series
                  </MDButton> */}
                  <AddSeriesModal
                    title="Add Series"
                    setParentSeriesData={setSeriesData}
                    openModal={openModal}
                  />
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Series;
