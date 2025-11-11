import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001';

// Simple Router Context
const RouterContext = React.createContext();

function BrowserRouter({ children }) {
  const [route, setRoute] = useState('/home');
  const [params, setParams] = useState({});

  function navigate(path, p = {}) {
    setRoute(path);
    setParams(p);
  }

  return (
    <RouterContext.Provider value={{ route, params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

function useRouter() {
  return React.useContext(RouterContext);
}

function Link({ to, params, children, className }) {
  const { navigate } = useRouter();
  return (
    <a href={to} onClick={(e) => { e.preventDefault(); navigate(to, params); }} className={className}>
      {children}
    </a>
  );
}

// Home Page
function HomePage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then(data => { setBooks(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const genres = ['All', ...new Set(books.map(b => b.genre))];
  const filtered = books.filter(b => 
    (b.title.toLowerCase().includes(search.toLowerCase()) || 
     b.author.toLowerCase().includes(search.toLowerCase())) &&
    (genre === 'All' || b.genre === genre)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500">
      {/* Header */}
      <div className="bg-purple-700 text-white text-center py-8">
        <h1 className="text-5xl font-bold mb-2">📚 BookVerse</h1>
        <p className="text-lg">Discover amazing books</p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-2">Search Books</label>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Filter by Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {genres.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => { setSearch(''); setGenre('All'); }}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Book Count */}
        <p className="text-white text-center mb-4 font-bold">
          Showing {filtered.length} of {books.length} books
        </p>

        {/* Books Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {filtered.map(book => (
            <Link key={book.id} to={`/book/${book.id}`} params={{ id: book.id }}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {book.genre}
                    </span>
                    <span className="bg-yellow-400 text-sm px-2 py-1 rounded-full font-bold">
                      ⭐ {book.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Details Page
function BookDetailsPage() {
  const { params, navigate } = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/books/${params.id}`)
      .then(res => res.json())
      .then(data => { setBook(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!book) return <div>Book not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500">
      {/* Header */}
      <div className="bg-purple-700 text-white p-6">
        <button
          onClick={() => navigate('/home')}
          className="text-white hover:text-yellow-300 font-bold"
        >
          ← Back to Library
        </button>
      </div>

      {/* Book Details */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
          <img
            src={book.cover}
            alt={book.title}
            className="md:w-2/5 w-full h-96 md:h-auto object-cover"
          />
          <div className="p-8 md:w-3/5">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {book.genre}
            </span>
            <h1 className="text-4xl font-bold mt-4 mb-2">{book.title}</h1>
            <p className="text-2xl text-gray-600 mb-6">by {book.author}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-xl font-bold">⭐ {book.rating}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Year</p>
                <p className="text-xl font-bold">{book.year}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Pages</p>
                <p className="text-xl font-bold">{book.pages}</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-2">About this book</h2>
            <p className="text-gray-700 mb-4">{book.description}</p>
            <p className="text-sm text-gray-600 mb-6">
              <strong>Publisher:</strong> {book.publisher}
            </p>

            <div className="flex gap-4">
              <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700">
                Add to Library
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App with HOC
function withLoading(Component) {
  return function(props) {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-pink-500">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-4xl font-bold text-white">BookVerse</h2>
            <p className="text-white mt-2">Loading...</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

function App() {
  const { route } = useRouter();
  return route === '/home' ? <HomePage /> : <BookDetailsPage />;
}

const AppWithLoading = withLoading(App);

export default function Main() {
  return (
    <BrowserRouter>
      <AppWithLoading />
    </BrowserRouter>
  );
}