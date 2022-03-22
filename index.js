const hours = [7,8,9,10,11,12,13,14,15,16,17,18];
var currentHour = parseInt(moment().startOf('day').fromNow());


hours.forEach(element => {
    var formattedTime;
    if (element <= 11){
        formattedTime = element + "AM";
    }else if(element > 12){
        formattedTime = (element - 12) + "PM"
    }else if(element = 12){
        formattedTime = (element ) + "PM"
    }

    $('#table-body').append(`
        <tr id="${element}">
            <th scope="row">${formattedTime}</th>
            <td><input id="scheduleInput${element}" type="text" /></td>
            <td><input id="locationInput${element}" type="text" /></td>
            <td><i id="save${element}" onclick="test(${element})" class="fa fa-save" style="font-size:40px;"></i></td>
        </tr>`
    );

    $(`#scheduleInput${element}`).val(localStorage.getItem(`schedule${element}`));
    $(`#locationInput${element}`).val(localStorage.getItem(`location${element}`));

    if(element < currentHour){
        $(`#${element}`).css("background-color", "tomato");
    }else if(element == currentHour){
        $(`#${element}`).css("background-color", "#77dd77");
    }else if(element > currentHour){
        $(`#${element}`).css("background-color", "grey");
    };

});

function test(index){
    let schedule = $(`#scheduleInput${index}`).val();
    let location = $(`#locationInput${index}`).val();
    localStorage.setItem(`schedule${index}`, schedule);
    localStorage.setItem(`location${index}`, location);
}

window.timer = setInterval(() => {
    $('#currentDay').text(moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"));
})