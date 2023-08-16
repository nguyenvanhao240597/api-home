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
var check = require("./exercise.js");
//DB
function settingDb(poolConnect) {
    pool = poolConnect;

    //console.log("setting DB");

    mybatisMapper.createMapper(['./sql-exerciseH2.xml']);


    fc.settingDb(pool);

}
module.exports.settingDb = settingDb;

//-----------py_category----------------------------------

async function exerciseH2_category_insert_post(req, res) {
    const category_name = req.body.category_name;
    if (check.check_Null(category_name) == true){
        return res.send({ success: "err", response: `category_name is empty!` })
    }

    var param ={};
    param.category_name = category_name;

    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'add_category', param, fm);
    await pool.query(sql);
    console.log(sql);
    res.send('Insert success!')
}
module.exports.exerciseH2_category_insert_post =  exerciseH2_category_insert_post;

async function exerciseH2_category_update_put(req, res) {
    const cust_seq = req.body.cust_seq;
    const category_name = req.body.category_name;
    //check
    if(cust_seq == null || cust_seq == "" || cust_seq == "undefined" || cust_seq == undefined || isNaN(cust_seq) == true)
    {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "err!", response: `cust_seq!` ,errorCode: 0, data: [] }));
        return;
    }
    if (check.check_Null(category_name) == true){
        return res.send({ success: "err", response: `category_name is empty!` })
    }
    var param ={};
    param.cust_seq = cust_seq;
    param.category_name = category_name;

    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'update_category', param, fm);
    await pool.query(sql);
    console.log(sql);
    res.send('Update success!')
}
module.exports.exerciseH2_category_update_put =  exerciseH2_category_update_put;





async function exerciseH2_category_delete(req, res) {
    const cust_seq = req.body.cust_seq;
    //check
    if(cust_seq == null || cust_seq == "" || cust_seq == "undefined" || cust_seq == undefined || isNaN(cust_seq) == true)
    {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "err!", response: `cust_seq!` ,errorCode: 0, data: [] }));
        return;
    }

    var param ={};
    param.cust_seq = cust_seq;
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'delete_category', param, fm);
    await pool.query(sql); 
    console.log(sql);
    res.send(`Delete ${cust_seq} success!`)

}
module.exports.exerciseH2_category_delete =  exerciseH2_category_delete;



async function exerciseH2_category_get(req, res) {
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'read_category', fm);
    var [js] = await pool.query(sql); 

    if (js == null || js.length == 0) {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "empty data", errorCode: 0, data: [] }));
        return;
    }

    console.log(js);

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({ success: true, message: "", errorCode: 0, data: js }));

}
module.exports.exerciseH2_category_get =  exerciseH2_category_get;


//-----------py_product----------------------------------


async function exerciseH2_product_insert_post(req, res) {
    // req.body
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_content = req.body.product_content;
    const product_cate = req.body.product_cate;
    // check
    if (check.check_Null(product_name) == true){
        return res.send({ success: "err", response: `product_name is empty!` })
    }
    if (check.check_Null(product_price) == true){
        return res.send({ success: "err", response: `product_price is empty!` })
    }
    if (check.check_Null(product_content) == true){
        return res.send({ success: "err", response: `product_content is empty!` })
    }
    if (check.check_Null(product_cate) == true){
        return res.send({ success: "err", response: `product_cate is empty!` })
    }

    if (isNaN(product_price) == true){
        return res.send({ success: "err", response: `product_price isNaN!` })
    }

    if (isNaN(product_cate) == true){
        return res.send({ success: "err", response: `product_cate isNaN!` })
    }

    var param ={};
    param.product_name = product_name
    param.product_price = product_price
    param.product_content = product_content
    param.product_cate = product_cate
    
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'add_product', param, fm);
    await pool.query(sql);
    console.log(sql);
    res.send('Insert success!')

}
module.exports.exerciseH2_product_insert_post =  exerciseH2_product_insert_post;




