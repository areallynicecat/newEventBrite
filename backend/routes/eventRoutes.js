import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/auth.js"; 
import { createEvent, getAllEvents, getEventById, getLatestEvents, updateEvent, deleteEvent, changeEventStatus} 
from "../controllers/eventController.js";

const eventRouter = Router();

// (public)
eventRouter.get('/latest-events', getLatestEvents);


// (admin)
// get all events
eventRouter.get('/events', authenticate, getAllEvents);

// get event
eventRouter.get('/event/:id', authenticate, getEventById);

// create event | should be available to all but I'm doinng the admin panel so I've used
// the admin check middleware here
eventRouter.post('/create-event', createEvent);

// route to update an
eventRouter.put('/update-event/:id', authenticate, updateEvent);

// delete event
eventRouter.delete('/delete-event/:id', authenticate, deleteEvent);

// change event status
eventRouter.put('/change-event-status/:id', authenticate, changeEventStatus);

export default eventRouter;
