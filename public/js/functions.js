/** Returns true if the input is not a string, or includes some of the words of the regex and the value is empty.
 * @param {Object} input - The input from the search box.
 * @param {string} input.value - The value of the input.
 * @returns {Boolean} True if the input isn't valid, false if it is.
 */
function checkInputValidation(input) {
  const regex = /[^\w\d\s\-\#\.\&\']/;
  let inputValue = input.value;

  if (typeof inputValue !== "string" || regex.test(inputValue) === true || inputValue === "") {
    return true;
  } else {
    return false;
  }
}

/** Returns true if the given card is a monster, false if it is magic, ritual, trap or equip. */
function isMonster(card) {
  return card.Type < 20;
}

/** Returns the card info from database. */
function getCardByName(cardname) {
  return card_db({ Name: { isnocase: cardname } }).first();
}

/** Returns the card data, with a given ID. */
function getCardById(id) {
  return card_db({ Id: id }).first();
}

/**  Returns true if the given card can be equiped, false if not. */
function equipCard(card) {
  return equipsList[card.Id].length > 0;
}

/**  Returns true if the given card has fusions, false if not. */
function hasFusions(card) {
  return card.Fusions.length > 0;
}

/**  Returns true if the given card has ritual, false if not. */
function hasRitual(card) {
  return card.Ritual.length > 0;
}

/**  Returns true if the given card has results, false if not. */
function hasResult(card) {
  return resultsList[card.Id].length > 0;
}

/**  Returns a new array with data for fusion monsters. */
function cardWithFusions(card) {
  let cardWithFusionData = card.Fusions.map((i) => {
    return { card1: card, card2: getCardById(i._card2), result: getCardById(i._result) };
  });
  return cardWithFusionData;
}

/**  Returns a new array with data for fusion monsters. */
function cardWithEquips(card) {
  let cardWithEquipData = equipsList[card.Id].map((e) => {
    return { card1: card, card2: getCardById(e) };
  });
  return cardWithEquipData;
}
