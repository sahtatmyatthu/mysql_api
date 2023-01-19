import { db } from "../db.js";
import bcrypt from "bcryptjs";
import { v4 as uuid_v4 } from "uuid";
import jwt from "jsonwebtoken";


// Register for guest
export const guestregister = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM guest WHERE guest_email = ? OR guest_name = ?";

  db.query(q, [req.body.guest_email, req.body.guest_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.guest_password, salt);
    const createdAt = new Date();
    const updatedAt = new Date();
    const guest_id = uuid_v4();

    const q =
      "INSERT INTO guest(`guest_id`,`guest_name`,`guest_email`,`guest_password`,`phone_number`,`city`,`country`,`photo`,`createdAt`,`updatedAt`) VALUES (?)";
    const values = [
      guest_id,
      req.body.guest_name,
      req.body.guest_email,
      hash,
      req.body.phone_number,
      req.body.city,
      req.body.country,
      req.body.photo,
      createdAt,
      updatedAt,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

// register for employee
export const employeeregister = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM employee WHERE employee_email = ? OR employee_name = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.employee_password, salt);
    const createdAt = new Date();
    const updatedAt = new Date();
    const employee_id = uuid_v4();

    const q =
      "INSERT INTO employee(`employee_id`,`hotel_id`,`employee_name`,`employee_email`,`employee_password`,`contact_number`,`employee_address`,`employee_type`,`photo`,`createdAt`,`updatedAt`) VALUES (?)";
    const values = [
      employee_id,
      req.body.hotel_id,
      req.body.employee_name,
      req.body.employee_email,
      hash,
      req.body.contact_number,
      req.body.employee_address,
      req.body.employee_type,
      req.body.photo,
      createdAt,
      updatedAt,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Employee has been created.");
    });
  });
};


export const guestlogin = (req, res) => {
  //CHECK USER
  const q = "SELECT * FROM guest WHERE guest_name=?";

  db.query(q, [req.body.guest_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
   

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.guest_password,
      data[0].guest_password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].guest_id }, "jwtkey");
    const { guest_password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const employeelogin = (req, res) => {
  //CHECK USER
  const q = "SELECT * FROM employee WHERE employee_name=?";

  db.query(q, [req.body.employee_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
   

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.employee_password,
      data[0].employee_password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].guest_id }, "jwtkey");
    const { employee_password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
