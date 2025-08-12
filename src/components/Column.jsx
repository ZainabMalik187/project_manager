import PropTypes from "prop-types";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
const Column = ({ id, title, cards, onAddTask }) => (
  <div className="column">
    <h2>{title}</h2>
    <AddTask onAdd={(task) => onAddTask(id, task)} />
    <div className="task-list">
      {cards.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  </div>
);
Column.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      assignee: PropTypes.string,
      dueDate: PropTypes.string,
      priority: PropTypes.string,
    })
  ).isRequired,
  onAddTask:PropTypes.func.isRequired,
};
export default Column;