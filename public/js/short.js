const USER_API = "91665adb3dd17bb4171ca8dc95f499d511849da9";

window.onload = () => {
  let form = document.querySelector("form.short-form");
  let useCatcut = form.elements.namedItem("useCatcut");
  useCatcut.onchange = ()=>{
    let catCutInput = form.querySelector("#catcut");
    catCutInput.disabled = useCatcut.checked;
    catCutInput.checked = false;
  }
  form.onsubmit = (e) => {
    e.preventDefault();
    if (form.elements[0].value) {
      let paramsInputs = form.querySelectorAll(".params input");
      let url = form.elements[0].value;
      let shortList = [];
      if (useCatcut.checked) {
        for (let i = 0; i < paramsInputs.length; i++) {
          if (paramsInputs[i].checked) {
            shortList.push(paramsInputs[i].value);
            shortList.push("catcutShort");
          }
        }
      } else {
        for (let i = 0; i < paramsInputs.length; i++) {
          if (paramsInputs[i].checked) {
            shortList.push(paramsInputs[i].value);
          }
        }
      }
      if (shortList.length !== 0) {
        fetch("/short", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            shortList,
            api: USER_API,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then((data) => {
            let urlContainer = document.querySelector("table.links tbody");
            let row = document.createElement("tr");
            let shortUrl = document.createElement("td");
            let longUrl = document.createElement("td");
            let date = document.createElement("td");
            let td = document.createElement("td");
            let delBtn = document.createElement("button");
            shortUrl.textContent = data.payload.short_url;
            longUrl.textContent = data.payload.long_url;
            date.textContent = new Date(data.payload.created_at).toGMTString();
            delBtn.textContent = "X";
            delBtn.dataset.id = data.payload._id;
            delBtn.onclick = deleteUrl;
            row.append(shortUrl);
            row.append(longUrl);
            row.append(date);
            td.append(delBtn);
            row.append(td);
            urlContainer.prepend(row);
            form.elements[0].value = "";
          })
          .catch((err) => {
            if (err.text) {
              err.text().then((text) => {
                let urlContainer = document.querySelector("div.err");
                urlContainer.innerHTML = text;
              });
            }
            console.log(err);
          });
      }
    }
  };
  let buttons = document.querySelectorAll("button.delete");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = deleteUrl;
  }
  function deleteUrl(e) {
    if (USER_API && e.target.dataset.id) {
      fetch("/short/" + e.target.dataset.id, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.payload) {
            e.target.parentElement.parentElement.remove();
          }
          console.log("res:", data);
        });
    } else {
      console.log("err");
    }
  }
};
