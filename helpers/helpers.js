function mysqlDatetimeToHtmlDatetimeLocal(dateTime) {
    return new Date(dateTime).toISOString().slice(0, 16)
}


function htmlDatetimeLocalToMysqlDatetime(htmlDatetimeLocal) {
    // Assuming htmlDatetimeLocal is a string in 'YYYY-MM-DDTHH:MM' format
    if (htmlDatetimeLocal) {
        let [date, time] = htmlDatetimeLocal.split('T');
        return `${date} ${time}:00`; // Constructs 'YYYY-MM-DD HH:MM:SS'
    }
    return null;
}


module.exports ={
    mysqlDatetimeToHtmlDatetimeLocal,
    htmlDatetimeLocalToMysqlDatetime
}
