import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useState, useEffect } from "react";
import React from "react";
import ApiServices from "services/ApiServices";

export default function Data() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const queryParams1 = { page: 1, perPage:20};
        ApiServices.getSeries(queryParams1).then((res) => {
          console.log("Series List", res.data.body.documents);
          setSeries(res.data.body.documents);
        });
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };
    fetchSeries();
  }, []);
  console.log(series);
  const handleEdit = (item) => {
    console.log("Edit clicked for item:", item);
  };

  const SeriesName = ({ seriesName }) => (
    <MDBox display="flex" alignItems="left" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography
          // display="block" variant="button" fontWeight="medium"
          display="block"
          variant="button"
          color="text"
          fontWeight="medium"
        >
          {seriesName}
        </MDTypography>
        {/* <MDTypography variant="caption">{body.slice(0, 20)}</MDTypography> */}
      </MDBox>
    </MDBox>
  );

  const SeriesGenre = ({ seriesGenre }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {seriesGenre}
      </MDTypography>
      {/* <MDTypography variant="caption">{description}</MDTypography> */}
    </MDBox>
  );

  const tableData = () => {
    const data = series.map((item, key) => ({
      seriesName: <SeriesName seriesName={item.seriesName} />,
      seriesGenre: (
        <SeriesGenre seriesGenre={item.seriesGener} />
      ),
      seriesStartDate: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {item.seriesStartDate.split("T")[0]}
        </MDTypography>
      ),
      seriesEndDate: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {item.seriesEndDate.split("T")[0]}
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
    //console.log("data", data);
    return data;
  };

  return {
    columns: [
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Series Name</span>,
        accessor: 'seriesName',
        align: 'left',
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Genre</span>,
        accessor: 'seriesGenre',
        align: 'left',
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Start Date</span>,
        accessor: 'seriesStartDate',
        align: 'left',
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>End Date</span>,
        accessor: 'seriesEndDate',
        align: 'left',
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Action</span>,
        accessor: 'action',
        align: 'left',
      }
    ],
    rows: tableData(),
  };
}
