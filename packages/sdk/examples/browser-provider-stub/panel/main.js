(()=>{var S="magio.sdk",g=1;var qe=`
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
`;function We(e){let o=e.documentElement;if(o.hasAttribute("data-mg-scrollbar-activity"))return;o.setAttribute("data-mg-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(p)=>{let d=p.target===e?o:p.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-mg-scrolling"))d.setAttribute("data-mg-scrolling","");let m=s.get(d);if(m!==void 0)clearTimeout(m);s.set(d,setTimeout(()=>{s.delete(d),d.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Mr=`(${We.toString()})(document);`;var $e=128,Ke=65536;var fe=128;var ye=65536;var Wt=/^[a-z][a-z0-9-]{0,39}$/;var Vt=(e)=>Object(e)===e&&!Array.isArray(e),je=(e,o)=>Object.keys(e).every((s)=>o.includes(s)),Xt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,qt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,$t=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let s of e){if(!Vt(s)||!Wt.test(s.id)||!Xt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(o.has(s.id))return!1;if(o.add(s.id),s.kind==="button"){if(!je(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!je(s,["kind","id","label","value","options","disabled"]))return!1;if(!qt(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let p=new Set;for(let d of s.options){if(!Vt(d)||!je(d,["value","label"])||!qt(d.value)||!Xt(d.label)||p.has(d.value))return!1;p.add(d.value)}if(!p.has(s.value))return!1}return!0};var Kt=["{id}","{segment}","{segments+}"];var lo=new Set(Kt);var jt=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var co=new Set(jt);var Re=20000000,he=256;var ze=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,zt=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==o.bytes[s])return!1;return!0};var Jt=/^[A-Za-z0-9_-]{1,80}$/;var Qt=["left","right","top","bottom"];var Yt=(e,o=0,s={remaining:16000})=>{if(--s.remaining<0||o>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of p)if(!Yt(d,o+1,s))return!1;return!0},Je=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Je);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Je)}return String(e)===e||Number.isFinite(e)},Qe=(e)=>{try{if(String(e.id)!==e.id||!Jt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Qt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Yt(e.data)||!Je(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Ze=2000;var er=["file","directory","other","missing"],et=(e)=>Boolean(e&&"sessionId"in e),tt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var tr=/^[0-9a-f]{7,64}$/i,rt=(e)=>tr.test(e),ve=500,be=32000,rr=16000,or=128,sr=200,nr=2000,ir=16000,ar=80,lr=200,ur=16000;var cr=2000;var ot=20000,xe=1024,Oe=2000000;var Ae=64000,Ce=8000,st=4000;var nt=960000;var pr=999,dr=1e4,ue=500,Sr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],gr=["stopped","starting","ready","failed"],wr=new Set(Sr),mr=(e)=>wr.has(e),Er=(e)=>e&&mr(e)?e:"HOST_REJECTED",Y=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Y);if(Object(e)===e)return Object.values(e).every(Y);return!1},_r=(e)=>Y(e)&&JSON.stringify(e).length<=ur,Zt=(e)=>e?.trim().slice(0,lr)??"",Z=(e)=>{let o=e.id.trim().slice(0,or),s=e.title.trim().slice(0,sr),p=e.url.trim().slice(0,nr),d=e.text?.trim().slice(0,ir),m=e.author?.trim().slice(0,ar),A=e.kind==="pull"?"pull":"issue",y={providerId:e.providerId.trim(),id:o,title:s||o,url:p,kind:A};if(d)y.text=d;if(m)y.author=m;if(A==="pull"){let C=Zt(e.branches?.head),G=Zt(e.branches?.base);if(C&&G)y.branches={head:C,base:G}}if(_r(e.data))y.data=e.data;return y},it=(e)=>{let o=Z(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},at=(e)=>{let o={text:e.text.trim().slice(0,rr)};if(e.send)o.send=!0;return o},lt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(pr,Math.max(0,Math.round(e)))},ut=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(dr,Math.max(0,Math.ceil(e)))};var ee=(e)=>e.length>0&&e.length<=xe&&!e.includes("\x00")&&!e.includes("\\");var ke=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>cr)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Ur=new Set(gr),ct=(e)=>Boolean(e&&"status"in e&&Ur.has(String(e.status))&&!("body"in e)),Ie=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),pt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),dt=(e)=>Boolean(e&&"written"in e&&e.written===!0),St=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Nr=new Set(er),gt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Nr.has(String(e.kind))&&Number.isFinite(e.size)),mt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Lr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Dr=(e)=>Object(e)===e?e:null,Ye=(e)=>String(e)===e&&e.length>0,Hr=(e)=>{if(!Ye(e.id))return null;if(e.ok===!0){let o={channel:S,v:g,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Ye(e.error))return{channel:S,v:g,type:"result",id:e.id,ok:!1,error:e.error,code:Er(Ye(e.code)?e.code:void 0)};return null},Et=(e)=>{let o=Dr(e);if(!o||o.channel!==S||o.v!==g)return null;if(o.type==="result")return Hr(o);if(!Lr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Tr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Fr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var fr=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pe=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${xe} characters without NUL or backslash.`)),Me=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},c=(e)=>(e.value+=1,`mg-${e.value}`),_t=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===o.parent),p=e.requestTimeoutMs??ot,d=new Set,m=new Set,A=new Set,y=new Set,C=new Set,G=new Set,V=new Set,ce=new Set,pe=new Set,de=new Set,Se=new Set,j=new Set,He=[],oe=null,se=null,ge=new Set,me=new Set,ne=null,ie=null,Fe=!1,z=new Map,J=new Map,Q=new Map,D=!1,u={value:0},a=null,H=null,ae=!1,le=!1,It=null,Pt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},w=(t)=>{o.parent.postMessage(t,"*")},Mt=()=>{if(D||o.parent===o||j.size===0||a?.features?.lateGenerateResults!==!0)return;w({channel:S,v:g,type:"generate-late-listen"})},f=(t,r)=>{for(let n of t)try{n(r)}catch(i){console.error(i)}},Gt=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let r=Et(t.data);if(!r)return;if(r.type==="workspace"){let i=J.get(r.payload.subscriptionId);if(i)f([i],r.payload.snapshot);return}if(r.type==="shells"){let i=Q.get(r.payload.subscriptionId);if(i)f([i],r.payload.snapshot);return}if(r.type==="ready"){if(a=r.payload,H=Pt(r.payload.session),f(d,r.payload),f(m,r.payload.directory),f(A,r.payload.session),H)f(y,H);if(f(C,r.payload.connection),f(G,r.payload.settings),f(V,r.payload.item),r.payload.block)f(ce,r.payload.block);Mt();return}if(r.type==="service-event"){f(pe,r.payload);return}if(r.type==="generate-late"){if(j.size===0)He.push(r.payload);else f(j,r.payload);return}if(r.type==="directory"){if(a)a={...a,directory:r.payload.directory};f(m,r.payload.directory);return}if(r.type==="session"){if(a)a={...a,session:r.payload.session};if(!r.payload.session)H=null;else if(H?.sessionId!==r.payload.session.id)H=Pt(r.payload.session);f(A,r.payload.session);return}if(r.type==="session-lifecycle"){H=r.payload,f(y,r.payload);return}if(r.type==="connection"){if(a)a={...a,connection:r.payload.connection};f(C,r.payload.connection);return}if(r.type==="settings"){if(a)a={...a,settings:r.payload.settings};f(G,r.payload.settings);return}if(r.type==="item"){if(a)a={...a,item:r.payload.item};f(V,r.payload.item);return}if(r.type==="status-control-event"){f(de,r.payload);return}if(r.type==="popover-closed"){f(Se,r.payload);return}if(r.type==="action"){let i=(E)=>{if(!D)w({channel:S,v:g,type:"action-result",id:r.id,payload:E})},_=se;if(!_){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>_(r.payload)).then(()=>i({ok:!0}),(E)=>{let O=(E instanceof Error?E.message:String(E)).trim();i({ok:!1,error:(O||"Action failed.").slice(0,ue)})});return}if(r.type==="file-open"){let i=r.payload;if(ie&&zt(ie,i))return;ie=i,f(ge,r.payload);return}if(r.type==="file-saved"){f(me,r.payload.version);return}if(r.type==="file-snapshot"){let i=(O)=>{if(!D)w({channel:S,v:g,type:"file-snapshot-result",id:r.id,payload:O})},_=(O)=>i({error:(O.trim()||"Could not read the edited file.").slice(0,ue)}),E=ne;if(!E){_("This extension does not edit files.");return}Promise.resolve().then(()=>E(r.payload.purpose)).then((O)=>{if(ze(O)>Re){_(`The file is over ${Re} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>he){_(`The snapshot version is over ${he} characters.`);return}i({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>_(O instanceof Error?O.message:String(O)));return}if(r.type==="resolve"){let i=(E)=>{w({channel:S,v:g,type:"resolve-result",id:r.id,payload:E})},_=oe;if(!_){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>_(r.payload)).then((E)=>i({item:E?Z(E):null}),(E)=>{let O=(E instanceof Error?E.message:String(E)).trim();i({error:(O||"Command failed.").slice(0,ue)})});return}let n=z.get(r.id);if(!n)return;if(clearTimeout(n.timer),z.delete(r.id),r.ok){n.resolve(r.payload);return}n.reject(new l(r.code,r.error))};o.addEventListener("message",Gt),w({channel:S,v:g,type:"hello"});let P=(t,r=p)=>{if(D||o.parent===o)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let _=setTimeout(()=>{z.delete(t.id),i(new l("HOST_TIMEOUT","Host did not answer in time."))},r);z.set(t.id,{resolve:n,reject:i,timer:_}),w(t)})},v=(t)=>P(t).then(()=>{return}),x={channel:S,v:g},Be=(t)=>{if(!D&&o.parent!==o)w(t)},wt=()=>Be({...x,type:"file-save"}),Ut=(t)=>{if(!Tr(t)||!Fr(t))return;t.preventDefault(),wt()},Nt=(t)=>{if(!Tr(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),Ft(a.popover.id,"escape").catch(()=>{return})},Ee=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let r=ae||le;if(It===r)return;It=r,Bt(t.id,r).catch(()=>{return})},_e=()=>{if(a?.surface!=="popover"||ae)return;ae=!0,Ee()},Lt=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!ae)return;ae=!1,Ee()},Dt=()=>{if(a?.surface!=="popover"||le)return;le=!0,Ee()},Ht=()=>{if(a?.surface!=="popover"||!le)return;le=!1,Ee()},L=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new l("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Ve=async(t)=>{if(t.kind!=="projects")L(t.projectId);let r=await P({...x,type:"workspace-read",id:c(u),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return r},Xe=async(t,r)=>{if(t.kind!=="projects")L(t.projectId);let n=c(u);J.set(n,r);try{await v({...x,type:"workspace-subscribe",id:c(u),payload:{subscriptionId:n,query:t}})}catch(i){if(J.delete(n),!D)w({...x,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:n}});throw i}return()=>{if(!J.delete(n)||D)return;w({...x,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:n}})}},Pr=async(t,r)=>{if(t.kind==="session")L(t.sessionId);if(t.kind==="project")L(t.projectId);let n=c(u);Q.set(n,r);try{await v({...x,type:"shells-subscribe",id:c(u),payload:{subscriptionId:n,scope:t}})}catch(i){if(Q.delete(n),!D)w({...x,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:n}});throw i}return()=>{if(!Q.delete(n)||D)return;w({...x,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:n}})}},Te=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>$e))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Y(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Ke)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let r=await P({...x,type:"storage",id:c(u),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return r},Ft=(t,r)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):v({...x,type:"popover-close",id:c(u),payload:r?{id:t,reason:r}:{id:t}}),Bt=(t,r)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):v({...x,type:"popover-anchor",id:c(u),payload:{id:t,active:r}});return o.addEventListener("keydown",Nt,!0),o.addEventListener("pointerover",_e),o.addEventListener("pointermove",_e),o.addEventListener("pointerout",Lt),o.addEventListener("focus",Dt),o.addEventListener("blur",Ht),{onAction:(t)=>(se=t,()=>{if(se===t)se=null}),listProjects:async()=>{let t=await Ve({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await Ve({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await Ve({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Xe({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Xe({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")r(n)}),onSessions:(t,r)=>Xe({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")r(n)}),onRunningShells:(t,r)=>Pr(t,r),readShellOutput:async(t,r)=>{L(t,fe);let n=r?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=r?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>ye))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ye}.`);let E=await P({...x,type:"shell-output",id:c(u),payload:{shellId:t,cursor:n,tailBytes:i}});if(!E||typeof E.output!=="string"||!Number.isFinite(E.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return E},stopShell:async(t)=>{if(L(t,fe),(await P({...x,type:"shell-stop",id:c(u),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{L(t),await v({...x,type:"open-session",id:c(u),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let n=Me(r),i={op:"get",key:t};if(n)i.scope=n;let _=await Te(i);return _.op==="get"&&_.found?_.value:void 0},set:async(t,r,n)=>{let i=Me(n),_={op:"set",key:t,value:r};if(i)_.scope=i;await Te(_)},delete:async(t,r)=>{let n=Me(r),i={op:"delete",key:t};if(n)i.scope=n;await Te(i)},keys:async(t)=>{let r=Me(t),n={op:"keys"};if(r)n.scope=r;let i=await Te(n);if(i.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(d.add(t),a)t(a);return()=>{d.delete(t)}},onDirectory:(t)=>{if(m.add(t),a)t(a.directory);return()=>{m.delete(t)}},onSession:(t)=>{if(A.add(t),a)t(a.session);return()=>{A.delete(t)}},onSessionLifecycle:(t)=>{if(y.add(t),H)t(H);return()=>{y.delete(t)}},onConnection:(t)=>{if(C.add(t),a)t(a.connection);return()=>{C.delete(t)}},onSettings:(t)=>{if(G.add(t),a)t(a.settings);return()=>{G.delete(t)}},onItem:(t)=>{if(V.add(t),a)t(a.item);return()=>{V.delete(t)}},onBlock:(t)=>{if(ce.add(t),a?.block)t(a.block);return()=>{ce.delete(t)}},onServiceEvent:(t)=>(pe.add(t),()=>{pe.delete(t)}),onStatusControl:(t)=>(de.add(t),()=>{de.delete(t)}),onPopoverClosed:(t)=>(Se.add(t),()=>{Se.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!$t(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return v({...x,type:"status-controls",id:c(u),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!Qe(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return v({...x,type:"popover-open",id:c(u),payload:t})},closePopover:Ft,setPopoverAnchorActive:Bt,onResolve:(t)=>(oe=t,()=>{if(oe===t)oe=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>ve)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${ve} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>be))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${be} characters.`));return v({channel:S,v:g,type:"toast",id:c(u),payload:{...t,message:r}})},openUrl:(t)=>v({channel:S,v:g,type:"open-url",id:c(u),payload:{url:t}}),openCommit:(t)=>rt(t)?v({channel:S,v:g,type:"open-commit",id:c(u),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>v({channel:S,v:g,type:"block-answer",id:c(u),payload:{text:t.trim().slice(0,Ze)}}),openSurface:(t)=>v({channel:S,v:g,type:"open-surface",id:c(u),payload:{surfaceId:t}}),writeClipboard:(t)=>v({channel:S,v:g,type:"clipboard-write",id:c(u),payload:{text:t}}),compose:(t)=>v({channel:S,v:g,type:"compose",id:c(u),payload:t}),attach:(t)=>v({channel:S,v:g,type:"attach",id:c(u),payload:Z(t)}),startSession:async(t)=>{if(t.projectId!==void 0)L(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")L(r.directory);else{if(r.name!==void 0)L(r.name,200);if(r.baseBranch!==void 0)L(r.baseBranch,200)}let n=await P({channel:S,v:g,type:"start-session",id:c(u),payload:it(t)},e.requestTimeoutMs??180000);if(!et(n))throw new l("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>P({channel:S,v:g,type:"prompt",id:c(u),payload:at(t)}).then((r)=>{if(!tt(r))throw new l("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>v({channel:S,v:g,type:"session-link",id:c(u),payload:Z(t)}),close:()=>v({channel:S,v:g,type:"close",id:c(u)}),oauthStart:()=>v({channel:S,v:g,type:"oauth-start",id:c(u)}),oauthDisconnect:()=>v({channel:S,v:g,type:"oauth-disconnect",id:c(u)}),request:(t)=>(ke(t.path)?P({channel:S,v:g,type:"request",id:c(u),payload:t}):fr()).then((r)=>{if(!Ie(r))throw new l("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(ke(t.path)?P({channel:S,v:g,type:"service-request",id:c(u),payload:t}):fr()).then((r)=>{if(!Ie(r))throw new l("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>P({channel:S,v:g,type:"service-status",id:c(u)}).then((t)=>{if(!ct(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ee(t)?P({channel:S,v:g,type:"file-read",id:c(u),payload:{path:t}}):Pe()).then((r)=>{if(!pt(r))throw new l("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!ee(t))return Pe();if(r.length>Oe)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Oe} characters.`));return P({channel:S,v:g,type:"file-write",id:c(u),payload:{path:t,content:r}}).then((n)=>{if(!dt(n))throw new l("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(ee(t)?P({channel:S,v:g,type:"file-list",id:c(u),payload:{path:t}}):Pe()).then((r)=>{if(!St(r))throw new l("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(ee(t)?P({channel:S,v:g,type:"file-stat",id:c(u),payload:{path:t}}):Pe()).then((r)=>{if(!gt(r))throw new l("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),n=t.system?.trim();if(r.length===0||r.length>Ae)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ae} characters.`));if(n!==void 0&&(n.length===0||n.length>Ce))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ce} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(st,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let _={prompt:r};if(n!==void 0)_.system=n;if(i!==void 0)_.maxOutputTokens=i;return P({channel:S,v:g,type:"generate",id:c(u),payload:_},e.requestTimeoutMs??nt).then((E)=>{if(!mt(E))throw new l("HOST_REJECTED","Host did not return generated text.");return E})},onLateGenerateResult:(t)=>{j.add(t);for(let r of He.splice(0))f([t],r);return Mt(),()=>{j.delete(t)}},setBadge:(t)=>v({channel:S,v:g,type:"badge",id:c(u),payload:{count:lt(t)}}),setHeight:(t)=>v({channel:S,v:g,type:"resize",id:c(u),payload:{height:ut(t)}}),onFileOpen:(t)=>{if(ge.add(t),!Fe)Fe=!0,o.addEventListener("keydown",Ut,!0);if(ie)t(ie);return()=>{ge.delete(t)}},onFileSnapshot:(t)=>(ne=t,()=>{if(ne===t)ne=null}),onFileSaved:(t)=>(me.add(t),()=>{me.delete(t)}),reportFileChange:(t)=>Be({...x,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:wt,reportFileUnsupported:()=>Be({...x,type:"file-unsupported"}),dispose:()=>{for(let t of J.keys())w({...x,type:"workspace-unsubscribe",id:c(u),payload:{subscriptionId:t}});J.clear();for(let t of Q.keys())w({...x,type:"shells-unsubscribe",id:c(u),payload:{subscriptionId:t}});if(Q.clear(),D=!0,oe=null,se=null,ne=null,ge.clear(),me.clear(),Fe)o.removeEventListener("keydown",Ut,!0);o.removeEventListener("message",Gt),o.removeEventListener("keydown",Nt,!0),o.removeEventListener("pointerover",_e),o.removeEventListener("pointermove",_e),o.removeEventListener("pointerout",Lt),o.removeEventListener("focus",Dt),o.removeEventListener("blur",Ht);for(let t of z.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));z.clear(),d.clear(),m.clear(),A.clear(),y.clear(),C.clear(),G.clear(),V.clear(),ce.clear(),pe.clear(),de.clear(),Se.clear(),j.clear(),He.length=0}}};var yr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Oo=new Set(yr);var Rr=["none","agent","user"];var Co=new Set(Rr);var Br=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Vr=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],hr=(e,o)=>{o.style.colorScheme=e.mode;for(let[s,p]of Br)o.style.setProperty(s,e.tokens[p]);for(let[s,p,d]of Vr){let m=e.tokens[d]??"";o.style.setProperty(s,m),o.style.setProperty(p,m)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Tt=(e,o)=>{if(hr(e.theme,o),o.dataset)o.dataset.mgSurface=e.surface,o.dataset.mgTheme=e.theme.mode};var Xr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,o)=>`var(--${e}, var(--mg-${Xr[e]}, ${o}))`,B=T("surface-background","transparent"),we=T("surface-elevated","transparent"),te=T("surface-elevated-foreground","inherit"),U=T("surface-foreground","inherit"),R=T("surface-muted-foreground","gray"),qr=T("surface-muted","transparent"),q=T("interactive-border","currentColor"),M=T("interactive-hover","transparent"),W=T("interactive-active","transparent"),ft=T("interactive-selection","transparent"),yt=T("interactive-selection-foreground","inherit"),F=T("primary","currentColor"),Rt=T("primary-text","inherit"),ht=T("error-text","inherit"),Wr=T("font-sans","inherit"),vt=T("font-mono","monospace"),Or=T("radius","9px"),bt=`calc(${Or} - 2px)`,vr=`calc(${Or} - 4px)`,h=(e,o,s="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${s})`,br=`background-image: linear-gradient(${M}, ${M});`,xt=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--mg-sdk-field-lift);`,Ot="border-color: var(--mg-sdk-edge); box-shadow: var(--mg-sdk-raised-lift);",xr="box-shadow: var(--mg-sdk-lit);",At=`inset 0 0.5px 0 0 ${h(U,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,$r=`
:root {
  --mg-sdk-edge: ${h(U,16)};
  --mg-sdk-field-bg: ${we};
  --mg-sdk-raised-bg: ${B};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.14);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${h(U,14)};
  --mg-sdk-field-bg: ${h(B,50,we)};
  --mg-sdk-raised-bg: ${we};
  --mg-sdk-field-lift: ${At};
  --mg-sdk-raised-lift: ${At};
  --mg-sdk-lit: ${At};
  --mg-sdk-float-edge: rgb(0 0 0 / 0.55);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ge=(e)=>{let o=T(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${o}; --mg-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},Kr=`
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
`,Ar=`${$r}
.mg-sdk { color: ${U}; font-family: ${Wr}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${br} }
.mg-sdk-mono { font-family: ${vt}; }
.mg-sdk-muted { color: ${R}; }
${Ge("success")}${Ge("warning")}${Ge("error")}${Ge("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${F}; --mg-sdk-tone-text: ${Rt}; }

.mg-sdk-btn { border-radius: ${bt}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${vr}; }
.mg-sdk-btn[data-variant="default"] { color: ${Rt}; background: ${h(F,10,B)}; border-color: ${h(F,12)}; ${xr} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${h(F,16,B)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${h(F,22,B)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${qr}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${W}, ${W}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${te}; ${Ot} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${W}, ${W}); box-shadow: none; }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${W}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${T("status-error","red")}; color: ${ht}; background: ${h("var(--mg-sdk-tone)",7,B)}; border-color: ${h("var(--mg-sdk-tone)",12)}; ${xr} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${h("var(--mg-sdk-tone)",9,B)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${h("var(--mg-sdk-tone)",11,B)}; box-shadow: none; }

.mg-sdk-field-note { color: ${R}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${ht}; }
.mg-sdk-input { border-radius: ${bt}; background: var(--mg-sdk-field-bg); color: ${te}; ${xt("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${R}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${xt(h(U,26),"1px")} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${xt(T("status-error","red"),"1px")} }
.mg-sdk-input[data-mono="true"] { font-family: ${vt}; }

.mg-sdk-search-icon { color: ${R}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${F}; }
.mg-sdk-search-clear { border-radius: ${vr}; color: ${R}; }
.mg-sdk-search-clear:hover { background: ${M}; color: ${U}; }

.mg-sdk-trigger { border-radius: ${bt}; background: var(--mg-sdk-raised-bg); color: ${te}; ${Ot} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${W}, ${W}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${R}; }
.mg-sdk-trigger-chevron { color: ${R}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.mg-sdk-popup { --surface-foreground: ${te}; border-color: var(--mg-sdk-float-edge); border-radius: 12px; background: ${we}; background-clip: padding-box; color: ${te}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${M}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ft}; color: ${yt}; }
.mg-sdk-option-check { color: ${U}; }
.mg-sdk-option[data-destructive="true"] { color: ${ht}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${h(T("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${R}; }
.mg-sdk-popup-empty { color: ${R}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${q}; border-radius: 4px; color: ${U}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${h(U,60,q)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${q}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${F}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${br} }
.mg-sdk-check-desc { color: ${R}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${h(U,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${R}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${U}; }
.mg-sdk-tab[aria-selected="true"] { color: ${yt}; background: ${ft}; border-color: ${q}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${te}; background: var(--mg-sdk-raised-bg); ${Ot} }
.mg-sdk-tab-count { color: ${R}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.mg-sdk-badge { border-radius: 9999px; background: ${h(U,6)}; color: ${R}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${h("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${M}; }
.mg-sdk-row[aria-selected="true"] { background: ${ft}; color: ${yt}; }
.mg-sdk-row-lead { font-family: ${vt}; color: ${R}; }
.mg-sdk-row-sub { color: ${R}; }
.mg-sdk-row-meta { color: ${R}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${R}; }

.mg-sdk-empty-body { color: ${R}; }

.mg-sdk-spinner { color: ${R}; }
.mg-sdk-spinner-ring { border-color: ${q}; border-top-color: ${F}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${h("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${R}; }

.mg-sdk-separator { color: ${R}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${h(q,40)}; }

.mg-sdk-progress-label { color: ${R}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.mg-sdk-progress-track { border-radius: 9999px; background: ${h(U,6)}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${F}); }
.mg-sdk-progress-track[aria-valuenow="100"] > .mg-sdk-progress-fill:not([data-tone]) { background: ${T("status-success","currentColor")}; }
.mg-sdk-progress[data-done="true"] .mg-sdk-progress-value { color: ${T("success-text","inherit")}; }

.mg-sdk-text a { color: ${Rt}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${h(q,60)}; }
`,k=`
${qe}
${Kr}
${Ar}`;var Cr="mg-sdk-ui-style";var I=(e)=>{let o=document.getElementById(Cr);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}We(document);let s=document.createElement("style");s.id=Cr,s.textContent=e,document.head.appendChild(s)},b=(e,o)=>{let s=document.createElement(e);if(o)s.className=o;return s},X=(e)=>{let o=b("button",e);return o.type="button",o},N=(e,o)=>{let s=o??"";if(e.textContent!==s)e.textContent=s},K=(e,o,s)=>{if(s===void 0||s===null||s==="")e.removeAttribute(o);else if(e.getAttribute(o)!==s)e.setAttribute(o,s)};var jr=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},re=(e,o)=>{I(k);let s=o,p=X("mg-sdk mg-sdk-btn"),d=jr(),m=document.createElement("span");p.append(m),e.append(p);let A=()=>{if(p.dataset.variant=s.variant??"default",p.dataset.size=s.size??"default",p.disabled=Boolean(s.disabled)||Boolean(s.loading),p.dataset.loading=s.loading?"true":"false",p.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&d.parentNode!==p)p.prepend(d);else if(!s.loading&&d.parentNode===p)d.remove();N(m,s.label)},y=()=>{if(s.disabled||s.loading)return;s.onClick()};return p.addEventListener("click",y),A(),{update:(C)=>{s={...s,...C},A()},dispose:()=>{p.removeEventListener("click",y),p.remove()}}};var Ct=(e,o)=>{I(k);let s=o,p=b("label","mg-sdk mg-sdk-field"),d=b("span","mg-sdk-field-label"),m=s.multiline?b("textarea","mg-sdk-input"):b("input","mg-sdk-input"),A=b("span","mg-sdk-field-note");p.append(d,m,A),e.append(p);let y=()=>{if(N(d,s.label),d.hidden=!s.label,m instanceof HTMLInputElement)m.type=s.password?"password":"text";else m.rows=s.rows??3;if(m.value!==s.value)m.value=s.value;m.disabled=Boolean(s.disabled),K(m,"placeholder",s.placeholder),m.dataset.mono=s.mono?"true":"false";let G=Boolean(s.error);p.dataset.invalid=G?"true":"false",m.setAttribute("aria-invalid",G?"true":"false");let V=s.error??s.helper??"";N(A,V),A.hidden=V===""},C=()=>{s.onChange(m.value)};return m.addEventListener("input",C),y(),{update:(G)=>{s={...s,...G},y()},dispose:()=>{m.removeEventListener("input",C),p.remove()}}};var kt=_t(),Ir=document.querySelector("#root");if(!Ir)throw Error("Missing root");var kr=!1;kt.onReady((e)=>{if(Tt(e,document.documentElement),kr)return;kr=!0;let o=document.createElement("div");o.style.cssText="display:flex;align-items:center;gap:8px;height:100%;padding:0 8px;box-sizing:border-box;",Ir.append(o);let s="",p=document.createElement("div");p.style.flex="1",o.append(p);let d=Ct(p,{value:s,placeholder:"https://example.com",mono:!0,onChange:(y)=>{s=y,d.update({value:y})}}),m=re(o,{label:"Go",size:"sm",onClick:()=>{if(!s.trim())return;m.update({loading:!0}),kt.serviceRequest({method:"POST",path:"/navigate",body:JSON.stringify({url:s.trim()})}).then(()=>A()).finally(()=>m.update({loading:!1}))}}),A=async()=>{try{let y=await kt.serviceRequest({method:"GET",path:"/state"}),C=JSON.parse(y.body);if(String(C.url)===C.url&&C.url!==s)s=C.url==="about:blank"?"":C.url,d.update({value:s})}catch{}};A(),setInterval(()=>{A()},2000)});})();
