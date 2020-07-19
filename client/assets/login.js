$(document).ready(function () {

  const form = $("#loginForm");
  const email = $("#email");
  const pw = $("#password");

  form.on("submit", function (e) {
    e.preventDefault();

    console.log("hiiii");
    loginUser(email.val().trim(), pw.val().trim()).then(() =>
      window.location.replace("/members")
    );
  });
});

const loginUser = (email, password) => {
  const userData = {
    email,
    password
  };

  console.log(userData)

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/auth/login",
      data: userData,
    }).then((res) => resolve(res));
  });
};