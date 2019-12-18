"use strict";

var U, _, E;

(function () {
  var _$0 = this;

  var _2 = function (t) {
    var i = new E(t);
    return i.I(), i;
  };

  var _3 = function (t) {
    this._S = t || null, this._E = null, this._T = null;
  };

  var _4 = _3.prototype;

  var _7 = function () {
    var t = this._S.charAt(0);

    switch (this._S = this._S.substr(1), t) {
      case ".":
        this._E = document.getElementsByClassName(this._S), this._T = "class";
        break;

      case "#":
        this._E = document.getElementById(this._S), this._T = "id";
        break;

      case "$":
        this._E = document.querySelector('[sv="' + this._S + '"]'), this._T = "sv";
        break;

      case "@":
        this._E = document.body, this._T = "body";
        break;

      case "&":
        this._E = document.querySelector('[svd="' + this._S + '"]'), this._T = "svdata";
    }
  };

  var _8 = function (t) {
    if (t === U) return this._E.value;
    this._E.value = t;
  };

  var _9 = function (t) {
    if (t === U) return this._E.innerHTML;
    this._E.innerHTML = t;
  };

  var _A = function (t) {
    t !== U && (this._E.innerHTML = this._E.innerHTML + t);
  };

  var _B = function (t) {
    t !== U && (this._E.innerHTML = this._E.innerHTML + '<script src="' + t + '"><\/script>');
  };

  var _C = function (t) {
    t !== U && (this._E.innerHTML = t + this._E.innerHTML);
  };

  var _D = function (t) {
    this._E.style.display = "block";
  };

  var _F = function (t) {
    this._E.style.display = "none";
  };

  var _G = function (t, i) {
    if (t !== U) {
      if (i === U) return this._E[t];
      this._E[t] = i;
    }
  };

  var _H = function (t, i) {
    this.H.B(t, i, this._E);
  };

  var _I = function (t) {
    this.H.B("click", t, this._E);
  };

  var _J = function (t) {
    this.H.B("change", t, this._E);
  };

  var _K = function (t) {
    this.H.B("click", function () {
      window.location.href = "/" + t;
    }, this._E);
  };

  var _L = function (t) {
    this.H.B("load", t, this._E);
  };

  var _M = function (t, i) {
    this.H.unB(t, i, this._E);
  };

  var _N = function (t, i, e) {
    this.unB(t, e), e.addEventListener(t, i, !1), this.Ev.push({
      type: t,
      event: i,
      target: e
    });
  };

  var _O = function (t) {
    return this.Ev.filter(function (i) {
      return i.type === t;
    }, t)[0];
  };

  var _P = function (t, i) {
    var e = this.f(t);
    e !== U && i.removeEventListener(t, e.event, !1), this.Ev = this.Ev.filter(function (i) {
      return i.type !== t;
    }, t);
  };

  var _Q = function (t) {
    if (t === U) return this._E.className;
    this._E.className = t;
  };

  var _R = function (t) {
    if (t === U) return this._E.className;
    this._E.className = t;
  };

  var _U = function (t) {
    t !== U && this._E.classList.add(t);
  };

  var _V = function (t) {
    t !== U && this._E.classList.remove(t);
  };

  var _W = function () {
    _("@").append('<svdata svd="' + this._S + '"></svdata>');
  };

  var _X = function (t, i) {
    if (i === U) return this._E.getAttribute(t);

    this._E.setAttribute(t, i);
  };

  _$0._ = _2;
  _4.I = _7;
  _4.value = _8;
  _4.html = _9;
  _4.append = _A;
  _4.appendScript = _B;
  _4.prepend = _C;
  _4.show = _D;
  _4.hide = _F;
  _4.attribute = _G;
  _4.on = _H;
  _4.click = _I;
  _4.updated = _J;
  _4.redirect = _K;
  _4.onLoad = _L;
  _4.off = _M;
  _4.H = {
    Ev: [],
    B: _N,
    f: _O,
    unB: _P
  };
  _4["class"] = _Q;
  _4.setClass = _R;
  _4.addClass = _U;
  _4.removeClass = _V;
  _4.dataInit = _W;
  _4.dataValue = _X;
  _$0.E = _3;
}).call(this);
