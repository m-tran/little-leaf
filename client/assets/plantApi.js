$(document).ready(function () {

    $(document).on("click", ".renderPlants", function (e) {
        e.preventDefault();
        let search = $("#search").val();
        renderPlantResults(search);
        $("#search").val("");
    });

    function renderPlantResults(plantSearch) {
        console.log(plantSearch);
        let updatedSearch = plantSearch.split(' ').join('_');
        console.log(updatedSearch);
        $.ajax({
            type: "GET",
            url: "http://localhost:3005/search",
            data: {
                plant: updatedSearch, 
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