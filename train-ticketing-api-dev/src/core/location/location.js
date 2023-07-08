import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLocation = async () => {
    try {
        const output = await prisma.train.findMany({
            select: {
                name: true,
                trainLocation: {
                    select: {
                        lat: true,
                        long: true,
                    },
                },
            },
        });

        return {
            status: 'success',
            httpStatus: 200,
            output,
        };
    } catch (error) {
        console.log(error);
    }
    return {
        status: 'failed',
        httpStatus: 400,
        errorCode: 'FAILED',
        message: 'failed to find location',
    };
};
export const updateLocation = async ({ trainId, lat, long }) => {
    trainId = Number(trainId);

    try {
        await prisma.train.update({
            data: {
                trainLocation: {
                    upsert: {
                        update: {
                            lat,
                            long,
                        },
                        create: {
                            lat,
                            long,
                        },
                    },
                },
            },
            where: {
                trainId,
            },
        });

        return {
            status: 'success',
            httpStatus: 200,
        };
    } catch (error) {
        console.log(error);
    }
    return {
        status: 'failed',
        httpStatus: 400,
        errorCode: 'FAILED',
        message: 'failed to update location',
    };
};
