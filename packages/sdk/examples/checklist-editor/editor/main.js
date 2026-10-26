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
`;function Ke(e){let r=e.documentElement;if(r.hasAttribute("data-mg-scrollbar-activity"))return;r.setAttribute("data-mg-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(a)=>{let p=a.target===e?r:a.target;if(!(p instanceof Element))return;if(!p.hasAttribute("data-mg-scrolling"))p.setAttribute("data-mg-scrolling","");let m=s.get(p);if(m!==void 0)clearTimeout(m);s.set(p,setTimeout(()=>{s.delete(p),p.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Do=`(${Ke.toString()})(document);`;var Je=128,Ye=65536;var _e=128;var Te=65536;var Jt=/^[a-z][a-z0-9-]{0,39}$/;var jt=(e)=>Object(e)===e&&!Array.isArray(e),Qe=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),zt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Kt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Yt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!jt(s)||!Jt.test(s.id)||!zt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!Qe(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!Qe(s,["kind","id","label","value","options","disabled"]))return!1;if(!Kt(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let a=new Set;for(let p of s.options){if(!jt(p)||!Qe(p,["value","label"])||!Kt(p.value)||!zt(p.label)||a.has(p.value))return!1;a.add(p.value)}if(!a.has(s.value))return!1}return!0};var be=20000000,xe=256;var Ze=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Qt=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0},ve=(e)=>{let r=e,s=e;return{observe:(a)=>{let p=a!==s;return s=a,{edited:p,dirty:a!==r}},markSaved:(a)=>(r=a,s!==a)}};var Zt=/^[A-Za-z0-9_-]{1,80}$/;var eo=["left","right","top","bottom"];var to=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let a=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let p of a)if(!to(p,r+1,s))return!1;return!0},et=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(et);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(et)}return String(e)===e||Number.isFinite(e)},tt=(e)=>{try{if(String(e.id)!==e.id||!Zt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!eo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!to(e.data)||!et(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ro=["file","directory","other","missing"],rt=(e)=>Boolean(e&&"sessionId"in e),st=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var so=/^[0-9a-f]{7,64}$/i,nt=(e)=>so.test(e),Re=500,Oe=32000,no=16000,io=128,ao=200,lo=2000,uo=16000,po=80,co=200,go=16000;var So=2000;var it=20000,Ae=1024,Ce=2000000;var ke=64000,Ge=8000,at=4000;var lt=960000;var mo=999,Eo=1e4,de=500,fo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],yo=["stopped","starting","ready","failed"],Bo=new Set(fo),ho=(e)=>Bo.has(e),_o=(e)=>e&&ho(e)?e:"HOST_REJECTED",ee=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ee);if(Object(e)===e)return Object.values(e).every(ee);return!1},To=(e)=>ee(e)&&JSON.stringify(e).length<=go,oo=(e)=>e?.trim().slice(0,co)??"",te=(e)=>{let r=e.id.trim().slice(0,io),s=e.title.trim().slice(0,ao),a=e.url.trim().slice(0,lo),p=e.text?.trim().slice(0,uo),m=e.author?.trim().slice(0,po),y=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:r,title:s||r,url:a,kind:y};if(p)E.text=p;if(m)E.author=m;if(y==="pull"){let C=oo(e.branches?.head),I=oo(e.branches?.base);if(C&&I)E.branches={head:C,base:I}}if(To(e.data))E.data=e.data;return E},ut=(e)=>{let r=te(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},pt=(e)=>{let r={text:e.text.trim().slice(0,no)};if(e.send)r.send=!0;return r},ct=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(mo,Math.max(0,Math.round(e)))},dt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Eo,Math.max(0,Math.ceil(e)))};var oe=(e)=>e.length>0&&e.length<=Ae&&!e.includes("\x00")&&!e.includes("\\");var Me=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>So)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Xo=new Set(yo),gt=(e)=>Boolean(e&&"status"in e&&Xo.has(String(e.status))&&!("body"in e)),Pe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),St=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),mt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Et=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Vo=new Set(ro),ft=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Vo.has(String(e.kind))&&Number.isFinite(e.size)),yt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),$o=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),qo=(e)=>Object(e)===e?e:null,ot=(e)=>String(e)===e&&e.length>0,Wo=(e)=>{if(!ot(e.id))return null;if(e.ok===!0){let r={channel:g,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&ot(e.error))return{channel:g,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:_o(ot(e.code)?e.code:void 0)};return null},ht=(e)=>{let r=qo(e);if(!r||r.channel!==g||r.v!==S)return null;if(r.type==="result")return Wo(r);if(!$o.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var bo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),jo=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var xo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ie=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Ae} characters without NUL or backslash.`)),we=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},d=(e)=>(e.value+=1,`mg-${e.value}`),_t=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),a=e.requestTimeoutMs??it,p=new Set,m=new Set,y=new Set,E=new Set,C=new Set,I=new Set,ne=new Set,ge=new Set,Se=new Set,J=new Set,Ve=[],ie=null,ae=null,me=new Set,Ee=new Set,le=null,ue=null,$e=!1,Y=new Map,Q=new Map,Z=new Map,H=!1,c={value:0},u=null,D=null,pe=!1,ce=!1,Ut=null,Lt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},w=(t)=>{r.parent.postMessage(t,"*")},Nt=()=>{if(H||r.parent===r||J.size===0||u?.features?.lateGenerateResults!==!0)return;w({channel:g,v:S,type:"generate-late-listen"})},b=(t,o)=>{for(let n of t)try{n(o)}catch(i){console.error(i)}},Ht=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=ht(t.data);if(!o)return;if(o.type==="workspace"){let i=Q.get(o.payload.subscriptionId);if(i)b([i],o.payload.snapshot);return}if(o.type==="shells"){let i=Z.get(o.payload.subscriptionId);if(i)b([i],o.payload.snapshot);return}if(o.type==="ready"){if(u=o.payload,D=Lt(o.payload.session),b(p,o.payload),b(m,o.payload.directory),b(y,o.payload.session),D)b(E,D);b(C,o.payload.connection),b(I,o.payload.settings),b(ne,o.payload.item),Nt();return}if(o.type==="generate-late"){if(J.size===0)Ve.push(o.payload);else b(J,o.payload);return}if(o.type==="directory"){if(u)u={...u,directory:o.payload.directory};b(m,o.payload.directory);return}if(o.type==="session"){if(u)u={...u,session:o.payload.session};if(!o.payload.session)D=null;else if(D?.sessionId!==o.payload.session.id)D=Lt(o.payload.session);b(y,o.payload.session);return}if(o.type==="session-lifecycle"){D=o.payload,b(E,o.payload);return}if(o.type==="connection"){if(u)u={...u,connection:o.payload.connection};b(C,o.payload.connection);return}if(o.type==="settings"){if(u)u={...u,settings:o.payload.settings};b(I,o.payload.settings);return}if(o.type==="item"){if(u)u={...u,item:o.payload.item};b(ne,o.payload.item);return}if(o.type==="status-control-event"){b(ge,o.payload);return}if(o.type==="popover-closed"){b(Se,o.payload);return}if(o.type==="action"){let i=(f)=>{if(!H)w({channel:g,v:S,type:"action-result",id:o.id,payload:f})},h=ae;if(!h){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>h(o.payload)).then(()=>i({ok:!0}),(f)=>{let O=(f instanceof Error?f.message:String(f)).trim();i({ok:!1,error:(O||"Action failed.").slice(0,de)})});return}if(o.type==="file-open"){let i=o.payload;if(ue&&Qt(ue,i))return;ue=i,b(me,o.payload);return}if(o.type==="file-saved"){b(Ee,o.payload.version);return}if(o.type==="file-snapshot"){let i=(O)=>{if(!H)w({channel:g,v:S,type:"file-snapshot-result",id:o.id,payload:O})},h=(O)=>i({error:(O.trim()||"Could not read the edited file.").slice(0,de)}),f=le;if(!f){h("This extension does not edit files.");return}Promise.resolve().then(()=>f(o.payload.purpose)).then((O)=>{if(Ze(O)>be){h(`The file is over ${be} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>xe){h(`The snapshot version is over ${xe} characters.`);return}i({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>h(O instanceof Error?O.message:String(O)));return}if(o.type==="resolve"){let i=(f)=>{w({channel:g,v:S,type:"resolve-result",id:o.id,payload:f})},h=ie;if(!h){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>h(o.payload)).then((f)=>i({item:f?te(f):null}),(f)=>{let O=(f instanceof Error?f.message:String(f)).trim();i({error:(O||"Command failed.").slice(0,de)})});return}let n=Y.get(o.id);if(!n)return;if(clearTimeout(n.timer),Y.delete(o.id),o.ok){n.resolve(o.payload);return}n.reject(new l(o.code,o.error))};r.addEventListener("message",Ht),w({channel:g,v:S,type:"hello"});let M=(t,o=a)=>{if(H||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let h=setTimeout(()=>{Y.delete(t.id),i(new l("HOST_TIMEOUT","Host did not answer in time."))},o);Y.set(t.id,{resolve:n,reject:i,timer:h}),w(t)})},v=(t)=>M(t).then(()=>{return}),R={channel:g,v:S},qe=(t)=>{if(!H&&r.parent!==r)w(t)},Dt=()=>qe({...R,type:"file-save"}),Ft=(t)=>{if(!bo(t)||!jo(t))return;t.preventDefault(),Dt()},Bt=(t)=>{if(!bo(t)||t.key!=="Escape"||u?.surface!=="popover"||!u.popover)return;t.preventDefault(),qt(u.popover.id,"escape").catch(()=>{return})},fe=()=>{let t=u?.surface==="popover"?u.popover:void 0;if(!t)return;let o=pe||ce;if(Ut===o)return;Ut=o,Wt(t.id,o).catch(()=>{return})},ye=()=>{if(u?.surface!=="popover"||pe)return;pe=!0,fe()},Xt=(t)=>{if(u?.surface!=="popover"||t.relatedTarget!==null||!pe)return;pe=!1,fe()},Vt=()=>{if(u?.surface!=="popover"||ce)return;ce=!0,fe()},$t=()=>{if(u?.surface!=="popover"||!ce)return;ce=!1,fe()},N=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},We=async(t)=>{if(t.kind!=="projects")N(t.projectId);let o=await M({...R,type:"workspace-read",id:d(c),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},je=async(t,o)=>{if(t.kind!=="projects")N(t.projectId);let n=d(c);Q.set(n,o);try{await v({...R,type:"workspace-subscribe",id:d(c),payload:{subscriptionId:n,query:t}})}catch(i){if(Q.delete(n),!H)w({...R,type:"workspace-unsubscribe",id:d(c),payload:{subscriptionId:n}});throw i}return()=>{if(!Q.delete(n)||H)return;w({...R,type:"workspace-unsubscribe",id:d(c),payload:{subscriptionId:n}})}},Ho=async(t,o)=>{if(t.kind==="session")N(t.sessionId);if(t.kind==="project")N(t.projectId);let n=d(c);Z.set(n,o);try{await v({...R,type:"shells-subscribe",id:d(c),payload:{subscriptionId:n,scope:t}})}catch(i){if(Z.delete(n),!H)w({...R,type:"shells-unsubscribe",id:d(c),payload:{subscriptionId:n}});throw i}return()=>{if(!Z.delete(n)||H)return;w({...R,type:"shells-unsubscribe",id:d(c),payload:{subscriptionId:n}})}},he=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Je))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ee(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Ye)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&u?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await M({...R,type:"storage",id:d(c),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},qt=(t,o)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):v({...R,type:"popover-close",id:d(c),payload:o?{id:t,reason:o}:{id:t}}),Wt=(t,o)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):v({...R,type:"popover-anchor",id:d(c),payload:{id:t,active:o}});return r.addEventListener("keydown",Bt,!0),r.addEventListener("pointerover",ye),r.addEventListener("pointermove",ye),r.addEventListener("pointerout",Xt),r.addEventListener("focus",Vt),r.addEventListener("blur",$t),{onAction:(t)=>(ae=t,()=>{if(ae===t)ae=null}),listProjects:async()=>{let t=await We({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await We({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await We({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>je({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>je({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")o(n)}),onSessions:(t,o)=>je({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")o(n)}),onRunningShells:(t,o)=>Ho(t,o),readShellOutput:async(t,o)=>{N(t,_e);let n=o?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Te))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Te}.`);let f=await M({...R,type:"shell-output",id:d(c),payload:{shellId:t,cursor:n,tailBytes:i}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(t)=>{if(N(t,_e),(await M({...R,type:"shell-stop",id:d(c),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{N(t),await v({...R,type:"open-session",id:d(c),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let n=we(o),i={op:"get",key:t};if(n)i.scope=n;let h=await he(i);return h.op==="get"&&h.found?h.value:void 0},set:async(t,o,n)=>{let i=we(n),h={op:"set",key:t,value:o};if(i)h.scope=i;await he(h)},delete:async(t,o)=>{let n=we(o),i={op:"delete",key:t};if(n)i.scope=n;await he(i)},keys:async(t)=>{let o=we(t),n={op:"keys"};if(o)n.scope=o;let i=await he(n);if(i.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(p.add(t),u)t(u);return()=>{p.delete(t)}},onDirectory:(t)=>{if(m.add(t),u)t(u.directory);return()=>{m.delete(t)}},onSession:(t)=>{if(y.add(t),u)t(u.session);return()=>{y.delete(t)}},onSessionLifecycle:(t)=>{if(E.add(t),D)t(D);return()=>{E.delete(t)}},onConnection:(t)=>{if(C.add(t),u)t(u.connection);return()=>{C.delete(t)}},onSettings:(t)=>{if(I.add(t),u)t(u.settings);return()=>{I.delete(t)}},onItem:(t)=>{if(ne.add(t),u)t(u.item);return()=>{ne.delete(t)}},onStatusControl:(t)=>(ge.add(t),()=>{ge.delete(t)}),onPopoverClosed:(t)=>(Se.add(t),()=>{Se.delete(t)}),setStatusControls:(t)=>{if(u?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!Yt(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return v({...R,type:"status-controls",id:d(c),payload:{controls:t}})},openPopover:(t)=>{if(u?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!tt(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return v({...R,type:"popover-open",id:d(c),payload:t})},closePopover:qt,setPopoverAnchorActive:Wt,onResolve:(t)=>(ie=t,()=>{if(ie===t)ie=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Re)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${Re} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Oe))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Oe} characters.`));return v({channel:g,v:S,type:"toast",id:d(c),payload:{...t,message:o}})},openUrl:(t)=>v({channel:g,v:S,type:"open-url",id:d(c),payload:{url:t}}),openCommit:(t)=>nt(t)?v({channel:g,v:S,type:"open-commit",id:d(c),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>v({channel:g,v:S,type:"open-surface",id:d(c),payload:{surfaceId:t}}),writeClipboard:(t)=>v({channel:g,v:S,type:"clipboard-write",id:d(c),payload:{text:t}}),compose:(t)=>v({channel:g,v:S,type:"compose",id:d(c),payload:t}),attach:(t)=>v({channel:g,v:S,type:"attach",id:d(c),payload:te(t)}),startSession:async(t)=>{if(t.projectId!==void 0)N(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")N(o.directory);else{if(o.name!==void 0)N(o.name,200);if(o.baseBranch!==void 0)N(o.baseBranch,200)}let n=await M({channel:g,v:S,type:"start-session",id:d(c),payload:ut(t)},e.requestTimeoutMs??180000);if(!rt(n))throw new l("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>M({channel:g,v:S,type:"prompt",id:d(c),payload:pt(t)}).then((o)=>{if(!st(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>v({channel:g,v:S,type:"session-link",id:d(c),payload:te(t)}),close:()=>v({channel:g,v:S,type:"close",id:d(c)}),oauthStart:()=>v({channel:g,v:S,type:"oauth-start",id:d(c)}),oauthDisconnect:()=>v({channel:g,v:S,type:"oauth-disconnect",id:d(c)}),request:(t)=>(Me(t.path)?M({channel:g,v:S,type:"request",id:d(c),payload:t}):xo()).then((o)=>{if(!Pe(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Me(t.path)?M({channel:g,v:S,type:"service-request",id:d(c),payload:t}):xo()).then((o)=>{if(!Pe(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>M({channel:g,v:S,type:"service-status",id:d(c)}).then((t)=>{if(!gt(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(oe(t)?M({channel:g,v:S,type:"file-read",id:d(c),payload:{path:t}}):Ie()).then((o)=>{if(!St(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!oe(t))return Ie();if(o.length>Ce)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Ce} characters.`));return M({channel:g,v:S,type:"file-write",id:d(c),payload:{path:t,content:o}}).then((n)=>{if(!mt(n))throw new l("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(oe(t)?M({channel:g,v:S,type:"file-list",id:d(c),payload:{path:t}}):Ie()).then((o)=>{if(!Et(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(oe(t)?M({channel:g,v:S,type:"file-stat",id:d(c),payload:{path:t}}):Ie()).then((o)=>{if(!ft(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),n=t.system?.trim();if(o.length===0||o.length>ke)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${ke} characters.`));if(n!==void 0&&(n.length===0||n.length>Ge))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ge} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(at,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let h={prompt:o};if(n!==void 0)h.system=n;if(i!==void 0)h.maxOutputTokens=i;return M({channel:g,v:S,type:"generate",id:d(c),payload:h},e.requestTimeoutMs??lt).then((f)=>{if(!yt(f))throw new l("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(t)=>{J.add(t);for(let o of Ve.splice(0))b([t],o);return Nt(),()=>{J.delete(t)}},setBadge:(t)=>v({channel:g,v:S,type:"badge",id:d(c),payload:{count:ct(t)}}),setHeight:(t)=>v({channel:g,v:S,type:"resize",id:d(c),payload:{height:dt(t)}}),onFileOpen:(t)=>{if(me.add(t),!$e)$e=!0,r.addEventListener("keydown",Ft,!0);if(ue)t(ue);return()=>{me.delete(t)}},onFileSnapshot:(t)=>(le=t,()=>{if(le===t)le=null}),onFileSaved:(t)=>(Ee.add(t),()=>{Ee.delete(t)}),reportFileChange:(t)=>qe({...R,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Dt,reportFileUnsupported:()=>qe({...R,type:"file-unsupported"}),dispose:()=>{for(let t of Q.keys())w({...R,type:"workspace-unsubscribe",id:d(c),payload:{subscriptionId:t}});Q.clear();for(let t of Z.keys())w({...R,type:"shells-unsubscribe",id:d(c),payload:{subscriptionId:t}});if(Z.clear(),H=!0,ie=null,ae=null,le=null,me.clear(),Ee.clear(),$e)r.removeEventListener("keydown",Ft,!0);r.removeEventListener("message",Ht),r.removeEventListener("keydown",Bt,!0),r.removeEventListener("pointerover",ye),r.removeEventListener("pointermove",ye),r.removeEventListener("pointerout",Xt),r.removeEventListener("focus",Vt),r.removeEventListener("blur",$t);for(let t of Y.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),p.clear(),m.clear(),y.clear(),E.clear(),C.clear(),I.clear(),ne.clear(),ge.clear(),Se.clear(),J.clear(),Ve.length=0}}};var vo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var kr=new Set(vo);var Ro=["none","agent","user"];var Mr=new Set(Ro);var zo=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ko=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],Oo=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,a]of zo)r.style.setProperty(s,e.tokens[a]);for(let[s,a,p]of Ko){let m=e.tokens[p]??"";r.style.setProperty(s,m),r.style.setProperty(a,m)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Tt=(e,r)=>{if(Oo(e.theme,r),r.dataset)r.dataset.mgSurface=e.surface,r.dataset.mgTheme=e.theme.mode};var Jo={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,r)=>`var(--${e}, var(--mg-${Jo[e]}, ${r}))`,B=T("surface-background","transparent"),Le=T("surface-elevated","transparent"),re=T("surface-elevated-foreground","inherit"),L=T("surface-foreground","inherit"),_=T("surface-muted-foreground","gray"),Yo=T("surface-muted","transparent"),X=T("interactive-border","currentColor"),P=T("interactive-hover","transparent"),j=T("interactive-active","transparent"),bt=T("interactive-selection","transparent"),xt=T("interactive-selection-foreground","inherit"),F=T("primary","currentColor"),vt=T("primary-text","inherit"),Rt=T("error-text","inherit"),Qo=T("font-sans","inherit"),Ot=T("font-mono","monospace"),Mo=T("radius","9px"),At=`calc(${Mo} - 2px)`,Ao=`calc(${Mo} - 4px)`,x=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,Co=`background-image: linear-gradient(${P}, ${P});`,Ct=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--mg-sdk-field-lift);`,kt="border-color: var(--mg-sdk-edge); box-shadow: var(--mg-sdk-raised-lift);",ko="box-shadow: var(--mg-sdk-lit);",Go=`inset 0 1px 0 0 ${x(L,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Zo=`
:root {
  --mg-sdk-edge: ${x(L,10)};
  --mg-sdk-field-bg: ${Le};
  --mg-sdk-raised-bg: ${B};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.1);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${x(L,6)};
  --mg-sdk-field-bg: ${x(B,50,Le)};
  --mg-sdk-raised-bg: ${Le};
  --mg-sdk-field-lift: ${Go};
  --mg-sdk-raised-lift: ${Go};
  --mg-sdk-lit: inset 0 1px 0 0 ${x(L,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.36);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Ue=(e)=>{let r=T(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${r}; --mg-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},er=`
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
`,Po=`${Zo}
.mg-sdk { color: ${L}; font-family: ${Qo}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${Co} }
.mg-sdk-mono { font-family: ${Ot}; }
.mg-sdk-muted { color: ${_}; }
${Ue("success")}${Ue("warning")}${Ue("error")}${Ue("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${F}; --mg-sdk-tone-text: ${vt}; }

.mg-sdk-btn { border-radius: ${At}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${Ao}; }
.mg-sdk-btn[data-variant="default"] { color: ${vt}; background: ${x(F,10,B)}; border-color: ${x(F,12)}; ${ko} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${x(F,16,B)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${x(F,22,B)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${Yo}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${re}; ${kt} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${P}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${T("status-error","red")}; color: ${Rt}; background: ${x("var(--mg-sdk-tone)",7,B)}; border-color: ${x("var(--mg-sdk-tone)",12)}; ${ko} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${x("var(--mg-sdk-tone)",9,B)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${x("var(--mg-sdk-tone)",11,B)}; box-shadow: none; }

.mg-sdk-field-note { color: ${_}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${Rt}; }
.mg-sdk-input { border-radius: ${At}; background: var(--mg-sdk-field-bg); color: ${re}; ${Ct("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${_}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${Ct(x(L,26))} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${Ct(T("status-error","red"))} }
.mg-sdk-input[data-mono="true"] { font-family: ${Ot}; }

.mg-sdk-search-icon { color: ${_}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${F}; }
.mg-sdk-search-clear { border-radius: ${Ao}; color: ${_}; }
.mg-sdk-search-clear:hover { background: ${P}; color: ${L}; }

.mg-sdk-trigger { border-radius: ${At}; background: var(--mg-sdk-raised-bg); color: ${re}; ${kt} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${_}; }
.mg-sdk-trigger-chevron { color: ${_}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.mg-sdk-popup { --surface-foreground: ${re}; border-color: var(--mg-sdk-float-edge); border-radius: 12px; background: ${Le}; background-clip: padding-box; color: ${re}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${P}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${bt}; color: ${xt}; }
.mg-sdk-option-check { color: ${L}; }
.mg-sdk-option[data-destructive="true"] { color: ${Rt}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${x(T("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${_}; }
.mg-sdk-popup-empty { color: ${_}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${X}; border-radius: 4px; color: ${L}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${x(L,60,X)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${X}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${F}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${Co} }
.mg-sdk-check-desc { color: ${_}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${x(L,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${_}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${L}; }
.mg-sdk-tab[aria-selected="true"] { color: ${xt}; background: ${bt}; border-color: ${X}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${re}; background: var(--mg-sdk-raised-bg); ${kt} }
.mg-sdk-tab-count { color: ${_}; }

.mg-sdk-badge { border-radius: 9999px; background: ${P}; color: ${_}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${x("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${P}; }
.mg-sdk-row[aria-selected="true"] { background: ${bt}; color: ${xt}; }
.mg-sdk-row-lead { font-family: ${Ot}; color: ${_}; }
.mg-sdk-row-sub { color: ${_}; }
.mg-sdk-row-meta { color: ${_}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${_}; }

.mg-sdk-empty-body { color: ${_}; }

.mg-sdk-spinner { color: ${_}; }
.mg-sdk-spinner-ring { border-color: ${X}; border-top-color: ${F}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${x("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${_}; }

.mg-sdk-separator { color: ${_}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${x(X,40)}; }

.mg-sdk-progress-label { color: ${_}; }
.mg-sdk-progress-track { border-radius: 9999px; background: ${X}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${F}); }

.mg-sdk-text a { color: ${vt}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${x(X,60)}; }
`,k=`
${ze}
${er}
${Po}`;var Io="mg-sdk-ui-style";var G=(e)=>{let r=document.getElementById(Io);if(r instanceof HTMLStyleElement){if(r.textContent!==e)r.textContent=e;return}Ke(document);let s=document.createElement("style");s.id=Io,s.textContent=e,document.head.appendChild(s)},A=(e,r)=>{let s=document.createElement(e);if(r)s.className=r;return s},V=(e)=>{let r=A("button",e);return r.type="button",r},U=(e,r)=>{let s=r??"";if(e.textContent!==s)e.textContent=s};var tr=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},q=(e,r)=>{G(k);let s=r,a=V("mg-sdk mg-sdk-btn"),p=tr(),m=document.createElement("span");a.append(m),e.append(a);let y=()=>{if(a.dataset.variant=s.variant??"default",a.dataset.size=s.size??"default",a.disabled=Boolean(s.disabled)||Boolean(s.loading),a.dataset.loading=s.loading?"true":"false",a.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&p.parentNode!==a)a.prepend(p);else if(!s.loading&&p.parentNode===a)p.remove();U(m,s.label)},E=()=>{if(s.disabled||s.loading)return;s.onClick()};return a.addEventListener("click",E),y(),{update:(C)=>{s={...s,...C},y()},dispose:()=>{a.removeEventListener("click",E),a.remove()}}};var Mt=(e,r)=>{G(k);let s=r,a=A("div","mg-sdk mg-sdk-empty"),p=A("h2","mg-sdk-empty-title"),m=A("p","mg-sdk-empty-body"),y=A("div","mg-sdk-empty-action");a.append(p,m,y),e.append(a);let E=null,C=()=>{if(U(p,s.title),U(m,s.body),m.hidden=!s.body,y.hidden=!s.action,!s.action){E?.dispose(),E=null;return}let I={label:s.action.label,onClick:s.action.onClick};if(E)E.update(I);else E=q(y,{...I,variant:"outline",size:"sm"})};return C(),{update:(I)=>{s={...s,...I},C()},dispose:()=>{E?.dispose(),E=null,a.remove()}}};var ir=/^(\s*[-*+] )\[( |x|X)\] ?(.*)$/,wo=(e)=>e.split(`
`).map((r)=>{let s=ir.exec(r);return s?{kind:"item",prefix:s[1]??"- ",done:s[2]!==" ",text:s[3]??""}:{kind:"text",text:r}}),Uo=(e)=>e.map((r)=>r.kind==="text"?r.text:`${r.prefix}[${r.done?"x":" "}] ${r.text}`).join(`
`),Be=(e)=>{let r=2166136261;for(let s=0;s<e.length;s+=1)r^=e.charCodeAt(s),r=Math.imul(r,16777619);return`${e.length}:${(r>>>0).toString(16)}`},Lo=(e,r)=>{let s=-1,a="- ";e.forEach((E,C)=>{if(E.kind!=="item")return;s=C,a=E.prefix});let p={kind:"item",prefix:a,done:!1,text:r};if(s>=0)return[...e.slice(0,s+1),p,...e.slice(s+1)];return[...e.at(-1)?.kind==="text"&&e.at(-1)?.text===""?e.slice(0,-1):[...e],p,{kind:"text",text:""}]};var K=_t(),z=document.querySelector("#root");if(!z)throw Error("Missing root");var No=document.createElement("style");No.textContent=`
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
`;document.head.append(No);K.onReady((e)=>Tt(e,document.documentElement));var W=[],se=!1,It=ve(null),wt=()=>Uo(W),Xe=()=>{K.reportFileChange(It.observe(Be(wt())))},Pt=()=>{if(z.replaceChildren(),!W.some((r)=>r.kind==="item")&&se){Mt(z,{title:"No items",body:"This checklist is empty."});return}if(W.forEach((r,s)=>{if(r.kind==="text"){let y=document.createElement("p");y.className="note",y.textContent=r.text,z.append(y);return}let a=document.createElement("div");a.className=r.done?"item done":"item";let p=document.createElement("input");p.type="checkbox",p.checked=r.done,p.disabled=se,p.addEventListener("change",()=>{r.done=p.checked,a.className=r.done?"item done":"item",Xe()});let m=document.createElement("input");if(m.type="text",m.value=r.text,m.readOnly=se,m.setAttribute("aria-label","Item"),m.addEventListener("input",()=>{r.text=m.value,Xe()}),a.append(p,m),!se){let y=document.createElement("span");y.className="remove",q(y,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>{W=W.filter((E,C)=>C!==s),Xe(),Pt()}}),a.append(y)}z.append(a)}),se)return;let e=document.createElement("div");e.className="actions",q(e,{label:"Add item",variant:"secondary",size:"sm",onClick:()=>{W=Lo(W,""),Xe(),Pt();let r=z.querySelectorAll('.item input[type="text"]');r.item(r.length-1)?.focus()}}),z.append(e)};K.onFileOpen((e)=>{if(e.encoding!=="text"){K.reportFileUnsupported();return}W=wo(e.content),se=e.readOnly,It=ve(Be(wt())),Pt()});K.onFileSnapshot(()=>{let e=wt();return{content:e,version:Be(e)}});K.onFileSaved((e)=>{K.reportFileChange({dirty:It.markSaved(e),edited:!1})});})();
