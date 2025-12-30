import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ msg: "Authorization header is invalid." });
    }

    const tokenCode = authToken.split(" ")[1];
    try {
        const decodedObj = jwt.verify(
            tokenCode,
            process.env.JWT_SECRET as string
        );
        (req as any).user = decodedObj;
        next();
    } catch {
        return res.status(401).json({ msg: "Invalid or expired token." });
    }
}
