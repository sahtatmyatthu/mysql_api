import express from "express";
import {

  creatRoom,
  deleteRoom,
  getByRoomType,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/room.js";

const router = express.Router();

router.post("/", creatRoom);

router.put("/:id", updateRoom);

router.delete("/:id", deleteRoom);

// Get Rooms
router.get("/", getRooms);

// GET By ID
router.get("/:id", getRoomById);

// GET Room By Type
router.get("/type", getByRoomType);
export default router;
