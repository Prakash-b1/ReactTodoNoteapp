import { useState, useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';

const NoteEditor = ({ onSaveNote, selectedNote, onDeleteNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef(null);

  // Populate editor with selected note
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      if (contentRef.current) {
        contentRef.current.innerHTML = selectedNote.content;
      }
    } else {
      setTitle('');
      setContent('');
      if (contentRef.current) {
        contentRef.current.innerHTML = '';
      }
    }
  }, [selectedNote]);

  // Auto-save after changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title && content && !isSaving) {
        setIsSaving(true);
        const updatedNote = {
          id: selectedNote?._id,
          title,
          content,
        };
        onSaveNote(updatedNote, !!selectedNote);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
      setIsSaving(false);
    };
  }, [title, content]);

  const handleContentChange = () => {
    setContent(contentRef.current.innerHTML);
  };

  const applyFormat = (command) => {
    document.execCommand(command);
    contentRef.current.focus();
    handleContentChange();
  };

  const toggleJustify = (type) => {
    document.execCommand(`justify${type}`);
    contentRef.current.focus();
    handleContentChange();
  };

  const toggleList = (type) => {
    document.execCommand(type);
    contentRef.current.focus();
    handleContentChange();
  };

  const toggleCase = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      if (selectedText) {
        const isUpper = selectedText === selectedText.toUpperCase();
        const newText = isUpper ? selectedText.toLowerCase() : selectedText.toUpperCase();
        const span = document.createElement('span');
        span.textContent = newText;
        range.deleteContents();
        range.insertNode(span);
        handleContentChange();
      }
    }
  };

  const insertHR = () => {
    document.execCommand('insertHorizontalRule');
    contentRef.current.focus();
    handleContentChange();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full h-full mx-auto">
      <div className="flex justify-between items-start mb-4">
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold w-full border-b-2 border-gray-300 p-2"
        />
        <button onClick={onDeleteNote}>
          <Trash2 className="w-5 h-5 text-gray-500 hover:text-red-500 ml-4" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-3 text-gray-700">
        <button onClick={() => applyFormat('bold')} className="hover:bg-gray-100 px-2 py-1 rounded">B</button>
        <button onClick={() => applyFormat('italic')} className="hover:bg-gray-100 px-2 py-1 rounded">I</button>
        <button onClick={() => applyFormat('underline')} className="hover:bg-gray-100 px-2 py-1 rounded">U</button>
        <button onClick={() => toggleJustify('Left')} className="hover:bg-gray-100 px-2 py-1 rounded">≡</button>
        <button onClick={() => toggleJustify('Center')} className="hover:bg-gray-100 px-2 py-1 rounded">≣</button>
        <button onClick={() => toggleJustify('Right')} className="hover:bg-gray-100 px-2 py-1 rounded">⇨</button>
        <button onClick={() => toggleJustify('Full')} className="hover:bg-gray-100 px-2 py-1 rounded">⎯⎯</button>
        <button onClick={() => toggleList('insertUnorderedList')} className="hover:bg-gray-100 px-2 py-1 rounded">•</button>
        <button onClick={() => toggleList('insertOrderedList')} className="hover:bg-gray-100 px-2 py-1 rounded">1.</button>
        <button onClick={toggleCase} className="hover:bg-gray-100 px-2 py-1 rounded">A↔a</button>
        <button onClick={insertHR} className="hover:bg-gray-100 px-2 py-1 rounded">¶</button>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        contentEditable
        spellCheck
        role="textbox"
        aria-label="Note content"
        onInput={handleContentChange}
        className="w-full min-h-[200px] border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none"
      />
    </div>
  );
};

export default NoteEditor;
