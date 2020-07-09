module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        size:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sunlight: {
            type: DataTypes.Boolean,
            allowNull: false,
        }
    });
    
    return Student;
    }