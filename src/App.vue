<template>
    <!-- <img
        alt="Vue logo"
        src="./assets/logo.png"
    /> -->
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <page-header>
            <slot>
                <n-message-provider>
                    <router-view></router-view>
                </n-message-provider>
            </slot>
        </page-header>
    </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NConfigProvider, NInput, NDatePicker, NSpace } from 'naive-ui'
// theme
import { createTheme, inputDark, datePickerDark  } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'
import PageHeader from "./components/PageHeader.vue";

export default defineComponent({
    // name: "App",
    components: {
        NConfigProvider,
        NInput,
        NDatePicker,
        NSpace,
        PageHeader
    },
    setup () {
        return {
            darkTheme: createTheme([inputDark, datePickerDark]),
            zhCN,
            dateZhCN
        }
    }
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    min-height: 100vh;
}
</style>
