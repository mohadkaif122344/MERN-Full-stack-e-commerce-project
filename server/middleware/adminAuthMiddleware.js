import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (verifyToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only",
      });
    }

    req.adminEmail = verifyToken.email;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Invalid or expired token",
    });
  }
};

export default adminAuthMiddleware;