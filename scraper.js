const request = require('superagent');
const { parse } = require('node-html-parser');

module.exports = () => {
  return request.get('https://mineralseducationcoalition.org/mining-minerals-information/minerals-database/?tax=mineral-category')
    .then(res => res.text)
    .then(parse)
    .then(html => console.log(html));
};
