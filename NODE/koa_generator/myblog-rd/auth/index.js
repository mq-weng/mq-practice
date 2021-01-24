let jwt = require('jsonwebtoken');

let secretKey = 'fgbb**';
module.exports = {
    creatAuthration(playload) {
        return jwt.sign(playload, secretKey,{ expiresIn: 60 });
    },

    async verifyAuthration(ctx, next) {
        if (ctx.header.authorization) {
            let parts = ctx.header.authorization;
            let bearer =  parts.split(" ")[0];
            let token = parts.split(" ")[1];
            console.log(token)
            if(/^Bearer$/.test(bearer)){
                try {
                    jwt.verify(token, secretKey);
                    await next();
                } catch (err) {
                    ctx.status = 401;
                    ctx.body = {
                        state: "fail",
                        token: "token不存在或已过期"
                    }
                    console.log('blog' + err)
                }
            }
        }
    },

}