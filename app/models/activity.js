module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    activity: {type: DataTypes.STRING, allowNull: false}
   },
   {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Activity.belongsToMany(models.User, {through: "UserActivity"});
        }
      }
  });
  return Activity;
};