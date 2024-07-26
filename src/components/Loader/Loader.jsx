import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader({ isLoading }) {
  return (
    <ThreeDots
      visible={isLoading}
      wrapperClass={css.loader}
      ariaLabel='three-dots-loading'
    />
  );
}
