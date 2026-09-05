/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, yt = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = Symbol(), Pt = /* @__PURE__ */ new WeakMap();
let ne = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (yt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Pt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Pt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ke = (e) => new ne(typeof e == "string" ? e : e + "", void 0, wt), w = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new ne(s, e, wt);
}, xe = (e, t) => {
  if (yt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), r = it.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, e.appendChild(i);
  }
}, Nt = yt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return ke(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ce, defineProperty: Ae, getOwnPropertyDescriptor: Se, getOwnPropertyNames: Ee, getOwnPropertySymbols: Oe, getPrototypeOf: Me } = Object, M = globalThis, Lt = M.trustedTypes, Te = Lt ? Lt.emptyScript : "", ut = M.reactiveElementPolyfillSupport, W = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Te : null;
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
} }, $t = (e, t) => !Ce(e, t), Zt = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Zt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
      r !== void 0 && Ae(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: r, set: n } = Se(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const h = r == null ? void 0 : r.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const t = Me(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const s = this.properties, i = [...Ee(s), ...Oe(s)];
      for (const r of i) this.createProperty(r, s[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, r] of s) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const r = this._$Eu(s, i);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) s.unshift(Nt(r));
    } else t !== void 0 && s.push(Nt(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xe(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    var n;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : rt).toAttribute(s, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const h = i.getPropertyOptions(r), c = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : rt;
      this._$Em = r;
      const u = c.fromAttribute(s, h.type);
      this[r] = u ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, r = !1, n) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (r === !1 && (n = this[t]), i ?? (i = h.getPropertyOptions(t)), !((i.hasChanged ?? $t)(n, s) || i.useDefault && i.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? s ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, o] of r) {
        const { wrapped: h } = o, c = this[n];
        h !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((r) => {
        var n;
        return (n = r.hostUpdate) == null ? void 0 : n.call(r);
      }), this.update(s)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[W("elementProperties")] = /* @__PURE__ */ new Map(), U[W("finalized")] = /* @__PURE__ */ new Map(), ut == null || ut({ ReactiveElement: U }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, Bt = (e) => e, nt = K.trustedTypes, Rt = nt ? nt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, oe = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, ae = "?" + O, He = `<${ae}>`, Z = document, F = () => Z.createComment(""), G = (e) => e === null || typeof e != "object" && typeof e != "function", kt = Array.isArray, Pe = (e) => kt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ut = /-->/g, It = />/g, H = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zt = /'/g, Vt = /"/g, ce = /^(?:script|style|textarea|title)$/i, Ne = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), a = Ne(1), B = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), jt = /* @__PURE__ */ new WeakMap(), N = Z.createTreeWalker(Z, 129);
function le(e, t) {
  if (!kt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Rt !== void 0 ? Rt.createHTML(t) : t;
}
const Le = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = q;
  for (let h = 0; h < s; h++) {
    const c = e[h];
    let u, v, p = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, v = o.exec(c), v !== null); ) g = o.lastIndex, o === q ? v[1] === "!--" ? o = Ut : v[1] !== void 0 ? o = It : v[2] !== void 0 ? (ce.test(v[2]) && (r = RegExp("</" + v[2], "g")), o = H) : v[3] !== void 0 && (o = H) : o === H ? v[0] === ">" ? (o = r ?? q, p = -1) : v[1] === void 0 ? p = -2 : (p = o.lastIndex - v[2].length, u = v[1], o = v[3] === void 0 ? H : v[3] === '"' ? Vt : zt) : o === Vt || o === zt ? o = H : o === Ut || o === It ? o = q : (o = H, r = void 0);
    const f = o === H && e[h + 1].startsWith("/>") ? " " : "";
    n += o === q ? c + He : p >= 0 ? (i.push(u), c.slice(0, p) + oe + c.slice(p) + O + f) : c + O + (p === -2 ? h : f);
  }
  return [le(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class J {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, c = this.parts, [u, v] = Le(t, s);
    if (this.el = J.createElement(u, i), N.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = N.nextNode()) !== null && c.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(oe)) {
          const g = v[o++], f = r.getAttribute(p).split(O), b = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: n, name: b[2], strings: f, ctor: b[1] === "." ? Be : b[1] === "?" ? Re : b[1] === "@" ? Ue : lt }), r.removeAttribute(p);
        } else p.startsWith(O) && (c.push({ type: 6, index: n }), r.removeAttribute(p));
        if (ce.test(r.tagName)) {
          const p = r.textContent.split(O), g = p.length - 1;
          if (g > 0) {
            r.textContent = nt ? nt.emptyScript : "";
            for (let f = 0; f < g; f++) r.append(p[f], F()), N.nextNode(), c.push({ type: 2, index: ++n });
            r.append(p[g], F());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ae) c.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(O, p + 1)) !== -1; ) c.push({ type: 7, index: n }), p += O.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = Z.createElement("template");
    return i.innerHTML = t, i;
  }
}
function I(e, t, s = e, i) {
  var o, h;
  if (t === B) return t;
  let r = i !== void 0 ? (o = s._$Co) == null ? void 0 : o[i] : s._$Cl;
  const n = G(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== n && ((h = r == null ? void 0 : r._$AO) == null || h.call(r, !1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = r : s._$Cl = r), r !== void 0 && (t = I(e, r._$AS(e, t.values), r, i)), t;
}
class Ze {
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
    const { el: { content: s }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? Z).importNode(s, !0);
    N.currentNode = r;
    let n = N.nextNode(), o = 0, h = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let u;
        c.type === 2 ? u = new X(n, n.nextSibling, this, t) : c.type === 1 ? u = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (u = new Ie(n, this, t)), this._$AV.push(u), c = i[++h];
      }
      o !== (c == null ? void 0 : c.index) && (n = N.nextNode(), o++);
    }
    return N.currentNode = Z, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class X {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, r) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = I(this, t, s), G(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== B && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== l && G(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = J.createElement(le(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === r) this._$AH.p(s);
    else {
      const o = new Ze(r, this), h = o.u(this.options);
      o.p(s), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = jt.get(t.strings);
    return s === void 0 && jt.set(t.strings, s = new J(t)), s;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new X(this.O(F()), this.O(F()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const r = Bt(t).nextSibling;
      Bt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class lt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, r, n) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = l;
  }
  _$AI(t, s = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = I(this, t, s, 0), o = !G(t) || t !== this._$AH && t !== B, o && (this._$AH = t);
    else {
      const h = t;
      let c, u;
      for (t = n[0], c = 0; c < n.length - 1; c++) u = I(this, h[i + c], s, c), u === B && (u = this._$AH[c]), o || (o = !G(u) || u !== this._$AH[c]), u === l ? t = l : t !== l && (t += (u ?? "") + n[c + 1]), this._$AH[c] = u;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Be extends lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class Re extends lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class Ue extends lt {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = I(this, t, s, 0) ?? l) === B) return;
    const i = this._$AH, r = t === l && i !== l || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== l && (i === l || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ie {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const vt = K.litHtmlPolyfillSupport;
vt == null || vt(J, X), (K.litHtmlVersions ?? (K.litHtmlVersions = [])).push("3.3.3");
const ze = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = r = new X(t.insertBefore(F(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis;
let A = class extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ze(s, this.renderRoot, this.renderOptions);
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
    return B;
  }
};
var re;
A._$litElement$ = !0, A.finalized = !0, (re = L.litElementHydrateSupport) == null || re.call(L, { LitElement: A });
const gt = L.litElementPolyfillSupport;
gt == null || gt({ LitElement: A });
(L.litElementVersions ?? (L.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: $t }, je = (e = Ve, t, s) => {
  const { kind: i, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(h) {
      const c = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, c, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, e, h), h;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(h) {
      const c = this[o];
      t.call(this, h), this.requestUpdate(o, c, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function R(e) {
  return (t, s) => typeof s == "object" ? je(e, t, s) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function j(e) {
  return R({ ...e, state: !0, attribute: !1 });
}
const De = {
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
    vent: "Vent"
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
}, qe = {
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
    tyres_ok: "Tyre problem"
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
}, E = {
  off: "Off",
  l1: "Low",
  l2: "Medium",
  l3: "High"
}, We = {
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
    seat_heat_l: E,
    seat_heat_r: E,
    seat_heat_lr: E,
    seat_heat_rr: E,
    seat_vent_l: E,
    seat_vent_r: E,
    seat_vent_lr: E,
    seat_vent_rr: E
  }
}, xt = "carlinko";
let Dt = !1, st;
function Ke(e) {
  const [t, s] = e.split(".", 2), i = De[t];
  return (i == null ? void 0 : i[s]) ?? e;
}
function he(e, t) {
  var i;
  const s = (i = e == null ? void 0 : e.localize) == null ? void 0 : i.call(e, t);
  if (!(typeof s != "string" || !s.trim()) && !(s === t || s.startsWith("component.carlinko.")))
    return s;
}
function d(e, t) {
  return Ke(t);
}
function m(e, t, s) {
  var n;
  const i = `component.${xt}.entity.${t}.${s}.name`, r = he(e, i);
  return r || (((n = qe[t]) == null ? void 0 : n[s]) ?? s);
}
function Ct(e, t, s, i) {
  var h, c;
  if (!i)
    return "—";
  const r = i.toLowerCase(), n = `component.${xt}.entity.${t}.${s}.state.${r}`, o = he(e, n);
  return o || (((c = (h = We[t]) == null ? void 0 : h[s]) == null ? void 0 : c[r]) ?? i);
}
function Fe(e, t) {
  const s = d(e, "status.hv_prefix"), i = Ct(
    e,
    "sensor",
    "hv_state",
    t || "unknown"
  );
  return `${s} ${i}`;
}
async function At(e) {
  return !(e != null && e.loadBackendTranslation) || Dt ? !1 : (st || (st = e.loadBackendTranslation("entity", xt).then(() => (Dt = !0, !0)).catch((t) => (console.warn("carlinko-card: failed to load entity translations", t), st = void 0, !1))), st);
}
const qt = "carlinko";
function Ge(e, t) {
  if (e.translation_key === t)
    return !0;
  const s = e.unique_id;
  if (s && (s === t || s.endsWith(`_${t}`) || s.startsWith("carlinko_") && s.endsWith(`_${t}`)))
    return !0;
  const i = e.entity_id.split(".", 2)[1] ?? "";
  return i === t || i.endsWith(`_${t}`);
}
function Je(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function Ye(e, t) {
  return !!(t && e.states[t]);
}
function Qe(e) {
  return !!(e.disabled_by || e.hidden_by || e.hidden);
}
function Xe(e, t, s, i) {
  const r = e.entities;
  if (!r)
    return;
  const n = [];
  for (const c of Object.values(r)) {
    if (!(c != null && c.entity_id) || c.device_id !== t || Qe(c))
      continue;
    const u = c.entity_id.split(".", 1)[0];
    i.includes(u) && Ge(c, s) && n.push(c);
  }
  if (n.length === 0)
    return;
  const o = [...n].sort((c, u) => {
    const v = c.platform === qt ? 0 : 1, p = u.platform === qt ? 0 : 1;
    return v - p;
  });
  return (o.find((c) => Ye(e, c.entity_id)) ?? o[0]).entity_id;
}
function ts(e, t, s) {
  var o, h;
  if (!e)
    return;
  const i = (o = t.entities) == null ? void 0 : o[s.slot];
  if (i)
    return i;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const r = (h = t.device_id) == null ? void 0 : h.trim();
  if (!r)
    return;
  const n = [s.key, ...s.fallbackKeys ?? []];
  for (const c of n) {
    const u = Je(s.domain, c), v = Xe(e, r, c, u);
    if (v)
      return v;
  }
}
function es(e, t, s) {
  const i = {};
  for (const r of s)
    i[r.slot] = ts(e, t, r);
  return i;
}
function St(e, t, s) {
  if (e === t)
    return !1;
  if (!e || !t)
    return !0;
  for (const i of s)
    if (i && e.states[i] !== t.states[i])
      return !0;
  return !1;
}
class Et {
  invalidate() {
    this._map = void 0, this._deviceId = void 0, this._imageEntity = void 0, this._entitiesJson = void 0, this._entitiesRef = void 0;
  }
  /** Last resolved map, if any (for shouldUpdate without re-resolve). */
  peek() {
    return this._map;
  }
  get(t, s, i) {
    const r = s.device_id ?? "", n = s.image_entity ?? "", o = JSON.stringify(s.entities ?? null), h = t == null ? void 0 : t.entities;
    return this._map && this._deviceId === r && this._imageEntity === n && this._entitiesJson === o && this._entitiesRef === h ? this._map : (this._map = es(t, s, i), this._deviceId = r, this._imageEntity = n, this._entitiesJson = o, this._entitiesRef = h, this._map);
  }
}
const ss = [
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
], is = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], rs = [
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
function D(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function y(e, t) {
  var s;
  return (s = D(e, t)) == null ? void 0 : s.state;
}
function ot(e, t) {
  const s = y(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const i = Number(s);
  return Number.isFinite(i) ? i : void 0;
}
function Y(e, t) {
  const s = y(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function de(e, t) {
  const s = y(e, t);
  return s === "ac" || s === "dc";
}
function ns(e, t) {
  const s = D(e, t);
  if (!s)
    return !1;
  const i = s.state === "on";
  return s.attributes.device_class === "problem" ? i : !i;
}
function ue(e, t, s) {
  return ns(e, t) ? "danger" : y(e, s) === "check_tyres" ? "warn" : "ok";
}
function x(e, t, s = "—") {
  const i = D(e, t);
  if (!i || i.state === "unknown" || i.state === "unavailable")
    return s;
  const r = i.attributes.unit_of_measurement;
  return r ? `${i.state} ${r}` : String(i.state);
}
function os(e, t, s = "—") {
  const i = ot(e, t);
  if (i === void 0 || i < 0)
    return s;
  const r = Math.round(i), n = Math.floor(r / 60), o = r % 60;
  return n <= 0 ? `${o}m` : o <= 0 ? `${n}h` : `${n}h ${o}m`;
}
function ft(e, t) {
  if (/^https?:\/\//i.test(t))
    return t;
  try {
    const s = e == null ? void 0 : e.hassUrl;
    if (typeof s == "function")
      return s(t);
    if (typeof s == "string" && s) {
      const i = s.replace(/\/$/, "");
      return t.startsWith("/") ? `${i}${t}` : `${i}/${t}`;
    }
  } catch (s) {
    console.warn("carlinko-card: withHassBase failed", s);
  }
  return t;
}
function pe(e, t) {
  const s = D(e, t);
  if (!s)
    return;
  const i = s.attributes.entity_picture;
  if (typeof i == "string" && i)
    return ft(e, i);
  const r = s.attributes.access_token;
  return typeof r == "string" && r ? ft(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(r)}`
  ) : ft(e, `/api/image_proxy/${t}`);
}
async function k(e, t, s, i, r = {}) {
  await e.callService(t, s, { ...r, entity_id: i });
}
async function as(e, t) {
  await k(e, "lock", "lock", t);
}
async function cs(e, t) {
  await k(e, "lock", "unlock", t);
}
async function Wt(e, t) {
  const s = t.split(".", 1)[0];
  await k(e, s, "turn_on", t);
}
async function Kt(e, t) {
  const s = t.split(".", 1)[0];
  await k(e, s, "turn_off", t);
}
async function ls(e, t) {
  const s = t.split(".", 1)[0];
  await k(e, s, "toggle", t);
}
async function _t(e, t) {
  await k(e, "cover", "open_cover", t);
}
async function mt(e, t) {
  await k(e, "cover", "close_cover", t);
}
function Ft(e, t) {
  const s = y(e, t);
  return s === "open" || s === "opening";
}
async function P(e, t) {
  await k(e, "button", "press", t);
}
function tt(e, t, s) {
  const i = D(e, t);
  if (!i)
    return;
  const r = i.attributes[s];
  if (r == null)
    return;
  const n = Number(r);
  return Number.isFinite(n) ? n : void 0;
}
function Gt(e, t) {
  return tt(e, t, "temperature");
}
function hs(e, t) {
  return tt(e, t, "current_temperature");
}
function ds(e, t) {
  return tt(e, t, "target_temp_step") ?? 1;
}
function us(e, t) {
  return tt(e, t, "min_temp") ?? 16;
}
function ps(e, t) {
  return tt(e, t, "max_temp") ?? 30;
}
function Jt(e, t) {
  const s = y(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function vs(e, t, s) {
  await k(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function gs(e, t, s) {
  await k(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function fs(e, t, s) {
  await k(e, "select", "select_option", t, {
    option: s
  });
}
function _s(e, t) {
  const s = D(e, t), i = s == null ? void 0 : s.attributes.options;
  return Array.isArray(i) ? i.map(String) : [];
}
function C(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
const Ot = w`
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
`, ve = w`
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
`, ge = w`
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
  .action.icon svg {
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
`, ms = w`
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
  .hotspot svg {
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
    .hotspot svg {
      width: 18px;
      height: 18px;
    }
  }
`, bs = w`
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
  .hlevel-secondary {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ck-text);
  }
  .hlevel-meta {
    font-size: 0.75rem;
    color: var(--ck-muted);
  }
`, ys = w`
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
`, ws = w`
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
    width: 22px;
    height: 22px;
    display: block;
  }
`, $s = w`
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
  .actions .action.with-icon svg {
    width: 14px;
    height: 14px;
    display: block;
    flex-shrink: 0;
  }
`;
function Yt(e, t, s, i, r) {
  if (!t || !i || !t.states[i])
    return l;
  let n = x(t, i);
  return a`
    <button
      type="button"
      class="metric"
      @click=${() => C(e, i)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${n}</span>
    </button>
  `;
}
function _(e) {
  const t = e.variant || "", s = !!(e.icon && e.showLabel), i = !!(e.icon && !e.showLabel), r = [
    "action",
    t,
    i ? "icon" : "",
    s ? "with-icon" : ""
  ].filter(Boolean).join(" ");
  return a`
    <button
      type="button"
      class=${r}
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${e.icon ?? l}${s || !e.icon ? e.label : l}
    </button>
  `;
}
const ks = {
  lock: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
      />
    </svg>
  `,
  unlock: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
      />
    </svg>
  `,
  engine: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
      />
    </svg>
  `,
  defog: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
      />
    </svg>
  `,
  trunk: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
      />
    </svg>
  `,
  charge: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
      />
    </svg>
  `,
  signal: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4.2-3.2 1.4 1.4a4 4 0 0 1 5.6 0l1.4-1.4a6 6 0 0 0-8.4 0Zm-2.8-2.8 1.4 1.4a8 8 0 0 1 11.2 0l1.4-1.4a10 10 0 0 0-14 0Z"
      />
    </svg>
  `,
  hv: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.92 2.01C18.72 1.42 18.16 1 17.5 1h-11c-.66 0-1.21.42-1.42 1.01L3 8v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8l-2.08-5.99ZM6.5 15c-.83 0-1.5-.67-1.5-1.5S5.67 12 6.5 12s1.5.67 1.5 1.5S7.33 15 6.5 15Zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5ZM5 7l1.5-4.5h11L19 7H5Zm8.5 1.5-4 6h2V18l4-6h-2V8.5Z"
      />
    </svg>
  `,
  tyre: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8Zm0 2.5A5.5 5.5 0 0 0 6.5 12 5.5 5.5 0 0 0 12 17.5 5.5 5.5 0 0 0 17.5 12 5.5 5.5 0 0 0 12 6.5Zm0 2A3.5 3.5 0 0 1 15.5 12 3.5 3.5 0 0 1 12 15.5 3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5Z"
      />
    </svg>
  `
};
function bt(e) {
  const t = e.tone ?? "muted";
  return a`
    <button
      type="button"
      class="hotspot tone-${t}"
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${ks[e.icon]}
    </button>
  `;
}
function Qt(e) {
  const { percent: t, primary: s, secondary: i, meta: r } = e;
  if (t === void 0 && !s && !i && !r)
    return l;
  const n = e.tone ?? "ok", o = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t));
  return a`
    <div class="hlevel tone-${n}">
      ${s ? a`<div class="hlevel-primary">${s}</div>` : l}
      ${o !== void 0 ? a`<div class="hlevel-pct">${Math.round(o)}%</div>` : l}
      <div
        class="hlevel-bar-wrap"
        aria-hidden=${o === void 0 ? "true" : "false"}
      >
        ${o !== void 0 ? a`<div class="hlevel-bar" style="width:${o}%"></div>` : l}
      </div>
      ${i || r ? a`<div class="hlevel-details">
            ${i ? a`<span class="hlevel-secondary">${i}</span>` : l}
            ${r ? a`<span class="hlevel-meta">${r}</span>` : l}
          </div>` : l}
    </div>
  `;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xs = { ATTRIBUTE: 1 }, Cs = (e) => (...t) => ({ _$litDirective$: e, values: t });
let As = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, i) {
    this._$Ct = t, this._$AM = s, this._$Ci = i;
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
const fe = "important", Ss = " !" + fe, Es = Cs(class extends As {
  constructor(e) {
    var t;
    if (super(e), e.type !== xs.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, s) => {
      const i = e[s];
      return i == null ? t : t + `${s = s.includes("-") ? s : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(e, [t]) {
    const { style: s } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? s.removeProperty(i) : s[i] = null);
    for (const i in t) {
      const r = t[i];
      if (r != null) {
        this.ft.add(i);
        const n = typeof r == "string" && r.endsWith(Ss);
        i.includes("-") || n ? s.setProperty(i, n ? r.slice(0, -11) : r, n ? fe : "") : s[i] = r;
      }
    }
    return B;
  }
});
function Os(e) {
  const { percent: t, onClick: s } = e, i = e.socLabel ?? "SoC";
  if (t === void 0 && !s)
    return l;
  const r = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), n = r === void 0 ? 0 : Math.round(r), o = r !== void 0 ? `${n}% ${i}` : i, h = r !== void 0 ? Es({ "--ck-soc-pct": `${n}%` }) : l, c = a`
    <div
      class="soc-ring-meter ${r === void 0 ? "empty" : ""}"
      style=${h}
      aria-hidden="true"
    ></div>
    <div class="soc-ring-center">
      ${r !== void 0 ? a`<span class="soc-ring-pct">${n}%</span>` : a`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">${i}</span>
    </div>
  `;
  return s ? a`
      <button
        type="button"
        class="soc-ring"
        aria-label=${o}
        @click=${s}
      >
        ${c}
      </button>
    ` : a`<div class="soc-ring">${c}</div>`;
}
function Ms(e) {
  const t = e.charging ?? !1, s = e.batteryLabel ?? "Battery", i = e.chargingLabel ?? "charging", r = e.percent === void 0 || Number.isNaN(e.percent) ? void 0 : Math.max(0, Math.min(100, e.percent));
  return a`
    <div
      class="charge-power ${t ? "is-charging" : "is-idle"}"
      role="img"
      aria-label=${t ? `${i}${r !== void 0 ? `, ${s} ${Math.round(r)}%` : ""}` : `${i}: off`}
    >
      <svg class="charge-power-bolt" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"
        />
      </svg>
    </div>
  `;
}
var Ts = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, _e = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Hs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ts(t, s, r), r;
};
let at = class extends A {
  render() {
    const e = !!this.src;
    return a`
      <div class="wrap ${e ? "has-img" : ""}">
        ${e ? a`<img class="car-img" src=${this.src} alt="Vehicle top" />` : a`
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
at.styles = w`
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
    .wrap.has-img {
      aspect-ratio: auto;
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
_e([
  R({ type: String })
], at.prototype, "src", 2);
at = _e([
  T("carlinko-car-outline")
], at);
var Ps = Object.defineProperty, Ns = Object.getOwnPropertyDescriptor, me = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ns(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ps(t, s, r), r;
};
let ct = class extends A {
  render() {
    const e = !!this.src;
    return a`
      <div class="wrap ${e ? "has-img" : ""}">
        ${e ? a`<img class="car-img" src=${this.src} alt="Vehicle" />` : a`<div class="placeholder"><slot name="placeholder">No image</slot></div>`}
        <div class="region headline"><slot name="headline"></slot></div>
        <div class="region online"><slot name="online"></slot></div>
        <div class="region hv"><slot name="hv"></slot></div>
        <div class="region tyres"><slot name="tyres"></slot></div>
      </div>
    `;
  }
};
ct.styles = w`
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
me([
  R({ type: String })
], ct.prototype, "src", 2);
ct = me([
  T("carlinko-vehicle-stage")
], ct);
var Ls = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, Mt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Zs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ls(t, s, r), r;
};
function Bs(e, t) {
  const s = (t || "unknown").toLowerCase(), i = Fe(e, s);
  switch (s) {
    case "ready":
      return { label: i, tone: "ok" };
    case "lv":
      return { label: i, tone: "info" };
    case "off":
      return { label: i, tone: "muted" };
    default:
      return { label: i, tone: "warn" };
  }
}
let Q = class extends A {
  constructor() {
    super(...arguments), this._slotCache = new Et();
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
      title: d(void 0, "stub.overview")
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
      return s ? St(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && At(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, ss) : {};
  }
  render() {
    var Ht;
    if (!this._config)
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((Ht = this._config.device_id) != null && Ht.trim()))
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = pe(this.hass, e.image), s = Y(this.hass, e.engine), i = Y(this.hass, e.online), r = ot(this.hass, e.battery), n = ot(this.hass, e.fuel), o = e.odometer && this.hass.states[e.odometer] ? x(this.hass, e.odometer) : void 0, h = e.total_range && this.hass.states[e.total_range] ? x(this.hass, e.total_range) : void 0, c = s && e.engine && e.speed && this.hass.states[e.speed] ? x(this.hass, e.speed) : void 0, u = e.range && this.hass.states[e.range] ? x(this.hass, e.range) : void 0, v = e.fuel_range && this.hass.states[e.fuel_range] ? x(this.hass, e.fuel_range) : void 0, p = y(this.hass, e.hv_state), g = e.hv_state ? Bs(this.hass, p) : void 0, f = e.consumption && this.hass.states[e.consumption] ? x(this.hass, e.consumption) : void 0, b = e.fuel_consumption && this.hass.states[e.fuel_consumption] ? x(this.hass, e.fuel_consumption) : void 0, S = !!(o || h || c), $ = e.tyres_ok || e.tyre_status ? ue(this.hass, e.tyres_ok, e.tyre_status) : void 0, $e = $ === "danger" ? m(this.hass, "binary_sensor", "tyres_ok") : $ === "warn" ? Ct(this.hass, "sensor", "tyre_status", "check_tyres") : d(this.hass, "status.tyres_ok"), Tt = e.tyres_ok ?? e.tyre_status;
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${t}>
              ${S ? a`<div slot="headline" class="headline">
                    ${o ? a`<button
                          type="button"
                          class="odo"
                          @click=${() => C(this, e.odometer)}
                        >
                          <span class="odo-label"
                            >${m(
      this.hass,
      "sensor",
      "odometer"
    )}</span
                          >
                          <span class="odo-value">${o}</span>
                        </button>` : l}
                    ${h ? a`<button
                          type="button"
                          class="range-total"
                          @click=${() => C(this, e.total_range)}
                        >
                          <span class="range-label"
                            >${m(
      this.hass,
      "sensor",
      "total_range"
    )}</span
                          >
                          <span class="range-value">${h}</span>
                        </button>` : l}
                    ${c ? a`<button
                          type="button"
                          class="speed"
                          @click=${() => C(this, e.speed)}
                        >
                          <span class="speed-label"
                            >${m(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${c}</span>
                        </button>` : l}
                  </div>` : l}
              ${e.online ? a`<div slot="online">
                    ${bt({
      icon: "signal",
      label: i ? m(this.hass, "binary_sensor", "online") : d(this.hass, "status.offline"),
      tone: i ? "ok" : "muted",
      onClick: () => C(this, e.online)
    })}
                  </div>` : l}
              ${e.hv_state && g ? a`<div slot="hv">
                    ${bt({
      icon: "hv",
      label: g.label,
      tone: g.tone,
      onClick: () => C(this, e.hv_state)
    })}
                  </div>` : l}
              ${$ && Tt ? a`<div slot="tyres">
                    ${bt({
      icon: "tyre",
      label: $e,
      tone: $,
      onClick: () => C(this, Tt)
    })}
                  </div>` : l}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${Qt({
      percent: r,
      primary: r !== void 0 || u ? d(this.hass, "status.soc") : void 0,
      secondary: u,
      meta: f,
      tone: "ok"
    })}
              ${Qt({
      percent: n,
      primary: n !== void 0 || v ? m(this.hass, "sensor", "fuel") : void 0,
      secondary: v,
      meta: b,
      tone: "info"
    })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Q.styles = [
  Ot,
  ms,
  bs,
  w`
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
Mt([
  R({ attribute: !1 })
], Q.prototype, "hass", 2);
Mt([
  j()
], Q.prototype, "_config", 2);
Q = Mt([
  T("carlinko-overview")
], Q);
var Rs = Object.defineProperty, be = (e, t, s, i) => {
  for (var r = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(t, s, r) || r);
  return r && Rs(t, s, r), r;
};
const Us = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, ye = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class et extends A {
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
        label: d(this.hass, "editor.device"),
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: d(this.hass, "editor.title"),
        selector: { text: {} }
      },
      ...this.extraSchema().map((t) => {
        if (t.name !== "image_entity" || t.label)
          return t;
        const s = t === ye;
        return {
          ...t,
          label: d(
            this.hass,
            s ? "editor.top_image_override" : "editor.image_override"
          )
        };
      })
    ];
  }
  _valueChanged(t) {
    var i;
    t.stopPropagation();
    const s = (i = t.detail) == null ? void 0 : i.value;
    s && (this._config = { ...s }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? l : (this._cachedSchema ?? (this._cachedSchema = this._buildSchema()), a`
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
be([
  R({ attribute: !1 })
], et.prototype, "hass");
be([
  j()
], et.prototype, "_config");
var Is = Object.getOwnPropertyDescriptor, zs = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Is(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let Xt = class extends et {
  extraSchema() {
    return [Us];
  }
};
Xt = zs([
  T("carlinko-overview-editor")
], Xt);
async function we(e, t, s, i) {
  if (e())
    return !1;
  t(!0);
  try {
    return await s(), !0;
  } catch (r) {
    return i == null || i(r), !1;
  } finally {
    t(!1);
  }
}
var Vs = Object.defineProperty, js = Object.getOwnPropertyDescriptor, ht = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? js(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Vs(t, s, r), r;
};
const Ds = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
  </svg>
`;
let z = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._slotCache = new Et();
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
      title: d(void 0, "stub.charging")
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
      return s ? St(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && At(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, is) : {};
  }
  _run(e) {
    this.hass && we(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-charging action failed", t)
    );
  }
  _metaRow(e, t, s, i) {
    var r;
    return !s || !((r = this.hass) != null && r.states[s]) ? l : a`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => C(this, s)}
      >
        <span class="charge-meta-label">${e}:</span>
        <span class="charge-meta-value${i ? ` ${i}` : ""}"
          >${t}</span
        >
      </button>
    `;
  }
  render() {
    var $;
    if (!this._config)
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!(($ = this._config.device_id) != null && $.trim()))
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = Y(this.hass, e.charging), s = ot(this.hass, e.battery), i = !!(e.battery && this.hass.states[e.battery]), r = !!(e.charging && this.hass.states[e.charging]), n = !!(e.charge_power && this.hass.states[e.charge_power]), o = !!(e.charge_remaining && this.hass.states[e.charge_remaining]), h = e.charge_state && this.hass.states[e.charge_state] || e.charge_mode && this.hass.states[e.charge_mode], c = !!(e.charge_stop && this.hass.states[e.charge_stop]) && de(this.hass, e.charge_mode), u = i || r || n || o, v = t ? m(this.hass, "binary_sensor", "charging") : d(this.hass, "status.not_charging"), p = t ? "ok" : "muted", g = x(this.hass, e.charge_power), f = os(this.hass, e.charge_remaining), b = m(this.hass, "sensor", "battery"), S = d(this.hass, "status.soc");
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${u ? a`
                <div class="charge-hero">
                  ${i ? Os({
      percent: s,
      socLabel: S,
      onClick: () => C(this, e.battery)
    }) : l}
                  ${i ? a`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${Ms({
      percent: s,
      charging: t,
      batteryLabel: b,
      chargingLabel: m(
        this.hass,
        "binary_sensor",
        "charging"
      )
    })}` : l}
                  <div class="charge-hero-meta">
                    ${r ? this._metaRow(
      d(this.hass, "status.plugged"),
      v,
      e.charging,
      p
    ) : l}
                    ${n ? this._metaRow(
      d(this.hass, "status.power"),
      g,
      e.charge_power
    ) : l}
                    ${o ? this._metaRow(
      d(this.hass, "status.time"),
      f,
      e.charge_remaining
    ) : l}
                  </div>
                </div>
              ` : l}
          ${h ? a`
                <div class="charge-secondary">
                  ${Yt(
      this,
      this.hass,
      m(this.hass, "sensor", "charge_state"),
      e.charge_state
    )}
                  ${Yt(
      this,
      this.hass,
      d(this.hass, "status.mode"),
      e.charge_mode
    )}
                </div>
              ` : l}
        </div>
        ${c ? a`
              <div class="actions">
                ${_({
      label: m(this.hass, "button", "charge_stop"),
      icon: Ds,
      showLabel: !0,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => P(this.hass, e.charge_stop))
    })}
              </div>
            ` : l}
      </ha-card>
    `;
  }
};
z.styles = [
  Ot,
  ve,
  ge,
  ys,
  ws,
  $s
];
ht([
  R({ attribute: !1 })
], z.prototype, "hass", 2);
ht([
  j()
], z.prototype, "_config", 2);
ht([
  j()
], z.prototype, "_busy", 2);
z = ht([
  T("carlinko-charging")
], z);
var qs = Object.getOwnPropertyDescriptor, Ws = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? qs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let te = class extends et {
};
te = Ws([
  T("carlinko-charging-editor")
], te);
var Ks = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, dt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Fs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ks(t, s, r), r;
};
const ee = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], Gs = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Js = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"], Ys = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`, Qs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`, Xs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`, ti = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`, se = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`, ei = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4.5-5.5c-1.4 0-2.6.8-3.2 2A3.5 3.5 0 0 1 16 11.5c0 .2 0 .4-.05.6 1.3.5 2.3 1.7 2.3 3.1 0 1.9-1.6 3.4-3.5 3.4-.7 0-1.35-.2-1.9-.55A3.5 3.5 0 0 1 12 20.5a3.5 3.5 0 0 1-.85-6.85A3.5 3.5 0 0 1 8.25 18c-1.9 0-3.5-1.5-3.5-3.4 0-1.4 1-2.6 2.3-3.1A3.5 3.5 0 0 1 7 11.5c0-1.6 1.1-3 2.7-3.4A3.48 3.48 0 0 1 6.5 5.5C4.6 5.5 3 7 3 8.9c0 1.4 1 2.6 2.3 3.1A3.5 3.5 0 0 1 8 8.5c.7 0 1.35.2 1.9.55A3.5 3.5 0 0 1 12 3.5c.9 0 1.75.35 2.4.95A3.48 3.48 0 0 1 16.5 5.5c1.9 0 3.5 1.5 3.5 3.4 0 1.4-1 2.6-2.3 3.1.05-.2.05-.4.05-.6A3.5 3.5 0 0 1 16.5 5.5Z"
    />
  </svg>
`, si = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`, ii = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`, ri = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`, ni = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`, oi = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`, ai = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`, ci = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
    />
  </svg>
`, li = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
    />
  </svg>
`, hi = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
    />
  </svg>
`, di = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
    />
  </svg>
`, ui = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
    />
  </svg>
`, pi = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
    />
  </svg>
`, vi = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9.5 3a6.5 6.5 0 0 1 5.2 10.4l4.45 4.45-1.4 1.4-4.45-4.45A6.5 6.5 0 1 1 9.5 3Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
    />
  </svg>
`;
function gi(e) {
  return e.split(".", 1)[0];
}
let V = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._slotCache = new Et();
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
      title: d(void 0, "stub.cabin")
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
      return s ? St(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && At(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, rs) : {};
  }
  _run(e) {
    this.hass && we(
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
    const s = Gt(this.hass, t);
    if (s === void 0)
      return;
    const i = ds(this.hass, t), r = us(this.hass, t), n = ps(this.hass, t), o = Math.min(n, Math.max(r, s + e * i));
    this._run(() => gs(this.hass, t, o));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = Jt(this.hass, e);
    this._run(
      () => vs(this.hass, e, t ? "off" : "cool")
    );
  }
  _cycleSelect(e) {
    if (!this.hass)
      return;
    const t = _s(this.hass, e);
    if (t.length === 0)
      return;
    const s = y(this.hass, e) ?? t[0], i = t.indexOf(s), r = t[(i + 1) % t.length];
    this._run(() => fs(this.hass, e, r));
  }
  _toggleBinary(e) {
    if (!this.hass)
      return;
    const t = y(this.hass, e) === "on";
    this._run(
      () => t ? Kt(this.hass, e) : Wt(this.hass, e)
    );
  }
  _hasDirectTpms(e) {
    return this.hass ? Js.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(e) {
    return this.hass ? ee.some((t) => {
      const s = t.heat ? e[t.heat] : void 0, i = t.vent ? e[t.vent] : void 0;
      return s && this.hass.states[s] || i && this.hass.states[i];
    }) : !1;
  }
  _seatControl(e, t, s) {
    var u;
    if (!e || !t || !((u = this.hass) != null && u.states[e]))
      return l;
    const i = y(this.hass, e), r = gi(e), n = s === "H" ? "heat" : "vent", o = s === "H" ? d(this.hass, "status.heat") : d(this.hass, "status.vent"), h = Ct(this.hass, "select", t, i), c = r === "select" ? () => this._cycleSelect(e) : () => this._toggleBinary(e);
    return a`
      <button
        type="button"
        class="seat-btn ${n}"
        ?disabled=${this._busy}
        title=${`${o}: ${h}`}
        aria-label=${`${o}: ${h}`}
        @click=${c}
      >
        ${s === "H" ? se : ei}
        <span class="seat-state">${h}</span>
      </button>
    `;
  }
  _seatZone(e, t) {
    var r, n;
    const s = e.heat ? t[e.heat] : void 0, i = e.vent ? t[e.vent] : void 0;
    return (!s || !((r = this.hass) != null && r.states[s])) && (!i || !((n = this.hass) != null && n.states[i])) ? l : a`
      <div slot=${e.slot} class="seat-zone">
        ${this._seatControl(s, e.heat, "H")}
        ${this._seatControl(i, e.vent, "V")}
      </div>
    `;
  }
  _sensorBtn(e, t) {
    if (!this.hass || !e || !this.hass.states[e])
      return l;
    const s = x(this.hass, e);
    return a`
      <button
        type="button"
        class=${t}
        @click=${() => C(this, e)}
      >
        ${s}
      </button>
    `;
  }
  _wheelZone(e, t) {
    var h, c;
    const s = t[e.pressure], i = t[e.temp], r = !!(s && ((h = this.hass) != null && h.states[s])), n = !!(i && ((c = this.hass) != null && c.states[i]));
    if (!r && !n)
      return l;
    const o = ue(this.hass, t.tyres_ok, t.tyre_status);
    return a`
      <div slot=${e.slot} class="wheel-zone tone-${o}">
        ${this._sensorBtn(s, "wheel-pressure")}
        ${this._sensorBtn(i, "wheel-temp")}
      </div>
    `;
  }
  _entityExists(e) {
    var t;
    return !!(e && ((t = this.hass) != null && t.states[e]));
  }
  _hasWindowsControls(e) {
    return this._entityExists(e.windows) || this._entityExists(e.windows_vent) || this._entityExists(e.sunroof) || this._entityExists(e.sunroof_tilt);
  }
  _chargerConnected(e) {
    return de(this.hass, e.charge_mode);
  }
  _hasBodyControls(e) {
    return this._entityExists(e.lock) || this._entityExists(e.engine) || this._entityExists(e.find) || this._entityExists(e.defog) || this._entityExists(e.charge_stop) && this._chargerConnected(e) || this._entityExists(e.trunk);
  }
  _bodyActions(e) {
    const t = e.lock, s = e.engine, i = e.find, r = e.defog, n = e.charge_stop, o = e.trunk, h = this._chargerConnected(e), c = this._entityExists(n) && h, u = this._entityExists(s), v = this._entityExists(i);
    if (!t && !u && !v && !r && !c && !o)
      return l;
    const g = y(this.hass, t) === "locked", f = Y(this.hass, s), b = Y(this.hass, r), S = !!(r != null && r.startsWith("binary_sensor.")), $ = y(this.hass, o) === "open";
    return a`
      ${u || v ? a`<div slot="engine" class="map-actions">
            ${u ? _({
      label: f ? d(this.hass, "action.engine_off") : d(this.hass, "action.engine_on"),
      icon: pi,
      disabled: this._busy,
      variant: f ? "ok" : "danger",
      onClick: () => this._run(
        () => f ? Kt(this.hass, s) : Wt(this.hass, s)
      )
    }) : l}
            ${v ? _({
      label: m(this.hass, "button", "find"),
      icon: vi,
      disabled: this._busy,
      onClick: () => this._run(() => P(this.hass, i))
    }) : l}
          </div>` : l}
      ${this._entityExists(t) ? a`<div slot="lock" class="map-actions">
            ${_({
      label: g ? d(this.hass, "action.unlock_doors") : d(this.hass, "action.lock_doors"),
      icon: g ? ci : li,
      disabled: this._busy,
      variant: g ? "ok" : "danger",
      onClick: () => this._run(
        () => g ? cs(this.hass, t) : as(this.hass, t)
      )
    })}
          </div>` : l}
      ${this._entityExists(r) ? a`<div slot="defog" class="map-actions">
            ${_({
      label: b ? d(this.hass, "action.defog_off") : d(this.hass, "action.defog_on"),
      icon: hi,
      disabled: this._busy || S,
      variant: b ? "danger" : "",
      onClick: () => this._run(() => ls(this.hass, r))
    })}
          </div>` : l}
      ${c ? a`<div slot="charge" class="map-actions">
            ${_({
      label: m(this.hass, "button", "charge_stop"),
      icon: di,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => P(this.hass, n))
    })}
          </div>` : l}
      ${this._entityExists(o) ? a`<div slot="trunk" class="map-actions">
            ${_({
      label: $ ? d(this.hass, "action.close_trunk") : d(this.hass, "action.open_trunk"),
      icon: ui,
      disabled: this._busy,
      variant: $ ? "danger" : "ok",
      onClick: () => this._run(
        () => $ ? mt(this.hass, o) : _t(this.hass, o)
      )
    })}
          </div>` : l}
    `;
  }
  _windowsCluster(e) {
    const t = e.windows, s = e.windows_vent, i = this._entityExists(t), r = this._entityExists(s);
    if (!i && !r)
      return l;
    const n = i && Ft(this.hass, t);
    return a`
      <div slot="windows" class="map-actions map-actions-stack">
        ${i ? _(n ? {
      label: d(this.hass, "action.close_windows"),
      icon: ii,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => mt(this.hass, t))
    } : {
      label: d(this.hass, "action.open_windows"),
      icon: si,
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => _t(this.hass, t))
    }) : l}
        ${r ? _({
      label: d(this.hass, "action.vent_windows"),
      icon: ri,
      disabled: this._busy,
      onClick: () => this._run(() => P(this.hass, s))
    }) : l}
      </div>
    `;
  }
  _sunroofCluster(e) {
    const t = e.sunroof, s = e.sunroof_tilt, i = this._entityExists(t), r = this._entityExists(s);
    if (!i && !r)
      return l;
    const n = i && Ft(this.hass, t);
    return a`
      <div slot="sunroof" class="map-actions">
        ${i ? _(n ? {
      label: d(this.hass, "action.close_sunroof"),
      icon: oi,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => mt(this.hass, t))
    } : {
      label: d(this.hass, "action.open_sunroof"),
      icon: ni,
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => _t(this.hass, t))
    }) : l}
        ${r ? _({
      label: d(this.hass, "action.tilt_sunroof"),
      icon: ai,
      disabled: this._busy,
      onClick: () => this._run(() => P(this.hass, s))
    }) : l}
      </div>
    `;
  }
  render() {
    var b;
    if (!this._config)
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((b = this._config.device_id) != null && b.trim()))
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, i = Jt(this.hass, t), r = Gt(this.hass, t), n = hs(this.hass, t), o = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), h = this._hasSeats(e), c = this._hasDirectTpms(e), u = this._hasWindowsControls(e), v = this._hasBodyControls(e), p = pe(this.hass, e.image), g = h || c || u || v, f = !!(s || e.quick_cool && this.hass.states[e.quick_cool] || e.quick_heat && this.hass.states[e.quick_heat]);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${f ? a`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? a`
                          ${_({
      label: i ? d(this.hass, "climate.off") : d(this.hass, "climate.on"),
      icon: Ys,
      disabled: this._busy,
      variant: i ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${_({
      label: d(this.hass, "climate.increase_temp"),
      icon: Qs,
      disabled: this._busy || r === void 0,
      variant: "heat",
      onClick: () => this._nudgeTemp(1)
    })}
                          <span
                            class="setpoint-value"
                            title=${d(this.hass, "climate.setpoint")}
                            >${r !== void 0 ? `${r}${o}` : "—"}</span
                          >
                          ${_({
      label: d(this.hass, "climate.decrease_temp"),
      icon: Xs,
      disabled: this._busy || r === void 0,
      variant: "cool",
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : l}
                  </div>
                  <div class="controls-right">
                    ${e.quick_cool && this.hass.states[e.quick_cool] ? _({
      label: m(this.hass, "button", "quick_cool"),
      icon: ti,
      disabled: this._busy,
      variant: "cool",
      onClick: () => this._run(
        () => P(this.hass, e.quick_cool)
      )
    }) : l}
                    ${e.quick_heat && this.hass.states[e.quick_heat] ? _({
      label: m(this.hass, "button", "quick_heat"),
      icon: se,
      disabled: this._busy,
      variant: "heat",
      onClick: () => this._run(
        () => P(this.hass, e.quick_heat)
      )
    }) : l}
                  </div>
                </div>
              ` : l}
          ${s && n !== void 0 ? a`
                <div class="current-row">
                  <span class="metric-label"
                    >${d(this.hass, "climate.current")}</span
                  >
                  <span class="metric-value">${n}${o}</span>
                </div>
              ` : l}
          ${g ? a`
                <carlinko-car-outline .src=${p}>
                  ${this._bodyActions(e)} ${this._windowsCluster(e)}
                  ${this._sunroofCluster(e)}
                  ${ee.map((S) => this._seatZone(S, e))}
                  ${c ? Gs.map((S) => this._wheelZone(S, e)) : l}
                </carlinko-car-outline>
              ` : l}
        </div>
      </ha-card>
    `;
  }
};
V.styles = [
  Ot,
  ve,
  ge,
  w`
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
      .seat-zone,
      .wheel-zone {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .wheel-zone {
        gap: 2px;
        align-items: flex-start;
      }
      .seat-btn,
      .wheel-pressure,
      .wheel-temp {
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
      .seat-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 5px 8px;
        font-size: 0.8rem;
      }
      .seat-btn svg {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .seat-btn.heat {
        border-color: var(--ck-seat-heat);
        color: var(--ck-seat-heat);
      }
      .seat-btn.vent {
        border-color: var(--ck-seat-vent);
        color: var(--ck-seat-vent);
      }
      .seat-btn .seat-state {
        color: var(--ck-text);
        font-size: 0.72rem;
        white-space: nowrap;
        line-height: 1.1;
      }
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
      }
      .wheel-zone.tone-ok .wheel-pressure,
      .wheel-zone.tone-ok .wheel-temp {
        border-color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-ok .wheel-pressure {
        color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-warn .wheel-pressure,
      .wheel-zone.tone-warn .wheel-temp {
        border-color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-warn .wheel-pressure {
        color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-danger .wheel-pressure,
      .wheel-zone.tone-danger .wheel-temp {
        border-color: var(--ck-tyre-danger);
      }
      .wheel-zone.tone-danger .wheel-pressure {
        color: var(--ck-tyre-danger);
      }
      .seat-btn:hover:not(:disabled),
      .wheel-pressure:hover,
      .wheel-temp:hover {
        background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
        border-color: currentColor;
      }
      .seat-btn:disabled {
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
      .map-actions .action.icon svg {
        width: 1.35rem;
        height: 1.35rem;
      }
      carlinko-car-outline {
        margin-top: 12px;
        max-width: 320px;
      }
      @container ck-card (max-width: 360px) {
        .seat-btn {
          padding: 4px 6px;
          font-size: 0.7rem;
          gap: 2px;
        }
        .seat-btn svg {
          width: 0.85rem;
          height: 0.85rem;
        }
        .wheel-pressure,
        .wheel-temp {
          padding: 3px 5px;
          font-size: 0.65rem;
        }
        .map-actions .action.icon {
          width: 2.1rem;
          height: 2.1rem;
          min-width: 2.1rem;
        }
        .map-actions .action.icon svg {
          width: 1.15rem;
          height: 1.15rem;
        }
        carlinko-car-outline {
          max-width: 100%;
        }
      }
    `
];
dt([
  R({ attribute: !1 })
], V.prototype, "hass", 2);
dt([
  j()
], V.prototype, "_config", 2);
dt([
  j()
], V.prototype, "_busy", 2);
V = dt([
  T("carlinko-cabin")
], V);
var fi = Object.getOwnPropertyDescriptor, _i = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? fi(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let ie = class extends et {
  extraSchema() {
    return [ye];
  }
};
ie = _i([
  T("carlinko-cabin-editor")
], ie);
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
  "%c CARLINKO-CARD %c 0.1.6 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
