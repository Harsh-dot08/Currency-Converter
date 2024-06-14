const url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"
const drop=document.querySelectorAll(".dropdown select")
for(let select of drop){
    for(currCode in countryList){
        let newopt=document.createElement("option")
        newopt.innerText=currCode
        newopt.value=currCode
        select.append(newopt)
        if(select.name==="from"&&currCode==="USD"){
            newopt.selected="selected"
        }
        if(select.name==="to"&&currCode==="INR"){
            newopt.selected="selected"
        }
    }
    select.addEventListener("change",(evt)=>{
        update(evt.target)        
    })
}
const update=(elem)=>{
    let currCode=elem.value
    let coun=countryList[currCode];
    let newsrc=`https://flagsapi.com/${coun}/flat/64.png`
    let img=elem.parentElement.querySelector("img")
    img.src=newsrc;
}
let imput=document.querySelector(".amount input")
let btn = document.querySelector("button");
let amt;
let from=document.querySelector(".from select")
let to=document.querySelector(".to select")
let h4=document.querySelectorAll("h4")
h4[0].classList.add("hide")
h4[1].classList.add("hide")
btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    if(imput.value==""||imput.value<0){
        imput.value=1
        amt=imput.value;
    }
    else{
        amt=imput.value;
    }
    const url1=`${url}${from.value.toLowerCase()}.json`
    let response=await fetch(url1)
    let data=await response.json();
    let rate=data[from.value.toLowerCase()][to.value.toLowerCase()]
    h4[0].classList.remove("hide")
    h4[1].classList.remove("hide")
    h4[0].innerText=`${amt} ${from.value}= ${amt*rate} ${to.value}`
    h4[1].innerText=`Last Update on-${data.date}`

});
