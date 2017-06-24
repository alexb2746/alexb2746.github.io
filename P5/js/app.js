(function () {
    $(document).ready(function () {
        //function for ajax call
        let employeeHTML = "";
        function getRandomEmployee(i) {
            $.ajax({
                url: 'https://randomuser.me/api/',
                dataType: 'json',
                success: function(data) {
                    //add employee html and info
                    if (i === 0 || i === 3 || i === 6 || i === 9) {
                        if (i > 0) {
                            employeeHTML += '</div>';
                        }
                        employeeHTML += '<div class="row">';
                    }
                    employeeHTML += '<div class="box">';
                    employeeHTML += '<div class="container">';
                    employeeHTML += '<div class="image">';

                    employeeHTML += `<img src="${data.results[0].picture.thumbnail}"/>`;
                    employeeHTML += '</div><div class="text">';
                    employeeHTML += `<span class="name"><strong>${data.results[0].name.first} `;
                    employeeHTML += `${data.results[0].name.last}</strong></span><br>`;
                    employeeHTML += `<span class="email">${data.results[0].email}</span><br>`;
                    employeeHTML += `<span class="location">${data.results[0].location.city}</span>`;
                    employeeHTML += '</div></div></div>';
                    employeeHTML += `<div id="modal${i}" class="modal"><div class="modal-content">`;
                    employeeHTML += '<span class="close">&times;</span>';
                    employeeHTML += `<img src="${data.results[0].picture.large}"/><br>`;
                    employeeHTML += `<span class="name"><strong>${data.results[0].name.first} `;
                    employeeHTML += `${data.results[0].name.last}</strong></span><br><br>`;
                    employeeHTML += `<span class="modal-text">Username: ${data.results[0].login.username}</span><br><br><hr><br>`;
                    employeeHTML += `<span class="modal-text">${data.results[0].email}</span><br><br>`;
                    employeeHTML += `<span class="modal-text">${data.results[0].cell}</span><br><br>`;
                    $.each(data.results[0].location, function(key, value) {
                        employeeHTML += `<span class="location modal-text">${value}`;
                        if (key === 'city') {
                            employeeHTML += ', '
                        } else {
                            employeeHTML += ' ';
                        }
                    });
                    employeeHTML += `<br><br><span class="modal-text">`
                    employeeHTML += `Birthday: ${data.results[0].dob.slice(0, 10)}</span>`;
                    employeeHTML += '</div></div>';
                    if (i === 11) {
                        employeeHTML += '</div>';
                        $('#employees').find('h1').remove();
                        $('#employees').append(employeeHTML);
                    }
                }
            });
        }

        //call the ajax request 12 times
        for (i = 0; i < 12; i++) {
            getRandomEmployee(i);
        }
    });
}());
