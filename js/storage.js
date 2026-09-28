const FAVORITES_STORAGE_KEY = 'azulFavoritos';

function getFavoriteIds() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function isFavorite(id) {
  return getFavoriteIds().includes(id);
}

function toggleFavorite(id) {
  const current = getFavoriteIds();
  const next = current.includes(id)
    ? current.filter((favoriteId) => favoriteId !== id)
    : [...current, id];

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  return next.includes(id);
}

function removeFavorite(id) {
  const next = getFavoriteIds().filter((favoriteId) => favoriteId !== id);
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
}
