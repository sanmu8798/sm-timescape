import{c as l,_,a as p,b as s,d as r,u as a,z as v,U as x,m,v as b,A as z,j as d,t as u,f as y,e as f,k as M,l as P,o as n}from"./index-DCaAZOB7.js";import{u as U}from"./user-D20tSV7R.js";import{m as V}from"./user-CxTQF9zb.js";import{F as L}from"./flag-CcEhcvBw.js";import{I}from"./info-Cbz9j95E.js";/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=l("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=l("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=l("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=l("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=l("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]),E={class:"page-login"},j={class:"login-card"},A={class:"login-brand"},F={class:"brand-icon"},T={class:"form-item"},q={class:"form-item"},O=["type"],R={key:0,class:"form-error"},G=["disabled"],H={class:"demo-tip"},J={class:"demo-tip-title"},K={__name:"PageLogin",setup(Q){const g=P(),k=U(),o=M({form:{account:"sanmu_test",password:"123123"},showPassword:!1,loading:!1,error:""}),w=()=>{o.showPassword=!o.showPassword},h=async()=>{const{account:i,password:e}=o.form;if(!i||!e){o.error="请输入账号和密码";return}o.loading=!0,o.error="";try{const t=V.find(c=>c.phone===i&&c.password===e);if(!t){o.error="账号或密码错误";return}k.setUser(t),g.push({name:"Index"})}catch(t){o.error=t.message||"登录失败"}finally{o.loading=!1}};return(i,e)=>(n(),p("div",E,[s("div",j,[s("div",A,[s("div",F,[r(a(L),{size:28})]),e[2]||(e[2]=s("h1",{class:"brand-name"},"时光集",-1)),e[3]||(e[3]=s("p",{class:"brand-slogan"},"记录旅行足迹，收藏美好时光",-1))]),s("form",{class:"login-form",onSubmit:v(h,["prevent"])},[s("div",T,[r(a(x),{size:18}),m(s("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>o.form.account=t),type:"text",placeholder:"请输入账号",class:"form-input"},null,512),[[b,o.form.account]])]),s("div",q,[r(a(D),{size:18}),m(s("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>o.form.password=t),type:o.showPassword?"text":"password",placeholder:"请输入密码",class:"form-input"},null,8,O),[[z,o.form.password]]),s("button",{type:"button",class:"toggle-password",onClick:w},[o.showPassword?(n(),d(a(C),{key:1,size:18})):(n(),d(a(N),{key:0,size:18}))])]),o.error?(n(),p("div",R,[r(a(B),{size:14}),s("span",null,u(o.error),1)])):y("",!0),s("button",{type:"submit",class:"login-btn",disabled:o.loading},[o.loading?(n(),d(a(S),{key:0,size:18,class:"loading-icon"})):y("",!0),s("span",null,u(o.loading?"登录中...":"登 录"),1)],8,G)],32),e[6]||(e[6]=s("div",{class:"login-options"},[s("span",{class:"option-link"},"忘记密码？"),s("span",{class:"option-link"},"注册新账号")],-1)),s("div",H,[s("div",J,[r(a(I),{size:14}),e[4]||(e[4]=s("span",null,"体验账号",-1))]),e[5]||(e[5]=s("div",{class:"demo-tip-content"},[s("span",null,[f("账号："),s("code",null,"sanmu_test")]),s("span",null,[f("密码："),s("code",null,"123123")])],-1))])])]))}},ss=_(K,[["__scopeId","data-v-7daa7099"]]);export{ss as default};
