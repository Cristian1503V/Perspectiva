document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('#article-form');
  const list = document.querySelector('#article-list');
  const count = document.querySelector('#article-count');
  const empty = document.querySelector('#articles-empty');
  const status = document.querySelector('#article-status');
  if (!form || !list) return;

  const fields = ['title', 'category', 'author', 'excerpt', 'content'];
  const fieldError = (name, message = '') => {
    const error = document.querySelector(`#article-${name}-error`);
    if (error) error.textContent = message;
  };
  const render = async () => {
    const news = await getNews();
    count.textContent = `${news.length} ${news.length === 1 ? 'noticia' : 'noticias'}`;
    empty.hidden = news.length > 0;
    list.innerHTML = news.map((article) => `
      <article class="managed-article">
        <div><p class="eyebrow">${escapeHtml(article.category)} · ${formatDate(article.date)}</p><h3>${escapeHtml(article.title)}</h3><p>Por ${escapeHtml(article.author)}</p></div>
        <button type="button" class="button button--quiet" data-delete="${escapeHtml(article.id)}">Eliminar</button>
      </article>`).join('');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let valid = true;
    fields.forEach((name) => {
      const input = form.elements[name];
      const message = input.value.trim() ? '' : 'Este campo es obligatorio.';
      fieldError(name, message);
      input.setAttribute('aria-invalid', String(Boolean(message)));
      valid &&= !message;
    });
    if (!valid) {
      setStatus(status, 'Completa los campos obligatorios para publicar.', 'error');
      return;
    }

    const news = await getNews();
    const title = form.elements.title.value.trim();
    const id = `${title.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`;
    news.unshift({
      id, title, category: form.elements.category.value, author: form.elements.author.value.trim(),
      summary: form.elements.excerpt.value.trim(), body: form.elements.content.value.trim(),
      date: new Date().toISOString().slice(0, 10), readTime: '3 min de lectura', featured: false,
      image: { label: form.elements.category.value, tone: 'blue' }
    });
    saveNews(news);
    form.reset();
    fields.forEach((name) => {
      form.elements[name].removeAttribute('aria-invalid');
      fieldError(name);
    });
    setStatus(status, 'La noticia se publicó en este navegador.', 'success');
    render();
  });

  list.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-delete]');
    if (!button) return;
    const news = await getNews();
    saveNews(news.filter((article) => article.id !== button.dataset.delete));
    removeFavorite(button.dataset.delete);
    updateFavoritesCount();
    setStatus(status, 'La noticia se eliminó de este navegador.', 'success');
    render();
  });

  render();
});
