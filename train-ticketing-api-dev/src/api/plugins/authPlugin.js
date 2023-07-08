import { createVerifier } from 'fast-jwt';
import fastifyPlugin from 'fastify-plugin';

const verifyToken = createVerifier({ key: async () => process.env.JWT_SECRET });

const authPlugin = (fastify, options, done) => {
    /* optimize req object modification */
    fastify.decorateRequest('userInfo', null);
    /* authenticate will be available in fastify.authenticate */
    fastify.decorate('authenticate', authenticate);

    async function authenticate(req) {
        let status;
        let errorCode;
        let message;
        const token = req.headers['x-access-token'];

        try {
            status = 'success';
            const userInfo = await verifyToken(token);
            req.userInfo = userInfo;
        } catch (error) {
            status = 'failed';
            message = 'Access denied!';
            errorCode = 'JSON_WEB_TOKEN_ERROR';
        }

        return {
            status,
            errorCode,
            message,
        };
    }

    done();
};

/**
 * with fastifyPlugin wrap, this plugin will modify outer scope of fastify server object
 */
export default fastifyPlugin(authPlugin, {
    fastify: '4.x',
    name: '@node-boilerplate/authPlugin',
});
