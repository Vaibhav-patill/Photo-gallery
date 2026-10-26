const STORAGE_KEY = 'photo-gallery:favorites'

/**
 * Reads favorite IDs from localStorage.
 * Returns [] if nothing is stored, the JSON is malformed, the value is not an
 * array of strings, or localStorage is unavailable.
 * Used as the lazy initializer of useReducer, so it runs once on first render.
 */
export function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw === null) {
      return []
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === 'string')) {
      return []
    }

    return parsed
  } catch {
    return []
  }
}

/**
 * Writes favorite IDs to localStorage.
 * Failures (private mode, full quota, blocked storage) are ignored so the app
 * keeps working; favorites just won't persist in that case.
 */
export function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // Intentionally ignored.
  }
}