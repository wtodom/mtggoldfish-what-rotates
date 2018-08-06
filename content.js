// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', chrome.runtime.getURL('all_sets.json'), true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}

loadJSON(function(json) {
  console.log(json);
});

// var deck = document.getElementsByClassName('deck-col-card');
// for (let card of deck) {
//     console.log(JSON.stringify(card.innerText.trim()));
// }
