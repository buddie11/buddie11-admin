import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import { useState, useEffect } from "react";
import React from "react";
import ApiServices from "services/ApiServices";

export default function Data() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        ApiServices.getPlayers().then((res) => {
          console.log("Player List", res.data.body.documents);
          setPlayers(res.data.body.documents);
        });
        // const seriesList = await seriesAPI.getSeries();
        // setSeries(seriesList);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);
  console.log(players);
  const handleEdit = (item) => {
    console.log("Edit clicked for item:", item);
  };
   const PlayerImage = ({ playerImage }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
      <img
        src={playerImage || 'https://img-store-dev.xmanna.com/adminAvatars/avatars-1649679279791.jpeg'} // Replace 'sample-image-url' with the URL of your sample image
        style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%' }}
      />
        <MDTypography
          // display="block" variant="button" fontWeight="medium"
          display="block"
          variant="button"
          color="text"
          fontWeight="medium"
        >
          {playerImage}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const PlayerName = ({ playerName }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {playerName}
      </MDTypography>
    </MDBox>
  );

  const PlayerRole = ({ playerRole }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {playerRole}
      </MDTypography>
    </MDBox>
  );

  const PlayerBattingStyle = ({ playerBattingStyle }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {playerBattingStyle}
      </MDTypography>
    </MDBox>
  );

  const PlayerBowlingStyle = ({ playerBowlingStyle }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {playerBowlingStyle}
      </MDTypography>
    </MDBox>
  );
  const tableData = () => {
    const data = players.map((item, key) => ({
      //seriesId: <SeriesId seriesId={item.id} />,
      playerImage: <PlayerImage playerImage={item.image} />,
      playerName: <PlayerName playerName={item.fullName}/>,
      playerRole: <PlayerRole playerRole={item.role}/>,
      playerBattingStyle: <PlayerBattingStyle playerBattingStyle={item.battingStyle}/>,
      playerBowlingStyle: <PlayerBowlingStyle playerBowlingStyle={item.bowlingStyle}/>,
    
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
    return data;
  };

  return {
    columns: [
      
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Image</span>,
        accessor: 'playerImage',
        align: 'left',
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Name</span>,
        accessor: 'playerName',
        align: 'left',
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Role</span>,
        accessor: 'playerRole',
        align: 'left',
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Batting Style</span>,
        accessor: 'playerBattingStyle',
        align: 'left',
      },
      {
        Header: <span style={{ textTransform: 'capitalize', color: 'black', fontSize: '14px' }}>Bowling Style</span>,
        accessor: 'playerBowlingStyle',
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
