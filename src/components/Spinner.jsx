function Spinner() {
  return (
    <div role="status" className="flex items-center justify-center py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
      <span className="sr-only">Loading photos...</span>
    </div>
  )
}

export default Spinner