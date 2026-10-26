(()=>{var g="magio.sdk",S=1;var Be=`
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
`;function Xe(e){let r=e.documentElement;if(r.hasAttribute("data-mg-scrollbar-activity"))return;r.setAttribute("data-mg-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(c)=>{let d=c.target===e?r:c.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-mg-scrolling"))d.setAttribute("data-mg-scrolling","");let m=s.get(d);if(m!==void 0)clearTimeout(m);s.set(d,setTimeout(()=>{s.delete(d),d.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Co=`(${Xe.toString()})(document);`;var Ve=128,$e=65536;var fe=128;var _e=65536;var Bt=/^[a-z][a-z0-9-]{0,39}$/;var Ht=(e)=>Object(e)===e&&!Array.isArray(e),qe=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),Dt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Ft=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Xt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!Ht(s)||!Bt.test(s.id)||!Dt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!qe(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!qe(s,["kind","id","label","value","options","disabled"]))return!1;if(!Ft(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let c=new Set;for(let d of s.options){if(!Ht(d)||!qe(d,["value","label"])||!Ft(d.value)||!Dt(d.label)||c.has(d.value))return!1;c.add(d.value)}if(!c.has(s.value))return!1}return!0};var ye=20000000,Te=256;var We=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Vt=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0};var $t=/^[A-Za-z0-9_-]{1,80}$/;var qt=["left","right","top","bottom"];var Wt=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let c=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of c)if(!Wt(d,r+1,s))return!1;return!0},je=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(je);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(je)}return String(e)===e||Number.isFinite(e)},ze=(e)=>{try{if(String(e.id)!==e.id||!$t.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!qt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Wt(e.data)||!je(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var zt=["file","directory","other","missing"],Je=(e)=>Boolean(e&&"sessionId"in e),Ye=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Kt=/^[0-9a-f]{7,64}$/i,Qe=(e)=>Kt.test(e),he=500,be=32000,Jt=16000,Yt=128,Qt=200,Zt=2000,eo=16000,to=80,oo=200,ro=16000;var so=2000;var Ze=20000,xe=1024,ve=2000000;var Re=64000,Oe=8000,et=4000;var tt=960000;var no=999,io=1e4,ue=500,ao=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],lo=["stopped","starting","ready","failed"],Go=new Set(ao),uo=(e)=>Go.has(e),po=(e)=>e&&uo(e)?e:"HOST_REJECTED",Y=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Y);if(Object(e)===e)return Object.values(e).every(Y);return!1},co=(e)=>Y(e)&&JSON.stringify(e).length<=ro,jt=(e)=>e?.trim().slice(0,oo)??"",Q=(e)=>{let r=e.id.trim().slice(0,Yt),s=e.title.trim().slice(0,Qt),c=e.url.trim().slice(0,Zt),d=e.text?.trim().slice(0,eo),m=e.author?.trim().slice(0,to),A=e.kind==="pull"?"pull":"issue",_={providerId:e.providerId.trim(),id:r,title:s||r,url:c,kind:A};if(d)_.text=d;if(m)_.author=m;if(A==="pull"){let C=jt(e.branches?.head),I=jt(e.branches?.base);if(C&&I)_.branches={head:C,base:I}}if(co(e.data))_.data=e.data;return _},ot=(e)=>{let r=Q(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},rt=(e)=>{let r={text:e.text.trim().slice(0,Jt)};if(e.send)r.send=!0;return r},st=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(no,Math.max(0,Math.round(e)))},nt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(io,Math.max(0,Math.ceil(e)))};var Z=(e)=>e.length>0&&e.length<=xe&&!e.includes("\x00")&&!e.includes("\\");var Ae=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>so)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Mo=new Set(lo),it=(e)=>Boolean(e&&"status"in e&&Mo.has(String(e.status))&&!("body"in e)),Ce=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),at=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),lt=(e)=>Boolean(e&&"written"in e&&e.written===!0),ut=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Po=new Set(zt),pt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Po.has(String(e.kind))&&Number.isFinite(e.size)),ct=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Io=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),wo=(e)=>Object(e)===e?e:null,Ke=(e)=>String(e)===e&&e.length>0,Uo=(e)=>{if(!Ke(e.id))return null;if(e.ok===!0){let r={channel:g,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&Ke(e.error))return{channel:g,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:po(Ke(e.code)?e.code:void 0)};return null},dt=(e)=>{let r=wo(e);if(!r||r.channel!==g||r.v!==S)return null;if(r.type==="result")return Uo(r);if(!Io.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var go=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Lo=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class a extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var So=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),ke=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${xe} characters without NUL or backslash.`)),Ge=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},p=(e)=>(e.value+=1,`mg-${e.value}`),gt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),c=e.requestTimeoutMs??Ze,d=new Set,m=new Set,A=new Set,_=new Set,C=new Set,I=new Set,X=new Set,pe=new Set,ce=new Set,j=new Set,Le=[],re=null,se=null,de=new Set,ge=new Set,ne=null,ie=null,Ne=!1,z=new Map,K=new Map,J=new Map,H=!1,u={value:0},l=null,D=null,ae=!1,le=!1,Ot=null,At=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},w=(t)=>{r.parent.postMessage(t,"*")},Ct=()=>{if(H||r.parent===r||j.size===0||l?.features?.lateGenerateResults!==!0)return;w({channel:g,v:S,type:"generate-late-listen"})},h=(t,o)=>{for(let n of t)try{n(o)}catch(i){console.error(i)}},kt=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=dt(t.data);if(!o)return;if(o.type==="workspace"){let i=K.get(o.payload.subscriptionId);if(i)h([i],o.payload.snapshot);return}if(o.type==="shells"){let i=J.get(o.payload.subscriptionId);if(i)h([i],o.payload.snapshot);return}if(o.type==="ready"){if(l=o.payload,D=At(o.payload.session),h(d,o.payload),h(m,o.payload.directory),h(A,o.payload.session),D)h(_,D);h(C,o.payload.connection),h(I,o.payload.settings),h(X,o.payload.item),Ct();return}if(o.type==="generate-late"){if(j.size===0)Le.push(o.payload);else h(j,o.payload);return}if(o.type==="directory"){if(l)l={...l,directory:o.payload.directory};h(m,o.payload.directory);return}if(o.type==="session"){if(l)l={...l,session:o.payload.session};if(!o.payload.session)D=null;else if(D?.sessionId!==o.payload.session.id)D=At(o.payload.session);h(A,o.payload.session);return}if(o.type==="session-lifecycle"){D=o.payload,h(_,o.payload);return}if(o.type==="connection"){if(l)l={...l,connection:o.payload.connection};h(C,o.payload.connection);return}if(o.type==="settings"){if(l)l={...l,settings:o.payload.settings};h(I,o.payload.settings);return}if(o.type==="item"){if(l)l={...l,item:o.payload.item};h(X,o.payload.item);return}if(o.type==="status-control-event"){h(pe,o.payload);return}if(o.type==="popover-closed"){h(ce,o.payload);return}if(o.type==="action"){let i=(E)=>{if(!H)w({channel:g,v:S,type:"action-result",id:o.id,payload:E})},f=se;if(!f){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(o.payload)).then(()=>i({ok:!0}),(E)=>{let O=(E instanceof Error?E.message:String(E)).trim();i({ok:!1,error:(O||"Action failed.").slice(0,ue)})});return}if(o.type==="file-open"){let i=o.payload;if(ie&&Vt(ie,i))return;ie=i,h(de,o.payload);return}if(o.type==="file-saved"){h(ge,o.payload.version);return}if(o.type==="file-snapshot"){let i=(O)=>{if(!H)w({channel:g,v:S,type:"file-snapshot-result",id:o.id,payload:O})},f=(O)=>i({error:(O.trim()||"Could not read the edited file.").slice(0,ue)}),E=ne;if(!E){f("This extension does not edit files.");return}Promise.resolve().then(()=>E(o.payload.purpose)).then((O)=>{if(We(O)>ye){f(`The file is over ${ye} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>Te){f(`The snapshot version is over ${Te} characters.`);return}i({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>f(O instanceof Error?O.message:String(O)));return}if(o.type==="resolve"){let i=(E)=>{w({channel:g,v:S,type:"resolve-result",id:o.id,payload:E})},f=re;if(!f){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(o.payload)).then((E)=>i({item:E?Q(E):null}),(E)=>{let O=(E instanceof Error?E.message:String(E)).trim();i({error:(O||"Command failed.").slice(0,ue)})});return}let n=z.get(o.id);if(!n)return;if(clearTimeout(n.timer),z.delete(o.id),o.ok){n.resolve(o.payload);return}n.reject(new a(o.code,o.error))};r.addEventListener("message",kt),w({channel:g,v:S,type:"hello"});let M=(t,o=c)=>{if(H||r.parent===r)return Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let f=setTimeout(()=>{z.delete(t.id),i(new a("HOST_TIMEOUT","Host did not answer in time."))},o);z.set(t.id,{resolve:n,reject:i,timer:f}),w(t)})},v=(t)=>M(t).then(()=>{return}),R={channel:g,v:S},He=(t)=>{if(!H&&r.parent!==r)w(t)},Gt=()=>He({...R,type:"file-save"}),Mt=(t)=>{if(!go(t)||!Lo(t))return;t.preventDefault(),Gt()},Pt=(t)=>{if(!go(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),Lt(l.popover.id,"escape").catch(()=>{return})},Se=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let o=ae||le;if(Ot===o)return;Ot=o,Nt(t.id,o).catch(()=>{return})},me=()=>{if(l?.surface!=="popover"||ae)return;ae=!0,Se()},It=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!ae)return;ae=!1,Se()},wt=()=>{if(l?.surface!=="popover"||le)return;le=!0,Se()},Ut=()=>{if(l?.surface!=="popover"||!le)return;le=!1,Se()},N=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new a("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},De=async(t)=>{if(t.kind!=="projects")N(t.projectId);let o=await M({...R,type:"workspace-read",id:p(u),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return o},Fe=async(t,o)=>{if(t.kind!=="projects")N(t.projectId);let n=p(u);K.set(n,o);try{await v({...R,type:"workspace-subscribe",id:p(u),payload:{subscriptionId:n,query:t}})}catch(i){if(K.delete(n),!H)w({...R,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:n}});throw i}return()=>{if(!K.delete(n)||H)return;w({...R,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:n}})}},Ao=async(t,o)=>{if(t.kind==="session")N(t.sessionId);if(t.kind==="project")N(t.projectId);let n=p(u);J.set(n,o);try{await v({...R,type:"shells-subscribe",id:p(u),payload:{subscriptionId:n,scope:t}})}catch(i){if(J.delete(n),!H)w({...R,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:n}});throw i}return()=>{if(!J.delete(n)||H)return;w({...R,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:n}})}},Ee=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ve))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Y(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>$e)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let o=await M({...R,type:"storage",id:p(u),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return o},Lt=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):v({...R,type:"popover-close",id:p(u),payload:o?{id:t,reason:o}:{id:t}}),Nt=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):v({...R,type:"popover-anchor",id:p(u),payload:{id:t,active:o}});return r.addEventListener("keydown",Pt,!0),r.addEventListener("pointerover",me),r.addEventListener("pointermove",me),r.addEventListener("pointerout",It),r.addEventListener("focus",wt),r.addEventListener("blur",Ut),{onAction:(t)=>(se=t,()=>{if(se===t)se=null}),listProjects:async()=>{let t=await De({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await De({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await De({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Fe({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Fe({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")o(n)}),onSessions:(t,o)=>Fe({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")o(n)}),onRunningShells:(t,o)=>Ao(t,o),readShellOutput:async(t,o)=>{N(t,fe);let n=o?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>_e))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${_e}.`);let E=await M({...R,type:"shell-output",id:p(u),payload:{shellId:t,cursor:n,tailBytes:i}});if(!E||typeof E.output!=="string"||!Number.isFinite(E.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return E},stopShell:async(t)=>{if(N(t,fe),(await M({...R,type:"shell-stop",id:p(u),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{N(t),await v({...R,type:"open-session",id:p(u),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let n=Ge(o),i={op:"get",key:t};if(n)i.scope=n;let f=await Ee(i);return f.op==="get"&&f.found?f.value:void 0},set:async(t,o,n)=>{let i=Ge(n),f={op:"set",key:t,value:o};if(i)f.scope=i;await Ee(f)},delete:async(t,o)=>{let n=Ge(o),i={op:"delete",key:t};if(n)i.scope=n;await Ee(i)},keys:async(t)=>{let o=Ge(t),n={op:"keys"};if(o)n.scope=o;let i=await Ee(n);if(i.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(d.add(t),l)t(l);return()=>{d.delete(t)}},onDirectory:(t)=>{if(m.add(t),l)t(l.directory);return()=>{m.delete(t)}},onSession:(t)=>{if(A.add(t),l)t(l.session);return()=>{A.delete(t)}},onSessionLifecycle:(t)=>{if(_.add(t),D)t(D);return()=>{_.delete(t)}},onConnection:(t)=>{if(C.add(t),l)t(l.connection);return()=>{C.delete(t)}},onSettings:(t)=>{if(I.add(t),l)t(l.settings);return()=>{I.delete(t)}},onItem:(t)=>{if(X.add(t),l)t(l.item);return()=>{X.delete(t)}},onStatusControl:(t)=>(pe.add(t),()=>{pe.delete(t)}),onPopoverClosed:(t)=>(ce.add(t),()=>{ce.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support status controls."));if(!Xt(t))return Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return v({...R,type:"status-controls",id:p(u),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support popovers."));if(!ze(t))return Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return v({...R,type:"popover-open",id:p(u),payload:t})},closePopover:Lt,setPopoverAnchorActive:Nt,onResolve:(t)=>(re=t,()=>{if(re===t)re=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>he)return Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${he} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>be))return Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${be} characters.`));return v({channel:g,v:S,type:"toast",id:p(u),payload:{...t,message:o}})},openUrl:(t)=>v({channel:g,v:S,type:"open-url",id:p(u),payload:{url:t}}),openCommit:(t)=>Qe(t)?v({channel:g,v:S,type:"open-commit",id:p(u),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>v({channel:g,v:S,type:"open-surface",id:p(u),payload:{surfaceId:t}}),writeClipboard:(t)=>v({channel:g,v:S,type:"clipboard-write",id:p(u),payload:{text:t}}),compose:(t)=>v({channel:g,v:S,type:"compose",id:p(u),payload:t}),attach:(t)=>v({channel:g,v:S,type:"attach",id:p(u),payload:Q(t)}),startSession:async(t)=>{if(t.projectId!==void 0)N(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")N(o.directory);else{if(o.name!==void 0)N(o.name,200);if(o.baseBranch!==void 0)N(o.baseBranch,200)}let n=await M({channel:g,v:S,type:"start-session",id:p(u),payload:ot(t)},e.requestTimeoutMs??180000);if(!Je(n))throw new a("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>M({channel:g,v:S,type:"prompt",id:p(u),payload:rt(t)}).then((o)=>{if(!Ye(o))throw new a("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>v({channel:g,v:S,type:"session-link",id:p(u),payload:Q(t)}),close:()=>v({channel:g,v:S,type:"close",id:p(u)}),oauthStart:()=>v({channel:g,v:S,type:"oauth-start",id:p(u)}),oauthDisconnect:()=>v({channel:g,v:S,type:"oauth-disconnect",id:p(u)}),request:(t)=>(Ae(t.path)?M({channel:g,v:S,type:"request",id:p(u),payload:t}):So()).then((o)=>{if(!Ce(o))throw new a("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Ae(t.path)?M({channel:g,v:S,type:"service-request",id:p(u),payload:t}):So()).then((o)=>{if(!Ce(o))throw new a("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>M({channel:g,v:S,type:"service-status",id:p(u)}).then((t)=>{if(!it(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Z(t)?M({channel:g,v:S,type:"file-read",id:p(u),payload:{path:t}}):ke()).then((o)=>{if(!at(o))throw new a("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!Z(t))return ke();if(o.length>ve)return Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${ve} characters.`));return M({channel:g,v:S,type:"file-write",id:p(u),payload:{path:t,content:o}}).then((n)=>{if(!lt(n))throw new a("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(Z(t)?M({channel:g,v:S,type:"file-list",id:p(u),payload:{path:t}}):ke()).then((o)=>{if(!ut(o))throw new a("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(Z(t)?M({channel:g,v:S,type:"file-stat",id:p(u),payload:{path:t}}):ke()).then((o)=>{if(!pt(o))throw new a("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),n=t.system?.trim();if(o.length===0||o.length>Re)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${Re} characters.`));if(n!==void 0&&(n.length===0||n.length>Oe))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Oe} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(et,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:o};if(n!==void 0)f.system=n;if(i!==void 0)f.maxOutputTokens=i;return M({channel:g,v:S,type:"generate",id:p(u),payload:f},e.requestTimeoutMs??tt).then((E)=>{if(!ct(E))throw new a("HOST_REJECTED","Host did not return generated text.");return E})},onLateGenerateResult:(t)=>{j.add(t);for(let o of Le.splice(0))h([t],o);return Ct(),()=>{j.delete(t)}},setBadge:(t)=>v({channel:g,v:S,type:"badge",id:p(u),payload:{count:st(t)}}),setHeight:(t)=>v({channel:g,v:S,type:"resize",id:p(u),payload:{height:nt(t)}}),onFileOpen:(t)=>{if(de.add(t),!Ne)Ne=!0,r.addEventListener("keydown",Mt,!0);if(ie)t(ie);return()=>{de.delete(t)}},onFileSnapshot:(t)=>(ne=t,()=>{if(ne===t)ne=null}),onFileSaved:(t)=>(ge.add(t),()=>{ge.delete(t)}),reportFileChange:(t)=>He({...R,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Gt,reportFileUnsupported:()=>He({...R,type:"file-unsupported"}),dispose:()=>{for(let t of K.keys())w({...R,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:t}});K.clear();for(let t of J.keys())w({...R,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:t}});if(J.clear(),H=!0,re=null,se=null,ne=null,de.clear(),ge.clear(),Ne)r.removeEventListener("keydown",Mt,!0);r.removeEventListener("message",kt),r.removeEventListener("keydown",Pt,!0),r.removeEventListener("pointerover",me),r.removeEventListener("pointermove",me),r.removeEventListener("pointerout",It),r.removeEventListener("focus",wt),r.removeEventListener("blur",Ut);for(let t of z.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));z.clear(),d.clear(),m.clear(),A.clear(),_.clear(),C.clear(),I.clear(),X.clear(),pe.clear(),ce.clear(),j.clear(),Le.length=0}}};var mo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var fr=new Set(mo);var Eo=["none","agent","user"];var yr=new Set(Eo);var No=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ho=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],fo=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,c]of No)r.style.setProperty(s,e.tokens[c]);for(let[s,c,d]of Ho){let m=e.tokens[d]??"";r.style.setProperty(s,m),r.style.setProperty(c,m)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},St=(e,r)=>{if(fo(e.theme,r),r.dataset)r.dataset.mgSurface=e.surface,r.dataset.mgTheme=e.theme.mode};var Do={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,r)=>`var(--${e}, var(--mg-${Do[e]}, ${r}))`,B=T("surface-background","transparent"),Pe=T("surface-elevated","transparent"),ee=T("surface-elevated-foreground","inherit"),L=T("surface-foreground","inherit"),y=T("surface-muted-foreground","gray"),Fo=T("surface-muted","transparent"),V=T("interactive-border","currentColor"),P=T("interactive-hover","transparent"),W=T("interactive-active","transparent"),mt=T("interactive-selection","transparent"),Et=T("interactive-selection-foreground","inherit"),F=T("primary","currentColor"),ft=T("primary-text","inherit"),_t=T("error-text","inherit"),Bo=T("font-sans","inherit"),yt=T("font-mono","monospace"),bo=T("radius","9px"),Tt=`calc(${bo} - 2px)`,_o=`calc(${bo} - 4px)`,b=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,yo=`background-image: linear-gradient(${P}, ${P});`,ht=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--mg-sdk-field-lift);`,bt="border-color: var(--mg-sdk-edge); box-shadow: var(--mg-sdk-raised-lift);",To="box-shadow: var(--mg-sdk-lit);",ho=`inset 0 1px 0 0 ${b(L,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Xo=`
:root {
  --mg-sdk-edge: ${b(L,10)};
  --mg-sdk-field-bg: ${Pe};
  --mg-sdk-raised-bg: ${B};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.1);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${b(L,6)};
  --mg-sdk-field-bg: ${b(B,50,Pe)};
  --mg-sdk-raised-bg: ${Pe};
  --mg-sdk-field-lift: ${ho};
  --mg-sdk-raised-lift: ${ho};
  --mg-sdk-lit: inset 0 1px 0 0 ${b(L,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.36);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Me=(e)=>{let r=T(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${r}; --mg-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},Vo=`
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
`,xo=`${Xo}
.mg-sdk { color: ${L}; font-family: ${Bo}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${yo} }
.mg-sdk-mono { font-family: ${yt}; }
.mg-sdk-muted { color: ${y}; }
${Me("success")}${Me("warning")}${Me("error")}${Me("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${F}; --mg-sdk-tone-text: ${ft}; }

.mg-sdk-btn { border-radius: ${Tt}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${_o}; }
.mg-sdk-btn[data-variant="default"] { color: ${ft}; background: ${b(F,10,B)}; border-color: ${b(F,12)}; ${To} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${b(F,16,B)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${b(F,22,B)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${Fo}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${W}, ${W}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${ee}; ${bt} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${W}, ${W}); box-shadow: none; }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${P}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${W}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${T("status-error","red")}; color: ${_t}; background: ${b("var(--mg-sdk-tone)",7,B)}; border-color: ${b("var(--mg-sdk-tone)",12)}; ${To} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${b("var(--mg-sdk-tone)",9,B)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${b("var(--mg-sdk-tone)",11,B)}; box-shadow: none; }

.mg-sdk-field-note { color: ${y}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${_t}; }
.mg-sdk-input { border-radius: ${Tt}; background: var(--mg-sdk-field-bg); color: ${ee}; ${ht("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${y}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${ht(b(L,26))} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${ht(T("status-error","red"))} }
.mg-sdk-input[data-mono="true"] { font-family: ${yt}; }

.mg-sdk-search-icon { color: ${y}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${F}; }
.mg-sdk-search-clear { border-radius: ${_o}; color: ${y}; }
.mg-sdk-search-clear:hover { background: ${P}; color: ${L}; }

.mg-sdk-trigger { border-radius: ${Tt}; background: var(--mg-sdk-raised-bg); color: ${ee}; ${bt} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${W}, ${W}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${y}; }
.mg-sdk-trigger-chevron { color: ${y}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.mg-sdk-popup { --surface-foreground: ${ee}; border-color: var(--mg-sdk-float-edge); border-radius: 12px; background: ${Pe}; background-clip: padding-box; color: ${ee}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${P}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${mt}; color: ${Et}; }
.mg-sdk-option-check { color: ${L}; }
.mg-sdk-option[data-destructive="true"] { color: ${_t}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${b(T("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${y}; }
.mg-sdk-popup-empty { color: ${y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${V}; border-radius: 4px; color: ${L}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${b(L,60,V)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${V}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${F}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${yo} }
.mg-sdk-check-desc { color: ${y}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${b(L,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${y}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${L}; }
.mg-sdk-tab[aria-selected="true"] { color: ${Et}; background: ${mt}; border-color: ${V}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${ee}; background: var(--mg-sdk-raised-bg); ${bt} }
.mg-sdk-tab-count { color: ${y}; }

.mg-sdk-badge { border-radius: 9999px; background: ${P}; color: ${y}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${b("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${P}; }
.mg-sdk-row[aria-selected="true"] { background: ${mt}; color: ${Et}; }
.mg-sdk-row-lead { font-family: ${yt}; color: ${y}; }
.mg-sdk-row-sub { color: ${y}; }
.mg-sdk-row-meta { color: ${y}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${y}; }

.mg-sdk-empty-body { color: ${y}; }

.mg-sdk-spinner { color: ${y}; }
.mg-sdk-spinner-ring { border-color: ${V}; border-top-color: ${F}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${b("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${y}; }

.mg-sdk-separator { color: ${y}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${b(V,40)}; }

.mg-sdk-progress-label { color: ${y}; }
.mg-sdk-progress-track { border-radius: 9999px; background: ${V}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${F}); }

.mg-sdk-text a { color: ${ft}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${b(V,60)}; }
`,k=`
${Be}
${Vo}
${xo}`;var vo="mg-sdk-ui-style";var G=(e)=>{let r=document.getElementById(vo);if(r instanceof HTMLStyleElement){if(r.textContent!==e)r.textContent=e;return}Xe(document);let s=document.createElement("style");s.id=vo,s.textContent=e,document.head.appendChild(s)},x=(e,r)=>{let s=document.createElement(e);if(r)s.className=r;return s},q=(e)=>{let r=x("button",e);return r.type="button",r},U=(e,r)=>{let s=r??"";if(e.textContent!==s)e.textContent=s},te=(e,r,s)=>{if(s===void 0||s===null||s==="")e.removeAttribute(r);else if(e.getAttribute(r)!==s)e.setAttribute(r,s)};var $o=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},oe=(e,r)=>{G(k);let s=r,c=q("mg-sdk mg-sdk-btn"),d=$o(),m=document.createElement("span");c.append(m),e.append(c);let A=()=>{if(c.dataset.variant=s.variant??"default",c.dataset.size=s.size??"default",c.disabled=Boolean(s.disabled)||Boolean(s.loading),c.dataset.loading=s.loading?"true":"false",c.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&d.parentNode!==c)c.prepend(d);else if(!s.loading&&d.parentNode===c)d.remove();U(m,s.label)},_=()=>{if(s.disabled||s.loading)return;s.onClick()};return c.addEventListener("click",_),A(),{update:(C)=>{s={...s,...C},A()},dispose:()=>{c.removeEventListener("click",_),c.remove()}}};var xt=(e,r)=>{G(k);let s=r,c=x("label","mg-sdk mg-sdk-field"),d=x("span","mg-sdk-field-label"),m=s.multiline?x("textarea","mg-sdk-input"):x("input","mg-sdk-input"),A=x("span","mg-sdk-field-note");c.append(d,m,A),e.append(c);let _=()=>{if(U(d,s.label),d.hidden=!s.label,m instanceof HTMLInputElement)m.type=s.password?"password":"text";else m.rows=s.rows??3;if(m.value!==s.value)m.value=s.value;m.disabled=Boolean(s.disabled),te(m,"placeholder",s.placeholder),m.dataset.mono=s.mono?"true":"false";let I=Boolean(s.error);c.dataset.invalid=I?"true":"false",m.setAttribute("aria-invalid",I?"true":"false");let X=s.error??s.helper??"";U(A,X),A.hidden=X===""},C=()=>{s.onChange(m.value)};return m.addEventListener("input",C),_(),{update:(I)=>{s={...s,...I},_()},dispose:()=>{m.removeEventListener("input",C),c.remove()}}};var Rt=gt(),Oo=document.querySelector("#root");if(!Oo)throw Error("Missing root");var Ro=!1;Rt.onReady((e)=>{if(St(e,document.documentElement),Ro)return;Ro=!0;let r=document.createElement("div");r.style.cssText="display:flex;align-items:center;gap:8px;height:100%;padding:0 8px;box-sizing:border-box;",Oo.append(r);let s="",c=document.createElement("div");c.style.flex="1",r.append(c);let d=xt(c,{value:s,placeholder:"https://example.com",mono:!0,onChange:(_)=>{s=_,d.update({value:_})}}),m=oe(r,{label:"Go",size:"sm",onClick:()=>{if(!s.trim())return;m.update({loading:!0}),Rt.serviceRequest({method:"POST",path:"/navigate",body:JSON.stringify({url:s.trim()})}).then(()=>A()).finally(()=>m.update({loading:!1}))}}),A=async()=>{try{let _=await Rt.serviceRequest({method:"GET",path:"/state"}),C=JSON.parse(_.body);if(String(C.url)===C.url&&C.url!==s)s=C.url==="about:blank"?"":C.url,d.update({value:s})}catch{}};A(),setInterval(()=>{A()},2000)});})();
