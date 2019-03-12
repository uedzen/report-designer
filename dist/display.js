(function(e,t){if(!e.seajs){var i=e.seajs={version:"2.2.3"},r=i.data={},n=L("Object"),a=L("String"),s=Array.isArray||L("Array"),o=L("Function"),l=L("Undefined"),d=0,u=r.events={};i.on=function(e,t){return(u[e]||(u[e]=[])).push(t),i},i.off=function(e,t){if(!e&&!t)return u=r.events={},i;var n=u[e];if(n)if(t)for(var a=n.length-1;a>=0;a--)n[a]===t&&n.splice(a,1);else delete u[e];return i};var h,c=i.emit=function(e,t){var r,n=u[e];if(n)for(n=n.slice();r=n.shift();)r(t);return i},p=/[^?#]*\//,f=/\/\.\//g,g=/\/[^\/]+\/\.\.\//,b=/([^:\/])\/\//g,m=/^([^\/:]+)(\/.+)$/,x=/{([^{]+)}/g,v=/^\/\/.|:\//,y=/^.*?\/\/.*?\//,_=document,w=G(_.URL),k=_.scripts,j=_.getElementById("seajsnode")||k[k.length-1],E=G(((h=j).hasAttribute?h.src:h.getAttribute("src",4))||w);i.resolve=function(e,t){if(!e)return"";var i,n,s;e=function(e){var t=r.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(x,function(e,i){return a(t[i])?t[i]:e})),e}(e=function(e){var t,i=r.paths;return i&&(t=e.match(m))&&a(i[t[1]])&&(e=i[t[1]]+t[2]),e}(e=function(e){var t=r.alias;return t&&a(t[e])?t[e]:e}(e))),n=(i=e).length-1;var l=H(e="#"===(s=i.charAt(n))?i.substring(0,n):".js"===i.substring(n-2)||i.indexOf("?")>0||".css"===i.substring(n-3)||"/"===s?i:i+".js",t);return l=function(e){var t=r.map,i=e;if(t)for(var n=0,a=t.length;n<a;n++){var s=t[n];if((i=o(s)?s(e)||e:e.replace(s[0],s[1]))!==e)break}return i}(l)};var O,z,A=_.head||_.getElementsByTagName("head")[0]||_.documentElement,V=A.getElementsByTagName("base")[0],I=/\.css(?:\?|$)/i,S=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/(\d+).*/,"$1")<536;i.request=function(e,t,i,n){var a=I.test(e),s=_.createElement(a?"link":"script");i&&(s.charset=i),l(n)||s.setAttribute("crossorigin",n),function(e,t,i,n){var a="onload"in e;function s(){e.onload=e.onerror=e.onreadystatechange=null,i||r.debug||A.removeChild(e),e=null,t()}!i||!S&&a?a?(e.onload=s,e.onerror=function(){c("error",{uri:n,node:e}),s()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&s()}:setTimeout(function(){!function e(t,i){var r,n=t.sheet;if(S)n&&(r=!0);else if(n)try{n.cssRules&&(r=!0)}catch(e){"NS_ERROR_DOM_SECURITY_ERR"===e.name&&(r=!0)}setTimeout(function(){r?i():e(t,i)},20)}(e,t)},1)}(s,t,a,e),a?(s.rel="stylesheet",s.href=e):(s.async=!0,s.src=e),O=s,V?A.insertBefore(s,V):A.appendChild(s),O=null};var M,$=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,T=/\\\\/g,U=i.cache={},N={},C={},D={},q=Z.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};Z.prototype.resolve=function(){for(var e=this.dependencies,t=[],i=0,r=e.length;i<r;i++)t[i]=Z.resolve(e[i],this.uri);return t},Z.prototype.load=function(){if(!(this.status>=q.LOADING)){this.status=q.LOADING;var e=this.resolve();c("load",e);for(var t,i=this._remain=e.length,r=0;r<i;r++)(t=Z.get(e[r])).status<q.LOADED?t._waitings[this.uri]=(t._waitings[this.uri]||0)+1:this._remain--;if(0!==this._remain){var n={};for(r=0;r<i;r++)(t=U[e[r]]).status<q.FETCHING?t.fetch(n):t.status===q.SAVED&&t.load();for(var a in n)n.hasOwnProperty(a)&&n[a]()}else this.onload()}},Z.prototype.onload=function(){this.status=q.LOADED,this.callback&&this.callback();var e,t,i=this._waitings;for(e in i)i.hasOwnProperty(e)&&((t=U[e])._remain-=i[e],0===t._remain&&t.onload());delete this._waitings,delete this._remain},Z.prototype.fetch=function(e){var t=this.uri;this.status=q.FETCHING;var n={uri:t};c("fetch",n);var a=n.requestUri||t;function s(){i.request(n.requestUri,n.onRequest,n.charset,n.crossorigin)}a&&!C[a]?N[a]?D[a].push(this):(N[a]=!0,D[a]=[this],c("request",n={uri:t,requestUri:a,onRequest:function(){delete N[a],C[a]=!0,M&&(Z.save(t,M),M=null);var e,i=D[a];delete D[a];for(;e=i.shift();)e.load()},charset:o(r.charset)?r.charset(a):r.charset,crossorigin:o(r.crossorigin)?r.crossorigin(a):r.crossorigin}),n.requested||(e?e[n.requestUri]=s:s())):this.load()},Z.prototype.exec=function(){var e=this;if(e.status>=q.EXECUTING)return e.exports;e.status=q.EXECUTING;var t=e.uri;function i(e){return Z.get(i.resolve(e)).exec()}i.resolve=function(e){return Z.resolve(e,t)},i.async=function(e,r){return Z.use(e,r,t+"_async_"+B()),i};var r=e.factory,n=o(r)?r(i,e.exports={},e):r;return void 0===n&&(n=e.exports),delete e.factory,e.exports=n,e.status=q.EXECUTED,c("exec",e),n},Z.resolve=function(e,t){var r={id:e,refUri:t};return c("resolve",r),r.uri||i.resolve(r.id,t)},Z.define=function(e,t,i){var r,n,a=arguments.length;1===a?(i=e,e=void 0):2===a&&(i=t,s(e)?(t=e,e=void 0):t=void 0),!s(t)&&o(i)&&(r=i.toString(),n=[],r.replace(T,"").replace($,function(e,t,i){i&&n.push(i)}),t=n);var l={id:e,uri:Z.resolve(e),deps:t,factory:i};if(!l.uri&&_.attachEvent){var d=function(){if(O)return O;if(z&&"interactive"===z.readyState)return z;for(var e=A.getElementsByTagName("script"),t=e.length-1;t>=0;t--){var i=e[t];if("interactive"===i.readyState)return z=i}}();d&&(l.uri=d.src)}c("define",l),l.uri?Z.save(l.uri,l):M=l},Z.save=function(e,t){var i=Z.get(e);i.status<q.SAVED&&(i.id=t.id||e,i.dependencies=t.deps||[],i.factory=t.factory,i.status=q.SAVED)},Z.get=function(e,t){return U[e]||(U[e]=new Z(e,t))},Z.use=function(t,i,r){var n=Z.get(r,s(t)?t:[t]);n.callback=function(){for(var t=[],r=n.resolve(),a=0,s=r.length;a<s;a++)t[a]=U[r[a]].exec();i&&i.apply(e,t),delete n.callback},n.load()},Z.preload=function(e){var t=r.preload,i=t.length;i?Z.use(t,function(){t.splice(0,i),Z.preload(e)},r.cwd+"_preload_"+B()):e()},i.use=function(e,t){return Z.preload(function(){Z.use(e,t,r.cwd+"_use_"+B())}),i},Z.define.cmd={},e.define=Z.define,i.Module=Z,r.fetchedList=C,r.cid=B,i.require=function(e){var t=Z.get(Z.resolve(e));return t.status<q.EXECUTING&&(t.onload(),t.exec()),t.exports};var P,R;r.base=(E.match(/^(.+?\/)(\?\?)?(seajs\/)+/)||["",E])[1],r.dir=E,r.cwd=w,r.charset="utf-8",r.history={},r.preload=(P=[],R=location.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),(R+=" "+_.cookie).replace(/(seajs-\w+)=1/g,function(e,t){P.push(t)}),P),i.config=function(e){for(var t in e){var a=e[t],o=r[t];if(r.history[t]=r.history[t]||[],r.history[t].push(X(a)),o&&n(o))for(var l in a)o[l]=a[l];else s(o)?a=o.concat(a):"base"===t&&("/"!==a.slice(-1)&&(a+="/"),a=H(a)),r[t]=a}return c("config",e),i}}function L(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function B(){return d++}function G(e){return e.match(p)[0]}function H(e,t){var i,n=e.charAt(0);if(v.test(e))i=e;else if("."===n)i=function(e){for(e=e.replace(f,"/");e.match(g);)e=e.replace(g,"/");return e=e.replace(b,"$1/")}((t?G(t):r.cwd)+e);else if("/"===n){var a=r.cwd.match(y);i=a?a[0]+e.substring(1):e}else i=r.base+e;return 0===i.indexOf("//")&&(i=location.protocol+i),i}function Z(e,t){this.uri=e,this.dependencies=t||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}function X(e){if(n(e)){var t={};for(var i in e)t[i]=e[i];return t}return e}})(this),define("magix5",()=>{let e=0,t=[],i=window,r=document,n=setTimeout,a=encodeURIComponent;function s(){}let o=JSON.stringify,l=r.body,d=Date.now,u="prototype",h=Object[u].toString,c=e=>h.call(e).slice(8,-1),p=e=>"Object"==c(e),f=Array.isArray,g=t=>(t||"mx_")+e++,b=e=>r.getElementById(e),m=(e,t)=>e.innerHTML=t,x=g(),v={rootId:g(),defaultView:x,error(e){throw e}},y=e=>!e||"object"!=typeof e,_=(e,t,i)=>{if(e&&t&&!(i=e==t))try{i=16==(16&t.compareDocumentPosition(e))}catch(e){}return i},{assign:w,keys:k,hasOwnProperty:j}=Object,E=r.head,O=r.createElement("div"),z=O.getAttribute,A=(e,t)=>z.call(e,t),V=(e,t)=>{t&&!V[e]&&(V[e]=1,m(O,`<style>${t}`),E.appendChild(O.firstChild))},I=(e,i,r,n,a)=>{for(a of(i=i||t,f(e)||(e=[e]),f(i)||(i=[i]),e))try{n=a&&a.apply(r,i)}catch(e){v.error(e)}return n},S=(e,t)=>e&&j.call(e,t),M=(e,t)=>{let i,r;if(y(t))"\x1e"==(i=t+"")[0]&&e.has(i)&&(t=e.get(i));else for(i in t)r=t[i],r=M(e,r),t[i]=r;return t},$=(e,t)=>t.a-e.a||t.b-e.b;function T(e,t,i,r){(r=this).a=[],r.b=t||5,r.c=r.b+(e||20),r.d=i}w(T[u],{get(t){let i=this.a["\x1e"+t];return i&&(i.a++,i.b=e++,i=i.c),i},set(t,i){let r=this,n=r.a,a="\x1e"+t,s=n[a],o=r.b;if(!s){if(n.length>=r.c)for(n.sort($);o--;)(s=n.pop()).a>0&&r.del(s.o);s={d:t},n.push(s),n[a]=s}s.c=i,s.a=1,s.b=e++},del(e){e="\x1e"+e;let t=this.a,i=t[e],r=this.d;i&&(i.a=-1,i.c="",delete t[e],r&&I(r,i.d))},has(e){return S(this.a,"\x1e"+e)}});let U,N={bubbles:!0,cancelable:!0},C=[],D=(e,t,i,r,n,a)=>{let s={a:r,b:i,c:t,d:e,e(e){r?I(i,e,a):i(e)}};C.push(s),e.addEventListener(t,s.e,n)},q=(e,t,i,r,n)=>{for(let a,s=C.length;s--;)if((a=C[s]).c==t&&a.a==r&&a.d==e&&a.b===i){C.splice(s,1),e.removeEventListener(t,a.e,n);break}},P=new T,R=e=>{let t,i,r,n,a,s=P.get(e);if(!s){if(n={},-1==(a=e.indexOf("?")))t=e;else if(t=e.substring(0,a),e=e.substring(a+1))for(a of e.split("&"))[i,r]=a.split("="),n[i]=decodeURIComponent(r||"");P.set(e,s={a:t,b:n})}return{path:s.a,params:w({},s.b)}},L=new T,B=(e,t,i)=>(L.has(e)?i=L.get(e):(i=I(Function(`return ${e}`)),e.indexOf("\x1e")>-1?M(t,i):L.set(e,i)),i),G=(e,t)=>{if(e){let i=[];x==e?(U||(U=Le.extend()),t(U)):seajs.use(e,(...e)=>{for(let t of e)i.push(t&&t.__esModule&&t.default||t);t&&t(...i)})}else t()};function H(){}let Z=(e,t,i,r,n)=>(H[u]=t[u],n=new H,w(n,i),w(e,r),n.constructor=e,e[u]=n,e),X=e=>e;let F,W={fire(e,t){let i,r,n=this,a=n["\x1e"+e],s=0;if(t||(t={}),t.type=e,a)for(i=a.length;s<i;s++)(r=a[s]).f?(r.x=1,I(r.f,t,n),r.x=""):r.x||(a.splice(s--,1),i--);return(a=n[`on${e}`])&&I(a,t,n),n},on(e,t){let i="\x1e"+e;return(this[i]||(this[i]=[])).push({f:t}),this},off(e,t){let i,r="\x1e"+e,n=this,a=n[r];if(t){if(a)for(i of a)if(i.f==t){i.f="";break}}else delete n[r],delete n[`on${e}`];return n}},J={},K=(e,t,i,r)=>{t.indexOf("\x1e")>0&&(r=J[e])&&M(r.a.a,i)},Y=(e,t)=>{S(J,e)||(J[e]=t,te.fire("add",{vframe:t}))},Q=(e,t,i)=>{for(t=e.c;t.length;)(i=t.shift()).r||e.invoke(i.n,i.a),delete t[i.k]},ee=e=>e.b||(e.b=g());function te(e,t){let i=this,r=ee(e);i.id=r,i.root=e,i.pId=t,i.b={},i.d=1,i.c=[],Y(r,i)}w(te,{all:()=>J,byId:e=>J[e],byNode:e=>J[e.b]},W),w(te[u],{mountView(e,t){let i,r,n,a,s,o=this,{id:l,root:d,pId:u}=o;!o.e&&d&&(o.e=1,o.f=d.innerHTML),o.unmountView(),d&&e&&(i=R(e),n=i.path,o.path=e,a=i.params,K(u,e,a),o.g=n,w(a,t),r=o.d,G(n,e=>{if(r==o.d){if(!e)return v.error(Error(`${l} cannot load:${n}`));s=Re(e),n=new e(l,d,o,a,s),o.a=n,Ce(n),I(n.init,a,n),n.g(),n.tmpl||(o.e=0,n.h||n.endUpdate())}}))},unmountView(){let e=this,{a:t,root:i}=e;e.c=[],t&&(e.unmountZone(),e.a=0,t.d>0&&(t.d=0,t.fire("destroy"),t.off("destroy"),Ce(t,1),t.owner=t.root=null),t.d--,i&&e.e&&m(i,e.f)),e.d++},mountVframe(e,t,i){let r,n=this,a=n.id,s=n.b,o=ee(e);return(r=J[o])||(S(s,o)||(n.h=0),s[o]=o,r=new te(e,a)),r.mountView(t,i),r},mountZone(e){let t,i=this,r=(e=e||i.root).querySelectorAll("[mx-view]");for(t of r)t.a||(t.a=1,i.mountVframe(t,A(t,"mx-view")))},unmountVframe(e,t){let i,r;var n,a;e=e?this.b[t?e:e.b]:this.id,(i=J[e])&&(i.unmountView(),r=i.pId,(a=J[n=e])&&(delete J[n],a.root.a=0,te.fire("remove",{vframe:a}),a.id=a.root=a.pId=a.b=null),(i=J[r])&&S(i.b,e)&&(delete i.b[e],i.h=0))},unmountZone(e){let t,i,r,n=this;for(t in n.b)(r=e?(i=J[t])&&_(i.root,e):1)&&n.unmountVframe(t,1)},parent(e,t){for(t=this,e=e>>>0||1;t&&e--;)t=J[t.pId];return t},children(e){return(e=this).h||(e.h=k(e.b))},invoke(e,t){let i,r,n,a,s,o=this.c;return(r=this.a)&&r.h?i=(n=r[e])&&I(n,t,r):((a=o[s="\x1e"+e])&&(a.r=t===a.a),a={n:e,a:t,k:s},o.push(a),o[s]=a),i}});let ie=new T(30,10),re=/(?:([\w\-]+)\x1e)?([^(]+)\(([\s\S]*)?\)/,ne={},ae={},se=(e,i)=>{let r,n,a,s,o,d,u,h,c=[],p=e,f=A(e,`mx-${i}`),g=0;if(f&&((o=ie.get(f))||(o={v:(o=f.match(re)||t)[1],n:o[2],i:o[3]},ie.set(f,o)),o=w({},o,{r:f})),o&&!o.v||ae[i]){if(!(h=p.c)){for(u=[p];p!=l&&(p=p.parentNode);){if(J[n=p.b]||(n=p.c)){h=n;break}u.push(p)}if(h)for(f of u)f.c=h}if(h){p=e.b,J[p]&&(g=h=p);do{if((r=J[h])&&(d=r.a)){if(s=(a=d.i)[i])for(p=s.length;p--;)a={r:n=s[p],v:h,n:n},n?!g&&e.matches(n)&&c.push(a):g&&c.unshift(a);if(d.tmpl&&!g)break;g=0}}while(r&&(h=r.pId))}}return o&&c.push(o),c},oe=e=>{let t,i,r,n,a,s,o,d,{target:u,type:h}=e,c=[];for(;u!=l&&!(e.cancelBubble||(i=u.d)&&i[h]);){if(c.push(u),(t=se(u,h)).length){c=[];for(let{v:i,r:l,n:c,i:p}of t){if(o!=i){if(o&&e.cancelBubble)break;o=i}if(!(n=(r=J[i])&&r.a))break;n.h&&(s=n[a=c+"\x1e"+h])&&(e.eventTarget=u,d=p?B(p,n.a):{},e.params=d,I(s,e,n))}}u=u.parentNode||l}for(o of c)(i=o.d||(o.d={}))[h]=1},le=(e,t,i)=>{let r=0|ne[e],n=i?-1:1;r&&i!==r||(i?q:D)(l,e,oe),ne[e]=r+n,t&&(ae[e]=(0|ae[e])+n)};let de={"&":"amp","<":"lt",">":"gt",'"':"#34","'":"#39","`":"#96"},ue=/[&<>"'\`]/g,he=e=>""+(null==e?"":e),ce=e=>`&${de[e]};`,pe=e=>he(e).replace(ue,ce),fe={"!":"%21","'":"%27","(":"%28",")":"%29","*":"%2A"},ge=e=>fe[e],be=/[!')(*]/g,me=e=>a(he(e)).replace(be,ge),xe=/[\\'"]/g,ve=e=>he(e).replace(xe,"\\$&"),ye=(e,t,i)=>(e.has(t)||(i="\x1e"+e.size,e.set(t,i),e.set(i,t)),e.get(t)),_e=(e,t)=>{let i,r,n=e.j,a=e.k,s=e.id,o=J[s],l={a:[]},d=e.e,u=e.a,h=i=>{t.a<t.length?_e(e,t):(l=t.slice(),t.a=t.length=0,i&&e.fire("domready"),I(l))};if(t.a=t.length,e.k=0,e.j={},a&&e.d>0&&(i=e.tmpl)){for(r of(e.fire("dompatch"),r=i(d,we,s,he,me,u,ye,ve,f),Ie(e.root,e.l,r,l,o,n),e.l=r,l.a))r.g();i&&e.endUpdate(),h(1)}else h()},we=(e,t,i,r)=>{let n;if(e){t=t||{};let a,s,o,l,d,u,h="",c={},p="<"+e,f="",g=[];if(i)for(l of i)o=l.a,l.b==Ee&&(o=o?pe(o):" "),f+=o,u&&l.b==Ee&&u.b==Ee?u.a+=l.a:(l.d&&(c[l.d]=(c[l.d]||0)+1),l.e&&(a=1),u=l,g.push(l));for(s in t)!1!==(o=t[s])&&null!=o?(!0===o&&(t[s]=o=""),"id"==s?h=o:"mx-view"==s&&o&&!h?h=R(o).path:"mxs"==s?h||(h=o):"mxv"==s&&(a=1),"value"==s&&"textarea"==e?f=o:S(je,s)||(p+=` ${s}="${pe(o)}"`)):delete t[s];d=p,n={a:p+=r?"/>":`>${f}</${e}>`,c:f,d:h,b:e,e:a||S(ke,e),f:d,g:t,h:g,i:c,j:r}}else n={b:t?"\x1e":Ee,a:i+""};return n},ke={input:{value:1,checked:1},textarea:{value:1},option:{selected:1}},je={mxs:1,mxv:1};let Ee=e;let Oe="http://www.w3.org/",ze={svg:`${Oe}2000/svg`,math:`${Oe}1998/Math/MathML`},Ae=(e,t,i,r)=>{let n,a,s=0,o=ke[t.b],l=i.g,d=t.g;if(r){if(t)for(n in d)S(o,n)||S(l,n)||(s=1,e.removeAttribute(n));for(n in l)S(o,n)||S(je,n)||(a=l[n],t&&d[n]===a||(s=1,e.setAttribute(n,a)))}for(n in o)a=S(l,n)?"value"!=n||l[n]:"value"==n&&"",e[n]!=a&&(s=1,e[n]=a);return s&&delete e.d,s},Ve=(e,t,i)=>{let n,a=e.b;return a==Ee?n=r.createTextNode(e.a):(n=r.createElementNS(ze[a]||t.namespaceURI,a),Ae(n,0,e,1)&&(i.b=1),m(n,e.c)),n},Ie=(e,t,i,r,n,a)=>{if(t){if(t.e||t.c!=i.c){let s,o,l,d,u,h,c=t.h,p=i.h,f=c.length,g=p.length,b=i.i,x=e.childNodes,v={},y=0;for(s=f;s--;)(u=(l=c[s]).d)&&(u=v[u]||(v[u]=[])).push(x[s]);for(s=0;s<g;s++)if(d=p[s],l=c[y++],(u=v[d.d])&&(u=u.pop())){if(u!=x[s]){for(o=y,h=1;o<f;o++,h++)if((l=c[o])&&x[s+h]==u){c.splice(o,1),y--;break}e.insertBefore(u,x[s])}b[l.d]&&b[l.d]--,Se(u,e,l,d,r,n,a)}else l?v[l.d]&&b[l.d]?(f++,r.b=1,e.insertBefore(Ve(d,e,r),x[s]),y--):Se(x[s],e,l,d,r,n,a):("\x1e"==d.b?m(e,d.a):e.appendChild(Ve(d,e,r)),r.b=1);for(s=g;s<f;s++)1==(o=x[g]).nodeType&&n.unmountZone(o),e.removeChild(o)}}else r.b=1,m(e,i.c)},Se=(e,t,i,r,n,a,s)=>{let o=i.g,l=r.g,d=i.b;if(i.e||i.a!=r.a)if(d==r.b){if(d==Ee)n.b=1,e.nodeValue=r.a;else if("\x1e"==d)n.b=1,m(t,r.a);else if(!o.mxs||o.mxs!=l.mxs){let t,u,h,c,p,f,g,b=l["mx-view"],m=r.c,x=i.f!=r.f,v=S(ke,d)||x,y=J[e.b],_=b&&R(b);if(v&&(v=Ae(e,i,r,x))&&(n.b=1),b&&y&&y.g==_.path&&(c=y.a)){if(f=m!=i.c,g=b!=y.path,h=o.mxv,!f&&!g&&h)for(h of p=h.split(","))if("#"==h||S(s,h)){g=1;break}(g||f||v)&&((h=c.h&&c.m)?(p=_.params,K(y.pId,b,p),y.path=b,I(h,p,c)&&n.a.push(c),t=!c.tmpl):(u=1,t=1))}else t=1,u=y;u&&(n.b=1,y.unmountVframe(0,1)),t&&!r.j&&Ie(e,i,r,n,a,s)}}else"\x1e"==i.b?m(t,r.a):(a.unmountZone(e),t.replaceChild(Ve(r,t,n),e)),n.b=1},Me={},$e=w({get:e=>e?Me[e]:Me,set(e){w(Me,e)}},W),Te=/^(\$?)([^<]*)<([^>]+)>(?:&(.+))?$/,Ue=(e,t,i)=>(e.a?i=e:((i=function(e){I(i.a,e,this)}).a=[e],i.b=1),i.a=i.a.concat(t.a||t),i),Ne=(e,t,i,r,n)=>{r=e[t],e[t]=e[i]=function(...e){(n=this).d>0&&(n.d++,n.fire("rendercall"),I(r,e,n))}},Ce=(e,t)=>{let i,{n:r,i:n,o:a,id:s}=e;for(i in r)le(i,n[i],t);for(i of(r=t?q:D,a))r(i.a,i.b,i.c,s,i.d,e)},De={win:i,doc:r},qe=(e,t,i)=>{let r,n,a,s,o={};for(n of e)for(r in n)a=n[r],s=o[r],"ctor"!=r?(Te.test(r)&&(s?a=Ue(s,a):a.b=1),o[r]=a):i.push(a);for(r in o)S(t,r)||(t[r]=o[r])};function Pe(...e){let t=this.a||(this.a=[]);return qe(e,this[u],t),this}let Re=e=>{if(!e["\x1e"]){e["\x1e"]=[];let t,i,r,n,a,s,o,l,d,h,c,p=e[u],f={},g=[],b={};for(o in(i=p.mixins)&&qe(i,p,e["\x1e"]),p)if(t=p[o],i=o.match(Te)){if([,s,r,n,c]=i,h={},c)for(l of c=c.split(","))h[l]=!0;for(l of n=n.split(",")){if(a=De[r],d=1,s){if(a){g.push({c:t,a:a,b:l,d:h});continue}d=2,(a=b[l])||(a=b[l]=[]),a[r]||(a[r]=1,a.push(r))}f[l]=f[l]|d,(a=p[l=r+"\x1e"+l])?a.b&&(t.b?p[l]=Ue(t,a):S(p,o)&&(p[l]=t)):p[l]=t}}Ne(p,"render","g"),p.n=f,p.o=g,p.i=b,p.m=p.assign}return e["\x1e"]};function Le(e,t,i,r,n){(n=this).root=t,n.owner=i,n.id=e,n.c={},n.d=1,n.k=1,n.e={id:e},n.a=new Map,n.f=[],n.j={},(e=Le.a)&&I(e,r,n)}function Be(){this.id=g("b"),this.a={}}w(Le,{merge:Pe,extend:function e(t,i){let r=this,n=(t=t||{}).ctor,a=[];function s(e,t,i,n,o,l,d,u){r.call(d=this,e,t,i,n,o),(l=s.a)&&I(l,n,d),(u=a.concat(o)).length&&I(u,n,d)}return n&&a.push(n),s.merge=Pe,s.extend=e,Z(s,r,t,i)}}),w(Le[u],W,{init:s,render:s,beginUpdate(e,t){(t=this).d>0&&t.h&&t.owner.unmountZone(e)},endUpdate(e,t,i,r){(t=this).d>0&&(r=t.h,t.h=1,(i=t.owner).mountZone(e),r||n(t.wrapAsync(Q),0,i))},wrapAsync(e,t){let i=this,r=i.d;return(...n)=>{if(r>0&&r==i.d)return e.apply(t||i,n)}},get(e,t){return t=this.e,e&&(t=t[e]),t},set(e,t){let i,r,n,a=this,s=a.e,o=a.j,l=a.k;for(n in e)i=e[n],r=s[n],y(i)&&r===i||S(t,n)||(o[n]=1,l=1),s[n]=i;return a.k=l,a},digest(e,t,i){let r=this.set(e,t),n=r.f;i&&n.push(i),n.a||_e(r,n)},snapshot(){return this.p=o(this.e),this},altered(){let e=this;if(e.p)return e.p!=o(e.e)},translate(e){return M(this.e,e)},parse(e){return B(e,this.a)}}),w(Be[u],{get(e,t){let i,r=this.a;if(e){let t,i=f(e)?e.slice():(e+"").split(".");for(;(t=i.shift())&&r;)r=r[t];t&&(r=void 0)}return void 0!==t&&(i=c(t))!=c(r)&&(r=t),r},set(e,t){p(e)||(e={[e]:t}),w(this.a,e)}});let Ge=(e,t,i)=>r=>{(i=e[t])&&(delete e[t],I(i,r,i.a))},He=(e,t,i,r,n,a)=>{let s=[],o=null,l=0;return function(u,h){let c;l++;let p,f=this,g=f.b,b=g.a;if(s[u+1]=f,h?(o=h,c=1):a.has(b)||(b&&a.set(b,f),g.b=d(),(p=g.c)&&I(p,f,f),c=1),!i.a){let t=l==r;t&&(i.b=0,2==n&&(s[0]=o,I(e,s,i))),1==n&&I(e,[h||null,f,t,u],i)}c&&t.fire("end",{bag:f,error:h})}},Ze=(e,t,i,r,n)=>{if(e.a)return e;if(e.b)return e.enqueue(Ze.bind(e,e,t,i,r,n));e.b=1,f(t)||(t=[t]);let a=e.constructor,s=0,o=a.d,l=He(i,a,e,t.length,r,a.c);for(let e of t)if(e){let t,[i,r]=a.get(e,n),d=i.b.a,u=l.bind(i,s++);d&&o[d]?o[d].push(u):r?(d&&((t=[u]).a=i,o[d]=t,u=Ge(o,d)),a.e(i,u)):u()}return e};function Xe(){let e=this;e.id=g("s"),e.f=[]}w(Xe[u],{all(e,t){return Ze(this,e,t,2)},save(e,t){return Ze(this,e,t,2,1)},one(e,t){return Ze(this,e,t,1)},enqueue(e){let t=this;return t.a||(t.f.push(e),t.dequeue(t.g)),t},dequeue(...e){let t,i=this;i.b||i.a||(i.b=1,n(()=>{i.b=0,i.a||(t=i.f.shift())&&I(t,i.g=e)},0))},destroy(e){(e=this).a=1,e.f=0}});let Fe=(e,t,i)=>[o(t),o(e)].join("\x1e"),We=w({add(e){let t,i=this.h;for(t of(f(e)||(e=[e]),e))if(t){let{name:e,cache:r}=t;t.cache=0|r,i[e]=t}},create(e){let t=this.meta(e),i=0|e.cache||t.cache,r=new Be;r.set(t),r.b={c:t.after,a:i&&Fe(t,e)},p(e)&&r.set(e);let n=t.before;return n&&I(n,r,r),this.fire("begin",{bag:r}),r},meta(e){return this.h[e.name||e]||e},get(e,t){let i,r,n=this;return t||(i=n.cached(e)),i||(i=n.create(e),r=1),[i,r]},cached(e){let t,i,r=this,n=r.c,a=r.meta(e),s=0|e.cache||a.cache;if(s&&(i=Fe(a,e)),i){let e=r.d[i];e?t=e.a:(t=n.get(i))&&d()-t.b.b>s&&(n.del(i),t=0)}return t}},W);Xe.extend=((e,t,i)=>{function r(){Xe.call(this)}return r.e=e,r.c=new T(t,i),r.d={},r.h={},Z(r,Xe,null,We)}),w(s[u],W),s.extend=function e(t,i){let r=this,n=t&&t.ctor;function a(...e){r.apply(this,e),n&&n.apply(this,e)}return a.extend=e,Z(a,r,t,i)};let Je={config:(e,t)=>(t=v,e&&(t=p(e)?w(t,e):t[e]),t),boot(e){w(v,e),((e,t)=>(F||(e=v.rootId,(t=b(e))||(t=l),F=new te(t)),F))().mountView(v.defaultView)},toMap:(e,t)=>{let i,r={};if(e)for(i of e)r[t&&i?i[t]:i]=t?i:1+(0|r[i]);return r},toTry:I,toUrl:(e,t,i)=>{let r,n,s,o=[];for(n in t)r=t[n]+"",(!i||r||S(i,n))&&(r=a(r),o.push(s=n+"="+r));return s&&(e+=(e&&(~e.indexOf("?")?"&":"?"))+o.join("&")),e},parseUrl:R,mix:w,has:S,keys:k,inside:_,applyStyle:V,guid:g,Cache:T,use:G,dispatch:(e,t,i)=>{let r=new Event(t,N);w(r,i),e.dispatchEvent(r)},type:c,View:Le,State:$e,Vframe:te,Service:Xe,Event:W,guard:X,node:b};return Je.default=Je,Je});let Designer={init(e){let t=document.getElementById("boot").src.replace(/\/[^\/]+$/,"/");seajs.config({paths:{display:t+"display",elements:t+"elements",i18n:t+"i18n"},alias:{magix:"magix5"}}),seajs.use(["magix5","i18n/index"],(e,t)=>{e.applyStyle("p_","body,h5,input,p,textarea,ul{margin:0;padding:0}ul{list-style-type:none;list-style-image:none}a{background-color:transparent}a:active,a:hover{outline-width:0}a:focus{outline:1px dotted}html{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;font-size:62.5%}body{font-size:14px;line-height:1.5}body,button,input,textarea{font-family:helvetica neue,arial,hiragino sans gb,stheiti,wenquanyi micro hei,sans-serif;-ms-text-autospace:ideograph-alpha ideograph-numeric ideograph-parenthesis;-ms-text-spacing:ideograph-alpha ideograph-numeric ideograph-parenthesis;text-spacing:ideograph-alpha ideograph-numeric ideograph-parenthesis}h5{font-size:14px}img{border-style:none;width:auto\\9;height:auto;max-width:100%;vertical-align:top;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}button,input,textarea{font-family:inherit;font-size:100%;margin:0;vertical-align:middle;*vertical-align:middle}button,input{*overflow:visible}button{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;-moz-appearance:button;appearance:button;cursor:pointer}button[disabled],input[disabled]{cursor:not-allowed}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0;*height:13px;*width:13px}button::-moz-focus-inner,input::-moz-focus-inner{border-style:none;padding:0}textarea{overflow:auto;resize:vertical}@media screen and (-webkit-min-device-pixel-ratio:0){input{line-height:normal!important}}input::-moz-placeholder,textarea::-moz-placeholder{color:#a9a9a9;opacity:1}label{cursor:pointer}html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}a:focus,button:focus,input:focus,textarea:focus{outline:none;resize:none}a{color:#fa742b;text-decoration:none}a:focus,a:hover{color:#bd361b}a:active,a:focus,a:hover,a:visited{outline:0;text-decoration:none}label{cursor:default;display:inline-block;max-width:100%;font-weight:400}::-ms-clear{display:none}");let i="zh-cn";try{let e=window.localStorage;e&&(i=e.getItem("l.report.lang")||i)}catch(e){}e.config({lang:i});let r=t.default;document.title=r("___"),e.View.merge({ctor(){this.set({i18n:r})}}),e.boot({defaultPath:"/index",defaultView:"display/index",rootId:"app",error(e){setTimeout(()=>{throw e},0)}})})}};define("i18n/index",["magix","./zh-cn"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix"),n={"zh-cn":e("./zh-cn").default},a=r.default.has,s=/\{(\d+)\}/g;t.default=((e,...t)=>{let i=(r.default.config("lang")||navigator.language).toLowerCase();a(n,i)||(i="zh-cn");let o=n[i],l=a(o,e)?o[e]:e;return t.length&&(l=l.replace(s,(e,i,r)=>(i|=0,t.length>i?(r=t[i],a(o,r)?o[r]:r):e))),l})}),define("i18n/zh-cn",[],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={___:"\u7269\u8054\u7f51\u5c55\u793a\u9875\u9762",_b:"\u8bf7\u9009\u62e9\u5e73\u94fa\u56fe\u7247",_a:"\u8bf7\u9009\u62e9\u56fe\u7247",_c:"\u8bf7\u8f93\u5165\u5185\u5bb9"}}),define("display/index",["magix"],(e,t,i)=>{let r,n={class:"p_"};Object.defineProperty(t,"__esModule",{value:!0});const a=e("magix");a.default.applyStyle("pa",".p_{display:flex;justify-content:center}.pa{font-size:16px;height:120px;line-height:120px}"),t.default=a.default.View.extend({tmpl:(e,t,i,a,s,o,l)=>{let d,u,h,c,p,f=[],{stage:g}=e;if(d=[],g){let e=g.elements,i=g.page;c=[];for(let i=0,r=e,n=r.length;i<n;i++){let e=r[i];p=[t("div",{mxv:"stage","mx-view":"elements/"+a(e.type)+"/index?props="+l(o,e.props)})],c.push(...p)}h="width:"+a(i.width)+"px;height:"+a(i.height)+"px;background:"+a(i.background)+";",i.backgroundImage&&(h+="background-image:url("+a(i.backgroundImage)+");background-repeat:"+a("full"==i.backgroundRepeat?"no-repeat":i.backgroundRepeat)+";background-size:","full"==i.backgroundRepeat?h+="100% 100%":h+=a(i.backgroundWidth)+"px "+a(i.backgroundHeight)+"px;background-position:"+a(i.hor)+"% "+a(i.ver)+"%"),u=[t("div",{style:h},c)],d.push(...u)}else r?u=[r]:(c=[t(0,0,"\u8bf7\u5728\u7269\u8054\u7f51\u8bbe\u8ba1\u5668\u9875\u9762\u8bbe\u8ba1\u597d\u9875\u9762\u540e\uff0c\u70b9\u4fdd\u5b58\u5e76\u590d\u5236\u8bbe\u8ba1\u597d\u7684 JSON \u7136\u540e\u5728\u8be5\u9875\u9762\u8fdb\u884c\u7c98\u8d34")],u=[r=t("div",{mxs:"p_:_",class:"pa"},c)]),d.push(...u);return f.push(t("div",n,d)),t(i,0,f)},render(){this.digest()},"$doc<paste>"(e){let t=e.clipboardData.getData("text/plain");this.digest({stage:JSON.parse(t)})}})}),define("elements/chart-bar/index",["magix"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix");t.default=r.default.View.extend({tmpl:(e,t,i,r)=>{let n,a=[],{props:s,id:o}=e;return n="position:absolute;left:"+r(s.x)+"px;top:"+r(s.y)+"px;height:"+r(s.height)+"px;opacity:"+r(s.alpha)+";width:"+r(s.width)+"px;transform:rotate("+r(s.rotate)+"deg);",s.background&&(n+="background:"+r(s.background)+";"),a.push(t("div",{id:"chart_"+r(o),style:n})),t(i,0,a)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){if(this.digest(),this.get("onlyMove"))return;let e=this.get("props");this.___||(this.___=echarts.init(r.node("chart_"+this.id)),this.on("destroy",()=>{this.___.dispose()}));let t=this.___;t.setOption({title:{text:e.title},tooltip:{trigger:"axis"},xAxis:{data:[1,2,3,4,5]},yAxis:{type:"value"},series:[{data:[120,300,400,220,40],type:"bar"},{data:[90,200,600,100,50],type:"bar"}]},!0),t.resize()}})}),define("elements/chart-line/index",["magix"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix");t.default=r.default.View.extend({tmpl:(e,t,i,r)=>{let n,a=[],{props:s,id:o}=e;return n="position:absolute;left:"+r(s.x)+"px;top:"+r(s.y)+"px;height:"+r(s.height)+"px;opacity:"+r(s.alpha)+";width:"+r(s.width)+"px;transform:rotate("+r(s.rotate)+"deg);",s.background&&(n+="background:"+r(s.background)+";"),a.push(t("div",{id:"chart_"+r(o),style:n})),t(i,0,a)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){if(this.digest(),this.get("onlyMove"))return;let e=this.get("props");this.___||(this.___=echarts.init(r.node("chart_"+this.id)),this.on("destroy",()=>{this.___.dispose()}));let t=this.___;t.setOption({title:{text:e.title},tooltip:{trigger:"axis"},xAxis:{data:[1,2,3,4,5]},yAxis:{type:"value"},series:[{data:[120,300,400,220,40],type:"line"},{data:[90,200,600,100,50],type:"line"}]},!0),t.resize()}})}),define("elements/chart-meter/index",["magix"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix");t.default=r.default.View.extend({tmpl:(e,t,i,r)=>{let n,a=[],{props:s,id:o}=e;return n="position:absolute;left:"+r(s.x)+"px;top:"+r(s.y)+"px;height:"+r(s.height)+"px;opacity:"+r(s.alpha)+";width:"+r(s.width)+"px;transform:rotate("+r(s.rotate)+"deg);",s.background&&(n+="background:"+r(s.background)+";"),a.push(t("div",{id:"chart_"+r(o),style:n})),t(i,0,a)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){if(this.digest(),this.get("onlyMove"))return;this.get("props");this.___||(this.___=echarts.init(r.node("chart_"+this.id)),this.on("destroy",()=>{this.___.dispose()}));let e=this.___;e.setOption({series:[{type:"gauge",detail:{formatter:"{value}%"},data:[{value:50,name:"\u5b8c\u6210\u7387"}]}]},!0),e.resize()}})}),define("elements/chart-pie/index",["magix"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix");t.default=r.default.View.extend({tmpl:(e,t,i,r)=>{let n,a=[],{props:s,id:o}=e;return n="position:absolute;left:"+r(s.x)+"px;top:"+r(s.y)+"px;height:"+r(s.height)+"px;opacity:"+r(s.alpha)+";width:"+r(s.width)+"px;transform:rotate("+r(s.rotate)+"deg);",s.background&&(n+="background:"+r(s.background)+";"),a.push(t("div",{id:"chart_"+r(o),style:n})),t(i,0,a)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){if(this.digest(),this.get("onlyMove"))return;let e=this.get("props");this.___||(this.___=echarts.init(r.node("chart_"+this.id)),this.on("destroy",()=>{this.___.dispose()}));let t=this.___;t.setOption({title:{text:e.title,x:"center"},series:[{data:[{value:120,name:"pie1"},{vaue:300,name:"pie2"},{value:400,name:"pie3"},{value:220,name:"pie4"},{value:40,name:"pie5"}],type:"pie",name:"test"}]},!0),t.resize()}})}),define("elements/circle/index",["magix"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix");t.default=r.default.View.extend({tmpl:(e,t,i,r)=>{let n,a=[],{props:s}=e;return n="position:absolute;border-radius:50%;left:"+r(s.x)+"px;top:"+r(s.y)+"px;",s.borderwidth&&(n+="border:"+r(s.borderwidth)+"px "+r(s.bordertype)+" "+r(s.bordercolor)+";"),s.fillcolor&&(n+="background:"+r(s.fillcolor)+";"),n+="height:"+r(s.height)+"px;opacity:"+r(s.alpha)+";width:"+r(s.width)+"px;transform:rotate("+r(s.rotate)+"deg);",a.push(t("div",{style:n})),t(i,0,a)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){this.digest()}})}),define("elements/image/index",["magix"],(e,t,i)=>{let r={style:"display:flex;align-items:center;justify-content:center;height:100%"};Object.defineProperty(t,"__esModule",{value:!0});const n=e("magix");t.default=n.default.View.extend({tmpl:(e,t,i,n)=>{let a,s,o,l=[],{props:d,i18n:u}=e;return a=[],d.image?(s=[t("img",{style:"width:100%;height:100%",src:n(d.image)},0,1)],a.push(...s)):(o=[t(0,0,u("_a"))],s=[t("div",r,o)],a.push(...s)),l.push(t("div",{style:"position:absolute;left:"+n(d.x)+"px;top:"+n(d.y)+"px;height:"+n(d.height)+"px;opacity:"+n(d.alpha)+";width:"+n(d.width)+"px;transform:rotate("+n(d.rotate)+"deg);"},a)),t(i,0,l)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){this.digest()}})}),define("elements/line/index",["magix"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix");t.default=r.default.View.extend({tmpl:(e,t,i,r)=>{let n=[],{props:a}=e;return n.push(t("div",{style:"position:absolute;left:"+r(a.x)+"px;top:"+r(a.y)+"px;border-top:"+r(a.height)+"px "+r(a.linetype)+" "+r(a.color)+";opacity:"+r(a.alpha)+";width:"+r(a.width)+"px;transform:rotate("+r(a.rotate)+"deg);"})),t(i,0,n)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){this.digest()}})}),define("elements/rect/index",["magix"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix");t.default=r.default.View.extend({tmpl:(e,t,i,r)=>{let n,a=[],{props:s}=e;return n="position:absolute;left:"+r(s.x)+"px;top:"+r(s.y)+"px;",s.borderwidth&&(n+="border:"+r(s.borderwidth)+"px "+r(s.bordertype)+" "+r(s.bordercolor)+";"),s.fillcolor&&(n+="background:"+r(s.fillcolor)+";"),n+="height:"+r(s.height)+"px;opacity:"+r(s.alpha)+";width:"+r(s.width)+"px;transform:rotate("+r(s.rotate)+"deg);",s.radius&&(n+="border-radius:"+r(s.radius)+"px;"),a.push(t("div",{style:n})),t(i,0,a)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){this.digest()}})}),define("elements/repeat/index",["magix"],(e,t,i)=>{let r={style:"display:flex;align-items:center;justify-content:center;height:100%"};Object.defineProperty(t,"__esModule",{value:!0});const n=e("magix");t.default=n.default.View.extend({tmpl:(e,t,i,n)=>{let a,s,o,l,d=[],{props:u,scale:h,i18n:c}=e;return s=[],u.image||(l=[t(0,0,c("_b"))],o=[t("div",r,l)],s.push(...o)),a="position:absolute;left:"+n(u.x)+"px;top:"+n(u.y)+"px;height:"+n(u.height)+"px;opacity:"+n(u.alpha)+";width:"+n(u.width)+"px;transform:rotate("+n(u.rotate)+"deg);",u.radius&&(a+="border-radius:"+n(u.radius)+"px;"),u.image&&(a+="background-image:url("+n(u.image)+");background-size:"+n(u.imageWidth*h)+"px "+n(u.imageHeight*h)+"px;background-repeat:"+n(u.repeat)+";background-position:"+n(u.hor)+"% "+n(u.ver)+"%"),d.push(t("div",{style:a},s)),t(i,0,d)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){this.digest()}})}),define("elements/text/index",["magix"],(e,t,i)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e("magix");t.default=r.default.View.extend({tmpl:(e,t,i,r)=>{let n,a,s,o=[],{props:l,scale:d,i18n:u}=e;return s="",l.text?s+=" "+l.text+" ":s+=" "+u("_c")+" ",a=[t(0,0,s)],n="position:absolute;left:"+r(l.x)+"px;top:"+r(l.y)+"px;display:flex;color:"+r(l.forecolor)+";",l.background&&(n+="background:"+r(l.background)+";"),n+="font-size:"+r(l.fontsize*d)+"px;height:"+r(l.height)+"px;letter-spacing:"+r(l.ls*d)+"px;opacity:"+r(l.alpha)+";",l.style.bold&&(n+="font-weight:bold;"),l.style.italic&&(n+="font-style:italic;"),l.style.underline&&(n+="text-decoration:underline;"),n+="align-items:"+r(l.align.v)+";justify-content:"+r(l.align.h)+";overflow:hidden;width:"+r(l.width)+"px;transform:rotate("+r(l.rotate)+"deg);",o.push(t("div",{style:n},a)),t(i,0,o)},init(e){this.assign(e)},assign(e){return this.set(e),!0},render(){this.digest()}})});