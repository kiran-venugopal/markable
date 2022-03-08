type PropsType = {
  name: string;
  type?: "File" | "Folder";
  onDelete(): void;
  onCancel(): void;
};

function DeleteView({ name, type = "File", onCancel, onDelete }: PropsType) {
  return (
    <div className="delete-modal">
      <div className="title">
        Delete {type} <strong>{name}</strong>!
      </div>
      <div className="message">
        Do you really want to delete the {type.toLowerCase()} <i>{name}</i>
        {type === "Folder" && "and its content"}? This process cannot be undone.
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
