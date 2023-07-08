'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { AvatarGenerator } from 'random-avatar-generator';
import ReactTimeAgo from 'react-time-ago';

import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const generator = new AvatarGenerator();

async function createPosts(jwtToken: string, body: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/posts/`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-access-token': jwtToken,
            },
            body: JSON.stringify({
                body,
            }),
        });

        const response = await res.json();
        if (response?.status == 'success') {
            return response.output;
        } else if (response?.message) {
            return alert(response?.message);
        }

        throw new Error('failed to create post');
    } catch (error) {
        throw error;
    }
}

async function getPosts() {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/posts`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        const response = await res.json();
        if (response?.status == 'success') {
            return response.output;
        } else if (response?.message) {
            return alert(response?.message);
        }

        throw new Error('failed to get posts');
    } catch (error) {
        throw error;
    }
}

export default function Posts() {
    const router = useRouter();

    const [posts, setPosts] = useState(null);
    const [refreshToggle, setRefreshToggle] = useState(false);
    const [body, setBody] = useState('');

    const [cookies, setCookie] = useCookies(['jwtToken', 'profile']);

    useEffect(() => {
        getPosts().then((data) => {
            setPosts(data);
        });
    }, [cookies, router, refreshToggle]);

    return (
        <div className="container-lg">
            <section className="container pt-4">
                <div className="row">
                    <div className="col">
                        <div className="form-group w-100">
                            <textarea
                                className="w-100 form-textarea h-36 rounded-xl shadow ring"
                                style={{ border: 'unset' }}
                                placeholder="Share you latest update about train with others..."
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            ></textarea>
                            <button
                                className="btn-primary btn float-right mt-2"
                                onClick={() => {
                                    if (!cookies.jwtToken) {
                                        return router.push('/login');
                                    }

                                    createPosts(cookies.jwtToken, body)
                                        .then(() => {
                                            setBody('');
                                            setRefreshToggle(!refreshToggle);
                                        })
                                        .catch((error) => alert(error));
                                }}
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container pt-4">{!posts && <div>loading...</div>}</section>

            <section className="container">
                <div className="row posts">
                    {posts?.map((post) => {
                        return (
                            <div className="col-md-4 " key={post.postId}>
                                <div className="card mb-2 p-3 shadow ring-1">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center flex-row gap-1">
                                            <div className="icon">
                                                <img
                                                    src={generator.generateRandomAvatar(post.user.full_name)}
                                                    alt="test"
                                                />
                                            </div>
                                            <div className="ms-2 c-details">
                                                <h6 className="mb-0">{post.user.full_name}</h6>{' '}
                                                <span>
                                                    <ReactTimeAgo date={post.createdAt} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <h3 style={{ fontSize: 'x-large' }}>{post.body}</h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="container pt-4"> {posts?.length == 0 && <div>No Posts</div>}</section>
        </div>
    );
}
