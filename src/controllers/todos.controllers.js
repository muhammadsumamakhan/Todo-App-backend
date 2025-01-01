import mongoose from "mongoose";
import Todos from "../models/todos.models.js";

// Add Todo
const addTodo = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: 'Title or description is required',
        });
    }

    try {
        const todo = await Todos.create({ title, description });

        res.status(201).json({
            message: 'Todo added successfully',
            data: todo,
        });
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Get all Todos
const getAllTodo = async (req, res) => {
    try {
        const allTodo = await Todos.find();
        res.status(200).json({
            message: 'Todos fetched successfully',
            total: allTodo.length,
            data: allTodo,
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Get single Todo
const getSingleTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'Invalid ID format',
        });
    }

    try {
        const singleTodo = await Todos.findById(id);

        if (!singleTodo) {
            return res.status(404).json({
                message: 'No todo found with the provided ID',
            });
        }

        res.status(200).json({
            message: 'Single todo fetched successfully',
            data: singleTodo,
        });
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Delete Todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'Invalid ID format',
        });
    }

    try {
        const todoDelete = await Todos.findByIdAndDelete(id);

        if (!todoDelete) {
            return res.status(404).json({
                message: 'No todo found with the provided ID',
            });
        }

        res.status(200).json({
            message: 'Todo successfully deleted',
            data: todoDelete,
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
const editTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'Invalid ID format',
        });
    }

    if (!title || !description) {
        console.error('Validation error: Title or description is missing');
        return res.status(400).json({
            message: 'Title and description are required',
        });
    }

    try {
        const todoEdit = await Todos.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!todoEdit) {
            return res.status(404).json({
                message: 'No todo found with the provided ID',
            });
        }

        res.status(200).json({
            message: 'Todo successfully updated',
            data: todoEdit,
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};


export { addTodo, getAllTodo, getSingleTodo, deleteTodo, editTodo };
