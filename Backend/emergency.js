// Emergency Logic (Fake Backend)
function sendEmergencyAlert() {

    // fake emergency object
    const alertData = {
        time: new Date().toISOString(),
        status: "sent",
        message: "Emergency Alert Triggered"
    };

    // save alert to localStorage
    localStorage.setItem("emergencyAlert", JSON.stringify(alertData));

    // redirect to emergency page
window.location.href = "../Frontend/emergency.html";

}
