import clsx from "clsx";

export const getNavlinkClass = (css, { isActive }) => {
  return clsx(css.link, isActive && css.active);
};
