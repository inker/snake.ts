(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{162:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(53),r=a.n(s),c=a(1),l=a(26),o=a(2),d=a(54),u=a(55),h=a(18),m=a(56);var g=Object(n.memo)(({coordinates:e,...t})=>{const{x:a,y:n}=e;return i.a.createElement("rect",Object.assign({color:"red",x:a,y:n,width:1,height:1},t))});const p=c.b.div`
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
`,b=c.b.div`
  font-size: 20px;
`;var v=()=>i.a.createElement(p,null,i.a.createElement(b,null,"To start the game, press any key or click 'Start'"));const f=c.b.div`
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
`,w=c.b.div`
  font-size: 20px;
`;var O,x=Object(n.memo)(({score:e})=>i.a.createElement(f,null,i.a.createElement("div",null,"GAME OVER"),i.a.createElement("div",null,"Your score: ",e),i.a.createElement(w,null,"To restart the game, press Esc or click 'Restart'")));class E{constructor(e,t){this.x=e,this.y=t}add(e){return new E(this.x+e.x,this.y+e.y)}subtract(e){return new E(this.x-e.x,this.y-e.y)}equals(e){return this.x===e.x&&this.y===e.y}}!function(e){e[e.UP=0]="UP",e[e.RIGHT=1]="RIGHT",e[e.DOWN=2]="DOWN",e[e.LEFT=3]="LEFT"}(O||(O={}));var y=O;const j="pattern-"+Math.random().toString(36).slice(2),S=c.b.path`
  fill: none;
  stroke: #ccc;
  stroke-width: 0.1;
`;var k=Object(n.memo)(({size:e})=>i.a.createElement(i.a.Fragment,null,i.a.createElement("defs",null,i.a.createElement("pattern",{id:j,width:e,height:e,patternUnits:"userSpaceOnUse"},i.a.createElement(S,{d:`M ${e} 0 L 0 0 0 ${e}`}))),i.a.createElement("rect",{width:"100%",height:"100%",fill:`url(#${j})`})));var C=c.b.div`
  width: ${e=>e.width?e.width+"px":"100%"};
  height: ${e=>e.height?e.height+"px":"100%"};
  border: 1px solid #999;

  ${e=>e.paused&&c.a`
    opacity: 0.25;
    transition: opacity 0.2s;
  `}
`;var R=c.b.svg.attrs({xmlns:"http://www.w3.org/2000/svg"})`
  display: ${e=>e.visible?"":"none"};
`;var T=Object(n.memo)(({width:e,height:t,paused:a,popup:n,children:s})=>{const r=function(e,t){const a=700/e,n=500/t,i=Math.min(a,n);return{width:e*i,height:t*i}}(e,t);return i.a.createElement(C,{width:r.width,height:r.height,paused:a},i.a.createElement(R,{width:r.width,height:r.height,viewBox:`0 0 ${e} ${t}`,visible:!n},i.a.createElement(k,{size:1}),s),n)});class G{constructor(e,t){this.lastTimeStamp=-1,this.running=!1,this.step=e=>{if(!this.running)return;const t=e-this.lastTimeStamp;if(t>=this.interval){const a=~~(t/this.interval);this.lastTimeStamp=e;for(let e=0;e<a;++e)this.onUpdate(a)}window.requestAnimationFrame(this.step)},this.interval=e,this.onUpdate=t}start(){this.running=!0,window.requestAnimationFrame(e=>{this.lastTimeStamp=e,window.requestAnimationFrame(this.step)})}stop(){this.running=!1}}var z=(e,t,a=window,i)=>{Object(n.useEffect)(()=>{if(t&&a)return a.addEventListener(e,t,i),()=>{a.removeEventListener(e,t)}},[e,t,a,JSON.stringify(i)])},I=()=>{const[e,t]=Object(n.useState)(-1),a=Object(n.useCallback)(e=>{const a=(e=>{switch(e){case 38:case 87:return y.UP;case 39:case 68:return y.RIGHT;case 37:case 65:return y.LEFT;case 40:case 83:return y.DOWN;default:return-1}})(e.keyCode);a<0||t(a)},[t]);return z("keydown",a),[e,Object(n.useCallback)(()=>{t(-1)},[t])]},L=e=>{const[t,a]=I(),[i,s]=Object(n.useState)(e),r=t<0?e:(l=t,(c=i)===y.UP&&l===y.DOWN||c===y.DOWN&&l===y.UP||c===y.RIGHT&&l===y.LEFT||c===y.LEFT&&l===y.RIGHT?i:t);var c,l;const o=Object(n.useCallback)(()=>{s(r)},[r,s]);return[r,o,a]};const $=e=>`${e.x},${e.y}`;function P(e,t,a){const n=new E(h(0,e-1),h(0,t-1));return a.some(e=>e.equals(n))?P(e,t,a):n}function F(e,t,a){const n=function(e,t){const a=h(0,t-1);return u(2+e,2).map(e=>new E(e,a))}(a,t);return{snake:n,food:P(e,t,n)}}var U=Object(n.memo)(({gameId:e,isRunning:t,width:a,height:s,speed:r,score:c,isGameOver:l,isStart:o,initialLength:u,onScoreChange:h,onGameOver:p})=>{const b=F(a,s,u),[f,w]=Object(n.useState)(b),[O,j,S]=L(y.RIGHT),{snake:k,food:C}=f;Object(n.useEffect)(()=>{S(),w(b)},[e]),((e,t,a)=>{const{current:i}=Object(n.useRef)(new G(t,a));i.interval=t,i.onUpdate=a,Object(n.useEffect)(()=>()=>{i.stop()},[]),Object(n.useEffect)(()=>{i[e?"start":"stop"]()},[e])})(t&&!l&&!o,1e3/r,()=>{j();const e=k[0],t=new E((n=O)===y.LEFT?-1:n===y.RIGHT?1:0,n===y.UP?-1:n===y.DOWN?1:0);var n;const i=e.add(t),r=C&&i.equals(C),l=!r&&k.some(e=>e.equals(i))||i.x<0||i.y<0||i.x>=a||i.y>=s,o=r?k:d(k),u=[i,...o];r&&h(c+1),l&&p(),w({snake:u,food:r?P(a,s,u):C})});const R=o?i.a.createElement(v,null):l?i.a.createElement(x,{score:c}):null;return i.a.createElement(T,{width:a,height:s,paused:!t&&!l,popup:R},m(k,$).map(e=>i.a.createElement(g,{key:$(e),coordinates:e,fill:"blue"})),C&&i.a.createElement(g,{coordinates:C,fill:"red"}))}),N=a(60);var q=c.b.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin: 10px;
`;var D=c.b.label`
  display: flex;
  flex-direction: column;
  color: ${e=>e.disabled?"#999":""};
`;var H=c.b.div`
  width: 30px;
  color: ${e=>e.disabled?"#999":""};
`;var J=c.b.input.attrs({type:"range"})`
  width: 150px;
`;var V=Object(n.memo)(({value:e,defaultValue:t,...a})=>i.a.createElement(q,null,i.a.createElement(D,{disabled:a.disabled},N(a["data-variable"]),i.a.createElement(J,Object.assign({value:e,defaultValue:void 0===t?void 0:t.toString()},a))),i.a.createElement(H,{disabled:a.disabled},e)));var W=c.b.button`
  min-width: 100px;
  height: 30px;
  margin: 10px;
  font-size: 16px;
  user-select: none;
`;const A=c.b.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
`,M=c.b.div`
  margin: 10px;
  font-size: 18px;
`;var B=Object(n.memo)(({isPaused:e,isGameOver:t,isStart:a,values:s,score:r,onTogglePause:c,onRestart:l,onSettingChange:d,onResetSettings:u})=>{const h=Object(n.useCallback)(e=>{const t=e.target,{variable:a}=t.dataset;a&&d&&d(a,+t.value)},[d]),m=!t&&!a;return i.a.createElement(A,null,i.a.createElement(M,null,"Score: ",r),i.a.createElement(W,{disabled:t||a,onClick:c},e?"Resume":"Pause"),i.a.createElement(W,{onClick:l},a?"Start":"Restart"),i.a.createElement(V,{disabled:m,value:s.width,min:o.size.min.width,max:o.size.max.width,defaultValue:s.width,"data-variable":"width",onChange:h}),i.a.createElement(V,{disabled:m,value:s.height,min:o.size.min.height,max:o.size.max.height,defaultValue:s.height,"data-variable":"height",onChange:h}),i.a.createElement(V,{disabled:!e&&m,value:s.speed,min:o.speed.min,max:o.speed.max,defaultValue:s.speed,"data-variable":"speed",onChange:h}),i.a.createElement(W,{disabled:m,onClick:u},"Reset settings"))});a.e("version").then(a.t.bind(null,163,7));const Y=c.b.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`,K={width:o.size.default.width,height:o.size.default.height,speed:o.speed.default};var Q=()=>{const[e,t]=Object(n.useState)({isRunning:!0,isGameOver:!1,isStart:!0}),[a,s,r]=((e,t)=>{const[a,i]=Object(n.useState)(()=>{try{const a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(e){return console.error(e),t}}),s=Object(n.useCallback)(t=>{try{const n=t instanceof Function?t(a):t;i(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(e){console.error(e)}},[i]),r=Object(n.useCallback)(()=>{i(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}},[i]);return[a,s,r]})("settings",K),c=(d=s,Object(n.useCallback)((e,t)=>{d(a=>({...a,[e]:t}))},[d]));var d;const[u,h]=Object(n.useState)(l("gameid-")),[m,g]=Object(n.useState)(0),{isRunning:p,isGameOver:b,isStart:v}=e,f=Object(n.useCallback)(()=>{t({isRunning:!p,isGameOver:!1,isStart:!1})},[p,t]),w=Object(n.useCallback)(()=>{t({isRunning:!0,isGameOver:!1,isStart:!1}),h(l("gameid-")),g(0)},[t,g]),O=Object(n.useCallback)(()=>{t({isRunning:!1,isGameOver:!0,isStart:!1})},[t]);(e=>{const t=Object(n.useRef)();z("keydown",Object(n.useCallback)(e=>{t.current=e.keyCode},[e,t])),z("keyup",Object(n.useCallback)(a=>{t.current===a.keyCode&&(t.current=void 0,e(a))},[e,t]))})(Object(n.useCallback)(()=>{v&&w()},[v,w]));const x=Object(n.useCallback)(e=>{if(v)return;const{keyCode:t}=e;27===t&&(e.preventDefault(),b?w():f(),e.stopPropagation())},[b,v,w,f]);return z("keydown",x),i.a.createElement(Y,null,i.a.createElement(B,{isPaused:!p,isGameOver:b,isStart:v,values:a,score:m,onRestart:w,onSettingChange:c,onResetSettings:r,onTogglePause:f}),i.a.createElement(U,{gameId:u,isRunning:p,isGameOver:b,isStart:v,score:m,width:a.width,height:a.height,speed:a.speed,initialLength:o.initialLength,onScoreChange:g,onGameOver:O}))};r.a.render(i.a.createElement(Q,null),document.getElementById("app"))},2:function(e){e.exports=JSON.parse('{"size":{"default":{"width":50,"height":50},"min":{"width":20,"height":20},"max":{"width":100,"height":100}},"speed":{"default":25,"min":1,"max":50},"initialLength":4}')}},[[162,"runtime~app","react","vendor"]]]);