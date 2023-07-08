/* import implementation of posts */
import { getPosts, createPost, deletePost } from '../../core/posts/posts.js';

export default (fastify, options, done) => {
    fastify.addHook('onRequest', authorize);

    async function authorize(req, reply) {

        if (req.method == 'GET') {
            return;
        }


        /* all routes are protected by default*/
        const result = await fastify.authenticate(req);

        if (result.status == 'success') {
            return;
        }

        return reply.status(422).send(result);
    }

    fastify.get('/', async (req, reply) => {

        const { status, message, errorCode, httpStatus, output } = await getPosts();

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.post('/', async (req, reply) => {

        const { userId } = req.userInfo;
        const { body } = req.body;

        const { status, message, errorCode, httpStatus, output } = await createPost(userId, body);

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });

    fastify.delete('/:postId', async (req, reply) => {

        const { userId } = req.userInfo;
        const { postId } = req.params;

        const { status, message, errorCode, httpStatus, output } = await deletePost(userId, Number(postId));

        reply.code(httpStatus).send({ status, message, errorCode, output });
    });




    done();
};
