<template>
    <div class="submenu">
        <span class="submenu__item" :class="{
            current: currnt('all')
        }" @click="toroute('transactions/all')">All</span>
        <span class="submenu__item" :class="{
            current: currnt('deposits')
        }" @click="toroute('transactions/deposits')">Deposits</span>
        <span class="submenu__item" :class="{
            current: currnt('withdrawals')
        }" @click="toroute('transactions/withdrawals')">Withdrawals</span>
        <span class="submenu__item" :class="{
            current: currnt('transfers')
        }" @click="toroute('transactions/transfers')">Transfers</span>
    </div>
</template>

<script>
import global from '@/mixins/global';

export default {
    mixins: [global]
}
</script>