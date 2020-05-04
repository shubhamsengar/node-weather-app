

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    messageOne.innerHTML = 'loading...';
    messageTwo.innerHTML = '';

    event.preventDefault();
    const location = search.value;
//fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.innerHTML = data.error;
            }
            else{
                messageOne.innerHTML = data.location;
                messageTwo.innerHTML = data.forecast;
            }
        });
    });

});