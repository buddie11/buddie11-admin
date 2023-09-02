import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { GoEye } from "react-icons/go";
// Images
import ApiServices from "services/ApiServices";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Data(props) {
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        ApiServices.getTeams().then((res) => {
          console.log("Team List", res.data)
          setTeams(res.data.body.documents);
        });
        // const seriesList = await seriesAPI.getSeries();
        // setSeries(seriesList);
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };
    fetchTeams();
  }, []);
  console.log(teams);
  const handleEdit = (item) => {
    console.log("Edit clicked for item:", item);
  };

  const TeamId = ({ teamId }) => (
    <MDBox ml={2} lineHeight={1}>
      <MDTypography 
      display="block"
      variant="caption"
      color="text"
      fontWeight="medium"
      >
        {teamId}
      </MDTypography>
    </MDBox>
  );

  const TeamName = ({ teamName }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {teamName}
      </MDTypography>
    </MDBox>
  );

  const tableData = () => {
    const data = teams.map((item, key) => ({
      teamId: <TeamId teamId={item.id} />,
      teamName: (
        <TeamName teamName={item.name} />
      ),
      teamShortName: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {item.shortName}
        </MDTypography>
      ),
      action: (
        <MDBox display="flex" justifyContent="space-around" alignItems="center">
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="info"
            fontWeight="medium"
            onClick={() => handleEdit(item)}
          >
            Edit
          </MDTypography>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="success"
            fontWeight="medium"
            margin="10px"
            onClick={() => setOpen(true)}
          >
            View
          </MDTypography>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="error"
            fontWeight="medium"
            onClick={() => handleEdit(item)}
          >
            Delete
          </MDTypography>
        </MDBox>
      ),
    }));
    //console.log("data", data);
    return data;
  };

  return {
    columns: [
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Team Id</span>,
        accessor: "teamId",
        align: "left",
      },
      {
       Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Team Name</span>, 
      accessor: "teamName",
       align: "left",
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Short Name</span>,
        accessor: "teamShortName",
        align: "left",
      },
      { Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Action</span>, 
      accessor: "action", 
      align: "left", 
    },
    ],

    rows: tableData(),
  };
}
