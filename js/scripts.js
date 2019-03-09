//stores 12 promise objects into variable employees
let employees = new Array(12);
for (let i = 0; i < employees.length; i++) {
    employees[i] = fetch('https://randomuser.me/api').then(response => {
        return response.json();
    });
}
//creates the gallery. It iterates through each promise object, makes it to a json.
//Then it uses interpolation to acces all the inforamtion for each card and. 
const gallery = document.getElementById('gallery');
employees.forEach((item, index) => {
    item.then((data) => {
        employees[index] = data;

        gallery.innerHTML +=
            `
      <div class="card" onclick="showModal(${index})">
      <div class="card-img-container">
      <img class="card-img" src="${data.results[0].picture.thumbnail}" alt="profile picture">
      </div>
      <div lass="card-info-container">
      <h3 id="name" class="card-name cap">${data.results[0].name.first} 
      ${data.results[0].name.last}</h3>
      <p class="card-text">${data.results[0].email}</p>
      <p class="card-text cap">${data.results[0].location.city},
      ${data.results[0].location.state}</p>
      </div>
      </div>
      `;
    })
});

//method to get last page in modal
const prevPage = (currentPage) => {
    if (currentPage > 0) {
        closeModal();
        showModal(currentPage - 1);
    }
    if(currentPage==0){
        document.querySelector('.modal-btn-container .btn').style.background="grey";
    }
}
//method to get nextPage
const nextPage = (currentPage) => {
    if (currentPage < 11) {
        closeModal();
        showModal(currentPage + 1);
    }
    if(currentPage==11){
        document.querySelectorAll('.modal-btn-container .btn')[1].style.background="grey";
    }
}
//method for closing modal
const closeModal = () => {
    const modalContainer = document.querySelector('.modal-container');
    document.querySelector('body').removeChild(modalContainer);
}
//shows modal. it takes the argument of the current selected page. Then it uses the employee variable 
//where the employee information is stored to get all the information for the modal.
// I formatted the birtday date to fit the birthday format in the index html comment.
const showModal = (index) => {

    let employeeIndex = index;
    let birthday = employees[employeeIndex].results[0].dob.date;
    let birthdayInfo = birthday.split(':');
    let birthdayInfo2 = birthdayInfo[0].split('T');
    let birtdayInfoStyled = birthdayInfo2[0];
    birtdayInfoStyled = birtdayInfoStyled.split('-');
    birtdayInfoStyled = `Birthday: ${birtdayInfoStyled[2]}/${birtdayInfoStyled[1]}/${birtdayInfoStyled[0]}`

    document.querySelector('body').innerHTML +=
        `
    <div class="modal-container">
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="closeModal()"><strong>X</strong></button>
    <div class="modal-info-container">
    <img class="modal-img" src="${employees[employeeIndex].results[0].picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${employees[employeeIndex].results[0].name.first} 
    ${employees[employeeIndex].results[0].name.last}</h3>
    <p class="modal-text">${employees[employeeIndex].results[0].email}</p>
    <p class="modal-text cap">${employees[employeeIndex].results[0].location.city}</p>
    <hr>
    <p class="modal-text"w>${employees[employeeIndex].results[0].cell}</p>
    <p class="modal-text">${employees[employeeIndex].results[0].location.street}, ${employees[employeeIndex].results[0].location.state}, 
    OR ${employees[employeeIndex].results[0].location.postcode}</p>
    <p class="modal-text">${birtdayInfoStyled}</p>
    </div>
    </div>
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn" onclick="prevPage(${index})">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn" onclick="nextPage(${index})">Next</button>
    </div>
    </div>
    `
}