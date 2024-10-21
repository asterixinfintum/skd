<template>
    <div class="traderview">
        <div id="tradingview_43e81"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.renderchart();
    },
    methods: {
        renderchart() {
            new TradingView.widget({
                "autosize": true,
                "symbol": "FX:EURUSD",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "light",
                "style": "2",
                "locale": "en",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_43e81"
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.traderview {
    width: 100%;
    height: 30vh;
}

#tradingview_43e81 {
    height: 30vh;
}
</style>