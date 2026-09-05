/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, yt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = Symbol(), Mt = /* @__PURE__ */ new WeakMap();
let se = class {
  constructor(t, s, r) {
    if (this._$cssResult$ = !0, r !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (yt && t === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (t = Mt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Mt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const we = (e) => new se(typeof e == "string" ? e : e + "", void 0, wt), w = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[n + 1], e[0]);
  return new se(s, e, wt);
}, $e = (e, t) => {
  if (yt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), i = st.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, e.appendChild(r);
  }
}, Ht = yt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return we(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ke, defineProperty: xe, getOwnPropertyDescriptor: Ce, getOwnPropertyNames: Ae, getOwnPropertySymbols: Se, getPrototypeOf: Ee } = Object, O = globalThis, Tt = O.trustedTypes, Oe = Tt ? Tt.emptyScript : "", ut = O.reactiveElementPolyfillSupport, q = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Oe : null;
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
} }, $t = (e, t) => !ke(e, t), Pt = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), O.litPropertyMetadata ?? (O.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Pt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, s);
      i !== void 0 && xe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, r) {
    const { get: i, set: n } = Ce(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: i, set(o) {
      const h = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, h, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const t = Ee(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const s = this.properties, r = [...Ae(s), ...Se(s)];
      for (const i of r) this.createProperty(i, s[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [r, i] of s) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const i = this._$Eu(s, r);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) s.unshift(Ht(i));
    } else t !== void 0 && s.push(Ht(t));
    return s;
  }
  static _$Eu(t, s) {
    const r = s.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const r of s.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $e(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var r;
      return (r = s.hostConnected) == null ? void 0 : r.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var r;
      return (r = s.hostDisconnected) == null ? void 0 : r.call(s);
    });
  }
  attributeChangedCallback(t, s, r) {
    this._$AK(t, r);
  }
  _$ET(t, s) {
    var n;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : rt).toAttribute(s, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = r.getPropertyOptions(i), c = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : rt;
      this._$Em = i;
      const u = c.fromAttribute(s, h.type);
      this[i] = u ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, s, r, i = !1, n) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (i === !1 && (n = this[t]), r ?? (r = h.getPropertyOptions(t)), !((r.hasChanged ?? $t)(n, s) || r.useDefault && r.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, r)))) return;
      this.C(t, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? s ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (s = void 0), this._$AL.set(t, s)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: h } = o, c = this[n];
        h !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
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
    (s = this._$EO) == null || s.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[q("elementProperties")] = /* @__PURE__ */ new Map(), R[q("finalized")] = /* @__PURE__ */ new Map(), ut == null || ut({ ReactiveElement: R }), (O.reactiveElementVersions ?? (O.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, Nt = (e) => e, it = W.trustedTypes, Lt = it ? it.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, re = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + E, Me = `<${ie}>`, L = document, K = () => L.createComment(""), F = (e) => e === null || typeof e != "object" && typeof e != "function", kt = Array.isArray, He = (e) => kt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Zt = /-->/g, Bt = />/g, H = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rt = /'/g, Ut = /"/g, ne = /^(?:script|style|textarea|title)$/i, Te = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), a = Te(1), Z = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), It = /* @__PURE__ */ new WeakMap(), P = L.createTreeWalker(L, 129);
function oe(e, t) {
  if (!kt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lt !== void 0 ? Lt.createHTML(t) : t;
}
const Pe = (e, t) => {
  const s = e.length - 1, r = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = D;
  for (let h = 0; h < s; h++) {
    const c = e[h];
    let u, v, p = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, v = o.exec(c), v !== null); ) g = o.lastIndex, o === D ? v[1] === "!--" ? o = Zt : v[1] !== void 0 ? o = Bt : v[2] !== void 0 ? (ne.test(v[2]) && (i = RegExp("</" + v[2], "g")), o = H) : v[3] !== void 0 && (o = H) : o === H ? v[0] === ">" ? (o = i ?? D, p = -1) : v[1] === void 0 ? p = -2 : (p = o.lastIndex - v[2].length, u = v[1], o = v[3] === void 0 ? H : v[3] === '"' ? Ut : Rt) : o === Ut || o === Rt ? o = H : o === Zt || o === Bt ? o = D : (o = H, i = void 0);
    const f = o === H && e[h + 1].startsWith("/>") ? " " : "";
    n += o === D ? c + Me : p >= 0 ? (r.push(u), c.slice(0, p) + re + c.slice(p) + E + f) : c + E + (p === -2 ? h : f);
  }
  return [oe(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class G {
  constructor({ strings: t, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, c = this.parts, [u, v] = Pe(t, s);
    if (this.el = G.createElement(u, r), P.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = P.nextNode()) !== null && c.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(re)) {
          const g = v[o++], f = i.getAttribute(p).split(E), b = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: n, name: b[2], strings: f, ctor: b[1] === "." ? Le : b[1] === "?" ? Ze : b[1] === "@" ? Be : ct }), i.removeAttribute(p);
        } else p.startsWith(E) && (c.push({ type: 6, index: n }), i.removeAttribute(p));
        if (ne.test(i.tagName)) {
          const p = i.textContent.split(E), g = p.length - 1;
          if (g > 0) {
            i.textContent = it ? it.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(p[f], K()), P.nextNode(), c.push({ type: 2, index: ++n });
            i.append(p[g], K());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ie) c.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(E, p + 1)) !== -1; ) c.push({ type: 7, index: n }), p += E.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const r = L.createElement("template");
    return r.innerHTML = t, r;
  }
}
function U(e, t, s = e, r) {
  var o, h;
  if (t === Z) return t;
  let i = r !== void 0 ? (o = s._$Co) == null ? void 0 : o[r] : s._$Cl;
  const n = F(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(e), i._$AT(e, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (t = U(e, i._$AS(e, t.values), i, r)), t;
}
class Ne {
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
    const { el: { content: s }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? L).importNode(s, !0);
    P.currentNode = i;
    let n = P.nextNode(), o = 0, h = 0, c = r[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let u;
        c.type === 2 ? u = new Q(n, n.nextSibling, this, t) : c.type === 1 ? u = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (u = new Re(n, this, t)), this._$AV.push(u), c = r[++h];
      }
      o !== (c == null ? void 0 : c.index) && (n = P.nextNode(), o++);
    }
    return P.currentNode = L, i;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class Q {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, r, i) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = U(this, t, s), F(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== Z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : He(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== l && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(L.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = G.createElement(oe(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(s);
    else {
      const o = new Ne(i, this), h = o.u(this.options);
      o.p(s), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = It.get(t.strings);
    return s === void 0 && It.set(t.strings, s = new G(t)), s;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const n of t) i === s.length ? s.push(r = new Q(this.O(K()), this.O(K()), this, this.options)) : r = s[i], r._$AI(n), i++;
    i < s.length && (this._$AR(r && r._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, s); t !== this._$AB; ) {
      const i = Nt(t).nextSibling;
      Nt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class ct {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, i, n) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = l;
  }
  _$AI(t, s = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = U(this, t, s, 0), o = !F(t) || t !== this._$AH && t !== Z, o && (this._$AH = t);
    else {
      const h = t;
      let c, u;
      for (t = n[0], c = 0; c < n.length - 1; c++) u = U(this, h[r + c], s, c), u === Z && (u = this._$AH[c]), o || (o = !F(u) || u !== this._$AH[c]), u === l ? t = l : t !== l && (t += (u ?? "") + n[c + 1]), this._$AH[c] = u;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Le extends ct {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class Ze extends ct {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class Be extends ct {
  constructor(t, s, r, i, n) {
    super(t, s, r, i, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = U(this, t, s, 0) ?? l) === Z) return;
    const r = this._$AH, i = t === l && r !== l || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== l && (r === l || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Re {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const vt = W.litHtmlPolyfillSupport;
vt == null || vt(G, Q), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.3");
const Ue = (e, t, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new Q(t.insertBefore(K(), n), n, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
let A = class extends R {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ue(s, this.renderRoot, this.renderOptions);
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
    return Z;
  }
};
var ee;
A._$litElement$ = !0, A.finalized = !0, (ee = N.litElementHydrateSupport) == null || ee.call(N, { LitElement: A });
const gt = N.litElementPolyfillSupport;
gt == null || gt({ LitElement: A });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: $t }, ze = (e = Ie, t, s) => {
  const { kind: r, metadata: i } = s;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), r === "accessor") {
    const { name: o } = s;
    return { set(h) {
      const c = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, c, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, e, h), h;
    } };
  }
  if (r === "setter") {
    const { name: o } = s;
    return function(h) {
      const c = this[o];
      t.call(this, h), this.requestUpdate(o, c, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function B(e) {
  return (t, s) => typeof s == "object" ? ze(e, t, s) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function V(e) {
  return B({ ...e, state: !0, attribute: !1 });
}
const Ve = {
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
}, je = {
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
}, De = {
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
  }
}, xt = "carlinko";
let zt = !1, et;
function qe(e) {
  const [t, s] = e.split(".", 2), r = Ve[t];
  return (r == null ? void 0 : r[s]) ?? e;
}
function ae(e, t) {
  var r;
  const s = (r = e == null ? void 0 : e.localize) == null ? void 0 : r.call(e, t);
  if (!(typeof s != "string" || !s.trim()) && !(s === t || s.startsWith("component.carlinko.")))
    return s;
}
function d(e, t) {
  return qe(t);
}
function _(e, t, s) {
  var n;
  const r = `component.${xt}.entity.${t}.${s}.name`, i = ae(e, r);
  return i || (((n = je[t]) == null ? void 0 : n[s]) ?? s);
}
function ce(e, t, s, r) {
  var h, c;
  if (!r)
    return "—";
  const i = r.toLowerCase(), n = `component.${xt}.entity.${t}.${s}.state.${i}`, o = ae(e, n);
  return o || (((c = (h = De[t]) == null ? void 0 : h[s]) == null ? void 0 : c[i]) ?? r);
}
function We(e, t) {
  const s = d(e, "status.hv_prefix"), r = ce(
    e,
    "sensor",
    "hv_state",
    t || "unknown"
  );
  return `${s} ${r}`;
}
async function lt(e) {
  return !(e != null && e.loadBackendTranslation) || zt ? !1 : (et || (et = e.loadBackendTranslation("entity", xt).then(() => (zt = !0, !0)).catch((t) => (console.warn("carlinko-card: failed to load entity translations", t), et = void 0, !1))), et);
}
const Vt = "carlinko";
function Ke(e, t) {
  if (e.translation_key === t)
    return !0;
  const s = e.unique_id;
  if (s && (s === t || s.endsWith(`_${t}`) || s.startsWith("carlinko_") && s.endsWith(`_${t}`)))
    return !0;
  const r = e.entity_id.split(".", 2)[1] ?? "";
  return r === t || r.endsWith(`_${t}`);
}
function Fe(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function Ge(e, t) {
  return !!(t && e.states[t]);
}
function Ye(e) {
  return !!(e.disabled_by || e.hidden_by || e.hidden);
}
function Je(e, t, s, r) {
  const i = e.entities;
  if (!i)
    return;
  const n = [];
  for (const c of Object.values(i)) {
    if (!(c != null && c.entity_id) || c.device_id !== t || Ye(c))
      continue;
    const u = c.entity_id.split(".", 1)[0];
    r.includes(u) && Ke(c, s) && n.push(c);
  }
  if (n.length === 0)
    return;
  const o = [...n].sort((c, u) => {
    const v = c.platform === Vt ? 0 : 1, p = u.platform === Vt ? 0 : 1;
    return v - p;
  });
  return (o.find((c) => Ge(e, c.entity_id)) ?? o[0]).entity_id;
}
function Qe(e, t, s) {
  var o, h;
  if (!e)
    return;
  const r = (o = t.entities) == null ? void 0 : o[s.slot];
  if (r)
    return r;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const i = (h = t.device_id) == null ? void 0 : h.trim();
  if (!i)
    return;
  const n = [s.key, ...s.fallbackKeys ?? []];
  for (const c of n) {
    const u = Fe(s.domain, c), v = Je(e, i, c, u);
    if (v)
      return v;
  }
}
function Ct(e, t, s) {
  const r = {};
  for (const i of s)
    r[i.slot] = Qe(e, t, i);
  return r;
}
const Xe = [
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
], ts = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], es = [
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
function j(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function y(e, t) {
  var s;
  return (s = j(e, t)) == null ? void 0 : s.state;
}
function nt(e, t) {
  const s = y(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const r = Number(s);
  return Number.isFinite(r) ? r : void 0;
}
function Y(e, t) {
  const s = y(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function le(e, t) {
  const s = y(e, t);
  return s === "ac" || s === "dc";
}
function ss(e, t) {
  const s = j(e, t);
  if (!s)
    return !1;
  const r = s.state === "on";
  return s.attributes.device_class === "problem" ? r : !r;
}
function he(e, t, s) {
  return ss(e, t) ? "danger" : y(e, s) === "check_tyres" ? "warn" : "ok";
}
function x(e, t, s = "—") {
  const r = j(e, t);
  if (!r || r.state === "unknown" || r.state === "unavailable")
    return s;
  const i = r.attributes.unit_of_measurement;
  return i ? `${r.state} ${i}` : String(r.state);
}
function rs(e, t, s = "—") {
  const r = nt(e, t);
  if (r === void 0 || r < 0)
    return s;
  const i = Math.round(r), n = Math.floor(i / 60), o = i % 60;
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
      const r = s.replace(/\/$/, "");
      return t.startsWith("/") ? `${r}${t}` : `${r}/${t}`;
    }
  } catch (s) {
    console.warn("carlinko-card: withHassBase failed", s);
  }
  return t;
}
function de(e, t) {
  const s = j(e, t);
  if (!s)
    return;
  const r = s.attributes.entity_picture;
  if (typeof r == "string" && r)
    return ft(e, r);
  const i = s.attributes.access_token;
  return typeof i == "string" && i ? ft(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(i)}`
  ) : ft(e, `/api/image_proxy/${t}`);
}
async function k(e, t, s, r, i = {}) {
  await e.callService(t, s, { ...i, entity_id: r });
}
async function is(e, t) {
  await k(e, "lock", "lock", t);
}
async function ns(e, t) {
  await k(e, "lock", "unlock", t);
}
async function jt(e, t) {
  const s = t.split(".", 1)[0];
  await k(e, s, "turn_on", t);
}
async function Dt(e, t) {
  const s = t.split(".", 1)[0];
  await k(e, s, "turn_off", t);
}
async function os(e, t) {
  const s = t.split(".", 1)[0];
  await k(e, s, "toggle", t);
}
async function mt(e, t) {
  await k(e, "cover", "open_cover", t);
}
async function _t(e, t) {
  await k(e, "cover", "close_cover", t);
}
function qt(e, t) {
  const s = y(e, t);
  return s === "open" || s === "opening";
}
async function T(e, t) {
  await k(e, "button", "press", t);
}
function X(e, t, s) {
  const r = j(e, t);
  if (!r)
    return;
  const i = r.attributes[s];
  if (i == null)
    return;
  const n = Number(i);
  return Number.isFinite(n) ? n : void 0;
}
function Wt(e, t) {
  return X(e, t, "temperature");
}
function as(e, t) {
  return X(e, t, "current_temperature");
}
function cs(e, t) {
  return X(e, t, "target_temp_step") ?? 1;
}
function ls(e, t) {
  return X(e, t, "min_temp") ?? 16;
}
function hs(e, t) {
  return X(e, t, "max_temp") ?? 30;
}
function Kt(e, t) {
  const s = y(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function ds(e, t, s) {
  await k(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function us(e, t, s) {
  await k(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function ps(e, t, s) {
  await k(e, "select", "select_option", t, {
    option: s
  });
}
function vs(e, t) {
  const s = j(e, t), r = s == null ? void 0 : s.attributes.options;
  return Array.isArray(r) ? r.map(String) : [];
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
const At = w`
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
`, ue = w`
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
`, pe = w`
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
`, gs = w`
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
`, fs = w`
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
`, ms = w`
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
`, _s = w`
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
`, bs = w`
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
function Ft(e, t, s, r, i) {
  if (!t || !r || !t.states[r])
    return l;
  let n = x(t, r);
  return a`
    <button
      type="button"
      class="metric"
      @click=${() => C(e, r)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${n}</span>
    </button>
  `;
}
function m(e) {
  const t = e.variant || "", s = !!(e.icon && e.showLabel), r = !!(e.icon && !e.showLabel), i = [
    "action",
    t,
    r ? "icon" : "",
    s ? "with-icon" : ""
  ].filter(Boolean).join(" ");
  return a`
    <button
      type="button"
      class=${i}
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${e.icon ?? l}${s || !e.icon ? e.label : l}
    </button>
  `;
}
const ys = {
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
      ${ys[e.icon]}
    </button>
  `;
}
function Gt(e) {
  const { percent: t, primary: s, secondary: r, meta: i } = e;
  if (t === void 0 && !s && !r && !i)
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
      ${r || i ? a`<div class="hlevel-details">
            ${r ? a`<span class="hlevel-secondary">${r}</span>` : l}
            ${i ? a`<span class="hlevel-meta">${i}</span>` : l}
          </div>` : l}
    </div>
  `;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ws = { ATTRIBUTE: 1 }, $s = (e) => (...t) => ({ _$litDirective$: e, values: t });
let ks = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, r) {
    this._$Ct = t, this._$AM = s, this._$Ci = r;
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
const ve = "important", xs = " !" + ve, Cs = $s(class extends ks {
  constructor(e) {
    var t;
    if (super(e), e.type !== ws.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, s) => {
      const r = e[s];
      return r == null ? t : t + `${s = s.includes("-") ? s : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }, "");
  }
  update(e, [t]) {
    const { style: s } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const r of this.ft) t[r] == null && (this.ft.delete(r), r.includes("-") ? s.removeProperty(r) : s[r] = null);
    for (const r in t) {
      const i = t[r];
      if (i != null) {
        this.ft.add(r);
        const n = typeof i == "string" && i.endsWith(xs);
        r.includes("-") || n ? s.setProperty(r, n ? i.slice(0, -11) : i, n ? ve : "") : s[r] = i;
      }
    }
    return Z;
  }
});
function As(e) {
  const { percent: t, onClick: s } = e, r = e.socLabel ?? "SoC";
  if (t === void 0 && !s)
    return l;
  const i = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), n = i === void 0 ? 0 : Math.round(i), o = i !== void 0 ? `${n}% ${r}` : r, h = i !== void 0 ? Cs({ "--ck-soc-pct": `${n}%` }) : l, c = a`
    <div
      class="soc-ring-meter ${i === void 0 ? "empty" : ""}"
      style=${h}
      aria-hidden="true"
    ></div>
    <div class="soc-ring-center">
      ${i !== void 0 ? a`<span class="soc-ring-pct">${n}%</span>` : a`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">${r}</span>
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
function Ss(e) {
  const t = e.charging ?? !1, s = e.batteryLabel ?? "Battery", r = e.chargingLabel ?? "charging", i = e.percent === void 0 || Number.isNaN(e.percent) ? void 0 : Math.max(0, Math.min(100, e.percent));
  return a`
    <div
      class="charge-power ${t ? "is-charging" : "is-idle"}"
      role="img"
      aria-label=${t ? `${r}${i !== void 0 ? `, ${s} ${Math.round(i)}%` : ""}` : `${r}: off`}
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
var Es = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, ge = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Os(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Es(t, s, i), i;
};
let ot = class extends A {
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
ot.styles = w`
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
ge([
  B({ type: String })
], ot.prototype, "src", 2);
ot = ge([
  M("carlinko-car-outline")
], ot);
var Ms = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, fe = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Hs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Ms(t, s, i), i;
};
let at = class extends A {
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
at.styles = w`
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
fe([
  B({ type: String })
], at.prototype, "src", 2);
at = fe([
  M("carlinko-vehicle-stage")
], at);
var Ts = Object.defineProperty, Ps = Object.getOwnPropertyDescriptor, St = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ps(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Ts(t, s, i), i;
};
function Ns(e, t) {
  const s = (t || "unknown").toLowerCase(), r = We(e, s);
  switch (s) {
    case "ready":
      return { label: r, tone: "ok" };
    case "lv":
      return { label: r, tone: "info" };
    case "off":
      return { label: r, tone: "muted" };
    default:
      return { label: r, tone: "warn" };
  }
}
let J = class extends A {
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...e };
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
  updated(e) {
    e.has("hass") && this.hass && lt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? Ct(this.hass, this._config, Xe) : {};
  }
  render() {
    var Ot;
    if (!this._config)
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((Ot = this._config.device_id) != null && Ot.trim()))
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = de(this.hass, e.image), s = Y(this.hass, e.engine), r = Y(this.hass, e.online), i = nt(this.hass, e.battery), n = nt(this.hass, e.fuel), o = e.odometer && this.hass.states[e.odometer] ? x(this.hass, e.odometer) : void 0, h = e.total_range && this.hass.states[e.total_range] ? x(this.hass, e.total_range) : void 0, c = s && e.engine && e.speed && this.hass.states[e.speed] ? x(this.hass, e.speed) : void 0, u = e.range && this.hass.states[e.range] ? x(this.hass, e.range) : void 0, v = e.fuel_range && this.hass.states[e.fuel_range] ? x(this.hass, e.fuel_range) : void 0, p = y(this.hass, e.hv_state), g = e.hv_state ? Ns(this.hass, p) : void 0, f = e.consumption && this.hass.states[e.consumption] ? x(this.hass, e.consumption) : void 0, b = e.fuel_consumption && this.hass.states[e.fuel_consumption] ? x(this.hass, e.fuel_consumption) : void 0, S = !!(o || h || c), $ = e.tyres_ok || e.tyre_status ? he(this.hass, e.tyres_ok, e.tyre_status) : void 0, ye = $ === "danger" ? _(this.hass, "binary_sensor", "tyres_ok") : $ === "warn" ? ce(this.hass, "sensor", "tyre_status", "check_tyres") : d(this.hass, "status.tyres_ok"), Et = e.tyres_ok ?? e.tyre_status;
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
                            >${_(
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
                            >${_(
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
                            >${_(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${c}</span>
                        </button>` : l}
                  </div>` : l}
              ${e.online ? a`<div slot="online">
                    ${bt({
      icon: "signal",
      label: r ? _(this.hass, "binary_sensor", "online") : d(this.hass, "status.offline"),
      tone: r ? "ok" : "muted",
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
              ${$ && Et ? a`<div slot="tyres">
                    ${bt({
      icon: "tyre",
      label: ye,
      tone: $,
      onClick: () => C(this, Et)
    })}
                  </div>` : l}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${Gt({
      percent: i,
      primary: i !== void 0 || u ? d(this.hass, "status.soc") : void 0,
      secondary: u,
      meta: f,
      tone: "ok"
    })}
              ${Gt({
      percent: n,
      primary: n !== void 0 || v ? _(this.hass, "sensor", "fuel") : void 0,
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
J.styles = [
  At,
  gs,
  fs,
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
St([
  B({ attribute: !1 })
], J.prototype, "hass", 2);
St([
  V()
], J.prototype, "_config", 2);
J = St([
  M("carlinko-overview")
], J);
var Ls = Object.defineProperty, me = (e, t, s, r) => {
  for (var i = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = o(t, s, i) || i);
  return i && Ls(t, s, i), i;
};
const Zs = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, _e = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class tt extends A {
  setConfig(t) {
    this._config = { ...t };
  }
  /** Extra fields after device_id + title. */
  extraSchema() {
    return [];
  }
  updated(t) {
    t.has("hass") && this.hass && lt(this.hass).then((s) => {
      s && this.requestUpdate();
    });
  }
  _schema() {
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
        const s = t === _e;
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
    var r;
    t.stopPropagation();
    const s = (r = t.detail) == null ? void 0 : r.value;
    s && (this._config = { ...s }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? l : a`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(t) => t.label || t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
me([
  B({ attribute: !1 })
], tt.prototype, "hass");
me([
  V()
], tt.prototype, "_config");
var Bs = Object.getOwnPropertyDescriptor, Rs = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Bs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = o(i) || i);
  return i;
};
let Yt = class extends tt {
  extraSchema() {
    return [Zs];
  }
};
Yt = Rs([
  M("carlinko-overview-editor")
], Yt);
async function be(e, t, s, r) {
  if (e())
    return !1;
  t(!0);
  try {
    return await s(), !0;
  } catch (i) {
    return r == null || r(i), !1;
  } finally {
    t(!1);
  }
}
var Us = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, ht = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Is(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Us(t, s, i), i;
};
const zs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
  </svg>
`;
let I = class extends A {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...e };
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
  updated(e) {
    e.has("hass") && this.hass && lt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? Ct(this.hass, this._config, ts) : {};
  }
  _run(e) {
    this.hass && be(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-charging action failed", t)
    );
  }
  _metaRow(e, t, s, r) {
    var i;
    return !s || !((i = this.hass) != null && i.states[s]) ? l : a`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => C(this, s)}
      >
        <span class="charge-meta-label">${e}:</span>
        <span class="charge-meta-value${r ? ` ${r}` : ""}"
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
    const e = this._slots(), t = Y(this.hass, e.charging), s = nt(this.hass, e.battery), r = !!(e.battery && this.hass.states[e.battery]), i = !!(e.charging && this.hass.states[e.charging]), n = !!(e.charge_power && this.hass.states[e.charge_power]), o = !!(e.charge_remaining && this.hass.states[e.charge_remaining]), h = e.charge_state && this.hass.states[e.charge_state] || e.charge_mode && this.hass.states[e.charge_mode], c = !!(e.charge_stop && this.hass.states[e.charge_stop]) && le(this.hass, e.charge_mode), u = r || i || n || o, v = t ? _(this.hass, "binary_sensor", "charging") : d(this.hass, "status.not_charging"), p = t ? "ok" : "muted", g = x(this.hass, e.charge_power), f = rs(this.hass, e.charge_remaining), b = _(this.hass, "sensor", "battery"), S = d(this.hass, "status.soc");
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${u ? a`
                <div class="charge-hero">
                  ${r ? As({
      percent: s,
      socLabel: S,
      onClick: () => C(this, e.battery)
    }) : l}
                  ${r ? a`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${Ss({
      percent: s,
      charging: t,
      batteryLabel: b,
      chargingLabel: _(
        this.hass,
        "binary_sensor",
        "charging"
      )
    })}` : l}
                  <div class="charge-hero-meta">
                    ${i ? this._metaRow(
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
                  ${Ft(
      this,
      this.hass,
      _(this.hass, "sensor", "charge_state"),
      e.charge_state
    )}
                  ${Ft(
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
                ${m({
      label: _(this.hass, "button", "charge_stop"),
      icon: zs,
      showLabel: !0,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => T(this.hass, e.charge_stop))
    })}
              </div>
            ` : l}
      </ha-card>
    `;
  }
};
I.styles = [
  At,
  ue,
  pe,
  ms,
  _s,
  bs
];
ht([
  B({ attribute: !1 })
], I.prototype, "hass", 2);
ht([
  V()
], I.prototype, "_config", 2);
ht([
  V()
], I.prototype, "_busy", 2);
I = ht([
  M("carlinko-charging")
], I);
var Vs = Object.getOwnPropertyDescriptor, js = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Vs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = o(i) || i);
  return i;
};
let Jt = class extends tt {
};
Jt = js([
  M("carlinko-charging-editor")
], Jt);
var Ds = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, dt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? qs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Ds(t, s, i), i;
};
const Qt = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], Ws = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Ks = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"], Fs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`, Gs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`, Ys = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`, Js = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`, Xt = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`, Qs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4.5-5.5c-1.4 0-2.6.8-3.2 2A3.5 3.5 0 0 1 16 11.5c0 .2 0 .4-.05.6 1.3.5 2.3 1.7 2.3 3.1 0 1.9-1.6 3.4-3.5 3.4-.7 0-1.35-.2-1.9-.55A3.5 3.5 0 0 1 12 20.5a3.5 3.5 0 0 1-.85-6.85A3.5 3.5 0 0 1 8.25 18c-1.9 0-3.5-1.5-3.5-3.4 0-1.4 1-2.6 2.3-3.1A3.5 3.5 0 0 1 7 11.5c0-1.6 1.1-3 2.7-3.4A3.48 3.48 0 0 1 6.5 5.5C4.6 5.5 3 7 3 8.9c0 1.4 1 2.6 2.3 3.1A3.5 3.5 0 0 1 8 8.5c.7 0 1.35.2 1.9.55A3.5 3.5 0 0 1 12 3.5c.9 0 1.75.35 2.4.95A3.48 3.48 0 0 1 16.5 5.5c1.9 0 3.5 1.5 3.5 3.4 0 1.4-1 2.6-2.3 3.1.05-.2.05-.4.05-.6A3.5 3.5 0 0 1 16.5 5.5Z"
    />
  </svg>
`, Xs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`, tr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`, er = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`, sr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`, rr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`, ir = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`, nr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
    />
  </svg>
`, or = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
    />
  </svg>
`, ar = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
    />
  </svg>
`, cr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
    />
  </svg>
`, lr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
    />
  </svg>
`, hr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
    />
  </svg>
`, dr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9.5 3a6.5 6.5 0 0 1 5.2 10.4l4.45 4.45-1.4 1.4-4.45-4.45A6.5 6.5 0 1 1 9.5 3Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
    />
  </svg>
`;
function ur(e) {
  return e.split(".", 1)[0];
}
function pr(e) {
  return !e || e === "unknown" || e === "unavailable" ? "—" : e === "off" || e === "on" ? e : e.replace(/^level_?/i, "l").slice(0, 4);
}
let z = class extends A {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...e };
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
  updated(e) {
    e.has("hass") && this.hass && lt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? Ct(this.hass, this._config, es) : {};
  }
  _run(e) {
    this.hass && be(
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
    const s = Wt(this.hass, t);
    if (s === void 0)
      return;
    const r = cs(this.hass, t), i = ls(this.hass, t), n = hs(this.hass, t), o = Math.min(n, Math.max(i, s + e * r));
    this._run(() => us(this.hass, t, o));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = Kt(this.hass, e);
    this._run(
      () => ds(this.hass, e, t ? "off" : "cool")
    );
  }
  _cycleSelect(e) {
    if (!this.hass)
      return;
    const t = vs(this.hass, e);
    if (t.length === 0)
      return;
    const s = y(this.hass, e) ?? t[0], r = t.indexOf(s), i = t[(r + 1) % t.length];
    this._run(() => ps(this.hass, e, i));
  }
  _toggleBinary(e) {
    if (!this.hass)
      return;
    const t = y(this.hass, e) === "on";
    this._run(
      () => t ? Dt(this.hass, e) : jt(this.hass, e)
    );
  }
  _hasDirectTpms(e) {
    return this.hass ? Ks.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(e) {
    return this.hass ? Qt.some((t) => {
      const s = t.heat ? e[t.heat] : void 0, r = t.vent ? e[t.vent] : void 0;
      return s && this.hass.states[s] || r && this.hass.states[r];
    }) : !1;
  }
  _seatControl(e, t) {
    var c;
    if (!e || !((c = this.hass) != null && c.states[e]))
      return l;
    const s = y(this.hass, e), r = ur(e), i = t === "H" ? "heat" : "vent", n = t === "H" ? d(this.hass, "status.heat") : d(this.hass, "status.vent"), o = pr(s), h = r === "select" ? () => this._cycleSelect(e) : () => this._toggleBinary(e);
    return a`
      <button
        type="button"
        class="seat-btn ${i}"
        ?disabled=${this._busy}
        title=${`${n}: ${s ?? "—"}`}
        aria-label=${`${n}: ${s ?? "—"}`}
        @click=${h}
      >
        ${t === "H" ? Xt : Qs}
        <span class="seat-state">${o}</span>
      </button>
    `;
  }
  _seatZone(e, t) {
    var i, n;
    const s = e.heat ? t[e.heat] : void 0, r = e.vent ? t[e.vent] : void 0;
    return (!s || !((i = this.hass) != null && i.states[s])) && (!r || !((n = this.hass) != null && n.states[r])) ? l : a`
      <div slot=${e.slot} class="seat-zone">
        ${this._seatControl(s, "H")} ${this._seatControl(r, "V")}
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
    const s = t[e.pressure], r = t[e.temp], i = !!(s && ((h = this.hass) != null && h.states[s])), n = !!(r && ((c = this.hass) != null && c.states[r]));
    if (!i && !n)
      return l;
    const o = he(this.hass, t.tyres_ok, t.tyre_status);
    return a`
      <div slot=${e.slot} class="wheel-zone tone-${o}">
        ${this._sensorBtn(s, "wheel-pressure")}
        ${this._sensorBtn(r, "wheel-temp")}
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
    return le(this.hass, e.charge_mode);
  }
  _hasBodyControls(e) {
    return this._entityExists(e.lock) || this._entityExists(e.engine) || this._entityExists(e.find) || this._entityExists(e.defog) || this._entityExists(e.charge_stop) && this._chargerConnected(e) || this._entityExists(e.trunk);
  }
  _bodyActions(e) {
    const t = e.lock, s = e.engine, r = e.find, i = e.defog, n = e.charge_stop, o = e.trunk, h = this._chargerConnected(e), c = this._entityExists(n) && h, u = this._entityExists(s), v = this._entityExists(r);
    if (!t && !u && !v && !i && !c && !o)
      return l;
    const g = y(this.hass, t) === "locked", f = Y(this.hass, s), b = Y(this.hass, i), S = !!(i != null && i.startsWith("binary_sensor.")), $ = y(this.hass, o) === "open";
    return a`
      ${u || v ? a`<div slot="engine" class="map-actions">
            ${u ? m({
      label: f ? d(this.hass, "action.engine_off") : d(this.hass, "action.engine_on"),
      icon: hr,
      disabled: this._busy,
      variant: f ? "ok" : "danger",
      onClick: () => this._run(
        () => f ? Dt(this.hass, s) : jt(this.hass, s)
      )
    }) : l}
            ${v ? m({
      label: _(this.hass, "button", "find"),
      icon: dr,
      disabled: this._busy,
      onClick: () => this._run(() => T(this.hass, r))
    }) : l}
          </div>` : l}
      ${this._entityExists(t) ? a`<div slot="lock" class="map-actions">
            ${m({
      label: g ? d(this.hass, "action.unlock_doors") : d(this.hass, "action.lock_doors"),
      icon: g ? nr : or,
      disabled: this._busy,
      variant: g ? "ok" : "danger",
      onClick: () => this._run(
        () => g ? ns(this.hass, t) : is(this.hass, t)
      )
    })}
          </div>` : l}
      ${this._entityExists(i) ? a`<div slot="defog" class="map-actions">
            ${m({
      label: b ? d(this.hass, "action.defog_off") : d(this.hass, "action.defog_on"),
      icon: ar,
      disabled: this._busy || S,
      variant: b ? "danger" : "",
      onClick: () => this._run(() => os(this.hass, i))
    })}
          </div>` : l}
      ${c ? a`<div slot="charge" class="map-actions">
            ${m({
      label: _(this.hass, "button", "charge_stop"),
      icon: cr,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => T(this.hass, n))
    })}
          </div>` : l}
      ${this._entityExists(o) ? a`<div slot="trunk" class="map-actions">
            ${m({
      label: $ ? d(this.hass, "action.close_trunk") : d(this.hass, "action.open_trunk"),
      icon: lr,
      disabled: this._busy,
      variant: $ ? "danger" : "ok",
      onClick: () => this._run(
        () => $ ? _t(this.hass, o) : mt(this.hass, o)
      )
    })}
          </div>` : l}
    `;
  }
  _windowsCluster(e) {
    const t = e.windows, s = e.windows_vent, r = this._entityExists(t), i = this._entityExists(s);
    if (!r && !i)
      return l;
    const n = r && qt(this.hass, t);
    return a`
      <div slot="windows" class="map-actions map-actions-stack">
        ${r ? m(n ? {
      label: d(this.hass, "action.close_windows"),
      icon: tr,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => _t(this.hass, t))
    } : {
      label: d(this.hass, "action.open_windows"),
      icon: Xs,
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => mt(this.hass, t))
    }) : l}
        ${i ? m({
      label: d(this.hass, "action.vent_windows"),
      icon: er,
      disabled: this._busy,
      onClick: () => this._run(() => T(this.hass, s))
    }) : l}
      </div>
    `;
  }
  _sunroofCluster(e) {
    const t = e.sunroof, s = e.sunroof_tilt, r = this._entityExists(t), i = this._entityExists(s);
    if (!r && !i)
      return l;
    const n = r && qt(this.hass, t);
    return a`
      <div slot="sunroof" class="map-actions">
        ${r ? m(n ? {
      label: d(this.hass, "action.close_sunroof"),
      icon: rr,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => _t(this.hass, t))
    } : {
      label: d(this.hass, "action.open_sunroof"),
      icon: sr,
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => mt(this.hass, t))
    }) : l}
        ${i ? m({
      label: d(this.hass, "action.tilt_sunroof"),
      icon: ir,
      disabled: this._busy,
      onClick: () => this._run(() => T(this.hass, s))
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
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, r = Kt(this.hass, t), i = Wt(this.hass, t), n = as(this.hass, t), o = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), h = this._hasSeats(e), c = this._hasDirectTpms(e), u = this._hasWindowsControls(e), v = this._hasBodyControls(e), p = de(this.hass, e.image), g = h || c || u || v, f = !!(s || e.quick_cool && this.hass.states[e.quick_cool] || e.quick_heat && this.hass.states[e.quick_heat]);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${f ? a`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? a`
                          ${m({
      label: r ? d(this.hass, "climate.off") : d(this.hass, "climate.on"),
      icon: Fs,
      disabled: this._busy,
      variant: r ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${m({
      label: d(this.hass, "climate.increase_temp"),
      icon: Gs,
      disabled: this._busy || i === void 0,
      variant: "heat",
      onClick: () => this._nudgeTemp(1)
    })}
                          <span
                            class="setpoint-value"
                            title=${d(this.hass, "climate.setpoint")}
                            >${i !== void 0 ? `${i}${o}` : "—"}</span
                          >
                          ${m({
      label: d(this.hass, "climate.decrease_temp"),
      icon: Ys,
      disabled: this._busy || i === void 0,
      variant: "cool",
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : l}
                  </div>
                  <div class="controls-right">
                    ${e.quick_cool && this.hass.states[e.quick_cool] ? m({
      label: _(this.hass, "button", "quick_cool"),
      icon: Js,
      disabled: this._busy,
      variant: "cool",
      onClick: () => this._run(
        () => T(this.hass, e.quick_cool)
      )
    }) : l}
                    ${e.quick_heat && this.hass.states[e.quick_heat] ? m({
      label: _(this.hass, "button", "quick_heat"),
      icon: Xt,
      disabled: this._busy,
      variant: "heat",
      onClick: () => this._run(
        () => T(this.hass, e.quick_heat)
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
                  ${Qt.map((S) => this._seatZone(S, e))}
                  ${c ? Ws.map((S) => this._wheelZone(S, e)) : l}
                </carlinko-car-outline>
              ` : l}
        </div>
      </ha-card>
    `;
  }
};
z.styles = [
  At,
  ue,
  pe,
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
  B({ attribute: !1 })
], z.prototype, "hass", 2);
dt([
  V()
], z.prototype, "_config", 2);
dt([
  V()
], z.prototype, "_busy", 2);
z = dt([
  M("carlinko-cabin")
], z);
var vr = Object.getOwnPropertyDescriptor, gr = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? vr(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = o(i) || i);
  return i;
};
let te = class extends tt {
  extraSchema() {
    return [_e];
  }
};
te = gr([
  M("carlinko-cabin-editor")
], te);
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
  "%c CARLINKO-CARD %c 0.1.5 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
