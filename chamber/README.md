Bogotá Chamber of Commerce Directory — WDD231
Description
This project implements the Bogotá Chamber of Commerce website for the WDD231 course, including:

Main page (index.html)

Discover page (discover.html)

Business directory with grid and list views (directory.html)

Additional pages: Join, Events, Podcast, About Us

Folder Structure

/css             → Stylesheets (chamber.css, siteplan.css)
/images          → Logos, banners, optimized photos (WebP)
/js              → Custom scripts (spotlights.js, weather.js, etc.)
/data            → members.json with business data
index.html
discover.html
directory.html
join.html
events.html
podcast.html
about.html
README.md

Quality and Validation Criteria
HTML validated with validator.w3.org for all files. No errors and only minor warnings.

AA contrast validated on all pages (Chrome DevTools CSS Overview).

Lighthouse scores:

Desktop: 99-100

Mobile: 95+

Responsive design: No horizontal scroll, correct navigation on all devices.

Images compressed and optimized in WebP format.

Footer with name, course, and dynamic last modification date.

Directory functionality:

Async data loading (fetch & async/await)

Grid and list view, with large logos in grid cards.

How to Run

Clone or download the repository.

Open index.html in your browser.

Navigate the site using the main menu.

Try the directory, switch between grid/list, and explore member data.

Validation Evidence

Screenshots included of:

HTML validations.

Lighthouse reports (desktop/mobile).

CSS Overview (AA contrast).

Notes

The project is designed to run without frameworks: fast loading, high accessibility.

Keep the members.json file in /data for directory data reference.