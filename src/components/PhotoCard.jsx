const IMAGE_WIDTH = 600
const IMAGE_HEIGHT = 400

function getResizedUrl(downloadUrl) {
  return downloadUrl.replace(/\/\d+\/\d+$/, `/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`)
}

function HeartIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  )
}

function PhotoCard({ photo, isFavorite = false, onToggleFavorite }) {
  return (
    <li className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
      <img
        src={getResizedUrl(photo.download_url)}
        alt={`Photo by ${photo.author}`}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        loading="lazy"
        className="aspect-[3/2] w-full bg-gray-200 object-cover"
      />
      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <p className="truncate text-sm font-medium text-gray-900">
          {photo.author}
        </p>
        {/* The label stays constant; aria-pressed tells assistive technology
            whether the photo is currently a favorite. */}
        <button
          type="button"
          aria-label={`Favorite photo by ${photo.author}`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite?.(photo.id)}
          className={`rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${
            isFavorite ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
    </li>
  )
}

export default PhotoCard