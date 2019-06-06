const request = require('superagent');
const { parse } = require('node-html-parser');
const { mineralsList } = require('./mineralsList');
const findAndPrepData = require('./prepData');

module.exports = () => {

  return Promise.all(mineralsList.map(mineral => {
    return request.get(`https://mineralseducationcoalition.org/minerals-database/${mineral}`)
      .then(res => res.text)
      .then(parse)
      .then(html => findAndPrepData(html, mineral))
      .catch((err) => console.log(mineral, err));
  }));
};
