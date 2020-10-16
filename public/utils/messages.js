const moment = require('moment');
const formatColor = require('./colors');

function formatMssg(username, color, mssg){
    return{
        username,
        color: formatColor(color),
        mssg,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMssg;