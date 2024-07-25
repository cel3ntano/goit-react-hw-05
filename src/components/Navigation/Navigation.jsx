import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header>
      <ul className={css.navigation}>
        <li>Home</li>
        <li>Movies</li>
      </ul>
    </header>
  );
}
