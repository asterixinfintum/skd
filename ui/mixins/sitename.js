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

            return BASE;
        }
    }
}