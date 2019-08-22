const APIError = require('../rest').APIError;
const fs = require('fs');
const formidable = require('koa-formidable'); // 图片处理
const path = require('path');


// banner图片上传
var add_banner_img = async (ctx, next) => {
    var form = formidable.parse(ctx.request);
    var p = new Promise((resolve, reject) => {
        form((opt, obj) => {
            var file = obj.files.file;
            var filename = file.name;

            fs.renameSync(file.path, "uploads/banner/" + filename);

            return resolve('上传成功')
        })
    })
    var body = await p;
    ctx.rest({
        data:{
            code: 200,
            msg: typeof body === 'undefined' ? '上传失败':'上传成功'
        }
    })
    await next();
}
// 获取所有的banner图片
var get_all_banner = async (ctx, next) => {

    let files = fs.readdirSync("uploads/banner/").filter((f) => {
        return f.endsWith('.jpg') || f.endsWith('.png')
    })

    let content = files.map(item => ('http://localhost:4000/uploads/banner/'+item));
   
    ctx.rest({
        data: {
            code: 200,
            msg: content.length > 0 ? content: '图片还未上传'
        }
    })

    await next();
}

module.exports = {
    'POST /api/upload_banner': add_banner_img,
    'POST /api/get_all_banner': get_all_banner
}