import jwt from 'jsonwebtoken';
export default function ValidateUserToken(req, res, next){
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("token",token, req.headers['Authorization']);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
}