(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{45:function(e,t,a){e.exports=a(83)},46:function(e,t,a){},47:function(e,t,a){},52:function(e,t,a){},70:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},81:function(e,t,a){},83:function(e,t,a){"use strict";a.r(t);a(46),a(47);var n=a(0),c=a.n(n),i=a(17),r=a.n(i),o=(a(52),a(11)),s=a(12),l=a(7),m=a(35),u=a.n(m).a.create(),f=a(21),h=a(8);a(70);var p=function(e){var t=Object(n.useState)({name:"",pw:""}),a=Object(l.a)(t,2),i=a[0],r=a[1],m=Object(n.useState)(!1),f=Object(l.a)(m,2),h=f[0],p=f[1],d=function(e){r(Object(s.a)({},i,Object(o.a)({},e.target.name,e.target.value)))};return c.a.createElement("div",{className:"form__container"},c.a.createElement("div",{className:"form__input-form"},c.a.createElement("label",{className:"form__input-label"},"Username"),c.a.createElement("input",{className:"form__text-input",type:"text",name:"name",autoFocus:!0,value:i.name,onChange:d})),c.a.createElement("div",{className:"form__input-form"},c.a.createElement("label",{className:"form__input-label"},"Password"),c.a.createElement("input",{className:"form__text-input",type:"password",name:"pw",value:i.pw,onChange:d})),c.a.createElement("button",{className:"btn",onClick:function(){var t={name:i.name,password:i.pw};u.post("/authenticate",t).then(function(){e.history.push("/cities")}).catch(function(){p(!0)})}},"Login"),h&&c.a.createElement("span",null,"ERROR"))},d=a(10),_="GET_CITIES_SUCCESS",E="GET_CITIES_FAIL",b="ADD_CITY_TO_LIST_SUCCESS",v="ADD_CITY_TO_LIST_FAIL";a(75);var g=Object(d.b)(function(e){return{userCities:e.citiesList}},function(e){return{getCitiesList:function(){e(function(e){console.log("GOT"),u.get("/users/cities").then(function(t){e({type:_,payload:t.data})}).catch(function(t){e({type:E})})})}}})(function(e){return Object(n.useEffect)(function(){0===e.userCities.length&&e.getCitiesList()},[e.userCities]),c.a.createElement("ul",{className:"cities__list"},e.userCities.map(function(t){return c.a.createElement("li",{className:"cities__city-name",key:t.geonameid,onClick:(a=t.geonameid,function(){console.log("mathc",e.match),e.history.push("".concat(e.match.path,"/weather/").concat(a))})},t.name);var a}),c.a.createElement("li",{className:"cities__add-city",key:"plus",onClick:function(){e.history.push("".concat(e.match.url,"/select"))}},"+"))}),w={geonameid:null,name:"",timezone:""};var y=function(e){return c.a.createElement("ul",{className:"selector__filtered-list"},e.cities.map(function(t){var a=t.name.length>20?"".concat(t.name.substring(0,17),"..."):t.name;return c.a.createElement("li",{className:"selector__list-element",key:t.geonameid,onClick:e.onCitySelected(t)},a)}))};a(76);var O=function(e){return function(t){return c.a.createElement("div",null,c.a.createElement("span",{className:"back-nav__arrow",onClick:function(){t.history.goBack()}},"<"),c.a.createElement(e,t))}};a(77);var N=Object(d.b)(null,function(e){return{addCity:function(t){return e(function(e){return function(t){u.post("/users/cities",{cityId:e.geonameid}).then(function(){t({type:b,payload:e})}).catch(function(e){t({type:v})})}}(t))}}})(O(function(e){var t=Object(n.useState)(w),a=Object(l.a)(t,2),i=a[0],r=a[1],o=Object(n.useState)([]),s=Object(l.a)(o,2),m=s[0],f=s[1];return Object(n.useEffect)(function(){""!==i.name?u.get("/city/".concat(i.name)).then(function(e){f(e.data)}):f([])},[i]),c.a.createElement("div",{className:"form__container"},c.a.createElement("div",{className:"form__input-form"},c.a.createElement("input",{className:"form__text-input",type:"text",autoFocus:!0,value:i.name,onChange:function(e){r({geonameid:null,timezone:"",name:e.target.value})}})),c.a.createElement(y,{cities:m,onCitySelected:function(e){return function(){r(e)}},currName:i.name}),c.a.createElement("button",{className:"btn ",disabled:null===i.geonameid,onClick:function(){e.addCity(i)}},"Save"))})),j=a(16),C=a.n(j);a(81);var S=Object(d.b)(function(e,t){var a=e.citiesList.find(function(e){return e.geonameid===Number(t.match.params.id)});return{timezone:a?a.timezone:"",cityName:a?a.name:""}})(O(function(e){var t=Object(n.useState)(null),a=Object(l.a)(t,2),i=a[0],r=a[1];return Object(n.useEffect)(function(){u.get("/weather/".concat(e.match.params.id)).then(function(e){r(e.data)}).catch(function(e){console.error("ERROR",e)})},[]),c.a.createElement(n.Fragment,null,i&&c.a.createElement("div",{className:"weather__container"},c.a.createElement("div",{className:"weather__info-block"},c.a.createElement("i",{className:"wi-day-sleet-storm"},i.weather.stateIconId),c.a.createElement("span",null,i.weather.description)),c.a.createElement("div",{className:"weather__info-block weather__info-block--first-ordered"},c.a.createElement("span",{className:"weather__current-time"},C.a.tz(e.timezone).format("HH")),c.a.createElement("span",{className:"weather__current-time"},C.a.tz(e.timezone).format("mm")),c.a.createElement("span",{className:"waether__city-name"},e.cityName)),c.a.createElement("div",{className:"weather__info-block"},c.a.createElement("span",{className:"weather__temp"},i.temperature," \u2103"),c.a.createElement("span",{className:"weather__end-time"},C.a.unix(i.sunriseTime).tz(e.timezone).format("HH:mm")),c.a.createElement("span",{className:"weather__end-time"},C.a.unix(i.sunsetTime).tz(e.timezone).format("HH:mm")))))}));var k=function(e){return c.a.createElement(n.Fragment,null,c.a.createElement(h.b,{exact:!0,path:e.match.path,component:g}),c.a.createElement(h.b,{path:"".concat(e.match.path,"/select"),component:N}),c.a.createElement(h.b,{path:"".concat(e.match.path,"/weather/:id"),component:S}))},I=a(15),T=a(38),L=a(42),z={citiesList:[]};var x=a(39),A=a(40),R=a(43),F=a(41),H=a(44);var D=function(e){return function(t){function a(){var e,t;Object(x.a)(this,a);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(t=Object(R.a)(this,(e=Object(F.a)(a)).call.apply(e,[this].concat(c)))).state={isAuth:!0,loading:!0},t}return Object(H.a)(a,t),Object(A.a)(a,[{key:"componentDidMount",value:function(){var e=this;u.get("/validateCredentials").then(function(){e.setState({loading:!1})}).catch(function(){e.setState({isAuth:!1,loading:!1})})}},{key:"render",value:function(){return this.state.loading?null:this.state.isAuth?c.a.createElement(e,this.props):c.a.createElement(h.a,{to:"/"})}}]),a}(c.a.Component)},B=Object(I.c)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(console.log("update",t),t.type){case _:return{citiesList:t.payload};case E:case v:case b:return Object(s.a)({},e,{citiesList:[].concat(Object(L.a)(e.citiesList),[t.payload])});default:return e}},Object(I.a)(T.a)),G=function(){var e=Object(n.useState)({name:"",pw:""}),t=Object(l.a)(e,2);t[0],t[1];return console.log("STOR",B),c.a.createElement(d.a,{store:B},c.a.createElement(f.a,null,c.a.createElement(h.b,{exact:!0,path:"/",component:p}),c.a.createElement(h.b,{path:"/cities",component:D(k)})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[45,1,2]]]);
//# sourceMappingURL=main.03bc0607.chunk.js.map