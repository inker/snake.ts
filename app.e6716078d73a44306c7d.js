(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{167:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(54),r=a.n(s),c=a(1),l=a(26),o=a(2),d=a(55),u=a(56),h=a(18),m=a(57),g=a(17);var p=Object(n.memo)(e=>{var{coordinates:t}=e,a=Object(g.a)(e,["coordinates"]);const{x:n,y:s}=t;return i.a.createElement("rect",Object.assign({color:"red",x:n,y:s,width:1,height:1},a))});const b=c.b.div`
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
`,v=c.b.div`
  font-size: 20px;
`;var f=()=>i.a.createElement(b,null,i.a.createElement(v,null,"To start the game, press any key or click 'Start'"));const w=c.b.div`
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
`,O=c.b.div`
  font-size: 20px;
`;var x,E=Object(n.memo)(({score:e})=>i.a.createElement(w,null,i.a.createElement("div",null,"GAME OVER"),i.a.createElement("div",null,"Your score: ",e),i.a.createElement(O,null,"To restart the game, press Esc or click 'Restart'")));class j{constructor(e,t){this.x=e,this.y=t}add(e){return new j(this.x+e.x,this.y+e.y)}subtract(e){return new j(this.x-e.x,this.y-e.y)}equals(e){return this.x===e.x&&this.y===e.y}}!function(e){e[e.UP=0]="UP",e[e.RIGHT=1]="RIGHT",e[e.DOWN=2]="DOWN",e[e.LEFT=3]="LEFT"}(x||(x={}));var y=x;const S=`pattern-${(()=>Math.random().toString(36).slice(2))()}`,k=c.b.path`
  fill: none;
  stroke: #ccc;
  stroke-width: 0.1;
`;var C=Object(n.memo)(({size:e})=>i.a.createElement(i.a.Fragment,null,i.a.createElement("defs",null,i.a.createElement("pattern",{id:S,width:e,height:e,patternUnits:"userSpaceOnUse"},i.a.createElement(k,{d:`M ${e} 0 L 0 0 0 ${e}`}))),i.a.createElement("rect",{width:"100%",height:"100%",fill:`url(#${S})`})));var R=c.b.div`
  width: ${e=>e.width?`${e.width}px`:"100%"};
  height: ${e=>e.height?`${e.height}px`:"100%"};
  border: 1px solid #999;

  ${e=>e.paused&&c.a`
    opacity: 0.25;
    transition: opacity 0.2s;
  `}
`;var T=c.b.svg.attrs({xmlns:"http://www.w3.org/2000/svg"})`
  display: ${e=>e.visible?"":"none"};
`;const G=700,z=500;var $=Object(n.memo)(({width:e,height:t,paused:a,popup:n,children:s})=>{const r=function(e,t){const a=G/e,n=z/t,i=Math.min(a,n);return{width:e*i,height:t*i}}(e,t);return i.a.createElement(R,{width:r.width,height:r.height,paused:a},i.a.createElement(T,{width:r.width,height:r.height,viewBox:`0 0 ${e} ${t}`,visible:!n},i.a.createElement(C,{size:1}),s),n)});class I{constructor(e,t){this.lastTimeStamp=-1,this.running=!1,this.step=e=>{if(!this.running)return;const t=e-this.lastTimeStamp;if(t>=this.interval){const a=~~(t/this.interval);this.lastTimeStamp=e;for(let e=0;e<a;++e)this.onUpdate(a)}window.requestAnimationFrame(this.step)},this.interval=e,this.onUpdate=t}start(){this.running=!0,window.requestAnimationFrame(e=>{this.lastTimeStamp=e,window.requestAnimationFrame(this.step)})}stop(){this.running=!1}}var L=(e,t,a=window,i)=>{Object(n.useEffect)(()=>{if(t&&a)return a.addEventListener(e,t,i),()=>{a.removeEventListener(e,t)}},[e,t,a,JSON.stringify(i)])},P=()=>{const[e,t]=Object(n.useState)(-1),a=Object(n.useCallback)(e=>{const a=(e=>{switch(e){case 38:case 87:return y.UP;case 39:case 68:return y.RIGHT;case 37:case 65:return y.LEFT;case 40:case 83:return y.DOWN;default:return-1}})(e.keyCode);a<0||t(a)},[t]);return L("keydown",a),[e,Object(n.useCallback)(()=>{t(-1)},[t])]},F=e=>{const[t,a]=P(),[i,s]=Object(n.useState)(e),r=t<0?e:((e,t)=>e===y.UP&&t===y.DOWN||e===y.DOWN&&t===y.UP||e===y.RIGHT&&t===y.LEFT||e===y.LEFT&&t===y.RIGHT)(i,t)?i:t,c=Object(n.useCallback)(()=>{s(r)},[r,s]);return[r,c,a]};const U=2,N=e=>`${e.x},${e.y}`;function q(e,t,a){const n=new j(h(0,e-1),h(0,t-1));return a.some(e=>e.equals(n))?q(e,t,a):n}function D(e,t,a){const n=function(e,t){const a=h(0,t-1);return u(U+e,U).map(e=>new j(e,a))}(a,t);return{snake:n,food:q(e,t,n)}}var H=Object(n.memo)(({gameId:e,isRunning:t,width:a,height:s,speed:r,score:c,isGameOver:l,isStart:o,initialLength:u,onScoreChange:h,onGameOver:g})=>{const b=D(a,s,u),[v,w]=Object(n.useState)(b),[O,x,S]=F(y.RIGHT),{snake:k,food:C}=v;Object(n.useEffect)(()=>{S(),w(b)},[e]),((e,t,a)=>{const{current:i}=Object(n.useRef)(new I(t,a));i.interval=t,i.onUpdate=a,Object(n.useEffect)(()=>()=>{i.stop()},[]),Object(n.useEffect)(()=>{i[e?"start":"stop"]()},[e])})(t&&!l&&!o,1e3/r,()=>{x();const e=k[0],t=(e=>new j(e===y.LEFT?-1:e===y.RIGHT?1:0,e===y.UP?-1:e===y.DOWN?1:0))(O),n=e.add(t),i=C&&n.equals(C),r=!i&&k.some(e=>e.equals(n))||n.x<0||n.y<0||n.x>=a||n.y>=s,l=i?k:d(k),o=[n,...l];i&&h(c+1),r&&g(),w({snake:o,food:i?q(a,s,o):C})});const R=o?i.a.createElement(f,null):l?i.a.createElement(E,{score:c}):null;return i.a.createElement($,{width:a,height:s,paused:!t&&!l,popup:R},m(k,N).map(e=>i.a.createElement(p,{key:N(e),coordinates:e,fill:"blue"})),C&&i.a.createElement(p,{coordinates:C,fill:"red"}))}),V=a(60);var J=c.b.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin: 10px;
`;var W=c.b.label`
  display: flex;
  flex-direction: column;
  color: ${e=>e.disabled?"#999":""};
`;var A=c.b.div`
  width: 30px;
  color: ${e=>e.disabled?"#999":""};
`;var M=c.b.input.attrs({type:"range"})`
  width: 150px;
`;var B=Object(n.memo)(e=>{var{value:t,defaultValue:a}=e,n=Object(g.a)(e,["value","defaultValue"]);return i.a.createElement(J,null,i.a.createElement(W,{disabled:n.disabled},V(n["data-variable"]),i.a.createElement(M,Object.assign({value:t,defaultValue:void 0===a?void 0:a.toString()},n))),i.a.createElement(A,{disabled:n.disabled},t))});var Y=c.b.button`
  min-width: 100px;
  height: 30px;
  margin: 10px;
  font-size: 16px;
  user-select: none;
`;const K=c.b.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
`,Q=c.b.div`
  margin: 10px;
  font-size: 18px;
`;var X=Object(n.memo)(({isPaused:e,isGameOver:t,isStart:a,values:s,score:r,onTogglePause:c,onRestart:l,onSettingChange:d,onResetSettings:u})=>{const h=Object(n.useCallback)(e=>{const t=e.target,{variable:a}=t.dataset;a&&d&&d(a,+t.value)},[d]),m=!t&&!a;return i.a.createElement(K,null,i.a.createElement(Q,null,"Score: ",r),i.a.createElement(Y,{disabled:t||a,onClick:c},e?"Resume":"Pause"),i.a.createElement(Y,{onClick:l},a?"Start":"Restart"),i.a.createElement(B,{disabled:m,value:s.width,min:o.size.min.width,max:o.size.max.width,defaultValue:s.width,"data-variable":"width",onChange:h}),i.a.createElement(B,{disabled:m,value:s.height,min:o.size.min.height,max:o.size.max.height,defaultValue:s.height,"data-variable":"height",onChange:h}),i.a.createElement(B,{disabled:!e&&m,value:s.speed,min:o.speed.min,max:o.speed.max,defaultValue:s.speed,"data-variable":"speed",onChange:h}),i.a.createElement(Y,{disabled:m,onClick:u},"Reset settings"))});a.e("version").then(a.t.bind(null,168,7));const Z=c.b.div`
  display: flex;
  font-family: Tahoma, Arial, sans-serif;
`,_={width:o.size.default.width,height:o.size.default.height,speed:o.speed.default};var ee=()=>{const[e,t]=Object(n.useState)({isRunning:!0,isGameOver:!1,isStart:!0}),[a,s,r]=((e,t)=>{const[a,i]=Object(n.useState)(()=>{try{const a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(e){return console.error(e),t}}),s=Object(n.useCallback)(t=>{try{const n=t instanceof Function?t(a):t;i(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(e){console.error(e)}},[i]),r=Object(n.useCallback)(()=>{i(t);try{window.localStorage.removeItem(e)}catch(e){console.error(e)}},[i]);return[a,s,r]})("settings",_),c=(e=>Object(n.useCallback)((t,a)=>{e(e=>Object.assign(Object.assign({},e),{[t]:a}))},[e]))(s),[d,u]=Object(n.useState)(l("gameid-")),[h,m]=Object(n.useState)(0),{isRunning:g,isGameOver:p,isStart:b}=e,v=Object(n.useCallback)(()=>{t({isRunning:!g,isGameOver:!1,isStart:!1})},[g,t]),f=Object(n.useCallback)(()=>{t({isRunning:!0,isGameOver:!1,isStart:!1}),u(l("gameid-")),m(0)},[t,m]),w=Object(n.useCallback)(()=>{t({isRunning:!1,isGameOver:!0,isStart:!1})},[t]);(e=>{const t=Object(n.useRef)();L("keydown",Object(n.useCallback)(e=>{t.current=e.keyCode},[e,t])),L("keyup",Object(n.useCallback)(a=>{t.current===a.keyCode&&(t.current=void 0,e(a))},[e,t]))})(Object(n.useCallback)(()=>{b&&f()},[b,f]));const O=Object(n.useCallback)(e=>{if(b)return;const{keyCode:t}=e;27===t&&(e.preventDefault(),p?f():v(),e.stopPropagation())},[p,b,f,v]);return L("keydown",O),i.a.createElement(Z,null,i.a.createElement(X,{isPaused:!g,isGameOver:p,isStart:b,values:a,score:h,onRestart:f,onSettingChange:c,onResetSettings:r,onTogglePause:v}),i.a.createElement(H,{gameId:d,isRunning:g,isGameOver:p,isStart:b,score:h,width:a.width,height:a.height,speed:a.speed,initialLength:o.initialLength,onScoreChange:m,onGameOver:w}))};r.a.render(i.a.createElement(ee,null),document.getElementById("app"))},2:function(e){e.exports=JSON.parse('{"size":{"default":{"width":50,"height":50},"min":{"width":20,"height":20},"max":{"width":100,"height":100}},"speed":{"default":25,"min":1,"max":50},"initialLength":4}')}},[[167,"runtime~app","react","vendor"]]]);