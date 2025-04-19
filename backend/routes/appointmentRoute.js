import express from "express";
import { allAppointments, bookAppointment, getSelectedAppointment } from "../controllers/appointmentsController.js";
import { validateUser } from "../middlewares/validator.js";
const router = express.Router();



router.route("/").get(allAppointments);
router.route("/:appointmentid").get(getSelectedAppointment);
router.route("/bookappointment").post(validateUser , bookAppointment);

export default router;