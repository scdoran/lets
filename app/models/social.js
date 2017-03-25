module.exports = function(sequelize, DataTypes) {
  var Social = sequelize.define("Social", {
    link: {type: DataTypes.STRING, allowNull: false}
   },
   {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a link can't be made
          Social.belongsTo(models.User, {foreignKey: "UserId"});
        }
      }
  });
  return Social;
};