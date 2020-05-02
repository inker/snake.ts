(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{162:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(53),r=a.n(s),c=a(1),l=a(26),o=a(54),d=a(55),u=a(18),h=a(56);var m=Object(n.memo)(({coordinates:e,...t})=>{const{x:a,y:n}=e;return i.a.createElement("rect",Object.assign({color:"red",x:a,y:n,width:1,height:1},t))});const g=c.b.div`
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
`,p=c.b.div`
  font-size: 20px;
`;var b=()=>i.a.createElement(g,null,i.a.createElement(p,null,"To start the game, press any key or click 'Start'"));const v=c.b.div`
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
`,f=c.b.div`
  font-size: 20px;
`;var w,O=Object(n.memo)(({score:e})=>i.a.createElement(v,null,i.a.createElement("div",null,"GAME OVER"),i.a.createElement("div",null,"Your score: ",e),i.a.createElement(f,null,"To restart the game, press Esc or click 'Restart'")));class x{constructor(e,t){this.x=e,this.y=t}add(e){return new x(this.x+e.x,this.y+e.y)}subtract(e){return new x(this.x-e.x,this.y-e.y)}equals(e){return this.x===e.x&&this.y===e.y}}!function(e){e[e.UP=0]="UP",e[e.RIGHT=1]="RIGHT",e[e.DOWN=2]="DOWN",e[e.LEFT=3]="LEFT"}(w||(w={}));var E=w;const y="pattern-"+Math.random().toString(36).slice(2),j=c.b.path`
  fill: none;
  stroke: #ccc;
  stroke-width: 0.1;
`;var S=Object(n.memo)(({size:e})=>i.a.createElement(i.a.Fragment,null,i.a.createElement("defs",null,i.a.createElement("pattern",{id:y,width:e,height:e,patternUnits:"userSpaceOnUse"},i.a.createElement(j,{d:`M ${e} 0 L 0 0 0 ${e}`}))),i.a.createElement("rect",{width:"100%",height:"100%",fill:`url(#${y})`})));var k=c.b.div`
  width: ${e=>e.width?e.width+"px":"100%"};
  height: ${e=>e.height?e.height+"px":"100%"};
  border: 1px solid #999;

  ${e=>e.paused&&c.a`
    opacity: 0.25;
    transition: opacity 0.2s;
  `}
`;var C=c.b.svg.attrs({xmlns:"http://www.w3.org/2000/svg"})`
  display: ${e=>e.visible?"":"none"};
`;var R=Object(n.memo)(({width:e,height:t,paused:a,popup:n,children:s})=>{const r=function(e,t){const a=700/e,n=500/t,i=Math.min(a,n);return{width:e*i,height:t*i}}(e,t);return i.a.createElement(k,{width:r.width,height:r.height,paused:a},i.a.createElement(C,{width:r.width,height:r.height,viewBox:`0 0 ${e} ${t}`,visible:!n},i.a.createElement(S,{size:1}),s),n)});class T{constructor(e,t){this.lastTimeStamp=-1,this.running=!1,this.step=e=>{if(!this.running)return;const t=e-this.lastTimeStamp;if(t>=this.interval){const a=~~(t/this.interval);this.lastTimeStamp=e;for(let e=0;e<a;++e)this.onUpdate(a)}window.requestAnimationFrame(this.step)},this.interval=e,this.onUpdate=t}start(){this.running=!0,window.requestAnimationFrame(e=>{this.lastTimeStamp=e,window.requestAnimationFrame(this.step)})}stop(){this.running=!1}}var G=(e,t,a=window,i)=>{Object(n.useEffect)(()=>{if(t&&a)return a.addEventListener(e,t,i),()=>{a.removeEventListener(e,t)}},[e,t,a,JSON.stringify(i)])},z=()=>{const[e,t]=Object(n.useState)(-1),a=Object(n.useCallback)(e=>{const a=(e=>{switch(e){case 38:case 87:return E.UP;case 39:case 68:return E.RIGHT;case 37:case 65:return E.LEFT;case 40:case 83:return E.DOWN;default:return-1}})(e.keyCode);a<0||t(a)},[t]);return G("keydown",a),[e,Object(n.useCallback)(()=>{t(-1)},[t])]},I=e=>{const[t,a]=z(),[i,s]=Object(n.useState)(e),r=t<0?e:(l=t,(c=i)===E.UP&&l===E.DOWN||c===E.DOWN&&l===E.UP||c===E.RIGHT&&l===E.LEFT||c===E.LEFT&&l===E.RIGHT?i:t);var c,l;const o=Object(n.useCallback)(()=>{s(r)},[r,s]);return[r,o,a]};const L=e=>`${e.x},${e.y}`;function $(e,t,a){const n=new x(u(0,e-1),u(0,t-1));return a.some(e=>e.equals(n))?$(e,t,a):n}function P(e,t,a){const n=function(e,t){const a=u(0,t-1);return d(2+e,2).map(e=>new x(e,a))}(a,t);return{snake:n,food:$(e,t,n)}}var F=Object(n.memo)(({gameId:e,isRunning:t,width:a,height:s,speed:r,score:c,isGameOver:l,isStart:d,initialLength:u,onScoreChange:g,onGameOver:p})=>{const v=P(a,s,u),[f,w]=Object(n.useState)(v),[y,j,S]=I(E.RIGHT),{snake:k,food:C}=f;Object(n.useEffect)(()=>{S(),w(v)},[e]),((e,t,a)=>{const{current:i}=Object(n.useRef)(new T(t,a));i.interval=t,i.onUpdate=a,Object(n.useEffect)(()=>()=>{i.stop()},[]),Object(n.useEffect)(()=>{i[e?"start":"stop"]()},[e])})(t&&!l&&!d,1e3/r,()=>{j();const e=k[0],t=new x((n=y)===E.LEFT?-1:n===E.RIGHT?1:0,n===E.UP?-1:n===E.DOWN?1:0);var n;const i=e.add(t),r=C&&i.equals(C),l=!r&&k.some(e=>e.equals(i))||i.x<0||i.y<0||i.x>=a||i.y>=s,d=r?k:o(k),u=[i,...d];r&&g(c+1),l&&p(),w({snake:u,food:r?$(a,s,u):C})});const G=d?i.a.createElement(b,null):l?i.a.createElement(O,{score:c}):null;return i.a.createElement(R,{width:a,height:s,paused:!t&&!l,popup:G},h(k,L).map(e=>i.a.createElement(m,{key:L(e),coordinates:e,fill:"blue"})),C&&i.a.createElement(m,{coordinates:C,fill:"red"}))}),U=a(2),N=a(60);var q=c.b.div`
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
`;var B=Object(n.memo)(({isPaused:e,isGameOver:t,isStart:a,values:s,score:r,onTogglePause:c,onRestart:l,onSettingChange:o,onResetSettings:d})=>{const u=Object(n.useCallback)(e=>{const t=e.target,{variable:a}=t.dataset;a&&o&&o(a,+t.value)},[o]),h=!t&&!a;return i.a.createElement(A,null,i.a.createElement(M,null,"Score: ",r),i.a.createElement(W,{disabled:t||a,onClick:c},e?"Resume":"Pause"),i.a.createElement(W,{onClick:l},a?"Start":"Restart"),i.a.createElement(V,{disabled:h,value:s.width,min:U.size.min.width,max:U.size.max.width,defaultValue:s.width,"data-variable":"width",onChange:u}),i.a.createElement(V,{disabled:h,value:s.height,min:U.size.min.height,max:U.size.max.height,defaultValue:s.height,"data-variable":"height",onChange:u}),i.a.createElement(V,{disabled:!e&&h,value:s.speed,min:U.speed.min,max:U.speed.max,defaultValue:s.speed,"data-variable":"speed",onChange:u}),i.a.createElement(W,{disabled:h,onClick:d},"Reset settings"))});a.e("version").then(a.t.bind(null,163,7));const Y=c.b.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`,K={width:U.size.default.width,height:U.size.default.height,speed:U.speed.default};var Q=()=>{const[e,t]=Object(n.useState)({isRunning:!0,isGameOver:!1,isStart:!0}),[a,s,r]=((e,t)=>{const[a,i]=Object(n.useState)(()=>{try{const a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(e){return console.error(e),t}}),s=Object(n.useCallback)(t=>{try{const n=t instanceof Function?t(a):t;i(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(e){console.error(e)}},[i]),r=Object(n.useCallback)(()=>{i(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}},[i]);return[a,s,r]})("settings",K),c=(o=s,Object(n.useCallback)((e,t)=>{o(a=>({...a,[e]:t}))},[o]));var o;const[d,u]=Object(n.useState)(l("gameid-")),[h,m]=Object(n.useState)(0),{isRunning:g,isGameOver:p,isStart:b}=e,v=Object(n.useCallback)(()=>{t({isRunning:!g,isGameOver:!1,isStart:!1})},[g,t]),f=Object(n.useCallback)(()=>{t({isRunning:!0,isGameOver:!1,isStart:!1}),u(l("gameid-")),m(0)},[t,m]),w=Object(n.useCallback)(()=>{t({isRunning:!1,isGameOver:!0,isStart:!1})},[t]);(e=>{const t=Object(n.useRef)();G("keydown",Object(n.useCallback)(e=>{t.current=e.keyCode},[e,t])),G("keyup",Object(n.useCallback)(a=>{t.current===a.keyCode&&(t.current=void 0,e(a))},[e,t]))})(Object(n.useCallback)(()=>{b&&f()},[b,f]));const O=Object(n.useCallback)(e=>{if(b)return;const{keyCode:t}=e;27===t&&(e.preventDefault(),p?f():v(),e.stopPropagation())},[p,b,f,v]);return G("keydown",O),i.a.createElement(Y,null,i.a.createElement(B,{isPaused:!g,isGameOver:p,isStart:b,values:a,score:h,onRestart:f,onSettingChange:c,onResetSettings:r,onTogglePause:v}),i.a.createElement(F,{gameId:d,isRunning:g,isGameOver:p,isStart:b,score:h,width:a.width,height:a.height,speed:a.speed,initialLength:U.initialLength,onScoreChange:m,onGameOver:w}))};r.a.render(i.a.createElement(Q,null),document.getElementById("app"))},2:function(e){e.exports=JSON.parse('{"size":{"default":{"width":50,"height":50},"min":{"width":20,"height":20},"max":{"width":100,"height":100}},"speed":{"default":25,"min":1,"max":50},"initialLength":4}')}},[[162,"runtime~app","react","vendor"]]]);