import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Photo Gallery</h1>
      </header>
      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Gallery />
      </main>
    </div>
  )
}

export default App