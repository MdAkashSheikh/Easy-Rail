/* import implementation of social login */
import { getLocation, updateLocation } from '../../core/location/location.js';

export default (fastify, options, done) => {
    fastify.addHook('onRequest', authorize);

    async function authorize(req, reply) {
        /* all routes are protected by default*/
        const result = await fastify.authenticate(req);

        if (result.status == 'success') {
            return;
        }

        return reply.status(422).send(result);
    }

    fastify.get('/', async (req, reply) => {
        const { status, message, errorCode, httpStatus, output } = await getLocation();

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.post('/:trainId', async (req, reply) => {
        const { lat, long } = req.body;
        const { trainId } = req.params;

        const { status, message, errorCode, httpStatus, output } = await updateLocation({ trainId, lat, long });

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    done();
};
