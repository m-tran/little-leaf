var count = 0;
var answer = "";

$("#btnSubmit").on("click", function () {
    if (count <= 6) {
        answer = "small";
    } else if (count > 6 && count <= 10) {
        answer = "medium";
    } else if (count > 10 && count <= 16) {
        answer = "large";
    }
    console.log(answer);
});

// for (var i = 0; i < question.length; i++) {
//   array.push(question[i].value);
// }
// console.log(array);

// // function question1() {
// $("#answer").on("click", function () {
//   for (var j = 0; j < array.length; j++) {
//     if (array[j] == "option1") {
//       console.log(array[j]);
//       count++;
//       console.log(count);
//     }
//     else if (array[j] == "option2") {
//       count += 2;
//       console.log(count);
//     }
//   }
// });

$("#opt1").on("click", function () {
    count++;
    console.log(count);
});
$("#opt2").on("click", function () {
    count += 2;
    console.log(count);
});
$("#opt3").on("click", function () {
    count += 3;
    console.log(count);
});
$("#opt4").on("click", function () {
    count += 4;
    console.log(count);
});

$("#opt5").on("click", function () {
    count++;
    console.log(count);
});
$("#opt6").on("click", function () {
    count += 2;
    console.log(count);
});
$("#opt7").on("click", function () {
    count += 3;
    console.log(count);
});
$("#opt8").on("click", function () {
    count += 4;
    console.log(count);
});

$("#opt9").on("click", function () {
    count++;
    console.log(count);
});
