$(document).ready(function () {

    $("#search").on("keydown", function (e) {
        if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            loadSearch(e);
        }
    });

    function loadSearch(e) {
        let search = $("#search").val();
        renderPlantResults(search);
        $("#search").val("");
    }

    function renderPlantResults(plantSearch) {
        $("#results").html("");
        let searchResults = [];
        let updatedSearch = plantSearch.split(' ').join('_');
        $.ajax({
            type: "GET",
            url: "http://localhost:3005/search",
            data: {
                plant: updatedSearch,
            },
        }).then((res) => {
            for (let i = 0; i < 5; i++) {
                searchResults.push(res[i].scientific_name);
                $("#results")
                .append(`
                <div class="card horizontal" data-id=${i}>
                    <div class="card-stacked">
                        <div class="card-content">
                            ${res[i].scientific_name}
                        </div>
                    </div>
                </div>`);
            }
            return console.log(searchResults);
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