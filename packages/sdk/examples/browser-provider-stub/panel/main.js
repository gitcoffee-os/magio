(()=>{var g="magio.sdk",S=1;var Ve=`
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
`;function Xe(e){let o=e.documentElement;if(o.hasAttribute("data-mg-scrollbar-activity"))return;o.setAttribute("data-mg-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(p)=>{let d=p.target===e?o:p.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-mg-scrolling"))d.setAttribute("data-mg-scrolling","");let m=s.get(d);if(m!==void 0)clearTimeout(m);s.set(d,setTimeout(()=>{s.delete(d),d.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Cr=`(${Xe.toString()})(document);`;var qe=128,$e=65536;var Te=128;var _e=65536;var Vt=/^[a-z][a-z0-9-]{0,39}$/;var Ht=(e)=>Object(e)===e&&!Array.isArray(e),We=(e,o)=>Object.keys(e).every((s)=>o.includes(s)),Ft=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Bt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Xt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let s of e){if(!Ht(s)||!Vt.test(s.id)||!Ft(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(o.has(s.id))return!1;if(o.add(s.id),s.kind==="button"){if(!We(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!We(s,["kind","id","label","value","options","disabled"]))return!1;if(!Bt(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let p=new Set;for(let d of s.options){if(!Ht(d)||!We(d,["value","label"])||!Bt(d.value)||!Ft(d.label)||p.has(d.value))return!1;p.add(d.value)}if(!p.has(s.value))return!1}return!0};var qt=["{id}","{segment}","{segments+}"];var no=new Set(qt);var $t=["turn-finished","turn-failed","permission-asked","question-asked"];var ao=new Set($t);var fe=20000000,ye=256;var je=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Wt=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==o.bytes[s])return!1;return!0};var jt=/^[A-Za-z0-9_-]{1,80}$/;var Kt=["left","right","top","bottom"];var zt=(e,o=0,s={remaining:16000})=>{if(--s.remaining<0||o>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of p)if(!zt(d,o+1,s))return!1;return!0},Ke=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Ke);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Ke)}return String(e)===e||Number.isFinite(e)},ze=(e)=>{try{if(String(e.id)!==e.id||!jt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Kt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!zt(e.data)||!Ke(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Yt=["file","directory","other","missing"],Ye=(e)=>Boolean(e&&"sessionId"in e),Qe=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Qt=/^[0-9a-f]{7,64}$/i,Ze=(e)=>Qt.test(e),he=500,be=32000,Zt=16000,er=128,tr=200,rr=2000,or=16000,sr=80,nr=200,ir=16000;var ar=2000;var et=20000,Re=1024,xe=2000000;var ve=64000,Oe=8000,tt=4000;var rt=960000;var lr=999,ur=1e4,ue=500,cr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],pr=["stopped","starting","ready","failed"],Ir=new Set(cr),dr=(e)=>Ir.has(e),gr=(e)=>e&&dr(e)?e:"HOST_REJECTED",Q=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Q);if(Object(e)===e)return Object.values(e).every(Q);return!1},Sr=(e)=>Q(e)&&JSON.stringify(e).length<=ir,Jt=(e)=>e?.trim().slice(0,nr)??"",Z=(e)=>{let o=e.id.trim().slice(0,er),s=e.title.trim().slice(0,tr),p=e.url.trim().slice(0,rr),d=e.text?.trim().slice(0,or),m=e.author?.trim().slice(0,sr),k=e.kind==="pull"?"pull":"issue",f={providerId:e.providerId.trim(),id:o,title:s||o,url:p,kind:k};if(d)f.text=d;if(m)f.author=m;if(k==="pull"){let A=Jt(e.branches?.head),M=Jt(e.branches?.base);if(A&&M)f.branches={head:A,base:M}}if(Sr(e.data))f.data=e.data;return f},ot=(e)=>{let o=Z(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},st=(e)=>{let o={text:e.text.trim().slice(0,Zt)};if(e.send)o.send=!0;return o},nt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(lr,Math.max(0,Math.round(e)))},it=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(ur,Math.max(0,Math.ceil(e)))};var ee=(e)=>e.length>0&&e.length<=Re&&!e.includes("\x00")&&!e.includes("\\");var ke=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>ar)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Gr=new Set(pr),at=(e)=>Boolean(e&&"status"in e&&Gr.has(String(e.status))&&!("body"in e)),Ae=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),lt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ut=(e)=>Boolean(e&&"written"in e&&e.written===!0),ct=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Mr=new Set(Yt),pt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Mr.has(String(e.kind))&&Number.isFinite(e.size)),dt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),wr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Ur=(e)=>Object(e)===e?e:null,Je=(e)=>String(e)===e&&e.length>0,Nr=(e)=>{if(!Je(e.id))return null;if(e.ok===!0){let o={channel:g,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Je(e.error))return{channel:g,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:gr(Je(e.code)?e.code:void 0)};return null},gt=(e)=>{let o=Ur(e);if(!o||o.channel!==g||o.v!==S)return null;if(o.type==="result")return Nr(o);if(!wr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var mr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Lr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class a extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Er=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ce=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${Re} characters without NUL or backslash.`)),Pe=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},c=(e)=>(e.value+=1,`mg-${e.value}`),St=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===o.parent),p=e.requestTimeoutMs??et,d=new Set,m=new Set,k=new Set,f=new Set,A=new Set,M=new Set,V=new Set,ce=new Set,pe=new Set,K=new Set,Le=[],oe=null,se=null,de=new Set,ge=new Set,ne=null,ie=null,De=!1,z=new Map,J=new Map,Y=new Map,D=!1,u={value:0},l=null,H=null,ae=!1,le=!1,kt=null,At=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},w=(t)=>{o.parent.postMessage(t,"*")},Ct=()=>{if(D||o.parent===o||K.size===0||l?.features?.lateGenerateResults!==!0)return;w({channel:g,v:S,type:"generate-late-listen"})},b=(t,r)=>{for(let n of t)try{n(r)}catch(i){console.error(i)}},Pt=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let r=gt(t.data);if(!r)return;if(r.type==="workspace"){let i=J.get(r.payload.subscriptionId);if(i)b([i],r.payload.snapshot);return}if(r.type==="shells"){let i=Y.get(r.payload.subscriptionId);if(i)b([i],r.payload.snapshot);return}if(r.type==="ready"){if(l=r.payload,H=At(r.payload.session),b(d,r.payload),b(m,r.payload.directory),b(k,r.payload.session),H)b(f,H);b(A,r.payload.connection),b(M,r.payload.settings),b(V,r.payload.item),Ct();return}if(r.type==="generate-late"){if(K.size===0)Le.push(r.payload);else b(K,r.payload);return}if(r.type==="directory"){if(l)l={...l,directory:r.payload.directory};b(m,r.payload.directory);return}if(r.type==="session"){if(l)l={...l,session:r.payload.session};if(!r.payload.session)H=null;else if(H?.sessionId!==r.payload.session.id)H=At(r.payload.session);b(k,r.payload.session);return}if(r.type==="session-lifecycle"){H=r.payload,b(f,r.payload);return}if(r.type==="connection"){if(l)l={...l,connection:r.payload.connection};b(A,r.payload.connection);return}if(r.type==="settings"){if(l)l={...l,settings:r.payload.settings};b(M,r.payload.settings);return}if(r.type==="item"){if(l)l={...l,item:r.payload.item};b(V,r.payload.item);return}if(r.type==="status-control-event"){b(ce,r.payload);return}if(r.type==="popover-closed"){b(pe,r.payload);return}if(r.type==="action"){let i=(E)=>{if(!D)w({channel:g,v:S,type:"action-result",id:r.id,payload:E})},T=se;if(!T){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>T(r.payload)).then(()=>i({ok:!0}),(E)=>{let O=(E instanceof Error?E.message:String(E)).trim();i({ok:!1,error:(O||"Action failed.").slice(0,ue)})});return}if(r.type==="file-open"){let i=r.payload;if(ie&&Wt(ie,i))return;ie=i,b(de,r.payload);return}if(r.type==="file-saved"){b(ge,r.payload.version);return}if(r.type==="file-snapshot"){let i=(O)=>{if(!D)w({channel:g,v:S,type:"file-snapshot-result",id:r.id,payload:O})},T=(O)=>i({error:(O.trim()||"Could not read the edited file.").slice(0,ue)}),E=ne;if(!E){T("This extension does not edit files.");return}Promise.resolve().then(()=>E(r.payload.purpose)).then((O)=>{if(je(O)>fe){T(`The file is over ${fe} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>ye){T(`The snapshot version is over ${ye} characters.`);return}i({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>T(O instanceof Error?O.message:String(O)));return}if(r.type==="resolve"){let i=(E)=>{w({channel:g,v:S,type:"resolve-result",id:r.id,payload:E})},T=oe;if(!T){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>T(r.payload)).then((E)=>i({item:E?Z(E):null}),(E)=>{let O=(E instanceof Error?E.message:String(E)).trim();i({error:(O||"Command failed.").slice(0,ue)})});return}let n=z.get(r.id);if(!n)return;if(clearTimeout(n.timer),z.delete(r.id),r.ok){n.resolve(r.payload);return}n.reject(new a(r.code,r.error))};o.addEventListener("message",Pt),w({channel:g,v:S,type:"hello"});let I=(t,r=p)=>{if(D||o.parent===o)return Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let T=setTimeout(()=>{z.delete(t.id),i(new a("HOST_TIMEOUT","Host did not answer in time."))},r);z.set(t.id,{resolve:n,reject:i,timer:T}),w(t)})},x=(t)=>I(t).then(()=>{return}),v={channel:g,v:S},He=(t)=>{if(!D&&o.parent!==o)w(t)},It=()=>He({...v,type:"file-save"}),Gt=(t)=>{if(!mr(t)||!Lr(t))return;t.preventDefault(),It()},Mt=(t)=>{if(!mr(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),Lt(l.popover.id,"escape").catch(()=>{return})},Se=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let r=ae||le;if(kt===r)return;kt=r,Dt(t.id,r).catch(()=>{return})},me=()=>{if(l?.surface!=="popover"||ae)return;ae=!0,Se()},wt=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!ae)return;ae=!1,Se()},Ut=()=>{if(l?.surface!=="popover"||le)return;le=!0,Se()},Nt=()=>{if(l?.surface!=="popover"||!le)return;le=!1,Se()},L=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new a("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Fe=async(t)=>{if(t.kind!=="projects")L(t.projectId);let r=await I({...v,type:"workspace-read",id:c(u),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return r},Be=async(t,r)=>{if(t.kind!=="projects")L(t.projectId);let n=c(u);J.set(n,r);try{await x({...v,type:"workspace-subscribe",id:c(u),payload:{subscriptionId:n,query:t}})}catch(i){if(J.delete(n),!D)w({...v,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:n}});throw i}return()=>{if(!J.delete(n)||D)return;w({...v,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:n}})}},Ar=async(t,r)=>{if(t.kind==="session")L(t.sessionId);if(t.kind==="project")L(t.projectId);let n=c(u);Y.set(n,r);try{await x({...v,type:"shells-subscribe",id:c(u),payload:{subscriptionId:n,scope:t}})}catch(i){if(Y.delete(n),!D)w({...v,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:n}});throw i}return()=>{if(!Y.delete(n)||D)return;w({...v,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:n}})}},Ee=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>qe))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Q(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>$e)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let r=await I({...v,type:"storage",id:c(u),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return r},Lt=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):x({...v,type:"popover-close",id:c(u),payload:r?{id:t,reason:r}:{id:t}}),Dt=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):x({...v,type:"popover-anchor",id:c(u),payload:{id:t,active:r}});return o.addEventListener("keydown",Mt,!0),o.addEventListener("pointerover",me),o.addEventListener("pointermove",me),o.addEventListener("pointerout",wt),o.addEventListener("focus",Ut),o.addEventListener("blur",Nt),{onAction:(t)=>(se=t,()=>{if(se===t)se=null}),listProjects:async()=>{let t=await Fe({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await Fe({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await Fe({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Be({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Be({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")r(n)}),onSessions:(t,r)=>Be({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")r(n)}),onRunningShells:(t,r)=>Ar(t,r),readShellOutput:async(t,r)=>{L(t,Te);let n=r?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=r?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>_e))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${_e}.`);let E=await I({...v,type:"shell-output",id:c(u),payload:{shellId:t,cursor:n,tailBytes:i}});if(!E||typeof E.output!=="string"||!Number.isFinite(E.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return E},stopShell:async(t)=>{if(L(t,Te),(await I({...v,type:"shell-stop",id:c(u),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{L(t),await x({...v,type:"open-session",id:c(u),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let n=Pe(r),i={op:"get",key:t};if(n)i.scope=n;let T=await Ee(i);return T.op==="get"&&T.found?T.value:void 0},set:async(t,r,n)=>{let i=Pe(n),T={op:"set",key:t,value:r};if(i)T.scope=i;await Ee(T)},delete:async(t,r)=>{let n=Pe(r),i={op:"delete",key:t};if(n)i.scope=n;await Ee(i)},keys:async(t)=>{let r=Pe(t),n={op:"keys"};if(r)n.scope=r;let i=await Ee(n);if(i.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(d.add(t),l)t(l);return()=>{d.delete(t)}},onDirectory:(t)=>{if(m.add(t),l)t(l.directory);return()=>{m.delete(t)}},onSession:(t)=>{if(k.add(t),l)t(l.session);return()=>{k.delete(t)}},onSessionLifecycle:(t)=>{if(f.add(t),H)t(H);return()=>{f.delete(t)}},onConnection:(t)=>{if(A.add(t),l)t(l.connection);return()=>{A.delete(t)}},onSettings:(t)=>{if(M.add(t),l)t(l.settings);return()=>{M.delete(t)}},onItem:(t)=>{if(V.add(t),l)t(l.item);return()=>{V.delete(t)}},onStatusControl:(t)=>(ce.add(t),()=>{ce.delete(t)}),onPopoverClosed:(t)=>(pe.add(t),()=>{pe.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support status controls."));if(!Xt(t))return Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return x({...v,type:"status-controls",id:c(u),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support popovers."));if(!ze(t))return Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return x({...v,type:"popover-open",id:c(u),payload:t})},closePopover:Lt,setPopoverAnchorActive:Dt,onResolve:(t)=>(oe=t,()=>{if(oe===t)oe=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>he)return Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${he} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>be))return Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${be} characters.`));return x({channel:g,v:S,type:"toast",id:c(u),payload:{...t,message:r}})},openUrl:(t)=>x({channel:g,v:S,type:"open-url",id:c(u),payload:{url:t}}),openCommit:(t)=>Ze(t)?x({channel:g,v:S,type:"open-commit",id:c(u),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>x({channel:g,v:S,type:"open-surface",id:c(u),payload:{surfaceId:t}}),writeClipboard:(t)=>x({channel:g,v:S,type:"clipboard-write",id:c(u),payload:{text:t}}),compose:(t)=>x({channel:g,v:S,type:"compose",id:c(u),payload:t}),attach:(t)=>x({channel:g,v:S,type:"attach",id:c(u),payload:Z(t)}),startSession:async(t)=>{if(t.projectId!==void 0)L(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")L(r.directory);else{if(r.name!==void 0)L(r.name,200);if(r.baseBranch!==void 0)L(r.baseBranch,200)}let n=await I({channel:g,v:S,type:"start-session",id:c(u),payload:ot(t)},e.requestTimeoutMs??180000);if(!Ye(n))throw new a("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>I({channel:g,v:S,type:"prompt",id:c(u),payload:st(t)}).then((r)=>{if(!Qe(r))throw new a("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>x({channel:g,v:S,type:"session-link",id:c(u),payload:Z(t)}),close:()=>x({channel:g,v:S,type:"close",id:c(u)}),oauthStart:()=>x({channel:g,v:S,type:"oauth-start",id:c(u)}),oauthDisconnect:()=>x({channel:g,v:S,type:"oauth-disconnect",id:c(u)}),request:(t)=>(ke(t.path)?I({channel:g,v:S,type:"request",id:c(u),payload:t}):Er()).then((r)=>{if(!Ae(r))throw new a("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(ke(t.path)?I({channel:g,v:S,type:"service-request",id:c(u),payload:t}):Er()).then((r)=>{if(!Ae(r))throw new a("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>I({channel:g,v:S,type:"service-status",id:c(u)}).then((t)=>{if(!at(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ee(t)?I({channel:g,v:S,type:"file-read",id:c(u),payload:{path:t}}):Ce()).then((r)=>{if(!lt(r))throw new a("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!ee(t))return Ce();if(r.length>xe)return Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${xe} characters.`));return I({channel:g,v:S,type:"file-write",id:c(u),payload:{path:t,content:r}}).then((n)=>{if(!ut(n))throw new a("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(ee(t)?I({channel:g,v:S,type:"file-list",id:c(u),payload:{path:t}}):Ce()).then((r)=>{if(!ct(r))throw new a("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(ee(t)?I({channel:g,v:S,type:"file-stat",id:c(u),payload:{path:t}}):Ce()).then((r)=>{if(!pt(r))throw new a("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),n=t.system?.trim();if(r.length===0||r.length>ve)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${ve} characters.`));if(n!==void 0&&(n.length===0||n.length>Oe))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Oe} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(tt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let T={prompt:r};if(n!==void 0)T.system=n;if(i!==void 0)T.maxOutputTokens=i;return I({channel:g,v:S,type:"generate",id:c(u),payload:T},e.requestTimeoutMs??rt).then((E)=>{if(!dt(E))throw new a("HOST_REJECTED","Host did not return generated text.");return E})},onLateGenerateResult:(t)=>{K.add(t);for(let r of Le.splice(0))b([t],r);return Ct(),()=>{K.delete(t)}},setBadge:(t)=>x({channel:g,v:S,type:"badge",id:c(u),payload:{count:nt(t)}}),setHeight:(t)=>x({channel:g,v:S,type:"resize",id:c(u),payload:{height:it(t)}}),onFileOpen:(t)=>{if(de.add(t),!De)De=!0,o.addEventListener("keydown",Gt,!0);if(ie)t(ie);return()=>{de.delete(t)}},onFileSnapshot:(t)=>(ne=t,()=>{if(ne===t)ne=null}),onFileSaved:(t)=>(ge.add(t),()=>{ge.delete(t)}),reportFileChange:(t)=>He({...v,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:It,reportFileUnsupported:()=>He({...v,type:"file-unsupported"}),dispose:()=>{for(let t of J.keys())w({...v,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:t}});J.clear();for(let t of Y.keys())w({...v,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:t}});if(Y.clear(),D=!0,oe=null,se=null,ne=null,de.clear(),ge.clear(),De)o.removeEventListener("keydown",Gt,!0);o.removeEventListener("message",Pt),o.removeEventListener("keydown",Mt,!0),o.removeEventListener("pointerover",me),o.removeEventListener("pointermove",me),o.removeEventListener("pointerout",wt),o.removeEventListener("focus",Ut),o.removeEventListener("blur",Nt);for(let t of z.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));z.clear(),d.clear(),m.clear(),k.clear(),f.clear(),A.clear(),M.clear(),V.clear(),ce.clear(),pe.clear(),K.clear(),Le.length=0}}};var Tr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var bo=new Set(Tr);var _r=["none","agent","user"];var xo=new Set(_r);var Dr=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Hr=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],fr=(e,o)=>{o.style.colorScheme=e.mode;for(let[s,p]of Dr)o.style.setProperty(s,e.tokens[p]);for(let[s,p,d]of Hr){let m=e.tokens[d]??"";o.style.setProperty(s,m),o.style.setProperty(p,m)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},mt=(e,o)=>{if(fr(e.theme,o),o.dataset)o.dataset.mgSurface=e.surface,o.dataset.mgTheme=e.theme.mode};var Fr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},_=(e,o)=>`var(--${e}, var(--mg-${Fr[e]}, ${o}))`,B=_("surface-background","transparent"),Ge=_("surface-elevated","transparent"),te=_("surface-elevated-foreground","inherit"),U=_("surface-foreground","inherit"),y=_("surface-muted-foreground","gray"),Br=_("surface-muted","transparent"),q=_("interactive-border","currentColor"),G=_("interactive-hover","transparent"),W=_("interactive-active","transparent"),Et=_("interactive-selection","transparent"),Tt=_("interactive-selection-foreground","inherit"),F=_("primary","currentColor"),_t=_("primary-text","inherit"),ft=_("error-text","inherit"),Vr=_("font-sans","inherit"),yt=_("font-mono","monospace"),Rr=_("radius","9px"),ht=`calc(${Rr} - 2px)`,yr=`calc(${Rr} - 4px)`,h=(e,o,s="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${s})`,hr=`background-image: linear-gradient(${G}, ${G});`,bt=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--mg-sdk-field-lift);`,Rt="border-color: var(--mg-sdk-edge); box-shadow: var(--mg-sdk-raised-lift);",br="box-shadow: var(--mg-sdk-lit);",xt=`inset 0 0.5px 0 0 ${h(U,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Xr=`
:root {
  --mg-sdk-edge: ${h(U,16)};
  --mg-sdk-field-bg: ${Ge};
  --mg-sdk-raised-bg: ${B};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.14);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${h(U,14)};
  --mg-sdk-field-bg: ${h(B,50,Ge)};
  --mg-sdk-raised-bg: ${Ge};
  --mg-sdk-field-lift: ${xt};
  --mg-sdk-raised-lift: ${xt};
  --mg-sdk-lit: ${xt};
  --mg-sdk-float-edge: rgb(0 0 0 / 0.55);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ie=(e)=>{let o=_(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${o}; --mg-sdk-tone-text: ${_(`${e}-text`,"inherit")}; }`},qr=`
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
.mg-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.mg-sdk-progress[data-done="true"] .mg-sdk-progress-value { font-weight: 600; }

.mg-sdk-menu { position: relative; display: inline-flex; }

.mg-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.mg-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,xr=`${Xr}
.mg-sdk { color: ${U}; font-family: ${Vr}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${hr} }
.mg-sdk-mono { font-family: ${yt}; }
.mg-sdk-muted { color: ${y}; }
${Ie("success")}${Ie("warning")}${Ie("error")}${Ie("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${F}; --mg-sdk-tone-text: ${_t}; }

.mg-sdk-btn { border-radius: ${ht}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${yr}; }
.mg-sdk-btn[data-variant="default"] { color: ${_t}; background: ${h(F,10,B)}; border-color: ${h(F,12)}; ${br} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${h(F,16,B)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${h(F,22,B)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${Br}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${G}, ${G}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${W}, ${W}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${te}; ${Rt} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${G}, ${G}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${W}, ${W}); box-shadow: none; }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${G}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${W}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${_("status-error","red")}; color: ${ft}; background: ${h("var(--mg-sdk-tone)",7,B)}; border-color: ${h("var(--mg-sdk-tone)",12)}; ${br} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${h("var(--mg-sdk-tone)",9,B)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${h("var(--mg-sdk-tone)",11,B)}; box-shadow: none; }

.mg-sdk-field-note { color: ${y}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${ft}; }
.mg-sdk-input { border-radius: ${ht}; background: var(--mg-sdk-field-bg); color: ${te}; ${bt("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${y}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${G}, ${G}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${bt(h(U,26),"1px")} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${bt(_("status-error","red"),"1px")} }
.mg-sdk-input[data-mono="true"] { font-family: ${yt}; }

.mg-sdk-search-icon { color: ${y}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${F}; }
.mg-sdk-search-clear { border-radius: ${yr}; color: ${y}; }
.mg-sdk-search-clear:hover { background: ${G}; color: ${U}; }

.mg-sdk-trigger { border-radius: ${ht}; background: var(--mg-sdk-raised-bg); color: ${te}; ${Rt} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${G}, ${G}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${W}, ${W}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${y}; }
.mg-sdk-trigger-chevron { color: ${y}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.mg-sdk-popup { --surface-foreground: ${te}; border-color: var(--mg-sdk-float-edge); border-radius: 12px; background: ${Ge}; background-clip: padding-box; color: ${te}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${G}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Et}; color: ${Tt}; }
.mg-sdk-option-check { color: ${U}; }
.mg-sdk-option[data-destructive="true"] { color: ${ft}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${h(_("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${y}; }
.mg-sdk-popup-empty { color: ${y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${q}; border-radius: 4px; color: ${U}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${h(U,60,q)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${q}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${F}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${hr} }
.mg-sdk-check-desc { color: ${y}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${h(U,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${y}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${U}; }
.mg-sdk-tab[aria-selected="true"] { color: ${Tt}; background: ${Et}; border-color: ${q}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${te}; background: var(--mg-sdk-raised-bg); ${Rt} }
.mg-sdk-tab-count { color: ${y}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.mg-sdk-badge { border-radius: 9999px; background: ${h(U,6)}; color: ${y}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${h("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${G}; }
.mg-sdk-row[aria-selected="true"] { background: ${Et}; color: ${Tt}; }
.mg-sdk-row-lead { font-family: ${yt}; color: ${y}; }
.mg-sdk-row-sub { color: ${y}; }
.mg-sdk-row-meta { color: ${y}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${y}; }

.mg-sdk-empty-body { color: ${y}; }

.mg-sdk-spinner { color: ${y}; }
.mg-sdk-spinner-ring { border-color: ${q}; border-top-color: ${F}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${h("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${y}; }

.mg-sdk-separator { color: ${y}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${h(q,40)}; }

.mg-sdk-progress-label { color: ${y}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.mg-sdk-progress-track { border-radius: 9999px; background: ${h(U,6)}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${F}); }
.mg-sdk-progress-track[aria-valuenow="100"] > .mg-sdk-progress-fill:not([data-tone]) { background: ${_("status-success","currentColor")}; }
.mg-sdk-progress[data-done="true"] .mg-sdk-progress-value { color: ${_("success-text","inherit")}; }

.mg-sdk-text a { color: ${_t}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${h(q,60)}; }
`,C=`
${Ve}
${qr}
${xr}`;var vr="mg-sdk-ui-style";var P=(e)=>{let o=document.getElementById(vr);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}Xe(document);let s=document.createElement("style");s.id=vr,s.textContent=e,document.head.appendChild(s)},R=(e,o)=>{let s=document.createElement(e);if(o)s.className=o;return s},X=(e)=>{let o=R("button",e);return o.type="button",o},N=(e,o)=>{let s=o??"";if(e.textContent!==s)e.textContent=s},j=(e,o,s)=>{if(s===void 0||s===null||s==="")e.removeAttribute(o);else if(e.getAttribute(o)!==s)e.setAttribute(o,s)};var $r=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},re=(e,o)=>{P(C);let s=o,p=X("mg-sdk mg-sdk-btn"),d=$r(),m=document.createElement("span");p.append(m),e.append(p);let k=()=>{if(p.dataset.variant=s.variant??"default",p.dataset.size=s.size??"default",p.disabled=Boolean(s.disabled)||Boolean(s.loading),p.dataset.loading=s.loading?"true":"false",p.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&d.parentNode!==p)p.prepend(d);else if(!s.loading&&d.parentNode===p)d.remove();N(m,s.label)},f=()=>{if(s.disabled||s.loading)return;s.onClick()};return p.addEventListener("click",f),k(),{update:(A)=>{s={...s,...A},k()},dispose:()=>{p.removeEventListener("click",f),p.remove()}}};var vt=(e,o)=>{P(C);let s=o,p=R("label","mg-sdk mg-sdk-field"),d=R("span","mg-sdk-field-label"),m=s.multiline?R("textarea","mg-sdk-input"):R("input","mg-sdk-input"),k=R("span","mg-sdk-field-note");p.append(d,m,k),e.append(p);let f=()=>{if(N(d,s.label),d.hidden=!s.label,m instanceof HTMLInputElement)m.type=s.password?"password":"text";else m.rows=s.rows??3;if(m.value!==s.value)m.value=s.value;m.disabled=Boolean(s.disabled),j(m,"placeholder",s.placeholder),m.dataset.mono=s.mono?"true":"false";let M=Boolean(s.error);p.dataset.invalid=M?"true":"false",m.setAttribute("aria-invalid",M?"true":"false");let V=s.error??s.helper??"";N(k,V),k.hidden=V===""},A=()=>{s.onChange(m.value)};return m.addEventListener("input",A),f(),{update:(M)=>{s={...s,...M},f()},dispose:()=>{m.removeEventListener("input",A),p.remove()}}};var Ot=St(),kr=document.querySelector("#root");if(!kr)throw Error("Missing root");var Or=!1;Ot.onReady((e)=>{if(mt(e,document.documentElement),Or)return;Or=!0;let o=document.createElement("div");o.style.cssText="display:flex;align-items:center;gap:8px;height:100%;padding:0 8px;box-sizing:border-box;",kr.append(o);let s="",p=document.createElement("div");p.style.flex="1",o.append(p);let d=vt(p,{value:s,placeholder:"https://example.com",mono:!0,onChange:(f)=>{s=f,d.update({value:f})}}),m=re(o,{label:"Go",size:"sm",onClick:()=>{if(!s.trim())return;m.update({loading:!0}),Ot.serviceRequest({method:"POST",path:"/navigate",body:JSON.stringify({url:s.trim()})}).then(()=>k()).finally(()=>m.update({loading:!1}))}}),k=async()=>{try{let f=await Ot.serviceRequest({method:"GET",path:"/state"}),A=JSON.parse(f.body);if(String(A.url)===A.url&&A.url!==s)s=A.url==="about:blank"?"":A.url,d.update({value:s})}catch{}};k(),setInterval(()=>{k()},2000)});})();
