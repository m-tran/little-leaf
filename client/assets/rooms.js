$(document).ready(function () {
  $("#start").on("click", function () {
    $("#questions").append(
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

        // var random_images_array = ["pic1.png", "pic2.png", "pic3.png", "pic4.png", "BT7B0071.png"];

        // function getRandomImage(imgAr, path) {
        //     // path ='./pictures/'; // default path here
        //     var num = Math.floor( Math.random() * imgAr.length );
        //     var img = imgAr[ num ];
        //     var imgStr = '<img src="' + path + img + '" alt = "">';
        //     document.write(imgStr); document.close();
        // }

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
          // getRooms()
          //     .then((allRooms) => renderRooms(allRooms))
          //     .catch((err) => console.log(err));

          $("#newRoom").append(
            `<div class="col s12 m2">
                    <div class="card horizontal">
                        <div class="card-image">
                        <img src="https://cdn.vox-cdn.com/thumbor/QRC-K6S73KSM0XVNvrQhicj9g_E=/0x0:2000x1333/1200x800/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/65377475/BT7B0071.7.jpg">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                            <p>${response.name}</p>
                            <p> size:  ${response.size}</p> 
                            <p>number of plants:  ${response.numPlants}</p>
                            </div>
                            <div class="card-action">
                            <a href="/myplants">view schedule</a>
                            <a href="/myplants" id="viewPlants" data="${response.name}" data-id="${response.id}">view plants</a>
                            <a href = "#" class = "buttondelete" data="${response.name}" data-id="${response.id}">delete room</a>
                            </div>
                        </div>
                        </div>
                    </div>`


                    
          );
        });
      }
      getInputValue();
    });
  });

  // Button to remove room
  $("#newRoom").on("click", ".buttondelete", deleteRoom);

  // $(".buttonDelete").on("click", function(e) {
  //     console.log("clicked");
  //     event.stopPropagation();
  //     var id = $(this).data("data-id");
  //     $.ajax({
  //       method: "DELETE",
  //       url: "/room/delete/" + id
  //     }).then(getRooms);
  // })

  
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


  getRooms().then((res) => {
    console.log(res);
    res.forEach((room) => {
        $("#newRoom").empty();
      $("#newRoom").append(
        `<div class="col s12 m2">
          <div class="card horizontal">
              <div class="card-image">
                  <img src="https://cdn.vox-cdn.com/thumbor/QRC-K6S73KSM0XVNvrQhicj9g_E=/0x0:2000x1333/1200x800/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/65377475/BT7B0071.7.jpg">
              </div>
              <div class="card-stacked">
                  <div class="card-content">
                  <p>${room.name}</p>
                  <p> size:  ${room.size}</p> 
                  <p>number of plants:  ${room.numPlants}</p>
                  </div>
                  <div class="card-action">
                  <a href="/myschedule">view schedule</a>
                  <a href="/myplants" id="viewPlants" data="${room.name}" data-id="${room.id}">view plants</a>
                  <a href = "#" class = "buttondelete" data="${room.name}" data-id="${room.id}">delete room</a>
                  </div>
              </div>
              </div>
          </div>`
      );
    });
  });

  function deleteRoom(event) {
    console.log("clicked");
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/room/delete/" + id,
    }).then((res) =>{
        getRooms().then((res) => {
            console.log(res);
            res.forEach((room) => {
                $("#newRoom").empty();
              $("#newRoom").append(
                `<div class="col s12 m2">
                  <div class="card horizontal">
                      <div class="card-image">
                          <img src="https://cdn.vox-cdn.com/thumbor/QRC-K6S73KSM0XVNvrQhicj9g_E=/0x0:2000x1333/1200x800/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/65377475/BT7B0071.7.jpg">
                      </div>
                      <div class="card-stacked">
                          <div class="card-content">
                          <p>${room.name}</p>
                          <p> size:  ${room.size}</p> 
                          <p>number of plants:  ${room.numPlants}</p>
                          </div>
                          <div class="card-action">
                          <a href="/myschedule">view schedule</a>
                          <a href="/myplants" id="viewPlants" data="${room.name}" data-id="${room.id}">view plants</a>
                          <a href = "#" class = "buttondelete" data="${room.name}" data-id="${room.id}">delete room</a>
                          </div>
                      </div>
                      </div>
                  </div>`
              );
            });
          });
    });
  }
});
