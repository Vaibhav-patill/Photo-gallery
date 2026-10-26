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
  const { photos, loading, error } = useFetchPhotos()

  const [query, setQuery] = useState('')

  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    loadFavorites,
  )

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])


  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (normalizedQuery === '') {
      return photos
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedQuery),
    )
  }, [photos, query])

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