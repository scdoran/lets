module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {type: DataTypes.STRING, allowNull: false},
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    availability: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    photo: DataTypes.BLOB
  },
  {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          User.belongsToMany(models.Activity, {through: "UserActivity"});
          User.belongsToMany(models.User, {as: "Friends", through: "UserFriends"});
        }
      }
  });
  return User;
};