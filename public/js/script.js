window.onload = () => {
    console.log("111");
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
                return res.json();
            }).then(data=>{
                let urlContainer = document.querySelector("div.url");               
                urlContainer.innerHTML = data;
            });
        }
    }
}