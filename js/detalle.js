document.addEventListener('DOMContentLoaded', async () => {
  const news = await getNews();
  const id = new URLSearchParams(location.search).get('id');
  const article = getNewsById(news, id) || news[0];
  const detail = document.querySelector('#article-detail');
  const favoriteButton = document.querySelector('#favorite-toggle');

  if (!article || !detail) return;

  detail.innerHTML = `
    <p class="eyebrow">${escapeHtml(article.category)} · ${formatDate(article.date)}</p>
    <h1>${escapeHtml(article.title)}</h1>
    <p class="article-summary">${escapeHtml(article.summary)}</p>
    <div class="article-meta"><span>Por ${escapeHtml(article.author)}</span><span>${escapeHtml(article.readTime)}</span></div>
    <div class="article-visual news-visual news-visual--${escapeHtml(article.image?.tone || 'blue')}" aria-hidden="true"><span>${escapeHtml(article.image?.label || article.category)}</span></div>
    <div class="article-body">${article.body.split('\n\n').map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>`;

  const renderFavoriteState = () => {
    const saved = isFavorite(article.id);
    favoriteButton.textContent = saved ? 'Quitar de favoritos' : 'Guardar en favoritos';
    favoriteButton.setAttribute('aria-pressed', String(saved));
  };

  favoriteButton?.addEventListener('click', () => {
    toggleFavorite(article.id);
    renderFavoriteState();
    updateFavoritesCount();
  });
  renderFavoriteState();
});
