import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchBreeds,
} from "./breedSlice";

function BreedList() {
  const dispatch = useDispatch();

  const {
    breeds,
    loading,
    error,
    offline,
  } = useSelector(
    (state) => state.breeds
  );

  const breedList = Array.isArray(breeds) ? breeds : [];

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error && breeds.length === 0) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      {offline && (
        <p>
          Offline mode: displaying cached data.
        </p>
      )}

      {breedList.map((breed) => (
        <div
          key={breed.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{breed.attributes.name}</h3>

          <p>{breed.attributes.description}</p>

          <p>
            Life Span: {breed.attributes.life.min}-
            {breed.attributes.life.max} years
          </p>

          <p>
            Hypoallergenic: {breed.attributes.hypoallergenic ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BreedList;

