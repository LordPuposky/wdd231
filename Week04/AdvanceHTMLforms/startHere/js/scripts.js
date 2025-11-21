//const getString = window.location.search;
//console.log(getString);

const myInfo = new URLSearchParams(window.location.search);
//console.log(myInfo);


document.querySelector("#results").innerHTML = `
<p>Appoinment for: ${myInfo.get("first")} ${(myInfo.get("last"))}</p>
<p>Proxy: ${myInfo.get("ordinance")} on ${myInfo.get("date")} in the ${myInfo.get("location")} Temple</p>
<p>Your Phone: ${myInfo.get("phone")}</p>
<p>Your Email: ${myInfo.get("email")}</p>`;