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
    <n-modal v-model:show="showLoading" :mask-closable="false">
        <div class="loader">模型加载中...</div>
    </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NConfigProvider, NInput, NDatePicker, NSpace } from 'naive-ui'
// theme
import { createTheme, inputDark, datePickerDark  } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'
import PageHeader from "./components/PageHeader.vue";
import * as faceapi from 'face-api.js'
export default defineComponent({
    // name: "App",
    components: {
        NConfigProvider,
        NInput,
        NDatePicker,
        NSpace,
        PageHeader
    },
    created() {
        this.init()
    },
    methods: {
        async init():Promise<void> {
            await faceapi.nets['ssdMobilenetv1'].loadFromUri("models");// 算法模型
            await faceapi.nets['tinyFaceDetector'].loadFromUri("models");// 算法模型
            await faceapi.loadFaceLandmarkModel("models");// 轮廓模型
            this.showLoading = false
            
        }
    },
    setup () {
        let showLoading = ref(true)
        return {
            showLoading: showLoading,
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
.loader {
  text-align: center;
  color: aquamarine;
  font-size: 14px;
}
</style>
