const formidable = require('koa-formidable'); // 图片处理
const path = require('path');
const fs = require('fs');

// 新建文件，可以去百度fs模块
let mkdirs = (dirname, callback)=> {
    fs.exists(dirname, function(exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function() {
                fs.mkdir(dirname, callback);
            });
        }
    });
};

var uploadImg = (ctx) => {
    var form = formidable.parse(ctx.request);

    return new Promise((resolve, reject) => {
        form((opt, {fields, files})=> {
            let url = fields.url;
            let articleId = fields.articleId;
            let filename = files.file.name;
            console.log(files.file.path);
            let uploadDir = 'public/upload/';
            let avatarName = Date.now() + '_' + filename;
            mkdirs('public/upload', function() {
                fs.renameSync(files.file.path, uploadDir + avatarName); //重命名
                resolve(config[env].host + '/' + uploadDir + avatarName)
                // http://localhost:6001/public/upload/1513523744257_WX20171205-150757.png
            })
        })
    })
}

module.exports = uploadImg;