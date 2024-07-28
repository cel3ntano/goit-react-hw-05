import css from "./GoBackButton.module.css";
import { Link } from "react-router-dom";

export default function GoBackButton({ children, path }) {
  return (
    <>
      <Link to={path} className={css.goBackButton}>
        {children}
      </Link>
    </>
  );
}
