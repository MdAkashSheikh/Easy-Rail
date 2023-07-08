import { createSigner } from 'fast-jwt';

const createToken = createSigner({
    key: async () => process.env.JWT_SECRET,
    expiresIn: 7 * 24 * 60 * 60 * 1000 /* 7 days */,
});

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const loginWithPassword = async ({ username, password }) => {
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                OR: [{ email: username }, { mobile: username }],
            },
        });

        if (password == user.password) {
            let jwtToken = await generateJwt(user?.userId, user.role, false);
            return {
                status: 'success',
                httpStatus: 200,
                output: {
                    profile: {
                        fullname: user.fullname,
                        email: user.email,
                        mobile: user.mobile,
                        address: user.address,
                    },
                    jwtToken,
                },
            };
        }
    } catch (error) {
        console.error(error);
        //
    }

    return {
        status: 'failed',
        httpStatus: 400,
        errorCode: 'INVALID_AUTH',
        message: 'Invalid user or passsword',
    };
};

export const registration = async ({ full_name, email, mobile, cmobile, password, cpassword, address }) => {
    try {
        if (password != cpassword) {
            throw new Error('password did not match');
        }

        if (mobile != cmobile) {
            throw new Error('mobile number did not match');
        }

        await prisma.user.create({
            data: {
                full_name,
                email,
                mobile,
                password,
                address,
            },
        });

        return loginWithPassword({ username: email, password });
    } catch (error) {
        console.error(error);
        let message = error.message;
        console.log(error.meta.target);

        if (error.code == 'P2002' && error.meta.target == 'user_email_key') {
            message = 'account exists with this email: ' + email;
        }
        if (error.code == 'P2002' && error.meta.target == 'user_mobile_key') {
            message = 'account exists with this mobile: ' + mobile;
        }

        return {
            status: 'failed',
            httpStatus: 500,
            errorCode: 'FAILED',
            message,
        };
    }
};

export const generateJwt = async (userId, role = 'USER') => {
    const data = {
        userId,
        role,
    };

    const token = await createToken(data);

    return token;
};

export const getProfile = async ({ userId }) => {
    try {
        const output = await prisma.user.findFirstOrThrow({
            where: {
                userId,
            },
        });

        delete output.password;

        return {
            status: 'success',
            httpStatus: 200,
            output,
        };
    } catch (error) {
        console.error(error);
        //
    }

    return {
        status: 'failed',
        httpStatus: 400,
        errorCode: 'FAILED',
        message: 'Failed to get profile',
    };
};
