import css from "./GoBackButton.module.css";
import { Link } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";

export default function GoBackButton({ children, path }) {
  return (
    <>
      <Link to={path} className={css.goBackButton}>
        <span>
          <IoChevronBackCircle size={18} />
        </span>
        {children}
      </Link>
    </>
  );
}
