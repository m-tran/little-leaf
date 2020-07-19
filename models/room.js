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
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Room.associate = (models) => {
        Room.belongsTo(models.User, {
        foreignKey: {allowNull: false},
        });
    }
    Room.associate = (models) => {
            Room.hasMany(models.Plant, {
            onDelete: "cascade",
            });
        
    };
    
    return Room;
};