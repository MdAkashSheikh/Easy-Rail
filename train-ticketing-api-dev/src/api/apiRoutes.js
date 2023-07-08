import usersRoutes from './users/usersRoutes.js';
import bookingRoutes from './booking/bookingRoutes.js';
import locationRoutes from './location/locationRoutes.js';
import postsRoutes from './posts/postsRoutes.js';
import noticesRoutes from './notices/noticesRoutes.js';

export default async (fastify, options, done) => {
    fastify.addHook('onRequest', onRequest);

    async function onRequest(req, reply) {
        reply.header('Access-Control-Allow-Origin', '*');
        reply.header('x-req-id', req.id);
        reply.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, pragma, cache-control, Authoraization, current-time, hash, x-access-token, platform, device'
        );

        /* OPTIONS is already handled by HAProxy */
        if (req.method == 'OPTIONS') {
            reply.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
            reply.status(200);
            return reply.send();
        }
    }

    fastify.get('/', (req, reply) => {
        reply.send({ message: 'welcome' });
    });

    fastify.options('/*', (req, reply) => {
        reply.send('OK');
    });

    /* https://loader.io configuration */
    fastify.get('/loaderio-*', (req, reply) => {
        reply.send(req.url.slice(1, req.url.length - 1));
    });

    fastify.register(usersRoutes, { prefix: `${process.env.API_VERSION}/users` });
    fastify.register(bookingRoutes, { prefix: `${process.env.API_VERSION}/booking` });
    fastify.register(locationRoutes, { prefix: `${process.env.API_VERSION}/location` });
    fastify.register(postsRoutes, { prefix: `${process.env.API_VERSION}/posts` });
    fastify.register(noticesRoutes, { prefix: `${process.env.API_VERSION}/notices` });

    done();
};
