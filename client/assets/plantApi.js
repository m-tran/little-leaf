$(document).ready(function () {

    let searchResults = [];
    let resultId = [];
    let id;
    let index;

    $("#search").on("keydown", function (e) {
        if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
            loadSearch(e);
        }
    });

    $(document).on("click", "#selectPlant", function (e) {
        e.preventDefault();
        index = $(this).attr("data-id");
        id = resultId[index];
        renderSelectedPlant(id);
    });

    $(document).on("click", "#addPlant", function (e) {
        e.preventDefault();
        index = $(this).attr("data-id");
        id = resultId[index];
        createAddPlantOptions();
    })

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
            url: "/search",
            data: {
                plant: updatedSearch,
            },
        }).then((res) => {
            searchResults = [];
            resultId = [];
            for (let i = 0; i < 5; i++) {
                searchResults.push(res[i].scientific_name);
                resultId.push(res[i].id);
                $("#results")
                .append(`
                <div class="card horizontal">
                    <div class="card-stacked">
                        <div class="card-content">
                            ${res[i].common_name}
                            <br>
                            <i>${res[i].scientific_name}</i>
                            <br>
                            <br>
                            <a class="waves-effect waves-light btn" id="selectPlant" data-id=${i}>view details</a>
                            <a class="waves-effect waves-light btn" id="addPlant" data-id=${i}><i class="material-icons left">add</i>add plant</a>
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
            data: {
                id: selected,
            }
        }).then((res) => {
            console.log(res);
            $("#results")
                .append(`
                <div class="card horizontal">
                    <div class="card-stacked">
                        <div class="card-content">
                            ${res.common_name}
                            <br>
                            <i>${res.scientific_name}</i>
                            <br>
                            <br>
                            <a class="waves-effect waves-light btn"><i class="material-icons left">add</i>add plant</a>
                        </div>
                    </div>
                </div>`);
        });
    }

    function createAddPlantOptions() {
        $("#results")
        .append(`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <form action="addPlant">
                        <p>What room are you adding this to?</p>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea id="roomId" class="materialize-textarea"></textarea>
                                <label for="roomId">Enter Room</label>
                            </div>
                        </div>
                        <p>What is the plant size?</p>
                        <p>
                            <label>
                                <input name="size" type="radio" checked/>
                                <span>Small</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input name="size" type="radio" checked/>
                                <span>Medium</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input name="size" type="radio" checked/>
                                <span>Large</span>
                            </label>
                        </p>
                        <p>What ?</p>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea id="roomId" class="materialize-textarea"></textarea>
                                <label for="roomId">Enter Room</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>`);
    }

    function addPlant(room, name, size, frequency, prune) {
        $.ajax({
            type: "POST",
            url: `/plant/new/${room}`,
            data: { 
                commonName: name,
                size: size,
                water_frequency: frequency,
                prune: prune,
            }
        }).then((res) => {
            console.log(res);
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