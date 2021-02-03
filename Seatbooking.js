const container = document.querySelector('.seat-container');
const movieselect = document.getElementById('movielist');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const moivecount = document.getElementById('count');
const totalcount = document.getElementById('total');

function saveMoiveData(count, total) {
    localStorage.setItem('selectedSeatsCount', count);
    localStorage.setItem('selectedMovieIndex', movieselect.value);
    localStorage.setItem('totalcount', total);
}

function updateCount() {
    const getmoivecount = localStorage.getItem('selectedSeatsCount');
    const getmoivetotal = localStorage.getItem('totalcount');
    moivecount.innerText = getmoivecount;
    totalcount.innerText = getmoivetotal;
}
function updateSeat() {
    const updateseat = JSON.parse(localStorage.getItem('selectedSeats'));

    if (updateseat !== null && updateseat.length > 0) {
        seats.forEach((seat, index) => {
            //indexof는 찾는값이 없으면 -1 반환
            if (updateseat.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
}

function updateUI() {
    updateSeat();
    updateCount();
}

function updateSelectCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeats);
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));



    //console.log(movieselect.selectedIndex);

    const selectedSeatsCount = seatsIndex.length;

    moivecount.innerText = selectedSeatsCount;
    totalcount.innerText = selectedSeatsCount * movieselect.value;

    saveMoiveData(selectedSeatsCount, selectedSeatsCount * movieselect.value);



}

container.addEventListener('click', event => {

    if (event.target.classList.contains('occupied')) {
        alert("이미 선택된 좌석입니다.");
    }

    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateSelectCount();
    }



})

movieselect.addEventListener('change', event => {
    const selectedSeatsCount = localStorage.getItem('selectedSeatsCount');
    //console.log(selectedSeatsCount, event.target.selectedIndex);
    saveMoiveData(selectedSeatsCount, event.target.value * selectedSeatsCount);
    updateCount();
})

function init() {
    updateUI();
    //updateSelectCount();
}
init();