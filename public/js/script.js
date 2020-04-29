window.onload = () => {
    let form = document.querySelector("form.short-form");
    form.onsubmit = e => {
        e.preventDefault();
        if (form.elements[0].value){
            fetch("/short",{
                method:'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({url:form.elements[0].value})
            }).then(res=>{
                if (!res.ok) { throw res }
                return res.json();
            }).then(data=>{
                let urlContainer = document.querySelector("table.links");
                let row = document.createElement("tr");
                let url = document.createElement("td");  
                let date = document.createElement("td");
                url.textContent = data.payload.url;             
                date.textContent = data.payload.created_at; 
                row.append(url);
                row.append(date);
                urlContainer.append(row);
            }).catch(err=>{
                err.text().then(text=>{
                    let urlContainer = document.querySelector("div.err");               
                    urlContainer.innerHTML = text;
                });
            })
        }
    }
}