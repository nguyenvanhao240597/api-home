var mysql = require("mysql2/promise");
var fs = require('fs');
var fc = require("./funcComm.js");
//const xlsx = require("xlsx");
var path = require('path');
const mybatisMapper = require('mybatis-mapper');
var fm = { language: 'sql', indent: '  ' };
const moment = require('moment');
const crypto = require("crypto");
const { count } = require("console");
var pool = null;
//DB
function settingDb(poolConnect) {
    pool = poolConnect;

    //console.log("setting DB");

    mybatisMapper.createMapper(['./sql-exerciseH1.xml']);


    fc.settingDb(pool);

}
module.exports.settingDb = settingDb;

function check_Null(value_check) {
    if(value_check == "" || value_check == "undefined" || value_check == undefined || value_check == null || value_check == "NULL" || value_check == "null"){
        return true;
    }
}

async function exerciseH1_member_group_add_post(req, res) {
    
    // add py_member_log
    const member_log_nm= req.body.member_log_nm;
    const content = req.body.content; 
    const member_grp_nm = req.body.member_grp_nm;
    const ip = req.ip;
    if (check_Null(member_log_nm) == true){
        return res.send({ success: "err", response: `member_log_nm is empty!` })
    };
    if (check_Null(content) == true){
        return res.send({ success: "err", response: `content is empty!` })
        
    };
    // add py_member_grp
    
    if (check_Null(member_grp_nm) == true){
        return res.send({ success: "err", response: `member_grp_nm is empty!` })
        
    };
    if (check_Null(ip) == true){
        return res.send({ success: "err", response: `ip is empty!` })
        
    };

    // check member_log_nm
    if (member_log_nm != 'Add group')
    {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "!Add group", errorCode: 0, data: [] }));
        return;
    }


    if (member_log_nm == 'Add group') {
        var sql ="";
        var sql_log ="";
        
        //const reg_date = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(content + member_log_nm);
        var param ={};

        param.member_grp_nm = member_grp_nm;
        param.ip = ip;

        param.content = content;
        param.member_log_nm = member_log_nm;

        //param.reg_date= reg_date;
        
        // add member_grp_nm
        sql = mybatisMapper.getStatement('exercise', 'add_py_member_grp', param, fm);
        await pool.query(sql);

        // add member_log_nm
        sql_log = mybatisMapper.getStatement('exercise', 'add_py_member_log', param, fm);
        await pool.query(sql_log);

        res.send('Insert success!')
    }

}
module.exports.exerciseH1_member_group_add_post =  exerciseH1_member_group_add_post;




async function exerciseH1_member_group_update_put(req, res) {
    const member_grp_cd= req.body.member_grp_cd;
    const member_grp_nm = req.body.member_grp_nm;
    const ip = req.ip;
    const member_log_nm= req.body.member_log_nm;
    const content = req.body.content; 

    // check member_grp_cd
    if(member_grp_cd == null || member_grp_cd == "" || member_grp_cd == "undefined" || member_grp_cd == undefined || isNaN(member_grp_cd) == true)
    {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "err!", response: `member_grp_cd!` ,errorCode: 0, data: [] }));
        return;
    }

    // check update py_member_log
    if (check_Null(member_log_nm) == true){
        return res.send({ success: "err", response: `member_log_nm is empty!` })
    }
    if (check_Null(content) == true){
        return res.send({ success: "err", response: `content is empty!` })

    };

    // check update py_member_grp

    if (check_Null(member_grp_nm) == true){
        return res.send({ success: "err", response: `member_grp_nm is empty!` })

    };
    if (check_Null(ip) == true){
        return res.send({ success: "err", response: `ip is empty!` })
        
    };

    // check member_log_nm
    if (member_log_nm != 'Update group')
    {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "!Update group", errorCode: 0, data: [] }));
        return;
    }
   

    if (member_log_nm == 'Update group') {
        var sql ="";
        var sql_log ="";
        
        //const reg_date = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(content + member_log_nm);
        var param ={};
        param.member_grp_cd = member_grp_cd;
        param.member_grp_nm = member_grp_nm;
        param.ip = req.ip;

        param.member_log_nm = member_log_nm;
        param.content= content;
        
        //param.reg_date= reg_date;
        //console.log(reg_date);
        sql = mybatisMapper.getStatement('exercise', 'update_py_member_grp', param, fm);
        await pool.query(sql);
        sql_log = mybatisMapper.getStatement('exercise', 'add_py_member_log', param, fm);
        await pool.query(sql_log);

        res.send('Update success!')
    }

}
module.exports.exerciseH1_member_group_update_put =  exerciseH1_member_group_update_put;

async function insert_py_member_log(log_nm, log_content) {
    // check py_member_log
    if (check_Null(log_nm) == true){
        return res.send({ success: "err", response: `member_log_nm is empty!` })
    }
    if (check_Null(log_content) == true){
        return res.send({ success: "err", response: `content is empty!` })

    };
    var param ={};
    param.member_log_nm = log_nm;
    param.content = log_content;
    var sql_log ="";
    sql_log = mybatisMapper.getStatement('exercise', 'add_py_member_log', param, fm);
    await pool.query(sql_log);
    console.log(sql_log);
    
}
module.exports.insert_py_member_log =  insert_py_member_log;

