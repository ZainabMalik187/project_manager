import PropTypes from 'prop-types';
import { useDraggable } from '@dnd-kit/core';
function TaskCard({
  id,
  title,
  description,
  status,
  assignee,
  dueDate,
  priority,
  onEdit,
  onDelete,
  onComplete,
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`task ${status} ${isDragging ? 'dragging' : ''}`}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="task-details">
        <span>Assignee: {assignee}</span>
        <span>Due: {dueDate}</span>
        <span>Priority: {priority}</span>
      </div>
      <div className="task-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onComplete}>Complete</button>
      </div>
    </div>
  );
}
TaskCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.string,
  assignee: PropTypes.string,
  dueDate: PropTypes.string,
  priority: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
};
export default TaskCard;