/* load .env file */
import 'dotenv/config.js';

/* plugins for authentication and subscription check */
import authPlugin from './src/api/plugins/authPlugin.js';
import cachablePlugin from './src/api/plugins/cachablePlugin.js';
/* API routes */
import apiRoutes from './src/api/apiRoutes.js';

import hyperid from 'hyperid';

import Fastify from 'fastify';

const getHyperId = hyperid({ urlSafe: true });

const fastify = Fastify({
    logger: false,
    genReqId: function () {
        return getHyperId();
    },
});

await fastify.register(authPlugin);
await fastify.register(cachablePlugin);
await fastify.register(apiRoutes);

const port = process.env.PORT || 4000;

fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        console.error('fastify:', err);
        process.exit(1);
    }

    console.log(`Server listening on ${address}`);
});
