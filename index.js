
const hours = [7,8,9,10,11,12,13,14,15,16,17,18];
var currentHour = parseInt(moment().startOf('day').fromNow().substring(0, 2));



hours.forEach(element => {
    if(element < currentHour){
        $(`#${element}`).css("background-color", "tomato");
    }else if(element = currentHour){
        $(`#${element}`).css("background-color", "#77dd77");
    }else if(element > currentHour){
        $(`#${element}`).css("background-color", "grey");
    }
});

window.timer = setInterval(() => {
    $('#currentDay').text(moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"));
})