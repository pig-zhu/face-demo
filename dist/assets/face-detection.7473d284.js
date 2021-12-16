import{defineComponent as y,resolveComponent as i,openBlock as j,createElementBlock as C,Fragment as D,createElementVNode as t,createVNode as n,withCtx as l,pushScopeId as F,popScopeId as M,createTextVNode as r}from"vue";import{n as h,M as S,T as b,S as g}from"./FaceMatcher.94dbf9cd.js";import{d as U}from"./drawDetections.cb76136a.js";import{b as k}from"./bufferToImage.0eb741dc.js";import{d as L,m as T,r as R}from"./resizeResults.b26e0a3c.js";import{_ as E}from"./index.1b47e509.js";import{u as $}from"./vendor.464b1a6c.js";const z=y({name:"face-detection",data(){return{showModal:!0,showLoading:!1,minConfidence:.5,scoreThreshold:.5,inputSize:512,imgUrl:"",fileList:[],selectvalue:"bbt1.jpg",facevalue:"ssdMobilenetv1",drawImg:"/images/bbt1.jpg",defaultImgs:[{label:"bbt1.jpg",value:"bbt1.jpg"},{label:"bbt2.jpg",value:"bbt2.jpg"},{label:"bbt3.jpg",value:"bbt3.jpg"},{label:"bbt4.jpg",value:"bbt4.jpg"},{label:"bbt5.jpg",value:"bbt5.jpg"}],faces:[{label:"SSD Mobilenet V1",value:"ssdMobilenetv1"},{label:"Tiny Face Detector",value:"tinyFaceDetector"}],options:null}},watch:{selectvalue(e){this.drawImg=`public/images/${e}`,this.updateResults()},facevalue(e){this.fnInit(),this.updateResults()}},mounted(){this.$nextTick(()=>{this.fnInit().then(()=>this.updateResults())}),this.$message=$()},methods:{async fnInit(){switch(this.showLoading=!0,await h[this.facevalue].loadFromUri("/models"),this.facevalue){case"ssdMobilenetv1":this.options=new g({minConfidence:.5});break;case"tinyFaceDetector":this.options=new b({inputSize:512,scoreThreshold:.5});break;case"mtcnn":this.options=new S({minFaceSize:20,scaleFactor:.709});break}this.showLoading=!1},handleChange({event:e,file:s,fileList:a}){this.drawImg=URL.createObjectURL(s.file),this.updateResults(),this.fileList=a},handleUpdateChecked(){},async clickConfirm(){if(this.imgUrl){let e=await this.requestExternalImage(this.imgUrl);this.drawImg=e.src,this.updateResults()}},getCurrentFaceDetectionNet(){if(this.facevalue==="ssdMobilenetv1")return h.ssdMobilenetv1;if(this.facevalue==="tinyFaceDetector")return h.tinyFaceDetector},isFaceDetectionModelLoaded(){return!!this.getCurrentFaceDetectionNet().params},getFaceDetectorOptions(){return this.facevalue==="ssdMobilenetv1"?new g({minConfidence:this.minConfidence}):new b({inputSize:this.inputSize,scoreThreshold:this.scoreThreshold})},async requestExternalImage(e){let s=await fetch(e);try{let a=await s.blob();return await k(a)}catch{throw new Error("failed to load image from url: "+e)}},async updateResults(){if(!this.isFaceDetectionModelLoaded())return;const e=document.getElementById("inputImg"),s=this.getFaceDetectorOptions(),a=await L(e,s),c=document.getElementById("overlay");c.width=e.width,c.height=e.height,T(c,e);let u=R(a,e);u.length?U(c,u):this.$message.error("\u8FD9\u53EF\u80FD\u4E0D\u662F\u4E2A\u4EBA\uFF01")}}}),d=e=>(F("data-v-3f527fde"),e=e(),M(),e),O={style:{position:"relative"},class:"margin"},N={style:{width:"300px","margin-right":"10px"}},B=d(()=>t("h4",null,"\u56FE\u7247\u8F93\u5165",-1)),V=d(()=>t("label",{for:""},"\u9009\u62E9\u4E00\u4E2A\u7167\u7247\u5427\uFF1A",-1)),q=r("\u6216\u8005"),A=d(()=>t("label",{for:""},"\u8F93\u5165\u4E00\u4E2A\u56FE\u7247\u94FE\u63A5\uFF1A",-1)),x=r("\u786E\u5B9A"),G=r("\u6216\u8005"),H=d(()=>t("label",{for:""},"\u4ECE\u672C\u5730\u9009\u4E00\u5F20\u56FE\u7247\uFF1A",-1)),J=r("\u9009\u62E9\u6587\u4EF6"),K=d(()=>t("h4",null,"\u9009\u62E9\u4EBA\u8138\u68C0\u6D4B\u5668",-1)),P={style:{position:"relative"}},Q=["src"],W=d(()=>t("canvas",{id:"overlay"},null,-1)),X=d(()=>t("div",{class:"loader"},[t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span"),t("span")],-1));function Y(e,s,a,c,u,Z){const m=i("n-select"),p=i("n-divider"),v=i("n-input"),f=i("n-button"),_=i("n-upload"),w=i("n-space"),I=i("n-modal");return j(),C(D,null,[t("div",O,[n(w,null,{default:l(()=>[t("div",N,[B,V,n(m,{value:e.selectvalue,"onUpdate:value":s[0]||(s[0]=o=>e.selectvalue=o),options:e.defaultImgs},null,8,["value","options"]),n(p,{"title-placement":"left"},{default:l(()=>[q]),_:1}),A,n(v,{value:e.imgUrl,"onUpdate:value":s[1]||(s[1]=o=>e.imgUrl=o),type:"text",placeholder:"\u56FE\u7247\u94FE\u63A5"},null,8,["value"]),n(f,{onClick:e.clickConfirm},{default:l(()=>[x]),_:1},8,["onClick"]),n(p,{"title-placement":"left"},{default:l(()=>[G]),_:1}),H,n(_,{onChange:e.handleChange,"default-upload":!1,ref:"upload"},{default:l(()=>[n(f,null,{default:l(()=>[J]),_:1})]),_:1},8,["onChange"]),n(p,{"title-placement":"left"}),K,n(m,{value:e.facevalue,"onUpdate:value":s[2]||(s[2]=o=>e.facevalue=o),options:e.faces},null,8,["value","options"])]),t("div",P,[t("img",{id:"inputImg",style:{width:"100%",border:"0"},src:e.drawImg},null,8,Q),W])]),_:1})]),n(I,{show:e.showLoading,"onUpdate:show":s[3]||(s[3]=o=>e.showLoading=o)},{default:l(()=>[X]),_:1},8,["show"])],64)}var le=E(z,[["render",Y],["__scopeId","data-v-3f527fde"]]);export{le as default};