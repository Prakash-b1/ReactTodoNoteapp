import { Search } from "lucide-react"; // optional icon lib


const NoteSidebar = ({ notes, onSelectNote, onCreateNote, onSearchChange }) => {
  return (
    <div className="flex flex-col  text-white  p-6">
      {/* Logo */}
      <div className="bg-black text-white flex justify-between items-center px-6 mb-4 rounded-xl py-4">
        {/* Logo with image and text */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={onCreateNote}>
          <img src='/addicon.svg' alt="TODO Logo" className="h-6 w-6 object-contain" />
          <span className="font-bold text-lg">TODO</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white px-3 py-1 rounded-full w-[160px]">
          <Search className="text-black h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            onChange={onSearchChange}
            className="ml-2 text-sm bg-transparent outline-none w-full text-black placeholder:text-gray-400"
          />
        </div>
      </div>


      {/* Notes List */}
      <div className="space-y-4 overflow-y-auto max-h-screen">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div
            key={note._id}
            tabIndex={0}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:border-blue-500 outline-none"
            onClick={() => onSelectNote(note)}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">{note.title}</h3>
          
            <div className="flex items-center justify-between">
              <p className="text-gray-700 text-base truncate max-w-[70%]">
                {note.content.slice(0, 50)}...
              </p>
              <span className="text-sm text-gray-400">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          ))
        ) : (
          <div className="text-gray-400 text-center p-4">
            No notes found
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteSidebar;