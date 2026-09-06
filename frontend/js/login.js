// ==========================================
// POLAR SCIENCE PORTAL - LOGIN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector(".login-form");

    if (!loginForm) {
        console.error("Login form not found.");
        return;
    }


    // ==========================================
    // LOGIN
    // ==========================================

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const loginButton = loginForm.querySelector(".login-button");

        const email = emailInput.value.trim();
        const password = passwordInput.value;


        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }


        // Disable button while logging in
        loginButton.disabled = true;

        loginButton.querySelector("span").textContent =
            "Signing in...";


        try {

            // Django currently expects username
            // We are sending the email value as username.
            const result = await loginUser({
                username: email,
                password: password
            });


            console.log("Login API response:", result);


            // ==========================================
            // SUCCESS
            // ==========================================

            if (result.message === "Login successful") {

                // Store logged-in user information
                localStorage.setItem(
                    "polarUser",
                    JSON.stringify(result.user)
                );


                alert(
                    `Welcome back, ${result.user.username}!`
                );


                // Return to Home page
                window.location.href = "../index.html";

                return;
            }


            // ==========================================
            // LOGIN FAILED
            // ==========================================

            alert(
                result.message ||
                "Invalid username or password."
            );


        } catch (error) {

            console.error(
                "Login API error:",
                error
            );

            alert(
                "Unable to connect to the login service."
            );

        } finally {

            loginButton.disabled = false;

            loginButton.querySelector("span").textContent =
                "Sign In";
        }

    });

});