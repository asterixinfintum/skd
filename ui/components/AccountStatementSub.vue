<template>
    <div class="submenu">
        <span class="submenu__item" :class="{
            current: currnt('statements')
        }" @click="toroute('accountstate/statements')">Request Statements</span>
        <span class="submenu__item" :class="{
            current: currnt('spending')
        }" @click="toroute('accountstate/spending')">Spending Report</span>
    </div>
</template>

<script>
import global from '@/mixins/global';

export default {
    mixins: [global]
}
</script>