import { supabase } from '../config/supabase.js';

export const createExpense = async (req, res) => {
    const { title, amount } = req.body;

    const { data, error } = await supabase
        .from("expenses")
        .insert([{ user_id: req.user.id, title, amount }])
        .select();

    if (error) return res.status(400).json(error);

    res.json(data);
};

export const listExpenses = async (req, res) => {
    const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", req.user.id);

    if (error) return res.status(400).json(error);

    res.json(data);
};

export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;

    const { data, error } = await supabase
        .from("expenses")
        .update({ title, amount })
        .eq("id", id)
        .eq("user_id", req.user.id)
        .select();

    if (error) return res.status(400).json(error);

    res.json(data);
};

export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("user_id", req.user.id);

    if (error) return res.status(400).json(error);

    res.json({ message: "Gasto removido" });
};
