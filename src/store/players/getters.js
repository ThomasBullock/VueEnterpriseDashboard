export default {
  playersIsLoaded: (state) => {
    return state.isLoaded;
  },
  allPlayers: (state) => {
    return state.items;
  },
  getById: (state) => (id) => {
    return state.items[id];
  },
  playerByTeamId: (state) => (id) => {
    return Object.values(state.items).filter((player) => player.teamId == id);
  },
};
