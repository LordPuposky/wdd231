document.getElementById("lastmod").textContent = document.lastModified;

function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || "";
}

document.getElementById("show-fname").textContent = getParam("fname");
document.getElementById("show-lname").textContent = getParam("lname");
document.getElementById("show-email").textContent = getParam("email");
document.getElementById("show-phone").textContent = getParam("phone");
document.getElementById("show-orgname").textContent = getParam("orgname");
document.getElementById("show-timestamp").textContent = getParam("timestamp");
