import { useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const params = useParams();
  //   console.log(params);

  return (
    <>
      <p>Movie details</p>
    </>
  );
}
