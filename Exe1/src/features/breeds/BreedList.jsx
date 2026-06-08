import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchBreeds } from "./breedSlice";

function BreedList() {
  const dispatch = useDispatch();

  const { breeds, loading, error } = useSelector(
    (state) => state.breeds
  );

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Dog Breeds</h1>

      {breeds.map((breed) => (
        <div
          key={breed.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "12px",
            padding: "12px",
          }}
        >
          <h3>{breed.attributes.name}</h3>

          <p>
            {breed.attributes.description}
          </p>

          <p>
            Life:
            {" "}
            {breed.attributes.life.min}
            -
            {breed.attributes.life.max}
            years
          </p>

          <p>
            Hypoallergenic:
            {" "}
            {breed.attributes.hypoallergenic
              ? "Yes"
              : "No"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BreedList;

