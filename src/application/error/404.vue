<template>
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
        <template #footer>
            <n-button @click="$router.push({path:'/'})">回去吧</n-button>
        </template>
    </n-result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NResult } from 'naive-ui'
export default defineComponent({
    name: "404",
    components: {
        NResult
    },
    data() {
		return {
		}
	}
});
</script>

<style scoped>
</style>
