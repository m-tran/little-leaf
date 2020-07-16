$(document).ready(function () {





    $.ajax({
      type: "POST",
      url: "/plant/new",
    }).then((plant) => {
    console.log(plant);
    waterFrequency = plant.water_frequency;
    pruneFrequency = plant.prune_frequency;
    rotateFrequency = plant.rotate_frequency;
    createdDate = plant.createdAt;
    });

    
  }) 