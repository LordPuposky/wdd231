// Array of course objects
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming. It covers variables, decisions, calculations, loops, arrays, and input/output for problem solving.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'An introduction to the World Wide Web and careers in website design/development. Students participate in basic web design and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to research and call functions, write/debug/test their own functions, and handle errors. Projects cover various disciplines including business, science, and humanities.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'An introduction to classes and objects, conceptual encapsulation, inheritance, and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Builds on web fundamentals and programming experience. Learn to create dynamic websites using JavaScript for events, updating content, and responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// DOM references
const courseList = document.getElementById('course-list');
const creditsCount = document.getElementById('credits-count');
const allBtn = document.getElementById('all-btn');
const cseBtn = document.getElementById('cse-btn');
const wddBtn = document.getElementById('wdd-btn');
const courseDetails = document.getElementById('course-details');

// Render courses (filter: "ALL", "CSE", "WDD")
function renderCourses(filter) {
    let filtered = courses;
    if (filter === "CSE") filtered = courses.filter(c => c.subject === "CSE");
    else if (filter === "WDD") filtered = courses.filter(c => c.subject === "WDD");

    courseList.innerHTML = "";

    filtered.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card' + (course.completed ? ' completed' : '');
        card.innerHTML = `
            <h3>${course.subject} ${course.number} - ${course.title}</h3>
            <div class="course-meta">Credits: ${course.credits} | Technology: ${course.technology.join(', ')}</div>
            <div class="course-desc">${course.description}</div>
            ${
                course.completed
                ? `<span style="color:#3fb950; font-weight:bold;">✓ Completed</span>`
                : `<span style="color:#e0a400; font-weight:bold;">⏳ In Progress</span>`
            }
        `;
        // Add click event for modal
        card.addEventListener('click', () => displayCourseDetails(course));
        courseList.appendChild(card);
    });

    // Credits total for shown courses
    const credits = filtered.reduce((sum, c) => sum + c.credits, 0);
    creditsCount.textContent = credits;
}

// Set active class on filter buttons
function setActive(btn) {
    allBtn.classList.remove('active');
    cseBtn.classList.remove('active');
    wddBtn.classList.remove('active');
    btn.classList.add('active');
}

// Modal: show course details
function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
        <p><strong>Status</strong>: ${course.completed ? 'Completed' : 'In Progress'}</p>
    `;
    courseDetails.showModal();

    document.getElementById('closeModal').onclick = () => courseDetails.close();

    // Optional: close when clicking outside the modal
    courseDetails.addEventListener('click', (e) => {
        if (e.target === courseDetails) courseDetails.close();
    });
}

// Initial render and filter events
renderCourses("ALL");
setActive(allBtn);

allBtn.addEventListener('click', () => {
    renderCourses("ALL");
    setActive(allBtn);
});
cseBtn.addEventListener('click', () => {
    renderCourses("CSE");
    setActive(cseBtn);
});
wddBtn.addEventListener('click', () => {
    renderCourses("WDD");
    setActive(wddBtn);
});
