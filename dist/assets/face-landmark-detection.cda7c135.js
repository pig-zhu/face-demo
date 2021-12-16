import{defineComponent as y,resolveComponent as n,openBlock as F,createElementBlock as C,Fragment as j,createElementVNode as a,createVNode as s,withCtx as l,pushScopeId as D,popScopeId as L,createTextVNode as r}from"vue";import{n as h,l as M,M as U,T as b,S as g,k as R}from"./FaceMatcher.94dbf9cd.js";import{d as S}from"./drawDetections.cb76136a.js";import{b as T}from"./bufferToImage.0eb741dc.js";import{d as E,m as $,r as z}from"./resizeResults.b26e0a3c.js";import{_ as O}from"./index.1b47e509.js";import{u as N}from"./vendor.464b1a6c.js";const B=y({name:"face-landmark-detection",data(){return{showModal:!0,showLoading:!1,checked:!1,minConfidence:.5,scoreThreshold:.5,inputSize:512,imgUrl:"",fileList:[],selectvalue:"bbt1.jpg",facevalue:"ssdMobilenetv1",drawImg:"/images/bbt1.jpg",defaultImgs:[{label:"bbt1.jpg",value:"bbt1.jpg"},{label:"bbt2.jpg",value:"bbt2.jpg"},{label:"bbt3.jpg",value:"bbt3.jpg"},{label:"bbt4.jpg",value:"bbt4.jpg"},{label:"bbt5.jpg",value:"bbt5.jpg"}],faces:[{label:"SSD Mobilenet V1",value:"ssdMobilenetv1"},{label:"Tiny Face Detector",value:"tinyFaceDetector"}],options:null,inputImgEl:null,canvas:null}},watch:{selectvalue(e){this.drawImg=`public/images/${e}`,setTimeout(()=>{this.updateResults()},0)},facevalue(e){this.fnInit(),this.updateResults()}},mounted(){this.$nextTick(()=>{this.fnInit().then(()=>this.updateResults())}),this.$message=N(),this.inputImgEl=document.getElementById("inputImg"),this.canvas=document.getElementById("overlay")},methods:{async fnInit(){switch(this.showLoading=!0,await h[this.facevalue].loadFromUri("/models"),await M("/models"),this.facevalue){case"ssdMobilenetv1":this.options=new g({minConfidence:.5});break;case"tinyFaceDetector":this.options=new b({inputSize:512,scoreThreshold:.5});break;case"mtcnn":this.options=new U({minFaceSize:20,scaleFactor:.709});break}this.showLoading=!1},handleChange({event:e,file:t,fileList:o}){this.drawImg=URL.createObjectURL(t.file),this.updateResults(),this.fileList=o},handleUpdateChecked(e){this.checked=e,this.updateResults()},async clickConfirm(){if(this.imgUrl){let e=await this.requestExternalImage(this.imgUrl);this.drawImg=e.src,this.updateResults()}},getCurrentFaceDetectionNet(){if(this.facevalue==="ssdMobilenetv1")return h.ssdMobilenetv1;if(this.facevalue==="tinyFaceDetector")return h.tinyFaceDetector},isFaceDetectionModelLoaded(){return!!this.getCurrentFaceDetectionNet().params},getFaceDetectorOptions(){return this.facevalue==="ssdMobilenetv1"?new g({minConfidence:this.minConfidence}):new b({inputSize:this.inputSize,scoreThreshold:this.scoreThreshold})},async requestExternalImage(e){let t=await fetch(e);try{let o=await t.blob();return await T(o)}catch{throw new Error("failed to load image from url: "+e)}},async updateResults(){if(!this.isFaceDetectionModelLoaded())return;const{canvas:e,inputImgEl:t}=this;e.getContext("2d").clearRect(0,0,e.width,e.height);const o=this.getFaceDetectorOptions(),p=await E(t,o).withFaceLandmarks();e.width=t.width,e.height=t.height,$(e,t);let d=z(p,t);d.length?(this.checked||S(e,d),R(e,d)):this.$message.error("\u8FD9\u53EF\u80FD\u4E0D\u662F\u4E2A\u4EBA\uFF01")}}}),c=e=>(D("data-v-a7201a14"),e=e(),L(),e),V={style:{position:"relative"},class:"margin"},x={style:{width:"300px","margin-right":"10px"}},q=c(()=>a("h4",null,"\u56FE\u7247\u8F93\u5165",-1)),A=c(()=>a("label",{for:""},"\u9009\u62E9\u4E00\u4E2A\u7167\u7247\u5427\uFF1A",-1)),G=r("\u6216\u8005"),H=c(()=>a("label",{for:""},"\u8F93\u5165\u4E00\u4E2A\u56FE\u7247\u94FE\u63A5\uFF1A",-1)),J=r("\u786E\u5B9A"),K=r("\u6216\u8005"),P=c(()=>a("label",{for:""},"\u4ECE\u672C\u5730\u9009\u4E00\u5F20\u56FE\u7247\uFF1A",-1)),Q=r("\u9009\u62E9\u6587\u4EF6"),W=c(()=>a("h4",null,"\u9009\u62E9\u4EBA\u8138\u68C0\u6D4B\u5668",-1)),X={style:{position:"relative"}},Y=["src"],Z=c(()=>a("canvas",{id:"overlay"},null,-1)),ee=c(()=>a("div",{class:"loader"},"\u52A0\u8F7D\u4E2D...",-1));function te(e,t,o,p,d,se){const m=n("n-select"),u=n("n-divider"),v=n("n-input"),f=n("n-button"),_=n("n-upload"),w=n("n-checkbox"),k=n("n-space"),I=n("n-modal");return F(),C(j,null,[a("div",V,[s(k,null,{default:l(()=>[a("div",x,[q,A,s(m,{value:e.selectvalue,"onUpdate:value":t[0]||(t[0]=i=>e.selectvalue=i),options:e.defaultImgs},null,8,["value","options"]),s(u,{"title-placement":"left"},{default:l(()=>[G]),_:1}),H,s(v,{value:e.imgUrl,"onUpdate:value":t[1]||(t[1]=i=>e.imgUrl=i),type:"text",placeholder:"\u56FE\u7247\u94FE\u63A5"},null,8,["value"]),s(f,{onClick:e.clickConfirm},{default:l(()=>[J]),_:1},8,["onClick"]),s(u,{"title-placement":"left"},{default:l(()=>[K]),_:1}),P,s(_,{onChange:e.handleChange,"default-upload":!1,ref:"upload"},{default:l(()=>[s(f,null,{default:l(()=>[Q]),_:1})]),_:1},8,["onChange"]),s(u,{"title-placement":"left"}),W,s(m,{value:e.facevalue,"onUpdate:value":t[2]||(t[2]=i=>e.facevalue=i),options:e.faces},null,8,["value","options"]),s(w,{style:{"margin-top":"10px"},"onUpdate:checked":e.handleUpdateChecked,label:"\u9690\u85CF\u8FB9\u754C\u6846"},null,8,["onUpdate:checked"])]),a("div",X,[a("img",{id:"inputImg",style:{width:"100%",border:"0"},src:e.drawImg},null,8,Y),Z])]),_:1})]),s(I,{show:e.showLoading,"onUpdate:show":t[3]||(t[3]=i=>e.showLoading=i)},{default:l(()=>[ee]),_:1},8,["show"])],64)}var re=O(B,[["render",te],["__scopeId","data-v-a7201a14"]]);export{re as default};
