const urlParams = new URLSearchParams(window.location.search);
const description = decodeURIComponent(urlParams.get('description'));
const image = decodeURIComponent(urlParams.get('image'));

document.querySelector('h2').textContent = description;
document.querySelector('.success-order').src = image;
