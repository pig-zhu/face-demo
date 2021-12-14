import * as Router from "vue-router";
import { constantRoutes, asyncRoutes } from "./routes";

const router = Router.createRouter({
    history: Router.createWebHistory(),
    routes: constantRoutes.concat(asyncRoutes)
})

export default router
