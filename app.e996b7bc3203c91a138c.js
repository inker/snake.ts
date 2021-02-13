(self.webpackChunksnake=self.webpackChunksnake||[]).push([[143],{1679:(e,t,s)=>{"use strict";var i=s(5893),n=s(3935),a=s(7294),r=s(9163),o=s(3955),d=s(8125),c=s(6026),l=s(3608),h=s(5578);const u=(0,a.memo)((({coordinates:e,...t})=>{const{x:s,y:n}=e;return(0,i.jsx)("rect",Object.assign({color:"red",x:s,y:n,width:1,height:1},t),void 0)})),p=r.ZP.div`
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
`;const P=(0,a.memo)((({width:e,height:t,paused:s,popup:n,children:a})=>{const r=function(e,t){const s=700/e,i=500/t,n=Math.min(s,i);return{width:e*n,height:t*n}}(e,t);return(0,i.jsxs)(C,Object.assign({width:r.width,height:r.height,paused:s},{children:[(0,i.jsxs)(O,Object.assign({width:r.width,height:r.height,viewBox:`0 0 ${e} ${t}`,visible:!n},{children:[(0,i.jsx)(k,{size:1},void 0),a]}),void 0),n]}),void 0)}));class R{constructor(e,t){this.lastTimeStamp=-1,this.running=!1,this.step=e=>{if(!this.running)return;const t=e-this.lastTimeStamp;if(t>=this.interval){const s=~~(t/this.interval);this.lastTimeStamp=e;for(let e=0;e<s;++e)this.onUpdate(s)}window.requestAnimationFrame(this.step)},this.interval=e,this.onUpdate=t}start(){this.running=!0,window.requestAnimationFrame((e=>{this.lastTimeStamp=e,window.requestAnimationFrame(this.step)}))}stop(){this.running=!1}}const T=(e,t,s=window,i)=>{(0,a.useEffect)((()=>{if(t&&s)return s.addEventListener(e,t,i),()=>{s.removeEventListener(e,t)}}),[e,t,s,JSON.stringify(i)])},Z=()=>{const[e,t]=(0,a.useState)(-1),s=(0,a.useCallback)((e=>{const s=(e=>{switch(e){case 38:case 87:return j.UP;case 39:case 68:return j.RIGHT;case 37:case 65:return j.LEFT;case 40:case 83:return j.DOWN;default:return-1}})(e.keyCode);s<0||t(s)}),[t]);T("keydown",s);return[e,(0,a.useCallback)((()=>{t(-1)}),[t])]},G=e=>{const[t,s]=Z(),[i,n]=(0,a.useState)(e),r=t<0?e:(d=t,(o=i)===j.UP&&d===j.DOWN||o===j.DOWN&&d===j.UP||o===j.RIGHT&&d===j.LEFT||o===j.LEFT&&d===j.RIGHT?i:t);var o,d;const c=(0,a.useCallback)((()=>{n(r)}),[r,n]);return[r,c,s]},F=e=>`${e.x},${e.y}`;function E(e,t,s){const i=new b(l(0,e-1),l(0,t-1));return s.some((e=>e.equals(i)))?E(e,t,s):i}function V(e,t,s){const i=function(e,t){const s=l(0,t-1);return c(2+e,2).map((e=>new b(e,s)))}(s,t);return{snake:i,food:E(e,t,i)}}const $=(0,a.memo)((({gameId:e,isRunning:t,width:s,height:n,speed:r,score:o,isGameOver:c,isStart:l,initialLength:p,onScoreChange:g,onGameOver:x})=>{const m=V(s,n,p),[w,y]=(0,a.useState)(m),[S,k,C]=G(j.RIGHT),{snake:O,food:T}=w;(0,a.useEffect)((()=>{C(),y(m)}),[e]),((e,t,s)=>{const{current:i}=(0,a.useRef)(new R(t,s));i.interval=t,i.onUpdate=s,(0,a.useEffect)((()=>()=>{i.stop()}),[]),(0,a.useEffect)((()=>{i[e?"start":"stop"]()}),[e])})(t&&!c&&!l,1e3/r,(()=>{k();const e=O[0],t=new b((i=S)===j.LEFT?-1:i===j.RIGHT?1:0,i===j.UP?-1:i===j.DOWN?1:0);var i;const a=e.add(t),r=T&&a.equals(T),c=!r&&O.some((e=>e.equals(a)))||a.x<0||a.y<0||a.x>=s||a.y>=n,l=r?O:d(O),h=[a,...l];r&&g(o+1),c&&x(),y({snake:h,food:r?E(s,n,h):T})}));const Z=l?(0,i.jsx)(v,{},void 0):c?(0,i.jsx)(f,{score:o},void 0):null;return(0,i.jsxs)(P,Object.assign({width:s,height:n,paused:!t&&!c,popup:Z},{children:[h(O,F).map((e=>(0,i.jsx)(u,{coordinates:e,fill:"blue"},F(e)))),T&&(0,i.jsx)(u,{coordinates:T,fill:"red"},void 0)]}),void 0)})),I=JSON.parse('{"dp":{"ZP":{"b":20,"C":20},"VV":{"b":10,"C":10},"Fp":{"b":100,"C":100}},"NS":{"ZP":25,"VV":1,"Fp":50},"R_":4}');var N=s(8403);const z=r.ZP.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin: 10px;
`,L=r.ZP.label`
  display: flex;
  flex-direction: column;
  color: ${e=>e.disabled?"#999":""};
`,U=r.ZP.div`
  width: 30px;
  color: ${e=>e.disabled?"#999":""};
`,q=r.ZP.input.attrs({type:"range"})`
  width: 150px;
`,D=(0,a.memo)((({value:e,defaultValue:t,...s})=>(0,i.jsxs)(z,{children:[(0,i.jsxs)(L,Object.assign({disabled:s.disabled},{children:[N(s["data-variable"]),(0,i.jsx)(q,Object.assign({value:e,defaultValue:void 0===t?void 0:t.toString()},s),void 0)]}),void 0),(0,i.jsx)(U,Object.assign({disabled:s.disabled},{children:e}),void 0)]},void 0))),H=r.ZP.button`
  min-width: 100px;
  height: 30px;
  margin: 10px;
  font-size: 16px;
  user-select: none;
`,W=r.ZP.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
`,A=r.ZP.div`
  margin: 10px;
  font-size: 18px;
`,J=(0,a.memo)((({isPaused:e,isGameOver:t,isStart:s,values:n,score:r,onTogglePause:o,onRestart:d,onSettingChange:c,onResetSettings:l})=>{const h=(0,a.useCallback)((e=>{const t=e.target,{variable:s}=t.dataset;s&&c&&c(s,+t.value)}),[c]),u=!t&&!s;return(0,i.jsxs)(W,{children:[(0,i.jsxs)(A,{children:["Score: ",r]},void 0),(0,i.jsx)(H,Object.assign({disabled:t||s,onClick:o},{children:e?"Resume":"Pause"}),void 0),(0,i.jsx)(H,Object.assign({onClick:d},{children:s?"Start":"Restart"}),void 0),(0,i.jsx)(D,{disabled:u,value:n.width,min:I.dp.VV.b,max:I.dp.Fp.b,defaultValue:n.width,"data-variable":"width",onChange:h},void 0),(0,i.jsx)(D,{disabled:u,value:n.height,min:I.dp.VV.C,max:I.dp.Fp.C,defaultValue:n.height,"data-variable":"height",onChange:h},void 0),(0,i.jsx)(D,{disabled:!e&&u,value:n.speed,min:I.NS.VV,max:I.NS.Fp,defaultValue:n.speed,"data-variable":"speed",onChange:h},void 0),(0,i.jsx)(H,Object.assign({disabled:u,onClick:l},{children:"Reset settings"}),void 0)]},void 0)}));var M=s(7527),B=s(7493);const _={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:M},Y=((e,t,s)=>{const i={..._,...s},n=(e=>{let t=e instanceof Function?e():e;const s=[];return()=>{const e=(0,a.useState)(t)[1];(0,a.useEffect)((()=>(s.push(e),()=>{B(s,e)})),[]);const i=(0,a.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of s)e(t)}),[t,s]);return[t,i]}})((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=i.parse(t);if(i.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,i.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[s,r]=n(),o=(0,a.useCallback)((t=>{try{const n=t instanceof Function?t(s):t;r(n),window.localStorage.setItem(e,i.serialize(n))}catch(e){console.error(e)}}),[r]),d=(0,a.useCallback)((()=>{r(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[r]);return[s,o,d]}})("store:settings",{width:I.dp.ZP.b,height:I.dp.ZP.C,speed:I.NS.ZP});s.e(872).then(s.t.bind(s,5213,23));const K=r.ZP.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`,Q=()=>{const[e,t]=(0,a.useState)({isRunning:!0,isGameOver:!1,isStart:!0}),[s,n,r]=Y(),d=(c=n,(0,a.useCallback)(((e,t)=>{c((s=>({...s,[e]:t})))}),[c]));var c;const[l,h]=(0,a.useState)(o("gameid-")),[u,p]=(0,a.useState)(0),{isRunning:g,isGameOver:v,isStart:x}=e,m=(0,a.useCallback)((()=>{t({isRunning:!g,isGameOver:!1,isStart:!1})}),[g,t]),f=(0,a.useCallback)((()=>{t({isRunning:!0,isGameOver:!1,isStart:!1}),h(o("gameid-")),p(0)}),[t,p]),b=(0,a.useCallback)((()=>{t({isRunning:!1,isGameOver:!0,isStart:!1})}),[t]);(e=>{const t=(0,a.useRef)();T("keydown",(0,a.useCallback)((e=>{t.current=e.keyCode}),[e,t])),T("keyup",(0,a.useCallback)((s=>{t.current===s.keyCode&&(t.current=void 0,e(s))}),[e,t]))})((0,a.useCallback)((()=>{x&&f()}),[x,f]));const w=(0,a.useCallback)((e=>{if(x)return;const{keyCode:t}=e;27===t&&(e.preventDefault(),v?f():m(),e.stopPropagation())}),[v,x,f,m]);return T("keydown",w),(0,i.jsxs)(K,{children:[(0,i.jsx)(J,{isPaused:!g,isGameOver:v,isStart:x,values:s,score:u,onRestart:f,onSettingChange:d,onResetSettings:r,onTogglePause:m},void 0),(0,i.jsx)($,{gameId:l,isRunning:g,isGameOver:v,isStart:x,score:u,width:s.width,height:s.height,speed:s.speed,initialLength:I.R_,onScoreChange:p,onGameOver:b},void 0)]},void 0)};n.render((0,i.jsx)(Q,{},void 0),document.getElementById("app"))}},0,[[1679,666,514,736]]]);