<template>
    <div style="position: relative" class="margin">
        <n-space>
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
                    @change="handleChange1"
                    :default-upload="false"
                    ref="upload1"
                >
                    <n-button>选择文件</n-button>
                </n-upload>
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
                    @change="handleChange2"
                    :default-upload="false"
                    ref="upload2"
                >
                    <n-button>选择文件</n-button>
                </n-upload>
                <n-divider title-placement="left"></n-divider>
                <h4>匹配结果：{{result}}</h4>
            </div>
            <div style="display: flex">
                <div style="position: relative;margin-right: 20px">
                    <img id="inputImg1" style="max-width: 100%;border:0" :src="drawImg1" />
                </div>
                <div style="position: relative">
                    <img id="inputImg2" style="max-width: 100%;border:0" :src="drawImg2" />
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
    name: "bbt-face-similarity",
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
            inputImgEl1: null,
            inputImgEl2: null,
            descriptors: { desc1: null, desc2: null },
            result: '-'
		}
	},
    watch: {
        selectvalue1(val) {
            this.drawImg1 = `/images/${val}`
            setTimeout(() => {
                this.onSelectionChanged(1)
            }, 0)
        },
        selectvalue2(val) {
            this.drawImg2 = `/images/${val}`
            setTimeout(() => {
                this.onSelectionChanged(2)
            }, 0)
        },
        facevalue(val) {
            this.fnInit()
        }
    },
    created() {
    },
    async mounted() {
        this.$message = useMessage()
        this.inputImgEl1 = document.getElementById('inputImg1')
        this.inputImgEl2 = document.getElementById('inputImg2')
        this.showLoading = true
        await faceapi.loadFaceRecognitionModel("/models");
        this.showLoading = false
        this.onSelectionChanged(1)
        this.onSelectionChanged(2)
    },
    methods: {
        handleChange1({event, file, fileList}) {
            this.drawImg1 = URL.createObjectURL(file.file)
            this.onSelectionChanged(1)
            this.fileList1 = fileList
        },
        handleChange2({event, file, fileList}) {
            this.drawImg2 = URL.createObjectURL(file.file)
            this.onSelectionChanged(2)
            this.fileList2 = fileList
        },
        async clickConfirm(type = 1) {
            if (this[`imgUrl${type}`]) {
                let img = await this.requestExternalImage(this[`imgUrl${type}`])
                this[`drawImg${type}`] = img.src
                if (type == 1) {
                    this.onSelectionChanged(1)
                } else {
                    this.onSelectionChanged(2)
                }
            }
        },
        async onSelectionChanged(which) {
            const input = await faceapi.fetchImage(this[`drawImg${which}`])
            this[`inputImgEl${which}`].src = input.src
            this.descriptors[`desc${which}`] = await faceapi.computeFaceDescriptor(input)
            if (this.descriptors.desc1 && this.descriptors.desc2) {
                this.updateResults()
            }
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
            let distance = faceapi.utils.round(
                faceapi.euclideanDistance(this.descriptors.desc1, this.descriptors.desc2)
            )
            this.result = distance > 0.6 ? `不匹配(${distance})` : `相似度(${(1-distance)*100}%)`
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
