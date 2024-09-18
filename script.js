const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('display-board');

function applyCss(card) {
  card.setAttribute("style", 
    `
    font-family: Verdana; 
    font-size: 0.75em;
    margin: 1em;
    `)
}

const searchShows = async (query) => {
  try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      const shows = response.data;

      resultsContainer.innerHTML = '';

      shows.forEach((showData) => {
          const show = showData.show;

          const showCard = document.createElement('div');
          showCard.classList.add('show-card');

          showCard.innerHTML = `
              <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=Imagem+Não+Disponível'}">
              <h2>${show.name}</h2>
          `;

          applyCss(showCard)

          resultsContainer.appendChild(showCard);
      });
  } catch (error) {
      alert('Erro:', error);
  }
};


searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
      searchShows(query);
  }
});

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
          searchShows(query);
      }
  }
});