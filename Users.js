const User = require('./User');

function Users(){
    this.users = [];
}

Users.prototype.createNewUser = function (username, age, password) {
    let user = new User(username, age, password);
    let res = 1;
    for (let i = 0; i < this.users.length; i++){
        if(this.users[i].getUsername() === user.getUsername) res = 0;
    }
    if (res === 1){
        user.setAge(age);
        user.setPassword(password);
        this.users.push(user);
        console.log("New user created!");
    }
    else {
        console.log("Username already exist");
    }
};

Users.prototype.deleteUser = function (username){
    let flag = 0;
    for (let i = 0; i < this.users.length; i++){
        if (this.users[i].getUsername()===username){
            flag = 1;
            this.users.splice(i, 1);
            console.log("User has been deleted successfully");
            break;
        }
    }
    if (flag === 0){
        console.log("User doesn't exist!");
    }
};

Users.prototype.getAllUsers = function () {
    if (this.users.length === 0) console.log("There are no users");
    else {
        for (let i = 0; i < this.users.length; i++) {
            console.log(this.users[i].getUsername(), '(', this.users[i].getAge(), ')');
        }
    }
};

Users.prototype.checkIfUserExist = function(name){
    let checkUser = 0;
    for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].getUsername() === name) checkUser = 1;
    }
    if(checkUser === 0) return false;
};

module.exports = Users;