var Di = "1.13.6", ci = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, je = Array.prototype, Gn = Object.prototype, ui = typeof Symbol < "u" ? Symbol.prototype : null, Ka = je.push, fe = je.slice, ae = Gn.toString, qa = Gn.hasOwnProperty, $i = typeof ArrayBuffer < "u", za = typeof DataView < "u", Ga = Array.isArray, li = Object.keys, fi = Object.create, hi = $i && ArrayBuffer.isView, Ja = isNaN, Wa = isFinite, Li = !{ toString: null }.propertyIsEnumerable("toString"), pi = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], Qa = Math.pow(2, 53) - 1;
function q(e, t) {
  return t = t == null ? e.length - 1 : +t, function() {
    for (var n = Math.max(arguments.length - t, 0), r = Array(n), i = 0; i < n; i++)
      r[i] = arguments[i + t];
    switch (t) {
      case 0:
        return e.call(this, r);
      case 1:
        return e.call(this, arguments[0], r);
      case 2:
        return e.call(this, arguments[0], arguments[1], r);
    }
    var s = Array(t + 1);
    for (i = 0; i < t; i++)
      s[i] = arguments[i];
    return s[t] = r, e.apply(this, s);
  };
}
function Pt(e) {
  var t = typeof e;
  return t === "function" || t === "object" && !!e;
}
function Ya(e) {
  return e === null;
}
function Hi(e) {
  return e === void 0;
}
function Ki(e) {
  return e === !0 || e === !1 || ae.call(e) === "[object Boolean]";
}
function ja(e) {
  return !!(e && e.nodeType === 1);
}
function O(e) {
  var t = "[object " + e + "]";
  return function(n) {
    return ae.call(n) === t;
  };
}
const Jn = O("String"), qi = O("Number"), Xa = O("Date"), Za = O("RegExp"), tc = O("Error"), zi = O("Symbol"), Gi = O("ArrayBuffer");
var Ji = O("Function"), ec = ci.document && ci.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof ec != "function" && (Ji = function(e) {
  return typeof e == "function" || !1;
});
const B = Ji, Wi = O("Object");
var Qi = za && Wi(new DataView(new ArrayBuffer(8))), Wn = typeof Map < "u" && Wi(/* @__PURE__ */ new Map()), nc = O("DataView");
function rc(e) {
  return e != null && B(e.getInt8) && Gi(e.buffer);
}
const $e = Qi ? rc : nc, Ot = Ga || O("Array");
function vt(e, t) {
  return e != null && qa.call(e, t);
}
var An = O("Arguments");
(function() {
  An(arguments) || (An = function(e) {
    return vt(e, "callee");
  });
})();
const Qn = An;
function ic(e) {
  return !zi(e) && Wa(e) && !isNaN(parseFloat(e));
}
function Yi(e) {
  return qi(e) && Ja(e);
}
function ji(e) {
  return function() {
    return e;
  };
}
function Xi(e) {
  return function(t) {
    var n = e(t);
    return typeof n == "number" && n >= 0 && n <= Qa;
  };
}
function Zi(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
const Le = Zi("byteLength"), sc = Xi(Le);
var oc = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function ac(e) {
  return hi ? hi(e) && !$e(e) : sc(e) && oc.test(ae.call(e));
}
const ts = $i ? ac : ji(!1), z = Zi("length");
function cc(e) {
  for (var t = {}, n = e.length, r = 0; r < n; ++r)
    t[e[r]] = !0;
  return {
    contains: function(i) {
      return t[i] === !0;
    },
    push: function(i) {
      return t[i] = !0, e.push(i);
    }
  };
}
function es(e, t) {
  t = cc(t);
  var n = pi.length, r = e.constructor, i = B(r) && r.prototype || Gn, s = "constructor";
  for (vt(e, s) && !t.contains(s) && t.push(s); n--; )
    s = pi[n], s in e && e[s] !== i[s] && !t.contains(s) && t.push(s);
}
function x(e) {
  if (!Pt(e))
    return [];
  if (li)
    return li(e);
  var t = [];
  for (var n in e)
    vt(e, n) && t.push(n);
  return Li && es(e, t), t;
}
function uc(e) {
  if (e == null)
    return !0;
  var t = z(e);
  return typeof t == "number" && (Ot(e) || Jn(e) || Qn(e)) ? t === 0 : z(x(e)) === 0;
}
function ns(e, t) {
  var n = x(t), r = n.length;
  if (e == null)
    return !r;
  for (var i = Object(e), s = 0; s < r; s++) {
    var o = n[s];
    if (t[o] !== i[o] || !(o in i))
      return !1;
  }
  return !0;
}
function T(e) {
  if (e instanceof T)
    return e;
  if (!(this instanceof T))
    return new T(e);
  this._wrapped = e;
}
T.VERSION = Di;
T.prototype.value = function() {
  return this._wrapped;
};
T.prototype.valueOf = T.prototype.toJSON = T.prototype.value;
T.prototype.toString = function() {
  return String(this._wrapped);
};
function di(e) {
  return new Uint8Array(
    e.buffer || e,
    e.byteOffset || 0,
    Le(e)
  );
}
var gi = "[object DataView]";
function Pn(e, t, n, r) {
  if (e === t)
    return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null)
    return !1;
  if (e !== e)
    return t !== t;
  var i = typeof e;
  return i !== "function" && i !== "object" && typeof t != "object" ? !1 : rs(e, t, n, r);
}
function rs(e, t, n, r) {
  e instanceof T && (e = e._wrapped), t instanceof T && (t = t._wrapped);
  var i = ae.call(e);
  if (i !== ae.call(t))
    return !1;
  if (Qi && i == "[object Object]" && $e(e)) {
    if (!$e(t))
      return !1;
    i = gi;
  }
  switch (i) {
    case "[object RegExp]":
    case "[object String]":
      return "" + e == "" + t;
    case "[object Number]":
      return +e != +e ? +t != +t : +e == 0 ? 1 / +e === 1 / t : +e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object Symbol]":
      return ui.valueOf.call(e) === ui.valueOf.call(t);
    case "[object ArrayBuffer]":
    case gi:
      return rs(di(e), di(t), n, r);
  }
  var s = i === "[object Array]";
  if (!s && ts(e)) {
    var o = Le(e);
    if (o !== Le(t))
      return !1;
    if (e.buffer === t.buffer && e.byteOffset === t.byteOffset)
      return !0;
    s = !0;
  }
  if (!s) {
    if (typeof e != "object" || typeof t != "object")
      return !1;
    var a = e.constructor, l = t.constructor;
    if (a !== l && !(B(a) && a instanceof a && B(l) && l instanceof l) && "constructor" in e && "constructor" in t)
      return !1;
  }
  n = n || [], r = r || [];
  for (var u = n.length; u--; )
    if (n[u] === e)
      return r[u] === t;
  if (n.push(e), r.push(t), s) {
    if (u = e.length, u !== t.length)
      return !1;
    for (; u--; )
      if (!Pn(e[u], t[u], n, r))
        return !1;
  } else {
    var p = x(e), h;
    if (u = p.length, x(t).length !== u)
      return !1;
    for (; u--; )
      if (h = p[u], !(vt(t, h) && Pn(e[h], t[h], n, r)))
        return !1;
  }
  return n.pop(), r.pop(), !0;
}
function lc(e, t) {
  return Pn(e, t);
}
function he(e) {
  if (!Pt(e))
    return [];
  var t = [];
  for (var n in e)
    t.push(n);
  return Li && es(e, t), t;
}
function Yn(e) {
  var t = z(e);
  return function(n) {
    if (n == null)
      return !1;
    var r = he(n);
    if (z(r))
      return !1;
    for (var i = 0; i < t; i++)
      if (!B(n[e[i]]))
        return !1;
    return e !== os || !B(n[jn]);
  };
}
var jn = "forEach", is = "has", Xn = ["clear", "delete"], ss = ["get", is, "set"], fc = Xn.concat(jn, ss), os = Xn.concat(ss), hc = ["add"].concat(Xn, jn, is);
const pc = Wn ? Yn(fc) : O("Map"), dc = Wn ? Yn(os) : O("WeakMap"), gc = Wn ? Yn(hc) : O("Set"), mc = O("WeakSet");
function Qt(e) {
  for (var t = x(e), n = t.length, r = Array(n), i = 0; i < n; i++)
    r[i] = e[t[i]];
  return r;
}
function Ic(e) {
  for (var t = x(e), n = t.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [t[i], e[t[i]]];
  return r;
}
function as(e) {
  for (var t = {}, n = x(e), r = 0, i = n.length; r < i; r++)
    t[e[n[r]]] = n[r];
  return t;
}
function On(e) {
  var t = [];
  for (var n in e)
    B(e[n]) && t.push(n);
  return t.sort();
}
function Zn(e, t) {
  return function(n) {
    var r = arguments.length;
    if (t && (n = Object(n)), r < 2 || n == null)
      return n;
    for (var i = 1; i < r; i++)
      for (var s = arguments[i], o = e(s), a = o.length, l = 0; l < a; l++) {
        var u = o[l];
        (!t || n[u] === void 0) && (n[u] = s[u]);
      }
    return n;
  };
}
const cs = Zn(he), He = Zn(x), us = Zn(he, !0);
function vc() {
  return function() {
  };
}
function ls(e) {
  if (!Pt(e))
    return {};
  if (fi)
    return fi(e);
  var t = vc();
  t.prototype = e;
  var n = new t();
  return t.prototype = null, n;
}
function Tc(e, t) {
  var n = ls(e);
  return t && He(n, t), n;
}
function yc(e) {
  return Pt(e) ? Ot(e) ? e.slice() : cs({}, e) : e;
}
function wc(e, t) {
  return t(e), e;
}
function fs(e) {
  return Ot(e) ? e : [e];
}
T.toPath = fs;
function pe(e) {
  return T.toPath(e);
}
function tr(e, t) {
  for (var n = t.length, r = 0; r < n; r++) {
    if (e == null)
      return;
    e = e[t[r]];
  }
  return n ? e : void 0;
}
function hs(e, t, n) {
  var r = tr(e, pe(t));
  return Hi(r) ? n : r;
}
function bc(e, t) {
  t = pe(t);
  for (var n = t.length, r = 0; r < n; r++) {
    var i = t[r];
    if (!vt(e, i))
      return !1;
    e = e[i];
  }
  return !!n;
}
function er(e) {
  return e;
}
function ce(e) {
  return e = He({}, e), function(t) {
    return ns(t, e);
  };
}
function nr(e) {
  return e = pe(e), function(t) {
    return tr(t, e);
  };
}
function de(e, t, n) {
  if (t === void 0)
    return e;
  switch (n ?? 3) {
    case 1:
      return function(r) {
        return e.call(t, r);
      };
    case 3:
      return function(r, i, s) {
        return e.call(t, r, i, s);
      };
    case 4:
      return function(r, i, s, o) {
        return e.call(t, r, i, s, o);
      };
  }
  return function() {
    return e.apply(t, arguments);
  };
}
function ps(e, t, n) {
  return e == null ? er : B(e) ? de(e, t, n) : Pt(e) && !Ot(e) ? ce(e) : nr(e);
}
function rr(e, t) {
  return ps(e, t, 1 / 0);
}
T.iteratee = rr;
function G(e, t, n) {
  return T.iteratee !== rr ? T.iteratee(e, t) : ps(e, t, n);
}
function kc(e, t, n) {
  t = G(t, n);
  for (var r = x(e), i = r.length, s = {}, o = 0; o < i; o++) {
    var a = r[o];
    s[a] = t(e[a], a, e);
  }
  return s;
}
function ds() {
}
function Sc(e) {
  return e == null ? ds : function(t) {
    return hs(e, t);
  };
}
function Cc(e, t, n) {
  var r = Array(Math.max(0, e));
  t = de(t, n, 1);
  for (var i = 0; i < e; i++)
    r[i] = t(i);
  return r;
}
function Mn(e, t) {
  return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
}
const ue = Date.now || function() {
  return new Date().getTime();
};
function gs(e) {
  var t = function(s) {
    return e[s];
  }, n = "(?:" + x(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
  return function(s) {
    return s = s == null ? "" : "" + s, r.test(s) ? s.replace(i, t) : s;
  };
}
const ms = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, _c = gs(ms), xc = as(ms), Ec = gs(xc), Nc = T.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var yn = /(.)^/, Ac = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, Pc = /\\|'|\r|\n|\u2028|\u2029/g;
function Oc(e) {
  return "\\" + Ac[e];
}
var Mc = /^\s*(\w|\$)+\s*$/;
function Vc(e, t, n) {
  !t && n && (t = n), t = us({}, t, T.templateSettings);
  var r = RegExp([
    (t.escape || yn).source,
    (t.interpolate || yn).source,
    (t.evaluate || yn).source
  ].join("|") + "|$", "g"), i = 0, s = "__p+='";
  e.replace(r, function(u, p, h, g, I) {
    return s += e.slice(i, I).replace(Pc, Oc), i = I + u.length, p ? s += `'+
((__t=(` + p + `))==null?'':_.escape(__t))+
'` : h ? s += `'+
((__t=(` + h + `))==null?'':__t)+
'` : g && (s += `';
` + g + `
__p+='`), u;
  }), s += `';
`;
  var o = t.variable;
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
function Rc(e, t, n) {
  t = pe(t);
  var r = t.length;
  if (!r)
    return B(n) ? n.call(e) : n;
  for (var i = 0; i < r; i++) {
    var s = e == null ? void 0 : e[t[i]];
    s === void 0 && (s = n, i = r), e = B(s) ? s.call(e) : s;
  }
  return e;
}
var Uc = 0;
function Fc(e) {
  var t = ++Uc + "";
  return e ? e + t : t;
}
function Bc(e) {
  var t = T(e);
  return t._chain = !0, t;
}
function Is(e, t, n, r, i) {
  if (!(r instanceof t))
    return e.apply(n, i);
  var s = ls(e.prototype), o = e.apply(s, i);
  return Pt(o) ? o : s;
}
var Yt = q(function(e, t) {
  var n = Yt.placeholder, r = function() {
    for (var i = 0, s = t.length, o = Array(s), a = 0; a < s; a++)
      o[a] = t[a] === n ? arguments[i++] : t[a];
    for (; i < arguments.length; )
      o.push(arguments[i++]);
    return Is(e, r, this, this, o);
  };
  return r;
});
Yt.placeholder = T;
const vs = q(function(e, t, n) {
  if (!B(e))
    throw new TypeError("Bind must be called on a function");
  var r = q(function(i) {
    return Is(e, r, t, this, n.concat(i));
  });
  return r;
}), W = Xi(z);
function Mt(e, t, n, r) {
  if (r = r || [], !t && t !== 0)
    t = 1 / 0;
  else if (t <= 0)
    return r.concat(e);
  for (var i = r.length, s = 0, o = z(e); s < o; s++) {
    var a = e[s];
    if (W(a) && (Ot(a) || Qn(a)))
      if (t > 1)
        Mt(a, t - 1, n, r), i = r.length;
      else
        for (var l = 0, u = a.length; l < u; )
          r[i++] = a[l++];
    else
      n || (r[i++] = a);
  }
  return r;
}
const Dc = q(function(e, t) {
  t = Mt(t, !1, !1);
  var n = t.length;
  if (n < 1)
    throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = t[n];
    e[r] = vs(e[r], e);
  }
  return e;
});
function $c(e, t) {
  var n = function(r) {
    var i = n.cache, s = "" + (t ? t.apply(this, arguments) : r);
    return vt(i, s) || (i[s] = e.apply(this, arguments)), i[s];
  };
  return n.cache = {}, n;
}
const Ts = q(function(e, t, n) {
  return setTimeout(function() {
    return e.apply(null, n);
  }, t);
}), Lc = Yt(Ts, T, 1);
function Hc(e, t, n) {
  var r, i, s, o, a = 0;
  n || (n = {});
  var l = function() {
    a = n.leading === !1 ? 0 : ue(), r = null, o = e.apply(i, s), r || (i = s = null);
  }, u = function() {
    var p = ue();
    !a && n.leading === !1 && (a = p);
    var h = t - (p - a);
    return i = this, s = arguments, h <= 0 || h > t ? (r && (clearTimeout(r), r = null), a = p, o = e.apply(i, s), r || (i = s = null)) : !r && n.trailing !== !1 && (r = setTimeout(l, h)), o;
  };
  return u.cancel = function() {
    clearTimeout(r), a = 0, r = i = s = null;
  }, u;
}
function Kc(e, t, n) {
  var r, i, s, o, a, l = function() {
    var p = ue() - i;
    t > p ? r = setTimeout(l, t - p) : (r = null, n || (o = e.apply(a, s)), r || (s = a = null));
  }, u = q(function(p) {
    return a = this, s = p, i = ue(), r || (r = setTimeout(l, t), n && (o = e.apply(a, s))), o;
  });
  return u.cancel = function() {
    clearTimeout(r), r = s = a = null;
  }, u;
}
function qc(e, t) {
  return Yt(t, e);
}
function ir(e) {
  return function() {
    return !e.apply(this, arguments);
  };
}
function zc() {
  var e = arguments, t = e.length - 1;
  return function() {
    for (var n = t, r = e[t].apply(this, arguments); n--; )
      r = e[n].call(this, r);
    return r;
  };
}
function Gc(e, t) {
  return function() {
    if (--e < 1)
      return t.apply(this, arguments);
  };
}
function ys(e, t) {
  var n;
  return function() {
    return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n;
  };
}
const Jc = Yt(ys, 2);
function ws(e, t, n) {
  t = G(t, n);
  for (var r = x(e), i, s = 0, o = r.length; s < o; s++)
    if (i = r[s], t(e[i], i, e))
      return i;
}
function bs(e) {
  return function(t, n, r) {
    n = G(n, r);
    for (var i = z(t), s = e > 0 ? 0 : i - 1; s >= 0 && s < i; s += e)
      if (n(t[s], s, t))
        return s;
    return -1;
  };
}
const Jt = bs(1), ks = bs(-1);
function Ss(e, t, n, r) {
  n = G(n, r, 1);
  for (var i = n(t), s = 0, o = z(e); s < o; ) {
    var a = Math.floor((s + o) / 2);
    n(e[a]) < i ? s = a + 1 : o = a;
  }
  return s;
}
function Cs(e, t, n) {
  return function(r, i, s) {
    var o = 0, a = z(r);
    if (typeof s == "number")
      e > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;
    else if (n && s && a)
      return s = n(r, i), r[s] === i ? s : -1;
    if (i !== i)
      return s = t(fe.call(r, o, a), Yi), s >= 0 ? s + o : -1;
    for (s = e > 0 ? o : a - 1; s >= 0 && s < a; s += e)
      if (r[s] === i)
        return s;
    return -1;
  };
}
const _s = Cs(1, Jt, Ss), Wc = Cs(-1, ks);
function Ke(e, t, n) {
  var r = W(e) ? Jt : ws, i = r(e, t, n);
  if (i !== void 0 && i !== -1)
    return e[i];
}
function Qc(e, t) {
  return Ke(e, ce(t));
}
function ut(e, t, n) {
  t = de(t, n);
  var r, i;
  if (W(e))
    for (r = 0, i = e.length; r < i; r++)
      t(e[r], r, e);
  else {
    var s = x(e);
    for (r = 0, i = s.length; r < i; r++)
      t(e[s[r]], s[r], e);
  }
  return e;
}
function Nt(e, t, n) {
  t = G(t, n);
  for (var r = !W(e) && x(e), i = (r || e).length, s = Array(i), o = 0; o < i; o++) {
    var a = r ? r[o] : o;
    s[o] = t(e[a], a, e);
  }
  return s;
}
function xs(e) {
  var t = function(n, r, i, s) {
    var o = !W(n) && x(n), a = (o || n).length, l = e > 0 ? 0 : a - 1;
    for (s || (i = n[o ? o[l] : l], l += e); l >= 0 && l < a; l += e) {
      var u = o ? o[l] : l;
      i = r(i, n[u], u, n);
    }
    return i;
  };
  return function(n, r, i, s) {
    var o = arguments.length >= 3;
    return t(n, de(r, s, 4), i, o);
  };
}
const wn = xs(1), mi = xs(-1);
function Wt(e, t, n) {
  var r = [];
  return t = G(t, n), ut(e, function(i, s, o) {
    t(i, s, o) && r.push(i);
  }), r;
}
function Yc(e, t, n) {
  return Wt(e, ir(G(t)), n);
}
function Ii(e, t, n) {
  t = G(t, n);
  for (var r = !W(e) && x(e), i = (r || e).length, s = 0; s < i; s++) {
    var o = r ? r[s] : s;
    if (!t(e[o], o, e))
      return !1;
  }
  return !0;
}
function vi(e, t, n) {
  t = G(t, n);
  for (var r = !W(e) && x(e), i = (r || e).length, s = 0; s < i; s++) {
    var o = r ? r[s] : s;
    if (t(e[o], o, e))
      return !0;
  }
  return !1;
}
function ct(e, t, n, r) {
  return W(e) || (e = Qt(e)), (typeof n != "number" || r) && (n = 0), _s(e, t, n) >= 0;
}
const jc = q(function(e, t, n) {
  var r, i;
  return B(t) ? i = t : (t = pe(t), r = t.slice(0, -1), t = t[t.length - 1]), Nt(e, function(s) {
    var o = i;
    if (!o) {
      if (r && r.length && (s = tr(s, r)), s == null)
        return;
      o = s[t];
    }
    return o == null ? o : o.apply(s, n);
  });
});
function sr(e, t) {
  return Nt(e, nr(t));
}
function Xc(e, t) {
  return Wt(e, ce(t));
}
function Es(e, t, n) {
  var r = -1 / 0, i = -1 / 0, s, o;
  if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
    e = W(e) ? e : Qt(e);
    for (var a = 0, l = e.length; a < l; a++)
      s = e[a], s != null && s > r && (r = s);
  } else
    t = G(t, n), ut(e, function(u, p, h) {
      o = t(u, p, h), (o > i || o === -1 / 0 && r === -1 / 0) && (r = u, i = o);
    });
  return r;
}
function Zc(e, t, n) {
  var r = 1 / 0, i = 1 / 0, s, o;
  if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
    e = W(e) ? e : Qt(e);
    for (var a = 0, l = e.length; a < l; a++)
      s = e[a], s != null && s < r && (r = s);
  } else
    t = G(t, n), ut(e, function(u, p, h) {
      o = t(u, p, h), (o < i || o === 1 / 0 && r === 1 / 0) && (r = u, i = o);
    });
  return r;
}
var tu = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function Ns(e) {
  return e ? Ot(e) ? fe.call(e) : Jn(e) ? e.match(tu) : W(e) ? Nt(e, er) : Qt(e) : [];
}
function As(e, t, n) {
  if (t == null || n)
    return W(e) || (e = Qt(e)), e[Mn(e.length - 1)];
  var r = Ns(e), i = z(r);
  t = Math.max(Math.min(t, i), 0);
  for (var s = i - 1, o = 0; o < t; o++) {
    var a = Mn(o, s), l = r[o];
    r[o] = r[a], r[a] = l;
  }
  return r.slice(0, t);
}
function eu(e) {
  return As(e, 1 / 0);
}
function nu(e, t, n) {
  var r = 0;
  return t = G(t, n), sr(Nt(e, function(i, s, o) {
    return {
      value: i,
      index: r++,
      criteria: t(i, s, o)
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
function Xe(e, t) {
  return function(n, r, i) {
    var s = t ? [[], []] : {};
    return r = G(r, i), ut(n, function(o, a) {
      var l = r(o, a, n);
      e(s, o, l);
    }), s;
  };
}
const ru = Xe(function(e, t, n) {
  vt(e, n) ? e[n].push(t) : e[n] = [t];
}), iu = Xe(function(e, t, n) {
  e[n] = t;
}), su = Xe(function(e, t, n) {
  vt(e, n) ? e[n]++ : e[n] = 1;
}), ou = Xe(function(e, t, n) {
  e[n ? 0 : 1].push(t);
}, !0);
function au(e) {
  return e == null ? 0 : W(e) ? e.length : x(e).length;
}
function cu(e, t, n) {
  return t in n;
}
const Ps = q(function(e, t) {
  var n = {}, r = t[0];
  if (e == null)
    return n;
  B(r) ? (t.length > 1 && (r = de(r, t[1])), t = he(e)) : (r = cu, t = Mt(t, !1, !1), e = Object(e));
  for (var i = 0, s = t.length; i < s; i++) {
    var o = t[i], a = e[o];
    r(a, o, e) && (n[o] = a);
  }
  return n;
}), uu = q(function(e, t) {
  var n = t[0], r;
  return B(n) ? (n = ir(n), t.length > 1 && (r = t[1])) : (t = Nt(Mt(t, !1, !1), String), n = function(i, s) {
    return !ct(t, s);
  }), Ps(e, n, r);
});
function Os(e, t, n) {
  return fe.call(e, 0, Math.max(0, e.length - (t == null || n ? 1 : t)));
}
function bn(e, t, n) {
  return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[0] : Os(e, e.length - t);
}
function Be(e, t, n) {
  return fe.call(e, t == null || n ? 1 : t);
}
function lu(e, t, n) {
  return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[e.length - 1] : Be(e, Math.max(0, e.length - t));
}
function fu(e) {
  return Wt(e, Boolean);
}
function hu(e, t) {
  return Mt(e, t, !1);
}
const Ms = q(function(e, t) {
  return t = Mt(t, !0, !0), Wt(e, function(n) {
    return !ct(t, n);
  });
}), pu = q(function(e, t) {
  return Ms(e, t);
});
function Vn(e, t, n, r) {
  Ki(t) || (r = n, n = t, t = !1), n != null && (n = G(n, r));
  for (var i = [], s = [], o = 0, a = z(e); o < a; o++) {
    var l = e[o], u = n ? n(l, o, e) : l;
    t && !n ? ((!o || s !== u) && i.push(l), s = u) : n ? ct(s, u) || (s.push(u), i.push(l)) : ct(i, l) || i.push(l);
  }
  return i;
}
const du = q(function(e) {
  return Vn(Mt(e, !0, !0));
});
function gu(e) {
  for (var t = [], n = arguments.length, r = 0, i = z(e); r < i; r++) {
    var s = e[r];
    if (!ct(t, s)) {
      var o;
      for (o = 1; o < n && ct(arguments[o], s); o++)
        ;
      o === n && t.push(s);
    }
  }
  return t;
}
function Rn(e) {
  for (var t = e && Es(e, z).length || 0, n = Array(t), r = 0; r < t; r++)
    n[r] = sr(e, r);
  return n;
}
const mu = q(Rn);
function Iu(e, t) {
  for (var n = {}, r = 0, i = z(e); r < i; r++)
    t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
  return n;
}
function vu(e, t, n) {
  t == null && (t = e || 0, e = 0), n || (n = t < e ? -1 : 1);
  for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), s = 0; s < r; s++, e += n)
    i[s] = e;
  return i;
}
function Tu(e, t) {
  if (t == null || t < 1)
    return [];
  for (var n = [], r = 0, i = e.length; r < i; )
    n.push(fe.call(e, r, r += t));
  return n;
}
function or(e, t) {
  return e._chain ? T(t).chain() : t;
}
function Vs(e) {
  return ut(On(e), function(t) {
    var n = T[t] = e[t];
    T.prototype[t] = function() {
      var r = [this._wrapped];
      return Ka.apply(r, arguments), or(this, n.apply(T, r));
    };
  }), T;
}
ut(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
  var t = je[e];
  T.prototype[e] = function() {
    var n = this._wrapped;
    return n != null && (t.apply(n, arguments), (e === "shift" || e === "splice") && n.length === 0 && delete n[0]), or(this, n);
  };
});
ut(["concat", "join", "slice"], function(e) {
  var t = je[e];
  T.prototype[e] = function() {
    var n = this._wrapped;
    return n != null && (n = t.apply(n, arguments)), or(this, n);
  };
});
const yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: Di,
  restArguments: q,
  isObject: Pt,
  isNull: Ya,
  isUndefined: Hi,
  isBoolean: Ki,
  isElement: ja,
  isString: Jn,
  isNumber: qi,
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
  times: Cc,
  random: Mn,
  now: ue,
  escape: _c,
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
  debounce: Kc,
  wrap: qc,
  negate: ir,
  compose: zc,
  after: Gc,
  before: ys,
  once: Jc,
  findKey: ws,
  findIndex: Jt,
  findLastIndex: ks,
  sortedIndex: Ss,
  indexOf: _s,
  lastIndexOf: Wc,
  find: Ke,
  detect: Ke,
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
  sample: As,
  sortBy: nu,
  groupBy: ru,
  indexBy: iu,
  countBy: su,
  partition: ou,
  toArray: Ns,
  size: au,
  pick: Ps,
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
var A = Vs(yu);
A._ = A;
let Ze = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
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
  static pluginInfo() {
    return null;
  }
  static allowReset() {
    return !0;
  }
  async init(t, n) {
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
  async run(t, n, r) {
  }
  static async create(t, n) {
    const r = new this();
    return r.resetInternal(), await r.init(t, n), r;
  }
  get instanceId() {
    return this.instanceIdInternal;
  }
  getParam(t, n) {
    return t[n];
  }
  hasAllParamsSet() {
    for (const t of x(this.params()))
      if (!this.isParamProvided(t))
        return !1;
    return !0;
  }
  isParamProvided(t) {
    if (this.params()[t].optional)
      return !0;
    const n = this.paramsResultInternal[t];
    if (n == null)
      return !1;
    const i = this.params()[t].widget.type;
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
  static getPrefixedArtifactId(t) {
    return `${this.id()}.${t}`;
  }
  setProgress(t) {
    this.progress = t;
  }
  getProgress() {
    return this.progress;
  }
  getIsExecuting() {
    return this.isExecuting;
  }
  setParamsInternal(t) {
    this.paramsResultInternal = t, this.maybeSyncEnabledWithParamsReadiness();
  }
  getParamsInternal() {
    return this.paramsResultInternal;
  }
  resetParamsInternal() {
    for (const t of x(this.params())) {
      const n = this.params()[t];
      this.paramsResultInternal[t] = n.defaultValue;
    }
    this.maybeSyncEnabledWithParamsReadiness();
  }
  resetInternal() {
    this.resetParamsInternal(), this.allowManualApplyAdjust() && (this.enabledInternal = !1);
  }
  setEnabledInternal(t) {
    this.enabledInternal = t;
  }
  maybeSyncEnabledWithParamsReadiness() {
    this.allowManualApplyAdjust() && !this.hasAllParamsSet() && this.setEnabledInternal(!1);
  }
  static generatePluginIdInternal() {
    return Ze(10);
  }
}
class Sh {
  plugins = [];
  threwErrorInLastRun = !1;
  maxNumPluginsToKeep = 50;
  originalSong;
  cloneSongFnInternal;
  readApisInternal;
  activePluginIndex = -1;
  addAsOrReplaceActivePlugin(t) {
    let n;
    return this.activePluginIndex <= -1 ? n = 0 : this.plugins[this.activePluginIndex].isRollbackable ? n = this.activePluginIndex + 1 : n = this.activePluginIndex, this.plugins.length > 0 && this.plugins.splice(n, this.plugins.length - n), this.addPluginAt(t, n), this.getPluginIndexByPluginInstanceId(t.instanceId);
  }
  getPlugins() {
    return this.plugins;
  }
  resetCache() {
    for (const t of this.plugins)
      delete t.songCacheInternal;
  }
  setOriginalSong(t) {
    this.originalSong = t;
  }
  hasOriginalSong() {
    return !!this.originalSong;
  }
  async run(t = 0) {
    if (!this.originalSong)
      return this.threwErrorInLastRun = !0, null;
    t = Math.max(0, t), this.setActivePluginIndex(t), this.threwErrorInLastRun = !1;
    const n = this.getIndexOfLatestPluginWithCacheBeforeIndex(t), r = await this.cloneCachedSongAtPluginIndex(n);
    for (let i = t; i < this.plugins.length; i += 1)
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
  restoreCachedPlugin(t) {
    return this.setActivePluginIndex(t), this.cloneCachedSongAtPluginIndex(t);
  }
  async cloneSong(t) {
    if (!this.cloneSongFnInternal)
      throw new Error("Pipeline is not provided with a clone song function.");
    return this.cloneSongFnInternal(t);
  }
  getActivePluginIndex() {
    return this.activePluginIndex;
  }
  setActivePluginIndex(t) {
    this.activePluginIndex = t;
  }
  async cloneCachedSongAtPluginIndex(t) {
    if (t >= 0)
      return await this.cloneSong(this.plugins[t].songCacheInternal);
    if (!this.originalSong)
      throw new Error("Original song is not avaiable to clone.");
    return await this.cloneSong(this.originalSong);
  }
  reset() {
    this.plugins.splice(0, this.plugins.length), this.originalSong = void 0, this.activePluginIndex = -1, this.threwErrorInLastRun = !1;
  }
  isPluginFunctioning(t) {
    return !!t.songCacheInternal;
  }
  getPluginIndexByPluginInstanceId(t) {
    return Jt(this.plugins, (n) => n.instanceId === t);
  }
  getThrewErrorInLastRun() {
    return this.threwErrorInLastRun;
  }
  getPluginCache(t) {
    return t.songCacheInternal;
  }
  setMaxNumPluginsToKeep(t) {
    this.maxNumPluginsToKeep = t, this.maintainPluginListSize();
  }
  getIndexOfLatestPluginWithCacheBeforeIndex(t) {
    for (let n = t - 1; n >= 0; n -= 1)
      if (this.getPluginCache(this.plugins[n]))
        return n;
    return -1;
  }
  maintainPluginListSize() {
    for (; this.plugins.length > this.maxNumPluginsToKeep && this.plugins.length > 0; )
      this.plugins.shift();
  }
  addPluginAt(t, n) {
    this.plugins.splice(n, 0, t), this.maintainPluginListSize();
  }
}
var X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function wu(e, t, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var o = r + i >>> 1, a = e[o], l = n !== void 0 ? n(a, t) : a - t;
    l >= 0 ? (s = o, i = o - 1) : r = o + 1;
  }
  return s;
}
function bu(e, t, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var o = r + i >>> 1, a = e[o], l = n !== void 0 ? n(a, t) : a - t;
    l > 0 ? (s = o, i = o - 1) : r = o + 1;
  }
  return s;
}
function ku(e, t, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var o = r + i >>> 1, a = e[o], l = n !== void 0 ? n(a, t) : a - t;
    l < 0 ? (s = o, r = o + 1) : i = o - 1;
  }
  return s;
}
function Su(e, t, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var o = r + i >>> 1, a = e[o], l = n !== void 0 ? n(a, t) : a - t;
    l <= 0 ? (s = o, r = o + 1) : i = o - 1;
  }
  return s;
}
function Cu(e, t, n, r, i) {
  for (; r <= i; ) {
    var s = r + i >>> 1, o = e[s], a = n !== void 0 ? n(o, t) : o - t;
    if (a === 0)
      return s;
    a <= 0 ? r = s + 1 : i = s - 1;
  }
  return -1;
}
function te(e, t, n, r, i, s) {
  return typeof n == "function" ? s(e, t, n, r === void 0 ? 0 : r | 0, i === void 0 ? e.length - 1 : i | 0) : s(e, t, void 0, n === void 0 ? 0 : n | 0, r === void 0 ? e.length - 1 : r | 0);
}
var S = {
  ge: function(e, t, n, r, i) {
    return te(e, t, n, r, i, wu);
  },
  gt: function(e, t, n, r, i) {
    return te(e, t, n, r, i, bu);
  },
  lt: function(e, t, n, r, i) {
    return te(e, t, n, r, i, ku);
  },
  le: function(e, t, n, r, i) {
    return te(e, t, n, r, i, Su);
  },
  eq: function(e, t, n, r, i) {
    return te(e, t, n, r, i, Cu);
  }
}, Un = { exports: {} };
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", o = "[object Array]", a = "[object Boolean]", l = "[object Date]", u = "[object Error]", p = "[object Function]", h = "[object GeneratorFunction]", g = "[object Map]", I = "[object Number]", v = "[object Object]", w = "[object Promise]", J = "[object RegExp]", P = "[object Set]", cn = "[object String]", k = "[object Symbol]", jt = "[object WeakMap]", ve = "[object ArrayBuffer]", Te = "[object DataView]", Er = "[object Float32Array]", Nr = "[object Float64Array]", Ar = "[object Int8Array]", Pr = "[object Int16Array]", Or = "[object Int32Array]", Mr = "[object Uint8Array]", Vr = "[object Uint8ClampedArray]", Rr = "[object Uint16Array]", Ur = "[object Uint32Array]", To = /[\\^$.*+?()[\]{}|]/g, yo = /\w*$/, wo = /^\[object .+?Constructor\]$/, bo = /^(?:0|[1-9]\d*)$/, b = {};
  b[s] = b[o] = b[ve] = b[Te] = b[a] = b[l] = b[Er] = b[Nr] = b[Ar] = b[Pr] = b[Or] = b[g] = b[I] = b[v] = b[J] = b[P] = b[cn] = b[k] = b[Mr] = b[Vr] = b[Rr] = b[Ur] = !0, b[u] = b[p] = b[jt] = !1;
  var ko = typeof X == "object" && X && X.Object === Object && X, So = typeof self == "object" && self && self.Object === Object && self, ot = ko || So || Function("return this")(), Fr = t && !t.nodeType && t, Br = Fr && !0 && e && !e.nodeType && e, Co = Br && Br.exports === Fr;
  function _o(c, f) {
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
  function Ao(c, f) {
    for (var d = -1, m = Array(c); ++d < c; )
      m[d] = f(d);
    return m;
  }
  function Po(c, f) {
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
  var Oo = Array.prototype, Mo = Function.prototype, ye = Object.prototype, ln = ot["__core-js_shared__"], Kr = function() {
    var c = /[^.]+$/.exec(ln && ln.keys && ln.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), qr = Mo.toString, lt = ye.hasOwnProperty, we = ye.toString, Vo = RegExp(
    "^" + qr.call(lt).replace(To, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), zr = Co ? ot.Buffer : void 0, Gr = ot.Symbol, Jr = ot.Uint8Array, Ro = un(Object.getPrototypeOf, Object), Uo = Object.create, Fo = ye.propertyIsEnumerable, Bo = Oo.splice, Wr = Object.getOwnPropertySymbols, Do = zr ? zr.isBuffer : void 0, $o = un(Object.keys, Object), fn = Ut(ot, "DataView"), Xt = Ut(ot, "Map"), hn = Ut(ot, "Promise"), pn = Ut(ot, "Set"), dn = Ut(ot, "WeakMap"), Zt = Ut(Object, "create"), Lo = wt(fn), Ho = wt(Xt), Ko = wt(hn), qo = wt(pn), zo = wt(dn), Qr = Gr ? Gr.prototype : void 0, Yr = Qr ? Qr.valueOf : void 0;
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
  function at(c) {
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
  at.prototype.clear = jo, at.prototype.delete = Xo, at.prototype.get = Zo, at.prototype.has = ta, at.prototype.set = ea;
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
      map: new (Xt || at)(),
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
    this.__data__ = new at(c);
  }
  function aa() {
    this.__data__ = new at();
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
    if (d instanceof at) {
      var m = d.__data__;
      if (!Xt || m.length < n - 1)
        return m.push([c, f]), this;
      d = this.__data__ = new Vt(m);
    }
    return d.set(c, f), this;
  }
  Rt.prototype.clear = aa, Rt.prototype.delete = ca, Rt.prototype.get = ua, Rt.prototype.has = la, Rt.prototype.set = fa;
  function ha(c, f) {
    var d = In(c) || Ua(c) ? Ao(c.length, String) : [], m = d.length, N = !!m;
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
        return _a(c, L);
    } else {
      var Ft = yt(c), si = Ft == p || Ft == h;
      if (Ba(c))
        return Ta(c, f);
      if (Ft == v || Ft == s || si && !M) {
        if ($r(c))
          return M ? c : {};
        if (L = Aa(si ? {} : c), !f)
          return xa(c, pa(L, c));
      } else {
        if (!b[Ft])
          return M ? c : {};
        L = Pa(c, Ft, gn, f);
      }
    }
    Q || (Q = new Rt());
    var oi = Q.get(c);
    if (oi)
      return oi;
    if (Q.set(c, L), !ii)
      var ai = d ? Ea(c) : vn(c);
    return Eo(ai || c, function(Tn, Ce) {
      ai && (Ce = Tn, Tn = c[Ce]), jr(L, Ce, gn(Tn, f, d, m, Ce, c, Q));
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
    return Dr(m, _o, new c.constructor());
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
  function Ca(c, f) {
    var d = f ? mn(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.length);
  }
  function _a(c, f) {
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
    var d = Po(c, f);
    return Ia(d) ? d : void 0;
  }
  var Zr = Wr ? un(Wr, Object) : La, yt = ma;
  (fn && yt(new fn(new ArrayBuffer(1))) != Te || Xt && yt(new Xt()) != g || hn && yt(hn.resolve()) != w || pn && yt(new pn()) != P || dn && yt(new dn()) != jt) && (yt = function(c) {
    var f = we.call(c), d = f == v ? c.constructor : void 0, m = d ? wt(d) : void 0;
    if (m)
      switch (m) {
        case Lo:
          return Te;
        case Ho:
          return g;
        case Ko:
          return w;
        case qo:
          return P;
        case zo:
          return jt;
      }
    return f;
  });
  function Na(c) {
    var f = c.length, d = c.constructor(f);
    return f && typeof c[0] == "string" && lt.call(c, "index") && (d.index = c.index, d.input = c.input), d;
  }
  function Aa(c) {
    return typeof c.constructor == "function" && !ti(c) ? da(Ro(c)) : {};
  }
  function Pa(c, f, d, m) {
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
      case Ar:
      case Pr:
      case Or:
      case Mr:
      case Vr:
      case Rr:
      case Ur:
        return Ca(c, m);
      case g:
        return wa(c, m, d);
      case I:
      case cn:
        return new N(c);
      case J:
        return ba(c);
      case P:
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
    return !!Kr && Kr in c;
  }
  function ti(c) {
    var f = c && c.constructor, d = typeof f == "function" && f.prototype || ye;
    return c === d;
  }
  function wt(c) {
    if (c != null) {
      try {
        return qr.call(c);
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
  e.exports = Ra;
})(Un, Un.exports);
const Ti = Un.exports;
class _e {
  ticks;
  bpm;
  time;
  constructor({
    ticks: t,
    bpm: n,
    time: r
  }) {
    this.ticks = t, this.bpm = n, this.time = r;
  }
  getTicks() {
    return this.ticks;
  }
  getBpm() {
    return this.bpm;
  }
  setBpmInternal(t) {
    this.bpm = t;
  }
  getTime() {
    return this.time;
  }
  setTimeInternal(t) {
    this.time = t;
  }
}
class yi {
  ticks;
  numerator;
  denominator;
  constructor({
    ticks: t,
    numerator: n,
    denominator: r
  }) {
    this.ticks = t, this.numerator = n, this.denominator = r;
  }
  getTicks() {
    return this.ticks;
  }
  setTicks(t) {
    this.ticks = t;
  }
  getNumerator() {
    return this.numerator;
  }
  setNumerator(t) {
    this.numerator = t;
  }
  getDenominator() {
    return this.denominator;
  }
  setDenominator(t) {
    this.denominator = t;
  }
}
function _u(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function ar(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = nt(r) ? Au(r) : ar(r);
      if (i)
        for (const s in i)
          t[s] = i[s];
    }
    return t;
  } else {
    if (nt(e))
      return e;
    if (K(e))
      return e;
  }
}
const xu = /;(?![^(]*\))/g, Eu = /:([^]+)/, Nu = /\/\*.*?\*\//gs;
function Au(e) {
  const t = {};
  return e.replace(Nu, "").split(xu).forEach((n) => {
    if (n) {
      const r = n.split(Eu);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function cr(e) {
  let t = "";
  if (nt(e))
    t = e;
  else if (C(e))
    for (let n = 0; n < e.length; n++) {
      const r = cr(e[n]);
      r && (t += r + " ");
    }
  else if (K(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const st = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const ur = () => {
}, Pu = () => !1, Ou = /^on[^a-z]/, Mu = (e) => Ou.test(e), et = Object.assign, Vu = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ru = Object.prototype.hasOwnProperty, _ = (e, t) => Ru.call(e, t), C = Array.isArray, Kt = (e) => tn(e) === "[object Map]", Uu = (e) => tn(e) === "[object Set]", D = (e) => typeof e == "function", nt = (e) => typeof e == "string", lr = (e) => typeof e == "symbol", K = (e) => e !== null && typeof e == "object", Fu = (e) => K(e) && D(e.then) && D(e.catch), Bu = Object.prototype.toString, tn = (e) => Bu.call(e), Us = (e) => tn(e).slice(8, -1), Du = (e) => tn(e) === "[object Object]", fr = (e) => nt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $u = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ch = $u((e) => e.charAt(0).toUpperCase() + e.slice(1)), qe = (e, t) => !Object.is(e, t), Lu = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Hu = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let wi;
const Ku = () => wi || (wi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function bi(e, ...t) {
}
let qu;
function zu(e, t = qu) {
  t && t.active && t.effects.push(e);
}
const Fn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Fs = (e) => (e.w & mt) > 0, Bs = (e) => (e.n & mt) > 0, Gu = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= mt;
}, Ju = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const i = t[r];
      Fs(i) && !Bs(i) ? i.delete(e) : t[n++] = i, i.w &= ~mt, i.n &= ~mt;
    }
    t.length = n;
  }
}, Bn = /* @__PURE__ */ new WeakMap();
let ne = 0, mt = 1;
const Dn = 30;
let H;
const St = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), $n = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Wu {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, zu(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = H, n = Ct;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = H, H = this, Ct = !0, mt = 1 << ++ne, ne <= Dn ? Gu(this) : ki(this), this.fn();
    } finally {
      ne <= Dn && Ju(this), mt = 1 << --ne, H = this.parent, Ct = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    H === this ? this.deferStop = !0 : this.active && (ki(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ki(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Ct = !0;
const Ds = [];
function $s() {
  Ds.push(Ct), Ct = !1;
}
function Ls() {
  const e = Ds.pop();
  Ct = e === void 0 ? !0 : e;
}
function Z(e, t, n) {
  if (Ct && H) {
    let r = Bn.get(e);
    r || Bn.set(e, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Fn());
    const s = process.env.NODE_ENV !== "production" ? { effect: H, target: e, type: t, key: n } : void 0;
    Qu(i, s);
  }
}
function Qu(e, t) {
  let n = !1;
  ne <= Dn ? Bs(e) || (e.n |= mt, n = !Fs(e)) : n = !e.has(H), n && (e.add(H), H.deps.push(e), process.env.NODE_ENV !== "production" && H.onTrack && H.onTrack(Object.assign({ effect: H }, t)));
}
function It(e, t, n, r, i, s) {
  const o = Bn.get(e);
  if (!o)
    return;
  let a = [];
  if (t === "clear")
    a = [...o.values()];
  else if (n === "length" && C(e)) {
    const u = Hu(r);
    o.forEach((p, h) => {
      (h === "length" || h >= u) && a.push(p);
    });
  } else
    switch (n !== void 0 && a.push(o.get(n)), t) {
      case "add":
        C(e) ? fr(n) && a.push(o.get("length")) : (a.push(o.get(St)), Kt(e) && a.push(o.get($n)));
        break;
      case "delete":
        C(e) || (a.push(o.get(St)), Kt(e) && a.push(o.get($n)));
        break;
      case "set":
        Kt(e) && a.push(o.get(St));
        break;
    }
  const l = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (a.length === 1)
    a[0] && (process.env.NODE_ENV !== "production" ? xe(a[0], l) : xe(a[0]));
  else {
    const u = [];
    for (const p of a)
      p && u.push(...p);
    process.env.NODE_ENV !== "production" ? xe(Fn(u), l) : xe(Fn(u));
  }
}
function xe(e, t) {
  const n = C(e) ? e : [...e];
  for (const r of n)
    r.computed && Si(r, t);
  for (const r of n)
    r.computed || Si(r, t);
}
function Si(e, t) {
  (e !== H || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(et({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Yu = /* @__PURE__ */ _u("__proto__,__v_isRef,__isVue"), Hs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(lr)
), ju = /* @__PURE__ */ hr(), Xu = /* @__PURE__ */ hr(!0), Zu = /* @__PURE__ */ hr(!0, !0), Ci = /* @__PURE__ */ tl();
function tl() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = y(this);
      for (let s = 0, o = this.length; s < o; s++)
        Z(r, "get", s + "");
      const i = r[t](...n);
      return i === -1 || i === !1 ? r[t](...n.map(y)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      $s();
      const r = y(this)[t].apply(this, n);
      return Ls(), r;
    };
  }), e;
}
function hr(e = !1, t = !1) {
  return function(r, i, s) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_isShallow")
      return t;
    if (i === "__v_raw" && s === (e ? t ? Js : Gs : t ? ml : zs).get(r))
      return r;
    const o = C(r);
    if (!e && o && _(Ci, i))
      return Reflect.get(Ci, i, s);
    const a = Reflect.get(r, i, s);
    return (lr(i) ? Hs.has(i) : Yu(i)) || (e || Z(r, "get", i), t) ? a : F(a) ? o && fr(i) ? a : a.value : K(a) ? e ? Qs(a) : Ws(a) : a;
  };
}
const el = /* @__PURE__ */ nl();
function nl(e = !1) {
  return function(n, r, i, s) {
    let o = n[r];
    if (At(o) && F(o) && !F(i))
      return !1;
    if (!e && (!Ln(i) && !At(i) && (o = y(o), i = y(i)), !C(n) && F(o) && !F(i)))
      return o.value = i, !0;
    const a = C(n) && fr(r) ? Number(r) < n.length : _(n, r), l = Reflect.set(n, r, i, s);
    return n === y(s) && (a ? qe(i, o) && It(n, "set", r, i, o) : It(n, "add", r, i)), l;
  };
}
function rl(e, t) {
  const n = _(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && It(e, "delete", t, void 0, r), i;
}
function il(e, t) {
  const n = Reflect.has(e, t);
  return (!lr(t) || !Hs.has(t)) && Z(e, "has", t), n;
}
function sl(e) {
  return Z(e, "iterate", C(e) ? "length" : St), Reflect.ownKeys(e);
}
const ol = {
  get: ju,
  set: el,
  deleteProperty: rl,
  has: il,
  ownKeys: sl
}, Ks = {
  get: Xu,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && bi(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && bi(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, al = /* @__PURE__ */ et({}, Ks, {
  get: Zu
}), pr = (e) => e, en = (e) => Reflect.getPrototypeOf(e);
function Ee(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = y(e), s = y(t);
  n || (t !== s && Z(i, "get", t), Z(i, "get", s));
  const { has: o } = en(i), a = r ? pr : n ? Ir : mr;
  if (o.call(i, t))
    return a(e.get(t));
  if (o.call(i, s))
    return a(e.get(s));
  e !== i && e.get(t);
}
function Ne(e, t = !1) {
  const n = this.__v_raw, r = y(n), i = y(e);
  return t || (e !== i && Z(r, "has", e), Z(r, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Ae(e, t = !1) {
  return e = e.__v_raw, !t && Z(y(e), "iterate", St), Reflect.get(e, "size", e);
}
function _i(e) {
  e = y(e);
  const t = y(this);
  return en(t).has.call(t, e) || (t.add(e), It(t, "add", e, e)), this;
}
function xi(e, t) {
  t = y(t);
  const n = y(this), { has: r, get: i } = en(n);
  let s = r.call(n, e);
  s ? process.env.NODE_ENV !== "production" && qs(n, r, e) : (e = y(e), s = r.call(n, e));
  const o = i.call(n, e);
  return n.set(e, t), s ? qe(t, o) && It(n, "set", e, t, o) : It(n, "add", e, t), this;
}
function Ei(e) {
  const t = y(this), { has: n, get: r } = en(t);
  let i = n.call(t, e);
  i ? process.env.NODE_ENV !== "production" && qs(t, n, e) : (e = y(e), i = n.call(t, e));
  const s = r ? r.call(t, e) : void 0, o = t.delete(e);
  return i && It(t, "delete", e, void 0, s), o;
}
function Ni() {
  const e = y(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Kt(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && It(e, "clear", void 0, void 0, n), r;
}
function Pe(e, t) {
  return function(r, i) {
    const s = this, o = s.__v_raw, a = y(o), l = t ? pr : e ? Ir : mr;
    return !e && Z(a, "iterate", St), o.forEach((u, p) => r.call(i, l(u), l(p), s));
  };
}
function Oe(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, s = y(i), o = Kt(s), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), p = n ? pr : t ? Ir : mr;
    return !t && Z(s, "iterate", l ? $n : St), {
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
function ft(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
    }
    return e === "delete" ? !1 : this;
  };
}
function cl() {
  const e = {
    get(s) {
      return Ee(this, s);
    },
    get size() {
      return Ae(this);
    },
    has: Ne,
    add: _i,
    set: xi,
    delete: Ei,
    clear: Ni,
    forEach: Pe(!1, !1)
  }, t = {
    get(s) {
      return Ee(this, s, !1, !0);
    },
    get size() {
      return Ae(this);
    },
    has: Ne,
    add: _i,
    set: xi,
    delete: Ei,
    clear: Ni,
    forEach: Pe(!1, !0)
  }, n = {
    get(s) {
      return Ee(this, s, !0);
    },
    get size() {
      return Ae(this, !0);
    },
    has(s) {
      return Ne.call(this, s, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: Pe(!0, !1)
  }, r = {
    get(s) {
      return Ee(this, s, !0, !0);
    },
    get size() {
      return Ae(this, !0);
    },
    has(s) {
      return Ne.call(this, s, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: Pe(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = Oe(s, !1, !1), n[s] = Oe(s, !0, !1), t[s] = Oe(s, !1, !0), r[s] = Oe(s, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
const [ul, ll, fl, hl] = /* @__PURE__ */ cl();
function dr(e, t) {
  const n = t ? e ? hl : fl : e ? ll : ul;
  return (r, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(_(n, i) && i in r ? n : r, i, s);
}
const pl = {
  get: /* @__PURE__ */ dr(!1, !1)
}, dl = {
  get: /* @__PURE__ */ dr(!0, !1)
}, gl = {
  get: /* @__PURE__ */ dr(!0, !0)
};
function qs(e, t, n) {
  const r = y(n);
  if (r !== n && t.call(e, r)) {
    const i = Us(e);
  }
}
const zs = /* @__PURE__ */ new WeakMap(), ml = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap();
function Il(e) {
  switch (e) {
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
function vl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Il(Us(e));
}
function Ws(e) {
  return At(e) ? e : gr(e, !1, ol, pl, zs);
}
function Qs(e) {
  return gr(e, !0, Ks, dl, Gs);
}
function Me(e) {
  return gr(e, !0, al, gl, Js);
}
function gr(e, t, n, r, i) {
  if (!K(e))
    return process.env.NODE_ENV, e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = i.get(e);
  if (s)
    return s;
  const o = vl(e);
  if (o === 0)
    return e;
  const a = new Proxy(e, o === 2 ? r : n);
  return i.set(e, a), a;
}
function _t(e) {
  return At(e) ? _t(e.__v_raw) : !!(e && e.__v_isReactive);
}
function At(e) {
  return !!(e && e.__v_isReadonly);
}
function Ln(e) {
  return !!(e && e.__v_isShallow);
}
function ze(e) {
  return _t(e) || At(e);
}
function y(e) {
  const t = e && e.__v_raw;
  return t ? y(t) : e;
}
function Tl(e) {
  return Lu(e, "__v_skip", !0), e;
}
const mr = (e) => K(e) ? Ws(e) : e, Ir = (e) => K(e) ? Qs(e) : e;
function F(e) {
  return !!(e && e.__v_isRef === !0);
}
function yl(e) {
  return F(e) ? e.value : e;
}
const wl = {
  get: (e, t, n) => yl(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t];
    return F(i) && !F(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function bl(e) {
  return _t(e) ? e : new Proxy(e, wl);
}
const xt = [];
function kl(e) {
  xt.push(e);
}
function Sl() {
  xt.pop();
}
function U(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  $s();
  const n = xt.length ? xt[xt.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = Cl();
  if (r)
    Et(r, n, 11, [
      e + t.join(""),
      n && n.proxy,
      i.map(({ vnode: s }) => `at <${lo(n, s.type)}>`).join(`
`),
      i
    ]);
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    i.length && s.push(`
`, ..._l(i));
  }
  Ls();
}
function Cl() {
  let e = xt[xt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function _l(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...xl(n));
  }), t;
}
function xl({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, i = ` at <${lo(e.component, e.type, r)}`, s = ">" + n;
  return e.props ? [i, ...El(e.props), s] : [i + s];
}
function El(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Ys(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Ys(e, t, n) {
  return nt(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : F(t) ? (t = Ys(e, y(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : D(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = y(t), n ? t : [`${e}=`, t]);
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
function Et(e, t, n, r) {
  let i;
  try {
    i = r ? e(...r) : e();
  } catch (s) {
    Xs(s, t, n);
  }
  return i;
}
function Hn(e, t, n, r) {
  if (D(e)) {
    const s = Et(e, t, n, r);
    return s && Fu(s) && s.catch((o) => {
      Xs(o, t, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < e.length; s++)
    i.push(Hn(e[s], t, n, r));
  return i;
}
function Xs(e, t, n, r = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const o = t.proxy, a = process.env.NODE_ENV !== "production" ? js[n] : n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, o, a) === !1)
            return;
      }
      s = s.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Et(l, null, 10, [e, o, a]);
      return;
    }
  }
  Nl(e, n, i, r);
}
function Nl(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = js[t];
    if (n && kl(n), U(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Sl(), r)
      throw e;
  }
}
let Ge = !1, Kn = !1;
const tt = [];
let pt = 0;
const qt = [];
let it = null, ht = 0;
const Zs = /* @__PURE__ */ Promise.resolve();
let vr = null;
const Al = 100;
function Pl(e) {
  const t = vr || Zs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ol(e) {
  let t = pt + 1, n = tt.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    le(tt[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function Tr(e) {
  (!tt.length || !tt.includes(e, Ge && e.allowRecurse ? pt + 1 : pt)) && (e.id == null ? tt.push(e) : tt.splice(Ol(e.id), 0, e), to());
}
function to() {
  !Ge && !Kn && (Kn = !0, vr = Zs.then(no));
}
function eo(e) {
  C(e) ? qt.push(...e) : (!it || !it.includes(e, e.allowRecurse ? ht + 1 : ht)) && qt.push(e), to();
}
function Ml(e) {
  if (qt.length) {
    const t = [...new Set(qt)];
    if (qt.length = 0, it) {
      it.push(...t);
      return;
    }
    for (it = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), it.sort((n, r) => le(n) - le(r)), ht = 0; ht < it.length; ht++)
      process.env.NODE_ENV !== "production" && ro(e, it[ht]) || it[ht]();
    it = null, ht = 0;
  }
}
const le = (e) => e.id == null ? 1 / 0 : e.id, Vl = (e, t) => {
  const n = le(e) - le(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function no(e) {
  Kn = !1, Ge = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), tt.sort(Vl);
  const t = process.env.NODE_ENV !== "production" ? (n) => ro(e, n) : ur;
  try {
    for (pt = 0; pt < tt.length; pt++) {
      const n = tt[pt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        Et(n, null, 14);
      }
    }
  } finally {
    pt = 0, tt.length = 0, Ml(e), Ge = !1, vr = null, (tt.length || qt.length) && no(e);
  }
}
function ro(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Al) {
      const r = t.ownerInstance, i = r && uo(r.type);
      return U(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const ee = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Ku().__VUE_HMR_RUNTIME__ = {
  createRecord: kn(Rl),
  rerender: kn(Ul),
  reload: kn(Fl)
});
const Je = /* @__PURE__ */ new Map();
function Rl(e, t) {
  return Je.has(e) ? !1 : (Je.set(e, {
    initialDef: ie(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ie(e) {
  return fo(e) ? e.__vccOpts : e;
}
function Ul(e, t) {
  const n = Je.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, ie(r.type).render = t), r.renderCache = [], r.update();
  }));
}
function Fl(e, t) {
  const n = Je.get(e);
  if (!n)
    return;
  t = ie(t), Ai(n.initialDef, t);
  const r = [...n.instances];
  for (const i of r) {
    const s = ie(i.type);
    ee.has(s) || (s !== n.initialDef && Ai(s, t), ee.add(s)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (ee.add(s), i.ceReload(t.styles), ee.delete(s)) : i.parent ? Tr(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" && window.location.reload();
  }
  eo(() => {
    for (const i of r)
      ee.delete(ie(i.type));
  });
}
function Ai(e, t) {
  et(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function kn(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch {
    }
  };
}
let dt = null, Bl = null;
const Dl = (e) => e.__isSuspense;
function $l(e, t) {
  t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : eo(e);
}
const Ve = {};
function Ll(e, t, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: o } = st) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && U('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && U('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = (k) => {
    U("Invalid watch source: ", k, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = zt;
  let u, p = !1, h = !1;
  if (F(e) ? (u = () => e.value, p = Ln(e)) : _t(e) ? (u = () => e, r = !0) : C(e) ? (h = !0, p = e.some((k) => _t(k) || Ln(k)), u = () => e.map((k) => {
    if (F(k))
      return k.value;
    if (_t(k))
      return $t(k);
    if (D(k))
      return Et(k, l, 2);
    process.env.NODE_ENV !== "production" && a(k);
  })) : D(e) ? t ? u = () => Et(e, l, 2) : u = () => {
    if (!(l && l.isUnmounted))
      return g && g(), Hn(e, l, 3, [I]);
  } : (u = ur, process.env.NODE_ENV !== "production" && a(e)), t && r) {
    const k = u;
    u = () => $t(k());
  }
  let g, I = (k) => {
    g = P.onStop = () => {
      Et(k, l, 4);
    };
  }, v = h ? new Array(e.length).fill(Ve) : Ve;
  const w = () => {
    if (!!P.active)
      if (t) {
        const k = P.run();
        (r || p || (h ? k.some((jt, ve) => qe(jt, v[ve])) : qe(k, v))) && (g && g(), Hn(t, l, 3, [
          k,
          v === Ve ? void 0 : h && v[0] === Ve ? [] : v,
          I
        ]), v = k);
      } else
        P.run();
  };
  w.allowRecurse = !!t;
  let J;
  i === "sync" ? J = w : i === "post" ? J = () => Mi(w, l && l.suspense) : (w.pre = !0, l && (w.id = l.uid), J = () => Tr(w));
  const P = new Wu(u, J);
  return process.env.NODE_ENV !== "production" && (P.onTrack = s, P.onTrigger = o), t ? n ? w() : v = P.run() : i === "post" ? Mi(P.run.bind(P), l && l.suspense) : P.run(), () => {
    P.stop(), l && l.scope && Vu(l.scope.effects, P);
  };
}
function Hl(e, t, n) {
  const r = this.proxy, i = nt(e) ? e.includes(".") ? Kl(r, e) : () => r[e] : e.bind(r, r);
  let s;
  D(t) ? s = t : (s = t.handler, n = t);
  const o = zt;
  Vi(this);
  const a = Ll(i, s.bind(r), n);
  return o ? Vi(o) : lf(), a;
}
function Kl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function $t(e, t) {
  if (!K(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), F(e))
    $t(e.value, t);
  else if (C(e))
    for (let n = 0; n < e.length; n++)
      $t(e[n], t);
  else if (Uu(e) || Kt(e))
    e.forEach((n) => {
      $t(n, t);
    });
  else if (Du(e))
    for (const n in e)
      $t(e[n], t);
  return e;
}
const ql = Symbol(), qn = (e) => e ? ff(e) ? hf(e) || e.proxy : qn(e.parent) : null, se = /* @__PURE__ */ et(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? Me(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? Me(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? Me(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? Me(e.refs) : e.refs,
  $parent: (e) => qn(e.parent),
  $root: (e) => qn(e.root),
  $emit: (e) => e.emit,
  $options: (e) => __VUE_OPTIONS_API__ ? Wl(e) : e.type,
  $forceUpdate: (e) => e.f || (e.f = () => Tr(e.update)),
  $nextTick: (e) => e.n || (e.n = Pl.bind(e.proxy)),
  $watch: (e) => __VUE_OPTIONS_API__ ? Hl.bind(e) : ur
}), zl = (e) => e === "_" || e === "$", Sn = (e, t) => e !== st && !e.__isScriptSetup && _(e, t), Gl = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: a, appContext: l } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const I = o[t];
      if (I !== void 0)
        switch (I) {
          case 1:
            return r[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Sn(r, t))
          return o[t] = 1, r[t];
        if (i !== st && _(i, t))
          return o[t] = 2, i[t];
        if ((u = e.propsOptions[0]) && _(u, t))
          return o[t] = 3, s[t];
        if (n !== st && _(n, t))
          return o[t] = 4, n[t];
        (!__VUE_OPTIONS_API__ || Jl) && (o[t] = 0);
      }
    }
    const p = se[t];
    let h, g;
    if (p)
      return t === "$attrs" && (Z(e, "get", t), process.env.NODE_ENV !== "production" && void 0), p(e);
    if ((h = a.__cssModules) && (h = h[t]))
      return h;
    if (n !== st && _(n, t))
      return o[t] = 4, n[t];
    if (g = l.config.globalProperties, _(g, t))
      return g[t];
    process.env.NODE_ENV !== "production" && dt && (!nt(t) || t.indexOf("__v") !== 0) && (i !== st && zl(t[0]) && _(i, t) ? U(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === dt && U(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: i, ctx: s } = e;
    return Sn(i, t) ? (i[t] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && _(i, t) ? (U(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== st && _(r, t) ? (r[t] = n, !0) : _(e.props, t) ? (process.env.NODE_ENV !== "production" && U(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && U(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: s } }, o) {
    let a;
    return !!n[o] || e !== st && _(e, o) || Sn(t, o) || (a = s[0]) && _(a, o) || _(r, o) || _(se, o) || _(i.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : _(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Gl.ownKeys = (e) => (U("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
let Jl = !0;
function Wl(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: s, config: { optionMergeStrategies: o } } = e.appContext, a = s.get(t);
  let l;
  return a ? l = a : !i.length && !n && !r ? l = t : (l = {}, i.length && i.forEach((u) => We(l, u, o, !0)), We(l, t, o)), K(t) && s.set(t, l), l;
}
function We(e, t, n, r = !1) {
  const { mixins: i, extends: s } = t;
  s && We(e, s, n, !0), i && i.forEach((o) => We(e, o, n, !0));
  for (const o in t)
    if (r && o === "expose")
      process.env.NODE_ENV !== "production" && U('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const a = Ql[o] || n && n[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const Ql = {
  data: Pi,
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
  provide: Pi,
  inject: Yl
};
function Pi(e, t) {
  return t ? e ? function() {
    return et(D(e) ? e.call(this, this) : e, D(t) ? t.call(this, this) : t);
  } : t : e;
}
function Yl(e, t) {
  return kt(Oi(e), Oi(t));
}
function Oi(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function V(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function kt(e, t) {
  return e ? et(et(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function jl(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = et(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = V(e[r], t[r]);
  return n;
}
function Xl() {
  return {
    app: null,
    config: {
      isNativeTag: Pu,
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
const Mi = $l, Zl = (e) => e.__isTeleport, io = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), tf = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), ef = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let Lt = null;
function nf(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const rf = (...e) => ao(...e), so = "__vInternal", oo = ({ key: e }) => e ?? null, De = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? nt(e) || F(e) || D(e) ? { i: dt, r: e, k: t, f: !!n } : e : null;
function sf(e, t = null, n = null, r = 0, i = null, s = e === io ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && oo(t),
    ref: t && De(t),
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
  return a ? (yr(l, n), s & 128 && e.normalize(l)) : n && (l.shapeFlag |= nt(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && U("VNode created with invalid key (NaN). VNode type:", l.type), !o && Lt && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && Lt.push(l), l;
}
const of = process.env.NODE_ENV !== "production" ? rf : ao;
function ao(e, t = null, n = null, r = 0, i = null, s = !1) {
  if ((!e || e === ql) && (process.env.NODE_ENV !== "production" && !e && U(`Invalid vnode type when creating vnode: ${e}.`), e = ef), nf(e)) {
    const a = Qe(e, t, !0);
    return n && yr(a, n), !s && Lt && (a.shapeFlag & 6 ? Lt[Lt.indexOf(e)] = a : Lt.push(a)), a.patchFlag |= -2, a;
  }
  if (fo(e) && (e = e.__vccOpts), t) {
    t = af(t);
    let { class: a, style: l } = t;
    a && !nt(a) && (t.class = cr(a)), K(l) && (ze(l) && !C(l) && (l = et({}, l)), t.style = ar(l));
  }
  const o = nt(e) ? 1 : Dl(e) ? 128 : Zl(e) ? 64 : K(e) ? 4 : D(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && ze(e) && (e = y(e), U("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), sf(e, t, n, r, i, o, s, !0);
}
function af(e) {
  return e ? ze(e) || so in e ? et({}, e) : e : null;
}
function Qe(e, t, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = e, a = t ? uf(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && oo(a),
    ref: t && t.ref ? n && i ? C(i) ? i.concat(De(t)) : [i, De(t)] : De(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && C(o) ? o.map(co) : o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== io ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Qe(e.ssContent),
    ssFallback: e.ssFallback && Qe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function co(e) {
  const t = Qe(e);
  return C(e.children) && (t.children = e.children.map(co)), t;
}
function cf(e = " ", t = 0) {
  return of(tf, null, e, t);
}
function yr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (C(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), yr(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(so in t) ? t._ctx = dt : i === 3 && dt && (dt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    D(t) ? (t = { default: t, _ctx: dt }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [cf(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function uf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const i in r)
      if (i === "class")
        t.class !== r.class && (t.class = cr([t.class, r.class]));
      else if (i === "style")
        t.style = ar([t.style, r.style]);
      else if (Mu(i)) {
        const s = t[i], o = r[i];
        o && s !== o && !(C(s) && s.includes(o)) && (t[i] = s ? [].concat(s, o) : o);
      } else
        i !== "" && (t[i] = r[i]);
  }
  return t;
}
Xl();
let zt = null;
const Vi = (e) => {
  zt = e, e.scope.on();
}, lf = () => {
  zt && zt.scope.off(), zt = null;
};
function ff(e) {
  return e.vnode.shapeFlag & 4;
}
function hf(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(bl(Tl(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in se)
          return se[n](e);
      },
      has(t, n) {
        return n in t || n in se;
      }
    }));
}
const pf = /(?:^|[-_])(\w)/g, df = (e) => e.replace(pf, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function uo(e, t = !0) {
  return D(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function lo(e, t, n = !1) {
  let r = uo(t);
  if (!r && t.__file) {
    const i = t.__file.match(/([^/\\]+)\.\w+$/);
    i && (r = i[1]);
  }
  if (!r && e && e.parent) {
    const i = (s) => {
      for (const o in s)
        if (s[o] === t)
          return o;
    };
    r = i(e.components || e.parent.type.components) || i(e.appContext.components);
  }
  return r ? df(r) : n ? "App" : "Anonymous";
}
function fo(e) {
  return D(e) && "__vccOpts" in e;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Cn(e) {
  return !!(e && e.__v_isShallow);
}
function gf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(h) {
      return K(h) ? h.__isVue ? ["div", e, "VueInstance"] : F(h) ? [
        "div",
        {},
        ["span", e, p(h)],
        "<",
        a(h.value),
        ">"
      ] : _t(h) ? [
        "div",
        {},
        ["span", e, Cn(h) ? "ShallowReactive" : "Reactive"],
        "<",
        a(h),
        `>${At(h) ? " (readonly)" : ""}`
      ] : At(h) ? [
        "div",
        {},
        ["span", e, Cn(h) ? "ShallowReadonly" : "Readonly"],
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
    h.type.props && h.props && g.push(o("props", y(h.props))), h.setupState !== st && g.push(o("setup", h.setupState)), h.data !== st && g.push(o("data", y(h.data)));
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
    return typeof h == "number" ? ["span", t, h] : typeof h == "string" ? ["span", n, JSON.stringify(h)] : typeof h == "boolean" ? ["span", r, h] : K(h) ? ["object", { object: g ? y(h) : h }] : ["span", n, String(h)];
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
    if (C(v) && v.includes(g) || K(v) && g in v || h.extends && u(h.extends, g, I) || h.mixins && h.mixins.some((w) => u(w, g, I)))
      return !0;
  }
  function p(h) {
    return Cn(h) ? "ShallowRef" : h.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function mf() {
  gf();
}
process.env.NODE_ENV !== "production" && mf();
function If(e) {
  const t = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = e % 12;
  return t[n];
}
function _h(e) {
  const t = Math.floor(e / 12) - 2;
  return If(e) + t.toString();
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
function xh(e) {
  const t = vf.exec(e);
  if (!t)
    return -1;
  const n = t[1], r = t[2];
  return Tf[n.toLowerCase()] + (parseInt(r, 10) + 2) * 12;
}
function Ri(e, t, n, r) {
  return `${e} // ${t} // ${n} // ${r}`;
}
function yf(e, t, n) {
  return `${e} // ${t} // ${n}`;
}
function Eh(e) {
  const t = Ye(e);
  return yf(
    t.manufacturerName,
    t.pluginFormatName,
    t.name
  );
}
function Ye(e) {
  const t = e.split(" // ");
  if (t.length < 4)
    throw new Error("Invalid audio plugin tuneflow id.");
  return {
    name: t[2],
    manufacturerName: t[0],
    pluginFormatName: t[1],
    pluginVersion: t[3]
  };
}
function wf(e, t) {
  return e === t;
}
function bf(e, t) {
  const n = Ye(e), r = Ye(t);
  if (A.keys(n).length !== A.keys(r).length)
    return !1;
  for (const i of A.keys(n))
    if (i !== "pluginVersion" && n[i] !== r[i])
      return !1;
  return !0;
}
class Nh {
  tempoInfos = [];
  currentTempoIndex = 0;
  ticksPerSecondAtTempoTick = {};
  constructor(t, n) {
    for (const r of t)
      this.tempoInfos.push({
        ticks: r.getTicks(),
        time: r.getTime()
      }), this.ticksPerSecondAtTempoTick[r.getTicks()] = r.getBpm() * n / 60;
  }
  secondsToTick(t) {
    let n = this.tempoInfos[this.currentTempoIndex];
    for (; this.tempoInfos[this.currentTempoIndex + 1] && this.tempoInfos[this.currentTempoIndex + 1].time <= t; )
      this.currentTempoIndex += 1, n = this.tempoInfos[this.currentTempoIndex];
    for (; n.time > t && this.currentTempoIndex > 0; )
      this.currentTempoIndex -= 1, n = this.tempoInfos[this.currentTempoIndex];
    n.time > t && (n = this.tempoInfos[0]);
    const r = t - n.time, i = this.ticksPerSecondAtTempoTick[n.ticks];
    return Math.round(n.ticks + r * i);
  }
  tickToSeconds(t) {
    let n = this.tempoInfos[this.currentTempoIndex];
    for (; this.tempoInfos[this.currentTempoIndex + 1] && this.tempoInfos[this.currentTempoIndex + 1].ticks <= t; )
      this.currentTempoIndex += 1, n = this.tempoInfos[this.currentTempoIndex];
    for (; n.ticks > t && this.currentTempoIndex > 0; )
      this.currentTempoIndex -= 1, n = this.tempoInfos[this.currentTempoIndex];
    n.ticks > t && (n = this.tempoInfos[0]);
    const r = t - n.ticks, i = this.ticksPerSecondAtTempoTick[n.ticks];
    return n.time + r / i;
  }
}
function kf(e) {
  return e > -100 ? Math.exp((e - 6) * (1 / 20)) : 0;
}
function Ah(e) {
  return e <= 0 ? -100 : 20 * Math.log10(e);
}
function Ph(e) {
  return e > 0 ? 20 * Math.log(e) + 6 : -100;
}
function Oh(e) {
  return e > 0 ? Math.pow(10, (20 * Math.log(e) + 6) * (1 / 20)) : 0;
}
function Mh(e) {
  return e > 0 ? Math.exp((20 * Math.log10(e) - 6) * (1 / 20)) : 0;
}
function Vh(e, t, n, r, i) {
  return (e - t) / (n - t) * (i - r) + r;
}
function Rh(e) {
  return 440 * Math.pow(2, (e - 69) / 12);
}
function Uh(e) {
  return ze(e) || F(e) ? y(e) : e;
}
var Sf = /* @__PURE__ */ ((e) => (e[e.BassDrum2 = 35] = "BassDrum2", e[e.BassDrum1 = 36] = "BassDrum1", e[e.SideStick = 37] = "SideStick", e[e.SnareDrum1 = 38] = "SnareDrum1", e[e.HandClap = 39] = "HandClap", e[e.SnareDrum2 = 40] = "SnareDrum2", e[e.LowTom2 = 41] = "LowTom2", e[e.ClosedHiHat = 42] = "ClosedHiHat", e[e.LowTom1 = 43] = "LowTom1", e[e.PedalHiHat = 44] = "PedalHiHat", e[e.MidTom2 = 45] = "MidTom2", e[e.OpenHiHat = 46] = "OpenHiHat", e[e.MidTom1 = 47] = "MidTom1", e[e.HighTom2 = 48] = "HighTom2", e[e.CrashCymbal1 = 49] = "CrashCymbal1", e[e.HighTom1 = 50] = "HighTom1", e[e.RideCymbal1 = 51] = "RideCymbal1", e[e.ChineseCymbal = 52] = "ChineseCymbal", e[e.RideBell = 53] = "RideBell", e[e.Tambourine = 54] = "Tambourine", e[e.SplashCymbal = 55] = "SplashCymbal", e[e.Cowbell = 56] = "Cowbell", e[e.CrashCymbal2 = 57] = "CrashCymbal2", e[e.VibraSlap = 58] = "VibraSlap", e[e.RideCymbal2 = 59] = "RideCymbal2", e[e.HighBongo = 60] = "HighBongo", e[e.LowBongo = 61] = "LowBongo", e[e.MuteHighConga = 62] = "MuteHighConga", e[e.OpenHighConga = 63] = "OpenHighConga", e[e.LowConga = 64] = "LowConga", e[e.HighTimbale = 65] = "HighTimbale", e[e.LowTimbale = 66] = "LowTimbale", e[e.HighAgogo = 67] = "HighAgogo", e[e.LowAgogo = 68] = "LowAgogo", e[e.Cabasa = 69] = "Cabasa", e[e.Maracas = 70] = "Maracas", e[e.ShortWhistle = 71] = "ShortWhistle", e[e.LongWhistle = 72] = "LongWhistle", e[e.ShortGuiro = 73] = "ShortGuiro", e[e.LongGuiro = 74] = "LongGuiro", e[e.Claves = 75] = "Claves", e[e.HighWoodBlock = 76] = "HighWoodBlock", e[e.LowWoodBlock = 77] = "LowWoodBlock", e[e.MuteCuica = 78] = "MuteCuica", e[e.OpenCuica = 79] = "OpenCuica", e[e.MuteTriangle = 80] = "MuteTriangle", e[e.OpenTriangle = 81] = "OpenTriangle", e[e.Shaker = 82] = "Shaker", e))(Sf || {});
class nn {
  name;
  manufacturerName;
  pluginFormatName;
  pluginVersion;
  isEnabled = !0;
  localInstanceIdInternal;
  base64StatesInternal;
  constructor(t, n, r, i) {
    this.name = t, this.manufacturerName = n, this.pluginFormatName = r, this.pluginVersion = i, this.localInstanceIdInternal = nn.generateAudioPluginInstanceIdInternal();
  }
  getTuneflowId() {
    return Ri(
      this.manufacturerName,
      this.pluginFormatName,
      this.name,
      this.pluginVersion
    );
  }
  clone(t) {
    const n = t.createAudioPlugin(this.getTuneflowId());
    return n.setIsEnabled(this.isEnabled), n;
  }
  matchesTfId(t) {
    return wf(t, this.getTuneflowId());
  }
  matchesTfIdIgnoreVersion(t) {
    return bf(t, this.getTuneflowId());
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
  setIsEnabled(t) {
    this.isEnabled = t;
  }
  getIsEnabled() {
    return this.isEnabled;
  }
  setBase64States(t) {
    this.base64StatesInternal = t;
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
    pitch: t,
    velocity: n,
    startTick: r,
    endTick: i,
    id: s,
    clip: o
  }) {
    this.pitch = t, this.velocity = n, this.startTick = r, this.endTick = i, this.idInternal = s, this.clipInternal = o;
  }
  getPitch() {
    return this.pitch;
  }
  setPitch(t) {
    if (!gt.isValidPitch(t))
      throw new Error(`Invalid pitch ${t}`);
    this.pitch = t;
  }
  getVelocity() {
    return this.velocity;
  }
  setVelocity(t) {
    this.velocity = Math.max(Math.min(t, 127), 0);
  }
  getStartTick() {
    return this.startTick;
  }
  getEndTick() {
    return this.endTick;
  }
  setStartTick(t) {
    this.startTick = t;
  }
  setEndTick(t) {
    this.endTick = t;
  }
  equals(t) {
    return this.startTick === t.getStartTick() && this.endTick === t.getEndTick() && this.pitch === t.getPitch() && this.velocity === t.getVelocity();
  }
  deleteFromParent() {
    !this.clipInternal || this.clipInternal.deleteNote(this);
  }
  moveNote(t) {
    if (t === 0)
      return;
    const n = this.clipInternal;
    n && n.deleteNote(this), this.startTick = Math.max(0, this.startTick + t), this.endTick = this.endTick + t, !!this.isRangeValid() && n && n.orderedInsertNote(n.getRawNotes(), this);
  }
  adjustLeft(t) {
    if (t === 0)
      return;
    const n = this.clipInternal;
    n && n.deleteNote(this), this.startTick += t, !!this.isRangeValid() && n && n.orderedInsertNote(n.getRawNotes(), this);
  }
  adjustLeftTo(t) {
    this.adjustLeft(t - this.startTick);
  }
  adjustRight(t) {
    this.endTick += t, this.isRangeValid() || this.deleteFromParent();
  }
  adjustRightTo(t) {
    this.adjustRight(t - this.endTick);
  }
  isRangeValid() {
    return gt.isNoteRangeValid(this.startTick, this.endTick);
  }
  transpose(t) {
    this.setPitch(Math.min(127, Math.max(0, this.pitch + t)));
  }
  static isValidPitch(t) {
    return t >= 0 && t <= 127 && Number.isInteger(t);
  }
  static isNoteRangeValid(t, n) {
    return n >= 0 && t <= n && Number.isInteger(t) && Number.isInteger(n);
  }
  static isNoteVelocityValid(t) {
    return t >= 0 && t <= 127 && Number.isInteger(t);
  }
  getClip() {
    return this.clipInternal;
  }
  adjustPitch(t) {
    this.pitch = this.pitch + t, gt.isValidPitch(this.pitch) || this.deleteFromParent();
  }
  getId() {
    return this.idInternal;
  }
}
var re = /* @__PURE__ */ ((e) => (e[e.MIDI_CLIP = 1] = "MIDI_CLIP", e[e.AUDIO_CLIP = 2] = "AUDIO_CLIP", e))(re || {});
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
    song: t,
    type: n,
    clipStartTick: r,
    id: i = j.generateClipIdInternal(),
    track: s = void 0,
    clipEndTick: o = void 0,
    audioClipData: a = void 0
  }) {
    if (this.song = t, this.track = s, this.id = i, this.type = n, this.notes = [], n === 2) {
      if (!a)
        throw new Error("Audio clip data must be provided for audio clips.");
      this.audioClipData = {
        audioFilePath: a.audioFilePath,
        startTick: a.startTick,
        duration: a.duration
      }, r = A.isNumber(r) ? Math.max(r, a.startTick) : a.startTick;
      const l = this.getAudioEndTick();
      (!A.isNumber(o) || l < o) && (o = l), this.clipStartTick = r, this.clipEndTick = o;
    } else if (n === 1) {
      if (this.clipStartTick = r, !A.isNumber(o))
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
  setAudioFile(t, n, r) {
    this.audioClipData ? (this.audioClipData.audioFilePath = t, this.audioClipData.startTick = n, this.audioClipData.duration = r) : this.audioClipData = {
      audioFilePath: t,
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
    pitch: t,
    velocity: n,
    startTick: r,
    endTick: i,
    updateClipRange: s = !0,
    resolveClipConflict: o = !0
  }) {
    if (this.type !== 1 || !gt.isValidPitch(t) || !gt.isNoteRangeValid(r, i) || !gt.isNoteVelocityValid(n))
      return null;
    const a = new gt({
      pitch: t,
      velocity: n,
      startTick: r,
      endTick: i,
      id: this.getNextNoteIdInternal()
    });
    return r < this.clipStartTick && s && this.adjustClipLeft(r, o), i > this.clipEndTick && s && this.adjustClipRight(i, o), this.orderedInsertNote(this.notes, a), a;
  }
  getNoteIndexInternal(t) {
    const n = S.lt(
      this.notes,
      t,
      (r, i) => r.getStartTick() - i.getStartTick()
    );
    for (let r = Math.max(0, n); r < this.notes.length; r += 1) {
      const i = this.notes[r];
      if (i && i === t)
        return r;
      if (i && i.getStartTick() > t.getStartTick())
        break;
    }
    return -1;
  }
  deleteNote(t) {
    const n = this.getNoteIndexInternal(t);
    n >= 0 && this.deleteNoteAt(n);
  }
  deleteNoteAt(t) {
    const n = this.notes[t];
    n && (n.clipInternal = null, this.notes.splice(t, 1));
  }
  orderedInsertNote(t, n) {
    if (this.type !== 1 || n.getClip() === this)
      return;
    const r = S.ge(
      t,
      n,
      (i, s) => i.getStartTick() - s.getStartTick()
    );
    r < 0 ? t.push(n) : t.splice(r, 0, n), n.clipInternal = this;
  }
  adjustClipLeft(t, n = !0) {
    t = Math.max(0, t), this.type === 2 && this.audioClipData && (t = Math.max(t, this.audioClipData.startTick)), t > this.clipEndTick ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(
      this.getId(),
      Math.min(this.clipStartTick, t),
      this.clipEndTick
    ), this.clipStartTick = t);
  }
  adjustClipRight(t, n = !0) {
    if (this.type === 2) {
      const r = this.getAudioEndTick();
      A.isNumber(r) && (t = Math.min(t, r));
    }
    t < this.clipStartTick || t < 0 ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(
      this.getId(),
      this.clipStartTick,
      Math.max(this.clipEndTick, t)
    ), this.clipEndTick = t);
  }
  moveClip(t, n) {
    const r = Math.max(0, this.clipStartTick + t), i = this.clipEndTick + t;
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
        a.setStartTick(a.getStartTick() + t), a.setEndTick(a.getEndTick() + t);
    } else if (this.type === 2) {
      if (!this.audioClipData)
        throw new Error("Cannot move audio clip without audio data");
      const a = this.song, l = a.tickToSeconds(this.audioClipData.startTick), u = a.tickToSeconds(s), h = a.tickToSeconds(o) - u, g = u - l, I = a.tickToSeconds(this.clipStartTick + t), v = I - g, w = I + h;
      if (this.clipStartTick = r, this.clipEndTick = a.secondsToTick(w), this.audioClipData.startTick = a.secondsToTick(v), this.clipEndTick < 0) {
        this.deleteFromParent(!0);
        return;
      }
    }
    this.track && (this.track.orderedInsertClipInternal(this), n && this.track.getAutomation().moveAllPointsWithinRange(
      s,
      o,
      t,
      0
    ));
  }
  moveClipTo(t, n) {
    const r = t - this.getClipStartTick();
    this.moveClip(r, n);
  }
  deleteFromParent(t) {
    this.track && (this.track.deleteClip(this, t), this.track = void 0);
  }
  getNotesByIds(t) {
    const n = new Set(t), r = [];
    for (const i of this.notes)
      n.has(i.getId()) && r.push(i);
    return r;
  }
  getAudioEndTick() {
    if (this.type !== 2 || !this.audioClipData)
      return;
    const t = this.getAudioDuration();
    if (!A.isNumber(t))
      return;
    const n = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(n + t);
  }
  static getNotesInRange(t, n, r) {
    return j.getNotesInRangeImpl(
      t,
      n,
      r,
      (i) => ({ getStartTick: () => i }),
      (i) => i.getStartTick(),
      (i) => i.getEndTick()
    );
  }
  static getNotesInRangeImpl(t, n, r, i, s, o) {
    let a = Math.max(
      0,
      S.lt(
        t,
        i(n),
        (u, p) => s(u) - s(p)
      )
    );
    for (; t[a] && !j.isNoteInClip(
      s(t[a]),
      o(t[a]),
      n,
      r
    ); )
      a += 1;
    if (a >= t.length)
      return [];
    let l = Math.min(
      t.length - 1,
      S.gt(
        t,
        i(r),
        (u, p) => s(u) - s(p)
      )
    );
    for (; t[l] && !j.isNoteInClip(
      s(t[l]),
      o(t[l]),
      n,
      r
    ); )
      l -= 1;
    return l < 0 ? [] : l < a ? [] : t.slice(a, l + 1);
  }
  static getOverlappingNotesWithinRangeImpl(t, n, r, i, s) {
    const o = [];
    for (const a of t) {
      const l = i(a);
      if (l > r)
        break;
      const u = s(a);
      (l >= n && l <= r || u >= n && u <= r) && o.push(a);
    }
    return o;
  }
  static isNoteInClip(t, n, r, i) {
    return (t >= r || r === 0 && t <= 0) && t < i && n > t;
  }
  static getNotePlayableRange(t, n, r, i) {
    if (!j.isNoteInClip(t, n, r, i))
      return null;
    const s = Math.max(t, r), o = Math.min(n, i);
    return s > o ? null : {
      startTick: s,
      endTick: o
    };
  }
  trimConflictPartInternal(t, n) {
    const r = Math.max(t, this.getClipStartTick()), i = Math.min(n, this.getClipEndTick());
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
    const t = this.nextNoteIdInternal;
    return this.nextNoteIdInternal >= 2147483647 ? this.nextNoteIdInternal = 1 : this.nextNoteIdInternal += 1, t;
  }
  static generateClipIdInternal() {
    return Ze(10);
  }
}
var zn = /* @__PURE__ */ ((e) => (e[e.UNDEFINED = 0] = "UNDEFINED", e[e.VOLUME = 1] = "VOLUME", e[e.PAN = 2] = "PAN", e[e.AUDIO_PLUGIN = 3] = "AUDIO_PLUGIN", e))(zn || {});
class Y {
  type;
  pluginInstanceId;
  paramId;
  constructor(t, n, r) {
    this.type = t, this.pluginInstanceId = n, this.paramId = r;
  }
  getType() {
    return this.type;
  }
  setType(t) {
    this.type = t;
  }
  getPluginInstanceId() {
    return this.pluginInstanceId;
  }
  setPluginInstanceId(t) {
    this.pluginInstanceId = t;
  }
  getParamId() {
    return this.paramId;
  }
  setParamId(t) {
    this.paramId = t;
  }
  equals(t) {
    return Y.areAutomationTargetsEqual(
      this.getType(),
      t.getType(),
      this.getPluginInstanceId(),
      t.getPluginInstanceId(),
      this.getParamId(),
      t.getParamId()
    );
  }
  clone() {
    return new Y(this.type, this.pluginInstanceId, this.paramId);
  }
  toTfAutomationTargetId() {
    return Y.encodeAutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }
  static fromTfAutomationTargetId(t) {
    return Y.decodeAutomationTarget(t);
  }
  static encodeAutomationTarget(t, n, r) {
    return t === 3 ? `${t}^^${n}^^${r}` : `${t}`;
  }
  static decodeAutomationTarget(t) {
    const n = t.split("^^");
    if (n.length === 0)
      throw new Error(`Invalid automation target id: ${t}`);
    const r = Number(n[0]);
    return n.length > 2 ? new Y(r, n[1], n[2]) : new Y(r);
  }
  static areAutomationTargetsEqual(t, n, r, i, s, o) {
    return Y.encodeAutomationTarget(t, r, s) === Y.encodeAutomationTarget(n, i, o);
  }
}
class Gt {
  points = [];
  disabled = !1;
  nextPointIdInternal = 1;
  getDisabled() {
    return this.disabled;
  }
  setDisabled(t) {
    this.disabled = t;
  }
  getPoints() {
    return this.points;
  }
  getPointsInRange(t, n) {
    return Gt.getPointsInRangeImpl(this.points, t, n);
  }
  static getPointsInRangeImpl(t, n, r) {
    const i = S.ge(
      t,
      { tick: n },
      (o, a) => o.tick - a.tick
    ), s = [];
    for (let o = i; o < t.length; o += 1) {
      const a = t[o];
      if (a.tick > r)
        break;
      s.push(a);
    }
    return s;
  }
  addPoint(t, n, r = !1) {
    const i = {
      tick: t,
      value: Math.max(0, Math.min(1, n)),
      id: this.getNextPointIdInternal()
    };
    return Gt.orderedInsertPointInternal(this.points, i, r), i;
  }
  removePoints(t) {
    const n = new Set(t);
    for (let r = this.points.length - 1; r >= 0; r -= 1) {
      const i = this.points[r];
      n.has(i.id) && this.points.splice(r, 1);
    }
  }
  removePointsInRange(t, n) {
    const r = S.ge(
      this.points,
      { tick: t },
      (s, o) => s.tick - o.tick
    );
    if (r >= this.points.length)
      return;
    let i = r;
    for (; i + 1 < this.points.length && this.points[i + 1].tick <= n; )
      i += 1;
    this.points.splice(r, i - r + 1);
  }
  movePointsInRange(t, n, r, i, s = !0) {
    const o = this.getPointsInRange(t, n);
    this.movePoints(
      o.map((a) => a.id),
      r,
      i,
      s
    );
  }
  moveAllPoints(t, n, r = !0) {
    this.movePoints(
      this.points.map((i) => i.id),
      t,
      n,
      r
    );
  }
  movePoints(t, n, r, i = !0) {
    if (t.length === 0)
      return;
    const s = new Set(t);
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
    const t = new Gt();
    t.setDisabled(this.disabled);
    for (const n of this.points)
      t.addPoint(n.tick, n.value, !1);
    return t;
  }
  getNextPointIdInternal() {
    const t = this.nextPointIdInternal;
    return this.nextPointIdInternal >= 2147483647 ? this.nextPointIdInternal = 1 : this.nextPointIdInternal += 1, t;
  }
  static orderedInsertPointInternal(t, n, r = !1) {
    const i = S.ge(
      t,
      n,
      (s, o) => s.tick - o.tick
    );
    for (; r && t[i] && t[i].tick === n.tick; )
      t.splice(i, 1);
    t.splice(i, 0, n);
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
  getOrCreateAutomationValueById(t) {
    return this.targetValues[t] || (this.targetValues[t] = new Gt()), this.targetValues[t];
  }
  getAutomationValueById(t) {
    return this.targetValues[t];
  }
  getAutomationValueByTarget(t) {
    const n = t.toTfAutomationTargetId();
    return this.getAutomationValueById(n);
  }
  addAutomation(t, n = 0) {
    A.isNumber(n) || (n = 0), this.targets.splice(n, 0, t);
    const r = t.toTfAutomationTargetId();
    this.getAutomationValueById(r) || (this.targetValues[r] = new Gt());
  }
  removeAutomation(t) {
    for (let r = this.targets.length - 1; r >= 0; r -= 1)
      this.targets[r].equals(t) && this.targets.splice(r, 1);
    const n = t.toTfAutomationTargetId();
    delete this.targetValues[n];
  }
  removeAutomationOfPlugin(t) {
    for (let n = this.targets.length - 1; n >= 0; n -= 1) {
      const r = this.targets[n];
      r.getPluginInstanceId() === t && this.removeAutomation(r);
    }
    for (const n of A.keys(this.targetValues)) {
      const r = Y.decodeAutomationTarget(n);
      r.getPluginInstanceId() === t && this.removeAutomation(r);
    }
  }
  removeAllPointsWithinRange(t, n) {
    for (const r of A.keys(this.targetValues))
      this.targetValues[r].removePointsInRange(t, n);
  }
  moveAllPointsWithinRange(t, n, r, i) {
    for (const s of A.keys(this.targetValues))
      this.targetValues[s].movePointsInRange(
        t,
        n,
        r,
        i,
        !1
      );
  }
  clone() {
    const t = new wr();
    for (const n of this.targets)
      t.addAutomation(n.clone());
    for (const n of A.keys(this.targetValues)) {
      const r = this.targetValues[n];
      t.targetValues[n] = r.clone();
    }
    return t;
  }
}
var Dt = /* @__PURE__ */ ((e) => (e[e.MIDI_TRACK = 1] = "MIDI_TRACK", e[e.AUDIO_TRACK = 2] = "AUDIO_TRACK", e[e.MASTER_TRACK = 3] = "MASTER_TRACK", e))(Dt || {});
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
    type: t,
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
    this.song = n, this.type = t, s ? this.insturment = s : t === 1 && (this.insturment = new oe({
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
    program: t,
    isDrum: n
  }) {
    this.type === 1 && (this.insturment = new oe({ program: t, isDrum: n }));
  }
  getSuggestedInstruments() {
    return this.suggestedInstruments;
  }
  createSuggestedInstrument({
    program: t,
    isDrum: n
  }) {
    if (this.type !== 1)
      return;
    const r = new oe({ program: t, isDrum: n });
    return this.suggestedInstruments.push(r), r;
  }
  clearSuggestedInstruments() {
    this.suggestedInstruments = [];
  }
  getId() {
    return this.uuid;
  }
  setId(t) {
    this.uuid = t;
  }
  getVolume() {
    return this.volume;
  }
  setVolume(t) {
    this.volume = t;
  }
  setPan(t) {
    this.pan = t;
  }
  getPan() {
    return this.pan;
  }
  getSolo() {
    return this.solo;
  }
  setSolo(t) {
    this.solo = t, t && this.muted && (this.muted = !1);
  }
  getMuted() {
    return this.muted;
  }
  setMuted(t) {
    this.muted = t;
  }
  getRank() {
    return this.rank;
  }
  createAudioPlugin(t) {
    const n = Ye(t);
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
  setSamplerPlugin(t, n = !0) {
    if (this.type !== 1)
      return;
    const r = !this.samplerPlugin && !!t || !t && !!this.samplerPlugin || !!t && !!this.samplerPlugin && !t.matchesTfId(this.samplerPlugin.getTuneflowId()), i = this.samplerPlugin;
    this.samplerPlugin = t, r && i && n && this.automation.removeAutomationOfPlugin(i.getInstanceId());
  }
  getAudioPlugins() {
    return this.audioPlugins;
  }
  addAudioPlugin(t) {
    this.audioPlugins.push(t);
  }
  getTrackStartTick() {
    return !this.clips || this.clips.length === 0 ? 0 : this.clips[0].getClipStartTick();
  }
  getTrackEndTick() {
    return !this.clips || this.clips.length === 0 ? 0 : this.clips[this.clips.length - 1].getClipEndTick();
  }
  getClipById(t) {
    for (const n of this.clips)
      if (n.getId() === t)
        return n;
    return null;
  }
  getClips() {
    return this.clips;
  }
  getClipsOverlappingWith(t, n) {
    const r = [], i = S.lt(
      this.clips,
      { getClipStartTick: () => t },
      (s, o) => s.getClipStartTick() - o.getClipStartTick()
    );
    for (let s = Math.max(i, 0); s < this.clips.length; s += 1) {
      const o = this.clips[s];
      if (!(o.getClipEndTick() < t)) {
        if (o.getClipStartTick() > n)
          break;
        r.push(o);
      }
    }
    return r;
  }
  createMIDIClip({
    clipStartTick: t,
    clipEndTick: n = void 0,
    insertClip: r = !0
  }) {
    if (!A.isNumber(t))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const i = n ?? t + 1;
    if (i < t)
      throw new Error(
        `clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${t}, clipEndTick: ${n}`
      );
    const s = new j({
      id: j.generateClipIdInternal(),
      type: re.MIDI_CLIP,
      song: this.song,
      track: void 0,
      clipStartTick: t,
      clipEndTick: i
    });
    return r && this.insertClip(s), s;
  }
  createAudioClip({
    clipStartTick: t,
    audioClipData: n,
    clipEndTick: r,
    insertClip: i = !0
  }) {
    if (!A.isNumber(t))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const s = new j({
      id: j.generateClipIdInternal(),
      type: re.AUDIO_CLIP,
      song: this.song,
      track: void 0,
      clipStartTick: t,
      clipEndTick: r,
      audioClipData: n
    });
    return i && this.insertClip(s), s;
  }
  insertClip(t) {
    if (t.getTrack() !== this)
      t.getTrack() && t.deleteFromParent(!1), t.track = this;
    else
      return;
    this.resolveClipConflictInternal(t.getId(), t.getClipStartTick(), t.getClipEndTick()), this.orderedInsertClipInternal(t);
  }
  cloneClip(t) {
    if (t.getType() === re.MIDI_CLIP) {
      const n = this.createMIDIClip({
        clipStartTick: t.getClipStartTick(),
        clipEndTick: t.getClipEndTick(),
        insertClip: !1
      });
      for (const r of t.getRawNotes())
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
      if (t.getType() === re.AUDIO_CLIP)
        return this.createAudioClip({
          clipStartTick: t.getClipStartTick(),
          clipEndTick: t.getClipEndTick(),
          audioClipData: t.getAudioClipData(),
          insertClip: !1
        });
      throw new Error(`Unsupported clip type ${t.getType()}`);
    }
  }
  getClipIndex(t) {
    const n = S.le(
      this.clips,
      t,
      (r, i) => r.getClipStartTick() - i.getClipStartTick()
    );
    return this.clips.indexOf(t, n);
  }
  deleteClip(t, n) {
    const r = this.getClipIndex(t);
    this.deleteClipAt(r, n);
  }
  deleteClipAt(t, n) {
    if (!(t < 0)) {
      if (n) {
        const r = this.clips[t];
        if (!r)
          return;
        this.automation.removeAllPointsWithinRange(r.getClipStartTick(), r.getClipEndTick());
      }
      this.clips.splice(t, 1);
    }
  }
  deleteFromParent() {
    this.song.removeTrack(this.getId());
  }
  getAutomation() {
    return this.automation;
  }
  setAutomation(t) {
    this.automation = t.clone();
  }
  hasAnyAutomation() {
    return this.automation.getAutomationTargets().length > 0 && !A.isEmpty(this.automation.getAutomationTargetValues());
  }
  static generateTrackIdInternal() {
    return Ze();
  }
  resolveClipConflictInternal(t, n, r) {
    const i = this.getClipsOverlappingWith(n, r);
    for (const s of i)
      s.getId() !== t && s.trimConflictPartInternal(n, r);
  }
  orderedInsertClipInternal(t) {
    const n = S.ge(
      this.clips,
      t,
      (r, i) => r.getClipStartTick() - i.getClipStartTick()
    );
    this.clips.splice(n, 0, t);
  }
}
class oe {
  program;
  isDrum;
  constructor({
    program: t,
    isDrum: n
  }) {
    this.program = t, this.isDrum = n;
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
function Cf(e) {
  var t = new $(e), n = t.readChunk();
  if (n.id != "MThd")
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + n.id + "'";
  for (var r = _f(n.data), i = [], s = 0; !t.eof() && s < r.numTracks; s++) {
    var o = t.readChunk();
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
function _f(e) {
  var t = new $(e), n = t.readUInt16(), r = t.readUInt16(), i = {
    format: n,
    numTracks: r
  }, s = t.readUInt16();
  return s & 32768 ? (i.framesPerSecond = 256 - (s >> 8), i.ticksPerFrame = s & 255) : i.ticksPerBeat = s, i;
}
function xf(e) {
  for (var t = new $(e), n = []; !t.eof(); ) {
    var r = s();
    n.push(r);
  }
  return n;
  var i;
  function s() {
    var o = {};
    o.deltaTime = t.readVarInt();
    var a = t.readUInt8();
    if ((a & 240) === 240)
      if (a === 255) {
        o.meta = !0;
        var l = t.readUInt8(), u = t.readVarInt();
        switch (l) {
          case 0:
            if (o.type = "sequenceNumber", u !== 2)
              throw "Expected length for sequenceNumber event is 2, got " + u;
            return o.number = t.readUInt16(), o;
          case 1:
            return o.type = "text", o.text = t.readString(u), o;
          case 2:
            return o.type = "copyrightNotice", o.text = t.readString(u), o;
          case 3:
            return o.type = "trackName", o.text = t.readString(u), o;
          case 4:
            return o.type = "instrumentName", o.text = t.readString(u), o;
          case 5:
            return o.type = "lyrics", o.text = t.readString(u), o;
          case 6:
            return o.type = "marker", o.text = t.readString(u), o;
          case 7:
            return o.type = "cuePoint", o.text = t.readString(u), o;
          case 32:
            if (o.type = "channelPrefix", u != 1)
              throw "Expected length for channelPrefix event is 1, got " + u;
            return o.channel = t.readUInt8(), o;
          case 33:
            if (o.type = "portPrefix", u != 1)
              throw "Expected length for portPrefix event is 1, got " + u;
            return o.port = t.readUInt8(), o;
          case 47:
            if (o.type = "endOfTrack", u != 0)
              throw "Expected length for endOfTrack event is 0, got " + u;
            return o;
          case 81:
            if (o.type = "setTempo", u != 3)
              throw "Expected length for setTempo event is 3, got " + u;
            return o.microsecondsPerBeat = t.readUInt24(), o;
          case 84:
            if (o.type = "smpteOffset", u != 5)
              throw "Expected length for smpteOffset event is 5, got " + u;
            var p = t.readUInt8(), h = { 0: 24, 32: 25, 64: 29, 96: 30 };
            return o.frameRate = h[p & 96], o.hour = p & 31, o.min = t.readUInt8(), o.sec = t.readUInt8(), o.frame = t.readUInt8(), o.subFrame = t.readUInt8(), o;
          case 88:
            if (o.type = "timeSignature", u != 4)
              throw "Expected length for timeSignature event is 4, got " + u;
            return o.numerator = t.readUInt8(), o.denominator = 1 << t.readUInt8(), o.metronome = t.readUInt8(), o.thirtyseconds = t.readUInt8(), o;
          case 89:
            if (o.type = "keySignature", u != 2)
              throw "Expected length for keySignature event is 2, got " + u;
            return o.key = t.readInt8(), o.scale = t.readUInt8(), o;
          case 127:
            return o.type = "sequencerSpecific", o.data = t.readBytes(u), o;
          default:
            return o.type = "unknownMeta", o.data = t.readBytes(u), o.metatypeByte = l, o;
        }
      } else if (a == 240) {
        o.type = "sysEx";
        var u = t.readVarInt();
        return o.data = t.readBytes(u), o;
      } else if (a == 247) {
        o.type = "endSysEx";
        var u = t.readVarInt();
        return o.data = t.readBytes(u), o;
      } else
        throw "Unrecognised MIDI event type byte: " + a;
    else {
      var g;
      if ((a & 128) === 0) {
        if (i === null)
          throw "Running status byte encountered before status byte";
        g = a, a = i, o.running = !0;
      } else
        g = t.readUInt8(), i = a;
      var I = a >> 4;
      switch (o.channel = a & 15, I) {
        case 8:
          return o.type = "noteOff", o.noteNumber = g, o.velocity = t.readUInt8(), o;
        case 9:
          var v = t.readUInt8();
          return o.type = v === 0 ? "noteOff" : "noteOn", o.noteNumber = g, o.velocity = v, v === 0 && (o.byte9 = !0), o;
        case 10:
          return o.type = "noteAftertouch", o.noteNumber = g, o.amount = t.readUInt8(), o;
        case 11:
          return o.type = "controller", o.controllerType = g, o.value = t.readUInt8(), o;
        case 12:
          return o.type = "programChange", o.programNumber = g, o;
        case 13:
          return o.type = "channelAftertouch", o.amount = g, o;
        case 14:
          return o.type = "pitchBend", o.value = g + (t.readUInt8() << 7) - 8192, o;
        default:
          throw "Unrecognised MIDI event type: " + I;
      }
    }
  }
}
function $(e) {
  this.buffer = e, this.bufferLen = this.buffer.length, this.pos = 0;
}
$.prototype.eof = function() {
  return this.pos >= this.bufferLen;
};
$.prototype.readUInt8 = function() {
  var e = this.buffer[this.pos];
  return this.pos += 1, e;
};
$.prototype.readInt8 = function() {
  var e = this.readUInt8();
  return e & 128 ? e - 256 : e;
};
$.prototype.readUInt16 = function() {
  var e = this.readUInt8(), t = this.readUInt8();
  return (e << 8) + t;
};
$.prototype.readInt16 = function() {
  var e = this.readUInt16();
  return e & 32768 ? e - 65536 : e;
};
$.prototype.readUInt24 = function() {
  var e = this.readUInt8(), t = this.readUInt8(), n = this.readUInt8();
  return (e << 16) + (t << 8) + n;
};
$.prototype.readInt24 = function() {
  var e = this.readUInt24();
  return e & 8388608 ? e - 16777216 : e;
};
$.prototype.readUInt32 = function() {
  var e = this.readUInt8(), t = this.readUInt8(), n = this.readUInt8(), r = this.readUInt8();
  return (e << 24) + (t << 16) + (n << 8) + r;
};
$.prototype.readBytes = function(e) {
  var t = this.buffer.slice(this.pos, this.pos + e);
  return this.pos += e, t;
};
$.prototype.readString = function(e) {
  var t = this.readBytes(e);
  return String.fromCharCode.apply(null, t);
};
$.prototype.readVarInt = function() {
  for (var e = 0; !this.eof(); ) {
    var t = this.readUInt8();
    if (t & 128)
      e += t & 127, e <<= 7;
    else
      return e + t;
  }
  return e;
};
$.prototype.readChunk = function() {
  var e = this.readString(4), t = this.readUInt32(), n = this.readBytes(t);
  return {
    id: e,
    length: t,
    data: n
  };
};
var Ef = Cf;
function Nf(e, t) {
  if (typeof e != "object")
    throw "Invalid MIDI data";
  t = t || {};
  var n = e.header || {}, r = e.tracks || [], i, s = r.length, o = new E();
  for (Af(o, n, s), i = 0; i < s; i++)
    Pf(o, r[i], t);
  return o.buffer;
}
function Af(e, t, n) {
  var r = t.format == null ? 1 : t.format, i = 128;
  t.timeDivision ? i = t.timeDivision : t.ticksPerFrame && t.framesPerSecond ? i = -(t.framesPerSecond & 255) << 8 | t.ticksPerFrame & 255 : t.ticksPerBeat && (i = t.ticksPerBeat & 32767);
  var s = new E();
  s.writeUInt16(r), s.writeUInt16(n), s.writeUInt16(i), e.writeChunk("MThd", s.buffer);
}
function Pf(e, t, n) {
  var r = new E(), i, s = t.length, o = null;
  for (i = 0; i < s; i++)
    (n.running === !1 || !n.running && !t[i].running) && (o = null), o = Of(r, t[i], o, n.useByte9ForNoteOff);
  e.writeChunk("MTrk", r.buffer);
}
function Of(e, t, n, r) {
  var i = t.type, s = t.deltaTime, o = t.text || "", a = t.data || [], l = null;
  switch (e.writeVarInt(s), i) {
    case "sequenceNumber":
      e.writeUInt8(255), e.writeUInt8(0), e.writeVarInt(2), e.writeUInt16(t.number);
      break;
    case "text":
      e.writeUInt8(255), e.writeUInt8(1), e.writeVarInt(o.length), e.writeString(o);
      break;
    case "copyrightNotice":
      e.writeUInt8(255), e.writeUInt8(2), e.writeVarInt(o.length), e.writeString(o);
      break;
    case "trackName":
      e.writeUInt8(255), e.writeUInt8(3), e.writeVarInt(o.length), e.writeString(o);
      break;
    case "instrumentName":
      e.writeUInt8(255), e.writeUInt8(4), e.writeVarInt(o.length), e.writeString(o);
      break;
    case "lyrics":
      e.writeUInt8(255), e.writeUInt8(5), e.writeVarInt(o.length), e.writeString(o);
      break;
    case "marker":
      e.writeUInt8(255), e.writeUInt8(6), e.writeVarInt(o.length), e.writeString(o);
      break;
    case "cuePoint":
      e.writeUInt8(255), e.writeUInt8(7), e.writeVarInt(o.length), e.writeString(o);
      break;
    case "channelPrefix":
      e.writeUInt8(255), e.writeUInt8(32), e.writeVarInt(1), e.writeUInt8(t.channel);
      break;
    case "portPrefix":
      e.writeUInt8(255), e.writeUInt8(33), e.writeVarInt(1), e.writeUInt8(t.port);
      break;
    case "endOfTrack":
      e.writeUInt8(255), e.writeUInt8(47), e.writeVarInt(0);
      break;
    case "setTempo":
      e.writeUInt8(255), e.writeUInt8(81), e.writeVarInt(3), e.writeUInt24(t.microsecondsPerBeat);
      break;
    case "smpteOffset":
      e.writeUInt8(255), e.writeUInt8(84), e.writeVarInt(5);
      var u = { 24: 0, 25: 32, 29: 64, 30: 96 }, p = t.hour & 31 | u[t.frameRate];
      e.writeUInt8(p), e.writeUInt8(t.min), e.writeUInt8(t.sec), e.writeUInt8(t.frame), e.writeUInt8(t.subFrame);
      break;
    case "timeSignature":
      e.writeUInt8(255), e.writeUInt8(88), e.writeVarInt(4), e.writeUInt8(t.numerator);
      var h = Math.floor(Math.log(t.denominator) / Math.LN2) & 255;
      e.writeUInt8(h), e.writeUInt8(t.metronome), e.writeUInt8(t.thirtyseconds || 8);
      break;
    case "keySignature":
      e.writeUInt8(255), e.writeUInt8(89), e.writeVarInt(2), e.writeInt8(t.key), e.writeUInt8(t.scale);
      break;
    case "sequencerSpecific":
      e.writeUInt8(255), e.writeUInt8(127), e.writeVarInt(a.length), e.writeBytes(a);
      break;
    case "unknownMeta":
      t.metatypeByte != null && (e.writeUInt8(255), e.writeUInt8(t.metatypeByte), e.writeVarInt(a.length), e.writeBytes(a));
      break;
    case "sysEx":
      e.writeUInt8(240), e.writeVarInt(a.length), e.writeBytes(a);
      break;
    case "endSysEx":
      e.writeUInt8(247), e.writeVarInt(a.length), e.writeBytes(a);
      break;
    case "noteOff":
      var g = r !== !1 && t.byte9 || r && t.velocity == 0 ? 144 : 128;
      l = g | t.channel, l !== n && e.writeUInt8(l), e.writeUInt8(t.noteNumber), e.writeUInt8(t.velocity);
      break;
    case "noteOn":
      l = 144 | t.channel, l !== n && e.writeUInt8(l), e.writeUInt8(t.noteNumber), e.writeUInt8(t.velocity);
      break;
    case "noteAftertouch":
      l = 160 | t.channel, l !== n && e.writeUInt8(l), e.writeUInt8(t.noteNumber), e.writeUInt8(t.amount);
      break;
    case "controller":
      l = 176 | t.channel, l !== n && e.writeUInt8(l), e.writeUInt8(t.controllerType), e.writeUInt8(t.value);
      break;
    case "programChange":
      l = 192 | t.channel, l !== n && e.writeUInt8(l), e.writeUInt8(t.programNumber);
      break;
    case "channelAftertouch":
      l = 208 | t.channel, l !== n && e.writeUInt8(l), e.writeUInt8(t.amount);
      break;
    case "pitchBend":
      l = 224 | t.channel, l !== n && e.writeUInt8(l);
      var I = 8192 + t.value, v = I & 127, w = I >> 7 & 127;
      e.writeUInt8(v), e.writeUInt8(w);
      break;
    default:
      throw "Unrecognized event type: " + i;
  }
  return l;
}
function E() {
  this.buffer = [];
}
E.prototype.writeUInt8 = function(e) {
  this.buffer.push(e & 255);
};
E.prototype.writeInt8 = E.prototype.writeUInt8;
E.prototype.writeUInt16 = function(e) {
  var t = e >> 8 & 255, n = e & 255;
  this.writeUInt8(t), this.writeUInt8(n);
};
E.prototype.writeInt16 = E.prototype.writeUInt16;
E.prototype.writeUInt24 = function(e) {
  var t = e >> 16 & 255, n = e >> 8 & 255, r = e & 255;
  this.writeUInt8(t), this.writeUInt8(n), this.writeUInt8(r);
};
E.prototype.writeInt24 = E.prototype.writeUInt24;
E.prototype.writeUInt32 = function(e) {
  var t = e >> 24 & 255, n = e >> 16 & 255, r = e >> 8 & 255, i = e & 255;
  this.writeUInt8(t), this.writeUInt8(n), this.writeUInt8(r), this.writeUInt8(i);
};
E.prototype.writeInt32 = E.prototype.writeUInt32;
E.prototype.writeBytes = function(e) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(e, 0));
};
E.prototype.writeString = function(e) {
  var t, n = e.length, r = [];
  for (t = 0; t < n; t++)
    r.push(e.codePointAt(t));
  this.writeBytes(r);
};
E.prototype.writeVarInt = function(e) {
  if (e < 0)
    throw "Cannot write negative variable-length integer";
  if (e <= 127)
    this.writeUInt8(e);
  else {
    var t = e, n = [];
    for (n.push(t & 127), t >>= 7; t; ) {
      var r = t & 127 | 128;
      n.push(r), t >>= 7;
    }
    this.writeBytes(n.reverse());
  }
};
E.prototype.writeChunk = function(e, t) {
  this.writeString(e), this.writeUInt32(t.length), this.writeBytes(t);
};
var Mf = Nf;
sn.parseMidi = Ef;
sn.writeMidi = Mf;
var br = {}, on = {}, ge = {};
Object.defineProperty(ge, "__esModule", { value: !0 });
function ho(e, t, n) {
  n === void 0 && (n = "ticks");
  var r = 0, i = e.length, s = i;
  if (i > 0 && e[i - 1][n] <= t)
    return i - 1;
  for (; r < s; ) {
    var o = Math.floor(r + (s - r) / 2), a = e[o], l = e[o + 1];
    if (a[n] === t) {
      for (var u = o; u < e.length; u++) {
        var p = e[u];
        p[n] === t && (o = u);
      }
      return o;
    } else {
      if (a[n] < t && l[n] > t)
        return o;
      a[n] > t ? s = o : a[n] < t && (r = o + 1);
    }
  }
  return -1;
}
ge.search = ho;
function Vf(e, t, n) {
  if (n === void 0 && (n = "ticks"), e.length) {
    var r = ho(e, t[n], n);
    e.splice(r + 1, 0, t);
  } else
    e.push(t);
}
ge.insert = Vf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = ge, n = /* @__PURE__ */ new WeakMap();
  e.keySignatureKeys = [
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
            key: e.keySignatureKeys[l.key + 7],
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
      var o = t.search(this.tempos, s);
      if (o !== -1) {
        var a = this.tempos[o], l = a.time, u = (s - a.ticks) / this.ppq;
        return l + 60 / a.bpm * u;
      } else {
        var p = s / this.ppq;
        return 60 / 120 * p;
      }
    }, i.prototype.ticksToMeasures = function(s) {
      var o = t.search(this.timeSignatures, s);
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
      var o = t.search(this.tempos, s, "time");
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
  e.Header = r;
})(on);
var me = { exports: {} };
me.exports = Rf;
me.exports.from = po;
me.exports.depth = Uf;
me.exports.fromDepth = go;
function Rf(e) {
  if (!Array.isArray(e))
    throw new TypeError("Expected value to be an array");
  return po(e);
}
function po(e) {
  return mo(e, []);
}
function Uf(e, t) {
  if (!Array.isArray(e))
    throw new TypeError("Expected value to be an array");
  return go(e, t);
}
function go(e, t) {
  if (typeof t != "number")
    throw new TypeError("Expected the depth to be a number");
  return Io(e, [], t);
}
function mo(e, t) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    Array.isArray(r) ? mo(r, t) : t.push(r);
  }
  return t;
}
function Io(e, t, n) {
  n--;
  for (var r = 0; r < e.length; r++) {
    var i = e[r];
    n > -1 && Array.isArray(i) ? Io(i, t, n) : t.push(i);
  }
  return t;
}
var _n = X && X.__spreadArrays || function() {
  for (var e = 0, t = 0, n = arguments.length; t < n; t++)
    e += arguments[t].length;
  for (var r = Array(e), i = 0, t = 0; t < n; t++)
    for (var s = arguments[t], o = 0, a = s.length; o < a; o++, i++)
      r[i] = s[o];
  return r;
}, Ff = X && X.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(br, "__esModule", { value: !0 });
var Bf = sn, Df = on, $f = Ff(me.exports);
function Lf(e, t) {
  return [
    {
      absoluteTime: e.ticks,
      channel: t,
      deltaTime: 0,
      noteNumber: e.midi,
      type: "noteOn",
      velocity: Math.floor(e.velocity * 127)
    },
    {
      absoluteTime: e.ticks + e.durationTicks,
      channel: t,
      deltaTime: 0,
      noteNumber: e.midi,
      type: "noteOff",
      velocity: Math.floor(e.noteOffVelocity * 127)
    }
  ];
}
function Hf(e) {
  return $f.default(e.notes.map(function(t) {
    return Lf(t, e.channel);
  }));
}
function Kf(e, t) {
  return {
    absoluteTime: e.ticks,
    channel: t,
    controllerType: e.number,
    deltaTime: 0,
    type: "controller",
    value: Math.floor(e.value * 127)
  };
}
function qf(e) {
  for (var t = [], n = 0; n < 127; n++)
    e.controlChanges.hasOwnProperty(n) && e.controlChanges[n].forEach(function(r) {
      t.push(Kf(r, e.channel));
    });
  return t;
}
function zf(e, t) {
  return {
    absoluteTime: e.ticks,
    channel: t,
    deltaTime: 0,
    type: "pitchBend",
    value: e.value
  };
}
function Gf(e) {
  var t = [];
  return e.pitchBends.forEach(function(n) {
    t.push(zf(n, e.channel));
  }), t;
}
function Jf(e) {
  return {
    absoluteTime: 0,
    channel: e.channel,
    deltaTime: 0,
    programNumber: e.instrument.number,
    type: "programChange"
  };
}
function Wf(e) {
  return {
    absoluteTime: 0,
    deltaTime: 0,
    meta: !0,
    text: e,
    type: "trackName"
  };
}
function Qf(e) {
  return {
    absoluteTime: e.ticks,
    deltaTime: 0,
    meta: !0,
    microsecondsPerBeat: Math.floor(6e7 / e.bpm),
    type: "setTempo"
  };
}
function Yf(e) {
  return {
    absoluteTime: e.ticks,
    deltaTime: 0,
    denominator: e.timeSignature[1],
    meta: !0,
    metronome: 24,
    numerator: e.timeSignature[0],
    thirtyseconds: 8,
    type: "timeSignature"
  };
}
function jf(e) {
  var t = Df.keySignatureKeys.indexOf(e.key);
  return {
    absoluteTime: e.ticks,
    deltaTime: 0,
    key: t + 7,
    meta: !0,
    scale: e.scale === "major" ? 0 : 1,
    type: "keySignature"
  };
}
function Xf(e) {
  return {
    absoluteTime: e.ticks,
    deltaTime: 0,
    meta: !0,
    text: e.text,
    type: e.type
  };
}
function Zf(e) {
  var t = {
    header: {
      format: 1,
      numTracks: e.tracks.length + 1,
      ticksPerBeat: e.header.ppq
    },
    tracks: _n([
      _n([
        {
          absoluteTime: 0,
          deltaTime: 0,
          meta: !0,
          text: e.header.name,
          type: "trackName"
        }
      ], e.header.keySignatures.map(function(n) {
        return jf(n);
      }), e.header.meta.map(function(n) {
        return Xf(n);
      }), e.header.tempos.map(function(n) {
        return Qf(n);
      }), e.header.timeSignatures.map(function(n) {
        return Yf(n);
      }))
    ], e.tracks.map(function(n) {
      return _n([
        Wf(n.name),
        Jf(n)
      ], Hf(n), qf(n), Gf(n));
    }))
  };
  return t.tracks = t.tracks.map(function(n) {
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
  }), new Uint8Array(Bf.writeMidi(t));
}
br.encode = Zf;
var an = {}, kr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.controlChangeNames = {
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
  }, e.controlChangeIds = Object.keys(e.controlChangeNames).reduce(function(i, s) {
    return i[e.controlChangeNames[s]] = s, i;
  }, {});
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = function() {
    function i(s, o) {
      t.set(this, o), n.set(this, s.controllerType), this.ticks = s.absoluteTime, this.value = s.value;
    }
    return Object.defineProperty(i.prototype, "number", {
      get: function() {
        return n.get(this);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "name", {
      get: function() {
        return e.controlChangeNames[this.number] ? e.controlChangeNames[this.number] : null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "time", {
      get: function() {
        var s = t.get(this);
        return s.ticksToSeconds(this.ticks);
      },
      set: function(s) {
        var o = t.get(this);
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
  e.ControlChange = r;
})(kr);
var Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
var Re = kr;
function th() {
  return new Proxy({}, {
    get: function(e, t) {
      if (e[t])
        return e[t];
      if (Re.controlChangeIds.hasOwnProperty(t))
        return e[Re.controlChangeIds[t]];
    },
    set: function(e, t, n) {
      return Re.controlChangeIds.hasOwnProperty(t) ? e[Re.controlChangeIds[t]] = n : e[t] = n, !0;
    }
  });
}
Sr.createControlChanges = th;
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
var xn = /* @__PURE__ */ new WeakMap(), eh = function() {
  function e(t, n) {
    xn.set(this, n), this.ticks = t.absoluteTime, this.value = t.value;
  }
  return Object.defineProperty(e.prototype, "time", {
    get: function() {
      var t = xn.get(this);
      return t.ticksToSeconds(this.ticks);
    },
    set: function(t) {
      var n = xn.get(this);
      this.ticks = n.secondsToTicks(t);
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.toJSON = function() {
    return {
      ticks: this.ticks,
      time: this.time,
      value: this.value
    };
  }, e;
}();
Cr.PitchBend = eh;
var _r = {}, Ie = {};
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
Object.defineProperty(_r, "__esModule", { value: !0 });
var Ue = Ie, Ui = /* @__PURE__ */ new WeakMap(), nh = function() {
  function e(t, n) {
    if (this.number = 0, Ui.set(this, n), this.number = 0, t) {
      var r = t.find(function(i) {
        return i.type === "programChange";
      });
      r && (this.number = r.programNumber);
    }
  }
  return Object.defineProperty(e.prototype, "name", {
    get: function() {
      return this.percussion ? Ue.DrumKitByPatchID[this.number] : Ue.instrumentByPatchID[this.number];
    },
    set: function(t) {
      var n = Ue.instrumentByPatchID.indexOf(t);
      n !== -1 && (this.number = n);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "family", {
    get: function() {
      return this.percussion ? "drums" : Ue.InstrumentFamilyByID[Math.floor(this.number / 8)];
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "percussion", {
    get: function() {
      var t = Ui.get(this);
      return t.channel === 9;
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.toJSON = function() {
    return {
      family: this.family,
      name: this.name,
      number: this.number
    };
  }, e.prototype.fromJSON = function(t) {
    this.number = t.number;
  }, e;
}();
_r.Instrument = nh;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
function rh(e) {
  var t = Math.floor(e / 12) - 1;
  return vo(e) + t.toString();
}
function vo(e) {
  var t = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = e % 12;
  return t[n];
}
function ih(e) {
  var t = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return t.indexOf(e);
}
var sh = function() {
  var e = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, t = {
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
    var r = e.exec(n), i = r[1], s = r[2], o = t[i.toLowerCase()];
    return o + (parseInt(s, 10) + 1) * 12;
  };
}(), Bt = /* @__PURE__ */ new WeakMap(), oh = function() {
  function e(t, n, r) {
    Bt.set(this, r), this.midi = t.midi, this.velocity = t.velocity, this.noteOffVelocity = n.velocity, this.ticks = t.ticks, this.durationTicks = n.ticks - t.ticks;
  }
  return Object.defineProperty(e.prototype, "name", {
    get: function() {
      return rh(this.midi);
    },
    set: function(t) {
      this.midi = sh(t);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "octave", {
    get: function() {
      return Math.floor(this.midi / 12) - 1;
    },
    set: function(t) {
      var n = t - this.octave;
      this.midi += n * 12;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "pitch", {
    get: function() {
      return vo(this.midi);
    },
    set: function(t) {
      this.midi = 12 * (this.octave + 1) + ih(t);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "duration", {
    get: function() {
      var t = Bt.get(this);
      return t.ticksToSeconds(this.ticks + this.durationTicks) - t.ticksToSeconds(this.ticks);
    },
    set: function(t) {
      var n = Bt.get(this), r = n.secondsToTicks(this.time + t);
      this.durationTicks = r - this.ticks;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "time", {
    get: function() {
      var t = Bt.get(this);
      return t.ticksToSeconds(this.ticks);
    },
    set: function(t) {
      var n = Bt.get(this);
      this.ticks = n.secondsToTicks(t);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "bars", {
    get: function() {
      var t = Bt.get(this);
      return t.ticksToMeasures(this.ticks);
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.toJSON = function() {
    return {
      duration: this.duration,
      durationTicks: this.durationTicks,
      midi: this.midi,
      name: this.name,
      ticks: this.ticks,
      time: this.time,
      velocity: this.velocity
    };
  }, e;
}();
xr.Note = oh;
Object.defineProperty(an, "__esModule", { value: !0 });
var En = ge, ah = kr, ch = Sr, uh = Cr, Fi = _r, lh = xr, Fe = /* @__PURE__ */ new WeakMap(), fh = function() {
  function e(t, n) {
    var r = this;
    if (this.name = "", this.notes = [], this.controlChanges = ch.createControlChanges(), this.pitchBends = [], Fe.set(this, n), t) {
      var i = t.find(function(g) {
        return g.type === "trackName";
      });
      this.name = i ? i.text : "";
    }
    if (this.instrument = new Fi.Instrument(t, this), this.channel = 0, t) {
      for (var s = t.filter(function(g) {
        return g.type === "noteOn";
      }), o = t.filter(function(g) {
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
      var u = t.filter(function(g) {
        return g.type === "controller";
      });
      u.forEach(function(g) {
        r.addCC({
          number: g.controllerType,
          ticks: g.absoluteTime,
          value: g.value / 127
        });
      });
      var p = t.filter(function(g) {
        return g.type === "pitchBend";
      });
      p.forEach(function(g) {
        r.addPitchBend({
          ticks: g.absoluteTime,
          value: g.value / Math.pow(2, 13)
        });
      });
      var h = t.find(function(g) {
        return g.type === "endOfTrack";
      });
      this.endOfTrackTicks = h !== void 0 ? h.absoluteTime : void 0;
    }
  }
  return e.prototype.addNote = function(t) {
    var n = Fe.get(this), r = new lh.Note({
      midi: 0,
      ticks: 0,
      velocity: 1
    }, {
      ticks: 0,
      velocity: 0
    }, n);
    return Object.assign(r, t), En.insert(this.notes, r, "ticks"), this;
  }, e.prototype.addCC = function(t) {
    var n = Fe.get(this), r = new ah.ControlChange({
      controllerType: t.number
    }, n);
    return delete t.number, Object.assign(r, t), Array.isArray(this.controlChanges[r.number]) || (this.controlChanges[r.number] = []), En.insert(this.controlChanges[r.number], r, "ticks"), this;
  }, e.prototype.addPitchBend = function(t) {
    var n = Fe.get(this), r = new uh.PitchBend({}, n);
    return Object.assign(r, t), En.insert(this.pitchBends, r, "ticks"), this;
  }, Object.defineProperty(e.prototype, "duration", {
    get: function() {
      if (!this.notes.length)
        return 0;
      for (var t = this.notes[this.notes.length - 1].time + this.notes[this.notes.length - 1].duration, n = 0; n < this.notes.length - 1; n++) {
        var r = this.notes[n].time + this.notes[n].duration;
        t < r && (t = r);
      }
      return t;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "durationTicks", {
    get: function() {
      if (!this.notes.length)
        return 0;
      for (var t = this.notes[this.notes.length - 1].ticks + this.notes[this.notes.length - 1].durationTicks, n = 0; n < this.notes.length - 1; n++) {
        var r = this.notes[n].ticks + this.notes[n].durationTicks;
        t < r && (t = r);
      }
      return t;
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.fromJSON = function(t) {
    var n = this;
    this.name = t.name, this.channel = t.channel, this.instrument = new Fi.Instrument(void 0, this), this.instrument.fromJSON(t.instrument), t.endOfTrackTicks !== void 0 && (this.endOfTrackTicks = t.endOfTrackTicks);
    for (var r in t.controlChanges)
      t.controlChanges[r] && t.controlChanges[r].forEach(function(i) {
        n.addCC({
          number: i.number,
          ticks: i.ticks,
          value: i.value
        });
      });
    t.notes.forEach(function(i) {
      n.addNote({
        durationTicks: i.durationTicks,
        midi: i.midi,
        ticks: i.ticks,
        velocity: i.velocity
      });
    });
  }, e.prototype.toJSON = function() {
    for (var t = {}, n = 0; n < 127; n++)
      this.controlChanges.hasOwnProperty(n) && (t[n] = this.controlChanges[n].map(function(i) {
        return i.toJSON();
      }));
    var r = {
      channel: this.channel,
      controlChanges: t,
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
  }, e;
}();
an.Track = fh;
var hh = X && X.__awaiter || function(e, t, n, r) {
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
    u((r = r.apply(e, t || [])).next());
  });
}, ph = X && X.__generator || function(e, t) {
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
        u = t.call(e, n);
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
  function e(t) {
    var n = this, r = null;
    t && (t instanceof ArrayBuffer && (t = new Uint8Array(t)), r = dh.parseMidi(t), r.tracks.forEach(function(i) {
      var s = 0;
      i.forEach(function(o) {
        s += o.deltaTime, o.absoluteTime = s;
      });
    }), r.tracks = yh(r.tracks)), this.header = new Bi.Header(r), this.tracks = [], t && (this.tracks = r.tracks.map(function(i) {
      return new Nn.Track(i, n.header);
    }), r.header.format === 1 && this.tracks[0].duration === 0 && this.tracks.shift());
  }
  return e.fromUrl = function(t) {
    return hh(this, void 0, void 0, function() {
      var n, r;
      return ph(this, function(i) {
        switch (i.label) {
          case 0:
            return [4, fetch(t)];
          case 1:
            return n = i.sent(), n.ok ? [4, n.arrayBuffer()] : [3, 3];
          case 2:
            return r = i.sent(), [2, new e(r)];
          case 3:
            throw new Error("could not load " + t);
        }
      });
    });
  }, Object.defineProperty(e.prototype, "name", {
    get: function() {
      return this.header.name;
    },
    set: function(t) {
      this.header.name = t;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "duration", {
    get: function() {
      var t = this.tracks.map(function(n) {
        return n.duration;
      });
      return Math.max.apply(Math, t);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "durationTicks", {
    get: function() {
      var t = this.tracks.map(function(n) {
        return n.durationTicks;
      });
      return Math.max.apply(Math, t);
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.addTrack = function() {
    var t = new Nn.Track(void 0, this.header);
    return this.tracks.push(t), t;
  }, e.prototype.toArray = function() {
    return gh.encode(this);
  }, e.prototype.toJSON = function() {
    return {
      header: this.header.toJSON(),
      tracks: this.tracks.map(function(t) {
        return t.toJSON();
      })
    };
  }, e.prototype.fromJSON = function(t) {
    var n = this;
    this.header = new Bi.Header(), this.header.fromJSON(t.header), this.tracks = t.tracks.map(function(r) {
      var i = new Nn.Track(void 0, n.header);
      return i.fromJSON(r), i;
    });
  }, e.prototype.clone = function() {
    var t = new e();
    return t.fromJSON(this.toJSON()), t;
  }, e;
}(), Ih = rn.Midi = mh, vh = an;
rn.Track = vh.Track;
var Th = on;
rn.Header = Th.Header;
function yh(e) {
  for (var t = [], n = 0; n < e.length; n++)
    for (var r = t.length, i = /* @__PURE__ */ new Map(), s = Array(16).fill(0), o = 0, a = e[n]; o < a.length; o++) {
      var l = a[o], u = r, p = l.channel;
      if (p !== void 0) {
        l.type === "programChange" && (s[p] = l.programNumber);
        var h = s[p], g = h + " " + p;
        i.has(g) ? u = i.get(g) : (u = r + i.size, i.set(g, u));
      }
      t[u] || t.push([]), t[u].push(l);
    }
  return t;
}
var wh = /* @__PURE__ */ ((e) => (e[e.UNKNOWN = 0] = "UNKNOWN", e[e.INTRO = 1] = "INTRO", e[e.VERSE = 2] = "VERSE", e[e.CHORUS = 3] = "CHORUS", e[e.BRIDGE = 4] = "BRIDGE", e[e.OUTRO = 5] = "OUTRO", e))(wh || {});
class bh {
  tick;
  type;
  constructor({ tick: t, type: n }) {
    this.tick = t, this.type = n;
  }
  getTick() {
    return this.tick;
  }
  setTick(t) {
    this.tick = t;
  }
  getType() {
    return this.type;
  }
  setType(t) {
    this.type = t;
  }
}
class rt {
  static DEFAULT_PPQ = 480;
  masterTrack;
  tracks;
  PPQ;
  tempos;
  timeSignatures;
  structures;
  pluginContext;
  nextTrackRank = 1;
  constructor() {
    this.tracks = [], this.PPQ = 0, this.tempos = [], this.timeSignatures = [], this.structures = [];
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
  getTrackById(t) {
    return Ke(this.tracks, (n) => n.getId() === t);
  }
  getTracksByIds(t) {
    if (!this.tracks)
      return [];
    const n = new Set(t);
    return this.tracks.filter((r) => n.has(r.getId()));
  }
  getTrackIndex(t) {
    return Jt(this.tracks, (n) => n.getId() === t);
  }
  createTrack({
    type: t,
    index: n,
    rank: r,
    assignDefaultSamplerPlugin: i = !1
  }) {
    this.checkAccess("createTrack"), r == null || r === null ? r = this.getNextTrackRank() : this.nextTrackRank = Math.max(r + 1, this.nextTrackRank);
    const s = new Ht({
      type: t,
      song: this,
      uuid: this.getNextTrackId(),
      rank: r == null || r === null ? this.getNextTrackRank() : r
    });
    return i && t === Dt.MIDI_TRACK && s.setSamplerPlugin(s.createAudioPlugin(nn.DEFAULT_SYNTH_TFID)), n != null ? this.tracks.splice(n, 0, s) : this.tracks.push(s), s;
  }
  cloneTrack(t) {
    let n = this.getTrackIndex(t.getId());
    n < 0 && (n = void 0);
    const r = this.createTrack({
      type: t.getType(),
      index: n
    });
    if (r.setVolume(t.getVolume()), r.setPan(t.getPan()), r.setSolo(t.getSolo()), r.setMuted(t.getMuted()), t.getType() === Dt.MIDI_TRACK) {
      const i = t.getInstrument();
      i && r.setInstrument({
        program: i.getProgram(),
        isDrum: i.getIsDrum()
      });
      for (const o of t.getSuggestedInstruments())
        r.createSuggestedInstrument({
          program: o.getProgram(),
          isDrum: o.getIsDrum()
        });
      const s = t.getSamplerPlugin();
      s && r.setSamplerPlugin(s.clone(r));
    } else
      t.getType(), Dt.AUDIO_TRACK;
    for (const i of t.getAudioPlugins())
      r.addAudioPlugin(i.clone(r));
    for (const i of t.getClips()) {
      const s = r.cloneClip(i);
      r.insertClip(s);
    }
    return t.hasAnyAutomation() && r.setAutomation(t.getAutomation()), r;
  }
  removeTrack(t) {
    this.checkAccess("removeTrack");
    const n = this.getTrackById(t);
    return n ? (this.tracks.splice(
      Jt(this.tracks, (r) => r.getId() === t),
      1
    ), n) : null;
  }
  getResolution() {
    return this.PPQ;
  }
  setResolution(t) {
    this.PPQ = t;
  }
  static getLeadingBar(t, n) {
    if (!n || n.length === 0)
      return null;
    if (t < 0)
      return n[0];
    let r = S.le(n, { tick: t }, (i, s) => i.tick - s.tick);
    for (; r > 0 && n[r].beat !== 1; )
      r -= 1;
    return n[r];
  }
  static getLeadingBeat(t, n) {
    if (!n || n.length === 0)
      return null;
    if (t < 0)
      return n[0];
    const r = S.le(n, { tick: t }, (i, s) => i.tick - s.tick);
    return n[r];
  }
  static getTrailingBeat(t, n) {
    if (!n || n.length === 0)
      return null;
    if (t < 0)
      return n[0];
    const r = S.ge(n, { tick: t }, (i, s) => i.tick - s.tick);
    return r > n.length - 1 ? n[n.length - 1] : n[r];
  }
  static getClosestBeat(t, n) {
    if (!n || n.length === 0)
      return null;
    if (t < 0)
      return n[0];
    const r = S.le(n, { tick: t }, (i, s) => i.tick - s.tick);
    return r >= n.length - 1 ? n[r] : Math.abs(n[r].tick - t) > Math.abs(n[r + 1].tick - t) ? n[r + 1] : n[r];
  }
  getBarBeats(t) {
    return rt.getBarBeatsImpl(
      t,
      this.PPQ,
      this.timeSignatures,
      (n) => ({
        tick: n.getTicks(),
        numerator: n.getNumerator(),
        denominator: n.getDenominator()
      })
    );
  }
  static getBarBeatsImpl(t, n, r, i) {
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
    for (; a <= t; ) {
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
  getTempoAtTick(t) {
    return rt.getTempoAtTickImpl(
      t,
      this.tempos,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTempoAtTickImpl(t, n, r, i) {
    let s = S.le(
      n,
      r(t),
      (o, a) => i(o) - i(a)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  createTempoChange({
    ticks: t,
    bpm: n
  }) {
    if (this.PPQ <= 0)
      throw new Error("Song resolution must be provided before creating tempo changes.");
    if (this.tempos.length === 0 && t !== 0)
      throw new Error("The first tempo event must be at tick 0");
    const r = new _e({ ticks: t, bpm: n, time: this.tickToSeconds(t) }), i = S.ge(
      this.tempos,
      r,
      (s, o) => s.getTicks() - o.getTicks()
    );
    return i < 0 ? this.tempos.push(r) : this.tempos.splice(i, 0, r), this.retimingTempoEvents(), r;
  }
  removeTempoChange(t) {
    if (this.getTempoChanges().length <= 1)
      throw new Error("Song has to have at least one tempo change.");
    if (t === 0)
      throw new Error("Cannot remove the first tempo.");
    this.getTempoChanges().splice(t, 1), this.retimingTempoEvents();
  }
  overwriteTempoChanges(t) {
    if (t.length === 0)
      throw new Error("Cannot clear all the tempo events.");
    const n = Ti(t);
    n.sort((i, s) => i.getTicks() - s.getTicks());
    const r = n[0];
    if (r.getTicks() > 0)
      throw new Error("The first tempo event needs to start from tick 0");
    this.tempos = [
      new _e({
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
  updateTempo(t, n) {
    t.setBpmInternal(n), this.retimingTempoEvents();
  }
  moveTempo(t, n) {
    const r = this.getTempoChanges()[t];
    if (!r || t === 0)
      return;
    if (this.getTempoChanges()[t - 1].getTicks() === n)
      this.removeTempoChange(t - 1);
    else if (t < this.getTempoChanges().length - 1) {
      const s = this.getTempoChanges()[t + 1];
      s && s.getTicks() === n && this.removeTempoChange(t + 1);
    }
    r.ticks = n, this.retimingTempoEvents();
  }
  updateTempoAtTick(t, n) {
    const r = this.getTempoAtTick(t);
    r ? this.updateTempo(r, n) : this.createTempoChange({
      ticks: t,
      bpm: n
    });
  }
  getTimeSignatures() {
    return this.timeSignatures;
  }
  overwriteTimeSignatures(t) {
    this.timeSignatures = Ti(t);
  }
  createTimeSignature({
    ticks: t,
    numerator: n,
    denominator: r
  }) {
    const i = new yi({ ticks: t, numerator: n, denominator: r }), s = S.ge(
      this.timeSignatures,
      i,
      (o, a) => o.getTicks() - a.getTicks()
    );
    return s < 0 ? this.timeSignatures.push(i) : this.timeSignatures.splice(s, 0, i), i;
  }
  removeTimeSignature(t) {
    if (this.getTimeSignatures().length <= 1)
      throw new Error("Song has to have at least one time signature change.");
    if (t === 0)
      throw new Error("Cannot remove the first time signature.");
    this.getTimeSignatures().splice(t, 1);
  }
  updateTimeSignatureAtTick(t, n, r) {
    const i = this.getTimeSignatureAtTick(t);
    i ? (i.setNumerator(n), i.setDenominator(r)) : this.createTimeSignature({
      ticks: t,
      numerator: n,
      denominator: r
    });
  }
  moveTimeSignature(t, n) {
    const r = this.getTimeSignatures()[t];
    if (!r || t == 0)
      return;
    if (this.getTimeSignatures()[t - 1].getTicks() === n)
      this.removeTimeSignature(t - 1);
    else if (t < this.getTimeSignatures().length - 1) {
      const s = this.getTimeSignatures()[t + 1];
      s && s.getTicks() === n && this.removeTimeSignature(t + 1);
    }
    r.ticks = n, this.timeSignatures.sort((s, o) => s.getTicks() - o.getTicks());
  }
  getStructures() {
    return this.structures;
  }
  getStructureAtIndex(t) {
    return this.structures[t];
  }
  getStructureAtTick(t) {
    return rt.getStructureAtTickImpl(
      t,
      this.structures,
      (n) => ({ getTick: () => n }),
      (n) => n.getTick()
    );
  }
  static getStructureAtTickImpl(t, n, r, i) {
    let s = S.le(
      n,
      r(t),
      (o, a) => i(o) - i(a)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  createStructure({ tick: t, type: n }) {
    const r = new bh({
      tick: t,
      type: n
    });
    this.structures.push(r), this.structures.length === 1 && r.setTick(0), this.structures.sort((i, s) => i.getTick() - s.getTick());
  }
  moveStructure(t, n) {
    const r = this.getStructures()[t];
    if (!r || t <= 0)
      return;
    if (this.getStructures()[t - 1].getTick() === n)
      this.removeStructure(t - 1);
    else if (t < this.getStructures().length - 1) {
      const s = this.getStructures()[t + 1];
      s && s.getTick() === n && this.removeStructure(t + 1);
    }
    r.tick = n, this.structures.sort((s, o) => s.getTick() - o.getTick());
  }
  updateStructureAtTick(t, n) {
    const r = this.getStructureAtTick(t);
    r ? r.setType(n) : this.createStructure({
      tick: t,
      type: n
    });
  }
  removeStructure(t) {
    t < 0 || t >= this.structures.length || (this.getStructures().splice(t, 1), this.structures.length > 0 && this.structures[0].getTick() > 0 && this.structures[0].setTick(0), this.structures.sort((n, r) => n.getTick() - r.getTick()));
  }
  getLastTick() {
    let t = 0;
    for (const n of this.tracks)
      t = Math.max(t, n.getTrackEndTick());
    return t;
  }
  getDuration() {
    return this.tickToSeconds(this.getLastTick());
  }
  getTicksPerBeatAtTick(t) {
    const n = this.getTimeSignatureAtTick(t);
    return this.getResolution() * (4 / n.getDenominator());
  }
  getTimeSignatureAtTick(t) {
    return rt.getTimeSignatureAtTickImpl(
      t,
      this.timeSignatures,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTimeSignatureAtTickImpl(t, n, r, i) {
    let s = S.le(
      n,
      r(t),
      (o, a) => i(o) - i(a)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  tickToSeconds(t) {
    return rt.tickToSecondsImpl(
      t,
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
  static tickToSecondsImpl(t, n, r, i, s, o) {
    if (t === 0)
      return 0;
    let a = S.lt(
      n,
      i(t),
      (g, I) => s(g) - s(I)
    );
    a == -1 && (a = 0);
    const l = n[a], u = o(l), p = t - u.tick, h = rt.tempoBPMToTicksPerSecond(
      u.bpm,
      r
    );
    return u.time + p / h;
  }
  secondsToTick(t) {
    return rt.secondsToTickImpl(
      t,
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
  static secondsToTickImpl(t, n, r, i, s, o) {
    if (t === 0)
      return 0;
    let a = S.lt(
      r,
      i(t),
      (g, I) => s(g) - s(I)
    );
    a == -1 && (a = 0);
    const l = r[a], u = o(l), p = t - u.time, h = rt.tempoBPMToTicksPerSecond(
      u.bpm,
      n
    );
    return Math.round(u.tick + p * h);
  }
  static importMIDI(t, n, r = 0, i = !1) {
    const s = new Ih(n), o = r, a = rt.DEFAULT_PPQ / s.header.ppq;
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
      t.overwriteTimeSignatures(l);
      const u = [];
      o > 0 && u.push(
        new _e({
          ticks: 0,
          time: 0,
          bpm: 120
        })
      );
      for (const p of s.header.tempos)
        u.push(
          new _e({
            ticks: o + bt(p.ticks, a),
            time: p.time,
            bpm: p.bpm
          })
        );
      t.overwriteTempoChanges(u);
    }
    for (const l of s.tracks) {
      const u = t.createTrack({
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
  setPluginContextInternal(t) {
    this.pluginContext = {
      plugin: t,
      numTracksCreatedByPlugin: 0
    };
  }
  clearPluginContextInternal() {
    this.pluginContext = void 0;
  }
  getNextTrackId() {
    const t = this.pluginContext, n = t.plugin.generatedTrackIdsInternal;
    if (t.numTracksCreatedByPlugin === n.length)
      n.push(Ht.generateTrackIdInternal());
    else if (t.numTracksCreatedByPlugin > n.length)
      throw new Error("Plugin generated track ids out of sync.");
    const r = n[t.numTracksCreatedByPlugin];
    return t.numTracksCreatedByPlugin += 1, r;
  }
  getNextTrackRank() {
    const t = this.nextTrackRank;
    return this.nextTrackRank += 1, t;
  }
  checkAccess(t) {
    if (!this.pluginContext)
      throw new Error(
        "Song needs to be accessed in a plugin context in order to use privileged methods."
      );
    if (!this.pluginContext.plugin.songAccess()[t])
      throw new Error(
        `Plugin ${this.pluginContext.plugin.constructor.id()} requires access ${t} in order to run.`
      );
  }
  static tempoBPMToTicksPerSecond(t, n) {
    return t * n / 60;
  }
  retimingTempoEvents() {
    this.tempos.sort((t, n) => t.getTicks() - n.getTicks());
    for (const t of this.tempos)
      t.setTimeInternal(this.tickToSeconds(t.getTicks()));
  }
}
function bt(e, t) {
  return Math.round(e * t);
}
var R = /* @__PURE__ */ ((e) => (e[e.Slider = 1] = "Slider", e[e.Input = 2] = "Input", e[e.TrackSelector = 3] = "TrackSelector", e[e.Pitch = 4] = "Pitch", e[e.TrackPitchSelector = 5] = "TrackPitchSelector", e[e.InstrumentSelector = 6] = "InstrumentSelector", e[e.Select = 7] = "Select", e[e.Switch = 8] = "Switch", e[e.InputNumber = 9] = "InputNumber", e[e.MultiTrackSelector = 10] = "MultiTrackSelector", e[e.None = 11] = "None", e[e.FileSelector = 12] = "FileSelector", e[e.MultiSourceAudioSelector = 13] = "MultiSourceAudioSelector", e[e.AudioRecorder = 14] = "AudioRecorder", e[e.SelectList = 15] = "SelectList", e[e.Descriptions = 16] = "Descriptions", e))(R || {});
async function Fh(e) {
  return e.arrayBuffer();
}
var kh = /* @__PURE__ */ ((e) => (e[e.SelectedTrackIds = 1] = "SelectedTrackIds", e[e.SelectedClipInfos = 2] = "SelectedClipInfos", e[e.TickAtPlayhead = 3] = "TickAtPlayhead", e[e.EditingClipInfo = 4] = "EditingClipInfo", e[e.EditingNoteIds = 5] = "EditingNoteIds", e[e.TickAtPlayheadSnappedToBeat = 6] = "TickAtPlayheadSnappedToBeat", e))(kh || {});
export {
  nn as AudioPlugin,
  wr as AutomationData,
  Y as AutomationTarget,
  zn as AutomationTargetType,
  Gt as AutomationValue,
  j as Clip,
  re as ClipType,
  Sf as DrumPitch,
  kh as InjectSource,
  gt as Note,
  rt as Song,
  bh as StructureMarker,
  wh as StructureType,
  _e as TempoEvent,
  Nh as TickToSecondStepper,
  yi as TimeSignatureEvent,
  Ht as Track,
  Dt as TrackType,
  Sh as TuneflowPipeline,
  Rs as TuneflowPlugin,
  R as WidgetType,
  wf as areTuneflowIdsEqual,
  bf as areTuneflowIdsEqualIgnoreVersion,
  kf as dbToVolumeValue,
  Ye as decodeAudioPluginTuneflowId,
  Ah as gainToDb,
  Mh as gainToVolumeValue,
  Ri as getAudioPluginTuneflowId,
  yf as getAudioPluginVersionlessTuneflowId,
  Fh as getFileContentFromFileSelector,
  Uh as maybeToRaw,
  _h as midiNumberToPitch,
  Rh as pitchToHz,
  xh as pitchToMidiNumber,
  Vh as remapRange,
  Eh as toVersionlessTfId,
  Ph as volumeValueToDb,
  Oh as volumeValueToGain
};
