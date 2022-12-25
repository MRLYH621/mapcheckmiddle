let request = require("./request");
module.exports.getData = function () {
    return request.service({
        url: 'name',
        method: 'get'
    })
}
module.exports.sendImage = function (data) {
    return request.service({
        url: 'sendImage',
        method: 'post',
        data
    })
}