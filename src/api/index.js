import http from "./httpService";

let api = {};

function makeCrud(module) {
  return {
    get: () => http.get(`${module}`).then((res) => res.data),
  };
}

// Move to constant
["players"].forEach((name) => {
  api[name] = makeCrud(name);
});

export default api;
