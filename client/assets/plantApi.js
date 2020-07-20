$(document).ready(function () {

    let searchResults = [];
    let resultId = [];
    let id;
    let index;
    let commonName = "";
    let allPlants = [];

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
    });

    $(document).on("click", "#submitBtn", function (e) {
        e.preventDefault();
        console.log("clicked");
        let room = 1; // need to change to get correct room based on name
        let name = commonName;
        let plantSize = $(`input[name="size"]:checked`).val();
        let frequency = $("#waterFrequency").val();
        let prune = $(`input[name="prune"]:checked`).val();
        addPlant(room, name, plantSize, frequency, prune);
    });

    $(document).on("click", "#viewPlants", function(e) {

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
            commonName = res.common_name;
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
                            <a class="waves-effect waves-light btn" id="addPlant"><i class="material-icons left">add</i>add plant</a>
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
                    <form>
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
                                <input name="size" type="radio"/>
                                <span>Small</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input name="size" type="radio"/>
                                <span>Medium</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input name="size" type="radio"/>
                                <span>Large</span>
                            </label>
                        </p>
                        <br>
                        <br>
                        <p>How often do you need to water your plant?</p>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea id="waterFrequency" class="materialize-textarea"></textarea>
                                <label for="waterFrequency">Enter water frequency in days</label>
                            </div>
                        </div>
                        <p>Do you need to prune your plant?</p>
                        <p>
                            <label>
                                <input name="prune" type="radio" checked/>
                                <span>Yes</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input name="prune" type="radio"/>
                                <span>No</span>
                            </label>
                        </p>
                        <br>
                        <br>
                        <button class="btn waves-effect waves-light" type="submit" name="action" id="submitBtn">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        </div>`);
    }

    function addPlant(room, name, plantSize, frequency, prune) {
        $.ajax({
            type: "POST",
            url: `/plant/new/${room}`,
            data: { 
                commonName: name,
                size: plantSize,
                water_frequency: frequency,
                prune: prune,
            }
        }).then((res) => {
            console.log(res);
        });
    }

    function renderAllPlants() {
        $.ajax({
            type: "GET",
            url: `/plant/all/${room}`,
        }).then((res) => {
            console.log(res);
            // create cards for each plant
            allPlants = res;
            allPlants.forEach((result, i) => {
                const card = document.createElement("div");
                card.classList = "plant-body";
            

            const content = `
                <div class="card horizontal data-id=${i}">
                    <div class="card-stacked">
                        <div class="card-content">
                            <h2>${result.commonName}</h2>
                        </div>
                    </div>
                </div>
            `;
            
            container.html += content;

            });
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