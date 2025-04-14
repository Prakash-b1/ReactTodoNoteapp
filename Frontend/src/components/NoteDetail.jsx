const NoteDetail = ({ note, onDelete }) => {
  const handleDelete = () => {
    onDelete(note._id);  // Trigger delete for the selected note
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{note.title}</h2>
        {/* Keep the delete button */}
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
      <div className="text-lg">{note.content}</div>
    </div>
  );
};

export default NoteDetail;
