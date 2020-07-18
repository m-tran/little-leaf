$(document).ready(function () {


    $.ajax({
      type: "POST",
      url: "/plant/new",
    }).then((plant) => {
    console.log(plant);
    const waterFrequency = plant.water_frequency;
    const pruneFrequency = plant.prune_frequency;
    const rotateFrequency = plant.rotate_frequency;
    const createdDate = plant.createdAt;
    });

    
  }) 