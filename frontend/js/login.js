// ==========================================
// POLARCONNECT - LOGIN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.querySelector("#login-form");


    if (!loginForm) {

        console.error(
            "Login form not found."
        );

        return;
    }



    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();



            // ======================================
            // GET INPUTS
            // ======================================

            const usernameInput =
                document.getElementById("email");

            const passwordInput =
                document.getElementById("password");

            const rememberInput =
                document.getElementById("remember");


            const loginButton =
                document.getElementById(
                    "login-button"
                );



            // ======================================
            // VALUES
            // ======================================

            const username =
                usernameInput.value.trim();

            const password =
                passwordInput.value;



            // ======================================
            // VALIDATION
            // ======================================

            if (!username) {

                alert(
                    "Please enter your username."
                );

                usernameInput.focus();

                return;
            }


            if (!password) {

                alert(
                    "Please enter your password."
                );

                passwordInput.focus();

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


                // ==================================
                // CHECK API FUNCTION
                // ==================================

                if (
                    typeof loginUser !==
                    "function"
                ) {

                    throw new Error(
                        "loginUser() function not found. Check api.js."
                    );

                }



                // ==================================
                // SEND LOGIN REQUEST
                // ==================================

                console.log(
                    "Sending login request:",
                    {
                        username: username
                    }
                );


                const result =
                    await loginUser({

                        username: username,

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


                    // --------------------------------
                    // SAVE USER
                    // --------------------------------

                    if (result.user) {

                        localStorage.setItem(

                            "polarUser",

                            JSON.stringify(
                                result.user
                            )

                        );

                    }



                    // --------------------------------
                    // REMEMBER LOGIN
                    // --------------------------------

                    if (
                        rememberInput &&
                        rememberInput.checked
                    ) {

                        localStorage.setItem(
                            "polarRememberMe",
                            "true"
                        );

                    }

                    else {

                        localStorage.removeItem(
                            "polarRememberMe"
                        );

                    }



                    // --------------------------------
                    // USERNAME FOR MESSAGE
                    // --------------------------------

                    const loggedUsername =
                        result.user &&
                        result.user.username

                            ? result.user.username

                            : username;



                    // --------------------------------
                    // SUCCESS MESSAGE
                    // --------------------------------

                    alert(
                        `Welcome back, ${loggedUsername}!`
                    );



                    // --------------------------------
                    // GO HOME
                    // --------------------------------

                    window.location.href =
                        "../index.html";


                    return;

                }



                // ==================================
                // LOGIN FAILED
                // ==================================

                alert(

                    result &&
                    result.message

                        ? result.message

                        : "Invalid username or password."

                );


            }


            catch (error) {


                console.error(
                    "Login API error:",
                    error
                );


                alert(
                    "Unable to connect to the login service. Please make sure the backend server is running."
                );

            }


            finally {


                // ==================================
                // RESTORE BUTTON
                // ==================================

                loginButton.disabled = false;


                if (buttonText) {

                    buttonText.textContent =
                        "Sign In";

                }

            }

        }

    );

});