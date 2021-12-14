<template>
    <div style="position: relative" class="margin">
        <n-space justify="space-between">
            <div style="width: 300px;margin-right: 10px">
                <h4>原始图片输入</h4>
                <label for="">选择一个照片吧：</label>
                <n-select v-model:value="selectvalue1" :options="defaultImgs" />
                <n-divider title-placement="left">或者</n-divider>
                <label for="">输入一个图片链接：</label>
                <n-input v-model:value="imgUrl1" type="text" placeholder="图片链接" />
                <n-button @click="clickConfirm(1)">确定</n-button>
                <n-divider title-placement="left">或者</n-divider>
                <label for="">从本地选一张图片：</label>
                <n-upload
                    @change="handleChange"
                    :default-upload="false"
                    ref="upload1"
                >
                    <n-button>选择文件</n-button>
                </n-upload>
                <n-divider title-placement="left"></n-divider>
                <h4>选择人脸检测器</h4>
                <n-select v-model:value="facevalue" :options='faces' />
                <!-- <n-checkbox style="margin-top: 10px" @update:checked="handleUpdateChecked" label="隐藏边界框" /> -->
            </div>
            <div style="width: 300px;margin-right: 10px">
                <h4>对比图片输入</h4>
                <label for="">选择一个照片吧：</label>
                <n-select v-model:value="selectvalue2" :options="defaultImgs" />
                <n-divider title-placement="left">或者</n-divider>
                <label for="">输入一个图片链接：</label>
                <n-input v-model:value="imgUrl2" type="text" placeholder="图片链接" />
                <n-button @click="clickConfirm(2)">确定</n-button>
                <n-divider title-placement="left">或者</n-divider>
                <label for="">从本地选一张图片：</label>
                <n-upload
                    @change="handleChange"
                    :default-upload="false"
                    ref="upload"
                >
                    <n-button>选择文件</n-button>
                </n-upload>
                <!-- <n-checkbox style="margin-top: 10px" @update:checked="handleUpdateChecked" label="隐藏边界框" /> -->
            </div>
            <div>
                <div style="position: relative">
                <img id="inputImg1" style="width: 100%;border:0" :src="drawImg1" />
                <!-- <n-spin :show="showLoading"> -->
                    <canvas class="overlay" id="overlay1" />
                <!-- </n-spin> -->
            </div>
            <div style="position: relative">
                <img id="inputImg2" style="width: 100%;border:0" :src="drawImg2" />
                <!-- <n-spin :show="showLoading"> -->
                    <canvas class="overlay" id="overlay2" />
                <!-- </n-spin> -->
            </div>
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
    name: "face-expression-recognition",
    data() {
		return {
            showModal: true,
            showLoading: false,
            minConfidence: 0.5,
            scoreThreshold: 0.5,
            inputSize: 512,
            imgUrl1: '',
            imgUrl2: '',
            fileList1: [],
            fileList2: [],
            selectvalue1: 'bbt1.jpg',
            selectvalue2: 'bbt1.jpg',
            facevalue: 'ssdMobilenetv1',
            drawImg1: '/images/bbt1.jpg',
            drawImg2: '/images/bbt1.jpg',
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
            inputImgEl1: null,
            inputImgEl2: null,
            canvas1: null,
            canvas2: null,
            faceMatcher: null
		}
	},
    watch: {
        selectvalue1(val) {
            this.drawImg1 = `public/images/${val}`
            setTimeout(() => {
                this.updateResults1()
            }, 0)
        },
        selectvalue2(val) {
            this.drawImg2 = `public/images/${val}`
            setTimeout(() => {
                this.updateResults2()
            }, 0)
        },
        facevalue(val) {
            this.fnInit()
            this.updateResults1()
        }
    },
    mounted() {
        // this.updateResults()
        this.$nextTick(() => {
            this.fnInit().then(() => this.updateResults());
        });
        this.$message = useMessage()
        this.inputImgEl1 = document.getElementById('inputImg1')
        this.inputImgEl2 = document.getElementById('inputImg2')
        this.canvas1 = document.getElementById('overlay1')
        this.canvas2 = document.getElementById('overlay2')
    },
    methods: {
        // 初始化模型加载
        async fnInit() {
            this.showLoading = true
            await faceapi.nets[this.facevalue].loadFromUri("/models");
            await faceapi.loadFaceLandmarkModel("/models");
            await faceapi.loadFaceRecognitionModel('/models')
            // await faceapi.loadFaceExpressionModel('/models')
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
        async updateResults(type = 1) {
            const canvas = this[`canvas${type}`]
            const inputImgEl = this[`inputImgEl${type}`]
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
            const fullFaceDescriptions = await faceapi
                .detectAllFaces(inputImgEl, this.getFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors()

            if (!fullFaceDescriptions.length) {
                return
            }
            canvas.width = inputImgEl.width
            canvas.height = inputImgEl.height
            this.faceMatcher = new faceapi.FaceMatcher(fullFaceDescriptions)
            faceapi.matchDimensions(canvas, inputImgEl)
            let res = faceapi.resizeResults(fullFaceDescriptions, inputImgEl)
            if (res.length) {
                const labels = this.faceMatcher.labeledDescriptors.map(ld => ld.label)
                res.forEach(({ detection, descriptor }) => {
                    const label = this.faceMatcher.findBestMatch(descriptor).toString()
                    const options = { label }
                    const drawBox = new faceapi.draw.DrawBox(detection.box, options)
                    drawBox.draw(canvas)
                })
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
.overlay {
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
