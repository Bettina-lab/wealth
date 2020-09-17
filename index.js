const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];
//fetch random userand add money

/*
function getRandomUser() {
    fetch('https://randomuser.me/api').then(res=>res.json
    ())
    .then(data =>)
}
*/

getRandomUser();
getRandomUser()
getRandomUser();

async function getRandomUser(){ 
const res = await fetch('https://randomuser.me/api');
const data = await res.json();
//console.log(data);

const user = data.results[0];

const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
};

//console.log(newUser)

addData(newUser);

}

//Add new obj to data arr

function addData(obj) {
    data.push(obj);

    updateDOM();
}

//Double everyones money

function doubleMoney() {
 
 data = data.map(user => {
     return {...user, money: user.money * 2};
 });
 updateDOM();
}

//Sort users By money

function sortByRichest(){
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}


// show only millionaires

function showMillionaires() {
    data = data.filter(item => {
        item.money > 1000000
    });
    updateDOM();
}

//calculate wealth, returning a asingle value

function calculateWealth() {
    const wealth = data.reduce((acc, user) => ( 
        acc += user.money), 0);

        const wealthElement = document.createElement('div');
        wealthElement.innerHTML = `<h3>Total Wealth: <stron>${formatMoney(wealth)}</strong></h3>`;
        
        main.appendChild(wealthElement);
    }


//Update DOM, ES6

function updateDOM(provideData = data) {
//Clear the main div
main.innerHTML = '<h2><strong>Person</strong>WealthM/h2>';

provideData.forEach(item=> {
    const elem = document.createElement('div');
    elem.classList.add('person');
    elem.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    //to be visible on the DOM
    main.appendChild(elem);
});
}

//Format number to money from https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

function formatMoney(number) {

    return '$'+ number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

//Event Listener

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateBtn.addEventListener('click', calculateWealth)




