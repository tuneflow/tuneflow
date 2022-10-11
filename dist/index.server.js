var Hi = "1.13.2", li = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, Xe = Array.prototype, Gn = Object.prototype, fi = typeof Symbol < "u" ? Symbol.prototype : null, Xa = Xe.push, pe = Xe.slice, ue = Gn.toString, Za = Gn.hasOwnProperty, qi = typeof ArrayBuffer < "u", tc = typeof DataView < "u", ec = Array.isArray, hi = Object.keys, pi = Object.create, di = qi && ArrayBuffer.isView, nc = isNaN, rc = isFinite, zi = !{ toString: null }.propertyIsEnumerable("toString"), gi = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], ic = Math.pow(2, 53) - 1;
function L(t, e) {
  return e = e == null ? t.length - 1 : +e, function() {
    for (var n = Math.max(arguments.length - e, 0), r = Array(n), i = 0; i < n; i++)
      r[i] = arguments[i + e];
    switch (e) {
      case 0:
        return t.call(this, r);
      case 1:
        return t.call(this, arguments[0], r);
      case 2:
        return t.call(this, arguments[0], arguments[1], r);
    }
    var s = Array(e + 1);
    for (i = 0; i < e; i++)
      s[i] = arguments[i];
    return s[e] = r, t.apply(this, s);
  };
}
function Mt(t) {
  var e = typeof t;
  return e === "function" || e === "object" && !!t;
}
function sc(t) {
  return t === null;
}
function Ki(t) {
  return t === void 0;
}
function Gi(t) {
  return t === !0 || t === !1 || ue.call(t) === "[object Boolean]";
}
function oc(t) {
  return !!(t && t.nodeType === 1);
}
function A(t) {
  var e = "[object " + t + "]";
  return function(n) {
    return ue.call(n) === e;
  };
}
const Jn = A("String"), Ji = A("Number"), ac = A("Date"), cc = A("RegExp"), uc = A("Error"), Wi = A("Symbol"), ji = A("ArrayBuffer");
var Yi = A("Function"), lc = li.document && li.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof lc != "function" && (Yi = function(t) {
  return typeof t == "function" || !1;
});
const F = Yi, Qi = A("Object");
var Xi = tc && Qi(new DataView(new ArrayBuffer(8))), Wn = typeof Map < "u" && Qi(/* @__PURE__ */ new Map()), fc = A("DataView");
function hc(t) {
  return t != null && F(t.getInt8) && ji(t.buffer);
}
const Le = Xi ? hc : fc, Vt = ec || A("Array");
function It(t, e) {
  return t != null && Za.call(t, e);
}
var Pn = A("Arguments");
(function() {
  Pn(arguments) || (Pn = function(t) {
    return It(t, "callee");
  });
})();
const jn = Pn;
function pc(t) {
  return !Wi(t) && rc(t) && !isNaN(parseFloat(t));
}
function Zi(t) {
  return Ji(t) && nc(t);
}
function ts(t) {
  return function() {
    return t;
  };
}
function es(t) {
  return function(e) {
    var n = t(e);
    return typeof n == "number" && n >= 0 && n <= ic;
  };
}
function ns(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
const He = ns("byteLength"), dc = es(He);
var gc = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function mc(t) {
  return di ? di(t) && !Le(t) : dc(t) && gc.test(ue.call(t));
}
const rs = qi ? mc : ts(!1), H = ns("length");
function Ic(t) {
  for (var e = {}, n = t.length, r = 0; r < n; ++r)
    e[t[r]] = !0;
  return {
    contains: function(i) {
      return e[i] === !0;
    },
    push: function(i) {
      return e[i] = !0, t.push(i);
    }
  };
}
function is(t, e) {
  e = Ic(e);
  var n = gi.length, r = t.constructor, i = F(r) && r.prototype || Gn, s = "constructor";
  for (It(t, s) && !e.contains(s) && e.push(s); n--; )
    s = gi[n], s in t && t[s] !== i[s] && !e.contains(s) && e.push(s);
}
function _(t) {
  if (!Mt(t))
    return [];
  if (hi)
    return hi(t);
  var e = [];
  for (var n in t)
    It(t, n) && e.push(n);
  return zi && is(t, e), e;
}
function vc(t) {
  if (t == null)
    return !0;
  var e = H(t);
  return typeof e == "number" && (Vt(t) || Jn(t) || jn(t)) ? e === 0 : H(_(t)) === 0;
}
function ss(t, e) {
  var n = _(e), r = n.length;
  if (t == null)
    return !r;
  for (var i = Object(t), s = 0; s < r; s++) {
    var o = n[s];
    if (e[o] !== i[o] || !(o in i))
      return !1;
  }
  return !0;
}
function T(t) {
  if (t instanceof T)
    return t;
  if (!(this instanceof T))
    return new T(t);
  this._wrapped = t;
}
T.VERSION = Hi;
T.prototype.value = function() {
  return this._wrapped;
};
T.prototype.valueOf = T.prototype.toJSON = T.prototype.value;
T.prototype.toString = function() {
  return String(this._wrapped);
};
function mi(t) {
  return new Uint8Array(t.buffer || t, t.byteOffset || 0, He(t));
}
var Ii = "[object DataView]";
function An(t, e, n, r) {
  if (t === e)
    return t !== 0 || 1 / t === 1 / e;
  if (t == null || e == null)
    return !1;
  if (t !== t)
    return e !== e;
  var i = typeof t;
  return i !== "function" && i !== "object" && typeof e != "object" ? !1 : os(t, e, n, r);
}
function os(t, e, n, r) {
  t instanceof T && (t = t._wrapped), e instanceof T && (e = e._wrapped);
  var i = ue.call(t);
  if (i !== ue.call(e))
    return !1;
  if (Xi && i == "[object Object]" && Le(t)) {
    if (!Le(e))
      return !1;
    i = Ii;
  }
  switch (i) {
    case "[object RegExp]":
    case "[object String]":
      return "" + t == "" + e;
    case "[object Number]":
      return +t != +t ? +e != +e : +t == 0 ? 1 / +t === 1 / e : +t == +e;
    case "[object Date]":
    case "[object Boolean]":
      return +t == +e;
    case "[object Symbol]":
      return fi.valueOf.call(t) === fi.valueOf.call(e);
    case "[object ArrayBuffer]":
    case Ii:
      return os(mi(t), mi(e), n, r);
  }
  var s = i === "[object Array]";
  if (!s && rs(t)) {
    var o = He(t);
    if (o !== He(e))
      return !1;
    if (t.buffer === e.buffer && t.byteOffset === e.byteOffset)
      return !0;
    s = !0;
  }
  if (!s) {
    if (typeof t != "object" || typeof e != "object")
      return !1;
    var a = t.constructor, l = e.constructor;
    if (a !== l && !(F(a) && a instanceof a && F(l) && l instanceof l) && "constructor" in t && "constructor" in e)
      return !1;
  }
  n = n || [], r = r || [];
  for (var u = n.length; u--; )
    if (n[u] === t)
      return r[u] === e;
  if (n.push(t), r.push(e), s) {
    if (u = t.length, u !== e.length)
      return !1;
    for (; u--; )
      if (!An(t[u], e[u], n, r))
        return !1;
  } else {
    var p = _(t), h;
    if (u = p.length, _(e).length !== u)
      return !1;
    for (; u--; )
      if (h = p[u], !(It(e, h) && An(t[h], e[h], n, r)))
        return !1;
  }
  return n.pop(), r.pop(), !0;
}
function Tc(t, e) {
  return An(t, e);
}
function de(t) {
  if (!Mt(t))
    return [];
  var e = [];
  for (var n in t)
    e.push(n);
  return zi && is(t, e), e;
}
function Yn(t) {
  var e = H(t);
  return function(n) {
    if (n == null)
      return !1;
    var r = de(n);
    if (H(r))
      return !1;
    for (var i = 0; i < e; i++)
      if (!F(n[t[i]]))
        return !1;
    return t !== us || !F(n[Qn]);
  };
}
var Qn = "forEach", as = "has", Xn = ["clear", "delete"], cs = ["get", as, "set"], yc = Xn.concat(Qn, cs), us = Xn.concat(cs), bc = ["add"].concat(Xn, Qn, as);
const wc = Wn ? Yn(yc) : A("Map"), kc = Wn ? Yn(us) : A("WeakMap"), Sc = Wn ? Yn(bc) : A("Set"), _c = A("WeakSet");
function jt(t) {
  for (var e = _(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = t[e[i]];
  return r;
}
function xc(t) {
  for (var e = _(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [e[i], t[e[i]]];
  return r;
}
function ls(t) {
  for (var e = {}, n = _(t), r = 0, i = n.length; r < i; r++)
    e[t[n[r]]] = n[r];
  return e;
}
function On(t) {
  var e = [];
  for (var n in t)
    F(t[n]) && e.push(n);
  return e.sort();
}
function Zn(t, e) {
  return function(n) {
    var r = arguments.length;
    if (e && (n = Object(n)), r < 2 || n == null)
      return n;
    for (var i = 1; i < r; i++)
      for (var s = arguments[i], o = t(s), a = o.length, l = 0; l < a; l++) {
        var u = o[l];
        (!e || n[u] === void 0) && (n[u] = s[u]);
      }
    return n;
  };
}
const fs = Zn(de), qe = Zn(_), hs = Zn(de, !0);
function Cc() {
  return function() {
  };
}
function ps(t) {
  if (!Mt(t))
    return {};
  if (pi)
    return pi(t);
  var e = Cc();
  e.prototype = t;
  var n = new e();
  return e.prototype = null, n;
}
function Ec(t, e) {
  var n = ps(t);
  return e && qe(n, e), n;
}
function Nc(t) {
  return Mt(t) ? Vt(t) ? t.slice() : fs({}, t) : t;
}
function Pc(t, e) {
  return e(t), t;
}
function ds(t) {
  return Vt(t) ? t : [t];
}
T.toPath = ds;
function ge(t) {
  return T.toPath(t);
}
function tr(t, e) {
  for (var n = e.length, r = 0; r < n; r++) {
    if (t == null)
      return;
    t = t[e[r]];
  }
  return n ? t : void 0;
}
function gs(t, e, n) {
  var r = tr(t, ge(e));
  return Ki(r) ? n : r;
}
function Ac(t, e) {
  e = ge(e);
  for (var n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    if (!It(t, i))
      return !1;
    t = t[i];
  }
  return !!n;
}
function er(t) {
  return t;
}
function le(t) {
  return t = qe({}, t), function(e) {
    return ss(e, t);
  };
}
function nr(t) {
  return t = ge(t), function(e) {
    return tr(e, t);
  };
}
function me(t, e, n) {
  if (e === void 0)
    return t;
  switch (n ?? 3) {
    case 1:
      return function(r) {
        return t.call(e, r);
      };
    case 3:
      return function(r, i, s) {
        return t.call(e, r, i, s);
      };
    case 4:
      return function(r, i, s, o) {
        return t.call(e, r, i, s, o);
      };
  }
  return function() {
    return t.apply(e, arguments);
  };
}
function ms(t, e, n) {
  return t == null ? er : F(t) ? me(t, e, n) : Mt(t) && !Vt(t) ? le(t) : nr(t);
}
function rr(t, e) {
  return ms(t, e, 1 / 0);
}
T.iteratee = rr;
function z(t, e, n) {
  return T.iteratee !== rr ? T.iteratee(t, e) : ms(t, e, n);
}
function Oc(t, e, n) {
  e = z(e, n);
  for (var r = _(t), i = r.length, s = {}, o = 0; o < i; o++) {
    var a = r[o];
    s[a] = e(t[a], a, t);
  }
  return s;
}
function Is() {
}
function Mc(t) {
  return t == null ? Is : function(e) {
    return gs(t, e);
  };
}
function Vc(t, e, n) {
  var r = Array(Math.max(0, t));
  e = me(e, n, 1);
  for (var i = 0; i < t; i++)
    r[i] = e(i);
  return r;
}
function Mn(t, e) {
  return e == null && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
}
const fe = Date.now || function() {
  return new Date().getTime();
};
function vs(t) {
  var e = function(s) {
    return t[s];
  }, n = "(?:" + _(t).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
  return function(s) {
    return s = s == null ? "" : "" + s, r.test(s) ? s.replace(i, e) : s;
  };
}
const Ts = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, Rc = vs(Ts), Fc = ls(Ts), Uc = vs(Fc), Bc = T.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var bn = /(.)^/, $c = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, Dc = /\\|'|\r|\n|\u2028|\u2029/g;
function Lc(t) {
  return "\\" + $c[t];
}
var Hc = /^\s*(\w|\$)+\s*$/;
function qc(t, e, n) {
  !e && n && (e = n), e = hs({}, e, T.templateSettings);
  var r = RegExp([
    (e.escape || bn).source,
    (e.interpolate || bn).source,
    (e.evaluate || bn).source
  ].join("|") + "|$", "g"), i = 0, s = "__p+='";
  t.replace(r, function(u, p, h, g, v) {
    return s += t.slice(i, v).replace(Dc, Lc), i = v + u.length, p ? s += `'+
((__t=(` + p + `))==null?'':_.escape(__t))+
'` : h ? s += `'+
((__t=(` + h + `))==null?'':__t)+
'` : g && (s += `';
` + g + `
__p+='`), u;
  }), s += `';
`;
  var o = e.variable;
  if (o) {
    if (!Hc.test(o))
      throw new Error("variable is not a bare identifier: " + o);
  } else
    s = `with(obj||{}){
` + s + `}
`, o = "obj";
  s = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` + s + `return __p;
`;
  var a;
  try {
    a = new Function(o, "_", s);
  } catch (u) {
    throw u.source = s, u;
  }
  var l = function(u) {
    return a.call(this, u, T);
  };
  return l.source = "function(" + o + `){
` + s + "}", l;
}
function zc(t, e, n) {
  e = ge(e);
  var r = e.length;
  if (!r)
    return F(n) ? n.call(t) : n;
  for (var i = 0; i < r; i++) {
    var s = t == null ? void 0 : t[e[i]];
    s === void 0 && (s = n, i = r), t = F(s) ? s.call(t) : s;
  }
  return t;
}
var Kc = 0;
function Gc(t) {
  var e = ++Kc + "";
  return t ? t + e : e;
}
function Jc(t) {
  var e = T(t);
  return e._chain = !0, e;
}
function ys(t, e, n, r, i) {
  if (!(r instanceof e))
    return t.apply(n, i);
  var s = ps(t.prototype), o = t.apply(s, i);
  return Mt(o) ? o : s;
}
var Yt = L(function(t, e) {
  var n = Yt.placeholder, r = function() {
    for (var i = 0, s = e.length, o = Array(s), a = 0; a < s; a++)
      o[a] = e[a] === n ? arguments[i++] : e[a];
    for (; i < arguments.length; )
      o.push(arguments[i++]);
    return ys(t, r, this, this, o);
  };
  return r;
});
Yt.placeholder = T;
const bs = L(function(t, e, n) {
  if (!F(t))
    throw new TypeError("Bind must be called on a function");
  var r = L(function(i) {
    return ys(t, r, e, this, n.concat(i));
  });
  return r;
}), W = es(H);
function Rt(t, e, n, r) {
  if (r = r || [], !e && e !== 0)
    e = 1 / 0;
  else if (e <= 0)
    return r.concat(t);
  for (var i = r.length, s = 0, o = H(t); s < o; s++) {
    var a = t[s];
    if (W(a) && (Vt(a) || jn(a)))
      if (e > 1)
        Rt(a, e - 1, n, r), i = r.length;
      else
        for (var l = 0, u = a.length; l < u; )
          r[i++] = a[l++];
    else
      n || (r[i++] = a);
  }
  return r;
}
const Wc = L(function(t, e) {
  e = Rt(e, !1, !1);
  var n = e.length;
  if (n < 1)
    throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = e[n];
    t[r] = bs(t[r], t);
  }
  return t;
});
function jc(t, e) {
  var n = function(r) {
    var i = n.cache, s = "" + (e ? e.apply(this, arguments) : r);
    return It(i, s) || (i[s] = t.apply(this, arguments)), i[s];
  };
  return n.cache = {}, n;
}
const ws = L(function(t, e, n) {
  return setTimeout(function() {
    return t.apply(null, n);
  }, e);
}), Yc = Yt(ws, T, 1);
function Qc(t, e, n) {
  var r, i, s, o, a = 0;
  n || (n = {});
  var l = function() {
    a = n.leading === !1 ? 0 : fe(), r = null, o = t.apply(i, s), r || (i = s = null);
  }, u = function() {
    var p = fe();
    !a && n.leading === !1 && (a = p);
    var h = e - (p - a);
    return i = this, s = arguments, h <= 0 || h > e ? (r && (clearTimeout(r), r = null), a = p, o = t.apply(i, s), r || (i = s = null)) : !r && n.trailing !== !1 && (r = setTimeout(l, h)), o;
  };
  return u.cancel = function() {
    clearTimeout(r), a = 0, r = i = s = null;
  }, u;
}
function Xc(t, e, n) {
  var r, i, s, o, a, l = function() {
    var p = fe() - i;
    e > p ? r = setTimeout(l, e - p) : (r = null, n || (o = t.apply(a, s)), r || (s = a = null));
  }, u = L(function(p) {
    return a = this, s = p, i = fe(), r || (r = setTimeout(l, e), n && (o = t.apply(a, s))), o;
  });
  return u.cancel = function() {
    clearTimeout(r), r = s = a = null;
  }, u;
}
function Zc(t, e) {
  return Yt(e, t);
}
function ir(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function tu() {
  var t = arguments, e = t.length - 1;
  return function() {
    for (var n = e, r = t[e].apply(this, arguments); n--; )
      r = t[n].call(this, r);
    return r;
  };
}
function eu(t, e) {
  return function() {
    if (--t < 1)
      return e.apply(this, arguments);
  };
}
function ks(t, e) {
  var n;
  return function() {
    return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n;
  };
}
const nu = Yt(ks, 2);
function Ss(t, e, n) {
  e = z(e, n);
  for (var r = _(t), i, s = 0, o = r.length; s < o; s++)
    if (i = r[s], e(t[i], i, t))
      return i;
}
function _s(t) {
  return function(e, n, r) {
    n = z(n, r);
    for (var i = H(e), s = t > 0 ? 0 : i - 1; s >= 0 && s < i; s += t)
      if (n(e[s], s, e))
        return s;
    return -1;
  };
}
const Jt = _s(1), xs = _s(-1);
function Cs(t, e, n, r) {
  n = z(n, r, 1);
  for (var i = n(e), s = 0, o = H(t); s < o; ) {
    var a = Math.floor((s + o) / 2);
    n(t[a]) < i ? s = a + 1 : o = a;
  }
  return s;
}
function Es(t, e, n) {
  return function(r, i, s) {
    var o = 0, a = H(r);
    if (typeof s == "number")
      t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;
    else if (n && s && a)
      return s = n(r, i), r[s] === i ? s : -1;
    if (i !== i)
      return s = e(pe.call(r, o, a), Zi), s >= 0 ? s + o : -1;
    for (s = t > 0 ? o : a - 1; s >= 0 && s < a; s += t)
      if (r[s] === i)
        return s;
    return -1;
  };
}
const Ns = Es(1, Jt, Cs), ru = Es(-1, xs);
function ze(t, e, n) {
  var r = W(t) ? Jt : Ss, i = r(t, e, n);
  if (i !== void 0 && i !== -1)
    return t[i];
}
function iu(t, e) {
  return ze(t, le(e));
}
function ct(t, e, n) {
  e = me(e, n);
  var r, i;
  if (W(t))
    for (r = 0, i = t.length; r < i; r++)
      e(t[r], r, t);
  else {
    var s = _(t);
    for (r = 0, i = s.length; r < i; r++)
      e(t[s[r]], s[r], t);
  }
  return t;
}
function At(t, e, n) {
  e = z(e, n);
  for (var r = !W(t) && _(t), i = (r || t).length, s = Array(i), o = 0; o < i; o++) {
    var a = r ? r[o] : o;
    s[o] = e(t[a], a, t);
  }
  return s;
}
function Ps(t) {
  var e = function(n, r, i, s) {
    var o = !W(n) && _(n), a = (o || n).length, l = t > 0 ? 0 : a - 1;
    for (s || (i = n[o ? o[l] : l], l += t); l >= 0 && l < a; l += t) {
      var u = o ? o[l] : l;
      i = r(i, n[u], u, n);
    }
    return i;
  };
  return function(n, r, i, s) {
    var o = arguments.length >= 3;
    return e(n, me(r, s, 4), i, o);
  };
}
const wn = Ps(1), vi = Ps(-1);
function Wt(t, e, n) {
  var r = [];
  return e = z(e, n), ct(t, function(i, s, o) {
    e(i, s, o) && r.push(i);
  }), r;
}
function su(t, e, n) {
  return Wt(t, ir(z(e)), n);
}
function Ti(t, e, n) {
  e = z(e, n);
  for (var r = !W(t) && _(t), i = (r || t).length, s = 0; s < i; s++) {
    var o = r ? r[s] : s;
    if (!e(t[o], o, t))
      return !1;
  }
  return !0;
}
function yi(t, e, n) {
  e = z(e, n);
  for (var r = !W(t) && _(t), i = (r || t).length, s = 0; s < i; s++) {
    var o = r ? r[s] : s;
    if (e(t[o], o, t))
      return !0;
  }
  return !1;
}
function ot(t, e, n, r) {
  return W(t) || (t = jt(t)), (typeof n != "number" || r) && (n = 0), Ns(t, e, n) >= 0;
}
const ou = L(function(t, e, n) {
  var r, i;
  return F(e) ? i = e : (e = ge(e), r = e.slice(0, -1), e = e[e.length - 1]), At(t, function(s) {
    var o = i;
    if (!o) {
      if (r && r.length && (s = tr(s, r)), s == null)
        return;
      o = s[e];
    }
    return o == null ? o : o.apply(s, n);
  });
});
function sr(t, e) {
  return At(t, nr(e));
}
function au(t, e) {
  return Wt(t, le(e));
}
function As(t, e, n) {
  var r = -1 / 0, i = -1 / 0, s, o;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = W(t) ? t : jt(t);
    for (var a = 0, l = t.length; a < l; a++)
      s = t[a], s != null && s > r && (r = s);
  } else
    e = z(e, n), ct(t, function(u, p, h) {
      o = e(u, p, h), (o > i || o === -1 / 0 && r === -1 / 0) && (r = u, i = o);
    });
  return r;
}
function cu(t, e, n) {
  var r = 1 / 0, i = 1 / 0, s, o;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = W(t) ? t : jt(t);
    for (var a = 0, l = t.length; a < l; a++)
      s = t[a], s != null && s < r && (r = s);
  } else
    e = z(e, n), ct(t, function(u, p, h) {
      o = e(u, p, h), (o < i || o === 1 / 0 && r === 1 / 0) && (r = u, i = o);
    });
  return r;
}
var uu = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function Os(t) {
  return t ? Vt(t) ? pe.call(t) : Jn(t) ? t.match(uu) : W(t) ? At(t, er) : jt(t) : [];
}
function Ms(t, e, n) {
  if (e == null || n)
    return W(t) || (t = jt(t)), t[Mn(t.length - 1)];
  var r = Os(t), i = H(r);
  e = Math.max(Math.min(e, i), 0);
  for (var s = i - 1, o = 0; o < e; o++) {
    var a = Mn(o, s), l = r[o];
    r[o] = r[a], r[a] = l;
  }
  return r.slice(0, e);
}
function lu(t) {
  return Ms(t, 1 / 0);
}
function fu(t, e, n) {
  var r = 0;
  return e = z(e, n), sr(At(t, function(i, s, o) {
    return {
      value: i,
      index: r++,
      criteria: e(i, s, o)
    };
  }).sort(function(i, s) {
    var o = i.criteria, a = s.criteria;
    if (o !== a) {
      if (o > a || o === void 0)
        return 1;
      if (o < a || a === void 0)
        return -1;
    }
    return i.index - s.index;
  }), "value");
}
function Ze(t, e) {
  return function(n, r, i) {
    var s = e ? [[], []] : {};
    return r = z(r, i), ct(n, function(o, a) {
      var l = r(o, a, n);
      t(s, o, l);
    }), s;
  };
}
const hu = Ze(function(t, e, n) {
  It(t, n) ? t[n].push(e) : t[n] = [e];
}), pu = Ze(function(t, e, n) {
  t[n] = e;
}), du = Ze(function(t, e, n) {
  It(t, n) ? t[n]++ : t[n] = 1;
}), gu = Ze(function(t, e, n) {
  t[n ? 0 : 1].push(e);
}, !0);
function mu(t) {
  return t == null ? 0 : W(t) ? t.length : _(t).length;
}
function Iu(t, e, n) {
  return e in n;
}
const Vs = L(function(t, e) {
  var n = {}, r = e[0];
  if (t == null)
    return n;
  F(r) ? (e.length > 1 && (r = me(r, e[1])), e = de(t)) : (r = Iu, e = Rt(e, !1, !1), t = Object(t));
  for (var i = 0, s = e.length; i < s; i++) {
    var o = e[i], a = t[o];
    r(a, o, t) && (n[o] = a);
  }
  return n;
}), vu = L(function(t, e) {
  var n = e[0], r;
  return F(n) ? (n = ir(n), e.length > 1 && (r = e[1])) : (e = At(Rt(e, !1, !1), String), n = function(i, s) {
    return !ot(e, s);
  }), Vs(t, n, r);
});
function Rs(t, e, n) {
  return pe.call(t, 0, Math.max(0, t.length - (e == null || n ? 1 : e)));
}
function kn(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[0] : Rs(t, t.length - e);
}
function $e(t, e, n) {
  return pe.call(t, e == null || n ? 1 : e);
}
function Tu(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[t.length - 1] : $e(t, Math.max(0, t.length - e));
}
function yu(t) {
  return Wt(t, Boolean);
}
function bu(t, e) {
  return Rt(t, e, !1);
}
const Fs = L(function(t, e) {
  return e = Rt(e, !0, !0), Wt(t, function(n) {
    return !ot(e, n);
  });
}), wu = L(function(t, e) {
  return Fs(t, e);
});
function Vn(t, e, n, r) {
  Gi(e) || (r = n, n = e, e = !1), n != null && (n = z(n, r));
  for (var i = [], s = [], o = 0, a = H(t); o < a; o++) {
    var l = t[o], u = n ? n(l, o, t) : l;
    e && !n ? ((!o || s !== u) && i.push(l), s = u) : n ? ot(s, u) || (s.push(u), i.push(l)) : ot(i, l) || i.push(l);
  }
  return i;
}
const ku = L(function(t) {
  return Vn(Rt(t, !0, !0));
});
function Su(t) {
  for (var e = [], n = arguments.length, r = 0, i = H(t); r < i; r++) {
    var s = t[r];
    if (!ot(e, s)) {
      var o;
      for (o = 1; o < n && ot(arguments[o], s); o++)
        ;
      o === n && e.push(s);
    }
  }
  return e;
}
function Rn(t) {
  for (var e = t && As(t, H).length || 0, n = Array(e), r = 0; r < e; r++)
    n[r] = sr(t, r);
  return n;
}
const _u = L(Rn);
function xu(t, e) {
  for (var n = {}, r = 0, i = H(t); r < i; r++)
    e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
  return n;
}
function Cu(t, e, n) {
  e == null && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);
  for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), s = 0; s < r; s++, t += n)
    i[s] = t;
  return i;
}
function Eu(t, e) {
  if (e == null || e < 1)
    return [];
  for (var n = [], r = 0, i = t.length; r < i; )
    n.push(pe.call(t, r, r += e));
  return n;
}
function or(t, e) {
  return t._chain ? T(e).chain() : e;
}
function Us(t) {
  return ct(On(t), function(e) {
    var n = T[e] = t[e];
    T.prototype[e] = function() {
      var r = [this._wrapped];
      return Xa.apply(r, arguments), or(this, n.apply(T, r));
    };
  }), T;
}
ct(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
  var e = Xe[t];
  T.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (e.apply(n, arguments), (t === "shift" || t === "splice") && n.length === 0 && delete n[0]), or(this, n);
  };
});
ct(["concat", "join", "slice"], function(t) {
  var e = Xe[t];
  T.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (n = e.apply(n, arguments)), or(this, n);
  };
});
const Nu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: Hi,
  restArguments: L,
  isObject: Mt,
  isNull: sc,
  isUndefined: Ki,
  isBoolean: Gi,
  isElement: oc,
  isString: Jn,
  isNumber: Ji,
  isDate: ac,
  isRegExp: cc,
  isError: uc,
  isSymbol: Wi,
  isArrayBuffer: ji,
  isDataView: Le,
  isArray: Vt,
  isFunction: F,
  isArguments: jn,
  isFinite: pc,
  isNaN: Zi,
  isTypedArray: rs,
  isEmpty: vc,
  isMatch: ss,
  isEqual: Tc,
  isMap: wc,
  isWeakMap: kc,
  isSet: Sc,
  isWeakSet: _c,
  keys: _,
  allKeys: de,
  values: jt,
  pairs: xc,
  invert: ls,
  functions: On,
  methods: On,
  extend: fs,
  extendOwn: qe,
  assign: qe,
  defaults: hs,
  create: Ec,
  clone: Nc,
  tap: Pc,
  get: gs,
  has: Ac,
  mapObject: Oc,
  identity: er,
  constant: ts,
  noop: Is,
  toPath: ds,
  property: nr,
  propertyOf: Mc,
  matcher: le,
  matches: le,
  times: Vc,
  random: Mn,
  now: fe,
  escape: Rc,
  unescape: Uc,
  templateSettings: Bc,
  template: qc,
  result: zc,
  uniqueId: Gc,
  chain: Jc,
  iteratee: rr,
  partial: Yt,
  bind: bs,
  bindAll: Wc,
  memoize: jc,
  delay: ws,
  defer: Yc,
  throttle: Qc,
  debounce: Xc,
  wrap: Zc,
  negate: ir,
  compose: tu,
  after: eu,
  before: ks,
  once: nu,
  findKey: Ss,
  findIndex: Jt,
  findLastIndex: xs,
  sortedIndex: Cs,
  indexOf: Ns,
  lastIndexOf: ru,
  find: ze,
  detect: ze,
  findWhere: iu,
  each: ct,
  forEach: ct,
  map: At,
  collect: At,
  reduce: wn,
  foldl: wn,
  inject: wn,
  reduceRight: vi,
  foldr: vi,
  filter: Wt,
  select: Wt,
  reject: su,
  every: Ti,
  all: Ti,
  some: yi,
  any: yi,
  contains: ot,
  includes: ot,
  include: ot,
  invoke: ou,
  pluck: sr,
  where: au,
  max: As,
  min: cu,
  shuffle: lu,
  sample: Ms,
  sortBy: fu,
  groupBy: hu,
  indexBy: pu,
  countBy: du,
  partition: gu,
  toArray: Os,
  size: mu,
  pick: Vs,
  omit: vu,
  first: kn,
  head: kn,
  take: kn,
  initial: Rs,
  last: Tu,
  rest: $e,
  tail: $e,
  drop: $e,
  compact: yu,
  flatten: bu,
  without: wu,
  uniq: Vn,
  unique: Vn,
  union: ku,
  intersection: Su,
  difference: Fs,
  unzip: Rn,
  transpose: Rn,
  zip: _u,
  object: xu,
  range: Cu,
  chunk: Eu,
  mixin: Us,
  default: T
}, Symbol.toStringTag, { value: "Module" }));
var E = Us(Nu);
E._ = E;
let tn = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
class Bs {
  instanceIdInternal = Bs.generatePluginIdInternal();
  enabledInternal = !0;
  paramsResultInternal = {};
  generatedTrackIdsInternal = [];
  isRollbackable = !1;
  songCacheInternal;
  progress = null;
  isExecuting = !1;
  static providerId() {
    throw new Error("providerId() should be overwritten.");
  }
  static pluginId() {
    throw new Error("pluginId() should be overwritten.");
  }
  static providerDisplayName() {
    throw new Error("providerDisplayName() should be overwritten.");
  }
  static pluginDisplayName() {
    throw new Error("pluginDisplayName() should be overwritten.");
  }
  static pluginDescription() {
    return null;
  }
  static allowReset() {
    return !0;
  }
  async init(e, n) {
  }
  params() {
    return {};
  }
  songAccess() {
    return {};
  }
  allowManualApplyAdjust() {
    return !1;
  }
  async run(e, n, r) {
  }
  static async create(e, n) {
    const r = new this();
    return r.resetInternal(), await r.init(e, n), r;
  }
  get instanceId() {
    return this.instanceIdInternal;
  }
  getParam(e, n) {
    return e[n];
  }
  hasAllParamsSet() {
    for (const e of _(this.params()))
      if (!this.isParamProvided(e))
        return !1;
    return !0;
  }
  isParamProvided(e) {
    if (this.params()[e].optional)
      return !0;
    const n = this.paramsResultInternal[e];
    if (n == null)
      return !1;
    const i = this.params()[e].widget.type;
    switch (i) {
      case V.Input:
      case V.Pitch:
      case V.Slider:
      case V.TrackSelector:
      case V.Select:
      case V.SelectList:
      case V.Switch:
      case V.InputNumber:
      case V.FileSelector:
        return !0;
      case V.MultiTrackSelector:
        return n.length > 0;
      case V.TrackPitchSelector:
        return n.track !== void 0 && n.track !== null && n.pitch !== void 0 && n.pitch !== null;
      case V.InstrumentSelector:
        return n.program !== void 0 && n.program !== null && n.isDrum !== void 0 && n.isDrum !== null;
      case V.MultiSourceAudioSelector:
        return n != null && n.audioInfo !== void 0 && n.audioInfo !== null;
      case V.None:
        return n != null;
      default:
        throw new Error(`Param nullness check needs to be implemented for widget type ${i}. Either use default nullness check or define custom logic.`);
    }
  }
  static id() {
    return `${this.providerId()}^_^${this.pluginId()}`;
  }
  static getPrefixedArtifactId(e) {
    return `${this.id()}.${e}`;
  }
  setProgress(e) {
    this.progress = e;
  }
  getProgress() {
    return this.progress;
  }
  getIsExecuting() {
    return this.isExecuting;
  }
  setParamsInternal(e) {
    this.paramsResultInternal = e, this.maybeSyncEnabledWithParamsReadiness();
  }
  getParamsInternal() {
    return this.paramsResultInternal;
  }
  resetParamsInternal() {
    for (const e of _(this.params())) {
      const n = this.params()[e];
      this.paramsResultInternal[e] = n.defaultValue;
    }
    this.maybeSyncEnabledWithParamsReadiness();
  }
  resetInternal() {
    this.resetParamsInternal(), this.allowManualApplyAdjust() && (this.enabledInternal = !1);
  }
  setEnabledInternal(e) {
    this.enabledInternal = e;
  }
  maybeSyncEnabledWithParamsReadiness() {
    this.allowManualApplyAdjust() && !this.hasAllParamsSet() && this.setEnabledInternal(!1);
  }
  static generatePluginIdInternal() {
    return tn(10);
  }
}
class Ph {
  plugins = [];
  threwErrorInLastRun = !1;
  maxNumPluginsToKeep = 50;
  originalSong;
  cloneSongFnInternal;
  readApisInternal;
  activePluginIndex = -1;
  addAsOrReplaceActivePlugin(e) {
    let n;
    return this.activePluginIndex <= -1 ? n = 0 : this.plugins[this.activePluginIndex].isRollbackable ? n = this.activePluginIndex + 1 : n = this.activePluginIndex, this.plugins.length > 0 && this.plugins.splice(n, this.plugins.length - n), this.addPluginAt(e, n), this.getPluginIndexByPluginInstanceId(e.instanceId);
  }
  getPlugins() {
    return this.plugins;
  }
  resetCache() {
    for (const e of this.plugins)
      delete e.songCacheInternal;
  }
  setOriginalSong(e) {
    this.originalSong = e;
  }
  hasOriginalSong() {
    return !!this.originalSong;
  }
  async run(e = 0) {
    if (!this.originalSong)
      return this.threwErrorInLastRun = !0, null;
    e = Math.max(0, e), this.setActivePluginIndex(e), this.threwErrorInLastRun = !1;
    const n = this.getIndexOfLatestPluginWithCacheBeforeIndex(e), r = await this.cloneCachedSongAtPluginIndex(n);
    for (let i = e; i < this.plugins.length; i += 1)
      delete this.plugins[i].songCacheInternal;
    for (let i = 0; i < this.plugins.length; i += 1)
      this.plugins[i].isRollbackable = i <= n;
    for (let i = n >= 0 ? n + 1 : 0; i < this.plugins.length; i += 1) {
      const s = this.plugins[i];
      if (!s.enabledInternal || !s.hasAllParamsSet())
        return r;
      r.setPluginContextInternal(s);
      try {
        s.isExecuting = !0, s.setProgress(null), await s.run(r, s.getParamsInternal(), this.readApisInternal), r.clearPluginContextInternal(), s.isExecuting = !1;
      } catch {
        this.threwErrorInLastRun = !0, r.clearPluginContextInternal(), s.isExecuting = !1;
        const a = this.getIndexOfLatestPluginWithCacheBeforeIndex(i);
        return a >= 0 ? await this.cloneSong(this.plugins[a].songCacheInternal) : await this.cloneSong(this.originalSong);
      }
      s.songCacheInternal = await this.cloneSong(r), s.isRollbackable = !0;
    }
    return r;
  }
  restoreCachedPlugin(e) {
    return this.setActivePluginIndex(e), this.cloneCachedSongAtPluginIndex(e);
  }
  async cloneSong(e) {
    if (!this.cloneSongFnInternal)
      throw new Error("Pipeline is not provided with a clone song function.");
    return this.cloneSongFnInternal(e);
  }
  getActivePluginIndex() {
    return this.activePluginIndex;
  }
  setActivePluginIndex(e) {
    this.activePluginIndex = e;
  }
  async cloneCachedSongAtPluginIndex(e) {
    if (e >= 0)
      return await this.cloneSong(this.plugins[e].songCacheInternal);
    if (!this.originalSong)
      throw new Error("Original song is not avaiable to clone.");
    return await this.cloneSong(this.originalSong);
  }
  reset() {
    this.plugins.splice(0, this.plugins.length), this.originalSong = void 0, this.activePluginIndex = -1, this.threwErrorInLastRun = !1;
  }
  isPluginFunctioning(e) {
    return !!e.songCacheInternal;
  }
  getPluginIndexByPluginInstanceId(e) {
    return Jt(this.plugins, (n) => n.instanceId === e);
  }
  getThrewErrorInLastRun() {
    return this.threwErrorInLastRun;
  }
  getPluginCache(e) {
    return e.songCacheInternal;
  }
  setMaxNumPluginsToKeep(e) {
    this.maxNumPluginsToKeep = e, this.maintainPluginListSize();
  }
  getIndexOfLatestPluginWithCacheBeforeIndex(e) {
    for (let n = e - 1; n >= 0; n -= 1)
      if (this.getPluginCache(this.plugins[n]))
        return n;
    return -1;
  }
  maintainPluginListSize() {
    for (; this.plugins.length > this.maxNumPluginsToKeep && this.plugins.length > 0; )
      this.plugins.shift();
  }
  addPluginAt(e, n) {
    this.plugins.splice(n, 0, e), this.maintainPluginListSize();
  }
}
var X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Pu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], l = n !== void 0 ? n(a, e) : a - e;
    l >= 0 ? (s = o, i = o - 1) : r = o + 1;
  }
  return s;
}
function Au(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], l = n !== void 0 ? n(a, e) : a - e;
    l > 0 ? (s = o, i = o - 1) : r = o + 1;
  }
  return s;
}
function Ou(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], l = n !== void 0 ? n(a, e) : a - e;
    l < 0 ? (s = o, r = o + 1) : i = o - 1;
  }
  return s;
}
function Mu(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], l = n !== void 0 ? n(a, e) : a - e;
    l <= 0 ? (s = o, r = o + 1) : i = o - 1;
  }
  return s;
}
function Vu(t, e, n, r, i) {
  for (; r <= i; ) {
    var s = r + i >>> 1, o = t[s], a = n !== void 0 ? n(o, e) : o - e;
    if (a === 0)
      return s;
    a <= 0 ? r = s + 1 : i = s - 1;
  }
  return -1;
}
function te(t, e, n, r, i, s) {
  return typeof n == "function" ? s(t, e, n, r === void 0 ? 0 : r | 0, i === void 0 ? t.length - 1 : i | 0) : s(t, e, void 0, n === void 0 ? 0 : n | 0, r === void 0 ? t.length - 1 : r | 0);
}
var k = {
  ge: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Pu);
  },
  gt: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Au);
  },
  lt: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Ou);
  },
  le: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Mu);
  },
  eq: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Vu);
  }
}, Fn = { exports: {} };
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", o = "[object Array]", a = "[object Boolean]", l = "[object Date]", u = "[object Error]", p = "[object Function]", h = "[object GeneratorFunction]", g = "[object Map]", v = "[object Number]", I = "[object Object]", b = "[object Promise]", K = "[object RegExp]", N = "[object Set]", S = "[object String]", ye = "[object Symbol]", Qt = "[object WeakMap]", Nr = "[object ArrayBuffer]", be = "[object DataView]", Pr = "[object Float32Array]", Ar = "[object Float64Array]", Or = "[object Int8Array]", Mr = "[object Int16Array]", Vr = "[object Int32Array]", Rr = "[object Uint8Array]", Fr = "[object Uint8ClampedArray]", Ur = "[object Uint16Array]", Br = "[object Uint32Array]", Eo = /[\\^$.*+?()[\]{}|]/g, No = /\w*$/, Po = /^\[object .+?Constructor\]$/, Ao = /^(?:0|[1-9]\d*)$/, w = {};
  w[s] = w[o] = w[Nr] = w[be] = w[a] = w[l] = w[Pr] = w[Ar] = w[Or] = w[Mr] = w[Vr] = w[g] = w[v] = w[I] = w[K] = w[N] = w[S] = w[ye] = w[Rr] = w[Fr] = w[Ur] = w[Br] = !0, w[u] = w[p] = w[Qt] = !1;
  var Oo = typeof X == "object" && X && X.Object === Object && X, Mo = typeof self == "object" && self && self.Object === Object && self, nt = Oo || Mo || Function("return this")(), $r = e && !e.nodeType && e, Dr = $r && !0 && t && !t.nodeType && t, Vo = Dr && Dr.exports === $r;
  function Ro(c, f) {
    return c.set(f[0], f[1]), c;
  }
  function Fo(c, f) {
    return c.add(f), c;
  }
  function Uo(c, f) {
    for (var d = -1, m = c ? c.length : 0; ++d < m && f(c[d], d, c) !== !1; )
      ;
    return c;
  }
  function Bo(c, f) {
    for (var d = -1, m = f.length, C = c.length; ++d < m; )
      c[C + d] = f[d];
    return c;
  }
  function Lr(c, f, d, m) {
    var C = -1, O = c ? c.length : 0;
    for (m && O && (d = c[++C]); ++C < O; )
      d = f(d, c[C], C, c);
    return d;
  }
  function $o(c, f) {
    for (var d = -1, m = Array(c); ++d < c; )
      m[d] = f(d);
    return m;
  }
  function Do(c, f) {
    return c == null ? void 0 : c[f];
  }
  function Hr(c) {
    var f = !1;
    if (c != null && typeof c.toString != "function")
      try {
        f = !!(c + "");
      } catch {
      }
    return f;
  }
  function qr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(m, C) {
      d[++f] = [C, m];
    }), d;
  }
  function ln(c, f) {
    return function(d) {
      return c(f(d));
    };
  }
  function zr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(m) {
      d[++f] = m;
    }), d;
  }
  var Lo = Array.prototype, Ho = Function.prototype, we = Object.prototype, fn = nt["__core-js_shared__"], Kr = function() {
    var c = /[^.]+$/.exec(fn && fn.keys && fn.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Gr = Ho.toString, lt = we.hasOwnProperty, ke = we.toString, qo = RegExp("^" + Gr.call(lt).replace(Eo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Jr = Vo ? nt.Buffer : void 0, Wr = nt.Symbol, jr = nt.Uint8Array, zo = ln(Object.getPrototypeOf, Object), Ko = Object.create, Go = we.propertyIsEnumerable, Jo = Lo.splice, Yr = Object.getOwnPropertySymbols, Wo = Jr ? Jr.isBuffer : void 0, jo = ln(Object.keys, Object), hn = Bt(nt, "DataView"), Xt = Bt(nt, "Map"), pn = Bt(nt, "Promise"), dn = Bt(nt, "Set"), gn = Bt(nt, "WeakMap"), Zt = Bt(Object, "create"), Yo = yt(hn), Qo = yt(Xt), Xo = yt(pn), Zo = yt(dn), ta = yt(gn), Qr = Wr ? Wr.prototype : void 0, Xr = Qr ? Qr.valueOf : void 0;
  function vt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function ea() {
    this.__data__ = Zt ? Zt(null) : {};
  }
  function na(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function ra(c) {
    var f = this.__data__;
    if (Zt) {
      var d = f[c];
      return d === r ? void 0 : d;
    }
    return lt.call(f, c) ? f[c] : void 0;
  }
  function ia(c) {
    var f = this.__data__;
    return Zt ? f[c] !== void 0 : lt.call(f, c);
  }
  function sa(c, f) {
    var d = this.__data__;
    return d[c] = Zt && f === void 0 ? r : f, this;
  }
  vt.prototype.clear = ea, vt.prototype.delete = na, vt.prototype.get = ra, vt.prototype.has = ia, vt.prototype.set = sa;
  function rt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function oa() {
    this.__data__ = [];
  }
  function aa(c) {
    var f = this.__data__, d = Se(f, c);
    if (d < 0)
      return !1;
    var m = f.length - 1;
    return d == m ? f.pop() : Jo.call(f, d, 1), !0;
  }
  function ca(c) {
    var f = this.__data__, d = Se(f, c);
    return d < 0 ? void 0 : f[d][1];
  }
  function ua(c) {
    return Se(this.__data__, c) > -1;
  }
  function la(c, f) {
    var d = this.__data__, m = Se(d, c);
    return m < 0 ? d.push([c, f]) : d[m][1] = f, this;
  }
  rt.prototype.clear = oa, rt.prototype.delete = aa, rt.prototype.get = ca, rt.prototype.has = ua, rt.prototype.set = la;
  function Ft(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function fa() {
    this.__data__ = {
      hash: new vt(),
      map: new (Xt || rt)(),
      string: new vt()
    };
  }
  function ha(c) {
    return _e(this, c).delete(c);
  }
  function pa(c) {
    return _e(this, c).get(c);
  }
  function da(c) {
    return _e(this, c).has(c);
  }
  function ga(c, f) {
    return _e(this, c).set(c, f), this;
  }
  Ft.prototype.clear = fa, Ft.prototype.delete = ha, Ft.prototype.get = pa, Ft.prototype.has = da, Ft.prototype.set = ga;
  function Ut(c) {
    this.__data__ = new rt(c);
  }
  function ma() {
    this.__data__ = new rt();
  }
  function Ia(c) {
    return this.__data__.delete(c);
  }
  function va(c) {
    return this.__data__.get(c);
  }
  function Ta(c) {
    return this.__data__.has(c);
  }
  function ya(c, f) {
    var d = this.__data__;
    if (d instanceof rt) {
      var m = d.__data__;
      if (!Xt || m.length < n - 1)
        return m.push([c, f]), this;
      d = this.__data__ = new Ft(m);
    }
    return d.set(c, f), this;
  }
  Ut.prototype.clear = ma, Ut.prototype.delete = Ia, Ut.prototype.get = va, Ut.prototype.has = Ta, Ut.prototype.set = ya;
  function ba(c, f) {
    var d = vn(c) || Ka(c) ? $o(c.length, String) : [], m = d.length, C = !!m;
    for (var O in c)
      (f || lt.call(c, O)) && !(C && (O == "length" || La(O, m))) && d.push(O);
    return d;
  }
  function Zr(c, f, d) {
    var m = c[f];
    (!(lt.call(c, f) && ri(m, d)) || d === void 0 && !(f in c)) && (c[f] = d);
  }
  function Se(c, f) {
    for (var d = c.length; d--; )
      if (ri(c[d][0], f))
        return d;
    return -1;
  }
  function wa(c, f) {
    return c && ti(f, Tn(f), c);
  }
  function mn(c, f, d, m, C, O, j) {
    var $;
    if (m && ($ = O ? m(c, C, O, j) : m(c)), $ !== void 0)
      return $;
    if (!xe(c))
      return c;
    var oi = vn(c);
    if (oi) {
      if ($ = Ba(c), !f)
        return Ra(c, $);
    } else {
      var $t = Tt(c), ai = $t == p || $t == h;
      if (Ja(c))
        return Ea(c, f);
      if ($t == I || $t == s || ai && !O) {
        if (Hr(c))
          return O ? c : {};
        if ($ = $a(ai ? {} : c), !f)
          return Fa(c, wa($, c));
      } else {
        if (!w[$t])
          return O ? c : {};
        $ = Da(c, $t, mn, f);
      }
    }
    j || (j = new Ut());
    var ci = j.get(c);
    if (ci)
      return ci;
    if (j.set(c, $), !oi)
      var ui = d ? Ua(c) : Tn(c);
    return Uo(ui || c, function(yn, Ce) {
      ui && (Ce = yn, yn = c[Ce]), Zr($, Ce, mn(yn, f, d, m, Ce, c, j));
    }), $;
  }
  function ka(c) {
    return xe(c) ? Ko(c) : {};
  }
  function Sa(c, f, d) {
    var m = f(c);
    return vn(c) ? m : Bo(m, d(c));
  }
  function _a(c) {
    return ke.call(c);
  }
  function xa(c) {
    if (!xe(c) || qa(c))
      return !1;
    var f = si(c) || Hr(c) ? qo : Po;
    return f.test(yt(c));
  }
  function Ca(c) {
    if (!ni(c))
      return jo(c);
    var f = [];
    for (var d in Object(c))
      lt.call(c, d) && d != "constructor" && f.push(d);
    return f;
  }
  function Ea(c, f) {
    if (f)
      return c.slice();
    var d = new c.constructor(c.length);
    return c.copy(d), d;
  }
  function In(c) {
    var f = new c.constructor(c.byteLength);
    return new jr(f).set(new jr(c)), f;
  }
  function Na(c, f) {
    var d = f ? In(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.byteLength);
  }
  function Pa(c, f, d) {
    var m = f ? d(qr(c), !0) : qr(c);
    return Lr(m, Ro, new c.constructor());
  }
  function Aa(c) {
    var f = new c.constructor(c.source, No.exec(c));
    return f.lastIndex = c.lastIndex, f;
  }
  function Oa(c, f, d) {
    var m = f ? d(zr(c), !0) : zr(c);
    return Lr(m, Fo, new c.constructor());
  }
  function Ma(c) {
    return Xr ? Object(Xr.call(c)) : {};
  }
  function Va(c, f) {
    var d = f ? In(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.length);
  }
  function Ra(c, f) {
    var d = -1, m = c.length;
    for (f || (f = Array(m)); ++d < m; )
      f[d] = c[d];
    return f;
  }
  function ti(c, f, d, m) {
    d || (d = {});
    for (var C = -1, O = f.length; ++C < O; ) {
      var j = f[C], $ = m ? m(d[j], c[j], j, d, c) : void 0;
      Zr(d, j, $ === void 0 ? c[j] : $);
    }
    return d;
  }
  function Fa(c, f) {
    return ti(c, ei(c), f);
  }
  function Ua(c) {
    return Sa(c, Tn, ei);
  }
  function _e(c, f) {
    var d = c.__data__;
    return Ha(f) ? d[typeof f == "string" ? "string" : "hash"] : d.map;
  }
  function Bt(c, f) {
    var d = Do(c, f);
    return xa(d) ? d : void 0;
  }
  var ei = Yr ? ln(Yr, Object) : Ya, Tt = _a;
  (hn && Tt(new hn(new ArrayBuffer(1))) != be || Xt && Tt(new Xt()) != g || pn && Tt(pn.resolve()) != b || dn && Tt(new dn()) != N || gn && Tt(new gn()) != Qt) && (Tt = function(c) {
    var f = ke.call(c), d = f == I ? c.constructor : void 0, m = d ? yt(d) : void 0;
    if (m)
      switch (m) {
        case Yo:
          return be;
        case Qo:
          return g;
        case Xo:
          return b;
        case Zo:
          return N;
        case ta:
          return Qt;
      }
    return f;
  });
  function Ba(c) {
    var f = c.length, d = c.constructor(f);
    return f && typeof c[0] == "string" && lt.call(c, "index") && (d.index = c.index, d.input = c.input), d;
  }
  function $a(c) {
    return typeof c.constructor == "function" && !ni(c) ? ka(zo(c)) : {};
  }
  function Da(c, f, d, m) {
    var C = c.constructor;
    switch (f) {
      case Nr:
        return In(c);
      case a:
      case l:
        return new C(+c);
      case be:
        return Na(c, m);
      case Pr:
      case Ar:
      case Or:
      case Mr:
      case Vr:
      case Rr:
      case Fr:
      case Ur:
      case Br:
        return Va(c, m);
      case g:
        return Pa(c, m, d);
      case v:
      case S:
        return new C(c);
      case K:
        return Aa(c);
      case N:
        return Oa(c, m, d);
      case ye:
        return Ma(c);
    }
  }
  function La(c, f) {
    return f = f ?? i, !!f && (typeof c == "number" || Ao.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function Ha(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function qa(c) {
    return !!Kr && Kr in c;
  }
  function ni(c) {
    var f = c && c.constructor, d = typeof f == "function" && f.prototype || we;
    return c === d;
  }
  function yt(c) {
    if (c != null) {
      try {
        return Gr.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function za(c) {
    return mn(c, !0, !0);
  }
  function ri(c, f) {
    return c === f || c !== c && f !== f;
  }
  function Ka(c) {
    return Ga(c) && lt.call(c, "callee") && (!Go.call(c, "callee") || ke.call(c) == s);
  }
  var vn = Array.isArray;
  function ii(c) {
    return c != null && Wa(c.length) && !si(c);
  }
  function Ga(c) {
    return ja(c) && ii(c);
  }
  var Ja = Wo || Qa;
  function si(c) {
    var f = xe(c) ? ke.call(c) : "";
    return f == p || f == h;
  }
  function Wa(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function xe(c) {
    var f = typeof c;
    return !!c && (f == "object" || f == "function");
  }
  function ja(c) {
    return !!c && typeof c == "object";
  }
  function Tn(c) {
    return ii(c) ? ba(c) : Ca(c);
  }
  function Ya() {
    return [];
  }
  function Qa() {
    return !1;
  }
  t.exports = za;
})(Fn, Fn.exports);
const bi = Fn.exports;
class Ee {
  ticks;
  bpm;
  time;
  constructor({
    ticks: e,
    bpm: n,
    time: r
  }) {
    this.ticks = e, this.bpm = n, this.time = r;
  }
  getTicks() {
    return this.ticks;
  }
  getBpm() {
    return this.bpm;
  }
  setBpmInternal(e) {
    this.bpm = e;
  }
  getTime() {
    return this.time;
  }
  setTimeInternal(e) {
    this.time = e;
  }
}
class wi {
  ticks;
  numerator;
  denominator;
  constructor({
    ticks: e,
    numerator: n,
    denominator: r
  }) {
    this.ticks = e, this.numerator = n, this.denominator = r;
  }
  getTicks() {
    return this.ticks;
  }
  setTicks(e) {
    this.ticks = e;
  }
  getNumerator() {
    return this.numerator;
  }
  setNumerator(e) {
    this.numerator = e;
  }
  getDenominator() {
    return this.denominator;
  }
  setDenominator(e) {
    this.denominator = e;
  }
}
function Ru(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const $s = Object.assign, Fu = Object.prototype.hasOwnProperty, en = (t, e) => Fu.call(t, e), dt = Array.isArray, ie = (t) => Ds(t) === "[object Map]", Uu = (t) => typeof t == "string", ar = (t) => typeof t == "symbol", nn = (t) => t !== null && typeof t == "object", Bu = Object.prototype.toString, Ds = (t) => Bu.call(t), Ls = (t) => Ds(t).slice(8, -1), cr = (t) => Uu(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, $u = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Ah = $u((t) => t.charAt(0).toUpperCase() + t.slice(1)), Hs = (t, e) => !Object.is(t, e), Du = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Lu;
function Hu(t, e = Lu) {
  e && e.active && e.effects.push(t);
}
const Un = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, qs = (t) => (t.w & gt) > 0, zs = (t) => (t.n & gt) > 0, qu = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= gt;
}, zu = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      qs(i) && !zs(i) ? i.delete(t) : e[n++] = i, i.w &= ~gt, i.n &= ~gt;
    }
    e.length = n;
  }
}, Bn = /* @__PURE__ */ new WeakMap();
let ne = 0, gt = 1;
const $n = 30;
let J;
const xt = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Dn = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Ku {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Hu(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = J, n = Ct;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = J, J = this, Ct = !0, gt = 1 << ++ne, ne <= $n ? qu(this) : ki(this), this.fn();
    } finally {
      ne <= $n && zu(this), gt = 1 << --ne, J = this.parent, Ct = n, this.parent = void 0;
    }
  }
  stop() {
    this.active && (ki(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ki(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let Ct = !0;
const Ks = [];
function Gs() {
  Ks.push(Ct), Ct = !1;
}
function Js() {
  const t = Ks.pop();
  Ct = t === void 0 ? !0 : t;
}
function Z(t, e, n) {
  if (Ct && J) {
    let r = Bn.get(t);
    r || Bn.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Un());
    const s = process.env.NODE_ENV !== "production" ? { effect: J, target: t, type: e, key: n } : void 0;
    Gu(i, s);
  }
}
function Gu(t, e) {
  let n = !1;
  ne <= $n ? zs(t) || (t.n |= gt, n = !qs(t)) : n = !t.has(J), n && (t.add(J), J.deps.push(t), process.env.NODE_ENV !== "production" && J.onTrack && J.onTrack(Object.assign({
    effect: J
  }, e)));
}
function mt(t, e, n, r, i, s) {
  const o = Bn.get(t);
  if (!o)
    return;
  let a = [];
  if (e === "clear")
    a = [...o.values()];
  else if (n === "length" && dt(t))
    o.forEach((u, p) => {
      (p === "length" || p >= r) && a.push(u);
    });
  else
    switch (n !== void 0 && a.push(o.get(n)), e) {
      case "add":
        dt(t) ? cr(n) && a.push(o.get("length")) : (a.push(o.get(xt)), ie(t) && a.push(o.get(Dn)));
        break;
      case "delete":
        dt(t) || (a.push(o.get(xt)), ie(t) && a.push(o.get(Dn)));
        break;
      case "set":
        ie(t) && a.push(o.get(xt));
        break;
    }
  const l = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (a.length === 1)
    a[0] && (process.env.NODE_ENV !== "production" ? Ne(a[0], l) : Ne(a[0]));
  else {
    const u = [];
    for (const p of a)
      p && u.push(...p);
    process.env.NODE_ENV !== "production" ? Ne(Un(u), l) : Ne(Un(u));
  }
}
function Ne(t, e) {
  for (const n of dt(t) ? t : [...t])
    (n !== J || n.allowRecurse) && (process.env.NODE_ENV !== "production" && n.onTrigger && n.onTrigger($s({ effect: n }, e)), n.scheduler ? n.scheduler() : n.run());
}
const Ju = /* @__PURE__ */ Ru("__proto__,__v_isRef,__isVue"), Ws = new Set(Object.getOwnPropertyNames(Symbol).map((t) => Symbol[t]).filter(ar)), Wu = /* @__PURE__ */ ur(), ju = /* @__PURE__ */ ur(!0), Yu = /* @__PURE__ */ ur(!0, !0), Si = /* @__PURE__ */ Qu();
function Qu() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = y(this);
      for (let s = 0, o = this.length; s < o; s++)
        Z(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(y)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Gs();
      const r = y(this)[e].apply(this, n);
      return Js(), r;
    };
  }), t;
}
function ur(t = !1, e = !1) {
  return function(r, i, s) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_isShallow")
      return e;
    if (i === "__v_raw" && s === (t ? e ? Zs : Xs : e ? pl : Qs).get(r))
      return r;
    const o = dt(r);
    if (!t && o && en(Si, i))
      return Reflect.get(Si, i, s);
    const a = Reflect.get(r, i, s);
    return (ar(i) ? Ws.has(i) : Ju(i)) || (t || Z(r, "get", i), e) ? a : R(a) ? !o || !cr(i) ? a.value : a : nn(a) ? t ? eo(a) : to(a) : a;
  };
}
const Xu = /* @__PURE__ */ Zu();
function Zu(t = !1) {
  return function(n, r, i, s) {
    let o = n[r];
    if (Ot(o) && R(o) && !R(i))
      return !1;
    if (!t && !Ot(i) && (no(i) || (i = y(i), o = y(o)), !dt(n) && R(o) && !R(i)))
      return o.value = i, !0;
    const a = dt(n) && cr(r) ? Number(r) < n.length : en(n, r), l = Reflect.set(n, r, i, s);
    return n === y(s) && (a ? Hs(i, o) && mt(n, "set", r, i, o) : mt(n, "add", r, i)), l;
  };
}
function tl(t, e) {
  const n = en(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && mt(t, "delete", e, void 0, r), i;
}
function el(t, e) {
  const n = Reflect.has(t, e);
  return (!ar(e) || !Ws.has(e)) && Z(t, "has", e), n;
}
function nl(t) {
  return Z(t, "iterate", dt(t) ? "length" : xt), Reflect.ownKeys(t);
}
const rl = {
  get: Wu,
  set: Xu,
  deleteProperty: tl,
  has: el,
  ownKeys: nl
}, js = {
  get: ju,
  set(t, e) {
    return process.env.NODE_ENV, !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV, !0;
  }
}, il = /* @__PURE__ */ $s({}, js, {
  get: Yu
}), lr = (t) => t, rn = (t) => Reflect.getPrototypeOf(t);
function Pe(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = y(t), s = y(e);
  e !== s && !n && Z(i, "get", e), !n && Z(i, "get", s);
  const { has: o } = rn(i), a = r ? lr : n ? dr : pr;
  if (o.call(i, e))
    return a(t.get(e));
  if (o.call(i, s))
    return a(t.get(s));
  t !== i && t.get(e);
}
function Ae(t, e = !1) {
  const n = this.__v_raw, r = y(n), i = y(t);
  return t !== i && !e && Z(r, "has", t), !e && Z(r, "has", i), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Oe(t, e = !1) {
  return t = t.__v_raw, !e && Z(y(t), "iterate", xt), Reflect.get(t, "size", t);
}
function _i(t) {
  t = y(t);
  const e = y(this);
  return rn(e).has.call(e, t) || (e.add(t), mt(e, "add", t, t)), this;
}
function xi(t, e) {
  e = y(e);
  const n = y(this), { has: r, get: i } = rn(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Ys(n, r, t) : (t = y(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? Hs(e, o) && mt(n, "set", t, e, o) : mt(n, "add", t, e), this;
}
function Ci(t) {
  const e = y(this), { has: n, get: r } = rn(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Ys(e, n, t) : (t = y(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, o = e.delete(t);
  return i && mt(e, "delete", t, void 0, s), o;
}
function Ei() {
  const t = y(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? ie(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && mt(t, "clear", void 0, void 0, n), r;
}
function Me(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, a = y(o), l = e ? lr : t ? dr : pr;
    return !t && Z(a, "iterate", xt), o.forEach((u, p) => r.call(i, l(u), l(p), s));
  };
}
function Ve(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = y(i), o = ie(s), a = t === "entries" || t === Symbol.iterator && o, l = t === "keys" && o, u = i[t](...r), p = n ? lr : e ? dr : pr;
    return !e && Z(s, "iterate", l ? Dn : xt), {
      next() {
        const { value: h, done: g } = u.next();
        return g ? { value: h, done: g } : {
          value: a ? [p(h[0]), p(h[1])] : p(h),
          done: g
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ft(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const n = e[0] ? `on key "${e[0]}" ` : "";
    }
    return t === "delete" ? !1 : this;
  };
}
function sl() {
  const t = {
    get(s) {
      return Pe(this, s);
    },
    get size() {
      return Oe(this);
    },
    has: Ae,
    add: _i,
    set: xi,
    delete: Ci,
    clear: Ei,
    forEach: Me(!1, !1)
  }, e = {
    get(s) {
      return Pe(this, s, !1, !0);
    },
    get size() {
      return Oe(this);
    },
    has: Ae,
    add: _i,
    set: xi,
    delete: Ci,
    clear: Ei,
    forEach: Me(!1, !0)
  }, n = {
    get(s) {
      return Pe(this, s, !0);
    },
    get size() {
      return Oe(this, !0);
    },
    has(s) {
      return Ae.call(this, s, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: Me(!0, !1)
  }, r = {
    get(s) {
      return Pe(this, s, !0, !0);
    },
    get size() {
      return Oe(this, !0);
    },
    has(s) {
      return Ae.call(this, s, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: Me(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = Ve(s, !1, !1), n[s] = Ve(s, !0, !1), e[s] = Ve(s, !1, !0), r[s] = Ve(s, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
const [ol, al, cl, ul] = /* @__PURE__ */ sl();
function fr(t, e) {
  const n = e ? t ? ul : cl : t ? al : ol;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(en(n, i) && i in r ? n : r, i, s);
}
const ll = {
  get: /* @__PURE__ */ fr(!1, !1)
}, fl = {
  get: /* @__PURE__ */ fr(!0, !1)
}, hl = {
  get: /* @__PURE__ */ fr(!0, !0)
};
function Ys(t, e, n) {
  const r = y(n);
  if (r !== n && e.call(t, r)) {
    const i = Ls(t);
  }
}
const Qs = /* @__PURE__ */ new WeakMap(), pl = /* @__PURE__ */ new WeakMap(), Xs = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap();
function dl(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function gl(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : dl(Ls(t));
}
function to(t) {
  return Ot(t) ? t : hr(t, !1, rl, ll, Qs);
}
function eo(t) {
  return hr(t, !0, js, fl, Xs);
}
function Re(t) {
  return hr(t, !0, il, hl, Zs);
}
function hr(t, e, n, r, i) {
  if (!nn(t))
    return process.env.NODE_ENV, t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = gl(t);
  if (o === 0)
    return t;
  const a = new Proxy(t, o === 2 ? r : n);
  return i.set(t, a), a;
}
function Et(t) {
  return Ot(t) ? Et(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Ot(t) {
  return !!(t && t.__v_isReadonly);
}
function no(t) {
  return !!(t && t.__v_isShallow);
}
function Ke(t) {
  return Et(t) || Ot(t);
}
function y(t) {
  const e = t && t.__v_raw;
  return e ? y(e) : t;
}
function ml(t) {
  return Du(t, "__v_skip", !0), t;
}
const pr = (t) => nn(t) ? to(t) : t, dr = (t) => nn(t) ? eo(t) : t;
function R(t) {
  return !!(t && t.__v_isRef === !0);
}
function Il(t) {
  return R(t) ? t.value : t;
}
const vl = {
  get: (t, e, n) => Il(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return R(i) && !R(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Tl(t) {
  return Et(t) ? t : new Proxy(t, vl);
}
Promise.resolve();
function gr(t) {
  if (q(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = et(r) ? wl(r) : gr(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else {
    if (et(t))
      return t;
    if (at(t))
      return t;
  }
}
const yl = /;(?![^(]*\))/g, bl = /:(.+)/;
function wl(t) {
  const e = {};
  return t.split(yl).forEach((n) => {
    if (n) {
      const r = n.split(bl);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function mr(t) {
  let e = "";
  if (et(t))
    e = t;
  else if (q(t))
    for (let n = 0; n < t.length; n++) {
      const r = mr(t[n]);
      r && (e += r + " ");
    }
  else if (at(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const G = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Ir = () => {
}, kl = /^on[^a-z]/, Sl = (t) => kl.test(t), ut = Object.assign, _l = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, xl = Object.prototype.hasOwnProperty, P = (t, e) => xl.call(t, e), q = Array.isArray, Cl = (t) => vr(t) === "[object Map]", El = (t) => vr(t) === "[object Set]", U = (t) => typeof t == "function", et = (t) => typeof t == "string", at = (t) => t !== null && typeof t == "object", Nl = (t) => at(t) && U(t.then) && U(t.catch), Pl = Object.prototype.toString, vr = (t) => Pl.call(t), Al = (t) => vr(t) === "[object Object]", Ni = (t, e) => !Object.is(t, e);
let Pi;
const Ol = () => Pi || (Pi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), Nt = [];
function Ml(t) {
  Nt.push(t);
}
function Vl() {
  Nt.pop();
}
function D(t, ...e) {
  Gs();
  const n = Nt.length ? Nt[Nt.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = Rl();
  if (r)
    Pt(r, n, 11, [
      t + e.join(""),
      n && n.proxy,
      i.map(({ vnode: s }) => `at <${yo(n, s.type)}>`).join(`
`),
      i
    ]);
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    i.length && s.push(`
`, ...Fl(i));
  }
  Js();
}
function Rl() {
  let t = Nt[Nt.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const n = e[0];
    n && n.vnode === t ? n.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const r = t.component && t.component.parent;
    t = r && r.vnode;
  }
  return e;
}
function Fl(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ...Ul(n));
  }), e;
}
function Ul({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${yo(t.component, t.type, r)}`, s = ">" + n;
  return t.props ? [i, ...Bl(t.props), s] : [i + s];
}
function Bl(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...ro(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function ro(t, e, n) {
  return et(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : R(e) ? (e = ro(t, y(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : U(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = y(e), n ? e : [`${t}=`, e]);
}
const io = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Pt(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (s) {
    so(s, e, n);
  }
  return i;
}
function Ln(t, e, n, r) {
  if (U(t)) {
    const s = Pt(t, e, n, r);
    return s && Nl(s) && s.catch((o) => {
      so(o, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(Ln(t[s], e, n, r));
  return i;
}
function so(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const o = e.proxy, a = process.env.NODE_ENV !== "production" ? io[n] : n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](t, o, a) === !1)
            return;
      }
      s = s.parent;
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      Pt(l, null, 10, [t, o, a]);
      return;
    }
  }
  $l(t, n, i, r);
}
function $l(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = io[e];
    if (n && Ml(n), D(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Vl(), r)
      throw t;
  }
}
let Ge = !1, Hn = !1;
const tt = [];
let ht = 0;
const se = [];
let Lt = null, wt = 0;
const oe = [];
let it = null, kt = 0;
const oo = Promise.resolve();
let Tr = null, qn = null;
const Dl = 100;
function Ll(t) {
  const e = Tr || oo;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Hl(t) {
  let e = ht + 1, n = tt.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    he(tt[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function ao(t) {
  (!tt.length || !tt.includes(t, Ge && t.allowRecurse ? ht + 1 : ht)) && t !== qn && (t.id == null ? tt.push(t) : tt.splice(Hl(t.id), 0, t), co());
}
function co() {
  !Ge && !Hn && (Hn = !0, Tr = oo.then(ho));
}
function uo(t, e, n, r) {
  q(t) ? n.push(...t) : (!e || !e.includes(t, t.allowRecurse ? r + 1 : r)) && n.push(t), co();
}
function ql(t) {
  uo(t, Lt, se, wt);
}
function lo(t) {
  uo(t, it, oe, kt);
}
function fo(t, e = null) {
  if (se.length) {
    for (qn = e, Lt = [...new Set(se)], se.length = 0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), wt = 0; wt < Lt.length; wt++)
      process.env.NODE_ENV !== "production" && yr(t, Lt[wt]) || Lt[wt]();
    Lt = null, wt = 0, qn = null, fo(t, e);
  }
}
function zl(t) {
  if (oe.length) {
    const e = [...new Set(oe)];
    if (oe.length = 0, it) {
      it.push(...e);
      return;
    }
    for (it = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), it.sort((n, r) => he(n) - he(r)), kt = 0; kt < it.length; kt++)
      process.env.NODE_ENV !== "production" && yr(t, it[kt]) || it[kt]();
    it = null, kt = 0;
  }
}
const he = (t) => t.id == null ? 1 / 0 : t.id;
function ho(t) {
  Hn = !1, Ge = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), fo(t), tt.sort((n, r) => he(n) - he(r));
  const e = process.env.NODE_ENV !== "production" ? (n) => yr(t, n) : Ir;
  try {
    for (ht = 0; ht < tt.length; ht++) {
      const n = tt[ht];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Pt(n, null, 14);
      }
    }
  } finally {
    ht = 0, tt.length = 0, zl(t), Ge = !1, Tr = null, (tt.length || se.length || oe.length) && ho(t);
  }
}
function yr(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > Dl) {
      const r = e.ownerInstance, i = r && To(r.type);
      return D(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const ee = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Ol().__VUE_HMR_RUNTIME__ = {
  createRecord: Sn(Kl),
  rerender: Sn(Gl),
  reload: Sn(Jl)
});
const Je = /* @__PURE__ */ new Map();
function Kl(t, e) {
  return Je.has(t) ? !1 : (Je.set(t, {
    initialDef: ae(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ae(t) {
  return bo(t) ? t.__vccOpts : t;
}
function Gl(t, e) {
  const n = Je.get(t);
  !n || (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, ae(r.type).render = e), r.renderCache = [], r.update();
  }));
}
function Jl(t, e) {
  const n = Je.get(t);
  if (!n)
    return;
  e = ae(e), Ai(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = ae(i.type);
    ee.has(s) || (s !== n.initialDef && Ai(s, e), ee.add(s)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (ee.add(s), i.ceReload(e.styles), ee.delete(s)) : i.parent ? (ao(i.parent.update), i.parent.type.__asyncLoader && i.parent.ceReload && i.parent.ceReload(e.styles)) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" && window.location.reload();
  }
  lo(() => {
    for (const i of r)
      ee.delete(ae(i.type));
  });
}
function Ai(t, e) {
  ut(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function Sn(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch {
    }
  };
}
let _t = null, Wl = null;
const jl = (t) => t.__isSuspense;
function Yl(t, e) {
  e && e.pendingBranch ? q(t) ? e.effects.push(...t) : e.effects.push(t) : lo(t);
}
const Oi = {};
function Ql(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: o } = G) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && D('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && D('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = (S) => {
    D("Invalid watch source: ", S, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = Kt;
  let u, p = !1, h = !1;
  if (R(t) ? (u = () => t.value, p = no(t)) : Et(t) ? (u = () => t, r = !0) : q(t) ? (h = !0, p = t.some(Et), u = () => t.map((S) => {
    if (R(S))
      return S.value;
    if (Et(S))
      return qt(S);
    if (U(S))
      return Pt(S, l, 2);
    process.env.NODE_ENV !== "production" && a(S);
  })) : U(t) ? e ? u = () => Pt(t, l, 2) : u = () => {
    if (!(l && l.isUnmounted))
      return g && g(), Ln(t, l, 3, [v]);
  } : (u = Ir, process.env.NODE_ENV !== "production" && a(t)), e && r) {
    const S = u;
    u = () => qt(S());
  }
  let g, v = (S) => {
    g = N.onStop = () => {
      Pt(S, l, 4);
    };
  }, I = h ? [] : Oi;
  const b = () => {
    if (!!N.active)
      if (e) {
        const S = N.run();
        (r || p || (h ? S.some((ye, Qt) => Ni(ye, I[Qt])) : Ni(S, I))) && (g && g(), Ln(e, l, 3, [
          S,
          I === Oi ? void 0 : I,
          v
        ]), I = S);
      } else
        N.run();
  };
  b.allowRecurse = !!e;
  let K;
  i === "sync" ? K = b : i === "post" ? K = () => Ri(b, l && l.suspense) : K = () => {
    !l || l.isMounted ? ql(b) : b();
  };
  const N = new Ku(u, K);
  return process.env.NODE_ENV !== "production" && (N.onTrack = s, N.onTrigger = o), e ? n ? b() : I = N.run() : i === "post" ? Ri(N.run.bind(N), l && l.suspense) : N.run(), () => {
    N.stop(), l && l.scope && _l(l.scope.effects, N);
  };
}
function Xl(t, e, n) {
  const r = this.proxy, i = et(t) ? t.includes(".") ? Zl(r, t) : () => r[t] : t.bind(r, r);
  let s;
  U(e) ? s = e : (s = e.handler, n = e);
  const o = Kt;
  Ui(this);
  const a = Ql(i, s.bind(r), n);
  return o ? Ui(o) : vf(), a;
}
function Zl(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function qt(t, e) {
  if (!at(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), R(t))
    qt(t.value, e);
  else if (q(t))
    for (let n = 0; n < t.length; n++)
      qt(t[n], e);
  else if (El(t) || Cl(t))
    t.forEach((n) => {
      qt(n, e);
    });
  else if (Al(t))
    for (const n in t)
      qt(t[n], e);
  return t;
}
let tf = !0;
function ef(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: i, optionsCache: s, config: { optionMergeStrategies: o } } = t.appContext, a = s.get(e);
  let l;
  return a ? l = a : !i.length && !n && !r ? l = e : (l = {}, i.length && i.forEach((u) => We(l, u, o, !0)), We(l, e, o)), s.set(e, l), l;
}
function We(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && We(t, s, n, !0), i && i.forEach((o) => We(t, o, n, !0));
  for (const o in e)
    if (r && o === "expose")
      process.env.NODE_ENV !== "production" && D('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const a = nf[o] || n && n[o];
      t[o] = a ? a(t[o], e[o]) : e[o];
    }
  return t;
}
const nf = {
  data: Mi,
  props: St,
  emits: St,
  methods: St,
  computed: St,
  beforeCreate: M,
  created: M,
  beforeMount: M,
  mounted: M,
  beforeUpdate: M,
  updated: M,
  beforeDestroy: M,
  beforeUnmount: M,
  destroyed: M,
  unmounted: M,
  activated: M,
  deactivated: M,
  errorCaptured: M,
  serverPrefetch: M,
  components: St,
  directives: St,
  watch: sf,
  provide: Mi,
  inject: rf
};
function Mi(t, e) {
  return e ? t ? function() {
    return ut(U(t) ? t.call(this, this) : t, U(e) ? e.call(this, this) : e);
  } : e : t;
}
function rf(t, e) {
  return St(Vi(t), Vi(e));
}
function Vi(t) {
  if (q(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function M(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function St(t, e) {
  return t ? ut(ut(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function sf(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = ut(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = M(t[r], e[r]);
  return n;
}
const Ri = Yl, of = (t) => t.__isTeleport, af = Symbol(), po = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), cf = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), uf = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let Fi = null;
function lf(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const ff = (...t) => Io(...t), go = "__vInternal", mo = ({ key: t }) => t ?? null, De = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? et(t) || R(t) || U(t) ? { i: _t, r: t, k: e, f: !!n } : t : null;
function hf(t, e = null, n = null, r = 0, i = null, s = t === po ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && mo(e),
    ref: e && De(e),
    scopeId: Wl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null
  };
  return a ? (br(l, n), s & 128 && t.normalize(l)) : n && (l.shapeFlag |= et(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && D("VNode created with invalid key (NaN). VNode type:", l.type), !o && Fi && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && Fi.push(l), l;
}
const pf = process.env.NODE_ENV !== "production" ? ff : Io;
function Io(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === af) && (process.env.NODE_ENV !== "production" && !t && D(`Invalid vnode type when creating vnode: ${t}.`), t = uf), lf(t)) {
    const a = je(t, e, !0);
    return n && br(a, n), a;
  }
  if (bo(t) && (t = t.__vccOpts), e) {
    e = df(e);
    let { class: a, style: l } = e;
    a && !et(a) && (e.class = mr(a)), at(l) && (Ke(l) && !q(l) && (l = ut({}, l)), e.style = gr(l));
  }
  const o = et(t) ? 1 : jl(t) ? 128 : of(t) ? 64 : at(t) ? 4 : U(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && Ke(t) && (t = y(t), D("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), hf(t, e, n, r, i, o, s, !0);
}
function df(t) {
  return t ? Ke(t) || go in t ? ut({}, t) : t : null;
}
function je(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, a = e ? mf(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: a,
    key: a && mo(a),
    ref: e && e.ref ? n && i ? q(i) ? i.concat(De(e)) : [i, De(e)] : De(e) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && q(o) ? o.map(vo) : o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== po ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && je(t.ssContent),
    ssFallback: t.ssFallback && je(t.ssFallback),
    el: t.el,
    anchor: t.anchor
  };
}
function vo(t) {
  const e = je(t);
  return q(t.children) && (e.children = t.children.map(vo)), e;
}
function gf(t = " ", e = 0) {
  return pf(cf, null, t, e);
}
function br(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (q(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), br(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(go in e) ? e._ctx = _t : i === 3 && _t && (_t.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    U(e) ? (e = { default: e, _ctx: _t }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [gf(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function mf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = mr([e.class, r.class]));
      else if (i === "style")
        e.style = gr([e.style, r.style]);
      else if (Sl(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(q(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
const zn = (t) => t ? Tf(t) ? yf(t) || t.proxy : zn(t.parent) : null, Ye = ut(/* @__PURE__ */ Object.create(null), {
  $: (t) => t,
  $el: (t) => t.vnode.el,
  $data: (t) => t.data,
  $props: (t) => process.env.NODE_ENV !== "production" ? Re(t.props) : t.props,
  $attrs: (t) => process.env.NODE_ENV !== "production" ? Re(t.attrs) : t.attrs,
  $slots: (t) => process.env.NODE_ENV !== "production" ? Re(t.slots) : t.slots,
  $refs: (t) => process.env.NODE_ENV !== "production" ? Re(t.refs) : t.refs,
  $parent: (t) => zn(t.parent),
  $root: (t) => zn(t.root),
  $emit: (t) => t.emit,
  $options: (t) => __VUE_OPTIONS_API__ ? ef(t) : t.type,
  $forceUpdate: (t) => () => ao(t.update),
  $nextTick: (t) => Ll.bind(t.proxy),
  $watch: (t) => __VUE_OPTIONS_API__ ? Xl.bind(t) : Ir
}), If = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: a, appContext: l } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && r !== G && r.__isScriptSetup && P(r, e))
      return r[e];
    let u;
    if (e[0] !== "$") {
      const v = o[e];
      if (v !== void 0)
        switch (v) {
          case 1:
            return r[e];
          case 2:
            return i[e];
          case 4:
            return n[e];
          case 3:
            return s[e];
        }
      else {
        if (r !== G && P(r, e))
          return o[e] = 1, r[e];
        if (i !== G && P(i, e))
          return o[e] = 2, i[e];
        if ((u = t.propsOptions[0]) && P(u, e))
          return o[e] = 3, s[e];
        if (n !== G && P(n, e))
          return o[e] = 4, n[e];
        (!__VUE_OPTIONS_API__ || tf) && (o[e] = 0);
      }
    }
    const p = Ye[e];
    let h, g;
    if (p)
      return e === "$attrs" && (Z(t, "get", e), process.env.NODE_ENV !== "production" && void 0), p(t);
    if ((h = a.__cssModules) && (h = h[e]))
      return h;
    if (n !== G && P(n, e))
      return o[e] = 4, n[e];
    if (g = l.config.globalProperties, P(g, e))
      return g[e];
    process.env.NODE_ENV !== "production" && _t && (!et(e) || e.indexOf("__v") !== 0) && (i !== G && (e[0] === "$" || e[0] === "_") && P(i, e) ? D(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === _t && D(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return i !== G && P(i, e) ? (i[e] = n, !0) : r !== G && P(r, e) ? (r[e] = n, !0) : P(t.props, e) ? (process.env.NODE_ENV !== "production" && D(`Attempting to mutate prop "${e}". Props are readonly.`, t), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && D(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`, t), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s } }, o) {
    let a;
    return !!n[o] || t !== G && P(t, o) || e !== G && P(e, o) || (a = s[0]) && P(a, o) || P(r, o) || P(Ye, o) || P(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? this.set(t, e, n.get(), null) : n.value != null && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (If.ownKeys = (t) => (D("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
let Kt = null;
const Ui = (t) => {
  Kt = t, t.scope.on();
}, vf = () => {
  Kt && Kt.scope.off(), Kt = null;
};
function Tf(t) {
  return t.vnode.shapeFlag & 4;
}
function yf(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Tl(ml(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in Ye)
          return Ye[n](t);
      }
    }));
}
const bf = /(?:^|[-_])(\w)/g, wf = (t) => t.replace(bf, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function To(t) {
  return U(t) && t.displayName || t.name;
}
function yo(t, e, n = !1) {
  let r = To(e);
  if (!r && e.__file) {
    const i = e.__file.match(/([^/\\]+)\.\w+$/);
    i && (r = i[1]);
  }
  if (!r && t && t.parent) {
    const i = (s) => {
      for (const o in s)
        if (s[o] === e)
          return o;
    };
    r = i(t.components || t.parent.type.components) || i(t.appContext.components);
  }
  return r ? wf(r) : n ? "App" : "Anonymous";
}
function bo(t) {
  return U(t) && "__vccOpts" in t;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function _n(t) {
  return !!(t && t.__v_isShallow);
}
function kf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(h) {
      return at(h) ? h.__isVue ? ["div", t, "VueInstance"] : R(h) ? [
        "div",
        {},
        ["span", t, p(h)],
        "<",
        a(h.value),
        ">"
      ] : Et(h) ? [
        "div",
        {},
        ["span", t, _n(h) ? "ShallowReactive" : "Reactive"],
        "<",
        a(h),
        `>${Ot(h) ? " (readonly)" : ""}`
      ] : Ot(h) ? [
        "div",
        {},
        ["span", t, _n(h) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(h),
        ">"
      ] : null : null;
    },
    hasBody(h) {
      return h && h.__isVue;
    },
    body(h) {
      if (h && h.__isVue)
        return [
          "div",
          {},
          ...s(h.$)
        ];
    }
  };
  function s(h) {
    const g = [];
    h.type.props && h.props && g.push(o("props", y(h.props))), h.setupState !== G && g.push(o("setup", h.setupState)), h.data !== G && g.push(o("data", y(h.data)));
    const v = l(h, "computed");
    v && g.push(o("computed", v));
    const I = l(h, "inject");
    return I && g.push(o("injected", I)), g.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: h }]
    ]), g;
  }
  function o(h, g) {
    return g = ut({}, g), Object.keys(g).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        h
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(g).map((v) => [
          "div",
          {},
          ["span", r, v + ": "],
          a(g[v], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(h, g = !0) {
    return typeof h == "number" ? ["span", e, h] : typeof h == "string" ? ["span", n, JSON.stringify(h)] : typeof h == "boolean" ? ["span", r, h] : at(h) ? ["object", { object: g ? y(h) : h }] : ["span", n, String(h)];
  }
  function l(h, g) {
    const v = h.type;
    if (U(v))
      return;
    const I = {};
    for (const b in h.ctx)
      u(v, b, g) && (I[b] = h.ctx[b]);
    return I;
  }
  function u(h, g, v) {
    const I = h[v];
    if (q(I) && I.includes(g) || at(I) && g in I || h.extends && u(h.extends, g, v) || h.mixins && h.mixins.some((b) => u(b, g, v)))
      return !0;
  }
  function p(h) {
    return _n(h) ? "ShallowRef" : h.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function Sf() {
  kf();
}
process.env.NODE_ENV !== "production" && Sf();
function _f(t) {
  const e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function Oh(t) {
  const e = Math.floor(t / 12) - 2;
  return _f(t) + e.toString();
}
const xf = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, Cf = {
  cbb: -2,
  cb: -1,
  c: 0,
  "c#": 1,
  cx: 2,
  dbb: 0,
  db: 1,
  d: 2,
  "d#": 3,
  dx: 4,
  ebb: 2,
  eb: 3,
  e: 4,
  "e#": 5,
  ex: 6,
  fbb: 3,
  fb: 4,
  f: 5,
  "f#": 6,
  fx: 7,
  gbb: 5,
  gb: 6,
  g: 7,
  "g#": 8,
  gx: 9,
  abb: 7,
  ab: 8,
  a: 9,
  "a#": 10,
  ax: 11,
  bbb: 9,
  bb: 10,
  b: 11,
  "b#": 12,
  bx: 13
};
function Mh(t) {
  const e = xf.exec(t);
  if (!e)
    return -1;
  const n = e[1], r = e[2];
  return Cf[n.toLowerCase()] + (parseInt(r, 10) + 2) * 12;
}
function Bi(t, e, n, r) {
  return `${t} // ${e} // ${n} // ${r}`;
}
function Ef(t, e, n) {
  return `${t} // ${e} // ${n}`;
}
function Vh(t) {
  const e = Qe(t);
  return Ef(e.manufacturerName, e.pluginFormatName, e.name);
}
function Qe(t) {
  const e = t.split(" // ");
  if (e.length < 4)
    throw new Error("Invalid audio plugin tuneflow id.");
  return {
    name: e[2],
    manufacturerName: e[0],
    pluginFormatName: e[1],
    pluginVersion: e[3]
  };
}
function Nf(t, e) {
  return t === e;
}
function Pf(t, e) {
  const n = Qe(t), r = Qe(e);
  if (E.keys(n).length !== E.keys(r).length)
    return !1;
  for (const i of E.keys(n))
    if (i !== "pluginVersion" && n[i] !== r[i])
      return !1;
  return !0;
}
class Rh {
  tempoInfos = [];
  currentTempoIndex = 0;
  ticksPerSecondAtTempoTick = {};
  constructor(e, n) {
    for (const r of e)
      this.tempoInfos.push({
        ticks: r.getTicks(),
        time: r.getTime()
      }), this.ticksPerSecondAtTempoTick[r.getTicks()] = r.getBpm() * n / 60;
  }
  secondsToTick(e) {
    let n = this.tempoInfos[this.currentTempoIndex];
    for (; this.tempoInfos[this.currentTempoIndex + 1] && this.tempoInfos[this.currentTempoIndex + 1].time <= e; )
      this.currentTempoIndex += 1, n = this.tempoInfos[this.currentTempoIndex];
    for (; n.time > e && this.currentTempoIndex > 0; )
      this.currentTempoIndex -= 1, n = this.tempoInfos[this.currentTempoIndex];
    n.time > e && (n = this.tempoInfos[0]);
    const r = e - n.time, i = this.ticksPerSecondAtTempoTick[n.ticks];
    return Math.round(n.ticks + r * i);
  }
  tickToSeconds(e) {
    let n = this.tempoInfos[this.currentTempoIndex];
    for (; this.tempoInfos[this.currentTempoIndex + 1] && this.tempoInfos[this.currentTempoIndex + 1].ticks <= e; )
      this.currentTempoIndex += 1, n = this.tempoInfos[this.currentTempoIndex];
    for (; n.ticks > e && this.currentTempoIndex > 0; )
      this.currentTempoIndex -= 1, n = this.tempoInfos[this.currentTempoIndex];
    n.ticks > e && (n = this.tempoInfos[0]);
    const r = e - n.ticks, i = this.ticksPerSecondAtTempoTick[n.ticks];
    return n.time + r / i;
  }
}
function Af(t) {
  return t > -100 ? Math.exp((t - 6) * (1 / 20)) : 0;
}
function Fh(t) {
  return t <= 0 ? -100 : 20 * Math.log10(t);
}
function Uh(t) {
  return t > 0 ? 20 * Math.log(t) + 6 : -100;
}
function Bh(t) {
  return t > 0 ? Math.pow(10, (20 * Math.log(t) + 6) * (1 / 20)) : 0;
}
function $h(t) {
  return t > 0 ? Math.exp((20 * Math.log10(t) - 6) * (1 / 20)) : 0;
}
function Dh(t, e, n, r, i) {
  return (t - e) / (n - e) * (i - r) + r;
}
function Lh(t) {
  return 440 * Math.pow(2, (t - 69) / 12);
}
function Hh(t) {
  return Ke(t) || R(t) ? y(t) : t;
}
var Of = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(Of || {});
class sn {
  name;
  manufacturerName;
  pluginFormatName;
  pluginVersion;
  isEnabled = !0;
  localInstanceIdInternal;
  base64StatesInternal;
  constructor(e, n, r, i) {
    this.name = e, this.manufacturerName = n, this.pluginFormatName = r, this.pluginVersion = i, this.localInstanceIdInternal = sn.generateAudioPluginInstanceIdInternal();
  }
  getTuneflowId() {
    return Bi(this.manufacturerName, this.pluginFormatName, this.name, this.pluginVersion);
  }
  clone(e) {
    const n = e.createAudioPlugin(this.getTuneflowId());
    return n.setIsEnabled(this.isEnabled), n;
  }
  matchesTfId(e) {
    return Nf(e, this.getTuneflowId());
  }
  matchesTfIdIgnoreVersion(e) {
    return Pf(e, this.getTuneflowId());
  }
  getInstanceId() {
    return this.localInstanceIdInternal;
  }
  toJSON() {
    return {
      name: this.name,
      manufacturerName: this.manufacturerName,
      pluginFormatName: this.pluginFormatName,
      pluginVersion: this.pluginVersion,
      isEnabled: this.isEnabled
    };
  }
  setIsEnabled(e) {
    this.isEnabled = e;
  }
  getIsEnabled() {
    return this.isEnabled;
  }
  setBase64States(e) {
    this.base64StatesInternal = e;
  }
  getBase64States() {
    return this.base64StatesInternal;
  }
  static generateAudioPluginInstanceIdInternal() {
    return tn(10);
  }
  static DEFAULT_SYNTH_TFID = Bi("TuneFlow", "VST3", "TFSynth", "1.0.0");
}
class pt {
  pitch;
  velocity;
  startTick;
  endTick;
  idInternal;
  clipInternal;
  constructor({
    pitch: e,
    velocity: n,
    startTick: r,
    endTick: i,
    id: s,
    clip: o
  }) {
    this.pitch = e, this.velocity = n, this.startTick = r, this.endTick = i, this.idInternal = s, this.clipInternal = o;
  }
  getPitch() {
    return this.pitch;
  }
  setPitch(e) {
    if (!pt.isValidPitch(e))
      throw new Error(`Invalid pitch ${e}`);
    this.pitch = e;
  }
  getVelocity() {
    return this.velocity;
  }
  setVelocity(e) {
    this.velocity = Math.max(Math.min(e, 127), 0);
  }
  getStartTick() {
    return this.startTick;
  }
  getEndTick() {
    return this.endTick;
  }
  setStartTick(e) {
    this.startTick = e;
  }
  setEndTick(e) {
    this.endTick = e;
  }
  equals(e) {
    return this.startTick === e.getStartTick() && this.endTick === e.getEndTick() && this.pitch === e.getPitch() && this.velocity === e.getVelocity();
  }
  deleteFromParent() {
    !this.clipInternal || this.clipInternal.deleteNote(this);
  }
  moveNote(e) {
    if (e === 0)
      return;
    const n = this.clipInternal;
    n && n.deleteNote(this), this.startTick = Math.max(0, this.startTick + e), this.endTick = this.endTick + e, !!this.isRangeValid() && n && n.orderedInsertNote(n.getRawNotes(), this);
  }
  adjustLeft(e) {
    if (e === 0)
      return;
    const n = this.clipInternal;
    n && n.deleteNote(this), this.startTick += e, !!this.isRangeValid() && n && n.orderedInsertNote(n.getRawNotes(), this);
  }
  adjustLeftTo(e) {
    this.adjustLeft(e - this.startTick);
  }
  adjustRight(e) {
    this.endTick += e, this.isRangeValid() || this.deleteFromParent();
  }
  adjustRightTo(e) {
    this.adjustRight(e - this.endTick);
  }
  isRangeValid() {
    return pt.isNoteRangeValid(this.startTick, this.endTick);
  }
  static isValidPitch(e) {
    return e >= 0 && e <= 127 && Number.isInteger(e);
  }
  static isNoteRangeValid(e, n) {
    return n >= 0 && e <= n && Number.isInteger(e) && Number.isInteger(n);
  }
  static isNoteVelocityValid(e) {
    return e >= 0 && e <= 127 && Number.isInteger(e);
  }
  getClip() {
    return this.clipInternal;
  }
  adjustPitch(e) {
    this.pitch = this.pitch + e, pt.isValidPitch(this.pitch) || this.deleteFromParent();
  }
  getId() {
    return this.idInternal;
  }
}
var re = /* @__PURE__ */ ((t) => (t[t.MIDI_CLIP = 1] = "MIDI_CLIP", t[t.AUDIO_CLIP = 2] = "AUDIO_CLIP", t))(re || {});
class Q {
  song;
  track;
  id;
  notes;
  clipStartTick = 0;
  clipEndTick = 0;
  nextNoteIdInternal = 1;
  type;
  audioClipData;
  constructor({
    song: e,
    type: n,
    clipStartTick: r,
    id: i = Q.generateClipIdInternal(),
    track: s = void 0,
    clipEndTick: o = void 0,
    audioClipData: a = void 0
  }) {
    if (this.song = e, this.track = s, this.id = i, this.type = n, this.notes = [], n === 2) {
      if (!a)
        throw new Error("Audio clip data must be provided for audio clips.");
      this.audioClipData = {
        audioFilePath: a.audioFilePath,
        startTick: a.startTick,
        duration: a.duration
      }, r = E.isNumber(r) ? Math.max(r, a.startTick) : a.startTick;
      const l = this.getAudioEndTick();
      (!E.isNumber(o) || l < o) && (o = l), this.clipStartTick = r, this.clipEndTick = o;
    } else if (n === 1) {
      if (this.clipStartTick = r, !E.isNumber(o))
        throw new Error("clip end tick must be provided when creating MIDI clip.");
      this.clipEndTick = o;
    }
  }
  getId() {
    return this.id;
  }
  getType() {
    return this.type;
  }
  getAudioClipData() {
    return this.audioClipData;
  }
  setAudioFile(e, n, r) {
    this.audioClipData ? (this.audioClipData.audioFilePath = e, this.audioClipData.startTick = n, this.audioClipData.duration = r) : this.audioClipData = {
      audioFilePath: e,
      startTick: n,
      duration: r
    };
  }
  getNotes() {
    return Q.getNotesInRange(this.notes, this.clipStartTick, this.clipEndTick);
  }
  getRawNotes() {
    return this.notes;
  }
  getDuration() {
    return this.song.tickToSeconds(this.clipEndTick) - this.song.tickToSeconds(this.clipStartTick);
  }
  getAudioDuration() {
    if (!(this.type !== 2 || !this.audioClipData))
      return this.audioClipData.duration;
  }
  getClipStartTick() {
    return this.clipStartTick;
  }
  getClipEndTick() {
    return this.clipEndTick;
  }
  getTrack() {
    return this.track;
  }
  createNote({
    pitch: e,
    velocity: n,
    startTick: r,
    endTick: i,
    updateClipRange: s = !0,
    resolveClipConflict: o = !0
  }) {
    if (this.type !== 1 || !pt.isValidPitch(e) || !pt.isNoteRangeValid(r, i) || !pt.isNoteVelocityValid(n))
      return null;
    const a = new pt({
      pitch: e,
      velocity: n,
      startTick: r,
      endTick: i,
      id: this.getNextNoteIdInternal()
    });
    return r < this.clipStartTick && s && this.adjustClipLeft(r, o), i > this.clipEndTick && s && this.adjustClipRight(i, o), this.orderedInsertNote(this.notes, a), a;
  }
  getNoteIndexInternal(e) {
    const n = k.lt(this.notes, e, (r, i) => r.getStartTick() - i.getStartTick());
    for (let r = Math.max(0, n); r < this.notes.length; r += 1) {
      const i = this.notes[r];
      if (i && i === e)
        return r;
      if (i && i.getStartTick() > e.getStartTick())
        break;
    }
    return -1;
  }
  deleteNote(e) {
    const n = this.getNoteIndexInternal(e);
    n >= 0 && this.deleteNoteAt(n);
  }
  deleteNoteAt(e) {
    const n = this.notes[e];
    n && (n.clipInternal = null, this.notes.splice(e, 1));
  }
  orderedInsertNote(e, n) {
    if (this.type !== 1 || n.getClip() === this)
      return;
    const r = k.ge(e, n, (i, s) => i.getStartTick() - s.getStartTick());
    r < 0 ? e.push(n) : e.splice(r, 0, n), n.clipInternal = this;
  }
  adjustClipLeft(e, n = !0) {
    e = Math.max(0, e), this.type === 2 && this.audioClipData && (e = Math.max(e, this.audioClipData.startTick)), e > this.clipEndTick ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(this.getId(), Math.min(this.clipStartTick, e), this.clipEndTick), this.clipStartTick = e);
  }
  adjustClipRight(e, n = !0) {
    if (this.type === 2) {
      const r = this.getAudioEndTick();
      E.isNumber(r) && (e = Math.min(e, r));
    }
    e < this.clipStartTick || e < 0 ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(this.getId(), this.clipStartTick, Math.max(this.clipEndTick, e)), this.clipEndTick = e);
  }
  moveClip(e, n) {
    const r = Math.max(0, this.clipStartTick + e), i = this.clipEndTick + e;
    if (i < 0) {
      this.deleteFromParent(!0);
      return;
    }
    if (this.track && this.track.resolveClipConflictInternal(this.getId(), r, i), this.track) {
      const a = this.track.getClipIndex(this);
      this.track.deleteClipAt(a, !1);
    }
    const s = this.clipStartTick, o = this.clipEndTick;
    if (this.type === 1) {
      this.clipStartTick = r, this.clipEndTick = i;
      for (const a of this.notes)
        a.setStartTick(a.getStartTick() + e), a.setEndTick(a.getEndTick() + e);
    } else if (this.type === 2) {
      if (!this.audioClipData)
        throw new Error("Cannot move audio clip without audio data");
      const a = this.song, l = a.tickToSeconds(this.audioClipData.startTick), u = a.tickToSeconds(s), h = a.tickToSeconds(o) - u, g = u - l, v = a.tickToSeconds(this.clipStartTick + e), I = v - g, b = v + h;
      if (this.clipStartTick = r, this.clipEndTick = a.secondsToTick(b), this.audioClipData.startTick = a.secondsToTick(I), this.clipEndTick < 0) {
        this.deleteFromParent(!0);
        return;
      }
    }
    this.track && (this.track.orderedInsertClipInternal(this), n && this.track.getAutomation().moveAllPointsWithinRange(s, o, e, 0));
  }
  moveClipTo(e, n) {
    const r = e - this.getClipStartTick();
    this.moveClip(r, n);
  }
  deleteFromParent(e) {
    this.track && (this.track.deleteClip(this, e), this.track = void 0);
  }
  getNotesByIds(e) {
    const n = new Set(e), r = [];
    for (const i of this.notes)
      n.has(i.getId()) && r.push(i);
    return r;
  }
  getAudioEndTick() {
    if (this.type !== 2 || !this.audioClipData)
      return;
    const e = this.getAudioDuration();
    if (!E.isNumber(e))
      return;
    const n = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(n + e);
  }
  static getNotesInRange(e, n, r) {
    return Q.getNotesInRangeImpl(e, n, r, (i) => ({ getStartTick: () => i }), (i) => i.getStartTick(), (i) => i.getEndTick());
  }
  static getNotesInRangeImpl(e, n, r, i, s, o) {
    let a = Math.max(0, k.lt(e, i(n), (u, p) => s(u) - s(p)));
    for (; e[a] && !Q.isNoteInClip(s(e[a]), o(e[a]), n, r); )
      a += 1;
    if (a >= e.length)
      return [];
    let l = Math.min(e.length - 1, k.gt(e, i(r), (u, p) => s(u) - s(p)));
    for (; e[l] && !Q.isNoteInClip(s(e[l]), o(e[l]), n, r); )
      l -= 1;
    return l < 0 ? [] : l < a ? [] : e.slice(a, l + 1);
  }
  static isNoteInClip(e, n, r, i) {
    return (e >= r || r === 0 && e <= 0) && e < i && n > e;
  }
  static getNotePlayableRange(e, n, r, i) {
    if (!Q.isNoteInClip(e, n, r, i))
      return null;
    const s = Math.max(e, r), o = Math.min(n, i);
    return s > o ? null : {
      startTick: s,
      endTick: o
    };
  }
  trimConflictPartInternal(e, n) {
    const r = Math.max(e, this.getClipStartTick()), i = Math.min(n, this.getClipEndTick());
    if (!(r > i) && !(r > this.getClipEndTick() || i < this.getClipStartTick())) {
      if (i >= this.getClipEndTick() && r <= this.getClipStartTick()) {
        this.deleteFromParent(!0);
        return;
      }
      if (i < this.getClipEndTick() && r > this.getClipStartTick()) {
        const s = i + 1, o = this.getClipEndTick();
        if (this.adjustClipRight(r - 1, !1), this.track) {
          if (this.type === 1) {
            const a = this.track.createMIDIClip({
              clipStartTick: s,
              clipEndTick: o
            }), l = Q.getNotesInRange(this.notes, s, o);
            for (const u of l)
              a.createNote({
                pitch: u.getPitch(),
                velocity: u.getVelocity(),
                startTick: u.getStartTick(),
                endTick: u.getEndTick(),
                updateClipRange: !1,
                resolveClipConflict: !1
              });
          } else if (this.type === 2) {
            const a = this.audioClipData;
            this.track.createAudioClip({
              clipStartTick: s,
              clipEndTick: o,
              audioClipData: {
                audioFilePath: a.audioFilePath,
                startTick: a.startTick,
                duration: a.duration
              }
            });
          }
        }
        return;
      }
      r > this.getClipStartTick() && r <= this.getClipEndTick() ? this.adjustClipRight(r - 1, !1) : i < this.getClipEndTick() && i >= this.getClipStartTick() && this.adjustClipLeft(i + 1, !1);
    }
  }
  getNextNoteIdInternal() {
    const e = this.nextNoteIdInternal;
    return this.nextNoteIdInternal >= 2147483647 ? this.nextNoteIdInternal = 1 : this.nextNoteIdInternal += 1, e;
  }
  static generateClipIdInternal() {
    return tn(10);
  }
}
var Kn = /* @__PURE__ */ ((t) => (t[t.UNDEFINED = 0] = "UNDEFINED", t[t.VOLUME = 1] = "VOLUME", t[t.PAN = 2] = "PAN", t[t.AUDIO_PLUGIN = 3] = "AUDIO_PLUGIN", t))(Kn || {});
class Y {
  type;
  pluginInstanceId;
  paramId;
  constructor(e, n, r) {
    this.type = e, this.pluginInstanceId = n, this.paramId = r;
  }
  getType() {
    return this.type;
  }
  setType(e) {
    this.type = e;
  }
  getPluginInstanceId() {
    return this.pluginInstanceId;
  }
  setPluginInstanceId(e) {
    this.pluginInstanceId = e;
  }
  getParamId() {
    return this.paramId;
  }
  setParamId(e) {
    this.paramId = e;
  }
  equals(e) {
    return Y.areAutomationTargetsEqual(this.getType(), e.getType(), this.getPluginInstanceId(), e.getPluginInstanceId(), this.getParamId(), e.getParamId());
  }
  clone() {
    return new Y(this.type, this.pluginInstanceId, this.paramId);
  }
  toTfAutomationTargetId() {
    return Y.encodeAutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }
  static fromTfAutomationTargetId(e) {
    return Y.decodeAutomationTarget(e);
  }
  static encodeAutomationTarget(e, n, r) {
    return e === 3 ? `${e}^^${n}^^${r}` : `${e}`;
  }
  static decodeAutomationTarget(e) {
    const n = e.split("^^");
    if (n.length === 0)
      throw new Error(`Invalid automation target id: ${e}`);
    const r = Number(n[0]);
    return n.length > 2 ? new Y(r, n[1], n[2]) : new Y(r);
  }
  static areAutomationTargetsEqual(e, n, r, i, s, o) {
    return Y.encodeAutomationTarget(e, r, s) === Y.encodeAutomationTarget(n, i, o);
  }
}
class Gt {
  points = [];
  disabled = !1;
  nextPointIdInternal = 1;
  getDisabled() {
    return this.disabled;
  }
  setDisabled(e) {
    this.disabled = e;
  }
  getPoints() {
    return this.points;
  }
  getPointsInRange(e, n) {
    return Gt.getPointsInRangeImpl(this.points, e, n);
  }
  static getPointsInRangeImpl(e, n, r) {
    const i = k.ge(e, { tick: n }, (o, a) => o.tick - a.tick), s = [];
    for (let o = i; o < e.length; o += 1) {
      const a = e[o];
      if (a.tick > r)
        break;
      s.push(a);
    }
    return s;
  }
  addPoint(e, n, r = !1) {
    const i = {
      tick: e,
      value: Math.max(0, Math.min(1, n)),
      id: this.getNextPointIdInternal()
    };
    return Gt.orderedInsertPointInternal(this.points, i, r), i;
  }
  removePoints(e) {
    const n = new Set(e);
    for (let r = this.points.length - 1; r >= 0; r -= 1) {
      const i = this.points[r];
      n.has(i.id) && this.points.splice(r, 1);
    }
  }
  removePointsInRange(e, n) {
    const r = k.ge(this.points, { tick: e }, (s, o) => s.tick - o.tick);
    if (r >= this.points.length)
      return;
    let i = r;
    for (; i + 1 < this.points.length && this.points[i + 1].tick <= n; )
      i += 1;
    this.points.splice(r, i - r + 1);
  }
  movePointsInRange(e, n, r, i, s = !0) {
    const o = this.getPointsInRange(e, n);
    this.movePoints(o.map((a) => a.id), r, i, s);
  }
  moveAllPoints(e, n, r = !0) {
    this.movePoints(this.points.map((i) => i.id), e, n, r);
  }
  movePoints(e, n, r, i = !0) {
    if (e.length === 0)
      return;
    const s = new Set(e);
    let o, a;
    const l = [];
    for (let u = 0; u < this.points.length; u += 1) {
      const p = this.points[u];
      !s.has(p.id) || (l.push(p), o === void 0 && (o = u), a = u);
    }
    if (!(o === void 0 || a === void 0)) {
      if (i) {
        if (n < 0) {
          const u = Math.max(0, this.points[o].tick + n), p = k.gt(this.points, { tick: u }, (h, g) => h.tick - g.tick);
          p < o && this.points.splice(p, o - p);
        } else if (n > 0) {
          const u = this.points[a].tick + n, p = k.lt(this.points, { tick: u }, (h, g) => h.tick - g.tick);
          p > a && this.points.splice(a + 1, p - a);
        }
      }
      for (const u of l)
        u.tick = Math.max(0, u.tick + n), u.value = Math.max(0, Math.min(1, u.value + r));
      Math.abs(n) > 0 && this.points.sort((u, p) => u.tick - p.tick);
    }
  }
  clone() {
    const e = new Gt();
    e.setDisabled(this.disabled);
    for (const n of this.points)
      e.addPoint(n.tick, n.value, !1);
    return e;
  }
  getNextPointIdInternal() {
    const e = this.nextPointIdInternal;
    return this.nextPointIdInternal >= 2147483647 ? this.nextPointIdInternal = 1 : this.nextPointIdInternal += 1, e;
  }
  static orderedInsertPointInternal(e, n, r = !1) {
    const i = k.ge(e, n, (s, o) => s.tick - o.tick);
    for (; r && e[i] && e[i].tick === n.tick; )
      e.splice(i, 1);
    e.splice(i, 0, n);
  }
}
class wr {
  targets = [];
  targetValues = {};
  getAutomationTargets() {
    return this.targets;
  }
  getAutomationTargetValues() {
    return this.targetValues;
  }
  getOrCreateAutomationValueById(e) {
    return this.targetValues[e] || (this.targetValues[e] = new Gt()), this.targetValues[e];
  }
  getAutomationValueById(e) {
    return this.targetValues[e];
  }
  getAutomationValueByTarget(e) {
    const n = e.toTfAutomationTargetId();
    return this.getAutomationValueById(n);
  }
  addAutomation(e, n = 0) {
    E.isNumber(n) || (n = 0), this.targets.splice(n, 0, e);
    const r = e.toTfAutomationTargetId();
    this.getAutomationValueById(r) || (this.targetValues[r] = new Gt());
  }
  removeAutomation(e) {
    for (let r = this.targets.length - 1; r >= 0; r -= 1)
      this.targets[r].equals(e) && this.targets.splice(r, 1);
    const n = e.toTfAutomationTargetId();
    delete this.targetValues[n];
  }
  removeAutomationOfPlugin(e) {
    for (let n = this.targets.length - 1; n >= 0; n -= 1) {
      const r = this.targets[n];
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
    for (const n of E.keys(this.targetValues)) {
      const r = Y.decodeAutomationTarget(n);
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
  }
  removeAllPointsWithinRange(e, n) {
    for (const r of E.keys(this.targetValues))
      this.targetValues[r].removePointsInRange(e, n);
  }
  moveAllPointsWithinRange(e, n, r, i) {
    for (const s of E.keys(this.targetValues))
      this.targetValues[s].movePointsInRange(e, n, r, i, !1);
  }
  clone() {
    const e = new wr();
    for (const n of this.targets)
      e.addAutomation(n.clone());
    for (const n of E.keys(this.targetValues)) {
      const r = this.targetValues[n];
      e.targetValues[n] = r.clone();
    }
    return e;
  }
}
var Ht = /* @__PURE__ */ ((t) => (t[t.MIDI_TRACK = 1] = "MIDI_TRACK", t[t.AUDIO_TRACK = 2] = "AUDIO_TRACK", t[t.MASTER_TRACK = 3] = "MASTER_TRACK", t))(Ht || {});
class zt {
  insturment;
  clips;
  suggestedInstruments;
  uuid;
  volume;
  solo;
  muted;
  rank;
  pan;
  samplerPlugin;
  audioPlugins = [];
  song;
  automation;
  type;
  constructor({
    type: e,
    song: n,
    uuid: r = zt.generateTrackIdInternal(),
    clips: i = [],
    instrument: s,
    suggestedInstruments: o = [],
    volume: a = Af(0),
    solo: l = !1,
    muted: u = !1,
    rank: p = 0,
    pan: h = 0
  }) {
    this.song = n, this.type = e, s ? this.insturment = s : e === 1 && (this.insturment = new ce({
      program: 0,
      isDrum: !1
    })), this.clips = [...i], this.suggestedInstruments = [...o], this.uuid = r, this.volume = a, this.solo = l, this.muted = u, this.rank = p, this.pan = h, this.automation = new wr();
  }
  getType() {
    return this.type;
  }
  getSong() {
    return this.song;
  }
  getInstrument() {
    return this.insturment;
  }
  setInstrument({
    program: e,
    isDrum: n
  }) {
    this.type === 1 && (this.insturment = new ce({ program: e, isDrum: n }));
  }
  getSuggestedInstruments() {
    return this.suggestedInstruments;
  }
  createSuggestedInstrument({
    program: e,
    isDrum: n
  }) {
    if (this.type !== 1)
      return;
    const r = new ce({ program: e, isDrum: n });
    return this.suggestedInstruments.push(r), r;
  }
  clearSuggestedInstruments() {
    this.suggestedInstruments = [];
  }
  getId() {
    return this.uuid;
  }
  setId(e) {
    this.uuid = e;
  }
  getVolume() {
    return this.volume;
  }
  setVolume(e) {
    this.volume = e;
  }
  setPan(e) {
    this.pan = e;
  }
  getPan() {
    return this.pan;
  }
  getSolo() {
    return this.solo;
  }
  setSolo(e) {
    this.solo = e, e && this.muted && (this.muted = !1);
  }
  getMuted() {
    return this.muted;
  }
  setMuted(e) {
    this.muted = e;
  }
  getRank() {
    return this.rank;
  }
  createAudioPlugin(e) {
    const n = Qe(e);
    return new sn(n.name, n.manufacturerName, n.pluginFormatName, n.pluginVersion);
  }
  getSamplerPlugin() {
    return this.samplerPlugin;
  }
  setSamplerPlugin(e, n = !0) {
    if (this.type !== 1)
      return;
    const r = !this.samplerPlugin && !!e || !e && !!this.samplerPlugin || !!e && !!this.samplerPlugin && !e.matchesTfId(this.samplerPlugin.getTuneflowId()), i = this.samplerPlugin;
    this.samplerPlugin = e, r && i && n && this.automation.removeAutomationOfPlugin(i.getInstanceId());
  }
  getAudioPlugins() {
    return this.audioPlugins;
  }
  addAudioPlugin(e) {
    this.audioPlugins.push(e);
  }
  getTrackStartTick() {
    return !this.clips || this.clips.length === 0 ? 0 : this.clips[0].getClipStartTick();
  }
  getTrackEndTick() {
    return !this.clips || this.clips.length === 0 ? 0 : this.clips[this.clips.length - 1].getClipEndTick();
  }
  getClipById(e) {
    for (const n of this.clips)
      if (n.getId() === e)
        return n;
    return null;
  }
  getClips() {
    return this.clips;
  }
  getClipsOverlappingWith(e, n) {
    const r = [], i = k.lt(this.clips, { getClipStartTick: () => e }, (s, o) => s.getClipStartTick() - o.getClipStartTick());
    for (let s = Math.max(i, 0); s < this.clips.length; s += 1) {
      const o = this.clips[s];
      if (!(o.getClipEndTick() < e)) {
        if (o.getClipStartTick() > n)
          break;
        r.push(o);
      }
    }
    return r;
  }
  createMIDIClip({
    clipStartTick: e,
    clipEndTick: n = void 0,
    insertClip: r = !0
  }) {
    if (!E.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const i = n ?? e + 1;
    if (i < e)
      throw new Error(`clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${e}, clipEndTick: ${n}`);
    const s = new Q({
      id: Q.generateClipIdInternal(),
      type: re.MIDI_CLIP,
      song: this.song,
      track: void 0,
      clipStartTick: e,
      clipEndTick: i
    });
    return r && this.insertClip(s), s;
  }
  createAudioClip({
    clipStartTick: e,
    audioClipData: n,
    clipEndTick: r,
    insertClip: i = !0
  }) {
    if (!E.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const s = new Q({
      id: Q.generateClipIdInternal(),
      type: re.AUDIO_CLIP,
      song: this.song,
      track: void 0,
      clipStartTick: e,
      clipEndTick: r,
      audioClipData: n
    });
    return i && this.insertClip(s), s;
  }
  insertClip(e) {
    if (e.getTrack() !== this)
      e.getTrack() && e.deleteFromParent(!1), e.track = this;
    else
      return;
    this.resolveClipConflictInternal(e.getId(), e.getClipStartTick(), e.getClipEndTick()), this.orderedInsertClipInternal(e);
  }
  cloneClip(e) {
    if (e.getType() === re.MIDI_CLIP) {
      const n = this.createMIDIClip({
        clipStartTick: e.getClipStartTick(),
        clipEndTick: e.getClipEndTick(),
        insertClip: !1
      });
      for (const r of e.getRawNotes())
        n.createNote({
          pitch: r.getPitch(),
          velocity: r.getVelocity(),
          startTick: r.getStartTick(),
          endTick: r.getEndTick(),
          updateClipRange: !1,
          resolveClipConflict: !1
        });
      return n;
    } else {
      if (e.getType() === re.AUDIO_CLIP)
        return this.createAudioClip({
          clipStartTick: e.getClipStartTick(),
          clipEndTick: e.getClipEndTick(),
          audioClipData: e.getAudioClipData(),
          insertClip: !1
        });
      throw new Error(`Unsupported clip type ${e.getType()}`);
    }
  }
  getClipIndex(e) {
    const n = k.le(this.clips, e, (r, i) => r.getClipStartTick() - i.getClipStartTick());
    return this.clips.indexOf(e, n);
  }
  deleteClip(e, n) {
    const r = this.getClipIndex(e);
    this.deleteClipAt(r, n);
  }
  deleteClipAt(e, n) {
    if (!(e < 0)) {
      if (n) {
        const r = this.clips[e];
        if (!r)
          return;
        this.automation.removeAllPointsWithinRange(r.getClipStartTick(), r.getClipEndTick());
      }
      this.clips.splice(e, 1);
    }
  }
  deleteFromParent() {
    this.song.removeTrack(this.getId());
  }
  getAutomation() {
    return this.automation;
  }
  setAutomation(e) {
    this.automation = e.clone();
  }
  hasAnyAutomation() {
    return this.automation.getAutomationTargets().length > 0 && !E.isEmpty(this.automation.getAutomationTargetValues());
  }
  static generateTrackIdInternal() {
    return tn();
  }
  resolveClipConflictInternal(e, n, r) {
    const i = this.getClipsOverlappingWith(n, r);
    for (const s of i)
      s.getId() !== e && s.trimConflictPartInternal(n, r);
  }
  orderedInsertClipInternal(e) {
    const n = k.ge(this.clips, e, (r, i) => r.getClipStartTick() - i.getClipStartTick());
    this.clips.splice(n, 0, e);
  }
}
class ce {
  program;
  isDrum;
  constructor({
    program: e,
    isDrum: n
  }) {
    this.program = e, this.isDrum = n;
  }
  getProgram() {
    return this.program;
  }
  getIsDrum() {
    return this.isDrum;
  }
  clone() {
    return new ce({
      program: this.program,
      isDrum: this.isDrum
    });
  }
}
var on = {}, an = {};
function Mf(t) {
  var e = new B(t), n = e.readChunk();
  if (n.id != "MThd")
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + n.id + "'";
  for (var r = Vf(n.data), i = [], s = 0; !e.eof() && s < r.numTracks; s++) {
    var o = e.readChunk();
    if (o.id != "MTrk")
      throw "Bad MIDI file.  Expected 'MTrk', got: '" + o.id + "'";
    var a = Rf(o.data);
    i.push(a);
  }
  return {
    header: r,
    tracks: i
  };
}
function Vf(t) {
  var e = new B(t), n = e.readUInt16(), r = e.readUInt16(), i = {
    format: n,
    numTracks: r
  }, s = e.readUInt16();
  return s & 32768 ? (i.framesPerSecond = 256 - (s >> 8), i.ticksPerFrame = s & 255) : i.ticksPerBeat = s, i;
}
function Rf(t) {
  for (var e = new B(t), n = []; !e.eof(); ) {
    var r = s();
    n.push(r);
  }
  return n;
  var i;
  function s() {
    var o = {};
    o.deltaTime = e.readVarInt();
    var a = e.readUInt8();
    if ((a & 240) === 240)
      if (a === 255) {
        o.meta = !0;
        var l = e.readUInt8(), u = e.readVarInt();
        switch (l) {
          case 0:
            if (o.type = "sequenceNumber", u !== 2)
              throw "Expected length for sequenceNumber event is 2, got " + u;
            return o.number = e.readUInt16(), o;
          case 1:
            return o.type = "text", o.text = e.readString(u), o;
          case 2:
            return o.type = "copyrightNotice", o.text = e.readString(u), o;
          case 3:
            return o.type = "trackName", o.text = e.readString(u), o;
          case 4:
            return o.type = "instrumentName", o.text = e.readString(u), o;
          case 5:
            return o.type = "lyrics", o.text = e.readString(u), o;
          case 6:
            return o.type = "marker", o.text = e.readString(u), o;
          case 7:
            return o.type = "cuePoint", o.text = e.readString(u), o;
          case 32:
            if (o.type = "channelPrefix", u != 1)
              throw "Expected length for channelPrefix event is 1, got " + u;
            return o.channel = e.readUInt8(), o;
          case 33:
            if (o.type = "portPrefix", u != 1)
              throw "Expected length for portPrefix event is 1, got " + u;
            return o.port = e.readUInt8(), o;
          case 47:
            if (o.type = "endOfTrack", u != 0)
              throw "Expected length for endOfTrack event is 0, got " + u;
            return o;
          case 81:
            if (o.type = "setTempo", u != 3)
              throw "Expected length for setTempo event is 3, got " + u;
            return o.microsecondsPerBeat = e.readUInt24(), o;
          case 84:
            if (o.type = "smpteOffset", u != 5)
              throw "Expected length for smpteOffset event is 5, got " + u;
            var p = e.readUInt8(), h = { 0: 24, 32: 25, 64: 29, 96: 30 };
            return o.frameRate = h[p & 96], o.hour = p & 31, o.min = e.readUInt8(), o.sec = e.readUInt8(), o.frame = e.readUInt8(), o.subFrame = e.readUInt8(), o;
          case 88:
            if (o.type = "timeSignature", u != 4)
              throw "Expected length for timeSignature event is 4, got " + u;
            return o.numerator = e.readUInt8(), o.denominator = 1 << e.readUInt8(), o.metronome = e.readUInt8(), o.thirtyseconds = e.readUInt8(), o;
          case 89:
            if (o.type = "keySignature", u != 2)
              throw "Expected length for keySignature event is 2, got " + u;
            return o.key = e.readInt8(), o.scale = e.readUInt8(), o;
          case 127:
            return o.type = "sequencerSpecific", o.data = e.readBytes(u), o;
          default:
            return o.type = "unknownMeta", o.data = e.readBytes(u), o.metatypeByte = l, o;
        }
      } else if (a == 240) {
        o.type = "sysEx";
        var u = e.readVarInt();
        return o.data = e.readBytes(u), o;
      } else if (a == 247) {
        o.type = "endSysEx";
        var u = e.readVarInt();
        return o.data = e.readBytes(u), o;
      } else
        throw "Unrecognised MIDI event type byte: " + a;
    else {
      var g;
      if ((a & 128) === 0) {
        if (i === null)
          throw "Running status byte encountered before status byte";
        g = a, a = i, o.running = !0;
      } else
        g = e.readUInt8(), i = a;
      var v = a >> 4;
      switch (o.channel = a & 15, v) {
        case 8:
          return o.type = "noteOff", o.noteNumber = g, o.velocity = e.readUInt8(), o;
        case 9:
          var I = e.readUInt8();
          return o.type = I === 0 ? "noteOff" : "noteOn", o.noteNumber = g, o.velocity = I, I === 0 && (o.byte9 = !0), o;
        case 10:
          return o.type = "noteAftertouch", o.noteNumber = g, o.amount = e.readUInt8(), o;
        case 11:
          return o.type = "controller", o.controllerType = g, o.value = e.readUInt8(), o;
        case 12:
          return o.type = "programChange", o.programNumber = g, o;
        case 13:
          return o.type = "channelAftertouch", o.amount = g, o;
        case 14:
          return o.type = "pitchBend", o.value = g + (e.readUInt8() << 7) - 8192, o;
        default:
          throw "Unrecognised MIDI event type: " + v;
      }
    }
  }
}
function B(t) {
  this.buffer = t, this.bufferLen = this.buffer.length, this.pos = 0;
}
B.prototype.eof = function() {
  return this.pos >= this.bufferLen;
};
B.prototype.readUInt8 = function() {
  var t = this.buffer[this.pos];
  return this.pos += 1, t;
};
B.prototype.readInt8 = function() {
  var t = this.readUInt8();
  return t & 128 ? t - 256 : t;
};
B.prototype.readUInt16 = function() {
  var t = this.readUInt8(), e = this.readUInt8();
  return (t << 8) + e;
};
B.prototype.readInt16 = function() {
  var t = this.readUInt16();
  return t & 32768 ? t - 65536 : t;
};
B.prototype.readUInt24 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8();
  return (t << 16) + (e << 8) + n;
};
B.prototype.readInt24 = function() {
  var t = this.readUInt24();
  return t & 8388608 ? t - 16777216 : t;
};
B.prototype.readUInt32 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8(), r = this.readUInt8();
  return (t << 24) + (e << 16) + (n << 8) + r;
};
B.prototype.readBytes = function(t) {
  var e = this.buffer.slice(this.pos, this.pos + t);
  return this.pos += t, e;
};
B.prototype.readString = function(t) {
  var e = this.readBytes(t);
  return String.fromCharCode.apply(null, e);
};
B.prototype.readVarInt = function() {
  for (var t = 0; !this.eof(); ) {
    var e = this.readUInt8();
    if (e & 128)
      t += e & 127, t <<= 7;
    else
      return t + e;
  }
  return t;
};
B.prototype.readChunk = function() {
  var t = this.readString(4), e = this.readUInt32(), n = this.readBytes(e);
  return {
    id: t,
    length: e,
    data: n
  };
};
var Ff = Mf;
function Uf(t, e) {
  if (typeof t != "object")
    throw "Invalid MIDI data";
  e = e || {};
  var n = t.header || {}, r = t.tracks || [], i, s = r.length, o = new x();
  for (Bf(o, n, s), i = 0; i < s; i++)
    $f(o, r[i], e);
  return o.buffer;
}
function Bf(t, e, n) {
  var r = e.format == null ? 1 : e.format, i = 128;
  e.timeDivision ? i = e.timeDivision : e.ticksPerFrame && e.framesPerSecond ? i = -(e.framesPerSecond & 255) << 8 | e.ticksPerFrame & 255 : e.ticksPerBeat && (i = e.ticksPerBeat & 32767);
  var s = new x();
  s.writeUInt16(r), s.writeUInt16(n), s.writeUInt16(i), t.writeChunk("MThd", s.buffer);
}
function $f(t, e, n) {
  var r = new x(), i, s = e.length, o = null;
  for (i = 0; i < s; i++)
    (n.running === !1 || !n.running && !e[i].running) && (o = null), o = Df(r, e[i], o, n.useByte9ForNoteOff);
  t.writeChunk("MTrk", r.buffer);
}
function Df(t, e, n, r) {
  var i = e.type, s = e.deltaTime, o = e.text || "", a = e.data || [], l = null;
  switch (t.writeVarInt(s), i) {
    case "sequenceNumber":
      t.writeUInt8(255), t.writeUInt8(0), t.writeVarInt(2), t.writeUInt16(e.number);
      break;
    case "text":
      t.writeUInt8(255), t.writeUInt8(1), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "copyrightNotice":
      t.writeUInt8(255), t.writeUInt8(2), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "trackName":
      t.writeUInt8(255), t.writeUInt8(3), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "instrumentName":
      t.writeUInt8(255), t.writeUInt8(4), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "lyrics":
      t.writeUInt8(255), t.writeUInt8(5), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "marker":
      t.writeUInt8(255), t.writeUInt8(6), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "cuePoint":
      t.writeUInt8(255), t.writeUInt8(7), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "channelPrefix":
      t.writeUInt8(255), t.writeUInt8(32), t.writeVarInt(1), t.writeUInt8(e.channel);
      break;
    case "portPrefix":
      t.writeUInt8(255), t.writeUInt8(33), t.writeVarInt(1), t.writeUInt8(e.port);
      break;
    case "endOfTrack":
      t.writeUInt8(255), t.writeUInt8(47), t.writeVarInt(0);
      break;
    case "setTempo":
      t.writeUInt8(255), t.writeUInt8(81), t.writeVarInt(3), t.writeUInt24(e.microsecondsPerBeat);
      break;
    case "smpteOffset":
      t.writeUInt8(255), t.writeUInt8(84), t.writeVarInt(5);
      var u = { 24: 0, 25: 32, 29: 64, 30: 96 }, p = e.hour & 31 | u[e.frameRate];
      t.writeUInt8(p), t.writeUInt8(e.min), t.writeUInt8(e.sec), t.writeUInt8(e.frame), t.writeUInt8(e.subFrame);
      break;
    case "timeSignature":
      t.writeUInt8(255), t.writeUInt8(88), t.writeVarInt(4), t.writeUInt8(e.numerator);
      var h = Math.floor(Math.log(e.denominator) / Math.LN2) & 255;
      t.writeUInt8(h), t.writeUInt8(e.metronome), t.writeUInt8(e.thirtyseconds || 8);
      break;
    case "keySignature":
      t.writeUInt8(255), t.writeUInt8(89), t.writeVarInt(2), t.writeInt8(e.key), t.writeUInt8(e.scale);
      break;
    case "sequencerSpecific":
      t.writeUInt8(255), t.writeUInt8(127), t.writeVarInt(a.length), t.writeBytes(a);
      break;
    case "unknownMeta":
      e.metatypeByte != null && (t.writeUInt8(255), t.writeUInt8(e.metatypeByte), t.writeVarInt(a.length), t.writeBytes(a));
      break;
    case "sysEx":
      t.writeUInt8(240), t.writeVarInt(a.length), t.writeBytes(a);
      break;
    case "endSysEx":
      t.writeUInt8(247), t.writeVarInt(a.length), t.writeBytes(a);
      break;
    case "noteOff":
      var g = r !== !1 && e.byte9 || r && e.velocity == 0 ? 144 : 128;
      l = g | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.noteNumber), t.writeUInt8(e.velocity);
      break;
    case "noteOn":
      l = 144 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.noteNumber), t.writeUInt8(e.velocity);
      break;
    case "noteAftertouch":
      l = 160 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.noteNumber), t.writeUInt8(e.amount);
      break;
    case "controller":
      l = 176 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.controllerType), t.writeUInt8(e.value);
      break;
    case "programChange":
      l = 192 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.programNumber);
      break;
    case "channelAftertouch":
      l = 208 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.amount);
      break;
    case "pitchBend":
      l = 224 | e.channel, l !== n && t.writeUInt8(l);
      var v = 8192 + e.value, I = v & 127, b = v >> 7 & 127;
      t.writeUInt8(I), t.writeUInt8(b);
      break;
    default:
      throw "Unrecognized event type: " + i;
  }
  return l;
}
function x() {
  this.buffer = [];
}
x.prototype.writeUInt8 = function(t) {
  this.buffer.push(t & 255);
};
x.prototype.writeInt8 = x.prototype.writeUInt8;
x.prototype.writeUInt16 = function(t) {
  var e = t >> 8 & 255, n = t & 255;
  this.writeUInt8(e), this.writeUInt8(n);
};
x.prototype.writeInt16 = x.prototype.writeUInt16;
x.prototype.writeUInt24 = function(t) {
  var e = t >> 16 & 255, n = t >> 8 & 255, r = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r);
};
x.prototype.writeInt24 = x.prototype.writeUInt24;
x.prototype.writeUInt32 = function(t) {
  var e = t >> 24 & 255, n = t >> 16 & 255, r = t >> 8 & 255, i = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r), this.writeUInt8(i);
};
x.prototype.writeInt32 = x.prototype.writeUInt32;
x.prototype.writeBytes = function(t) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(t, 0));
};
x.prototype.writeString = function(t) {
  var e, n = t.length, r = [];
  for (e = 0; e < n; e++)
    r.push(t.codePointAt(e));
  this.writeBytes(r);
};
x.prototype.writeVarInt = function(t) {
  if (t < 0)
    throw "Cannot write negative variable-length integer";
  if (t <= 127)
    this.writeUInt8(t);
  else {
    var e = t, n = [];
    for (n.push(e & 127), e >>= 7; e; ) {
      var r = e & 127 | 128;
      n.push(r), e >>= 7;
    }
    this.writeBytes(n.reverse());
  }
};
x.prototype.writeChunk = function(t, e) {
  this.writeString(t), this.writeUInt32(e.length), this.writeBytes(e);
};
var Lf = Uf;
an.parseMidi = Ff;
an.writeMidi = Lf;
var kr = {}, cn = {}, Ie = {};
Object.defineProperty(Ie, "__esModule", { value: !0 });
function wo(t, e, n) {
  n === void 0 && (n = "ticks");
  var r = 0, i = t.length, s = i;
  if (i > 0 && t[i - 1][n] <= e)
    return i - 1;
  for (; r < s; ) {
    var o = Math.floor(r + (s - r) / 2), a = t[o], l = t[o + 1];
    if (a[n] === e) {
      for (var u = o; u < t.length; u++) {
        var p = t[u];
        p[n] === e && (o = u);
      }
      return o;
    } else {
      if (a[n] < e && l[n] > e)
        return o;
      a[n] > e ? s = o : a[n] < e && (r = o + 1);
    }
  }
  return -1;
}
Ie.search = wo;
function Hf(t, e, n) {
  if (n === void 0 && (n = "ticks"), t.length) {
    var r = wo(t, e[n], n);
    t.splice(r + 1, 0, e);
  } else
    t.push(e);
}
Ie.insert = Hf;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = Ie, n = /* @__PURE__ */ new WeakMap();
  t.keySignatureKeys = [
    "Cb",
    "Gb",
    "Db",
    "Ab",
    "Eb",
    "Bb",
    "F",
    "C",
    "G",
    "D",
    "A",
    "E",
    "B",
    "F#",
    "C#"
  ];
  var r = function() {
    function i(s) {
      var o = this;
      this.tempos = [], this.timeSignatures = [], this.keySignatures = [], this.meta = [], this.name = "", n.set(this, 480), s && (n.set(this, s.header.ticksPerBeat), s.tracks.forEach(function(a) {
        return a.forEach(function(l) {
          l.meta && (l.type === "timeSignature" ? o.timeSignatures.push({
            ticks: l.absoluteTime,
            timeSignature: [
              l.numerator,
              l.denominator
            ]
          }) : l.type === "setTempo" ? o.tempos.push({
            bpm: 6e7 / l.microsecondsPerBeat,
            ticks: l.absoluteTime
          }) : l.type === "keySignature" && o.keySignatures.push({
            key: t.keySignatureKeys[l.key + 7],
            scale: l.scale === 0 ? "major" : "minor",
            ticks: l.absoluteTime
          }));
        });
      }), s.tracks[0].forEach(function(a) {
        a.meta && (a.type === "trackName" ? o.name = a.text : (a.type === "text" || a.type === "cuePoint" || a.type === "marker" || a.type === "lyrics") && o.meta.push({
          text: a.text,
          ticks: a.absoluteTime,
          type: a.type
        }));
      }), this.update());
    }
    return i.prototype.update = function() {
      var s = this, o = 0, a = 0;
      this.tempos.sort(function(l, u) {
        return l.ticks - u.ticks;
      }), this.tempos.forEach(function(l, u) {
        var p = u > 0 ? s.tempos[u - 1].bpm : s.tempos[0].bpm, h = l.ticks / s.ppq - a, g = 60 / p * h;
        l.time = g + o, o = l.time, a += h;
      }), this.timeSignatures.sort(function(l, u) {
        return l.ticks - u.ticks;
      }), this.timeSignatures.forEach(function(l, u) {
        var p = u > 0 ? s.timeSignatures[u - 1] : s.timeSignatures[0], h = (l.ticks - p.ticks) / s.ppq, g = h / p.timeSignature[0] / (p.timeSignature[1] / 4);
        p.measures = p.measures || 0, l.measures = g + p.measures;
      });
    }, i.prototype.ticksToSeconds = function(s) {
      var o = e.search(this.tempos, s);
      if (o !== -1) {
        var a = this.tempos[o], l = a.time, u = (s - a.ticks) / this.ppq;
        return l + 60 / a.bpm * u;
      } else {
        var p = s / this.ppq;
        return 60 / 120 * p;
      }
    }, i.prototype.ticksToMeasures = function(s) {
      var o = e.search(this.timeSignatures, s);
      if (o !== -1) {
        var a = this.timeSignatures[o], l = (s - a.ticks) / this.ppq;
        return a.measures + l / (a.timeSignature[0] / a.timeSignature[1]) / 4;
      } else
        return s / this.ppq / 4;
    }, Object.defineProperty(i.prototype, "ppq", {
      get: function() {
        return n.get(this);
      },
      enumerable: !0,
      configurable: !0
    }), i.prototype.secondsToTicks = function(s) {
      var o = e.search(this.tempos, s, "time");
      if (o !== -1) {
        var a = this.tempos[o], l = a.time, u = s - l, p = u / (60 / a.bpm);
        return Math.round(a.ticks + p * this.ppq);
      } else {
        var h = s / 0.5;
        return Math.round(h * this.ppq);
      }
    }, i.prototype.toJSON = function() {
      return {
        keySignatures: this.keySignatures,
        meta: this.meta,
        name: this.name,
        ppq: this.ppq,
        tempos: this.tempos.map(function(s) {
          return {
            bpm: s.bpm,
            ticks: s.ticks
          };
        }),
        timeSignatures: this.timeSignatures
      };
    }, i.prototype.fromJSON = function(s) {
      this.name = s.name, this.tempos = s.tempos.map(function(o) {
        return Object.assign({}, o);
      }), this.timeSignatures = s.timeSignatures.map(function(o) {
        return Object.assign({}, o);
      }), this.keySignatures = s.keySignatures.map(function(o) {
        return Object.assign({}, o);
      }), this.meta = s.meta.map(function(o) {
        return Object.assign({}, o);
      }), n.set(this, s.ppq), this.update();
    }, i.prototype.setTempo = function(s) {
      this.tempos = [
        {
          bpm: s,
          ticks: 0
        }
      ], this.update();
    }, i;
  }();
  t.Header = r;
})(cn);
var ve = { exports: {} };
ve.exports = qf;
ve.exports.from = ko;
ve.exports.depth = zf;
ve.exports.fromDepth = So;
function qf(t) {
  if (!Array.isArray(t))
    throw new TypeError("Expected value to be an array");
  return ko(t);
}
function ko(t) {
  return _o(t, []);
}
function zf(t, e) {
  if (!Array.isArray(t))
    throw new TypeError("Expected value to be an array");
  return So(t, e);
}
function So(t, e) {
  if (typeof e != "number")
    throw new TypeError("Expected the depth to be a number");
  return xo(t, [], e);
}
function _o(t, e) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    Array.isArray(r) ? _o(r, e) : e.push(r);
  }
  return e;
}
function xo(t, e, n) {
  n--;
  for (var r = 0; r < t.length; r++) {
    var i = t[r];
    n > -1 && Array.isArray(i) ? xo(i, e, n) : e.push(i);
  }
  return e;
}
var xn = X && X.__spreadArrays || function() {
  for (var t = 0, e = 0, n = arguments.length; e < n; e++)
    t += arguments[e].length;
  for (var r = Array(t), i = 0, e = 0; e < n; e++)
    for (var s = arguments[e], o = 0, a = s.length; o < a; o++, i++)
      r[i] = s[o];
  return r;
}, Kf = X && X.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(kr, "__esModule", { value: !0 });
var Gf = an, Jf = cn, Wf = Kf(ve.exports);
function jf(t, e) {
  return [
    {
      absoluteTime: t.ticks,
      channel: e,
      deltaTime: 0,
      noteNumber: t.midi,
      type: "noteOn",
      velocity: Math.floor(t.velocity * 127)
    },
    {
      absoluteTime: t.ticks + t.durationTicks,
      channel: e,
      deltaTime: 0,
      noteNumber: t.midi,
      type: "noteOff",
      velocity: Math.floor(t.noteOffVelocity * 127)
    }
  ];
}
function Yf(t) {
  return Wf.default(t.notes.map(function(e) {
    return jf(e, t.channel);
  }));
}
function Qf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    controllerType: t.number,
    deltaTime: 0,
    type: "controller",
    value: Math.floor(t.value * 127)
  };
}
function Xf(t) {
  for (var e = [], n = 0; n < 127; n++)
    t.controlChanges.hasOwnProperty(n) && t.controlChanges[n].forEach(function(r) {
      e.push(Qf(r, t.channel));
    });
  return e;
}
function Zf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    deltaTime: 0,
    type: "pitchBend",
    value: t.value
  };
}
function th(t) {
  var e = [];
  return t.pitchBends.forEach(function(n) {
    e.push(Zf(n, t.channel));
  }), e;
}
function eh(t) {
  return {
    absoluteTime: 0,
    channel: t.channel,
    deltaTime: 0,
    programNumber: t.instrument.number,
    type: "programChange"
  };
}
function nh(t) {
  return {
    absoluteTime: 0,
    deltaTime: 0,
    meta: !0,
    text: t,
    type: "trackName"
  };
}
function rh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    microsecondsPerBeat: Math.floor(6e7 / t.bpm),
    type: "setTempo"
  };
}
function ih(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    denominator: t.timeSignature[1],
    meta: !0,
    metronome: 24,
    numerator: t.timeSignature[0],
    thirtyseconds: 8,
    type: "timeSignature"
  };
}
function sh(t) {
  var e = Jf.keySignatureKeys.indexOf(t.key);
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    key: e + 7,
    meta: !0,
    scale: t.scale === "major" ? 0 : 1,
    type: "keySignature"
  };
}
function oh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    text: t.text,
    type: t.type
  };
}
function ah(t) {
  var e = {
    header: {
      format: 1,
      numTracks: t.tracks.length + 1,
      ticksPerBeat: t.header.ppq
    },
    tracks: xn([
      xn([
        {
          absoluteTime: 0,
          deltaTime: 0,
          meta: !0,
          text: t.header.name,
          type: "trackName"
        }
      ], t.header.keySignatures.map(function(n) {
        return sh(n);
      }), t.header.meta.map(function(n) {
        return oh(n);
      }), t.header.tempos.map(function(n) {
        return rh(n);
      }), t.header.timeSignatures.map(function(n) {
        return ih(n);
      }))
    ], t.tracks.map(function(n) {
      return xn([
        nh(n.name),
        eh(n)
      ], Yf(n), Xf(n), th(n));
    }))
  };
  return e.tracks = e.tracks.map(function(n) {
    n = n.sort(function(i, s) {
      return i.absoluteTime - s.absoluteTime;
    });
    var r = 0;
    return n.forEach(function(i) {
      i.deltaTime = i.absoluteTime - r, r = i.absoluteTime, delete i.absoluteTime;
    }), n.push({
      deltaTime: 0,
      meta: !0,
      type: "endOfTrack"
    }), n;
  }), new Uint8Array(Gf.writeMidi(e));
}
kr.encode = ah;
var un = {}, Sr = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.controlChangeNames = {
    1: "modulationWheel",
    2: "breath",
    4: "footController",
    5: "portamentoTime",
    7: "volume",
    8: "balance",
    10: "pan",
    64: "sustain",
    65: "portamentoTime",
    66: "sostenuto",
    67: "softPedal",
    68: "legatoFootswitch",
    84: "portamentoControl"
  }, t.controlChangeIds = Object.keys(t.controlChangeNames).reduce(function(i, s) {
    return i[t.controlChangeNames[s]] = s, i;
  }, {});
  var e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = function() {
    function i(s, o) {
      e.set(this, o), n.set(this, s.controllerType), this.ticks = s.absoluteTime, this.value = s.value;
    }
    return Object.defineProperty(i.prototype, "number", {
      get: function() {
        return n.get(this);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "name", {
      get: function() {
        return t.controlChangeNames[this.number] ? t.controlChangeNames[this.number] : null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "time", {
      get: function() {
        var s = e.get(this);
        return s.ticksToSeconds(this.ticks);
      },
      set: function(s) {
        var o = e.get(this);
        this.ticks = o.secondsToTicks(s);
      },
      enumerable: !0,
      configurable: !0
    }), i.prototype.toJSON = function() {
      return {
        number: this.number,
        ticks: this.ticks,
        time: this.time,
        value: this.value
      };
    }, i;
  }();
  t.ControlChange = r;
})(Sr);
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
var Fe = Sr;
function ch() {
  return new Proxy({}, {
    get: function(t, e) {
      if (t[e])
        return t[e];
      if (Fe.controlChangeIds.hasOwnProperty(e))
        return t[Fe.controlChangeIds[e]];
    },
    set: function(t, e, n) {
      return Fe.controlChangeIds.hasOwnProperty(e) ? t[Fe.controlChangeIds[e]] = n : t[e] = n, !0;
    }
  });
}
_r.createControlChanges = ch;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
var Cn = /* @__PURE__ */ new WeakMap(), uh = function() {
  function t(e, n) {
    Cn.set(this, n), this.ticks = e.absoluteTime, this.value = e.value;
  }
  return Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Cn.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Cn.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.toJSON = function() {
    return {
      ticks: this.ticks,
      time: this.time,
      value: this.value
    };
  }, t;
}();
xr.PitchBend = uh;
var Cr = {}, Te = {};
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.instrumentByPatchID = [
  "acoustic grand piano",
  "bright acoustic piano",
  "electric grand piano",
  "honky-tonk piano",
  "electric piano 1",
  "electric piano 2",
  "harpsichord",
  "clavi",
  "celesta",
  "glockenspiel",
  "music box",
  "vibraphone",
  "marimba",
  "xylophone",
  "tubular bells",
  "dulcimer",
  "drawbar organ",
  "percussive organ",
  "rock organ",
  "church organ",
  "reed organ",
  "accordion",
  "harmonica",
  "tango accordion",
  "acoustic guitar (nylon)",
  "acoustic guitar (steel)",
  "electric guitar (jazz)",
  "electric guitar (clean)",
  "electric guitar (muted)",
  "overdriven guitar",
  "distortion guitar",
  "guitar harmonics",
  "acoustic bass",
  "electric bass (finger)",
  "electric bass (pick)",
  "fretless bass",
  "slap bass 1",
  "slap bass 2",
  "synth bass 1",
  "synth bass 2",
  "violin",
  "viola",
  "cello",
  "contrabass",
  "tremolo strings",
  "pizzicato strings",
  "orchestral harp",
  "timpani",
  "string ensemble 1",
  "string ensemble 2",
  "synthstrings 1",
  "synthstrings 2",
  "choir aahs",
  "voice oohs",
  "synth voice",
  "orchestra hit",
  "trumpet",
  "trombone",
  "tuba",
  "muted trumpet",
  "french horn",
  "brass section",
  "synthbrass 1",
  "synthbrass 2",
  "soprano sax",
  "alto sax",
  "tenor sax",
  "baritone sax",
  "oboe",
  "english horn",
  "bassoon",
  "clarinet",
  "piccolo",
  "flute",
  "recorder",
  "pan flute",
  "blown bottle",
  "shakuhachi",
  "whistle",
  "ocarina",
  "lead 1 (square)",
  "lead 2 (sawtooth)",
  "lead 3 (calliope)",
  "lead 4 (chiff)",
  "lead 5 (charang)",
  "lead 6 (voice)",
  "lead 7 (fifths)",
  "lead 8 (bass + lead)",
  "pad 1 (new age)",
  "pad 2 (warm)",
  "pad 3 (polysynth)",
  "pad 4 (choir)",
  "pad 5 (bowed)",
  "pad 6 (metallic)",
  "pad 7 (halo)",
  "pad 8 (sweep)",
  "fx 1 (rain)",
  "fx 2 (soundtrack)",
  "fx 3 (crystal)",
  "fx 4 (atmosphere)",
  "fx 5 (brightness)",
  "fx 6 (goblins)",
  "fx 7 (echoes)",
  "fx 8 (sci-fi)",
  "sitar",
  "banjo",
  "shamisen",
  "koto",
  "kalimba",
  "bag pipe",
  "fiddle",
  "shanai",
  "tinkle bell",
  "agogo",
  "steel drums",
  "woodblock",
  "taiko drum",
  "melodic tom",
  "synth drum",
  "reverse cymbal",
  "guitar fret noise",
  "breath noise",
  "seashore",
  "bird tweet",
  "telephone ring",
  "helicopter",
  "applause",
  "gunshot"
];
Te.InstrumentFamilyByID = [
  "piano",
  "chromatic percussion",
  "organ",
  "guitar",
  "bass",
  "strings",
  "ensemble",
  "brass",
  "reed",
  "pipe",
  "synth lead",
  "synth pad",
  "synth effects",
  "world",
  "percussive",
  "sound effects"
];
Te.DrumKitByPatchID = {
  0: "standard kit",
  8: "room kit",
  16: "power kit",
  24: "electronic kit",
  25: "tr-808 kit",
  32: "jazz kit",
  40: "brush kit",
  48: "orchestra kit",
  56: "sound fx kit"
};
Object.defineProperty(Cr, "__esModule", { value: !0 });
var Ue = Te, $i = /* @__PURE__ */ new WeakMap(), lh = function() {
  function t(e, n) {
    if (this.number = 0, $i.set(this, n), this.number = 0, e) {
      var r = e.find(function(i) {
        return i.type === "programChange";
      });
      r && (this.number = r.programNumber);
    }
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return this.percussion ? Ue.DrumKitByPatchID[this.number] : Ue.instrumentByPatchID[this.number];
    },
    set: function(e) {
      var n = Ue.instrumentByPatchID.indexOf(e);
      n !== -1 && (this.number = n);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "family", {
    get: function() {
      return this.percussion ? "drums" : Ue.InstrumentFamilyByID[Math.floor(this.number / 8)];
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "percussion", {
    get: function() {
      var e = $i.get(this);
      return e.channel === 9;
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.toJSON = function() {
    return {
      family: this.family,
      name: this.name,
      number: this.number
    };
  }, t.prototype.fromJSON = function(e) {
    this.number = e.number;
  }, t;
}();
Cr.Instrument = lh;
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
function fh(t) {
  var e = Math.floor(t / 12) - 1;
  return Co(t) + e.toString();
}
function Co(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function hh(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return e.indexOf(t);
}
var ph = function() {
  var t = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, e = {
    cbb: -2,
    cb: -1,
    c: 0,
    "c#": 1,
    cx: 2,
    dbb: 0,
    db: 1,
    d: 2,
    "d#": 3,
    dx: 4,
    ebb: 2,
    eb: 3,
    e: 4,
    "e#": 5,
    ex: 6,
    fbb: 3,
    fb: 4,
    f: 5,
    "f#": 6,
    fx: 7,
    gbb: 5,
    gb: 6,
    g: 7,
    "g#": 8,
    gx: 9,
    abb: 7,
    ab: 8,
    a: 9,
    "a#": 10,
    ax: 11,
    bbb: 9,
    bb: 10,
    b: 11,
    "b#": 12,
    bx: 13
  };
  return function(n) {
    var r = t.exec(n), i = r[1], s = r[2], o = e[i.toLowerCase()];
    return o + (parseInt(s, 10) + 1) * 12;
  };
}(), Dt = /* @__PURE__ */ new WeakMap(), dh = function() {
  function t(e, n, r) {
    Dt.set(this, r), this.midi = e.midi, this.velocity = e.velocity, this.noteOffVelocity = n.velocity, this.ticks = e.ticks, this.durationTicks = n.ticks - e.ticks;
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return fh(this.midi);
    },
    set: function(e) {
      this.midi = ph(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "octave", {
    get: function() {
      return Math.floor(this.midi / 12) - 1;
    },
    set: function(e) {
      var n = e - this.octave;
      this.midi += n * 12;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "pitch", {
    get: function() {
      return Co(this.midi);
    },
    set: function(e) {
      this.midi = 12 * (this.octave + 1) + hh(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = Dt.get(this);
      return e.ticksToSeconds(this.ticks + this.durationTicks) - e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Dt.get(this), r = n.secondsToTicks(this.time + e);
      this.durationTicks = r - this.ticks;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Dt.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Dt.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bars", {
    get: function() {
      var e = Dt.get(this);
      return e.ticksToMeasures(this.ticks);
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.toJSON = function() {
    return {
      duration: this.duration,
      durationTicks: this.durationTicks,
      midi: this.midi,
      name: this.name,
      ticks: this.ticks,
      time: this.time,
      velocity: this.velocity
    };
  }, t;
}();
Er.Note = dh;
Object.defineProperty(un, "__esModule", { value: !0 });
var En = Ie, gh = Sr, mh = _r, Ih = xr, Di = Cr, vh = Er, Be = /* @__PURE__ */ new WeakMap(), Th = function() {
  function t(e, n) {
    var r = this;
    if (this.name = "", this.notes = [], this.controlChanges = mh.createControlChanges(), this.pitchBends = [], Be.set(this, n), e) {
      var i = e.find(function(g) {
        return g.type === "trackName";
      });
      this.name = i ? i.text : "";
    }
    if (this.instrument = new Di.Instrument(e, this), this.channel = 0, e) {
      for (var s = e.filter(function(g) {
        return g.type === "noteOn";
      }), o = e.filter(function(g) {
        return g.type === "noteOff";
      }), a = function() {
        var g = s.shift();
        l.channel = g.channel;
        var v = o.findIndex(function(b) {
          return b.noteNumber === g.noteNumber && b.absoluteTime >= g.absoluteTime;
        });
        if (v !== -1) {
          var I = o.splice(v, 1)[0];
          l.addNote({
            durationTicks: I.absoluteTime - g.absoluteTime,
            midi: g.noteNumber,
            noteOffVelocity: I.velocity / 127,
            ticks: g.absoluteTime,
            velocity: g.velocity / 127
          });
        }
      }, l = this; s.length; )
        a();
      var u = e.filter(function(g) {
        return g.type === "controller";
      });
      u.forEach(function(g) {
        r.addCC({
          number: g.controllerType,
          ticks: g.absoluteTime,
          value: g.value / 127
        });
      });
      var p = e.filter(function(g) {
        return g.type === "pitchBend";
      });
      p.forEach(function(g) {
        r.addPitchBend({
          ticks: g.absoluteTime,
          value: g.value / Math.pow(2, 13)
        });
      });
      var h = e.find(function(g) {
        return g.type === "endOfTrack";
      });
      this.endOfTrackTicks = h !== void 0 ? h.absoluteTime : void 0;
    }
  }
  return t.prototype.addNote = function(e) {
    var n = Be.get(this), r = new vh.Note({
      midi: 0,
      ticks: 0,
      velocity: 1
    }, {
      ticks: 0,
      velocity: 0
    }, n);
    return Object.assign(r, e), En.insert(this.notes, r, "ticks"), this;
  }, t.prototype.addCC = function(e) {
    var n = Be.get(this), r = new gh.ControlChange({
      controllerType: e.number
    }, n);
    return delete e.number, Object.assign(r, e), Array.isArray(this.controlChanges[r.number]) || (this.controlChanges[r.number] = []), En.insert(this.controlChanges[r.number], r, "ticks"), this;
  }, t.prototype.addPitchBend = function(e) {
    var n = Be.get(this), r = new Ih.PitchBend({}, n);
    return Object.assign(r, e), En.insert(this.pitchBends, r, "ticks"), this;
  }, Object.defineProperty(t.prototype, "duration", {
    get: function() {
      if (!this.notes.length)
        return 0;
      for (var e = this.notes[this.notes.length - 1].time + this.notes[this.notes.length - 1].duration, n = 0; n < this.notes.length - 1; n++) {
        var r = this.notes[n].time + this.notes[n].duration;
        e < r && (e = r);
      }
      return e;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "durationTicks", {
    get: function() {
      if (!this.notes.length)
        return 0;
      for (var e = this.notes[this.notes.length - 1].ticks + this.notes[this.notes.length - 1].durationTicks, n = 0; n < this.notes.length - 1; n++) {
        var r = this.notes[n].ticks + this.notes[n].durationTicks;
        e < r && (e = r);
      }
      return e;
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.fromJSON = function(e) {
    var n = this;
    this.name = e.name, this.channel = e.channel, this.instrument = new Di.Instrument(void 0, this), this.instrument.fromJSON(e.instrument), e.endOfTrackTicks !== void 0 && (this.endOfTrackTicks = e.endOfTrackTicks);
    for (var r in e.controlChanges)
      e.controlChanges[r] && e.controlChanges[r].forEach(function(i) {
        n.addCC({
          number: i.number,
          ticks: i.ticks,
          value: i.value
        });
      });
    e.notes.forEach(function(i) {
      n.addNote({
        durationTicks: i.durationTicks,
        midi: i.midi,
        ticks: i.ticks,
        velocity: i.velocity
      });
    });
  }, t.prototype.toJSON = function() {
    for (var e = {}, n = 0; n < 127; n++)
      this.controlChanges.hasOwnProperty(n) && (e[n] = this.controlChanges[n].map(function(i) {
        return i.toJSON();
      }));
    var r = {
      channel: this.channel,
      controlChanges: e,
      pitchBends: this.pitchBends.map(function(i) {
        return i.toJSON();
      }),
      instrument: this.instrument.toJSON(),
      name: this.name,
      notes: this.notes.map(function(i) {
        return i.toJSON();
      })
    };
    return this.endOfTrackTicks !== void 0 && (r.endOfTrackTicks = this.endOfTrackTicks), r;
  }, t;
}();
un.Track = Th;
var yh = X && X.__awaiter || function(t, e, n, r) {
  function i(s) {
    return s instanceof n ? s : new n(function(o) {
      o(s);
    });
  }
  return new (n || (n = Promise))(function(s, o) {
    function a(p) {
      try {
        u(r.next(p));
      } catch (h) {
        o(h);
      }
    }
    function l(p) {
      try {
        u(r.throw(p));
      } catch (h) {
        o(h);
      }
    }
    function u(p) {
      p.done ? s(p.value) : i(p.value).then(a, l);
    }
    u((r = r.apply(t, e || [])).next());
  });
}, bh = X && X.__generator || function(t, e) {
  var n = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, i, s, o;
  return o = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(u) {
    return function(p) {
      return l([u, p]);
    };
  }
  function l(u) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; n; )
      try {
        if (r = 1, i && (s = u[0] & 2 ? i.return : u[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, u[1])).done)
          return s;
        switch (i = 0, s && (u = [u[0] & 2, s.value]), u[0]) {
          case 0:
          case 1:
            s = u;
            break;
          case 4:
            return n.label++, { value: u[1], done: !1 };
          case 5:
            n.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (s = n.trys, !(s = s.length > 0 && s[s.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              n = 0;
              continue;
            }
            if (u[0] === 3 && (!s || u[1] > s[0] && u[1] < s[3])) {
              n.label = u[1];
              break;
            }
            if (u[0] === 6 && n.label < s[1]) {
              n.label = s[1], s = u;
              break;
            }
            if (s && n.label < s[2]) {
              n.label = s[2], n.ops.push(u);
              break;
            }
            s[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        u = e.call(t, n);
      } catch (p) {
        u = [6, p], i = 0;
      } finally {
        r = s = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
};
Object.defineProperty(on, "__esModule", { value: !0 });
var wh = an, kh = kr, Li = cn, Nn = un, Sh = function() {
  function t(e) {
    var n = this, r = null;
    e && (e instanceof ArrayBuffer && (e = new Uint8Array(e)), r = wh.parseMidi(e), r.tracks.forEach(function(i) {
      var s = 0;
      i.forEach(function(o) {
        s += o.deltaTime, o.absoluteTime = s;
      });
    }), r.tracks = Eh(r.tracks)), this.header = new Li.Header(r), this.tracks = [], e && (this.tracks = r.tracks.map(function(i) {
      return new Nn.Track(i, n.header);
    }), r.header.format === 1 && this.tracks[0].duration === 0 && this.tracks.shift());
  }
  return t.fromUrl = function(e) {
    return yh(this, void 0, void 0, function() {
      var n, r;
      return bh(this, function(i) {
        switch (i.label) {
          case 0:
            return [4, fetch(e)];
          case 1:
            return n = i.sent(), n.ok ? [4, n.arrayBuffer()] : [3, 3];
          case 2:
            return r = i.sent(), [2, new t(r)];
          case 3:
            throw new Error("could not load " + e);
        }
      });
    });
  }, Object.defineProperty(t.prototype, "name", {
    get: function() {
      return this.header.name;
    },
    set: function(e) {
      this.header.name = e;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = this.tracks.map(function(n) {
        return n.duration;
      });
      return Math.max.apply(Math, e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "durationTicks", {
    get: function() {
      var e = this.tracks.map(function(n) {
        return n.durationTicks;
      });
      return Math.max.apply(Math, e);
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.addTrack = function() {
    var e = new Nn.Track(void 0, this.header);
    return this.tracks.push(e), e;
  }, t.prototype.toArray = function() {
    return kh.encode(this);
  }, t.prototype.toJSON = function() {
    return {
      header: this.header.toJSON(),
      tracks: this.tracks.map(function(e) {
        return e.toJSON();
      })
    };
  }, t.prototype.fromJSON = function(e) {
    var n = this;
    this.header = new Li.Header(), this.header.fromJSON(e.header), this.tracks = e.tracks.map(function(r) {
      var i = new Nn.Track(void 0, n.header);
      return i.fromJSON(r), i;
    });
  }, t.prototype.clone = function() {
    var e = new t();
    return e.fromJSON(this.toJSON()), e;
  }, t;
}(), _h = on.Midi = Sh, xh = un;
on.Track = xh.Track;
var Ch = cn;
on.Header = Ch.Header;
function Eh(t) {
  for (var e = [], n = 0; n < t.length; n++)
    for (var r = e.length, i = /* @__PURE__ */ new Map(), s = Array(16).fill(0), o = 0, a = t[n]; o < a.length; o++) {
      var l = a[o], u = r, p = l.channel;
      if (p !== void 0) {
        l.type === "programChange" && (s[p] = l.programNumber);
        var h = s[p], g = h + " " + p;
        i.has(g) ? u = i.get(g) : (u = r + i.size, i.set(g, u));
      }
      e[u] || e.push([]), e[u].push(l);
    }
  return e;
}
class st {
  static DEFAULT_PPQ = 480;
  masterTrack;
  tracks;
  PPQ;
  tempos;
  timeSignatures;
  pluginContext;
  nextTrackRank = 1;
  constructor() {
    this.tracks = [], this.PPQ = 0, this.tempos = [], this.timeSignatures = [];
  }
  getMasterTrack() {
    return this.masterTrack || (this.masterTrack = new zt({
      type: Ht.MASTER_TRACK,
      song: this,
      uuid: zt.generateTrackIdInternal()
    })), this.masterTrack;
  }
  getTracks() {
    return this.tracks;
  }
  getTrackById(e) {
    return ze(this.tracks, (n) => n.getId() === e);
  }
  getTracksByIds(e) {
    if (!this.tracks)
      return [];
    const n = new Set(e);
    return this.tracks.filter((r) => n.has(r.getId()));
  }
  getTrackIndex(e) {
    return Jt(this.tracks, (n) => n.getId() === e);
  }
  createTrack({
    type: e,
    index: n,
    rank: r,
    assignDefaultSamplerPlugin: i = !1
  }) {
    this.checkAccess("createTrack"), r == null || r === null ? r = this.getNextTrackRank() : this.nextTrackRank = Math.max(r + 1, this.nextTrackRank);
    const s = new zt({
      type: e,
      song: this,
      uuid: this.getNextTrackId(),
      rank: r == null || r === null ? this.getNextTrackRank() : r
    });
    return i && e === Ht.MIDI_TRACK && s.setSamplerPlugin(s.createAudioPlugin(sn.DEFAULT_SYNTH_TFID)), n != null ? this.tracks.splice(n, 0, s) : this.tracks.push(s), s;
  }
  cloneTrack(e) {
    let n = this.getTrackIndex(e.getId());
    n < 0 && (n = void 0);
    const r = this.createTrack({
      type: e.getType(),
      index: n
    });
    if (r.setVolume(e.getVolume()), r.setPan(e.getPan()), r.setSolo(e.getSolo()), r.setMuted(e.getMuted()), e.getType() === Ht.MIDI_TRACK) {
      const i = e.getInstrument();
      i && r.setInstrument({
        program: i.getProgram(),
        isDrum: i.getIsDrum()
      });
      for (const o of e.getSuggestedInstruments())
        r.createSuggestedInstrument({
          program: o.getProgram(),
          isDrum: o.getIsDrum()
        });
      const s = e.getSamplerPlugin();
      s && r.setSamplerPlugin(s.clone(r));
    } else
      e.getType(), Ht.AUDIO_TRACK;
    for (const i of e.getAudioPlugins())
      r.addAudioPlugin(i.clone(r));
    for (const i of e.getClips()) {
      const s = r.cloneClip(i);
      r.insertClip(s);
    }
    return e.hasAnyAutomation() && r.setAutomation(e.getAutomation()), r;
  }
  removeTrack(e) {
    this.checkAccess("removeTrack");
    const n = this.getTrackById(e);
    return n ? (this.tracks.splice(Jt(this.tracks, (r) => r.getId() === e), 1), n) : null;
  }
  getResolution() {
    return this.PPQ;
  }
  setResolution(e) {
    this.PPQ = e;
  }
  static getLeadingBar(e, n) {
    if (e < 0)
      return n[0];
    let r = k.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    for (; r > 0 && n[r].beat !== 1; )
      r -= 1;
    return n[r];
  }
  static getLeadingBeat(e, n) {
    if (e < 0)
      return n[0];
    const r = k.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return n[r];
  }
  static getTrailingBeat(e, n) {
    if (e < 0)
      return n[0];
    const r = k.ge(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r > n.length - 1 ? n[n.length - 1] : n[r];
  }
  static getClosestBeat(e, n) {
    if (e < 0)
      return n[0];
    const r = k.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r >= n.length - 1 ? n[r] : Math.abs(n[r].tick - e) > Math.abs(n[r + 1].tick - e) ? n[r + 1] : n[r];
  }
  getBarBeats(e) {
    return st.getBarBeatsImpl(e, this.PPQ, this.timeSignatures, (n) => ({
      tick: n.getTicks(),
      numerator: n.getNumerator(),
      denominator: n.getDenominator()
    }));
  }
  static getBarBeatsImpl(e, n, r, i) {
    if (r.length === 0)
      return [];
    const s = [];
    let o = 0, a = 0, l = 1, u = 1;
    for (; o <= e; ) {
      if (a < r.length - 1) {
        const g = i(r[a + 1]).tick;
        o >= g && (o = g, a += 1, u > 1 && (u = 1, l += 1));
      }
      const p = i(r[a]);
      s.push({
        bar: l,
        beat: u,
        tick: o,
        numerator: u === 1 ? p.numerator : void 0,
        denominator: u === 1 ? p.denominator : void 0,
        ticksPerBeat: u === 1 ? n * 4 / p.denominator : void 0
      }), u >= p.numerator ? (u = 1, l += 1) : u += 1, o += n * 4 / p.denominator;
    }
    return s;
  }
  getTempoChanges() {
    return this.tempos;
  }
  getTempoAtTick(e) {
    return st.getTempoAtTickImpl(e, this.tempos, (n) => ({
      getTicks: () => n
    }), (n) => n.getTicks());
  }
  static getTempoAtTickImpl(e, n, r, i) {
    let s = k.le(n, r(e), (o, a) => i(o) - i(a));
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  createTempoChange({
    ticks: e,
    bpm: n
  }) {
    if (this.PPQ <= 0)
      throw new Error("Song resolution must be provided before creating tempo changes.");
    if (this.tempos.length === 0 && e !== 0)
      throw new Error("The first tempo event must be at tick 0");
    const r = new Ee({ ticks: e, bpm: n, time: this.tickToSeconds(e) }), i = k.ge(this.tempos, r, (s, o) => s.getTicks() - o.getTicks());
    return i < 0 ? this.tempos.push(r) : this.tempos.splice(i, 0, r), this.retimingTempoEvents(), r;
  }
  overwriteTempoChanges(e) {
    if (e.length === 0)
      throw new Error("Cannot clear all the tempo events.");
    const n = bi(e);
    n.sort((i, s) => i.getTicks() - s.getTicks());
    const r = n[0];
    if (r.getTicks() > 0)
      throw new Error("The first tempo event needs to start from tick 0");
    this.tempos = [
      new Ee({
        ticks: 0,
        time: 0,
        bpm: r.getBpm()
      })
    ];
    for (let i = 1; i < n.length; i += 1) {
      const s = n[i];
      this.createTempoChange({
        ticks: s.getTicks(),
        bpm: s.getBpm()
      });
    }
  }
  overwriteTimeSignatures(e) {
    this.timeSignatures = bi(e);
  }
  updateTempo(e, n) {
    e.setBpmInternal(n), this.retimingTempoEvents();
  }
  updateTempoAtTick(e, n) {
    const r = this.getTempoAtTick(e);
    r ? this.updateTempo(r, n) : this.createTempoChange({
      ticks: e,
      bpm: n
    });
  }
  getTimeSignatures() {
    return this.timeSignatures;
  }
  createTimeSignature({
    ticks: e,
    numerator: n,
    denominator: r
  }) {
    const i = new wi({ ticks: e, numerator: n, denominator: r }), s = k.ge(this.timeSignatures, i, (o, a) => o.getTicks() - a.getTicks());
    return s < 0 ? this.timeSignatures.push(i) : this.timeSignatures.splice(s, 0, i), i;
  }
  updateTimeSignatureAtTick(e, n, r) {
    const i = this.getTimeSignatureAtTick(e);
    i ? (i.setNumerator(n), i.setDenominator(r)) : this.createTimeSignature({
      ticks: e,
      numerator: n,
      denominator: r
    });
  }
  getLastTick() {
    let e = 0;
    for (const n of this.tracks)
      e = Math.max(e, n.getTrackEndTick());
    return e;
  }
  getDuration() {
    return this.tickToSeconds(this.getLastTick());
  }
  getTicksPerBeatAtTick(e) {
    const n = this.getTimeSignatureAtTick(e);
    return this.getResolution() * (4 / n.getDenominator());
  }
  getTimeSignatureAtTick(e) {
    return st.getTimeSignatureAtTickImpl(e, this.timeSignatures, (n) => ({
      getTicks: () => n
    }), (n) => n.getTicks());
  }
  static getTimeSignatureAtTickImpl(e, n, r, i) {
    let s = k.le(n, r(e), (o, a) => i(o) - i(a));
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  tickToSeconds(e) {
    return st.tickToSecondsImpl(e, this.getTempoChanges(), this.getResolution(), (n) => ({
      getTicks: () => n
    }), (n) => n.getTicks(), (n) => ({
      tick: n.getTicks(),
      bpm: n.getBpm(),
      time: n.getTime()
    }));
  }
  static tickToSecondsImpl(e, n, r, i, s, o) {
    if (e === 0)
      return 0;
    let a = k.lt(n, i(e), (g, v) => s(g) - s(v));
    a == -1 && (a = 0);
    const l = n[a], u = o(l), p = e - u.tick, h = st.tempoBPMToTicksPerSecond(u.bpm, r);
    return u.time + p / h;
  }
  secondsToTick(e) {
    return st.secondsToTickImpl(e, this.PPQ, this.tempos, (n) => ({ getTime: () => n }), (n) => n.getTime(), (n) => ({
      tick: n.getTicks(),
      bpm: n.getBpm(),
      time: n.getTime()
    }));
  }
  static secondsToTickImpl(e, n, r, i, s, o) {
    if (e === 0)
      return 0;
    let a = k.lt(r, i(e), (g, v) => s(g) - s(v));
    a == -1 && (a = 0);
    const l = r[a], u = o(l), p = e - u.time, h = st.tempoBPMToTicksPerSecond(u.bpm, n);
    return Math.round(u.tick + p * h);
  }
  static importMIDI(e, n, r = 0, i = !1) {
    const s = new _h(n), o = r, a = st.DEFAULT_PPQ / s.header.ppq;
    if (i) {
      const l = [];
      for (const p of s.header.timeSignatures)
        l.push(new wi({
          ticks: o + bt(p.ticks, a),
          numerator: p.timeSignature[0],
          denominator: p.timeSignature[1]
        }));
      e.overwriteTimeSignatures(l);
      const u = [];
      o > 0 && u.push(new Ee({
        ticks: 0,
        time: 0,
        bpm: 120
      }));
      for (const p of s.header.tempos)
        u.push(new Ee({
          ticks: o + bt(p.ticks, a),
          time: p.time,
          bpm: p.bpm
        }));
      e.overwriteTempoChanges(u);
    }
    for (const l of s.tracks) {
      const u = e.createTrack({
        type: Ht.MIDI_TRACK,
        assignDefaultSamplerPlugin: !0
      });
      u.setInstrument({
        program: l.instrument.number,
        isDrum: l.instrument.percussion
      });
      const p = u.createMIDIClip({ clipStartTick: o });
      let h = Number.MAX_SAFE_INTEGER;
      for (const I of l.notes)
        p.createNote({
          pitch: I.midi,
          velocity: Math.round(I.velocity * 127),
          startTick: o + bt(I.ticks, a),
          endTick: o + bt(I.ticks + I.durationTicks, a)
        }), h = Math.min(h, o + bt(I.ticks, a));
      const g = l.controlChanges[7];
      if (g)
        if (g.length === 1)
          u.setVolume(g[0].value);
        else {
          const I = new Y(Kn.VOLUME);
          u.getAutomation().addAutomation(I);
          const b = u.getAutomation().getAutomationValueByTarget(I);
          for (const K of g)
            b.addPoint(o + bt(K.ticks, a), K.value);
        }
      const v = l.controlChanges[10];
      if (v)
        if (v.length === 1) {
          const I = Math.round(v[0].value * 127 - 64);
          u.setPan(I);
        } else {
          const I = new Y(Kn.PAN);
          u.getAutomation().addAutomation(I);
          const b = u.getAutomation().getAutomationValueByTarget(I);
          for (const K of v)
            b.addPoint(o + bt(K.ticks, a), K.value);
        }
      h !== Number.MAX_SAFE_INTEGER && p.adjustClipLeft(h);
    }
  }
  setPluginContextInternal(e) {
    this.pluginContext = {
      plugin: e,
      numTracksCreatedByPlugin: 0
    };
  }
  clearPluginContextInternal() {
    this.pluginContext = void 0;
  }
  getNextTrackId() {
    const e = this.pluginContext, n = e.plugin.generatedTrackIdsInternal;
    if (e.numTracksCreatedByPlugin === n.length)
      n.push(zt.generateTrackIdInternal());
    else if (e.numTracksCreatedByPlugin > n.length)
      throw new Error("Plugin generated track ids out of sync.");
    const r = n[e.numTracksCreatedByPlugin];
    return e.numTracksCreatedByPlugin += 1, r;
  }
  getNextTrackRank() {
    const e = this.nextTrackRank;
    return this.nextTrackRank += 1, e;
  }
  checkAccess(e) {
    if (!this.pluginContext)
      throw new Error("Song needs to be accessed in a plugin context in order to use privileged methods.");
    if (!this.pluginContext.plugin.songAccess()[e])
      throw new Error(`Plugin ${this.pluginContext.plugin.constructor.id()} requires access ${e} in order to run.`);
  }
  static tempoBPMToTicksPerSecond(e, n) {
    return e * n / 60;
  }
  retimingTempoEvents() {
    this.tempos.sort((e, n) => e.getTicks() - n.getTicks());
    for (const e of this.tempos)
      e.setTimeInternal(this.tickToSeconds(e.getTicks()));
  }
}
function bt(t, e) {
  return Math.round(t * e);
}
var V = /* @__PURE__ */ ((t) => (t[t.Slider = 1] = "Slider", t[t.Input = 2] = "Input", t[t.TrackSelector = 3] = "TrackSelector", t[t.Pitch = 4] = "Pitch", t[t.TrackPitchSelector = 5] = "TrackPitchSelector", t[t.InstrumentSelector = 6] = "InstrumentSelector", t[t.Select = 7] = "Select", t[t.Switch = 8] = "Switch", t[t.InputNumber = 9] = "InputNumber", t[t.MultiTrackSelector = 10] = "MultiTrackSelector", t[t.None = 11] = "None", t[t.FileSelector = 12] = "FileSelector", t[t.MultiSourceAudioSelector = 13] = "MultiSourceAudioSelector", t[t.AudioRecorder = 14] = "AudioRecorder", t[t.SelectList = 15] = "SelectList", t))(V || {});
async function qh(t) {
  return t.arrayBuffer();
}
var Nh = /* @__PURE__ */ ((t) => (t[t.SelectedTrackIds = 1] = "SelectedTrackIds", t[t.SelectedClipInfos = 2] = "SelectedClipInfos", t[t.TickAtPlayhead = 3] = "TickAtPlayhead", t[t.EditingClipInfo = 4] = "EditingClipInfo", t[t.EditingNoteIds = 5] = "EditingNoteIds", t[t.TickAtPlayheadSnappedToBeat = 6] = "TickAtPlayheadSnappedToBeat", t))(Nh || {});
export {
  sn as AudioPlugin,
  wr as AutomationData,
  Y as AutomationTarget,
  Kn as AutomationTargetType,
  Gt as AutomationValue,
  Q as Clip,
  re as ClipType,
  Of as DrumPitch,
  Nh as InjectSource,
  pt as Note,
  st as Song,
  Ee as TempoEvent,
  Rh as TickToSecondStepper,
  wi as TimeSignatureEvent,
  zt as Track,
  Ht as TrackType,
  Ph as TuneflowPipeline,
  Bs as TuneflowPlugin,
  V as WidgetType,
  Nf as areTuneflowIdsEqual,
  Pf as areTuneflowIdsEqualIgnoreVersion,
  Af as dbToVolumeValue,
  Qe as decodeAudioPluginTuneflowId,
  Fh as gainToDb,
  $h as gainToVolumeValue,
  Bi as getAudioPluginTuneflowId,
  Ef as getAudioPluginVersionlessTuneflowId,
  qh as getFileContentFromFileSelector,
  Hh as maybeToRaw,
  Oh as midiNumberToPitch,
  Lh as pitchToHz,
  Mh as pitchToMidiNumber,
  Dh as remapRange,
  Vh as toVersionlessTfId,
  Uh as volumeValueToDb,
  Bh as volumeValueToGain
};
