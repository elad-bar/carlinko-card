/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, Pt = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = Symbol(), zt = /* @__PURE__ */ new WeakMap();
let fe = class {
  constructor(t, s, o) {
    if (this._$cssResult$ = !0, o !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Pt && t === void 0) {
      const o = s !== void 0 && s.length === 1;
      o && (t = zt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && zt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Te = (e) => new fe(typeof e == "string" ? e : e + "", void 0, Tt), S = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((o, i, r) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[r + 1], e[0]);
  return new fe(s, e, Tt);
}, Me = (e, t) => {
  if (Pt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const o = document.createElement("style"), i = dt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = s.cssText, e.appendChild(o);
  }
}, It = Pt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const o of t.cssRules) s += o.cssText;
  return Te(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Le, defineProperty: Re, getOwnPropertyDescriptor: Ne, getOwnPropertyNames: Ue, getOwnPropertySymbols: De, getPrototypeOf: Be } = Object, L = globalThis, qt = L.trustedTypes, He = qt ? qt.emptyScript : "", bt = L.reactiveElementPolyfillSupport, Y = (e, t) => e, pt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? He : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, Mt = (e, t) => !Le(e, t), Wt = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: Mt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), L.litPropertyMetadata ?? (L.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let W = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Wt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, s);
      i !== void 0 && Re(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, o) {
    const { get: i, set: r } = Ne(this.prototype, t) ?? { get() {
      return this[s];
    }, set(n) {
      this[s] = n;
    } };
    return { get: i, set(n) {
      const l = i == null ? void 0 : i.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const t = Be(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const s = this.properties, o = [...Ue(s), ...De(s)];
      for (const i of o) this.createProperty(i, s[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [o, i] of s) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, o] of this.elementProperties) {
      const i = this._$Eu(s, o);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const i of o) s.unshift(It(i));
    } else t !== void 0 && s.push(It(t));
    return s;
  }
  static _$Eu(t, s) {
    const o = s.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((s) => s(this));
  }
  addController(t) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var s;
    (s = this._$EO) == null || s.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const o of s.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Me(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var o;
      return (o = s.hostConnected) == null ? void 0 : o.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var o;
      return (o = s.hostDisconnected) == null ? void 0 : o.call(s);
    });
  }
  attributeChangedCallback(t, s, o) {
    this._$AK(t, o);
  }
  _$ET(t, s) {
    var r;
    const o = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, o);
    if (i !== void 0 && o.reflect === !0) {
      const n = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : pt).toAttribute(s, o.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var r, n;
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = o.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : pt;
      this._$Em = i;
      const u = a.fromAttribute(s, l.type);
      this[i] = u ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, s, o, i = !1, r) {
    var n;
    if (t !== void 0) {
      const l = this.constructor;
      if (i === !1 && (r = this[t]), o ?? (o = l.getPropertyOptions(t)), !((o.hasChanged ?? Mt)(r, s) || o.useDefault && o.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(l._$Eu(t, o)))) return;
      this.C(t, s, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: o, reflect: i, wrapped: r }, n) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? s ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (s = void 0), this._$AL.set(t, s)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: l } = n, a = this[r];
        l !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, n, a);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (o = this._$EO) == null || o.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
      }), this.update(s)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((o) => {
      var i;
      return (i = o.hostUpdated) == null ? void 0 : i.call(o);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[Y("elementProperties")] = /* @__PURE__ */ new Map(), W[Y("finalized")] = /* @__PURE__ */ new Map(), bt == null || bt({ ReactiveElement: W }), (L.reactiveElementVersions ?? (L.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, Vt = (e) => e, ft = Q.trustedTypes, Kt = ft ? ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ge = "$lit$", M = `lit$${Math.random().toFixed(9).slice(2)}$`, me = "?" + M, je = `<${me}>`, j = document, X = () => j.createComment(""), tt = (e) => e === null || typeof e != "object" && typeof e != "function", Lt = Array.isArray, ze = (e) => Lt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", yt = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Zt = />/g, N = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Jt = /'/g, Gt = /"/g, _e = /^(?:script|style|textarea|title)$/i, Ie = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), h = Ie(1), z = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), B = j.createTreeWalker(j, 129);
function ve(e, t) {
  if (!Lt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Kt !== void 0 ? Kt.createHTML(t) : t;
}
const qe = (e, t) => {
  const s = e.length - 1, o = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = G;
  for (let l = 0; l < s; l++) {
    const a = e[l];
    let u, f, d = -1, m = 0;
    for (; m < a.length && (n.lastIndex = m, f = n.exec(a), f !== null); ) m = n.lastIndex, n === G ? f[1] === "!--" ? n = Ft : f[1] !== void 0 ? n = Zt : f[2] !== void 0 ? (_e.test(f[2]) && (i = RegExp("</" + f[2], "g")), n = N) : f[3] !== void 0 && (n = N) : n === N ? f[0] === ">" ? (n = i ?? G, d = -1) : f[1] === void 0 ? d = -2 : (d = n.lastIndex - f[2].length, u = f[1], n = f[3] === void 0 ? N : f[3] === '"' ? Gt : Jt) : n === Gt || n === Jt ? n = N : n === Ft || n === Zt ? n = G : (n = N, i = void 0);
    const g = n === N && e[l + 1].startsWith("/>") ? " " : "";
    r += n === G ? a + je : d >= 0 ? (o.push(u), a.slice(0, d) + ge + a.slice(d) + M + g) : a + M + (d === -2 ? l : g);
  }
  return [ve(e, r + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class et {
  constructor({ strings: t, _$litType$: s }, o) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [u, f] = qe(t, s);
    if (this.el = et.createElement(u, o), B.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = B.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(ge)) {
          const m = f[n++], g = i.getAttribute(d).split(M), v = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: r, name: v[2], strings: g, ctor: v[1] === "." ? Ve : v[1] === "?" ? Ke : v[1] === "@" ? Fe : mt }), i.removeAttribute(d);
        } else d.startsWith(M) && (a.push({ type: 6, index: r }), i.removeAttribute(d));
        if (_e.test(i.tagName)) {
          const d = i.textContent.split(M), m = d.length - 1;
          if (m > 0) {
            i.textContent = ft ? ft.emptyScript : "";
            for (let g = 0; g < m; g++) i.append(d[g], X()), B.nextNode(), a.push({ type: 2, index: ++r });
            i.append(d[m], X());
          }
        }
      } else if (i.nodeType === 8) if (i.data === me) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(M, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += M.length - 1;
      }
      r++;
    }
  }
  static createElement(t, s) {
    const o = j.createElement("template");
    return o.innerHTML = t, o;
  }
}
function V(e, t, s = e, o) {
  var n, l;
  if (t === z) return t;
  let i = o !== void 0 ? (n = s._$Co) == null ? void 0 : n[o] : s._$Cl;
  const r = tt(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), r === void 0 ? i = void 0 : (i = new r(e), i._$AT(e, s, o)), o !== void 0 ? (s._$Co ?? (s._$Co = []))[o] = i : s._$Cl = i), i !== void 0 && (t = V(e, i._$AS(e, t.values), i, o)), t;
}
class We {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: o } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? j).importNode(s, !0);
    B.currentNode = i;
    let r = B.nextNode(), n = 0, l = 0, a = o[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let u;
        a.type === 2 ? u = new rt(r, r.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (u = new Ze(r, this, t)), this._$AV.push(u), a = o[++l];
      }
      n !== (a == null ? void 0 : a.index) && (r = B.nextNode(), n++);
    }
    return B.currentNode = j, i;
  }
  p(t) {
    let s = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, s), s += o.strings.length - 2) : o._$AI(t[s])), s++;
  }
}
class rt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, o, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = V(this, t, s), tt(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ze(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(j.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: s, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = et.createElement(ve(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(s);
    else {
      const n = new We(i, this), l = n.u(this.options);
      n.p(s), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = Yt.get(t.strings);
    return s === void 0 && Yt.set(t.strings, s = new et(t)), s;
  }
  k(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let o, i = 0;
    for (const r of t) i === s.length ? s.push(o = new rt(this.O(X()), this.O(X()), this, this.options)) : o = s[i], o._$AI(r), i++;
    i < s.length && (this._$AR(o && o._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, s); t !== this._$AB; ) {
      const i = Vt(t).nextSibling;
      Vt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, o, i, r) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = c;
  }
  _$AI(t, s = this, o, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = V(this, t, s, 0), n = !tt(t) || t !== this._$AH && t !== z, n && (this._$AH = t);
    else {
      const l = t;
      let a, u;
      for (t = r[0], a = 0; a < r.length - 1; a++) u = V(this, l[o + a], s, a), u === z && (u = this._$AH[a]), n || (n = !tt(u) || u !== this._$AH[a]), u === c ? t = c : t !== c && (t += (u ?? "") + r[a + 1]), this._$AH[a] = u;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ve extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Ke extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Fe extends mt {
  constructor(t, s, o, i, r) {
    super(t, s, o, i, r), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = V(this, t, s, 0) ?? c) === z) return;
    const o = this._$AH, i = t === c && o !== c || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, r = t !== c && (o === c || i);
    i && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ze {
  constructor(t, s, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const kt = Q.litHtmlPolyfillSupport;
kt == null || kt(et, rt), (Q.litHtmlVersions ?? (Q.litHtmlVersions = [])).push("3.3.3");
const Je = (e, t, s) => {
  const o = (s == null ? void 0 : s.renderBefore) ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const r = (s == null ? void 0 : s.renderBefore) ?? null;
    o._$litPart$ = i = new rt(t.insertBefore(X(), r), r, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis;
let O = class extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const t = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = t.firstChild), t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Je(s, this.renderRoot, this.renderOptions);
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
    return z;
  }
};
var pe;
O._$litElement$ = !0, O.finalized = !0, (pe = H.litElementHydrateSupport) == null || pe.call(H, { LitElement: O });
const wt = H.litElementPolyfillSupport;
wt == null || wt({ LitElement: O });
(H.litElementVersions ?? (H.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Mt }, Ye = (e = Ge, t, s) => {
  const { kind: o, metadata: i } = s;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), o === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(s.name, e), o === "accessor") {
    const { name: n } = s;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, e, l), l;
    } };
  }
  if (o === "setter") {
    const { name: n } = s;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function q(e) {
  return (t, s) => typeof s == "object" ? Ye(e, t, s) : ((o, i, r) => {
    const n = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, o), n ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(e) {
  return q({ ...e, state: !0, attribute: !1 });
}
const Qe = {
  chrome: {
    not_configured: "Not configured",
    select_device: "Select a CarLinko vehicle device",
    waiting_hass: "Waiting for Home Assistant…"
  },
  editor: {
    device: "Vehicle device",
    title: "Title",
    image_override: "Image override (optional)",
    top_image_override: "Top image override (optional)"
  },
  status: {
    offline: "Offline",
    tyres_ok: "Tyres OK",
    not_charging: "Not charging",
    plugged: "Plugged",
    soc: "SoC",
    power: "Power",
    time: "Time",
    mode: "Mode",
    hv_prefix: "HV",
    heat: "Heat",
    vent: "Vent",
    door_open: "Open",
    door_closed: "Closed",
    door_unknown: "Unknown"
  },
  climate: {
    on: "Climate on",
    off: "Climate off",
    increase_temp: "Increase temperature",
    decrease_temp: "Decrease temperature",
    setpoint: "Setpoint",
    current: "Current"
  },
  action: {
    engine_on: "Turn engine on",
    engine_off: "Turn engine off",
    unlock_doors: "Unlock doors",
    lock_doors: "Lock doors",
    defog_on: "Turn defog on",
    defog_off: "Turn defog off",
    open_trunk: "Open trunk",
    close_trunk: "Close trunk",
    open_windows: "Open windows",
    close_windows: "Close windows",
    vent_windows: "Vent windows",
    open_sunroof: "Open sunroof",
    close_sunroof: "Close sunroof",
    tilt_sunroof: "Tilt sunroof"
  },
  stub: {
    overview: "CarLinko",
    charging: "Charging",
    cabin: "Cabin"
  }
}, Xe = {
  sensor: {
    battery: "Battery",
    range: "Range",
    odometer: "Odometer",
    speed: "Speed",
    charge_power: "Charge Power",
    consumption: "Consumption",
    charge_remaining: "Charge remaining",
    charge_mode: "Charge mode",
    charge_state: "Charge state",
    hv_state: "HV state",
    tyre_status: "Tyre status",
    fuel: "Fuel",
    fuel_range: "Fuel range",
    total_range: "Total range",
    fuel_consumption: "Fuel consumption"
  },
  binary_sensor: {
    charging: "Charging",
    online: "Online",
    tyres_ok: "Tyre problem",
    door_driver: "Driver door",
    door_passenger: "Passenger door",
    door_rear_left: "Rear left door",
    door_rear_right: "Rear right door"
  },
  button: {
    charge_stop: "Stop charging",
    windows_vent: "Windows vent",
    sunroof_tilt: "Sunroof tilt",
    quick_cool: "Quick cool",
    quick_heat: "Quick heat",
    find: "Find car"
  },
  switch: {
    engine: "Engine",
    defrost_cmd: "Defog"
  },
  lock: {
    lock: "Lock"
  },
  climate: {
    climate: "Climate"
  },
  cover: {
    windows: "Windows",
    sunroof: "Sunroof",
    liftgate: "Liftgate"
  }
}, T = {
  off: "Off",
  l1: "Low",
  l2: "Medium",
  l3: "High"
}, ts = {
  sensor: {
    hv_state: {
      off: "Off",
      lv: "LV",
      ready: "Ready",
      unknown: "Unknown"
    },
    tyre_status: {
      normal: "Normal",
      check_tyres: "Check tyres"
    },
    charge_state: {
      idle: "Idle",
      charging: "Charging",
      complete: "Complete",
      canceled: "Canceled",
      hot: "Hot",
      stop: "Stop"
    },
    charge_mode: {
      none: "None",
      ac: "AC",
      dc: "DC"
    }
  },
  select: {
    seat_heat_l: T,
    seat_heat_r: T,
    seat_heat_lr: T,
    seat_heat_rr: T,
    seat_vent_l: T,
    seat_vent_r: T,
    seat_vent_lr: T,
    seat_vent_rr: T
  }
}, Rt = "carlinko";
let Qt = !1, ht;
function es(e) {
  const [t, s] = e.split(".", 2), o = Qe[t];
  return (o == null ? void 0 : o[s]) ?? e;
}
function be(e, t) {
  var o;
  const s = (o = e == null ? void 0 : e.localize) == null ? void 0 : o.call(e, t);
  if (!(typeof s != "string" || !s.trim()) && !(s === t || s.startsWith("component.carlinko.")))
    return s;
}
function p(e, t) {
  return es(t);
}
function w(e, t, s) {
  var r;
  const o = `component.${Rt}.entity.${t}.${s}.name`, i = be(e, o);
  return i || (((r = Xe[t]) == null ? void 0 : r[s]) ?? s);
}
function D(e, t, s, o) {
  var l, a;
  if (!o)
    return "—";
  const i = o.toLowerCase(), r = `component.${Rt}.entity.${t}.${s}.state.${i}`, n = be(e, r);
  return n || (((a = (l = ts[t]) == null ? void 0 : l[s]) == null ? void 0 : a[i]) ?? o);
}
function ss(e, t) {
  const s = p(e, "status.hv_prefix"), o = D(
    e,
    "sensor",
    "hv_state",
    t || "unknown"
  );
  return `${s} ${o}`;
}
async function Nt(e) {
  return !(e != null && e.loadBackendTranslation) || Qt ? !1 : (ht || (ht = e.loadBackendTranslation("entity", Rt).then(() => (Qt = !0, !0)).catch((t) => (console.warn("carlinko-card: failed to load entity translations", t), ht = void 0, !1))), ht);
}
const Xt = "carlinko";
function os(e, t) {
  if (e.translation_key === t)
    return !0;
  const s = e.unique_id;
  if (s && (s === t || s.endsWith(`_${t}`) || s.startsWith("carlinko_") && s.endsWith(`_${t}`)))
    return !0;
  const o = e.entity_id.split(".", 2)[1] ?? "";
  return o === t || o.endsWith(`_${t}`);
}
function is(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function rs(e, t) {
  return !!(t && e.states[t]);
}
function ns(e) {
  return !!(e.disabled_by || e.hidden_by || e.hidden);
}
function as(e, t, s, o) {
  const i = e.entities;
  if (!i)
    return;
  const r = [];
  for (const a of Object.values(i)) {
    if (!(a != null && a.entity_id) || a.device_id !== t || ns(a))
      continue;
    const u = a.entity_id.split(".", 1)[0];
    o.includes(u) && os(a, s) && r.push(a);
  }
  if (r.length === 0)
    return;
  const n = [...r].sort((a, u) => {
    const f = a.platform === Xt ? 0 : 1, d = u.platform === Xt ? 0 : 1;
    return f - d;
  });
  return (n.find((a) => rs(e, a.entity_id)) ?? n[0]).entity_id;
}
function cs(e, t, s) {
  var n, l;
  if (!e)
    return;
  const o = (n = t.entities) == null ? void 0 : n[s.slot];
  if (o)
    return o;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const i = (l = t.device_id) == null ? void 0 : l.trim();
  if (!i)
    return;
  const r = [s.key, ...s.fallbackKeys ?? []];
  for (const a of r) {
    const u = is(s.domain, a), f = as(e, i, a, u);
    if (f)
      return f;
  }
}
function ls(e, t, s) {
  const o = {};
  for (const i of s)
    o[i.slot] = cs(e, t, i);
  return o;
}
function Ut(e, t, s) {
  if (e === t)
    return !1;
  if (!e || !t)
    return !0;
  for (const o of s)
    if (o && e.states[o] !== t.states[o])
      return !0;
  return !1;
}
class Dt {
  invalidate() {
    this._map = void 0, this._deviceId = void 0, this._imageEntity = void 0, this._entitiesJson = void 0, this._entitiesRef = void 0;
  }
  /** Last resolved map, if any (for shouldUpdate without re-resolve). */
  peek() {
    return this._map;
  }
  get(t, s, o) {
    const i = s.device_id ?? "", r = s.image_entity ?? "", n = JSON.stringify(s.entities ?? null), l = t == null ? void 0 : t.entities;
    return this._map && this._deviceId === i && this._imageEntity === r && this._entitiesJson === n && this._entitiesRef === l ? this._map : (this._map = ls(t, s, o), this._deviceId = i, this._imageEntity = r, this._entitiesJson = n, this._entitiesRef = l, this._map);
  }
}
const hs = [
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
  { slot: "online", key: "online", domain: "binary_sensor" },
  { slot: "tyres_ok", key: "tyres_ok", domain: "binary_sensor" },
  { slot: "tyre_status", key: "tyre_status", domain: "sensor" },
  { slot: "engine", key: "engine", domain: "switch" }
], ds = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], us = [
  { slot: "image", key: "vehicle_top", domain: "image" },
  { slot: "climate", key: "climate", domain: "climate" },
  { slot: "quick_cool", key: "quick_cool", domain: "button" },
  { slot: "quick_heat", key: "quick_heat", domain: "button" },
  {
    slot: "seat_heat_l",
    key: "seat_heat_l",
    domain: "select",
    fallbackKeys: ["seat_heat_left"]
  },
  {
    slot: "seat_vent_l",
    key: "seat_vent_l",
    domain: "select",
    fallbackKeys: ["seat_vent_left"]
  },
  {
    slot: "seat_heat_r",
    key: "seat_heat_r",
    domain: "select",
    fallbackKeys: ["seat_heat_right"]
  },
  {
    slot: "seat_vent_r",
    key: "seat_vent_r",
    domain: "select",
    fallbackKeys: ["seat_vent_right"]
  },
  { slot: "seat_heat_lr", key: "seat_heat_lr", domain: "select" },
  { slot: "seat_vent_lr", key: "seat_vent_lr", domain: "select" },
  { slot: "seat_heat_rr", key: "seat_heat_rr", domain: "select" },
  { slot: "seat_vent_rr", key: "seat_vent_rr", domain: "select" },
  { slot: "tyres_ok", key: "tyres_ok", domain: "binary_sensor" },
  { slot: "tyre_status", key: "tyre_status", domain: "sensor" },
  { slot: "tyre_fl", key: "tyre_fl", domain: "sensor" },
  { slot: "tyre_fl_temp", key: "tyre_fl_temp", domain: "sensor" },
  { slot: "tyre_fr", key: "tyre_fr", domain: "sensor" },
  { slot: "tyre_fr_temp", key: "tyre_fr_temp", domain: "sensor" },
  { slot: "tyre_rl", key: "tyre_rl", domain: "sensor" },
  { slot: "tyre_rl_temp", key: "tyre_rl_temp", domain: "sensor" },
  { slot: "tyre_rr", key: "tyre_rr", domain: "sensor" },
  { slot: "tyre_rr_temp", key: "tyre_rr_temp", domain: "sensor" },
  { slot: "door_fl", key: "door_driver", domain: "binary_sensor" },
  { slot: "door_fr", key: "door_passenger", domain: "binary_sensor" },
  { slot: "door_rl", key: "door_rear_left", domain: "binary_sensor" },
  { slot: "door_rr", key: "door_rear_right", domain: "binary_sensor" },
  { slot: "windows", key: "windows", domain: "cover" },
  { slot: "windows_vent", key: "windows_vent", domain: "button" },
  { slot: "sunroof", key: "sunroof", domain: "cover" },
  { slot: "sunroof_tilt", key: "sunroof_tilt", domain: "button" },
  { slot: "lock", key: "lock", domain: "lock" },
  { slot: "engine", key: "engine", domain: "switch" },
  { slot: "find", key: "find", domain: "button" },
  {
    slot: "defog",
    key: "defrost_cmd",
    domain: "switch",
    fallbackKeys: ["defrost"]
  },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" },
  { slot: "trunk", key: "liftgate", domain: "cover" }
];
function Z(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function $(e, t) {
  var s;
  return (s = Z(e, t)) == null ? void 0 : s.state;
}
function gt(e, t) {
  const s = $(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const o = Number(s);
  return Number.isFinite(o) ? o : void 0;
}
function st(e, t) {
  const s = $(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function ye(e, t) {
  const s = $(e, t);
  return s === "ac" || s === "dc";
}
function ps(e, t) {
  const s = Z(e, t);
  if (!s)
    return !1;
  const o = s.state === "on";
  return s.attributes.device_class === "problem" ? o : !o;
}
function ke(e, t, s) {
  return ps(e, t) ? "danger" : $(e, s) === "check_tyres" ? "warn" : "ok";
}
function A(e, t, s = "—") {
  const o = Z(e, t);
  if (!o || o.state === "unknown" || o.state === "unavailable")
    return s;
  const i = o.attributes.unit_of_measurement;
  return i ? `${o.state} ${i}` : String(o.state);
}
function fs(e, t, s = "—") {
  const o = gt(e, t);
  if (o === void 0 || o < 0)
    return s;
  const i = Math.round(o), r = Math.floor(i / 60), n = i % 60;
  return r <= 0 ? `${n}m` : n <= 0 ? `${r}h` : `${r}h ${n}m`;
}
function $t(e, t) {
  if (/^https?:\/\//i.test(t))
    return t;
  try {
    const s = e == null ? void 0 : e.hassUrl;
    if (typeof s == "function")
      return s(t);
    if (typeof s == "string" && s) {
      const o = s.replace(/\/$/, "");
      return t.startsWith("/") ? `${o}${t}` : `${o}/${t}`;
    }
  } catch (s) {
    console.warn("carlinko-card: withHassBase failed", s);
  }
  return t;
}
function we(e, t) {
  const s = Z(e, t);
  if (!s)
    return;
  const o = s.attributes.entity_picture;
  if (typeof o == "string" && o)
    return $t(e, o);
  const i = s.attributes.access_token;
  return typeof i == "string" && i ? $t(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(i)}`
  ) : $t(e, `/api/image_proxy/${t}`);
}
async function E(e, t, s, o, i = {}) {
  await e.callService(t, s, { ...i, entity_id: o });
}
async function gs(e, t) {
  await E(e, "lock", "lock", t);
}
async function ms(e, t) {
  await E(e, "lock", "unlock", t);
}
async function te(e, t) {
  const s = t.split(".", 1)[0];
  await E(e, s, "turn_on", t);
}
async function xt(e, t) {
  const s = t.split(".", 1)[0];
  await E(e, s, "turn_off", t);
}
async function _s(e, t) {
  const s = t.split(".", 1)[0];
  await E(e, s, "toggle", t);
}
async function Ct(e, t) {
  await E(e, "cover", "open_cover", t);
}
async function St(e, t) {
  await E(e, "cover", "close_cover", t);
}
function ee(e, t) {
  const s = $(e, t);
  return s === "open" || s === "opening";
}
async function U(e, t) {
  await E(e, "button", "press", t);
}
function nt(e, t, s) {
  const o = Z(e, t);
  if (!o)
    return;
  const i = o.attributes[s];
  if (i == null)
    return;
  const r = Number(i);
  return Number.isFinite(r) ? r : void 0;
}
function se(e, t) {
  return nt(e, t, "temperature");
}
function vs(e, t) {
  return nt(e, t, "current_temperature");
}
function bs(e, t) {
  return nt(e, t, "target_temp_step") ?? 1;
}
function ys(e, t) {
  return nt(e, t, "min_temp") ?? 16;
}
function ks(e, t) {
  return nt(e, t, "max_temp") ?? 30;
}
function oe(e, t) {
  const s = $(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function ws(e, t, s) {
  await E(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function $s(e, t, s) {
  await E(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function ie(e, t, s) {
  await E(e, "select", "select_option", t, {
    option: s
  });
}
function re(e, t) {
  const s = Z(e, t), o = s == null ? void 0 : s.attributes.options;
  return Array.isArray(o) ? o.map(String) : [];
}
function k(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
const Bt = S`
  :host {
    display: block;
    container-type: inline-size;
    container-name: ck-card;
    --ck-accent: var(--primary-color, #0d9488);
    --ck-ok: var(--success-color, #16a34a);
    --ck-warn: var(--warning-color, #d97706);
    --ck-info: var(--info-color, #2563eb);
    --ck-danger: var(--error-color, #b91c1c);
    --ck-bg: var(--card-background-color, #fff);
    --ck-text: var(--primary-text-color, #1a1a1a);
    --ck-muted: var(--secondary-text-color, #667);
    --ck-border: var(--divider-color, #e2e8f0);
    --ck-track: var(--divider-color, #e2e8f0);
    --ck-surface-muted: color-mix(
      in srgb,
      var(--ck-accent) 8%,
      var(--ck-bg)
    );
    --ck-seat-heat: #d64545;
    --ck-seat-vent: #3b82c4;
    --ck-tyre-ok: var(--ck-ok);
    --ck-tyre-warn: var(--ck-warn);
    --ck-tyre-danger: var(--ck-danger);
    --ck-on-accent: #fff;
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
  .body-pad {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px 16px;
    border-top: 1px solid var(--ck-border);
  }
`, $e = S`
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
    width: 100%;
  }
  .metric-label {
    color: var(--ck-muted);
    font-size: 0.85rem;
  }
  .metric-value {
    font-weight: 600;
  }
`, xe = S`
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
  .action.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    padding: 0;
  }
  .action.icon ha-icon {
    --mdc-icon-size: 1.25rem;
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }
  .action:hover:not(:disabled) {
    background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
    border-color: currentColor;
  }
  .action:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .action.ok {
    border-color: var(--ck-ok);
    color: var(--ck-ok);
  }
  .action.danger {
    border-color: var(--ck-danger);
    color: var(--ck-danger);
  }
  .action.cool {
    border-color: var(--ck-seat-vent);
    color: var(--ck-seat-vent);
  }
  .action.heat {
    border-color: var(--ck-seat-heat);
    color: var(--ck-seat-heat);
  }
`, xs = S`
  .hotspot {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--ck-border);
    background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
    color: var(--ck-muted);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    box-shadow: 0 0 0 0 transparent;
    backdrop-filter: blur(2px);
  }
  .hotspot ha-icon {
    --mdc-icon-size: 22px;
    width: 22px;
    height: 22px;
    display: block;
  }
  .hotspot:hover:not(:disabled) {
    border-color: currentColor;
    background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
  }
  .hotspot:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .hotspot.tone-muted {
    color: var(--ck-muted);
    border-color: var(--ck-border);
  }
  .hotspot.tone-ok {
    color: var(--ck-ok);
    border-color: var(--ck-ok);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-ok) 45%, transparent);
  }
  .hotspot.tone-danger {
    color: var(--ck-danger);
    border-color: var(--ck-danger);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-danger) 45%, transparent);
  }
  .hotspot.tone-warn {
    color: var(--ck-warn);
    border-color: var(--ck-warn);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-warn) 45%, transparent);
  }
  .hotspot.tone-info {
    color: var(--ck-info);
    border-color: var(--ck-info);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-info) 45%, transparent);
  }
  @container ck-card (max-width: 360px) {
    .hotspot {
      width: 36px;
      height: 36px;
      min-width: 36px;
      min-height: 36px;
    }
    .hotspot ha-icon {
      --mdc-icon-size: 18px;
      width: 18px;
      height: 18px;
    }
  }
`, Cs = S`
  .hlevel {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1 1 140px;
  }
  .hlevel-primary {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ck-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.2;
  }
  .hlevel-percent {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    border: none;
    background: transparent;
    color: inherit;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }
  .hlevel-pct {
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1.15;
  }
  .hlevel.tone-ok .hlevel-pct {
    color: var(--ck-ok);
  }
  .hlevel.tone-info .hlevel-pct {
    color: var(--ck-info);
  }
  .hlevel-bar-wrap {
    height: 8px;
    margin: 4px 0 2px;
    border-radius: 999px;
    background: var(--ck-track);
    overflow: hidden;
  }
  .hlevel-bar {
    height: 100%;
    border-radius: 999px;
    background: var(--ck-ok);
    transition: width 0.2s ease;
  }
  .hlevel.tone-info .hlevel-bar {
    background: var(--ck-info);
  }
  .hlevel-details {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 12px;
  }
  .hlevel-secondary,
  .hlevel-meta {
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    font: inherit;
    text-align: left;
  }
  button.hlevel-secondary,
  button.hlevel-meta {
    cursor: pointer;
  }
  .hlevel-secondary {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ck-text);
  }
  .hlevel-meta {
    font-size: 0.75rem;
    color: var(--ck-muted);
  }
`, Ss = S`
  .soc-ring {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 112px;
    height: 112px;
    flex-shrink: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
  }
  button.soc-ring {
    cursor: pointer;
  }
  button.soc-ring:hover .soc-ring-meter {
    filter: brightness(0.95);
  }
  .soc-ring-meter {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from -90deg,
      var(--ck-ok) 0% var(--ck-soc-pct, 0%),
      var(--ck-track) var(--ck-soc-pct, 0%) 100%
    );
    /* Donut hole — keep green arc visible as a thick ring */
    -webkit-mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 12px),
      #000 calc(100% - 12px)
    );
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 12px),
      #000 calc(100% - 12px)
    );
  }
  .soc-ring-meter.empty {
    background: conic-gradient(from -90deg, var(--ck-track) 0% 100%);
  }
  .soc-ring-center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    pointer-events: none;
  }
  .soc-ring-pct {
    font-size: 1.45rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--ck-ok);
  }
  .soc-ring-pct.muted {
    color: var(--ck-muted);
  }
  .soc-ring-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--ck-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  @container ck-card (max-width: 360px) {
    .soc-ring {
      width: 96px;
      height: 96px;
    }
    .soc-ring-pct {
      font-size: 1.25rem;
    }
  }
`, As = S`
  .charge-power {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2.5px solid currentColor;
    color: var(--ck-muted);
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }
  .charge-power.is-charging {
    color: var(--ck-ok);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-ok) 40%, transparent);
  }
  .charge-power-bolt {
    display: inline-flex;
    width: 22px;
    height: 22px;
  }
  .charge-power-bolt ha-icon {
    --mdc-icon-size: 22px;
    width: 22px;
    height: 22px;
    display: block;
  }
`, Es = S`
  .charge-hero {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 16px;
  }
  .charge-hero-link {
    width: 16px;
    height: 2px;
    background: var(--ck-track);
    flex-shrink: 0;
  }
  .charge-hero-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    flex: 1 1 120px;
  }
  .charge-meta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 6px;
    border: none;
    background: transparent;
    color: inherit;
    padding: 0;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .charge-meta-row:disabled {
    cursor: default;
  }
  .charge-meta-label {
    color: var(--ck-muted);
    font-size: 0.85rem;
  }
  .charge-meta-value {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .charge-meta-value.ok {
    color: var(--ck-ok);
  }
  .charge-meta-value.muted {
    color: var(--ck-muted);
    font-weight: 500;
  }
  .charge-secondary {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid var(--ck-border);
  }
  .actions .action.with-icon {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .actions .action.with-icon ha-icon {
    --mdc-icon-size: 14px;
    width: 14px;
    height: 14px;
    display: block;
    flex-shrink: 0;
  }
`;
function ne(e, t, s, o, i) {
  if (!t || !o || !t.states[o])
    return c;
  let r = A(t, o);
  return h`
    <button
      type="button"
      class="metric"
      @click=${() => k(e, o)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${r}</span>
    </button>
  `;
}
function y(e) {
  const t = e.variant || "", s = !!(e.icon && e.showLabel), o = !!(e.icon && !e.showLabel), i = [
    "action",
    t,
    o ? "icon" : "",
    s ? "with-icon" : ""
  ].filter(Boolean).join(" ");
  return h`
    <button
      type="button"
      class=${i}
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${e.icon ?? c}${s || !e.icon ? e.label : c}
    </button>
  `;
}
function _(e) {
  return h`<ha-icon .icon=${e}></ha-icon>`;
}
const Os = {
  signal: "mdi:car-wireless",
  hv: "mdi:car-electric",
  tyre: "mdi:tire"
};
function At(e) {
  const t = e.tone ?? "muted";
  return h`
    <button
      type="button"
      class="hotspot tone-${t}"
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${_(Os[e.icon])}
    </button>
  `;
}
function ae(e) {
  const {
    percent: t,
    primary: s,
    secondary: o,
    meta: i,
    onPercentClick: r,
    onSecondaryClick: n,
    onMetaClick: l
  } = e;
  if (t === void 0 && !s && !o && !i)
    return c;
  const a = e.tone ?? "ok", u = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), f = u !== void 0 ? `${Math.round(u)}%` : void 0, d = h`
    <div
      class="hlevel-bar-wrap"
      aria-hidden=${u === void 0 ? "true" : "false"}
    >
      ${u !== void 0 ? h`<div class="hlevel-bar" style="width:${u}%"></div>` : c}
    </div>
  `, m = r && (f !== void 0 || u !== void 0) ? h`<button
          type="button"
          class="hlevel-percent"
          aria-label=${f ?? s ?? "level"}
          @click=${r}
        >
          ${f !== void 0 ? h`<div class="hlevel-pct">${f}</div>` : c}
          ${d}
        </button>` : h`
          ${f !== void 0 ? h`<div class="hlevel-pct">${f}</div>` : c}
          ${d}
        `, g = o ? n ? h`<button
          type="button"
          class="hlevel-secondary"
          @click=${n}
        >
          ${o}
        </button>` : h`<span class="hlevel-secondary">${o}</span>` : c, v = i ? l ? h`<button type="button" class="hlevel-meta" @click=${l}>
          ${i}
        </button>` : h`<span class="hlevel-meta">${i}</span>` : c;
  return h`
    <div class="hlevel tone-${a}">
      ${s ? h`<div class="hlevel-primary">${s}</div>` : c}
      ${m}
      ${o || i ? h`<div class="hlevel-details">${g}${v}</div>` : c}
    </div>
  `;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ps = { ATTRIBUTE: 1 }, Ts = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Ms = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, o) {
    this._$Ct = t, this._$AM = s, this._$Ci = o;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = "important", Ls = " !" + Ce, Rs = Ts(class extends Ms {
  constructor(e) {
    var t;
    if (super(e), e.type !== Ps.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, s) => {
      const o = e[s];
      return o == null ? t : t + `${s = s.includes("-") ? s : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${o};`;
    }, "");
  }
  update(e, [t]) {
    const { style: s } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const o of this.ft) t[o] == null && (this.ft.delete(o), o.includes("-") ? s.removeProperty(o) : s[o] = null);
    for (const o in t) {
      const i = t[o];
      if (i != null) {
        this.ft.add(o);
        const r = typeof i == "string" && i.endsWith(Ls);
        o.includes("-") || r ? s.setProperty(o, r ? i.slice(0, -11) : i, r ? Ce : "") : s[o] = i;
      }
    }
    return z;
  }
});
function Ns(e) {
  const { percent: t, onClick: s } = e, o = e.socLabel ?? "SoC";
  if (t === void 0 && !s)
    return c;
  const i = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), r = i === void 0 ? 0 : Math.round(i), n = i !== void 0 ? `${r}% ${o}` : o, l = i !== void 0 ? Rs({ "--ck-soc-pct": `${r}%` }) : c, a = h`
    <div
      class="soc-ring-meter ${i === void 0 ? "empty" : ""}"
      style=${l}
      aria-hidden="true"
    ></div>
    <div class="soc-ring-center">
      ${i !== void 0 ? h`<span class="soc-ring-pct">${r}%</span>` : h`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">${o}</span>
    </div>
  `;
  return s ? h`
      <button
        type="button"
        class="soc-ring"
        aria-label=${n}
        @click=${s}
      >
        ${a}
      </button>
    ` : h`<div class="soc-ring">${a}</div>`;
}
function Us(e) {
  const t = e.charging ?? !1, s = e.batteryLabel ?? "Battery", o = e.chargingLabel ?? "charging", i = e.percent === void 0 || Number.isNaN(e.percent) ? void 0 : Math.max(0, Math.min(100, e.percent));
  return h`
    <div
      class="charge-power ${t ? "is-charging" : "is-idle"}"
      role="img"
      aria-label=${t ? `${o}${i !== void 0 ? `, ${s} ${Math.round(i)}%` : ""}` : `${o}: off`}
    >
      <span class="charge-power-bolt"
        >${_("mdi:lightning-bolt")}</span
      >
    </div>
  `;
}
var Ds = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, _t = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Bs(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = (o ? n(t, s, i) : n(i)) || i);
  return o && i && Ds(t, s, i), i;
};
let K = class extends O {
  constructor() {
    super(...arguments), this._imageReady = !1, this._imageFailed = !1;
  }
  willUpdate(e) {
    e.has("src") && (this._imageReady = !1, this._imageFailed = !1);
  }
  _onImageLoad() {
    this._imageReady = !0;
  }
  _onImageError() {
    this._imageFailed = !0, this._imageReady = !0;
  }
  updated(e) {
    if (!e.has("src") && !e.has("_imageFailed"))
      return;
    const t = this.renderRoot.querySelector(
      "img.car-img"
    );
    t != null && t.complete && t.naturalWidth > 0 && (this._imageReady = !0);
  }
  render() {
    const e = !!this.src && !this._imageFailed, t = !e || this._imageReady, s = [
      e ? "has-img" : "",
      t ? "ready" : ""
    ].filter(Boolean).join(" ");
    return h`
      <div class="wrap ${s}">
        ${e ? h`<img
              class="car-img"
              src=${this.src}
              alt="Vehicle top"
              @load=${this._onImageLoad}
              @error=${this._onImageError}
            />` : h`
              <svg viewBox="0 0 120 200" class="outline" aria-hidden="true">
                <rect
                  x="25"
                  y="20"
                  width="70"
                  height="160"
                  rx="18"
                  class="body"
                />
                <rect
                  x="35"
                  y="35"
                  width="50"
                  height="28"
                  rx="4"
                  class="glass"
                />
                <rect
                  x="35"
                  y="140"
                  width="50"
                  height="22"
                  rx="4"
                  class="glass"
                />
              </svg>
            `}
        <div class="region seat-fl"><slot name="seat-fl"></slot></div>
        <div class="region seat-fr"><slot name="seat-fr"></slot></div>
        <div class="region seat-rl"><slot name="seat-rl"></slot></div>
        <div class="region seat-rr"><slot name="seat-rr"></slot></div>
        <div class="region wheel-fl"><slot name="wheel-fl"></slot></div>
        <div class="region wheel-fr"><slot name="wheel-fr"></slot></div>
        <div class="region wheel-rl"><slot name="wheel-rl"></slot></div>
        <div class="region wheel-rr"><slot name="wheel-rr"></slot></div>
        <div class="region door-fl"><slot name="door-fl"></slot></div>
        <div class="region door-fr"><slot name="door-fr"></slot></div>
        <div class="region door-rl"><slot name="door-rl"></slot></div>
        <div class="region door-rr"><slot name="door-rr"></slot></div>
        <div class="region windows"><slot name="windows"></slot></div>
        <div class="region sunroof"><slot name="sunroof"></slot></div>
        <div class="region trunk"><slot name="trunk"></slot></div>
        <div class="region charge"><slot name="charge"></slot></div>
        <div class="region lock"><slot name="lock"></slot></div>
        <div class="region defog"><slot name="defog"></slot></div>
        <div class="region engine"><slot name="engine"></slot></div>
      </div>
    `;
  }
};
K.styles = S`
    :host {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
      container-type: inline-size;
      container-name: ck-outline;
    }
    .wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 120 / 200;
    }
    .wrap.has-img.ready {
      aspect-ratio: auto;
    }
    .wrap.has-img:not(.ready) .region {
      visibility: hidden;
      pointer-events: none;
    }
    .car-img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 8px;
    }
    .outline {
      width: 100%;
      height: 100%;
      display: block;
    }
    .body {
      fill: color-mix(
        in srgb,
        var(--ck-accent, var(--primary-color, #0d9488)) 12%,
        var(--ck-bg, var(--card-background-color, #fff))
      );
      stroke: var(--ck-border, var(--divider-color, #e2e8f0));
      stroke-width: 2;
    }
    .glass {
      fill: var(
        --ck-surface-muted,
        color-mix(
          in srgb,
          var(--ck-accent, var(--primary-color, #0d9488)) 8%,
          var(--ck-bg, var(--card-background-color, #fff))
        )
      );
      stroke: none;
    }
    .region {
      position: absolute;
      min-width: 4px;
      min-height: 4px;
      pointer-events: auto;
    }
    /*
     * Regions paint in DOM order, so a popover in an earlier region (seat level
     * menu) would sit under later regions. Raise the active region instead.
     */
    .region:hover,
    .region:focus-within {
      z-index: 20;
    }
    /* Cabin seats: inset, clear of wheel TPMS */
    .seat-fl {
      left: 18%;
      top: 40%;
    }
    .seat-fr {
      right: 18%;
      top: 40%;
    }
    .seat-rl {
      left: 18%;
      top: 65%;
    }
    .seat-rr {
      right: 18%;
      top: 65%;
    }
    /* TPMS: front near mirrors/wheels; rear aligned with rear wheels */
    .wheel-fl {
      left: 0;
      top: 18%;
    }
    .wheel-fr {
      right: 0;
      top: 18%;
    }
    .wheel-rl {
      left: 0;
      top: 78%;
    }
    .wheel-rr {
      right: 0;
      top: 78%;
    }
    /* Door status dots: body sides, clear of the windows stack at left 3% */
    .door-fl {
      left: 11%;
      top: 47%;
      transform: translate(-50%, -50%);
    }
    .door-fr {
      right: 11%;
      top: 47%;
      transform: translate(50%, -50%);
    }
    .door-rl {
      left: 11%;
      top: 70%;
      transform: translate(-50%, -50%);
    }
    .door-rr {
      right: 11%;
      top: 70%;
      transform: translate(50%, -50%);
    }
    /* Stack under lock, same left edge — vertical window then vent */
    .windows {
      left: 3%;
      top: 60%;
      transform: translate(-50%, -50%);
    }
    .sunroof {
      left: 50%;
      top: 54%;
      transform: translateX(-50%);
    }
    /* Body / access: trunk rear, charge rear-left, lock mid-side, defog windshield, engine/find hood */
    .trunk {
      left: 50%;
      top: 93%;
      transform: translate(-50%, -50%);
    }
    .charge {
      left: 14%;
      top: 94%;
      transform: translate(-50%, -50%);
    }
    .lock {
      left: 3%;
      top: 45%;
      transform: translate(-50%, -50%);
    }
    .defog {
      left: 50%;
      top: 29%;
      transform: translate(-50%, -50%);
    }
    .engine {
      left: 50%;
      top: 12%;
      transform: translate(-50%, -50%);
    }
  `;
_t([
  q({ type: String })
], K.prototype, "src", 2);
_t([
  P()
], K.prototype, "_imageReady", 2);
_t([
  P()
], K.prototype, "_imageFailed", 2);
K = _t([
  R("carlinko-car-outline")
], K);
var Hs = Object.defineProperty, js = Object.getOwnPropertyDescriptor, Ht = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? js(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = (o ? n(t, s, i) : n(i)) || i);
  return o && i && Hs(t, s, i), i;
};
let ot = class extends O {
  constructor() {
    super(...arguments), this._imageReady = !1;
  }
  willUpdate(e) {
    e.has("src") && (this._imageReady = !1);
  }
  _onImageLoad() {
    this._imageReady = !0;
  }
  _onImageError() {
    this._imageReady = !0;
  }
  updated(e) {
    if (!e.has("src"))
      return;
    const t = this.renderRoot.querySelector(
      "img.car-img"
    );
    t != null && t.complete && t.naturalWidth > 0 && (this._imageReady = !0);
  }
  render() {
    const e = !!this.src, t = !e || this._imageReady, s = [
      e ? "has-img" : "",
      t ? "ready" : ""
    ].filter(Boolean).join(" ");
    return h`
      <div class="wrap ${s}">
        ${e ? h`<img
              class="car-img"
              src=${this.src}
              alt="Vehicle"
              @load=${this._onImageLoad}
              @error=${this._onImageError}
            />` : h`<div class="placeholder">
              <slot name="placeholder">No image</slot>
            </div>`}
        <div class="region headline"><slot name="headline"></slot></div>
        <div class="region online"><slot name="online"></slot></div>
        <div class="region hv"><slot name="hv"></slot></div>
        <div class="region tyres"><slot name="tyres"></slot></div>
      </div>
    `;
  }
};
ot.styles = S`
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      container-name: ck-stage;
    }
    .wrap {
      position: relative;
      width: 100%;
      min-height: 120px;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: visible;
      background: var(
        --ha-card-background,
        var(--ck-bg, var(--card-background-color, #fff))
      );
    }
    /* Leave room above the vehicle so odometer / range / speed do not sit on the roof */
    .wrap.has-img {
      padding-top: 4.5rem;
    }
    .wrap.has-img:not(.ready) .region {
      visibility: hidden;
      pointer-events: none;
    }
    .car-img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 160px;
      color: var(--ck-muted, var(--secondary-text-color, #667));
      font-size: 0.9rem;
      padding: 24px;
    }
    .region {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 1;
      pointer-events: auto;
    }
    /* Mileage text: top-left in the padding band (no centered transform) */
    .headline {
      left: 3%;
      top: 0.35rem;
      transform: none;
      max-width: calc(100% - 6%);
    }
    /* Spread status hotspots so they do not overlap on narrow cards */
    .online {
      left: 94%;
      top: 1.4rem;
      transform: translate(-50%, 0);
    }
    .hv {
      left: 8%;
      top: 88%;
    }
    .tyres {
      left: 94%;
      top: 88%;
    }
    @container ck-stage (max-width: 360px) {
      .wrap.has-img {
        padding-top: 4rem;
      }
      .online {
        left: 92%;
        top: 1.15rem;
      }
      .hv {
        left: 10%;
      }
      .tyres {
        left: 92%;
      }
    }
  `;
Ht([
  q({ type: String })
], ot.prototype, "src", 2);
Ht([
  P()
], ot.prototype, "_imageReady", 2);
ot = Ht([
  R("carlinko-vehicle-stage")
], ot);
var zs = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, jt = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Is(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = (o ? n(t, s, i) : n(i)) || i);
  return o && i && zs(t, s, i), i;
};
function qs(e, t) {
  const s = (t || "unknown").toLowerCase(), o = ss(e, s);
  switch (s) {
    case "ready":
      return { label: o, tone: "ok" };
    case "lv":
      return { label: o, tone: "info" };
    case "off":
      return { label: o, tone: "muted" };
    default:
      return { label: o, tone: "warn" };
  }
}
let it = class extends O {
  constructor() {
    super(...arguments), this._slotCache = new Dt();
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._slotCache.invalidate(), this._config = { ...e };
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
      title: p(void 0, "stub.overview")
    };
  }
  shouldUpdate(e) {
    if (e.has("_config"))
      return !0;
    if (e.has("hass")) {
      const t = e.get("hass");
      if (!t || !this.hass)
        return !0;
      if (t.entities !== this.hass.entities)
        return this._slotCache.invalidate(), !0;
      const s = this._slotCache.peek();
      return s ? Ut(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Nt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, hs) : {};
  }
  render() {
    var lt;
    if (!this._config)
      return h`<ha-card
        ><div class="pad">${p(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((lt = this._config.device_id) != null && lt.trim()))
      return h`<ha-card
        ><div class="pad">${p(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card
        ><div class="pad">${p(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = we(this.hass, e.image), s = st(this.hass, e.engine), o = st(this.hass, e.online), i = gt(this.hass, e.battery), r = gt(this.hass, e.fuel), n = e.odometer && this.hass.states[e.odometer] ? A(this.hass, e.odometer) : void 0, l = e.total_range && this.hass.states[e.total_range] ? A(this.hass, e.total_range) : void 0, a = s && e.engine && e.speed && this.hass.states[e.speed] ? A(this.hass, e.speed) : void 0, u = e.range && this.hass.states[e.range] ? A(this.hass, e.range) : void 0, f = e.fuel_range && this.hass.states[e.fuel_range] ? A(this.hass, e.fuel_range) : void 0, d = $(this.hass, e.hv_state), m = e.hv_state ? qs(this.hass, d) : void 0, g = e.consumption && this.hass.states[e.consumption] ? A(this.hass, e.consumption) : void 0, v = e.fuel_consumption && this.hass.states[e.fuel_consumption] ? A(this.hass, e.fuel_consumption) : void 0, x = !!(n || l || a), b = e.tyres_ok || e.tyre_status ? ke(this.hass, e.tyres_ok, e.tyre_status) : void 0, C = b === "danger" ? w(this.hass, "binary_sensor", "tyres_ok") : b === "warn" ? D(this.hass, "sensor", "tyre_status", "check_tyres") : p(this.hass, "status.tyres_ok"), J = e.tyres_ok ?? e.tyre_status;
    return h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : c}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${t}>
              ${x ? h`<div slot="headline" class="headline">
                    ${n ? h`<button
                          type="button"
                          class="odo"
                          @click=${() => k(this, e.odometer)}
                        >
                          <span class="odo-label"
                            >${w(
      this.hass,
      "sensor",
      "odometer"
    )}</span
                          >
                          <span class="odo-value">${n}</span>
                        </button>` : c}
                    ${l ? h`<button
                          type="button"
                          class="range-total"
                          @click=${() => k(this, e.total_range)}
                        >
                          <span class="range-label"
                            >${w(
      this.hass,
      "sensor",
      "total_range"
    )}</span
                          >
                          <span class="range-value">${l}</span>
                        </button>` : c}
                    ${a ? h`<button
                          type="button"
                          class="speed"
                          @click=${() => k(this, e.speed)}
                        >
                          <span class="speed-label"
                            >${w(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${a}</span>
                        </button>` : c}
                  </div>` : c}
              ${e.online ? h`<div slot="online">
                    ${At({
      icon: "signal",
      label: o ? w(this.hass, "binary_sensor", "online") : p(this.hass, "status.offline"),
      tone: o ? "ok" : "muted",
      onClick: () => k(this, e.online)
    })}
                  </div>` : c}
              ${e.hv_state && m ? h`<div slot="hv">
                    ${At({
      icon: "hv",
      label: m.label,
      tone: m.tone,
      onClick: () => k(this, e.hv_state)
    })}
                  </div>` : c}
              ${b && J ? h`<div slot="tyres">
                    ${At({
      icon: "tyre",
      label: C,
      tone: b,
      onClick: () => k(this, J)
    })}
                  </div>` : c}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${ae({
      percent: i,
      primary: i !== void 0 || u ? p(this.hass, "status.soc") : void 0,
      secondary: u,
      meta: g,
      tone: "ok",
      onPercentClick: e.battery && this.hass.states[e.battery] ? () => k(this, e.battery) : void 0,
      onSecondaryClick: e.range && this.hass.states[e.range] ? () => k(this, e.range) : void 0,
      onMetaClick: e.consumption && this.hass.states[e.consumption] ? () => k(this, e.consumption) : void 0
    })}
              ${ae({
      percent: r,
      primary: r !== void 0 || f ? w(this.hass, "sensor", "fuel") : void 0,
      secondary: f,
      meta: v,
      tone: "info",
      onPercentClick: e.fuel && this.hass.states[e.fuel] ? () => k(this, e.fuel) : void 0,
      onSecondaryClick: e.fuel_range && this.hass.states[e.fuel_range] ? () => k(this, e.fuel_range) : void 0,
      onMetaClick: e.fuel_consumption && this.hass.states[e.fuel_consumption] ? () => k(this, e.fuel_consumption) : void 0
    })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
it.styles = [
  Bt,
  xs,
  Cs,
  S`
      .body {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }
      .hero {
        min-width: 0;
        width: 100%;
      }
      .vitals {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 0;
      }
      .levels {
        display: flex;
        flex-wrap: wrap;
        gap: 16px 24px;
      }
      .headline {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 12px 20px;
      }
      .odo,
      .range-total,
      .speed {
        border: none;
        background: transparent;
        color: inherit;
        padding: 0;
        cursor: pointer;
        font: inherit;
        text-align: left;
        min-width: 0;
      }
      .odo-label,
      .range-label,
      .speed-label {
        display: block;
        color: var(--ck-muted);
        font-size: 0.75rem;
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 0.55),
          0 0 8px rgba(0, 0, 0, 0.35),
          0 1px 2px rgba(255, 255, 255, 0.75),
          0 0 8px rgba(255, 255, 255, 0.45);
      }
      .odo-value,
      .range-value,
      .speed-value {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.2;
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 0.55),
          0 0 8px rgba(0, 0, 0, 0.35),
          0 1px 2px rgba(255, 255, 255, 0.75),
          0 0 8px rgba(255, 255, 255, 0.45);
      }
      @container ck-card (max-width: 360px) {
        .body {
          gap: 12px;
          padding: 12px;
        }
        .vitals {
          gap: 8px;
        }
        .levels {
          gap: 12px 16px;
        }
        .headline {
          gap: 8px 12px;
        }
        .odo-value,
        .range-value,
        .speed-value {
          font-size: 1.15rem;
        }
      }
    `
];
jt([
  q({ attribute: !1 })
], it.prototype, "hass", 2);
jt([
  P()
], it.prototype, "_config", 2);
it = jt([
  R("carlinko-overview")
], it);
var Ws = Object.defineProperty, Se = (e, t, s, o) => {
  for (var i = void 0, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = n(t, s, i) || i);
  return i && Ws(t, s, i), i;
};
const Vs = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, Ae = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class at extends O {
  constructor() {
    super(...arguments), this._computeLabel = (t) => t.label || t.name;
  }
  setConfig(t) {
    this._config = { ...t };
  }
  /** Extra fields after device_id + title. */
  extraSchema() {
    return [];
  }
  /**
   * Skip hass-only updates after the first paint. Lovelace assigns a new hass
   * on every state_changed; re-rendering ha-form re-runs expensive device /
   * entity selector filters.
   */
  shouldUpdate(t) {
    return t.has("_config") ? !0 : t.has("hass") ? t.get("hass") === void 0 : !0;
  }
  _buildSchema() {
    return [
      {
        name: "device_id",
        label: p(this.hass, "editor.device"),
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: p(this.hass, "editor.title"),
        selector: { text: {} }
      },
      ...this.extraSchema().map((t) => {
        if (t.name !== "image_entity" || t.label)
          return t;
        const s = t === Ae;
        return {
          ...t,
          label: p(
            this.hass,
            s ? "editor.top_image_override" : "editor.image_override"
          )
        };
      })
    ];
  }
  _valueChanged(t) {
    var o;
    t.stopPropagation();
    const s = (o = t.detail) == null ? void 0 : o.value;
    s && (this._config = { ...s }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? c : (this._cachedSchema ?? (this._cachedSchema = this._buildSchema()), h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._cachedSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `);
  }
}
Se([
  q({ attribute: !1 })
], at.prototype, "hass");
Se([
  P()
], at.prototype, "_config");
var Ks = Object.getOwnPropertyDescriptor, Fs = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Ks(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = n(i) || i);
  return i;
};
let ce = class extends at {
  extraSchema() {
    return [Vs];
  }
};
ce = Fs([
  R("carlinko-overview-editor")
], ce);
async function Ee(e, t, s, o) {
  if (e())
    return !1;
  t(!0);
  try {
    return await s(), !0;
  } catch (i) {
    return o == null || o(i), !1;
  } finally {
    t(!1);
  }
}
var Zs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, vt = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Js(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = (o ? n(t, s, i) : n(i)) || i);
  return o && i && Zs(t, s, i), i;
};
let F = class extends O {
  constructor() {
    super(...arguments), this._busy = !1, this._slotCache = new Dt();
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._slotCache.invalidate(), this._config = { ...e };
  }
  getCardSize() {
    return 4;
  }
  static getConfigElement() {
    return document.createElement("carlinko-charging-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: p(void 0, "stub.charging")
    };
  }
  shouldUpdate(e) {
    if (e.has("_config") || e.has("_busy"))
      return !0;
    if (e.has("hass")) {
      const t = e.get("hass");
      if (!t || !this.hass)
        return !0;
      if (t.entities !== this.hass.entities)
        return this._slotCache.invalidate(), !0;
      const s = this._slotCache.peek();
      return s ? Ut(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Nt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, ds) : {};
  }
  _run(e) {
    this.hass && Ee(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-charging action failed", t)
    );
  }
  _metaRow(e, t, s, o) {
    var i;
    return !s || !((i = this.hass) != null && i.states[s]) ? c : h`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => k(this, s)}
      >
        <span class="charge-meta-label">${e}:</span>
        <span class="charge-meta-value${o ? ` ${o}` : ""}"
          >${t}</span
        >
      </button>
    `;
  }
  render() {
    var b;
    if (!this._config)
      return h`<ha-card
        ><div class="pad">${p(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((b = this._config.device_id) != null && b.trim()))
      return h`<ha-card
        ><div class="pad">${p(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card
        ><div class="pad">${p(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = st(this.hass, e.charging), s = gt(this.hass, e.battery), o = !!(e.battery && this.hass.states[e.battery]), i = !!(e.charging && this.hass.states[e.charging]), r = !!(e.charge_power && this.hass.states[e.charge_power]), n = !!(e.charge_remaining && this.hass.states[e.charge_remaining]), l = e.charge_state && this.hass.states[e.charge_state] || e.charge_mode && this.hass.states[e.charge_mode], a = !!(e.charge_stop && this.hass.states[e.charge_stop]) && ye(this.hass, e.charge_mode), u = o || i || r || n, f = t ? w(this.hass, "binary_sensor", "charging") : p(this.hass, "status.not_charging"), d = t ? "ok" : "muted", m = A(this.hass, e.charge_power), g = fs(this.hass, e.charge_remaining), v = w(this.hass, "sensor", "battery"), x = p(this.hass, "status.soc");
    return h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${u ? h`
                <div class="charge-hero">
                  ${o ? Ns({
      percent: s,
      socLabel: x,
      onClick: () => k(this, e.battery)
    }) : c}
                  ${o ? h`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${Us({
      percent: s,
      charging: t,
      batteryLabel: v,
      chargingLabel: w(
        this.hass,
        "binary_sensor",
        "charging"
      )
    })}` : c}
                  <div class="charge-hero-meta">
                    ${i ? this._metaRow(
      p(this.hass, "status.plugged"),
      f,
      e.charging,
      d
    ) : c}
                    ${r ? this._metaRow(
      p(this.hass, "status.power"),
      m,
      e.charge_power
    ) : c}
                    ${n ? this._metaRow(
      p(this.hass, "status.time"),
      g,
      e.charge_remaining
    ) : c}
                  </div>
                </div>
              ` : c}
          ${l ? h`
                <div class="charge-secondary">
                  ${ne(
      this,
      this.hass,
      w(this.hass, "sensor", "charge_state"),
      e.charge_state
    )}
                  ${ne(
      this,
      this.hass,
      p(this.hass, "status.mode"),
      e.charge_mode
    )}
                </div>
              ` : c}
        </div>
        ${a ? h`
              <div class="actions">
                ${y({
      label: w(this.hass, "button", "charge_stop"),
      icon: _("mdi:stop"),
      showLabel: !0,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => U(this.hass, e.charge_stop))
    })}
              </div>
            ` : c}
      </ha-card>
    `;
  }
};
F.styles = [
  Bt,
  $e,
  xe,
  Ss,
  As,
  Es
];
vt([
  q({ attribute: !1 })
], F.prototype, "hass", 2);
vt([
  P()
], F.prototype, "_config", 2);
vt([
  P()
], F.prototype, "_busy", 2);
F = vt([
  R("carlinko-charging")
], F);
var Gs = Object.getOwnPropertyDescriptor, Ys = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Gs(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = n(i) || i);
  return i;
};
let le = class extends at {
};
le = Ys([
  R("carlinko-charging-editor")
], le);
var Qs = Object.defineProperty, Xs = Object.getOwnPropertyDescriptor, ct = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Xs(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = (o ? n(t, s, i) : n(i)) || i);
  return o && i && Qs(t, s, i), i;
};
const he = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], to = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], de = [
  { slot: "door-fl", door: "door_fl", key: "door_driver" },
  { slot: "door-fr", door: "door_fr", key: "door_passenger" },
  { slot: "door-rl", door: "door_rl", key: "door_rear_left" },
  { slot: "door-rr", door: "door_rr", key: "door_rear_right" }
], eo = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"];
function Et(e) {
  return e.split(".", 1)[0];
}
function so(e) {
  if (!e)
    return !0;
  const t = e.toLowerCase();
  return t === "off" || t === "unavailable";
}
function ut(e) {
  return (e == null ? void 0 : e.toLowerCase()) === "unknown";
}
function Ot(e) {
  return !!e && !so(e) && !ut(e);
}
let I = class extends O {
  constructor() {
    super(...arguments), this._busy = !1, this._openSeatMenu = null, this._slotCache = new Dt(), this._onDocPointerDown = (e) => {
      if (!this._openSeatMenu)
        return;
      e.composedPath().some(
        (o) => o instanceof HTMLElement && (o.classList.contains("seat-icon") || o.classList.contains("seat-menu"))
      ) || this._closeSeatMenu();
    }, this._onDocKeyDown = (e) => {
      e.key === "Escape" && this._openSeatMenu && this._closeSeatMenu();
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("pointerdown", this._onDocPointerDown, !0), document.addEventListener("keydown", this._onDocKeyDown);
  }
  disconnectedCallback() {
    document.removeEventListener("pointerdown", this._onDocPointerDown, !0), document.removeEventListener("keydown", this._onDocKeyDown), super.disconnectedCallback();
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._slotCache.invalidate(), this._config = { ...e };
  }
  getCardSize() {
    return 7;
  }
  static getConfigElement() {
    return document.createElement("carlinko-cabin-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: p(void 0, "stub.cabin")
    };
  }
  shouldUpdate(e) {
    if (e.has("_config") || e.has("_busy") || e.has("_openSeatMenu"))
      return !0;
    if (e.has("hass")) {
      const t = e.get("hass");
      if (!t || !this.hass)
        return !0;
      if (t.entities !== this.hass.entities)
        return this._slotCache.invalidate(), !0;
      const s = this._slotCache.peek();
      return s ? Ut(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Nt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, us) : {};
  }
  _run(e) {
    this.hass && Ee(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-cabin action failed", t)
    );
  }
  _nudgeTemp(e) {
    const t = this._slots().climate;
    if (!this.hass || !t)
      return;
    const s = se(this.hass, t);
    if (s === void 0)
      return;
    const o = bs(this.hass, t), i = ys(this.hass, t), r = ks(this.hass, t), n = Math.min(r, Math.max(i, s + e * o));
    this._run(() => $s(this.hass, t, n));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = oe(this.hass, e);
    this._run(
      () => ws(this.hass, e, t ? "off" : "cool")
    );
  }
  _closeSeatMenu() {
    this._openSeatMenu && (this._openSeatMenu = null);
  }
  _toggleSeatMenu(e, t) {
    const s = this._openSeatMenu;
    if (s && s.slot === e && s.kind === t) {
      this._openSeatMenu = null;
      return;
    }
    this._openSeatMenu = { slot: e, kind: t };
  }
  _offSelectOption(e) {
    return re(this.hass, e).find(
      (t) => t.toLowerCase() === "off"
    );
  }
  async _turnSeatOff(e) {
    var s;
    if (!((s = this.hass) != null && s.states[e]))
      return;
    const t = $(this.hass, e);
    if (Ot(t)) {
      if (Et(e) === "select") {
        const o = this._offSelectOption(e);
        if (!o)
          return;
        await ie(this.hass, e, o);
        return;
      }
      await xt(this.hass, e);
    }
  }
  _setSeatLevel(e, t, s) {
    this.hass && this._run(async () => {
      t.toLowerCase() !== "off" && s && await this._turnSeatOff(s), await ie(this.hass, e, t);
    });
  }
  _toggleSeatBinary(e, t) {
    if (!this.hass)
      return;
    const s = $(this.hass, e) === "on";
    this._run(async () => {
      !s && t && await this._turnSeatOff(t), s ? await xt(this.hass, e) : await te(this.hass, e);
    });
  }
  _seatStateLabel(e, t, s) {
    return Et(e) === "select" ? D(this.hass, "select", t, s) : s === "on" ? "On" : D(this.hass, "select", t, "off");
  }
  _hasDirectTpms(e) {
    return this.hass ? eo.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(e) {
    return this.hass ? he.some((t) => {
      const s = t.heat ? e[t.heat] : void 0, o = t.vent ? e[t.vent] : void 0;
      return s && this.hass.states[s] || o && this.hass.states[o];
    }) : !1;
  }
  _seatIcon(e, t, s, o, i, r) {
    var b;
    const n = $(this.hass, s), l = Et(s), a = t === "heat" ? p(this.hass, "status.heat") : p(this.hass, "status.vent"), u = this._seatStateLabel(s, o, n), f = ((b = this._openSeatMenu) == null ? void 0 : b.slot) === e.slot && this._openSeatMenu.kind === t, d = l === "select", m = d ? (C) => {
      C.stopPropagation(), this._toggleSeatMenu(e.slot, t);
    } : () => this._toggleSeatBinary(s, i), g = e.slot === "seat-rl" || e.slot === "seat-rr", v = e.slot === "seat-fr" || e.slot === "seat-rr", x = d ? re(this.hass, s) : [];
    return h`
      <div
        class="seat-icon-wrap"
        @mouseenter=${() => {
      d && !this._busy && (this._openSeatMenu = { slot: e.slot, kind: t });
    }}
        @mouseleave=${() => {
      d && this._closeSeatMenu();
    }}
      >
        <button
          type="button"
          class="seat-icon ${t}${r ? " active" : ""}${f ? " open" : ""}"
          ?disabled=${this._busy}
          title=${`${a}: ${u}`}
          aria-label=${`${a}: ${u}`}
          aria-haspopup=${d ? "listbox" : c}
          aria-expanded=${d ? String(f) : c}
          @click=${m}
        >
          ${_(t === "heat" ? "mdi:car-seat-heater" : "mdi:car-seat-cooler")}
        </button>
        ${f && d ? h`
              <div
                class="seat-menu ${t}${g ? " up" : ""}${v ? " end" : ""}"
                role="listbox"
                aria-label=${a}
              >
                ${x.map((C) => {
      const J = C === n, lt = C.toLowerCase() === "off", Oe = D(
        this.hass,
        "select",
        o,
        C
      );
      return h`
                    <button
                      type="button"
                      class="seat-option${lt ? " off" : ""}${J ? " current" : ""}"
                      role="option"
                      aria-selected=${String(J)}
                      ?disabled=${this._busy}
                      @click=${(Pe) => {
        Pe.stopPropagation(), this._closeSeatMenu(), this._setSeatLevel(s, C, i);
      }}
                    >
                      ${Oe}
                    </button>
                  `;
    })}
              </div>
            ` : c}
      </div>
    `;
  }
  _seatZone(e, t) {
    var g, v, x;
    const s = e.heat ? t[e.heat] : void 0, o = e.vent ? t[e.vent] : void 0, i = s && ((g = this.hass) != null && g.states[s]) ? s : void 0, r = o && ((v = this.hass) != null && v.states[o]) ? o : void 0;
    if (!i && !r)
      return c;
    const n = i ? $(this.hass, i) : void 0, l = r ? $(this.hass, r) : void 0, a = Ot(n), u = Ot(l);
    let f = "off", d = D(this.hass, "select", "seat_heat_l", "off");
    if (a && e.heat)
      f = "heat", d = this._seatStateLabel(i, e.heat, n);
    else if (u && e.vent)
      f = "vent", d = this._seatStateLabel(r, e.vent, l);
    else if (ut(n) || ut(l)) {
      f = "unknown";
      const b = e.heat ?? e.vent ?? "seat_heat_l", C = ut(n) ? n : l;
      d = D(this.hass, "select", b, C);
    }
    const m = ((x = this._openSeatMenu) == null ? void 0 : x.slot) === e.slot;
    return h`
      <div
        slot=${e.slot}
        class="seat-chip${m ? " menu-open" : ""}"
      >
        <div class="seat-icons">
          ${i && e.heat ? this._seatIcon(e, "heat", i, e.heat, r, a) : c}
          ${r && e.vent ? this._seatIcon(e, "vent", r, e.vent, i, u) : c}
        </div>
        <span class="seat-state ${f}">${d}</span>
      </div>
    `;
  }
  _wheelChip(e, t, s) {
    if (!this.hass)
      return c;
    const o = !!(e && this.hass.states[e]), i = !!(t && this.hass.states[t]);
    if (!o && !i)
      return c;
    const r = o ? A(this.hass, e) : void 0, n = i ? A(this.hass, t) : void 0, l = o ? e : t, a = [r, n].filter(Boolean).join(", ");
    return h`
      <button
        type="button"
        class="wheel-chip tone-${s}"
        title=${a}
        aria-label=${a}
        @click=${() => k(this, l)}
      >
        ${_("mdi:tire")}
        <span class="wheel-chip-text">
          ${r ? h`<span class="wheel-pressure">${r}</span>` : c}
          ${n ? h`<span class="wheel-temp">${n}</span>` : c}
        </span>
      </button>
    `;
  }
  _wheelZone(e, t) {
    var l, a;
    const s = t[e.pressure], o = t[e.temp], i = !!(s && ((l = this.hass) != null && l.states[s])), r = !!(o && ((a = this.hass) != null && a.states[o]));
    if (!i && !r)
      return c;
    const n = ke(this.hass, t.tyres_ok, t.tyre_status);
    return h`
      <div slot=${e.slot} class="wheel-zone">
        ${this._wheelChip(s, o, n)}
      </div>
    `;
  }
  _entityExists(e) {
    var t;
    return !!(e && ((t = this.hass) != null && t.states[e]));
  }
  _hasDoorSensors(e) {
    return de.some((t) => this._entityExists(e[t.door]));
  }
  _doorZone(e, t) {
    const s = t[e.door];
    if (!this._entityExists(s))
      return c;
    const o = $(this.hass, s), i = o === "on", r = i || o === "off", n = r ? i ? "danger" : "ok" : "muted", l = r ? p(this.hass, i ? "status.door_open" : "status.door_closed") : p(this.hass, "status.door_unknown"), a = `${w(this.hass, "binary_sensor", e.key)}: ${l}`;
    return h`
      <div slot=${e.slot} class="door-zone">
        <button
          type="button"
          class="door-dot tone-${n}"
          title=${a}
          aria-label=${a}
          @click=${() => k(this, s)}
        ></button>
      </div>
    `;
  }
  _hasWindowsControls(e) {
    return this._entityExists(e.windows) || this._entityExists(e.windows_vent) || this._entityExists(e.sunroof) || this._entityExists(e.sunroof_tilt);
  }
  _chargerConnected(e) {
    return ye(this.hass, e.charge_mode);
  }
  _hasBodyControls(e) {
    return this._entityExists(e.lock) || this._entityExists(e.engine) || this._entityExists(e.find) || this._entityExists(e.defog) || this._entityExists(e.charge_stop) && this._chargerConnected(e) || this._entityExists(e.trunk);
  }
  _bodyActions(e) {
    const t = e.lock, s = e.engine, o = e.find, i = e.defog, r = e.charge_stop, n = e.trunk, l = this._chargerConnected(e), a = this._entityExists(r) && l, u = this._entityExists(t), f = this._entityExists(s), d = this._entityExists(o);
    if (!t && !f && !d && !i && !a && !n)
      return c;
    const g = $(this.hass, t) === "locked", v = st(this.hass, s), x = st(this.hass, i), b = !!(i != null && i.startsWith("binary_sensor.")), C = $(this.hass, n) === "open";
    return h`
      ${u || f || d ? h`<div slot="engine" class="map-actions">
            ${u ? y({
      label: g ? p(this.hass, "action.unlock_doors") : p(this.hass, "action.lock_doors"),
      icon: _(g ? "mdi:car-door-lock" : "mdi:lock-open-variant"),
      disabled: this._busy,
      variant: g ? "ok" : "danger",
      onClick: () => this._run(
        () => g ? ms(this.hass, t) : gs(this.hass, t)
      )
    }) : c}
            ${f ? y({
      label: v ? p(this.hass, "action.engine_off") : p(this.hass, "action.engine_on"),
      icon: _("mdi:engine"),
      disabled: this._busy,
      variant: v ? "ok" : "",
      onClick: () => this._run(
        () => v ? xt(this.hass, s) : te(this.hass, s)
      )
    }) : c}
            ${d ? y({
      label: w(this.hass, "button", "find"),
      icon: _("mdi:map-marker"),
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, o))
    }) : c}
          </div>` : c}
      ${this._entityExists(i) ? h`<div slot="defog" class="map-actions">
            ${y({
      label: x ? p(this.hass, "action.defog_off") : p(this.hass, "action.defog_on"),
      icon: _("mdi:car-defrost-front"),
      disabled: this._busy || b,
      variant: x ? "danger" : "",
      onClick: () => this._run(() => _s(this.hass, i))
    })}
          </div>` : c}
      ${a ? h`<div slot="charge" class="map-actions">
            ${y({
      label: w(this.hass, "button", "charge_stop"),
      icon: _("mdi:ev-station"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => U(this.hass, r))
    })}
          </div>` : c}
      ${this._entityExists(n) ? h`<div slot="trunk" class="map-actions">
            ${y({
      label: C ? p(this.hass, "action.close_trunk") : p(this.hass, "action.open_trunk"),
      icon: _("mdi:car-back"),
      disabled: this._busy,
      variant: C ? "danger" : "ok",
      onClick: () => this._run(
        () => C ? St(this.hass, n) : Ct(this.hass, n)
      )
    })}
          </div>` : c}
    `;
  }
  _windowsCluster(e) {
    const t = e.windows, s = e.windows_vent, o = this._entityExists(t), i = this._entityExists(s);
    if (!o && !i)
      return c;
    const r = o && ee(this.hass, t);
    return h`
      <div slot="windows" class="map-actions map-actions-stack">
        ${o ? y(r ? {
      label: p(this.hass, "action.close_windows"),
      icon: _("mdi:window-closed"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => St(this.hass, t))
    } : {
      label: p(this.hass, "action.open_windows"),
      icon: _("mdi:window-open"),
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => Ct(this.hass, t))
    }) : c}
        ${i ? y({
      label: p(this.hass, "action.vent_windows"),
      icon: _("mdi:window-open-variant"),
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, s))
    }) : c}
      </div>
    `;
  }
  _sunroofCluster(e) {
    const t = e.sunroof, s = e.sunroof_tilt, o = this._entityExists(t), i = this._entityExists(s);
    if (!o && !i)
      return c;
    const r = o && ee(this.hass, t);
    return h`
      <div slot="sunroof" class="map-actions">
        ${o ? y(r ? {
      label: p(this.hass, "action.close_sunroof"),
      icon: _("mdi:window-closed"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => St(this.hass, t))
    } : {
      label: p(this.hass, "action.open_sunroof"),
      icon: _("mdi:window-open"),
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => Ct(this.hass, t))
    }) : c}
        ${i ? y({
      label: p(this.hass, "action.tilt_sunroof"),
      icon: _("mdi:angle-acute"),
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, s))
    }) : c}
      </div>
    `;
  }
  render() {
    var x;
    if (!this._config)
      return h`<ha-card
        ><div class="pad">${p(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((x = this._config.device_id) != null && x.trim()))
      return h`<ha-card
        ><div class="pad">${p(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card
        ><div class="pad">${p(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, o = oe(this.hass, t), i = se(this.hass, t), r = vs(this.hass, t), n = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), l = this._hasSeats(e), a = this._hasDirectTpms(e), u = this._hasWindowsControls(e), f = this._hasBodyControls(e), d = this._hasDoorSensors(e), m = we(this.hass, e.image), g = l || a || u || f || d, v = !!(s || e.quick_cool && this.hass.states[e.quick_cool] || e.quick_heat && this.hass.states[e.quick_heat]);
    return h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${v ? h`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? h`
                          ${y({
      label: o ? p(this.hass, "climate.off") : p(this.hass, "climate.on"),
      icon: _("mdi:power"),
      disabled: this._busy,
      variant: o ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${y({
      label: p(this.hass, "climate.increase_temp"),
      icon: _("mdi:plus"),
      disabled: this._busy || i === void 0,
      variant: "heat",
      onClick: () => this._nudgeTemp(1)
    })}
                          <span
                            class="setpoint-value"
                            title=${p(this.hass, "climate.setpoint")}
                            >${i !== void 0 ? `${i}${n}` : "—"}</span
                          >
                          ${y({
      label: p(this.hass, "climate.decrease_temp"),
      icon: _("mdi:minus"),
      disabled: this._busy || i === void 0,
      variant: "cool",
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : c}
                  </div>
                  <div class="controls-right">
                    ${e.quick_cool && this.hass.states[e.quick_cool] ? y({
      label: w(this.hass, "button", "quick_cool"),
      icon: _("mdi:snowflake"),
      disabled: this._busy,
      variant: "cool",
      onClick: () => this._run(
        () => U(this.hass, e.quick_cool)
      )
    }) : c}
                    ${e.quick_heat && this.hass.states[e.quick_heat] ? y({
      label: w(this.hass, "button", "quick_heat"),
      icon: _("mdi:fire"),
      disabled: this._busy,
      variant: "heat",
      onClick: () => this._run(
        () => U(this.hass, e.quick_heat)
      )
    }) : c}
                  </div>
                </div>
              ` : c}
          ${s && r !== void 0 ? h`
                <div class="current-row">
                  <span class="metric-label"
                    >${p(this.hass, "climate.current")}</span
                  >
                  <span class="metric-value">${r}${n}</span>
                </div>
              ` : c}
          ${g ? h`
                <carlinko-car-outline .src=${m}>
                  ${this._bodyActions(e)} ${this._windowsCluster(e)}
                  ${this._sunroofCluster(e)}
                  ${he.map((b) => this._seatZone(b, e))}
                  ${de.map((b) => this._doorZone(b, e))}
                  ${a ? to.map((b) => this._wheelZone(b, e)) : c}
                </carlinko-car-outline>
              ` : c}
        </div>
      </ha-card>
    `;
  }
};
I.styles = [
  Bt,
  $e,
  xe,
  S`
      ha-card {
        overflow: visible;
      }
      .controls-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .controls-left,
      .controls-right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .setpoint-value {
        font-weight: 600;
        font-size: 1.15rem;
        min-width: 3.25rem;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }
      .current-row {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
      }
      .seat-chip,
      .wheel-zone {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .wheel-zone {
        align-items: flex-start;
      }
      /*
       * No backdrop-filter here: it would create a stacking context and trap
       * the open level menu behind the other seat/map regions.
       */
      .seat-chip {
        position: relative;
        align-items: center;
        gap: 3px;
        border: 1px solid var(--ck-border);
        background: var(--ck-bg);
        border-radius: 8px;
        padding: 5px 7px 4px;
      }
      .seat-chip.menu-open {
        z-index: 30;
      }
      .seat-icons {
        display: inline-flex;
        gap: 4px;
      }
      .seat-icon-wrap {
        position: relative;
      }
      .seat-icon,
      .wheel-chip {
        border: 1px solid var(--ck-border);
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        color: var(--ck-text);
        border-radius: 6px;
        padding: 4px 6px;
        font: inherit;
        font-size: 0.7rem;
        line-height: 1.2;
        cursor: pointer;
        white-space: nowrap;
        backdrop-filter: blur(2px);
      }
      .seat-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.7rem;
        height: 1.7rem;
        padding: 0;
        color: var(--ck-muted);
        backdrop-filter: none;
      }
      .seat-icon ha-icon {
        --mdc-icon-size: 1rem;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .seat-icon.heat {
        border-color: color-mix(in srgb, var(--ck-seat-heat) 45%, transparent);
        color: color-mix(
          in srgb,
          var(--ck-seat-heat) 62%,
          var(--ck-muted)
        );
      }
      .seat-icon.vent {
        border-color: color-mix(in srgb, var(--ck-seat-vent) 45%, transparent);
        color: color-mix(
          in srgb,
          var(--ck-seat-vent) 62%,
          var(--ck-muted)
        );
      }
      .seat-icon.heat.active,
      .seat-icon.heat.open {
        color: var(--ck-seat-heat);
        border-color: var(--ck-seat-heat);
        background: color-mix(in srgb, var(--ck-seat-heat) 20%, transparent);
      }
      .seat-icon.vent.active,
      .seat-icon.vent.open {
        color: var(--ck-seat-vent);
        border-color: var(--ck-seat-vent);
        background: color-mix(in srgb, var(--ck-seat-vent) 20%, transparent);
      }
      .seat-icon.open {
        box-shadow: 0 0 0 2px color-mix(in srgb, currentColor 40%, transparent);
      }
      .seat-state {
        font-size: 0.72rem;
        font-weight: 600;
        white-space: nowrap;
        line-height: 1.1;
      }
      .seat-state.off,
      .seat-state.unknown {
        color: var(--ck-muted);
        font-weight: 500;
      }
      .seat-state.heat {
        color: var(--ck-seat-heat);
      }
      .seat-state.vent {
        color: var(--ck-seat-vent);
      }
      .seat-menu {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        z-index: 8;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 92px;
        padding: 4px;
        border: 1px solid var(--ck-border);
        border-radius: 8px;
        background: color-mix(in srgb, var(--ck-bg) 94%, var(--ck-text) 6%);
        box-shadow: 0 8px 20px color-mix(in srgb, #000 45%, transparent);
      }
      /* Keep pointer inside the wrap while moving icon -> menu (hover open). */
      .seat-menu::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: -8px;
        height: 8px;
      }
      .seat-menu.up::before {
        top: auto;
        bottom: -8px;
      }
      .seat-menu.up {
        top: auto;
        bottom: calc(100% + 6px);
      }
      .seat-menu.end {
        left: auto;
        right: 0;
      }
      .seat-menu.heat {
        border-color: color-mix(
          in srgb,
          var(--ck-seat-heat) 50%,
          var(--ck-border)
        );
      }
      .seat-menu.vent {
        border-color: color-mix(
          in srgb,
          var(--ck-seat-vent) 50%,
          var(--ck-border)
        );
      }
      .seat-option {
        display: block;
        width: 100%;
        border: 0;
        background: transparent;
        color: var(--ck-text);
        font: inherit;
        font-size: 0.74rem;
        text-align: left;
        padding: 5px 8px;
        border-radius: 5px;
        cursor: pointer;
        white-space: nowrap;
      }
      .seat-menu.heat .seat-option {
        color: color-mix(in srgb, var(--ck-seat-heat) 78%, var(--ck-text));
      }
      .seat-menu.vent .seat-option {
        color: color-mix(in srgb, var(--ck-seat-vent) 78%, var(--ck-text));
      }
      .seat-option.off {
        color: var(--ck-muted);
      }
      .seat-option.current {
        background: color-mix(in srgb, currentColor 18%, transparent);
        font-weight: 700;
      }
      .seat-option:hover:not(:disabled) {
        background: color-mix(in srgb, currentColor 26%, transparent);
      }
      .door-dot {
        display: block;
        width: 14px;
        height: 14px;
        padding: 0;
        border-radius: 50%;
        border: 2px solid var(--ck-bg);
        background: var(--ck-muted);
        cursor: pointer;
      }
      .door-dot.tone-ok {
        background: var(--ck-ok);
        box-shadow: 0 0 8px color-mix(in srgb, var(--ck-ok) 60%, transparent);
      }
      .door-dot.tone-danger {
        background: var(--ck-danger);
        box-shadow: 0 0 8px
          color-mix(in srgb, var(--ck-danger) 60%, transparent);
      }
      .door-dot:hover {
        outline: 2px solid color-mix(in srgb, currentColor 45%, transparent);
        outline-offset: 1px;
      }
      .wheel-chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 7px;
      }
      .wheel-chip ha-icon {
        --mdc-icon-size: 0.95rem;
        width: 0.95rem;
        height: 0.95rem;
        flex-shrink: 0;
      }
      .wheel-chip-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        line-height: 1.15;
      }
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
        font-size: 0.65rem;
      }
      .wheel-chip.tone-ok {
        border-color: var(--ck-tyre-ok);
        color: var(--ck-tyre-ok);
      }
      .wheel-chip.tone-warn {
        border-color: var(--ck-tyre-warn);
        color: var(--ck-tyre-warn);
      }
      .wheel-chip.tone-danger {
        border-color: var(--ck-tyre-danger);
        color: var(--ck-tyre-danger);
      }
      .wheel-chip.tone-ok .wheel-temp,
      .wheel-chip.tone-warn .wheel-temp,
      .wheel-chip.tone-danger .wheel-temp {
        color: var(--ck-muted);
      }
      .seat-icon:hover:not(:disabled),
      .wheel-chip:hover {
        background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
        border-color: currentColor;
      }
      .seat-icon:disabled,
      .seat-option:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .map-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
      }
      .map-actions-stack {
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
      }
      .map-actions .action.icon {
        width: 2.35rem;
        height: 2.35rem;
        min-width: 2.35rem;
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        backdrop-filter: blur(2px);
      }
      .map-actions .action.icon:hover:not(:disabled) {
        background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
        border-color: currentColor;
      }
      .map-actions .action.icon ha-icon {
        --mdc-icon-size: 1.35rem;
        width: 1.35rem;
        height: 1.35rem;
      }
      carlinko-car-outline {
        margin-top: 12px;
        max-width: 320px;
        overflow: visible;
      }
      @container ck-card (max-width: 360px) {
        .seat-chip {
          padding: 4px 5px 3px;
        }
        .seat-icon {
          width: 1.45rem;
          height: 1.45rem;
        }
        .seat-icon ha-icon {
          --mdc-icon-size: 0.85rem;
          width: 0.85rem;
          height: 0.85rem;
        }
        .seat-state {
          font-size: 0.65rem;
        }
        .seat-menu {
          min-width: 80px;
        }
        .wheel-chip {
          padding: 3px 5px;
          font-size: 0.65rem;
          gap: 4px;
        }
        .wheel-chip ha-icon {
          --mdc-icon-size: 0.85rem;
          width: 0.85rem;
          height: 0.85rem;
        }
        .wheel-temp {
          font-size: 0.6rem;
        }
        .door-dot {
          width: 12px;
          height: 12px;
        }
        .map-actions .action.icon {
          width: 2.1rem;
          height: 2.1rem;
          min-width: 2.1rem;
        }
        .map-actions .action.icon ha-icon {
          --mdc-icon-size: 1.15rem;
          width: 1.15rem;
          height: 1.15rem;
        }
        carlinko-car-outline {
          max-width: 100%;
        }
      }
    `
];
ct([
  q({ attribute: !1 })
], I.prototype, "hass", 2);
ct([
  P()
], I.prototype, "_config", 2);
ct([
  P()
], I.prototype, "_busy", 2);
ct([
  P()
], I.prototype, "_openSeatMenu", 2);
I = ct([
  R("carlinko-cabin")
], I);
var oo = Object.getOwnPropertyDescriptor, io = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? oo(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (i = n(i) || i);
  return i;
};
let ue = class extends at {
  extraSchema() {
    return [Ae];
  }
};
ue = io([
  R("carlinko-cabin-editor")
], ue);
window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "carlinko-overview",
    name: "CarLinko Overview",
    description: "Vehicle overview: status hotspots on the car image, visual ranges/vitals for ha-carlinko.",
    preview: !0
  },
  {
    type: "carlinko-charging",
    name: "CarLinko Charging",
    description: "SoC ring, charging status, remaining time, power, and stop charging.",
    preview: !0
  },
  {
    type: "carlinko-cabin",
    name: "CarLinko Cabin",
    description: "Climate, seats, TPMS, windows/sunroof, and body/access controls on a top-down vehicle map.",
    preview: !0
  }
);
console.info(
  "%c CARLINKO-CARD %c 0.1.8 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
