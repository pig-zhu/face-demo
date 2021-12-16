<template>
    <div style="position: relative" class="margin">
        <n-space>
            <div style="width: 300px;margin-right: 10px">
                <h4>视频输入</h4>
                <n-button @click="fnOpen">启动摄像头</n-button>
                <n-button style="margin-left: 10px" @click="fnClose">结束摄像头</n-button>
                <n-checkbox style="margin-top: 10px" @update:checked="handleChecked" label="隐藏边界框" />
                <n-divider title-placement="left"></n-divider>
                <h4>切换摄像头</h4>
                <n-radio-group v-model:value="constraints.video.facingMode" name="radiogroup">
                    <n-space>
                        <n-radio value="user">前置摄像头</n-radio>
                        <n-radio value="environment">后置摄像头</n-radio>
                    </n-space>
                </n-radio-group>
                <n-divider title-placement="left"></n-divider>
                <h4>检测识别类型</h4>
                <n-radio-group v-model:value="detection" name="radiogroup">
                    <n-space>
                        <n-radio value="landmark">轮廓检测</n-radio>
                        <n-radio value="expression">表情检测</n-radio>
                        <n-radio value="age_gender">年龄性别检测</n-radio>
                    </n-space>
                </n-radio-group>
                <n-divider title-placement="left"></n-divider>
                <h4>选择人脸检测器</h4>
                <n-select v-model:value="facevalue" :options='faces' />
                <h4>视频控制</h4>
                <n-radio-group v-model:value="detectFace" name="radiogroup2">
                    <n-space>
                        <n-radio value="detectSingleFace">单人检测</n-radio>
                        <n-radio value="detectAllFaces">多人检测</n-radio>
                    </n-space>
                </n-radio-group>
                <h4>下载控制</h4>
                <n-checkbox style="margin-top: 10px" @update:checked="handleUpdateChecked" label="启用下载" />
            </div>
            <div style="position: relative">
                <!-- <video id="inputVideo" :src="drawImg" muted playsinline></video> -->
                <!-- <n-spin :show="showLoading"> -->
                    <video
                        id="myVideo"
                        poster="https://dummyimage.com/1280x720"
                        muted
                        loop
                        playsinline
                        @loadedmetadata="updateResults"
                    ></video>
                    <canvas id="overlay" />
                <div id='facesContainer'></div>
                <!-- </n-spin> -->
            </div>
        </n-space>
    </div>
    <n-modal v-model:show="showLoading">
        <div class="loader">加载中...</div>
    </n-modal>
    
</template>

