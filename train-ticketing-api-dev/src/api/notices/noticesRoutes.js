/* import implementation of notices */
import { getNotices } from '../../core/notices/notices.js';

export default (fastify, options, done) => {


    fastify.get('/', async (req, reply) => {

        const { status, message, errorCode, httpStatus, output } = await getNotices();

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });



    done();
};
