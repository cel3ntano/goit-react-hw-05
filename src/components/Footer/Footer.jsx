import css from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <footer className={css.footer}>
      <p className={css.attribution}>
        This product uses the TMDB API but is not endorsed or certified by{" "}
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://developer.themoviedb.org/docs/getting-started'>
          TMDB
        </a>
      </p>
      <p>&copy; Moviexplorer, {currentYear}</p>
    </footer>
  );
}
