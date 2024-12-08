import Event from "../models/eventModel.js";
import mongoose from "mongoose";

// create event
export const createEvent = async (req, res) => {
    const { name, description, date, location, ticketTypes, organizerId, eventImage } = req.body;

    try {
        const newEvent = new Event({
            name,
            description,
            date,
            location,
            ticketTypes,
            organizerId,
            eventImage
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// getch all events | this includes the filter functionality since I found
// making a separate one redundant
export const getAllEvents = async (req, res) => {
    const { name, date, location, status } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" }; 
    if (date) filter.date = new Date(date);
    if (location) filter.location = { $regex: location, $options: "i" };
    if (status) filter.status = status;

    try {
        const events = await Event.find(filter).populate('organizerId', 'username email');
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};


// get latest 10 events
export const getLatestEvents = async (req, res) => {
    try {
        // Fetch the 10 most recent events, sorted by date in descending order
        const latestEvents = await Event.find()
            .sort({ date: -1 })  // Sort by date in descending order (latest first)
            .limit(10)  // Limit to the 10 most recent events
            .populate('organizerId', 'username email');  // Populate organizer info

        if (!latestEvents || latestEvents.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }

        res.status(200).json({ events: latestEvents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest events', error: error.message });
    }
};


// get an event
export const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id).populate('organizerId', 'username email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ event });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};

// update event data | I don't know if the admin is supposed to be able to do this but I added it either way
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, date, location, ticketTypes, status, eventImage, eventImageType } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { name, description, date, location, ticketTypes, status, eventImage, eventImageType, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
};

// delete event | using id
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};

// change event status
export const changeEventStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const allowedStatuses = ['draft', 'approved', 'rejected', 'completed'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Allowed statuses are: ${allowedStatuses.join(', ')}` });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { status, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event status updated successfully', event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event status', error: error.message });
    }
};
