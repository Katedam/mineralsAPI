const request = require('superagent');
const { parse } = require('node-html-parser');
const { mineralsList } = require('./lib/services/mineralsList');

const getDetails = () => {

  return Promise.all(mineralsList.map(mineral => {
    return request.get(`https://geology.com/minerals/${mineral}.shtml`)
      .then(res => res.text)
      .then(parse)
      .then(html => html.querySelectorAll('.right .ref td').map(el => el.text))
      .then(detailsList => detailsList.slice(0, 25))
      .catch(err => console.log(mineral, err.path));
  }));
};

getDetails();
