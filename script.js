document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Authentication Page Logic (for index.html) ---
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });

        const signupButton = document.getElementById('signup-btn-auth');
        signupButton.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }

    // --- 2. General App Logic ---
    const userNameSpan = document.getElementById('user-name');
    if (userNameSpan) {
        userNameSpan.textContent = "Disha";
    }

    const courseButtons = document.querySelectorAll('.cta-button-small');
    courseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent.trim() !== 'View Certificate') {
                 alert('Continuing to the course page!');
            }
        });
    });

    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your profile has been updated successfully!');
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                window.location.replace('index.html');
            }
        });
    }

    // --- 3. Chatbot Logic (for chatbot.html) ---
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    if (chatWindow && userInput && sendBtn) {
        addMessageToChat('bot', "Hello! I'm the SkillBuddy Assistant. How can I help you today?");
        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') sendMessage();
        });
    }

    function sendMessage() {
        const userText = userInput.value.trim();
        if (userText === '') return;
        addMessageToChat('user', userText);
        userInput.value = '';
        setTimeout(() => {
            const botText = getBotResponse(userText);
            addMessageToChat('bot', botText);
        }, 500);
    }

    function addMessageToChat(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function getBotResponse(userText) {
        const text = userText.toLowerCase();
        if (text.includes('hello') || text.includes('hi')) return "Hello there! Ask me about your courses or profile.";
        if (text.includes('course')) return "You can see your enrolled classes in the 'My Courses' section.";
        if (text.includes('profile')) return "You can view and edit your account information on the 'My Profile' page.";
        if (text.includes('time')) return `The current time is ${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
        if (text.includes('date')) return `Today's date is ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
        return "I'm sorry, I don't understand that. You can ask me about courses, your profile, or for help.";
    }

    // --- 4. Schedule Page Logic (for schedule.html) ---
    const scheduleGrid = document.querySelector('.schedule-grid');
    if (scheduleGrid) {
        const weekDisplay = document.getElementById('current-week-display');
        const today = new Date();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Sample events data
        const events = {
            'Mon': [{ time: '10:00 AM', desc: 'Advanced JavaScript' }, { time: '2:00 PM', desc: 'React Hooks deep dive' }],
            'Tue': [],
            'Wed': [{ time: '11:00 AM', desc: 'CSS Animations', type: 'review' }],
            'Thu': [{ time: '9:00 AM', desc: 'Project Stand-up' }, { time: '3:00 PM', desc: 'Advanced JavaScript' }],
            'Fri': [{ time: '1:00 PM', desc: 'Code Review', type: 'review' }],
            'Sat': [],
            'Sun': [],
        };

        function renderWeek(date) {
            scheduleGrid.innerHTML = ''; // Clear existing grid
            const currentDay = date.getDay(); // 0 = Sunday, 1 = Monday...
            
            // This calculates the start of the week (Sunday)
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - currentDay);
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            weekDisplay.textContent = `${weekStart.toLocaleDateString('en-IN', {day:'numeric', month:'short'})} - ${weekEnd.toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}`;

            for (let i = 0; i < 7; i++) {
                const dayDate = new Date(weekStart);
                dayDate.setDate(weekStart.getDate() + i);
                
                const dayColumn = document.createElement('div');
                dayColumn.className = 'day-column';

                if (dayDate.toDateString() === today.toDateString()) {
                    dayColumn.classList.add('today');
                }

                const dayHeader = document.createElement('div');
                dayHeader.className = 'day-header';
                dayHeader.innerHTML = `<h5>${daysOfWeek[i]}</h5><p>${dayDate.getDate()}</p>`;
                
                const eventsContainer = document.createElement('div');
                eventsContainer.className = 'schedule-events';

                // Add events for the day
                const dayKey = daysOfWeek[i];
                const dayEvents = events[dayKey] || [];
                dayEvents.forEach(event => {
                    const eventEl = document.createElement('div');
                    eventEl.className = `schedule-event ${event.type || ''}`;
                    eventEl.innerHTML = `<div class="event-time">${event.time}</div><div class="event-desc">${event.desc}</div>`;
                    eventsContainer.appendChild(eventEl);
                });
                
                dayColumn.appendChild(dayHeader);
                dayColumn.appendChild(eventsContainer);
                scheduleGrid.appendChild(dayColumn);
            }
        }

        renderWeek(today);

        // NOTE: The Prev/Next buttons are for demonstration.
        document.getElementById('prev-week').addEventListener('click', () => alert('This is a demo. Navigation is not implemented.'));
        document.getElementById('next-week').addEventListener('click', () => alert('This is a demo. Navigation is not implemented.'));
    }
    
    // --- 5. Settings Page Logic (for settings.html) ---
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you would save these preferences.
            console.log('Saving user preferences...');
            alert('Your preferences have been saved!');
        });

        // Add confirmation for dangerous actions
        const deleteButton = document.getElementById('delete-account-btn');
        deleteButton.addEventListener('click', () => {
            if(confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
                alert('Account deleted. Logging you out.');
                window.location.replace('index.html');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Authentication Page Logic (for index.html) ---
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Login attempt...');
            window.location.href = 'dashboard.html';
        });
    }
    
    // --- 2. Sign Up Page Logic (for signup.html) ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return; 
            }
            
            console.log('Creating new account...');
            alert('Account created successfully! One last step...');
            
            // MODIFIED: Redirect to domain.html instead of dashboard
            window.location.href = 'domain.html'; 
        });
    }

    // --- 3. Domain Page Logic (for domain.html) ---
    const domainButtons = document.querySelectorAll('.domain-btn');
    if (domainButtons.length > 0) {
        domainButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real app, you'd save this choice:
                console.log(`User selected domain: ${button.textContent}`);
                
                // Redirect to the dashboard
                alert('Great! Your profile is set up. Welcome to SkillBuddy!');
                window.location.href = 'dashboard.html';
            });
        });
    }


    // --- 4. General App Logic ---
    const userNameSpan = document.getElementById('user-name');
    if (userNameSpan) {
        userNameSpan.textContent = "Disha";
    }

    const courseButtons = document.querySelectorAll('.cta-button-small');
    courseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent.trim() !== 'View Certificate') {
                 alert('Continuing to the course page!');
            }
        });
    });

    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your profile has been updated successfully!');
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                window.location.replace('index.html');
            }
        });
    }

    // --- 5. Chatbot Logic (for chatbot.html) ---
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    if (chatWindow && userInput && sendBtn) {
        addMessageToChat('bot', "Hello! I'm the SkillBuddy Assistant. How can I help you today?");
        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') sendMessage();
        });
    }

    function sendMessage() {
        const userText = userInput.value.trim();
        if (userText === '') return;
        addMessageToChat('user', userText);
        userInput.value = '';
        setTimeout(() => {
            const botText = getBotResponse(userText);
            addMessageToChat('bot', botText);
        }, 500);
    }

    function addMessageToChat(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function getBotResponse(userText) {
        const text = userText.toLowerCase();
        if (text.includes('hello') || text.includes('hi')) return "Hello there! Ask me about your courses or profile.";
        if (text.includes('course')) return "You can see your enrolled classes in the 'My Courses' section.";
        if (text.includes('profile')) return "You can view and edit your account information on the 'My Profile' page.";
        if (text.includes('time')) return `The current time is ${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
        if (text.includes('date')) return `Today's date is ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
        return "I'm sorry, I don't understand that. You can ask me about courses, your profile, or for help.";
    }

    // --- 6. Schedule Page Logic (for schedule.html) ---
    const scheduleGrid = document.querySelector('.schedule-grid');
    if (scheduleGrid) {
        const weekDisplay = document.getElementById('current-week-display');
        const today = new Date();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const events = {
            'Mon': [{ time: '10:00 AM', desc: 'Advanced JavaScript' }, { time: '2:00 PM', desc: 'React Hooks deep dive' }],
            'Tue': [],
            'Wed': [{ time: '11:00 AM', desc: 'CSS Animations', type: 'review' }],
            'Thu': [{ time: '9:00 AM', desc: 'Project Stand-up' }, { time: '3:00 PM', desc: 'Advanced JavaScript' }],
            'Fri': [{ time: '1:00 PM', desc: 'Code Review', type: 'review' }],
            'Sat': [],
            'Sun': [],
        };

        function renderWeek(date) {
            scheduleGrid.innerHTML = '';
            const currentDay = date.getDay();
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - currentDay);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            weekDisplay.textContent = `${weekStart.toLocaleDateString('en-IN', {day:'numeric', month:'short'})} - ${weekEnd.toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}`;

            for (let i = 0; i < 7; i++) {
                const dayDate = new Date(weekStart);
                dayDate.setDate(weekStart.getDate() + i);
                const dayColumn = document.createElement('div');
                dayColumn.className = 'day-column';
                if (dayDate.toDateString() === today.toDateString()) {
                    dayColumn.classList.add('today');
                }
                const dayHeader = document.createElement('div');
                dayHeader.className = 'day-header';
                dayHeader.innerHTML = `<h5>${daysOfWeek[i]}</h5><p>${dayDate.getDate()}</p>`;
                const eventsContainer = document.createElement('div');
                eventsContainer.className = 'schedule-events';
                const dayKey = daysOfWeek[i];
                const dayEvents = events[dayKey] || [];
                dayEvents.forEach(event => {
                    const eventEl = document.createElement('div');
                    eventEl.className = `schedule-event ${event.type || ''}`;
                    eventEl.innerHTML = `<div class="event-time">${event.time}</div><div class="event-desc">${event.desc}</div>`;
                    eventsContainer.appendChild(eventEl);
                });
                dayColumn.appendChild(dayHeader);
                dayColumn.appendChild(eventsContainer);
                scheduleGrid.appendChild(dayColumn);
            }
        }
        renderWeek(today);
        document.getElementById('prev-week').addEventListener('click', () => alert('This is a demo. Navigation is not implemented.'));
        document.getElementById('next-week').addEventListener('click', () => alert('This is a demo. Navigation is not implemented.'));
    }
    
    // --- 7. Settings Page Logic (for settings.html) ---
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Saving user preferences...');
            alert('Your preferences have been saved!');
        });
        const deleteButton = document.getElementById('delete-account-btn');
        deleteButton.addEventListener('click', () => {
            if(confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
                alert('Account deleted. Logging you out.');
                window.location.replace('index.html');
            }
        });
    }
});