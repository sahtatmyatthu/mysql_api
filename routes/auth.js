import express from "express";
import {
  employeelogin,
  employeeregister,
  guestlogin,
  guestregister,
  logout,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", guestregister);
router.post("/employee", employeeregister);
router.post("/login", guestlogin);
router.post("/employeelogin", employeelogin);
router.post("/logout", logout);

export default router;
