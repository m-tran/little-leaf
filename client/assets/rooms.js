$(document).ready(function () {


    let clicked = false;

    $('#start').on('click', function () {
        if (clicked === false) {
        $('#questions').append(
            `<div class="row">
        <div class="col s12 m6">
            <div class="card green lighten-5">
                <div class="card-content white-text">
                    <span class="card-title" style="color: gray;">room name</span>
                    <form>
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
}
clicked = true;
    $("#btnSubmit").on("click", function () {
      function getInputValue() {
        const roomText = $("#roomName").val();
        $("#roomName").val("");

        let roomSize = document.getElementById("roomSize").value;
        let plantNum = document.getElementById("plantNum").value;
        console.log(roomText, roomSize, plantNum);
        if (roomSize <= 100 && plantNum <= 1) {
          console.log("small room");
        } else if (
          roomSize > 101 &&
          roomSize < 300 &&
          plantNum >= 1 &&
          plantNum <= 3
        ) {
          console.log("medium room + 2 plants");
        } else if (roomSize > 301 && plantNum >= 3) {
          console.log("large room");
        }

        
        $.ajax({
          type: "POST",
          url: "/room/new",
          data: {
            name: roomText,
            size: roomSize,
            numPlants: plantNum,
            sunlight: true,
          },
        }).then((response) => {
          $("#questions").empty();
          console.log(response);
          $("#newRoom").append(makeCard(response.name, response.size, response.id)       
          );
        });
      }
      getInputValue();
    }).then(() => {
      clicked = false;
    })
  });

  // Button to remove room
$("#newRoom").on("click", ".buttondelete", deleteRoom);


  const getRooms = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "/rooms",
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };


var random_images_array = ["pic1.png", "pic2.png", "pic3.png", "pic4.png", "pic5.png"];

function getRandomImage() {
  var path ='/assets/pictures/'; // default path here
  var num = Math.floor( Math.random() * random_images_array.length );
  var img = random_images_array[ num ];
  var imgStr = path + img;
   //document.write(imgStr); document.close();
   console.log(imgStr);
  return imgStr;
}


  getRooms().then((res) => {
    console.log(res);
    $("#newRoom").empty();
    res.forEach((room) => {
      $("#newRoom").append(makeCard(room.name, room.size, room.id)
    
      );
    })
  })

  //function to delete a room
  function deleteRoom() {
    console.log("clicked");
    // event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/room/delete/" + id,
    }).then(() => {
        getRooms().then((res) => {
          $("#newRoom").empty();
            res.forEach((room) => {

              $("#newRoom").append(makeCard(room.name, room.size, room.id)
              );
            })
          });
    });
  }


  function makeCard(name, size, id) {
    return  `<div class="col s12 m7">
    <div class="card horizontal">
        <div class="card-image">
        <img src="${getRandomImage()}" />
        </div>
        <div class="card-stacked">
            <div class="card-content">
            <p>room name: ${name}</p>
            <p> size: ${size} sq ft</p> 
            </div>
            <div class="card-action">
            <a href="/myschedule">view schedule</a>
            <a href="/myplants" id="viewPlants" data="${name}" data-id="${id}">view plants</a>
            <a href = "#" class = "buttondelete" data="${name}" data-id="${id}">delete room</a>
            </div>
        </div>
        
    </div>`
  }


}); //end of document.ready


