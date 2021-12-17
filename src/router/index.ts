import * as Router from "vue-router";
import { constantRoutes, asyncRoutes } from "./routes";

const router = Router.createRouter({
    history: Router.createWebHashHistory(),
    routes: constantRoutes.concat(asyncRoutes)
})

export default router
