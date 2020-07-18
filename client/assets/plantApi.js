$(document).ready(function () {

    let searchResults = [];
    let resultLinks = [];

    $("#search").on("keydown", function (e) {
        if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            $("#results").html("");    
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
        let updatedSearch = plantSearch.split(' ').join('_');
        $.ajax({
            type: "GET",
            url: "http://localhost:3005/search",
            data: {
                plant: updatedSearch,
            },
        }).then((res) => {
            searchResults = [];
            resultLinks = [];
            for (let i = 0; i < 5; i++) {
                searchResults.push(res[i].scientific_name);
                resultLinks.push(res[i].link);
                $("#results")
                .append(`
                <div class="card horizontal" id="selectPlant" data-id=${i}>
                    <div class="card-stacked">
                        <div class="card-content">
                            ${res[i].common_name}
                            <br>
                            <i>${res[i].scientific_name}</i>
                        </div>
                    </div>
                </div>`);
            }
            return console.log(searchResults);
        });
    }

    function renderSelectedPlant(selected) {
        $("#results").html("");
        $.ajax({
            type: "GET",
            url: "http://localhost:3005/search/plant",
        }).then((res) => {

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