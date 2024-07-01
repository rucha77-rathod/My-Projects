const base_url = "https://api.currencyapi.com/v3/latest?base_currency=";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount =  document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1 ){
        amtVal = 1;
        amount.value = "1";
    }
   // console.log(toCurr.value);
    const URL = `${base_url}${fromCurr.value}&currencies=${toCurr.value}`;
    let response = await fetch(URL, {
        headers: {
            "apikey":"cur_live_OAT9crKFlAGYJ130EhDLRdqf2fC8wK8KIYyX0R4k",
        }
    });
    let jsonData = await response.json();
    let targetCurr = toCurr.value;
    let rate = jsonData.data[targetCurr].value;
    console.log(rate);
    let finalAmt = amtVal * rate;
    console.log(finalAmt);
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
})
