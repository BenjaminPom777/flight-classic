const moment = require("moment");

function mysqlDatetimeToHtmlDatetimeLocal(dateTime) {    
    // YYYY - MM - DDThh: mm
    return moment(dateTime).format('YYYY-MM-DDTHH:mm');
}


function htmlDatetimeLocalToMysqlDatetime(htmlDatetimeLocal) {
    // Assuming htmlDatetimeLocal is a string in 'YYYY-MM-DDTHH:MM' format
    // YYYY - MM - DD hh: mm: ss
    return moment(htmlDatetimeLocal).format('YYYY-MM-DD hh:mm:ss');
}


module.exports ={
    mysqlDatetimeToHtmlDatetimeLocal,
    htmlDatetimeLocalToMysqlDatetime
}
