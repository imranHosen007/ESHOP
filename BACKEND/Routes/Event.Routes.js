import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  shopGetEvent,
  updateEventInformation,
} from "../Controllers/Event.Conrollers.js";
const router = express.Router();
router.post(`/`, createEvent);
router.get(`/`, getAllEvent);
router.get(`/:id`, shopGetEvent);
router.delete(`/:id`, deleteEvent);
router.put(`/:id`, updateEventInformation);
export default router;
