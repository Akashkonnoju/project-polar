// ==========================================
// POLARCONNECT - LOGIN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.querySelector(".login-form");

    if (!loginForm) {
        console.error("Login form not found.");
        return;
    }


    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const emailInput =
                document.getElementById("email");

            const passwordInput =
                document.getElementById("password");

            const loginButton =
                loginForm.querySelector(
                    ".login-button"
                );


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            // ======================================
            // VALIDATION
            // ======================================
if (!email || !password) {

    alert(
        "Please enter your email and password."
    );

    return;
}


if (!emailInput.checkValidity()) {

    alert(
        "Please enter a valid email address."
    );

    emailInput.focus();

    return;
}


            // ======================================
            // LOADING STATE
            // ======================================

            loginButton.disabled = true;


            const buttonText =
                loginButton.querySelector(
                    "span:first-child"
                );


            if (buttonText) {
                buttonText.textContent =
                    "Signing in...";
            }


            try {

                // Backend expects username.
                // Email is sent as username.
console.log("Sending login:", {
    username: email,
    password: password
});
                const result =
                    await loginUser({

                        username: email,
                        password: password

                    });


                console.log(
                    "Login API response:",
                    result
                );


                // ==================================
                // SUCCESS
                // ==================================

                if (
                    result &&
                    (
                        result.message ===
                        "Login successful"
                    )
                ) {

                    if (result.user) {

                        localStorage.setItem(
                            "polarUser",
                            JSON.stringify(
                                result.user
                            )
                        );

                    }


                    const username =
                        result.user &&
                        result.user.username
                            ? result.user.username
                            : email;


                    alert(
                        `Welcome back, ${username}!`
                    );


                    window.location.href =
                        "../index.html";


                    return;
                }


                // ==================================
                // FAILED LOGIN
                // ==================================

                alert(
                    result &&
                    result.message
                        ? result.message
                        : "Invalid username or password."
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


                if (buttonText) {

                    buttonText.textContent =
                        "Sign In";

                }

            }

        }
    );

});
