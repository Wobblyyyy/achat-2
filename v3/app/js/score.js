"use strict";var U=void 0,_=function(t){var i=new E(t);return i.I(),i},E=function(t){this._S=t||null,this._E=null,this._T=null};E.prototype.I=function(){var t=this._S.charAt(0);switch(this._S=this._S.substr(1),t){case".":this._E=document.getElementsByClassName(this._S),this._T="class";break;case"#":this._E=document.getElementById(this._S),this._T="id";break;case"$":this._E=document.querySelector('[sv="'+this._S+'"]'),this._T="sv";break;case"@":this._E=document.body,this._T="body";break;case"&":this._E=document.querySelector('[svd="'+this._S+'"]'),this._T="svdata"}},E.prototype.value=function(t){if(t===U)return this._E.value;this._E.value=t},E.prototype.html=function(t){if(t===U)return this._E.innerHTML;this._E.innerHTML=t},E.prototype.append=function(t){t!==U&&(this._E.innerHTML=this._E.innerHTML+t)},E.prototype.appendScript=function(t){t!==U&&(this._E.innerHTML=this._E.innerHTML+'<script src="'+t+'"><\/script>')},E.prototype.prepend=function(t){t!==U&&(this._E.innerHTML=t+this._E.innerHTML)},E.prototype.show=function(t){this._E.style.display="block"},E.prototype.hide=function(t){this._E.style.display="none"},E.prototype.attribute=function(t,i){if(t!==U){if(i===U)return this._E[t];this._E[t]=i}},E.prototype.on=function(t,i){this.H.B(t,i,this._E)},E.prototype.click=function(t){this.H.B("click",t,this._E)},E.prototype.updated=function(t){this.H.B("change",t,this._E)},E.prototype.redirect=function(t){this.H.B("click",function(){window.location.href="/"+t},this._E)},E.prototype.onLoad=function(t){this.H.B("load",t,this._E)},E.prototype.off=function(t,i){this.H.unB(t,i,this._E)},E.prototype.H={Ev:[],B:function(t,i,e){this.unB(t,e),e.addEventListener(t,i,!1),this.Ev.push({type:t,event:i,target:e})},f:function(t){return this.Ev.filter(function(i){return i.type===t},t)[0]},unB:function(t,i){var e=this.f(t);e!==U&&i.removeEventListener(t,e.event,!1),this.Ev=this.Ev.filter(function(i){return i.type!==t},t)}},E.prototype.class=function(t){if(t===U)return this._E.className;this._E.className=t},E.prototype.setClass=function(t){if(t===U)return this._E.className;this._E.className=t},E.prototype.addClass=function(t){t!==U&&this._E.classList.add(t)},E.prototype.removeClass=function(t){t!==U&&this._E.classList.remove(t)},E.prototype.dataInit=function(){_("@").append('<svdata svd="'+this._S+'"></svdata>')},E.prototype.dataValue=function(t,i){if(i===U)return this._E.getAttribute(t);this._E.setAttribute(t,i)};