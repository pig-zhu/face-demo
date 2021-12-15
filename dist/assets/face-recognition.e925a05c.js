import{defineComponent as C,resolveComponent as r,openBlock as F,createElementBlock as M,Fragment as j,createElementVNode as s,createVNode as a,withCtx as l,pushScopeId as D,popScopeId as U,createTextVNode as d}from"vue";import{n as v,l as k,j as E,M as R,T as _,S as w,b as L,d as S,k as $,m as T,r as B,D as z}from"./resizeResults.d064f547.js";import{_ as O}from"./index.31beede5.js";import{u as N}from"./vendor.464b1a6c.js";const V=C({name:"face-expression-recognition",data(){return{showModal:!0,showLoading:!1,minConfidence:.5,scoreThreshold:.5,inputSize:512,imgUrl1:"",imgUrl2:"",fileList1:[],fileList2:[],selectvalue1:"bbt1.jpg",selectvalue2:"bbt1.jpg",facevalue:"ssdMobilenetv1",drawImg1:"/images/bbt1.jpg",drawImg2:"/images/bbt1.jpg",defaultImgs:[{label:"bbt1.jpg",value:"bbt1.jpg"},{label:"bbt2.jpg",value:"bbt2.jpg"},{label:"bbt3.jpg",value:"bbt3.jpg"},{label:"bbt4.jpg",value:"bbt4.jpg"},{label:"bbt5.jpg",value:"bbt5.jpg"}],faces:[{label:"SSD Mobilenet V1",value:"ssdMobilenetv1"},{label:"Tiny Face Detector",value:"tinyFaceDetector"}],options:null,inputImgEl1:null,inputImgEl2:null,canvas1:null,canvas2:null,faceMatcher:null}},watch:{selectvalue1(e){this.drawImg1=`public/images/${e}`,setTimeout(()=>{this.updateResults1()},0)},selectvalue2(e){this.drawImg2=`public/images/${e}`,setTimeout(()=>{this.updateResults2()},0)},facevalue(e){this.fnInit(),this.updateResults1()}},mounted(){this.$nextTick(()=>{this.fnInit().then(()=>this.updateResults())}),this.$message=N(),this.inputImgEl1=document.getElementById("inputImg1"),this.inputImgEl2=document.getElementById("inputImg2"),this.canvas1=document.getElementById("overlay1"),this.canvas2=document.getElementById("overlay2")},methods:{async fnInit(){switch(this.showLoading=!0,await v[this.facevalue].loadFromUri("/models"),await k("/models"),await E("/models"),this.facevalue){case"ssdMobilenetv1":this.options=new w({minConfidence:.5});break;case"tinyFaceDetector":this.options=new _({inputSize:512,scoreThreshold:.5});break;case"mtcnn":this.options=new R({minFaceSize:20,scaleFactor:.709});break}this.showLoading=!1},handleChange({event:e,file:t,fileList:i}){this.drawImg=URL.createObjectURL(t.file),this.updateResults(),this.fileList=i},handleUpdateChecked(e){this.checked=e,this.updateResults()},async clickConfirm(){if(this.imgUrl){let e=await this.requestExternalImage(this.imgUrl);this.drawImg=e.src,this.updateResults()}},getCurrentFaceDetectionNet(){if(this.facevalue==="ssdMobilenetv1")return v.ssdMobilenetv1;if(this.facevalue==="tinyFaceDetector")return v.tinyFaceDetector},isFaceDetectionModelLoaded(){return!!this.getCurrentFaceDetectionNet().params},getFaceDetectorOptions(){return this.facevalue==="ssdMobilenetv1"?new w({minConfidence:this.minConfidence}):new _({inputSize:this.inputSize,scoreThreshold:this.scoreThreshold})},async requestExternalImage(e){let t=await fetch(e);try{let i=await t.blob();return await L(i)}catch{throw new Error("failed to load image from url: "+e)}},async updateResults(e=1){const t=this[`canvas${e}`],i=this[`inputImgEl${e}`];t.getContext("2d").clearRect(0,0,t.width,t.height);const p=await S(i,this.getFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();if(!p.length)return;t.width=i.width,t.height=i.height,this.faceMatcher=new $(p),T(t,i);let f=B(p,i);f.length?(this.faceMatcher.labeledDescriptors.map(m=>m.label),f.forEach(({detection:m,descriptor:u})=>{const g={label:this.faceMatcher.findBestMatch(u).toString()};new z(m.box,g).draw(t)})):this.$message.error("\u8FD9\u53EF\u80FD\u4E0D\u662F\u4E2A\u4EBA\uFF01")}}}),o=e=>(D("data-v-75226321"),e=e(),U(),e),q={style:{position:"relative"},class:"margin"},x={style:{width:"300px","margin-right":"10px"}},A=o(()=>s("h4",null,"\u539F\u59CB\u56FE\u7247\u8F93\u5165",-1)),G=o(()=>s("label",{for:""},"\u9009\u62E9\u4E00\u4E2A\u7167\u7247\u5427\uFF1A",-1)),H=d("\u6216\u8005"),J=o(()=>s("label",{for:""},"\u8F93\u5165\u4E00\u4E2A\u56FE\u7247\u94FE\u63A5\uFF1A",-1)),K=d("\u786E\u5B9A"),P=d("\u6216\u8005"),Q=o(()=>s("label",{for:""},"\u4ECE\u672C\u5730\u9009\u4E00\u5F20\u56FE\u7247\uFF1A",-1)),W=d("\u9009\u62E9\u6587\u4EF6"),X=o(()=>s("h4",null,"\u9009\u62E9\u4EBA\u8138\u68C0\u6D4B\u5668",-1)),Y={style:{width:"300px","margin-right":"10px"}},Z=o(()=>s("h4",null,"\u5BF9\u6BD4\u56FE\u7247\u8F93\u5165",-1)),ee=o(()=>s("label",{for:""},"\u9009\u62E9\u4E00\u4E2A\u7167\u7247\u5427\uFF1A",-1)),te=d("\u6216\u8005"),se=o(()=>s("label",{for:""},"\u8F93\u5165\u4E00\u4E2A\u56FE\u7247\u94FE\u63A5\uFF1A",-1)),ae=d("\u786E\u5B9A"),ne=d("\u6216\u8005"),le=o(()=>s("label",{for:""},"\u4ECE\u672C\u5730\u9009\u4E00\u5F20\u56FE\u7247\uFF1A",-1)),oe=d("\u9009\u62E9\u6587\u4EF6"),ie={style:{position:"relative"}},de=["src"],re=o(()=>s("canvas",{class:"overlay",id:"overlay1"},null,-1)),ce={style:{position:"relative"}},ue=["src"],he=o(()=>s("canvas",{class:"overlay",id:"overlay2"},null,-1)),pe=o(()=>s("div",{class:"loader"},"\u52A0\u8F7D\u4E2D...",-1));function me(e,t,i,p,f,m){const u=r("n-select"),c=r("n-divider"),g=r("n-input"),h=r("n-button"),b=r("n-upload"),I=r("n-space"),y=r("n-modal");return F(),M(j,null,[s("div",q,[a(I,{justify:"space-between"},{default:l(()=>[s("div",x,[A,G,a(u,{value:e.selectvalue1,"onUpdate:value":t[0]||(t[0]=n=>e.selectvalue1=n),options:e.defaultImgs},null,8,["value","options"]),a(c,{"title-placement":"left"},{default:l(()=>[H]),_:1}),J,a(g,{value:e.imgUrl1,"onUpdate:value":t[1]||(t[1]=n=>e.imgUrl1=n),type:"text",placeholder:"\u56FE\u7247\u94FE\u63A5"},null,8,["value"]),a(h,{onClick:t[2]||(t[2]=n=>e.clickConfirm(1))},{default:l(()=>[K]),_:1}),a(c,{"title-placement":"left"},{default:l(()=>[P]),_:1}),Q,a(b,{onChange:e.handleChange,"default-upload":!1,ref:"upload1"},{default:l(()=>[a(h,null,{default:l(()=>[W]),_:1})]),_:1},8,["onChange"]),a(c,{"title-placement":"left"}),X,a(u,{value:e.facevalue,"onUpdate:value":t[3]||(t[3]=n=>e.facevalue=n),options:e.faces},null,8,["value","options"])]),s("div",Y,[Z,ee,a(u,{value:e.selectvalue2,"onUpdate:value":t[4]||(t[4]=n=>e.selectvalue2=n),options:e.defaultImgs},null,8,["value","options"]),a(c,{"title-placement":"left"},{default:l(()=>[te]),_:1}),se,a(g,{value:e.imgUrl2,"onUpdate:value":t[5]||(t[5]=n=>e.imgUrl2=n),type:"text",placeholder:"\u56FE\u7247\u94FE\u63A5"},null,8,["value"]),a(h,{onClick:t[6]||(t[6]=n=>e.clickConfirm(2))},{default:l(()=>[ae]),_:1}),a(c,{"title-placement":"left"},{default:l(()=>[ne]),_:1}),le,a(b,{onChange:e.handleChange,"default-upload":!1,ref:"upload"},{default:l(()=>[a(h,null,{default:l(()=>[oe]),_:1})]),_:1},8,["onChange"])]),s("div",null,[s("div",ie,[s("img",{id:"inputImg1",style:{width:"100%",border:"0"},src:e.drawImg1},null,8,de),re]),s("div",ce,[s("img",{id:"inputImg2",style:{width:"100%",border:"0"},src:e.drawImg2},null,8,ue),he])])]),_:1})]),a(y,{show:e.showLoading,"onUpdate:show":t[7]||(t[7]=n=>e.showLoading=n)},{default:l(()=>[pe]),_:1},8,["show"])],64)}var _e=O(V,[["render",me],["__scopeId","data-v-75226321"]]);export{_e as default};