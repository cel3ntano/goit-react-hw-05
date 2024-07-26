import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, children }) {
  return (
    <button onClick={onClick} className={css.loadMoreBtn}>
      {children}
    </button>
  );
}
