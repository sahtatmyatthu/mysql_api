import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotelById,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

router.post("/", createHotel);

router.put("/:id", updateHotel);

router.delete("/:id", deleteHotel);

router.get("/:id", getHotelById);

router.get("/", getAllHotel);

export default router;
