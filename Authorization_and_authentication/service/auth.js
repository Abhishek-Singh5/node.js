import jsonwebtoken from "jsonwebtoken";

const secret = "Abhishek$4686#"

export function setUser(user){
    return jsonwebtoken.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    },secret);
}

export function getUser(token) {

    if(!token) return null;

    try {
        return jsonwebtoken.verify(token,secret);
    } catch (error) {
        return null;
    }
    
}


