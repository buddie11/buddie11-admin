/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */


import { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ApiServices from "services/ApiServices";

export default function Data() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        ApiServices.getMatches().then((res) => {
          console.log("Matches List", res.data.body.documents)
          setMatches(res.data.body.documents);
        });
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);
  console.log(matches);
  const handleEdit = (item) => {
    console.log("Edit clicked for item:", item);
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // This will display time in 24-hour format
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options).replace(/,/g, ' ');
  };

  const MatchStage = ({ matchStage }) => (
    <MDBox display="flex" alignItems="left" lineHeight={1}>
      <MDBox ml={1} lineHeight={1}>
        <MDTypography 
        display="block" 
        variant="caption" 
        color="text"
        fontWeight="medium"
        >
          {matchStage}
        </MDTypography>
        {/* <MDTypography display="block" fontWeight="medium" variant="caption">Team Name:-{body}</MDTypography> */}
      </MDBox>
    </MDBox>
  );

  const MatchDescription = ({ matchDescription }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {matchDescription}
      </MDTypography>
    </MDBox>
  );

  const MatchFormat = ({ matchFormat }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {matchFormat}
      </MDTypography>
    </MDBox>
  );

  const MatchStartDate = ({ matchStartDate }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {formatDate(matchStartDate)}
      </MDTypography>
    </MDBox>
  );

  const MatchEndDate = ({ matchEndDate }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
      {formatDate(matchEndDate)}
      </MDTypography>
    </MDBox>
  );

  const SeriesName = ({ seriesName }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {seriesName}
      </MDTypography>
    </MDBox>
  );

  const tableData = () => {
    const data = matches.map((item, key) => ({
      matchStage: <MatchStage matchStage = {item.matchStage} />,
      matchDescription: <MatchDescription matchDescription = {item.matchDesc} />,
      matchFormat: <MatchFormat matchFormat={item.matchFormat} />,
      matchStartDate: <MatchStartDate matchStartDate = {item.matchStartDate} />,
      matchEndDate: <MatchEndDate matchEndDate = {item.matchEndDate} />,
      seriesName: <SeriesName seriesName = {item.series.seriesName} />,

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
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Match Stage</span>,
        accessor: "matchStage",
        align: "left",
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Description</span>,
        accessor: "matchDescription",
        align: "left"
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Format</span>,
        accessor: "matchFormat",
        align: "left",
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Start Date</span>,
        accessor: "matchStartDate",
        align: "left",
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>End Date</span>,
        accessor: "matchEndDate",
        align: "left",
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Series Name</span>,
        accessor: "seriesName",
        align: "left",
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Action</span>,
        accessor: "action",
        align: "left"
      },
    ],

    rows: tableData(),
  };
}