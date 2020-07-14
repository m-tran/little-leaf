module.exports = (sequelize, DataTypes) => {
    const Plant = sequelize.define("Plant", {
        common_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        water:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reminders: {
            type: DataTypes.STRING,
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

