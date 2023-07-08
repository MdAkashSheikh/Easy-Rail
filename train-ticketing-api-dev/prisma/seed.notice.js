import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const notices = [
    {
        title: 'new train',
        message: 'we have added new train'
    },
    {
        title: 'new easy-rail',
        message: 'buy ticket online'
    },
    {
        title: 'test notice',
        message: 'test notice body'
    }
];



await prisma.notice.createMany({ data: notices })



