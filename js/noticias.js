document.addEventListener('DOMContentLoaded', async () => {
  const news = await getNews();
  const grid = document.querySelector('#news-grid');
  const search = document.querySelector('#news-search');
  const filter = document.querySelector('#category-filter');
  const resultCount = document.querySelector('#results-count');
  const requestedCategory = new URLSearchParams(location.search).get('category');
  const categories = [...new Set(news.map((item) => item.category))];

  if (filter) {
    filter.innerHTML = `<option value="">Todas las categorías</option>${categories.map((category) =>
      `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}`;
    if (requestedCategory && categories.includes(requestedCategory)) filter.value = requestedCategory;
  }

  const render = () => {
    const query = search?.value.trim().toLocaleLowerCase('es') || '';
    const category = filter?.value || '';
    const shown = news.filter((item) => {
      const content = `${item.title} ${item.summary} ${item.category}`.toLocaleLowerCase('es');
      return (!query || content.includes(query)) && (!category || item.category === category);
    });
    grid.innerHTML = shown.length ? shown.map(newsCard).join('') : `
      <div class="empty-state"><p class="eyebrow">Sin resultados</p><h2>No encontramos noticias con esos criterios.</h2><p>Prueba otra búsqueda o elimina el filtro actual.</p></div>`;
    resultCount.textContent = `${shown.length} ${shown.length === 1 ? 'historia encontrada' : 'historias encontradas'}`;
  };

  search?.addEventListener('input', render);
  filter?.addEventListener('change', render);
  render();
});
