**Bogotá Chamber of Commerce Directory**

Project for WDD231

This project implements a responsive and accessible website simulating the Bogotá Chamber of Commerce. It includes a main landing page, community information pages, and an interactive business directory with grid and list display options.

✨ **Key Features**

* Fully responsive layout without frameworks (mobile, tablet, desktop)

* Optimized WebP images for fast loading

* Dynamic Business Directory:

* Member data loaded from members.json using fetch + async/await

* Toggle between Grid and List view

* High–resolution logos in Grid mode

* Accessibility and code quality verified:

* No HTML errors (validator.w3.org)

* AA color contrast verified (Chrome DevTools → CSS Overview)

* Lighthouse Scores:

    Desktop: 99–100

    Mobile: 95+

* Footer includes student name, course reference, and dynamic last modified date

📂 **Project Structure**
/
├── css/
│   ├── chamber.css
│   └── siteplan.css
├── images/
│   └── (Optimized logos and banners in WebP)
├── js/
│   ├── spotlights.js
│   ├── weather.js
├── data/
│   └── members.json
├── index.html
├── discover.html
├── directory.html
├── join.html
├── events.html
├── podcast.html
├── about.html
└── README.md

🧭 **Pages Overview**

Page	Purpose

    index.html	Main homepage
    discover.html	Community and visitor information
    directory.html	Business directory with dynamic views
    join.html	Membership application form
    events.html	Upcoming events
    podcast.html	Recommendations and listening resources
    about.html	Organization background

🚀 **How to Run**

1. Clone or download this repository.

2. Open index.html in any browser.

3. Use the navigation menu to explore.

4. Visit directory.html and try switching between Grid and List views.

✅ **Validation Evidence**

📝 **Notes**

No frameworks or external libraries required.

Keep the members.json file inside /data to ensure directory data loads correctly.