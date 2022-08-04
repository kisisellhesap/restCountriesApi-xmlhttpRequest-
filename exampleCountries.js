const countryName = document.querySelector(".text");
const submit = document.querySelector(".submit");
const countryContainer = document.querySelector(".country");
const neightboringContainer = document.querySelector(".neightboring");





countryContainer.innerHTML=`<h3>If you want to see to countries property please enter a value.<h3>`;
neightboringContainer.innerHTML="<h3>If this country's have a neighboring it's shown in here.  <h3>";




const requestFunction = (countryName) => {
    const request = new XMLHttpRequest();
    request.open("GET","https://restcountries.com/v3.1/name/"+ countryName);
    request.send();
    
    
    request.addEventListener("load",() => {

        // console.log(request.status);
        if(request.status===200) {
            const data = JSON.parse(request.responseText);
            displayCountry(data[0]);
         
            if(data[0].borders!==undefined) {
                // console.log("arkadaş var");
                const countries = data[0].borders.toString();    
    
    
                const neightboring = new XMLHttpRequest();
                neightboring.open("GET","https://restcountries.com/v3.1/alpha?codes="+countries);
                neightboring.send();
        
                neightboring.addEventListener("load", () => {
                
                    const  data = JSON.parse(neightboring.responseText);
                    displayNeightboring(data);
                });
            }
            else {
                // console.log("arkadaş yok");
                neightboringContainer.innerHTML=`<h3>${countryName} has no neighbors <h3>`;
            }
           

    
        }
        else {
            console.log("arama gerçekleştirilemedi");
            countryContainer.innerHTML=`<h3>This is a false value ! Please enter to a valid the country name.<h3>`;
            neightboringContainer.innerHTML="<h3>if you want to see the countries' neighbors please enter to a valid the country name. <h3>";
        }


});
    }



const  displayNeightboring = (data) => {
    neightboringContainer.innerHTML="";
for(let country of data) {

let html =

`
<div class="card">
<img src="${country.flags.png}">
<span class="name"> NAME :    ${country.name.common}</span>
<span class="region"> REGİON :    ${country.region}</span>
<span class="capital"> CAPİTAL :    ${country.capital}</span>
<span class="population"> POPULATION :    ${country.population}</span>
<span class="lang"> LANGUAGES :    ${Object.values(country.languages)}</span>
</div>
`;


neightboringContainer.insertAdjacentHTML("beforeend",html);

}

}


const displayCountry = (data) => {

    countryContainer.innerHTML="";
    let html =  
    `
    <div class="card">
    <img src="${data.flags.png}">
    <span class="name"> NAME :    ${data.name.common}</span>
    <span class="region"> REGİON :    ${data.region}</span>
    <span class="capital"> CAPİTAL :    ${data.capital}</span>
    <span class="population"> POPULATION :    ${data.population}</span>
    <span class="lang"> LANGUAGES :    ${Object.values(data.languages)}</span>
    </div>
    `;


    countryContainer.insertAdjacentHTML("beforeend",html);

}




countryName.addEventListener("keypress", (e) => {
if (e.key === 'Enter') {
submit.click();
    }

});
    
submit.addEventListener("click", () => {
    requestFunction(countryName.value);
    countryName.value="";



});