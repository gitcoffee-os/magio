(()=>{var g="magio.sdk",S=1;var Je=`
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
`;function Ye(e){let o=e.documentElement;if(o.hasAttribute("data-mg-scrollbar-activity"))return;o.setAttribute("data-mg-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(a)=>{let c=a.target===e?o:a.target;if(!(c instanceof Element))return;if(!c.hasAttribute("data-mg-scrolling"))c.setAttribute("data-mg-scrolling","");let m=s.get(c);if(m!==void 0)clearTimeout(m);s.set(c,setTimeout(()=>{s.delete(c),c.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Xr=`(${Ye.toString()})(document);`;var Ze=128,et=65536;var ve=128;var be=65536;var er=/^[a-z][a-z0-9-]{0,39}$/;var Jt=(e)=>Object(e)===e&&!Array.isArray(e),tt=(e,o)=>Object.keys(e).every((s)=>o.includes(s)),Yt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Zt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,tr=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let s of e){if(!Jt(s)||!er.test(s.id)||!Yt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(o.has(s.id))return!1;if(o.add(s.id),s.kind==="button"){if(!tt(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!tt(s,["kind","id","label","value","options","disabled"]))return!1;if(!Zt(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let a=new Set;for(let c of s.options){if(!Jt(c)||!tt(c,["value","label"])||!Zt(c.value)||!Yt(c.label)||a.has(c.value))return!1;a.add(c.value)}if(!a.has(s.value))return!1}return!0};var rr=["{id}","{segment}","{segments+}"];var Ro=new Set(rr);var or=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var vo=new Set(or);var xe=20000000,Oe=256;var rt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,sr=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==o.bytes[s])return!1;return!0},Ae=(e)=>{let o=e,s=e;return{observe:(a)=>{let c=a!==s;return s=a,{edited:c,dirty:a!==o}},markSaved:(a)=>(o=a,s!==a)}};var nr=/^[A-Za-z0-9_-]{1,80}$/;var ir=["left","right","top","bottom"];var ar=(e,o=0,s={remaining:16000})=>{if(--s.remaining<0||o>=32)return!1;if(e===null)return!0;let a=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let c of a)if(!ar(c,o+1,s))return!1;return!0},ot=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(ot);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(ot)}return String(e)===e||Number.isFinite(e)},st=(e)=>{try{if(String(e.id)!==e.id||!nr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ir.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ar(e.data)||!ot(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var it=2000;var ur=["file","directory","other","missing"],at=(e)=>Boolean(e&&"sessionId"in e),lt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var cr=/^[0-9a-f]{7,64}$/i,ut=(e)=>cr.test(e),ke=500,Ce=32000,pr=16000,dr=128,gr=200,Sr=2000,mr=16000,Er=80,_r=200,Tr=16000;var fr=2000;var ct=20000,Ie=1024,Pe=2000000;var Me=64000,Ge=8000,pt=4000;var dt=960000;var yr=999,Rr=1e4,de=500,hr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],vr=["stopped","starting","ready","failed"],Wr=new Set(hr),br=(e)=>Wr.has(e),xr=(e)=>e&&br(e)?e:"HOST_REJECTED",ee=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ee);if(Object(e)===e)return Object.values(e).every(ee);return!1},Or=(e)=>ee(e)&&JSON.stringify(e).length<=Tr,lr=(e)=>e?.trim().slice(0,_r)??"",te=(e)=>{let o=e.id.trim().slice(0,dr),s=e.title.trim().slice(0,gr),a=e.url.trim().slice(0,Sr),c=e.text?.trim().slice(0,mr),m=e.author?.trim().slice(0,Er),T=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:o,title:s||o,url:a,kind:T};if(c)E.text=c;if(m)E.author=m;if(T==="pull"){let k=lr(e.branches?.head),G=lr(e.branches?.base);if(k&&G)E.branches={head:k,base:G}}if(Or(e.data))E.data=e.data;return E},gt=(e)=>{let o=te(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},St=(e)=>{let o={text:e.text.trim().slice(0,pr)};if(e.send)o.send=!0;return o},mt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(yr,Math.max(0,Math.round(e)))},Et=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Rr,Math.max(0,Math.ceil(e)))};var re=(e)=>e.length>0&&e.length<=Ie&&!e.includes("\x00")&&!e.includes("\\");var we=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>fr)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},$r=new Set(vr),_t=(e)=>Boolean(e&&"status"in e&&$r.has(String(e.status))&&!("body"in e)),Ue=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Tt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ft=(e)=>Boolean(e&&"written"in e&&e.written===!0),yt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Kr=new Set(ur),Rt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Kr.has(String(e.kind))&&Number.isFinite(e.size)),ht=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),jr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),zr=(e)=>Object(e)===e?e:null,nt=(e)=>String(e)===e&&e.length>0,Qr=(e)=>{if(!nt(e.id))return null;if(e.ok===!0){let o={channel:g,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&nt(e.error))return{channel:g,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:xr(nt(e.code)?e.code:void 0)};return null},vt=(e)=>{let o=zr(e);if(!o||o.channel!==g||o.v!==S)return null;if(o.type==="result")return Qr(o);if(!jr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Ar=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Jr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class u extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var kr=()=>Promise.reject(new u("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ne=()=>Promise.reject(new u("BAD_PATH",`File path must be 1 to ${Ie} characters without NUL or backslash.`)),Le=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new u("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},d=(e)=>(e.value+=1,`mg-${e.value}`),bt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new u("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===o.parent),a=e.requestTimeoutMs??ct,c=new Set,m=new Set,T=new Set,E=new Set,k=new Set,G=new Set,ne=new Set,Se=new Set,me=new Set,Ee=new Set,_e=new Set,Q=new Set,$e=[],ie=null,ae=null,Te=new Set,fe=new Set,le=null,ue=null,Ke=!1,J=new Map,Y=new Map,Z=new Map,D=!1,p={value:0},l=null,H=null,ce=!1,pe=!1,Ht=null,Ft=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},w=(t)=>{o.parent.postMessage(t,"*")},Bt=()=>{if(D||o.parent===o||Q.size===0||l?.features?.lateGenerateResults!==!0)return;w({channel:g,v:S,type:"generate-late-listen"})},R=(t,r)=>{for(let n of t)try{n(r)}catch(i){console.error(i)}},Vt=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let r=vt(t.data);if(!r)return;if(r.type==="workspace"){let i=Y.get(r.payload.subscriptionId);if(i)R([i],r.payload.snapshot);return}if(r.type==="shells"){let i=Z.get(r.payload.subscriptionId);if(i)R([i],r.payload.snapshot);return}if(r.type==="ready"){if(l=r.payload,H=Ft(r.payload.session),R(c,r.payload),R(m,r.payload.directory),R(T,r.payload.session),H)R(E,H);if(R(k,r.payload.connection),R(G,r.payload.settings),R(ne,r.payload.item),r.payload.block)R(Se,r.payload.block);Bt();return}if(r.type==="service-event"){R(me,r.payload);return}if(r.type==="generate-late"){if(Q.size===0)$e.push(r.payload);else R(Q,r.payload);return}if(r.type==="directory"){if(l)l={...l,directory:r.payload.directory};R(m,r.payload.directory);return}if(r.type==="session"){if(l)l={...l,session:r.payload.session};if(!r.payload.session)H=null;else if(H?.sessionId!==r.payload.session.id)H=Ft(r.payload.session);R(T,r.payload.session);return}if(r.type==="session-lifecycle"){H=r.payload,R(E,r.payload);return}if(r.type==="connection"){if(l)l={...l,connection:r.payload.connection};R(k,r.payload.connection);return}if(r.type==="settings"){if(l)l={...l,settings:r.payload.settings};R(G,r.payload.settings);return}if(r.type==="item"){if(l)l={...l,item:r.payload.item};R(ne,r.payload.item);return}if(r.type==="status-control-event"){R(Ee,r.payload);return}if(r.type==="popover-closed"){R(_e,r.payload);return}if(r.type==="action"){let i=(_)=>{if(!D)w({channel:g,v:S,type:"action-result",id:r.id,payload:_})},f=ae;if(!f){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(r.payload)).then(()=>i({ok:!0}),(_)=>{let O=(_ instanceof Error?_.message:String(_)).trim();i({ok:!1,error:(O||"Action failed.").slice(0,de)})});return}if(r.type==="file-open"){let i=r.payload;if(ue&&sr(ue,i))return;ue=i,R(Te,r.payload);return}if(r.type==="file-saved"){R(fe,r.payload.version);return}if(r.type==="file-snapshot"){let i=(O)=>{if(!D)w({channel:g,v:S,type:"file-snapshot-result",id:r.id,payload:O})},f=(O)=>i({error:(O.trim()||"Could not read the edited file.").slice(0,de)}),_=le;if(!_){f("This extension does not edit files.");return}Promise.resolve().then(()=>_(r.payload.purpose)).then((O)=>{if(rt(O)>xe){f(`The file is over ${xe} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>Oe){f(`The snapshot version is over ${Oe} characters.`);return}i({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>f(O instanceof Error?O.message:String(O)));return}if(r.type==="resolve"){let i=(_)=>{w({channel:g,v:S,type:"resolve-result",id:r.id,payload:_})},f=ie;if(!f){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(r.payload)).then((_)=>i({item:_?te(_):null}),(_)=>{let O=(_ instanceof Error?_.message:String(_)).trim();i({error:(O||"Command failed.").slice(0,de)})});return}let n=J.get(r.id);if(!n)return;if(clearTimeout(n.timer),J.delete(r.id),r.ok){n.resolve(r.payload);return}n.reject(new u(r.code,r.error))};o.addEventListener("message",Vt),w({channel:g,v:S,type:"hello"});let P=(t,r=a)=>{if(D||o.parent===o)return Promise.reject(new u("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let f=setTimeout(()=>{J.delete(t.id),i(new u("HOST_TIMEOUT","Host did not answer in time."))},r);J.set(t.id,{resolve:n,reject:i,timer:f}),w(t)})},b=(t)=>P(t).then(()=>{return}),x={channel:g,v:S},je=(t)=>{if(!D&&o.parent!==o)w(t)},Xt=()=>je({...x,type:"file-save"}),qt=(t)=>{if(!Ar(t)||!Jr(t))return;t.preventDefault(),Xt()},Wt=(t)=>{if(!Ar(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),zt(l.popover.id,"escape").catch(()=>{return})},ye=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let r=ce||pe;if(Ht===r)return;Ht=r,Qt(t.id,r).catch(()=>{return})},Re=()=>{if(l?.surface!=="popover"||ce)return;ce=!0,ye()},$t=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!ce)return;ce=!1,ye()},Kt=()=>{if(l?.surface!=="popover"||pe)return;pe=!0,ye()},jt=()=>{if(l?.surface!=="popover"||!pe)return;pe=!1,ye()},L=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new u("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},ze=async(t)=>{if(t.kind!=="projects")L(t.projectId);let r=await P({...x,type:"workspace-read",id:d(p),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new u("HOST_REJECTED","Host did not return workspace data.");return r},Qe=async(t,r)=>{if(t.kind!=="projects")L(t.projectId);let n=d(p);Y.set(n,r);try{await b({...x,type:"workspace-subscribe",id:d(p),payload:{subscriptionId:n,query:t}})}catch(i){if(Y.delete(n),!D)w({...x,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:n}});throw i}return()=>{if(!Y.delete(n)||D)return;w({...x,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:n}})}},Vr=async(t,r)=>{if(t.kind==="session")L(t.sessionId);if(t.kind==="project")L(t.projectId);let n=d(p);Z.set(n,r);try{await b({...x,type:"shells-subscribe",id:d(p),payload:{subscriptionId:n,scope:t}})}catch(i){if(Z.delete(n),!D)w({...x,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:n}});throw i}return()=>{if(!Z.delete(n)||D)return;w({...x,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:n}})}},he=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ze))throw new u("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ee(t.value))throw new u("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>et)throw new u("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new u("UNSUPPORTED","This host does not support device storage.");let r=await P({...x,type:"storage",id:d(p),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new u("HOST_REJECTED","Host did not return storage data.");return r},zt=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):b({...x,type:"popover-close",id:d(p),payload:r?{id:t,reason:r}:{id:t}}),Qt=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):b({...x,type:"popover-anchor",id:d(p),payload:{id:t,active:r}});return o.addEventListener("keydown",Wt,!0),o.addEventListener("pointerover",Re),o.addEventListener("pointermove",Re),o.addEventListener("pointerout",$t),o.addEventListener("focus",Kt),o.addEventListener("blur",jt),{onAction:(t)=>(ae=t,()=>{if(ae===t)ae=null}),listProjects:async()=>{let t=await ze({kind:"projects"});if(t.kind!=="projects")throw new u("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await ze({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new u("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await ze({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new u("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Qe({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Qe({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")r(n)}),onSessions:(t,r)=>Qe({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")r(n)}),onRunningShells:(t,r)=>Vr(t,r),readShellOutput:async(t,r)=>{L(t,ve);let n=r?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new u("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=r?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>be))throw new u("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${be}.`);let _=await P({...x,type:"shell-output",id:d(p),payload:{shellId:t,cursor:n,tailBytes:i}});if(!_||typeof _.output!=="string"||!Number.isFinite(_.cursor))throw new u("HOST_REJECTED","Host did not return shell output.");return _},stopShell:async(t)=>{if(L(t,ve),(await P({...x,type:"shell-stop",id:d(p),payload:{shellId:t}}))?.stopped!==!0)throw new u("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{L(t),await b({...x,type:"open-session",id:d(p),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let n=Le(r),i={op:"get",key:t};if(n)i.scope=n;let f=await he(i);return f.op==="get"&&f.found?f.value:void 0},set:async(t,r,n)=>{let i=Le(n),f={op:"set",key:t,value:r};if(i)f.scope=i;await he(f)},delete:async(t,r)=>{let n=Le(r),i={op:"delete",key:t};if(n)i.scope=n;await he(i)},keys:async(t)=>{let r=Le(t),n={op:"keys"};if(r)n.scope=r;let i=await he(n);if(i.op!=="keys")throw new u("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(c.add(t),l)t(l);return()=>{c.delete(t)}},onDirectory:(t)=>{if(m.add(t),l)t(l.directory);return()=>{m.delete(t)}},onSession:(t)=>{if(T.add(t),l)t(l.session);return()=>{T.delete(t)}},onSessionLifecycle:(t)=>{if(E.add(t),H)t(H);return()=>{E.delete(t)}},onConnection:(t)=>{if(k.add(t),l)t(l.connection);return()=>{k.delete(t)}},onSettings:(t)=>{if(G.add(t),l)t(l.settings);return()=>{G.delete(t)}},onItem:(t)=>{if(ne.add(t),l)t(l.item);return()=>{ne.delete(t)}},onBlock:(t)=>{if(Se.add(t),l?.block)t(l.block);return()=>{Se.delete(t)}},onServiceEvent:(t)=>(me.add(t),()=>{me.delete(t)}),onStatusControl:(t)=>(Ee.add(t),()=>{Ee.delete(t)}),onPopoverClosed:(t)=>(_e.add(t),()=>{_e.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new u("UNSUPPORTED","This host does not support status controls."));if(!tr(t))return Promise.reject(new u("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return b({...x,type:"status-controls",id:d(p),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new u("UNSUPPORTED","This host does not support popovers."));if(!st(t))return Promise.reject(new u("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return b({...x,type:"popover-open",id:d(p),payload:t})},closePopover:zt,setPopoverAnchorActive:Qt,onResolve:(t)=>(ie=t,()=>{if(ie===t)ie=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>ke)return Promise.reject(new u("HOST_REJECTED",`Toast message must contain 1 to ${ke} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ce))return Promise.reject(new u("HOST_REJECTED",`Toast copy text must contain 1 to ${Ce} characters.`));return b({channel:g,v:S,type:"toast",id:d(p),payload:{...t,message:r}})},openUrl:(t)=>b({channel:g,v:S,type:"open-url",id:d(p),payload:{url:t}}),openCommit:(t)=>ut(t)?b({channel:g,v:S,type:"open-commit",id:d(p),payload:{sha:t}}):Promise.reject(new u("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>b({channel:g,v:S,type:"block-answer",id:d(p),payload:{text:t.trim().slice(0,it)}}),openSurface:(t)=>b({channel:g,v:S,type:"open-surface",id:d(p),payload:{surfaceId:t}}),writeClipboard:(t)=>b({channel:g,v:S,type:"clipboard-write",id:d(p),payload:{text:t}}),compose:(t)=>b({channel:g,v:S,type:"compose",id:d(p),payload:t}),attach:(t)=>b({channel:g,v:S,type:"attach",id:d(p),payload:te(t)}),startSession:async(t)=>{if(t.projectId!==void 0)L(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")L(r.directory);else{if(r.name!==void 0)L(r.name,200);if(r.baseBranch!==void 0)L(r.baseBranch,200)}let n=await P({channel:g,v:S,type:"start-session",id:d(p),payload:gt(t)},e.requestTimeoutMs??180000);if(!at(n))throw new u("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>P({channel:g,v:S,type:"prompt",id:d(p),payload:St(t)}).then((r)=>{if(!lt(r))throw new u("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>b({channel:g,v:S,type:"session-link",id:d(p),payload:te(t)}),close:()=>b({channel:g,v:S,type:"close",id:d(p)}),oauthStart:()=>b({channel:g,v:S,type:"oauth-start",id:d(p)}),oauthDisconnect:()=>b({channel:g,v:S,type:"oauth-disconnect",id:d(p)}),request:(t)=>(we(t.path)?P({channel:g,v:S,type:"request",id:d(p),payload:t}):kr()).then((r)=>{if(!Ue(r))throw new u("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(we(t.path)?P({channel:g,v:S,type:"service-request",id:d(p),payload:t}):kr()).then((r)=>{if(!Ue(r))throw new u("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>P({channel:g,v:S,type:"service-status",id:d(p)}).then((t)=>{if(!_t(t))throw new u("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(re(t)?P({channel:g,v:S,type:"file-read",id:d(p),payload:{path:t}}):Ne()).then((r)=>{if(!Tt(r))throw new u("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!re(t))return Ne();if(r.length>Pe)return Promise.reject(new u("FILE_TOO_LARGE",`Content is over ${Pe} characters.`));return P({channel:g,v:S,type:"file-write",id:d(p),payload:{path:t,content:r}}).then((n)=>{if(!ft(n))throw new u("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(re(t)?P({channel:g,v:S,type:"file-list",id:d(p),payload:{path:t}}):Ne()).then((r)=>{if(!yt(r))throw new u("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(re(t)?P({channel:g,v:S,type:"file-stat",id:d(p),payload:{path:t}}):Ne()).then((r)=>{if(!Rt(r))throw new u("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),n=t.system?.trim();if(r.length===0||r.length>Me)return Promise.reject(new u("HOST_REJECTED",`Prompt must be 1 to ${Me} characters.`));if(n!==void 0&&(n.length===0||n.length>Ge))return Promise.reject(new u("HOST_REJECTED",`System prompt must be 1 to ${Ge} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(pt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new u("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:r};if(n!==void 0)f.system=n;if(i!==void 0)f.maxOutputTokens=i;return P({channel:g,v:S,type:"generate",id:d(p),payload:f},e.requestTimeoutMs??dt).then((_)=>{if(!ht(_))throw new u("HOST_REJECTED","Host did not return generated text.");return _})},onLateGenerateResult:(t)=>{Q.add(t);for(let r of $e.splice(0))R([t],r);return Bt(),()=>{Q.delete(t)}},setBadge:(t)=>b({channel:g,v:S,type:"badge",id:d(p),payload:{count:mt(t)}}),setHeight:(t)=>b({channel:g,v:S,type:"resize",id:d(p),payload:{height:Et(t)}}),onFileOpen:(t)=>{if(Te.add(t),!Ke)Ke=!0,o.addEventListener("keydown",qt,!0);if(ue)t(ue);return()=>{Te.delete(t)}},onFileSnapshot:(t)=>(le=t,()=>{if(le===t)le=null}),onFileSaved:(t)=>(fe.add(t),()=>{fe.delete(t)}),reportFileChange:(t)=>je({...x,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Xt,reportFileUnsupported:()=>je({...x,type:"file-unsupported"}),dispose:()=>{for(let t of Y.keys())w({...x,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:t}});Y.clear();for(let t of Z.keys())w({...x,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:t}});if(Z.clear(),D=!0,ie=null,ae=null,le=null,Te.clear(),fe.clear(),Ke)o.removeEventListener("keydown",qt,!0);o.removeEventListener("message",Vt),o.removeEventListener("keydown",Wt,!0),o.removeEventListener("pointerover",Re),o.removeEventListener("pointermove",Re),o.removeEventListener("pointerout",$t),o.removeEventListener("focus",Kt),o.removeEventListener("blur",jt);for(let t of J.values())clearTimeout(t.timer),t.reject(new u("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),c.clear(),m.clear(),T.clear(),E.clear(),k.clear(),G.clear(),ne.clear(),Se.clear(),me.clear(),Ee.clear(),_e.clear(),Q.clear(),$e.length=0}}};var Cr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Do=new Set(Cr);var Ir=["none","agent","user"];var Fo=new Set(Ir);var Yr=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Zr=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],Pr=(e,o)=>{o.style.colorScheme=e.mode;for(let[s,a]of Yr)o.style.setProperty(s,e.tokens[a]);for(let[s,a,c]of Zr){let m=e.tokens[c]??"";o.style.setProperty(s,m),o.style.setProperty(a,m)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},xt=(e,o)=>{if(Pr(e.theme,o),o.dataset)o.dataset.mgSurface=e.surface,o.dataset.mgTheme=e.theme.mode};var eo={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},y=(e,o)=>`var(--${e}, var(--mg-${eo[e]}, ${o}))`,B=y("surface-background","transparent"),He=y("surface-elevated","transparent"),oe=y("surface-elevated-foreground","inherit"),U=y("surface-foreground","inherit"),h=y("surface-muted-foreground","gray"),to=y("surface-muted","transparent"),W=y("interactive-border","currentColor"),M=y("interactive-hover","transparent"),K=y("interactive-active","transparent"),Ot=y("interactive-selection","transparent"),At=y("interactive-selection-foreground","inherit"),F=y("primary","currentColor"),kt=y("primary-text","inherit"),Ct=y("error-text","inherit"),ro=y("font-sans","inherit"),It=y("font-mono","monospace"),Ur=y("radius","9px"),Pt=`calc(${Ur} - 2px)`,Mr=`calc(${Ur} - 4px)`,v=(e,o,s="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${s})`,Gr=`background-image: linear-gradient(${M}, ${M});`,Mt=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--mg-sdk-field-lift);`,Gt="border-color: var(--mg-sdk-edge); box-shadow: var(--mg-sdk-raised-lift);",wr="box-shadow: var(--mg-sdk-lit);",wt=`inset 0 0.5px 0 0 ${v(U,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,oo=`
:root {
  --mg-sdk-edge: ${v(U,16)};
  --mg-sdk-field-bg: ${He};
  --mg-sdk-raised-bg: ${B};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.14);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${v(U,14)};
  --mg-sdk-field-bg: ${v(B,50,He)};
  --mg-sdk-raised-bg: ${He};
  --mg-sdk-field-lift: ${wt};
  --mg-sdk-raised-lift: ${wt};
  --mg-sdk-lit: ${wt};
  --mg-sdk-float-edge: rgb(0 0 0 / 0.55);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,De=(e)=>{let o=y(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${o}; --mg-sdk-tone-text: ${y(`${e}-text`,"inherit")}; }`},so=`
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
`,Nr=`${oo}
.mg-sdk { color: ${U}; font-family: ${ro}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${Gr} }
.mg-sdk-mono { font-family: ${It}; }
.mg-sdk-muted { color: ${h}; }
${De("success")}${De("warning")}${De("error")}${De("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${F}; --mg-sdk-tone-text: ${kt}; }

.mg-sdk-btn { border-radius: ${Pt}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${Mr}; }
.mg-sdk-btn[data-variant="default"] { color: ${kt}; background: ${v(F,10,B)}; border-color: ${v(F,12)}; ${wr} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${v(F,16,B)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${v(F,22,B)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${to}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${K}, ${K}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${oe}; ${Gt} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${K}, ${K}); box-shadow: none; }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${K}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${y("status-error","red")}; color: ${Ct}; background: ${v("var(--mg-sdk-tone)",7,B)}; border-color: ${v("var(--mg-sdk-tone)",12)}; ${wr} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${v("var(--mg-sdk-tone)",9,B)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${v("var(--mg-sdk-tone)",11,B)}; box-shadow: none; }

.mg-sdk-field-note { color: ${h}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${Ct}; }
.mg-sdk-input { border-radius: ${Pt}; background: var(--mg-sdk-field-bg); color: ${oe}; ${Mt("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${h}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${Mt(v(U,26),"1px")} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${Mt(y("status-error","red"),"1px")} }
.mg-sdk-input[data-mono="true"] { font-family: ${It}; }

.mg-sdk-search-icon { color: ${h}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${F}; }
.mg-sdk-search-clear { border-radius: ${Mr}; color: ${h}; }
.mg-sdk-search-clear:hover { background: ${M}; color: ${U}; }

.mg-sdk-trigger { border-radius: ${Pt}; background: var(--mg-sdk-raised-bg); color: ${oe}; ${Gt} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${K}, ${K}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${h}; }
.mg-sdk-trigger-chevron { color: ${h}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.mg-sdk-popup { --surface-foreground: ${oe}; border-color: var(--mg-sdk-float-edge); border-radius: 12px; background: ${He}; background-clip: padding-box; color: ${oe}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${M}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ot}; color: ${At}; }
.mg-sdk-option-check { color: ${U}; }
.mg-sdk-option[data-destructive="true"] { color: ${Ct}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${v(y("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${h}; }
.mg-sdk-popup-empty { color: ${h}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${W}; border-radius: 4px; color: ${U}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${v(U,60,W)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${W}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${F}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${Gr} }
.mg-sdk-check-desc { color: ${h}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${v(U,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${h}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${U}; }
.mg-sdk-tab[aria-selected="true"] { color: ${At}; background: ${Ot}; border-color: ${W}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${oe}; background: var(--mg-sdk-raised-bg); ${Gt} }
.mg-sdk-tab-count { color: ${h}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.mg-sdk-badge { border-radius: 9999px; background: ${v(U,6)}; color: ${h}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${v("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${M}; }
.mg-sdk-row[aria-selected="true"] { background: ${Ot}; color: ${At}; }
.mg-sdk-row-lead { font-family: ${It}; color: ${h}; }
.mg-sdk-row-sub { color: ${h}; }
.mg-sdk-row-meta { color: ${h}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${h}; }

.mg-sdk-empty-body { color: ${h}; }

.mg-sdk-spinner { color: ${h}; }
.mg-sdk-spinner-ring { border-color: ${W}; border-top-color: ${F}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${v("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${h}; }

.mg-sdk-separator { color: ${h}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${v(W,40)}; }

.mg-sdk-progress-label { color: ${h}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.mg-sdk-progress-track { border-radius: 9999px; background: ${v(U,6)}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${F}); }
.mg-sdk-progress-track[aria-valuenow="100"] > .mg-sdk-progress-fill:not([data-tone]) { background: ${y("status-success","currentColor")}; }
.mg-sdk-progress[data-done="true"] .mg-sdk-progress-value { color: ${y("success-text","inherit")}; }

.mg-sdk-text a { color: ${kt}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${v(W,60)}; }
`,C=`
${Je}
${so}
${Nr}`;var Lr="mg-sdk-ui-style";var I=(e)=>{let o=document.getElementById(Lr);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}Ye(document);let s=document.createElement("style");s.id=Lr,s.textContent=e,document.head.appendChild(s)},A=(e,o)=>{let s=document.createElement(e);if(o)s.className=o;return s},V=(e)=>{let o=A("button",e);return o.type="button",o},N=(e,o)=>{let s=o??"";if(e.textContent!==s)e.textContent=s};var no=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},X=(e,o)=>{I(C);let s=o,a=V("mg-sdk mg-sdk-btn"),c=no(),m=document.createElement("span");a.append(m),e.append(a);let T=()=>{if(a.dataset.variant=s.variant??"default",a.dataset.size=s.size??"default",a.disabled=Boolean(s.disabled)||Boolean(s.loading),a.dataset.loading=s.loading?"true":"false",a.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&c.parentNode!==a)a.prepend(c);else if(!s.loading&&c.parentNode===a)c.remove();N(m,s.label)},E=()=>{if(s.disabled||s.loading)return;s.onClick()};return a.addEventListener("click",E),T(),{update:(k)=>{s={...s,...k},T()},dispose:()=>{a.removeEventListener("click",E),a.remove()}}};var Ut=(e,o)=>{I(C);let s=o,a=A("div","mg-sdk mg-sdk-empty"),c=A("h2","mg-sdk-empty-title"),m=A("p","mg-sdk-empty-body"),T=A("div","mg-sdk-empty-action");a.append(c,m,T),e.append(a);let E=null,k=()=>{if(N(c,s.title),N(m,s.body),m.hidden=!s.body,T.hidden=!s.action,!s.action){E?.dispose(),E=null;return}let G={label:s.action.label,onClick:s.action.onClick};if(E)E.update(G);else E=X(T,{...G,variant:"outline",size:"sm"})};return k(),{update:(G)=>{s={...s,...G},k()},dispose:()=>{E?.dispose(),E=null,a.remove()}}};var co=/^(\s*[-*+] )\[( |x|X)\] ?(.*)$/,Dr=(e)=>e.split(`
`).map((o)=>{let s=co.exec(o);return s?{kind:"item",prefix:s[1]??"- ",done:s[2]!==" ",text:s[3]??""}:{kind:"text",text:o}}),Hr=(e)=>e.map((o)=>o.kind==="text"?o.text:`${o.prefix}[${o.done?"x":" "}] ${o.text}`).join(`
`),qe=(e)=>{let o=2166136261;for(let s=0;s<e.length;s+=1)o^=e.charCodeAt(s),o=Math.imul(o,16777619);return`${e.length}:${(o>>>0).toString(16)}`},Fr=(e,o)=>{let s=-1,a="- ";e.forEach((E,k)=>{if(E.kind!=="item")return;s=k,a=E.prefix});let c={kind:"item",prefix:a,done:!1,text:o};if(s>=0)return[...e.slice(0,s+1),c,...e.slice(s+1)];return[...e.at(-1)?.kind==="text"&&e.at(-1)?.text===""?e.slice(0,-1):[...e],c,{kind:"text",text:""}]};var z=bt(),j=document.querySelector("#root");if(!j)throw Error("Missing root");var Br=document.createElement("style");Br.textContent=`
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
`;document.head.append(Br);z.onReady((e)=>xt(e,document.documentElement));var q=[],se=!1,Lt=Ae(null),Dt=()=>Hr(q),We=()=>{z.reportFileChange(Lt.observe(qe(Dt())))},Nt=()=>{if(j.replaceChildren(),!q.some((o)=>o.kind==="item")&&se){Ut(j,{title:"No items",body:"This checklist is empty."});return}if(q.forEach((o,s)=>{if(o.kind==="text"){let T=document.createElement("p");T.className="note",T.textContent=o.text,j.append(T);return}let a=document.createElement("div");a.className=o.done?"item done":"item";let c=document.createElement("input");c.type="checkbox",c.checked=o.done,c.disabled=se,c.addEventListener("change",()=>{o.done=c.checked,a.className=o.done?"item done":"item",We()});let m=document.createElement("input");if(m.type="text",m.value=o.text,m.readOnly=se,m.setAttribute("aria-label","Item"),m.addEventListener("input",()=>{o.text=m.value,We()}),a.append(c,m),!se){let T=document.createElement("span");T.className="remove",X(T,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>{q=q.filter((E,k)=>k!==s),We(),Nt()}}),a.append(T)}j.append(a)}),se)return;let e=document.createElement("div");e.className="actions",X(e,{label:"Add item",variant:"secondary",size:"sm",onClick:()=>{q=Fr(q,""),We(),Nt();let o=j.querySelectorAll('.item input[type="text"]');o.item(o.length-1)?.focus()}}),j.append(e)};z.onFileOpen((e)=>{if(e.encoding!=="text"){z.reportFileUnsupported();return}q=Dr(e.content),se=e.readOnly,Lt=Ae(qe(Dt())),Nt()});z.onFileSnapshot(()=>{let e=Dt();return{content:e,version:qe(e)}});z.onFileSaved((e)=>{z.reportFileChange({dirty:Lt.markSaved(e),edited:!1})});})();
