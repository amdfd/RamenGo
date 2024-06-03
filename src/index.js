import { fetchBroths, fetchProteins, postOrder } from './api';

let selectedBroth = null;
let selectedProtein = null;

function createCard(item, cardsContainer, type) {
  const card = document.createElement('div');
  card.className = 'card-item';

  card.dataset.item = JSON.stringify(item);

  card.innerHTML = `
    <img src="${item.imageInactive}" alt="${item.name}" />
    <p class="item-name">${item.name}</p>
    <p class="item-description">${item.description}</p>
    <p class="item-price">US$ ${item.price}</p>
  `;

  card.addEventListener('click', () => {
    const otherCards = Array.from(cardsContainer.children);
    otherCards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.remove('selected');
        const img = otherCard.querySelector('img');
        img.src = JSON.parse(otherCard.dataset.item).imageInactive;

        const itemName = otherCard.querySelector('.item-name');
        itemName.classList.remove('selected');

        const itemDescription = otherCard.querySelector('.item-description');
        itemDescription.classList.remove('selected');

        const itemPrice = otherCard.querySelector('.item-price');
        itemPrice.classList.remove('selected');
      }
    });

    const isSelected = card.classList.toggle('selected');

    const img = card.querySelector('img');
    const itemName = card.querySelector('.item-name');
    const itemDescription = card.querySelector('.item-description');
    const itemPrice = card.querySelector('.item-price');

    if (isSelected) {
      img.src = JSON.parse(card.dataset.item).imageActive;
      itemName.classList.add('selected');
      itemDescription.classList.add('selected');
      itemPrice.classList.add('selected');

      if (type === 'broth') {
        selectedBroth = item;
      } else if (type === 'protein') {
        selectedProtein = item;
      }
    } else {
      img.src = JSON.parse(card.dataset.item).imageInactive;
      itemName.classList.remove('selected');
      itemDescription.classList.remove('selected');
      itemPrice.classList.remove('selected');

      if (type === 'broth') {
        selectedBroth = null;
      } else if (type === 'protein') {
        selectedProtein = null;
      }
    }

    const placeOrderButton = document.getElementById('place-order-button');
    if (selectedBroth && selectedProtein) {
      placeOrderButton.classList.remove('disabled');
    } else {
      placeOrderButton.classList.add('disabled');
    }
  });

  return card;
}

fetchBroths().then((data) => {
  const cardsContainer = document.querySelectorAll('.cards')[0];

  data.forEach((item) => {
    const card = createCard(item, cardsContainer, 'broth');
    cardsContainer.appendChild(card);
  });
});

fetchProteins().then((data) => {
  const cardsContainer = document.querySelectorAll('.cards')[1];

  data.forEach((item) => {
    const card = createCard(item, cardsContainer, 'protein');
    cardsContainer.appendChild(card);
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  document
    .querySelector('#place-order-button')
    .addEventListener('click', (event) => {
      event.preventDefault();

      const sections = document.querySelectorAll('.main-content .cards');
      const brothsSection = sections[0];
      const proteinsSection = sections[1];

      const selectedBrothCard = brothsSection.querySelector(
        '.card-item.selected',
      );
      const selectedProteinCard = proteinsSection.querySelector(
        '.card-item.selected',
      );

      if (!selectedBrothCard || !selectedProteinCard) {
        alert('Please select a broth and a protein');
        return;
      }

      const selectedBrothId = JSON.parse(selectedBrothCard.dataset.item).id;
      const selectedProteinId = JSON.parse(selectedProteinCard.dataset.item).id;

      postOrder(selectedBrothId, selectedProteinId)
        .then((response) => {
          console.log('Response object:', response);

          if (response.status === 201) {
            console.log('Order sent successfully:', response.data);
            const description = encodeURIComponent(response.data.description);
            const image = encodeURIComponent(response.data.image);
            window.location.href = `./src/pages/successPage.html?description=${description}&image=${image}`;
          } else {
            throw new Error('Unexpected status code: ' + response.status);
          }
        })
        .catch((error) => {
          console.error('Error:', error.message);
          alert('Error sending order: ' + error.message);
        });
    });
});