async function exerciseH2_product_update_put(req, res) {
    // req.body
    const cust_seq = req.body.cust_seq;
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_content = req.body.product_content;
    const product_cate = req.body.product_cate;
    // check
    if (check.check_Null(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq is empty!` })
    }
    if (check.check_Null(product_name) == true){
        return res.send({ success: "err", response: `product_name is empty!` })
    }
    if (check.check_Null(product_price) == true){
        return res.send({ success: "err", response: `product_price is empty!` })
    }
    if (check.check_Null(product_content) == true){
        return res.send({ success: "err", response: `product_content is empty!` })
    }
    if (check.check_Null(product_cate) == true){
        return res.send({ success: "err", response: `product_cate is empty!` })
    }
    if (isNaN(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq isNaN!` })
    }
    if (isNaN(product_price) == true){
        return res.send({ success: "err", response: `product_price isNaN!` })
    }
    if (isNaN(product_cate) == true){
        return res.send({ success: "err", response: `product_cate isNaN!` })
    }
    var param ={}
    param.cust_seq = cust_seq;
    param.product_name = product_name;
    param.product_price = product_price;
    param.product_content = product_content;
    param.product_cate = product_cate;
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'update_product', param, fm);
    await pool.query(sql);
    console.log(sql);
    res.send('Update success!')

}
module.exports.exerciseH2_product_update_put =  exerciseH2_product_update_put;



async function exerciseH2_product_delete(req, res) {
    const cust_seq = req.body.cust_seq;
    // check
    if (check.check_Null(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq is empty!` })
    }
    if (isNaN(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq isNaN!` })
    }

    var param ={}
    param.cust_seq = cust_seq;
 
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'delete_product', param, fm);
    await pool.query(sql);
    console.log(sql); 
    res.send('Delete success!')
}
module.exports.exerciseH2_product_delete =  exerciseH2_product_delete;

 

async function exerciseH2_product_get(req, res) {
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'read_product', fm);
    var [js] = await pool.query(sql); 

    if (js == null || js.length == 0) {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "empty data", errorCode: 0, data: [] }));
        return;
    }

    console.log(js);

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({ success: true, message: "", errorCode: 0, data: js }));
}
module.exports.exerciseH2_product_get =  exerciseH2_product_get;


//-----------py_sales----------------------------------
async function exerciseH2_sales_insert_post(req, res) {
    const title = req.body.title;
    const sale_number = req.body.sale_number;
    
    // check
    if (check.check_Null(title) == true){
        return res.send({ success: "err", response: `title is empty!` })
    }
    if (check.check_Null(sale_number) == true){
        return res.send({ success: "err", response: `sale_number is empty!` })
    }
    if (isNaN(sale_number) == true){
        return res.send({ success: "err", response: `sale_number isNaN!` })
    }

    var param ={}
    param.title = title;
    param.sale_number = sale_number;

    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'add_sales', param, fm);
    await pool.query(sql);
    console.log(sql);
    res.send('Insert success!')


}
module.exports.exerciseH2_sales_insert_post =  exerciseH2_sales_insert_post;



async function exerciseH2_sales_update_put(req, res) {
    const cust_seq = req.body.cust_seq;
    const title = req.body.title;
    const sale_number = req.body.sale_number;
    
    // check
    if (check.check_Null(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq is empty!` })
    }
    if (check.check_Null(title) == true){
        return res.send({ success: "err", response: `title is empty!` })
    }
    if (check.check_Null(sale_number) == true){
        return res.send({ success: "err", response: `sale_number is empty!` })
    }
    if (isNaN(sale_number) == true){
        return res.send({ success: "err", response: `sale_number isNaN!` })
    }
    if (isNaN(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq isNaN!` })
    }

    var param ={};
    param.cust_seq = cust_seq;
    param.title = title; 
    param.sale_number = sale_number;
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'update_sale', param, fm);
    await pool.query(sql); 
    console.log(sql);
    res.send(`Update success!`)

}
module.exports.exerciseH2_sales_update_put =  exerciseH2_sales_update_put;



async function exerciseH2_sales_delete(req, res) {
    
    const cust_seq = req.body.cust_seq;
    // check
    if (check.check_Null(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq is empty!` })
    }
    if (isNaN(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq isNaN!` })
    }

    var param ={}
    param.cust_seq = cust_seq;
 
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'delete_sale', param, fm);
    await pool.query(sql);
    console.log(sql); 
    res.send('Delete success!')
}
module.exports.exerciseH2_sales_delete =  exerciseH2_sales_delete;




