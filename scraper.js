const request = require('superagent');
const { parse } = require('node-html-parser');

const getMinerals = () => {
  return request.get('https://mineralseducationcoalition.org/mining-minerals-information/minerals-database/?tax=mineral-category')
    .then(res => res.text)
    .then(parse)
    .then(html => html.querySelectorAll('.minerals-article__title'))
    .then(res => console.log(res));
};

getMinerals();
