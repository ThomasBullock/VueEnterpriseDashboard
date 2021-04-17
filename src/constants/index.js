export const COLLECTIONS = ["players", "teams"];

export const STATUSES = ["Available", "Injured", "Suspended", "Retired"];

export const POSITIONS = ["Forward", "Midfield", "Defender", "Ruck", "Utility"];

export const DEFAULT_PLAYER_IMG =
  "https://res.cloudinary.com/birdnerd/image/upload/v1612523244/vue-dash/cztvwqqfvc7v3vcjo9es.png";

export const MUTATIONS = {
  UPDATE_ONE: "UPDATE_ONE",
  SET: "SET",
  DELETE: "DELETE",
  CREATE: "CREATE",
  RESET: "RESET",
  SET_IS_LOADED: "SET_IS_LOADED",
  SET_IS_MAKING_REQUEST: "IS_MAKING_REQUEST",
};

export const ACTIONS = {
  getAll: "getAll",
  create: "create",
  updateOne: "updateOne",
  delete: "delete",
};
