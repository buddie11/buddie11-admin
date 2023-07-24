import Api from "./API";

export default {
  getAllOffices(queryParams) {
    return Api().get("location/getAllData", { params: queryParams });
  },
  addSeries(seriesData) {
    console.log(seriesData);
    return Api().post("v1/series/create", {
      seriesName: seriesData.seriesName,
      seriesGener: seriesData.seriesGener,
      seriesStartDate: seriesData.seriesStartDate,
      seriesEndDate: seriesData.seriesEndDate,
    });
  },
  getSeries(queryParams) {
    return Api().get("v1/series/read", { params: queryParams });
  },
  editSeries() {
    return Api().post("");
  },
  deleteSeries() {
    return Api().post("");
  },
  addTeams() {
    return Api().post();
  },
  getTeams() {
    return Api().get("v1/teams/read");
  },
  editTeams() {
    return Api().post();
  },
  deleteTeams() {
    return Api().post();
  },
  addMatches() {
    return Api().post();
  },
  getMatches() {
    return Api().get("v1/matches/read");
  },
  editMatches() {
    return Api().post();
  },
  deleteMatches() {
    return Api().post();
  },
  abbPlayers() {
    return Api().post();
  },
  getPlayers() {
    return Api().get("v1/players/read");
  },
  editPlayers() {
    return Api().post();
  },
  deletePlayers() {
    return Api().post();
  },
  addContest(contestData) {
    return Api().post("v1/contest/create", contestData);
  },
  getContest() {
    return Api().get();
  },
  editContest() {
    return Api().post();
  },
  deleteContest() {
    return Api().post();
  },
};
