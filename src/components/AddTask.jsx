import { useState } from "react";
import PropTypes from "prop-types";

const AddTask = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd({
      title,
      description,
      assignee,
      dueDate,
      priority,
    });
    setTitle("");
    setDescription("");
    setAssignee("");
    setDueDate("");
    setPriority("Low");
    setShowForm(false);
  };

  return (
    <div className="add-task-container">
      {!showForm ? (
        <button onClick={() => setShowForm(true)}>Add Task</button>
      ) : (
        <form className="add-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

AddTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddTask;