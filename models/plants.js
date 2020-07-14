module.exports = (sequelize, DataTypes) => {
    const Plant = sequelize.define("Plant", {
        room_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commonName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        water_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        water_frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        prune: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        prune_frequency: {
            type: DataTypes.INTEGER,
        },
        rotate_frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        repot_frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    Plant.associate = (models) => {
        Plant.belongsTo(models.Room, {
            foreignKey: { allowNull: false },
        });
    };


    return Plant;
}

