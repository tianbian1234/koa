const model  = require('../model');
const APIError = require('../rest').APIError;
const fs = require('fs');
const formidable = require('koa-formidable'); // 图片处理
const path = require('path');
// const uploadImg = require('../middle/img');

let Blog = model.Blog;

// 添加blog
var add_blog = async (ctx, next) => {
    let _id = ctx.request.body._id,
    title = ctx.request.body.title,
    type = ctx.request.body.type,
    content = ctx.request.body.content;
    let blog = Blog.create({...ctx.request.body})

    ctx.rest({
        data: {
            code: 200,
            msg:'创建blog成功'
        }
    })
    await next();
}
// 获取某种类型的所有的blog
var get_blogs = async (ctx, next) => {
    // let type = ctx.request.body.type;
    let blogs = [];
    blogs = await Blog.findAll();

    ctx.rest({
        data: {
            code: 200,
            msg: blogs
        }
    })

    await next();
}
// 获取某种类型的所有的blog
var get_blogs_by_type = async (ctx, next) => {
    let type = ctx.request.body.type;
    let blogs = [];
    blogs = await Blog.findAll({
        where: {
          type: type
        }
    })

    ctx.rest({
        data: {
            code: 200,
            msg: blogs
        }
    })

}
// 获取单独的某一个blog
var get_signal_blog = async (ctx, next) => {
    let _id = ctx.request.body._id;

    let blog = await Blog.findOne({
        where:{
            _id: _id
        }
    })

    console.log(blog);

    ctx.rest({
        data:{
            code: 200,
            msg: blog
        }
    })

    await next();
}
// 删除blog

var delete_blog = async (ctx, next) => {
    let _id = ctx.request.body._id;

   await Blog.destroy({
        where: {
            id: _id
        }
    }).then(() => {
        ctx.rest({
            data: {
                code: 200,
                msg: '删除blog成功'
            }
        })
    }).catch(() => {
        ctx.rest({
            data: {
                code: 200,
                msg: '删除blog失败'
            }
        })
    })
    await next();
}

// 添加图片上传
var add_img = async (ctx, next) => {
    var form = formidable.parse(ctx.request);
    var p = new Promise((resolve, reject) => {
        form((opt, obj) => {
            var file = obj.files.file;
            var filename = file.name;

            fs.renameSync(file.path, "uploads/" + filename);

            return resolve(filename)
        })
    })
    var body = await p;
    ctx.rest({
        data:{
            code: 200,
            msg: {
                content: typeof body === 'undefined' ? '上传失败':'上传成功',
                url: 'http://localhost:4000/uploads/'+ body
            }
        }
    })
    await next();
}
// 获取所有的图片
var get_all_banner = async (ctx, next) => {

    let files = fs.readdirSync("uploads/").filter((f) => {
        return f.endsWith('.jpg') || f.endsWith('.png')
    })

    let content = files.map(item => ('http://localhost:4000/uploads/'+item));
   
    ctx.rest({
        data: {
            code: 200,
            msg: content.length > 0 ? content: '图片还未上传'
        }
    })

    await next();
}

module.exports = {
    'POST /api/add_blog': add_blog,
    'POST /api/upload': add_img,
    'POST /api/get_all_blogs': get_blogs,
    'POST /api/get_signal_blog': get_signal_blog,
    'POST /api/delete_blog': delete_blog,
    'POST /api/get_all_banner': get_all_banner
}