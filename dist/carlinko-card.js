/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = globalThis, we = re.ShadowRoot && (re.ShadyCSS === void 0 || re.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $e = Symbol(), Te = /* @__PURE__ */ new WeakMap();
let ct = class {
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
const Ot = (t) => new ct(typeof t == "string" ? t : t + "", void 0, $e), b = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[n + 1], t[0]);
  return new ct(s, t, $e);
}, Et = (t, e) => {
  if (we) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const r = document.createElement("style"), i = re.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, t.appendChild(r);
  }
}, Me = we ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const r of e.cssRules) s += r.cssText;
  return Ot(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pt, defineProperty: Tt, getOwnPropertyDescriptor: Mt, getOwnPropertyNames: Ht, getOwnPropertySymbols: Nt, getPrototypeOf: Lt } = Object, E = globalThis, He = E.trustedTypes, Zt = He ? He.emptyScript : "", pe = E.reactiveElementPolyfillSupport, W = (t, e) => t, ie = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Zt : null;
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
} }, ke = (t, e) => !Pt(t, e), Ne = { attribute: !0, type: String, converter: ie, reflect: !1, useDefault: !1, hasChanged: ke };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = Ne) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, s);
      i !== void 0 && Tt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, s, r) {
    const { get: i, set: n } = Mt(this.prototype, e) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: i, set(o) {
      const h = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(e, h, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ne;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const e = Lt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const s = this.properties, r = [...Ht(s), ...Nt(s)];
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
    return Et(e, this.constructor.elementStyles), e;
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
    var n;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : ie).toAttribute(s, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const h = r.getPropertyOptions(i), c = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : ie;
      this._$Em = i;
      const u = c.fromAttribute(s, h.type);
      this[i] = u ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, s, r, i = !1, n) {
    var o;
    if (e !== void 0) {
      const h = this.constructor;
      if (i === !1 && (n = this[e]), r ?? (r = h.getPropertyOptions(e)), !((r.hasChanged ?? ke)(n, s) || r.useDefault && r.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(h._$Eu(e, r)))) return;
      this.C(e, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? s ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (s = void 0), this._$AL.set(e, s)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: h } = o, c = this[n];
        h !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[W("elementProperties")] = /* @__PURE__ */ new Map(), R[W("finalized")] = /* @__PURE__ */ new Map(), pe == null || pe({ ReactiveElement: R }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, Le = (t) => t, ne = q.trustedTypes, Ze = ne ? ne.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, lt = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + O, Bt = `<${ht}>`, L = document, K = () => L.createComment(""), F = (t) => t === null || typeof t != "object" && typeof t != "function", xe = Array.isArray, Rt = (t) => xe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ve = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Be = /-->/g, Re = />/g, M = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ue = /'/g, ze = /"/g, dt = /^(?:script|style|textarea|title)$/i, Ut = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), a = Ut(1), Z = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), De = /* @__PURE__ */ new WeakMap(), H = L.createTreeWalker(L, 129);
function ut(t, e) {
  if (!xe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ze !== void 0 ? Ze.createHTML(e) : e;
}
const zt = (t, e) => {
  const s = t.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = j;
  for (let h = 0; h < s; h++) {
    const c = t[h];
    let u, v, p = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, v = o.exec(c), v !== null); ) g = o.lastIndex, o === j ? v[1] === "!--" ? o = Be : v[1] !== void 0 ? o = Re : v[2] !== void 0 ? (dt.test(v[2]) && (i = RegExp("</" + v[2], "g")), o = M) : v[3] !== void 0 && (o = M) : o === M ? v[0] === ">" ? (o = i ?? j, p = -1) : v[1] === void 0 ? p = -2 : (p = o.lastIndex - v[2].length, u = v[1], o = v[3] === void 0 ? M : v[3] === '"' ? ze : Ue) : o === ze || o === Ue ? o = M : o === Be || o === Re ? o = j : (o = M, i = void 0);
    const f = o === M && t[h + 1].startsWith("/>") ? " " : "";
    n += o === j ? c + Bt : p >= 0 ? (r.push(u), c.slice(0, p) + lt + c.slice(p) + O + f) : c + O + (p === -2 ? h : f);
  }
  return [ut(t, n + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class G {
  constructor({ strings: e, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = e.length - 1, c = this.parts, [u, v] = zt(e, s);
    if (this.el = G.createElement(u, r), H.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = H.nextNode()) !== null && c.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(lt)) {
          const g = v[o++], f = i.getAttribute(p).split(O), $ = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: n, name: $[2], strings: f, ctor: $[1] === "." ? Vt : $[1] === "?" ? It : $[1] === "@" ? jt : le }), i.removeAttribute(p);
        } else p.startsWith(O) && (c.push({ type: 6, index: n }), i.removeAttribute(p));
        if (dt.test(i.tagName)) {
          const p = i.textContent.split(O), g = p.length - 1;
          if (g > 0) {
            i.textContent = ne ? ne.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(p[f], K()), H.nextNode(), c.push({ type: 2, index: ++n });
            i.append(p[g], K());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ht) c.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(O, p + 1)) !== -1; ) c.push({ type: 7, index: n }), p += O.length - 1;
      }
      n++;
    }
  }
  static createElement(e, s) {
    const r = L.createElement("template");
    return r.innerHTML = e, r;
  }
}
function z(t, e, s = t, r) {
  var o, h;
  if (e === Z) return e;
  let i = r !== void 0 ? (o = s._$Co) == null ? void 0 : o[r] : s._$Cl;
  const n = F(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(t), i._$AT(t, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (e = z(t, i._$AS(t, e.values), i, r)), e;
}
class Dt {
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
    let n = H.nextNode(), o = 0, h = 0, c = r[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let u;
        c.type === 2 ? u = new X(n, n.nextSibling, this, e) : c.type === 1 ? u = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (u = new Wt(n, this, e)), this._$AV.push(u), c = r[++h];
      }
      o !== (c == null ? void 0 : c.index) && (n = H.nextNode(), o++);
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
    e = z(this, e, s), F(e) ? e === l || e == null || e === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : e !== this._$AH && e !== Z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Rt(e) ? this.k(e) : this._(e);
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
    var n;
    const { values: s, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = G.createElement(ut(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(s);
    else {
      const o = new Dt(i, this), h = o.u(this.options);
      o.p(s), this.T(h), this._$AH = o;
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
    for (const n of e) i === s.length ? s.push(r = new X(this.O(K()), this.O(K()), this, this.options)) : r = s[i], r._$AI(n), i++;
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
  constructor(e, s, r, i, n) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = e, this.name = s, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = l;
  }
  _$AI(e, s = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = z(this, e, s, 0), o = !F(e) || e !== this._$AH && e !== Z, o && (this._$AH = e);
    else {
      const h = e;
      let c, u;
      for (e = n[0], c = 0; c < n.length - 1; c++) u = z(this, h[r + c], s, c), u === Z && (u = this._$AH[c]), o || (o = !F(u) || u !== this._$AH[c]), u === l ? e = l : e !== l && (e += (u ?? "") + n[c + 1]), this._$AH[c] = u;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Vt extends le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === l ? void 0 : e;
  }
}
class It extends le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== l);
  }
}
class jt extends le {
  constructor(e, s, r, i, n) {
    super(e, s, r, i, n), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = z(this, e, s, 0) ?? l) === Z) return;
    const r = this._$AH, i = e === l && r !== l || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== l && (r === l || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Wt {
  constructor(e, s, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    z(this, e);
  }
}
const ge = q.litHtmlPolyfillSupport;
ge == null || ge(G, X), (q.litHtmlVersions ?? (q.litHtmlVersions = [])).push("3.3.3");
const qt = (t, e, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new X(e.insertBefore(K(), n), n, void 0, s ?? {});
  }
  return i._$AI(t), i;
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
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild), e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qt(s, this.renderRoot, this.renderOptions);
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
var at;
A._$litElement$ = !0, A.finalized = !0, (at = N.litElementHydrateSupport) == null || at.call(N, { LitElement: A });
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
const Kt = { attribute: !0, type: String, converter: ie, reflect: !1, hasChanged: ke }, Ft = (t = Kt, e, s) => {
  const { kind: r, metadata: i } = s;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(s.name, t), r === "accessor") {
    const { name: o } = s;
    return { set(h) {
      const c = e.get.call(this);
      e.set.call(this, h), this.requestUpdate(o, c, t, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, t, h), h;
    } };
  }
  if (r === "setter") {
    const { name: o } = s;
    return function(h) {
      const c = this[o];
      e.call(this, h), this.requestUpdate(o, c, t, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function B(t) {
  return (e, s) => typeof s == "object" ? Ft(t, e, s) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
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
const Gt = {
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
}, Yt = {
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
}, Jt = {
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
function Qt(t) {
  const [e, s] = t.split(".", 2), r = Gt[e];
  return (r == null ? void 0 : r[s]) ?? t;
}
function pt(t, e) {
  var r;
  const s = (r = t == null ? void 0 : t.localize) == null ? void 0 : r.call(t, e);
  if (!(typeof s != "string" || !s.trim()) && !(s === e || s.startsWith("component.carlinko.")))
    return s;
}
function d(t, e) {
  return Qt(e);
}
function m(t, e, s) {
  var n;
  const r = `component.${Ce}.entity.${e}.${s}.name`, i = pt(t, r);
  return i || (((n = Yt[e]) == null ? void 0 : n[s]) ?? s);
}
function vt(t, e, s, r) {
  var h, c;
  if (!r)
    return "—";
  const i = r.toLowerCase(), n = `component.${Ce}.entity.${e}.${s}.state.${i}`, o = pt(t, n);
  return o || (((c = (h = Jt[e]) == null ? void 0 : h[s]) == null ? void 0 : c[i]) ?? r);
}
function Xt(t, e) {
  const s = d(t, "status.hv_prefix"), r = vt(
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
const Ie = "carlinko";
function es(t, e) {
  if (t.translation_key === e)
    return !0;
  const s = t.unique_id;
  if (s && (s === e || s.endsWith(`_${e}`) || s.startsWith("carlinko_") && s.endsWith(`_${e}`)))
    return !0;
  const r = t.entity_id.split(".", 2)[1] ?? "";
  return r === e || r.endsWith(`_${e}`);
}
function ts(t, e) {
  return e === "defrost" || e.endsWith("_left") || e.endsWith("_right") ? [t, "switch", "binary_sensor"] : [t];
}
function ss(t, e) {
  return !!(e && t.states[e]);
}
function rs(t) {
  return !!(t.disabled_by || t.hidden_by || t.hidden);
}
function is(t, e, s, r) {
  const i = t.entities;
  if (!i)
    return;
  const n = [];
  for (const c of Object.values(i)) {
    if (!(c != null && c.entity_id) || c.device_id !== e || rs(c))
      continue;
    const u = c.entity_id.split(".", 1)[0];
    r.includes(u) && es(c, s) && n.push(c);
  }
  if (n.length === 0)
    return;
  const o = [...n].sort((c, u) => {
    const v = c.platform === Ie ? 0 : 1, p = u.platform === Ie ? 0 : 1;
    return v - p;
  });
  return (o.find((c) => ss(t, c.entity_id)) ?? o[0]).entity_id;
}
function ns(t, e, s) {
  var o, h;
  if (!t)
    return;
  const r = (o = e.entities) == null ? void 0 : o[s.slot];
  if (r)
    return r;
  if (s.slot === "image" && e.image_entity)
    return e.image_entity;
  const i = (h = e.device_id) == null ? void 0 : h.trim();
  if (!i)
    return;
  const n = [s.key, ...s.fallbackKeys ?? []];
  for (const c of n) {
    const u = ts(s.domain, c), v = is(t, i, c, u);
    if (v)
      return v;
  }
}
function Ae(t, e, s) {
  const r = {};
  for (const i of s)
    r[i.slot] = ns(t, e, i);
  return r;
}
const gt = [
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
  gt.map((t) => [t.slot, t])
);
const os = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], as = [
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
function I(t, e) {
  if (!(!t || !e))
    return t.states[e];
}
function w(t, e) {
  var s;
  return (s = I(t, e)) == null ? void 0 : s.state;
}
function oe(t, e) {
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
function ft(t, e) {
  const s = w(t, e);
  return s === "ac" || s === "dc";
}
function cs(t, e) {
  const s = I(t, e);
  if (!s)
    return !1;
  const r = s.state === "on";
  return s.attributes.device_class === "problem" ? r : !r;
}
function _t(t, e, s) {
  return cs(t, e) ? "danger" : w(t, s) === "check_tyres" ? "warn" : "ok";
}
function x(t, e, s = "—") {
  const r = I(t, e);
  if (!r || r.state === "unknown" || r.state === "unavailable")
    return s;
  const i = r.attributes.unit_of_measurement;
  return i ? `${r.state} ${i}` : String(r.state);
}
function ls(t, e, s = "—") {
  const r = oe(t, e);
  if (r === void 0 || r < 0)
    return s;
  const i = Math.round(r), n = Math.floor(i / 60), o = i % 60;
  return n <= 0 ? `${o}m` : o <= 0 ? `${n}h` : `${n}h ${o}m`;
}
function _e(t, e) {
  if (/^https?:\/\//i.test(e))
    return e;
  try {
    const s = t == null ? void 0 : t.hassUrl;
    if (typeof s == "function")
      return s(e);
    if (typeof s == "string" && s) {
      const r = s.replace(/\/$/, "");
      return e.startsWith("/") ? `${r}${e}` : `${r}/${e}`;
    }
  } catch (s) {
    console.warn("carlinko-card: withHassBase failed", s);
  }
  return e;
}
function mt(t, e) {
  const s = I(t, e);
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
async function hs(t, e) {
  await k(t, "lock", "lock", e);
}
async function ds(t, e) {
  await k(t, "lock", "unlock", e);
}
async function je(t, e) {
  const s = e.split(".", 1)[0];
  await k(t, s, "turn_on", e);
}
async function We(t, e) {
  const s = e.split(".", 1)[0];
  await k(t, s, "turn_off", e);
}
async function us(t, e) {
  const s = e.split(".", 1)[0];
  await k(t, s, "toggle", e);
}
async function me(t, e) {
  await k(t, "cover", "open_cover", e);
}
async function be(t, e) {
  await k(t, "cover", "close_cover", e);
}
function qe(t, e) {
  const s = w(t, e);
  return s === "open" || s === "opening";
}
async function U(t, e) {
  await k(t, "button", "press", e);
}
function ee(t, e, s) {
  const r = I(t, e);
  if (!r)
    return;
  const i = r.attributes[s];
  if (i == null)
    return;
  const n = Number(i);
  return Number.isFinite(n) ? n : void 0;
}
function Ke(t, e) {
  return ee(t, e, "temperature");
}
function ps(t, e) {
  return ee(t, e, "current_temperature");
}
function vs(t, e) {
  return ee(t, e, "target_temp_step") ?? 1;
}
function gs(t, e) {
  return ee(t, e, "min_temp") ?? 16;
}
function fs(t, e) {
  return ee(t, e, "max_temp") ?? 30;
}
function Fe(t, e) {
  const s = w(t, e);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function _s(t, e, s) {
  await k(t, "climate", "set_hvac_mode", e, {
    hvac_mode: s
  });
}
async function ms(t, e, s) {
  await k(t, "climate", "set_temperature", e, {
    temperature: s
  });
}
async function bs(t, e, s) {
  await k(t, "select", "select_option", e, {
    option: s
  });
}
function ys(t, e) {
  const s = I(t, e), r = s == null ? void 0 : s.attributes.options;
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
`, bt = b`
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
const yt = b`
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
const ws = b`
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
`, $s = b`
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
`, ks = b`
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
`, xs = b`
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
`, Cs = b`
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
function Ge(t, e, s, r, i) {
  if (!e || !r || !e.states[r])
    return l;
  let n = x(e, r);
  return a`
    <button
      type="button"
      class="metric"
      @click=${() => C(t, r)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${n}</span>
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
const As = {
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
      ${As[t.icon]}
    </button>
  `;
}
function Ye(t) {
  const { percent: e, primary: s, secondary: r, meta: i } = t;
  if (e === void 0 && !s && !r && !i)
    return l;
  const n = t.tone ?? "ok", o = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e));
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
const Ss = { ATTRIBUTE: 1 }, Os = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Es = class {
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
const wt = "important", Ps = " !" + wt, Ts = Os(class extends Es {
  constructor(t) {
    var e;
    if (super(t), t.type !== Ss.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const n = typeof i == "string" && i.endsWith(Ps);
        r.includes("-") || n ? s.setProperty(r, n ? i.slice(0, -11) : i, n ? wt : "") : s[r] = i;
      }
    }
    return Z;
  }
});
function Ms(t) {
  const { percent: e, onClick: s } = t, r = t.socLabel ?? "SoC";
  if (e === void 0 && !s)
    return l;
  const i = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e)), n = i === void 0 ? 0 : Math.round(i), o = i !== void 0 ? `${n}% ${r}` : r, h = i !== void 0 ? Ts({ "--ck-soc-pct": `${n}%` }) : l, c = a`
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
function Hs(t) {
  const { percent: e } = t, s = t.charging ?? !1, r = t.batteryLabel ?? "Battery", i = t.chargingLabel ?? "charging", n = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e)), o = n === void 0 ? 0 : n;
  return a`
    <div
      class="charge-batt"
      role="img"
      aria-label=${n !== void 0 ? `${r} ${Math.round(n)}%${s ? `, ${i}` : ""}` : r}
    >
      <div class="charge-batt-body">
        ${n !== void 0 ? a`<div
              class="charge-batt-fill"
              style="width:${o}%"
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
var Ns = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, $t = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ls(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Ns(e, s, i), i;
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
$t([
  B({ type: String })
], ae.prototype, "src", 2);
ae = $t([
  y("carlinko-car-outline")
], ae);
var Zs = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, kt = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Bs(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Zs(e, s, i), i;
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
kt([
  B({ type: String })
], ce.prototype, "src", 2);
ce = kt([
  y("carlinko-vehicle-stage")
], ce);
var Rs = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, Oe = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Us(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Rs(e, s, i), i;
};
function zs(t, e) {
  const s = (e || "unknown").toLowerCase(), r = Xt(t, s);
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
    return this._config ? Ae(this.hass, this._config, gt) : {};
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
    const t = this._slots(), e = mt(this.hass, t.image), s = Y(this.hass, t.engine), r = Y(this.hass, t.online), i = oe(this.hass, t.battery), n = oe(this.hass, t.fuel), o = t.odometer && this.hass.states[t.odometer] ? x(this.hass, t.odometer) : void 0, h = t.total_range && this.hass.states[t.total_range] ? x(this.hass, t.total_range) : void 0, c = s && t.engine && t.speed && this.hass.states[t.speed] ? x(this.hass, t.speed) : void 0, u = t.range && this.hass.states[t.range] ? x(this.hass, t.range) : void 0, v = t.fuel_range && this.hass.states[t.fuel_range] ? x(this.hass, t.fuel_range) : void 0, p = w(this.hass, t.hv_state), g = t.hv_state ? zs(this.hass, p) : void 0, f = t.consumption && this.hass.states[t.consumption] ? x(this.hass, t.consumption) : void 0, $ = t.fuel_consumption && this.hass.states[t.fuel_consumption] ? x(this.hass, t.fuel_consumption) : void 0, P = !!(o || h || c), T = t.tyres_ok || t.tyre_status ? _t(this.hass, t.tyres_ok, t.tyre_status) : void 0, St = T === "danger" ? m(this.hass, "binary_sensor", "tyres_ok") : T === "warn" ? vt(this.hass, "sensor", "tyre_status", "check_tyres") : d(this.hass, "status.tyres_ok"), Ee = t.tyres_ok ?? t.tyre_status;
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${e}>
              ${P ? a`<div slot="headline" class="headline">
                    ${o ? a`<button
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
                          <span class="odo-value">${o}</span>
                        </button>` : l}
                    ${h ? a`<button
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
                          <span class="range-value">${h}</span>
                        </button>` : l}
                    ${c ? a`<button
                          type="button"
                          class="speed"
                          @click=${() => C(this, t.speed)}
                        >
                          <span class="speed-label"
                            >${m(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${c}</span>
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
      label: St,
      tone: T,
      onClick: () => C(this, Ee)
    })}
                  </div>` : l}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${Ye({
      percent: i,
      primary: i !== void 0 || u ? d(this.hass, "status.soc") : void 0,
      secondary: u,
      meta: f,
      tone: "ok"
    })}
              ${Ye({
      percent: n,
      primary: n !== void 0 || v ? m(this.hass, "sensor", "fuel") : void 0,
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
  ws,
  $s,
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
var Ds = Object.defineProperty, xt = (t, e, s, r) => {
  for (var i = void 0, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(e, s, i) || i);
  return i && Ds(e, s, i), i;
};
const Vs = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, Ct = {
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
        const s = e === Ct;
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
xt([
  B({ attribute: !1 })
], te.prototype, "hass");
xt([
  V()
], te.prototype, "_config");
var Is = Object.getOwnPropertyDescriptor, js = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Is(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let Je = class extends te {
  extraSchema() {
    return [Vs];
  }
};
Je = js([
  y("carlinko-overview-editor")
], Je);
async function At(t, e, s, r) {
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
var Ws = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, de = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? qs(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Ws(e, s, i), i;
};
const Ks = a`
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
    return this._config ? Ae(this.hass, this._config, os) : {};
  }
  _run(t) {
    this.hass && At(
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
    const t = this._slots(), e = Y(this.hass, t.charging), s = oe(this.hass, t.battery), r = !!(t.battery && this.hass.states[t.battery]), i = !!(t.charging && this.hass.states[t.charging]), n = !!(t.charge_power && this.hass.states[t.charge_power]), o = !!(t.charge_remaining && this.hass.states[t.charge_remaining]), h = t.charge_state && this.hass.states[t.charge_state] || t.charge_mode && this.hass.states[t.charge_mode], c = !!(t.charge_stop && this.hass.states[t.charge_stop]) && ft(this.hass, t.charge_mode), u = r || i || n || o, v = e ? m(this.hass, "binary_sensor", "charging") : d(this.hass, "status.not_charging"), p = e ? "ok" : "muted", g = x(this.hass, t.charge_power), f = ls(this.hass, t.charge_remaining), $ = m(this.hass, "sensor", "battery"), P = d(this.hass, "status.soc");
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${u ? a`
                <div class="charge-hero">
                  ${r ? Ms({
      percent: s,
      socLabel: P,
      onClick: () => C(this, t.battery)
    }) : l}
                  ${r ? a`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${Hs({
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
                    ${n ? this._metaRow(
      d(this.hass, "status.power"),
      g,
      t.charge_power
    ) : l}
                    ${o ? this._metaRow(
      d(this.hass, "status.time"),
      f,
      t.charge_remaining
    ) : l}
                  </div>
                </div>
              ` : l}
          ${h ? a`
                <div class="charge-secondary">
                  ${Ge(
      this,
      this.hass,
      m(this.hass, "sensor", "charge_state"),
      t.charge_state
    )}
                  ${Ge(
      this,
      this.hass,
      d(this.hass, "status.mode"),
      t.charge_mode
    )}
                </div>
              ` : l}
        </div>
        ${c ? a`
              <div class="actions">
                ${_({
      label: m(this.hass, "button", "charge_stop"),
      icon: Ks,
      showLabel: !0,
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, t.charge_stop))
    })}
              </div>
            ` : l}
      </ha-card>
    `;
  }
};
D.styles = [
  Se,
  bt,
  yt,
  ks,
  xs,
  Cs
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
var Fs = Object.getOwnPropertyDescriptor, Gs = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Fs(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let Qe = class extends te {
};
Qe = Gs([
  y("carlinko-charging-editor")
], Qe);
var Ys = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, ue = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Js(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Ys(e, s, i), i;
};
const Xe = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], Qs = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Xs = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"], er = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`, tr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`, sr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`, rr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`, et = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`, ir = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4.5-5.5c-1.4 0-2.6.8-3.2 2A3.5 3.5 0 0 1 16 11.5c0 .2 0 .4-.05.6 1.3.5 2.3 1.7 2.3 3.1 0 1.9-1.6 3.4-3.5 3.4-.7 0-1.35-.2-1.9-.55A3.5 3.5 0 0 1 12 20.5a3.5 3.5 0 0 1-.85-6.85A3.5 3.5 0 0 1 8.25 18c-1.9 0-3.5-1.5-3.5-3.4 0-1.4 1-2.6 2.3-3.1A3.5 3.5 0 0 1 7 11.5c0-1.6 1.1-3 2.7-3.4A3.48 3.48 0 0 1 6.5 5.5C4.6 5.5 3 7 3 8.9c0 1.4 1 2.6 2.3 3.1A3.5 3.5 0 0 1 8 8.5c.7 0 1.35.2 1.9.55A3.5 3.5 0 0 1 12 3.5c.9 0 1.75.35 2.4.95A3.48 3.48 0 0 1 16.5 5.5c1.9 0 3.5 1.5 3.5 3.4 0 1.4-1 2.6-2.3 3.1.05-.2.05-.4.05-.6A3.5 3.5 0 0 1 16.5 5.5Z"
    />
  </svg>
`, nr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`, or = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`, ar = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`, cr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`, lr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`, hr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`, dr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
    />
  </svg>
`, ur = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
    />
  </svg>
`, pr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
    />
  </svg>
`, vr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
    />
  </svg>
`, gr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
    />
  </svg>
`, fr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
    />
  </svg>
`;
function _r(t) {
  return t.split(".", 1)[0];
}
function mr(t) {
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
    return this._config ? Ae(this.hass, this._config, as) : {};
  }
  _run(t) {
    this.hass && At(
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
    const s = Ke(this.hass, e);
    if (s === void 0)
      return;
    const r = vs(this.hass, e), i = gs(this.hass, e), n = fs(this.hass, e), o = Math.min(n, Math.max(i, s + t * r));
    this._run(() => ms(this.hass, e, o));
  }
  _toggleClimate() {
    const t = this._slots().climate;
    if (!this.hass || !t)
      return;
    const e = Fe(this.hass, t);
    this._run(
      () => _s(this.hass, t, e ? "off" : "cool")
    );
  }
  _cycleSelect(t) {
    if (!this.hass)
      return;
    const e = ys(this.hass, t);
    if (e.length === 0)
      return;
    const s = w(this.hass, t) ?? e[0], r = e.indexOf(s), i = e[(r + 1) % e.length];
    this._run(() => bs(this.hass, t, i));
  }
  _toggleBinary(t) {
    if (!this.hass)
      return;
    const e = w(this.hass, t) === "on";
    this._run(
      () => e ? We(this.hass, t) : je(this.hass, t)
    );
  }
  _hasDirectTpms(t) {
    return this.hass ? Xs.some((e) => {
      const s = t[e];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(t) {
    return this.hass ? Xe.some((e) => {
      const s = e.heat ? t[e.heat] : void 0, r = e.vent ? t[e.vent] : void 0;
      return s && this.hass.states[s] || r && this.hass.states[r];
    }) : !1;
  }
  _seatControl(t, e) {
    var c;
    if (!t || !((c = this.hass) != null && c.states[t]))
      return l;
    const s = w(this.hass, t), r = _r(t), i = e === "H" ? "heat" : "vent", n = e === "H" ? d(this.hass, "status.heat") : d(this.hass, "status.vent"), o = mr(s), h = r === "select" ? () => this._cycleSelect(t) : () => this._toggleBinary(t);
    return a`
      <button
        type="button"
        class="seat-btn ${i}"
        ?disabled=${this._busy}
        title=${`${n}: ${s ?? "—"}`}
        aria-label=${`${n}: ${s ?? "—"}`}
        @click=${h}
      >
        ${e === "H" ? et : ir}
        <span class="seat-state">${o}</span>
      </button>
    `;
  }
  _seatZone(t, e) {
    var i, n;
    const s = t.heat ? e[t.heat] : void 0, r = t.vent ? e[t.vent] : void 0;
    return (!s || !((i = this.hass) != null && i.states[s])) && (!r || !((n = this.hass) != null && n.states[r])) ? l : a`
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
    var h, c;
    const s = e[t.pressure], r = e[t.temp], i = !!(s && ((h = this.hass) != null && h.states[s])), n = !!(r && ((c = this.hass) != null && c.states[r]));
    if (!i && !n)
      return l;
    const o = _t(this.hass, e.tyres_ok, e.tyre_status);
    return a`
      <div slot=${t.slot} class="wheel-zone tone-${o}">
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
    return ft(this.hass, t.charge_mode);
  }
  _hasBodyControls(t) {
    return this._entityExists(t.lock) || this._entityExists(t.engine) || this._entityExists(t.defog) || this._entityExists(t.charge_stop) && this._chargerConnected(t) || this._entityExists(t.trunk);
  }
  _bodyActions(t) {
    const e = t.lock, s = t.engine, r = t.defog, i = t.charge_stop, n = t.trunk, o = this._chargerConnected(t), h = this._entityExists(i) && o;
    if (!e && !s && !r && !h && !n)
      return l;
    const u = w(this.hass, e) === "locked", v = Y(this.hass, s), p = Y(this.hass, r), g = !!(r != null && r.startsWith("binary_sensor.")), f = w(this.hass, n) === "open";
    return a`
      ${this._entityExists(s) ? a`<div slot="engine" class="map-actions">
            ${_({
      label: v ? d(this.hass, "action.engine_off") : d(this.hass, "action.engine_on"),
      icon: fr,
      disabled: this._busy,
      variant: v ? "ok" : "",
      onClick: () => this._run(
        () => v ? We(this.hass, s) : je(this.hass, s)
      )
    })}
          </div>` : l}
      ${this._entityExists(e) ? a`<div slot="lock" class="map-actions">
            ${_({
      label: u ? d(this.hass, "action.unlock_doors") : d(this.hass, "action.lock_doors"),
      icon: u ? dr : ur,
      disabled: this._busy,
      variant: u ? "" : "danger",
      onClick: () => this._run(
        () => u ? ds(this.hass, e) : hs(this.hass, e)
      )
    })}
          </div>` : l}
      ${this._entityExists(r) ? a`<div slot="defog" class="map-actions">
            ${_({
      label: p ? d(this.hass, "action.defog_off") : d(this.hass, "action.defog_on"),
      icon: pr,
      disabled: this._busy || g,
      variant: p ? "ok" : "",
      onClick: () => this._run(() => us(this.hass, r))
    })}
          </div>` : l}
      ${h ? a`<div slot="charge" class="map-actions">
            ${_({
      label: m(this.hass, "button", "charge_stop"),
      icon: vr,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => U(this.hass, i))
    })}
          </div>` : l}
      ${this._entityExists(n) ? a`<div slot="trunk" class="map-actions">
            ${_({
      label: f ? d(this.hass, "action.close_trunk") : d(this.hass, "action.open_trunk"),
      icon: gr,
      disabled: this._busy,
      variant: f ? "ok" : "",
      onClick: () => this._run(
        () => f ? be(this.hass, n) : me(this.hass, n)
      )
    })}
          </div>` : l}
    `;
  }
  _windowsCluster(t) {
    const e = t.windows, s = t.windows_vent, r = this._entityExists(e), i = this._entityExists(s);
    if (!r && !i)
      return l;
    const n = r && qe(this.hass, e);
    return a`
      <div slot="windows" class="map-actions">
        ${r ? _(n ? {
      label: d(this.hass, "action.close_windows"),
      icon: or,
      disabled: this._busy,
      onClick: () => this._run(() => be(this.hass, e))
    } : {
      label: d(this.hass, "action.open_windows"),
      icon: nr,
      disabled: this._busy,
      onClick: () => this._run(() => me(this.hass, e))
    }) : l}
        ${i ? _({
      label: d(this.hass, "action.vent_windows"),
      icon: ar,
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, s))
    }) : l}
      </div>
    `;
  }
  _sunroofCluster(t) {
    const e = t.sunroof, s = t.sunroof_tilt, r = this._entityExists(e), i = this._entityExists(s);
    if (!r && !i)
      return l;
    const n = r && qe(this.hass, e);
    return a`
      <div slot="sunroof" class="map-actions">
        ${r ? _(n ? {
      label: d(this.hass, "action.close_sunroof"),
      icon: lr,
      disabled: this._busy,
      onClick: () => this._run(() => be(this.hass, e))
    } : {
      label: d(this.hass, "action.open_sunroof"),
      icon: cr,
      disabled: this._busy,
      onClick: () => this._run(() => me(this.hass, e))
    }) : l}
        ${i ? _({
      label: d(this.hass, "action.tilt_sunroof"),
      icon: hr,
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, s))
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
    const t = this._slots(), e = t.climate, s = e ? this.hass.states[e] : void 0, r = Fe(this.hass, e), i = Ke(this.hass, e), n = ps(this.hass, e), o = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), h = this._hasSeats(t), c = this._hasDirectTpms(t), u = this._hasWindowsControls(t), v = this._hasBodyControls(t), p = mt(this.hass, t.image), g = h || c || u || v, f = !!(s || t.quick_cool && this.hass.states[t.quick_cool] || t.quick_heat && this.hass.states[t.quick_heat]);
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
      icon: er,
      disabled: this._busy,
      variant: r ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${_({
      label: d(this.hass, "climate.increase_temp"),
      icon: tr,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(1)
    })}
                          <span
                            class="setpoint-value"
                            title=${d(this.hass, "climate.setpoint")}
                            >${i !== void 0 ? `${i}${o}` : "—"}</span
                          >
                          ${_({
      label: d(this.hass, "climate.decrease_temp"),
      icon: sr,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : l}
                  </div>
                  <div class="controls-right">
                    ${t.quick_cool && this.hass.states[t.quick_cool] ? _({
      label: m(this.hass, "button", "quick_cool"),
      icon: rr,
      disabled: this._busy,
      onClick: () => this._run(
        () => U(this.hass, t.quick_cool)
      )
    }) : l}
                    ${t.quick_heat && this.hass.states[t.quick_heat] ? _({
      label: m(this.hass, "button", "quick_heat"),
      icon: et,
      disabled: this._busy,
      onClick: () => this._run(
        () => U(this.hass, t.quick_heat)
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
                  ${this._bodyActions(t)} ${this._windowsCluster(t)}
                  ${this._sunroofCluster(t)}
                  ${Xe.map((P) => this._seatZone(P, t))}
                  ${c ? Qs.map((P) => this._wheelZone(P, t)) : l}
                </carlinko-car-outline>
              ` : l}
        </div>
      </ha-card>
    `;
  }
};
S.styles = [
  Se,
  bt,
  yt,
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
var br = Object.getOwnPropertyDescriptor, yr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? br(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let Q = class extends te {
  extraSchema() {
    return [Ct];
  }
};
Q = yr([
  y("carlinko-cabin-editor")
], Q);
var wr = Object.getOwnPropertyDescriptor, $r = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? wr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let tt = class extends S {
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
tt = $r([
  y("carlinko-climate")
], tt);
var kr = Object.getOwnPropertyDescriptor, xr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? kr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let st = class extends Q {
};
st = xr([
  y("carlinko-climate-editor")
], st);
var Cr = Object.getOwnPropertyDescriptor, Ar = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Cr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let rt = class extends S {
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
rt = Ar([
  y("carlinko-tpms")
], rt);
var Sr = Object.getOwnPropertyDescriptor, Or = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Sr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let it = class extends Q {
};
it = Or([
  y("carlinko-tpms-editor")
], it);
var Er = Object.getOwnPropertyDescriptor, Pr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Er(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let nt = class extends S {
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
nt = Pr([
  y("carlinko-windows")
], nt);
var Tr = Object.getOwnPropertyDescriptor, Mr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Tr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let ot = class extends Q {
};
ot = Mr([
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
  "%c CARLINKO-CARD %c 0.1.4 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
