module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {type: DataTypes.STRING, allowNull: false},
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    status: DataTypes.STRING,
    availability: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    photo: {type: DataTypes.STRING, defaultValue: "https://cdn3.iconfinder.com/data/icons/essentials-vol-1-1/512/User-2-512.png"},
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    salt: DataTypes.STRING,
    encryptedpw:DataTypes.STRING
  },
  {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          User.belongsToMany(models.Activity, {as: "Interests", through: "UserActivity"});
          User.belongsToMany(models.User, {as: "Friend", through: "UserFriend"});
        }
      }
  });
  return User;
};