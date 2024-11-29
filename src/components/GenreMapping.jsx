import PropTypes from "prop-types";

// Genre mapping object
const genreMapping = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

// GenreMapping Component
export default function GenreMapping({ genreIds }) {
  // Map genre IDs to names
  const genreNames = genreIds
    .map((genreId) => genreMapping[genreId])
    .filter(Boolean); // Remove undefined values (in case of invalid IDs)

  return (
    <span>{genreNames.length > 0 ? genreNames.join(", ") : "Unknown"}</span>
  );
}

// Prop validation
GenreMapping.propTypes = {
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};