import { RequestHandler } from "express";
import { loginService } from "../services/auth.service";

/**
 * Handles user login with Supabase authentication.
 */
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const { data, error } = await loginService(email, password);

    if (error) {
      res.status(401).json({ error: error.message });
      return;
    }

    res.status(200).json({ message: "Login successful", user: data.user, session: data.session });
  } catch (_error) {
    res.status(500).json({ error: "Login failed" });
  }
};
