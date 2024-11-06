import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBooks,
  searchBooksLoading,
  searchBooksFailure,
} from "../redux/actions/SearchBookAction";
import AddApiBook from "./AddApiBook";
import Modal from "../components/Modal";

function SearchBook() {
  const dispatch = useDispatch();
  const APIKey = "cde11733da0373fb839cd8845465d405";
  const store = useSelector((state) => state.searchBooks);
  const fetchedBooks = store.fetchedBooks;
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState(""); //string car on va afficher du texte
  const [directors, setDirectors] = useState({}); //objet car on va stocker des données
  const [actors, setActors] = useState({});

  const closeModal = () => {
    setIsModalOpen(false);
    setContentModal("");
  };

  const handleThumbnailClick = (
    imageUrl,
    overview,
    releaseDate,
    original_language,
    directorName,
    actorsList
  ) => {
    setIsModalOpen(true);
    setContentModal(
      <div className="modal-description">
        <img src={imageUrl} alt="Book Cover" />
        <p className="book-description">
          <strong>Description: </strong>
          {overview}
        </p>
        <p className="book-description">
          <strong>Release Date: </strong>
          {releaseDate}
        </p>
        <p className="book-description">
          <strong>Language: </strong>
          {original_language}
        </p>
        <p className="book-description">
          <strong>Director: </strong>
          {directorName}
        </p>
        <p className="book-description">
          <strong>Actors: </strong>
          {actorsList}
        </p>
      </div>
    );
  };

  useEffect(() => {
    fetchedBooks.forEach((movie) => {
      getMovieCredits(movie.id);
    });
  }, [fetchedBooks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchBooksLoading());

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${search}&language=fr-FR`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching the MovieDB API");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(searchBooks(data.results || []));
      })
      .catch((error) => {
        dispatch(searchBooksFailure(error.message));
      });
  };

  const getMovieCredits = (movieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${APIKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Récupération du réalisateur
        const directors = data.crew.filter(
          (member) => member.job === "Director"
        );
        const directorName =
          directors.length > 0 ? directors[0].name : "Unknown";

        // Récupération des acteurs
        const actorsList = data.cast.slice(0, 5).map((actor) => actor.name); // Limité aux 5 premiers acteurs (des fois il y en a une ribambelle)

        setDirectors((prevDirectors) => ({
          ...prevDirectors,
          [movieId]: directorName,
        }));

        setActors((prevActors) => ({
          ...prevActors,
          [movieId]: actorsList.join(", "),
        }));
      })
      .catch((error) => {
        console.error("Error fetching movie credits", error);
      });
  };

  return (
    <div className="search-form_container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a movie in the MovieDB API"
          required
        />
        <button>Search</button>
      </form>
      <div className="search-form_results">
        {store.loading && <div className="loading">Loading...</div>}
        {store.error && <div className="error">{store.error}</div>}
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Overview</th>
              <th>Year</th>
              <th>Director</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {fetchedBooks.map((movie, index) => (
              <tr key={index}>
                <td className="books-table_content">{movie.title}</td>
                <td className="books-table_content">
                  {movie.overview.length > 90
                    ? `${movie.overview.slice(0, 90)}...`
                    : movie.overview}
                </td>
                <td className="books-table_content">
                  {movie.release_date.slice(0, 4)}
                </td>
                <td className="books-table_content">
                  {directors[movie.id] || "Unknown"}
                </td>
                <td>
                  <img
                    className="thumbnail"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={`${movie.title} poster`}
                    onClick={() =>
                      handleThumbnailClick(
                        `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                        movie.overview,
                        movie.release_date,
                        movie.original_language,
                        directors[movie.id] || "Unknown",
                        actors[movie.id] || "Unknown"
                      )
                    }
                  />
                </td>
                <td>
                  <AddApiBook book={movie} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          isClose={closeModal}
          content={contentModal}
        />
      </div>
    </div>
  );
}

export default SearchBook;
