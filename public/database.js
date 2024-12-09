// database.js

const db = new Map([
    ['COE202', {
        course_ID: 'COE202',
        course_Name: 'Digital Logic',
        credit: 3,
        term: 242,
        color: '#FF0000',
        events: [
            { date: '2024-11-09', time_interval: '10:00am to 11:00am', name: 'Hard Homework', type: 'Assignment', completed: false }
        ]
    }],
    ['MATH208', {
        course_ID: 'MATH208',
        course_Name: 'Intro to Linear Algebra',
        credit: 3,
        term: 241,
        color: 'orange',
        events: [
            { date: '2024-11-09', time_interval: '1:00pm to 2:00pm', name: 'Quiz 1', type: 'Assessment', completed: false }
        ]
    }],
    ['CS101', {
        course_ID: 'CS101',
        course_Name: 'Intro to Computer Science',
        credit: 4,
        term: 241,
        color: 'purple',
        events: [
            { date: '2024-11-27', time_interval: '3:00pm to 4:30pm', name: 'Lab Test 1', type: 'Lab', completed: false }
        ]
    }]
]);
