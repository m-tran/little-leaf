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




const getPlants = () => {
    return new Plants((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/plants/all",
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => reject(err));
    });
};

getPlants().then((res) => {
    console.log(res)
    res.forEach((plant) => {
    res.send(plant.water_frequency, plant.prune_frequency, plant.rotate_frequency, plant.rotate_frequency)

    });
});






});