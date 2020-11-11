window.onload = () => {
  let changeForm = document.querySelector(".account .user-change-form");
  changeForm.onsubmit = (e) => {
    e.preventDefault();
    let password = document.querySelector("#password");
    let rePassword = document.querySelector("#re-password");
    let role = document.querySelector(".user-change-form select");
    let errorMessage = document.querySelector(".account .error-message");
    let goodMessage = document.querySelector(".account .good-message");
    let api = changeForm.dataset.api;
    goodMessage.innerHTML = "";
    if (password.value === rePassword.value) {
      errorMessage.innerHTML = "";
      fetch("/users/"+api, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pass: password.value,
          role: role.value,
        }),
      }).then((res) => {
        if (res.ok) {
          goodMessage.innerHTML = "Изменения сохранены";
        } else {
          errorMessage.innerHTML = "Ошибка сервера";
        }
      });
    } else {
      errorMessage.innerHTML = "Пароли не совпадают";
    }
  };
};
