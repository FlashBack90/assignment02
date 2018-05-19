const Users = require('./Users');

function Group(groupName) {
    this.groupName = groupName;
    //this.id = id;
    this.groupUsers = new Users();
    this.groupChilds = [];
    this.parentGroup = null;
}
Group.prototype.addChildren = function(name) {
    let newGroup = new Group(name);
    let flag = 0;
    for (let i = 0; i < this.groupChilds.length; i++) {
        if (this.groupChilds[i].getGroupName() === newGroup.getGroupName()) {
            console.log("Group name is already exist in this group!");
            flag = 1;
            break;
        }
    }
    if (flag === 0) {
        if (this.groupUsers.users.length === 0) {
            this.groupChilds.push(newGroup);
            newGroup.parentGroup = this;
        }
        else {
            let others = new Group('others');
            for (let i = 0; i < this.groupUsers.users.length; i++) {
                let username = this.groupUsers.users[i];
                others.groupUsers.users.push(this.groupUsers.users[i]);
                this.removeUser(username);
            }
            this.groupChilds.push(others);
            this.groupChilds.push(newGroup);
            newGroup.parentGroup = this;
            others.parentGroup = this;
        }
    }
};

Group.prototype.getGroupName = function(){
    return this.groupName;
};

Group.prototype.setGroupName = function (groupname) {
    this.groupName = groupname;
};

Group.prototype.getGroupUsers = function () {
    for (let i = 0; i<this.groupUsers.users.length; i++) {
        return this.groupUsers.users[i].getUsername();
    }
};

Group.prototype.getUser = function (userId) {
    let subs;
    let name;
    subs = this.groupUsers.users[userId].toString();
    name = subs.substring(0, subs.indexOf(","));
    return name;
};

// Group.prototype.addUser = function (username, age) {
//     if (this.groupChilds.length === 0){
//         let check = 0;
//         let subs;
//         for (let i = 0; i < this.groupUsers.users.length; i++) {
//             subs = this.groupUsers.users[i].toString();
//             let name = subs.substring(0, subs.indexOf(","));
//             if (username === name) {
//                 check = 1;
//                 console.log("User is already exist!")
//             }
//         }
//         if (check === 0) {
//         this.groupUsers.users.push([username, age]);
//         console.log("User added to group successfully!");
//         }
//     }
//     else{
//         console.log("Can't add users to a group that already has groups in it!");
//     }
// };

Group.prototype.addUser = function (userToAdd) {
    if (this.groupChilds.length === 0){
        let check = 0;
        let subs;
        for (let i = 0; i < this.groupUsers.users.length; i++) {
            if(this.groupUsers.users[i].getUsername() === userToAdd.getUsername()){
                check = 1;
                console.log("User is already exist!")
            }
        }
        if (check === 0) {
            this.groupUsers.users.push(userToAdd);
            console.log("User added to group successfully!");
        }
    }
    else{
        console.log("Can't add users to a group that already has groups in it!");
    }
};



Group.prototype.getAllUsers = function () {
    let age;
    let name;
    for (let i=0; i<this.groupUsers.users.length; i++){
        name = this.groupUsers.users[i].getUsername();
        age = this.groupUsers.users[i].getAge();
        console.log("--- ", name,"(", age, ")");
    }
};

Group.prototype.removeUser = function (username) {
    let check = 0;
    for (let i = 0; i < this.groupUsers.users.length; i++){
        if (this.groupUsers.users[i].getUsername()===username.getUsername()){
            check = 1;
            this.groupUsers.users.splice(i , 1);
            console.log("User has been deleted successfully!");
            break;
        }
    }
    if (check===0){
        console.log("User doesn't exist in this group!");
    }
};

Group.prototype.searchTree = function(groupToSearch, matchingTitle){
    if(groupToSearch.getGroupName() === matchingTitle){
        return groupToSearch;
    }
    else if (groupToSearch.groupChilds.length !== 0){
        var i;
        var result = null;
        for(i=0; result == null && i < groupToSearch.groupChilds.length; i++){
            result = this.searchTree(groupToSearch.groupChilds[i], matchingTitle);
        }
        return result;
    }
    return false;
};


Group.prototype.removeGroupByName = function(groupName){
    let index = this.groupChilds.findIndex(g => g.getGroupName() ===groupName);
    if(index> -1){
        this.groupChilds.splice(index, 1);
        console.log(`${groupName} removed from ${this.getGroupName()}`);
    }
    else{
        this.groupChilds.forEach(child => child.removeGroupByName(groupName));
    }
};

module.exports = Group;