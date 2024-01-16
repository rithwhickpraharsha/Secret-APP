const zod = require('zod');
const secretParse = zod.object({
    category : zod.string().min(1),
    user:zod.string().email(),
    secret:zod.string().min(1)
});

const userParse = zod.object({
    user: zod.string().email(),
    password:zod.string().min(1)
});

module.exports = {userParse,secretParse};