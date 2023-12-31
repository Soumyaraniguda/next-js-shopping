import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`/api/categories`);
};

export const addCategory = async (name) => {
  return await axios.post(`/api/categories`, { name });
};

export const updateCategory = async (data) => {
  return await axios.put("/api/categories", {
    id: data.id,
    name: data.name,
  });
};

export const deleteCategory = async (id) => {
  return await axios.delete(`/api/categories?id=${id}`);
};

// Sub-categories

export const getSubCategories = async () => {
  return await axios.get(`/api/sub-categories`);
};

export const getSubCategoriesByCategory = async (category) => {
  return await axios.get(`/api/sub-categories/by-category`, {
    params: {
      category,
    },
  });
};

export const addSubCategory = async (name, parentCategory) => {
  return await axios.post(`/api/sub-categories`, { name, parentCategory });
};

export const updateSubCategory = async (data) => {
  return await axios.put("/api/sub-categories", {
    id: data.id,
    name: data.subCategoryName,
    parent: data.subCategoryParent,
  });
};

export const deleteSubCategory = async (id) => {
  return await axios.delete(`/api/sub-categories?id=${id}`);
};

// Better way to handle API error with Promise catch method*.

// axios.get(people)
//     .then((response) => {
//         // Success
//     })
//     .catch((error) => {
//         // Error
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             // console.log(error.response.data);
//             // console.log(error.response.status);
//             // console.log(error.response.headers);
//         } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an instance of XMLHttpRequest in the
//             // browser and an instance of
//             // http.ClientRequest in node.js
//             console.log(error.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.log('Error', error.message);
//         }
//         console.log(error.config);
//     });
