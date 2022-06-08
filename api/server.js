import uuidv4 from "../helpers/uuidv4";


function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}


let Request = function () {
  let req = new Promise((resolve, reject) => {
    setTimeout(() => {// переведёт промис в состояние fulfilled с результатом "result"
      resolve("result");
    }, randomIntFromInterval(1,10)*1000);
  });
  return req
}

let postObject = function () {
  let req = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        'name': uuidv4(),
        'files_ids': [],
        'isCanDelete': true
      });
    }, randomIntFromInterval(500,1000));
  });
  return req
}

//Если бы мы слали настоящий запрос, то file, id - понадобились
//Для оправки файлов, мы бы использовали FormData
let postFileToObject = function (file, object_id) {
  let req = new Promise((resolve, reject) => {
    setTimeout(() => {
      let ids = []
      for(let i = 0; i < randomIntFromInterval(1,5); i++){
        ids.push(uuidv4())
      }
      resolve({
        ids: [file.ids[0], ...ids],
        isUploaded: true
      });
    }, randomIntFromInterval(5,6)*1000);
  });
  return req
}




export {Request, postObject, postFileToObject}
