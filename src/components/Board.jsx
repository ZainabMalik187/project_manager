import Column from "./Column";
import PropTypes from "prop-types";
const Board = ({ columns }) => {
  return (
    <div className="board">
      {columns.map((col) => (
        <Column key={col.id} title={col.title} tasks={col.tasks} />
      ))}
    </div>
  );
}
Board.propTypes = {
  columns: PropTypes.string.isRequired,
}
export default Board;