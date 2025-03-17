import{_ as P,c as l,o as a,a as s,h as O,F as C,d as z,n as T,i as y,t as c,u as h,g as $,r as m,j as E,w as W,e as H,k as U,v as G,l as J,m as K,p as Q,q as R}from"./index-C13dIDNA.js";import{P as D,_ as X}from"./Problem-CH9DmolP.js";import{c as _}from"./config-CouUdNBE.js";const Y=["start"],Z={class:"problem-font-marker"},ss={key:1},es={key:2,class:"ts-divider is-section"},ts={key:0,class:"ts-wrap is-vertical is-middle-aligned exam-cover"},is={class:"ts-text is-huge is-bold"},ns={class:"ts-list is-unordered"},ls={class:"item"},as={key:1,class:"ts-wrap is-vertical is-middle-aligned exam-cover"},os={__name:"ExamPaper",props:{uni:String,year:String,examConfig:Object,isContentVisible:Boolean,isProblemVisible:Boolean,isExamOver:Boolean,examTimeSec:Number},emits:["clickStartExam","resetTimer"],setup(t,{emit:k}){const o=k;return(b,i)=>(a(),l(C,null,[s("div",{class:"ts-content exam",style:T({filter:t.isProblemVisible?"none":"blur(10px)"})},[(a(!0),l(C,null,z(t.examConfig.section,(n,V)=>(a(),l(C,null,[n[0]!=="-"?(a(),l("ol",{key:0,style:T({"padding-left":11+9*n.length+"px"}),start:n},[s("li",Z,[y(D,{uni:t.uni,year:t.year,no:n,problemConfig:t.examConfig.problem[n],contentType:t.isContentVisible?"link":void 0,isScoreVisible:""},null,8,["uni","year","no","problemConfig","contentType"])])],12,Y)):(a(),l("div",ss,[y(D,{uni:t.uni,year:t.year,no:n},null,8,["uni","year","no"])])),V!=t.examConfig.section.length-1?(a(),l("div",es)):O("",!0)],64))),256))],4),t.isProblemVisible?O("",!0):(a(),l(C,{key:0},[t.isExamOver?(a(),l("div",as,[i[7]||(i[7]=s("div",{class:"ts-text is-huge is-bold"},"考試結束",-1)),s("button",{class:"ts-button is-start-icon",onClick:i[1]||(i[1]=n=>{o("resetTimer")})},i[6]||(i[6]=[s("span",{class:"ts-icon is-arrow-rotate-left-icon"},null,-1),$("重新計時 ")]))])):(a(),l("div",ts,[s("div",is,c(h(_).uni[t.uni].shortName)+"  "+c(t.year),1),s("div",ns,[s("div",ls," 快速看過全部題目後再開始作答，考試時間為 "+c(Math.floor(t.examTimeSec/60))+" 分鐘，請做好配速。 ",1),i[2]||(i[2]=s("div",{class:"item"},"如果有給手寫答案紙，且題本沒有附註「只寫答案即可」，建議附上運算過程。",-1)),i[3]||(i[3]=s("div",{class:"item"},"簡單題目請先做完，若時間夠，驗算一遍後再做剩餘題目。",-1))]),s("button",{class:"ts-button is-start-icon",onClick:i[0]||(i[0]=n=>{o("clickStartExam")})},i[4]||(i[4]=[s("span",{class:"ts-icon is-pen-icon"},null,-1),$("開始作答 ")])),i[5]||(i[5]=s("div",{class:"ts-text is-small is-secondary is-italic"}," 如果你只想翻閱一下歷屆試題，可以關閉左側選單中的「測驗模式」 ",-1))]))],64))],64))}},rs=P(os,[["__scopeId","data-v-dd17eda0"]]),us={class:"sidebar-table"},ds={__name:"ExamInfo",props:{uniShortName:String,year:String,subjectId:String,subject:String},setup(t){return(k,o)=>(a(),l("table",us,[s("tbody",null,[s("tr",null,[o[0]||(o[0]=s("td",null,[s("span",{class:"ts-icon is-school-icon"})],-1)),s("td",null,c(t.uniShortName?t.uniShortName:"-"),1)]),s("tr",null,[o[1]||(o[1]=s("td",null,[s("span",{class:"ts-icon is-calendar-icon"})],-1)),s("td",null,c(t.year?t.year:"-")+" 年 ",1)]),s("tr",null,[o[3]||(o[3]=s("td",null,[s("span",{class:"ts-icon is-hashtag-icon"})],-1)),s("td",null,[s("span",null,c(t.subjectId?t.subjectId:"-"),1),o[2]||(o[2]=s("span",{class:"ts-icon is-circle-question-icon is-start-spaced","data-tooltip":"科目代號"},null,-1))])]),s("tr",null,[o[4]||(o[4]=s("td",null,[s("span",{class:"ts-icon is-file-icon"})],-1)),s("td",null,c(t.subject?t.subject:"-"),1)])])]))}},cs=P(ds,[["__scopeId","data-v-d4f0cdc0"]]),ms={class:"ts-grid"},vs={class:"column"},bs={class:"ts-box is-vertical is-compact sidebar"},fs={class:"ts-content is-dense"},xs={class:"ts-content is-dense sidebar-setting"},ps={class:"ts-switch"},gs={class:"ts-content is-dense"},ys={class:"ts-wrap is-compact is-middle-aligned"},ks=["disabled"],Ss={key:0,class:"ts-icon is-pause-icon"},Cs={key:1,class:"ts-icon is-play-icon"},Es=["disabled"],Ts={key:0,class:"sidebar-timer-time"},$s={key:1,class:"sidebar-timer-time"},Vs={class:"ts-content is-dense"},js=["href","data-tooltip"],hs={key:1},_s={class:"column is-fluid"},Ps={class:"ts-box"},ws={__name:"ExamView",setup(t){const k=K(),o=Q(),b=m(void 0),i=m(void 0),n=m({});E(()=>k.params.id,async r=>{var e=r.split("-");if(e.length!=2){V(r);return}const[p,g]=e,B=await X(Object.assign({"../../components/exam/ntu/111/config.json":()=>R(()=>import("./config-BkiAkXrA.js"),[]),"../../components/exam/ntu/112/config.json":()=>R(()=>import("./config-BgjZKRP_.js"),[])}),`../../components/exam/${p}/${g}/config.json`,7).catch(()=>M(p,g));B&&(b.value=p,i.value=g,n.value=B.default)},{immediate:!0});function V(r){console.error(`Wrong id format. (exam id: ${r})
`),o.push("/exam")}function M(r,e){console.error(`Exam config is not exist. (exam ${r}-${e})
-> Check if @/components/exam/${r}/${e}/config.json exist?
`),o.push("/exam")}const d=m(!1),v=m(!d.value),f=m(!1),x=m(6e3),u=m(x.value);E(d,r=>{S(),v.value=!r}),E(n,()=>{d.value&&w()});const F=()=>{u.value<=0||(A(),v.value||(v.value=!0))},w=()=>{S(),v.value=!1},q=()=>{S(),N(),v.value=!0};let j=null;const N=()=>{f.value=!0,j=setInterval(()=>{u.value--},1e3)},I=()=>{f.value=!1,clearInterval(j),j=null},S=()=>{I(),u.value=x.value},A=()=>{f.value?I():N()};E(u,r=>{r<=0&&(v.value=!1)});const L=()=>{};return(r,e)=>{const p=H("router-link");return a(),l("div",ms,[s("div",vs,[s("div",bs,[s("div",fs,[e[2]||(e[2]=s("span",{class:"ts-icon is-reply-icon is-end-spaced"},null,-1)),y(p,{to:"/exam",class:"hyperlink"},{default:W(()=>e[1]||(e[1]=[$(" 回題本選單")])),_:1})]),e[8]||(e[8]=s("div",{class:"ts-divider"},null,-1)),s("div",xs,[s("label",ps,[U(s("input",{type:"checkbox","onUpdate:modelValue":e[0]||(e[0]=g=>d.value=g),checked:""},null,512),[[G,d.value]]),e[3]||(e[3]=s("span",null,"測驗模式 ",-1)),e[4]||(e[4]=s("span",{class:"ts-icon is-circle-question-icon","data-tooltip":"開啟測驗模式後，題本內容會在作答前被隱藏，<br>並且不顯示解答。","data-html":"true"},null,-1))])]),e[9]||(e[9]=s("div",{class:"ts-divider"},null,-1)),s("div",gs,[y(cs,{uniShortName:h(_).uni[b.value]?h(_).uni[b.value].shortName:void 0,year:i.value,subjectId:n.value.id,subject:n.value.subject},null,8,["uniShortName","year","subjectId","subject"])]),e[10]||(e[10]=s("div",{class:"ts-divider"},null,-1)),s("div",{class:"ts-content is-dense sidebar-timer",style:T({opacity:d.value?1:.4})},[s("div",ys,[s("button",{class:"ts-button is-small is-icon is-outlined",onClick:F,disabled:!d.value},[f.value?(a(),l("span",Ss)):(a(),l("span",Cs))],8,ks),s("button",{class:"ts-button is-small is-icon is-outlined",onClick:w,disabled:!d.value},e[5]||(e[5]=[s("span",{class:"ts-icon is-rotate-left-icon"},null,-1)]),8,Es),u.value>=0?(a(),l("span",Ts,c(Math.floor(u.value/60))+":"+c(String(u.value%60).padStart(2,"0")),1)):(a(),l("span",$s,"0:00"))]),s("div",{class:J(["ts-progress is-tiny sidebar-timer-progress",f.value?"is-processing":""])},[s("div",{class:"bar",style:T({"--value":100*(u.value/x.value),"background-color":u.value/x.value>.1?"#9bf":"#f88"})},null,4)],2)],4),e[11]||(e[11]=s("div",{class:"ts-divider"},null,-1)),s("div",Vs,[e[6]||(e[6]=s("span",{class:"ts-icon is-link-icon is-end-spaced"},null,-1)),n.value.link?(a(),l("a",{key:0,class:"hyperlink",href:n.value.link,"data-tooltip":n.value.linkTip?n.value.linkTip:"沒有附註任何東西捏 (´･ω･`)",target:"_blank"},"題本來源",8,js)):(a(),l("span",hs,"來源未知"))]),e[12]||(e[12]=s("div",{class:"ts-divider"},null,-1)),s("div",{class:"ts-content is-dense"},[s("button",{class:"ts-button is-outlined is-start-icon",onClick:L,"data-tooltip":"暫時想不到要怎麼做 ฅ^⦁⩊⦁^ฅ ੭"},e[7]||(e[7]=[s("span",{class:"ts-icon is-download-icon"},null,-1),$("下載題本 ")]))])])]),s("div",_s,[s("div",Ps,[y(rs,{uni:b.value,year:i.value,examConfig:n.value,isContentVisible:!d.value,isProblemVisible:v.value,isExamOver:u.value<=0,examTimeSec:x.value,onClickStartExam:q,onResetTimer:S},null,8,["uni","year","examConfig","isContentVisible","isProblemVisible","isExamOver","examTimeSec"])])])])}}},Os=P(ws,[["__scopeId","data-v-ade635c1"]]);export{Os as default};
