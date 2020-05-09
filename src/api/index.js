import http from "./httpService";
import { COLLECTIONS } from "@/constants";

let api = {};

function makeCrud(resource) {
  return {
    getAll: () => http.get(`${resource}`).then((res) => res.data),
    get: (id) => http.get(`${resource}/${id}`).then((res) => res.data),
    post: (data) => http.post(`${resource}`, data).then((res) => res.data),
    put: (data) =>
      http.put(`${resource}/${data._id}`, data).then((res) => res.data),
    delete: (id) => http.delete(`${resource}/${id}`).then((res) => res.data),
    customRequest: (data) => http(data).then((res) => res.data),
  };
}

COLLECTIONS.forEach((name) => {
  api[name] = makeCrud(name);
});

api.fetchDashboard = (url) => http.get(url).then((res) => res.data);

export default api;
