// Maybe change to database later
const users = [];

function userJoin(id, username, color){
    const user = {id, username, color};
    users.push(user);
    return user;
}

function getCurrentUser(id){
    return users.find((user)=> user.id == id);
}

module.exports = {
    userJoin,
    getCurrentUser
};