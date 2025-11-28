import React, { useState, useEffect, use } from 'react'
import Movienavbar from '../component/Movienavbar'
import Moviecard from '../component/Moviecard'
import { searchMovies, getPopularMovies } from '../services/api'

export default function Moviehome() {

    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)

            } catch (error) {
                console.log(error)
                setError('failed to load')

            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])



    // const filteredMovies = movies.filter(movie =>
    //     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    // )

    const handleSearch = (e) => {
        e.preventDefault()
    }

    return (
        <>

            <Movienavbar />

            <div className="min-h-screen bg-gray-100 py-10 px-6">

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="max-w-xl mx-auto flex items-center gap-3 bg-white shadow-md px-5 py-3 rounded-xl"
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search movies..."
                        className="flex-1 text-lg outline-none placeholder-gray-500"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-400 hover:bg-yellow-500 transition px-5 py-2 rounded-lg font-semibold"
                    >
                        Search
                    </button>
                </form>

                {/* Movie Grid */}
                <div>
                    {error && <div className='error_message'>{error}</div>}
                    {loading ? (
                        <div className='loading'>Loading...</div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                            {
                                movies.map(movie => (
                                    <Moviecard movie={movie} key={movie.id} />
                                ))
                            }


                        </div>
                    )}

                </div>

            </div>

        </>
    )
}
