// Monthly Activities Data Array
const monthlyActivities = [
    { id: 1, activity: "Create project file which contains tables between 12 to 19", subject: "Maths" },
    { id: 2, activity: "Write an essay on 'My Summer Vacation' (minimum 500 words)", subject: "English" },
    { id: 3, activity: "Complete the worksheet on Cell Structure and Functions", subject: "Science" },
    { id: 4, activity: "Prepare a presentation on the Indian Independence Movement", subject: "History" },
    { id: 5, activity: "Solve all exercise problems from Chapter 5: Quadratic Equations", subject: "Maths" },
    { id: 6, activity: "Read and summarize Chapter 3: The Lost Child", subject: "English" },
    { id: 7, activity: "Conduct an experiment on Newton's Laws of Motion and submit report", subject: "Science" },
    { id: 8, activity: "Create a timeline of World War II events", subject: "History" },
    { id: 9, activity: "Design a simple calculator using HTML, CSS and JavaScript", subject: "Computer" },
    { id: 10, activity: "Practice programming loops - solve 10 pattern problems", subject: "Computer" },
    { id: 11, activity: "Learn multiplication tables from 20 to 25", subject: "Maths" },
    { id: 12, activity: "Write a book review on any classic novel", subject: "English" }
];

// User database (In real application, this would be on server)
let users = JSON.parse(localStorage.getItem('schoolUsers')) || [];
let currentUser = null;

// Show Login Form
function showLoginForm() {
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('registerTab').classList.remove('active');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    clearMessages();
}

// Show Register Form
function showRegisterForm() {
    document.getElementById('registerTab').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    clearMessages();
}

// Clear error/success messages
function clearMessages() {
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('registerError').style.display = 'none';
    document.getElementById('registerSuccess').style.display = 'none';
}

// Handle Registration
function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const errorDiv = document.getElementById('registerError');
    const successDiv = document.getElementById('registerSuccess');

    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    if (!username || !password || !confirmPassword) {
        errorDiv.textContent = 'All fields are required!';
        errorDiv.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match!';
        errorDiv.style.display = 'block';
        return;
    }

    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters!';
        errorDiv.style.display = 'block';
        return;
    }

    // Check if user already exists
    if (users.find(u => u.username === username)) {
        errorDiv.textContent = 'Username already exists!';
        errorDiv.style.display = 'block';
        return;
    }

    // Register user
    users.push({ username, password });
    localStorage.setItem('schoolUsers', JSON.stringify(users));

    successDiv.textContent = 'Registration successful! Please login.';
    successDiv.style.display = 'block';

    // Clear form
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerConfirmPassword').value = '';

    // Switch to login after 2 seconds
    setTimeout(() => {
        showLoginForm();
    }, 2000);
}

// Handle Login
function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    errorDiv.style.display = 'none';

    if (!username || !password) {
        errorDiv.textContent = 'Please enter username and password!';
        errorDiv.style.display = 'block';
        return;
    }

    // Verify user
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        errorDiv.textContent = 'Invalid username or password!';
        errorDiv.style.display = 'block';
        return;
    }

    // Login successful
    currentUser = username;
    localStorage.setItem('currentUser', username);
    showDashboard();
}

// Show Dashboard after login
function showDashboard() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('header').classList.add('show');
    document.getElementById('welcomeUser').textContent = `Welcome, ${currentUser}!`;
    showHome();
    
    // Update profile with user data
    document.getElementById('profileName').textContent = currentUser;
    document.getElementById('profileEmail').textContent = `${currentUser.toLowerCase()}@springflowers.edu`;
    document.getElementById('profileInitials').textContent = getInitials(currentUser);
}

// Get initials from name
function getInitials(name) {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Show Home
function showHome() {
    document.getElementById('welcome').classList.add('active');
    document.getElementById('profile').classList.remove('active');
    document.getElementById('activities').classList.remove('active');
}

// Show Profile
function showProfile() {
    document.getElementById('welcome').classList.remove('active');
    document.getElementById('profile').classList.add('active');
    document.getElementById('activities').classList.remove('active');
}

// Show Activities
function showActivities() {
    document.getElementById('welcome').classList.remove('active');
    document.getElementById('profile').classList.remove('active');
    document.getElementById('activities').classList.add('active');
    filterActivities();
}

// Filter and display activities
function filterActivities() {
    const selectedSubject = document.getElementById('subjectSelect').value;
    const activitiesList = document.getElementById('activitiesList');
    
    let filteredActivities = monthlyActivities;
    
    if (selectedSubject !== 'all') {
        filteredActivities = monthlyActivities.filter(a => a.subject === selectedSubject);
    }

    if (filteredActivities.length === 0) {
        activitiesList.innerHTML = '<div class="no-activities">No activities found for selected subject.</div>';
        return;
    }

    let html = '';
    filteredActivities.forEach(activity => {
        html += `
            <div class="activity-card">
                <div class="activity-id">Activity #${activity.id}</div>
                <div class="activity-text">${activity.activity}</div>
                <div class="activity-subject">Subject: ${activity.subject}</div>
            </div>
        `;
    });

    activitiesList.innerHTML = html;
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('header').classList.remove('show');
    document.getElementById('welcome').classList.remove('active');
    document.getElementById('profile').classList.remove('active');
    document.getElementById('activities').classList.remove('active');
    document.getElementById('auth').style.display = 'block';
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    showLoginForm();
}

// Check if user is already logged in
window.onload = function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        showDashboard();
    }
};