const basics = ["Plains", "Island", "Swamp", "Mountain", "Forest"];
const green = '#c4ffdf'
const yellow = '#fdffc4'

function getSets(card, sets) {
  var setCodes = [];
  for (setCode in sets) {
    if (sets[setCode]['cards'].includes(card)) {
      setCodes.push(setCode);
    }
  }
  return setCodes;
}

function sortStandardSets(sets) {
  var rotatesSoon = [];
  var safe = [];
  var now = Date.now();
  var threshold = 12960000000  // 5 months in seconds
  for (let set of sets.sets) {
    var enter = Date.parse(set.enter_date);
    var exit = Date.parse(set.exit_date);
    if (enter < now && isNaN(exit))
        safe.push(set.code);
    else if (enter < now && exit > now)
        rotatesSoon.push(set.code);
  }
  return {'safe': safe, 'soon': rotatesSoon};
}

function colorDeck() {
  var setsURI = chrome.runtime.getURL("all_cards.json");
  fetch(setsURI)
    .then(response => response.json())
    .then(allSets => {
      fetch("https://whatsinstandard.com/api/v5/sets.json")
        .then(response => response.json())
        .then(standardSets => {
          var rotationSets = sortStandardSets(standardSets);
          console.log(rotationSets);
          var deck = document.getElementsByClassName("deck-col-card");
          for (let card of deck) {
            cardName = card.innerText.trim();
            if (cardName.includes('//'))
                cardName = cardName.split('//')[0].trim()
            if (basics.includes(cardName))
                card.style.backgroundColor = green;
            var cardSets = getSets(cardName, allSets);
            for (let set of rotationSets['soon']) {
                if (cardSets.includes(set)) {
                    card.style.backgroundColor = yellow;
                    break;
                }
            }
            for (let set of rotationSets['safe']) {
                if (cardSets.includes(set)) {
                    card.style.backgroundColor = green;
                    break;
                }
            }
          }
        });
    });
}

colorDeck();
