(()=>{var S="magio.sdk",g=1;var We=`
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
`;function $e(e){let o=e.documentElement;if(o.hasAttribute("data-mg-scrollbar-activity"))return;o.setAttribute("data-mg-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(u)=>{let d=u.target===e?o:u.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-mg-scrolling"))d.setAttribute("data-mg-scrolling","");let R=s.get(d);if(R!==void 0)clearTimeout(R);s.set(d,setTimeout(()=>{s.delete(d),d.removeAttribute("data-mg-scrolling")},1000))},{capture:!0,passive:!0})}var Ur=`(${$e.toString()})(document);`;var Ke=128,je=65536;var ye=128;var Re=65536;var Kt=/^[a-z][a-z0-9-]{0,39}$/;var qt=(e)=>Object(e)===e&&!Array.isArray(e),ze=(e,o)=>Object.keys(e).every((s)=>o.includes(s)),Wt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,$t=(e)=>String(e)===e&&e.length>=1&&e.length<=80,jt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let s of e){if(!qt(s)||!Kt.test(s.id)||!Wt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(o.has(s.id))return!1;if(o.add(s.id),s.kind==="button"){if(!ze(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!ze(s,["kind","id","label","value","options","disabled"]))return!1;if(!$t(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let u=new Set;for(let d of s.options){if(!qt(d)||!ze(d,["value","label"])||!$t(d.value)||!Wt(d.label)||u.has(d.value))return!1;u.add(d.value)}if(!u.has(s.value))return!1}return!0};var zt=["{id}","{segment}","{segments+}"];var go=new Set(zt);var Jt=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Eo=new Set(Jt);var he=20000000,ve=256;var Je=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Qt=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==o.bytes[s])return!1;return!0};var Yt=/^[A-Za-z0-9_-]{1,80}$/;var Zt=["left","right","top","bottom"];var er=(e,o=0,s={remaining:16000})=>{if(--s.remaining<0||o>=32)return!1;if(e===null)return!0;let u=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of u)if(!er(d,o+1,s))return!1;return!0},Qe=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Qe);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Qe)}return String(e)===e||Number.isFinite(e)},Ye=(e)=>{try{if(String(e.id)!==e.id||!Yt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Zt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!er(e.data)||!Qe(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var et=2000;var rr=["file","directory","other","missing"],tt=(e)=>Boolean(e&&"sessionId"in e),rt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var or=/^[0-9a-f]{7,64}$/i,ot=(e)=>or.test(e),be=500,xe=32000,sr=16000,nr=128,ir=200,ar=2000,lr=16000,ur=80,cr=200,pr=16000;var dr=2000;var st=20000,Oe=1024,Ae=2000000;var Ce=64000,ke=8000,nt=4000;var it=960000;var Sr=999,gr=1e4,ue=500,mr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Er=["stopped","starting","ready","failed"],Lr=new Set(mr),_r=(e)=>Lr.has(e),Tr=(e)=>e&&_r(e)?e:"HOST_REJECTED",J=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(J);if(Object(e)===e)return Object.values(e).every(J);return!1},fr=(e)=>J(e)&&JSON.stringify(e).length<=pr,tr=(e)=>e?.trim().slice(0,cr)??"",Q=(e)=>{let o=e.id.trim().slice(0,nr),s=e.title.trim().slice(0,ir),u=e.url.trim().slice(0,ar),d=e.text?.trim().slice(0,lr),R=e.author?.trim().slice(0,ur),E=e.kind==="pull"?"pull":"issue",m={providerId:e.providerId.trim(),id:o,title:s||o,url:u,kind:E};if(d)m.text=d;if(R)m.author=R;if(E==="pull"){let N=tr(e.branches?.head),B=tr(e.branches?.base);if(N&&B)m.branches={head:N,base:B}}if(fr(e.data))m.data=e.data;return m},at=(e)=>{let o=Q(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},lt=(e)=>{let o={text:e.text.trim().slice(0,sr)};if(e.send)o.send=!0;return o},ut=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Sr,Math.max(0,Math.round(e)))},ct=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(gr,Math.max(0,Math.ceil(e)))};var Y=(e)=>e.length>0&&e.length<=Oe&&!e.includes("\x00")&&!e.includes("\\");var Ie=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>dr)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Dr=new Set(Er),pt=(e)=>Boolean(e&&"status"in e&&Dr.has(String(e.status))&&!("body"in e)),Pe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),dt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),St=(e)=>Boolean(e&&"written"in e&&e.written===!0),gt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Hr=new Set(rr),mt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Hr.has(String(e.kind))&&Number.isFinite(e.size)),Et=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Fr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Br=(e)=>Object(e)===e?e:null,Ze=(e)=>String(e)===e&&e.length>0,Vr=(e)=>{if(!Ze(e.id))return null;if(e.ok===!0){let o={channel:S,v:g,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Ze(e.error))return{channel:S,v:g,type:"result",id:e.id,ok:!1,error:e.error,code:Tr(Ze(e.code)?e.code:void 0)};return null},_t=(e)=>{let o=Br(e);if(!o||o.channel!==S||o.v!==g)return null;if(o.type==="result")return Vr(o);if(!Fr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var yr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Xr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Rr=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Me=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Oe} characters without NUL or backslash.`)),Ge=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},p=(e)=>(e.value+=1,`mg-${e.value}`),Tt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===o.parent),u=e.requestTimeoutMs??st,d=new Set,R=new Set,E=new Set,m=new Set,N=new Set,B=new Set,re=new Set,pe=new Set,de=new Set,Se=new Set,ge=new Set,W=new Set,Fe=[],oe=null,se=null,me=new Set,Ee=new Set,ne=null,ie=null,Be=!1,K=new Map,j=new Map,z=new Map,L=!1,c={value:0},a=null,D=null,ae=!1,le=!1,Mt=null,Gt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},M=(t)=>{o.parent.postMessage(t,"*")},wt=()=>{if(L||o.parent===o||W.size===0||a?.features?.lateGenerateResults!==!0)return;M({channel:S,v:g,type:"generate-late-listen"})},y=(t,r)=>{for(let n of t)try{n(r)}catch(i){console.error(i)}},Ut=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let r=_t(t.data);if(!r)return;if(r.type==="workspace"){let i=j.get(r.payload.subscriptionId);if(i)y([i],r.payload.snapshot);return}if(r.type==="shells"){let i=z.get(r.payload.subscriptionId);if(i)y([i],r.payload.snapshot);return}if(r.type==="ready"){if(a=r.payload,D=Gt(r.payload.session),y(d,r.payload),y(R,r.payload.directory),y(E,r.payload.session),D)y(m,D);if(y(N,r.payload.connection),y(B,r.payload.settings),y(re,r.payload.item),r.payload.block)y(pe,r.payload.block);wt();return}if(r.type==="service-event"){y(de,r.payload);return}if(r.type==="generate-late"){if(W.size===0)Fe.push(r.payload);else y(W,r.payload);return}if(r.type==="directory"){if(a)a={...a,directory:r.payload.directory};y(R,r.payload.directory);return}if(r.type==="session"){if(a)a={...a,session:r.payload.session};if(!r.payload.session)D=null;else if(D?.sessionId!==r.payload.session.id)D=Gt(r.payload.session);y(E,r.payload.session);return}if(r.type==="session-lifecycle"){D=r.payload,y(m,r.payload);return}if(r.type==="connection"){if(a)a={...a,connection:r.payload.connection};y(N,r.payload.connection);return}if(r.type==="settings"){if(a)a={...a,settings:r.payload.settings};y(B,r.payload.settings);return}if(r.type==="item"){if(a)a={...a,item:r.payload.item};y(re,r.payload.item);return}if(r.type==="status-control-event"){y(Se,r.payload);return}if(r.type==="popover-closed"){y(ge,r.payload);return}if(r.type==="action"){let i=(_)=>{if(!L)M({channel:S,v:g,type:"action-result",id:r.id,payload:_})},T=se;if(!T){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>T(r.payload)).then(()=>i({ok:!0}),(_)=>{let O=(_ instanceof Error?_.message:String(_)).trim();i({ok:!1,error:(O||"Action failed.").slice(0,ue)})});return}if(r.type==="file-open"){let i=r.payload;if(ie&&Qt(ie,i))return;ie=i,y(me,r.payload);return}if(r.type==="file-saved"){y(Ee,r.payload.version);return}if(r.type==="file-snapshot"){let i=(O)=>{if(!L)M({channel:S,v:g,type:"file-snapshot-result",id:r.id,payload:O})},T=(O)=>i({error:(O.trim()||"Could not read the edited file.").slice(0,ue)}),_=ne;if(!_){T("This extension does not edit files.");return}Promise.resolve().then(()=>_(r.payload.purpose)).then((O)=>{if(Je(O)>he){T(`The file is over ${he} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>ve){T(`The snapshot version is over ${ve} characters.`);return}i({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>T(O instanceof Error?O.message:String(O)));return}if(r.type==="resolve"){let i=(_)=>{M({channel:S,v:g,type:"resolve-result",id:r.id,payload:_})},T=oe;if(!T){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>T(r.payload)).then((_)=>i({item:_?Q(_):null}),(_)=>{let O=(_ instanceof Error?_.message:String(_)).trim();i({error:(O||"Command failed.").slice(0,ue)})});return}let n=K.get(r.id);if(!n)return;if(clearTimeout(n.timer),K.delete(r.id),r.ok){n.resolve(r.payload);return}n.reject(new l(r.code,r.error))};o.addEventListener("message",Ut),M({channel:S,v:g,type:"hello"});let I=(t,r=u)=>{if(L||o.parent===o)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,i)=>{let T=setTimeout(()=>{K.delete(t.id),i(new l("HOST_TIMEOUT","Host did not answer in time."))},r);K.set(t.id,{resolve:n,reject:i,timer:T}),M(t)})},b=(t)=>I(t).then(()=>{return}),x={channel:S,v:g},Ve=(t)=>{if(!L&&o.parent!==o)M(t)},Nt=()=>Ve({...x,type:"file-save"}),Lt=(t)=>{if(!yr(t)||!Xr(t))return;t.preventDefault(),Nt()},Dt=(t)=>{if(!yr(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),Vt(a.popover.id,"escape").catch(()=>{return})},_e=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let r=ae||le;if(Mt===r)return;Mt=r,Xt(t.id,r).catch(()=>{return})},Te=()=>{if(a?.surface!=="popover"||ae)return;ae=!0,_e()},Ht=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!ae)return;ae=!1,_e()},Ft=()=>{if(a?.surface!=="popover"||le)return;le=!0,_e()},Bt=()=>{if(a?.surface!=="popover"||!le)return;le=!1,_e()},w=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new l("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Xe=async(t)=>{if(t.kind!=="projects")w(t.projectId);let r=await I({...x,type:"workspace-read",id:p(c),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return r},qe=async(t,r)=>{if(t.kind!=="projects")w(t.projectId);let n=p(c);j.set(n,r);try{await b({...x,type:"workspace-subscribe",id:p(c),payload:{subscriptionId:n,query:t}})}catch(i){if(j.delete(n),!L)M({...x,type:"workspace-unsubscribe",id:p(c),payload:{subscriptionId:n}});throw i}return()=>{if(!j.delete(n)||L)return;M({...x,type:"workspace-unsubscribe",id:p(c),payload:{subscriptionId:n}})}},wr=async(t,r)=>{if(t.kind==="session")w(t.sessionId);if(t.kind==="project")w(t.projectId);let n=p(c);z.set(n,r);try{await b({...x,type:"shells-subscribe",id:p(c),payload:{subscriptionId:n,scope:t}})}catch(i){if(z.delete(n),!L)M({...x,type:"shells-unsubscribe",id:p(c),payload:{subscriptionId:n}});throw i}return()=>{if(!z.delete(n)||L)return;M({...x,type:"shells-unsubscribe",id:p(c),payload:{subscriptionId:n}})}},fe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ke))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!J(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>je)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let r=await I({...x,type:"storage",id:p(c),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return r},Vt=(t,r)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):b({...x,type:"popover-close",id:p(c),payload:r?{id:t,reason:r}:{id:t}}),Xt=(t,r)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):b({...x,type:"popover-anchor",id:p(c),payload:{id:t,active:r}});return o.addEventListener("keydown",Dt,!0),o.addEventListener("pointerover",Te),o.addEventListener("pointermove",Te),o.addEventListener("pointerout",Ht),o.addEventListener("focus",Ft),o.addEventListener("blur",Bt),{onAction:(t)=>(se=t,()=>{if(se===t)se=null}),listProjects:async()=>{let t=await Xe({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await Xe({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await Xe({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>qe({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>qe({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")r(n)}),onSessions:(t,r)=>qe({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")r(n)}),onRunningShells:(t,r)=>wr(t,r),readShellOutput:async(t,r)=>{w(t,ye);let n=r?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=r?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Re))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Re}.`);let _=await I({...x,type:"shell-output",id:p(c),payload:{shellId:t,cursor:n,tailBytes:i}});if(!_||typeof _.output!=="string"||!Number.isFinite(_.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return _},stopShell:async(t)=>{if(w(t,ye),(await I({...x,type:"shell-stop",id:p(c),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{w(t),await b({...x,type:"open-session",id:p(c),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let n=Ge(r),i={op:"get",key:t};if(n)i.scope=n;let T=await fe(i);return T.op==="get"&&T.found?T.value:void 0},set:async(t,r,n)=>{let i=Ge(n),T={op:"set",key:t,value:r};if(i)T.scope=i;await fe(T)},delete:async(t,r)=>{let n=Ge(r),i={op:"delete",key:t};if(n)i.scope=n;await fe(i)},keys:async(t)=>{let r=Ge(t),n={op:"keys"};if(r)n.scope=r;let i=await fe(n);if(i.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(d.add(t),a)t(a);return()=>{d.delete(t)}},onDirectory:(t)=>{if(R.add(t),a)t(a.directory);return()=>{R.delete(t)}},onSession:(t)=>{if(E.add(t),a)t(a.session);return()=>{E.delete(t)}},onSessionLifecycle:(t)=>{if(m.add(t),D)t(D);return()=>{m.delete(t)}},onConnection:(t)=>{if(N.add(t),a)t(a.connection);return()=>{N.delete(t)}},onSettings:(t)=>{if(B.add(t),a)t(a.settings);return()=>{B.delete(t)}},onItem:(t)=>{if(re.add(t),a)t(a.item);return()=>{re.delete(t)}},onBlock:(t)=>{if(pe.add(t),a?.block)t(a.block);return()=>{pe.delete(t)}},onServiceEvent:(t)=>(de.add(t),()=>{de.delete(t)}),onStatusControl:(t)=>(Se.add(t),()=>{Se.delete(t)}),onPopoverClosed:(t)=>(ge.add(t),()=>{ge.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!jt(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return b({...x,type:"status-controls",id:p(c),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!Ye(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return b({...x,type:"popover-open",id:p(c),payload:t})},closePopover:Vt,setPopoverAnchorActive:Xt,onResolve:(t)=>(oe=t,()=>{if(oe===t)oe=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>be)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${be} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>xe))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${xe} characters.`));return b({channel:S,v:g,type:"toast",id:p(c),payload:{...t,message:r}})},openUrl:(t)=>b({channel:S,v:g,type:"open-url",id:p(c),payload:{url:t}}),openCommit:(t)=>ot(t)?b({channel:S,v:g,type:"open-commit",id:p(c),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>b({channel:S,v:g,type:"block-answer",id:p(c),payload:{text:t.trim().slice(0,et)}}),openSurface:(t)=>b({channel:S,v:g,type:"open-surface",id:p(c),payload:{surfaceId:t}}),writeClipboard:(t)=>b({channel:S,v:g,type:"clipboard-write",id:p(c),payload:{text:t}}),compose:(t)=>b({channel:S,v:g,type:"compose",id:p(c),payload:t}),attach:(t)=>b({channel:S,v:g,type:"attach",id:p(c),payload:Q(t)}),startSession:async(t)=>{if(t.projectId!==void 0)w(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")w(r.directory);else{if(r.name!==void 0)w(r.name,200);if(r.baseBranch!==void 0)w(r.baseBranch,200)}let n=await I({channel:S,v:g,type:"start-session",id:p(c),payload:at(t)},e.requestTimeoutMs??180000);if(!tt(n))throw new l("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>I({channel:S,v:g,type:"prompt",id:p(c),payload:lt(t)}).then((r)=>{if(!rt(r))throw new l("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>b({channel:S,v:g,type:"session-link",id:p(c),payload:Q(t)}),close:()=>b({channel:S,v:g,type:"close",id:p(c)}),oauthStart:()=>b({channel:S,v:g,type:"oauth-start",id:p(c)}),oauthDisconnect:()=>b({channel:S,v:g,type:"oauth-disconnect",id:p(c)}),request:(t)=>(Ie(t.path)?I({channel:S,v:g,type:"request",id:p(c),payload:t}):Rr()).then((r)=>{if(!Pe(r))throw new l("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Ie(t.path)?I({channel:S,v:g,type:"service-request",id:p(c),payload:t}):Rr()).then((r)=>{if(!Pe(r))throw new l("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>I({channel:S,v:g,type:"service-status",id:p(c)}).then((t)=>{if(!pt(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Y(t)?I({channel:S,v:g,type:"file-read",id:p(c),payload:{path:t}}):Me()).then((r)=>{if(!dt(r))throw new l("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!Y(t))return Me();if(r.length>Ae)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Ae} characters.`));return I({channel:S,v:g,type:"file-write",id:p(c),payload:{path:t,content:r}}).then((n)=>{if(!St(n))throw new l("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(Y(t)?I({channel:S,v:g,type:"file-list",id:p(c),payload:{path:t}}):Me()).then((r)=>{if(!gt(r))throw new l("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(Y(t)?I({channel:S,v:g,type:"file-stat",id:p(c),payload:{path:t}}):Me()).then((r)=>{if(!mt(r))throw new l("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),n=t.system?.trim();if(r.length===0||r.length>Ce)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ce} characters.`));if(n!==void 0&&(n.length===0||n.length>ke))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${ke} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(nt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let T={prompt:r};if(n!==void 0)T.system=n;if(i!==void 0)T.maxOutputTokens=i;return I({channel:S,v:g,type:"generate",id:p(c),payload:T},e.requestTimeoutMs??it).then((_)=>{if(!Et(_))throw new l("HOST_REJECTED","Host did not return generated text.");return _})},onLateGenerateResult:(t)=>{W.add(t);for(let r of Fe.splice(0))y([t],r);return wt(),()=>{W.delete(t)}},setBadge:(t)=>b({channel:S,v:g,type:"badge",id:p(c),payload:{count:ut(t)}}),setHeight:(t)=>b({channel:S,v:g,type:"resize",id:p(c),payload:{height:ct(t)}}),onFileOpen:(t)=>{if(me.add(t),!Be)Be=!0,o.addEventListener("keydown",Lt,!0);if(ie)t(ie);return()=>{me.delete(t)}},onFileSnapshot:(t)=>(ne=t,()=>{if(ne===t)ne=null}),onFileSaved:(t)=>(Ee.add(t),()=>{Ee.delete(t)}),reportFileChange:(t)=>Ve({...x,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Nt,reportFileUnsupported:()=>Ve({...x,type:"file-unsupported"}),dispose:()=>{for(let t of j.keys())M({...x,type:"workspace-unsubscribe",id:p(c),payload:{subscriptionId:t}});j.clear();for(let t of z.keys())M({...x,type:"shells-unsubscribe",id:p(c),payload:{subscriptionId:t}});if(z.clear(),L=!0,oe=null,se=null,ne=null,me.clear(),Ee.clear(),Be)o.removeEventListener("keydown",Lt,!0);o.removeEventListener("message",Ut),o.removeEventListener("keydown",Dt,!0),o.removeEventListener("pointerover",Te),o.removeEventListener("pointermove",Te),o.removeEventListener("pointerout",Ht),o.removeEventListener("focus",Ft),o.removeEventListener("blur",Bt);for(let t of K.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));K.clear(),d.clear(),R.clear(),E.clear(),m.clear(),N.clear(),B.clear(),re.clear(),pe.clear(),de.clear(),Se.clear(),ge.clear(),W.clear(),Fe.length=0}}};var hr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Po=new Set(hr);var vr=["none","agent","user"];var Go=new Set(vr);var qr=[["--mg-bg","background"],["--mg-elevated","elevated"],["--mg-fg","foreground"],["--mg-muted","muted"],["--mg-subtle","subtle"],["--mg-border","border"],["--mg-hover","hover"],["--mg-selection","selection"],["--mg-focus","focus"],["--mg-primary","primary"],["--mg-muted-surface","mutedSurface"],["--mg-elevated-fg","elevatedForeground"],["--mg-active","active"],["--mg-selection-fg","selectionForeground"],["--mg-primary-fg","primaryForeground"],["--mg-primary-text","primaryText"],["--mg-success-text","successText"],["--mg-warning-text","warningText"],["--mg-error-text","errorText"],["--mg-info-text","infoText"],["--mg-success","success"],["--mg-warning","warning"],["--mg-error","error"],["--mg-info","info"],["--mg-font","font"],["--mg-mono","mono"],["--mg-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Wr=[["--mg-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--mg-syntax-string","--syntax-string","syntaxString"],["--mg-syntax-number","--syntax-number","syntaxNumber"],["--mg-syntax-function","--syntax-function","syntaxFunction"],["--mg-syntax-type","--syntax-type","syntaxType"],["--mg-syntax-comment","--syntax-comment","syntaxComment"],["--mg-syntax-variable","--syntax-variable","syntaxVariable"],["--mg-syntax-operator","--syntax-operator","syntaxOperator"]],br=(e,o)=>{o.style.colorScheme=e.mode;for(let[s,u]of qr)o.style.setProperty(s,e.tokens[u]);for(let[s,u,d]of Wr){let R=e.tokens[d]??"";o.style.setProperty(s,R),o.style.setProperty(u,R)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},ft=(e,o)=>{if(br(e.theme,o),o.dataset)o.dataset.mgSurface=e.surface,o.dataset.mgTheme=e.theme.mode};var $r={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},f=(e,o)=>`var(--${e}, var(--mg-${$r[e]}, ${o}))`,F=f("surface-background","transparent"),Ue=f("surface-elevated","transparent"),Z=f("surface-elevated-foreground","inherit"),G=f("surface-foreground","inherit"),h=f("surface-muted-foreground","gray"),Kr=f("surface-muted","transparent"),X=f("interactive-border","currentColor"),P=f("interactive-hover","transparent"),q=f("interactive-active","transparent"),yt=f("interactive-selection","transparent"),Rt=f("interactive-selection-foreground","inherit"),H=f("primary","currentColor"),ht=f("primary-text","inherit"),vt=f("error-text","inherit"),jr=f("font-sans","inherit"),bt=f("font-mono","monospace"),Cr=f("radius","9px"),xt=`calc(${Cr} - 2px)`,xr=`calc(${Cr} - 4px)`,v=(e,o,s="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${s})`,Or=`background-image: linear-gradient(${P}, ${P});`,Ot=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--mg-sdk-field-lift);`,At="border-color: var(--mg-sdk-edge); box-shadow: var(--mg-sdk-raised-lift);",Ar="box-shadow: var(--mg-sdk-lit);",Ct=`inset 0 0.5px 0 0 ${v(G,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,zr=`
:root {
  --mg-sdk-edge: ${v(G,16)};
  --mg-sdk-field-bg: ${Ue};
  --mg-sdk-raised-bg: ${F};
  --mg-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --mg-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --mg-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --mg-sdk-float-edge: rgb(0 0 0 / 0.14);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-mg-theme="dark"] {
  --mg-sdk-edge: ${v(G,14)};
  --mg-sdk-field-bg: ${v(F,50,Ue)};
  --mg-sdk-raised-bg: ${Ue};
  --mg-sdk-field-lift: ${Ct};
  --mg-sdk-raised-lift: ${Ct};
  --mg-sdk-lit: ${Ct};
  --mg-sdk-float-edge: rgb(0 0 0 / 0.55);
  --mg-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,we=(e)=>{let o=f(`status-${e}`,"currentColor");return`
.mg-sdk[data-tone="${e}"], .mg-sdk [data-tone="${e}"] { --mg-sdk-tone: ${o}; --mg-sdk-tone-text: ${f(`${e}-text`,"inherit")}; }`},Jr=`
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
`,kr=`${zr}
.mg-sdk { color: ${G}; font-family: ${jr}; }
.mg-sdk :focus-visible, .mg-sdk:focus-visible { outline: none; }
.mg-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.mg-sdk:focus-visible { ${Or} }
.mg-sdk-mono { font-family: ${bt}; }
.mg-sdk-muted { color: ${h}; }
${we("success")}${we("warning")}${we("error")}${we("info")}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${H}; --mg-sdk-tone-text: ${ht}; }

.mg-sdk-btn { border-radius: ${xt}; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="xs"] { border-radius: ${xr}; }
.mg-sdk-btn[data-variant="default"] { color: ${ht}; background: ${v(H,10,F)}; border-color: ${v(H,12)}; ${Ar} }
.mg-sdk-btn[data-variant="default"]:hover { background: ${v(H,16,F)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${v(H,22,F)}; box-shadow: none; }
.mg-sdk-btn[data-variant="secondary"] { background: ${Kr}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${q}, ${q}); }
.mg-sdk-btn[data-variant="outline"] { background: var(--mg-sdk-raised-bg); color: ${Z}; ${At} }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${q}, ${q}); box-shadow: none; }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${P}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${q}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${f("status-error","red")}; color: ${vt}; background: ${v("var(--mg-sdk-tone)",7,F)}; border-color: ${v("var(--mg-sdk-tone)",12)}; ${Ar} }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${v("var(--mg-sdk-tone)",9,F)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${v("var(--mg-sdk-tone)",11,F)}; box-shadow: none; }

.mg-sdk-field-note { color: ${h}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${vt}; }
.mg-sdk-input { border-radius: ${xt}; background: var(--mg-sdk-field-bg); color: ${Z}; ${Ot("var(--mg-sdk-edge)")} transition: background 150ms ease-out; }
.mg-sdk-input::placeholder { color: ${h}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { ${Ot(v(G,26),"1px")} }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input, .mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { ${Ot(f("status-error","red"),"1px")} }
.mg-sdk-input[data-mono="true"] { font-family: ${bt}; }

.mg-sdk-search-icon { color: ${h}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${H}; }
.mg-sdk-search-clear { border-radius: ${xr}; color: ${h}; }
.mg-sdk-search-clear:hover { background: ${P}; color: ${G}; }

.mg-sdk-trigger { border-radius: ${xt}; background: var(--mg-sdk-raised-bg); color: ${Z}; ${At} transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${P}, ${P}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${q}, ${q}); }
.mg-sdk-trigger-value[data-empty="true"] { color: ${h}; }
.mg-sdk-trigger-chevron { color: ${h}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.mg-sdk-popup { --surface-foreground: ${Z}; border-color: var(--mg-sdk-float-edge); border-radius: 12px; background: ${Ue}; background-clip: padding-box; color: ${Z}; box-shadow: var(--mg-sdk-float); }
.mg-sdk-option { border-radius: 8px; }
.mg-sdk-option[data-active="true"] { background: ${P}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.mg-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${yt}; color: ${Rt}; }
.mg-sdk-option-check { color: ${G}; }
.mg-sdk-option[data-destructive="true"] { color: ${vt}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${v(f("status-error","red"),10)}; }
.mg-sdk-option-hint { color: ${h}; }
.mg-sdk-popup-empty { color: ${h}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.mg-sdk-check-box { border-color: ${X}; border-radius: 4px; color: ${G}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${v(G,60,X)}; }
.mg-sdk-check-thumb { border-radius: 9999px; background: ${X}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { border-radius: 9999px; background: ${F}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${H}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${Or} }
.mg-sdk-check-desc { color: ${h}; }

.mg-sdk-tabs { border-radius: 10px; }
.mg-sdk-tabs[data-track="true"] { background: ${v(G,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.mg-sdk-tab { border-radius: 8px; color: ${h}; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${G}; }
.mg-sdk-tab[aria-selected="true"] { color: ${Rt}; background: ${yt}; border-color: ${X}; }
.mg-sdk-tabs[data-track="true"] .mg-sdk-tab[aria-selected="true"] { color: ${Z}; background: var(--mg-sdk-raised-bg); ${At} }
.mg-sdk-tab-count { color: ${h}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.mg-sdk-badge { border-radius: 9999px; background: ${v(G,6)}; color: ${h}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${v("var(--mg-sdk-tone)",15)}; }

.mg-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${P}; }
.mg-sdk-row[aria-selected="true"] { background: ${yt}; color: ${Rt}; }
.mg-sdk-row-lead { font-family: ${bt}; color: ${h}; }
.mg-sdk-row-sub { color: ${h}; }
.mg-sdk-row-meta { color: ${h}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { color: ${h}; }

.mg-sdk-empty-body { color: ${h}; }

.mg-sdk-spinner { color: ${h}; }
.mg-sdk-spinner-ring { border-color: ${X}; border-top-color: ${H}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.mg-sdk-banner { border-color: transparent; border-radius: 8px; background: ${v("var(--mg-sdk-tone)",10)}; }
.mg-sdk-banner-title { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { color: ${h}; }

.mg-sdk-separator { color: ${h}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { background: ${v(X,40)}; }

.mg-sdk-progress-label { color: ${h}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.mg-sdk-progress-track { border-radius: 9999px; background: ${v(G,6)}; }
.mg-sdk-progress-fill { border-radius: 9999px; background: var(--mg-sdk-tone, ${H}); }
.mg-sdk-progress-track[aria-valuenow="100"] > .mg-sdk-progress-fill:not([data-tone]) { background: ${f("status-success","currentColor")}; }
.mg-sdk-progress[data-done="true"] .mg-sdk-progress-value { color: ${f("success-text","inherit")}; }

.mg-sdk-text a { color: ${ht}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { border-radius: 8px; border: 1px solid ${v(X,60)}; }
`,C=`
${We}
${Jr}
${kr}`;var Ir="mg-sdk-ui-style",ee=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},k=(e)=>{let o=document.getElementById(Ir);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}$e(document);let s=document.createElement("style");s.id=Ir,s.textContent=e,document.head.appendChild(s)},A=(e,o)=>{let s=document.createElement(e);if(o)s.className=o;return s},V=(e)=>{let o=A("button",e);return o.type="button",o},U=(e,o)=>{let s=o??"";if(e.textContent!==s)e.textContent=s};var Qr=()=>{let e=document.createElement("span");return e.className="mg-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},te=(e,o)=>{k(C);let s=o,u=V("mg-sdk mg-sdk-btn"),d=Qr(),R=document.createElement("span");u.append(R),e.append(u);let E=()=>{if(u.dataset.variant=s.variant??"default",u.dataset.size=s.size??"default",u.disabled=Boolean(s.disabled)||Boolean(s.loading),u.dataset.loading=s.loading?"true":"false",u.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&d.parentNode!==u)u.prepend(d);else if(!s.loading&&d.parentNode===u)d.remove();U(R,s.label)},m=()=>{if(s.disabled||s.loading)return;s.onClick()};return u.addEventListener("click",m),E(),{update:(N)=>{s={...s,...N},E()},dispose:()=>{u.removeEventListener("click",m),u.remove()}}};var ro=/(!?)\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g,oo=(e)=>{try{let o=new URL(e);return o.protocol==="http:"||o.protocol==="https:"}catch{return!1}},Pr=(e)=>{let o=[],s=0;for(let u of e.matchAll(ro)){let d=u.index??0;if(d>s)o.push({kind:"text",text:e.slice(s,d)});let R=u[1]??"",E=(u[2]??"").trim(),m=u[3]??"";if(!oo(m))o.push({kind:"text",text:u[0]});else if(R==="!")o.push({kind:"image",src:m,alt:E});else o.push({kind:"link",href:m,label:E||m});s=d+u[0].length}if(s<e.length)o.push({kind:"text",text:e.slice(s)});return o},kt=(e,o)=>{k(C);let s=o,u=A("div","mg-sdk mg-sdk-text");e.append(u);let d=(E)=>{if(!(E.target instanceof HTMLAnchorElement)||!s.onOpenUrl)return;E.preventDefault(),s.onOpenUrl(E.target.href)},R=()=>{ee(u);for(let E of Pr(s.text))if(E.kind==="text")u.append(document.createTextNode(E.text));else if(E.kind==="link"){let m=A("a");m.href=E.href,m.rel="noopener noreferrer",m.target="_blank",m.textContent=E.label,u.append(m)}else{let m=A("img");m.src=E.src,m.alt=E.alt,m.loading="lazy",m.referrerPolicy="no-referrer",u.append(m)}};return u.addEventListener("click",d),R(),{update:(E)=>{s={...s,...E},R()},dispose:()=>{u.removeEventListener("click",d),u.remove()}}};var It=Tt(),He=document.querySelector("#root");if(!He)throw Error("Agent Desk: missing root");var Gr=document.createElement("div"),Pt=(e)=>{let o=document.createElement("div");o.textContent=e,Gr.prepend(o)},Mr=!1;It.onReady((e)=>{if(ft(e,document.documentElement),Mr)return;Mr=!0,kt(He,{text:"Agent Desk"}),te(He,{label:"Start a session",onClick:()=>{It.serviceRequest({method:"POST",path:"/start",body:JSON.stringify({directory:e.directory})}).then((o)=>Pt(o.body)).catch(()=>Pt("The service did not answer."))}}),He.append(Gr)});It.onServiceEvent(({topic:e,data:o})=>Pt(`${e}: ${JSON.stringify(o)}`));})();
