document.addEventListener('DOMContentLoaded', async () => {
  const news = await getNews();
  const featured = news.filter((item) => item.featured).slice(0, 3);
  const featuredContainer = document.querySelector('#featured-news');
  const categoryContainer = document.querySelector('#category-list');

  if (featuredContainer) featuredContainer.innerHTML = featured.map(newsCard).join('');

  if (categoryContainer) {
    const categories = [...new Set(news.map((item) => item.category))];
    categoryContainer.innerHTML = categories.map((category) => `
      <a class="category-link" href="noticias.html?category=${encodeURIComponent(category)}">
        <span>${escapeHtml(category)}</span><span aria-hidden="true">→</span>
      </a>`).join('');
  }
});
