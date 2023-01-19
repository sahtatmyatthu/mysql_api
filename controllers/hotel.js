import { db } from "../db.js";
import { v4 as uuid_v4 } from "uuid";

export const createHotel = (req, res, next) => {
  // CHECK EXISTING ROOM NUMBER
  const q = "SELECT * FROM hotel WHERE hotel_name = ?";

  try {
    db.query(q, [req.body.hotel_name], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res.status(409).json("Hotel name is already exist!");

      const createdAt = new Date();
      const updatedAt = new Date();
      const hotel_id = uuid_v4();

      const q =
        "INSERT INTO `hotel`(`hotel_id`,`hotel_name`,`contact_address`,`location`,`city`,`country`,`photo`,`rank`,`desc`,`details`,`createdAt`,`updatedAt`) VALUES(?)";
      const values = [
        hotel_id,
        req.body.hotel_name,
        req.body.contact_address,
        req.body.location,
        req.body.city,
        req.body.country,
        req.body.photo,
        req.body.rank,
        req.body.desc,
        req.body.details,
        createdAt,
        updatedAt,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Hotel has been created.");
      });
    });
  } catch (err) {
    next(err);
  }
};

export const updateHotel = (req, res, next) => {
  const updatedAt = new Date();
  const hotel_id = req.params.id;

  const q =
    "UPDATE `hotel` SET `hotel_name`=?,`contact_address`=?, `location`=?, `city`=?, `country`=?, `photo`=?, `rank`=?, `desc`=?, `details`=?, `updatedAt`=? WHERE `hotel_id`=?";

  const values = [
    req.body.hotel_name,
    req.body.contact_address,
    req.body.location,
    req.body.city,
    req.body.country,
    req.body.photo,
    req.body.rank,
    req.body.desc,
    req.body.details,
    updatedAt,
    hotel_id,
  ];

  try {
    db.query(q, [...values, updatedAt, hotel_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Hotel has been updated!");
    });
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = (req, res, next) => {
  try {
    const hotel_id = req.params.id;
    const q = "SELECT * FROM hotel WHERE hotel_id = ?";

    db.query(q, [hotel_id], (err, data) => {
      if (err) return res.status(500).json(err);
    
      if (!data.length) return res.status(409).json("Room doesn't exist!");
      
      const q = "DELETE FROM hotel WHERE `hotel_id`=?";

      db.query(q, [hotel_id], (err, data) => {
        if (err) return res.status(403).json("Only admin can delete room!");

        return res.json("Hotel has been deleted!");
      });
    });
  } catch (err) {
    next(err);
  }
};

export const getHotelById = (req, res, next) => {
  const hotel_id = req.params.id;
  const q =
    "SELECT * FROM `hotel` WHERE `hotel_id` = ?";
  try {
    db.query(q, [hotel_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(409).json("Hotel doesn't exist!");
      return res.json(data);
    });
  } catch (err) {
    next(err);
  }
};

export const getAllHotel = (req, res, next) => {
  const { min, max, roomtype } = req.query;
  

  try {
    const q = `SELECT * FROM hotel`
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
};