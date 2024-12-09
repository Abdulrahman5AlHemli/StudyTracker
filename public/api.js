
const apiUrls = {
    signup: '/api/user/signup',
    login: '/api/user/login',
    updateUser: '/api/user/update',
    getUser: '/api/user',
    getCourses: '/api/course/getAll',
    createCourse: '/api/course/create',
    deleteCourse: '/api/course/delete',
    updateCourse: '/api/course/update',
    getCourseById: '/api/course',
    getEvents: '/api/event/getAll',
    createEvent: '/api/event/create',
    deleteEvent: '/api/event/delete',
    updateEvent: '/api/event/update',
    getEventById: '/api/event'
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}

// Function to handle user signup
async function handleSignup(userData) {
    try {
        const response = await fetch(apiUrls.signup, {
            method: 'POST',
            headers,
            body: JSON.stringify(userData),
        });

        return {
            ok: response.ok,
            data: await response.json()
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return error
    }
}

// Function to handle user login
async function handleLogin(credentials) {
    try {
        const response = await fetch(apiUrls.login, {
            method: 'POST',
            headers,
            body: JSON.stringify(credentials),
        });
        return {
            ok: response.ok,
            data: await response.json()
        }
    } catch (error) {
        console.error('Error during login:', error);
        return error;
    }
}


async function handleUpdateUser(userData) {
    try {
        const response = await fetch(apiUrls.updateUser + `/${userData._id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(userData),
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }

        return {
            ok: response.ok,
            data: await response.json()
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return error
    }
}

async function createCourse(data) {
    try {
        const response = await fetch(apiUrls.createCourse, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        return {
            ok: response.ok,
            data: await response.json()
        }
    } catch (error) {
        console.error('Error creating course:', error);
        return error
    }
}

async function getCourses() {
    try {
        const response = await fetch(apiUrls.getCourses, {
            method: 'GET',
            headers,
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }
        return await response.json()
    } catch (error) {
        console.error('Error fethcing courses:', error);
        return error
    }
}

async function getCourseById(id) {
    try {
        const response = await fetch(apiUrls.getCourseById + `/${id}`, {
            method: 'GET',
            headers,
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        if (!response.ok) {
            throw new Error("Failed to fetch course");
        }
        return await response.json()
    } catch (error) {
        console.error('Error fethcing course:', error);
        return error
    }
}


async function updateCourse(data) {
    try {
        const response = await fetch(apiUrls.updateCourse + `/${data._id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        if (!response.ok) {
            throw new Error("Failed to update course");
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating course:', error);
        return error
    }
}

async function handleDeleteCourse(id) {
    try {
        const response = await fetch(apiUrls.deleteCourse + `/${id}`, {
            method: 'DELETE',
            headers,
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        if (!response.ok) {
            throw new Error("Failed to delete course");
        }
        return await response.json()
    } catch (error) {
        console.error('Error deleting course:', error);
        return error
    }
}

async function createEvent(data) {
    try {
        const response = await fetch(apiUrls.createEvent, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        return {
            ok: response.ok,
            data: await response.json()
        }
    } catch (error) {
        console.error('Error creating event:', error);
        return error
    }
}

async function getEvents() {
    try {
        const response = await fetch(apiUrls.getEvents, {
            method: 'GET',
            headers,
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return await response.json()
    } catch (error) {
        console.error('Error fethcing events:', error);
        return error
    }
}

async function updateEvent(data) {
    try {
        const response = await fetch(apiUrls.updateEvent + `/${data._id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        if (!response.ok) {
            throw new Error("Failed to update event");
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating event:', error);
        return error
    }
}

async function handleDeleteEvent(id) {
    try {
        const response = await fetch(apiUrls.deleteEvent + `/${id}`, {
            method: 'DELETE',
            headers,
        });

        if (response.status === 401) {
            window.location.href = "Signin.html";
        }
        if (!response.ok) {
            throw new Error("Failed to delete event");
        }
        return await response.json()
    } catch (error) {
        console.error('Error deleting event:', error);
        return error
    }
}


function verifyIfLoggedIn() {
    if (!localStorage.getItem("token")) {
        window.location.href = "Signin.html"
    }
}

function setGreetingMsg() {
    let user = localStorage.getItem("userData");
    if (user) {
        user = JSON.parse(user);
        document.getElementById("user-greeting").innerText = "Hi, " + user.firstName;
    }
}

function getUserData() {
    let user = localStorage.getItem("userData");
    if (user) {
        user = JSON.parse(user);
    }
    return user;
}

function convertTimeToAMPM(time) {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return hours + ':' + minutes + ' ' + ampm;
}



