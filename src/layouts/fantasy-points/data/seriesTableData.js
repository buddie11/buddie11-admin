import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Images
import { useState, useEffect } from "react";
import { seriesAPI } from "services/api";
import React from "react";

export default function Data() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const seriesList = await seriesAPI.getSeries();
        setSeries(seriesList);
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };
    fetchSeries();
  }, []);
  const handleEdit = (item) => {
    console.log("Edit clicked for item:", item);
  };

  const SeriesName = ({ userId, body }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {userId}
        </MDTypography>
        <MDTypography variant="caption">{body.slice(0, 20)}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const SeriesGenre = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const tableData = () => {
    const data = series.map((item, key) => ({
      seriesName: <SeriesName userId={item.userId} body={item.body} />,
      seriesGenre: (
        <SeriesGenre title={item.title} description={item.description} />
      ),
      seriesDescription: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.badgeContent}
            color={item.color}
            variant={item.variant}
            size="sm"
          />
        </MDBox>
      ),
      seriesStartDate: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {item.startDate}
        </MDTypography>
      ),
      action: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={() => handleEdit(item)}
        >
          Edit
        </MDTypography>
      ),
    }));
    console.log("data", data);
    return data;
  };

  return {
    columns: [
      {
        Header: "seriesName",
        accessor: "seriesName",
        width: "45%",
        align: "left",
      },
      { Header: "seriesGenre", accessor: "seriesGenre", align: "left" },
      {
        Header: "seriesDescription",
        accessor: "seriesDescription",
        align: "center",
      },
      {
        Header: "seriesStartDate",
        accessor: "seriesStartDate",
        align: "center",
      },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: tableData(),
  };
}
