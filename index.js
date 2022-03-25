
//Declearing a few global variables
const hours = [7,8,9,10,11,12,13,14,15,16,17,18];
var currentHour = parseInt(moment().startOf('day').fromNow());

//GUI elements created from an array of hours instead of making each individual table element in html
hours.forEach(element => {

    //formatting the time for 12 hour index
    var formattedTime;
    if (element <= 11){
        formattedTime = element + "AM";
    }else if(element > 12){
        formattedTime = (element - 12) + "PM"
    }else if(element = 12){
        formattedTime = (element ) + "PM"
    }

    //appending the table to make a row for each hour of the work day
    $('#table-body').append(`
        <tr id="${element}">
            <th scope="row">${formattedTime}</th>
            <td><input id="scheduleInput${element}" type="text" /></td>
            <td><input id="locationInput${element}" type="text" /></td>
            <td><i id="save${element}" onclick="saveLocalStorage(${element})" class="fa fa-save" style="font-size:40px;"></i></td>
        </tr>`
    );

    //this is to populate the table with data from the cached localStorage
    $(`#scheduleInput${element}`).val(localStorage.getItem(`schedule${element}`));
    $(`#locationInput${element}`).val(localStorage.getItem(`location${element}`));

    /*
    here i am checking if the current time is equal to the time on each row, and changing the time accordingly.
    aswel as checking if there are any events on the current time and changing the alert banner.
    */
    if(element < currentHour){
        $(`#${element}`).css("background-color", "tomato");
    }else if(element == currentHour){
        $(`#${element}`).css("background-color", "#77dd77");
        if(localStorage.getItem(`schedule${element}`) == "" || localStorage.getItem(`schedule${element}`) == null){
            $(`#alert`).css("display","none");
        }else{
            $(`#alert`).text((localStorage.getItem(`schedule${element}`)) + " at " + localStorage.getItem(`location${element}`) + ` @ ${formattedTime}!`);
            $(`#alert`).css("display", "inline");
        }
    }else if(element > currentHour){
        $(`#${element}`).css("background-color", "grey");
    };
});

//this function is used to save that rows data into localstorage on save icon click
function saveLocalStorage(index){
    let schedule = $(`#scheduleInput${index}`).val();
    let location = $(`#locationInput${index}`).val();
    localStorage.setItem(`schedule${index}`, schedule);
    localStorage.setItem(`location${index}`, location);
}

//setting the time under the heading to change in real time
window.timer = setInterval(() => {
    $('#currentDay').text(moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"));
})