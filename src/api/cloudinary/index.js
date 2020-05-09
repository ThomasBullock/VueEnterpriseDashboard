import axios from "axios";

const http = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_NAME}`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default {
  upload(photoForm) {
    console.log(photoForm);
    return http.post("/image/upload", photoForm).then((res) => res.data);
  },
};
