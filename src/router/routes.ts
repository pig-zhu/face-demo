export const constantRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/application/home/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/face1',
        name:'face1',
        component: () => import('@/application/face/index.vue'),
        meta: {
            title: '人脸检测'
        },
        children: [
            {
                path: '/face-detection',
                name:'face-detection',
                component: () => import('@/application/face/face-detection.vue'),
                meta: {
                    title: '人脸检测'
                },
            },
            {
                path: '/face-landmark-detection',
                name:'face-landmark-detection',
                component: () => import('@/application/face/face-landmark-detection.vue'),
                meta: {
                    title: '人脸标志检测'
                },
            },
            {
                path: '/face-expression-recognition',
                name:'face-expression-recognition',
                component: () => import('@/application/face/face-expression-recognition.vue'),
                meta: {
                    title: '面部表情识别'
                },
            },
            {
                path: '/face-recognition',
                name:'face-recognition',
                component: () => import('@/application/face/face-recognition.vue'),
                meta: {
                    title: '人脸识别对比'
                },
            },
            {
                path: '/face-extraction',
                name:'face-extraction',
                component: () => import('@/application/face/face-extraction.vue'),
                meta: {
                    title: '人脸提取'
                },
            }
        ]
    },
    {
        path: '/webcamAge',
        name:'webcamAge',
        component: () => import('@/application/webcamAge/index.vue'),
        meta: {
            title: '网络摄像头检测'
        },
        children: [
            {
                path: '/video-face-tracking',
                name:'video-face-tracking',
                component: () => import('@/application/webcamAge/video-face-tracking.vue'),
                meta: {
                    title: '视频人脸跟踪'
                },
            },
            {
                path: '/webcam-face-detection',
                name:'webcam-face-detection',
                component: () => import('@/application/webcamAge/webcam-face-detection.vue'),
                meta: {
                    title: '网络摄像头人脸检测'
                },
            }
        ]
    },
    {
        path: '/bbt',
        name:'bbt',
        component: () => import('@/application/bbt/index.vue'),
        meta: {
            title: 'BBT检测'
        },
        children: [
            {
                path: '/bbt-face-similarity',
                name:'bbt-face-similarity',
                component: () => import('@/application/bbt/bbt-face-similarity.vue'),
                meta: {
                    title: 'BBT相似性检测'
                },
            },
            // {
            //     path: '/bbt-face-matching',
            //     name:'bbt-face-matching',
            //     component: () => import('@/application/bbt/bbt-face-matching.vue'),
            //     meta: {
            //         title: 'BBT面部匹配'
            //     },
            // },
            // {
            //     path: '/bbt-face-recognition',
            //     name:'bbt-face-recognition',
            //     component: () => import('@/application/bbt/bbt-face-recognition.vue'),
            //     meta: {
            //         title: 'BBT人脸识别系统'
            //     },
            // },
            // {
            //     path: '/bbt-batch-face-landmark-detection',
            //     name:'bbt-batch-face-landmark-detection',
            //     component: () => import('@/application/bbt/bbt-batch-face-landmark-detection.vue'),
            //     meta: {
            //         title: '批量人脸地标检测'
            //     },
            // },
            // {
            //     path: '/bbt-batch-face-recognition',
            //     name:'bbt-batch-face-recognition',
            //     component: () => import('@/application/bbt/bbt-batch-face-recognition.vue'),
            //     meta: {
            //         title: '批量人脸识别'
            //     },
            // }
        ]
    },
    {
        path: '/login',
        name:'login',
        component: () => import('@/application/login/index.vue'),
        meta: {
        },
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/application/error/404.vue'),
        meta: {
        },
        hidden: true
    }
]

export const asyncRoutes = [
    { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]