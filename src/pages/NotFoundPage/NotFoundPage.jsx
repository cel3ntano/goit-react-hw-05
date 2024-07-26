import { useEffect } from "react";
import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffect(() => {
    document.body.classList.add(css.notFoundPage);

    return () => {
      document.body.classList.remove(css.notFoundPage);
    };
  }, []);

  return (
    <div className={css.notFoundPage}>
      <div className={css.particles}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <main className={css.main}>
        <section>
          <h1>Oops! Wrong page...</h1>
          <div>
            <span>4</span>
            <span className={css.circle}>0</span>
            <span>4</span>
          </div>
          <p>We are unable to find the page you&apos;re looking for</p>
          <div>
            <Link to='/'>
              <button>Back to Home</button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
