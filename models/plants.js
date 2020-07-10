module.exports = (sequelize, DataTypes) => {
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

