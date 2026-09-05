/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, G = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), nt = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (G && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const kt = (s) => new gt(typeof s == "string" ? s : s + "", void 0, Q), xt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new gt(e, s, Q);
}, Et = (s, t) => {
  if (G) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = L.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, rt = G ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return kt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: St, defineProperty: Ct, getOwnPropertyDescriptor: Ot, getOwnPropertyNames: Pt, getOwnPropertySymbols: Ut, getPrototypeOf: Mt } = Object, g = globalThis, ot = g.trustedTypes, Ht = ot ? ot.emptyScript : "", I = g.reactiveElementPolyfillSupport, U = (s, t) => s, z = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Ht : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, X = (s, t) => !St(s, t), at = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Ct(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = Ot(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const a = n == null ? void 0 : n.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Mt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, i = [...Pt(e), ...Ut(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(rt(n));
    } else t !== void 0 && e.push(rt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Et(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : z).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : z;
      this._$Em = n;
      const d = c.fromAttribute(e, a.type);
      this[n] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? X)(r, e) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, o] of n) {
        const { wrapped: a } = o, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((n) => {
        var r;
        return (r = n.hostUpdate) == null ? void 0 : r.call(n);
      }), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[U("elementProperties")] = /* @__PURE__ */ new Map(), k[U("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: k }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ct = (s) => s, D = M.trustedTypes, lt = D ? D.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, mt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, vt = "?" + $, Nt = `<${vt}>`, A = document, H = () => A.createComment(""), N = (s) => s === null || typeof s != "object" && typeof s != "function", Y = Array.isArray, Tt = (s) => Y(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", K = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, dt = />/g, v = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, pt = /"/g, yt = /^(?:script|style|textarea|title)$/i, Rt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), u = Rt(1), E = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), y = A.createTreeWalker(A, 129);
function bt(s, t) {
  if (!Y(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const jt = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = O;
  for (let a = 0; a < e; a++) {
    const c = s[a];
    let d, p, h = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, p = o.exec(c), p !== null); ) f = o.lastIndex, o === O ? p[1] === "!--" ? o = ht : p[1] !== void 0 ? o = dt : p[2] !== void 0 ? (yt.test(p[2]) && (n = RegExp("</" + p[2], "g")), o = v) : p[3] !== void 0 && (o = v) : o === v ? p[0] === ">" ? (o = n ?? O, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? v : p[3] === '"' ? pt : ut) : o === pt || o === ut ? o = v : o === ht || o === dt ? o = O : (o = v, n = void 0);
    const _ = o === v && s[a + 1].startsWith("/>") ? " " : "";
    r += o === O ? c + Nt : h >= 0 ? (i.push(d), c.slice(0, h) + mt + c.slice(h) + $ + _) : c + $ + (h === -2 ? a : _);
  }
  return [bt(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, c = this.parts, [d, p] = jt(t, e);
    if (this.el = T.createElement(d, i), y.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = y.nextNode()) !== null && c.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(mt)) {
          const f = p[o++], _ = n.getAttribute(h).split($), j = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: r, name: j[2], strings: _, ctor: j[1] === "." ? zt : j[1] === "?" ? Dt : j[1] === "@" ? Bt : V }), n.removeAttribute(h);
        } else h.startsWith($) && (c.push({ type: 6, index: r }), n.removeAttribute(h));
        if (yt.test(n.tagName)) {
          const h = n.textContent.split($), f = h.length - 1;
          if (f > 0) {
            n.textContent = D ? D.emptyScript : "";
            for (let _ = 0; _ < f; _++) n.append(h[_], H()), y.nextNode(), c.push({ type: 2, index: ++r });
            n.append(h[f], H());
          }
        }
      } else if (n.nodeType === 8) if (n.data === vt) c.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = n.data.indexOf($, h + 1)) !== -1; ) c.push({ type: 7, index: r }), h += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(s, t, e = s, i) {
  var o, a;
  if (t === E) return t;
  let n = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = N(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== r && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = S(s, n._$AS(s, t.values), n, i)), t;
}
class Lt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    y.currentNode = n;
    let r = y.nextNode(), o = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let d;
        c.type === 2 ? d = new R(r, r.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (d = new Wt(r, this, t)), this._$AV.push(d), c = i[++a];
      }
      o !== (c == null ? void 0 : c.index) && (r = y.nextNode(), o++);
    }
    return y.currentNode = A, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), N(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Tt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== l && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = T.createElement(bt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === n) this._$AH.p(e);
    else {
      const o = new Lt(n, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t) n === e.length ? e.push(i = new R(this.O(H()), this.O(H()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const n = ct(t).nextSibling;
      ct(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = l;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = S(this, t, e, 0), o = !N(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const a = t;
      let c, d;
      for (t = r[0], c = 0; c < r.length - 1; c++) d = S(this, a[i + c], e, c), d === E && (d = this._$AH[c]), o || (o = !N(d) || d !== this._$AH[c]), d === l ? t = l : t !== l && (t += (d ?? "") + r[c + 1]), this._$AH[c] = d;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class Dt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class Bt extends V {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? l) === E) return;
    const i = this._$AH, n = t === l && i !== l || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== l && (i === l || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Wt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const F = M.litHtmlPolyfillSupport;
F == null || F(T, R), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.3");
const Vt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = n = new R(t.insertBefore(H(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis;
class x extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var $t;
x._$litElement$ = !0, x.finalized = !0, ($t = b.litElementHydrateSupport) == null || $t.call(b, { LitElement: x });
const Z = b.litElementPolyfillSupport;
Z == null || Z({ LitElement: x });
(b.litElementVersions ?? (b.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: X }, It = (s = qt, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, c, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(a) {
      const c = this[o];
      t.call(this, a), this.requestUpdate(o, c, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function tt(s) {
  return (t, e) => typeof e == "object" ? It(s, t, e) : ((i, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function et(s) {
  return tt({ ...s, state: !0, attribute: !1 });
}
function Kt(s, t) {
  return s === t || s.endsWith(`_${t}`) ? !0 : s.startsWith("carlinko_") && s.endsWith(`_${t}`);
}
function Ft(s, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [s, "binary_sensor"] : [s];
}
function Zt(s, t) {
  return !!(t && s.states[t]);
}
function Jt(s, t, e, i) {
  const n = s.entities;
  if (!n)
    return;
  const r = [];
  for (const a of Object.values(n)) {
    if (!(a != null && a.entity_id) || !a.unique_id || a.device_id !== t || a.disabled_by || a.hidden_by)
      continue;
    const c = a.entity_id.split(".", 1)[0];
    i.includes(c) && Kt(a.unique_id, e) && r.push(a.entity_id);
  }
  return r.length === 0 ? void 0 : r.find((a) => Zt(s, a)) ?? r[0];
}
function Gt(s, t, e) {
  var o, a;
  if (!s)
    return;
  const i = (o = t.entities) == null ? void 0 : o[e.slot];
  if (i)
    return i;
  if (e.slot === "image" && t.image_entity)
    return t.image_entity;
  const n = (a = t.device_id) == null ? void 0 : a.trim();
  if (!n)
    return;
  const r = [e.key, ...e.fallbackKeys ?? []];
  for (const c of r) {
    const d = Ft(e.domain, c), p = Jt(s, n, c, d);
    if (p)
      return p;
  }
}
function Qt(s, t, e) {
  const i = {};
  for (const n of e)
    i[n.slot] = Gt(s, t, n);
  return i;
}
const wt = [
  { slot: "image", key: "vehicle_front", domain: "image" },
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "range", key: "range", domain: "sensor" },
  { slot: "fuel", key: "fuel", domain: "sensor" },
  { slot: "fuel_range", key: "fuel_range", domain: "sensor" },
  { slot: "total_range", key: "total_range", domain: "sensor" },
  { slot: "hv_state", key: "hv_state", domain: "sensor" },
  { slot: "odometer", key: "odometer", domain: "sensor" },
  { slot: "consumption", key: "consumption", domain: "sensor" },
  { slot: "fuel_consumption", key: "fuel_consumption", domain: "sensor" },
  { slot: "speed", key: "speed", domain: "sensor" },
  { slot: "moving", key: "moving", domain: "binary_sensor" },
  { slot: "online", key: "online", domain: "binary_sensor" },
  { slot: "lock", key: "lock", domain: "lock" },
  { slot: "engine", key: "engine", domain: "switch" },
  {
    slot: "defog",
    key: "defrost_cmd",
    domain: "switch",
    fallbackKeys: ["defrost"]
  },
  { slot: "charge_stop", key: "charge_stop", domain: "button" },
  { slot: "trunk", key: "liftgate", domain: "cover" }
];
new Map(
  wt.map((s) => [s.slot, s])
);
function st(s, t) {
  if (!(!s || !t))
    return s.states[t];
}
function B(s, t) {
  var e;
  return (e = st(s, t)) == null ? void 0 : e.state;
}
function _t(s, t) {
  const e = B(s, t);
  if (e === void 0 || e === "unknown" || e === "unavailable")
    return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function P(s, t) {
  const e = B(s, t);
  return e === "on" || e === "open" || e === "unlocked";
}
function w(s, t, e = "—") {
  const i = st(s, t);
  if (!i || i.state === "unknown" || i.state === "unavailable")
    return e;
  const n = i.attributes.unit_of_measurement;
  return n ? `${i.state} ${n}` : String(i.state);
}
function J(s, t) {
  if (/^https?:\/\//i.test(t))
    return t;
  const e = ((s == null ? void 0 : s.hassUrl) || "").replace(/\/$/, "");
  return e ? t.startsWith("/") ? `${e}${t}` : `${e}/${t}` : t;
}
function Xt(s, t) {
  const e = st(s, t);
  if (!e)
    return;
  const i = e.attributes.entity_picture;
  if (typeof i == "string" && i)
    return J(s, i);
  const n = e.attributes.access_token;
  return typeof n == "string" && n ? J(
    s,
    `/api/image_proxy/${t}?token=${encodeURIComponent(n)}`
  ) : J(s, `/api/image_proxy/${t}`);
}
async function m(s, t, e, i, n = {}) {
  await s.callService(t, e, { ...n, entity_id: i });
}
async function Yt(s, t) {
  await m(s, "lock", "lock", t);
}
async function te(s, t) {
  await m(s, "lock", "unlock", t);
}
async function ee(s, t) {
  const e = t.split(".", 1)[0];
  await m(s, e, "turn_on", t);
}
async function se(s, t) {
  const e = t.split(".", 1)[0];
  await m(s, e, "turn_off", t);
}
async function ie(s, t) {
  const e = t.split(".", 1)[0];
  await m(s, e, "toggle", t);
}
async function ne(s, t) {
  await m(s, "cover", "open_cover", t);
}
async function re(s, t) {
  await m(s, "cover", "close_cover", t);
}
async function oe(s, t) {
  await m(s, "button", "press", t);
}
function ae(s, t) {
  s.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
var ce = Object.defineProperty, le = Object.getOwnPropertyDescriptor, q = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? le(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && ce(t, e, n), n;
};
let C = class extends x {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(s) {
    if (!s || typeof s.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...s };
  }
  getCardSize() {
    return 6;
  }
  static getConfigElement() {
    return document.createElement("carlinko-overview-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "CarLinko"
    };
  }
  _slots() {
    return this._config ? Qt(this.hass, this._config, wt) : {};
  }
  async _run(s) {
    if (!(this._busy || !this.hass)) {
      this._busy = !0;
      try {
        await s();
      } catch (t) {
        console.error("carlinko-overview action failed", t);
      } finally {
        this._busy = !1;
      }
    }
  }
  _metric(s, t, e) {
    var n;
    if (!t || !((n = this.hass) != null && n.states[t]))
      return l;
    let i = w(this.hass, t);
    if (e != null && e.numeric) {
      const r = _t(this.hass, t);
      if (r === void 0)
        return l;
      i = e.suffix ? `${r}${e.suffix}` : String(r);
    }
    return u`
      <button
        type="button"
        class="metric"
        @click=${() => ae(this, t)}
      >
        <span class="metric-label">${s}</span>
        <span class="metric-value">${i}</span>
      </button>
    `;
  }
  _batteryBar(s) {
    const t = _t(this.hass, s);
    if (t === void 0)
      return l;
    const e = Math.max(0, Math.min(100, t));
    return u`
      <div class="bar-wrap" title="Battery ${e}%">
        <div class="bar" style="width:${e}%"></div>
      </div>
    `;
  }
  render() {
    var c;
    if (!this._config)
      return u`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((c = this._config.device_id) != null && c.trim()))
      return u`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return u`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const s = this._slots(), t = P(this.hass, s.moving), e = Xt(this.hass, s.image), n = B(this.hass, s.lock) === "locked", r = P(this.hass, s.engine), o = P(this.hass, s.defog), a = B(this.hass, s.trunk) === "open";
    return u`
      <ha-card>
        ${this._config.title ? u`<div class="header">${this._config.title}</div>` : l}
        <div class="body">
          <div class="hero">
            ${e ? u`<img class="car-img" src=${e} alt="Vehicle" />` : u`<div class="car-placeholder">No image</div>`}
          </div>
          <div class="vitals">
            ${this._metric("Battery", s.battery, { numeric: !0, suffix: "%" })}
            ${s.battery ? this._batteryBar(s.battery) : l}
            ${this._metric("EV range", s.range)}
            ${this._metric("Fuel", s.fuel, { numeric: !0, suffix: "%" })}
            ${this._metric("Fuel range", s.fuel_range)}
            ${this._metric("Total range", s.total_range)}
            <div class="chips">
              ${s.hv_state && this.hass.states[s.hv_state] ? u`<span class="chip"
                    >HV ${w(this.hass, s.hv_state)}</span
                  >` : l}
              ${s.odometer && this.hass.states[s.odometer] ? u`<span class="chip"
                    >${w(this.hass, s.odometer)}</span
                  >` : l}
              ${s.consumption && this.hass.states[s.consumption] ? u`<span class="chip"
                    >${w(this.hass, s.consumption)}</span
                  >` : l}
              ${s.fuel_consumption && this.hass.states[s.fuel_consumption] ? u`<span class="chip"
                    >${w(this.hass, s.fuel_consumption)}</span
                  >` : l}
              ${s.online && this.hass.states[s.online] ? u`<span class="chip ${P(this.hass, s.online) ? "ok" : ""}"
                    >${P(this.hass, s.online) ? "Online" : "Offline"}</span
                  >` : l}
              ${t && s.speed && this.hass.states[s.speed] ? u`<span class="chip"
                    >${w(this.hass, s.speed)}</span
                  >` : l}
            </div>
          </div>
        </div>
        <div class="actions">
          ${s.lock ? u`
                <button
                  type="button"
                  class="action ${n ? "danger" : "ok"}"
                  ?disabled=${this._busy}
                  @click=${() => this._run(
      () => n ? te(this.hass, s.lock) : Yt(this.hass, s.lock)
    )}
                >
                  ${n ? "Unlock" : "Lock"}
                </button>
              ` : l}
          ${s.engine ? u`
                <button
                  type="button"
                  class="action ${r ? "ok" : ""}"
                  ?disabled=${this._busy}
                  @click=${() => this._run(
      () => r ? se(this.hass, s.engine) : ee(this.hass, s.engine)
    )}
                >
                  Engine ${r ? "Off" : "On"}
                </button>
              ` : l}
          ${s.defog ? u`
                <button
                  type="button"
                  class="action ${o ? "ok" : ""}"
                  ?disabled=${this._busy || s.defog.startsWith("binary_sensor.")}
                  @click=${() => this._run(() => ie(this.hass, s.defog))}
                >
                  Defog ${o ? "On" : "Off"}
                </button>
              ` : l}
          ${s.charge_stop ? u`
                <button
                  type="button"
                  class="action"
                  ?disabled=${this._busy}
                  @click=${() => this._run(() => oe(this.hass, s.charge_stop))}
                >
                  Stop charge
                </button>
              ` : l}
          ${s.trunk ? u`
                <button
                  type="button"
                  class="action ${a ? "ok" : ""}"
                  ?disabled=${this._busy}
                  @click=${() => this._run(
      () => a ? re(this.hass, s.trunk) : ne(this.hass, s.trunk)
    )}
                >
                  Trunk ${a ? "Close" : "Open"}
                </button>
              ` : l}
        </div>
      </ha-card>
    `;
  }
};
C.styles = xt`
    :host {
      display: block;
      --ck-accent: #0d9488;
      --ck-bg: var(--card-background-color, #fff);
      --ck-text: var(--primary-text-color, #1a1a1a);
      --ck-muted: var(--secondary-text-color, #667);
      --ck-border: var(--divider-color, #e2e8f0);
    }
    ha-card {
      background: var(--ck-bg);
      color: var(--ck-text);
      overflow: hidden;
    }
    .header {
      font-size: 1.1rem;
      font-weight: 600;
      padding: 12px 16px 0;
    }
    .pad {
      padding: 16px;
    }
    .body {
      display: grid;
      grid-template-columns: minmax(140px, 1fr) 1.2fr;
      gap: 16px;
      padding: 16px;
      align-items: start;
    }
    @media (max-width: 520px) {
      .body {
        grid-template-columns: 1fr;
      }
    }
    .hero {
      border-radius: 8px;
      overflow: hidden;
      background: linear-gradient(145deg, #e8eef2, #f7fafc);
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .car-img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      max-height: 180px;
    }
    .car-placeholder {
      color: var(--ck-muted);
      font-size: 0.9rem;
      padding: 24px;
    }
    .vitals {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .metric {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      border: none;
      background: transparent;
      color: inherit;
      padding: 4px 0;
      cursor: pointer;
      font: inherit;
      text-align: left;
    }
    .metric-label {
      color: var(--ck-muted);
      font-size: 0.85rem;
    }
    .metric-value {
      font-weight: 600;
    }
    .bar-wrap {
      height: 6px;
      background: var(--ck-border);
      border-radius: 999px;
      overflow: hidden;
      margin: 2px 0 8px;
    }
    .bar {
      height: 100%;
      background: var(--ck-accent);
      border-radius: 999px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .chip {
      font-size: 0.75rem;
      padding: 4px 8px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--ck-accent) 12%, transparent);
      border: 1px solid var(--ck-border);
    }
    .chip.ok {
      border-color: var(--ck-accent);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 16px 16px;
      border-top: 1px solid var(--ck-border);
      padding-top: 12px;
      margin-top: 0;
    }
    .action {
      border: 1px solid var(--ck-border);
      background: var(--ck-bg);
      color: var(--ck-text);
      border-radius: 8px;
      padding: 8px 12px;
      font: inherit;
      font-size: 0.85rem;
      cursor: pointer;
    }
    .action:hover:not(:disabled) {
      border-color: var(--ck-accent);
    }
    .action:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .action.ok {
      border-color: var(--ck-accent);
      color: var(--ck-accent);
    }
    .action.danger {
      border-color: #b91c1c;
      color: #b91c1c;
    }
  `;
q([
  tt({ attribute: !1 })
], C.prototype, "hass", 2);
q([
  et()
], C.prototype, "_config", 2);
q([
  et()
], C.prototype, "_busy", 2);
C = q([
  At("carlinko-overview")
], C);
var he = Object.defineProperty, de = Object.getOwnPropertyDescriptor, it = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? de(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && he(t, e, n), n;
};
let W = class extends x {
  setConfig(s) {
    this._config = { ...s };
  }
  _schema() {
    return [
      {
        name: "device_id",
        label: "Vehicle device",
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: "Title",
        selector: { text: {} }
      },
      {
        name: "image_entity",
        label: "Image override (optional)",
        selector: {
          entity: {
            domain: "image",
            filter: { integration: "carlinko" }
          }
        }
      }
    ];
  }
  _valueChanged(s) {
    var e;
    s.stopPropagation();
    const t = (e = s.detail) == null ? void 0 : e.value;
    t && (this._config = { ...t }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? l : u`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(s) => s.label || s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
it([
  tt({ attribute: !1 })
], W.prototype, "hass", 2);
it([
  et()
], W.prototype, "_config", 2);
W = it([
  At("carlinko-overview-editor")
], W);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "carlinko-overview",
  name: "CarLinko Overview",
  description: "Vehicle overview: image, ranges, vitals, and quick controls for ha-carlinko.",
  preview: !0
});
console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
