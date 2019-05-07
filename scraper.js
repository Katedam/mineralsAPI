const request = require('superagent');
const { parse } = require('node-html-parser');
const { mineralsList } = require('./lib/services/mineralsList');

const getDetails = (html) => {
  let pElements = html.querySelectorAll('p');
  let description = pElements[1].rawText;
  let images = html.querySelectorAll('.acf-image-gallery__image.mec-share-image').map(el => el.rawAttrs);
  let type = pElements[2].rawText;
  let classification = pElements[3].rawText;
  let chemicalFormula = pElements[4].rawText;
  let streak = pElements[5].rawText;
  let mohsHardness = pElements[6].rawText;
  let crystalSystem = pElements[7].rawText;
  let color = pElements[9].rawText;
  let luster = pElements[10].rawText;
  let fracture = pElements[11].rawText;

  const mineralDetails = {
    description,
    images,
    type,
    classification,
    chemicalFormula,
    streak,
    mohsHardness,
    crystalSystem,
    color,
    luster,
    fracture
  };

  console.log(mineralDetails);
};

const getMinerals = () => {
  mineralsList.map(mineral => {
    return request.get(`https://mineralseducationcoalition.org/minerals-database/${mineral}`)
      .then(res => res.text)
      .then(parse)
      .then(getDetails)
      .catch(console.error());
  });
};

getMinerals();


