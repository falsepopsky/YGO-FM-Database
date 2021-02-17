/** Returns true if the input is not a string, or includes some of the words of the regex and the value is empty.
 * @param {Object} input - The input from the search box.
 * @param {string} input.value - The value of the input.
 * @returns {Boolean} True if the input isn't valid, false if it is.
 */
function checkInput(input) {
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

/** Returns the card with a given ID. */
function getCardById(id) {
  var card = card_db({ Id: id }).first();
  if (!card) {
    return null;
  }
  return card;
}

/**  Returns true if the given card can be equiped. */
function equipCard() {
  return equipsList[card.Id].length > 0;
}
