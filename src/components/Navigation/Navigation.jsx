import { getNavlinkClass } from "../../helpers/getNavlinkClass";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul className={css.navigation}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => getNavlinkClass(css, { isActive })}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/movies'
              className={({ isActive }) => getNavlinkClass(css, { isActive })}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
