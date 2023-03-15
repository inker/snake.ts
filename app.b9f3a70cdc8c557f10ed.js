"use strict";(self.webpackChunksnake=self.webpackChunksnake||[]).push([[143],{4951:(e,t,s)=>{var i=s(5893),n=s(3935),a=s(7294),r=s(9163),o=s(3955),d=s(8125),c=s(6026),l=s(3608),h=s(5578);const u=(0,a.memo)((({coordinates:e,...t})=>{const{x:s,y:n}=e;return(0,i.jsx)("rect",Object.assign({color:"red",x:s,y:n,width:1,height:1},t),void 0)})),p=r.ZP.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 30px;

  & > * {
    margin: 10px;
    text-align: center;
  }
`,g=r.ZP.div`
  font-size: 20px;
`,v=()=>(0,i.jsx)(p,{children:(0,i.jsx)(g,{children:"To start the game, press any key or click 'Start'"},void 0)},void 0),x=r.ZP.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 30px;

  & > * {
    margin: 10px;
    text-align: center;
  }
`,m=r.ZP.div`
  font-size: 20px;
`,f=(0,a.memo)((({score:e})=>(0,i.jsxs)(x,{children:[(0,i.jsx)("div",{children:"GAME OVER"},void 0),(0,i.jsxs)("div",{children:["Your score: ",e]},void 0),(0,i.jsx)(m,{children:"To restart the game, press Esc or click 'Restart'"},void 0)]},void 0)));class b{constructor(e,t){this.x=e,this.y=t}add(e){return new b(this.x+e.x,this.y+e.y)}subtract(e){return new b(this.x-e.x,this.y-e.y)}equals(e){return this.x===e.x&&this.y===e.y}}var w;!function(e){e[e.UP=0]="UP",e[e.RIGHT=1]="RIGHT",e[e.DOWN=2]="DOWN",e[e.LEFT=3]="LEFT"}(w||(w={}));const j=w,y=`pattern-${Math.random().toString(36).slice(2)}`,S=r.ZP.path`
  fill: none;
  stroke: #ccc;
  stroke-width: 0.1;
`,k=(0,a.memo)((({size:e})=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("defs",{children:(0,i.jsx)("pattern",Object.assign({id:y,width:e,height:e,patternUnits:"userSpaceOnUse"},{children:(0,i.jsx)(S,{d:`M ${e} 0 L 0 0 0 ${e}`},void 0)}),void 0)},void 0),(0,i.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${y})`},void 0)]},void 0))),C=r.ZP.div`
  width: ${e=>e.width?`${e.width}px`:"100%"};
  height: ${e=>e.height?`${e.height}px`:"100%"};
  border: 1px solid #999;

  ${e=>e.paused&&r.iv`
    opacity: 0.25;
    transition: opacity 0.2s;
  `}
`,O=r.ZP.svg.attrs({xmlns:"http://www.w3.org/2000/svg"})`
  display: ${e=>e.visible?"":"none"};
`,P=700,R=500;const T=(0,a.memo)((({width:e,height:t,paused:s,popup:n,children:a})=>{const r=function(e,t){const s=P/e,i=R/t,n=Math.min(s,i);return{width:e*n,height:t*n}}(e,t);return(0,i.jsxs)(C,Object.assign({width:r.width,height:r.height,paused:s},{children:[(0,i.jsxs)(O,Object.assign({width:r.width,height:r.height,viewBox:`0 0 ${e} ${t}`,visible:!n},{children:[(0,i.jsx)(k,{size:1},void 0),a]}),void 0),n]}),void 0)}));class Z{constructor(e,t){this.lastTimeStamp=-1,this.running=!1,this.step=e=>{if(!this.running)return;const t=e-this.lastTimeStamp;if(t>=this.interval){const s=~~(t/this.interval);this.lastTimeStamp=e;for(let e=0;e<s;++e)this.onUpdate(s)}window.requestAnimationFrame(this.step)},this.interval=e,this.onUpdate=t}start(){this.running=!0,window.requestAnimationFrame((e=>{this.lastTimeStamp=e,window.requestAnimationFrame(this.step)}))}stop(){this.running=!1}}const G=(e,t,s=window,i)=>{(0,a.useEffect)((()=>{if(t&&s)return s.addEventListener(e,t,i),()=>{s.removeEventListener(e,t)}}),[e,t,s,JSON.stringify(i)])},F=()=>{const[e,t]=(0,a.useState)(-1),s=(0,a.useCallback)((e=>{const s=(e=>{switch(e){case 38:case 87:return j.UP;case 39:case 68:return j.RIGHT;case 37:case 65:return j.LEFT;case 40:case 83:return j.DOWN;default:return-1}})(e.keyCode);s<0||t(s)}),[t]);G("keydown",s);return[e,(0,a.useCallback)((()=>{t(-1)}),[t])]},E=e=>{const[t,s]=F(),[i,n]=(0,a.useState)(e),r=t<0?e:(d=t,(o=i)===j.UP&&d===j.DOWN||o===j.DOWN&&d===j.UP||o===j.RIGHT&&d===j.LEFT||o===j.LEFT&&d===j.RIGHT?i:t);var o,d;const c=(0,a.useCallback)((()=>{n(r)}),[r,n]);return[r,c,s]},V=2,$=e=>`${e.x},${e.y}`;function I(e,t,s){const i=new b(l(0,e-1),l(0,t-1));return s.some((e=>e.equals(i)))?I(e,t,s):i}function N(e,t,s){const i=function(e,t){const s=l(0,t-1);return c(V+e,V).map((e=>new b(e,s)))}(s,t);return{snake:i,food:I(e,t,i)}}const z=(0,a.memo)((({gameId:e,isRunning:t,width:s,height:n,speed:r,score:o,isGameOver:c,isStart:l,initialLength:p,onScoreChange:g,onGameOver:x})=>{const m=N(s,n,p),[w,y]=(0,a.useState)(m),[S,k,C]=E(j.RIGHT),{snake:O,food:P}=w;(0,a.useEffect)((()=>{C(),y(m)}),[e]),((e,t,s)=>{const{current:i}=(0,a.useRef)(new Z(t,s));i.interval=t,i.onUpdate=s,(0,a.useEffect)((()=>()=>{i.stop()}),[]),(0,a.useEffect)((()=>{i[e?"start":"stop"]()}),[e])})(t&&!c&&!l,1e3/r,(()=>{k();const e=O[0],t=new b((i=S)===j.LEFT?-1:i===j.RIGHT?1:0,i===j.UP?-1:i===j.DOWN?1:0);var i;const a=e.add(t),r=P&&a.equals(P),c=!r&&O.some((e=>e.equals(a)))||a.x<0||a.y<0||a.x>=s||a.y>=n,l=r?O:d(O),h=[a,...l];r&&g(o+1),c&&x(),y({snake:h,food:r?I(s,n,h):P})}));const R=l?(0,i.jsx)(v,{},void 0):c?(0,i.jsx)(f,{score:o},void 0):null;return(0,i.jsxs)(T,Object.assign({width:s,height:n,paused:!t&&!c,popup:R},{children:[h(O,$).map((e=>(0,i.jsx)(u,{coordinates:e,fill:"blue"},$(e)))),P&&(0,i.jsx)(u,{coordinates:P,fill:"red"},void 0)]}),void 0)})),L=JSON.parse('{"dp":{"ZP":{"b":20,"C":20},"VV":{"b":10,"C":10},"Fp":{"b":100,"C":100}},"NS":{"ZP":25,"VV":1,"Fp":50},"R_":4}');var U=s(8403);const q=r.ZP.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin: 10px;
`,D=r.ZP.label`
  display: flex;
  flex-direction: column;
  color: ${e=>e.disabled?"#999":""};
`,H=r.ZP.div`
  width: 30px;
  color: ${e=>e.disabled?"#999":""};
`,W=r.ZP.input.attrs({type:"range"})`
  width: 150px;
`,A=(0,a.memo)((({value:e,defaultValue:t,...s})=>(0,i.jsxs)(q,{children:[(0,i.jsxs)(D,Object.assign({disabled:s.disabled},{children:[U(s["data-variable"]),(0,i.jsx)(W,Object.assign({value:e,defaultValue:void 0===t?void 0:t.toString()},s),void 0)]}),void 0),(0,i.jsx)(H,Object.assign({disabled:s.disabled},{children:e}),void 0)]},void 0))),J=r.ZP.button`
  min-width: 100px;
  height: 30px;
  margin: 10px;
  font-size: 16px;
  user-select: none;
`,M=r.ZP.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
`,B=r.ZP.div`
  margin: 10px;
  font-size: 18px;
`,_=(0,a.memo)((({isPaused:e,isGameOver:t,isStart:s,values:n,score:r,onTogglePause:o,onRestart:d,onSettingChange:c,onResetSettings:l})=>{const h=(0,a.useCallback)((e=>{const t=e.target,{variable:s}=t.dataset;s&&c&&c(s,+t.value)}),[c]),u=!t&&!s;return(0,i.jsxs)(M,{children:[(0,i.jsxs)(B,{children:["Score: ",r]},void 0),(0,i.jsx)(J,Object.assign({disabled:t||s,onClick:o},{children:e?"Resume":"Pause"}),void 0),(0,i.jsx)(J,Object.assign({onClick:d},{children:s?"Start":"Restart"}),void 0),(0,i.jsx)(A,{disabled:u,value:n.width,min:L.dp.VV.b,max:L.dp.Fp.b,defaultValue:n.width,"data-variable":"width",onChange:h},void 0),(0,i.jsx)(A,{disabled:u,value:n.height,min:L.dp.VV.C,max:L.dp.Fp.C,defaultValue:n.height,"data-variable":"height",onChange:h},void 0),(0,i.jsx)(A,{disabled:!e&&u,value:n.speed,min:L.NS.VV,max:L.NS.Fp,defaultValue:n.speed,"data-variable":"speed",onChange:h},void 0),(0,i.jsx)(J,Object.assign({disabled:u,onClick:l},{children:"Reset settings"}),void 0)]},void 0)}));var Y=s(7527),K=s(7493);const Q={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:Y},X=((e,t,s)=>{const i={...Q,...s},n=(e=>{let t=e instanceof Function?e():e;const s=[];return()=>{const e=(0,a.useState)(t)[1];(0,a.useEffect)((()=>(s.push(e),()=>{K(s,e)})),[]);const i=(0,a.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of s)e(t)}),[t,s]);return[t,i]}})((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=i.parse(t);if(i.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,i.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[s,r]=n(),o=(0,a.useCallback)((t=>{try{const n=t instanceof Function?t(s):t;r(n),window.localStorage.setItem(e,i.serialize(n))}catch(e){console.error(e)}}),[r]),d=(0,a.useCallback)((()=>{r(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[r]);return[s,o,d]}})("store:settings",{width:L.dp.ZP.b,height:L.dp.ZP.C,speed:L.NS.ZP});s.e(872).then(s.t.bind(s,5213,23));const ee=r.ZP.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`,te=()=>{const[e,t]=(0,a.useState)({isRunning:!0,isGameOver:!1,isStart:!0}),[s,n,r]=X(),d=(c=n,(0,a.useCallback)(((e,t)=>{c((s=>({...s,[e]:t})))}),[c]));var c;const[l,h]=(0,a.useState)(o("gameid-")),[u,p]=(0,a.useState)(0),{isRunning:g,isGameOver:v,isStart:x}=e,m=(0,a.useCallback)((()=>{t({isRunning:!g,isGameOver:!1,isStart:!1})}),[g,t]),f=(0,a.useCallback)((()=>{t({isRunning:!0,isGameOver:!1,isStart:!1}),h(o("gameid-")),p(0)}),[t,p]),b=(0,a.useCallback)((()=>{t({isRunning:!1,isGameOver:!0,isStart:!1})}),[t]);(e=>{const t=(0,a.useRef)();G("keydown",(0,a.useCallback)((e=>{t.current=e.keyCode}),[e,t])),G("keyup",(0,a.useCallback)((s=>{t.current===s.keyCode&&(t.current=void 0,e(s))}),[e,t]))})((0,a.useCallback)((()=>{x&&f()}),[x,f]));const w=(0,a.useCallback)((e=>{if(x)return;const{keyCode:t}=e;27===t&&(e.preventDefault(),v?f():m(),e.stopPropagation())}),[v,x,f,m]);return G("keydown",w),(0,i.jsxs)(ee,{children:[(0,i.jsx)(_,{isPaused:!g,isGameOver:v,isStart:x,values:s,score:u,onRestart:f,onSettingChange:d,onResetSettings:r,onTogglePause:m},void 0),(0,i.jsx)(z,{gameId:l,isRunning:g,isGameOver:v,isStart:x,score:u,width:s.width,height:s.height,speed:s.speed,initialLength:L.R_,onScoreChange:p,onGameOver:b},void 0)]},void 0)};n.render((0,i.jsx)(te,{},void 0),document.getElementById("app"))}},e=>{e.O(0,[514,736],(()=>{return t=4951,e(e.s=t);var t}));e.O()}]);