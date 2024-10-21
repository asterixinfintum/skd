import io from 'socket.io-client';

import requester from "@/store/requester";

let socket;

const BASE_URL = requester.BASE;

function connect() {
    const token = localStorage.getItem('873__jh6bdjktoken');

    if (token) {
        socket = io(`${BASE_URL}`, {
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        socket = io(`${BASE_URL}`);
    }
}
