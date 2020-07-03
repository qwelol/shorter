window.onload = () => {
  let forms = document.querySelectorAll("form.short-form");
  for (let i = 0; i < forms.length; i++) {
    forms[i].onsubmit = (e) => {
      e.preventDefault();
      let service = e.target.id;
      let params = [];
      let formFilled = true;
      let fields = e.target.querySelectorAll("input[type=text]");
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].value) {
          params.push(fields[i].value);
        } else {
          formFilled = false;
        }
      }
      let method = e.target.dataset.filled === "true"? formFilled? "PUT" : "DELETE" : "POST";
      console.log("method",method);
      if (method === "DELETE") { formFilled=!formFilled }
      if (formFilled && service) {
        let path = method === "POST"? "/settings":"/settings/"+service;
        let data = method === "PUT"? {params} : "POST"?{ service, params } : null;
        fetch(path, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then((data) => {
            e.target.dataset.filled = method==="DELETE"? false : true;
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
  }
};
