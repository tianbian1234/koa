const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
const server = require('koa-static');
const cors = require('koa-cors');
const controller = require('./controller');
const rest = require('./rest');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add cors
app.use(cors());

// parse request body:
app.use(bodyParser());

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(server(__dirname, '/uploads'));
app.use(controller());

app.listen(4000);
console.log('app started at port 4000...');

