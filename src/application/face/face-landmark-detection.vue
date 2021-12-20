<template>
    <div style="position: relative" class="margin">
        <n-space>
            <div style="width: 300px;margin-right: 10px">
                <h4>图片输入</h4>
                <label for="">选择一个照片吧：</label>
                <n-select v-model:value="selectvalue" :options="defaultImgs" />
                <n-divider title-placement="left">或者</n-divider>
                <label for="">输入一个图片链接：</label>
                <n-input v-model:value="imgUrl" type="text" placeholder="图片链接" />
                <n-button @click="clickConfirm">确定</n-button>
                <n-divider title-placement="left">或者</n-divider>
                <label for="">从本地选一张图片：</label>
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
                <n-checkbox style="margin-top: 10px" @update:checked="handleUpdateChecked" label="隐藏边界框" />
            </div>
            <div style="position: relative">
                <img id="inputImg" style="width: 100%;border:0" :src="drawImg" />
                <!-- <n-spin :show="showLoading"> -->
                    <canvas id="overlay" />
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
    name: "face-landmark-detection",
    data() {
		return {
            showModal: true,
            showLoading: false,
            checked: false,
            minConfidence: 0.5,
            scoreThreshold: 0.5,
            inputSize: 512,
            imgUrl: '',
            fileList: [],
            selectvalue: 'bbt1.jpg',
            facevalue: 'ssdMobilenetv1',
            drawImg: '/images/bbt1.jpg',
            defaultImgs: [
                {
                    label: 'bbt1.jpg',
                    value: 'bbt1.jpg'
                },
                {
                    label: 'bbt2.jpg',
                    value: 'bbt2.jpg'
                },
                {
                    label: 'bbt3.jpg',
                    value: 'bbt3.jpg'
                },
                {
                    label: 'bbt4.jpg',
                    value: 'bbt4.jpg'
                },
                {
                    label: 'bbt5.jpg',
                    value: 'bbt5.jpg'
                }
            ],
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
            inputImgEl: null,
            canvas: null
		}
	},
    watch: {
        selectvalue(val) {
            this.drawImg = `/images/${val}`
            setTimeout(() => {
                this.updateResults()
            }, 0)
        },
        facevalue(val) {
            this.fnInit()
            this.updateResults()
        }
    },
    mounted() {
        // this.updateResults()
        this.$nextTick(() => {
            this.fnInit().then(() => this.updateResults());
        });
        this.$message = useMessage()
        this.inputImgEl = document.getElementById('inputImg')
        this.canvas = document.getElementById('overlay')
    },
    methods: {
        // 初始化模型加载
        async fnInit() {
            this.showLoading = true
            await faceapi.nets[this.facevalue].loadFromUri("/models");
            await faceapi.loadFaceLandmarkModel("/models");
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
            if (this.imgUrl) {
                let img = await this.requestExternalImage(this.imgUrl)
                this.drawImg = img.src
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
        isFaceDetectionModelLoaded() {
            return !!this.getCurrentFaceDetectionNet().params
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
                return await faceapi.bufferToImage(blob)
            } catch (e) {
                throw new Error('failed to load image from url: ' + imageUrl)
            }
        },
        async updateResults() {
            if (!this.isFaceDetectionModelLoaded()) {
                return
            }
            const {canvas, inputImgEl} = this
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
            const options = this.getFaceDetectorOptions()

            const results = await faceapi.detectAllFaces(inputImgEl, options).withFaceLandmarks()
            canvas.width = inputImgEl.width
            canvas.height = inputImgEl.height
            faceapi.matchDimensions(canvas, inputImgEl)
            let res = faceapi.resizeResults(results, inputImgEl)
            if (res.length) {
                if (!this.checked) {
                    faceapi.draw.drawDetections(canvas, res)
                }
                faceapi.draw.drawFaceLandmarks(canvas, res)
            } else {
                this.$message.error('这可能不是个人！')
            }
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
