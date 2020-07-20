$(document).ready(function () {
    console.log('Hello world');

var currentDay = moment().day();
console.log(currentDay)

$("#today").text(moment().format('L'));
$("day2").text(moment().add(1, 'days').calendar());
$("day3").text(moment().add(1, 'days').calendar());
$("day4").text(moment().add(1, 'days').calendar());
$("day5").text(moment().add(1, 'days').calendar());
$("day6").text(moment().add(1, 'days').calendar());
$("day7").text(moment().add(1, 'days').calendar());
});

