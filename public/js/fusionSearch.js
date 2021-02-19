let inputCard = document.getElementById("cardname");
let outputLeft = document.getElementById("output-area-left");
let outputRight = document.getElementById("output-area-right");
let outputCard = document.getElementById("outputcard");
let searchMessage = document.getElementById("search-msg");
let resetBtn = document.getElementById("reset-btn");
let searchResultsBtn = document.getElementById("search-results-btn");
let searchNameBtn = document.getElementById("search-name-btn");

// FUNCTIONS

function resultsClear() {
  outputLeft.innerHTML = "";
  outputRight.innerHTML = "";
  outputCard.innerHTML = "";
  searchMessage.innerHTML = "";
}

function createDangerMessage(input) {
  if (!input) {
    let firstMessage = `<div class="alert-danger">Please enter a search term</div>`;
    return firstMessage;
  } else {
    let secondMessage = `<div class="alert-danger">No card for ${input} found</div>`;
    return secondMessage;
  }
}

// Display card beside search bar
function createSideCard(card) {
  let modelCard = `<div class="card-box">
                  <h3 class="card-title">${card.Name}</h3>
                  <p class="card-description">${card.Description}</p>
                  <div class="card-item">
                  <div class="card-subitem">
                  <img src="public/images/icons/${
                    cardTypes[card.Type]
                  }.png" alt="type icon" class="card-icons" width="20" height="20" />
                  <p class="card-text">${cardTypes[card.Type]}</p>
                  </div>
                  <div class="card-subitem">
                  <img src="public/images/icons/sword.svg" alt="type icon" class="card-icons" width="20" height="20" />
                  <p class="card-text">ATK ${card.Attack} /</p>
                  <img src="public/images/icons/shield.svg" alt="type icon" class="card-icons" width="20" height="20" />
                  <p class="card-text">DEF ${card.Defense}</p>
                  </div>
                  </div>
                  <div class="card-item">
                  <img src="public/images/icons/star.svg" alt="type icon" class="card-icons" width="20" height="20" />
                  <p class="card-text">Starchip ${card.Stars}</p>
                  <img src="public/images/icons/padlock.svg" alt="type icon" class="card-icons" width="20" height="20" />
                  <p class="card-text">${card.CardCode}</p>
                  </div>
                  </div>`;
  console.log(modelCard);
  if (isMonster(card) === true) {
    return modelCard;
  } else {
    let notMonsterCard = modelCard.replace(
      `<div class="card-subitem">
      <img src="public/images/icons/sword.svg" alt="type icon" class="card-icons" width="20" height="20" />
      <p class="card-text">ATK ${card.Attack} /</p>
      <img src="public/images/icons/shield.svg" alt="type icon" class="card-icons" width="20" height="20" />
      <p class="card-text">DEF ${card.Defense}</p>
      </div>`,
      ""
    );
    return notMonsterCard;
  }
}

// Initialize awesomplete
var cardNameCompletion = new Awesomplete(inputCard, {
  list: card_db()
    .get()
    .map((c) => c.Name), // list is all the cards in the DB
  autoFirst: true, // The first item in the list is selected
  filter: Awesomplete.FILTER_STARTSWITH, // case insensitive from start of word
});
$("#cardname").on("change", function () {
  cardNameCompletion.select(); // select the currently highlighted item, e.g. if user tabs
});
$("#cardname").on("awesomplete-selectcomplete", function () {
  resultsClear();
  searchByName();
});

// Creates a div for each fusion
function fusesToHTML(fuselist) {
  return fuselist
    .map(function (fusion) {
      var res = `<div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-body text-dark">
        <p class="card-text">${fusion.card1.Name}<strong> + </strong>${fusion.card2.Name}</p>`;
      if (fusion.result) {
        // Equips and Results don't have a result field
        res += `<p class="card-text"><strong>Result:</strong> ${fusion.result.Name}</p>`;
      }
      return res + `</div></div>`;
    })
    .join("\n");
}

function searchByName() {
  let card = getCardByName(inputCard.value);
  if (!card) {
    searchMessage.innerHTML = createDangerMessage(inputCard.value);
    return;
  } else {
    outputCard.innerHTML = createSideCard(card);

    if (card.Fusions.length > 0 || equipsList[card.Id].length > 0) {
      let fuses = card.Fusions.map((i) => {
        return { card1: card, card2: getCardById(i._card2), result: getCardById(i._result) };
      });
      let equips = equipsList[card.Id].map((e) => {
        return { card1: card, card2: getCardById(e) };
      });

      outputLeft.innerHTML = "<h2 class='text-center mb-4'>Fusions</h2>";
      outputLeft.innerHTML += fusesToHTML(fuses);
      outputRight.innerHTML = "<h2 class='text-center mb-4'>Equips On</h2>";
      outputRight.innerHTML += fusesToHTML(equips);
    }
  }
}

function searchForResult() {
  let card = getCardByName(inputCard.value);
  if (!card) {
    searchMessage.innerHTML = createDangerMessage(inputCard.value);
    return;
  } else {
    outputCard.innerHTML = createSideCard(card);

    if (resultsList[card.Id].length > 0) {
      let results = resultsList[card.Id].map((f) => {
        return { card1: getCardById(f.card1), card2: getCardById(f.card2) };
      });
      outputLeft.innerHTML = "<h2 class='text-center mb-4'>Fusions</h2>";
      outputLeft.innerHTML += fusesToHTML(results);
    }
  }
}

searchNameBtn.onclick = function () {
  let booleanResponse = checkInput(inputCard);
  resultsClear();
  if (booleanResponse === true) {
    searchMessage.innerHTML = createDangerMessage();
    return;
  } else {
    searchByName();
  }
};

searchResultsBtn.onclick = function () {
  let booleanResponse = checkInput(inputCard);
  resultsClear();
  if (booleanResponse === true) {
    searchMessage.innerHTML = createDangerMessage();
    return;
  } else {
    searchForResult();
  }
};

resetBtn.onclick = function () {
  resultsClear();
  inputCard.value = "";
};
