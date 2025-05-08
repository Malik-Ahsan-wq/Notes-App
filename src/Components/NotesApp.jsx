import { useState, useEffect } from "react";
import { Search, Trash2, Edit, Save, Plus, X } from "lucide-react";
import {  FiSettings, FiEye, FiRefreshCcw, FiX } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

import { FaCubesStacked } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import Pop from "./Pop";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [noteBg, setNoteBg] = useState("#2A2B2E");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [colors, setColors] = useState([]);
  
  const [content, setContent] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

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
useEffect(() => {
  if (isFormVisible) {
    // Dark theme color palette
    const darkColors = [
      "#1e1e4f",
      "#2c2f43",
      "#3a3334",
      "#222831",
      "#1f1b84",
      "#2a2b5e",
    ];
    setColors(darkColors);
  }
}, [isFormVisible]);


  return (
    <div className="min-h-screen  bg-[#202124] p-4 md:p-6">
      <header className="w-full sticky top-0 z-50 bg-[#202124] border-b border-gray-500   pb-4  flex items-center  justify-between">
        <div className="flex items-center gap-3">
          <FiMenu
            className="text-white text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />

          {isOpen && (
            <div className="fixed inset-0  z-40" onClick={toggleSidebar}></div>
          )}

          {/* {sidebar} */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-[#2A2B2E] text-white z-50 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-start items-center p-4 border-b border-gray-700">
              <img src="/kepp app.png" alt="" />
              <h2 className="text-lg font-semibold">Keep</h2>
              <FiX
                className="text-2xl ml-25 cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
            <ul className="p-4 space-y-4">
              <li className="flex items-center  gap-3 cursor-pointer hover:bg-zinc-500 p-3 rounded  hover:text-gray-300">
                <FiSettings size={20} /> Settings
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-zinc-500 p-3 rounded  hover:text-gray-300">
                <FiEye size={20} /> View
              </li>
              <li className="flex items-center gap-3 hover:bg-zinc-500 p-3 rounded  cursor-pointer hover:text-gray-300">
                <FiRefreshCcw size={20} /> Refresh
              </li>
            </ul>
          </div>
          <img src="/kepp app.png" alt="Keep Logo" className="w-8 h-8" />
          <h1 className="text-2xl text-white font-semibold">Keep</h1>
        </div>

        <div className="hidden md:block relative flex-1 max-w-100 md:ml-10 mx-4">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded bg-[#2A2B2E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5f6368]"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Mobile Search Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setShowMobileSearch(true)}>
            <Search className="text-white" size={24} />
          </button>
        </div>

        {/* Mobile Search Overlay with Slide Down */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full bg-[#2A2B2E] z-50 p-4 flex items-center shadow-md"
            >
              <input
                type="text"
                placeholder="Search notes..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded bg-[#2A2B2E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5f6368]"
              />
              <Search
                className="absolute left-6 top-[1.2rem] text-gray-400"
                size={20}
              />
              <button
                onClick={() => setShowMobileSearch(false)}
                className="text-white ml-4 text-sm"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-4 md:gap-10 text-white text-2xl ">
          <IoMdRefresh
            title="Refresh"
            className="cursor-pointer hidden md:block hover:text-gray-300 "
          />
          <IoMdSettings
            title="setting"
            className="cursor-pointer  hover:text-gray-300"
          />
          <FaCubesStacked
            title="nothing"
            className="hidden md:block cursor-pointer hover:text-gray-300"
          />
          <button title="Login" onClick={() => setShowLogin(true)}>
            <RiAccountCircleFill className="cursor-pointer hover:text-gray-300" />
          </button>
          {showLogin && <Pop onClose={() => setShowLogin(false)} />}
        </div>
      </header>

      <div className="max-w-[750px] md:ml-90 py-5 mx-auto">
        <div className="mb-6">
          {isFormVisible ? (
            <div
              className="p-4 rounded-lg shadow-md"
              style={{ backgroundColor: noteBg }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {editId !== null ? "Edit Note" : "Write Note Below"}
                </h2>
                <button
                  onClick={cancelEdit}
                  className="text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div>
                {/* Color Picker */}
                <div className="mb-4">
                  <p className="text-white mb-2">Pick a background color:</p>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((color, idx) => (
                      <div
                        key={idx}
                        onClick={() => setNoteBg(color)}
                        className="w-8 h-8 rounded cursor-pointer border-2 border-white"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Title Input */}
                <div className="mb-4 text-white">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                {/* Content Input */}
                <div className="mb-4 text-white">
                  <textarea
                    placeholder="Note content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-md hover:bg-black hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded-md hover:bg-black transition-colors flex items-center gap-2"
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
              className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-[#2A2B2E] text-white rounded-md hover:bg-black font-bold transition-colors"
            >
              <Plus size={18} />
              Add New Note
            </button>
          )}
        </div>

        {filteredNotes.length === 0 ? (
          <div className="bg-[#2A2B2E] p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">
              {notes.length === 0
                ? "No notes yet. Create your first note!"
                : "No notes match your search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-[#2A2B2E] p-4 rounded-lg shadow-md flex flex-col h-full group relative"
              >
                <div className="mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {note.title}
                  </h3>
                  <p className="text-xs text-amber-800">{note.date}</p>
                </div>
                <p className="text-white mb-4 flex-grow whitespace-pre-wrap">
                  {note.content}
                </p>

                {/* Icons - Show only on hover */}
                <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(note)}
                    className="p-2 bg-[#2A2B2E] cursor-pointer text-white rounded-md hover:bg-black transition-colors"
                    aria-label="Edit note"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-2 bg-[#2A2B2E] cursor-pointer text-white rounded-md hover:bg-black transition-colors"
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
