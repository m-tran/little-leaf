module.exports = (sequelize, DataTypes) => {
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