import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const trainData = [
    {
        name: 'DHUMKETU EXPRESS',
        trainLocation: ['24.389218', '88.617173'],
        trainRoute: [
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 250,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 340,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 420,
                    },
                    {
                        className: 'AC_S',
                        amount: 560,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 250,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 340,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 420,
                    },
                    {
                        className: 'AC_S',
                        amount: 560,
                    },
                ],
            },
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Tangail',
                arrival: '07:55 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 180,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 240,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 320,
                    },
                    {
                        className: 'AC_S',
                        amount: 380,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Tangail',
                arrival: '07:55 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 180,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 240,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 320,
                    },
                    {
                        className: 'AC_S',
                        amount: 380,
                    },
                ],
            },
            {
                from: 'Tangail',
                departure: '07:55 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 130,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 210,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 230,
                    },
                    {
                        className: 'AC_S',
                        amount: 310,
                    },
                ],
            },
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Natore',
                arrival: '10:25 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 190,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 260,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 350,
                    },
                    {
                        className: 'AC_S',
                        amount: 390,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Natore',
                arrival: '10:25 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 190,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 260,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 350,
                    },
                    {
                        className: 'AC_S',
                        amount: 390,
                    },
                ],
            },
            {
                from: 'Natore',
                departure: '10:25 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 70,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 110,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 150,
                    },
                    {
                        className: 'AC_S',
                        amount: 200,
                    },
                ],
            },
        ],
        trainClass: [
            {
                className: 'SHOVON',
                seatCodePrefix: 'KA',
                totalSeat: 40,
            },
            {
                className: 'S_CHAIR',
                seatCodePrefix: 'KA',
                totalSeat: 35,
            },
            {
                className: 'SNIGDHA',
                seatCodePrefix: 'JHA',
                totalSeat: 25,
            },
            {
                className: 'AC_S',
                seatCodePrefix: 'TA',
                totalSeat: 20,
            },
        ],
    },
    {
        name: 'BANALATA EXPRESS',
        trainLocation: ['24.409024', '88.995167'],
        trainRoute: [
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'S_CHAIR',
                        amount: 345,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 425,
                    },
                    {
                        className: 'AC_S',
                        amount: 565,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'S_CHAIR',
                        amount: 345,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 425,
                    },
                    {
                        className: 'AC_S',
                        amount: 565,
                    },
                ],
            },
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Tangail',
                arrival: '07:55 am',
                fare: [
                    {
                        className: 'S_CHAIR',
                        amount: 245,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 325,
                    },
                    {
                        className: 'AC_S',
                        amount: 385,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Tangail',
                arrival: '07:55 am',
                fare: [
                    {
                        className: 'S_CHAIR',
                        amount: 245,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 325,
                    },
                    {
                        className: 'AC_S',
                        amount: 385,
                    },
                ],
            },
            {
                from: 'Tangail',
                departure: '07:55 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'S_CHAIR',
                        amount: 215,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 235,
                    },
                    {
                        className: 'AC_S',
                        amount: 315,
                    },
                ],
            },
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Natore',
                arrival: '10:25 am',
                fare: [
                    {
                        className: 'S_CHAIR',
                        amount: 265,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 355,
                    },
                    {
                        className: 'AC_S',
                        amount: 395,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Natore',
                arrival: '10:25 am',
                fare: [
                    {
                        className: 'S_CHAIR',
                        amount: 265,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 355,
                    },
                    {
                        className: 'AC_S',
                        amount: 395,
                    },
                ],
            },
            {
                from: 'Natore',
                departure: '10:25 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'S_CHAIR',
                        amount: 115,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 155,
                    },
                    {
                        className: 'AC_S',
                        amount: 205,
                    },
                ],
            },
        ],
        trainClass: [
            {
                className: 'S_CHAIR',
                seatCodePrefix: 'KA',
                totalSeat: 30,
            },
            {
                className: 'SNIGDHA',
                seatCodePrefix: 'JHA',
                totalSeat: 35,
            },
            {
                className: 'AC_S',
                seatCodePrefix: 'TA',
                totalSeat: 25,
            },
        ],
    },
    {
        name: 'PADMA EXPRESS',
        trainLocation: ['24.249734', '89.945527'],
        trainRoute: [
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 210,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 350,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 430,
                    },
                    {
                        className: 'AC_S',
                        amount: 570,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 260,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 350,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 430,
                    },
                    {
                        className: 'AC_S',
                        amount: 570,
                    },
                ],
            },
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Tangail',
                arrival: '07:55 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 190,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 250,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 330,
                    },
                    {
                        className: 'AC_S',
                        amount: 390,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Tangail',
                arrival: '07:55 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 190,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 250,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 330,
                    },
                    {
                        className: 'AC_S',
                        amount: 390,
                    },
                ],
            },
            {
                from: 'Tangail',
                departure: '07:55 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 140,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 220,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 240,
                    },
                    {
                        className: 'AC_S',
                        amount: 320,
                    },
                ],
            },
            {
                from: 'Dhaka',
                departure: '06:00 am',
                to: 'Natore',
                arrival: '10:25 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 200,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 270,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 360,
                    },
                    {
                        className: 'AC_S',
                        amount: 400,
                    },
                ],
            },
            {
                from: 'Biman_Bandar',
                departure: '06:30 am',
                to: 'Natore',
                arrival: '10:25 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 200,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 270,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 360,
                    },
                    {
                        className: 'AC_S',
                        amount: 400,
                    },
                ],
            },
            {
                from: 'Natore',
                departure: '10:25 am',
                to: 'Rajshahi',
                arrival: '11:40 am',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 80,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 120,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 160,
                    },
                    {
                        className: 'AC_S',
                        amount: 210,
                    },
                ],
            },
        ],
        trainClass: [
            {
                className: 'SHOVON',
                seatCodePrefix: 'KA',
                totalSeat: 40,
            },
            {
                className: 'S_CHAIR',
                seatCodePrefix: 'KA',
                totalSeat: 35,
            },
            {
                className: 'SNIGDHA',
                seatCodePrefix: 'JHA',
                totalSeat: 25,
            },
            {
                className: 'AC_S',
                seatCodePrefix: 'TA',
                totalSeat: 20,
            },
        ],
    },
    {
        name: 'SONAR BANGLA EXPRESS',
        trainLocation: ['23.015119', '91.369478'],
        trainRoute: [
            {
                from: 'Dhaka',
                departure: '07:00 am',
                to: 'Chattogram',
                arrival: '12:15 pm',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 310,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 450,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 805,
                    },
                    {
                        className: 'AC_S',
                        amount: 904,
                    },
                ],
            },
        ],
        trainClass: [
            {
                className: 'SHOVON',
                seatCodePrefix: 'KA',
                totalSeat: 45,
            },
            {
                className: 'S_CHAIR',
                seatCodePrefix: 'KA',
                totalSeat: 40,
            },
            {
                className: 'SNIGDHA',
                seatCodePrefix: 'JHA',
                totalSeat: 30,
            },
            {
                className: 'AC_S',
                seatCodePrefix: 'TA',
                totalSeat: 25,
            },
        ],
    },
    {
        name: 'SUBORNO EXPRESS',
        trainLocation: ['22.344047', '91.836905'],
        trainRoute: [
            {
                from: 'Dhaka',
                departure: '04:30 pm',
                to: 'Chattogram',
                arrival: '09:50 pm',
                fare: [
                    {
                        className: 'SHOVON',
                        amount: 330,
                    },
                    {
                        className: 'S_CHAIR',
                        amount: 460,
                    },
                    {
                        className: 'SNIGDHA',
                        amount: 815,
                    },
                    {
                        className: 'AC_S',
                        amount: 914,
                    },
                ],
            },
        ],
        trainClass: [
            {
                className: 'SHOVON',
                seatCodePrefix: 'KA',
                totalSeat: 44,
            },
            {
                className: 'S_CHAIR',
                seatCodePrefix: 'KA',
                totalSeat: 42,
            },
            {
                className: 'SNIGDHA',
                seatCodePrefix: 'JHA',
                totalSeat: 33,
            },
            {
                className: 'AC_S',
                seatCodePrefix: 'TA',
                totalSeat: 27,
            },
        ],
    },
];

await prisma.$transaction(async (prismaTransaction) => {
    for (let train of trainData) {
        const { trainLocationId } = await prismaTransaction.trainLocation.create({
            data: {
                lat: train.trainLocation[0],
                long: train.trainLocation[1],
            },
        });

        const { trainId } = await prismaTransaction.train.create({
            data: {
                name: train.name,
                trainLocationId,
            },
        });

        for (let trainRoute of train.trainRoute) {
            await prismaTransaction.trainRoute.create({
                data: {
                    from: trainRoute.from,
                    to: trainRoute.to,
                    fare: trainRoute.fare,
                    departure: trainRoute.departure,
                    arrival: trainRoute.arrival,
                    trainId,
                },
            });
        }

        for (let trainClass of train.trainClass) {
            const { trainClassId } = await prismaTransaction.trainClass.create({
                data: {
                    className: trainClass.className,
                    trainId,
                },
            });

            for (let i = 1; i <= trainClass.totalSeat; i++)
                await prismaTransaction.seat.create({
                    data: {
                        seatCode: `${trainClass.seatCodePrefix}-${i}`,
                        trainClassId,
                    },
                });
        }
    }
});
