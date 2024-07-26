import clsx from "clsx";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const getNavlinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul className={css.navigation}>
          <li>
            <NavLink to='/' className={getNavlinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/movies' className={getNavlinkClass}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
