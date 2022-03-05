import "./delete-view.css";

type PropsType = {
  onCancel(): void;
  onDelete(): void;
  name: string;
  type?: "File" | "Folder";
};

function DeleteView({ onCancel, onDelete, name, type = "File" }: PropsType) {
  return (
    <div className="delete-modal">
      <div className="title">
        Delete {type} <strong>{name}</strong>
      </div>
      <div className="message">
        Do you really want to delete the {type.toLowerCase()} <i>{name}</i>
        {type === "Folder" ? " and its files" : ""} ? This process cannot be
        undone.
      </div>
      <div className="actions">
        <button onClick={onCancel} className="secondary">
          Cancel
        </button>
        <button onClick={onDelete} className="primary delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteView;
