import requester from "@/store/requester";

export default {
    head() {
        return {
            title: requester.BASE
        }
    },
    computed: {
        sitename() {
            const { BASE } = requester;

            const domainName = extractDomainName(BASE);

            return domainName;
        }
    }
}

function extractDomainName(url) {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.split('.').slice(-2).join('.');
    return domain;
}
