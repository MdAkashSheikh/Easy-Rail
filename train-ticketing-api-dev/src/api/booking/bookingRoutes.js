/* import implementation of social login */
import { searchTrain, purchaseTicket, purchaseHistory, bookSeat, getBookedSeats } from '../../core/booking/train.js';

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

    fastify.get('/', (req, reply) => {
        reply.send({ message: 'booking route' });
    });

    fastify.get('/search', async (req, reply) => {
        const { from, to, date } = req.query;

        const cacheKey = `s-${from}-${to}`;
        const cacheTTL = 1 * 60 * 60 * 1000; /* 1 hour */
        const { status, message, errorCode, httpStatus, output } = await fastify.cachableContent(
            searchTrain,
            [{ from, to, date }],
            cacheKey,
            cacheTTL,
            true
        );

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.post('/buy', async (req, reply) => {
        const { seatIds, seatCode, date } = req.body;
        const { userId } = req.userInfo;

        const { status, message, errorCode, httpStatus, output } = await purchaseTicket({
            userId,
            seatIds,
            seatCode,
            date,
        });

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.get('/history', async (req, reply) => {
        const { userId } = req.userInfo;

        const { status, message, errorCode, httpStatus, output } = await purchaseHistory({ userId });

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.get('/booked-seats', async (req, reply) => {
        const { trainId, trainClass, date } = req.query;

        const { status, message, errorCode, httpStatus, output } = await getBookedSeats({ trainId, trainClass, date });

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.post('/book-seat', async (req, reply) => {
        const { trainId, trainClass, date, seatId } = req.body;
        const { userId } = req.userInfo;

        const { status, message, errorCode, httpStatus, output } = await bookSeat({ userId, trainId, trainClass, date, seatId });

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    done();
};
