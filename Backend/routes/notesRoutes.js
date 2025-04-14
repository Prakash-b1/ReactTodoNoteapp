import express from 'express';
import { getAllNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

// Route to get all notes
router.get('/', getAllNotes);

// Route to create a new note
router.post('/', createNote);

// Route to update a note by ID
router.put('/:id', updateNote);  // Add this route for updating a note

// Route to delete a note by ID
router.delete('/:id', deleteNote);

export default router;
