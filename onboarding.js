document.getElementById("onboarding-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const gender = document.getElementById("gender").value;
    const cohort = document.getElementById("cohort").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem("userData", JSON.stringify({ firstName, gender, cohort }));
    window.location.href = "weekly-schedule.html";
});
