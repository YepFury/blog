import axios from "../utils/request";

export const upload = file => {
  return axios.request({
    url: "/upload",
    method: "POST",
    data: file
  });
};

export const selectArticle = params => {
  return axios.request({
    url: "/selectArticle",
    method: "POST",
    data: params
  });
};

export const getArticle = id => {
  return axios.request({
    url: "/getArticle",
    method: "GET",
    params: {
      id: id
    }
  });
};
export const updateArticle = params => {
  return axios.request({
    url: "/updateArticle",
    method: "POST",
    data: params
  });
};
export const addArticle = params => {
  return axios.request({
    url: "/addArticle",
    method: "POST",
    data: params
  });
};
export const login = params => {
  return axios.request({
    url: "/login",
    method: "POST",
    data: params
  });
};
