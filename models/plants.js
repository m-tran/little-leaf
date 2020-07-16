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
            defaultValue: 56,
        },
        rotate_frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 56,
        },
        repot_frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 365,
        },
    });
    Plant.associate = (models) => {
        Plant.belongsTo(models.Room, {
            foreignKey: { allowNull: false },
        });
    };


    return Plant;
}

