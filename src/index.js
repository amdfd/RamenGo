import { fetchBroths, fetchProteins, postOrder } from './api';

function createCard(item, cardsContainer) {
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
        img.classList.remove('selected');

        const itemName = otherCard.querySelector('.item-name');
        itemName.classList.remove('selected');

        const itemDescription = otherCard.querySelector('.item-description');
        itemDescription.classList.remove('selected');

        const itemPrice = otherCard.querySelector('.item-price');
        itemPrice.classList.remove('selected');
      }
    });

    card.classList.toggle('selected');

    const img = card.querySelector('img');
    img.classList.toggle('selected');

    const itemName = card.querySelector('.item-name');
    itemName.classList.toggle('selected');

    const itemDescription = card.querySelector('.item-description');
    itemDescription.classList.toggle('selected');

    const itemPrice = card.querySelector('.item-price');
    itemPrice.classList.toggle('selected');

    if (card.classList.contains('selected')) {
      img.src = JSON.parse(card.dataset.item).imageActive;
    } else {
      img.src = JSON.parse(card.dataset.item).imageInactive;
    }
  });

  return card;
}

fetchBroths().then((data) => {
  const cardsContainer = document.querySelectorAll('.cards')[0];

  data.forEach((item) => {
    const card = createCard(item, cardsContainer);
    cardsContainer.appendChild(card);
  });
});

fetchProteins().then((data) => {
  const cardsContainer = document.querySelectorAll('.cards')[1];

  data.forEach((item) => {
    const card = createCard(item, cardsContainer);
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
            alert('Order sent successfully');
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