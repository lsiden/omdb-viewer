(this["webpackJsonpomdb-film-browser-web"]=this["webpackJsonpomdb-film-browser-web"]||[]).push([[0],{54:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function r(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}function o(){if("serviceWorker"in navigator){if(new URL("/omdb-film-browser-web",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/omdb-film-browser-web","/service-worker.js");a?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):r(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):r(e)}))}}},55:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(16),i=n(2),l=n(10),c=n(13),u=n(12),s=n(15),m=n(14),f=n(25),d=n.n(f),h={background:"linear-gradient(to right, #000040, #3b00ff)",padding:"10px",color:"white"},p={fontSize:22,marginTop:10},y=function(){return r.a.createElement("header",{style:h},r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},r.a.createElement("h1",{style:p},"Open Movie Database Browser"),!/about\/?$/.test(window.location.href)&&r.a.createElement(o.b,{to:"/about",style:{color:"white"}},"About")))},v={color:"#210d87"},b=function(e){var t=e.filmSummary;return r.a.createElement("div",null,r.a.createElement(o.b,{to:"/film/".concat(t.imdbID),style:v,title:"View film details"},"".concat(t.Title,", ").concat(t.Year)))},g=n(51),w=n.n(g),E=n(56),k=n(35),j=n(52),O=n.n(j),C="update-films",S="append-films",D="update-film-details",T="update-is-fetching",q="set-query",I=n(3);function L(e,t){return e[t.imdbID]=t,e}var R=function(e,t){return Object(I.a)(Object(I.a)({},e),{},{films:(t.films||[]).reduce(L,{}),totalResults:parseInt(t.totalResults||"0",10),pageNum:1})},F=function(e,t){return Object(I.a)(Object(I.a)({},e),{},{films:(t.films||[]).reduce(L,Object(I.a)({},e.films||{})),pageNum:t.pageNum})},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{type:q,data:{query:e}}},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return{type:C,data:{films:t,query:e,totalResults:n,pageNum:1}}},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return function(t){var n=O()((function(e){return t(J(e))}),300);return t(x(e)),e?n(e):t(P([]))}},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return{type:S,data:{films:t,pageNum:e}}},M=function(e){return{type:D,data:{filmDetails:e}}},z=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return{type:T,data:{isFetching:e}}};function N(e){return Object.values(e.films||{})}var A=Object(k.a)({reducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.data;switch(n){case D:case T:case q:return Object(I.a)(Object(I.a)({},e),a);case C:return R(e,a);case S:return F(e,a);default:return e}},preloadedState:{isFetching:!1,films:[],totalResults:0,query:""},middleware:Object(E.a)(Object(k.b)())}),U="".concat("https://www.omdbapi.com","?apikey=").concat("fbfcb8c7","&type=movie"),H=function(e){return"".concat(U,"&s=").concat(e)};function K(e){try{return e.json()}catch(t){return Promise.reject(t)}}var Q=function(e){console.error(e),w.a.error(e,"An error occured",{preventDuplicates:!0})},_=function(e,t){var n,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e4,r=new Promise((function(e,t){n=setTimeout((function(){t(new Error("Unable to fetch data. Try a different title or try again later."))}),a)}));return e(z(!0)),Promise.race([fetch(t),r]).then(K).catch(Q).finally((function(){clearTimeout(n),e(z(!1))}))},J=function(e){return function(t){return _(t,H(e)).then((function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{Search:[],totalResults:0};return t(P(e,n.Search,n.totalResults))}))}},Y=function(){return function(e){var t=A.getState(),n=t.query,a=void 0===n?"":n,r=t.pageNum,o=(void 0===r?1:r)+1;return _(e,function(e,t){return H(e)+"&page=".concat(t)}(a,o)).then((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{Search:[],totalResults:0};e(W(o,t.Search))}))}},$=function(e){return function(t){return t(M(null)),_(t,function(e){return"".concat(U,"&i=").concat(e,"&plot=full")}(e)).then((function(e){return t(M(e))}))}},V=function(e){var t=e.style,n=e.onClick,a=e.children;return r.a.createElement("button",{type:"button",onClick:n,className:"btn btn-link",style:t},a)};V.defaultProps={style:{}};var G=V,X={marginBottom:20,fontSize:20,color:"darkgrey"},Z=Object(l.b)((function(){return{}}),(function(e){return{dispatchPageFetch:function(){return e(Y())}}}))((function(e){var t=e.dispatchPageFetch;return r.a.createElement(G,{onClick:t,style:X,title:"More"},"More")}));function ee(){window.scrollTo(0,0)}var te=n(20),ne={position:"absolute",top:"-4pt",left:"6pt",color:"#888",fontSize:"20pt",transform:"rotate(-45deg)"},ae={position:"absolute",fontSize:16,bottom:4,right:8,color:"#888"},re=function(){return r.a.createElement("span",{style:ne,charSet:"utf-8",dangerouslySetInnerHTML:{__html:"\u26b2"}})},oe=function(e){var t=e.onClick;return r.a.createElement("span",{role:"button",tabIndex:0,"aria-label":"Cancel",className:"hover-pointer",style:ae,charSet:"utf-8",dangerouslySetInnerHTML:{__html:"\u2a09"},onClick:t,onKeyPress:t})};oe.defaultProps={onClick:function(){}};var ie={position:"relative",width:"100%"},le={height:"24pt",textIndent:"24pt",fontSize:"12pt",color:"black",width:"100%"},ce=function(e){var t=e.value,n=e.onCancelClick,a=e.onChange,o=e.placeholder;return r.a.createElement("div",{style:ie},r.a.createElement(re,null),r.a.createElement("input",{type:"search",value:t,placeholder:o,onChange:a,style:le}),r.a.createElement(oe,{onClick:n}))};ce.defaultProps={value:"",placeholder:""};var ue=ce,se={display:"flex"},me={marginRight:"1em"},fe={flex:"1 1"},de=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).ref=r.a.createRef(),a.onChange=a.onChange.bind(Object(te.a)(a)),a.onCancel=a.onCancel.bind(Object(te.a)(a)),a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){if(this.ref.current){var e=this.ref.current.querySelector("input[type=search]");e&&e.focus()}}},{key:"componentDidCatch",value:function(e,t){console.error(e,t)}},{key:"onCancel",value:function(){this.replaceUriHistory(),this.props.dispatchSetQuery("")}},{key:"onChange",value:function(e){var t=this.props.dispatchSetQuery,n=e.target.value;this.replaceUriHistory(n),t(n)}},{key:"replaceUriHistory",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=e?"/search/".concat(e):"/";window.history.replaceState({},"",t)}},{key:"render",value:function(){var e=this.props.query;return r.a.createElement("form",{ref:this.ref,style:h},r.a.createElement("div",{style:se},r.a.createElement("label",{htmlFor:"query-form-search-input",style:me},"Search"),r.a.createElement(ue,{style:fe,id:"query-form-search-input",placeholder:"Film Title ...",value:e,onChange:this.onChange,onCancelClick:this.onCancel})))}}]),n}(r.a.Component);de.defaultProps={query:""};var he=Object(l.b)((function(e){return{query:e.query||""}}),(function(e){return{dispatchSetQuery:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e(B(t))}}}))(de),pe={listStyleType:"none",lineHeight:1.5,marginTop:20},ye={fontSize:"14pt",color:"#210d87",margin:"1em"},ve={marginLeft:40,display:"flex",justifyContent:"flex-start",alignItems:"baseline"},be={marginLeft:40,fontSize:16,color:"darkgrey"},ge={margin:50},we=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"componentDidUpdate",value:function(){window.scrollTo(0,document.body.scrollHeight)}},{key:"componentDidCatch",value:function(e,t){console.error(e,t)}},{key:"renderInner",value:function(){var e=this.props,t=e.query,n=e.films,a=e.totalResults,o=e.isFetching;return 0===t.length?r.a.createElement("div",{style:ye}," Search for a title. "):t.length>0&&0===n.length?r.a.createElement("div",{style:ye}," There are no films that match your query. "):r.a.createElement("div",null,r.a.createElement("ul",{style:pe},n.map((function(e){return r.a.createElement(b,{key:e.imdbID,filmSummary:e})}))),o&&r.a.createElement(d.a,{style:ge}),r.a.createElement("div",{style:ve},n.length<a&&r.a.createElement(Z,null),n.length&&r.a.createElement(G,{onClick:ee,style:be,title:"Scroll to top of page"},"Scroll to Top of List")))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(y,null),r.a.createElement(he,null),this.renderInner())}}]),n}(r.a.Component);we.defaultProps={query:"",films:[],totalResults:0};var Ee=Object(l.b)((function(e,t){return{query:e.query||t.query,films:N(e),totalResults:e.totalResults||0,isFetching:e.isFetching||!1}}))(we),ke={fontSize:20},je=function(e){var t=e.buttonStyle,n=Object(i.e)();return r.a.createElement(G,{onClick:n.goBack,style:Object(I.a)(Object(I.a)({},ke),t),title:"Close"},"\u2715")};je.defaultProps={buttonStyle:{}};var Oe=je,Ce={marginBottom:"5pt"},Se={marginTop:20,fontSize:"14pt"},De={marginBottom:20},Te={margin:50},qe=function(e){return e&&"N/A"!==e},Ie=Object(I.a)(Object(I.a)({},h),{},{display:"flex",justifyContent:"space-between"}),Le=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(e){var a;Object(c.a)(this,n);var r=(a=t.call(this,e)).props;return(0,r.dispatchFetchFilmDetails)(r.imdbID),a}return Object(u.a)(n,null,[{key:"onKeyDown",value:function(e){27===e.keyCode&&window.history.back()}}]),Object(u.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",n.onKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",n.onKeyDown)}},{key:"renderTitle",value:function(){var e=this.props.filmDetails;return e&&r.a.createElement("header",{style:Ie},r.a.createElement("h2",{style:Object(I.a)(Object(I.a)({},Ce),{},{marginTop:0})},e.Title),r.a.createElement(Oe,{buttonStyle:{color:"white"}}))}},{key:"renderDetails",value:function(){var e,t=this.props.filmDetails,n=function(e){var n=e.name,a=e.label;return r.a.createElement("li",null,a||n,": ",t[n])};return r.a.createElement("ul",{style:Se},r.a.createElement(n,{name:"Year"}),r.a.createElement(n,{name:"Director"}),r.a.createElement(n,{name:"Writer"}),r.a.createElement(n,{name:"Actors",label:"Cast"}),r.a.createElement(n,{name:"Language"}),qe(t.Awards)&&r.a.createElement(n,{name:"Awards"}),r.a.createElement(n,{name:"Runtime",label:"Length"}),r.a.createElement(n,{name:"imdbRating",label:"IMDB Rating"}),r.a.createElement(n,{name:"BoxOffice"}),qe(t.Website)&&r.a.createElement(n,{key:"Website",label:"Official Website"}),r.a.createElement("li",null,r.a.createElement("a",{href:(e=t.imdbID,"https://www.imdb.com/title/".concat(e))},"IMDB page")))}},{key:"render",value:function(){var e=this.props,t=e.filmDetails;return e.isFetching?r.a.createElement("div",null,r.a.createElement(y,null),r.a.createElement(d.a,{style:Te,size:64})):t&&r.a.createElement("div",null,r.a.createElement(y,null),this.renderTitle(),r.a.createElement("div",{style:{marginLeft:20}},r.a.createElement("img",{src:t.Poster,alt:"poster",style:{marginTop:10}}),this.renderDetails(),n.renderScrollToTopButton()))}}],[{key:"renderScrollToTopButton",value:function(){return r.a.createElement(G,{style:De,onClick:ee,title:"Scroll to top of page"},"Top")}}]),n}(r.a.Component);Le.defaultProps={filmDetails:null};var Re=Object(l.b)((function(e){return{filmDetails:e.filmDetails,isFetching:e.isFetching}}),(function(e){return{dispatchFetchFilmDetails:function(t){return e($(t))}}}))(Le),Fe=n(53),xe=n.n(Fe),Pe="\n## Written By\nLawrence Siden\n\n[Westside Consulting LLC](".concat("http://westsideconsultingllc.com",")\n\n[westsideconsultingllc@gmail.com](mailto:westsideconsultingllc@gmail.com)\n\n## Credits\n[Open Movie Database API](").concat("https://www.omdbapi.com/",")\n\n## Source Code\n").concat("https://github.com/lsiden/omdb-film-browser-web","\n"),Be=Object(I.a)(Object(I.a)({},h),{},{display:"flex",justifyContent:"space-between"}),We=function(e){Object(s.a)(n,e);var t=Object(m.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",n.onKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",n.onKeyDown)}},{key:"render",value:function(){return r.a.createElement("div",{style:{outline:"none"}},r.a.createElement(y,null),r.a.createElement("header",{style:Be},r.a.createElement("h1",{style:{fontSize:28}},"About ".concat("Open Movie Database Browser")),r.a.createElement(Oe,{buttonStyle:{color:"white"}})),r.a.createElement("div",{style:{marginLeft:20}},r.a.createElement(xe.a,{source:Pe})))}}],[{key:"onKeyDown",value:function(e){27===e.keyCode&&window.history.back()}}]),n}(r.a.Component);var Me=function(e){var t=e.match;return r.a.createElement(Re,{imdbID:t.params.imdbID})},ze=function(e){var t=e.match;return r.a.createElement(Ee,{query:t.params.query})};t.a=function(){var e=function(e){var t=/^\/search\/([^/?]*)/.exec(decodeURI(e));return t?t[1]:""}(window.location.pathname);return e&&A.dispatch(B(e)),r.a.createElement("div",null,r.a.createElement(l.a,{store:A},r.a.createElement(o.a,{basename:"/omdb-film-browser-web"},r.a.createElement(i.a,{exact:!0,path:"/",component:ze}),r.a.createElement(i.a,{path:"/search/:query",component:ze}),r.a.createElement(i.a,{path:"/film/:imdbID",component:Me}),r.a.createElement(i.a,{path:"/about",component:We}))))}},57:function(e,t,n){e.exports=n(58)},58:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),a=n.n(t),r=n(48),o=n.n(r),i=n(55),l=n(54);n(156);o.a.render(a.a.createElement(i.a,null),document.getElementById("root")),"https:"===e.location.protocol&&Object(l.a)()}.call(this,n(19))}},[[57,1,2]]]);
//# sourceMappingURL=main.b9d7db93.chunk.js.map