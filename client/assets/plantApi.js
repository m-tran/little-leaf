$(document).ready(function () {

    $(document).on("click", ".renderPlants", function (e) {
        e.preventDefault();
        let search = $("#search").val();
        renderPlantResults(search);
        $("#search").val("");
    });

    function renderPlantResults(plantSearch) {
        $.ajax({
            type: "GET",
            url: "/search",
            data: {
                plant: plantSearch, 
            },
        }).then((res) => {
            return console.log(res);
        });
    }

    // $.ajax({
    //     type: "POST",
    //     url: "/plant/new",
    // }).then((plant) => {
    //     console.log(plant);
    //     const waterFrequency = plant.water_frequency;
    //     const pruneFrequency = plant.prune_frequency;
    //     const rotateFrequency = plant.rotate_frequency;
    //     const createdDate = plant.createdAt;
    // });


});