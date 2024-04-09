import { getAllCollections } from "./chroma.controllers.js";

getAllCollections()
  .then((res) => {
    console.log(res);
  })
  .then((err) => console.log(err));
