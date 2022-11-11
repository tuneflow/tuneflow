var Di = "1.13.6", ci = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, je = Array.prototype, Gn = Object.prototype, ui = typeof Symbol < "u" ? Symbol.prototype : null, qa = je.push, fe = je.slice, ae = Gn.toString, Ka = Gn.hasOwnProperty, $i = typeof ArrayBuffer < "u", za = typeof DataView < "u", Ga = Array.isArray, li = Object.keys, fi = Object.create, hi = $i && ArrayBuffer.isView, Ja = isNaN, Wa = isFinite, Li = !{ toString: null }.propertyIsEnumerable("toString"), pi = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], Qa = Math.pow(2, 53) - 1;
function K(t, e) {
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
function At(t) {
  var e = typeof t;
  return e === "function" || e === "object" && !!t;
}
function Ya(t) {
  return t === null;
}
function Hi(t) {
  return t === void 0;
}
function qi(t) {
  return t === !0 || t === !1 || ae.call(t) === "[object Boolean]";
}
function ja(t) {
  return !!(t && t.nodeType === 1);
}
function O(t) {
  var e = "[object " + t + "]";
  return function(n) {
    return ae.call(n) === e;
  };
}
const Jn = O("String"), Ki = O("Number"), Xa = O("Date"), Za = O("RegExp"), tc = O("Error"), zi = O("Symbol"), Gi = O("ArrayBuffer");
var Ji = O("Function"), ec = ci.document && ci.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof ec != "function" && (Ji = function(t) {
  return typeof t == "function" || !1;
});
const B = Ji, Wi = O("Object");
var Qi = za && Wi(new DataView(new ArrayBuffer(8))), Wn = typeof Map < "u" && Wi(/* @__PURE__ */ new Map()), nc = O("DataView");
function rc(t) {
  return t != null && B(t.getInt8) && Gi(t.buffer);
}
const $e = Qi ? rc : nc, Ot = Ga || O("Array");
function vt(t, e) {
  return t != null && Ka.call(t, e);
}
var Pn = O("Arguments");
(function() {
  Pn(arguments) || (Pn = function(t) {
    return vt(t, "callee");
  });
})();
const Qn = Pn;
function ic(t) {
  return !zi(t) && Wa(t) && !isNaN(parseFloat(t));
}
function Yi(t) {
  return Ki(t) && Ja(t);
}
function ji(t) {
  return function() {
    return t;
  };
}
function Xi(t) {
  return function(e) {
    var n = t(e);
    return typeof n == "number" && n >= 0 && n <= Qa;
  };
}
function Zi(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
const Le = Zi("byteLength"), sc = Xi(Le);
var oc = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function ac(t) {
  return hi ? hi(t) && !$e(t) : sc(t) && oc.test(ae.call(t));
}
const ts = $i ? ac : ji(!1), z = Zi("length");
function cc(t) {
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
function es(t, e) {
  e = cc(e);
  var n = pi.length, r = t.constructor, i = B(r) && r.prototype || Gn, s = "constructor";
  for (vt(t, s) && !e.contains(s) && e.push(s); n--; )
    s = pi[n], s in t && t[s] !== i[s] && !e.contains(s) && e.push(s);
}
function x(t) {
  if (!At(t))
    return [];
  if (li)
    return li(t);
  var e = [];
  for (var n in t)
    vt(t, n) && e.push(n);
  return Li && es(t, e), e;
}
function uc(t) {
  if (t == null)
    return !0;
  var e = z(t);
  return typeof e == "number" && (Ot(t) || Jn(t) || Qn(t)) ? e === 0 : z(x(t)) === 0;
}
function ns(t, e) {
  var n = x(e), r = n.length;
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
T.VERSION = Di;
T.prototype.value = function() {
  return this._wrapped;
};
T.prototype.valueOf = T.prototype.toJSON = T.prototype.value;
T.prototype.toString = function() {
  return String(this._wrapped);
};
function di(t) {
  return new Uint8Array(
    t.buffer || t,
    t.byteOffset || 0,
    Le(t)
  );
}
var gi = "[object DataView]";
function An(t, e, n, r) {
  if (t === e)
    return t !== 0 || 1 / t === 1 / e;
  if (t == null || e == null)
    return !1;
  if (t !== t)
    return e !== e;
  var i = typeof t;
  return i !== "function" && i !== "object" && typeof e != "object" ? !1 : rs(t, e, n, r);
}
function rs(t, e, n, r) {
  t instanceof T && (t = t._wrapped), e instanceof T && (e = e._wrapped);
  var i = ae.call(t);
  if (i !== ae.call(e))
    return !1;
  if (Qi && i == "[object Object]" && $e(t)) {
    if (!$e(e))
      return !1;
    i = gi;
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
      return ui.valueOf.call(t) === ui.valueOf.call(e);
    case "[object ArrayBuffer]":
    case gi:
      return rs(di(t), di(e), n, r);
  }
  var s = i === "[object Array]";
  if (!s && ts(t)) {
    var o = Le(t);
    if (o !== Le(e))
      return !1;
    if (t.buffer === e.buffer && t.byteOffset === e.byteOffset)
      return !0;
    s = !0;
  }
  if (!s) {
    if (typeof t != "object" || typeof e != "object")
      return !1;
    var a = t.constructor, l = e.constructor;
    if (a !== l && !(B(a) && a instanceof a && B(l) && l instanceof l) && "constructor" in t && "constructor" in e)
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
    var p = x(t), h;
    if (u = p.length, x(e).length !== u)
      return !1;
    for (; u--; )
      if (h = p[u], !(vt(e, h) && An(t[h], e[h], n, r)))
        return !1;
  }
  return n.pop(), r.pop(), !0;
}
function lc(t, e) {
  return An(t, e);
}
function he(t) {
  if (!At(t))
    return [];
  var e = [];
  for (var n in t)
    e.push(n);
  return Li && es(t, e), e;
}
function Yn(t) {
  var e = z(t);
  return function(n) {
    if (n == null)
      return !1;
    var r = he(n);
    if (z(r))
      return !1;
    for (var i = 0; i < e; i++)
      if (!B(n[t[i]]))
        return !1;
    return t !== os || !B(n[jn]);
  };
}
var jn = "forEach", is = "has", Xn = ["clear", "delete"], ss = ["get", is, "set"], fc = Xn.concat(jn, ss), os = Xn.concat(ss), hc = ["add"].concat(Xn, jn, is);
const pc = Wn ? Yn(fc) : O("Map"), dc = Wn ? Yn(os) : O("WeakMap"), gc = Wn ? Yn(hc) : O("Set"), mc = O("WeakSet");
function Qt(t) {
  for (var e = x(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = t[e[i]];
  return r;
}
function Ic(t) {
  for (var e = x(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [e[i], t[e[i]]];
  return r;
}
function as(t) {
  for (var e = {}, n = x(t), r = 0, i = n.length; r < i; r++)
    e[t[n[r]]] = n[r];
  return e;
}
function On(t) {
  var e = [];
  for (var n in t)
    B(t[n]) && e.push(n);
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
const cs = Zn(he), He = Zn(x), us = Zn(he, !0);
function vc() {
  return function() {
  };
}
function ls(t) {
  if (!At(t))
    return {};
  if (fi)
    return fi(t);
  var e = vc();
  e.prototype = t;
  var n = new e();
  return e.prototype = null, n;
}
function Tc(t, e) {
  var n = ls(t);
  return e && He(n, e), n;
}
function yc(t) {
  return At(t) ? Ot(t) ? t.slice() : cs({}, t) : t;
}
function wc(t, e) {
  return e(t), t;
}
function fs(t) {
  return Ot(t) ? t : [t];
}
T.toPath = fs;
function pe(t) {
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
function hs(t, e, n) {
  var r = tr(t, pe(e));
  return Hi(r) ? n : r;
}
function bc(t, e) {
  e = pe(e);
  for (var n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    if (!vt(t, i))
      return !1;
    t = t[i];
  }
  return !!n;
}
function er(t) {
  return t;
}
function ce(t) {
  return t = He({}, t), function(e) {
    return ns(e, t);
  };
}
function nr(t) {
  return t = pe(t), function(e) {
    return tr(e, t);
  };
}
function de(t, e, n) {
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
function ps(t, e, n) {
  return t == null ? er : B(t) ? de(t, e, n) : At(t) && !Ot(t) ? ce(t) : nr(t);
}
function rr(t, e) {
  return ps(t, e, 1 / 0);
}
T.iteratee = rr;
function G(t, e, n) {
  return T.iteratee !== rr ? T.iteratee(t, e) : ps(t, e, n);
}
function kc(t, e, n) {
  e = G(e, n);
  for (var r = x(t), i = r.length, s = {}, o = 0; o < i; o++) {
    var a = r[o];
    s[a] = e(t[a], a, t);
  }
  return s;
}
function ds() {
}
function Sc(t) {
  return t == null ? ds : function(e) {
    return hs(t, e);
  };
}
function _c(t, e, n) {
  var r = Array(Math.max(0, t));
  e = de(e, n, 1);
  for (var i = 0; i < t; i++)
    r[i] = e(i);
  return r;
}
function Mn(t, e) {
  return e == null && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
}
const ue = Date.now || function() {
  return new Date().getTime();
};
function gs(t) {
  var e = function(s) {
    return t[s];
  }, n = "(?:" + x(t).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
  return function(s) {
    return s = s == null ? "" : "" + s, r.test(s) ? s.replace(i, e) : s;
  };
}
const ms = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, Cc = gs(ms), xc = as(ms), Ec = gs(xc), Nc = T.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var yn = /(.)^/, Pc = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, Ac = /\\|'|\r|\n|\u2028|\u2029/g;
function Oc(t) {
  return "\\" + Pc[t];
}
var Mc = /^\s*(\w|\$)+\s*$/;
function Vc(t, e, n) {
  !e && n && (e = n), e = us({}, e, T.templateSettings);
  var r = RegExp([
    (e.escape || yn).source,
    (e.interpolate || yn).source,
    (e.evaluate || yn).source
  ].join("|") + "|$", "g"), i = 0, s = "__p+='";
  t.replace(r, function(u, p, h, g, I) {
    return s += t.slice(i, I).replace(Ac, Oc), i = I + u.length, p ? s += `'+
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
    if (!Mc.test(o))
      throw new Error(
        "variable is not a bare identifier: " + o
      );
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
function Rc(t, e, n) {
  e = pe(e);
  var r = e.length;
  if (!r)
    return B(n) ? n.call(t) : n;
  for (var i = 0; i < r; i++) {
    var s = t == null ? void 0 : t[e[i]];
    s === void 0 && (s = n, i = r), t = B(s) ? s.call(t) : s;
  }
  return t;
}
var Uc = 0;
function Fc(t) {
  var e = ++Uc + "";
  return t ? t + e : e;
}
function Bc(t) {
  var e = T(t);
  return e._chain = !0, e;
}
function Is(t, e, n, r, i) {
  if (!(r instanceof e))
    return t.apply(n, i);
  var s = ls(t.prototype), o = t.apply(s, i);
  return At(o) ? o : s;
}
var Yt = K(function(t, e) {
  var n = Yt.placeholder, r = function() {
    for (var i = 0, s = e.length, o = Array(s), a = 0; a < s; a++)
      o[a] = e[a] === n ? arguments[i++] : e[a];
    for (; i < arguments.length; )
      o.push(arguments[i++]);
    return Is(t, r, this, this, o);
  };
  return r;
});
Yt.placeholder = T;
const vs = K(function(t, e, n) {
  if (!B(t))
    throw new TypeError("Bind must be called on a function");
  var r = K(function(i) {
    return Is(t, r, e, this, n.concat(i));
  });
  return r;
}), W = Xi(z);
function Mt(t, e, n, r) {
  if (r = r || [], !e && e !== 0)
    e = 1 / 0;
  else if (e <= 0)
    return r.concat(t);
  for (var i = r.length, s = 0, o = z(t); s < o; s++) {
    var a = t[s];
    if (W(a) && (Ot(a) || Qn(a)))
      if (e > 1)
        Mt(a, e - 1, n, r), i = r.length;
      else
        for (var l = 0, u = a.length; l < u; )
          r[i++] = a[l++];
    else
      n || (r[i++] = a);
  }
  return r;
}
const Dc = K(function(t, e) {
  e = Mt(e, !1, !1);
  var n = e.length;
  if (n < 1)
    throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = e[n];
    t[r] = vs(t[r], t);
  }
  return t;
});
function $c(t, e) {
  var n = function(r) {
    var i = n.cache, s = "" + (e ? e.apply(this, arguments) : r);
    return vt(i, s) || (i[s] = t.apply(this, arguments)), i[s];
  };
  return n.cache = {}, n;
}
const Ts = K(function(t, e, n) {
  return setTimeout(function() {
    return t.apply(null, n);
  }, e);
}), Lc = Yt(Ts, T, 1);
function Hc(t, e, n) {
  var r, i, s, o, a = 0;
  n || (n = {});
  var l = function() {
    a = n.leading === !1 ? 0 : ue(), r = null, o = t.apply(i, s), r || (i = s = null);
  }, u = function() {
    var p = ue();
    !a && n.leading === !1 && (a = p);
    var h = e - (p - a);
    return i = this, s = arguments, h <= 0 || h > e ? (r && (clearTimeout(r), r = null), a = p, o = t.apply(i, s), r || (i = s = null)) : !r && n.trailing !== !1 && (r = setTimeout(l, h)), o;
  };
  return u.cancel = function() {
    clearTimeout(r), a = 0, r = i = s = null;
  }, u;
}
function qc(t, e, n) {
  var r, i, s, o, a, l = function() {
    var p = ue() - i;
    e > p ? r = setTimeout(l, e - p) : (r = null, n || (o = t.apply(a, s)), r || (s = a = null));
  }, u = K(function(p) {
    return a = this, s = p, i = ue(), r || (r = setTimeout(l, e), n && (o = t.apply(a, s))), o;
  });
  return u.cancel = function() {
    clearTimeout(r), r = s = a = null;
  }, u;
}
function Kc(t, e) {
  return Yt(e, t);
}
function ir(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function zc() {
  var t = arguments, e = t.length - 1;
  return function() {
    for (var n = e, r = t[e].apply(this, arguments); n--; )
      r = t[n].call(this, r);
    return r;
  };
}
function Gc(t, e) {
  return function() {
    if (--t < 1)
      return e.apply(this, arguments);
  };
}
function ys(t, e) {
  var n;
  return function() {
    return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n;
  };
}
const Jc = Yt(ys, 2);
function ws(t, e, n) {
  e = G(e, n);
  for (var r = x(t), i, s = 0, o = r.length; s < o; s++)
    if (i = r[s], e(t[i], i, t))
      return i;
}
function bs(t) {
  return function(e, n, r) {
    n = G(n, r);
    for (var i = z(e), s = t > 0 ? 0 : i - 1; s >= 0 && s < i; s += t)
      if (n(e[s], s, e))
        return s;
    return -1;
  };
}
const Jt = bs(1), ks = bs(-1);
function Ss(t, e, n, r) {
  n = G(n, r, 1);
  for (var i = n(e), s = 0, o = z(t); s < o; ) {
    var a = Math.floor((s + o) / 2);
    n(t[a]) < i ? s = a + 1 : o = a;
  }
  return s;
}
function _s(t, e, n) {
  return function(r, i, s) {
    var o = 0, a = z(r);
    if (typeof s == "number")
      t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;
    else if (n && s && a)
      return s = n(r, i), r[s] === i ? s : -1;
    if (i !== i)
      return s = e(fe.call(r, o, a), Yi), s >= 0 ? s + o : -1;
    for (s = t > 0 ? o : a - 1; s >= 0 && s < a; s += t)
      if (r[s] === i)
        return s;
    return -1;
  };
}
const Cs = _s(1, Jt, Ss), Wc = _s(-1, ks);
function qe(t, e, n) {
  var r = W(t) ? Jt : ws, i = r(t, e, n);
  if (i !== void 0 && i !== -1)
    return t[i];
}
function Qc(t, e) {
  return qe(t, ce(e));
}
function ut(t, e, n) {
  e = de(e, n);
  var r, i;
  if (W(t))
    for (r = 0, i = t.length; r < i; r++)
      e(t[r], r, t);
  else {
    var s = x(t);
    for (r = 0, i = s.length; r < i; r++)
      e(t[s[r]], s[r], t);
  }
  return t;
}
function Nt(t, e, n) {
  e = G(e, n);
  for (var r = !W(t) && x(t), i = (r || t).length, s = Array(i), o = 0; o < i; o++) {
    var a = r ? r[o] : o;
    s[o] = e(t[a], a, t);
  }
  return s;
}
function xs(t) {
  var e = function(n, r, i, s) {
    var o = !W(n) && x(n), a = (o || n).length, l = t > 0 ? 0 : a - 1;
    for (s || (i = n[o ? o[l] : l], l += t); l >= 0 && l < a; l += t) {
      var u = o ? o[l] : l;
      i = r(i, n[u], u, n);
    }
    return i;
  };
  return function(n, r, i, s) {
    var o = arguments.length >= 3;
    return e(n, de(r, s, 4), i, o);
  };
}
const wn = xs(1), mi = xs(-1);
function Wt(t, e, n) {
  var r = [];
  return e = G(e, n), ut(t, function(i, s, o) {
    e(i, s, o) && r.push(i);
  }), r;
}
function Yc(t, e, n) {
  return Wt(t, ir(G(e)), n);
}
function Ii(t, e, n) {
  e = G(e, n);
  for (var r = !W(t) && x(t), i = (r || t).length, s = 0; s < i; s++) {
    var o = r ? r[s] : s;
    if (!e(t[o], o, t))
      return !1;
  }
  return !0;
}
function vi(t, e, n) {
  e = G(e, n);
  for (var r = !W(t) && x(t), i = (r || t).length, s = 0; s < i; s++) {
    var o = r ? r[s] : s;
    if (e(t[o], o, t))
      return !0;
  }
  return !1;
}
function ct(t, e, n, r) {
  return W(t) || (t = Qt(t)), (typeof n != "number" || r) && (n = 0), Cs(t, e, n) >= 0;
}
const jc = K(function(t, e, n) {
  var r, i;
  return B(e) ? i = e : (e = pe(e), r = e.slice(0, -1), e = e[e.length - 1]), Nt(t, function(s) {
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
  return Nt(t, nr(e));
}
function Xc(t, e) {
  return Wt(t, ce(e));
}
function Es(t, e, n) {
  var r = -1 / 0, i = -1 / 0, s, o;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = W(t) ? t : Qt(t);
    for (var a = 0, l = t.length; a < l; a++)
      s = t[a], s != null && s > r && (r = s);
  } else
    e = G(e, n), ut(t, function(u, p, h) {
      o = e(u, p, h), (o > i || o === -1 / 0 && r === -1 / 0) && (r = u, i = o);
    });
  return r;
}
function Zc(t, e, n) {
  var r = 1 / 0, i = 1 / 0, s, o;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = W(t) ? t : Qt(t);
    for (var a = 0, l = t.length; a < l; a++)
      s = t[a], s != null && s < r && (r = s);
  } else
    e = G(e, n), ut(t, function(u, p, h) {
      o = e(u, p, h), (o < i || o === 1 / 0 && r === 1 / 0) && (r = u, i = o);
    });
  return r;
}
var tu = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function Ns(t) {
  return t ? Ot(t) ? fe.call(t) : Jn(t) ? t.match(tu) : W(t) ? Nt(t, er) : Qt(t) : [];
}
function Ps(t, e, n) {
  if (e == null || n)
    return W(t) || (t = Qt(t)), t[Mn(t.length - 1)];
  var r = Ns(t), i = z(r);
  e = Math.max(Math.min(e, i), 0);
  for (var s = i - 1, o = 0; o < e; o++) {
    var a = Mn(o, s), l = r[o];
    r[o] = r[a], r[a] = l;
  }
  return r.slice(0, e);
}
function eu(t) {
  return Ps(t, 1 / 0);
}
function nu(t, e, n) {
  var r = 0;
  return e = G(e, n), sr(Nt(t, function(i, s, o) {
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
function Xe(t, e) {
  return function(n, r, i) {
    var s = e ? [[], []] : {};
    return r = G(r, i), ut(n, function(o, a) {
      var l = r(o, a, n);
      t(s, o, l);
    }), s;
  };
}
const ru = Xe(function(t, e, n) {
  vt(t, n) ? t[n].push(e) : t[n] = [e];
}), iu = Xe(function(t, e, n) {
  t[n] = e;
}), su = Xe(function(t, e, n) {
  vt(t, n) ? t[n]++ : t[n] = 1;
}), ou = Xe(function(t, e, n) {
  t[n ? 0 : 1].push(e);
}, !0);
function au(t) {
  return t == null ? 0 : W(t) ? t.length : x(t).length;
}
function cu(t, e, n) {
  return e in n;
}
const As = K(function(t, e) {
  var n = {}, r = e[0];
  if (t == null)
    return n;
  B(r) ? (e.length > 1 && (r = de(r, e[1])), e = he(t)) : (r = cu, e = Mt(e, !1, !1), t = Object(t));
  for (var i = 0, s = e.length; i < s; i++) {
    var o = e[i], a = t[o];
    r(a, o, t) && (n[o] = a);
  }
  return n;
}), uu = K(function(t, e) {
  var n = e[0], r;
  return B(n) ? (n = ir(n), e.length > 1 && (r = e[1])) : (e = Nt(Mt(e, !1, !1), String), n = function(i, s) {
    return !ct(e, s);
  }), As(t, n, r);
});
function Os(t, e, n) {
  return fe.call(t, 0, Math.max(0, t.length - (e == null || n ? 1 : e)));
}
function bn(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[0] : Os(t, t.length - e);
}
function Be(t, e, n) {
  return fe.call(t, e == null || n ? 1 : e);
}
function lu(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[t.length - 1] : Be(t, Math.max(0, t.length - e));
}
function fu(t) {
  return Wt(t, Boolean);
}
function hu(t, e) {
  return Mt(t, e, !1);
}
const Ms = K(function(t, e) {
  return e = Mt(e, !0, !0), Wt(t, function(n) {
    return !ct(e, n);
  });
}), pu = K(function(t, e) {
  return Ms(t, e);
});
function Vn(t, e, n, r) {
  qi(e) || (r = n, n = e, e = !1), n != null && (n = G(n, r));
  for (var i = [], s = [], o = 0, a = z(t); o < a; o++) {
    var l = t[o], u = n ? n(l, o, t) : l;
    e && !n ? ((!o || s !== u) && i.push(l), s = u) : n ? ct(s, u) || (s.push(u), i.push(l)) : ct(i, l) || i.push(l);
  }
  return i;
}
const du = K(function(t) {
  return Vn(Mt(t, !0, !0));
});
function gu(t) {
  for (var e = [], n = arguments.length, r = 0, i = z(t); r < i; r++) {
    var s = t[r];
    if (!ct(e, s)) {
      var o;
      for (o = 1; o < n && ct(arguments[o], s); o++)
        ;
      o === n && e.push(s);
    }
  }
  return e;
}
function Rn(t) {
  for (var e = t && Es(t, z).length || 0, n = Array(e), r = 0; r < e; r++)
    n[r] = sr(t, r);
  return n;
}
const mu = K(Rn);
function Iu(t, e) {
  for (var n = {}, r = 0, i = z(t); r < i; r++)
    e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
  return n;
}
function vu(t, e, n) {
  e == null && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);
  for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), s = 0; s < r; s++, t += n)
    i[s] = t;
  return i;
}
function Tu(t, e) {
  if (e == null || e < 1)
    return [];
  for (var n = [], r = 0, i = t.length; r < i; )
    n.push(fe.call(t, r, r += e));
  return n;
}
function or(t, e) {
  return t._chain ? T(e).chain() : e;
}
function Vs(t) {
  return ut(On(t), function(e) {
    var n = T[e] = t[e];
    T.prototype[e] = function() {
      var r = [this._wrapped];
      return qa.apply(r, arguments), or(this, n.apply(T, r));
    };
  }), T;
}
ut(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
  var e = je[t];
  T.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (e.apply(n, arguments), (t === "shift" || t === "splice") && n.length === 0 && delete n[0]), or(this, n);
  };
});
ut(["concat", "join", "slice"], function(t) {
  var e = je[t];
  T.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (n = e.apply(n, arguments)), or(this, n);
  };
});
const yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: Di,
  restArguments: K,
  isObject: At,
  isNull: Ya,
  isUndefined: Hi,
  isBoolean: qi,
  isElement: ja,
  isString: Jn,
  isNumber: Ki,
  isDate: Xa,
  isRegExp: Za,
  isError: tc,
  isSymbol: zi,
  isArrayBuffer: Gi,
  isDataView: $e,
  isArray: Ot,
  isFunction: B,
  isArguments: Qn,
  isFinite: ic,
  isNaN: Yi,
  isTypedArray: ts,
  isEmpty: uc,
  isMatch: ns,
  isEqual: lc,
  isMap: pc,
  isWeakMap: dc,
  isSet: gc,
  isWeakSet: mc,
  keys: x,
  allKeys: he,
  values: Qt,
  pairs: Ic,
  invert: as,
  functions: On,
  methods: On,
  extend: cs,
  extendOwn: He,
  assign: He,
  defaults: us,
  create: Tc,
  clone: yc,
  tap: wc,
  get: hs,
  has: bc,
  mapObject: kc,
  identity: er,
  constant: ji,
  noop: ds,
  toPath: fs,
  property: nr,
  propertyOf: Sc,
  matcher: ce,
  matches: ce,
  times: _c,
  random: Mn,
  now: ue,
  escape: Cc,
  unescape: Ec,
  templateSettings: Nc,
  template: Vc,
  result: Rc,
  uniqueId: Fc,
  chain: Bc,
  iteratee: rr,
  partial: Yt,
  bind: vs,
  bindAll: Dc,
  memoize: $c,
  delay: Ts,
  defer: Lc,
  throttle: Hc,
  debounce: qc,
  wrap: Kc,
  negate: ir,
  compose: zc,
  after: Gc,
  before: ys,
  once: Jc,
  findKey: ws,
  findIndex: Jt,
  findLastIndex: ks,
  sortedIndex: Ss,
  indexOf: Cs,
  lastIndexOf: Wc,
  find: qe,
  detect: qe,
  findWhere: Qc,
  each: ut,
  forEach: ut,
  map: Nt,
  collect: Nt,
  reduce: wn,
  foldl: wn,
  inject: wn,
  reduceRight: mi,
  foldr: mi,
  filter: Wt,
  select: Wt,
  reject: Yc,
  every: Ii,
  all: Ii,
  some: vi,
  any: vi,
  contains: ct,
  includes: ct,
  include: ct,
  invoke: jc,
  pluck: sr,
  where: Xc,
  max: Es,
  min: Zc,
  shuffle: eu,
  sample: Ps,
  sortBy: nu,
  groupBy: ru,
  indexBy: iu,
  countBy: su,
  partition: ou,
  toArray: Ns,
  size: au,
  pick: As,
  omit: uu,
  first: bn,
  head: bn,
  take: bn,
  initial: Os,
  last: lu,
  rest: Be,
  tail: Be,
  drop: Be,
  compact: fu,
  flatten: hu,
  without: pu,
  uniq: Vn,
  unique: Vn,
  union: du,
  intersection: gu,
  difference: Ms,
  unzip: Rn,
  transpose: Rn,
  zip: mu,
  object: Iu,
  range: vu,
  chunk: Tu,
  mixin: Vs,
  default: T
}, Symbol.toStringTag, { value: "Module" }));
var P = Vs(yu);
P._ = P;
let Ze = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
class Rs {
  instanceIdInternal = Rs.generatePluginIdInternal();
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
    for (const e of x(this.params()))
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
      case R.Input:
      case R.Pitch:
      case R.Slider:
      case R.TrackSelector:
      case R.Select:
      case R.SelectList:
      case R.Switch:
      case R.InputNumber:
      case R.FileSelector:
        return !0;
      case R.MultiTrackSelector:
        return n.length > 0;
      case R.TrackPitchSelector:
        return n.track !== void 0 && n.track !== null && n.pitch !== void 0 && n.pitch !== null;
      case R.InstrumentSelector:
        return n.program !== void 0 && n.program !== null && n.isDrum !== void 0 && n.isDrum !== null;
      case R.MultiSourceAudioSelector:
        return n != null && n.audioInfo !== void 0 && n.audioInfo !== null;
      case R.None:
        return n != null;
      default:
        throw new Error(
          `Param nullness check needs to be implemented for widget type ${i}. Either use default nullness check or define custom logic.`
        );
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
    for (const e of x(this.params())) {
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
    return Ze(10);
  }
}
class bh {
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
function wu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], l = n !== void 0 ? n(a, e) : a - e;
    l >= 0 ? (s = o, i = o - 1) : r = o + 1;
  }
  return s;
}
function bu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], l = n !== void 0 ? n(a, e) : a - e;
    l > 0 ? (s = o, i = o - 1) : r = o + 1;
  }
  return s;
}
function ku(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], l = n !== void 0 ? n(a, e) : a - e;
    l < 0 ? (s = o, r = o + 1) : i = o - 1;
  }
  return s;
}
function Su(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], l = n !== void 0 ? n(a, e) : a - e;
    l <= 0 ? (s = o, r = o + 1) : i = o - 1;
  }
  return s;
}
function _u(t, e, n, r, i) {
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
var S = {
  ge: function(t, e, n, r, i) {
    return te(t, e, n, r, i, wu);
  },
  gt: function(t, e, n, r, i) {
    return te(t, e, n, r, i, bu);
  },
  lt: function(t, e, n, r, i) {
    return te(t, e, n, r, i, ku);
  },
  le: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Su);
  },
  eq: function(t, e, n, r, i) {
    return te(t, e, n, r, i, _u);
  }
}, Un = { exports: {} };
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", o = "[object Array]", a = "[object Boolean]", l = "[object Date]", u = "[object Error]", p = "[object Function]", h = "[object GeneratorFunction]", g = "[object Map]", I = "[object Number]", v = "[object Object]", w = "[object Promise]", J = "[object RegExp]", A = "[object Set]", cn = "[object String]", k = "[object Symbol]", jt = "[object WeakMap]", ve = "[object ArrayBuffer]", Te = "[object DataView]", Er = "[object Float32Array]", Nr = "[object Float64Array]", Pr = "[object Int8Array]", Ar = "[object Int16Array]", Or = "[object Int32Array]", Mr = "[object Uint8Array]", Vr = "[object Uint8ClampedArray]", Rr = "[object Uint16Array]", Ur = "[object Uint32Array]", To = /[\\^$.*+?()[\]{}|]/g, yo = /\w*$/, wo = /^\[object .+?Constructor\]$/, bo = /^(?:0|[1-9]\d*)$/, b = {};
  b[s] = b[o] = b[ve] = b[Te] = b[a] = b[l] = b[Er] = b[Nr] = b[Pr] = b[Ar] = b[Or] = b[g] = b[I] = b[v] = b[J] = b[A] = b[cn] = b[k] = b[Mr] = b[Vr] = b[Rr] = b[Ur] = !0, b[u] = b[p] = b[jt] = !1;
  var ko = typeof X == "object" && X && X.Object === Object && X, So = typeof self == "object" && self && self.Object === Object && self, st = ko || So || Function("return this")(), Fr = e && !e.nodeType && e, Br = Fr && !0 && t && !t.nodeType && t, _o = Br && Br.exports === Fr;
  function Co(c, f) {
    return c.set(f[0], f[1]), c;
  }
  function xo(c, f) {
    return c.add(f), c;
  }
  function Eo(c, f) {
    for (var d = -1, m = c ? c.length : 0; ++d < m && f(c[d], d, c) !== !1; )
      ;
    return c;
  }
  function No(c, f) {
    for (var d = -1, m = f.length, N = c.length; ++d < m; )
      c[N + d] = f[d];
    return c;
  }
  function Dr(c, f, d, m) {
    var N = -1, M = c ? c.length : 0;
    for (m && M && (d = c[++N]); ++N < M; )
      d = f(d, c[N], N, c);
    return d;
  }
  function Po(c, f) {
    for (var d = -1, m = Array(c); ++d < c; )
      m[d] = f(d);
    return m;
  }
  function Ao(c, f) {
    return c == null ? void 0 : c[f];
  }
  function $r(c) {
    var f = !1;
    if (c != null && typeof c.toString != "function")
      try {
        f = !!(c + "");
      } catch {
      }
    return f;
  }
  function Lr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(m, N) {
      d[++f] = [N, m];
    }), d;
  }
  function un(c, f) {
    return function(d) {
      return c(f(d));
    };
  }
  function Hr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(m) {
      d[++f] = m;
    }), d;
  }
  var Oo = Array.prototype, Mo = Function.prototype, ye = Object.prototype, ln = st["__core-js_shared__"], qr = function() {
    var c = /[^.]+$/.exec(ln && ln.keys && ln.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Kr = Mo.toString, lt = ye.hasOwnProperty, we = ye.toString, Vo = RegExp(
    "^" + Kr.call(lt).replace(To, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), zr = _o ? st.Buffer : void 0, Gr = st.Symbol, Jr = st.Uint8Array, Ro = un(Object.getPrototypeOf, Object), Uo = Object.create, Fo = ye.propertyIsEnumerable, Bo = Oo.splice, Wr = Object.getOwnPropertySymbols, Do = zr ? zr.isBuffer : void 0, $o = un(Object.keys, Object), fn = Ut(st, "DataView"), Xt = Ut(st, "Map"), hn = Ut(st, "Promise"), pn = Ut(st, "Set"), dn = Ut(st, "WeakMap"), Zt = Ut(Object, "create"), Lo = wt(fn), Ho = wt(Xt), qo = wt(hn), Ko = wt(pn), zo = wt(dn), Qr = Gr ? Gr.prototype : void 0, Yr = Qr ? Qr.valueOf : void 0;
  function Tt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function Go() {
    this.__data__ = Zt ? Zt(null) : {};
  }
  function Jo(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function Wo(c) {
    var f = this.__data__;
    if (Zt) {
      var d = f[c];
      return d === r ? void 0 : d;
    }
    return lt.call(f, c) ? f[c] : void 0;
  }
  function Qo(c) {
    var f = this.__data__;
    return Zt ? f[c] !== void 0 : lt.call(f, c);
  }
  function Yo(c, f) {
    var d = this.__data__;
    return d[c] = Zt && f === void 0 ? r : f, this;
  }
  Tt.prototype.clear = Go, Tt.prototype.delete = Jo, Tt.prototype.get = Wo, Tt.prototype.has = Qo, Tt.prototype.set = Yo;
  function ot(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function jo() {
    this.__data__ = [];
  }
  function Xo(c) {
    var f = this.__data__, d = be(f, c);
    if (d < 0)
      return !1;
    var m = f.length - 1;
    return d == m ? f.pop() : Bo.call(f, d, 1), !0;
  }
  function Zo(c) {
    var f = this.__data__, d = be(f, c);
    return d < 0 ? void 0 : f[d][1];
  }
  function ta(c) {
    return be(this.__data__, c) > -1;
  }
  function ea(c, f) {
    var d = this.__data__, m = be(d, c);
    return m < 0 ? d.push([c, f]) : d[m][1] = f, this;
  }
  ot.prototype.clear = jo, ot.prototype.delete = Xo, ot.prototype.get = Zo, ot.prototype.has = ta, ot.prototype.set = ea;
  function Vt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function na() {
    this.__data__ = {
      hash: new Tt(),
      map: new (Xt || ot)(),
      string: new Tt()
    };
  }
  function ra(c) {
    return ke(this, c).delete(c);
  }
  function ia(c) {
    return ke(this, c).get(c);
  }
  function sa(c) {
    return ke(this, c).has(c);
  }
  function oa(c, f) {
    return ke(this, c).set(c, f), this;
  }
  Vt.prototype.clear = na, Vt.prototype.delete = ra, Vt.prototype.get = ia, Vt.prototype.has = sa, Vt.prototype.set = oa;
  function Rt(c) {
    this.__data__ = new ot(c);
  }
  function aa() {
    this.__data__ = new ot();
  }
  function ca(c) {
    return this.__data__.delete(c);
  }
  function ua(c) {
    return this.__data__.get(c);
  }
  function la(c) {
    return this.__data__.has(c);
  }
  function fa(c, f) {
    var d = this.__data__;
    if (d instanceof ot) {
      var m = d.__data__;
      if (!Xt || m.length < n - 1)
        return m.push([c, f]), this;
      d = this.__data__ = new Vt(m);
    }
    return d.set(c, f), this;
  }
  Rt.prototype.clear = aa, Rt.prototype.delete = ca, Rt.prototype.get = ua, Rt.prototype.has = la, Rt.prototype.set = fa;
  function ha(c, f) {
    var d = In(c) || Ua(c) ? Po(c.length, String) : [], m = d.length, N = !!m;
    for (var M in c)
      (f || lt.call(c, M)) && !(N && (M == "length" || Oa(M, m))) && d.push(M);
    return d;
  }
  function jr(c, f, d) {
    var m = c[f];
    (!(lt.call(c, f) && ei(m, d)) || d === void 0 && !(f in c)) && (c[f] = d);
  }
  function be(c, f) {
    for (var d = c.length; d--; )
      if (ei(c[d][0], f))
        return d;
    return -1;
  }
  function pa(c, f) {
    return c && Xr(f, vn(f), c);
  }
  function gn(c, f, d, m, N, M, Q) {
    var L;
    if (m && (L = M ? m(c, N, M, Q) : m(c)), L !== void 0)
      return L;
    if (!Se(c))
      return c;
    var ii = In(c);
    if (ii) {
      if (L = Na(c), !f)
        return Ca(c, L);
    } else {
      var Ft = yt(c), si = Ft == p || Ft == h;
      if (Ba(c))
        return Ta(c, f);
      if (Ft == v || Ft == s || si && !M) {
        if ($r(c))
          return M ? c : {};
        if (L = Pa(si ? {} : c), !f)
          return xa(c, pa(L, c));
      } else {
        if (!b[Ft])
          return M ? c : {};
        L = Aa(c, Ft, gn, f);
      }
    }
    Q || (Q = new Rt());
    var oi = Q.get(c);
    if (oi)
      return oi;
    if (Q.set(c, L), !ii)
      var ai = d ? Ea(c) : vn(c);
    return Eo(ai || c, function(Tn, _e) {
      ai && (_e = Tn, Tn = c[_e]), jr(L, _e, gn(Tn, f, d, m, _e, c, Q));
    }), L;
  }
  function da(c) {
    return Se(c) ? Uo(c) : {};
  }
  function ga(c, f, d) {
    var m = f(c);
    return In(c) ? m : No(m, d(c));
  }
  function ma(c) {
    return we.call(c);
  }
  function Ia(c) {
    if (!Se(c) || Va(c))
      return !1;
    var f = ri(c) || $r(c) ? Vo : wo;
    return f.test(wt(c));
  }
  function va(c) {
    if (!ti(c))
      return $o(c);
    var f = [];
    for (var d in Object(c))
      lt.call(c, d) && d != "constructor" && f.push(d);
    return f;
  }
  function Ta(c, f) {
    if (f)
      return c.slice();
    var d = new c.constructor(c.length);
    return c.copy(d), d;
  }
  function mn(c) {
    var f = new c.constructor(c.byteLength);
    return new Jr(f).set(new Jr(c)), f;
  }
  function ya(c, f) {
    var d = f ? mn(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.byteLength);
  }
  function wa(c, f, d) {
    var m = f ? d(Lr(c), !0) : Lr(c);
    return Dr(m, Co, new c.constructor());
  }
  function ba(c) {
    var f = new c.constructor(c.source, yo.exec(c));
    return f.lastIndex = c.lastIndex, f;
  }
  function ka(c, f, d) {
    var m = f ? d(Hr(c), !0) : Hr(c);
    return Dr(m, xo, new c.constructor());
  }
  function Sa(c) {
    return Yr ? Object(Yr.call(c)) : {};
  }
  function _a(c, f) {
    var d = f ? mn(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.length);
  }
  function Ca(c, f) {
    var d = -1, m = c.length;
    for (f || (f = Array(m)); ++d < m; )
      f[d] = c[d];
    return f;
  }
  function Xr(c, f, d, m) {
    d || (d = {});
    for (var N = -1, M = f.length; ++N < M; ) {
      var Q = f[N], L = m ? m(d[Q], c[Q], Q, d, c) : void 0;
      jr(d, Q, L === void 0 ? c[Q] : L);
    }
    return d;
  }
  function xa(c, f) {
    return Xr(c, Zr(c), f);
  }
  function Ea(c) {
    return ga(c, vn, Zr);
  }
  function ke(c, f) {
    var d = c.__data__;
    return Ma(f) ? d[typeof f == "string" ? "string" : "hash"] : d.map;
  }
  function Ut(c, f) {
    var d = Ao(c, f);
    return Ia(d) ? d : void 0;
  }
  var Zr = Wr ? un(Wr, Object) : La, yt = ma;
  (fn && yt(new fn(new ArrayBuffer(1))) != Te || Xt && yt(new Xt()) != g || hn && yt(hn.resolve()) != w || pn && yt(new pn()) != A || dn && yt(new dn()) != jt) && (yt = function(c) {
    var f = we.call(c), d = f == v ? c.constructor : void 0, m = d ? wt(d) : void 0;
    if (m)
      switch (m) {
        case Lo:
          return Te;
        case Ho:
          return g;
        case qo:
          return w;
        case Ko:
          return A;
        case zo:
          return jt;
      }
    return f;
  });
  function Na(c) {
    var f = c.length, d = c.constructor(f);
    return f && typeof c[0] == "string" && lt.call(c, "index") && (d.index = c.index, d.input = c.input), d;
  }
  function Pa(c) {
    return typeof c.constructor == "function" && !ti(c) ? da(Ro(c)) : {};
  }
  function Aa(c, f, d, m) {
    var N = c.constructor;
    switch (f) {
      case ve:
        return mn(c);
      case a:
      case l:
        return new N(+c);
      case Te:
        return ya(c, m);
      case Er:
      case Nr:
      case Pr:
      case Ar:
      case Or:
      case Mr:
      case Vr:
      case Rr:
      case Ur:
        return _a(c, m);
      case g:
        return wa(c, m, d);
      case I:
      case cn:
        return new N(c);
      case J:
        return ba(c);
      case A:
        return ka(c, m, d);
      case k:
        return Sa(c);
    }
  }
  function Oa(c, f) {
    return f = f ?? i, !!f && (typeof c == "number" || bo.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function Ma(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function Va(c) {
    return !!qr && qr in c;
  }
  function ti(c) {
    var f = c && c.constructor, d = typeof f == "function" && f.prototype || ye;
    return c === d;
  }
  function wt(c) {
    if (c != null) {
      try {
        return Kr.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Ra(c) {
    return gn(c, !0, !0);
  }
  function ei(c, f) {
    return c === f || c !== c && f !== f;
  }
  function Ua(c) {
    return Fa(c) && lt.call(c, "callee") && (!Fo.call(c, "callee") || we.call(c) == s);
  }
  var In = Array.isArray;
  function ni(c) {
    return c != null && Da(c.length) && !ri(c);
  }
  function Fa(c) {
    return $a(c) && ni(c);
  }
  var Ba = Do || Ha;
  function ri(c) {
    var f = Se(c) ? we.call(c) : "";
    return f == p || f == h;
  }
  function Da(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function Se(c) {
    var f = typeof c;
    return !!c && (f == "object" || f == "function");
  }
  function $a(c) {
    return !!c && typeof c == "object";
  }
  function vn(c) {
    return ni(c) ? ha(c) : va(c);
  }
  function La() {
    return [];
  }
  function Ha() {
    return !1;
  }
  t.exports = Ra;
})(Un, Un.exports);
const Ti = Un.exports;
class Ce {
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
class yi {
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
function Cu(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function ar(t) {
  if (_(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = nt(r) ? Pu(r) : ar(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else {
    if (nt(t))
      return t;
    if (q(t))
      return t;
  }
}
const xu = /;(?![^(]*\))/g, Eu = /:([^]+)/, Nu = /\/\*.*?\*\//gs;
function Pu(t) {
  const e = {};
  return t.replace(Nu, "").split(xu).forEach((n) => {
    if (n) {
      const r = n.split(Eu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function cr(t) {
  let e = "";
  if (nt(t))
    e = t;
  else if (_(t))
    for (let n = 0; n < t.length; n++) {
      const r = cr(t[n]);
      r && (e += r + " ");
    }
  else if (q(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const it = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const ur = () => {
}, Au = () => !1, Ou = /^on[^a-z]/, Mu = (t) => Ou.test(t), et = Object.assign, Vu = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Ru = Object.prototype.hasOwnProperty, C = (t, e) => Ru.call(t, e), _ = Array.isArray, qt = (t) => tn(t) === "[object Map]", Uu = (t) => tn(t) === "[object Set]", D = (t) => typeof t == "function", nt = (t) => typeof t == "string", lr = (t) => typeof t == "symbol", q = (t) => t !== null && typeof t == "object", Fu = (t) => q(t) && D(t.then) && D(t.catch), Bu = Object.prototype.toString, tn = (t) => Bu.call(t), Us = (t) => tn(t).slice(8, -1), Du = (t) => tn(t) === "[object Object]", fr = (t) => nt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, $u = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, kh = $u((t) => t.charAt(0).toUpperCase() + t.slice(1)), Ke = (t, e) => !Object.is(t, e), Lu = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Hu = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let wi;
const qu = () => wi || (wi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function bi(t, ...e) {
}
let Ku;
function zu(t, e = Ku) {
  e && e.active && e.effects.push(t);
}
const Fn = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Fs = (t) => (t.w & mt) > 0, Bs = (t) => (t.n & mt) > 0, Gu = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= mt;
}, Ju = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      Fs(i) && !Bs(i) ? i.delete(t) : e[n++] = i, i.w &= ~mt, i.n &= ~mt;
    }
    e.length = n;
  }
}, Bn = /* @__PURE__ */ new WeakMap();
let ne = 0, mt = 1;
const Dn = 30;
let H;
const St = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), $n = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Wu {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, zu(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = H, n = _t;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = H, H = this, _t = !0, mt = 1 << ++ne, ne <= Dn ? Gu(this) : ki(this), this.fn();
    } finally {
      ne <= Dn && Ju(this), mt = 1 << --ne, H = this.parent, _t = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    H === this ? this.deferStop = !0 : this.active && (ki(this), this.onStop && this.onStop(), this.active = !1);
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
let _t = !0;
const Ds = [];
function $s() {
  Ds.push(_t), _t = !1;
}
function Ls() {
  const t = Ds.pop();
  _t = t === void 0 ? !0 : t;
}
function Z(t, e, n) {
  if (_t && H) {
    let r = Bn.get(t);
    r || Bn.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Fn());
    const s = process.env.NODE_ENV !== "production" ? { effect: H, target: t, type: e, key: n } : void 0;
    Qu(i, s);
  }
}
function Qu(t, e) {
  let n = !1;
  ne <= Dn ? Bs(t) || (t.n |= mt, n = !Fs(t)) : n = !t.has(H), n && (t.add(H), H.deps.push(t), process.env.NODE_ENV !== "production" && H.onTrack && H.onTrack(Object.assign({ effect: H }, e)));
}
function It(t, e, n, r, i, s) {
  const o = Bn.get(t);
  if (!o)
    return;
  let a = [];
  if (e === "clear")
    a = [...o.values()];
  else if (n === "length" && _(t)) {
    const u = Hu(r);
    o.forEach((p, h) => {
      (h === "length" || h >= u) && a.push(p);
    });
  } else
    switch (n !== void 0 && a.push(o.get(n)), e) {
      case "add":
        _(t) ? fr(n) && a.push(o.get("length")) : (a.push(o.get(St)), qt(t) && a.push(o.get($n)));
        break;
      case "delete":
        _(t) || (a.push(o.get(St)), qt(t) && a.push(o.get($n)));
        break;
      case "set":
        qt(t) && a.push(o.get(St));
        break;
    }
  const l = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (a.length === 1)
    a[0] && (process.env.NODE_ENV !== "production" ? xe(a[0], l) : xe(a[0]));
  else {
    const u = [];
    for (const p of a)
      p && u.push(...p);
    process.env.NODE_ENV !== "production" ? xe(Fn(u), l) : xe(Fn(u));
  }
}
function xe(t, e) {
  const n = _(t) ? t : [...t];
  for (const r of n)
    r.computed && Si(r, e);
  for (const r of n)
    r.computed || Si(r, e);
}
function Si(t, e) {
  (t !== H || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(et({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Yu = /* @__PURE__ */ Cu("__proto__,__v_isRef,__isVue"), Hs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(lr)
), ju = /* @__PURE__ */ hr(), Xu = /* @__PURE__ */ hr(!0), Zu = /* @__PURE__ */ hr(!0, !0), _i = /* @__PURE__ */ tl();
function tl() {
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
      $s();
      const r = y(this)[e].apply(this, n);
      return Ls(), r;
    };
  }), t;
}
function hr(t = !1, e = !1) {
  return function(r, i, s) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_isShallow")
      return e;
    if (i === "__v_raw" && s === (t ? e ? Js : Gs : e ? ml : zs).get(r))
      return r;
    const o = _(r);
    if (!t && o && C(_i, i))
      return Reflect.get(_i, i, s);
    const a = Reflect.get(r, i, s);
    return (lr(i) ? Hs.has(i) : Yu(i)) || (t || Z(r, "get", i), e) ? a : F(a) ? o && fr(i) ? a : a.value : q(a) ? t ? Qs(a) : Ws(a) : a;
  };
}
const el = /* @__PURE__ */ nl();
function nl(t = !1) {
  return function(n, r, i, s) {
    let o = n[r];
    if (Pt(o) && F(o) && !F(i))
      return !1;
    if (!t && (!Ln(i) && !Pt(i) && (o = y(o), i = y(i)), !_(n) && F(o) && !F(i)))
      return o.value = i, !0;
    const a = _(n) && fr(r) ? Number(r) < n.length : C(n, r), l = Reflect.set(n, r, i, s);
    return n === y(s) && (a ? Ke(i, o) && It(n, "set", r, i, o) : It(n, "add", r, i)), l;
  };
}
function rl(t, e) {
  const n = C(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && It(t, "delete", e, void 0, r), i;
}
function il(t, e) {
  const n = Reflect.has(t, e);
  return (!lr(e) || !Hs.has(e)) && Z(t, "has", e), n;
}
function sl(t) {
  return Z(t, "iterate", _(t) ? "length" : St), Reflect.ownKeys(t);
}
const ol = {
  get: ju,
  set: el,
  deleteProperty: rl,
  has: il,
  ownKeys: sl
}, qs = {
  get: Xu,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && bi(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && bi(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, al = /* @__PURE__ */ et({}, qs, {
  get: Zu
}), pr = (t) => t, en = (t) => Reflect.getPrototypeOf(t);
function Ee(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = y(t), s = y(e);
  n || (e !== s && Z(i, "get", e), Z(i, "get", s));
  const { has: o } = en(i), a = r ? pr : n ? Ir : mr;
  if (o.call(i, e))
    return a(t.get(e));
  if (o.call(i, s))
    return a(t.get(s));
  t !== i && t.get(e);
}
function Ne(t, e = !1) {
  const n = this.__v_raw, r = y(n), i = y(t);
  return e || (t !== i && Z(r, "has", t), Z(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Pe(t, e = !1) {
  return t = t.__v_raw, !e && Z(y(t), "iterate", St), Reflect.get(t, "size", t);
}
function Ci(t) {
  t = y(t);
  const e = y(this);
  return en(e).has.call(e, t) || (e.add(t), It(e, "add", t, t)), this;
}
function xi(t, e) {
  e = y(e);
  const n = y(this), { has: r, get: i } = en(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Ks(n, r, t) : (t = y(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? Ke(e, o) && It(n, "set", t, e, o) : It(n, "add", t, e), this;
}
function Ei(t) {
  const e = y(this), { has: n, get: r } = en(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Ks(e, n, t) : (t = y(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, o = e.delete(t);
  return i && It(e, "delete", t, void 0, s), o;
}
function Ni() {
  const t = y(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? qt(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && It(t, "clear", void 0, void 0, n), r;
}
function Ae(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, a = y(o), l = e ? pr : t ? Ir : mr;
    return !t && Z(a, "iterate", St), o.forEach((u, p) => r.call(i, l(u), l(p), s));
  };
}
function Oe(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = y(i), o = qt(s), a = t === "entries" || t === Symbol.iterator && o, l = t === "keys" && o, u = i[t](...r), p = n ? pr : e ? Ir : mr;
    return !e && Z(s, "iterate", l ? $n : St), {
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
function cl() {
  const t = {
    get(s) {
      return Ee(this, s);
    },
    get size() {
      return Pe(this);
    },
    has: Ne,
    add: Ci,
    set: xi,
    delete: Ei,
    clear: Ni,
    forEach: Ae(!1, !1)
  }, e = {
    get(s) {
      return Ee(this, s, !1, !0);
    },
    get size() {
      return Pe(this);
    },
    has: Ne,
    add: Ci,
    set: xi,
    delete: Ei,
    clear: Ni,
    forEach: Ae(!1, !0)
  }, n = {
    get(s) {
      return Ee(this, s, !0);
    },
    get size() {
      return Pe(this, !0);
    },
    has(s) {
      return Ne.call(this, s, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: Ae(!0, !1)
  }, r = {
    get(s) {
      return Ee(this, s, !0, !0);
    },
    get size() {
      return Pe(this, !0);
    },
    has(s) {
      return Ne.call(this, s, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: Ae(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = Oe(s, !1, !1), n[s] = Oe(s, !0, !1), e[s] = Oe(s, !1, !0), r[s] = Oe(s, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
const [ul, ll, fl, hl] = /* @__PURE__ */ cl();
function dr(t, e) {
  const n = e ? t ? hl : fl : t ? ll : ul;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(C(n, i) && i in r ? n : r, i, s);
}
const pl = {
  get: /* @__PURE__ */ dr(!1, !1)
}, dl = {
  get: /* @__PURE__ */ dr(!0, !1)
}, gl = {
  get: /* @__PURE__ */ dr(!0, !0)
};
function Ks(t, e, n) {
  const r = y(n);
  if (r !== n && e.call(t, r)) {
    const i = Us(t);
  }
}
const zs = /* @__PURE__ */ new WeakMap(), ml = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap();
function Il(t) {
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
function vl(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Il(Us(t));
}
function Ws(t) {
  return Pt(t) ? t : gr(t, !1, ol, pl, zs);
}
function Qs(t) {
  return gr(t, !0, qs, dl, Gs);
}
function Me(t) {
  return gr(t, !0, al, gl, Js);
}
function gr(t, e, n, r, i) {
  if (!q(t))
    return process.env.NODE_ENV, t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = vl(t);
  if (o === 0)
    return t;
  const a = new Proxy(t, o === 2 ? r : n);
  return i.set(t, a), a;
}
function Ct(t) {
  return Pt(t) ? Ct(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Pt(t) {
  return !!(t && t.__v_isReadonly);
}
function Ln(t) {
  return !!(t && t.__v_isShallow);
}
function ze(t) {
  return Ct(t) || Pt(t);
}
function y(t) {
  const e = t && t.__v_raw;
  return e ? y(e) : t;
}
function Tl(t) {
  return Lu(t, "__v_skip", !0), t;
}
const mr = (t) => q(t) ? Ws(t) : t, Ir = (t) => q(t) ? Qs(t) : t;
function F(t) {
  return !!(t && t.__v_isRef === !0);
}
function yl(t) {
  return F(t) ? t.value : t;
}
const wl = {
  get: (t, e, n) => yl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return F(i) && !F(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function bl(t) {
  return Ct(t) ? t : new Proxy(t, wl);
}
const xt = [];
function kl(t) {
  xt.push(t);
}
function Sl() {
  xt.pop();
}
function U(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  $s();
  const n = xt.length ? xt[xt.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = _l();
  if (r)
    Et(r, n, 11, [
      t + e.join(""),
      n && n.proxy,
      i.map(({ vnode: s }) => `at <${lo(n, s.type)}>`).join(`
`),
      i
    ]);
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    i.length && s.push(`
`, ...Cl(i));
  }
  Ls();
}
function _l() {
  let t = xt[xt.length - 1];
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
function Cl(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ...xl(n));
  }), e;
}
function xl({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${lo(t.component, t.type, r)}`, s = ">" + n;
  return t.props ? [i, ...El(t.props), s] : [i + s];
}
function El(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...Ys(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function Ys(t, e, n) {
  return nt(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : F(e) ? (e = Ys(t, y(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : D(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = y(e), n ? e : [`${t}=`, e]);
}
const js = {
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
function Et(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (s) {
    Xs(s, e, n);
  }
  return i;
}
function Hn(t, e, n, r) {
  if (D(t)) {
    const s = Et(t, e, n, r);
    return s && Fu(s) && s.catch((o) => {
      Xs(o, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(Hn(t[s], e, n, r));
  return i;
}
function Xs(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const o = e.proxy, a = process.env.NODE_ENV !== "production" ? js[n] : n;
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
      Et(l, null, 10, [t, o, a]);
      return;
    }
  }
  Nl(t, n, i, r);
}
function Nl(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = js[e];
    if (n && kl(n), U(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Sl(), r)
      throw t;
  }
}
let Ge = !1, qn = !1;
const tt = [];
let pt = 0;
const Kt = [];
let rt = null, ht = 0;
const Zs = /* @__PURE__ */ Promise.resolve();
let vr = null;
const Pl = 100;
function Al(t) {
  const e = vr || Zs;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Ol(t) {
  let e = pt + 1, n = tt.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    le(tt[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function Tr(t) {
  (!tt.length || !tt.includes(t, Ge && t.allowRecurse ? pt + 1 : pt)) && (t.id == null ? tt.push(t) : tt.splice(Ol(t.id), 0, t), to());
}
function to() {
  !Ge && !qn && (qn = !0, vr = Zs.then(no));
}
function eo(t) {
  _(t) ? Kt.push(...t) : (!rt || !rt.includes(t, t.allowRecurse ? ht + 1 : ht)) && Kt.push(t), to();
}
function Ml(t) {
  if (Kt.length) {
    const e = [...new Set(Kt)];
    if (Kt.length = 0, rt) {
      rt.push(...e);
      return;
    }
    for (rt = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), rt.sort((n, r) => le(n) - le(r)), ht = 0; ht < rt.length; ht++)
      process.env.NODE_ENV !== "production" && ro(t, rt[ht]) || rt[ht]();
    rt = null, ht = 0;
  }
}
const le = (t) => t.id == null ? 1 / 0 : t.id, Vl = (t, e) => {
  const n = le(t) - le(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function no(t) {
  qn = !1, Ge = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), tt.sort(Vl);
  const e = process.env.NODE_ENV !== "production" ? (n) => ro(t, n) : ur;
  try {
    for (pt = 0; pt < tt.length; pt++) {
      const n = tt[pt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Et(n, null, 14);
      }
    }
  } finally {
    pt = 0, tt.length = 0, Ml(t), Ge = !1, vr = null, (tt.length || Kt.length) && no(t);
  }
}
function ro(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > Pl) {
      const r = e.ownerInstance, i = r && uo(r.type);
      return U(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const ee = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (qu().__VUE_HMR_RUNTIME__ = {
  createRecord: kn(Rl),
  rerender: kn(Ul),
  reload: kn(Fl)
});
const Je = /* @__PURE__ */ new Map();
function Rl(t, e) {
  return Je.has(t) ? !1 : (Je.set(t, {
    initialDef: ie(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ie(t) {
  return fo(t) ? t.__vccOpts : t;
}
function Ul(t, e) {
  const n = Je.get(t);
  !n || (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, ie(r.type).render = e), r.renderCache = [], r.update();
  }));
}
function Fl(t, e) {
  const n = Je.get(t);
  if (!n)
    return;
  e = ie(e), Pi(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = ie(i.type);
    ee.has(s) || (s !== n.initialDef && Pi(s, e), ee.add(s)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (ee.add(s), i.ceReload(e.styles), ee.delete(s)) : i.parent ? Tr(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" && window.location.reload();
  }
  eo(() => {
    for (const i of r)
      ee.delete(ie(i.type));
  });
}
function Pi(t, e) {
  et(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function kn(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch {
    }
  };
}
let dt = null, Bl = null;
const Dl = (t) => t.__isSuspense;
function $l(t, e) {
  e && e.pendingBranch ? _(t) ? e.effects.push(...t) : e.effects.push(t) : eo(t);
}
const Ve = {};
function Ll(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: o } = it) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && U('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && U('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = (k) => {
    U("Invalid watch source: ", k, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = zt;
  let u, p = !1, h = !1;
  if (F(t) ? (u = () => t.value, p = Ln(t)) : Ct(t) ? (u = () => t, r = !0) : _(t) ? (h = !0, p = t.some((k) => Ct(k) || Ln(k)), u = () => t.map((k) => {
    if (F(k))
      return k.value;
    if (Ct(k))
      return $t(k);
    if (D(k))
      return Et(k, l, 2);
    process.env.NODE_ENV !== "production" && a(k);
  })) : D(t) ? e ? u = () => Et(t, l, 2) : u = () => {
    if (!(l && l.isUnmounted))
      return g && g(), Hn(t, l, 3, [I]);
  } : (u = ur, process.env.NODE_ENV !== "production" && a(t)), e && r) {
    const k = u;
    u = () => $t(k());
  }
  let g, I = (k) => {
    g = A.onStop = () => {
      Et(k, l, 4);
    };
  }, v = h ? new Array(t.length).fill(Ve) : Ve;
  const w = () => {
    if (!!A.active)
      if (e) {
        const k = A.run();
        (r || p || (h ? k.some((jt, ve) => Ke(jt, v[ve])) : Ke(k, v))) && (g && g(), Hn(e, l, 3, [
          k,
          v === Ve ? void 0 : h && v[0] === Ve ? [] : v,
          I
        ]), v = k);
      } else
        A.run();
  };
  w.allowRecurse = !!e;
  let J;
  i === "sync" ? J = w : i === "post" ? J = () => Mi(w, l && l.suspense) : (w.pre = !0, l && (w.id = l.uid), J = () => Tr(w));
  const A = new Wu(u, J);
  return process.env.NODE_ENV !== "production" && (A.onTrack = s, A.onTrigger = o), e ? n ? w() : v = A.run() : i === "post" ? Mi(A.run.bind(A), l && l.suspense) : A.run(), () => {
    A.stop(), l && l.scope && Vu(l.scope.effects, A);
  };
}
function Hl(t, e, n) {
  const r = this.proxy, i = nt(t) ? t.includes(".") ? ql(r, t) : () => r[t] : t.bind(r, r);
  let s;
  D(e) ? s = e : (s = e.handler, n = e);
  const o = zt;
  Vi(this);
  const a = Ll(i, s.bind(r), n);
  return o ? Vi(o) : lf(), a;
}
function ql(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function $t(t, e) {
  if (!q(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), F(t))
    $t(t.value, e);
  else if (_(t))
    for (let n = 0; n < t.length; n++)
      $t(t[n], e);
  else if (Uu(t) || qt(t))
    t.forEach((n) => {
      $t(n, e);
    });
  else if (Du(t))
    for (const n in t)
      $t(t[n], e);
  return t;
}
const Kl = Symbol(), Kn = (t) => t ? ff(t) ? hf(t) || t.proxy : Kn(t.parent) : null, se = /* @__PURE__ */ et(/* @__PURE__ */ Object.create(null), {
  $: (t) => t,
  $el: (t) => t.vnode.el,
  $data: (t) => t.data,
  $props: (t) => process.env.NODE_ENV !== "production" ? Me(t.props) : t.props,
  $attrs: (t) => process.env.NODE_ENV !== "production" ? Me(t.attrs) : t.attrs,
  $slots: (t) => process.env.NODE_ENV !== "production" ? Me(t.slots) : t.slots,
  $refs: (t) => process.env.NODE_ENV !== "production" ? Me(t.refs) : t.refs,
  $parent: (t) => Kn(t.parent),
  $root: (t) => Kn(t.root),
  $emit: (t) => t.emit,
  $options: (t) => __VUE_OPTIONS_API__ ? Wl(t) : t.type,
  $forceUpdate: (t) => t.f || (t.f = () => Tr(t.update)),
  $nextTick: (t) => t.n || (t.n = Al.bind(t.proxy)),
  $watch: (t) => __VUE_OPTIONS_API__ ? Hl.bind(t) : ur
}), zl = (t) => t === "_" || t === "$", Sn = (t, e) => t !== it && !t.__isScriptSetup && C(t, e), Gl = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: a, appContext: l } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    let u;
    if (e[0] !== "$") {
      const I = o[e];
      if (I !== void 0)
        switch (I) {
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
        if (Sn(r, e))
          return o[e] = 1, r[e];
        if (i !== it && C(i, e))
          return o[e] = 2, i[e];
        if ((u = t.propsOptions[0]) && C(u, e))
          return o[e] = 3, s[e];
        if (n !== it && C(n, e))
          return o[e] = 4, n[e];
        (!__VUE_OPTIONS_API__ || Jl) && (o[e] = 0);
      }
    }
    const p = se[e];
    let h, g;
    if (p)
      return e === "$attrs" && (Z(t, "get", e), process.env.NODE_ENV !== "production" && void 0), p(t);
    if ((h = a.__cssModules) && (h = h[e]))
      return h;
    if (n !== it && C(n, e))
      return o[e] = 4, n[e];
    if (g = l.config.globalProperties, C(g, e))
      return g[e];
    process.env.NODE_ENV !== "production" && dt && (!nt(e) || e.indexOf("__v") !== 0) && (i !== it && zl(e[0]) && C(i, e) ? U(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === dt && U(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return Sn(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && C(i, e) ? (U(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== it && C(r, e) ? (r[e] = n, !0) : C(t.props, e) ? (process.env.NODE_ENV !== "production" && U(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && U(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s } }, o) {
    let a;
    return !!n[o] || t !== it && C(t, o) || Sn(e, o) || (a = s[0]) && C(a, o) || C(r, o) || C(se, o) || C(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : C(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (Gl.ownKeys = (t) => (U("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
let Jl = !0;
function Wl(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: i, optionsCache: s, config: { optionMergeStrategies: o } } = t.appContext, a = s.get(e);
  let l;
  return a ? l = a : !i.length && !n && !r ? l = e : (l = {}, i.length && i.forEach((u) => We(l, u, o, !0)), We(l, e, o)), q(e) && s.set(e, l), l;
}
function We(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && We(t, s, n, !0), i && i.forEach((o) => We(t, o, n, !0));
  for (const o in e)
    if (r && o === "expose")
      process.env.NODE_ENV !== "production" && U('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const a = Ql[o] || n && n[o];
      t[o] = a ? a(t[o], e[o]) : e[o];
    }
  return t;
}
const Ql = {
  data: Ai,
  props: kt,
  emits: kt,
  methods: kt,
  computed: kt,
  beforeCreate: V,
  created: V,
  beforeMount: V,
  mounted: V,
  beforeUpdate: V,
  updated: V,
  beforeDestroy: V,
  beforeUnmount: V,
  destroyed: V,
  unmounted: V,
  activated: V,
  deactivated: V,
  errorCaptured: V,
  serverPrefetch: V,
  components: kt,
  directives: kt,
  watch: jl,
  provide: Ai,
  inject: Yl
};
function Ai(t, e) {
  return e ? t ? function() {
    return et(D(t) ? t.call(this, this) : t, D(e) ? e.call(this, this) : e);
  } : e : t;
}
function Yl(t, e) {
  return kt(Oi(t), Oi(e));
}
function Oi(t) {
  if (_(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function V(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function kt(t, e) {
  return t ? et(et(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function jl(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = et(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = V(t[r], e[r]);
  return n;
}
function Xl() {
  return {
    app: null,
    config: {
      isNativeTag: Au,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const Mi = $l, Zl = (t) => t.__isTeleport, io = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), tf = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), ef = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let Lt = null;
function nf(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const rf = (...t) => ao(...t), so = "__vInternal", oo = ({ key: t }) => t ?? null, De = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? nt(t) || F(t) || D(t) ? { i: dt, r: t, k: e, f: !!n } : t : null;
function sf(t, e = null, n = null, r = 0, i = null, s = t === io ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && oo(e),
    ref: e && De(e),
    scopeId: Bl,
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
    appContext: null,
    ctx: dt
  };
  return a ? (yr(l, n), s & 128 && t.normalize(l)) : n && (l.shapeFlag |= nt(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && U("VNode created with invalid key (NaN). VNode type:", l.type), !o && Lt && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && Lt.push(l), l;
}
const of = process.env.NODE_ENV !== "production" ? rf : ao;
function ao(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Kl) && (process.env.NODE_ENV !== "production" && !t && U(`Invalid vnode type when creating vnode: ${t}.`), t = ef), nf(t)) {
    const a = Qe(t, e, !0);
    return n && yr(a, n), !s && Lt && (a.shapeFlag & 6 ? Lt[Lt.indexOf(t)] = a : Lt.push(a)), a.patchFlag |= -2, a;
  }
  if (fo(t) && (t = t.__vccOpts), e) {
    e = af(e);
    let { class: a, style: l } = e;
    a && !nt(a) && (e.class = cr(a)), q(l) && (ze(l) && !_(l) && (l = et({}, l)), e.style = ar(l));
  }
  const o = nt(t) ? 1 : Dl(t) ? 128 : Zl(t) ? 64 : q(t) ? 4 : D(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && ze(t) && (t = y(t), U("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), sf(t, e, n, r, i, o, s, !0);
}
function af(t) {
  return t ? ze(t) || so in t ? et({}, t) : t : null;
}
function Qe(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, a = e ? uf(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: a,
    key: a && oo(a),
    ref: e && e.ref ? n && i ? _(i) ? i.concat(De(e)) : [i, De(e)] : De(e) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && _(o) ? o.map(co) : o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== io ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Qe(t.ssContent),
    ssFallback: t.ssFallback && Qe(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx
  };
}
function co(t) {
  const e = Qe(t);
  return _(t.children) && (e.children = t.children.map(co)), e;
}
function cf(t = " ", e = 0) {
  return of(tf, null, t, e);
}
function yr(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (_(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), yr(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(so in e) ? e._ctx = dt : i === 3 && dt && (dt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    D(e) ? (e = { default: e, _ctx: dt }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [cf(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function uf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = cr([e.class, r.class]));
      else if (i === "style")
        e.style = ar([e.style, r.style]);
      else if (Mu(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(_(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
Xl();
let zt = null;
const Vi = (t) => {
  zt = t, t.scope.on();
}, lf = () => {
  zt && zt.scope.off(), zt = null;
};
function ff(t) {
  return t.vnode.shapeFlag & 4;
}
function hf(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(bl(Tl(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in se)
          return se[n](t);
      },
      has(e, n) {
        return n in e || n in se;
      }
    }));
}
const pf = /(?:^|[-_])(\w)/g, df = (t) => t.replace(pf, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function uo(t, e = !0) {
  return D(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function lo(t, e, n = !1) {
  let r = uo(e);
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
  return r ? df(r) : n ? "App" : "Anonymous";
}
function fo(t) {
  return D(t) && "__vccOpts" in t;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function _n(t) {
  return !!(t && t.__v_isShallow);
}
function gf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(h) {
      return q(h) ? h.__isVue ? ["div", t, "VueInstance"] : F(h) ? [
        "div",
        {},
        ["span", t, p(h)],
        "<",
        a(h.value),
        ">"
      ] : Ct(h) ? [
        "div",
        {},
        ["span", t, _n(h) ? "ShallowReactive" : "Reactive"],
        "<",
        a(h),
        `>${Pt(h) ? " (readonly)" : ""}`
      ] : Pt(h) ? [
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
    h.type.props && h.props && g.push(o("props", y(h.props))), h.setupState !== it && g.push(o("setup", h.setupState)), h.data !== it && g.push(o("data", y(h.data)));
    const I = l(h, "computed");
    I && g.push(o("computed", I));
    const v = l(h, "inject");
    return v && g.push(o("injected", v)), g.push([
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
    return g = et({}, g), Object.keys(g).length ? [
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
        ...Object.keys(g).map((I) => [
          "div",
          {},
          ["span", r, I + ": "],
          a(g[I], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(h, g = !0) {
    return typeof h == "number" ? ["span", e, h] : typeof h == "string" ? ["span", n, JSON.stringify(h)] : typeof h == "boolean" ? ["span", r, h] : q(h) ? ["object", { object: g ? y(h) : h }] : ["span", n, String(h)];
  }
  function l(h, g) {
    const I = h.type;
    if (D(I))
      return;
    const v = {};
    for (const w in h.ctx)
      u(I, w, g) && (v[w] = h.ctx[w]);
    return v;
  }
  function u(h, g, I) {
    const v = h[I];
    if (_(v) && v.includes(g) || q(v) && g in v || h.extends && u(h.extends, g, I) || h.mixins && h.mixins.some((w) => u(w, g, I)))
      return !0;
  }
  function p(h) {
    return _n(h) ? "ShallowRef" : h.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function mf() {
  gf();
}
process.env.NODE_ENV !== "production" && mf();
function If(t) {
  const e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function Sh(t) {
  const e = Math.floor(t / 12) - 2;
  return If(t) + e.toString();
}
const vf = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, Tf = {
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
function _h(t) {
  const e = vf.exec(t);
  if (!e)
    return -1;
  const n = e[1], r = e[2];
  return Tf[n.toLowerCase()] + (parseInt(r, 10) + 2) * 12;
}
function Ri(t, e, n, r) {
  return `${t} // ${e} // ${n} // ${r}`;
}
function yf(t, e, n) {
  return `${t} // ${e} // ${n}`;
}
function Ch(t) {
  const e = Ye(t);
  return yf(
    e.manufacturerName,
    e.pluginFormatName,
    e.name
  );
}
function Ye(t) {
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
function wf(t, e) {
  return t === e;
}
function bf(t, e) {
  const n = Ye(t), r = Ye(e);
  if (P.keys(n).length !== P.keys(r).length)
    return !1;
  for (const i of P.keys(n))
    if (i !== "pluginVersion" && n[i] !== r[i])
      return !1;
  return !0;
}
class xh {
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
function kf(t) {
  return t > -100 ? Math.exp((t - 6) * (1 / 20)) : 0;
}
function Eh(t) {
  return t <= 0 ? -100 : 20 * Math.log10(t);
}
function Nh(t) {
  return t > 0 ? 20 * Math.log(t) + 6 : -100;
}
function Ph(t) {
  return t > 0 ? Math.pow(10, (20 * Math.log(t) + 6) * (1 / 20)) : 0;
}
function Ah(t) {
  return t > 0 ? Math.exp((20 * Math.log10(t) - 6) * (1 / 20)) : 0;
}
function Oh(t, e, n, r, i) {
  return (t - e) / (n - e) * (i - r) + r;
}
function Mh(t) {
  return 440 * Math.pow(2, (t - 69) / 12);
}
function Vh(t) {
  return ze(t) || F(t) ? y(t) : t;
}
var Sf = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(Sf || {});
class nn {
  name;
  manufacturerName;
  pluginFormatName;
  pluginVersion;
  isEnabled = !0;
  localInstanceIdInternal;
  base64StatesInternal;
  constructor(e, n, r, i) {
    this.name = e, this.manufacturerName = n, this.pluginFormatName = r, this.pluginVersion = i, this.localInstanceIdInternal = nn.generateAudioPluginInstanceIdInternal();
  }
  getTuneflowId() {
    return Ri(
      this.manufacturerName,
      this.pluginFormatName,
      this.name,
      this.pluginVersion
    );
  }
  clone(e) {
    const n = e.createAudioPlugin(this.getTuneflowId());
    return n.setIsEnabled(this.isEnabled), n;
  }
  matchesTfId(e) {
    return wf(e, this.getTuneflowId());
  }
  matchesTfIdIgnoreVersion(e) {
    return bf(e, this.getTuneflowId());
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
    return Ze(10);
  }
  static DEFAULT_SYNTH_TFID = Ri("TuneFlow", "VST3", "TFSynth", "1.0.0");
}
class gt {
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
    if (!gt.isValidPitch(e))
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
    return gt.isNoteRangeValid(this.startTick, this.endTick);
  }
  transpose(e) {
    this.setPitch(Math.min(127, Math.max(0, this.pitch + e)));
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
    this.pitch = this.pitch + e, gt.isValidPitch(this.pitch) || this.deleteFromParent();
  }
  getId() {
    return this.idInternal;
  }
}
var re = /* @__PURE__ */ ((t) => (t[t.MIDI_CLIP = 1] = "MIDI_CLIP", t[t.AUDIO_CLIP = 2] = "AUDIO_CLIP", t))(re || {});
class j {
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
    id: i = j.generateClipIdInternal(),
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
      }, r = P.isNumber(r) ? Math.max(r, a.startTick) : a.startTick;
      const l = this.getAudioEndTick();
      (!P.isNumber(o) || l < o) && (o = l), this.clipStartTick = r, this.clipEndTick = o;
    } else if (n === 1) {
      if (this.clipStartTick = r, !P.isNumber(o))
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
    return j.getNotesInRange(this.notes, this.clipStartTick, this.clipEndTick);
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
    if (this.type !== 1 || !gt.isValidPitch(e) || !gt.isNoteRangeValid(r, i) || !gt.isNoteVelocityValid(n))
      return null;
    const a = new gt({
      pitch: e,
      velocity: n,
      startTick: r,
      endTick: i,
      id: this.getNextNoteIdInternal()
    });
    return r < this.clipStartTick && s && this.adjustClipLeft(r, o), i > this.clipEndTick && s && this.adjustClipRight(i, o), this.orderedInsertNote(this.notes, a), a;
  }
  getNoteIndexInternal(e) {
    const n = S.lt(
      this.notes,
      e,
      (r, i) => r.getStartTick() - i.getStartTick()
    );
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
    const r = S.ge(
      e,
      n,
      (i, s) => i.getStartTick() - s.getStartTick()
    );
    r < 0 ? e.push(n) : e.splice(r, 0, n), n.clipInternal = this;
  }
  adjustClipLeft(e, n = !0) {
    e = Math.max(0, e), this.type === 2 && this.audioClipData && (e = Math.max(e, this.audioClipData.startTick)), e > this.clipEndTick ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(
      this.getId(),
      Math.min(this.clipStartTick, e),
      this.clipEndTick
    ), this.clipStartTick = e);
  }
  adjustClipRight(e, n = !0) {
    if (this.type === 2) {
      const r = this.getAudioEndTick();
      P.isNumber(r) && (e = Math.min(e, r));
    }
    e < this.clipStartTick || e < 0 ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(
      this.getId(),
      this.clipStartTick,
      Math.max(this.clipEndTick, e)
    ), this.clipEndTick = e);
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
      const a = this.song, l = a.tickToSeconds(this.audioClipData.startTick), u = a.tickToSeconds(s), h = a.tickToSeconds(o) - u, g = u - l, I = a.tickToSeconds(this.clipStartTick + e), v = I - g, w = I + h;
      if (this.clipStartTick = r, this.clipEndTick = a.secondsToTick(w), this.audioClipData.startTick = a.secondsToTick(v), this.clipEndTick < 0) {
        this.deleteFromParent(!0);
        return;
      }
    }
    this.track && (this.track.orderedInsertClipInternal(this), n && this.track.getAutomation().moveAllPointsWithinRange(
      s,
      o,
      e,
      0
    ));
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
    if (!P.isNumber(e))
      return;
    const n = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(n + e);
  }
  static getNotesInRange(e, n, r) {
    return j.getNotesInRangeImpl(
      e,
      n,
      r,
      (i) => ({ getStartTick: () => i }),
      (i) => i.getStartTick(),
      (i) => i.getEndTick()
    );
  }
  static getNotesInRangeImpl(e, n, r, i, s, o) {
    let a = Math.max(
      0,
      S.lt(
        e,
        i(n),
        (u, p) => s(u) - s(p)
      )
    );
    for (; e[a] && !j.isNoteInClip(
      s(e[a]),
      o(e[a]),
      n,
      r
    ); )
      a += 1;
    if (a >= e.length)
      return [];
    let l = Math.min(
      e.length - 1,
      S.gt(
        e,
        i(r),
        (u, p) => s(u) - s(p)
      )
    );
    for (; e[l] && !j.isNoteInClip(
      s(e[l]),
      o(e[l]),
      n,
      r
    ); )
      l -= 1;
    return l < 0 ? [] : l < a ? [] : e.slice(a, l + 1);
  }
  static getOverlappingNotesWithinRangeImpl(e, n, r, i, s) {
    const o = [];
    for (const a of e) {
      const l = i(a);
      if (l > r)
        break;
      const u = s(a);
      (l >= n && l <= r || u >= n && u <= r) && o.push(a);
    }
    return o;
  }
  static isNoteInClip(e, n, r, i) {
    return (e >= r || r === 0 && e <= 0) && e < i && n > e;
  }
  static getNotePlayableRange(e, n, r, i) {
    if (!j.isNoteInClip(e, n, r, i))
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
            }), l = j.getNotesInRange(this.notes, s, o);
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
    return Ze(10);
  }
}
var zn = /* @__PURE__ */ ((t) => (t[t.UNDEFINED = 0] = "UNDEFINED", t[t.VOLUME = 1] = "VOLUME", t[t.PAN = 2] = "PAN", t[t.AUDIO_PLUGIN = 3] = "AUDIO_PLUGIN", t))(zn || {});
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
    return Y.areAutomationTargetsEqual(
      this.getType(),
      e.getType(),
      this.getPluginInstanceId(),
      e.getPluginInstanceId(),
      this.getParamId(),
      e.getParamId()
    );
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
    const i = S.ge(
      e,
      { tick: n },
      (o, a) => o.tick - a.tick
    ), s = [];
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
    const r = S.ge(
      this.points,
      { tick: e },
      (s, o) => s.tick - o.tick
    );
    if (r >= this.points.length)
      return;
    let i = r;
    for (; i + 1 < this.points.length && this.points[i + 1].tick <= n; )
      i += 1;
    this.points.splice(r, i - r + 1);
  }
  movePointsInRange(e, n, r, i, s = !0) {
    const o = this.getPointsInRange(e, n);
    this.movePoints(
      o.map((a) => a.id),
      r,
      i,
      s
    );
  }
  moveAllPoints(e, n, r = !0) {
    this.movePoints(
      this.points.map((i) => i.id),
      e,
      n,
      r
    );
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
          const u = Math.max(
            0,
            this.points[o].tick + n
          ), p = S.gt(
            this.points,
            { tick: u },
            (h, g) => h.tick - g.tick
          );
          p < o && this.points.splice(p, o - p);
        } else if (n > 0) {
          const u = this.points[a].tick + n, p = S.lt(
            this.points,
            { tick: u },
            (h, g) => h.tick - g.tick
          );
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
    const i = S.ge(
      e,
      n,
      (s, o) => s.tick - o.tick
    );
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
    P.isNumber(n) || (n = 0), this.targets.splice(n, 0, e);
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
    for (const n of P.keys(this.targetValues)) {
      const r = Y.decodeAutomationTarget(n);
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
  }
  removeAllPointsWithinRange(e, n) {
    for (const r of P.keys(this.targetValues))
      this.targetValues[r].removePointsInRange(e, n);
  }
  moveAllPointsWithinRange(e, n, r, i) {
    for (const s of P.keys(this.targetValues))
      this.targetValues[s].movePointsInRange(
        e,
        n,
        r,
        i,
        !1
      );
  }
  clone() {
    const e = new wr();
    for (const n of this.targets)
      e.addAutomation(n.clone());
    for (const n of P.keys(this.targetValues)) {
      const r = this.targetValues[n];
      e.targetValues[n] = r.clone();
    }
    return e;
  }
}
var Dt = /* @__PURE__ */ ((t) => (t[t.MIDI_TRACK = 1] = "MIDI_TRACK", t[t.AUDIO_TRACK = 2] = "AUDIO_TRACK", t[t.MASTER_TRACK = 3] = "MASTER_TRACK", t))(Dt || {});
class Ht {
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
    uuid: r = Ht.generateTrackIdInternal(),
    clips: i = [],
    instrument: s,
    suggestedInstruments: o = [],
    volume: a = kf(0),
    solo: l = !1,
    muted: u = !1,
    rank: p = 0,
    pan: h = 0
  }) {
    this.song = n, this.type = e, s ? this.insturment = s : e === 1 && (this.insturment = new oe({
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
    this.type === 1 && (this.insturment = new oe({ program: e, isDrum: n }));
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
    const r = new oe({ program: e, isDrum: n });
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
    const n = Ye(e);
    return new nn(
      n.name,
      n.manufacturerName,
      n.pluginFormatName,
      n.pluginVersion
    );
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
    const r = [], i = S.lt(
      this.clips,
      { getClipStartTick: () => e },
      (s, o) => s.getClipStartTick() - o.getClipStartTick()
    );
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
    if (!P.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const i = n ?? e + 1;
    if (i < e)
      throw new Error(
        `clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${e}, clipEndTick: ${n}`
      );
    const s = new j({
      id: j.generateClipIdInternal(),
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
    if (!P.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const s = new j({
      id: j.generateClipIdInternal(),
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
    const n = S.le(
      this.clips,
      e,
      (r, i) => r.getClipStartTick() - i.getClipStartTick()
    );
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
    return this.automation.getAutomationTargets().length > 0 && !P.isEmpty(this.automation.getAutomationTargetValues());
  }
  static generateTrackIdInternal() {
    return Ze();
  }
  resolveClipConflictInternal(e, n, r) {
    const i = this.getClipsOverlappingWith(n, r);
    for (const s of i)
      s.getId() !== e && s.trimConflictPartInternal(n, r);
  }
  orderedInsertClipInternal(e) {
    const n = S.ge(
      this.clips,
      e,
      (r, i) => r.getClipStartTick() - i.getClipStartTick()
    );
    this.clips.splice(n, 0, e);
  }
}
class oe {
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
    return new oe({
      program: this.program,
      isDrum: this.isDrum
    });
  }
}
var rn = {}, sn = {};
function _f(t) {
  var e = new $(t), n = e.readChunk();
  if (n.id != "MThd")
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + n.id + "'";
  for (var r = Cf(n.data), i = [], s = 0; !e.eof() && s < r.numTracks; s++) {
    var o = e.readChunk();
    if (o.id != "MTrk")
      throw "Bad MIDI file.  Expected 'MTrk', got: '" + o.id + "'";
    var a = xf(o.data);
    i.push(a);
  }
  return {
    header: r,
    tracks: i
  };
}
function Cf(t) {
  var e = new $(t), n = e.readUInt16(), r = e.readUInt16(), i = {
    format: n,
    numTracks: r
  }, s = e.readUInt16();
  return s & 32768 ? (i.framesPerSecond = 256 - (s >> 8), i.ticksPerFrame = s & 255) : i.ticksPerBeat = s, i;
}
function xf(t) {
  for (var e = new $(t), n = []; !e.eof(); ) {
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
      var I = a >> 4;
      switch (o.channel = a & 15, I) {
        case 8:
          return o.type = "noteOff", o.noteNumber = g, o.velocity = e.readUInt8(), o;
        case 9:
          var v = e.readUInt8();
          return o.type = v === 0 ? "noteOff" : "noteOn", o.noteNumber = g, o.velocity = v, v === 0 && (o.byte9 = !0), o;
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
          throw "Unrecognised MIDI event type: " + I;
      }
    }
  }
}
function $(t) {
  this.buffer = t, this.bufferLen = this.buffer.length, this.pos = 0;
}
$.prototype.eof = function() {
  return this.pos >= this.bufferLen;
};
$.prototype.readUInt8 = function() {
  var t = this.buffer[this.pos];
  return this.pos += 1, t;
};
$.prototype.readInt8 = function() {
  var t = this.readUInt8();
  return t & 128 ? t - 256 : t;
};
$.prototype.readUInt16 = function() {
  var t = this.readUInt8(), e = this.readUInt8();
  return (t << 8) + e;
};
$.prototype.readInt16 = function() {
  var t = this.readUInt16();
  return t & 32768 ? t - 65536 : t;
};
$.prototype.readUInt24 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8();
  return (t << 16) + (e << 8) + n;
};
$.prototype.readInt24 = function() {
  var t = this.readUInt24();
  return t & 8388608 ? t - 16777216 : t;
};
$.prototype.readUInt32 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8(), r = this.readUInt8();
  return (t << 24) + (e << 16) + (n << 8) + r;
};
$.prototype.readBytes = function(t) {
  var e = this.buffer.slice(this.pos, this.pos + t);
  return this.pos += t, e;
};
$.prototype.readString = function(t) {
  var e = this.readBytes(t);
  return String.fromCharCode.apply(null, e);
};
$.prototype.readVarInt = function() {
  for (var t = 0; !this.eof(); ) {
    var e = this.readUInt8();
    if (e & 128)
      t += e & 127, t <<= 7;
    else
      return t + e;
  }
  return t;
};
$.prototype.readChunk = function() {
  var t = this.readString(4), e = this.readUInt32(), n = this.readBytes(e);
  return {
    id: t,
    length: e,
    data: n
  };
};
var Ef = _f;
function Nf(t, e) {
  if (typeof t != "object")
    throw "Invalid MIDI data";
  e = e || {};
  var n = t.header || {}, r = t.tracks || [], i, s = r.length, o = new E();
  for (Pf(o, n, s), i = 0; i < s; i++)
    Af(o, r[i], e);
  return o.buffer;
}
function Pf(t, e, n) {
  var r = e.format == null ? 1 : e.format, i = 128;
  e.timeDivision ? i = e.timeDivision : e.ticksPerFrame && e.framesPerSecond ? i = -(e.framesPerSecond & 255) << 8 | e.ticksPerFrame & 255 : e.ticksPerBeat && (i = e.ticksPerBeat & 32767);
  var s = new E();
  s.writeUInt16(r), s.writeUInt16(n), s.writeUInt16(i), t.writeChunk("MThd", s.buffer);
}
function Af(t, e, n) {
  var r = new E(), i, s = e.length, o = null;
  for (i = 0; i < s; i++)
    (n.running === !1 || !n.running && !e[i].running) && (o = null), o = Of(r, e[i], o, n.useByte9ForNoteOff);
  t.writeChunk("MTrk", r.buffer);
}
function Of(t, e, n, r) {
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
      var I = 8192 + e.value, v = I & 127, w = I >> 7 & 127;
      t.writeUInt8(v), t.writeUInt8(w);
      break;
    default:
      throw "Unrecognized event type: " + i;
  }
  return l;
}
function E() {
  this.buffer = [];
}
E.prototype.writeUInt8 = function(t) {
  this.buffer.push(t & 255);
};
E.prototype.writeInt8 = E.prototype.writeUInt8;
E.prototype.writeUInt16 = function(t) {
  var e = t >> 8 & 255, n = t & 255;
  this.writeUInt8(e), this.writeUInt8(n);
};
E.prototype.writeInt16 = E.prototype.writeUInt16;
E.prototype.writeUInt24 = function(t) {
  var e = t >> 16 & 255, n = t >> 8 & 255, r = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r);
};
E.prototype.writeInt24 = E.prototype.writeUInt24;
E.prototype.writeUInt32 = function(t) {
  var e = t >> 24 & 255, n = t >> 16 & 255, r = t >> 8 & 255, i = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r), this.writeUInt8(i);
};
E.prototype.writeInt32 = E.prototype.writeUInt32;
E.prototype.writeBytes = function(t) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(t, 0));
};
E.prototype.writeString = function(t) {
  var e, n = t.length, r = [];
  for (e = 0; e < n; e++)
    r.push(t.codePointAt(e));
  this.writeBytes(r);
};
E.prototype.writeVarInt = function(t) {
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
E.prototype.writeChunk = function(t, e) {
  this.writeString(t), this.writeUInt32(e.length), this.writeBytes(e);
};
var Mf = Nf;
sn.parseMidi = Ef;
sn.writeMidi = Mf;
var br = {}, on = {}, ge = {};
Object.defineProperty(ge, "__esModule", { value: !0 });
function ho(t, e, n) {
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
ge.search = ho;
function Vf(t, e, n) {
  if (n === void 0 && (n = "ticks"), t.length) {
    var r = ho(t, e[n], n);
    t.splice(r + 1, 0, e);
  } else
    t.push(e);
}
ge.insert = Vf;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = ge, n = /* @__PURE__ */ new WeakMap();
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
})(on);
var me = { exports: {} };
me.exports = Rf;
me.exports.from = po;
me.exports.depth = Uf;
me.exports.fromDepth = go;
function Rf(t) {
  if (!Array.isArray(t))
    throw new TypeError("Expected value to be an array");
  return po(t);
}
function po(t) {
  return mo(t, []);
}
function Uf(t, e) {
  if (!Array.isArray(t))
    throw new TypeError("Expected value to be an array");
  return go(t, e);
}
function go(t, e) {
  if (typeof e != "number")
    throw new TypeError("Expected the depth to be a number");
  return Io(t, [], e);
}
function mo(t, e) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    Array.isArray(r) ? mo(r, e) : e.push(r);
  }
  return e;
}
function Io(t, e, n) {
  n--;
  for (var r = 0; r < t.length; r++) {
    var i = t[r];
    n > -1 && Array.isArray(i) ? Io(i, e, n) : e.push(i);
  }
  return e;
}
var Cn = X && X.__spreadArrays || function() {
  for (var t = 0, e = 0, n = arguments.length; e < n; e++)
    t += arguments[e].length;
  for (var r = Array(t), i = 0, e = 0; e < n; e++)
    for (var s = arguments[e], o = 0, a = s.length; o < a; o++, i++)
      r[i] = s[o];
  return r;
}, Ff = X && X.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(br, "__esModule", { value: !0 });
var Bf = sn, Df = on, $f = Ff(me.exports);
function Lf(t, e) {
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
function Hf(t) {
  return $f.default(t.notes.map(function(e) {
    return Lf(e, t.channel);
  }));
}
function qf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    controllerType: t.number,
    deltaTime: 0,
    type: "controller",
    value: Math.floor(t.value * 127)
  };
}
function Kf(t) {
  for (var e = [], n = 0; n < 127; n++)
    t.controlChanges.hasOwnProperty(n) && t.controlChanges[n].forEach(function(r) {
      e.push(qf(r, t.channel));
    });
  return e;
}
function zf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    deltaTime: 0,
    type: "pitchBend",
    value: t.value
  };
}
function Gf(t) {
  var e = [];
  return t.pitchBends.forEach(function(n) {
    e.push(zf(n, t.channel));
  }), e;
}
function Jf(t) {
  return {
    absoluteTime: 0,
    channel: t.channel,
    deltaTime: 0,
    programNumber: t.instrument.number,
    type: "programChange"
  };
}
function Wf(t) {
  return {
    absoluteTime: 0,
    deltaTime: 0,
    meta: !0,
    text: t,
    type: "trackName"
  };
}
function Qf(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    microsecondsPerBeat: Math.floor(6e7 / t.bpm),
    type: "setTempo"
  };
}
function Yf(t) {
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
function jf(t) {
  var e = Df.keySignatureKeys.indexOf(t.key);
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    key: e + 7,
    meta: !0,
    scale: t.scale === "major" ? 0 : 1,
    type: "keySignature"
  };
}
function Xf(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    text: t.text,
    type: t.type
  };
}
function Zf(t) {
  var e = {
    header: {
      format: 1,
      numTracks: t.tracks.length + 1,
      ticksPerBeat: t.header.ppq
    },
    tracks: Cn([
      Cn([
        {
          absoluteTime: 0,
          deltaTime: 0,
          meta: !0,
          text: t.header.name,
          type: "trackName"
        }
      ], t.header.keySignatures.map(function(n) {
        return jf(n);
      }), t.header.meta.map(function(n) {
        return Xf(n);
      }), t.header.tempos.map(function(n) {
        return Qf(n);
      }), t.header.timeSignatures.map(function(n) {
        return Yf(n);
      }))
    ], t.tracks.map(function(n) {
      return Cn([
        Wf(n.name),
        Jf(n)
      ], Hf(n), Kf(n), Gf(n));
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
  }), new Uint8Array(Bf.writeMidi(e));
}
br.encode = Zf;
var an = {}, kr = {};
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
})(kr);
var Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
var Re = kr;
function th() {
  return new Proxy({}, {
    get: function(t, e) {
      if (t[e])
        return t[e];
      if (Re.controlChangeIds.hasOwnProperty(e))
        return t[Re.controlChangeIds[e]];
    },
    set: function(t, e, n) {
      return Re.controlChangeIds.hasOwnProperty(e) ? t[Re.controlChangeIds[e]] = n : t[e] = n, !0;
    }
  });
}
Sr.createControlChanges = th;
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
var xn = /* @__PURE__ */ new WeakMap(), eh = function() {
  function t(e, n) {
    xn.set(this, n), this.ticks = e.absoluteTime, this.value = e.value;
  }
  return Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = xn.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = xn.get(this);
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
_r.PitchBend = eh;
var Cr = {}, Ie = {};
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.instrumentByPatchID = [
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
Ie.InstrumentFamilyByID = [
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
Ie.DrumKitByPatchID = {
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
var Ue = Ie, Ui = /* @__PURE__ */ new WeakMap(), nh = function() {
  function t(e, n) {
    if (this.number = 0, Ui.set(this, n), this.number = 0, e) {
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
      var e = Ui.get(this);
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
Cr.Instrument = nh;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
function rh(t) {
  var e = Math.floor(t / 12) - 1;
  return vo(t) + e.toString();
}
function vo(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function ih(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return e.indexOf(t);
}
var sh = function() {
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
}(), Bt = /* @__PURE__ */ new WeakMap(), oh = function() {
  function t(e, n, r) {
    Bt.set(this, r), this.midi = e.midi, this.velocity = e.velocity, this.noteOffVelocity = n.velocity, this.ticks = e.ticks, this.durationTicks = n.ticks - e.ticks;
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return rh(this.midi);
    },
    set: function(e) {
      this.midi = sh(e);
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
      return vo(this.midi);
    },
    set: function(e) {
      this.midi = 12 * (this.octave + 1) + ih(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = Bt.get(this);
      return e.ticksToSeconds(this.ticks + this.durationTicks) - e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Bt.get(this), r = n.secondsToTicks(this.time + e);
      this.durationTicks = r - this.ticks;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Bt.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Bt.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bars", {
    get: function() {
      var e = Bt.get(this);
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
xr.Note = oh;
Object.defineProperty(an, "__esModule", { value: !0 });
var En = ge, ah = kr, ch = Sr, uh = _r, Fi = Cr, lh = xr, Fe = /* @__PURE__ */ new WeakMap(), fh = function() {
  function t(e, n) {
    var r = this;
    if (this.name = "", this.notes = [], this.controlChanges = ch.createControlChanges(), this.pitchBends = [], Fe.set(this, n), e) {
      var i = e.find(function(g) {
        return g.type === "trackName";
      });
      this.name = i ? i.text : "";
    }
    if (this.instrument = new Fi.Instrument(e, this), this.channel = 0, e) {
      for (var s = e.filter(function(g) {
        return g.type === "noteOn";
      }), o = e.filter(function(g) {
        return g.type === "noteOff";
      }), a = function() {
        var g = s.shift();
        l.channel = g.channel;
        var I = o.findIndex(function(w) {
          return w.noteNumber === g.noteNumber && w.absoluteTime >= g.absoluteTime;
        });
        if (I !== -1) {
          var v = o.splice(I, 1)[0];
          l.addNote({
            durationTicks: v.absoluteTime - g.absoluteTime,
            midi: g.noteNumber,
            noteOffVelocity: v.velocity / 127,
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
    var n = Fe.get(this), r = new lh.Note({
      midi: 0,
      ticks: 0,
      velocity: 1
    }, {
      ticks: 0,
      velocity: 0
    }, n);
    return Object.assign(r, e), En.insert(this.notes, r, "ticks"), this;
  }, t.prototype.addCC = function(e) {
    var n = Fe.get(this), r = new ah.ControlChange({
      controllerType: e.number
    }, n);
    return delete e.number, Object.assign(r, e), Array.isArray(this.controlChanges[r.number]) || (this.controlChanges[r.number] = []), En.insert(this.controlChanges[r.number], r, "ticks"), this;
  }, t.prototype.addPitchBend = function(e) {
    var n = Fe.get(this), r = new uh.PitchBend({}, n);
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
    this.name = e.name, this.channel = e.channel, this.instrument = new Fi.Instrument(void 0, this), this.instrument.fromJSON(e.instrument), e.endOfTrackTicks !== void 0 && (this.endOfTrackTicks = e.endOfTrackTicks);
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
an.Track = fh;
var hh = X && X.__awaiter || function(t, e, n, r) {
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
}, ph = X && X.__generator || function(t, e) {
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
Object.defineProperty(rn, "__esModule", { value: !0 });
var dh = sn, gh = br, Bi = on, Nn = an, mh = function() {
  function t(e) {
    var n = this, r = null;
    e && (e instanceof ArrayBuffer && (e = new Uint8Array(e)), r = dh.parseMidi(e), r.tracks.forEach(function(i) {
      var s = 0;
      i.forEach(function(o) {
        s += o.deltaTime, o.absoluteTime = s;
      });
    }), r.tracks = yh(r.tracks)), this.header = new Bi.Header(r), this.tracks = [], e && (this.tracks = r.tracks.map(function(i) {
      return new Nn.Track(i, n.header);
    }), r.header.format === 1 && this.tracks[0].duration === 0 && this.tracks.shift());
  }
  return t.fromUrl = function(e) {
    return hh(this, void 0, void 0, function() {
      var n, r;
      return ph(this, function(i) {
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
    return gh.encode(this);
  }, t.prototype.toJSON = function() {
    return {
      header: this.header.toJSON(),
      tracks: this.tracks.map(function(e) {
        return e.toJSON();
      })
    };
  }, t.prototype.fromJSON = function(e) {
    var n = this;
    this.header = new Bi.Header(), this.header.fromJSON(e.header), this.tracks = e.tracks.map(function(r) {
      var i = new Nn.Track(void 0, n.header);
      return i.fromJSON(r), i;
    });
  }, t.prototype.clone = function() {
    var e = new t();
    return e.fromJSON(this.toJSON()), e;
  }, t;
}(), Ih = rn.Midi = mh, vh = an;
rn.Track = vh.Track;
var Th = on;
rn.Header = Th.Header;
function yh(t) {
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
class at {
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
    return this.masterTrack || (this.masterTrack = new Ht({
      type: Dt.MASTER_TRACK,
      song: this,
      uuid: Ht.generateTrackIdInternal()
    })), this.masterTrack;
  }
  getTracks() {
    return this.tracks;
  }
  getTrackById(e) {
    return qe(this.tracks, (n) => n.getId() === e);
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
    const s = new Ht({
      type: e,
      song: this,
      uuid: this.getNextTrackId(),
      rank: r == null || r === null ? this.getNextTrackRank() : r
    });
    return i && e === Dt.MIDI_TRACK && s.setSamplerPlugin(s.createAudioPlugin(nn.DEFAULT_SYNTH_TFID)), n != null ? this.tracks.splice(n, 0, s) : this.tracks.push(s), s;
  }
  cloneTrack(e) {
    let n = this.getTrackIndex(e.getId());
    n < 0 && (n = void 0);
    const r = this.createTrack({
      type: e.getType(),
      index: n
    });
    if (r.setVolume(e.getVolume()), r.setPan(e.getPan()), r.setSolo(e.getSolo()), r.setMuted(e.getMuted()), e.getType() === Dt.MIDI_TRACK) {
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
      e.getType(), Dt.AUDIO_TRACK;
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
    return n ? (this.tracks.splice(
      Jt(this.tracks, (r) => r.getId() === e),
      1
    ), n) : null;
  }
  getResolution() {
    return this.PPQ;
  }
  setResolution(e) {
    this.PPQ = e;
  }
  static getLeadingBar(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    let r = S.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    for (; r > 0 && n[r].beat !== 1; )
      r -= 1;
    return n[r];
  }
  static getLeadingBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = S.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return n[r];
  }
  static getTrailingBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = S.ge(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r > n.length - 1 ? n[n.length - 1] : n[r];
  }
  static getClosestBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = S.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r >= n.length - 1 ? n[r] : Math.abs(n[r].tick - e) > Math.abs(n[r + 1].tick - e) ? n[r + 1] : n[r];
  }
  getBarBeats(e) {
    return at.getBarBeatsImpl(
      e,
      this.PPQ,
      this.timeSignatures,
      (n) => ({
        tick: n.getTicks(),
        numerator: n.getNumerator(),
        denominator: n.getDenominator()
      })
    );
  }
  static getBarBeatsImpl(e, n, r, i) {
    if (r.length === 0)
      return [];
    const s = [];
    for (let h = 0; h < r.length; h += 1)
      if (s.length === 0)
        s.push(r[h]);
      else {
        const g = i(r[h]), I = i(
          s[s.length - 1]
        );
        (g.numerator !== I.numerator || g.denominator !== I.denominator) && s.push(r[h]);
      }
    const o = [];
    let a = 0, l = 0, u = 1, p = 1;
    for (; a <= e; ) {
      if (l < s.length - 1) {
        const I = i(
          s[l + 1]
        ).tick;
        a >= I && (a = I, l += 1, p > 1 && (p = 1, u += 1));
      }
      const h = i(
        s[l]
      );
      o.push({
        bar: u,
        beat: p,
        tick: a,
        numerator: p === 1 ? h.numerator : void 0,
        denominator: p === 1 ? h.denominator : void 0,
        ticksPerBeat: p === 1 ? n * 4 / h.denominator : void 0
      }), p >= h.numerator ? (p = 1, u += 1) : p += 1, a += n * 4 / h.denominator;
    }
    return o;
  }
  getTempoChanges() {
    return this.tempos;
  }
  getTempoAtTick(e) {
    return at.getTempoAtTickImpl(
      e,
      this.tempos,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTempoAtTickImpl(e, n, r, i) {
    let s = S.le(
      n,
      r(e),
      (o, a) => i(o) - i(a)
    );
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
    const r = new Ce({ ticks: e, bpm: n, time: this.tickToSeconds(e) }), i = S.ge(
      this.tempos,
      r,
      (s, o) => s.getTicks() - o.getTicks()
    );
    return i < 0 ? this.tempos.push(r) : this.tempos.splice(i, 0, r), this.retimingTempoEvents(), r;
  }
  removeTempoChange(e) {
    if (this.getTempoChanges().length <= 1)
      throw new Error("Song has to have at least one tempo change.");
    if (e === 0)
      throw new Error("Cannot remove the first tempo.");
    this.getTempoChanges().splice(e, 1), this.retimingTempoEvents();
  }
  overwriteTempoChanges(e) {
    if (e.length === 0)
      throw new Error("Cannot clear all the tempo events.");
    const n = Ti(e);
    n.sort((i, s) => i.getTicks() - s.getTicks());
    const r = n[0];
    if (r.getTicks() > 0)
      throw new Error("The first tempo event needs to start from tick 0");
    this.tempos = [
      new Ce({
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
    this.retimingTempoEvents();
  }
  updateTempo(e, n) {
    e.setBpmInternal(n), this.retimingTempoEvents();
  }
  moveTempo(e, n) {
    const r = this.getTempoChanges()[e];
    if (!!r) {
      if (e > 0) {
        if (this.getTempoChanges()[e - 1].getTicks() === n)
          this.removeTempoChange(e - 1);
        else if (e < this.getTempoChanges().length - 1) {
          const s = this.getTempoChanges()[e + 1];
          s && s.getTicks() === n && this.removeTempoChange(e + 1);
        }
      }
      r.ticks = n, this.retimingTempoEvents();
    }
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
  overwriteTimeSignatures(e) {
    this.timeSignatures = Ti(e);
  }
  createTimeSignature({
    ticks: e,
    numerator: n,
    denominator: r
  }) {
    const i = new yi({ ticks: e, numerator: n, denominator: r }), s = S.ge(
      this.timeSignatures,
      i,
      (o, a) => o.getTicks() - a.getTicks()
    );
    return s < 0 ? this.timeSignatures.push(i) : this.timeSignatures.splice(s, 0, i), i;
  }
  removeTimeSignature(e) {
    if (this.getTimeSignatures().length <= 1)
      throw new Error("Song has to have at least one time signature change.");
    if (e === 0)
      throw new Error("Cannot remove the first time signature.");
    this.getTimeSignatures().splice(e, 1);
  }
  updateTimeSignatureAtTick(e, n, r) {
    const i = this.getTimeSignatureAtTick(e);
    i ? (i.setNumerator(n), i.setDenominator(r)) : this.createTimeSignature({
      ticks: e,
      numerator: n,
      denominator: r
    });
  }
  moveTimeSignature(e, n) {
    const r = this.getTimeSignatures()[e];
    if (!!r) {
      if (e > 0) {
        if (this.getTimeSignatures()[e - 1].getTicks() === n)
          this.removeTimeSignature(e - 1);
        else if (e < this.getTimeSignatures().length - 1) {
          const s = this.getTimeSignatures()[e + 1];
          s && s.getTicks() === n && this.removeTimeSignature(e + 1);
        }
      }
      r.ticks = n, this.timeSignatures.sort((i, s) => i.getTicks() - s.getTicks());
    }
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
    return at.getTimeSignatureAtTickImpl(
      e,
      this.timeSignatures,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTimeSignatureAtTickImpl(e, n, r, i) {
    let s = S.le(
      n,
      r(e),
      (o, a) => i(o) - i(a)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  tickToSeconds(e) {
    return at.tickToSecondsImpl(
      e,
      this.getTempoChanges(),
      this.getResolution(),
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks(),
      (n) => ({
        tick: n.getTicks(),
        bpm: n.getBpm(),
        time: n.getTime()
      })
    );
  }
  static tickToSecondsImpl(e, n, r, i, s, o) {
    if (e === 0)
      return 0;
    let a = S.lt(
      n,
      i(e),
      (g, I) => s(g) - s(I)
    );
    a == -1 && (a = 0);
    const l = n[a], u = o(l), p = e - u.tick, h = at.tempoBPMToTicksPerSecond(
      u.bpm,
      r
    );
    return u.time + p / h;
  }
  secondsToTick(e) {
    return at.secondsToTickImpl(
      e,
      this.PPQ,
      this.tempos,
      (n) => ({ getTime: () => n }),
      (n) => n.getTime(),
      (n) => ({
        tick: n.getTicks(),
        bpm: n.getBpm(),
        time: n.getTime()
      })
    );
  }
  static secondsToTickImpl(e, n, r, i, s, o) {
    if (e === 0)
      return 0;
    let a = S.lt(
      r,
      i(e),
      (g, I) => s(g) - s(I)
    );
    a == -1 && (a = 0);
    const l = r[a], u = o(l), p = e - u.time, h = at.tempoBPMToTicksPerSecond(
      u.bpm,
      n
    );
    return Math.round(u.tick + p * h);
  }
  static importMIDI(e, n, r = 0, i = !1) {
    const s = new Ih(n), o = r, a = at.DEFAULT_PPQ / s.header.ppq;
    if (i) {
      const l = [];
      for (const p of s.header.timeSignatures)
        l.push(
          new yi({
            ticks: o + bt(p.ticks, a),
            numerator: p.timeSignature[0],
            denominator: p.timeSignature[1]
          })
        );
      e.overwriteTimeSignatures(l);
      const u = [];
      o > 0 && u.push(
        new Ce({
          ticks: 0,
          time: 0,
          bpm: 120
        })
      );
      for (const p of s.header.tempos)
        u.push(
          new Ce({
            ticks: o + bt(p.ticks, a),
            time: p.time,
            bpm: p.bpm
          })
        );
      e.overwriteTempoChanges(u);
    }
    for (const l of s.tracks) {
      const u = e.createTrack({
        type: Dt.MIDI_TRACK,
        assignDefaultSamplerPlugin: !0
      });
      u.setInstrument({
        program: l.instrument.number,
        isDrum: l.instrument.percussion
      });
      const p = u.createMIDIClip({ clipStartTick: o });
      let h = Number.MAX_SAFE_INTEGER;
      for (const v of l.notes)
        p.createNote({
          pitch: v.midi,
          velocity: Math.round(v.velocity * 127),
          startTick: o + bt(v.ticks, a),
          endTick: o + bt(v.ticks + v.durationTicks, a)
        }), h = Math.min(
          h,
          o + bt(v.ticks, a)
        );
      const g = l.controlChanges[7];
      if (g)
        if (g.length === 1)
          u.setVolume(g[0].value);
        else {
          const v = new Y(zn.VOLUME);
          u.getAutomation().addAutomation(v);
          const w = u.getAutomation().getAutomationValueByTarget(v);
          for (const J of g)
            w.addPoint(
              o + bt(J.ticks, a),
              J.value
            );
        }
      const I = l.controlChanges[10];
      if (I)
        if (I.length === 1) {
          const v = Math.round(I[0].value * 127 - 64);
          u.setPan(v);
        } else {
          const v = new Y(zn.PAN);
          u.getAutomation().addAutomation(v);
          const w = u.getAutomation().getAutomationValueByTarget(v);
          for (const J of I)
            w.addPoint(o + bt(J.ticks, a), J.value);
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
      n.push(Ht.generateTrackIdInternal());
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
      throw new Error(
        "Song needs to be accessed in a plugin context in order to use privileged methods."
      );
    if (!this.pluginContext.plugin.songAccess()[e])
      throw new Error(
        `Plugin ${this.pluginContext.plugin.constructor.id()} requires access ${e} in order to run.`
      );
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
var R = /* @__PURE__ */ ((t) => (t[t.Slider = 1] = "Slider", t[t.Input = 2] = "Input", t[t.TrackSelector = 3] = "TrackSelector", t[t.Pitch = 4] = "Pitch", t[t.TrackPitchSelector = 5] = "TrackPitchSelector", t[t.InstrumentSelector = 6] = "InstrumentSelector", t[t.Select = 7] = "Select", t[t.Switch = 8] = "Switch", t[t.InputNumber = 9] = "InputNumber", t[t.MultiTrackSelector = 10] = "MultiTrackSelector", t[t.None = 11] = "None", t[t.FileSelector = 12] = "FileSelector", t[t.MultiSourceAudioSelector = 13] = "MultiSourceAudioSelector", t[t.AudioRecorder = 14] = "AudioRecorder", t[t.SelectList = 15] = "SelectList", t))(R || {});
async function Rh(t) {
  return t.arrayBuffer();
}
var wh = /* @__PURE__ */ ((t) => (t[t.SelectedTrackIds = 1] = "SelectedTrackIds", t[t.SelectedClipInfos = 2] = "SelectedClipInfos", t[t.TickAtPlayhead = 3] = "TickAtPlayhead", t[t.EditingClipInfo = 4] = "EditingClipInfo", t[t.EditingNoteIds = 5] = "EditingNoteIds", t[t.TickAtPlayheadSnappedToBeat = 6] = "TickAtPlayheadSnappedToBeat", t))(wh || {});
export {
  nn as AudioPlugin,
  wr as AutomationData,
  Y as AutomationTarget,
  zn as AutomationTargetType,
  Gt as AutomationValue,
  j as Clip,
  re as ClipType,
  Sf as DrumPitch,
  wh as InjectSource,
  gt as Note,
  at as Song,
  Ce as TempoEvent,
  xh as TickToSecondStepper,
  yi as TimeSignatureEvent,
  Ht as Track,
  Dt as TrackType,
  bh as TuneflowPipeline,
  Rs as TuneflowPlugin,
  R as WidgetType,
  wf as areTuneflowIdsEqual,
  bf as areTuneflowIdsEqualIgnoreVersion,
  kf as dbToVolumeValue,
  Ye as decodeAudioPluginTuneflowId,
  Eh as gainToDb,
  Ah as gainToVolumeValue,
  Ri as getAudioPluginTuneflowId,
  yf as getAudioPluginVersionlessTuneflowId,
  Rh as getFileContentFromFileSelector,
  Vh as maybeToRaw,
  Sh as midiNumberToPitch,
  Mh as pitchToHz,
  _h as pitchToMidiNumber,
  Oh as remapRange,
  Ch as toVersionlessTfId,
  Nh as volumeValueToDb,
  Ph as volumeValueToGain
};
