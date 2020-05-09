const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    login: String,
    pass: String,
    api: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", usersSchema);
// const USERS = [{"login":"admin","pass":"qwe", "api":"91665adb3dd17bb4171ca8dc95f499d511849da9"}];
// let ID = USERS.length;

// module.exports = class User{

//     constructor(login, pass){
//         this.login = login;
//         this.pass = pass;
//         this.api = sha1(++ID);
//     }
//     save(){
//         USERS.push(this);
//     }
//     static getUser(api){
//         return USERS.find((user) => user.api === api);
//     }
//     static updateUser(api,params){
//         const user = User.getUser(api);
//         Object.assign(user,params);
//         return user;
//     }
//     static deleteUser(api){
//         const index = USERS.findIndex((user) => user.api === api);
//         USERS.splice(index,1);
//         return api;
//     }
//     static getAll(){
//         return USERS;
//     }
// }
