window.onload = () => {
  let form = document.querySelector("form.short-form");
  let useCatcut = form.elements.namedItem("useCatcut");
  if (useCatcut) {
    useCatcut.onchange = () => {
      let catCutInput = form.querySelector("[value=catcutShort]");
      catCutInput.disabled = useCatcut.checked;
      catCutInput.checked = false;
    };
  }
  form.onsubmit = (e) => {
    e.preventDefault();
    let spinner = document.querySelector(".short-form .spinner");
    spinner.classList.add("active");
    if (form.elements[0].value) {
      let paramsInputs = form.querySelectorAll(".params input");
      let longUrl = form.elements[0].value;
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
            longUrl,
            shortList,
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
            shortUrl.classList.add("short-link");
            shortUrl.onclick = copyUrl;
            longUrl.textContent = data.payload.long_url;
            longUrl.classList.add("long-link");
            date.textContent = new Date(data.payload.created_at).toGMTString();
            date.classList.add("date-created");
            delBtn.textContent = "X";
            delBtn.classList.add("delete");
            delBtn.dataset.id = data.payload._id;
            delBtn.onclick = deleteUrl;
            row.append(shortUrl);
            row.append(longUrl);
            row.append(date);
            td.append(delBtn);
            row.append(td);
            urlContainer.prepend(row);
            form.reset();
            spinner.classList.remove("active");
          })
          .catch((err) => {
            if (err.text) {
              err.text().then((text) => {
                let urlContainer = document.querySelector("div.err");
                urlContainer.innerHTML = text;
              });
            }
            console.log(err);
            form.reset();
            spinner.classList.remove("active");
          });
      }
    }
  };
  let buttons = document.querySelectorAll(".links button.delete");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = deleteUrl;
  }
  function deleteUrl(e) {
    if (e.target.dataset.id) {
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
  let links = document.querySelectorAll(".links .short-link");
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = copyUrl;
    function copyUrl (e) {
      navigator.clipboard.writeText(e.target.textContent).then(() => {
        e.target.classList.toggle("highlited");
        setTimeout(()=>{e.target.classList.toggle("highlited");},500);
      });
    };
  }
};
