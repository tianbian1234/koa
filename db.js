const Sequelize = require("sequelize");
const uuid = require('node-uuid');
const config = require('./config');

console.log("init sequelize......");

function generateId() {
    return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

const ID_TYPE = Sequelize.STRING;

function defineModel(name, attributes){
    var attrs = {};
    for (let key in attributes){
        let value = attributes[key];
        if (typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }else{
            attrs[key] = {
                type: value,
                allowNull: false
            }
        }
    };
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks:{
            beforeValidate: function(obj){
                let now  = Date.now();
                if(obj.isNewRecord){
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }else{
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    })
}

module.exports = {
    defineModel: defineModel,
    sync: () => { 
        console.log("1111111111建表");
        sequelize.sync();
    },
    ...Sequelize
}