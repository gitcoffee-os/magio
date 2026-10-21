(()=>{var g="magio.sdk",m=1;var Be=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --mg-scrollbar-thumb: color-mix(in srgb, var(--mg-muted, currentColor) 18%, transparent);
  --mg-scrollbar-thumb-hover: color-mix(in srgb, var(--mg-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-mg-scrolling] {
  scrollbar-color: var(--mg-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-mg-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-mg-scrolling]::-webkit-scrollbar-thumb { background: var(--mg-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--mg-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-mg-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function $e(e){let o=e.documentElement;if(o.hasAttribute("data-mg-scrollbar-activity"))return;o.setAttribute("data-mg-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",(d)=>{let c=d.target===e?o:d.target;if(!(c instanceof Element))return;if(!c.hasAttribute("data-mg-scrolling"))c.setAttribute("data-mg-scrolling","");let S=r.get(c);if(S!==void 0)clearTimeout(S);r.set(c,setTimeout(()=>{r.delete(c),c.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Gs=`(${$e.toString()})(document);`;var Xe=128,Ve=65536;var Ee=128;var ye=65536;var Bt=/^[a-z][a-z0-9-]{0,39}$/;var Ft=(e)=>Object(e)===e&&!Array.isArray(e),We=(e,o)=>Object.keys(e).every((r)=>o.includes(r)),Nt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Dt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,$t=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let r of e){if(!Ft(r)||!Bt.test(r.id)||!Nt(r.label))return!1;if(r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1)return!1;if(o.has(r.id))return!1;if(o.add(r.id),r.kind==="button"){if(!We(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!We(r,["kind","id","label","value","options","disabled"]))return!1;if(!Dt(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let d=new Set;for(let c of r.options){if(!Ft(c)||!We(c,["value","label"])||!Dt(c.value)||!Nt(c.label)||d.has(c.value))return!1;d.add(c.value)}if(!d.has(r.value))return!1}return!0};var he=20000000,xe=256;var qe=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Xt=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==o.bytes[r])return!1;return!0};var Vt=/^[A-Za-z0-9_-]{1,80}$/;var Wt=["left","right","top","bottom"];var qt=(e,o=0,r={remaining:16000})=>{if(--r.remaining<0||o>=32)return!1;if(e===null)return!0;let d=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let c of d)if(!qt(c,o+1,r))return!1;return!0},ze=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(ze);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(ze)}return String(e)===e||Number.isFinite(e)},je=(e)=>{try{if(String(e.id)!==e.id||!Vt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Wt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!qt(e.data)||!ze(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var jt=["file","directory","other","missing"],Je=(e)=>Boolean(e&&"sessionId"in e),Ye=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Kt=/^[0-9a-f]{7,64}$/i,Qe=(e)=>Kt.test(e),be=500,Te=32000,Jt=16000,Yt=128,Qt=200,Zt=2000,es=16000,ts=80,ss=200,os=16000;var rs=2000;var Ze=20000,ve=1024,_e=2000000;var ke=64000,Ae=8000,et=4000;var tt=960000;var ns=999,is=1e4,pe=500,as=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],ls=["stopped","starting","ready","failed"],Rs=new Set(as),ps=(e)=>Rs.has(e),us=(e)=>e&&ps(e)?e:"HOST_REJECTED",Y=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Y);if(Object(e)===e)return Object.values(e).every(Y);return!1},ds=(e)=>Y(e)&&JSON.stringify(e).length<=os,zt=(e)=>e?.trim().slice(0,ss)??"",Q=(e)=>{let o=e.id.trim().slice(0,Yt),r=e.title.trim().slice(0,Qt),d=e.url.trim().slice(0,Zt),c=e.text?.trim().slice(0,es),S=e.author?.trim().slice(0,ts),G=e.kind==="pull"?"pull":"issue",y={providerId:e.providerId.trim(),id:o,title:r||o,url:d,kind:G};if(c)y.text=c;if(S)y.author=S;if(G==="pull"){let R=zt(e.branches?.head),w=zt(e.branches?.base);if(R&&w)y.branches={head:R,base:w}}if(ds(e.data))y.data=e.data;return y},st=(e)=>{let o=Q(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},ot=(e)=>{let o={text:e.text.trim().slice(0,Jt)};if(e.send)o.send=!0;return o},rt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ns,Math.max(0,Math.round(e)))},nt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(is,Math.max(0,Math.ceil(e)))};var Z=(e)=>e.length>0&&e.length<=ve&&!e.includes("\x00")&&!e.includes("\\");var Ge=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>rs)return!1;return!e.split("/").some((r)=>r==="."||r==="..")},Os=new Set(ls),it=(e)=>Boolean(e&&"status"in e&&Os.has(String(e.status))&&!("body"in e)),Re=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),at=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),lt=(e)=>Boolean(e&&"written"in e&&e.written===!0),pt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Cs=new Set(jt),ut=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Cs.has(String(e.kind))&&Number.isFinite(e.size)),dt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Ps=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Ms=(e)=>Object(e)===e?e:null,Ke=(e)=>String(e)===e&&e.length>0,ws=(e)=>{if(!Ke(e.id))return null;if(e.ok===!0){let o={channel:g,v:m,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Ke(e.error))return{channel:g,v:m,type:"result",id:e.id,ok:!1,error:e.error,code:us(Ke(e.code)?e.code:void 0)};return null},ct=(e)=>{let o=Ms(e);if(!o||o.channel!==g||o.v!==m)return null;if(o.type==="result")return ws(o);if(!Ps.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var cs=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Is=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class a extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var gs=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Oe=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${ve} characters without NUL or backslash.`)),Ce=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},u=(e)=>(e.value+=1,`mg-${e.value}`),gt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??((t)=>t===o.parent),d=e.requestTimeoutMs??Ze,c=new Set,S=new Set,G=new Set,y=new Set,R=new Set,w=new Set,X=new Set,ue=new Set,de=new Set,z=new Set,Ue=[],oe=null,re=null,ce=new Set,ge=new Set,ne=null,ie=null,He=!1,j=new Map,K=new Map,J=new Map,F=!1,p={value:0},l=null,N=null,ae=!1,le=!1,At=null,Gt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},I=(t)=>{o.parent.postMessage(t,"*")},Rt=()=>{if(F||o.parent===o||z.size===0||l?.features?.lateGenerateResults!==!0)return;I({channel:g,v:m,type:"generate-late-listen"})},b=(t,s)=>{for(let n of t)try{n(s)}catch(i){console.error(i)}},Ot=(t)=>{if(!(t instanceof MessageEvent))return;if(!r(t.source))return;let s=ct(t.data);if(!s)return;if(s.type==="workspace"){let i=K.get(s.payload.subscriptionId);if(i)b([i],s.payload.snapshot);return}if(s.type==="shells"){let i=J.get(s.payload.subscriptionId);if(i)b([i],s.payload.snapshot);return}if(s.type==="ready"){if(l=s.payload,N=Gt(s.payload.session),b(c,s.payload),b(S,s.payload.directory),b(G,s.payload.session),N)b(y,N);b(R,s.payload.connection),b(w,s.payload.settings),b(X,s.payload.item),Rt();return}if(s.type==="generate-late"){if(z.size===0)Ue.push(s.payload);else b(z,s.payload);return}if(s.type==="directory"){if(l)l={...l,directory:s.payload.directory};b(S,s.payload.directory);return}if(s.type==="session"){if(l)l={...l,session:s.payload.session};if(!s.payload.session)N=null;else if(N?.sessionId!==s.payload.session.id)N=Gt(s.payload.session);b(G,s.payload.session);return}if(s.type==="session-lifecycle"){N=s.payload,b(y,s.payload);return}if(s.type==="connection"){if(l)l={...l,connection:s.payload.connection};b(R,s.payload.connection);return}if(s.type==="settings"){if(l)l={...l,settings:s.payload.settings};b(w,s.payload.settings);return}if(s.type==="item"){if(l)l={...l,item:s.payload.item};b(X,s.payload.item);return}if(s.type==="status-control-event"){b(ue,s.payload);return}if(s.type==="popover-closed"){b(de,s.payload);return}if(s.type==="action"){let i=(f)=>{if(!F)I({channel:g,v:m,type:"action-result",id:s.id,payload:f})},E=re;if(!E){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>E(s.payload)).then(()=>i({ok:!0}),(f)=>{let A=(f instanceof Error?f.message:String(f)).trim();i({ok:!1,error:(A||"Action failed.").slice(0,pe)})});return}if(s.type==="file-open"){let i=s.payload;if(ie&&Xt(ie,i))return;ie=i,b(ce,s.payload);return}if(s.type==="file-saved"){b(ge,s.payload.version);return}if(s.type==="file-snapshot"){let i=(A)=>{if(!F)I({channel:g,v:m,type:"file-snapshot-result",id:s.id,payload:A})},E=(A)=>i({error:(A.trim()||"Could not read the edited file.").slice(0,pe)}),f=ne;if(!f){E("This extension does not edit files.");return}Promise.resolve().then(()=>f(s.payload.purpose)).then((A)=>{if(qe(A)>he){E(`The file is over ${he} ${"bytes"in A?"bytes":"characters"}.`);return}if(A.version.length>xe){E(`The snapshot version is over ${xe} characters.`);return}i({snapshot:"bytes"in A?{bytes:A.bytes,version:A.version}:{content:A.content,version:A.version}})},(A)=>E(A instanceof Error?A.message:String(A)));return}if(s.type==="resolve"){let i=(f)=>{I({channel:g,v:m,type:"resolve-result",id:s.id,payload:f})},E=oe;if(!E){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>E(s.payload)).then((f)=>i({item:f?Q(f):null}),(f)=>{let A=(f instanceof Error?f.message:String(f)).trim();i({error:(A||"Command failed.").slice(0,pe)})});return}let n=j.get(s.id);if(!n)return;if(clearTimeout(n.timer),j.delete(s.id),s.ok){n.resolve(s.payload);return}n.reject(new a(s.code,s.error))};o.addEventListener("message",Ot),I({channel:g,v:m,type:"hello"});let P=(t,s=d)=>{if(F||o.parent===o)return Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let E=setTimeout(()=>{j.delete(t.id),i(new a("HOST_TIMEOUT","Host did not answer in time."))},s);j.set(t.id,{resolve:n,reject:i,timer:E}),I(t)})},_=(t)=>P(t).then(()=>{return}),k={channel:g,v:m},Fe=(t)=>{if(!F&&o.parent!==o)I(t)},Ct=()=>Fe({...k,type:"file-save"}),Pt=(t)=>{if(!cs(t)||!Is(t))return;t.preventDefault(),Ct()},Mt=(t)=>{if(!cs(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),Ut(l.popover.id,"escape").catch(()=>{return})},me=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let s=ae||le;if(At===s)return;At=s,Ht(t.id,s).catch(()=>{return})},Se=()=>{if(l?.surface!=="popover"||ae)return;ae=!0,me()},wt=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!ae)return;ae=!1,me()},It=()=>{if(l?.surface!=="popover"||le)return;le=!0,me()},Lt=()=>{if(l?.surface!=="popover"||!le)return;le=!1,me()},H=(t,s=1024)=>{if(!t.trim()||t.length>s)throw new a("HOST_REJECTED",`Identity must contain 1 to ${s} characters.`)},Ne=async(t)=>{if(t.kind!=="projects")H(t.projectId);let s=await P({...k,type:"workspace-read",id:u(p),payload:t});if(!s||!("kind"in s)||!("state"in s)||s.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return s},De=async(t,s)=>{if(t.kind!=="projects")H(t.projectId);let n=u(p);K.set(n,s);try{await _({...k,type:"workspace-subscribe",id:u(p),payload:{subscriptionId:n,query:t}})}catch(i){if(K.delete(n),!F)I({...k,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:n}});throw i}return()=>{if(!K.delete(n)||F)return;I({...k,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:n}})}},As=async(t,s)=>{if(t.kind==="session")H(t.sessionId);if(t.kind==="project")H(t.projectId);let n=u(p);J.set(n,s);try{await _({...k,type:"shells-subscribe",id:u(p),payload:{subscriptionId:n,scope:t}})}catch(i){if(J.delete(n),!F)I({...k,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:n}});throw i}return()=>{if(!J.delete(n)||F)return;I({...k,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:n}})}},fe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Xe))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Y(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Ve)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let s=await P({...k,type:"storage",id:u(p),payload:t});if(!s||!("storage"in s)||s.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return s},Ut=(t,s)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):_({...k,type:"popover-close",id:u(p),payload:s?{id:t,reason:s}:{id:t}}),Ht=(t,s)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):_({...k,type:"popover-anchor",id:u(p),payload:{id:t,active:s}});return o.addEventListener("keydown",Mt,!0),o.addEventListener("pointerover",Se),o.addEventListener("pointermove",Se),o.addEventListener("pointerout",wt),o.addEventListener("focus",It),o.addEventListener("blur",Lt),{onAction:(t)=>(re=t,()=>{if(re===t)re=null}),listProjects:async()=>{let t=await Ne({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let s=await Ne({kind:"worktrees",projectId:t});if(s.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return s},listSessions:async(t)=>{let s=await Ne({kind:"sessions",projectId:t});if(s.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return s},onProjects:(t)=>De({kind:"projects"},(s)=>{if(s.kind==="projects")t(s)}),onWorktrees:(t,s)=>De({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")s(n)}),onSessions:(t,s)=>De({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")s(n)}),onRunningShells:(t,s)=>As(t,s),readShellOutput:async(t,s)=>{H(t,Ee);let n=s?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=s?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>ye))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ye}.`);let f=await P({...k,type:"shell-output",id:u(p),payload:{shellId:t,cursor:n,tailBytes:i}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(t)=>{if(H(t,Ee),(await P({...k,type:"shell-stop",id:u(p),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{H(t),await _({...k,type:"open-session",id:u(p),payload:{sessionId:t}})},storage:{get:async(t,s)=>{let n=Ce(s),i={op:"get",key:t};if(n)i.scope=n;let E=await fe(i);return E.op==="get"&&E.found?E.value:void 0},set:async(t,s,n)=>{let i=Ce(n),E={op:"set",key:t,value:s};if(i)E.scope=i;await fe(E)},delete:async(t,s)=>{let n=Ce(s),i={op:"delete",key:t};if(n)i.scope=n;await fe(i)},keys:async(t)=>{let s=Ce(t),n={op:"keys"};if(s)n.scope=s;let i=await fe(n);if(i.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(c.add(t),l)t(l);return()=>{c.delete(t)}},onDirectory:(t)=>{if(S.add(t),l)t(l.directory);return()=>{S.delete(t)}},onSession:(t)=>{if(G.add(t),l)t(l.session);return()=>{G.delete(t)}},onSessionLifecycle:(t)=>{if(y.add(t),N)t(N);return()=>{y.delete(t)}},onConnection:(t)=>{if(R.add(t),l)t(l.connection);return()=>{R.delete(t)}},onSettings:(t)=>{if(w.add(t),l)t(l.settings);return()=>{w.delete(t)}},onItem:(t)=>{if(X.add(t),l)t(l.item);return()=>{X.delete(t)}},onStatusControl:(t)=>(ue.add(t),()=>{ue.delete(t)}),onPopoverClosed:(t)=>(de.add(t),()=>{de.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support status controls."));if(!$t(t))return Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return _({...k,type:"status-controls",id:u(p),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support popovers."));if(!je(t))return Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return _({...k,type:"popover-open",id:u(p),payload:t})},closePopover:Ut,setPopoverAnchorActive:Ht,onResolve:(t)=>(oe=t,()=>{if(oe===t)oe=null}),toast:(t)=>{let s=t.message.trim();if(!s||s.length>be)return Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${be} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Te))return Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${Te} characters.`));return _({channel:g,v:m,type:"toast",id:u(p),payload:{...t,message:s}})},openUrl:(t)=>_({channel:g,v:m,type:"open-url",id:u(p),payload:{url:t}}),openCommit:(t)=>Qe(t)?_({channel:g,v:m,type:"open-commit",id:u(p),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>_({channel:g,v:m,type:"open-surface",id:u(p),payload:{surfaceId:t}}),writeClipboard:(t)=>_({channel:g,v:m,type:"clipboard-write",id:u(p),payload:{text:t}}),compose:(t)=>_({channel:g,v:m,type:"compose",id:u(p),payload:t}),attach:(t)=>_({channel:g,v:m,type:"attach",id:u(p),payload:Q(t)}),startSession:async(t)=>{if(t.projectId!==void 0)H(t.projectId);let s=t.worktree;if(s&&s!==!0)if(s.kind==="existing")H(s.directory);else{if(s.name!==void 0)H(s.name,200);if(s.baseBranch!==void 0)H(s.baseBranch,200)}let n=await P({channel:g,v:m,type:"start-session",id:u(p),payload:st(t)},e.requestTimeoutMs??180000);if(!Je(n))throw new a("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>P({channel:g,v:m,type:"prompt",id:u(p),payload:ot(t)}).then((s)=>{if(!Ye(s))throw new a("HOST_REJECTED","Host did not return a prompt result.");return s}),sessionLink:(t)=>_({channel:g,v:m,type:"session-link",id:u(p),payload:Q(t)}),close:()=>_({channel:g,v:m,type:"close",id:u(p)}),oauthStart:()=>_({channel:g,v:m,type:"oauth-start",id:u(p)}),oauthDisconnect:()=>_({channel:g,v:m,type:"oauth-disconnect",id:u(p)}),request:(t)=>(Ge(t.path)?P({channel:g,v:m,type:"request",id:u(p),payload:t}):gs()).then((s)=>{if(!Re(s))throw new a("HOST_REJECTED","Host request result was empty.");return s}),serviceRequest:(t)=>(Ge(t.path)?P({channel:g,v:m,type:"service-request",id:u(p),payload:t}):gs()).then((s)=>{if(!Re(s))throw new a("HOST_REJECTED","Host service request result was empty.");return s}),serviceStatus:()=>P({channel:g,v:m,type:"service-status",id:u(p)}).then((t)=>{if(!it(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Z(t)?P({channel:g,v:m,type:"file-read",id:u(p),payload:{path:t}}):Oe()).then((s)=>{if(!at(s))throw new a("HOST_REJECTED","Host did not return file content.");return s}),writeFile:(t,s)=>{if(!Z(t))return Oe();if(s.length>_e)return Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${_e} characters.`));return P({channel:g,v:m,type:"file-write",id:u(p),payload:{path:t,content:s}}).then((n)=>{if(!lt(n))throw new a("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(Z(t)?P({channel:g,v:m,type:"file-list",id:u(p),payload:{path:t}}):Oe()).then((s)=>{if(!pt(s))throw new a("HOST_REJECTED","Host did not return directory entries.");return s}),stat:(t)=>(Z(t)?P({channel:g,v:m,type:"file-stat",id:u(p),payload:{path:t}}):Oe()).then((s)=>{if(!ut(s))throw new a("HOST_REJECTED","Host did not return file status.");return s}),generate:(t)=>{let s=t.prompt.trim(),n=t.system?.trim();if(s.length===0||s.length>ke)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${ke} characters.`));if(n!==void 0&&(n.length===0||n.length>Ae))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Ae} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(et,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let E={prompt:s};if(n!==void 0)E.system=n;if(i!==void 0)E.maxOutputTokens=i;return P({channel:g,v:m,type:"generate",id:u(p),payload:E},e.requestTimeoutMs??tt).then((f)=>{if(!dt(f))throw new a("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(t)=>{z.add(t);for(let s of Ue.splice(0))b([t],s);return Rt(),()=>{z.delete(t)}},setBadge:(t)=>_({channel:g,v:m,type:"badge",id:u(p),payload:{count:rt(t)}}),setHeight:(t)=>_({channel:g,v:m,type:"resize",id:u(p),payload:{height:nt(t)}}),onFileOpen:(t)=>{if(ce.add(t),!He)He=!0,o.addEventListener("keydown",Pt,!0);if(ie)t(ie);return()=>{ce.delete(t)}},onFileSnapshot:(t)=>(ne=t,()=>{if(ne===t)ne=null}),onFileSaved:(t)=>(ge.add(t),()=>{ge.delete(t)}),reportFileChange:(t)=>Fe({...k,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Ct,reportFileUnsupported:()=>Fe({...k,type:"file-unsupported"}),dispose:()=>{for(let t of K.keys())I({...k,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:t}});K.clear();for(let t of J.keys())I({...k,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:t}});if(J.clear(),F=!0,oe=null,re=null,ne=null,ce.clear(),ge.clear(),He)o.removeEventListener("keydown",Pt,!0);o.removeEventListener("message",Ot),o.removeEventListener("keydown",Mt,!0),o.removeEventListener("pointerover",Se),o.removeEventListener("pointermove",Se),o.removeEventListener("pointerout",wt),o.removeEventListener("focus",It),o.removeEventListener("blur",Lt);for(let t of j.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));j.clear(),c.clear(),S.clear(),G.clear(),y.clear(),R.clear(),w.clear(),X.clear(),ue.clear(),de.clear(),z.clear(),Ue.length=0}}};var ms=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var mo=new Set(ms);var Ss=["none","agent","user"];var fo=new Set(Ss);var Ls=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Us=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],fs=(e,o)=>{o.style.colorScheme=e.mode;for(let[r,d]of Ls)o.style.setProperty(r,e.tokens[d]);for(let[r,d,c]of Us){let S=e.tokens[c]??"";o.style.setProperty(r,S),o.style.setProperty(d,S)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},mt=(e,o)=>{if(fs(e.theme,o),o.dataset)o.dataset.mgSurface=e.surface,o.dataset.mgTheme=e.theme.mode};var Hs={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},x=(e,o)=>`var(--${e}, var(--mg-${Hs[e]}, ${o}))`,B=x("surface-background","transparent"),Me=x("surface-elevated","transparent"),ee=x("surface-elevated-foreground","inherit"),U=x("surface-foreground","inherit"),h=x("surface-muted-foreground","gray"),Fs=x("surface-muted","transparent"),V=x("interactive-border","currentColor"),M=x("interactive-hover","transparent"),q=x("interactive-active","transparent"),St=x("interactive-selection","transparent"),ft=x("interactive-selection-foreground","inherit"),D=x("primary","currentColor"),Et=x("primary-text","inherit"),yt=x("error-text","inherit"),Ns=x("font-sans","inherit"),ht=x("font-mono","monospace"),bs=x("radius","9px"),xt=`calc(${bs} - 2px)`,Es=`calc(${bs} - 4px)`,T=(e,o,r="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${r})`,ys=`background-image: linear-gradient(${M}, ${M});`,bt=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--mg-sdk-field-lift);`,Tt="box-shadow: inset 0 0 0 1px var(--mg-sdk-edge), var(--mg-sdk-raised-lift);",hs="box-shadow: var(--mg-sdk-lit);",xs=`inset 0 1px 0 0 ${T(U,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Ds=`
:root {
  --mg-sdk-edge: ${T(U,10)};
  --mg-sdk-field-bg: ${Me};
  --mg-sdk-raised-bg: ${B};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.1), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${T(U,6)};
  --mg-sdk-field-bg: ${T(B,50,Me)};
  --mg-sdk-raised-bg: ${Me};
  --mg-sdk-field-lift: ${xs};
  --mg-sdk-raised-lift: ${xs};
  --mg-sdk-lit: inset 0 1px 0 0 ${T(U,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.36), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Pe=(e)=>{let o=x(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${o}; --mg-sdk-tone-text: ${x(`${e}-text`,"inherit")}; }`},Bs=`
.mg-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.mg-sdk *, .mg-sdk *::before, .mg-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.mg-sdk) :where(button, input, textarea), :where(button.mg-sdk, input.mg-sdk, textarea.mg-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.mg-sdk) :where(button), :where(button.mg-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.mg-sdk button:disabled, button.mg-sdk:disabled, .mg-sdk[aria-disabled="true"], .mg-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.mg-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.mg-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.mg-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.mg-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.mg-sdk-btn > .mg-sdk-spinner-ring { width: 14px; height: 14px; }

.mg-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.mg-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.mg-sdk-field-note { font-size: 0.75rem; }
.mg-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.mg-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.mg-sdk-search { position: relative; min-width: 0; }
.mg-sdk-search .mg-sdk-input { padding-left: 34px; padding-right: 34px; }
.mg-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.mg-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-clear { display: inline-flex; }

.mg-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.mg-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.mg-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mg-sdk-trigger-chevron { flex: 0 0 auto; }
.mg-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.mg-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.mg-sdk-popup-search .mg-sdk-input { height: 28px; font-size: 0.8125rem; }
.mg-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.mg-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mg-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.mg-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.mg-sdk-option[aria-selected="true"] > .mg-sdk-option-check { visibility: visible; }
.mg-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.mg-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.mg-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.mg-sdk-check-box > svg { display: none; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box > svg { display: block; }
.mg-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.mg-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.mg-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.mg-sdk-check-label { font-size: 0.875rem; }
.mg-sdk-check-desc { font-size: 0.75rem; }

.mg-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.mg-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.mg-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.mg-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.mg-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.mg-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.mg-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.mg-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.mg-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mg-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.mg-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.mg-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.mg-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.mg-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.mg-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.mg-sdk-empty-action { margin-top: 12px; }

@keyframes mg-sdk-spin { to { transform: rotate(360deg); } }
.mg-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.mg-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: mg-sdk-spin .8s linear infinite; }
.mg-sdk-spinner[data-size="sm"] .mg-sdk-spinner-ring { width: 12px; height: 12px; }

.mg-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.mg-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.mg-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.mg-sdk-banner-body { font-size: 0.8125rem; }
.mg-sdk-banner-action { flex: 0 0 auto; }

.mg-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.mg-sdk-separator::before, .mg-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.mg-sdk-separator[data-labeled="false"]::after { display: none; }
.mg-sdk-popup > .mg-sdk-separator { margin: 4px 0; }

.mg-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.mg-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.mg-sdk-progress-track { height: 6px; overflow: hidden; }
.mg-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.mg-sdk-menu { position: relative; display: inline-flex; }

.mg-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.mg-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Ts=`${Ds}
.mg-sdk { color: ${U}; font-family: ${Ns}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${ys} }
.mg-sdk-mono { font-family: ${ht}; }
.mg-sdk-muted { color: ${h}; }
${Pe("success")}${Pe("warning")}${Pe("error")}${Pe("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${D}; --mg-sdk-tone-text: ${Et}; }

.mg-sdk-btn { border-radius: ${xt}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${Es}; }
.mg-sdk-btn[data-variant="default"] { color: ${Et}; background: ${T(D,10,B)}; border-color: ${T(D,12)}; ${hs} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${T(D,16,B)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${T(D,22,B)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${Fs}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${q}, ${q}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${ee}; border-color: transparent; ${Tt} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${q}, ${q}); box-shadow: inset 0 0 0 1px var(--mg-sdk-edge); }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${q}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${x("status-error","red")}; color: ${yt}; background: ${T("var(--mg-sdk-tone)",7,B)}; border-color: ${T("var(--mg-sdk-tone)",12)}; ${hs} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${T("var(--mg-sdk-tone)",9,B)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${T("var(--mg-sdk-tone)",11,B)}; box-shadow: none; }

.mg-sdk-field-note { color: ${h}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${yt}; }
.mg-sdk-input { border-radius: ${xt}; background: var(--mg-sdk-field-bg); color: ${ee}; ${bt("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${h}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${bt(T(U,26))} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${bt(x("status-error","red"))} }
.mg-sdk-input[data-mono="true"] { font-family: ${ht}; }

.mg-sdk-search-icon { color: ${h}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${D}; }
.mg-sdk-search-clear { border-radius: ${Es}; color: ${h}; }
.mg-sdk-search-clear:hover { background: ${M}; color: ${U}; }

.mg-sdk-trigger { border-color: transparent; border-radius: ${xt}; background: var(--mg-sdk-raised-bg); color: ${ee}; ${Tt} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${q}, ${q}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${h}; }
.mg-sdk-trigger-chevron { color: ${h}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow, no border. */
.mg-sdk-popup { --surface-foreground: ${ee}; border-color: transparent; border-radius: 12px; background: ${Me}; color: ${ee}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${M}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${St}; color: ${ft}; }
.mg-sdk-option-check { color: ${U}; }
.mg-sdk-option[data-destructive="true"] { color: ${yt}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${T(x("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${h}; }
.mg-sdk-popup-empty { color: ${h}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${V}; border-radius: 4px; color: ${U}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${T(U,60,V)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${V}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${D}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${ys} }
.mg-sdk-check-desc { color: ${h}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${T(U,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${h}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${U}; }
.mg-sdk-tab[aria-selected="true"] { color: ${ft}; background: ${St}; border-color: ${V}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${ee}; background: var(--mg-sdk-raised-bg); border-color: transparent; ${Tt} }
.mg-sdk-tab-count { color: ${h}; }

.mg-sdk-badge { border-radius: 9999px; background: ${M}; color: ${h}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${T("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${M}; }
.mg-sdk-row[aria-selected="true"] { background: ${St}; color: ${ft}; }
.mg-sdk-row-lead { font-family: ${ht}; color: ${h}; }
.mg-sdk-row-sub { color: ${h}; }
.mg-sdk-row-meta { color: ${h}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${h}; }

.mg-sdk-empty-body { color: ${h}; }

.mg-sdk-spinner { color: ${h}; }
.mg-sdk-spinner-ring { border-color: ${V}; border-top-color: ${D}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${T("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${h}; }

.mg-sdk-separator { color: ${h}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${T(V,40)}; }

.mg-sdk-progress-label { color: ${h}; }
.mg-sdk-progress-track { border-radius: 9999px; background: ${V}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${D}); }

.mg-sdk-text a { color: ${Et}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${T(V,60)}; }
`,O=`
${Be}
${Bs}
${Ts}`;var vs="mg-sdk-ui-style";var C=(e)=>{let o=document.getElementById(vs);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}$e(document);let r=document.createElement("style");r.id=vs,r.textContent=e,document.head.appendChild(r)},v=(e,o)=>{let r=document.createElement(e);if(o)r.className=o;return r},W=(e)=>{let o=v("button",e);return o.type="button",o},L=(e,o)=>{let r=o??"";if(e.textContent!==r)e.textContent=r},te=(e,o,r)=>{if(r===void 0||r===null||r==="")e.removeAttribute(o);else if(e.getAttribute(o)!==r)e.setAttribute(o,r)};var $s=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},se=(e,o)=>{C(O);let r=o,d=W("mg-sdk mg-sdk-btn"),c=$s(),S=document.createElement("span");d.append(S),e.append(d);let G=()=>{if(d.dataset.variant=r.variant??"default",d.dataset.size=r.size??"default",d.disabled=Boolean(r.disabled)||Boolean(r.loading),d.dataset.loading=r.loading?"true":"false",d.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&c.parentNode!==d)d.prepend(c);else if(!r.loading&&c.parentNode===d)c.remove();L(S,r.label)},y=()=>{if(r.disabled||r.loading)return;r.onClick()};return d.addEventListener("click",y),G(),{update:(R)=>{r={...r,...R},G()},dispose:()=>{d.removeEventListener("click",y),d.remove()}}};var vt=(e,o)=>{C(O);let r=o,d=v("label","mg-sdk mg-sdk-field"),c=v("span","mg-sdk-field-label"),S=r.multiline?v("textarea","mg-sdk-input"):v("input","mg-sdk-input"),G=v("span","mg-sdk-field-note");d.append(c,S,G),e.append(d);let y=()=>{if(L(c,r.label),c.hidden=!r.label,S instanceof HTMLInputElement)S.type=r.password?"password":"text";else S.rows=r.rows??3;if(S.value!==r.value)S.value=r.value;S.disabled=Boolean(r.disabled),te(S,"placeholder",r.placeholder),S.dataset.mono=r.mono?"true":"false";let w=Boolean(r.error);d.dataset.invalid=w?"true":"false",S.setAttribute("aria-invalid",w?"true":"false");let X=r.error??r.helper??"";L(G,X),G.hidden=X===""},R=()=>{r.onChange(S.value)};return S.addEventListener("input",R),y(),{update:(w)=>{r={...r,...w},y()},dispose:()=>{S.removeEventListener("input",R),d.remove()}}};var kt=gt(),ks=document.querySelector("#root");if(!ks)throw Error("Missing root");var _s=!1;kt.onReady((e)=>{if(mt(e,document.documentElement),_s)return;_s=!0;let o=document.createElement("div");o.style.cssText="display:flex;align-items:center;gap:8px;height:100%;padding:0 8px;box-sizing:border-box;",ks.append(o);let r="",d=document.createElement("div");d.style.flex="1",o.append(d);let c=vt(d,{value:r,placeholder:"https://example.com",mono:!0,onChange:(y)=>{r=y,c.update({value:y})}}),S=se(o,{label:"Go",size:"sm",onClick:()=>{if(!r.trim())return;S.update({loading:!0}),kt.serviceRequest({method:"POST",path:"/navigate",body:JSON.stringify({url:r.trim()})}).then(()=>G()).finally(()=>S.update({loading:!1}))}}),G=async()=>{try{let y=await kt.serviceRequest({method:"GET",path:"/state"}),R=JSON.parse(y.body);if(String(R.url)===R.url&&R.url!==r)r=R.url==="about:blank"?"":R.url,c.update({value:r})}catch{}};G(),setInterval(()=>{G()},2000)});})();
