
module.exports = {
    deleteOne: deleteUser,
    deleteAll: deleteAllUsers,
    index: indexUsers,
    retrieve: retrieveUser,
    create: createUser,
    update: updateUser
}

function deleteAllUsers (req, res) {
    return "deleteAll"
}

function deleteUser (req, res) {
    return "deleteone"
}

function indexUsers (req, res) {
    return "index"
}

function retrieveUser (req, res) {
    return "retrieve"
}

function createUser (req, res) {
    return "create"
}

function updateUser (req, res) {
    return "update"
}
