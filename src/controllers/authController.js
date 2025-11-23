import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

export const register = async (req, res) => {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from("users")
        .insert([{ email, password: hashed }])
        .select();

    if (error) return res.status(400).json(error);

    return res.json(data);
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !users)
        return res.status(400).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, users.password);

    if (!valid)
        return res.status(400).json({ error: "Senha incorreta" });

    const token = jwt.sign({ id: users.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.json({ token });
};

export const resetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user.id;

    const hashed = await bcrypt.hash(newPassword, 10);

    const { error } = await supabase
        .from("users")
        .update({ password: hashed })
        .eq("id", userId);

    if (error) return res.status(400).json(error);

    return res.json({ message: "Senha redefinida com sucesso" });
};
