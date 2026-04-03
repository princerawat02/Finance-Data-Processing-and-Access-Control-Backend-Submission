import * as db from "../data/inMemoryDB.js";

export const allowRoles = (roles) => {
  return (req, res, next) => {
    const role = req.query.role;

    if (!role) {
      return res.status(401).send({ error: "You are not authorized" });
    }

    const users = db.getUsers();
    const user = users.find((u) => u.role === role);

    if (!user || user.status !== "active") {
      return res.status(403).send({ error: "Account inactive or invalid" });
    }

    if (!roles.includes(role)) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    next();
  };
};
