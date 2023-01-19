import { db } from "../db.js";
import { v4 as uuid_v4 } from "uuid";

export const getUsers = (req, res, next) => {
  try {
    let q = "SELECT * FROM guest";
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
};
