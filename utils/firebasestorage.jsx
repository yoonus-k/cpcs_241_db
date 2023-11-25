import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

import { app } from "./firebase";

// get firebase storage
const storage = getStorage(app);

// function to handle change in input fields

// function to upload file to firebase storage
export function uploadFile(file) {
  if (!file) {
    return;
  }
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${file.name}+${Date.now()}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file : ", snapshot.ref);
      getDownloadURL(snapshot.ref).then((url) => {
        resolve(url);
      });
    });
  });
}
export const downloadFile = () => {
  return new Promise((resolve, reject) => {
    const urls = [];
    const storageRef = ref(storage, `images/`);
    listAll(storageRef)
      .then((res) => {
        const promises = res.items.map((itemRef) => {
          return getDownloadURL(itemRef).then((url_ref) => {
            urls.push(url_ref);
          });
        });

        Promise.all(promises)
          .then(() => {
            resolve(urls);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
