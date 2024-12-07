import jwt from 'jsonwebtoken'; 

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};


export const isAdmin = (req, res, next) => {
    
    if (!req.user) {
        return res.status(401).json({ message: 'Authorization required' });
    }


    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next(); 
};
