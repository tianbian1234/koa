const model = require('../model');
const APIError = require('../rest').APIError;

let User = model.User;

// 获取用户的信息
var get_user =  async (ctx, next) => {
    var user = await User.findOne({
        where:{
            name: 'gaoyantao'
        }
    })
    console.log(`find ${user.length} users:`);
    ctx.rest({
        data: {
            code: 200,
            resolute:{
                name: user.name,
                passwd: user.passwd,
                email: user.email
            }
        }
    })
    await next();
}
// 修改用户信息
var fix_user = async (ctx, next) => {
    let email = ctx.request.body.email;
    let user = await User.findOne({
        where:{
            email: email
        }
    })

    console.log(`fix ${user.name} users:`);

    ctx.rest({
        data: {
            code:200,
            msg:'修改用户信息完成！'
        }
    })
}
// 创建新的用户
var add_user = async (ctx, next) => {
    var name = ctx.request.body.name,
        passwd = ctx.request.body.passwd,
        email = ctx.request.body.email;
        gender = ctx.request.body.gender;

    var user = await User.create({
        email: email,
        passwd: passwd,
        name: name,
        gender: gender
    })

    ctx.rest({
        data: {
            code: 200,
            msg:'创建用户成功'
        }
    })

    await next();
}
// 删除用户
var delete_user = async (ctx, next) => {
    var email = ctx.request.body.email;

    var user = await User.destroy({
        where:{
            email: email
        }
    })
    ctx.rest({
        data: {
            code: 200,
            msg: '删除成功'
        }
    })
    await next();
}

module.exports = {
    'POST /api/users': get_user,
    'POST /api/add_user': add_user,
    'POST /api/delete_user': delete_user,
    'POST /api/fix_user': fix_user
}