async function exerciseH2_sales_get(req, res) {
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'read_sale', fm);
    var [js] = await pool.query(sql); 

    if (js == null || js.length == 0) {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "empty data", errorCode: 0, data: [] }));
        return;
    } 
    
    console.log(js);

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({ success: true, message: "", errorCode: 0, data: js }));

}
module.exports.exerciseH2_sales_get =  exerciseH2_sales_get;


//-----------py_sales_category----------------------------------

async function exerciseH2_sales_category_insert_post(req, res) {
    
    const category_cust_seq = req.body.category_cust_seq;
    const sale_cust_seq = req.body.sale_cust_seq;
    
    // check
    if (check.check_Null(category_cust_seq) == true){
        return res.send({ success: "err", response: `category_cust_seq is empty!` })
    }
    if (check.check_Null(sale_cust_seq) == true){
        return res.send({ success: "err", response: `sale_cust_seq is empty!` })
    }
    if (isNaN(category_cust_seq) == true){
        return res.send({ success: "err", response: `category_cust_seq isNaN!` })
    }
    if (isNaN(sale_cust_seq) == true){
        return res.send({ success: "err", response: `sale_cust_seq isNaN!` })
    }

    var param ={}
    param.category_cust_seq = category_cust_seq;
    param.sale_cust_seq = sale_cust_seq;

    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'add_sale_cust_seq', param, fm);
    await pool.query(sql);
    console.log(sql);
    res.send('Insert success!')
}
module.exports.exerciseH2_sales_category_insert_post =  exerciseH2_sales_category_insert_post;




async function exerciseH2_sales_category_update_put(req, res) {

    const cust_seq = req.body.cust_seq;
    const category_cust_seq = req.body.category_cust_seq;
    const sale_cust_seq = req.body.sale_cust_seq;

    
    // check
    if (check.check_Null(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq is empty!` })
    }
    if (check.check_Null(category_cust_seq) == true){
        return res.send({ success: "err", response: `category_cust_seq is empty!` })
    }
    if (check.check_Null(sale_cust_seq) == true){
        return res.send({ success: "err", response: `sale_cust_seq is empty!` })
    }    
    if (isNaN(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq isNaN!` })
    }
    if (isNaN(sale_cust_seq) == true){
        return res.send({ success: "err", response: `sale_cust_seq isNaN!` })
    }
    if (isNaN(category_cust_seq) == true){
        return res.send({ success: "err", response: `category_cust_seq isNaN!` })
    }

    var param ={};
    param.cust_seq = cust_seq;
    param.category_cust_seq = category_cust_seq; 
    param.sale_cust_seq = sale_cust_seq;
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'update_sale_category', param, fm);
    await pool.query(sql); 
    console.log(sql);
    res.send(`Update success!`)
}
module.exports.exerciseH2_sales_category_update_put =  exerciseH2_sales_category_update_put;





async function exerciseH2_sales_category_delete(req, res) {

    const cust_seq = req.body.cust_seq;
    // check
    if (check.check_Null(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq is empty!` })
    }
    if (isNaN(cust_seq) == true){
        return res.send({ success: "err", response: `cust_seq isNaN!` })
    }

    var param ={}
    param.cust_seq = cust_seq;
 
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'delete_sale_category', param, fm);
    await pool.query(sql);
    console.log(sql); 
    res.send('Delete success!')


}
module.exports.exerciseH2_sales_category_delete =  exerciseH2_sales_category_delete;






async function exerciseH2_sales_category_get(req, res) {
    var sql ="";
    sql = mybatisMapper.getStatement('exerciseH2', 'read_sales_category', fm);
    var [js] = await pool.query(sql); 

    if (js == null || js.length == 0) {
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({ success: false, message: "empty data", errorCode: 0, data: [] }));
        return;
    }
    console.log(js);

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({ success: true, message: "", errorCode: 0, data: js }));

}
module.exports.exerciseH2_sales_category_get =  exerciseH2_sales_category_get;


//------------------------------------------------------------------------------
async function exerciseH2(req, res) {


}
module.exports.exerciseH2 =  exerciseH2;