async function exerciseH1_member_add_post(req, res) {

    // add member_log
    const member_log_nm= req.body.member_log_nm;
    const content = req.body.content; 
    if (check_Null(member_log_nm) == true){
        return res.send({ success: "err", response: `member_log_nm is empty!` })
    }
    if (check_Null(content) == true){
        return res.send({ success: "err", response: `content is empty!` })
    }


    // check member_log_nm
    if (member_log_nm != "Add member")
    {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "!Add member", errorCode: 0, data: [] }));
        return;
    }

    // add member
    const user_id = req.body.user_id;
    const passwd = req.body.passwd;
    const user_nm = req.body.user_nm;
    var phone = req.body.phone;
    var address = req.body.address;
    var email = req.body.email;
    var ip = req.ip;
    const member_grp_cd = req.body.member_grp_cd;


    //check
    if (check_Null(user_id) == true){
        return res.send({ success: "err", response: `user_id is empty!` })
    }
     if (check_Null(passwd) == true){
        return res.send({ success: "err", response: `passwd is empty!` })
    }
    if (check_Null(user_nm) == true){
        return res.send({ success: "err", response: `user_nm is empty!` })
    }
    if (check_Null(phone) == true) phone ="";
    if (check_Null(address) == true) address ="";
    if (check_Null(email) == true) email ="";
    if (check_Null(ip) == true) ip ="";
    if (check_Null(member_grp_cd) == true){
        return res.send({ success: "err", response: `member_grp_cd is empty!` })
    }
    

    //Mã hóa password
    var sql ="";
    var passhash = crypto.createHash('md5').update(passwd).digest("hex");

    var param ={};

    param.user_id = user_id;
    param.passwd = passhash;
    param.user_nm = user_nm;
    param.phone = phone;
    param.address = address;
    param.email = email;
    param.ip = ip;
    param.member_grp_cd = member_grp_cd;

    sql = mybatisMapper.getStatement('exercise', 'add_py_member', param, fm);

    await pool.query(sql);
    insert_py_member_log(member_log_nm, content);
    res.send('Add member success!')
    

}
module.exports.exerciseH1_member_add_post =  exerciseH1_member_add_post;

async function exerciseH1_member_update_put(req, res) {
    
    //check add member_log
    var member_log_nm= req.body.member_log_nm;
    var content = req.body.content; 
    if (check_Null(member_log_nm) == true){
        return res.send({ success: "err", response: `member_log_nm is empty!` })
    }
    if (check_Null(content) == true){
        return res.send({ success: "err", response: `content is empty!` })
    }


    // check member_log_nm
    if (member_log_nm != "Update member")
    {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "!Update member", errorCode: 0, data: [] }));
        return;
    }



    const cust_seq = req.body.cust_seq;
    var user_id = req.body.user_id;
    var passwd = req.body.passwd;
    var user_nm = req.body.user_nm;
    var phone = req.body.phone;
    var address = req.body.address;
    var email = req.body.email;
    var ip = req.ip;
    var member_grp_cd = req.body.member_grp_cd;

    //check
    if (check_Null(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq is empty!` })
    }
    if (check_Null(user_id) == true){
        return res.send({ success: "err", response: `user_id is empty!` })
    }
     if (check_Null(passwd) == true){
        return res.send({ success: "err", response: `passwd is empty!` })
    }
    if (check_Null(user_nm) == true){
        return res.send({ success: "err", response: `user_nm is empty!` })
    }
    if (check_Null(phone) == true) phone ="";
    if (check_Null(address) == true) address ="";
    if (check_Null(email) == true) email ="";
    if (check_Null(ip) == true) ip ="";
    if (check_Null(member_grp_cd) == true){
        return res.send({ success: "err", response: `member_grp_cd is empty!` })
    }

    //Mã hóa password
    var passhash = crypto.createHash('md5').update(passwd).digest("hex");
    
    var sql ="";
    var param ={};
    param.user_id = user_id;
    param.passwd = passhash;
    param.user_nm = user_nm;
    param.phone = phone;
    param.address = address;
    param.email = email;
    param.ip = ip;
    param.member_grp_cd = member_grp_cd;
    param.cust_seq = cust_seq;

    sql = mybatisMapper.getStatement('exercise', 'update_py_member', param, fm);
    console.log(sql)
    await pool.query(sql);
    insert_py_member_log(member_log_nm, content);
    res.send(`Update member ${cust_seq} success!`)

}
module.exports.exerciseH1_member_update_put =  exerciseH1_member_update_put;



async function exerciseH1_member_delete(req, res) {
    
    //check add member_log
    var member_log_nm= req.body.member_log_nm;
    var content = req.body.content; 
    if (check_Null(member_log_nm) == true){
        return res.send({ success: "err", response: `member_log_nm is empty!` })
    }
    if (check_Null(content) == true){
        return res.send({ success: "err", response: `content is empty!` })
    }


    // check member_log_nm
    if (member_log_nm != "Delete member")
    {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "!Delete member", errorCode: 0, data: [] }));
        return;
    }
    
    
    
    var sql ="";
    const use_yn = req.body.use_yn;
    var param ={};
    param.use_yn = use_yn;
    console.log(use_yn);

    
    var  sql_count =  mybatisMapper.getStatement('exercise', 'count_py_member_xx', param, fm);
    let [sql_countN] = await pool.query(sql_count);
    //console.log(sql_countN);
    var dem = sql_countN[0].number;
    


    sql = mybatisMapper.getStatement('exercise', 'delete_py_member', param, fm);
    //console.log(sql);
    await pool.query(sql);
    insert_py_member_log(member_log_nm, content);
    res.send('Delete group '+ use_yn +' member ' + dem +' number')

}
module.exports.exerciseH1_member_delete =  exerciseH1_member_delete;




async function exerciseH1_member_select(req, res) {

    var sql ="";
    sql = mybatisMapper.getStatement('exercise', 'select_py_member_top5desc', fm);
    
    var [row] = await pool.query(sql);

    //js = row[0];
    
    //res.send(row);

     res.set({
         'content-type': 'application/json'
     }).send(JSON.stringify({ success: true, message: "", errorCode: 0, data: row }));

}
module.exports.exerciseH1_member_select =  exerciseH1_member_select;




