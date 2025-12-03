import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();//imamo pristup error objektu koji nam daje react router, jer se nalazimo u errorElementu iz app.jsx rute
  //da nismio definisali u app.jsx errorElement, ne bismo imali pristup ovom error objektu ovde 

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
