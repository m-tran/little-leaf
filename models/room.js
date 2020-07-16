module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        size:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numPlants:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sunlight: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    Room.associate = (models) => {
        Room.hasOne(models.User, {
        foreignKey: { allowNull: false },
        });
    };
    
    return Room;
};