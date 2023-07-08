import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const prisma = new PrismaClient();

const redisClient = new Redis({ host: process.env.REDIS_HOST });

export async function storeTimeline(key, data) {
    const cmd = [key, '*', ...data];
    const result = await redisClient.xadd(cmd);
    return result;
}

export const searchTrain = async ({ from, to, date }) => {
    try {
        const result = await prisma.train.findMany({
            include: {
                trainRoute: true,
                trainClass: {
                    include: {
                        seat: true,
                    },
                },
            },
            where: {
                trainRoute: {
                    some: {
                        from,
                        to,
                    },
                },
            },
        });

        const output = result.map((train) => {
            return {
                trainId: train.trainId,
                name: train.name,
                departure: train.trainRoute?.[0]?.departure,
                arrival: train.trainRoute?.[0]?.arrival,
                trainClass: train.trainClass.map((trainClass) => {
                    return {
                        className: trainClass.className,
                        totalSeat: trainClass.seat.length,
                        fare: train.trainRoute?.[0]?.fare?.find((item) => item.className == trainClass.className)?.amount,
                        seats: trainClass.seat.map((seat) => {
                            return {
                                seatId: seat.seatId,
                                seatCode: seat.seatCode,
                            };
                        }),
                    };
                }),
            };
        });

        return {
            status: 'success',
            httpStatus: 200,
            output,
        };
    } catch (error) {
        console.error(error);
    }

    return {
        status: 'failed',
        httpStatus: 400,
        errorCode: 'FAILED',
        message: 'failed to find train',
    };
};

export const purchaseTicket = async ({ userId, seatIds, date }) => {
    try {
        const bookingInfoKey = `train:booking:user`;

        await prisma.$transaction(async (prismaTransaction) => {
            for (let seatId of seatIds) {
                const response = await redisClient.hget(bookingInfoKey, userId);
                console.log(response, seatId, seatIds);
                const seatBookingInfo = JSON.parse(response);

                if (!seatBookingInfo.find((item) => item.seatId == seatId)) {
                    throw new Error('not available');
                }

                await prismaTransaction.purchaseHistory.create({
                    data: {
                        journeyDate: new Date(date),
                        userId,
                        seatId: Number(seatId),
                    },
                });

                const seatBookedKey = `train:booked:${date}`;
                await redisClient.sadd(seatBookedKey, seatId);
            }
        });

        return {
            status: 'success',
            httpStatus: 200,
        };
    } catch (error) {
        console.error(error);

        let message = 'failed to purchase ticket';
        if (error.code == 'P2002') {
            message = 'not available';
        }

        return {
            status: 'failed',
            httpStatus: 400,
            errorCode: 'FAILED',
            message,
        };
    }
};

export const purchaseHistory = async ({ userId }) => {
    try {
        const result = await prisma.purchaseHistory.findMany({
            include: {
                seat: {
                    include: {
                        trainClass: {
                            include: {
                                train: true,
                            },
                        },
                    },
                },
            },
            orderBy: [
                {
                    purchaseHistoryId: 'desc',
                },
            ],
            where: {
                userId,
            },
        });

        const output = result.map((purchaseHistory) => {
            return {
                journeyDate: purchaseHistory.journeyDate.toISOString().slice(0, 10),
                train: purchaseHistory.seat.trainClass.train.name,
                fare: purchaseHistory.seat.trainClass.fare,
                from: purchaseHistory.seat.trainClass.from,
                to: purchaseHistory.seat.trainClass.to,
                seatCode: purchaseHistory.seat.seatCode,
                status: purchaseHistory.status,
            };
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
        message: 'failed to find purchase history',
    };
};

export const bookSeat = async ({ userId, trainId, trainClass, date, seatId }) => {
    try {
        const timelineKey = 'train:booking:timeline';
        const bookingInfoKey = `train:booking:user`;
        const seatBookingKey = `train:${trainId}:${trainClass}:${date}`;

        const timeLineData = ['trainId', trainId, 'trainClass', trainClass, 'date', date, 'seatId', seatId, 'userId', userId];
        const bookingInfo = { userId, trainId, trainClass, date, seatId };

        let userBookingList = await redisClient.hget(bookingInfoKey, userId);
        if (userBookingList) {
            userBookingList = JSON.parse(userBookingList);
            userBookingList = [...userBookingList, bookingInfo];
        } else {
            userBookingList = [bookingInfo];
        }

        const response = await redisClient.sadd(seatBookingKey, seatId);
        if (response == 0) {
            throw new Error('not available');
        }

        await redisClient.hset(bookingInfoKey, userId, JSON.stringify(userBookingList));
        await storeTimeline(timelineKey, timeLineData);

        return {
            status: 'success',
            httpStatus: 200,
        };
    } catch (error) {
        console.error(error);
    }

    return {
        status: 'failed',
        httpStatus: 400,
        errorCode: 'FAILED',
        message: 'failed to book seat',
    };
};

export const getBookedSeats = async ({ trainId, trainClass, date }) => {
    try {
        const seatBookingKey = `train:${trainId}:${trainClass}:${date}`;
        const output = await redisClient.smembers(seatBookingKey);

        return {
            status: 'success',
            httpStatus: 200,
            output,
        };
    } catch (error) {
        console.error(error);
    }

    return {
        status: 'failed',
        httpStatus: 400,
        errorCode: 'FAILED',
        message: 'failed to book seat',
    };
};
