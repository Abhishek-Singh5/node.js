import { getUser } from '../service/auth.js';

export  function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.headers["authorization"];

    if(!userUid) return res.redirect("/login");
    const token = userUid.split('Bearer ')[1];  // "Bearer [5sdf4s65df4ds56sd5f4x]"
    const user = getUser(token);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

export function checkAuth(req, res, next) {
    const userUid = req.headers["authorization"];

    const token = userUid.split('Bearer ')[1];  // "Bearer [5sdf4s65df4ds56sd5f4x]"
    const user = getUser(token);

    req.user = user;
    next();
}
