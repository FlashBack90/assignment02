const Group = require('./Group');

function Groups() {
    this.groups = [];
    this.root = new Group('root');
}

Groups.prototype.getGroupName = function(groupId){
    return this.groups[groupId].getGroupName();
};

Groups.prototype.addGroup = function (groupName) {
    let newGroup = new Group(groupName);
    let check = 0;
    for (let i = 0; i<this.groups.length; i++) {
        if (this.groups[i].getGroupName()===groupName.getGroupName()) { ///Make sure it's necessary
            check = 1;
            console.log("This name already exist!");
            break;
        }
    }
    if (check === 0){
        this.groups.push(newGroup);
        console.log("Group has been added successfully!");
        // console.log("Id is: " , newGroup.id);
    }
};

Groups.prototype.removeGroup = function (groupName) {
  let check = 0;
  for (let i = 0;i<this.groups.length;i++) {
      if(groupName===this.groups[i].getGroupName()) {
          check = 1;
          this.groups.splice(i, 1);
          console.log("Group has been deleted successfully!");
          break;
      }
  }
  if (check===0){
      console.log("Couldn't find group name!");
  }
};

Groups.prototype.getAllGroups = function () {
    if (this.groups.length===0) console.log("There are no groups!");
    else {
        for (let i = 0; i < this.groups.length; i++) {
            console.log(this.groups[i].getGroupName());
        }
    }
};

Groups.prototype.addUserToGroup = function (userToAdd,groupname){
    //let check = 0;
    let group = this.groups[0].searchTree(this.groups[0], groupname);
    if(group) group.addUser(userToAdd);
    else console.log("Group doesn't exist!");
    // for (let i =0; i<this.groups.length; i++){
    //     if(this.groups[i].getGroupName()===groupname){
    //         check = 1;
    //         this.groups[i].addUser(username, age);
    //     }
    // }
    //if (check===0) console.log("Group doesn't exist!");
};

Groups.prototype.removerUserFromGroup = function(username, groupname){
    if (groupname!=='any') {
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].getGroupName() === groupname) {
                for (let j = 0; j < this.groups[i].groupUsers.users.length; j++) {
                    let subs = this.groups[i].groupUsers.users[j].toString();
                    let name = subs.substring(0, subs.indexOf(","));
                    console.log(name);
                    if (name === username) {
                        this.groups[i].removeUser(username);
                        break;
                    }
                    else {
                        console.log("User does not exist in this group!");
                    }

                }
            }
        }
    }
    else{
        for (let i = 0; i<this.groups.length; i++){
            if(this.groups[i].removeUser(username)) console.log("User has been deleted from the group ", this.groups[i].getGroupName(), "!");
        }
    }
};

Groups.prototype.showAllGroupsAndUsers = function(){
    if(this.groups.length===0) console.log("There are no groups at all!");
    else {
        for (let i = 0; i < this.groups.length; i++) {
            console.log(this.groups[i].getGroupName());
            if(this.groups[i].groupChilds.length!==0){
                let j = 0;
                while(j<this.groups[i].groupChilds.length){
                    console.log("------", this.groups[i].groupChilds[j].getGroupName());
                    j++;
                }
            }
            this.groups[i].getAllUsers();
        }
    }
};

Groups.prototype.checkIfExist = function(parent, groupName) {
    let flag = 0;
    var check = null;
    for (let i = 0; i<this.groups.length; i++){
        check = this.groups[i].searchTree(this.groups[i], parent);
        if(check !== null){
            flag = 1;
            check.addChildren(groupName);
            break;
        }
    }
    if (flag===0) console.log("Could not find parent's name!");
};

Groups.prototype.getAssociated = function(name){
    if (this.groups.length === 0) console.log("No groups available!");
    else {
        let flag = 0;
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].getUser(i) === name) {
                console.log("User found in group: ", this.groups[i].getGroupName());
                flag = 1;
            }
        }
        if (flag === 0) console.log("User was not found in any group!");
    }
};

Groups.prototype.hasUsers = function(groupname){
    for(let i = 0; i<this.groups.length; i++){
        if(this.groups[i].getGroupName()===groupname) {
            console.log(this.groups[i].groupUsers.users.length);
            return(this.groups[i].groupUsers.users.length!==0);
        }
    }
    };

Groups.prototype.displayAll = function(groupsArr){
    if(groupsArr.length===0) console.log("");
    else {
        let numOfChilds = 0;
        let root = groupsArr[0];
        let printDepth = "-";
        recurse(root);

        function recurse(root) {
            numOfChilds = root.groupChilds.length + root.groupUsers.users.length;
            printDepth += "-";
            if(root.groupUsers.users.length>0){
                console.log(printDepth + root.getGroupName() +  "(" + numOfChilds + ")");
                root.getAllUsers();
            }
            else console.log(printDepth + root.getGroupName() +  "(" + numOfChilds + ")");
            for (let child in root.groupChilds) {
                recurse(root.groupChilds[child]);
            }
            printDepth = printDepth.slice(0, -1);
        }
    }
};

Groups.prototype.removeGroupByName = function(groupName){
    if(this.groups[0].groupChilds.length===0 && this.groups[0].groupUsers.users.length===0 && this.groups[0].getGroupName()===groupName){
        this.removeGroup(groupName);
    }
   else this.groups[0].removeGroupByName(groupName);
};

module.exports = Groups;

