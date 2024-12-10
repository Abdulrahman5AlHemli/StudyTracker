const Event = require('./event.model');

module.exports = {
    async createEvent(req, res, next) {
        try {
            const events = await Event.find({user: req.user._id});
            if (events) {
                // TODO: check for time conflict
                // return res.json({message: 'Course with same ID already exists.'});
            }

            const event = new Event({ ...req.body, user: req.user._id});
            await event.save();

            const eventData = await Event.findById(event._id).populate('course').lean();
            console.log(eventData)
            // const leanEvent = upEvent.toObject();

            res.status(201).json({...eventData});
        } catch (err) {
            next(err);
        }
    },

    async deleteEvent(req, res, next) {
        const {id} = req.params;
        try {
            let event = await Event.findByIdAndDelete(id).exec();
            if (!event) {
                return res.json({message: 'Event not found'});
            }
    
            res.status(200).json({message: 'Event deleted successfully.' });
        } catch (err) {
            next(err);
        }
    },

    async updateEvent(req, res, next) {
        const {id} = req.params;
        try {
            let event = await Event.findByIdAndUpdate(id, { ...req.body }, {new: true}).lean();
            if (!event) {
                return res.json({message: 'Event not found'});
            }
    
            res.status(200).json({message: 'Event updated successfully.', ...event });
        } catch (err) {
            next(err);
        }
    },

    async getAllEvents(req, res, next) {
        try {
            let events = await Event.find({user: req.user._id}).populate('course').exec();
            if (!events) {
                return res.json({message: 'Could not get events'});
            }
            res.status(200).json({ events });
        } catch (err) {
            next(err);
        }
    }
}