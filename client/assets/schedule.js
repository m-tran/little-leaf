$(document).ready(function () {
    console.log('Hello world');

var currentDay = moment().day();
console.log(currentDay)

$("#today").text(moment().format('L'));
$("#day2").text(moment().add(1,'days').format('L'));
$("#day3").text(moment().add(2, 'days').format('L'));
$("#day4").text(moment().add(3, 'days').format('L'));
$("#day5").text(moment().add(4, 'days').format('L'));
$("#day6").text(moment().add(5, 'days').format('L'));
$("#day7").text(moment().add(6, 'days').format('L'));
});