<script>
import { defineComponent } from "vue";
import { useMessage } from 'naive-ui'
import * as faceapi from 'face-api.js'
export default defineComponent({
    name: "webcam-face-detection",
    data() {
		return {
            detection: 'landmark',
            showModal: true,
            facesContainer: null,
            showLoading: false,
            facevalue: 'ssdMobilenetv1',
            faces: [
                {
                    label: 'SSD Mobilenet V1',
                    value: 'ssdMobilenetv1'
                },
                {
                    label: 'Tiny Face Detector',
                    value: 'tinyFaceDetector'
                }
            ],
            options: null,
            inputVideo: null,
            canvas: null,
            timeout: null,
            // 视频媒体参数配置
            constraints: {
                audio: false,
                video: {
                // ideal（应用最理想的）
                width: {
                    min: 320,
                    ideal: 1280,
                    max: 1920,
                },
                height: {
                    min: 240,
                    ideal: 720,
                    max: 1080,
                },
                // frameRate受限带宽传输时，低帧率可能更适宜
                frameRate: {
                    min: 15,
                    ideal: 30,
                    max: 60,
                },
                // 显示模式前置后置
                facingMode: "environment",
                },
            },
            download: false,
            withBox: false,
            detectFace: 'detectAllFaces' // 单人或多人   detectAllFaces
		}
	},
    watch: {
        detection(val) {
            this.inputVideo.pause();
            setTimeout(() => {
                this.inputVideo.play();
                setTimeout(() => this.updateResults(), 100);
            }, 100);
        },
        facevalue(val) {
            this.fnInit()
            this.updateResults()
        },
        detectFace(val) {
            this.updateResults()
        },
        'constraints.video.facingMode': {
            handler(val) {
                this.updateResults()
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.fnInit()
        });
        this.$message = useMessage()
        this.inputVideo = document.getElementById('myVideo')
        this.canvas = document.getElementById('overlay')
        this.facesContainer = document.getElementById('facesContainer')
    },
    methods: {
        // 初始化模型加载
        async fnInit() {
            this.showLoading = true
            await faceapi.nets[this.facevalue].loadFromUri("/models");// 算法模型
            await faceapi.loadFaceLandmarkModel("/models");// 轮廓模型
            await faceapi.loadFaceExpressionModel("/models"); // 表情模型
            await faceapi.loadAgeGenderModel("/models"); // 年龄模型
            // 根据模型参数识别调整结果
            switch (this.facevalue) {
                case "ssdMobilenetv1":
                this.options = new faceapi.SsdMobilenetv1Options({
                    minConfidence: 0.5, // 0.1 ~ 0.9
                });
                break;
                case "tinyFaceDetector":
                this.options = new faceapi.TinyFaceDetectorOptions({
                    inputSize: 512, // 160 224 320 416 512 608
                    scoreThreshold: 0.5, // 0.1 ~ 0.9
                });
                break;
                case "mtcnn":
                this.options = new faceapi.MtcnnOptions({
                    minFaceSize: 20, // 1 - 50
                    scaleFactor: 0.709, // 0.1 ~ 0.9
                });
                break;
            }
            this.showLoading = false
        },
        handleUpdateChecked(value) {
            this.download = value
        },
        handleChecked(value) {
            this.withBox = value
        },
        displayExtractedFaces(faceImages) {
            const {canvas, inputVideo, facesContainer} = this
            // faceapi.matchDimensions(canvas, inputVideo)

            if (facesContainer.children.length > 50) {
                facesContainer.innerHTML = ''
            }
            faceImages.forEach(canvas => {
                canvas.style.margin='10px'
                facesContainer.append(canvas)
                if (this.download) {
                    var url = canvas.toDataURL('image/png')
                    // 生成一个a元素
                    var a = document.createElement('a')
                    // 创建一个单击事件
                    var event = new MouseEvent('click')
                    
                    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
                    a.download = new Date().getTime() || '下载图片名称'
                    // 将生成的URL设置为a.href属性
                    a.href = url
                    
                    // 触发a的单击事件
                    a.dispatchEvent(event)
                }
            })
        },
        // 启动摄像头视频媒体
        fnOpen() {
            if (typeof window.stream === "object") return;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                clearTimeout(this.timeout);
                navigator.mediaDevices
                .getUserMedia(this.constraints)
                .then((stream) => {
                    window.stream = stream; // 使流对浏览器控制台可用
                    this.inputVideo.srcObject = stream;
                    this.inputVideo.play();
                })
                .catch(() => {
                    this.$message.error('视频媒体流获取错误！')
                });
            }, 100);
        },
        // 结束摄像头视频媒体
        fnClose() {
            this.canvas
                .getContext("2d")
                .clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.inputVideo.pause();
            clearTimeout(this.timeout);
            if (typeof window.stream === "object") {
                window.stream.getTracks().forEach((track) => track.stop());
                window.stream = "";
                this.inputVideo.srcObject = null;
            }
        },
        async updateResults() {
            const {canvas, inputVideo} = this
            if (inputVideo.paused) return clearTimeout(this.timeout);
            let result = null
            switch (this.detection) {
                case "landmark":
                    result = await faceapi[this.detectFace](inputVideo, this.options).withFaceLandmarks()
                    break;
                case "expression":
                    result = await faceapi[this.detectFace](inputVideo, this.options).withFaceLandmarks().withFaceExpressions()
                    break;
                case "age_gender":
                    result = await faceapi[this.detectFace](inputVideo, this.options).withFaceLandmarks().withAgeAndGender()
                    break;
            
                default:
                    result = await faceapi[this.detectFace](inputVideo, this.options)
                    break;
            }

            // 提取人脸
            let detections = await faceapi[this.detectFace](inputVideo, this.options)
            detections = detections instanceof Array ? detections : [detections]
            const faceImages = await faceapi.extractFaces(inputVideo, detections)
            if (faceImages.length) {
                this.displayExtractedFaces(faceImages)
            }

            if (result && !inputVideo.paused) {
                const dims = faceapi.matchDimensions(canvas, inputVideo, true);
                const resizeResults = faceapi.resizeResults(result, dims);
                
                !this.withBox && faceapi.draw.drawDetections(canvas, resizeResults)
                faceapi.draw.drawFaceLandmarks(canvas, resizeResults)
                if (this.detection === 'expression') {
                    faceapi.draw.drawFaceExpressions(canvas, resizeResults, 0.05);
                } else if (this.detection === 'age_gender') {
                    if (Array.isArray(resizeResults)) {
                        resizeResults.forEach((result) => {
                            const { age, gender, genderProbability } = result;
                            new faceapi.draw.DrawTextField(
                            [
                                `${Math.round(age, 0)} years`,
                                `${gender} (${Math.round(genderProbability)})`,
                            ],
                            result.detection.box.bottomLeft
                            ).draw(canvas);
                        });
                    } else {
                        const { age, gender, genderProbability } = resizeResults;
                        new faceapi.draw.DrawTextField(
                            [
                            `${Math.round(age, 0)} years`,
                            `${gender} (${Math.round(genderProbability)})`,
                            ],
                            resizeResults.detection.box.bottomLeft
                        ).draw(canvas);
                    }
                }
            } else {
                canvas
                .getContext("2d")
                .clearRect(0, 0, canvas.width, canvas.height);
            }
            this.timeout = setTimeout(() => this.updateResults());
        }
    },
    beforeUnmount() {
        this.fnClose();
    },
});
</script>

<style scoped>
label {
    font-size: 12px;
    color: #333;
}
.n-space {
    flex-flow: nowrap !important;
}
#overlay {
    position: absolute;
    top: 0;
    left: 0;
}

.loader {
  text-align: center;
  color: aquamarine;
  font-size: 14px;
}
</style>
