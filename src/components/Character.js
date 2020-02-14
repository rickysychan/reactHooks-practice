import React from "react";
import { useHttp } from "../hooks/http";
import Summary from "./Summary";

const Character = props => {
  const [isLoading, fetchedData] = useHttp(
    "https://swapi.co/api/people/" + props.selectedChar,
    [props.selectedChar]
  );
  console.log(props);
  let loadedCharacter = null;
  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  // useEffect(() => {
  //   fetchData();
  //   return () => {
  //     console.log(
  //       "this runs when component rerenders, used for clean up usually"
  //     );
  //   };
  // }, [props.selectedChar]);

  // useEffect(() => {
  //   return () => {
  //     console.log("this runs when component unmounts");
  //   };
  // }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

// memo makes it so that only when input (like props it uses) changes will it rerender
export default React.memo(Character);
