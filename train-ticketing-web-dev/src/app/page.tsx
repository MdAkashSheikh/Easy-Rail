'use client';

import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

import moment from 'moment';

export default function Page() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['jwtToken', 'profile']);

    return (
        <section className="bg h-screen w-full">
            <div className="row align-items-center justify-content-center container-lg m-auto h-full">
                <div
                    className="d-flex flex-column ml-xl-auto p-4"
                    style={{ backgroundColor: '#343a40df', color: 'white' }}
                >
                    <div className="pt-5 pb-5">
                        <form className="form" method="GET" action="/search">
                            <div className="form-row">
                                <div className="col form-group input-group-md">
                                    <label>From</label>
                                    <select className="w-full rounded-sm text-black" name="from" required>
                                        <option value="" disabled>
                                            -- select --
                                        </option>
                                        <option>Dhaka</option>
                                        <option>Biman_Bandar</option>
                                        <option>Tangail</option>
                                        <option>Natore</option>
                                        <option>Rajshahi</option>
                                        <option>Chattogram</option>
                                    </select>
                                </div>
                                <div className="col form-group input-group-md">
                                    <label>To</label>
                                    <select className="w-full rounded-sm text-black" name="to" required>
                                        <option value="" disabled>
                                            -- select --
                                        </option>
                                        <option>Dhaka</option>
                                        <option>Biman_Bandar</option>
                                        <option>Tangail</option>
                                        <option>Natore</option>
                                        <option>Rajshahi</option>
                                        <option>Chattogram</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col form-group input-group-md">
                                    <label>Date Of Journey</label>
                                    <input
                                        type="date"
                                        className="w-full rounded-sm text-black"
                                        name="date"
                                        value={moment().format('YYYY-MM-DD')}
                                        min={moment().format('YYYY-MM-DD')}
                                        max={moment().add(5, 'day').format('YYYY-MM-DD')}
                                        onChange={() => {}}
                                        required
                                    />
                                </div>
                                <div className="col form-group input-group-md ml-2">
                                    <label>ClassName</label>
                                    <select name="className" className="w-full rounded-sm text-black" required>
                                        <option value="" disabled>
                                            -- select a className --
                                        </option>
                                        <option value="SNIGDHA">SNIGDHA</option>
                                        <option value="S_CHAIR">S_CHAIR</option>
                                        <option value="SHOVAN">SHOVAN</option>
                                        <option value="AC_S">AC_S</option>
                                    </select>
                                </div>
                            </div>

                            <button className="btn-primary btn mt-4 w-full text-white" type="submit">
                                Search Train
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
