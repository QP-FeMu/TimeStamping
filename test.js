// test.js via Terminaleingabe 'node test.js' ausführen
var XMLHttpRequest = require("xhr2");



// TEST: HTTP Request
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://retoolapi.dev/oyKWFt/data");
xhr.send();
xhr.responseType = "json";

xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        const res = xhr.response
        console.log(res);

        const employee = "remo.koetter@q-perior.com"
        let approver = "";
        let object = {};
        for (var i=0; i<res.length; i++) {
            object = res[i];
            if (object.employee_mail == employee) {
                approver = object.approver_mail;
            }
        }
        console.log(approver);

    } else {
        console.log(`Error: ${xhr.status}`);
    }
};