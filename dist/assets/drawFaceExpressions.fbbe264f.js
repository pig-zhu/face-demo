import{o as f,p as F,i as u,P as w,q as b,r as h}from"./FaceMatcher.94dbf9cd.js";function E(t,s,e,i){e===void 0&&(e=.1);var n=Array.isArray(s)?s:[s];n.forEach(function(r){var o=r instanceof f?r:F(r)?r.expressions:void 0;if(!o)throw new Error("drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof");var c=o.asSortedArray(),p=c.filter(function(a){return a.probability>e}),d=u(r)?r.detection.box.bottomLeft:i||new w(0,0),x=new b(p.map(function(a){return a.expression+" ("+h(a.probability)+")"}),d);x.draw(t)})}export{E as d};