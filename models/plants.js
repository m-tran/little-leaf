module.exports = (sequelize, DataTypes) => {
    const Plants = sequelize.define("Plant", {
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

    return Plants;
}

