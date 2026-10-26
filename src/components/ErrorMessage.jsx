function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
    >
      {message}
    </div>
  )
}

export default ErrorMessage