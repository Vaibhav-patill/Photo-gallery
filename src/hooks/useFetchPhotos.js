import { useEffect, useState } from 'react'

const PHOTOS_URL = 'https://picsum.photos/v2/list?page=1&limit=30'


export function useFetchPhotos() {
  const [state, setState] = useState({
    photos: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch(PHOTOS_URL, { signal: controller.signal })

        // fetch only rejects on network failure, so HTTP errors (404, 500...)
        // must be detected manually.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Unexpected response format')
        }

        setState({ photos: data, loading: false, error: null })
      } catch (err) {
        // A cancelled request (cleanup / Strict Mode) is not a real error.
        if (err.name === 'AbortError') return

        setState({
          photos: [],
          loading: false,
          error: 'Could not load photos. Please try again later.',
        })
      }
    }

    fetchPhotos()

    // Cleanup: cancel the request if the component unmounts mid-fetch.
    return () => controller.abort()
  }, [])

  const { photos, loading, error } = state
  return { photos, loading, error }
}