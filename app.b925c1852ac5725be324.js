"use strict";(self.webpackChunksnake=self.webpackChunksnake||[]).push([[524],{7959:(e,t,s)=>{var i=s(4848),n=s(961),a=s(6540),r=s(4612),o=s(7200),d=s(3424),c=s(3181),l=s(8253),u=s(14);const h=(0,a.memo)((({coordinates:e,...t})=>{const{x:s,y:n}=e;return(0,i.jsx)("rect",Object.assign({color:"red",x:s,y:n,width:1,height:1},t),void 0)})),g=r.Ay.div`
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
`,v=r.Ay.div`
  font-size: 20px;
`,p=()=>(0,i.jsx)(g,{children:(0,i.jsx)(v,{children:"To start the game, press any key or click 'Start'"},void 0)},void 0),x=r.Ay.div`
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
`,m=r.Ay.div`
  font-size: 20px;
`,f=(0,a.memo)((({score:e})=>(0,i.jsxs)(x,{children:[(0,i.jsx)("div",{children:"GAME OVER"},void 0),(0,i.jsxs)("div",{children:["Your score: ",e]},void 0),(0,i.jsx)(m,{children:"To restart the game, press Esc or click 'Restart'"},void 0)]},void 0)));class y{constructor(e,t){this.x=e,this.y=t}add(e){return new y(this.x+e.x,this.y+e.y)}subtract(e){return new y(this.x-e.x,this.y-e.y)}equals(e){return this.x===e.x&&this.y===e.y}}var j;!function(e){e[e.UP=0]="UP",e[e.RIGHT=1]="RIGHT",e[e.DOWN=2]="DOWN",e[e.LEFT=3]="LEFT"}(j||(j={}));const w=j,b=`pattern-${Math.random().toString(36).slice(2)}`,k=r.Ay.path`
  fill: none;
  stroke: #ccc;
  stroke-width: 0.1;
`,S=(0,a.memo)((({size:e})=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("defs",{children:(0,i.jsx)("pattern",Object.assign({id:b,width:e,height:e,patternUnits:"userSpaceOnUse"},{children:(0,i.jsx)(k,{d:`M ${e} 0 L 0 0 0 ${e}`},void 0)}),void 0)},void 0),(0,i.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${b})`},void 0)]},void 0))),O=r.Ay.div`
  width: ${e=>e.width?`${e.width}px`:"100%"};
  height: ${e=>e.height?`${e.height}px`:"100%"};
  border: 1px solid #999;

  ${e=>e.paused&&r.AH`
    opacity: 0.25;
    transition: opacity 0.2s;
  `}
`,C=r.Ay.svg.attrs({xmlns:"http://www.w3.org/2000/svg"})`
  display: ${e=>e.visible?"":"none"};
`;const T=(0,a.memo)((({width:e,height:t,paused:s,popup:n,children:a})=>{const r=function(e,t){const s=700/e,i=500/t,n=Math.min(s,i);return{width:e*n,height:t*n}}(e,t);return(0,i.jsxs)(O,Object.assign({width:r.width,height:r.height,paused:s},{children:[(0,i.jsxs)(C,Object.assign({width:r.width,height:r.height,viewBox:`0 0 ${e} ${t}`,visible:!n},{children:[(0,i.jsx)(S,{size:1},void 0),a]}),void 0),n]}),void 0)}));class A{constructor(e,t){this.lastTimeStamp=-1,this.running=!1,this.step=e=>{if(!this.running)return;const t=e-this.lastTimeStamp;if(t>=this.interval){const s=~~(t/this.interval);this.lastTimeStamp=e;for(let e=0;e<s;++e)this.onUpdate(s)}window.requestAnimationFrame(this.step)},this.interval=e,this.onUpdate=t}start(){this.running=!0,window.requestAnimationFrame((e=>{this.lastTimeStamp=e,window.requestAnimationFrame(this.step)}))}stop(){this.running=!1}}const R=(e,t,s=window,i)=>{(0,a.useEffect)((()=>{if(t&&s)return s.addEventListener(e,t,i),()=>{s.removeEventListener(e,t)}}),[e,t,s,JSON.stringify(i)])},E=()=>{const[e,t]=(0,a.useState)(-1),s=(0,a.useCallback)((e=>{const s=(e=>{switch(e){case 38:case 87:return w.UP;case 39:case 68:return w.RIGHT;case 37:case 65:return w.LEFT;case 40:case 83:return w.DOWN;default:return-1}})(e.keyCode);s<0||t(s)}),[t]);R("keydown",s);return[e,(0,a.useCallback)((()=>{t(-1)}),[t])]},G=e=>{const[t,s]=E(),[i,n]=(0,a.useState)(e),r=t<0?e:(d=t,(o=i)===w.UP&&d===w.DOWN||o===w.DOWN&&d===w.UP||o===w.RIGHT&&d===w.LEFT||o===w.LEFT&&d===w.RIGHT?i:t);var o,d;const c=(0,a.useCallback)((()=>{n(r)}),[r,n]);return[r,c,s]},$=2,I=e=>`${e.x},${e.y}`;function F(e,t,s){const i=new y(l(0,e-1),l(0,t-1));return s.some((e=>e.equals(i)))?F(e,t,s):i}function z(e,t,s){const i=function(e,t){const s=l(0,t-1);return c($+e,$).map((e=>new y(e,s)))}(s,t);return{snake:i,food:F(e,t,i)}}const P=(0,a.memo)((({gameId:e,isRunning:t,width:s,height:n,speed:r,score:o,isGameOver:c,isStart:l,initialLength:g,onScoreChange:v,onGameOver:x})=>{const m=z(s,n,g),[j,b]=(0,a.useState)(m),[k,S,O]=G(w.RIGHT),{snake:C,food:R}=j;(0,a.useEffect)((()=>{O(),b(m)}),[e]),((e,t,s)=>{const{current:i}=(0,a.useRef)(new A(t,s));i.interval=t,i.onUpdate=s,(0,a.useEffect)((()=>()=>{i.stop()}),[]),(0,a.useEffect)((()=>{i[e?"start":"stop"]()}),[e])})(t&&!c&&!l,1e3/r,(()=>{S();const e=C[0],t=new y((i=k)===w.LEFT?-1:i===w.RIGHT?1:0,i===w.UP?-1:i===w.DOWN?1:0);var i;const a=e.add(t),r=R&&a.equals(R),c=!r&&C.some((e=>e.equals(a)))||a.x<0||a.y<0||a.x>=s||a.y>=n,l=r?C:d(C),u=[a,...l];r&&v(o+1),c&&x(),b({snake:u,food:r?F(s,n,u):R})}));const E=l?(0,i.jsx)(p,{},void 0):c?(0,i.jsx)(f,{score:o},void 0):null;return(0,i.jsxs)(T,Object.assign({width:s,height:n,paused:!t&&!c,popup:E},{children:[u(C,I).map((e=>(0,i.jsx)(h,{coordinates:e,fill:"blue"},I(e)))),R&&(0,i.jsx)(h,{coordinates:R,fill:"red"},void 0)]}),void 0)})),V=JSON.parse('{"Ej":{"Ay":{"V":20,"u":20},"jk":{"V":10,"u":10},"T9":{"V":100,"u":100}},"eY":{"Ay":25,"jk":1,"T9":50},"ry":4}');var L=s(4792);const U=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin: 10px;
`,N=r.Ay.label`
  display: flex;
  flex-direction: column;
  color: ${e=>e.disabled?"#999":""};
`,H=r.Ay.div`
  width: 30px;
  color: ${e=>e.disabled?"#999":""};
`,q=r.Ay.input.attrs({type:"range"})`
  width: 150px;
`,D=(0,a.memo)((({value:e,defaultValue:t,...s})=>(0,i.jsxs)(U,{children:[(0,i.jsxs)(N,Object.assign({disabled:s.disabled},{children:[L(s["data-variable"]),(0,i.jsx)(q,Object.assign({value:e,defaultValue:void 0===t?void 0:t.toString()},s),void 0)]}),void 0),(0,i.jsx)(H,Object.assign({disabled:s.disabled},{children:e}),void 0)]},void 0))),W=r.Ay.button`
  min-width: 100px;
  height: 30px;
  margin: 10px;
  font-size: 16px;
  user-select: none;
`,Y=r.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
`,J=r.Ay.div`
  margin: 10px;
  font-size: 18px;
`,M=(0,a.memo)((({isPaused:e,isGameOver:t,isStart:s,values:n,score:r,onTogglePause:o,onRestart:d,onSettingChange:c,onResetSettings:l})=>{const u=(0,a.useCallback)((e=>{const t=e.target,{variable:s}=t.dataset;s&&c&&c(s,+t.value)}),[c]),h=!t&&!s;return(0,i.jsxs)(Y,{children:[(0,i.jsxs)(J,{children:["Score: ",r]},void 0),(0,i.jsx)(W,Object.assign({disabled:t||s,onClick:o},{children:e?"Resume":"Pause"}),void 0),(0,i.jsx)(W,Object.assign({onClick:d},{children:s?"Start":"Restart"}),void 0),(0,i.jsx)(D,{disabled:h,value:n.width,min:V.Ej.jk.V,max:V.Ej.T9.V,defaultValue:n.width,"data-variable":"width",onChange:u},void 0),(0,i.jsx)(D,{disabled:h,value:n.height,min:V.Ej.jk.u,max:V.Ej.T9.u,defaultValue:n.height,"data-variable":"height",onChange:u},void 0),(0,i.jsx)(D,{disabled:!e&&h,value:n.speed,min:V.eY.jk,max:V.eY.T9,defaultValue:n.speed,"data-variable":"speed",onChange:u},void 0),(0,i.jsx)(W,Object.assign({disabled:h,onClick:l},{children:"Reset settings"}),void 0)]},void 0)}));var B=s(9238),K=s(121);const Q={parse:e=>JSON.parse(e),serialize:e=>JSON.stringify(e),validate:B},X=((e,t,s)=>{const i={...Q,...s},n=(e=>{let t=e instanceof Function?e():e;const s=[];return()=>{const e=(0,a.useState)(t)[1];(0,a.useEffect)((()=>(s.push(e),()=>{K(s,e)})),[]);const i=(0,a.useCallback)((e=>{t=e instanceof Function?e(t):e;for(const e of s)e(t)}),[t,s]);return[t,i]}})((()=>{try{const t=window.localStorage.getItem(e);if(t){const e=i.parse(t);if(i.validate(e))return e}}catch(e){console.error(e)}try{window.localStorage.setItem(e,i.serialize(t))}catch(e){console.error(e)}return t}));return()=>{const[s,r]=n(),o=(0,a.useCallback)((t=>{try{const n=t instanceof Function?t(s):t;r(n),window.localStorage.setItem(e,i.serialize(n))}catch(e){console.error(e)}}),[r]),d=(0,a.useCallback)((()=>{r(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}}),[r]);return[s,o,d]}})("store:settings",{width:V.Ej.Ay.V,height:V.Ej.Ay.u,speed:V.eY.Ay});s.e(365).then(s.t.bind(s,6104,23));const Z=r.Ay.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`,_=()=>{const[e,t]=(0,a.useState)({isRunning:!0,isGameOver:!1,isStart:!0}),[s,n,r]=X(),d=(c=n,(0,a.useCallback)(((e,t)=>{c((s=>({...s,[e]:t})))}),[c]));var c;const[l,u]=(0,a.useState)(o("gameid-")),[h,g]=(0,a.useState)(0),{isRunning:v,isGameOver:p,isStart:x}=e,m=(0,a.useCallback)((()=>{t({isRunning:!v,isGameOver:!1,isStart:!1})}),[v,t]),f=(0,a.useCallback)((()=>{t({isRunning:!0,isGameOver:!1,isStart:!1}),u(o("gameid-")),g(0)}),[t,g]),y=(0,a.useCallback)((()=>{t({isRunning:!1,isGameOver:!0,isStart:!1})}),[t]);(e=>{const t=(0,a.useRef)();R("keydown",(0,a.useCallback)((e=>{t.current=e.keyCode}),[e,t])),R("keyup",(0,a.useCallback)((s=>{t.current===s.keyCode&&(t.current=void 0,e(s))}),[e,t]))})((0,a.useCallback)((()=>{x&&f()}),[x,f]));const j=(0,a.useCallback)((e=>{if(x)return;const{keyCode:t}=e;27===t&&(e.preventDefault(),p?f():m(),e.stopPropagation())}),[p,x,f,m]);return R("keydown",j),(0,i.jsxs)(Z,{children:[(0,i.jsx)(M,{isPaused:!v,isGameOver:p,isStart:x,values:s,score:h,onRestart:f,onSettingChange:d,onResetSettings:r,onTogglePause:m},void 0),(0,i.jsx)(P,{gameId:l,isRunning:v,isGameOver:p,isStart:x,score:h,width:s.width,height:s.height,speed:s.speed,initialLength:V.ry,onScoreChange:g,onGameOver:y},void 0)]},void 0)};n.render((0,i.jsx)(_,{},void 0),document.getElementById("app"))}},e=>{e.O(0,[644,502],(()=>{return t=7959,e(e.s=t);var t}));e.O()}]);