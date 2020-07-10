module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
    const Plants = sequelize.define("Plant", {
        water:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reminders: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Plants;
}

=======
    const Plant = sequelize.define("Plant", {
        name:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    
    return Plant;
    }
>>>>>>> 776cb4cf956e66653a5fcc737a281f83593cc804
