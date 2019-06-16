<template>
    <div class="me-view-wrapper">
        <v-header></v-header>
		<router-view></router-view>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import header from '../header/header';
    import footer from '../footer/footer';
    export default {
    	components: {
            'v-header': header,
            'v-footer': footer
        }
    }
</script>

<style lang="less" scoped>
	@import './root.less';
</style>
