
const amd = document.querySelector("#amd");
const usd = document.querySelector("#usd");
const button = document.querySelector("button");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const cUSD = document.querySelector(".USD");
const cAMD = document.querySelector(".AMD");

amd.addEventListener("input", () => {
    const request = new XMLHttpRequest();

    setTimeout(() => {
        if (typeof (amd.value) !== "number" && isNaN(amd.value)) {
            usd.value = "";
            amd.value = "";
        }
    }, 10);

    request.open("GET", "js/exchange.json");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send();

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.response);
            usd.value = (parseFloat(amd.value) / parseFloat(data.current.usd)).toFixed(2);
        } else {
            usd.value = "Something went wrong!";
        }
    });
});


button.addEventListener("click", () => {
    box1.classList.toggle("hide");
    box2.classList.toggle("show");

    cUSD.addEventListener("input", () => {
        const request = new XMLHttpRequest();

        setTimeout(() => {
            if (typeof (cUSD.value) !== "number" && isNaN(cUSD.value)) {
                cUSD.value = "";
                cAMD.value = "";
            }
        }, 10);

        request.open("GET", "js/exchange.json");
        request.setRequestHeader("Content-type", "application/json; charset=utf-8");
        request.send();
        

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                const date = JSON.parse(request.response);
                cAMD.value = (parseFloat(cUSD.value) * parseFloat(date.current.amd)).toFixed(2);
            } else {
                cAMD.value = "Something went wrong!";
            }
        })
    });
});

