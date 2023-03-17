const cardsField = document.querySelector('#cards');
const resetBlock = document.querySelector('#reset');
const restart = document.querySelector('#reset-btn');
console.log(resetBlock);

let countCards = 16;

let images = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

images.sort(function () {
  return 0.5 - Math.random();
});

let deletedCards = 0;
let selected = [];
let pause = false;

for (let i = 0; i < countCards; i++) {
  let li = document.createElement('li');
  li.id = i;
  cardsField.appendChild(li);
}
console.log(cardsField);

cardsField.onclick = function (e) {
  console.dir(e);

  if (pause == false) {
    let el = e.target;

    if (el.tagName === 'LI' && el.className != 'active') {
      selected.push(el);
      el.className = 'active';
      let img = images[el.id];
      el.style.backgroundImage = 'url(images/' + img + '.png)';

      if (selected.length == 2) {
        pause = true;
        if (images[selected[0].id] == images[selected[1].id]) {
          selected[0].style.visibility = 'hidden';
          selected[1].style.visibility = 'hidden';
          deletedCards = deletedCards + 2;
        }

        setTimeout(refreshCards, 600);
      }
    }
  }
};

function refreshCards() {
  for (let i = 0; i < countCards; i++) {
    cardsField.children[i].className = '';
    cardsField.children[i].style.backgroundImage = 'url(images/back.png)';
  }
  if (deletedCards == countCards) {
    resetBlock.style.display = 'block';
  }
  selected = [];
  pause = false;
}

restart.onclick = function () {
  location.reload();
};
