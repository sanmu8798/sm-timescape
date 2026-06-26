import{c as n}from"./index-C4MjYkL-.js";import{m as c}from"./user-B_sas1WD.js";/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=n("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=n("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]),l=async e=>new Promise((o,s)=>{setTimeout(()=>{const r=c.find(a=>a.phone===e.phone&&a.password===e.password);r?o({code:200,data:r,message:"登录成功"}):s({code:400,message:"手机号或密码错误"})},300)}),y=async e=>new Promise(o=>{setTimeout(()=>{const s={id:Date.now().toString(),username:e.username,phone:e.phone,password:e.password,avatar:""};c.push(s),o({code:200,data:s,message:"注册成功"})},300)});export{m as C,p as P,l,y as r};
