<template>
    <div class="me-home-view">
        this is home view
        <div v-text="tips"></div>
        <div class="go" @click="goAbout">跳转</div>
    </div>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import date from '@/utils/date';

export default {
    computed: {
        ...mapState({
            tips: state => state.product.tips
        })
    },

    created() {
        this.getTips();
    },

    methods: {
        ...mapActions([
            'getTips'
        ]),

        goAbout() {
           this.$router.push('/about');
        }
    }
}
</script>
<style lang="less" scoped>
    @import './home.less';
</style>