$(document).ready(function () {

    let searchResults = [];
    let resultId = [];
    let id;
    let index;
    let commonName = "";
    let allPlants = [];
    let userRooms = [];
    let userRoomsList = [];
    let roomId;
    let clicked = false;
    let clickedSubmit = false;

    $("#search").on("keydown", function (e) {
        if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
            loadSearch(e);
        }
    });

      // Button to delete plant
$("#loadAllPlants").on("click", ".deleteBtn", deletePlant);


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
        if (clicked === false) {
            createAddPlantOptions();
        }
        clicked = true;
    });

    $(document).on("click", "#submitBtn", function (e) {
        e.preventDefault();
        let room = document.getElementById("roomListContainer");
        let roomVal = room.options[room.selectedIndex].value;
        let name = commonName;
        let plantSize = parseInt($(`input[name="size"]:checked`).val());
        let frequency = $("#waterFrequency").val();
        let prune = $(`input[name="prune"]:checked`).val();
        if (clickedSubmit === false) {
            addPlant(roomVal, name, plantSize, frequency, prune);
        }
        clickedSubmit = true;
    });

    $(document).on("click", "#viewPlants", function(e) {
        roomId = $(this).attr("data-id");
        roomName = $(this).attr("data");
        localStorage.setItem("room", roomId);
        localStorage.setItem("name", roomName);
    });

    function pageLoad() {
        if (window.location.pathname=="/myplants") {
            roomId = localStorage.getItem("room");
            roomName = localStorage.getItem("name");
            console.log(roomId);
            renderAllPlants(roomId,roomName);
        }
    }

    pageLoad();
    
    function loadSearch(e) {
        let search = $("#search").val();
        renderPlantResults(search);
        $("#search").val("");
    }

    function renderPlantResults(plantSearch) {
        $("#results").html("");
        $("#loadAllPlants").html("");
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
            url: "/search/plant",
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
        $.ajax({
            type: "GET",
            url: "/rooms", 
        })
        .then((res) => {
            console.log(res);
            userRooms = res;
            userRooms.forEach((result, i) => {
                userRoomsList.push({name: result.name, id: result.id});
            });
            console.log(userRoomsList);
        })
        .then(() => {
            $("select").formSelect();
            $("#results")
            .append(`
            <div class="card horizontal">
                <div class="card-stacked">
                    <div class="card-content">
                        <form>
                            <p>What room are you adding this to?</p>
                            <div class="input-field col s12">
                                <select id="roomListContainer">
                                    <option value="" disabled selected>Choose your room</option>
                                </select>
                            </div>
                            <br>
                            <br>
                            <p id="anchorSize">What is the plant size?</p>
                        </form>
                    </div>
                </div>
            </div>`);
        })
        .then(() => {
            $("select").formSelect();
            let selectContainer = $("#roomListContainer");
            for(let i=0; i < userRoomsList.length; i++) {
                let opt = userRoomsList[i].name;
                let optValue = userRoomsList[i].id;
                let el = document.createElement("option");
                el.textContent = opt;
                el.value = optValue;
                selectContainer.append(el);
            }
        })
        .then(() => {
            $("select").formSelect();
            $("#anchorSize").append(`
                <p>
                    <label>
                        <input name="size" type="radio" value="1"/>
                        <span>Small</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="size" type="radio" value="2"/>
                        <span>Medium</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="size" type="radio" value="3"/>
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
                        <input name="prune" type="radio" value="true" checked/>
                        <span>Yes</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="prune" value="false" type="radio"/>
                        <span>No</span>
                    </label>
                </p>
                <br>
                <br>
                <button class="btn waves-effect waves-light" type="submit" name="action" id="submitBtn">Submit
                    <i class="material-icons right">send</i>
                </button>
            `);
        });
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
        }).then((plant) => {
            console.log(plant);
            $("#results").html("");
            $("#results").append(`
                <div class="col s12" id="success" style="display: flex; justify-content: center;">
                    <img src="https://blush.ly/UAM1-2D9k/p">
                    <br>
                </div>
                <div class="col s12" id="success">
                    <h1 style="text-align: center">Plant Added!</h1>
                </div>
            `);
        });
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // <div class="card-image">
    //     <img src="https://blush.ly/6kwxcfnn5/p?bg=ffbd1d">
    // </div>

    let randomColor;

    function renderAllPlants(room, name) {
        $.ajax({
            type: "GET",
            url: `/plant/all/${room}`,
        }).then((res) => {
            console.log(res);
            $("#loadAllPlants").empty();
            $("#loadAllPlants").append(`<h3>Plants for ${name}</h3>`)
            for (let i=0; i < res.length; i++) {
                randomColor = getRandomColor();
                $("#loadAllPlants")
                .append(`
                    <div class="card horizontal data-id=${res[i].id}">
                        <div class="card-stacked" style="background-color: ${randomColor}">
                            <div class="card-content white-text card-action">
                                <h4 id= "plantName">${res[i].commonName}</h4><a href = "#" class = "deleteBtn white-text" data="${name}" data-id="${res[i].id}">delete plant</a>
                                <br>
                                <br>
                                <h5>frequencies</h5>
                                <p> water ${res[i].water_frequency} days, prune ${res[i].prune_frequency} days, rotate ${res[i].rotate_frequency} days, repot ${res[i].repot_frequency} days  </p>
                            </div>
                        </div>
                    </div>
                `);
            }
        });
    }


    function deletePlant() {
        console.log("clicked")
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/plant/delete/" + id,
        }).then(() => {
      pageLoad();
        });
    }


});
