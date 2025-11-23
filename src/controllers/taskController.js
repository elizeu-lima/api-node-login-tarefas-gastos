import { supabase } from '../config/supabase.js';

export const createTask = async (req, res) => {
    const { title, completed } = req.body;

    const { data, error } = await supabase
        .from("tasks")
        .insert([{ user_id: req.user.id, title, completed }]);

    if (error) return res.status(400).json(error);

    res.json(data);
};

export const listTasks = async (req, res) => {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", req.user.id);

    if (error) return res.status(400).json(error);

    res.json(data);
};
