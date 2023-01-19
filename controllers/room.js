import { db } from "../db.js";
import { v4 as uuid_v4 } from "uuid";

export const creatRoom = (req, res, next) => {
  // CHECK EXISTING ROOM NUMBER
  const q = "SELECT * FROM room WHERE room_number = ?";

  try {
    db.query(q, [req.body.room_number], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res.status(409).json("Room number is already exist!");

      const createdAt = new Date();
      const updatedAt = new Date();
      const room_id = uuid_v4();

      const q =
        "INSERT INTO `room`(`room_id`,`hotel_id`,`room_type`,`room_status`,`room_number`,`price`,`max_guest`,`smoking`,`desc`,`details`,`createdAt`,`updatedAt`) VALUES(?)";
      const values = [
        room_id,
        req.body.hotel_id,
        req.body.room_type,
        req.body.room_status,
        req.body.room_number,
        req.body.price,
        req.body.max_guest,
        req.body.smoking,
        req.body.desc,
        req.body.details,
        createdAt,
        updatedAt,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Room has been created.");
      });
    });
  } catch (err) {
    next(err);
  }
};


export const deleteRoom = (req, res, next) => {
  try {
    const roomId = req.params.id;
    const q = "SELECT * FROM room WHERE room_id = ?";

    db.query(q, [roomId], (err, data) => {
      if (err) return res.status(500).json(err);
    
      if (!data.length) return res.status(409).json("Room doesn't exist!");
      const roomId = req.params.id;
      const q = "DELETE FROM room WHERE `room_id`=?";

      db.query(q, [roomId], (err, data) => {
        if (err) return res.status(403).json("Only admin can delete room!");

        return res.json("Room has been deleted!");
      });
    });
  } catch (err) {
    next(err);
  }
};

export const updateRoom = (req, res, next) => {
  const updatedAt = new Date();
  const room_id = req.params.id;


  const q =
    "UPDATE `room` SET `hotel_id`=?,`room_type`=?, `room_status`=?, `room_number`=?, `price`=?, `max_guest`=?, `smoking`=?, `desc`=?, `details`=?, `updatedAt`=? WHERE `room_id`=?";

  const values = [
    req.body.hotel_id,
    req.body.room_type,
    req.body.room_status,
    req.body.room_number,
    req.body.price,
    req.body.max_guest,
    req.body.smoking,
    req.body.desc,
    req.body.details,
    updatedAt,
    room_id,
  ];
  try {
    db.query(q, [...values, updatedAt, room_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Room has been updated!");
    });
  } catch (err) {
    next(err);
  }
};
``;

export const getRoomById = (req, res, next) => {
  const roomId = req.params.id;
  const q =
    "SELECT * FROM room WHERE room_id = ?";
  try {
    db.query(q, [roomId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(409).json("Room doesn't exist!");
      return res.json(data);
    });
  } catch (err) {
    next(err);
  }
};

export const getByRoomType = (req, res, next) => {
  const q = req.query.roomtype
    ? "SELECT * FROM rooms WHERE roomType=?"
    : "SELECT * FROM rooms";
  try {
    db.query(q, [req.query.roomtype], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
};



export const getRooms = (req, res, next) => {
  const { min, max, roomtype } = req.query;
  

  try {
    let q = `SELECT * FROM room`;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
};


