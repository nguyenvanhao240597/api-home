function check_Null(value_check) {
    if(value_check == "" || value_check == "undefined" || value_check == undefined || value_check == null || value_check == "NULL" || value_check == "null"){
        return true;
    }
    return false;
}
module.exports.check_Null = check_Null;