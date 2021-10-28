console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //'#' sign means it the ID not the class
const messageTwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
// const events = document.querySelectorAll('.event')

// events.forEach( event => {
//     const date = dayjs(event.dataset.date).format(now,'ddd, MMM D')
//     const dataElement = event.querySelector('.data')
//     dataElement.innerText = date
// })


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        }else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
         //   messagethree.textContent = days
        }
    })
})

})

let date = new Date();
let dayOfWeekNumber = date.getDay();
let nameOfDay;

switch(dayOfWeekNumber){
    case 0:
        nameOfDay = 'Sun'
        break;
    case 1:
        nameOfDay = 'Mon'
        break;
    case 2:
        nameOfDay = 'Tue'
         break;
     case 3:
       nameOfDay = 'Wed'
         break;
      case 4:
            nameOfDay = 'Thu'
            break;
     case 5:
            nameOfDay = 'Fri'
            break;
     case 6:
              nameOfDay = 'Sat'
              break;

}

//day
let weekdayDiv = document.getElementById('weekday');
weekdayDiv.innerHTML = `${nameOfDay}`;

//date
const d = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];
document.getElementById("Month").innerHTML = months[d.getMonth()];

//date
const a = new Date();
document.getElementById("day").innerHTML = a.getDate();

