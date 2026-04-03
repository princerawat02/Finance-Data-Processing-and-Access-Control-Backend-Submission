import * as recordService from "../services/recordService.js";

export const createRecord = (req, res) => {
  const { body } = req;

  if (!body.amount || !body.type || !body.category || !body.date) {
    return res.status(400).send({
      error:
        "Please provide all required fields (amount, type, category, date)",
    });
  }

  try {
    const data = recordService.createRecord(body);
    res.status(201).send({ message: "Record added", data });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const getAllRecords = (req, res) => {
  const records = recordService.getFilteredRecords(req.query);
  res.json(records);
};

export const updateRecord = (req, res) => {
  const { id } = req.params;
  const result = recordService.updateRecord(id, req.body);

  if (!result) {
    return res.status(404).json({ msg: "Not found" });
  }

  res.send({ status: "ok", result });
};

export const deleteRecord = (req, res) => {
  const { id } = req.params;
  const ok = recordService.deleteRecord(id);

  if (!ok) {
    return res.status(404).json({ error: "No such record" });
  }

  res.json({ msg: "deleted" });
};

export const getSummary = (req, res) => {
  const data = recordService.getSummary();
  res.json(data);
};
