import { useState, useEffect } from "react";
import { Search, Trash2, Edit, Save, Plus, X } from "lucide-react";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!title.trim() || !content.trim()) return;

    if (editId !== null) {
      // Edit existing note
      setNotes(
        notes.map((note) =>
          note.id === editId
            ? { ...note, title, content, date: new Date().toLocaleString() }
            : note
        )
      );
      setEditId(null);
    } else {
      // Add new note
      const newNote = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleString(),
      };
      setNotes([newNote, ...notes]);
    }

    // Clear form
    setTitle("");
    setContent("");
    setIsFormVisible(false);
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase())
  );

  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setEditId(null);
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Notes App</h1>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </header>

        <div className="mb-6">
          {isFormVisible ? (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editId !== null ? "Edit Note" : "Add New Note"}
                </h2>
                <button
                  onClick={cancelEdit}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Note content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsFormVisible(true)}
              className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Plus size={18} />
              Add New Note
            </button>
          )}
        </div>

        {filteredNotes.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">
              {notes.length === 0
                ? "No notes yet. Create your first note!"
                : "No notes match your search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {note.title}
                  </h3>
                  <p className="text-xs text-gray-500">{note.date}</p>
                </div>
                <p className="text-gray-600 mb-4 flex-grow whitespace-pre-wrap">
                  {note.content}
                </p>
                <div className="flex justify-end gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(note)}
                    className="p-2 bg-blue-100 cursor-pointer text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                    aria-label="Edit note"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-2 bg-red-100 cursor-pointer text-red-600 rounded-md hover:bg-red-200 transition-colors"
                    aria-label="Delete note"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
