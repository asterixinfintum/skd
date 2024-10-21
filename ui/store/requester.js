function getCurrentPageDomain() {
    if (process.client) {
        // Check if the code is running on the client side
        const currentURL = window.location.href;
        const url = new URL(currentURL);
        return url.protocol + '//' + 'api.' + url.hostname;
    } else {
        // Handle server-side rendering (optional)
        return ''; // You can return a default value or handle it differently for SSR
    }
}

function getName() {
    if (process.client) {
        const currentURL = window.location.href;
        const url = new URL(currentURL);

        const domain = url.hostname.split('.').slice(-2).join('.');
        return domain;
    } else {
        return;
    }
}


let BASE = getCurrentPageDomain();
let SITENAME = getName();

if (BASE.includes('localhost')) {
    BASE = `http://localhost:8081`;
} else {
    BASE = getCurrentPageDomain();
}


/*if (!DEVELOPMENT) {
    BASE = getCurrentPageDomain();
} else {
    BASE = `http://localhost:8081`;
}*/

async function posttoserver({ body, token, path }) {
    try {
        let tkn = token ? token : '';
        let pth = path ? path : '';

        const url = `${BASE}/${pth}`;

        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tkn}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        return data;
    } catch (error) {
        // console.log(error, 'error here')
        return error;
    }
}

async function getfromserver({ token, path }) {
    try {
        let tkn = token ? token : '';
        let pth = path ? path : '';

        const url = `${BASE}/${pth}`;

        // console.log(url)

        const response = await fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tkn}`
            }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        return error
    }
}

export default {
    posttoserver,
    getfromserver,
    BASE,
    SITENAME
};