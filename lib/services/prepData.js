module.exports = (html, mineral) => {
  let pElements = html.querySelectorAll('p');
  let description = pElements[1].rawText;
  let rawImages = html.querySelectorAll('.acf-image-gallery__image.mec-share-image').map(el => el.rawAttrs);
  let splitImages = rawImages.map(image => image.split('"'));
  let images = splitImages.map(image => image[1]);

  const mineralDetails = {
    mineral: mineral,
    description,
    images
  };

  return mineralDetails;
  
  // =========================================== Attempting to pull additional data from wonky classless p tags
  /* let keys = html.querySelectorAll('.mec-db-entry__subtitle').map(el => el.rawText);
  let type = pElements[2].rawText;
  let classification = pElements[3].rawText;
  let chemicalFormula = pElements[4].rawText;
  let streak = pElements[5].rawText;
  let mohsHardness = pElements[6].rawText;
  let crystalSystem = pElements[7].rawText;
  let color = pElements[9].rawText;
  let luster = pElements[10].rawText;
  let fracture = pElements[11].rawText;

  let mineralDetails = {};
  let count = 2;
  keys.map(key => {
    mineralDetails.mineral = mineral;
    mineralDetails.images = images;
    if(pElements[count].rawText === '') {
      count += 1;
    }
    mineralDetails[key] = pElements[count++].rawText;
  }); */

  // ================================================

};
