import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  favoritesReducer,
} from '../state/favoritesReducer'
import { loadFavorites, saveFavorites } from '../utils/favoritesStorage'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'

function Gallery() {
  // All fetching logic lives in the hook; Gallery only consumes the result.
  const { photos, loading, error } = useFetchPhotos()

  // Independent UI state, so useState is fine here.
  const [query, setQuery] = useState('')

  // Favorites use useReducer. The third argument (loadFavorites) is a lazy
  // initializer: it runs once on the first render and reads localStorage, so
  // saved hearts are already filled when the page first appears.
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    loadFavorites,
  )

  // Save favorites to localStorage whenever they change.
  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  // Hooks must run on every render, so they sit above the early returns below.

  // useCallback: keeps the same function reference between renders.
  // setQuery is stable, so the dependency array is empty.
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  // useMemo: the filtered list is derived data. It is recalculated only when
  // photos or query change, not on every unrelated re-render
  // (for example, when a favorite is toggled).
  const filteredPhotos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (normalizedQuery === '') {
      return photos
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedQuery),
    )
  }, [photos, query])

  // Gallery decides whether a click means add or remove; the reducer stays a
  // simple pure add/remove state machine.
  function handleToggleFavorite(id) {
    dispatch({
      type: favorites.includes(id) ? REMOVE_FAVORITE : ADD_FAVORITE,
      payload: id,
    })
  }

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <>
      <SearchBar value={query} onChange={handleSearchChange} />

      {filteredPhotos.length === 0 ? (
        <p role="status" className="py-12 text-center text-gray-600">
          No photos found
        </p>
      ) : (
        // 1 column on mobile, 2 on tablet (md), 4 on desktop (lg).
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favorites.includes(photo.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default Gallery