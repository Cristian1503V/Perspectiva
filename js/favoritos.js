document.addEventListener('DOMContentLoaded', async () => {
  const list = document.querySelector('#favorites-list');
  const empty = document.querySelector('#favorites-empty');
  const count = document.querySelector('#favorites-count');

  const render = async () => {
    const ids = getFavoriteIds();
    const news = await getNews();
    const favorites = ids.map((id) => getNewsById(news, id)).filter(Boolean);
    count.textContent = `${favorites.length} ${favorites.length === 1 ? 'noticia guardada' : 'noticias guardadas'}`;
    list.hidden = favorites.length === 0;
    empty.hidden = favorites.length !== 0;

    list.innerHTML = favorites.map((article) => `
      <article class="news-card reveal">
        <div class="news-visual news-visual--${escapeHtml(article.image?.tone || 'blue')}" aria-hidden="true"><span>${escapeHtml(article.image?.label || article.category)}</span></div>
        <div class="news-card__body">
          <p class="eyebrow">${escapeHtml(article.category)} · ${formatDate(article.date)}</p>
          <h2><a href="detalle.html?id=${encodeURIComponent(article.id)}">${escapeHtml(article.title)}</a></h2>
          <p>${escapeHtml(article.summary)}</p>
          <div class="card-actions"><a class="text-link" href="detalle.html?id=${encodeURIComponent(article.id)}">Leer historia <span aria-hidden="true">→</span></a><button class="button button--quiet" type="button" data-remove="${escapeHtml(article.id)}">Quitar</button></div>
        </div>
      </article>`).join('');
  };

  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    removeFavorite(button.dataset.remove);
    updateFavoritesCount();
    render();
  });

  render();
});
