//displays 12 random employees due to 12 api requests and appending this information
let employees=new Array(12);
for(let i=0;i<employees.length;i++){
    employees[i]=fetch('https://randomuser.me/api').then(response => {
        return response.json();
    }); 
}
const gallery = document.getElementById('gallery');
employees.forEach((item, index)=>{item.then((data) => {
    console.log(data);
    employees[index]=data;
    
    gallery.innerHTML +=
       `
      <div class="card" onclick="showModal"name="${index}">
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
    })});

    gallery.addEventListener('click', (event)=>{
        let employeeIndex=event.target.getAttribute('name');
        let birthday=employees[employeeIndex].results[0].dob.date;
        let birthdayInfo=birthday.split(':');
        let birthdayInfo2=birthdayInfo[0].split('T');
        console.log(birthdayInfo2);
        let birtdayInfoStyled=birthdayInfo2[0];
        birtdayInfoStyled=birtdayInfoStyled.split('-');
        birtdayInfoStyled=`Birthday: ${birtdayInfoStyled[2]}/${birtdayInfoStyled[1]}/${birtdayInfoStyled[0]}`
        
        document.querySelector('body').innerHTML+=
        `
        <div class="modal-container">
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
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
        `
        
        const closeModalButton= document.getElementById('modal-close-btn');

        closeModalButton.addEventListener('click', ()=>{
            const modalContainer=document.querySelector('.modal-container');
            console.log(modalContainer);
            document.querySelector('body').removeChild(modalContainer);
        });
        ;});
        