<template>
    <div style="position: relative" class="margin">
        <n-space>
            <div style="width: 300px;margin-right: 10px">
                <h4>图片输入</h4>
                <!-- <label for="">选择一个照片吧：</label>
                <n-select v-model:value="selectvalue" :options="defaultImgs" />
                <n-divider title-placement="left">或者</n-divider> -->
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
                <n-divider title-placement="left"></n-divider>
                <h4>样本库</h4>
                <n-button @click="viewSample">查看样本库</n-button>
                <!-- <n-checkbox style="margin-top: 10px" @update:checked="handleUpdateChecked" label="隐藏边界框" /> -->
            </div>
            <div style="position: relative">
                <h4>匹配图</h4>
                <img id="inputImg" style="max-width: 600px;border:0" :src="drawImg" />
                <h3>识别结果（误差值越小越准确）：</h3>
                <div v-for="(res, j) in resultArr" :key="j" class="result">
                    <img :src="detArr[j]" :alt="res.result" />
                    <div class="info">
                    <span>对比：{{ res.target }}</span>
                    <span>结果：{{ res.result }}</span>
                    <span>时间：{{ res.time }}</span>
                    <span>FPS：{{ res.fps }}</span>
                    </div>
                </div>
            </div>
        </n-space>
    </div>
    <n-modal v-model:show="showLoading" :mask-closable="false">
        <div class="loader">
            加载中...
        </div>
    </n-modal>
    <n-modal
        class="custom-card"
        v-model:show="showView"
        preset="card"
        :style='{ width: "800px" }'
        title="样本库"
        size="huge"
        :bordered="false"
    >   
        <template #default> 
            <n-image-group>
                <div v-for="item in simpleImages" :key='item.name'>
                    <h4>{{item.name}}</h4>
                    <n-image
                        v-for="image in item.img"
                        :key="image"
                        width="100"
                        height="100"
                        :src="image"
                    />
                </div>
            </n-image-group> 
        </template>
        
    </n-modal>
</template>

<script>
import { defineComponent } from "vue";
import { useMessage } from 'naive-ui'
import * as faceapi from 'face-api.js'
import { simpleImages } from '@public/js/example'
export default defineComponent({
    name: "bbt-face-matching",
    data() {
		return {
            simpleImages: simpleImages,
            showModal: true,
            showView: false,
            showLoading: false,
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
            faceMatcher: null,
            inputImgEl: null,
            resultArr: []
		}
	},
    watch: {
        selectvalue(val) {
            this.drawImg = `/images/${val}`
            this.updateResults()
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
    },
    methods: {
        // 初始化模型加载
        async fnInit() {
            this.showLoading = true
            await faceapi.loadFaceRecognitionModel("/models");
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
            await this.fnfaceMatcher()
            this.showLoading = false
        },
        // 生成人脸匹配矩阵数组对象，样本图片同步转码
        async fnfaceMatcher() {
            const labeledFaceDescriptors = await Promise.all(
                this.simpleImages.map(async (item) => {
                    // 临时图片转码数据，将图片对象转数据矩阵对象
                    let descriptors = [];
                    for (let image of item.img) {
                        const imageEl = await faceapi.fetchImage(image);
                        descriptors.push(await faceapi.computeFaceDescriptor(imageEl));
                    }
                    // 返回图片用户和图片转码数组
                    return new faceapi.LabeledFaceDescriptors(item.name, descriptors);
                })
            );
            // 人脸匹配矩阵数组对象转码结果
            this.faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
        },
        handleChange({event, file, fileList}) {
            this.drawImg = URL.createObjectURL(file.file)
            setTimeout(() => {
                this.updateResults()
            }, 1000);
            this.fileList = fileList
        },
        // 查看样本库
        viewSample() {
            this.showView = true
        },
        async clickConfirm() {
            if (this.imgUrl) {
                let img = await faceapi.fetchImage(this.imgUrl);
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
        async updateResults() {
            if (!this.isFaceDetectionModelLoaded()) {
                return
            }

            this.resultArr.forEach(({ detection, descriptor }) => {
                const label = this.faceMatcher.findBestMatch(descriptor).toString();
            });
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
