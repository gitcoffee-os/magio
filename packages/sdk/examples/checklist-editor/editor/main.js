(()=>{var g="magio.sdk",S=1;var ze=`
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
`;function Je(e){let o=e.documentElement;if(o.hasAttribute("data-mg-scrollbar-activity"))return;o.setAttribute("data-mg-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(a)=>{let c=a.target===e?o:a.target;if(!(c instanceof Element))return;if(!c.hasAttribute("data-mg-scrolling"))c.setAttribute("data-mg-scrolling","");let m=s.get(c);if(m!==void 0)clearTimeout(m);s.set(c,setTimeout(()=>{s.delete(c),c.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Fr=`(${Je.toString()})(document);`;var Ye=128,Qe=65536;var he=128;var be=65536;var Yt=/^[a-z][a-z0-9-]{0,39}$/;var Kt=(e)=>Object(e)===e&&!Array.isArray(e),Ze=(e,o)=>Object.keys(e).every((s)=>o.includes(s)),zt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Jt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Qt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let s of e){if(!Kt(s)||!Yt.test(s.id)||!zt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(o.has(s.id))return!1;if(o.add(s.id),s.kind==="button"){if(!Ze(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!Ze(s,["kind","id","label","value","options","disabled"]))return!1;if(!Jt(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let a=new Set;for(let c of s.options){if(!Kt(c)||!Ze(c,["value","label"])||!Jt(c.value)||!zt(c.label)||a.has(c.value))return!1;a.add(c.value)}if(!a.has(s.value))return!1}return!0};var Zt=["{id}","{segment}","{segments+}"];var _o=new Set(Zt);var er=["turn-finished","turn-failed","permission-asked","question-asked"];var yo=new Set(er);var Re=20000000,xe=256;var et=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,tr=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==o.bytes[s])return!1;return!0},ve=(e)=>{let o=e,s=e;return{observe:(a)=>{let c=a!==s;return s=a,{edited:c,dirty:a!==o}},markSaved:(a)=>(o=a,s!==a)}};var rr=/^[A-Za-z0-9_-]{1,80}$/;var or=["left","right","top","bottom"];var sr=(e,o=0,s={remaining:16000})=>{if(--s.remaining<0||o>=32)return!1;if(e===null)return!0;let a=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let c of a)if(!sr(c,o+1,s))return!1;return!0},tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(tt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(tt)}return String(e)===e||Number.isFinite(e)},rt=(e)=>{try{if(String(e.id)!==e.id||!rr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!or.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!sr(e.data)||!tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ir=["file","directory","other","missing"],st=(e)=>Boolean(e&&"sessionId"in e),nt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var ar=/^[0-9a-f]{7,64}$/i,it=(e)=>ar.test(e),Oe=500,ke=32000,lr=16000,ur=128,cr=200,pr=2000,dr=16000,gr=80,Sr=200,mr=16000;var Er=2000;var at=20000,Ae=1024,Ce=2000000;var Pe=64000,Ie=8000,lt=4000;var ut=960000;var Tr=999,_r=1e4,de=500,fr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],yr=["stopped","starting","ready","failed"],Vr=new Set(fr),hr=(e)=>Vr.has(e),br=(e)=>e&&hr(e)?e:"HOST_REJECTED",ee=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ee);if(Object(e)===e)return Object.values(e).every(ee);return!1},Rr=(e)=>ee(e)&&JSON.stringify(e).length<=mr,nr=(e)=>e?.trim().slice(0,Sr)??"",te=(e)=>{let o=e.id.trim().slice(0,ur),s=e.title.trim().slice(0,cr),a=e.url.trim().slice(0,pr),c=e.text?.trim().slice(0,dr),m=e.author?.trim().slice(0,gr),_=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:o,title:s||o,url:a,kind:_};if(c)E.text=c;if(m)E.author=m;if(_==="pull"){let A=nr(e.branches?.head),M=nr(e.branches?.base);if(A&&M)E.branches={head:A,base:M}}if(Rr(e.data))E.data=e.data;return E},ct=(e)=>{let o=te(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},pt=(e)=>{let o={text:e.text.trim().slice(0,lr)};if(e.send)o.send=!0;return o},dt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Tr,Math.max(0,Math.round(e)))},gt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(_r,Math.max(0,Math.ceil(e)))};var re=(e)=>e.length>0&&e.length<=Ae&&!e.includes("\x00")&&!e.includes("\\");var Ge=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Er)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Xr=new Set(yr),St=(e)=>Boolean(e&&"status"in e&&Xr.has(String(e.status))&&!("body"in e)),Me=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),mt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Et=(e)=>Boolean(e&&"written"in e&&e.written===!0),Tt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),qr=new Set(ir),_t=(e)=>Boolean(e&&"kind"in e&&"size"in e&&qr.has(String(e.kind))&&Number.isFinite(e.size)),ft=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),$r=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Wr=(e)=>Object(e)===e?e:null,ot=(e)=>String(e)===e&&e.length>0,jr=(e)=>{if(!ot(e.id))return null;if(e.ok===!0){let o={channel:g,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&ot(e.error))return{channel:g,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:br(ot(e.code)?e.code:void 0)};return null},yt=(e)=>{let o=Wr(e);if(!o||o.channel!==g||o.v!==S)return null;if(o.type==="result")return jr(o);if(!$r.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var xr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Kr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var vr=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),we=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Ae} characters without NUL or backslash.`)),Ue=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},d=(e)=>(e.value+=1,`mg-${e.value}`),ht=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===o.parent),a=e.requestTimeoutMs??at,c=new Set,m=new Set,_=new Set,E=new Set,A=new Set,M=new Set,ne=new Set,Se=new Set,me=new Set,J=new Set,qe=[],ie=null,ae=null,Ee=new Set,Te=new Set,le=null,ue=null,$e=!1,Y=new Map,Q=new Map,Z=new Map,D=!1,p={value:0},u=null,H=null,ce=!1,pe=!1,Nt=null,Lt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},w=(t)=>{o.parent.postMessage(t,"*")},Dt=()=>{if(D||o.parent===o||J.size===0||u?.features?.lateGenerateResults!==!0)return;w({channel:g,v:S,type:"generate-late-listen"})},R=(t,r)=>{for(let n of t)try{n(r)}catch(i){console.error(i)}},Ht=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let r=yt(t.data);if(!r)return;if(r.type==="workspace"){let i=Q.get(r.payload.subscriptionId);if(i)R([i],r.payload.snapshot);return}if(r.type==="shells"){let i=Z.get(r.payload.subscriptionId);if(i)R([i],r.payload.snapshot);return}if(r.type==="ready"){if(u=r.payload,H=Lt(r.payload.session),R(c,r.payload),R(m,r.payload.directory),R(_,r.payload.session),H)R(E,H);R(A,r.payload.connection),R(M,r.payload.settings),R(ne,r.payload.item),Dt();return}if(r.type==="generate-late"){if(J.size===0)qe.push(r.payload);else R(J,r.payload);return}if(r.type==="directory"){if(u)u={...u,directory:r.payload.directory};R(m,r.payload.directory);return}if(r.type==="session"){if(u)u={...u,session:r.payload.session};if(!r.payload.session)H=null;else if(H?.sessionId!==r.payload.session.id)H=Lt(r.payload.session);R(_,r.payload.session);return}if(r.type==="session-lifecycle"){H=r.payload,R(E,r.payload);return}if(r.type==="connection"){if(u)u={...u,connection:r.payload.connection};R(A,r.payload.connection);return}if(r.type==="settings"){if(u)u={...u,settings:r.payload.settings};R(M,r.payload.settings);return}if(r.type==="item"){if(u)u={...u,item:r.payload.item};R(ne,r.payload.item);return}if(r.type==="status-control-event"){R(Se,r.payload);return}if(r.type==="popover-closed"){R(me,r.payload);return}if(r.type==="action"){let i=(T)=>{if(!D)w({channel:g,v:S,type:"action-result",id:r.id,payload:T})},f=ae;if(!f){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(r.payload)).then(()=>i({ok:!0}),(T)=>{let O=(T instanceof Error?T.message:String(T)).trim();i({ok:!1,error:(O||"Action failed.").slice(0,de)})});return}if(r.type==="file-open"){let i=r.payload;if(ue&&tr(ue,i))return;ue=i,R(Ee,r.payload);return}if(r.type==="file-saved"){R(Te,r.payload.version);return}if(r.type==="file-snapshot"){let i=(O)=>{if(!D)w({channel:g,v:S,type:"file-snapshot-result",id:r.id,payload:O})},f=(O)=>i({error:(O.trim()||"Could not read the edited file.").slice(0,de)}),T=le;if(!T){f("This extension does not edit files.");return}Promise.resolve().then(()=>T(r.payload.purpose)).then((O)=>{if(et(O)>Re){f(`The file is over ${Re} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>xe){f(`The snapshot version is over ${xe} characters.`);return}i({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>f(O instanceof Error?O.message:String(O)));return}if(r.type==="resolve"){let i=(T)=>{w({channel:g,v:S,type:"resolve-result",id:r.id,payload:T})},f=ie;if(!f){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(r.payload)).then((T)=>i({item:T?te(T):null}),(T)=>{let O=(T instanceof Error?T.message:String(T)).trim();i({error:(O||"Command failed.").slice(0,de)})});return}let n=Y.get(r.id);if(!n)return;if(clearTimeout(n.timer),Y.delete(r.id),r.ok){n.resolve(r.payload);return}n.reject(new l(r.code,r.error))};o.addEventListener("message",Ht),w({channel:g,v:S,type:"hello"});let I=(t,r=a)=>{if(D||o.parent===o)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let f=setTimeout(()=>{Y.delete(t.id),i(new l("HOST_TIMEOUT","Host did not answer in time."))},r);Y.set(t.id,{resolve:n,reject:i,timer:f}),w(t)})},x=(t)=>I(t).then(()=>{return}),v={channel:g,v:S},We=(t)=>{if(!D&&o.parent!==o)w(t)},Ft=()=>We({...v,type:"file-save"}),Bt=(t)=>{if(!xr(t)||!Kr(t))return;t.preventDefault(),Ft()},Vt=(t)=>{if(!xr(t)||t.key!=="Escape"||u?.surface!=="popover"||!u.popover)return;t.preventDefault(),Wt(u.popover.id,"escape").catch(()=>{return})},_e=()=>{let t=u?.surface==="popover"?u.popover:void 0;if(!t)return;let r=ce||pe;if(Nt===r)return;Nt=r,jt(t.id,r).catch(()=>{return})},fe=()=>{if(u?.surface!=="popover"||ce)return;ce=!0,_e()},Xt=(t)=>{if(u?.surface!=="popover"||t.relatedTarget!==null||!ce)return;ce=!1,_e()},qt=()=>{if(u?.surface!=="popover"||pe)return;pe=!0,_e()},$t=()=>{if(u?.surface!=="popover"||!pe)return;pe=!1,_e()},L=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new l("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},je=async(t)=>{if(t.kind!=="projects")L(t.projectId);let r=await I({...v,type:"workspace-read",id:d(p),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return r},Ke=async(t,r)=>{if(t.kind!=="projects")L(t.projectId);let n=d(p);Q.set(n,r);try{await x({...v,type:"workspace-subscribe",id:d(p),payload:{subscriptionId:n,query:t}})}catch(i){if(Q.delete(n),!D)w({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:n}});throw i}return()=>{if(!Q.delete(n)||D)return;w({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:n}})}},Hr=async(t,r)=>{if(t.kind==="session")L(t.sessionId);if(t.kind==="project")L(t.projectId);let n=d(p);Z.set(n,r);try{await x({...v,type:"shells-subscribe",id:d(p),payload:{subscriptionId:n,scope:t}})}catch(i){if(Z.delete(n),!D)w({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:n}});throw i}return()=>{if(!Z.delete(n)||D)return;w({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:n}})}},ye=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ye))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ee(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Qe)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&u?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let r=await I({...v,type:"storage",id:d(p),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return r},Wt=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):x({...v,type:"popover-close",id:d(p),payload:r?{id:t,reason:r}:{id:t}}),jt=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):x({...v,type:"popover-anchor",id:d(p),payload:{id:t,active:r}});return o.addEventListener("keydown",Vt,!0),o.addEventListener("pointerover",fe),o.addEventListener("pointermove",fe),o.addEventListener("pointerout",Xt),o.addEventListener("focus",qt),o.addEventListener("blur",$t),{onAction:(t)=>(ae=t,()=>{if(ae===t)ae=null}),listProjects:async()=>{let t=await je({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await je({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await je({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Ke({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Ke({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")r(n)}),onSessions:(t,r)=>Ke({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")r(n)}),onRunningShells:(t,r)=>Hr(t,r),readShellOutput:async(t,r)=>{L(t,he);let n=r?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=r?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>be))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${be}.`);let T=await I({...v,type:"shell-output",id:d(p),payload:{shellId:t,cursor:n,tailBytes:i}});if(!T||typeof T.output!=="string"||!Number.isFinite(T.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return T},stopShell:async(t)=>{if(L(t,he),(await I({...v,type:"shell-stop",id:d(p),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{L(t),await x({...v,type:"open-session",id:d(p),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let n=Ue(r),i={op:"get",key:t};if(n)i.scope=n;let f=await ye(i);return f.op==="get"&&f.found?f.value:void 0},set:async(t,r,n)=>{let i=Ue(n),f={op:"set",key:t,value:r};if(i)f.scope=i;await ye(f)},delete:async(t,r)=>{let n=Ue(r),i={op:"delete",key:t};if(n)i.scope=n;await ye(i)},keys:async(t)=>{let r=Ue(t),n={op:"keys"};if(r)n.scope=r;let i=await ye(n);if(i.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(c.add(t),u)t(u);return()=>{c.delete(t)}},onDirectory:(t)=>{if(m.add(t),u)t(u.directory);return()=>{m.delete(t)}},onSession:(t)=>{if(_.add(t),u)t(u.session);return()=>{_.delete(t)}},onSessionLifecycle:(t)=>{if(E.add(t),H)t(H);return()=>{E.delete(t)}},onConnection:(t)=>{if(A.add(t),u)t(u.connection);return()=>{A.delete(t)}},onSettings:(t)=>{if(M.add(t),u)t(u.settings);return()=>{M.delete(t)}},onItem:(t)=>{if(ne.add(t),u)t(u.item);return()=>{ne.delete(t)}},onStatusControl:(t)=>(Se.add(t),()=>{Se.delete(t)}),onPopoverClosed:(t)=>(me.add(t),()=>{me.delete(t)}),setStatusControls:(t)=>{if(u?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!Qt(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return x({...v,type:"status-controls",id:d(p),payload:{controls:t}})},openPopover:(t)=>{if(u?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!rt(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return x({...v,type:"popover-open",id:d(p),payload:t})},closePopover:Wt,setPopoverAnchorActive:jt,onResolve:(t)=>(ie=t,()=>{if(ie===t)ie=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Oe)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${Oe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ke))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${ke} characters.`));return x({channel:g,v:S,type:"toast",id:d(p),payload:{...t,message:r}})},openUrl:(t)=>x({channel:g,v:S,type:"open-url",id:d(p),payload:{url:t}}),openCommit:(t)=>it(t)?x({channel:g,v:S,type:"open-commit",id:d(p),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>x({channel:g,v:S,type:"open-surface",id:d(p),payload:{surfaceId:t}}),writeClipboard:(t)=>x({channel:g,v:S,type:"clipboard-write",id:d(p),payload:{text:t}}),compose:(t)=>x({channel:g,v:S,type:"compose",id:d(p),payload:t}),attach:(t)=>x({channel:g,v:S,type:"attach",id:d(p),payload:te(t)}),startSession:async(t)=>{if(t.projectId!==void 0)L(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")L(r.directory);else{if(r.name!==void 0)L(r.name,200);if(r.baseBranch!==void 0)L(r.baseBranch,200)}let n=await I({channel:g,v:S,type:"start-session",id:d(p),payload:ct(t)},e.requestTimeoutMs??180000);if(!st(n))throw new l("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>I({channel:g,v:S,type:"prompt",id:d(p),payload:pt(t)}).then((r)=>{if(!nt(r))throw new l("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>x({channel:g,v:S,type:"session-link",id:d(p),payload:te(t)}),close:()=>x({channel:g,v:S,type:"close",id:d(p)}),oauthStart:()=>x({channel:g,v:S,type:"oauth-start",id:d(p)}),oauthDisconnect:()=>x({channel:g,v:S,type:"oauth-disconnect",id:d(p)}),request:(t)=>(Ge(t.path)?I({channel:g,v:S,type:"request",id:d(p),payload:t}):vr()).then((r)=>{if(!Me(r))throw new l("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Ge(t.path)?I({channel:g,v:S,type:"service-request",id:d(p),payload:t}):vr()).then((r)=>{if(!Me(r))throw new l("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>I({channel:g,v:S,type:"service-status",id:d(p)}).then((t)=>{if(!St(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(re(t)?I({channel:g,v:S,type:"file-read",id:d(p),payload:{path:t}}):we()).then((r)=>{if(!mt(r))throw new l("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!re(t))return we();if(r.length>Ce)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Ce} characters.`));return I({channel:g,v:S,type:"file-write",id:d(p),payload:{path:t,content:r}}).then((n)=>{if(!Et(n))throw new l("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(re(t)?I({channel:g,v:S,type:"file-list",id:d(p),payload:{path:t}}):we()).then((r)=>{if(!Tt(r))throw new l("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(re(t)?I({channel:g,v:S,type:"file-stat",id:d(p),payload:{path:t}}):we()).then((r)=>{if(!_t(r))throw new l("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),n=t.system?.trim();if(r.length===0||r.length>Pe)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Pe} characters.`));if(n!==void 0&&(n.length===0||n.length>Ie))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ie} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(lt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:r};if(n!==void 0)f.system=n;if(i!==void 0)f.maxOutputTokens=i;return I({channel:g,v:S,type:"generate",id:d(p),payload:f},e.requestTimeoutMs??ut).then((T)=>{if(!ft(T))throw new l("HOST_REJECTED","Host did not return generated text.");return T})},onLateGenerateResult:(t)=>{J.add(t);for(let r of qe.splice(0))R([t],r);return Dt(),()=>{J.delete(t)}},setBadge:(t)=>x({channel:g,v:S,type:"badge",id:d(p),payload:{count:dt(t)}}),setHeight:(t)=>x({channel:g,v:S,type:"resize",id:d(p),payload:{height:gt(t)}}),onFileOpen:(t)=>{if(Ee.add(t),!$e)$e=!0,o.addEventListener("keydown",Bt,!0);if(ue)t(ue);return()=>{Ee.delete(t)}},onFileSnapshot:(t)=>(le=t,()=>{if(le===t)le=null}),onFileSaved:(t)=>(Te.add(t),()=>{Te.delete(t)}),reportFileChange:(t)=>We({...v,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Ft,reportFileUnsupported:()=>We({...v,type:"file-unsupported"}),dispose:()=>{for(let t of Q.keys())w({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:t}});Q.clear();for(let t of Z.keys())w({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:t}});if(Z.clear(),D=!0,ie=null,ae=null,le=null,Ee.clear(),Te.clear(),$e)o.removeEventListener("keydown",Bt,!0);o.removeEventListener("message",Ht),o.removeEventListener("keydown",Vt,!0),o.removeEventListener("pointerover",fe),o.removeEventListener("pointermove",fe),o.removeEventListener("pointerout",Xt),o.removeEventListener("focus",qt),o.removeEventListener("blur",$t);for(let t of Y.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),c.clear(),m.clear(),_.clear(),E.clear(),A.clear(),M.clear(),ne.clear(),Se.clear(),me.clear(),J.clear(),qe.length=0}}};var Or=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var wo=new Set(Or);var kr=["none","agent","user"];var No=new Set(kr);var zr=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Jr=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],Ar=(e,o)=>{o.style.colorScheme=e.mode;for(let[s,a]of zr)o.style.setProperty(s,e.tokens[a]);for(let[s,a,c]of Jr){let m=e.tokens[c]??"";o.style.setProperty(s,m),o.style.setProperty(a,m)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},bt=(e,o)=>{if(Ar(e.theme,o),o.dataset)o.dataset.mgSurface=e.surface,o.dataset.mgTheme=e.theme.mode};var Yr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},y=(e,o)=>`var(--${e}, var(--mg-${Yr[e]}, ${o}))`,B=y("surface-background","transparent"),Le=y("surface-elevated","transparent"),oe=y("surface-elevated-foreground","inherit"),U=y("surface-foreground","inherit"),h=y("surface-muted-foreground","gray"),Qr=y("surface-muted","transparent"),W=y("interactive-border","currentColor"),G=y("interactive-hover","transparent"),j=y("interactive-active","transparent"),Rt=y("interactive-selection","transparent"),xt=y("interactive-selection-foreground","inherit"),F=y("primary","currentColor"),vt=y("primary-text","inherit"),Ot=y("error-text","inherit"),Zr=y("font-sans","inherit"),kt=y("font-mono","monospace"),Gr=y("radius","9px"),At=`calc(${Gr} - 2px)`,Cr=`calc(${Gr} - 4px)`,b=(e,o,s="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${s})`,Pr=`background-image: linear-gradient(${G}, ${G});`,Ct=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--mg-sdk-field-lift);`,Pt="border-color: var(--mg-sdk-edge); box-shadow: var(--mg-sdk-raised-lift);",Ir="box-shadow: var(--mg-sdk-lit);",It=`inset 0 0.5px 0 0 ${b(U,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,eo=`
:root {
  --mg-sdk-edge: ${b(U,16)};
  --mg-sdk-field-bg: ${Le};
  --mg-sdk-raised-bg: ${B};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.14);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${b(U,14)};
  --mg-sdk-field-bg: ${b(B,50,Le)};
  --mg-sdk-raised-bg: ${Le};
  --mg-sdk-field-lift: ${It};
  --mg-sdk-raised-lift: ${It};
  --mg-sdk-lit: ${It};
  --mg-sdk-float-edge: rgb(0 0 0 / 0.55);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ne=(e)=>{let o=y(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${o}; --mg-sdk-tone-text: ${y(`${e}-text`,"inherit")}; }`},to=`
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
`,Mr=`${eo}
.mg-sdk { color: ${U}; font-family: ${Zr}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${Pr} }
.mg-sdk-mono { font-family: ${kt}; }
.mg-sdk-muted { color: ${h}; }
${Ne("success")}${Ne("warning")}${Ne("error")}${Ne("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${F}; --mg-sdk-tone-text: ${vt}; }

.mg-sdk-btn { border-radius: ${At}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${Cr}; }
.mg-sdk-btn[data-variant="default"] { color: ${vt}; background: ${b(F,10,B)}; border-color: ${b(F,12)}; ${Ir} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${b(F,16,B)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${b(F,22,B)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${Qr}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${G}, ${G}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${oe}; ${Pt} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${G}, ${G}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${G}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${y("status-error","red")}; color: ${Ot}; background: ${b("var(--mg-sdk-tone)",7,B)}; border-color: ${b("var(--mg-sdk-tone)",12)}; ${Ir} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${b("var(--mg-sdk-tone)",9,B)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${b("var(--mg-sdk-tone)",11,B)}; box-shadow: none; }

.mg-sdk-field-note { color: ${h}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${Ot}; }
.mg-sdk-input { border-radius: ${At}; background: var(--mg-sdk-field-bg); color: ${oe}; ${Ct("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${h}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${G}, ${G}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${Ct(b(U,26),"1px")} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${Ct(y("status-error","red"),"1px")} }
.mg-sdk-input[data-mono="true"] { font-family: ${kt}; }

.mg-sdk-search-icon { color: ${h}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${F}; }
.mg-sdk-search-clear { border-radius: ${Cr}; color: ${h}; }
.mg-sdk-search-clear:hover { background: ${G}; color: ${U}; }

.mg-sdk-trigger { border-radius: ${At}; background: var(--mg-sdk-raised-bg); color: ${oe}; ${Pt} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${G}, ${G}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${h}; }
.mg-sdk-trigger-chevron { color: ${h}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.mg-sdk-popup { --surface-foreground: ${oe}; border-color: var(--mg-sdk-float-edge); border-radius: 12px; background: ${Le}; background-clip: padding-box; color: ${oe}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${G}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Rt}; color: ${xt}; }
.mg-sdk-option-check { color: ${U}; }
.mg-sdk-option[data-destructive="true"] { color: ${Ot}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${b(y("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${h}; }
.mg-sdk-popup-empty { color: ${h}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${W}; border-radius: 4px; color: ${U}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${b(U,60,W)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${W}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${F}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${Pr} }
.mg-sdk-check-desc { color: ${h}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${b(U,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${h}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${U}; }
.mg-sdk-tab[aria-selected="true"] { color: ${xt}; background: ${Rt}; border-color: ${W}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${oe}; background: var(--mg-sdk-raised-bg); ${Pt} }
.mg-sdk-tab-count { color: ${h}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.mg-sdk-badge { border-radius: 9999px; background: ${b(U,6)}; color: ${h}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${b("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${G}; }
.mg-sdk-row[aria-selected="true"] { background: ${Rt}; color: ${xt}; }
.mg-sdk-row-lead { font-family: ${kt}; color: ${h}; }
.mg-sdk-row-sub { color: ${h}; }
.mg-sdk-row-meta { color: ${h}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${h}; }

.mg-sdk-empty-body { color: ${h}; }

.mg-sdk-spinner { color: ${h}; }
.mg-sdk-spinner-ring { border-color: ${W}; border-top-color: ${F}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${b("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${h}; }

.mg-sdk-separator { color: ${h}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${b(W,40)}; }

.mg-sdk-progress-label { color: ${h}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.mg-sdk-progress-track { border-radius: 9999px; background: ${b(U,6)}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${F}); }
.mg-sdk-progress-track[aria-valuenow="100"] > .mg-sdk-progress-fill:not([data-tone]) { background: ${y("status-success","currentColor")}; }
.mg-sdk-progress[data-done="true"] .mg-sdk-progress-value { color: ${y("success-text","inherit")}; }

.mg-sdk-text a { color: ${vt}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${b(W,60)}; }
`,C=`
${ze}
${to}
${Mr}`;var wr="mg-sdk-ui-style";var P=(e)=>{let o=document.getElementById(wr);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}Je(document);let s=document.createElement("style");s.id=wr,s.textContent=e,document.head.appendChild(s)},k=(e,o)=>{let s=document.createElement(e);if(o)s.className=o;return s},V=(e)=>{let o=k("button",e);return o.type="button",o},N=(e,o)=>{let s=o??"";if(e.textContent!==s)e.textContent=s};var ro=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},X=(e,o)=>{P(C);let s=o,a=V("mg-sdk mg-sdk-btn"),c=ro(),m=document.createElement("span");a.append(m),e.append(a);let _=()=>{if(a.dataset.variant=s.variant??"default",a.dataset.size=s.size??"default",a.disabled=Boolean(s.disabled)||Boolean(s.loading),a.dataset.loading=s.loading?"true":"false",a.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&c.parentNode!==a)a.prepend(c);else if(!s.loading&&c.parentNode===a)c.remove();N(m,s.label)},E=()=>{if(s.disabled||s.loading)return;s.onClick()};return a.addEventListener("click",E),_(),{update:(A)=>{s={...s,...A},_()},dispose:()=>{a.removeEventListener("click",E),a.remove()}}};var Gt=(e,o)=>{P(C);let s=o,a=k("div","mg-sdk mg-sdk-empty"),c=k("h2","mg-sdk-empty-title"),m=k("p","mg-sdk-empty-body"),_=k("div","mg-sdk-empty-action");a.append(c,m,_),e.append(a);let E=null,A=()=>{if(N(c,s.title),N(m,s.body),m.hidden=!s.body,_.hidden=!s.action,!s.action){E?.dispose(),E=null;return}let M={label:s.action.label,onClick:s.action.onClick};if(E)E.update(M);else E=X(_,{...M,variant:"outline",size:"sm"})};return A(),{update:(M)=>{s={...s,...M},A()},dispose:()=>{E?.dispose(),E=null,a.remove()}}};var ao=/^(\s*[-*+] )\[( |x|X)\] ?(.*)$/,Ur=(e)=>e.split(`
`).map((o)=>{let s=ao.exec(o);return s?{kind:"item",prefix:s[1]??"- ",done:s[2]!==" ",text:s[3]??""}:{kind:"text",text:o}}),Nr=(e)=>e.map((o)=>o.kind==="text"?o.text:`${o.prefix}[${o.done?"x":" "}] ${o.text}`).join(`
`),Ve=(e)=>{let o=2166136261;for(let s=0;s<e.length;s+=1)o^=e.charCodeAt(s),o=Math.imul(o,16777619);return`${e.length}:${(o>>>0).toString(16)}`},Lr=(e,o)=>{let s=-1,a="- ";e.forEach((E,A)=>{if(E.kind!=="item")return;s=A,a=E.prefix});let c={kind:"item",prefix:a,done:!1,text:o};if(s>=0)return[...e.slice(0,s+1),c,...e.slice(s+1)];return[...e.at(-1)?.kind==="text"&&e.at(-1)?.text===""?e.slice(0,-1):[...e],c,{kind:"text",text:""}]};var z=ht(),K=document.querySelector("#root");if(!K)throw Error("Missing root");var Dr=document.createElement("style");Dr.textContent=`
  html, body { margin: 0; height: 100%; background: var(--mg-bg); color: var(--mg-fg); font-family: var(--mg-font); font-size: 13px; }
  #root { box-sizing: border-box; height: 100%; overflow: auto; padding: 16px 20px; }
  .note { margin: 2px 0; color: var(--mg-muted); white-space: pre-wrap; min-height: 1em; }
  .item { display: flex; align-items: center; gap: 8px; margin: 2px 0; }
  .item input[type="checkbox"] { width: 16px; height: 16px; margin: 0; accent-color: var(--mg-primary); }
  .item input[type="text"] { flex: 1; min-width: 0; border: 1px solid transparent; border-radius: var(--mg-radius); padding: 4px 6px;
    background: transparent; color: inherit; font: inherit; }
  .item input[type="text"]:hover { border-color: var(--mg-border); }
  .item input[type="text"]:focus { outline: none; border-color: var(--mg-focus); background: var(--mg-elevated); }
  .item.done input[type="text"] { color: var(--mg-muted); text-decoration: line-through; }
  .item .remove { visibility: hidden; }
  .item:hover .remove, .item:focus-within .remove { visibility: visible; }
  .actions { margin-top: 12px; }
`;document.head.append(Dr);z.onReady((e)=>bt(e,document.documentElement));var q=[],se=!1,wt=ve(null),Ut=()=>Nr(q),Xe=()=>{z.reportFileChange(wt.observe(Ve(Ut())))},Mt=()=>{if(K.replaceChildren(),!q.some((o)=>o.kind==="item")&&se){Gt(K,{title:"No items",body:"This checklist is empty."});return}if(q.forEach((o,s)=>{if(o.kind==="text"){let _=document.createElement("p");_.className="note",_.textContent=o.text,K.append(_);return}let a=document.createElement("div");a.className=o.done?"item done":"item";let c=document.createElement("input");c.type="checkbox",c.checked=o.done,c.disabled=se,c.addEventListener("change",()=>{o.done=c.checked,a.className=o.done?"item done":"item",Xe()});let m=document.createElement("input");if(m.type="text",m.value=o.text,m.readOnly=se,m.setAttribute("aria-label","Item"),m.addEventListener("input",()=>{o.text=m.value,Xe()}),a.append(c,m),!se){let _=document.createElement("span");_.className="remove",X(_,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>{q=q.filter((E,A)=>A!==s),Xe(),Mt()}}),a.append(_)}K.append(a)}),se)return;let e=document.createElement("div");e.className="actions",X(e,{label:"Add item",variant:"secondary",size:"sm",onClick:()=>{q=Lr(q,""),Xe(),Mt();let o=K.querySelectorAll('.item input[type="text"]');o.item(o.length-1)?.focus()}}),K.append(e)};z.onFileOpen((e)=>{if(e.encoding!=="text"){z.reportFileUnsupported();return}q=Ur(e.content),se=e.readOnly,wt=ve(Ve(Ut())),Mt()});z.onFileSnapshot(()=>{let e=Ut();return{content:e,version:Ve(e)}});z.onFileSaved((e)=>{z.reportFileChange({dirty:wt.markSaved(e),edited:!1})});})();
