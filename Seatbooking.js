const container = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

function updateUI() {
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

function updateSelectCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeats);
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    //console.log(seatsIndex);

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
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

function init() {
    updateUI();
    //updateSelectCount();
}
init();