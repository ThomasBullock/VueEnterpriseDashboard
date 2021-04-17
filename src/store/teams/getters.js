export default {
  allTeams: (state) => {
    return state;
  },
  teamById: (state) => (id) => {
    return state[id];
  },
  teamBySlug: (state) => (slug) => {
    return Object.values(state).find((team) => team.slug === slug);
  },
  teamIdBySlug: (state) => (slug) => {
    const team = Object.values(state).find((team) => team.slug === slug);
    return team._id;
  },
};
