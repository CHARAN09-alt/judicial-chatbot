import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	console.log(token);
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		req.user = decoded;
		next();
	});
};
export default verifyToken;