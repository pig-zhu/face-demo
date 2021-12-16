import{defineComponent as F,resolveComponent as i,openBlock as y,createElementBlock as j,Fragment as C,createElementVNode as s,createVNode as a,withCtx as l,pushScopeId as M,popScopeId as D,createTextVNode as c}from"vue";import{n as p,l as E,m as k,M as R,T as g,S as b}from"./FaceMatcher.94dbf9cd.js";import{d as L}from"./drawDetections.cb76136a.js";import{d as S}from"./drawFaceExpressions.fbbe264f.js";import{b as T}from"./bufferToImage.0eb741dc.js";import{d as U,m as x,r as $}from"./resizeResults.b26e0a3c.js";import{_ as z}from"./index.1b47e509.js";import{u as O}from"./vendor.464b1a6c.js";const N=F({name:"face-expression-recognition",data(){return{showModal:!0,showLoading:!1,checked:!1,minConfidence:.5,scoreThreshold:.5,inputSize:512,imgUrl:"",fileList:[],selectvalue:"bbt1.jpg",facevalue:"ssdMobilenetv1",drawImg:"/images/bbt1.jpg",defaultImgs:[{label:"bbt1.jpg",value:"bbt1.jpg"},{label:"bbt2.jpg",value:"bbt2.jpg"},{label:"bbt3.jpg",value:"bbt3.jpg"},{label:"bbt4.jpg",value:"bbt4.jpg"},{label:"bbt5.jpg",value:"bbt5.jpg"}],faces:[{label:"SSD Mobilenet V1",value:"ssdMobilenetv1"},{label:"Tiny Face Detector",value:"tinyFaceDetector"}],options:null,inputImgEl:null,canvas:null}},watch:{selectvalue(e){this.drawImg=`public/images/${e}`,setTimeout(()=>{this.updateResults()},0)},facevalue(e){this.fnInit(),this.updateResults()}},mounted(){this.$nextTick(()=>{this.fnInit().then(()=>this.updateResults())}),this.$message=O(),this.inputImgEl=document.getElementById("inputImg"),this.canvas=document.getElementById("overlay")},methods:{async fnInit(){switch(this.showLoading=!0,await p[this.facevalue].loadFromUri("/models"),await E("/models"),await k("/models"),this.facevalue){case"ssdMobilenetv1":this.options=new b({minConfidence:.5});break;case"tinyFaceDetector":this.options=new g({inputSize:512,scoreThreshold:.5});break;case"mtcnn":this.options=new R({minFaceSize:20,scaleFactor:.709});break}this.showLoading=!1},handleChange({event:e,file:t,fileList:o}){this.drawImg=URL.createObjectURL(t.file),this.updateResults(),this.fileList=o},handleUpdateChecked(e){this.checked=e,this.updateResults()},async clickConfirm(){if(this.imgUrl){let e=await this.requestExternalImage(this.imgUrl);this.drawImg=e.src,this.updateResults()}},getCurrentFaceDetectionNet(){if(this.facevalue==="ssdMobilenetv1")return p.ssdMobilenetv1;if(this.facevalue==="tinyFaceDetector")return p.tinyFaceDetector},isFaceDetectionModelLoaded(){return!!this.getCurrentFaceDetectionNet().params},getFaceDetectorOptions(){return this.facevalue==="ssdMobilenetv1"?new b({minConfidence:this.minConfidence}):new g({inputSize:this.inputSize,scoreThreshold:this.scoreThreshold})},async requestExternalImage(e){let t=await fetch(e);try{let o=await t.blob();return await T(o)}catch{throw new Error("failed to load image from url: "+e)}},async updateResults(){if(!this.isFaceDetectionModelLoaded())return;const{canvas:e,inputImgEl:t}=this;e.getContext("2d").clearRect(0,0,e.width,e.height);const o=this.getFaceDetectorOptions(),h=await U(t,o).withFaceLandmarks().withFaceExpressions();e.width=t.width,e.height=t.height,x(e,t);let r=$(h,t);r.length?(L(e,r),S(e,r,.05)):this.$message.error("\u8FD9\u53EF\u80FD\u4E0D\u662F\u4E2A\u4EBA\uFF01")}}}),d=e=>(M("data-v-33ab9807"),e=e(),D(),e),B={style:{position:"relative"},class:"margin"},V={style:{width:"300px","margin-right":"10px"}},q=d(()=>s("h4",null,"\u56FE\u7247\u8F93\u5165",-1)),A=d(()=>s("label",{for:""},"\u9009\u62E9\u4E00\u4E2A\u7167\u7247\u5427\uFF1A",-1)),G=c("\u6216\u8005"),H=d(()=>s("label",{for:""},"\u8F93\u5165\u4E00\u4E2A\u56FE\u7247\u94FE\u63A5\uFF1A",-1)),J=c("\u786E\u5B9A"),K=c("\u6216\u8005"),P=d(()=>s("label",{for:""},"\u4ECE\u672C\u5730\u9009\u4E00\u5F20\u56FE\u7247\uFF1A",-1)),Q=c("\u9009\u62E9\u6587\u4EF6"),W=d(()=>s("h4",null,"\u9009\u62E9\u4EBA\u8138\u68C0\u6D4B\u5668",-1)),X={style:{position:"relative"}},Y=["src"],Z=d(()=>s("canvas",{id:"overlay"},null,-1)),ee=d(()=>s("div",{class:"loader"},"\u52A0\u8F7D\u4E2D...",-1));function te(e,t,o,h,r,se){const m=i("n-select"),u=i("n-divider"),v=i("n-input"),f=i("n-button"),_=i("n-upload"),w=i("n-space"),I=i("n-modal");return y(),j(C,null,[s("div",B,[a(w,null,{default:l(()=>[s("div",V,[q,A,a(m,{value:e.selectvalue,"onUpdate:value":t[0]||(t[0]=n=>e.selectvalue=n),options:e.defaultImgs},null,8,["value","options"]),a(u,{"title-placement":"left"},{default:l(()=>[G]),_:1}),H,a(v,{value:e.imgUrl,"onUpdate:value":t[1]||(t[1]=n=>e.imgUrl=n),type:"text",placeholder:"\u56FE\u7247\u94FE\u63A5"},null,8,["value"]),a(f,{onClick:e.clickConfirm},{default:l(()=>[J]),_:1},8,["onClick"]),a(u,{"title-placement":"left"},{default:l(()=>[K]),_:1}),P,a(_,{onChange:e.handleChange,"default-upload":!1,ref:"upload"},{default:l(()=>[a(f,null,{default:l(()=>[Q]),_:1})]),_:1},8,["onChange"]),a(u,{"title-placement":"left"}),W,a(m,{value:e.facevalue,"onUpdate:value":t[2]||(t[2]=n=>e.facevalue=n),options:e.faces},null,8,["value","options"])]),s("div",X,[s("img",{id:"inputImg",style:{width:"100%",border:"0"},src:e.drawImg},null,8,Y),Z])]),_:1})]),a(I,{show:e.showLoading,"onUpdate:show":t[3]||(t[3]=n=>e.showLoading=n)},{default:l(()=>[ee]),_:1},8,["show"])],64)}var ue=z(N,[["render",te],["__scopeId","data-v-33ab9807"]]);export{ue as default};
