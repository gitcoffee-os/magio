(()=>{var g="magio.sdk",m=1;var je=`
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
`;function Ke(e){let o=e.documentElement;if(o.hasAttribute("data-mg-scrollbar-activity"))return;o.setAttribute("data-mg-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",(a)=>{let u=a.target===e?o:a.target;if(!(u instanceof Element))return;if(!u.hasAttribute("data-mg-scrolling"))u.setAttribute("data-mg-scrolling","");let S=r.get(u);if(S!==void 0)clearTimeout(S);r.set(u,setTimeout(()=>{r.delete(u),u.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Fs=`(${Ke.toString()})(document);`;var Je=128,Ye=65536;var xe=128;var be=65536;var Jt=/^[a-z][a-z0-9-]{0,39}$/;var zt=(e)=>Object(e)===e&&!Array.isArray(e),Qe=(e,o)=>Object.keys(e).every((r)=>o.includes(r)),jt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Kt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Yt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let r of e){if(!zt(r)||!Jt.test(r.id)||!jt(r.label))return!1;if(r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1)return!1;if(o.has(r.id))return!1;if(o.add(r.id),r.kind==="button"){if(!Qe(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!Qe(r,["kind","id","label","value","options","disabled"]))return!1;if(!Kt(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let a=new Set;for(let u of r.options){if(!zt(u)||!Qe(u,["value","label"])||!Kt(u.value)||!jt(u.label)||a.has(u.value))return!1;a.add(u.value)}if(!a.has(r.value))return!1}return!0};var Te=20000000,ve=256;var Ze=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Qt=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==o.bytes[r])return!1;return!0},_e=(e)=>{let o=e,r=e;return{observe:(a)=>{let u=a!==r;return r=a,{edited:u,dirty:a!==o}},markSaved:(a)=>(o=a,r!==a)}};var Zt=/^[A-Za-z0-9_-]{1,80}$/;var es=["left","right","top","bottom"];var ts=(e,o=0,r={remaining:16000})=>{if(--r.remaining<0||o>=32)return!1;if(e===null)return!0;let a=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let u of a)if(!ts(u,o+1,r))return!1;return!0},et=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(et);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(et)}return String(e)===e||Number.isFinite(e)},tt=(e)=>{try{if(String(e.id)!==e.id||!Zt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!es.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ts(e.data)||!et(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var os=["file","directory","other","missing"],ot=(e)=>Boolean(e&&"sessionId"in e),rt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var rs=/^[0-9a-f]{7,64}$/i,nt=(e)=>rs.test(e),ke=500,Ae=32000,ns=16000,is=128,as=200,ls=2000,ps=16000,us=80,ds=200,cs=16000;var gs=2000;var it=20000,Ge=1024,Re=2000000;var Ce=64000,Oe=8000,at=4000;var lt=960000;var ms=999,Ss=1e4,ce=500,fs=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Es=["stopped","starting","ready","failed"],Ns=new Set(fs),ys=(e)=>Ns.has(e),hs=(e)=>e&&ys(e)?e:"HOST_REJECTED",ee=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ee);if(Object(e)===e)return Object.values(e).every(ee);return!1},xs=(e)=>ee(e)&&JSON.stringify(e).length<=cs,ss=(e)=>e?.trim().slice(0,ds)??"",te=(e)=>{let o=e.id.trim().slice(0,is),r=e.title.trim().slice(0,as),a=e.url.trim().slice(0,ls),u=e.text?.trim().slice(0,ps),S=e.author?.trim().slice(0,us),y=e.kind==="pull"?"pull":"issue",f={providerId:e.providerId.trim(),id:o,title:r||o,url:a,kind:y};if(u)f.text=u;if(S)f.author=S;if(y==="pull"){let R=ss(e.branches?.head),w=ss(e.branches?.base);if(R&&w)f.branches={head:R,base:w}}if(xs(e.data))f.data=e.data;return f},pt=(e)=>{let o=te(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},ut=(e)=>{let o={text:e.text.trim().slice(0,ns)};if(e.send)o.send=!0;return o},dt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ms,Math.max(0,Math.round(e)))},ct=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Ss,Math.max(0,Math.ceil(e)))};var se=(e)=>e.length>0&&e.length<=Ge&&!e.includes("\x00")&&!e.includes("\\");var Pe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>gs)return!1;return!e.split("/").some((r)=>r==="."||r==="..")},Ds=new Set(Es),gt=(e)=>Boolean(e&&"status"in e&&Ds.has(String(e.status))&&!("body"in e)),Me=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),mt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),St=(e)=>Boolean(e&&"written"in e&&e.written===!0),ft=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Bs=new Set(os),Et=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Bs.has(String(e.kind))&&Number.isFinite(e.size)),yt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),$s=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Xs=(e)=>Object(e)===e?e:null,st=(e)=>String(e)===e&&e.length>0,Vs=(e)=>{if(!st(e.id))return null;if(e.ok===!0){let o={channel:g,v:m,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&st(e.error))return{channel:g,v:m,type:"result",id:e.id,ok:!1,error:e.error,code:hs(st(e.code)?e.code:void 0)};return null},ht=(e)=>{let o=Xs(e);if(!o||o.channel!==g||o.v!==m)return null;if(o.type==="result")return Vs(o);if(!$s.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var bs=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Ws=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Ts=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),we=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Ge} characters without NUL or backslash.`)),Ie=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},c=(e)=>(e.value+=1,`mg-${e.value}`),xt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??((t)=>t===o.parent),a=e.requestTimeoutMs??it,u=new Set,S=new Set,y=new Set,f=new Set,R=new Set,w=new Set,ne=new Set,ge=new Set,me=new Set,J=new Set,Xe=[],ie=null,ae=null,Se=new Set,fe=new Set,le=null,pe=null,Ve=!1,Y=new Map,Q=new Map,Z=new Map,F=!1,d={value:0},p=null,N=null,ue=!1,de=!1,Lt=null,Ut=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},I=(t)=>{o.parent.postMessage(t,"*")},Ht=()=>{if(F||o.parent===o||J.size===0||p?.features?.lateGenerateResults!==!0)return;I({channel:g,v:m,type:"generate-late-listen"})},T=(t,s)=>{for(let n of t)try{n(s)}catch(i){console.error(i)}},Ft=(t)=>{if(!(t instanceof MessageEvent))return;if(!r(t.source))return;let s=ht(t.data);if(!s)return;if(s.type==="workspace"){let i=Q.get(s.payload.subscriptionId);if(i)T([i],s.payload.snapshot);return}if(s.type==="shells"){let i=Z.get(s.payload.subscriptionId);if(i)T([i],s.payload.snapshot);return}if(s.type==="ready"){if(p=s.payload,N=Ut(s.payload.session),T(u,s.payload),T(S,s.payload.directory),T(y,s.payload.session),N)T(f,N);T(R,s.payload.connection),T(w,s.payload.settings),T(ne,s.payload.item),Ht();return}if(s.type==="generate-late"){if(J.size===0)Xe.push(s.payload);else T(J,s.payload);return}if(s.type==="directory"){if(p)p={...p,directory:s.payload.directory};T(S,s.payload.directory);return}if(s.type==="session"){if(p)p={...p,session:s.payload.session};if(!s.payload.session)N=null;else if(N?.sessionId!==s.payload.session.id)N=Ut(s.payload.session);T(y,s.payload.session);return}if(s.type==="session-lifecycle"){N=s.payload,T(f,s.payload);return}if(s.type==="connection"){if(p)p={...p,connection:s.payload.connection};T(R,s.payload.connection);return}if(s.type==="settings"){if(p)p={...p,settings:s.payload.settings};T(w,s.payload.settings);return}if(s.type==="item"){if(p)p={...p,item:s.payload.item};T(ne,s.payload.item);return}if(s.type==="status-control-event"){T(ge,s.payload);return}if(s.type==="popover-closed"){T(me,s.payload);return}if(s.type==="action"){let i=(E)=>{if(!F)I({channel:g,v:m,type:"action-result",id:s.id,payload:E})},h=ae;if(!h){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>h(s.payload)).then(()=>i({ok:!0}),(E)=>{let A=(E instanceof Error?E.message:String(E)).trim();i({ok:!1,error:(A||"Action failed.").slice(0,ce)})});return}if(s.type==="file-open"){let i=s.payload;if(pe&&Qt(pe,i))return;pe=i,T(Se,s.payload);return}if(s.type==="file-saved"){T(fe,s.payload.version);return}if(s.type==="file-snapshot"){let i=(A)=>{if(!F)I({channel:g,v:m,type:"file-snapshot-result",id:s.id,payload:A})},h=(A)=>i({error:(A.trim()||"Could not read the edited file.").slice(0,ce)}),E=le;if(!E){h("This extension does not edit files.");return}Promise.resolve().then(()=>E(s.payload.purpose)).then((A)=>{if(Ze(A)>Te){h(`The file is over ${Te} ${"bytes"in A?"bytes":"characters"}.`);return}if(A.version.length>ve){h(`The snapshot version is over ${ve} characters.`);return}i({snapshot:"bytes"in A?{bytes:A.bytes,version:A.version}:{content:A.content,version:A.version}})},(A)=>h(A instanceof Error?A.message:String(A)));return}if(s.type==="resolve"){let i=(E)=>{I({channel:g,v:m,type:"resolve-result",id:s.id,payload:E})},h=ie;if(!h){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>h(s.payload)).then((E)=>i({item:E?te(E):null}),(E)=>{let A=(E instanceof Error?E.message:String(E)).trim();i({error:(A||"Command failed.").slice(0,ce)})});return}let n=Y.get(s.id);if(!n)return;if(clearTimeout(n.timer),Y.delete(s.id),s.ok){n.resolve(s.payload);return}n.reject(new l(s.code,s.error))};o.addEventListener("message",Ft),I({channel:g,v:m,type:"hello"});let P=(t,s=a)=>{if(F||o.parent===o)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let h=setTimeout(()=>{Y.delete(t.id),i(new l("HOST_TIMEOUT","Host did not answer in time."))},s);Y.set(t.id,{resolve:n,reject:i,timer:h}),I(t)})},_=(t)=>P(t).then(()=>{return}),k={channel:g,v:m},We=(t)=>{if(!F&&o.parent!==o)I(t)},Nt=()=>We({...k,type:"file-save"}),Dt=(t)=>{if(!bs(t)||!Ws(t))return;t.preventDefault(),Nt()},Bt=(t)=>{if(!bs(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),Wt(p.popover.id,"escape").catch(()=>{return})},Ee=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let s=ue||de;if(Lt===s)return;Lt=s,qt(t.id,s).catch(()=>{return})},ye=()=>{if(p?.surface!=="popover"||ue)return;ue=!0,Ee()},$t=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!ue)return;ue=!1,Ee()},Xt=()=>{if(p?.surface!=="popover"||de)return;de=!0,Ee()},Vt=()=>{if(p?.surface!=="popover"||!de)return;de=!1,Ee()},H=(t,s=1024)=>{if(!t.trim()||t.length>s)throw new l("HOST_REJECTED",`Identity must contain 1 to ${s} characters.`)},qe=async(t)=>{if(t.kind!=="projects")H(t.projectId);let s=await P({...k,type:"workspace-read",id:c(d),payload:t});if(!s||!("kind"in s)||!("state"in s)||s.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return s},ze=async(t,s)=>{if(t.kind!=="projects")H(t.projectId);let n=c(d);Q.set(n,s);try{await _({...k,type:"workspace-subscribe",id:c(d),payload:{subscriptionId:n,query:t}})}catch(i){if(Q.delete(n),!F)I({...k,type:"workspace-unsubscribe",id:c(d),payload:{subscriptionId:n}});throw i}return()=>{if(!Q.delete(n)||F)return;I({...k,type:"workspace-unsubscribe",id:c(d),payload:{subscriptionId:n}})}},Hs=async(t,s)=>{if(t.kind==="session")H(t.sessionId);if(t.kind==="project")H(t.projectId);let n=c(d);Z.set(n,s);try{await _({...k,type:"shells-subscribe",id:c(d),payload:{subscriptionId:n,scope:t}})}catch(i){if(Z.delete(n),!F)I({...k,type:"shells-unsubscribe",id:c(d),payload:{subscriptionId:n}});throw i}return()=>{if(!Z.delete(n)||F)return;I({...k,type:"shells-unsubscribe",id:c(d),payload:{subscriptionId:n}})}},he=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Je))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ee(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Ye)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let s=await P({...k,type:"storage",id:c(d),payload:t});if(!s||!("storage"in s)||s.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return s},Wt=(t,s)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):_({...k,type:"popover-close",id:c(d),payload:s?{id:t,reason:s}:{id:t}}),qt=(t,s)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):_({...k,type:"popover-anchor",id:c(d),payload:{id:t,active:s}});return o.addEventListener("keydown",Bt,!0),o.addEventListener("pointerover",ye),o.addEventListener("pointermove",ye),o.addEventListener("pointerout",$t),o.addEventListener("focus",Xt),o.addEventListener("blur",Vt),{onAction:(t)=>(ae=t,()=>{if(ae===t)ae=null}),listProjects:async()=>{let t=await qe({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let s=await qe({kind:"worktrees",projectId:t});if(s.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return s},listSessions:async(t)=>{let s=await qe({kind:"sessions",projectId:t});if(s.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return s},onProjects:(t)=>ze({kind:"projects"},(s)=>{if(s.kind==="projects")t(s)}),onWorktrees:(t,s)=>ze({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")s(n)}),onSessions:(t,s)=>ze({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")s(n)}),onRunningShells:(t,s)=>Hs(t,s),readShellOutput:async(t,s)=>{H(t,xe);let n=s?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=s?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>be))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${be}.`);let E=await P({...k,type:"shell-output",id:c(d),payload:{shellId:t,cursor:n,tailBytes:i}});if(!E||typeof E.output!=="string"||!Number.isFinite(E.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return E},stopShell:async(t)=>{if(H(t,xe),(await P({...k,type:"shell-stop",id:c(d),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{H(t),await _({...k,type:"open-session",id:c(d),payload:{sessionId:t}})},storage:{get:async(t,s)=>{let n=Ie(s),i={op:"get",key:t};if(n)i.scope=n;let h=await he(i);return h.op==="get"&&h.found?h.value:void 0},set:async(t,s,n)=>{let i=Ie(n),h={op:"set",key:t,value:s};if(i)h.scope=i;await he(h)},delete:async(t,s)=>{let n=Ie(s),i={op:"delete",key:t};if(n)i.scope=n;await he(i)},keys:async(t)=>{let s=Ie(t),n={op:"keys"};if(s)n.scope=s;let i=await he(n);if(i.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(u.add(t),p)t(p);return()=>{u.delete(t)}},onDirectory:(t)=>{if(S.add(t),p)t(p.directory);return()=>{S.delete(t)}},onSession:(t)=>{if(y.add(t),p)t(p.session);return()=>{y.delete(t)}},onSessionLifecycle:(t)=>{if(f.add(t),N)t(N);return()=>{f.delete(t)}},onConnection:(t)=>{if(R.add(t),p)t(p.connection);return()=>{R.delete(t)}},onSettings:(t)=>{if(w.add(t),p)t(p.settings);return()=>{w.delete(t)}},onItem:(t)=>{if(ne.add(t),p)t(p.item);return()=>{ne.delete(t)}},onStatusControl:(t)=>(ge.add(t),()=>{ge.delete(t)}),onPopoverClosed:(t)=>(me.add(t),()=>{me.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!Yt(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return _({...k,type:"status-controls",id:c(d),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!tt(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return _({...k,type:"popover-open",id:c(d),payload:t})},closePopover:Wt,setPopoverAnchorActive:qt,onResolve:(t)=>(ie=t,()=>{if(ie===t)ie=null}),toast:(t)=>{let s=t.message.trim();if(!s||s.length>ke)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${ke} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ae))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Ae} characters.`));return _({channel:g,v:m,type:"toast",id:c(d),payload:{...t,message:s}})},openUrl:(t)=>_({channel:g,v:m,type:"open-url",id:c(d),payload:{url:t}}),openCommit:(t)=>nt(t)?_({channel:g,v:m,type:"open-commit",id:c(d),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>_({channel:g,v:m,type:"open-surface",id:c(d),payload:{surfaceId:t}}),writeClipboard:(t)=>_({channel:g,v:m,type:"clipboard-write",id:c(d),payload:{text:t}}),compose:(t)=>_({channel:g,v:m,type:"compose",id:c(d),payload:t}),attach:(t)=>_({channel:g,v:m,type:"attach",id:c(d),payload:te(t)}),startSession:async(t)=>{if(t.projectId!==void 0)H(t.projectId);let s=t.worktree;if(s&&s!==!0)if(s.kind==="existing")H(s.directory);else{if(s.name!==void 0)H(s.name,200);if(s.baseBranch!==void 0)H(s.baseBranch,200)}let n=await P({channel:g,v:m,type:"start-session",id:c(d),payload:pt(t)},e.requestTimeoutMs??180000);if(!ot(n))throw new l("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>P({channel:g,v:m,type:"prompt",id:c(d),payload:ut(t)}).then((s)=>{if(!rt(s))throw new l("HOST_REJECTED","Host did not return a prompt result.");return s}),sessionLink:(t)=>_({channel:g,v:m,type:"session-link",id:c(d),payload:te(t)}),close:()=>_({channel:g,v:m,type:"close",id:c(d)}),oauthStart:()=>_({channel:g,v:m,type:"oauth-start",id:c(d)}),oauthDisconnect:()=>_({channel:g,v:m,type:"oauth-disconnect",id:c(d)}),request:(t)=>(Pe(t.path)?P({channel:g,v:m,type:"request",id:c(d),payload:t}):Ts()).then((s)=>{if(!Me(s))throw new l("HOST_REJECTED","Host request result was empty.");return s}),serviceRequest:(t)=>(Pe(t.path)?P({channel:g,v:m,type:"service-request",id:c(d),payload:t}):Ts()).then((s)=>{if(!Me(s))throw new l("HOST_REJECTED","Host service request result was empty.");return s}),serviceStatus:()=>P({channel:g,v:m,type:"service-status",id:c(d)}).then((t)=>{if(!gt(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(se(t)?P({channel:g,v:m,type:"file-read",id:c(d),payload:{path:t}}):we()).then((s)=>{if(!mt(s))throw new l("HOST_REJECTED","Host did not return file content.");return s}),writeFile:(t,s)=>{if(!se(t))return we();if(s.length>Re)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Re} characters.`));return P({channel:g,v:m,type:"file-write",id:c(d),payload:{path:t,content:s}}).then((n)=>{if(!St(n))throw new l("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(se(t)?P({channel:g,v:m,type:"file-list",id:c(d),payload:{path:t}}):we()).then((s)=>{if(!ft(s))throw new l("HOST_REJECTED","Host did not return directory entries.");return s}),stat:(t)=>(se(t)?P({channel:g,v:m,type:"file-stat",id:c(d),payload:{path:t}}):we()).then((s)=>{if(!Et(s))throw new l("HOST_REJECTED","Host did not return file status.");return s}),generate:(t)=>{let s=t.prompt.trim(),n=t.system?.trim();if(s.length===0||s.length>Ce)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ce} characters.`));if(n!==void 0&&(n.length===0||n.length>Oe))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Oe} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(at,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let h={prompt:s};if(n!==void 0)h.system=n;if(i!==void 0)h.maxOutputTokens=i;return P({channel:g,v:m,type:"generate",id:c(d),payload:h},e.requestTimeoutMs??lt).then((E)=>{if(!yt(E))throw new l("HOST_REJECTED","Host did not return generated text.");return E})},onLateGenerateResult:(t)=>{J.add(t);for(let s of Xe.splice(0))T([t],s);return Ht(),()=>{J.delete(t)}},setBadge:(t)=>_({channel:g,v:m,type:"badge",id:c(d),payload:{count:dt(t)}}),setHeight:(t)=>_({channel:g,v:m,type:"resize",id:c(d),payload:{height:ct(t)}}),onFileOpen:(t)=>{if(Se.add(t),!Ve)Ve=!0,o.addEventListener("keydown",Dt,!0);if(pe)t(pe);return()=>{Se.delete(t)}},onFileSnapshot:(t)=>(le=t,()=>{if(le===t)le=null}),onFileSaved:(t)=>(fe.add(t),()=>{fe.delete(t)}),reportFileChange:(t)=>We({...k,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Nt,reportFileUnsupported:()=>We({...k,type:"file-unsupported"}),dispose:()=>{for(let t of Q.keys())I({...k,type:"workspace-unsubscribe",id:c(d),payload:{subscriptionId:t}});Q.clear();for(let t of Z.keys())I({...k,type:"shells-unsubscribe",id:c(d),payload:{subscriptionId:t}});if(Z.clear(),F=!0,ie=null,ae=null,le=null,Se.clear(),fe.clear(),Ve)o.removeEventListener("keydown",Dt,!0);o.removeEventListener("message",Ft),o.removeEventListener("keydown",Bt,!0),o.removeEventListener("pointerover",ye),o.removeEventListener("pointermove",ye),o.removeEventListener("pointerout",$t),o.removeEventListener("focus",Xt),o.removeEventListener("blur",Vt);for(let t of Y.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),u.clear(),S.clear(),y.clear(),f.clear(),R.clear(),w.clear(),ne.clear(),ge.clear(),me.clear(),J.clear(),Xe.length=0}}};var vs=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Ao=new Set(vs);var _s=["none","agent","user"];var Ro=new Set(_s);var qs=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],zs=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],ks=(e,o)=>{o.style.colorScheme=e.mode;for(let[r,a]of qs)o.style.setProperty(r,e.tokens[a]);for(let[r,a,u]of zs){let S=e.tokens[u]??"";o.style.setProperty(r,S),o.style.setProperty(a,S)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},bt=(e,o)=>{if(ks(e.theme,o),o.dataset)o.dataset.mgSurface=e.surface,o.dataset.mgTheme=e.theme.mode};var js={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},b=(e,o)=>`var(--${e}, var(--mg-${js[e]}, ${o}))`,B=b("surface-background","transparent"),Ue=b("surface-elevated","transparent"),oe=b("surface-elevated-foreground","inherit"),U=b("surface-foreground","inherit"),x=b("surface-muted-foreground","gray"),Ks=b("surface-muted","transparent"),X=b("interactive-border","currentColor"),M=b("interactive-hover","transparent"),z=b("interactive-active","transparent"),Tt=b("interactive-selection","transparent"),vt=b("interactive-selection-foreground","inherit"),D=b("primary","currentColor"),_t=b("primary-text","inherit"),kt=b("error-text","inherit"),Js=b("font-sans","inherit"),At=b("font-mono","monospace"),Os=b("radius","9px"),Gt=`calc(${Os} - 2px)`,As=`calc(${Os} - 4px)`,v=(e,o,r="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${r})`,Gs=`background-image: linear-gradient(${M}, ${M});`,Rt=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--mg-sdk-field-lift);`,Ct="box-shadow: inset 0 0 0 1px var(--mg-sdk-edge), var(--mg-sdk-raised-lift);",Rs="box-shadow: var(--mg-sdk-lit);",Cs=`inset 0 1px 0 0 ${v(U,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Ys=`
:root {
  --mg-sdk-edge: ${v(U,10)};
  --mg-sdk-field-bg: ${Ue};
  --mg-sdk-raised-bg: ${B};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.1), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${v(U,6)};
  --mg-sdk-field-bg: ${v(B,50,Ue)};
  --mg-sdk-raised-bg: ${Ue};
  --mg-sdk-field-lift: ${Cs};
  --mg-sdk-raised-lift: ${Cs};
  --mg-sdk-lit: inset 0 1px 0 0 ${v(U,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.36), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Le=(e)=>{let o=b(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${o}; --mg-sdk-tone-text: ${b(`${e}-text`,"inherit")}; }`},Qs=`
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
`,Ps=`${Ys}
.mg-sdk { color: ${U}; font-family: ${Js}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${Gs} }
.mg-sdk-mono { font-family: ${At}; }
.mg-sdk-muted { color: ${x}; }
${Le("success")}${Le("warning")}${Le("error")}${Le("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${D}; --mg-sdk-tone-text: ${_t}; }

.mg-sdk-btn { border-radius: ${Gt}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${As}; }
.mg-sdk-btn[data-variant="default"] { color: ${_t}; background: ${v(D,10,B)}; border-color: ${v(D,12)}; ${Rs} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${v(D,16,B)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${v(D,22,B)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${Ks}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${z}, ${z}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${oe}; border-color: transparent; ${Ct} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${z}, ${z}); box-shadow: inset 0 0 0 1px var(--mg-sdk-edge); }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${z}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${b("status-error","red")}; color: ${kt}; background: ${v("var(--mg-sdk-tone)",7,B)}; border-color: ${v("var(--mg-sdk-tone)",12)}; ${Rs} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${v("var(--mg-sdk-tone)",9,B)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${v("var(--mg-sdk-tone)",11,B)}; box-shadow: none; }

.mg-sdk-field-note { color: ${x}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${kt}; }
.mg-sdk-input { border-radius: ${Gt}; background: var(--mg-sdk-field-bg); color: ${oe}; ${Rt("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${x}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${Rt(v(U,26))} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${Rt(b("status-error","red"))} }
.mg-sdk-input[data-mono="true"] { font-family: ${At}; }

.mg-sdk-search-icon { color: ${x}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${D}; }
.mg-sdk-search-clear { border-radius: ${As}; color: ${x}; }
.mg-sdk-search-clear:hover { background: ${M}; color: ${U}; }

.mg-sdk-trigger { border-color: transparent; border-radius: ${Gt}; background: var(--mg-sdk-raised-bg); color: ${oe}; ${Ct} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${z}, ${z}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.mg-sdk-trigger-chevron { color: ${x}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow, no border. */
.mg-sdk-popup { --surface-foreground: ${oe}; border-color: transparent; border-radius: 12px; background: ${Ue}; color: ${oe}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${M}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Tt}; color: ${vt}; }
.mg-sdk-option-check { color: ${U}; }
.mg-sdk-option[data-destructive="true"] { color: ${kt}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${v(b("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${x}; }
.mg-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${X}; border-radius: 4px; color: ${U}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${v(U,60,X)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${X}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${D}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${Gs} }
.mg-sdk-check-desc { color: ${x}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${v(U,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${U}; }
.mg-sdk-tab[aria-selected="true"] { color: ${vt}; background: ${Tt}; border-color: ${X}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${oe}; background: var(--mg-sdk-raised-bg); border-color: transparent; ${Ct} }
.mg-sdk-tab-count { color: ${x}; }

.mg-sdk-badge { border-radius: 9999px; background: ${M}; color: ${x}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${v("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${M}; }
.mg-sdk-row[aria-selected="true"] { background: ${Tt}; color: ${vt}; }
.mg-sdk-row-lead { font-family: ${At}; color: ${x}; }
.mg-sdk-row-sub { color: ${x}; }
.mg-sdk-row-meta { color: ${x}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${x}; }

.mg-sdk-empty-body { color: ${x}; }

.mg-sdk-spinner { color: ${x}; }
.mg-sdk-spinner-ring { border-color: ${X}; border-top-color: ${D}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${v("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${x}; }

.mg-sdk-separator { color: ${x}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${v(X,40)}; }

.mg-sdk-progress-label { color: ${x}; }
.mg-sdk-progress-track { border-radius: 9999px; background: ${X}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${D}); }

.mg-sdk-text a { color: ${_t}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${v(X,60)}; }
`,C=`
${je}
${Qs}
${Ps}`;var Ms="mg-sdk-ui-style";var O=(e)=>{let o=document.getElementById(Ms);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}Ke(document);let r=document.createElement("style");r.id=Ms,r.textContent=e,document.head.appendChild(r)},G=(e,o)=>{let r=document.createElement(e);if(o)r.className=o;return r},V=(e)=>{let o=G("button",e);return o.type="button",o},L=(e,o)=>{let r=o??"";if(e.textContent!==r)e.textContent=r};var Zs=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},W=(e,o)=>{O(C);let r=o,a=V("mg-sdk mg-sdk-btn"),u=Zs(),S=document.createElement("span");a.append(S),e.append(a);let y=()=>{if(a.dataset.variant=r.variant??"default",a.dataset.size=r.size??"default",a.disabled=Boolean(r.disabled)||Boolean(r.loading),a.dataset.loading=r.loading?"true":"false",a.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&u.parentNode!==a)a.prepend(u);else if(!r.loading&&u.parentNode===a)u.remove();L(S,r.label)},f=()=>{if(r.disabled||r.loading)return;r.onClick()};return a.addEventListener("click",f),y(),{update:(R)=>{r={...r,...R},y()},dispose:()=>{a.removeEventListener("click",f),a.remove()}}};var Pt=(e,o)=>{O(C);let r=o,a=G("div","mg-sdk mg-sdk-empty"),u=G("h2","mg-sdk-empty-title"),S=G("p","mg-sdk-empty-body"),y=G("div","mg-sdk-empty-action");a.append(u,S,y),e.append(a);let f=null,R=()=>{if(L(u,r.title),L(S,r.body),S.hidden=!r.body,y.hidden=!r.action,!r.action){f?.dispose(),f=null;return}let w={label:r.action.label,onClick:r.action.onClick};if(f)f.update(w);else f=W(y,{...w,variant:"outline",size:"sm"})};return R(),{update:(w)=>{r={...r,...w},R()},dispose:()=>{f?.dispose(),f=null,a.remove()}}};var ro=/^(\s*[-*+] )\[( |x|X)\] ?(.*)$/,ws=(e)=>e.split(`
`).map((o)=>{let r=ro.exec(o);return r?{kind:"item",prefix:r[1]??"- ",done:r[2]!==" ",text:r[3]??""}:{kind:"text",text:o}}),Is=(e)=>e.map((o)=>o.kind==="text"?o.text:`${o.prefix}[${o.done?"x":" "}] ${o.text}`).join(`
`),Be=(e)=>{let o=2166136261;for(let r=0;r<e.length;r+=1)o^=e.charCodeAt(r),o=Math.imul(o,16777619);return`${e.length}:${(o>>>0).toString(16)}`},Ls=(e,o)=>{let r=-1,a="- ";e.forEach((f,R)=>{if(f.kind!=="item")return;r=R,a=f.prefix});let u={kind:"item",prefix:a,done:!1,text:o};if(r>=0)return[...e.slice(0,r+1),u,...e.slice(r+1)];return[...e.at(-1)?.kind==="text"&&e.at(-1)?.text===""?e.slice(0,-1):[...e],u,{kind:"text",text:""}]};var K=xt(),j=document.querySelector("#root");if(!j)throw Error("Missing root");var Us=document.createElement("style");Us.textContent=`
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
`;document.head.append(Us);K.onReady((e)=>bt(e,document.documentElement));var q=[],re=!1,wt=_e(null),It=()=>Is(q),$e=()=>{K.reportFileChange(wt.observe(Be(It())))},Mt=()=>{if(j.replaceChildren(),!q.some((o)=>o.kind==="item")&&re){Pt(j,{title:"No items",body:"This checklist is empty."});return}if(q.forEach((o,r)=>{if(o.kind==="text"){let y=document.createElement("p");y.className="note",y.textContent=o.text,j.append(y);return}let a=document.createElement("div");a.className=o.done?"item done":"item";let u=document.createElement("input");u.type="checkbox",u.checked=o.done,u.disabled=re,u.addEventListener("change",()=>{o.done=u.checked,a.className=o.done?"item done":"item",$e()});let S=document.createElement("input");if(S.type="text",S.value=o.text,S.readOnly=re,S.setAttribute("aria-label","Item"),S.addEventListener("input",()=>{o.text=S.value,$e()}),a.append(u,S),!re){let y=document.createElement("span");y.className="remove",W(y,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>{q=q.filter((f,R)=>R!==r),$e(),Mt()}}),a.append(y)}j.append(a)}),re)return;let e=document.createElement("div");e.className="actions",W(e,{label:"Add item",variant:"secondary",size:"sm",onClick:()=>{q=Ls(q,""),$e(),Mt();let o=j.querySelectorAll('.item input[type="text"]');o.item(o.length-1)?.focus()}}),j.append(e)};K.onFileOpen((e)=>{if(e.encoding!=="text"){K.reportFileUnsupported();return}q=ws(e.content),re=e.readOnly,wt=_e(Be(It())),Mt()});K.onFileSnapshot(()=>{let e=It();return{content:e,version:Be(e)}});K.onFileSaved((e)=>{K.reportFileChange({dirty:wt.markSaved(e),edited:!1})});})();
