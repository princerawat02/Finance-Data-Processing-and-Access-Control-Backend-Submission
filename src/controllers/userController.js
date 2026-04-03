import * as db from "../data/inMemoryDB.js";

export const getAllUsers = (req, res) => {
  const list = db.getUsers();
  res.json(list);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { role, status } = req.body;

  const users = db.getUsers();
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).send({ error: "No such user" });
  }

  // update logic
  if (role) user.role = role;
  if (status) user.status = status;

  const all = db.getUsers();
  const idx = all.findIndex((u) => u.id === parseInt(id));
  all[idx] = user;
  db.saveUsers(all);

  res.json({ msg: "done", user });
};
