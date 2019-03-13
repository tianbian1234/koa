const APIError = require('../rest').APIError;

var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.rest({
        data: {
            code: 200,
            resolute:{
                name: name,
                passwd: "123456",
                email: "614362179@qq.com"
            }
        }
    })

    await next();
}

module.exports = {
    'GET /api/:name': fn_hello
};