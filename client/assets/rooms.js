$(document).ready(function () {

    // getRooms().then((allRooms) => {
    //     renderRooms(allRooms);
    // });

    // const name = $('#roomName');
    // const size = $('#roomSize');
    // const numPlant = $('#plantNum');

    $('#start').on('click', function () {
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

        // $("#btnSubmit").on("click", () => {
        //     const roomText = $("#newRoom").val();
        //     $("#newRoom").val("");

        //     $.ajax({
        //         type: "POST",
        //         url: "/room/new",
        //         data: { text: roomText },
        //     }).then(() => {
        //         getRooms()
        //             .then((allRooms) => renderRooms(allRooms))
        //             .catch((err) => console.log(err));
        //     });
        // });

        $("#btnSubmit").on("click", function () {
            function getInputValue() {


                const roomText = $("#roomName").val();
                $("#roomName").val("");

                let roomSize = document.getElementById('roomSize').value;
                let plantNum = document.getElementById('plantNum').value;
                console.log(roomText, roomSize, plantNum)
                if (roomSize <= 100 && plantNum <= 1) {
                    console.log('small room');

                } else if (roomSize > 101 && roomSize < 300 && plantNum >= 1 && plantNum <= 3) {
                    console.log('medium room + 2 plants');

                } else if (roomSize > 301 && plantNum >= 3) {
                    console.log('large room');

                }


                $.ajax({
                    type: "POST",
                    url: "/room/new",
                    data: { name: roomText, size: roomSize, numPlants: plantNum, sunlight: true },
                }).then((response) => {

                    $("#questions").empty();
                    console.log(response);
                    // getRooms()
                    //     .then((allRooms) => renderRooms(allRooms))
                    //     .catch((err) => console.log(err));

                    $('#newRoom').append(
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
                            </div>
                        </div>
                        </div>
                    </div>`
                    );
                });
            }
            getInputValue();
        });
    })
});

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
    console.log(res)
    res.forEach((room) => {
        $('#newRoom').append(
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
                <a href="/myplants">view schedule</a>
                <a href="/myplants" id="viewPlants" data="${room.name}" data-id="${room.id}">view plants</a>
                </div>
            </div>
            </div>
        </div>`
        );
    });
});

// const renderRooms = (arr) => {
//     $("#card-container").html("");
//     arr.forEach(() => {

//         $('#newRoom').append(
//             `<div class="col s12 m2">
//         <div class="card horizontal">
//           <div class="card-image">
//             <img src="https://cdn.vox-cdn.com/thumbor/QRC-K6S73KSM0XVNvrQhicj9g_E=/0x0:2000x1333/1200x800/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/65377475/BT7B0071.7.jpg">
//           </div>
//           <div class="card-stacked">
//             <div class="card-content">
//               <p>${roomName.value}</p>
//               <p> size:  ${roomSize}</p> 
//               <p>number of plants:  ${plantNum}</p>
//             </div>
//             <div class="card-action">
//               <a href="./plants.l">view schedule</a>
//             </div>
//           </div>
//         </div>
//       </div>`
//         );
//     });
// };



// $(document).on("click", "#plants", function () {
//     window.location.href = `/plant/all`;
// });

// $(document).on("click", "#rooms", function () {
//     window.location.href = `/rooms`;
// });

// const addRoom = (name, size, numPlant) => {
//     const roomData = {
//         name,
//         size,
//         numPlant
//     }
//     console.log(roomData);

// }

// $.ajax({
//     type: "POST",
//     url: "/room/new",
//     data: roomData,
// }).then((res) => console.log(res));

