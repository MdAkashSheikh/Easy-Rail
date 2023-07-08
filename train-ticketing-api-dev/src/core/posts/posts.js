import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        full_name: true
                    }
                }
            },
            orderBy: {
                postId: 'desc'
            }
        })

        return {
            status: 'success',
            httpStatus: 200,
            output: posts
        };
    } catch (error) {
        console.error(error);

        return {
            status: 'failed',
            httpStatus: 400,
            errorCode: 'FAILED',
            message: 'failed to get posts',
        };
    }
};



export const createPost = async (userId, body) => {
    try {
        await prisma.post.create({
            data: {
                userId,
                body
            }
        })

        return {
            status: 'success',
            httpStatus: 200,
        };
    } catch (error) {
        console.error(error);

        return {
            status: 'failed',
            httpStatus: 400,
            errorCode: 'FAILED',
            message: 'failed to create post',
        };
    }
};



export const deletePost = async (userId, postId) => {
    try {
        const posts = await prisma.post.deleteMany({
            where: {
                userId,
                postId
            }
        })

        return {
            status: 'success',
            httpStatus: 200,
        };
    } catch (error) {
        console.error(error);

        return {
            status: 'failed',
            httpStatus: 400,
            errorCode: 'FAILED',
            message: 'failed to delete post',
        };
    }
};

