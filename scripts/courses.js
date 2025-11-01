// Array of course objects
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Example: Mark completed courses
courses[1].completed = true; // WDD 130
courses[4].completed = true; // WDD 131

const courseList = document.getElementById('course-list');
const creditsCount = document.getElementById('credits-count');
const allBtn = document.getElementById('all-btn');
const cseBtn = document.getElementById('cse-btn');
const wddBtn = document.getElementById('wdd-btn');

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
        courseList.appendChild(card);
});
  // Credits total for shown courses
    const credits = filtered.reduce((sum, c) => sum + c.credits, 0);
    creditsCount.textContent = credits;
}

// Set active state for filter buttons
function setActive(btn) {
    allBtn.classList.remove('active');
    cseBtn.classList.remove('active');
    wddBtn.classList.remove('active');
    btn.classList.add('active');
}

// Initial render
renderCourses("ALL");
setActive(allBtn);

// Filter events
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
