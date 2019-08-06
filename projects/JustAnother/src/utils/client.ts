import { Characters } from "../interfaces";

interface IResponse {
  characters: Characters;
}

const getImage = (id: number) =>
 fetch(`http://localhost:3000/getImage?id=${id}`)
  .then((response) => {
    return response.blob();
  })
  .then(image => {
    const outside = URL.createObjectURL(image);
    return outside;
  })
  .catch(error => {
    console.error(error);
    return "";
  });

const getCharacters = (loadRes: Function) => 
  fetch("http://localhost:3000/getCharacters")
  .then(response => response.json())
  .then((response: IResponse) => {
    loadRes(response);
  })
  .catch(err => console.error(err));

const saveImage = (formData: FormData) =>
  fetch("//localhost:3000/saveImage", {
      method: "POST",
      body: formData
    })
    .then(result => console.log(result))
    .catch(error => console.error(error));

const saveCharacters = (body: string) => 
  fetch("http://localhost:3000/saveCharacters", {
    method: "POST",
    body: body,
  })
  .then(response => {
    if (response.status === 200) {
      console.log("ok");
    }
  })
  .catch(error => console.error(error));

const deleteImage = (id: number) => 
  fetch("http://localhost:3000/deleteImage", {
    method: "GET",
  })
  .then(response => {
    if (response.status === 200) {
      console.log("ok");
    }
  })
  .catch(error => console.error(error));

export default {
  getImage,
  getCharacters,
  saveImage,
  saveCharacters,
  deleteImage,
}