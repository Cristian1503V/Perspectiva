function formatDate(date) {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(`${date}T12:00:00`));
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));
}

function newsCard(news) {
  return `
    <article class="news-card reveal">
      <div class="news-visual news-visual--${escapeHtml(news.image?.tone || 'blue')}" aria-hidden="true">
        <span>${escapeHtml(news.image?.label || news.category)}</span>
      </div>
      <div class="news-card__body">
        <p class="eyebrow">${escapeHtml(news.category)} · ${formatDate(news.date)}</p>
        <h2><a href="detalle.html?id=${encodeURIComponent(news.id)}">${escapeHtml(news.title)}</a></h2>
        <p>${escapeHtml(news.summary)}</p>
        <a class="text-link" href="detalle.html?id=${encodeURIComponent(news.id)}">Leer historia <span aria-hidden="true">→</span></a>
      </div>
    </article>`;
}

function updateFavoritesCount() {
  document.querySelectorAll('#favorites-count, #favorites-nav-count').forEach((element) => {
    const count = getFavoriteIds().length;
    element.textContent = count;
    element.setAttribute('aria-label', `${count} ${count === 1 ? 'favorito' : 'favoritos'}`);
  });
}

function setStatus(element, message, type = 'success') {
  element.textContent = message;
  element.dataset.type = type;
  element.hidden = false;
  element.focus();
}

document.addEventListener('DOMContentLoaded', () => {
  updateFavoritesCount();
  document.querySelectorAll('#current-year').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('.menu-toggle').forEach((button) => {
    const navigation = document.getElementById(button.getAttribute('aria-controls'));
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      navigation?.classList.toggle('is-open', !isOpen);
    });
  });
});
