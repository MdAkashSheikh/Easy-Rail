import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export const getNotices = async () => {
    try {
        const notices = await prisma.notice.findMany({
            orderBy: {
                noticeId: 'desc'
            }
        })

        return {
            status: 'success',
            httpStatus: 200,
            output: notices
        };
    } catch (error) {
        console.error(error);

        return {
            status: 'failed',
            httpStatus: 400,
            errorCode: 'FAILED',
            message: 'failed to get notices',
        };
    }
};
