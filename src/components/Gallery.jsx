import { useFetchPhotos } from '../hooks/useFetchPhotos'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <ul className="space-y-1">
      {photos.map((photo) => (
        <li key={photo.id}>{photo.author}</li>
      ))}
    </ul>
  )
}

export default Gallery