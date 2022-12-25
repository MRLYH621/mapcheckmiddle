let express = require('express')
let app = express()
const bodyParser = require("body-parser");
let path = require('path')
let fs = require('fs')
const util = require('util')
let process = require("./process")
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据

app.use(express.json({ extended: true, limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
let multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + 'image')
    },
    filename: function (req, file, cb) {
        let suffix = path.extname(file.originalname)
        cb(null, Date.now() + suffix)
    }
})
const upload = multer({ storage: storage })

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/name', async function (req, res) {
    // let data = await axios.get("http://172.17.0.5:5000/test1")
    //  let data = await axios.get("http://127.0.0.1:3000/name")
    // let data= await  process.getData()
    res.status(200).send({
        // testdata: data ? `${data}` : '',
        data: { 'name': 'liyuang13333' },
        message: '123'
    })

})
app.post('/upload', upload.single('file'), function (req, res) {

    let file = req.file
    console.log(file)

    const imageData = fs.readFileSync(file.path)
    const imageBase64 = imageData.toString("base64")
    const imgaePreifx = `data:${file.mimetype};base64,`
    res.status(200).send({
        args: {},
        data: "",
        files: {
            file: `${imgaePreifx}${imageBase64}`
        },
        form: {},
        header: {},
        json: null,
        origin: "",
        url: ""
    })
})
app.post('/sendImage', function (req, res) {

    let { fileList } = req.body
    // const res1 = process.sendImage({ fileList: fileList })

    setTimeout(() => {
        res.status(200).send({
            message: '上传成功',
            code: 20000,
            files: {
                file: `${fileList}`
            },

        })
    }, 1000)

})
app.listen(3389, function (
) {
    console.log(123)
})