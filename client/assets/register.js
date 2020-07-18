$(document).ready(function () {
    console.log('Hello world');


    $("#registerForm").on("submit", function (e) {
        e.preventDefault()
        console.log("hello")

        const newUser = {
            first_name: $("#first_name").val().trim(),
            last_name: $("#last_name").val().trim(),
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        }

        $.ajax({
            type: "POST",
            url: "/auth/register",
            data: newUser
        }).then(() => window.location.replace("/members"))
    })
})