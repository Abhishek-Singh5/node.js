import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.js';
import { setUser, getUser } from '../service/auth.js'



export async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render("signup", { error: "User already exists" });
    }

    await User.create({ name, email, password });
    return res.redirect("/login");
}

export async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if(!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
            
        })

    }

    if (!user.role) {
        user.role = "NORMAL";
    }


        const token = setUser(user);
        res.cookie('token', token);
        return res.redirect("/");
}
