const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.tech.redventures.com.br';

const fetchOptions = {
  method: 'GET',
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
};

export function fetchBroths() {
  return fetch(`${BASE_URL}/broths`, fetchOptions)
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));
}

export function fetchProteins() {
  return fetch(`${BASE_URL}/proteins`, fetchOptions)
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));
}

export function postOrder(brothId, proteinId) {
  const url = `${BASE_URL}/order`;
  const data = {
    brothId: brothId,
    proteinId: proteinId,
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok && response.status === 201) {
        return response.json().then((data) => ({
          status: response.status,
          data: data,
        }));
      } else {
        throw new Error('Network response: ' + response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
}
