function User(username, age, password){
    this.username = username;
    this.age = age;
    this.password = password;
}
//Getters & Setters

User.prototype.getUsername = function () {
    return this.username;
};

User.prototype.getAge = function () {
    return this.age;
};

User.prototype.setAge = function (age) {
    this.age = age;
};

User.prototype.setPassword = function (password) {
    this.password = password;
};

module.exports = User;