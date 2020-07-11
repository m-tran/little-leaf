$(document).ready(function () {
    const form = $("#loginForm");
    const email = $("#email");
    const pw = $("#password");
  
    form.on("submit", function (e) {
      e.preventDefault();
  
      loginUser(email.val(), pw.val()).then(() =>
        window.location.replace("/members")
      );
    });
  });
  
  const loginUser = (email, password) => {
    const userData = { email, password };
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/api/login",
        data: userData,
      }).then((res) => resolve(res));
    });
  };
  