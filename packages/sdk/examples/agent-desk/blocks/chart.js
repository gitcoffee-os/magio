(()=>{var p="magio.sdk",d=1;var We=`
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
`;function Bt(e){let o=e.documentElement;if(o.hasAttribute("data-mg-scrollbar-activity"))return;o.setAttribute("data-mg-scrollbar-activity","");let a=new WeakMap;e.addEventListener("scroll",(v)=>{let S=v.target===e?o:v.target;if(!(S instanceof Element))return;if(!S.hasAttribute("data-mg-scrolling"))S.setAttribute("data-mg-scrolling","");let b=a.get(S);if(b!==void 0)clearTimeout(b);a.set(S,setTimeout(()=>{a.delete(S),S.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var kr=`(${Bt.toString()})(document);`;var $e=128,Ke=65536;var fe=128;var ye=65536;var Wt=/^[a-z][a-z0-9-]{0,39}$/;var Vt=(e)=>Object(e)===e&&!Array.isArray(e),je=(e,o)=>Object.keys(e).every((a)=>o.includes(a)),Xt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,qt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,$t=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let a of e){if(!Vt(a)||!Wt.test(a.id)||!Xt(a.label))return!1;if(a.disabled!==void 0&&a.disabled!==!0&&a.disabled!==!1)return!1;if(o.has(a.id))return!1;if(o.add(a.id),a.kind==="button"){if(!je(a,["kind","id","label","disabled"]))return!1;continue}if(a.kind!=="select"||!je(a,["kind","id","label","value","options","disabled"]))return!1;if(!qt(a.value)||!Array.isArray(a.options)||a.options.length<1||a.options.length>16)return!1;let v=new Set;for(let S of a.options){if(!Vt(S)||!je(S,["value","label"])||!qt(S.value)||!Xt(S.label)||v.has(S.value))return!1;v.add(S.value)}if(!v.has(a.value))return!1}return!0};var Kt=["{id}","{segment}","{segments+}"];var so=new Set(Kt);var jt=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var io=new Set(jt);var Re=20000000,he=256;var ze=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,zt=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let a=0;a<e.bytes.byteLength;a+=1)if(e.bytes[a]!==o.bytes[a])return!1;return!0};var Qt=/^[A-Za-z0-9_-]{1,80}$/;var Jt=["left","right","top","bottom"];var Yt=(e,o=0,a={remaining:16000})=>{if(--a.remaining<0||o>=32)return!1;if(e===null)return!0;let v=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let S of v)if(!Yt(S,o+1,a))return!1;return!0},Qe=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Qe);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Qe)}return String(e)===e||Number.isFinite(e)},Je=(e)=>{try{if(String(e.id)!==e.id||!Qt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Jt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Yt(e.data)||!Qe(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Ze=2000;var er=["file","directory","other","missing"],et=(e)=>Boolean(e&&"sessionId"in e),tt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var tr=/^[0-9a-f]{7,64}$/i,rt=(e)=>tr.test(e),ve=500,be=32000,rr=16000,or=128,sr=200,nr=2000,ir=16000,ar=80,lr=200,ur=16000;var cr=2000;var ot=20000,xe=1024,Oe=2000000;var Ae=64000,Ce=8000,st=4000;var nt=960000;var pr=999,dr=1e4,le=500,Sr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],gr=["stopped","starting","ready","failed"],Pr=new Set(Sr),mr=(e)=>Pr.has(e),Er=(e)=>e&&mr(e)?e:"HOST_REJECTED",z=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(z);if(Object(e)===e)return Object.values(e).every(z);return!1},_r=(e)=>z(e)&&JSON.stringify(e).length<=ur,Zt=(e)=>e?.trim().slice(0,lr)??"",Q=(e)=>{let o=e.id.trim().slice(0,or),a=e.title.trim().slice(0,sr),v=e.url.trim().slice(0,nr),S=e.text?.trim().slice(0,ir),b=e.author?.trim().slice(0,ar),P=e.kind==="pull"?"pull":"issue",A={providerId:e.providerId.trim(),id:o,title:a||o,url:v,kind:P};if(S)A.text=S;if(b)A.author=b;if(P==="pull"){let w=Zt(e.branches?.head),B=Zt(e.branches?.base);if(w&&B)A.branches={head:w,base:B}}if(_r(e.data))A.data=e.data;return A},it=(e)=>{let o=Q(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},at=(e)=>{let o={text:e.text.trim().slice(0,rr)};if(e.send)o.send=!0;return o},lt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(pr,Math.max(0,Math.round(e)))},ut=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(dr,Math.max(0,Math.ceil(e)))};var J=(e)=>e.length>0&&e.length<=xe&&!e.includes("\x00")&&!e.includes("\\");var ke=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>cr)return!1;return!e.split("/").some((a)=>a==="."||a==="..")},Mr=new Set(gr),ct=(e)=>Boolean(e&&"status"in e&&Mr.has(String(e.status))&&!("body"in e)),Ie=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),pt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),dt=(e)=>Boolean(e&&"written"in e&&e.written===!0),St=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Gr=new Set(er),gt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Gr.has(String(e.kind))&&Number.isFinite(e.size)),mt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),wr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Ur=(e)=>Object(e)===e?e:null,Ye=(e)=>String(e)===e&&e.length>0,Nr=(e)=>{if(!Ye(e.id))return null;if(e.ok===!0){let o={channel:p,v:d,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Ye(e.error))return{channel:p,v:d,type:"result",id:e.id,ok:!1,error:e.error,code:Er(Ye(e.code)?e.code:void 0)};return null},Et=(e)=>{let o=Ur(e);if(!o||o.channel!==p||o.v!==d)return null;if(o.type==="result")return Nr(o);if(!wr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Tr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Lr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var fr=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pe=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${xe} characters without NUL or backslash.`)),Me=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},c=(e)=>(e.value+=1,`mg-${e.value}`),_t=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let a=e.acceptSource??((t)=>t===o.parent),v=e.requestTimeoutMs??ot,S=new Set,b=new Set,P=new Set,A=new Set,w=new Set,B=new Set,te=new Set,ce=new Set,pe=new Set,de=new Set,Se=new Set,q=new Set,Fe=[],re=null,oe=null,ge=new Set,me=new Set,se=null,ne=null,Be=!1,W=new Map,K=new Map,j=new Map,N=!1,u={value:0},i=null,L=null,ie=!1,ae=!1,kt=null,It=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},M=(t)=>{o.parent.postMessage(t,"*")},Pt=()=>{if(N||o.parent===o||q.size===0||i?.features?.lateGenerateResults!==!0)return;M({channel:p,v:d,type:"generate-late-listen"})},_=(t,r)=>{for(let s of t)try{s(r)}catch(n){console.error(n)}},Mt=(t)=>{if(!(t instanceof MessageEvent))return;if(!a(t.source))return;let r=Et(t.data);if(!r)return;if(r.type==="workspace"){let n=K.get(r.payload.subscriptionId);if(n)_([n],r.payload.snapshot);return}if(r.type==="shells"){let n=j.get(r.payload.subscriptionId);if(n)_([n],r.payload.snapshot);return}if(r.type==="ready"){if(i=r.payload,L=It(r.payload.session),_(S,r.payload),_(b,r.payload.directory),_(P,r.payload.session),L)_(A,L);if(_(w,r.payload.connection),_(B,r.payload.settings),_(te,r.payload.item),r.payload.block)_(ce,r.payload.block);Pt();return}if(r.type==="service-event"){_(pe,r.payload);return}if(r.type==="generate-late"){if(q.size===0)Fe.push(r.payload);else _(q,r.payload);return}if(r.type==="directory"){if(i)i={...i,directory:r.payload.directory};_(b,r.payload.directory);return}if(r.type==="session"){if(i)i={...i,session:r.payload.session};if(!r.payload.session)L=null;else if(L?.sessionId!==r.payload.session.id)L=It(r.payload.session);_(P,r.payload.session);return}if(r.type==="session-lifecycle"){L=r.payload,_(A,r.payload);return}if(r.type==="connection"){if(i)i={...i,connection:r.payload.connection};_(w,r.payload.connection);return}if(r.type==="settings"){if(i)i={...i,settings:r.payload.settings};_(B,r.payload.settings);return}if(r.type==="item"){if(i)i={...i,item:r.payload.item};_(te,r.payload.item);return}if(r.type==="status-control-event"){_(de,r.payload);return}if(r.type==="popover-closed"){_(Se,r.payload);return}if(r.type==="action"){let n=(g)=>{if(!N)M({channel:p,v:d,type:"action-result",id:r.id,payload:g})},m=oe;if(!m){n({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>m(r.payload)).then(()=>n({ok:!0}),(g)=>{let h=(g instanceof Error?g.message:String(g)).trim();n({ok:!1,error:(h||"Action failed.").slice(0,le)})});return}if(r.type==="file-open"){let n=r.payload;if(ne&&zt(ne,n))return;ne=n,_(ge,r.payload);return}if(r.type==="file-saved"){_(me,r.payload.version);return}if(r.type==="file-snapshot"){let n=(h)=>{if(!N)M({channel:p,v:d,type:"file-snapshot-result",id:r.id,payload:h})},m=(h)=>n({error:(h.trim()||"Could not read the edited file.").slice(0,le)}),g=se;if(!g){m("This extension does not edit files.");return}Promise.resolve().then(()=>g(r.payload.purpose)).then((h)=>{if(ze(h)>Re){m(`The file is over ${Re} ${"bytes"in h?"bytes":"characters"}.`);return}if(h.version.length>he){m(`The snapshot version is over ${he} characters.`);return}n({snapshot:"bytes"in h?{bytes:h.bytes,version:h.version}:{content:h.content,version:h.version}})},(h)=>m(h instanceof Error?h.message:String(h)));return}if(r.type==="resolve"){let n=(g)=>{M({channel:p,v:d,type:"resolve-result",id:r.id,payload:g})},m=re;if(!m){n({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>m(r.payload)).then((g)=>n({item:g?Q(g):null}),(g)=>{let h=(g instanceof Error?g.message:String(g)).trim();n({error:(h||"Command failed.").slice(0,le)})});return}let s=W.get(r.id);if(!s)return;if(clearTimeout(s.timer),W.delete(r.id),r.ok){s.resolve(r.payload);return}s.reject(new l(r.code,r.error))};o.addEventListener("message",Mt),M({channel:p,v:d,type:"hello"});let x=(t,r=v)=>{if(N||o.parent===o)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,n)=>{let m=setTimeout(()=>{W.delete(t.id),n(new l("HOST_TIMEOUT","Host did not answer in time."))},r);W.set(t.id,{resolve:s,reject:n,timer:m}),M(t)})},y=(t)=>x(t).then(()=>{return}),R={channel:p,v:d},Ve=(t)=>{if(!N&&o.parent!==o)M(t)},Gt=()=>Ve({...R,type:"file-save"}),wt=(t)=>{if(!Tr(t)||!Lr(t))return;t.preventDefault(),Gt()},Ut=(t)=>{if(!Tr(t)||t.key!=="Escape"||i?.surface!=="popover"||!i.popover)return;t.preventDefault(),Ht(i.popover.id,"escape").catch(()=>{return})},Ee=()=>{let t=i?.surface==="popover"?i.popover:void 0;if(!t)return;let r=ie||ae;if(kt===r)return;kt=r,Ft(t.id,r).catch(()=>{return})},_e=()=>{if(i?.surface!=="popover"||ie)return;ie=!0,Ee()},Nt=(t)=>{if(i?.surface!=="popover"||t.relatedTarget!==null||!ie)return;ie=!1,Ee()},Lt=()=>{if(i?.surface!=="popover"||ae)return;ae=!0,Ee()},Dt=()=>{if(i?.surface!=="popover"||!ae)return;ae=!1,Ee()},U=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new l("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Xe=async(t)=>{if(t.kind!=="projects")U(t.projectId);let r=await x({...R,type:"workspace-read",id:c(u),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return r},qe=async(t,r)=>{if(t.kind!=="projects")U(t.projectId);let s=c(u);K.set(s,r);try{await y({...R,type:"workspace-subscribe",id:c(u),payload:{subscriptionId:s,query:t}})}catch(n){if(K.delete(s),!N)M({...R,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:s}});throw n}return()=>{if(!K.delete(s)||N)return;M({...R,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:s}})}},Cr=async(t,r)=>{if(t.kind==="session")U(t.sessionId);if(t.kind==="project")U(t.projectId);let s=c(u);j.set(s,r);try{await y({...R,type:"shells-subscribe",id:c(u),payload:{subscriptionId:s,scope:t}})}catch(n){if(j.delete(s),!N)M({...R,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:s}});throw n}return()=>{if(!j.delete(s)||N)return;M({...R,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:s}})}},Te=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>$e))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!z(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Ke)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&i?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let r=await x({...R,type:"storage",id:c(u),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return r},Ht=(t,r)=>i?.features?.popovers!==!0&&!(i?.surface==="popover"&&i.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):y({...R,type:"popover-close",id:c(u),payload:r?{id:t,reason:r}:{id:t}}),Ft=(t,r)=>i?.features?.popovers!==!0&&!(i?.surface==="popover"&&i.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):y({...R,type:"popover-anchor",id:c(u),payload:{id:t,active:r}});return o.addEventListener("keydown",Ut,!0),o.addEventListener("pointerover",_e),o.addEventListener("pointermove",_e),o.addEventListener("pointerout",Nt),o.addEventListener("focus",Lt),o.addEventListener("blur",Dt),{onAction:(t)=>(oe=t,()=>{if(oe===t)oe=null}),listProjects:async()=>{let t=await Xe({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await Xe({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await Xe({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>qe({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>qe({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")r(s)}),onSessions:(t,r)=>qe({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")r(s)}),onRunningShells:(t,r)=>Cr(t,r),readShellOutput:async(t,r)=>{U(t,fe);let s=r?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let n=r?.tailBytes;if(n!==void 0&&(!Number.isInteger(n)||n<1||n>ye))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ye}.`);let g=await x({...R,type:"shell-output",id:c(u),payload:{shellId:t,cursor:s,tailBytes:n}});if(!g||typeof g.output!=="string"||!Number.isFinite(g.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return g},stopShell:async(t)=>{if(U(t,fe),(await x({...R,type:"shell-stop",id:c(u),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{U(t),await y({...R,type:"open-session",id:c(u),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let s=Me(r),n={op:"get",key:t};if(s)n.scope=s;let m=await Te(n);return m.op==="get"&&m.found?m.value:void 0},set:async(t,r,s)=>{let n=Me(s),m={op:"set",key:t,value:r};if(n)m.scope=n;await Te(m)},delete:async(t,r)=>{let s=Me(r),n={op:"delete",key:t};if(s)n.scope=s;await Te(n)},keys:async(t)=>{let r=Me(t),s={op:"keys"};if(r)s.scope=r;let n=await Te(s);if(n.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return n.keys}},onReady:(t)=>{if(S.add(t),i)t(i);return()=>{S.delete(t)}},onDirectory:(t)=>{if(b.add(t),i)t(i.directory);return()=>{b.delete(t)}},onSession:(t)=>{if(P.add(t),i)t(i.session);return()=>{P.delete(t)}},onSessionLifecycle:(t)=>{if(A.add(t),L)t(L);return()=>{A.delete(t)}},onConnection:(t)=>{if(w.add(t),i)t(i.connection);return()=>{w.delete(t)}},onSettings:(t)=>{if(B.add(t),i)t(i.settings);return()=>{B.delete(t)}},onItem:(t)=>{if(te.add(t),i)t(i.item);return()=>{te.delete(t)}},onBlock:(t)=>{if(ce.add(t),i?.block)t(i.block);return()=>{ce.delete(t)}},onServiceEvent:(t)=>(pe.add(t),()=>{pe.delete(t)}),onStatusControl:(t)=>(de.add(t),()=>{de.delete(t)}),onPopoverClosed:(t)=>(Se.add(t),()=>{Se.delete(t)}),setStatusControls:(t)=>{if(i?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!$t(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return y({...R,type:"status-controls",id:c(u),payload:{controls:t}})},openPopover:(t)=>{if(i?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!Je(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return y({...R,type:"popover-open",id:c(u),payload:t})},closePopover:Ht,setPopoverAnchorActive:Ft,onResolve:(t)=>(re=t,()=>{if(re===t)re=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>ve)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${ve} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>be))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${be} characters.`));return y({channel:p,v:d,type:"toast",id:c(u),payload:{...t,message:r}})},openUrl:(t)=>y({channel:p,v:d,type:"open-url",id:c(u),payload:{url:t}}),openCommit:(t)=>rt(t)?y({channel:p,v:d,type:"open-commit",id:c(u),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>y({channel:p,v:d,type:"block-answer",id:c(u),payload:{text:t.trim().slice(0,Ze)}}),openSurface:(t)=>y({channel:p,v:d,type:"open-surface",id:c(u),payload:{surfaceId:t}}),writeClipboard:(t)=>y({channel:p,v:d,type:"clipboard-write",id:c(u),payload:{text:t}}),compose:(t)=>y({channel:p,v:d,type:"compose",id:c(u),payload:t}),attach:(t)=>y({channel:p,v:d,type:"attach",id:c(u),payload:Q(t)}),startSession:async(t)=>{if(t.projectId!==void 0)U(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")U(r.directory);else{if(r.name!==void 0)U(r.name,200);if(r.baseBranch!==void 0)U(r.baseBranch,200)}let s=await x({channel:p,v:d,type:"start-session",id:c(u),payload:it(t)},e.requestTimeoutMs??180000);if(!et(s))throw new l("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>x({channel:p,v:d,type:"prompt",id:c(u),payload:at(t)}).then((r)=>{if(!tt(r))throw new l("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>y({channel:p,v:d,type:"session-link",id:c(u),payload:Q(t)}),close:()=>y({channel:p,v:d,type:"close",id:c(u)}),oauthStart:()=>y({channel:p,v:d,type:"oauth-start",id:c(u)}),oauthDisconnect:()=>y({channel:p,v:d,type:"oauth-disconnect",id:c(u)}),request:(t)=>(ke(t.path)?x({channel:p,v:d,type:"request",id:c(u),payload:t}):fr()).then((r)=>{if(!Ie(r))throw new l("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(ke(t.path)?x({channel:p,v:d,type:"service-request",id:c(u),payload:t}):fr()).then((r)=>{if(!Ie(r))throw new l("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>x({channel:p,v:d,type:"service-status",id:c(u)}).then((t)=>{if(!ct(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(J(t)?x({channel:p,v:d,type:"file-read",id:c(u),payload:{path:t}}):Pe()).then((r)=>{if(!pt(r))throw new l("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!J(t))return Pe();if(r.length>Oe)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Oe} characters.`));return x({channel:p,v:d,type:"file-write",id:c(u),payload:{path:t,content:r}}).then((s)=>{if(!dt(s))throw new l("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(J(t)?x({channel:p,v:d,type:"file-list",id:c(u),payload:{path:t}}):Pe()).then((r)=>{if(!St(r))throw new l("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(J(t)?x({channel:p,v:d,type:"file-stat",id:c(u),payload:{path:t}}):Pe()).then((r)=>{if(!gt(r))throw new l("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),s=t.system?.trim();if(r.length===0||r.length>Ae)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ae} characters.`));if(s!==void 0&&(s.length===0||s.length>Ce))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ce} characters.`));let n=t.maxOutputTokens===void 0?void 0:Math.min(st,Math.max(1,Math.floor(t.maxOutputTokens)));if(n!==void 0&&!Number.isFinite(n))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let m={prompt:r};if(s!==void 0)m.system=s;if(n!==void 0)m.maxOutputTokens=n;return x({channel:p,v:d,type:"generate",id:c(u),payload:m},e.requestTimeoutMs??nt).then((g)=>{if(!mt(g))throw new l("HOST_REJECTED","Host did not return generated text.");return g})},onLateGenerateResult:(t)=>{q.add(t);for(let r of Fe.splice(0))_([t],r);return Pt(),()=>{q.delete(t)}},setBadge:(t)=>y({channel:p,v:d,type:"badge",id:c(u),payload:{count:lt(t)}}),setHeight:(t)=>y({channel:p,v:d,type:"resize",id:c(u),payload:{height:ut(t)}}),onFileOpen:(t)=>{if(ge.add(t),!Be)Be=!0,o.addEventListener("keydown",wt,!0);if(ne)t(ne);return()=>{ge.delete(t)}},onFileSnapshot:(t)=>(se=t,()=>{if(se===t)se=null}),onFileSaved:(t)=>(me.add(t),()=>{me.delete(t)}),reportFileChange:(t)=>Ve({...R,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Gt,reportFileUnsupported:()=>Ve({...R,type:"file-unsupported"}),dispose:()=>{for(let t of K.keys())M({...R,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:t}});K.clear();for(let t of j.keys())M({...R,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:t}});if(j.clear(),N=!0,re=null,oe=null,se=null,ge.clear(),me.clear(),Be)o.removeEventListener("keydown",wt,!0);o.removeEventListener("message",Mt),o.removeEventListener("keydown",Ut,!0),o.removeEventListener("pointerover",_e),o.removeEventListener("pointermove",_e),o.removeEventListener("pointerout",Nt),o.removeEventListener("focus",Lt),o.removeEventListener("blur",Dt);for(let t of W.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));W.clear(),S.clear(),b.clear(),P.clear(),A.clear(),w.clear(),B.clear(),te.clear(),ce.clear(),pe.clear(),de.clear(),Se.clear(),q.clear(),Fe.length=0}}};var yr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ho=new Set(yr);var Rr=["none","agent","user"];var bo=new Set(Rr);var Dr=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Hr=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],hr=(e,o)=>{o.style.colorScheme=e.mode;for(let[a,v]of Dr)o.style.setProperty(a,e.tokens[v]);for(let[a,v,S]of Hr){let b=e.tokens[S]??"";o.style.setProperty(a,b),o.style.setProperty(v,b)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Tt=(e,o)=>{if(hr(e.theme,o),o.dataset)o.dataset.mgSurface=e.surface,o.dataset.mgTheme=e.theme.mode};var Fr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},E=(e,o)=>`var(--${e}, var(--mg-${Fr[e]}, ${o}))`,H=E("surface-background","transparent"),we=E("surface-elevated","transparent"),Y=E("surface-elevated-foreground","inherit"),G=E("surface-foreground","inherit"),T=E("surface-muted-foreground","gray"),Br=E("surface-muted","transparent"),V=E("interactive-border","currentColor"),C=E("interactive-hover","transparent"),X=E("interactive-active","transparent"),ft=E("interactive-selection","transparent"),yt=E("interactive-selection-foreground","inherit"),D=E("primary","currentColor"),Rt=E("primary-text","inherit"),ht=E("error-text","inherit"),Vr=E("font-sans","inherit"),vt=E("font-mono","monospace"),Or=E("radius","9px"),bt=`calc(${Or} - 2px)`,vr=`calc(${Or} - 4px)`,f=(e,o,a="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${a})`,br=`background-image: linear-gradient(${C}, ${C});`,xt=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--mg-sdk-field-lift);`,Ot="border-color: var(--mg-sdk-edge); box-shadow: var(--mg-sdk-raised-lift);",xr="box-shadow: var(--mg-sdk-lit);",At=`inset 0 0.5px 0 0 ${f(G,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Xr=`
:root {
  --mg-sdk-edge: ${f(G,16)};
  --mg-sdk-field-bg: ${we};
  --mg-sdk-raised-bg: ${H};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.14);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${f(G,14)};
  --mg-sdk-field-bg: ${f(H,50,we)};
  --mg-sdk-raised-bg: ${we};
  --mg-sdk-field-lift: ${At};
  --mg-sdk-raised-lift: ${At};
  --mg-sdk-lit: ${At};
  --mg-sdk-float-edge: rgb(0 0 0 / 0.55);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ge=(e)=>{let o=E(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${o}; --mg-sdk-tone-text: ${E(`${e}-text`,"inherit")}; }`},qr=`
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
`,Ar=`${Xr}
.mg-sdk { color: ${G}; font-family: ${Vr}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${br} }
.mg-sdk-mono { font-family: ${vt}; }
.mg-sdk-muted { color: ${T}; }
${Ge("success")}${Ge("warning")}${Ge("error")}${Ge("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${D}; --mg-sdk-tone-text: ${Rt}; }

.mg-sdk-btn { border-radius: ${bt}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${vr}; }
.mg-sdk-btn[data-variant="default"] { color: ${Rt}; background: ${f(D,10,H)}; border-color: ${f(D,12)}; ${xr} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${f(D,16,H)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${f(D,22,H)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${Br}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${C}, ${C}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${X}, ${X}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${Y}; ${Ot} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${C}, ${C}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${X}, ${X}); box-shadow: none; }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${C}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${X}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${E("status-error","red")}; color: ${ht}; background: ${f("var(--mg-sdk-tone)",7,H)}; border-color: ${f("var(--mg-sdk-tone)",12)}; ${xr} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${f("var(--mg-sdk-tone)",9,H)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${f("var(--mg-sdk-tone)",11,H)}; box-shadow: none; }

.mg-sdk-field-note { color: ${T}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${ht}; }
.mg-sdk-input { border-radius: ${bt}; background: var(--mg-sdk-field-bg); color: ${Y}; ${xt("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${T}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${C}, ${C}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${xt(f(G,26),"1px")} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${xt(E("status-error","red"),"1px")} }
.mg-sdk-input[data-mono="true"] { font-family: ${vt}; }

.mg-sdk-search-icon { color: ${T}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${D}; }
.mg-sdk-search-clear { border-radius: ${vr}; color: ${T}; }
.mg-sdk-search-clear:hover { background: ${C}; color: ${G}; }

.mg-sdk-trigger { border-radius: ${bt}; background: var(--mg-sdk-raised-bg); color: ${Y}; ${Ot} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${C}, ${C}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${X}, ${X}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${T}; }
.mg-sdk-trigger-chevron { color: ${T}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.mg-sdk-popup { --surface-foreground: ${Y}; border-color: var(--mg-sdk-float-edge); border-radius: 12px; background: ${we}; background-clip: padding-box; color: ${Y}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${C}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ft}; color: ${yt}; }
.mg-sdk-option-check { color: ${G}; }
.mg-sdk-option[data-destructive="true"] { color: ${ht}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${f(E("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${T}; }
.mg-sdk-popup-empty { color: ${T}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${V}; border-radius: 4px; color: ${G}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${f(G,60,V)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${V}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${H}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${D}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${br} }
.mg-sdk-check-desc { color: ${T}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${f(G,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${T}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${G}; }
.mg-sdk-tab[aria-selected="true"] { color: ${yt}; background: ${ft}; border-color: ${V}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${Y}; background: var(--mg-sdk-raised-bg); ${Ot} }
.mg-sdk-tab-count { color: ${T}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.mg-sdk-badge { border-radius: 9999px; background: ${f(G,6)}; color: ${T}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${f("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${C}; }
.mg-sdk-row[aria-selected="true"] { background: ${ft}; color: ${yt}; }
.mg-sdk-row-lead { font-family: ${vt}; color: ${T}; }
.mg-sdk-row-sub { color: ${T}; }
.mg-sdk-row-meta { color: ${T}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${T}; }

.mg-sdk-empty-body { color: ${T}; }

.mg-sdk-spinner { color: ${T}; }
.mg-sdk-spinner-ring { border-color: ${V}; border-top-color: ${D}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${f("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${T}; }

.mg-sdk-separator { color: ${T}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${f(V,40)}; }

.mg-sdk-progress-label { color: ${T}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.mg-sdk-progress-track { border-radius: 9999px; background: ${f(G,6)}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${D}); }
.mg-sdk-progress-track[aria-valuenow="100"] > .mg-sdk-progress-fill:not([data-tone]) { background: ${E("status-success","currentColor")}; }
.mg-sdk-progress[data-done="true"] .mg-sdk-progress-value { color: ${E("success-text","inherit")}; }

.mg-sdk-text a { color: ${Rt}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${f(V,60)}; }
`,O=`
${We}
${qr}
${Ar}`;var He=_t(),ee=document.querySelector("#root");if(!ee)throw Error("DeskChart: missing root");ee.style.padding="12px";He.onReady((e)=>Tt(e,document.documentElement));He.onBlock(({args:e,answered:o})=>{let a=(e.values??"").split(",").map(Number).filter(Number.isFinite),v=Math.max(1,...a);ee.replaceChildren();let S=document.createElement("div");S.textContent=e.title??"",S.style.font="600 13px var(--mg-font, system-ui)";let b=document.createElement("div");b.style.cssText="display:flex;align-items:flex-end;gap:6px;height:96px;margin-top:8px";for(let A of a){let w=document.createElement("div");w.style.cssText=`flex:1;height:${A/v*100}%;background:currentColor;opacity:.6;border-radius:3px 3px 0 0`,w.title=String(A),b.append(w)}let P=document.createElement("button");P.textContent=o??"Explain this",P.disabled=o!==null,P.addEventListener("click",()=>{He.answerBlock("Explain this chart")}),ee.append(S,b,P)});new ResizeObserver(()=>{He.setHeight(Math.ceil(ee.getBoundingClientRect().height))}).observe(ee);})();
