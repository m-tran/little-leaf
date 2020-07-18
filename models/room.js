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
        enoughPlants:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        sunlight: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    Room.associate = (models) => {
        Room.belongsTo(models.User, {
        foreignKey: { allowNull: false },
        });
    };
    
    return Room;
};