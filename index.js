var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');
const session = require('express-session');
var mysql = require("mysql2/promise");
var fs = require('fs');
var randomstring = require("randomstring");
var urlencode = require("urlencode");
var log4js = require("log4js");
const spdy = require("spdy")
require("date-util")
var multer = require("multer");
var cors = require("cors")
var upload = multer({dest: 'html/uploads/'});
var fileUpload = require("./multer");
//설정 정보
const configFile = fs.readFileSync('./config.json', 'utf8');
const config = JSON.parse(configFile);

var requestIp = require('request-ip');
var app = express();
app.use(compression({filter: shouldCompress}));

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
}
app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '100mb'}));
app.use(session({
    secret: "/dA43fnfe21Nme2ADR2jQ==",
    resave: false,
    saveUninitialized: false
}))
app.use(cors())
//���� port ���� �� ����

app.listen( 3011, '0.0.0.0', function () {
    console.log('Server started: ' + ( 3010));

})
app.use(requestIp.mw())

function getExtension(filename) {
    return filename.split('.').pop();
}

var pool = mysql.createPool(config.dbSetting);
pool.query("set session sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'");





//begin ThemMoi Hao--------------------------------------------------------------------------

//ExerciseH1
var exerciseH1 = require("./exerciseH1");
exerciseH1.settingDb(pool)

app.post('/v1.0/member/group/add', function (req, res) {
    console.log('/v1.0/member/group/add - post');
    exerciseH1.exerciseH1_member_group_add_post(req, res);
});
app.put('/v1.0/member/group/update', function (req, res) {
    console.log('/v1.0/member/group/update - put');
    exerciseH1.exerciseH1_member_group_update_put(req, res);
});
app.post('/v1.0/member/add', function (req, res) {
    console.log('/v1.0/member/add - post');
    exerciseH1.exerciseH1_member_add_post(req, res);
});

app.put('/v1.0/member/update', function (req, res) {
    console.log('/v1.0/member/update - put');
    exerciseH1.exerciseH1_member_update_put(req, res);
});

app.delete('/v1.0/member/delete', function (req, res) {
    console.log('/v1.0/member/delete - delete');
    exerciseH1.exerciseH1_member_delete(req, res);
});

app.get('/v1.0/member/select', function (req, res) {
    console.log('/v1.0/member/select - get');
    exerciseH1.exerciseH1_member_select(req, res);
});


//ExerciseH2
var exerciseH2 = require("./exerciseH2");
exerciseH2.settingDb(pool)


//-----------py_category----------------------------------
app.post('/v1.0/category/insert', function (req, res) {
    console.log('/v1.0/category/insert - post');
    exerciseH2.exerciseH2_category_insert_post(req, res);
});

app.put('/v1.0/category/update', function (req, res) {
    console.log('/v1.0/category/update - put');
    exerciseH2.exerciseH2_category_update_put(req, res);
});

app.delete('/v1.0/category/delete', function (req, res) {
    console.log('/v1.0/category/delete - delete');
    exerciseH2.exerciseH2_category_delete(req, res);
});
app.get('/v1.0/category/get', function (req, res) {
    console.log('/v1.0/category/read - get');
    exerciseH2.exerciseH2_category_get(req, res);
});
//xong


//-----------py_product----------------------------------
app.post('/v1.0/product/insert', function (req, res) {
    console.log('/v1.0/product/insert - post');
    exerciseH2.exerciseH2_product_insert_post(req, res);
});

app.put('/v1.0/product/update', function (req, res) {
    console.log('/v1.0/product/update - put');
    exerciseH2.exerciseH2_product_update_put(req, res);
});

app.delete('/v1.0/product/delete', function (req, res) {
    console.log('/v1.0/product/delete - delete'); 
    exerciseH2.exerciseH2_product_delete(req, res);
});
app.get('/v1.0/product/get', function (req, res) {
    console.log('/v1.0/product/read - get');
    exerciseH2.exerciseH2_product_get(req, res);
});
//xong

//-----------py_sales----------------------------------
app.post('/v1.0/sales/insert', function (req, res) {
    console.log('/v1.0/sales/insert - post');
    exerciseH2.exerciseH2_sales_insert_post(req, res);
});

app.put('/v1.0/sales/update', function (req, res) {
    console.log('/v1.0/sales/update - put');
    exerciseH2.exerciseH2_sales_update_put(req, res);
});

app.delete('/v1.0/sales/delete', function (req, res) {
    console.log('/v1.0/sales/delete - delete');
    exerciseH2.exerciseH2_sales_delete(req, res);
});
app.get('/v1.0/sales/get', function (req, res) {
    console.log('/v1.0/sales/read - get');
    exerciseH2.exerciseH2_sales_get(req, res);
});


//-----------py_sales_category----------------------------------
app.post('/v1.0/sales/category/insert', function (req, res) {
    console.log('/v1.0/sales/category/insert - post');
    exerciseH2.exerciseH2_sales_category_insert_post(req, res);
});

app.put('/v1.0/sales/category/update', function (req, res) {
    console.log('/v1.0/sales/category/update - put');
    exerciseH2.exerciseH2_sales_category_update_put(req, res);
});

app.delete('/v1.0/sales/category/delete', function (req, res) {
    console.log('/v1.0/sales/category/delete - delete');
    exerciseH2.exerciseH2_sales_category_delete(req, res);
});
app.get('/v1.0/sales/category/get', function (req, res) {
    console.log('/v1.0/sales/category/read - get');
    exerciseH2.exerciseH2_sales_category_get(req, res);
});
//end ThemMoi Hao----------------------------------------------------------------------------