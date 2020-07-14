module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        size:{
            type: DataTypes.INTEGER,
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