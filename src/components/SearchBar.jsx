// Controlled input: the value comes from Gallery and changes go back through onChange.
function SearchBar({ value, onChange }) {
  return (
    <div role="search" className="mb-6">
      <label htmlFor="author-search" className="sr-only">
        Search photos by author
      </label>
      <input
        id="author-search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by author..."
        autoComplete="off"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:max-w-md"
      />
    </div>
  )
}

export default SearchBar