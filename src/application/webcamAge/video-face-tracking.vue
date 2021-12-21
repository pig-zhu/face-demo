<template>
    <div style="position: relative" class="margin">
        <n-space>
            <div style="width: 300px;margin-right: 10px">
                <h4>视频输入</h4>
                <label for="">输入一个视频链接：</label>
                <n-input v-model:value="imgUrl" type="text" placeholder="视频链接" />
                <n-button @click="clickConfirm">确定</n-button>
                <n-divider title-placement="left">或者</n-divider>
                <label for="">从本地选一个视频：</label>
                <n-upload
                    @change="handleChange"
                    :default-upload="false"
                    ref="upload"
                >
                    <n-button>选择文件</n-button>
                </n-upload>
                <n-divider title-placement="left"></n-divider>
                <h4>选择人脸检测器</h4>
                <n-select v-model:value="facevalue" :options='faces' />
                <!-- <n-checkbox style="margin-top: 10px" @update:checked="handleUpdateChecked" label="隐藏边界框" /> -->
                <h4>视频控制</h4>
                <n-button  @click="play">{{videoPlay ? '暂停播放' : '开始播放'}}</n-button>
            </div>
            <div style="position: relative">
                <video id="inputVideo" :src="drawImg" muted playsinline></video>
                <!-- <n-spin :show="showLoading"> -->
                    <canvas id="overlay" />
                <!-- </n-spin> -->
            </div>
        </n-space>
    </div>
    
</template>

<script>
import { defineComponent } from "vue";
import { useMessage } from 'naive-ui'
import * as faceapi from 'face-api.js'
export default defineComponent({
    name: "video-face-tracking",
    data() {
		return {
            videoPlay: false,
            showModal: true,
            showLoading: false,
            checked: false,
            minConfidence: 0.5,
            scoreThreshold: 0.5,
            inputSize: 512,
            imgUrl: '',
            drawImg: '/media/test.mp4',
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
            timeout: null
		}
	},
    watch: {
        facevalue(val) {
            this.fnInit()
            this.updateResults()
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.fnInit()
        });
        this.$message = useMessage()
        this.inputVideo = document.getElementById('inputVideo')
        this.canvas = document.getElementById('overlay')
    },
    methods: {
        play() {
            if (this.inputVideo.paused) {
                this.inputVideo.play();
                this.videoPlay = true
                setTimeout(() => this.updateResults(), 100);
            } else {
                this.videoPlay = false
                this.inputVideo.pause();
            }
        },
        // 初始化模型加载
        async fnInit() {
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
        },
        handleChange({event, file, fileList}) {
            this.drawImg = URL.createObjectURL(file.file)
            this.updateResults()
            this.fileList = fileList
        },
        handleUpdateChecked(value){
            this.checked = value
            this.updateResults()
        },
        async clickConfirm() {
            this.videoPlay = false
            this.inputVideo.pause();
            this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height)
            if (this.imgUrl) {
                let img = await this.requestExternalImage(this.imgUrl)
                this.drawImg = URL.createObjectURL(img)
                this.updateResults()
            }
        },
        getCurrentFaceDetectionNet() {
            if (this.facevalue === 'ssdMobilenetv1') {
                return faceapi.nets.ssdMobilenetv1
            }
            if (this.facevalue === 'tinyFaceDetector') {
                return faceapi.nets.tinyFaceDetector
            }
        },
        getFaceDetectorOptions() {
            return this.facevalue === 'ssdMobilenetv1'
                ? new faceapi.SsdMobilenetv1Options({ minConfidence:this.minConfidence })
                : new faceapi.TinyFaceDetectorOptions({ inputSize:this.inputSize, scoreThreshold:this.scoreThreshold })
        },
        async requestExternalImage(imageUrl){
            let res = await fetch(imageUrl)
            try {
                let blob = await res.blob()
                return blob
            } catch (e) {
                throw new Error('failed to load image from url: ' + imageUrl)
            }
        },
        async updateResults() {
            const {canvas, inputVideo} = this
            if (inputVideo.paused) return clearTimeout(this.timeout);
            const options = this.getFaceDetectorOptions()
            // const drawBoxes = withBoxes

            const results = await faceapi.detectAllFaces(inputVideo, options)
            const dims = faceapi.matchDimensions(canvas, inputVideo, true)
            const resizedResults = faceapi.resizeResults(results, dims)

            if (resizedResults.length) {
                faceapi.draw.drawDetections(canvas, resizedResults)
            } else {
                // this.$message.error('这可能不是个人！')
            }
            this.timeout = setTimeout(() => this.updateResults());
        }
    }
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
