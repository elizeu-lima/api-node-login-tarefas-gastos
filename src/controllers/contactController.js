import { supabase } from '../config/supabase.js';

export const createContact = async (req, res) => {
    const { name, phone } = req.body;

    const { data, error } = await supabase
        .from("contacts")
        .insert([{ user_id: req.user.id, name, phone }])
        .select();

    if (error) return res.status(400).json(error);

    res.json(data);
};

export const listContacts = async (req, res) => {
    const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("user_id", req.user.id);

    if (error) return res.status(400).json(error);

    res.json(data);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body;

    const { data, error } = await supabase
        .from("contacts")
        .update({ name, phone })
        .eq("id", id)
        .eq("user_id", req.user.id)
        .select();

    if (error) return res.status(400).json(error);

    res.json(data);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id)
        .eq("user_id", req.user.id);

    if (error) return res.status(400).json(error);

    res.json({ message: "Contato removido" });
};
