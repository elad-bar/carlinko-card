/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = globalThis, we = re.ShadowRoot && (re.ShadyCSS === void 0 || re.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $e = Symbol(), Te = /* @__PURE__ */ new WeakMap();
let at = class {
  constructor(e, s, r) {
    if (this._$cssResult$ = !0, r !== $e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (we && e === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (e = Te.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Te.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const St = (t) => new at(typeof t == "string" ? t : t + "", void 0, $e), b = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((r, i, o) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[o + 1], t[0]);
  return new at(s, t, $e);
}, Ot = (t, e) => {
  if (we) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const r = document.createElement("style"), i = re.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, t.appendChild(r);
  }
}, Me = we ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const r of e.cssRules) s += r.cssText;
  return St(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: Pt, getOwnPropertyDescriptor: Tt, getOwnPropertyNames: Mt, getOwnPropertySymbols: Ht, getPrototypeOf: Nt } = Object, E = globalThis, He = E.trustedTypes, Lt = He ? He.emptyScript : "", pe = E.reactiveElementPolyfillSupport, W = (t, e) => t, ie = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Lt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, ke = (t, e) => !Et(t, e), Ne = { attribute: !0, type: String, converter: ie, reflect: !1, useDefault: !1, hasChanged: ke };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = Ne) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, s);
      i !== void 0 && Pt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, s, r) {
    const { get: i, set: o } = Tt(this.prototype, e) ?? { get() {
      return this[s];
    }, set(n) {
      this[s] = n;
    } };
    return { get: i, set(n) {
      const c = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ne;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const e = Nt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const s = this.properties, r = [...Mt(s), ...Ht(s)];
      for (const i of r) this.createProperty(i, s[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [r, i] of s) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const i = this._$Eu(s, r);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) s.unshift(Me(i));
    } else e !== void 0 && s.push(Me(e));
    return s;
  }
  static _$Eu(e, s) {
    const r = s.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((s) => s(this));
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const r of s.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ot(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostConnected) == null ? void 0 : r.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostDisconnected) == null ? void 0 : r.call(s);
    });
  }
  attributeChangedCallback(e, s, r) {
    this._$AK(e, r);
  }
  _$ET(e, s) {
    var o;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const n = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : ie).toAttribute(s, r.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var o, n;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const c = r.getPropertyOptions(i), h = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : ie;
      this._$Em = i;
      const u = h.fromAttribute(s, c.type);
      this[i] = u ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, s, r, i = !1, o) {
    var n;
    if (e !== void 0) {
      const c = this.constructor;
      if (i === !1 && (o = this[e]), r ?? (r = c.getPropertyOptions(e)), !((r.hasChanged ?? ke)(o, s) || r.useDefault && r.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(c._$Eu(e, r)))) return;
      this.C(e, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: r, reflect: i, wrapped: o }, n) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? s ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (s = void 0), this._$AL.set(e, s)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: c } = n, h = this[o];
        c !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, n, h);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (r = this._$EO) == null || r.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(s)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[W("elementProperties")] = /* @__PURE__ */ new Map(), U[W("finalized")] = /* @__PURE__ */ new Map(), pe == null || pe({ ReactiveElement: U }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, Le = (t) => t, oe = q.trustedTypes, Ze = oe ? oe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ct = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, lt = "?" + O, Zt = `<${lt}>`, L = document, K = () => L.createComment(""), F = (t) => t === null || typeof t != "object" && typeof t != "function", xe = Array.isArray, Bt = (t) => xe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ve = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Be = /-->/g, Ue = />/g, M = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ze = /'/g, Re = /"/g, ht = /^(?:script|style|textarea|title)$/i, Ut = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), a = Ut(1), Z = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), De = /* @__PURE__ */ new WeakMap(), H = L.createTreeWalker(L, 129);
function dt(t, e) {
  if (!xe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ze !== void 0 ? Ze.createHTML(e) : e;
}
const zt = (t, e) => {
  const s = t.length - 1, r = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = I;
  for (let c = 0; c < s; c++) {
    const h = t[c];
    let u, v, p = -1, g = 0;
    for (; g < h.length && (n.lastIndex = g, v = n.exec(h), v !== null); ) g = n.lastIndex, n === I ? v[1] === "!--" ? n = Be : v[1] !== void 0 ? n = Ue : v[2] !== void 0 ? (ht.test(v[2]) && (i = RegExp("</" + v[2], "g")), n = M) : v[3] !== void 0 && (n = M) : n === M ? v[0] === ">" ? (n = i ?? I, p = -1) : v[1] === void 0 ? p = -2 : (p = n.lastIndex - v[2].length, u = v[1], n = v[3] === void 0 ? M : v[3] === '"' ? Re : ze) : n === Re || n === ze ? n = M : n === Be || n === Ue ? n = I : (n = M, i = void 0);
    const f = n === M && t[c + 1].startsWith("/>") ? " " : "";
    o += n === I ? h + Zt : p >= 0 ? (r.push(u), h.slice(0, p) + ct + h.slice(p) + O + f) : h + O + (p === -2 ? c : f);
  }
  return [dt(t, o + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class G {
  constructor({ strings: e, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const c = e.length - 1, h = this.parts, [u, v] = zt(e, s);
    if (this.el = G.createElement(u, r), H.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = H.nextNode()) !== null && h.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(ct)) {
          const g = v[n++], f = i.getAttribute(p).split(O), $ = /([.?@])?(.*)/.exec(g);
          h.push({ type: 1, index: o, name: $[2], strings: f, ctor: $[1] === "." ? Dt : $[1] === "?" ? Vt : $[1] === "@" ? jt : le }), i.removeAttribute(p);
        } else p.startsWith(O) && (h.push({ type: 6, index: o }), i.removeAttribute(p));
        if (ht.test(i.tagName)) {
          const p = i.textContent.split(O), g = p.length - 1;
          if (g > 0) {
            i.textContent = oe ? oe.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(p[f], K()), H.nextNode(), h.push({ type: 2, index: ++o });
            i.append(p[g], K());
          }
        }
      } else if (i.nodeType === 8) if (i.data === lt) h.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(O, p + 1)) !== -1; ) h.push({ type: 7, index: o }), p += O.length - 1;
      }
      o++;
    }
  }
  static createElement(e, s) {
    const r = L.createElement("template");
    return r.innerHTML = e, r;
  }
}
function R(t, e, s = t, r) {
  var n, c;
  if (e === Z) return e;
  let i = r !== void 0 ? (n = s._$Co) == null ? void 0 : n[r] : s._$Cl;
  const o = F(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), o === void 0 ? i = void 0 : (i = new o(t), i._$AT(t, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (e = R(t, i._$AS(t, e.values), i, r)), e;
}
class Rt {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? L).importNode(s, !0);
    H.currentNode = i;
    let o = H.nextNode(), n = 0, c = 0, h = r[0];
    for (; h !== void 0; ) {
      if (n === h.index) {
        let u;
        h.type === 2 ? u = new X(o, o.nextSibling, this, e) : h.type === 1 ? u = new h.ctor(o, h.name, h.strings, this, e) : h.type === 6 && (u = new It(o, this, e)), this._$AV.push(u), h = r[++c];
      }
      n !== (h == null ? void 0 : h.index) && (o = H.nextNode(), n++);
    }
    return H.currentNode = L, i;
  }
  p(e) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, s), s += r.strings.length - 2) : r._$AI(e[s])), s++;
  }
}
class X {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, r, i) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = R(this, e, s), F(e) ? e === l || e == null || e === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : e !== this._$AH && e !== Z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Bt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== l && F(this._$AH) ? this._$AA.nextSibling.data = e : this.T(L.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: s, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = G.createElement(dt(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(s);
    else {
      const n = new Rt(i, this), c = n.u(this.options);
      n.p(s), this.T(c), this._$AH = n;
    }
  }
  _$AC(e) {
    let s = De.get(e.strings);
    return s === void 0 && De.set(e.strings, s = new G(e)), s;
  }
  k(e) {
    xe(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const o of e) i === s.length ? s.push(r = new X(this.O(K()), this.O(K()), this, this.options)) : r = s[i], r._$AI(o), i++;
    i < s.length && (this._$AR(r && r._$AB.nextSibling, i), s.length = i);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, s); e !== this._$AB; ) {
      const i = Le(e).nextSibling;
      Le(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, r, i, o) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = e, this.name = s, this._$AM = i, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = l;
  }
  _$AI(e, s = this, r, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = R(this, e, s, 0), n = !F(e) || e !== this._$AH && e !== Z, n && (this._$AH = e);
    else {
      const c = e;
      let h, u;
      for (e = o[0], h = 0; h < o.length - 1; h++) u = R(this, c[r + h], s, h), u === Z && (u = this._$AH[h]), n || (n = !F(u) || u !== this._$AH[h]), u === l ? e = l : e !== l && (e += (u ?? "") + o[h + 1]), this._$AH[h] = u;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Dt extends le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === l ? void 0 : e;
  }
}
class Vt extends le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== l);
  }
}
class jt extends le {
  constructor(e, s, r, i, o) {
    super(e, s, r, i, o), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = R(this, e, s, 0) ?? l) === Z) return;
    const r = this._$AH, i = e === l && r !== l || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== l && (r === l || i);
    i && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class It {
  constructor(e, s, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    R(this, e);
  }
}
const ge = q.litHtmlPolyfillSupport;
ge == null || ge(G, X), (q.litHtmlVersions ?? (q.litHtmlVersions = [])).push("3.3.3");
const Wt = (t, e, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const o = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new X(e.insertBefore(K(), o), o, void 0, s ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
let A = class extends U {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild), e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Wt(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return Z;
  }
};
var nt;
A._$litElement$ = !0, A.finalized = !0, (nt = N.litElementHydrateSupport) == null || nt.call(N, { LitElement: A });
const fe = N.litElementPolyfillSupport;
fe == null || fe({ LitElement: A });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = { attribute: !0, type: String, converter: ie, reflect: !1, hasChanged: ke }, Kt = (t = qt, e, s) => {
  const { kind: r, metadata: i } = s;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(s.name, t), r === "accessor") {
    const { name: n } = s;
    return { set(c) {
      const h = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(n, h, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, t, c), c;
    } };
  }
  if (r === "setter") {
    const { name: n } = s;
    return function(c) {
      const h = this[n];
      e.call(this, c), this.requestUpdate(n, h, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function B(t) {
  return (e, s) => typeof s == "object" ? Kt(t, e, s) : ((r, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, r), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function V(t) {
  return B({ ...t, state: !0, attribute: !1 });
}
const Ft = {
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
    cabin: "Cabin",
    climate: "Climate",
    tpms: "TPMS",
    windows: "Windows"
  }
}, Gt = {
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
    quick_heat: "Quick heat"
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
}, Yt = {
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
}, Ce = "carlinko";
let Ve = !1, se;
function Jt(t) {
  const [e, s] = t.split(".", 2), r = Ft[e];
  return (r == null ? void 0 : r[s]) ?? t;
}
function ut(t, e) {
  var r;
  const s = (r = t == null ? void 0 : t.localize) == null ? void 0 : r.call(t, e);
  if (!(typeof s != "string" || !s.trim()) && !(s === e || s.startsWith("component.carlinko.")))
    return s;
}
function d(t, e) {
  return Jt(e);
}
function m(t, e, s) {
  var o;
  const r = `component.${Ce}.entity.${e}.${s}.name`, i = ut(t, r);
  return i || (((o = Gt[e]) == null ? void 0 : o[s]) ?? s);
}
function pt(t, e, s, r) {
  var c, h;
  if (!r)
    return "—";
  const i = r.toLowerCase(), o = `component.${Ce}.entity.${e}.${s}.state.${i}`, n = ut(t, o);
  return n || (((h = (c = Yt[e]) == null ? void 0 : c[s]) == null ? void 0 : h[i]) ?? r);
}
function Qt(t, e) {
  const s = d(t, "status.hv_prefix"), r = pt(
    t,
    "sensor",
    "hv_state",
    e || "unknown"
  );
  return `${s} ${r}`;
}
async function he(t) {
  return !(t != null && t.loadBackendTranslation) || Ve ? !1 : (se || (se = t.loadBackendTranslation("entity", Ce).then(() => (Ve = !0, !0)).catch((e) => (console.warn("carlinko-card: failed to load entity translations", e), se = void 0, !1))), se);
}
function Xt(t, e) {
  return t === e || t.endsWith(`_${e}`) ? !0 : t.startsWith("carlinko_") && t.endsWith(`_${e}`);
}
function es(t, e) {
  return e === "defrost" || e.endsWith("_left") || e.endsWith("_right") ? [t, "switch", "binary_sensor"] : [t];
}
function ts(t, e) {
  return !!(e && t.states[e]);
}
function ss(t, e, s, r) {
  const i = t.entities;
  if (!i)
    return;
  const o = [];
  for (const c of Object.values(i)) {
    if (!(c != null && c.entity_id) || !c.unique_id || c.device_id !== e || c.disabled_by || c.hidden_by)
      continue;
    const h = c.entity_id.split(".", 1)[0];
    r.includes(h) && Xt(c.unique_id, s) && o.push(c.entity_id);
  }
  return o.length === 0 ? void 0 : o.find((c) => ts(t, c)) ?? o[0];
}
function rs(t, e, s) {
  var n, c;
  if (!t)
    return;
  const r = (n = e.entities) == null ? void 0 : n[s.slot];
  if (r)
    return r;
  if (s.slot === "image" && e.image_entity)
    return e.image_entity;
  const i = (c = e.device_id) == null ? void 0 : c.trim();
  if (!i)
    return;
  const o = [s.key, ...s.fallbackKeys ?? []];
  for (const h of o) {
    const u = es(s.domain, h), v = ss(t, i, h, u);
    if (v)
      return v;
  }
}
function Ae(t, e, s) {
  const r = {};
  for (const i of s)
    r[i.slot] = rs(t, e, i);
  return r;
}
const vt = [
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
  { slot: "tyres_ok", key: "tyres_ok", domain: "binary_sensor" },
  { slot: "tyre_status", key: "tyre_status", domain: "sensor" },
  { slot: "engine", key: "engine", domain: "switch" }
];
new Map(
  vt.map((t) => [t.slot, t])
);
const is = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], os = [
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
function j(t, e) {
  if (!(!t || !e))
    return t.states[e];
}
function w(t, e) {
  var s;
  return (s = j(t, e)) == null ? void 0 : s.state;
}
function ne(t, e) {
  const s = w(t, e);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const r = Number(s);
  return Number.isFinite(r) ? r : void 0;
}
function Y(t, e) {
  const s = w(t, e);
  return s === "on" || s === "open" || s === "unlocked";
}
function gt(t, e) {
  const s = w(t, e);
  return s === "ac" || s === "dc";
}
function ns(t, e) {
  const s = j(t, e);
  if (!s)
    return !1;
  const r = s.state === "on";
  return s.attributes.device_class === "problem" ? r : !r;
}
function ft(t, e, s) {
  return ns(t, e) ? "danger" : w(t, s) === "check_tyres" ? "warn" : "ok";
}
function x(t, e, s = "—") {
  const r = j(t, e);
  if (!r || r.state === "unknown" || r.state === "unavailable")
    return s;
  const i = r.attributes.unit_of_measurement;
  return i ? `${r.state} ${i}` : String(r.state);
}
function as(t, e, s = "—") {
  const r = ne(t, e);
  if (r === void 0 || r < 0)
    return s;
  const i = Math.round(r), o = Math.floor(i / 60), n = i % 60;
  return o <= 0 ? `${n}m` : n <= 0 ? `${o}h` : `${o}h ${n}m`;
}
function _e(t, e) {
  if (/^https?:\/\//i.test(e))
    return e;
  const s = ((t == null ? void 0 : t.hassUrl) || "").replace(/\/$/, "");
  return s ? e.startsWith("/") ? `${s}${e}` : `${s}/${e}` : e;
}
function _t(t, e) {
  const s = j(t, e);
  if (!s)
    return;
  const r = s.attributes.entity_picture;
  if (typeof r == "string" && r)
    return _e(t, r);
  const i = s.attributes.access_token;
  return typeof i == "string" && i ? _e(
    t,
    `/api/image_proxy/${e}?token=${encodeURIComponent(i)}`
  ) : _e(t, `/api/image_proxy/${e}`);
}
async function k(t, e, s, r, i = {}) {
  await t.callService(e, s, { ...i, entity_id: r });
}
async function cs(t, e) {
  await k(t, "lock", "lock", e);
}
async function ls(t, e) {
  await k(t, "lock", "unlock", e);
}
async function je(t, e) {
  const s = e.split(".", 1)[0];
  await k(t, s, "turn_on", e);
}
async function Ie(t, e) {
  const s = e.split(".", 1)[0];
  await k(t, s, "turn_off", e);
}
async function hs(t, e) {
  const s = e.split(".", 1)[0];
  await k(t, s, "toggle", e);
}
async function me(t, e) {
  await k(t, "cover", "open_cover", e);
}
async function be(t, e) {
  await k(t, "cover", "close_cover", e);
}
function We(t, e) {
  const s = w(t, e);
  return s === "open" || s === "opening";
}
async function z(t, e) {
  await k(t, "button", "press", e);
}
function ee(t, e, s) {
  const r = j(t, e);
  if (!r)
    return;
  const i = r.attributes[s];
  if (i == null)
    return;
  const o = Number(i);
  return Number.isFinite(o) ? o : void 0;
}
function qe(t, e) {
  return ee(t, e, "temperature");
}
function ds(t, e) {
  return ee(t, e, "current_temperature");
}
function us(t, e) {
  return ee(t, e, "target_temp_step") ?? 1;
}
function ps(t, e) {
  return ee(t, e, "min_temp") ?? 16;
}
function vs(t, e) {
  return ee(t, e, "max_temp") ?? 30;
}
function Ke(t, e) {
  const s = w(t, e);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function gs(t, e, s) {
  await k(t, "climate", "set_hvac_mode", e, {
    hvac_mode: s
  });
}
async function fs(t, e, s) {
  await k(t, "climate", "set_temperature", e, {
    temperature: s
  });
}
async function _s(t, e, s) {
  await k(t, "select", "select_option", e, {
    option: s
  });
}
function ms(t, e) {
  const s = j(t, e), r = s == null ? void 0 : s.attributes.options;
  return Array.isArray(r) ? r.map(String) : [];
}
function C(t, e) {
  t.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    })
  );
}
const Se = b`
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
`, mt = b`
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
`;
b`
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
`;
const bt = b`
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
    border-color: var(--ck-danger);
    color: var(--ck-danger);
  }
`;
b`
  .bar-wrap {
    height: 6px;
    background: var(--ck-track);
    border-radius: 999px;
    overflow: hidden;
    margin: 2px 0 8px;
  }
  .bar {
    height: 100%;
    background: var(--ck-accent);
    border-radius: 999px;
  }
`;
const bs = b`
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
`, ys = b`
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
`, ws = b`
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
`, $s = b`
  .charge-batt {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    flex-shrink: 0;
    color: var(--ck-ok);
  }
  .charge-batt-body {
    position: relative;
    width: 56px;
    height: 28px;
    border: 2.5px solid currentColor;
    border-radius: 4px;
    overflow: hidden;
    background: color-mix(in srgb, var(--ck-bg) 90%, transparent);
  }
  .charge-batt-fill {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: var(--ck-ok);
    opacity: 0.9;
    transition: width 0.25s ease;
  }
  .charge-batt-bolt {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 14px;
    height: 14px;
    color: var(--ck-on-accent);
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.35));
    z-index: 1;
  }
  .charge-batt-cap {
    width: 4px;
    height: 12px;
    border-radius: 0 2px 2px 0;
    background: currentColor;
  }
`, ks = b`
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
function Fe(t, e, s, r, i) {
  if (!e || !r || !e.states[r])
    return l;
  let o = x(e, r);
  return a`
    <button
      type="button"
      class="metric"
      @click=${() => C(t, r)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${o}</span>
    </button>
  `;
}
function _(t) {
  const e = t.variant || "", s = !!(t.icon && t.showLabel), r = !!(t.icon && !t.showLabel), i = [
    "action",
    e,
    r ? "icon" : "",
    s ? "with-icon" : ""
  ].filter(Boolean).join(" ");
  return a`
    <button
      type="button"
      class=${i}
      aria-label=${t.label}
      title=${t.label}
      ?disabled=${t.disabled}
      @click=${t.onClick}
    >
      ${t.icon ?? l}${s || !t.icon ? t.label : l}
    </button>
  `;
}
const xs = {
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
function ye(t) {
  const e = t.tone ?? "muted";
  return a`
    <button
      type="button"
      class="hotspot tone-${e}"
      aria-label=${t.label}
      title=${t.label}
      ?disabled=${t.disabled}
      @click=${t.onClick}
    >
      ${xs[t.icon]}
    </button>
  `;
}
function Ge(t) {
  const { percent: e, primary: s, secondary: r, meta: i } = t;
  if (e === void 0 && !s && !r && !i)
    return l;
  const o = t.tone ?? "ok", n = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e));
  return a`
    <div class="hlevel tone-${o}">
      ${s ? a`<div class="hlevel-primary">${s}</div>` : l}
      ${n !== void 0 ? a`<div class="hlevel-pct">${Math.round(n)}%</div>` : l}
      <div
        class="hlevel-bar-wrap"
        aria-hidden=${n === void 0 ? "true" : "false"}
      >
        ${n !== void 0 ? a`<div class="hlevel-bar" style="width:${n}%"></div>` : l}
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
const Cs = { ATTRIBUTE: 1 }, As = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ss = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, s, r) {
    this._$Ct = e, this._$AM = s, this._$Ci = r;
  }
  _$AS(e, s) {
    return this.update(e, s);
  }
  update(e, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = "important", Os = " !" + yt, Es = As(class extends Ss {
  constructor(t) {
    var e;
    if (super(t), t.type !== Cs.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, s) => {
      const r = t[s];
      return r == null ? e : e + `${s = s.includes("-") ? s : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }, "");
  }
  update(t, [e]) {
    const { style: s } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const r of this.ft) e[r] == null && (this.ft.delete(r), r.includes("-") ? s.removeProperty(r) : s[r] = null);
    for (const r in e) {
      const i = e[r];
      if (i != null) {
        this.ft.add(r);
        const o = typeof i == "string" && i.endsWith(Os);
        r.includes("-") || o ? s.setProperty(r, o ? i.slice(0, -11) : i, o ? yt : "") : s[r] = i;
      }
    }
    return Z;
  }
});
function Ps(t) {
  const { percent: e, onClick: s } = t, r = t.socLabel ?? "SoC";
  if (e === void 0 && !s)
    return l;
  const i = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e)), o = i === void 0 ? 0 : Math.round(i), n = i !== void 0 ? `${o}% ${r}` : r, c = i !== void 0 ? Es({ "--ck-soc-pct": `${o}%` }) : l, h = a`
    <div
      class="soc-ring-meter ${i === void 0 ? "empty" : ""}"
      style=${c}
      aria-hidden="true"
    ></div>
    <div class="soc-ring-center">
      ${i !== void 0 ? a`<span class="soc-ring-pct">${o}%</span>` : a`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">${r}</span>
    </div>
  `;
  return s ? a`
      <button
        type="button"
        class="soc-ring"
        aria-label=${n}
        @click=${s}
      >
        ${h}
      </button>
    ` : a`<div class="soc-ring">${h}</div>`;
}
function Ts(t) {
  const { percent: e } = t, s = t.charging ?? !1, r = t.batteryLabel ?? "Battery", i = t.chargingLabel ?? "charging", o = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e)), n = o === void 0 ? 0 : o;
  return a`
    <div
      class="charge-batt"
      role="img"
      aria-label=${o !== void 0 ? `${r} ${Math.round(o)}%${s ? `, ${i}` : ""}` : r}
    >
      <div class="charge-batt-body">
        ${o !== void 0 ? a`<div
              class="charge-batt-fill"
              style="width:${n}%"
            ></div>` : l}
        ${s ? a`<svg
              class="charge-batt-bolt"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"
              />
            </svg>` : l}
      </div>
      <div class="charge-batt-cap" aria-hidden="true"></div>
    </div>
  `;
}
var Ms = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, wt = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Hs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && Ms(e, s, i), i;
};
let ae = class extends A {
  render() {
    const t = !!this.src;
    return a`
      <div class="wrap ${t ? "has-img" : ""}">
        ${t ? a`<img class="car-img" src=${this.src} alt="Vehicle top" />` : a`
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
ae.styles = b`
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
    .windows {
      left: 1%;
      top: 54%;
      transform: translateX(-50%);
    }
    .sunroof {
      left: 50%;
      top: 54%;
      transform: translateX(-50%);
    }
    /* Body / access: trunk rear, charge rear-left, lock mid-side, defog windshield, engine hood */
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
      left: 4%;
      top: 48%;
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
wt([
  B({ type: String })
], ae.prototype, "src", 2);
ae = wt([
  y("carlinko-car-outline")
], ae);
var Ns = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, $t = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ls(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && Ns(e, s, i), i;
};
let ce = class extends A {
  render() {
    const t = !!this.src;
    return a`
      <div class="wrap ${t ? "has-img" : ""}">
        ${t ? a`<img class="car-img" src=${this.src} alt="Vehicle" />` : a`<div class="placeholder"><slot name="placeholder">No image</slot></div>`}
        <div class="region headline"><slot name="headline"></slot></div>
        <div class="region online"><slot name="online"></slot></div>
        <div class="region hv"><slot name="hv"></slot></div>
        <div class="region tyres"><slot name="tyres"></slot></div>
      </div>
    `;
  }
};
ce.styles = b`
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
    /* Mileage text: top-left (no centered transform) */
    .headline {
      left: 3%;
      top: 6%;
      transform: none;
      max-width: calc(100% - 6%);
    }
    /* Status row: online, HV, tyres — bottom-right */
    .online {
      left: 73%;
      top: 88%;
    }
    .hv {
      left: 84%;
      top: 88%;
    }
    .tyres {
      left: 95%;
      top: 88%;
    }
    @container ck-stage (max-width: 360px) {
      .online {
        left: 68%;
      }
      .hv {
        left: 80%;
      }
      .tyres {
        left: 92%;
      }
    }
  `;
$t([
  B({ type: String })
], ce.prototype, "src", 2);
ce = $t([
  y("carlinko-vehicle-stage")
], ce);
var Zs = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, Oe = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Bs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && Zs(e, s, i), i;
};
function Us(t, e) {
  const s = (e || "unknown").toLowerCase(), r = Qt(t, s);
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
  setConfig(t) {
    if (!t || typeof t.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...t };
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
  updated(t) {
    t.has("hass") && this.hass && he(this.hass).then((e) => {
      e && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? Ae(this.hass, this._config, vt) : {};
  }
  render() {
    var Pe;
    if (!this._config)
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((Pe = this._config.device_id) != null && Pe.trim()))
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const t = this._slots(), e = _t(this.hass, t.image), s = Y(this.hass, t.engine), r = Y(this.hass, t.online), i = ne(this.hass, t.battery), o = ne(this.hass, t.fuel), n = t.odometer && this.hass.states[t.odometer] ? x(this.hass, t.odometer) : void 0, c = t.total_range && this.hass.states[t.total_range] ? x(this.hass, t.total_range) : void 0, h = s && t.engine && t.speed && this.hass.states[t.speed] ? x(this.hass, t.speed) : void 0, u = t.range && this.hass.states[t.range] ? x(this.hass, t.range) : void 0, v = t.fuel_range && this.hass.states[t.fuel_range] ? x(this.hass, t.fuel_range) : void 0, p = w(this.hass, t.hv_state), g = t.hv_state ? Us(this.hass, p) : void 0, f = t.consumption && this.hass.states[t.consumption] ? x(this.hass, t.consumption) : void 0, $ = t.fuel_consumption && this.hass.states[t.fuel_consumption] ? x(this.hass, t.fuel_consumption) : void 0, P = !!(n || c || h), T = t.tyres_ok || t.tyre_status ? ft(this.hass, t.tyres_ok, t.tyre_status) : void 0, At = T === "danger" ? m(this.hass, "binary_sensor", "tyres_ok") : T === "warn" ? pt(this.hass, "sensor", "tyre_status", "check_tyres") : d(this.hass, "status.tyres_ok"), Ee = t.tyres_ok ?? t.tyre_status;
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${e}>
              ${P ? a`<div slot="headline" class="headline">
                    ${n ? a`<button
                          type="button"
                          class="odo"
                          @click=${() => C(this, t.odometer)}
                        >
                          <span class="odo-label"
                            >${m(
      this.hass,
      "sensor",
      "odometer"
    )}</span
                          >
                          <span class="odo-value">${n}</span>
                        </button>` : l}
                    ${c ? a`<button
                          type="button"
                          class="range-total"
                          @click=${() => C(this, t.total_range)}
                        >
                          <span class="range-label"
                            >${m(
      this.hass,
      "sensor",
      "total_range"
    )}</span
                          >
                          <span class="range-value">${c}</span>
                        </button>` : l}
                    ${h ? a`<button
                          type="button"
                          class="speed"
                          @click=${() => C(this, t.speed)}
                        >
                          <span class="speed-label"
                            >${m(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${h}</span>
                        </button>` : l}
                  </div>` : l}
              ${t.online ? a`<div slot="online">
                    ${ye({
      icon: "signal",
      label: r ? m(this.hass, "binary_sensor", "online") : d(this.hass, "status.offline"),
      tone: r ? "ok" : "muted",
      onClick: () => C(this, t.online)
    })}
                  </div>` : l}
              ${t.hv_state && g ? a`<div slot="hv">
                    ${ye({
      icon: "hv",
      label: g.label,
      tone: g.tone,
      onClick: () => C(this, t.hv_state)
    })}
                  </div>` : l}
              ${T && Ee ? a`<div slot="tyres">
                    ${ye({
      icon: "tyre",
      label: At,
      tone: T,
      onClick: () => C(this, Ee)
    })}
                  </div>` : l}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${Ge({
      percent: i,
      primary: i !== void 0 || u ? d(this.hass, "status.soc") : void 0,
      secondary: u,
      meta: f,
      tone: "ok"
    })}
              ${Ge({
      percent: o,
      primary: o !== void 0 || v ? m(this.hass, "sensor", "fuel") : void 0,
      secondary: v,
      meta: $,
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
  Se,
  bs,
  ys,
  b`
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
Oe([
  B({ attribute: !1 })
], J.prototype, "hass", 2);
Oe([
  V()
], J.prototype, "_config", 2);
J = Oe([
  y("carlinko-overview")
], J);
var zs = Object.defineProperty, kt = (t, e, s, r) => {
  for (var i = void 0, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(e, s, i) || i);
  return i && zs(e, s, i), i;
};
const Rs = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, xt = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class te extends A {
  setConfig(e) {
    this._config = { ...e };
  }
  /** Extra fields after device_id + title. */
  extraSchema() {
    return [];
  }
  updated(e) {
    e.has("hass") && this.hass && he(this.hass).then((s) => {
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
      ...this.extraSchema().map((e) => {
        if (e.name !== "image_entity" || e.label)
          return e;
        const s = e === xt;
        return {
          ...e,
          label: d(
            this.hass,
            s ? "editor.top_image_override" : "editor.image_override"
          )
        };
      })
    ];
  }
  _valueChanged(e) {
    var r;
    e.stopPropagation();
    const s = (r = e.detail) == null ? void 0 : r.value;
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
        .computeLabel=${(e) => e.label || e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
kt([
  B({ attribute: !1 })
], te.prototype, "hass");
kt([
  V()
], te.prototype, "_config");
var Ds = Object.getOwnPropertyDescriptor, Vs = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ds(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let Ye = class extends te {
  extraSchema() {
    return [Rs];
  }
};
Ye = Vs([
  y("carlinko-overview-editor")
], Ye);
async function Ct(t, e, s, r) {
  if (t())
    return !1;
  e(!0);
  try {
    return await s(), !0;
  } catch (i) {
    return r == null || r(i), !1;
  } finally {
    e(!1);
  }
}
var js = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, de = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Is(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && js(e, s, i), i;
};
const Ws = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
  </svg>
`;
let D = class extends A {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(t) {
    if (!t || typeof t.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...t };
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
  updated(t) {
    t.has("hass") && this.hass && he(this.hass).then((e) => {
      e && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? Ae(this.hass, this._config, is) : {};
  }
  _run(t) {
    this.hass && Ct(
      () => this._busy,
      (e) => {
        this._busy = e;
      },
      t,
      (e) => console.error("carlinko-charging action failed", e)
    );
  }
  _metaRow(t, e, s, r) {
    var i;
    return !s || !((i = this.hass) != null && i.states[s]) ? l : a`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => C(this, s)}
      >
        <span class="charge-meta-label">${t}:</span>
        <span class="charge-meta-value${r ? ` ${r}` : ""}"
          >${e}</span
        >
      </button>
    `;
  }
  render() {
    var T;
    if (!this._config)
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((T = this._config.device_id) != null && T.trim()))
      return a`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const t = this._slots(), e = Y(this.hass, t.charging), s = ne(this.hass, t.battery), r = !!(t.battery && this.hass.states[t.battery]), i = !!(t.charging && this.hass.states[t.charging]), o = !!(t.charge_power && this.hass.states[t.charge_power]), n = !!(t.charge_remaining && this.hass.states[t.charge_remaining]), c = t.charge_state && this.hass.states[t.charge_state] || t.charge_mode && this.hass.states[t.charge_mode], h = !!(t.charge_stop && this.hass.states[t.charge_stop]) && gt(this.hass, t.charge_mode), u = r || i || o || n, v = e ? m(this.hass, "binary_sensor", "charging") : d(this.hass, "status.not_charging"), p = e ? "ok" : "muted", g = x(this.hass, t.charge_power), f = as(this.hass, t.charge_remaining), $ = m(this.hass, "sensor", "battery"), P = d(this.hass, "status.soc");
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${u ? a`
                <div class="charge-hero">
                  ${r ? Ps({
      percent: s,
      socLabel: P,
      onClick: () => C(this, t.battery)
    }) : l}
                  ${r ? a`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${Ts({
      percent: s,
      charging: e,
      batteryLabel: $,
      chargingLabel: m(
        this.hass,
        "binary_sensor",
        "charging"
      )
    })}` : l}
                  <div class="charge-hero-meta">
                    ${i ? this._metaRow(
      d(this.hass, "status.plugged"),
      v,
      t.charging,
      p
    ) : l}
                    ${o ? this._metaRow(
      d(this.hass, "status.power"),
      g,
      t.charge_power
    ) : l}
                    ${n ? this._metaRow(
      d(this.hass, "status.time"),
      f,
      t.charge_remaining
    ) : l}
                  </div>
                </div>
              ` : l}
          ${c ? a`
                <div class="charge-secondary">
                  ${Fe(
      this,
      this.hass,
      m(this.hass, "sensor", "charge_state"),
      t.charge_state
    )}
                  ${Fe(
      this,
      this.hass,
      d(this.hass, "status.mode"),
      t.charge_mode
    )}
                </div>
              ` : l}
        </div>
        ${h ? a`
              <div class="actions">
                ${_({
      label: m(this.hass, "button", "charge_stop"),
      icon: Ws,
      showLabel: !0,
      disabled: this._busy,
      onClick: () => this._run(() => z(this.hass, t.charge_stop))
    })}
              </div>
            ` : l}
      </ha-card>
    `;
  }
};
D.styles = [
  Se,
  mt,
  bt,
  ws,
  $s,
  ks
];
de([
  B({ attribute: !1 })
], D.prototype, "hass", 2);
de([
  V()
], D.prototype, "_config", 2);
de([
  V()
], D.prototype, "_busy", 2);
D = de([
  y("carlinko-charging")
], D);
var qs = Object.getOwnPropertyDescriptor, Ks = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? qs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let Je = class extends te {
};
Je = Ks([
  y("carlinko-charging-editor")
], Je);
var Fs = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, ue = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Gs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && Fs(e, s, i), i;
};
const Qe = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], Ys = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Js = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"], Qs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`, Xs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`, er = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`, tr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`, Xe = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`, sr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4.5-5.5c-1.4 0-2.6.8-3.2 2A3.5 3.5 0 0 1 16 11.5c0 .2 0 .4-.05.6 1.3.5 2.3 1.7 2.3 3.1 0 1.9-1.6 3.4-3.5 3.4-.7 0-1.35-.2-1.9-.55A3.5 3.5 0 0 1 12 20.5a3.5 3.5 0 0 1-.85-6.85A3.5 3.5 0 0 1 8.25 18c-1.9 0-3.5-1.5-3.5-3.4 0-1.4 1-2.6 2.3-3.1A3.5 3.5 0 0 1 7 11.5c0-1.6 1.1-3 2.7-3.4A3.48 3.48 0 0 1 6.5 5.5C4.6 5.5 3 7 3 8.9c0 1.4 1 2.6 2.3 3.1A3.5 3.5 0 0 1 8 8.5c.7 0 1.35.2 1.9.55A3.5 3.5 0 0 1 12 3.5c.9 0 1.75.35 2.4.95A3.48 3.48 0 0 1 16.5 5.5c1.9 0 3.5 1.5 3.5 3.4 0 1.4-1 2.6-2.3 3.1.05-.2.05-.4.05-.6A3.5 3.5 0 0 1 16.5 5.5Z"
    />
  </svg>
`, rr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`, ir = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`, or = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`, nr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`, ar = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`, cr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`, lr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
    />
  </svg>
`, hr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
    />
  </svg>
`, dr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
    />
  </svg>
`, ur = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
    />
  </svg>
`, pr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
    />
  </svg>
`, vr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
    />
  </svg>
`;
function gr(t) {
  return t.split(".", 1)[0];
}
function fr(t) {
  return !t || t === "unknown" || t === "unavailable" ? "—" : t === "off" || t === "on" ? t : t.replace(/^level_?/i, "l").slice(0, 4);
}
let S = class extends A {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(t) {
    if (!t || typeof t.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...t };
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
  updated(t) {
    t.has("hass") && this.hass && he(this.hass).then((e) => {
      e && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? Ae(this.hass, this._config, os) : {};
  }
  _run(t) {
    this.hass && Ct(
      () => this._busy,
      (e) => {
        this._busy = e;
      },
      t,
      (e) => console.error("carlinko-cabin action failed", e)
    );
  }
  _nudgeTemp(t) {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const s = qe(this.hass, e);
    if (s === void 0)
      return;
    const r = us(this.hass, e), i = ps(this.hass, e), o = vs(this.hass, e), n = Math.min(o, Math.max(i, s + t * r));
    this._run(() => fs(this.hass, e, n));
  }
  _toggleClimate() {
    const t = this._slots().climate;
    if (!this.hass || !t)
      return;
    const e = Ke(this.hass, t);
    this._run(
      () => gs(this.hass, t, e ? "off" : "cool")
    );
  }
  _cycleSelect(t) {
    if (!this.hass)
      return;
    const e = ms(this.hass, t);
    if (e.length === 0)
      return;
    const s = w(this.hass, t) ?? e[0], r = e.indexOf(s), i = e[(r + 1) % e.length];
    this._run(() => _s(this.hass, t, i));
  }
  _toggleBinary(t) {
    if (!this.hass)
      return;
    const e = w(this.hass, t) === "on";
    this._run(
      () => e ? Ie(this.hass, t) : je(this.hass, t)
    );
  }
  _hasDirectTpms(t) {
    return this.hass ? Js.some((e) => {
      const s = t[e];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(t) {
    return this.hass ? Qe.some((e) => {
      const s = e.heat ? t[e.heat] : void 0, r = e.vent ? t[e.vent] : void 0;
      return s && this.hass.states[s] || r && this.hass.states[r];
    }) : !1;
  }
  _seatControl(t, e) {
    var h;
    if (!t || !((h = this.hass) != null && h.states[t]))
      return l;
    const s = w(this.hass, t), r = gr(t), i = e === "H" ? "heat" : "vent", o = e === "H" ? d(this.hass, "status.heat") : d(this.hass, "status.vent"), n = fr(s), c = r === "select" ? () => this._cycleSelect(t) : () => this._toggleBinary(t);
    return a`
      <button
        type="button"
        class="seat-btn ${i}"
        ?disabled=${this._busy}
        title=${`${o}: ${s ?? "—"}`}
        aria-label=${`${o}: ${s ?? "—"}`}
        @click=${c}
      >
        ${e === "H" ? Xe : sr}
        <span class="seat-state">${n}</span>
      </button>
    `;
  }
  _seatZone(t, e) {
    var i, o;
    const s = t.heat ? e[t.heat] : void 0, r = t.vent ? e[t.vent] : void 0;
    return (!s || !((i = this.hass) != null && i.states[s])) && (!r || !((o = this.hass) != null && o.states[r])) ? l : a`
      <div slot=${t.slot} class="seat-zone">
        ${this._seatControl(s, "H")} ${this._seatControl(r, "V")}
      </div>
    `;
  }
  _sensorBtn(t, e) {
    if (!this.hass || !t || !this.hass.states[t])
      return l;
    const s = x(this.hass, t);
    return a`
      <button
        type="button"
        class=${e}
        @click=${() => C(this, t)}
      >
        ${s}
      </button>
    `;
  }
  _wheelZone(t, e) {
    var c, h;
    const s = e[t.pressure], r = e[t.temp], i = !!(s && ((c = this.hass) != null && c.states[s])), o = !!(r && ((h = this.hass) != null && h.states[r]));
    if (!i && !o)
      return l;
    const n = ft(this.hass, e.tyres_ok, e.tyre_status);
    return a`
      <div slot=${t.slot} class="wheel-zone tone-${n}">
        ${this._sensorBtn(s, "wheel-pressure")}
        ${this._sensorBtn(r, "wheel-temp")}
      </div>
    `;
  }
  _entityExists(t) {
    var e;
    return !!(t && ((e = this.hass) != null && e.states[t]));
  }
  _hasWindowsControls(t) {
    return this._entityExists(t.windows) || this._entityExists(t.windows_vent) || this._entityExists(t.sunroof) || this._entityExists(t.sunroof_tilt);
  }
  _chargerConnected(t) {
    return gt(this.hass, t.charge_mode);
  }
  _hasBodyControls(t) {
    return this._entityExists(t.lock) || this._entityExists(t.engine) || this._entityExists(t.defog) || this._entityExists(t.charge_stop) && this._chargerConnected(t) || this._entityExists(t.trunk);
  }
  _bodyActions(t) {
    const e = t.lock, s = t.engine, r = t.defog, i = t.charge_stop, o = t.trunk, n = this._chargerConnected(t), c = this._entityExists(i) && n;
    if (!e && !s && !r && !c && !o)
      return l;
    const u = w(this.hass, e) === "locked", v = Y(this.hass, s), p = Y(this.hass, r), g = !!(r != null && r.startsWith("binary_sensor.")), f = w(this.hass, o) === "open";
    return a`
      ${this._entityExists(s) ? a`<div slot="engine" class="map-actions">
            ${_({
      label: v ? d(this.hass, "action.engine_off") : d(this.hass, "action.engine_on"),
      icon: vr,
      disabled: this._busy,
      variant: v ? "ok" : "",
      onClick: () => this._run(
        () => v ? Ie(this.hass, s) : je(this.hass, s)
      )
    })}
          </div>` : l}
      ${this._entityExists(e) ? a`<div slot="lock" class="map-actions">
            ${_({
      label: u ? d(this.hass, "action.unlock_doors") : d(this.hass, "action.lock_doors"),
      icon: u ? lr : hr,
      disabled: this._busy,
      variant: u ? "" : "danger",
      onClick: () => this._run(
        () => u ? ls(this.hass, e) : cs(this.hass, e)
      )
    })}
          </div>` : l}
      ${this._entityExists(r) ? a`<div slot="defog" class="map-actions">
            ${_({
      label: p ? d(this.hass, "action.defog_off") : d(this.hass, "action.defog_on"),
      icon: dr,
      disabled: this._busy || g,
      variant: p ? "ok" : "",
      onClick: () => this._run(() => hs(this.hass, r))
    })}
          </div>` : l}
      ${c ? a`<div slot="charge" class="map-actions">
            ${_({
      label: m(this.hass, "button", "charge_stop"),
      icon: ur,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => z(this.hass, i))
    })}
          </div>` : l}
      ${this._entityExists(o) ? a`<div slot="trunk" class="map-actions">
            ${_({
      label: f ? d(this.hass, "action.close_trunk") : d(this.hass, "action.open_trunk"),
      icon: pr,
      disabled: this._busy,
      variant: f ? "ok" : "",
      onClick: () => this._run(
        () => f ? be(this.hass, o) : me(this.hass, o)
      )
    })}
          </div>` : l}
    `;
  }
  _windowsCluster(t) {
    const e = t.windows, s = t.windows_vent, r = this._entityExists(e), i = this._entityExists(s);
    if (!r && !i)
      return l;
    const o = r && We(this.hass, e);
    return a`
      <div slot="windows" class="map-actions">
        ${r ? _(o ? {
      label: d(this.hass, "action.close_windows"),
      icon: ir,
      disabled: this._busy,
      onClick: () => this._run(() => be(this.hass, e))
    } : {
      label: d(this.hass, "action.open_windows"),
      icon: rr,
      disabled: this._busy,
      onClick: () => this._run(() => me(this.hass, e))
    }) : l}
        ${i ? _({
      label: d(this.hass, "action.vent_windows"),
      icon: or,
      disabled: this._busy,
      onClick: () => this._run(() => z(this.hass, s))
    }) : l}
      </div>
    `;
  }
  _sunroofCluster(t) {
    const e = t.sunroof, s = t.sunroof_tilt, r = this._entityExists(e), i = this._entityExists(s);
    if (!r && !i)
      return l;
    const o = r && We(this.hass, e);
    return a`
      <div slot="sunroof" class="map-actions">
        ${r ? _(o ? {
      label: d(this.hass, "action.close_sunroof"),
      icon: ar,
      disabled: this._busy,
      onClick: () => this._run(() => be(this.hass, e))
    } : {
      label: d(this.hass, "action.open_sunroof"),
      icon: nr,
      disabled: this._busy,
      onClick: () => this._run(() => me(this.hass, e))
    }) : l}
        ${i ? _({
      label: d(this.hass, "action.tilt_sunroof"),
      icon: cr,
      disabled: this._busy,
      onClick: () => this._run(() => z(this.hass, s))
    }) : l}
      </div>
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
    const t = this._slots(), e = t.climate, s = e ? this.hass.states[e] : void 0, r = Ke(this.hass, e), i = qe(this.hass, e), o = ds(this.hass, e), n = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), c = this._hasSeats(t), h = this._hasDirectTpms(t), u = this._hasWindowsControls(t), v = this._hasBodyControls(t), p = _t(this.hass, t.image), g = c || h || u || v, f = !!(s || t.quick_cool && this.hass.states[t.quick_cool] || t.quick_heat && this.hass.states[t.quick_heat]);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${f ? a`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? a`
                          ${_({
      label: r ? d(this.hass, "climate.off") : d(this.hass, "climate.on"),
      icon: Qs,
      disabled: this._busy,
      variant: r ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${_({
      label: d(this.hass, "climate.increase_temp"),
      icon: Xs,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(1)
    })}
                          <span
                            class="setpoint-value"
                            title=${d(this.hass, "climate.setpoint")}
                            >${i !== void 0 ? `${i}${n}` : "—"}</span
                          >
                          ${_({
      label: d(this.hass, "climate.decrease_temp"),
      icon: er,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : l}
                  </div>
                  <div class="controls-right">
                    ${t.quick_cool && this.hass.states[t.quick_cool] ? _({
      label: m(this.hass, "button", "quick_cool"),
      icon: tr,
      disabled: this._busy,
      onClick: () => this._run(
        () => z(this.hass, t.quick_cool)
      )
    }) : l}
                    ${t.quick_heat && this.hass.states[t.quick_heat] ? _({
      label: m(this.hass, "button", "quick_heat"),
      icon: Xe,
      disabled: this._busy,
      onClick: () => this._run(
        () => z(this.hass, t.quick_heat)
      )
    }) : l}
                  </div>
                </div>
              ` : l}
          ${s && o !== void 0 ? a`
                <div class="current-row">
                  <span class="metric-label"
                    >${d(this.hass, "climate.current")}</span
                  >
                  <span class="metric-value">${o}${n}</span>
                </div>
              ` : l}
          ${g ? a`
                <carlinko-car-outline .src=${p}>
                  ${this._bodyActions(t)} ${this._windowsCluster(t)}
                  ${this._sunroofCluster(t)}
                  ${Qe.map((P) => this._seatZone(P, t))}
                  ${h ? Ys.map((P) => this._wheelZone(P, t)) : l}
                </carlinko-car-outline>
              ` : l}
        </div>
      </ha-card>
    `;
  }
};
S.styles = [
  Se,
  mt,
  bt,
  b`
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
      .seat-btn.heat:hover:not(:disabled) {
        border-color: var(--ck-seat-heat);
        color: var(--ck-seat-heat);
      }
      .seat-btn.vent:hover:not(:disabled) {
        border-color: var(--ck-seat-vent);
        color: var(--ck-seat-vent);
      }
      .wheel-zone.tone-ok .wheel-pressure:hover,
      .wheel-zone.tone-ok .wheel-temp:hover {
        border-color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-warn .wheel-pressure:hover,
      .wheel-zone.tone-warn .wheel-temp:hover {
        border-color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-danger .wheel-pressure:hover,
      .wheel-zone.tone-danger .wheel-temp:hover {
        border-color: var(--ck-tyre-danger);
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
      .map-actions .action.icon {
        width: 2.35rem;
        height: 2.35rem;
        min-width: 2.35rem;
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        backdrop-filter: blur(2px);
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
ue([
  B({ attribute: !1 })
], S.prototype, "hass", 2);
ue([
  V()
], S.prototype, "_config", 2);
ue([
  V()
], S.prototype, "_busy", 2);
S = ue([
  y("carlinko-cabin")
], S);
var _r = Object.getOwnPropertyDescriptor, mr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? _r(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let Q = class extends te {
  extraSchema() {
    return [xt];
  }
};
Q = mr([
  y("carlinko-cabin-editor")
], Q);
var br = Object.getOwnPropertyDescriptor, yr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? br(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let et = class extends S {
  static getConfigElement() {
    return document.createElement("carlinko-climate-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: d(void 0, "stub.climate")
    };
  }
};
et = yr([
  y("carlinko-climate")
], et);
var wr = Object.getOwnPropertyDescriptor, $r = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? wr(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let tt = class extends Q {
};
tt = $r([
  y("carlinko-climate-editor")
], tt);
var kr = Object.getOwnPropertyDescriptor, xr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? kr(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let st = class extends S {
  static getConfigElement() {
    return document.createElement("carlinko-tpms-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: d(void 0, "stub.tpms")
    };
  }
};
st = xr([
  y("carlinko-tpms")
], st);
var Cr = Object.getOwnPropertyDescriptor, Ar = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Cr(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let rt = class extends Q {
};
rt = Ar([
  y("carlinko-tpms-editor")
], rt);
var Sr = Object.getOwnPropertyDescriptor, Or = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Sr(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let it = class extends S {
  static getConfigElement() {
    return document.createElement("carlinko-windows-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: d(void 0, "stub.windows")
    };
  }
};
it = Or([
  y("carlinko-windows")
], it);
var Er = Object.getOwnPropertyDescriptor, Pr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Er(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let ot = class extends Q {
};
ot = Pr([
  y("carlinko-windows-editor")
], ot);
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
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
