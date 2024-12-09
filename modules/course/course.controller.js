const Course = require('./course.model');

module.exports = {
    async createCourse(req, res, next) {
        try {
            let course = await Course.findOne({ courseId: req.body.courseId });
            if (course) {
                return res.json({message: 'Course with same ID already exists.'});
            }
            course = new Course({ ...req.body, user: req.user._id});
            await course.save();
            res.status(201).json({message: 'Course added successfully.', ...course});
        } catch (err) {
            next(err);
        }
    },

    async deleteCourse(req, res, next) {
        const {id} = req.params;
        try {
            let course = await Course.findByIdAndDelete(id).exec();
            if (!course) {
                return res.json({message: 'Course not found'});
            }
    
            res.status(200).json({message: 'Course deleted successfully.', ...course });
        } catch (err) {
            next(err);
        }
    },

    async updateCourse(req, res, next) {
        const {id} = req.params;
        try {
            let course = await Course.findByIdAndUpdate(id, { ...req.body }, {new: true}).lean();
            if (!course) {
                return res.json({message: 'Course not found'});
            }
    
            res.status(200).json({message: 'Course updated successfully.', ...course });
        } catch (err) {
            next(err);
        }
    },

    async getAllCourses(req, res, next) {
        try {
            let courses = await Course.find({user: req.user._id}).exec();
            if (!courses) {
                return res.json({message: 'Could not get courses'});
            }
            res.status(200).json({ courses });
        } catch (err) {
            next(err);
        }
    },

    async getCourse(req, res, next) {
        const {id} = req.params;
        try {
            const course = await Course.findById(id).lean();
            if (!course) {
                return res.json({message: 'Course not found'});
            }
            res.status(200).json({ ...course });
        } catch (err) {
            next(err);
        }
    }
}