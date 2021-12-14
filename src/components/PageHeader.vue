<template>
  <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          style="max-height: 320px;"
        >
          <n-menu
		  	:default-value='defaultPath'
		  	default-expand-all
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
		<n-layout-content content-style="padding: 24px;">
			<slot></slot>
		</n-layout-content>
      </n-layout>
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { constantRoutes } from '../router/routes'
import { RouterLink } from 'vue-router'
import {
	AccessibilitySharp,
	Apps,
	Aperture,
	Balloon,
	Cafe,
	CogOutline,
	DiamondSharp
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { logLight } from 'naive-ui/lib/log/styles'
let Icons = [
	AccessibilitySharp,
	Apps,
	Aperture,
	Balloon,
	Cafe,
	CogOutline,
	DiamondSharp
]
interface route {
    label: any;
    key: string;
    path: string;
	name: string
}
function renderIcon (icon:any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function getRoute(ele:any):route {
	let label
	if (!ele.children?.length) {
		label = () =>
			h(
				RouterLink,
				{
					to: {
						name: ele.name,
						params: {
							lang: 'zh-CN'
						}
					}
				},
				{ default: () => ele.meta.title }
			)
	} else {
		label = ele.meta.title
	}
	return {
		label: label,
		key: ele.path,
		path: ele.path,
		name: ele.name
	}
}
let routes = constantRoutes.map((ele, index) => {
	if (ele.hidden) {
		return false
	}
	let children
	if (ele.children?.length) {
		children = ele.children.map(i => {
			return getRoute(i)
		})
	}
	
	return {
		...getRoute(ele),
		children,
		icon: renderIcon(Icons[index])
	}
})
export default defineComponent({
  setup () {
	let defaultPath:string = window.location.pathname
	
	return {
		menuOptions: routes.filter(ele => ele),
		defaultPath: defaultPath
	}
  }
})
</script>
<style lang="css" scoped>
.n-layout-sider {
	min-height: 100vh;
	max-height: 100vh!important;
}
</style>