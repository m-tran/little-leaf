const count = 0;
const answer = "";

$('#start').on('click', function () {
    $('#questions').append(
        `<div class="row">
        <div class="col s12 m6">
            <div class="card green lighten-5">
                <div class="card-content white-text">
                    <span class="card-title" style="color: gray;">room name</span>
                    <form action="#">
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="" id="roomName" type="text" class="validate">
                                <label class="active" for="first_name2">ex. living room</label>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6">
            <div class="card green lighten-5">
                <div class="card-content white-text">
                    <span class="card-title" style="color: gray;">room size</span>
                    <form action="#">
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="roomSize" type="text">
                                <label class="active">in square feet</label>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6">
            <div class="card green lighten-5">
                <div class="card-content white-text">
                    <span class="card-title" style="color: gray;">number of plants in the room</span>
                    <form action="#">
                        <div class="row">
                            <div class="input-field col s6">
                                <input type="text" id="plantNum">
                                <label class="active" for="first_name2">ex. 2</label>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6">
            <div class="card green lighten-5">
                <div class="card-content white-text">
                    <span class="card-title" style="color: gray;">Does this room get sunlight?</span>
                    <form action="#">
                        <p>
                            <label>
                                <input type="checkbox" id="opt1">
                                <span>yes</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" id="opt2">
                                <span>no</span>
                            </label>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    </div>


    <button class="btn waves-effect waves-light" type="submit" name="action" id="btnSubmit">Submit
        <i class="material-icons right"></i>
    </button>
       `
    );
    $("#btnSubmit").on("click", function () {
        function getInputValue() {



            let roomSize = document.getElementById('roomSize').value;
            let plantNum = document.getElementById('plantNum').value;
            if (roomSize <= 100 && plantNum <= 1) {
                console.log('small room');

            } else if (roomSize > 101 && roomSize < 300 && plantNum >= 1 && plantNum <= 3) {
                console.log('medium room + 2 plants');

            } else if (roomSize > 301 && plantNum >= 3) {
                console.log('large room');

            }
            $('#newRoom').append(
                `<div class="col s12 m2">
                <div class="card horizontal">
                  <div class="card-image">
                    <img src="https://lorempixel.com/100/190/nature/6">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <p>${roomName.value}</p>
                      <p> size:  ${roomSize}</p> 
                      <p>number of plants:  ${plantNum}</p>
                    </div>
                    <div class="card-action">
                      <a href="./plants.html">view schedule</a>
                    </div>
                  </div>
                </div>
              </div>`
            );

            $("#questions").empty();
        }
        getInputValue();


        // if (count <= 6) {
        //     answer = "small";
        // } else if (count > 6 && count <= 10) {
        //     answer = "medium";
        // } else if (count > 10 && count <= 16) {
        //     answer = "large";
        // }
        // console.log(answer);
    });


})





