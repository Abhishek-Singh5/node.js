import User from "../models/user.js";

export async function handleGetAllUsers(req, res) {
    const users = await User.find({});
    return res.json(users);
}


export async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
}


export async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    return res.json({status: "success"});
}


export async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status : "success"});
}


export async function handleCreateNewUser(req, res) {
    const body = req.body;

  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    return res.status(400).json({msg : "All fields are required"});
  }
    
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    job_Title: body.job_title,
  });

  return res.status(201).json({msg: "success", id : result._id});
}

