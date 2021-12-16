var R=Object.defineProperty,I=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var b=(e,t,n)=>t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,E=(e,t)=>{for(var n in t||(t={}))k.call(t,n)&&b(e,n,t[n]);if(h)for(var n of h(t))j.call(t,n)&&b(e,n,t[n]);return e},g=(e,t)=>I(e,T(t));import{h as p,d as v,N as V,R as w,r as u,c as B,w as s,A as x,a as $,b as N,B as F,C as S,e as z,D as q,o as D,f as d,g as A,i as H,j as W,k as Z,l as K,m as M,z as G,n as J,p as Q,q as U,s as X,t as Y,u as ee,v as te}from"./vendor.bfc80f33.js";const ne=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}};ne();const oe="modulepreload",C={},ae="./",a=function(t,n){return!n||n.length===0?t():Promise.all(n.map(r=>{if(r=`${ae}${r}`,r in C)return;C[r]=!0;const o=r.endsWith(".css"),i=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${i}`))return;const c=document.createElement("link");if(c.rel=o?"stylesheet":oe,o||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),o)return new Promise((l,_)=>{c.addEventListener("load",l),c.addEventListener("error",_)})})).then(()=>t())},y=[{path:"/",name:"home",component:()=>a(()=>import("./index.025fb8e5.js"),["assets/index.025fb8e5.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u9996\u9875"}},{path:"/face1",name:"face1",component:()=>a(()=>import("./index.b4501066.js"),["assets/index.b4501066.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u4EBA\u8138\u68C0\u6D4B"},children:[{path:"/face-detection",name:"face-detection",component:()=>a(()=>import("./face-detection.fa8b7e9b.js"),["assets/face-detection.fa8b7e9b.js","assets/face-detection.85109c4d.css","assets/FaceMatcher.94dbf9cd.js","assets/drawDetections.cb76136a.js","assets/bufferToImage.0eb741dc.js","assets/resizeResults.b26e0a3c.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u4EBA\u8138\u68C0\u6D4B"}},{path:"/face-landmark-detection",name:"face-landmark-detection",component:()=>a(()=>import("./face-landmark-detection.4d592344.js"),["assets/face-landmark-detection.4d592344.js","assets/face-landmark-detection.42a9083e.css","assets/FaceMatcher.94dbf9cd.js","assets/drawDetections.cb76136a.js","assets/bufferToImage.0eb741dc.js","assets/resizeResults.b26e0a3c.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u4EBA\u8138\u6807\u5FD7\u68C0\u6D4B"}},{path:"/face-expression-recognition",name:"face-expression-recognition",component:()=>a(()=>import("./face-expression-recognition.3fc9aaf9.js"),["assets/face-expression-recognition.3fc9aaf9.js","assets/face-expression-recognition.5d3a8703.css","assets/FaceMatcher.94dbf9cd.js","assets/drawDetections.cb76136a.js","assets/drawFaceExpressions.fbbe264f.js","assets/bufferToImage.0eb741dc.js","assets/resizeResults.b26e0a3c.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u9762\u90E8\u8868\u60C5\u8BC6\u522B"}},{path:"/face-recognition",name:"face-recognition",component:()=>a(()=>import("./face-recognition.13de05c0.js"),["assets/face-recognition.13de05c0.js","assets/face-recognition.6c4dc5dd.css","assets/FaceMatcher.94dbf9cd.js","assets/bufferToImage.0eb741dc.js","assets/resizeResults.b26e0a3c.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u4EBA\u8138\u8BC6\u522B\u5BF9\u6BD4"}},{path:"/face-extraction",name:"face-extraction",component:()=>a(()=>import("./face-extraction.d4b642e6.js"),["assets/face-extraction.d4b642e6.js","assets/face-extraction.33745cac.css","assets/FaceMatcher.94dbf9cd.js","assets/drawDetections.cb76136a.js","assets/bufferToImage.0eb741dc.js","assets/resizeResults.b26e0a3c.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u4EBA\u8138\u63D0\u53D6"}}]},{path:"/webcamAge",name:"webcamAge",component:()=>a(()=>import("./index.ac4a0316.js"),["assets/index.ac4a0316.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u7F51\u7EDC\u6444\u50CF\u5934\u68C0\u6D4B"},children:[{path:"/video-face-tracking",name:"video-face-tracking",component:()=>a(()=>import("./video-face-tracking.e9720e8a.js"),["assets/video-face-tracking.e9720e8a.js","assets/video-face-tracking.79349323.css","assets/FaceMatcher.94dbf9cd.js","assets/drawDetections.cb76136a.js","assets/resizeResults.b26e0a3c.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u89C6\u9891\u4EBA\u8138\u8DDF\u8E2A"}},{path:"/webcam-face-detection",name:"webcam-face-detection",component:()=>a(()=>import("./webcam-face-detection.63fb72ac.js"),["assets/webcam-face-detection.63fb72ac.js","assets/webcam-face-detection.cbe86f93.css","assets/FaceMatcher.94dbf9cd.js","assets/drawDetections.cb76136a.js","assets/drawFaceExpressions.fbbe264f.js","assets/bufferToImage.0eb741dc.js","assets/fetchImage.eb914c85.js","assets/resizeResults.b26e0a3c.js","assets/vendor.bfc80f33.js"]),meta:{title:"\u7F51\u7EDC\u6444\u50CF\u5934\u4EBA\u8138\u68C0\u6D4B"}}]},{path:"/bbt",name:"bbt",component:()=>a(()=>import("./index.672b1efb.js"),["assets/index.672b1efb.js","assets/vendor.bfc80f33.js"]),meta:{title:"BBT\u68C0\u6D4B"},children:[{path:"/bbt-face-similarity",name:"bbt-face-similarity",component:()=>a(()=>import("./bbt-face-similarity.39e5836d.js"),["assets/bbt-face-similarity.39e5836d.js","assets/bbt-face-similarity.0c92395d.css","assets/FaceMatcher.94dbf9cd.js","assets/bufferToImage.0eb741dc.js","assets/fetchImage.eb914c85.js","assets/vendor.bfc80f33.js"]),meta:{title:"BBT\u76F8\u4F3C\u6027\u68C0\u6D4B"}},{path:"/bbt-face-matching",name:"bbt-face-matching",component:()=>a(()=>import("./bbt-face-matching.0942e1b9.js"),[]),meta:{title:"BBT\u9762\u90E8\u5339\u914D"}},{path:"/bbt-face-recognition",name:"bbt-face-recognition",component:()=>a(()=>import("./bbt-face-recognition.6f91b06d.js"),[]),meta:{title:"BBT\u4EBA\u8138\u8BC6\u522B\u7CFB\u7EDF"}},{path:"/bbt-batch-face-landmark-detection",name:"bbt-batch-face-landmark-detection",component:()=>a(()=>import("./bbt-batch-face-landmark-detection.e9733987.js"),[]),meta:{title:"\u6279\u91CF\u4EBA\u8138\u5730\u6807\u68C0\u6D4B"}},{path:"/bbt-batch-face-recognition",name:"bbt-batch-face-recognition",component:()=>a(()=>import("./bbt-batch-face-recognition.bada00e9.js"),[]),meta:{title:"\u6279\u91CF\u4EBA\u8138\u8BC6\u522B"}}]},{path:"/login",name:"login",component:()=>a(()=>import("./index.6dce0dbb.js"),["assets/index.6dce0dbb.js","assets/vendor.bfc80f33.js"]),meta:{},hidden:!0},{path:"/404",component:()=>a(()=>import("./404.101d5522.js"),["assets/404.101d5522.js","assets/vendor.bfc80f33.js"]),meta:{},hidden:!0}],re=[{path:"/:pathMatch(.*)",redirect:"/404",hidden:!0}];var P=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n};let ie=[x,$,N,F,S,z,q];function ce(e){return()=>p(V,null,{default:()=>p(e)})}function O(e){var n;let t;return((n=e.children)==null?void 0:n.length)?t=e.meta.title:t=()=>p(w,{to:{name:e.name,params:{lang:"zh-CN"}}},{default:()=>e.meta.title}),{label:t,key:e.path,path:e.path,name:e.name}}let ue=y.map((e,t)=>{var r;if(e.hidden)return!1;let n;return((r=e.children)==null?void 0:r.length)&&(n=e.children.map(o=>O(o))),g(E({},O(e)),{children:n,icon:ce(ie[t])})});const se=v({setup(){let e=window.location.pathname;return{menuOptions:ue.filter(t=>t),defaultPath:e}}});function de(e,t,n,r,o,i){const c=u("n-menu"),l=u("n-layout-sider"),_=u("n-layout-content"),m=u("n-layout"),L=u("n-space");return D(),B(L,{vertical:""},{default:s(()=>[d(m,{"has-sider":""},{default:s(()=>[d(l,{bordered:"","show-trigger":"","collapse-mode":"width","collapsed-width":64,width:240,"native-scrollbar":!1,style:{"max-height":"320px"}},{default:s(()=>[d(c,{"default-value":e.defaultPath,"default-expand-all":"","collapsed-width":64,"collapsed-icon-size":22,options:e.menuOptions},null,8,["default-value","options"])]),_:1}),d(_,{"content-style":"padding: 24px;"},{default:s(()=>[A(e.$slots,"default",{},void 0,!0)]),_:3})]),_:3})]),_:3})}var le=P(se,[["render",de],["__scopeId","data-v-c2441ed4"]]);const _e=v({components:{NConfigProvider:H,NInput:W,NDatePicker:Z,NSpace:K,PageHeader:le},setup(){return{darkTheme:M([Q,U]),zhCN:G,dateZhCN:J}}});function me(e,t,n,r,o,i){const c=u("router-view"),l=u("n-message-provider"),_=u("page-header"),m=u("n-config-provider");return D(),B(m,{locale:e.zhCN,"date-locale":e.dateZhCN},{default:s(()=>[d(_,null,{default:s(()=>[A(e.$slots,"default",{},()=>[d(l,null,{default:s(()=>[d(c)]),_:1})])]),_:3})]),_:3},8,["locale","date-locale"])}var pe=P(_e,[["render",me]]);const fe=X({history:Y(),routes:y.concat(re)}),f=ee(pe);f.use(fe);f.use(te);f.mount("#app");export{P as _};