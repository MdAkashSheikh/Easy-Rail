/* import implementation of social login */
import { loginWithPassword, registration, getProfile } from '../../core/users/auth.js';

export default (fastify, options, done) => {
    fastify.addHook('onRequest', authorize);

    async function authorize(req, reply) {
        /* all routes are protected by default*/
        const path = req.raw.url;
        if (path == '/v1/users/login' || path == '/v1/users/registration') {
            return;
        }

        const result = await fastify.authenticate(req);

        if (result.status == 'success') {
            return;
        }

        return reply.status(422).send(result);
    }

    fastify.get('/', (req, reply) => {
        reply.send({ message: 'users route' });
    });

    fastify.post('/login', async (req, reply) => {
        const { username, password } = req.body;

        const { status, message, errorCode, httpStatus, output } = await loginWithPassword({ username, password });

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.post('/registration', async (req, reply) => {
        const { full_name, email, mobile, cmobile, password, cpassword, address } = req.body;

        const { status, message, errorCode, httpStatus, output } = await registration({
            full_name,
            email,
            mobile,
            cmobile,
            password,
            cpassword,
            address,
        });

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.get('/profile', async (req, reply) => {
        const { userId } = req.userInfo;

        const { status, message, errorCode, httpStatus, output } = await getProfile({ userId });

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    done();
};
