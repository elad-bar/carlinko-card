/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = globalThis, me = ee.ShadowRoot && (ee.ShadyCSS === void 0 || ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _e = Symbol(), Ae = /* @__PURE__ */ new WeakMap();
let st = class {
  constructor(e, s, r) {
    if (this._$cssResult$ = !0, r !== _e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (me && e === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (e = Ae.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Ae.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const bt = (t) => new st(typeof t == "string" ? t : t + "", void 0, _e), m = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[n + 1], t[0]);
  return new st(s, t, _e);
}, yt = (t, e) => {
  if (me) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const r = document.createElement("style"), i = ee.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, t.appendChild(r);
  }
}, Se = me ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const r of e.cssRules) s += r.cssText;
  return bt(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wt, defineProperty: $t, getOwnPropertyDescriptor: kt, getOwnPropertyNames: xt, getOwnPropertySymbols: Ct, getPrototypeOf: At } = Object, S = globalThis, Oe = S.trustedTypes, St = Oe ? Oe.emptyScript : "", ce = S.reactiveElementPolyfillSupport, D = (t, e) => t, te = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? St : null;
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
} }, be = (t, e) => !wt(t, e), Ee = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: be };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let N = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = Ee) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, s);
      i !== void 0 && $t(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, s, r) {
    const { get: i, set: n } = kt(this.prototype, e) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: i, set(o) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ee;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const e = At(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const s = this.properties, r = [...xt(s), ...Ct(s)];
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
      for (const i of r) s.unshift(Se(i));
    } else e !== void 0 && s.push(Se(e));
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
    return yt(e, this.constructor.elementStyles), e;
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
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : te).toAttribute(s, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = r.getPropertyOptions(i), h = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : te;
      this._$Em = i;
      const d = h.fromAttribute(s, l.type);
      this[i] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, s, r, i = !1, n) {
    var o;
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[e]), r ?? (r = l.getPropertyOptions(e)), !((r.hasChanged ?? be)(n, s) || r.useDefault && r.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(l._$Eu(e, r)))) return;
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
        const { wrapped: l } = o, h = this[n];
        l !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, o, h);
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
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[D("elementProperties")] = /* @__PURE__ */ new Map(), N[D("finalized")] = /* @__PURE__ */ new Map(), ce == null || ce({ ReactiveElement: N }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, Pe = (t) => t, se = j.trustedTypes, He = se ? se.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, rt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, it = "?" + A, Ot = `<${it}>`, H = document, I = () => H.createComment(""), W = (t) => t === null || typeof t != "object" && typeof t != "function", ye = Array.isArray, Et = (t) => ye(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", he = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Me = /-->/g, Te = />/g, O = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ne = /'/g, Ze = /"/g, nt = /^(?:script|style|textarea|title)$/i, Pt = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), a = Pt(1), M = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), Be = /* @__PURE__ */ new WeakMap(), E = H.createTreeWalker(H, 129);
function ot(t, e) {
  if (!ye(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return He !== void 0 ? He.createHTML(e) : e;
}
const Ht = (t, e) => {
  const s = t.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = z;
  for (let l = 0; l < s; l++) {
    const h = t[l];
    let d, p, u = -1, v = 0;
    for (; v < h.length && (o.lastIndex = v, p = o.exec(h), p !== null); ) v = o.lastIndex, o === z ? p[1] === "!--" ? o = Me : p[1] !== void 0 ? o = Te : p[2] !== void 0 ? (nt.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = O) : p[3] !== void 0 && (o = O) : o === O ? p[0] === ">" ? (o = i ?? z, u = -1) : p[1] === void 0 ? u = -2 : (u = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? O : p[3] === '"' ? Ze : Ne) : o === Ze || o === Ne ? o = O : o === Me || o === Te ? o = z : (o = O, i = void 0);
    const g = o === O && t[l + 1].startsWith("/>") ? " " : "";
    n += o === z ? h + Ot : u >= 0 ? (r.push(d), h.slice(0, u) + rt + h.slice(u) + A + g) : h + A + (u === -2 ? l : g);
  }
  return [ot(t, n + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class q {
  constructor({ strings: e, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, h = this.parts, [d, p] = Ht(e, s);
    if (this.el = q.createElement(d, r), E.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = E.nextNode()) !== null && h.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(rt)) {
          const v = p[o++], g = i.getAttribute(u).split(A), b = /([.?@])?(.*)/.exec(v);
          h.push({ type: 1, index: n, name: b[2], strings: g, ctor: b[1] === "." ? Tt : b[1] === "?" ? Nt : b[1] === "@" ? Zt : oe }), i.removeAttribute(u);
        } else u.startsWith(A) && (h.push({ type: 6, index: n }), i.removeAttribute(u));
        if (nt.test(i.tagName)) {
          const u = i.textContent.split(A), v = u.length - 1;
          if (v > 0) {
            i.textContent = se ? se.emptyScript : "";
            for (let g = 0; g < v; g++) i.append(u[g], I()), E.nextNode(), h.push({ type: 2, index: ++n });
            i.append(u[v], I());
          }
        }
      } else if (i.nodeType === 8) if (i.data === it) h.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(A, u + 1)) !== -1; ) h.push({ type: 7, index: n }), u += A.length - 1;
      }
      n++;
    }
  }
  static createElement(e, s) {
    const r = H.createElement("template");
    return r.innerHTML = e, r;
  }
}
function B(t, e, s = t, r) {
  var o, l;
  if (e === M) return e;
  let i = r !== void 0 ? (o = s._$Co) == null ? void 0 : o[r] : s._$Cl;
  const n = W(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(t), i._$AT(t, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (e = B(t, i._$AS(t, e.values), i, r)), e;
}
class Mt {
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
    const { el: { content: s }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? H).importNode(s, !0);
    E.currentNode = i;
    let n = E.nextNode(), o = 0, l = 0, h = r[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let d;
        h.type === 2 ? d = new J(n, n.nextSibling, this, e) : h.type === 1 ? d = new h.ctor(n, h.name, h.strings, this, e) : h.type === 6 && (d = new Bt(n, this, e)), this._$AV.push(d), h = r[++l];
      }
      o !== (h == null ? void 0 : h.index) && (n = E.nextNode(), o++);
    }
    return E.currentNode = H, i;
  }
  p(e) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, s), s += r.strings.length - 2) : r._$AI(e[s])), s++;
  }
}
class J {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, r, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = B(this, e, s), W(e) ? e === c || e == null || e === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Et(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== c && W(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: s, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = q.createElement(ot(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(s);
    else {
      const o = new Mt(i, this), l = o.u(this.options);
      o.p(s), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let s = Be.get(e.strings);
    return s === void 0 && Be.set(e.strings, s = new q(e)), s;
  }
  k(e) {
    ye(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const n of e) i === s.length ? s.push(r = new J(this.O(I()), this.O(I()), this, this.options)) : r = s[i], r._$AI(n), i++;
    i < s.length && (this._$AR(r && r._$AB.nextSibling, i), s.length = i);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, s); e !== this._$AB; ) {
      const i = Pe(e).nextSibling;
      Pe(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class oe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, r, i, n) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = e, this.name = s, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = c;
  }
  _$AI(e, s = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = B(this, e, s, 0), o = !W(e) || e !== this._$AH && e !== M, o && (this._$AH = e);
    else {
      const l = e;
      let h, d;
      for (e = n[0], h = 0; h < n.length - 1; h++) d = B(this, l[r + h], s, h), d === M && (d = this._$AH[h]), o || (o = !W(d) || d !== this._$AH[h]), d === c ? e = c : e !== c && (e += (d ?? "") + n[h + 1]), this._$AH[h] = d;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Tt extends oe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === c ? void 0 : e;
  }
}
class Nt extends oe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== c);
  }
}
class Zt extends oe {
  constructor(e, s, r, i, n) {
    super(e, s, r, i, n), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = B(this, e, s, 0) ?? c) === M) return;
    const r = this._$AH, i = e === c && r !== c || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== c && (r === c || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Bt {
  constructor(e, s, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    B(this, e);
  }
}
const de = j.litHtmlPolyfillSupport;
de == null || de(q, J), (j.litHtmlVersions ?? (j.litHtmlVersions = [])).push("3.3.3");
const Lt = (t, e, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new J(e.insertBefore(I(), n), n, void 0, s ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
let x = class extends N {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Lt(s, this.renderRoot, this.renderOptions);
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
    return M;
  }
};
var tt;
x._$litElement$ = !0, x.finalized = !0, (tt = P.litElementHydrateSupport) == null || tt.call(P, { LitElement: x });
const ue = P.litElementPolyfillSupport;
ue == null || ue({ LitElement: x });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _ = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = { attribute: !0, type: String, converter: te, reflect: !1, hasChanged: be }, Rt = (t = Ut, e, s) => {
  const { kind: r, metadata: i } = s;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(s.name, t), r === "accessor") {
    const { name: o } = s;
    return { set(l) {
      const h = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, h, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, t, l), l;
    } };
  }
  if (r === "setter") {
    const { name: o } = s;
    return function(l) {
      const h = this[o];
      e.call(this, l), this.requestUpdate(o, h, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function T(t) {
  return (e, s) => typeof s == "object" ? Rt(t, e, s) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(t) {
  return T({ ...t, state: !0, attribute: !1 });
}
function Vt(t, e) {
  return t === e || t.endsWith(`_${e}`) ? !0 : t.startsWith("carlinko_") && t.endsWith(`_${e}`);
}
function zt(t, e) {
  return e === "defrost" || e.endsWith("_left") || e.endsWith("_right") ? [t, "switch", "binary_sensor"] : [t];
}
function Dt(t, e) {
  return !!(e && t.states[e]);
}
function jt(t, e, s, r) {
  const i = t.entities;
  if (!i)
    return;
  const n = [];
  for (const l of Object.values(i)) {
    if (!(l != null && l.entity_id) || !l.unique_id || l.device_id !== e || l.disabled_by || l.hidden_by)
      continue;
    const h = l.entity_id.split(".", 1)[0];
    r.includes(h) && Vt(l.unique_id, s) && n.push(l.entity_id);
  }
  return n.length === 0 ? void 0 : n.find((l) => Dt(t, l)) ?? n[0];
}
function It(t, e, s) {
  var o, l;
  if (!t)
    return;
  const r = (o = e.entities) == null ? void 0 : o[s.slot];
  if (r)
    return r;
  if (s.slot === "image" && e.image_entity)
    return e.image_entity;
  const i = (l = e.device_id) == null ? void 0 : l.trim();
  if (!i)
    return;
  const n = [s.key, ...s.fallbackKeys ?? []];
  for (const h of n) {
    const d = zt(s.domain, h), p = jt(t, i, h, d);
    if (p)
      return p;
  }
}
function we(t, e, s) {
  const r = {};
  for (const i of s)
    r[i.slot] = It(t, e, i);
  return r;
}
const at = [
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
  at.map((t) => [t.slot, t])
);
const Wt = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], qt = [
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
function R(t, e) {
  if (!(!t || !e))
    return t.states[e];
}
function y(t, e) {
  var s;
  return (s = R(t, e)) == null ? void 0 : s.state;
}
function re(t, e) {
  const s = y(t, e);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const r = Number(s);
  return Number.isFinite(r) ? r : void 0;
}
function K(t, e) {
  const s = y(t, e);
  return s === "on" || s === "open" || s === "unlocked";
}
function lt(t, e) {
  const s = y(t, e);
  return s === "ac" || s === "dc";
}
function Kt(t, e) {
  const s = R(t, e);
  if (!s)
    return !1;
  const r = s.state === "on";
  return s.attributes.device_class === "problem" ? r : !r;
}
function ct(t, e, s) {
  return Kt(t, e) ? "danger" : y(t, s) === "check_tyres" ? "warn" : "ok";
}
function $(t, e, s = "—") {
  const r = R(t, e);
  if (!r || r.state === "unknown" || r.state === "unavailable")
    return s;
  const i = r.attributes.unit_of_measurement;
  return i ? `${r.state} ${i}` : String(r.state);
}
function Ft(t, e, s = "—") {
  const r = re(t, e);
  if (r === void 0 || r < 0)
    return s;
  const i = Math.round(r), n = Math.floor(i / 60), o = i % 60;
  return n <= 0 ? `${o}m` : o <= 0 ? `${n}h` : `${n}h ${o}m`;
}
function pe(t, e) {
  if (/^https?:\/\//i.test(e))
    return e;
  const s = ((t == null ? void 0 : t.hassUrl) || "").replace(/\/$/, "");
  return s ? e.startsWith("/") ? `${s}${e}` : `${s}/${e}` : e;
}
function ht(t, e) {
  const s = R(t, e);
  if (!s)
    return;
  const r = s.attributes.entity_picture;
  if (typeof r == "string" && r)
    return pe(t, r);
  const i = s.attributes.access_token;
  return typeof i == "string" && i ? pe(
    t,
    `/api/image_proxy/${e}?token=${encodeURIComponent(i)}`
  ) : pe(t, `/api/image_proxy/${e}`);
}
async function w(t, e, s, r, i = {}) {
  await t.callService(e, s, { ...i, entity_id: r });
}
async function Gt(t, e) {
  await w(t, "lock", "lock", e);
}
async function Jt(t, e) {
  await w(t, "lock", "unlock", e);
}
async function Le(t, e) {
  const s = e.split(".", 1)[0];
  await w(t, s, "turn_on", e);
}
async function Ue(t, e) {
  const s = e.split(".", 1)[0];
  await w(t, s, "turn_off", e);
}
async function Qt(t, e) {
  const s = e.split(".", 1)[0];
  await w(t, s, "toggle", e);
}
async function ve(t, e) {
  await w(t, "cover", "open_cover", e);
}
async function ge(t, e) {
  await w(t, "cover", "close_cover", e);
}
function Re(t, e) {
  const s = y(t, e);
  return s === "open" || s === "opening";
}
async function Z(t, e) {
  await w(t, "button", "press", e);
}
function Q(t, e, s) {
  const r = R(t, e);
  if (!r)
    return;
  const i = r.attributes[s];
  if (i == null)
    return;
  const n = Number(i);
  return Number.isFinite(n) ? n : void 0;
}
function Ve(t, e) {
  return Q(t, e, "temperature");
}
function Xt(t, e) {
  return Q(t, e, "current_temperature");
}
function Yt(t, e) {
  return Q(t, e, "target_temp_step") ?? 1;
}
function es(t, e) {
  return Q(t, e, "min_temp") ?? 16;
}
function ts(t, e) {
  return Q(t, e, "max_temp") ?? 30;
}
function ze(t, e) {
  const s = y(t, e);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function ss(t, e, s) {
  await w(t, "climate", "set_hvac_mode", e, {
    hvac_mode: s
  });
}
async function rs(t, e, s) {
  await w(t, "climate", "set_temperature", e, {
    temperature: s
  });
}
async function is(t, e, s) {
  await w(t, "select", "select_option", e, {
    option: s
  });
}
function ns(t, e) {
  const s = R(t, e), r = s == null ? void 0 : s.attributes.options;
  return Array.isArray(r) ? r.map(String) : [];
}
function k(t, e) {
  t.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    })
  );
}
const $e = m`
  :host {
    display: block;
    --ck-accent: #0d9488;
    --ck-ok: #16a34a;
    --ck-warn: #d97706;
    --ck-info: #2563eb;
    --ck-bg: var(--card-background-color, #fff);
    --ck-text: var(--primary-text-color, #1a1a1a);
    --ck-muted: var(--secondary-text-color, #667);
    --ck-border: var(--divider-color, #e2e8f0);
    --ck-danger: #b91c1c;
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
`, dt = m`
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
m`
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
const ut = m`
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
m`
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
`;
const os = m`
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
`, as = m`
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
    background: var(--ck-border);
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
`, ls = m`
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
    color: #16a34a;
  }
  .soc-ring-pct.muted {
    color: var(--ck-muted, #667);
  }
  .soc-ring-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--ck-muted, #667);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`, cs = m`
  .charge-batt {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    flex-shrink: 0;
    color: var(--ck-ok, #16a34a);
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
    background: var(--ck-ok, #16a34a);
    opacity: 0.9;
    transition: width 0.25s ease;
  }
  .charge-batt-bolt {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 14px;
    height: 14px;
    color: #fff;
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.35));
    z-index: 1;
  }
  .charge-batt-cap {
    width: 4px;
    height: 12px;
    border-radius: 0 2px 2px 0;
    background: currentColor;
  }
`, hs = m`
  .charge-hero {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 16px;
  }
  .charge-hero-link {
    width: 16px;
    height: 2px;
    background: var(--ck-border);
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
function De(t, e, s, r, i) {
  if (!e || !r || !e.states[r])
    return c;
  let n = $(e, r);
  return a`
    <button
      type="button"
      class="metric"
      @click=${() => k(t, r)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${n}</span>
    </button>
  `;
}
function f(t) {
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
      ${t.icon ?? c}${s || !t.icon ? t.label : c}
    </button>
  `;
}
const ds = {
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
function fe(t) {
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
      ${ds[t.icon]}
    </button>
  `;
}
function je(t) {
  const { percent: e, primary: s, secondary: r, meta: i } = t;
  if (e === void 0 && !s && !r && !i)
    return c;
  const n = t.tone ?? "ok", o = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e));
  return a`
    <div class="hlevel tone-${n}">
      ${s ? a`<div class="hlevel-primary">${s}</div>` : c}
      ${o !== void 0 ? a`<div class="hlevel-pct">${Math.round(o)}%</div>` : c}
      <div
        class="hlevel-bar-wrap"
        aria-hidden=${o === void 0 ? "true" : "false"}
      >
        ${o !== void 0 ? a`<div class="hlevel-bar" style="width:${o}%"></div>` : c}
      </div>
      ${r || i ? a`<div class="hlevel-details">
            ${r ? a`<span class="hlevel-secondary">${r}</span>` : c}
            ${i ? a`<span class="hlevel-meta">${i}</span>` : c}
          </div>` : c}
    </div>
  `;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const us = { ATTRIBUTE: 1 }, ps = (t) => (...e) => ({ _$litDirective$: t, values: e });
let vs = class {
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
const pt = "important", gs = " !" + pt, Ie = ps(class extends vs {
  constructor(t) {
    var e;
    if (super(t), t.type !== us.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const n = typeof i == "string" && i.endsWith(gs);
        r.includes("-") || n ? s.setProperty(r, n ? i.slice(0, -11) : i, n ? pt : "") : s[r] = i;
      }
    }
    return M;
  }
});
function fs(t) {
  const { percent: e, onClick: s } = t;
  if (e === void 0 && !s)
    return c;
  const r = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e)), i = r === void 0 ? 0 : Math.round(r), n = r !== void 0 ? `${i}% SoC` : "SoC", o = Ie(r !== void 0 ? {
    background: `conic-gradient(from -90deg, #16a34a 0% ${i}%, #e2e8f0 ${i}% 100%)`
  } : {
    background: "conic-gradient(from -90deg, #e2e8f0 0% 100%)"
  }), l = a`
    <div class="soc-ring-meter" style=${o} aria-hidden="true"></div>
    <div class="soc-ring-center">
      ${r !== void 0 ? a`<span class="soc-ring-pct">${i}%</span>` : a`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">SoC</span>
    </div>
  `;
  return s ? a`
      <button
        type="button"
        class="soc-ring"
        aria-label=${n}
        @click=${s}
      >
        ${l}
      </button>
    ` : a`<div class="soc-ring">${l}</div>`;
}
function ms(t) {
  const { percent: e } = t, s = t.charging ?? !1, r = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e)), i = r === void 0 ? 0 : r;
  return a`
    <div
      class="charge-batt"
      role="img"
      aria-label=${r !== void 0 ? `Battery ${Math.round(r)}%${s ? ", charging" : ""}` : "Battery"}
    >
      <div class="charge-batt-body">
        ${r !== void 0 ? a`<div
              class="charge-batt-fill"
              style="width:${i}%"
            ></div>` : c}
        ${s ? a`<svg
              class="charge-batt-bolt"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"
              />
            </svg>` : c}
      </div>
      <div class="charge-batt-cap" aria-hidden="true"></div>
    </div>
  `;
}
var _s = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, vt = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? bs(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && _s(e, s, i), i;
};
let ie = class extends x {
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
ie.styles = m`
    :host {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
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
      fill: color-mix(in srgb, var(--ck-accent, #0d9488) 12%, #fff);
      stroke: var(--ck-border, #e2e8f0);
      stroke-width: 2;
    }
    .glass {
      fill: color-mix(in srgb, var(--ck-accent, #0d9488) 8%, #e8eef2);
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
      top: 54%;
    }
    .seat-rr {
      right: 18%;
      top: 54%;
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
      top: 66%;
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
vt([
  T({ type: String })
], ie.prototype, "src", 2);
ie = vt([
  _("carlinko-car-outline")
], ie);
var ys = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, gt = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ws(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && ys(e, s, i), i;
};
let ne = class extends x {
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
ne.styles = m`
    :host {
      display: block;
      width: 100%;
    }
    .wrap {
      position: relative;
      width: 100%;
      min-height: 120px;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: visible;
      background: var(--ha-card-background, linear-gradient(145deg, #e8eef2, #f7fafc));
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
      color: var(--ck-muted, #667);
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
  `;
gt([
  T({ type: String })
], ne.prototype, "src", 2);
ne = gt([
  _("carlinko-vehicle-stage")
], ne);
var $s = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, ke = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ks(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && $s(e, s, i), i;
};
function xs(t) {
  switch ((t || "unknown").toLowerCase()) {
    case "ready":
      return { label: "HV ready", tone: "ok" };
    case "lv":
      return { label: "HV LV", tone: "info" };
    case "off":
      return { label: "HV off", tone: "muted" };
    default:
      return { label: "HV unknown", tone: "warn" };
  }
}
let F = class extends x {
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
      title: "CarLinko"
    };
  }
  _slots() {
    return this._config ? we(this.hass, this._config, at) : {};
  }
  render() {
    var Ce;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((Ce = this._config.device_id) != null && Ce.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const t = this._slots(), e = ht(this.hass, t.image), s = K(this.hass, t.engine), r = K(this.hass, t.online), i = re(this.hass, t.battery), n = re(this.hass, t.fuel), o = t.odometer && this.hass.states[t.odometer] ? $(this.hass, t.odometer) : void 0, l = t.total_range && this.hass.states[t.total_range] ? $(this.hass, t.total_range) : void 0, h = s && t.engine && t.speed && this.hass.states[t.speed] ? $(this.hass, t.speed) : void 0, d = t.range && this.hass.states[t.range] ? $(this.hass, t.range) : void 0, p = t.fuel_range && this.hass.states[t.fuel_range] ? $(this.hass, t.fuel_range) : void 0, u = y(this.hass, t.hv_state), v = t.hv_state ? xs(u) : void 0, g = t.consumption && this.hass.states[t.consumption] ? $(this.hass, t.consumption) : void 0, b = t.fuel_consumption && this.hass.states[t.fuel_consumption] ? $(this.hass, t.fuel_consumption) : void 0, V = !!(o || l || h), Y = t.tyres_ok || t.tyre_status ? ct(this.hass, t.tyres_ok, t.tyre_status) : void 0, _t = Y === "danger" ? "Tyre problem" : Y === "warn" ? "Check tyres" : "Tyres OK", xe = t.tyres_ok ?? t.tyre_status;
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : c}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${e}>
              ${V ? a`<div slot="headline" class="headline">
                    ${o ? a`<button
                          type="button"
                          class="odo"
                          @click=${() => k(this, t.odometer)}
                        >
                          <span class="odo-label">Odometer</span>
                          <span class="odo-value">${o}</span>
                        </button>` : c}
                    ${l ? a`<button
                          type="button"
                          class="range-total"
                          @click=${() => k(this, t.total_range)}
                        >
                          <span class="range-label">Total range</span>
                          <span class="range-value">${l}</span>
                        </button>` : c}
                    ${h ? a`<button
                          type="button"
                          class="speed"
                          @click=${() => k(this, t.speed)}
                        >
                          <span class="speed-label">Speed</span>
                          <span class="speed-value">${h}</span>
                        </button>` : c}
                  </div>` : c}
              ${t.online ? a`<div slot="online">
                    ${fe({
      icon: "signal",
      label: r ? "Online" : "Offline",
      tone: r ? "ok" : "muted",
      onClick: () => k(this, t.online)
    })}
                  </div>` : c}
              ${t.hv_state && v ? a`<div slot="hv">
                    ${fe({
      icon: "hv",
      label: v.label,
      tone: v.tone,
      onClick: () => k(this, t.hv_state)
    })}
                  </div>` : c}
              ${Y && xe ? a`<div slot="tyres">
                    ${fe({
      icon: "tyre",
      label: _t,
      tone: Y,
      onClick: () => k(this, xe)
    })}
                  </div>` : c}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${je({
      percent: i,
      primary: i !== void 0 || d ? "SOC" : void 0,
      secondary: d,
      meta: g,
      tone: "ok"
    })}
              ${je({
      percent: n,
      primary: n !== void 0 || p ? "Fuel" : void 0,
      secondary: p,
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
F.styles = [
  $e,
  os,
  as,
  m`
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
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.85),
          0 0 8px rgba(255, 255, 255, 0.55);
      }
      .odo-value,
      .range-value,
      .speed-value {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.2;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.85),
          0 0 8px rgba(255, 255, 255, 0.55);
      }
    `
];
ke([
  T({ attribute: !1 })
], F.prototype, "hass", 2);
ke([
  U()
], F.prototype, "_config", 2);
F = ke([
  _("carlinko-overview")
], F);
var Cs = Object.defineProperty, ft = (t, e, s, r) => {
  for (var i = void 0, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(e, s, i) || i);
  return i && Cs(e, s, i), i;
};
const As = [
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
  }
], Ss = {
  name: "image_entity",
  label: "Image override (optional)",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, Os = {
  name: "image_entity",
  label: "Top image override (optional)",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class X extends x {
  setConfig(e) {
    this._config = { ...e };
  }
  /** Extra fields after device_id + title. */
  extraSchema() {
    return [];
  }
  _schema() {
    return [...As, ...this.extraSchema()];
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
    return !this.hass || !this._config ? c : a`
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
ft([
  T({ attribute: !1 })
], X.prototype, "hass");
ft([
  U()
], X.prototype, "_config");
var Es = Object.getOwnPropertyDescriptor, Ps = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Es(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let We = class extends X {
  extraSchema() {
    return [Ss];
  }
};
We = Ps([
  _("carlinko-overview-editor")
], We);
async function mt(t, e, s, r) {
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
var Hs = Object.defineProperty, Ms = Object.getOwnPropertyDescriptor, ae = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ms(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Hs(e, s, i), i;
};
const Ts = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
  </svg>
`;
let L = class extends x {
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
      title: "Charging"
    };
  }
  _slots() {
    return this._config ? we(this.hass, this._config, Wt) : {};
  }
  _run(t) {
    this.hass && mt(
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
    return !s || !((i = this.hass) != null && i.states[s]) ? c : a`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => k(this, s)}
      >
        <span class="charge-meta-label">${t}:</span>
        <span class="charge-meta-value${r ? ` ${r}` : ""}"
          >${e}</span
        >
      </button>
    `;
  }
  render() {
    var b;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((b = this._config.device_id) != null && b.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const t = this._slots(), e = K(this.hass, t.charging), s = re(this.hass, t.battery), r = !!(t.battery && this.hass.states[t.battery]), i = !!(t.charging && this.hass.states[t.charging]), n = !!(t.charge_power && this.hass.states[t.charge_power]), o = !!(t.charge_remaining && this.hass.states[t.charge_remaining]), l = t.charge_state && this.hass.states[t.charge_state] || t.charge_mode && this.hass.states[t.charge_mode], h = !!(t.charge_stop && this.hass.states[t.charge_stop]) && lt(this.hass, t.charge_mode), d = r || i || n || o, p = e ? "Charging" : "Not charging", u = e ? "ok" : "muted", v = $(this.hass, t.charge_power), g = Ft(this.hass, t.charge_remaining);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${d ? a`
                <div class="charge-hero">
                  ${r ? fs({
      percent: s,
      onClick: () => k(this, t.battery)
    }) : c}
                  ${r ? a`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${ms({
      percent: s,
      charging: e
    })}` : c}
                  <div class="charge-hero-meta">
                    ${i ? this._metaRow(
      "Plugged",
      p,
      t.charging,
      u
    ) : c}
                    ${n ? this._metaRow("Power", v, t.charge_power) : c}
                    ${o ? this._metaRow("Time", g, t.charge_remaining) : c}
                  </div>
                </div>
              ` : c}
          ${l ? a`
                <div class="charge-secondary">
                  ${De(
      this,
      this.hass,
      "Charge state",
      t.charge_state
    )}
                  ${De(this, this.hass, "Mode", t.charge_mode)}
                </div>
              ` : c}
        </div>
        ${h ? a`
              <div class="actions">
                ${f({
      label: "Stop charging",
      icon: Ts,
      showLabel: !0,
      disabled: this._busy,
      onClick: () => this._run(() => Z(this.hass, t.charge_stop))
    })}
              </div>
            ` : c}
      </ha-card>
    `;
  }
};
L.styles = [
  $e,
  dt,
  ut,
  ls,
  cs,
  hs
];
ae([
  T({ attribute: !1 })
], L.prototype, "hass", 2);
ae([
  U()
], L.prototype, "_config", 2);
ae([
  U()
], L.prototype, "_busy", 2);
L = ae([
  _("carlinko-charging")
], L);
var Ns = Object.getOwnPropertyDescriptor, Zs = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ns(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let qe = class extends X {
};
qe = Zs([
  _("carlinko-charging-editor")
], qe);
var Bs = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, le = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ls(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Bs(e, s, i), i;
};
const Ke = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], Us = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Rs = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"], Vs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`, zs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`, Ds = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`, js = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`, Fe = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`, Is = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4.5-5.5c-1.4 0-2.6.8-3.2 2A3.5 3.5 0 0 1 16 11.5c0 .2 0 .4-.05.6 1.3.5 2.3 1.7 2.3 3.1 0 1.9-1.6 3.4-3.5 3.4-.7 0-1.35-.2-1.9-.55A3.5 3.5 0 0 1 12 20.5a3.5 3.5 0 0 1-.85-6.85A3.5 3.5 0 0 1 8.25 18c-1.9 0-3.5-1.5-3.5-3.4 0-1.4 1-2.6 2.3-3.1A3.5 3.5 0 0 1 7 11.5c0-1.6 1.1-3 2.7-3.4A3.48 3.48 0 0 1 6.5 5.5C4.6 5.5 3 7 3 8.9c0 1.4 1 2.6 2.3 3.1A3.5 3.5 0 0 1 8 8.5c.7 0 1.35.2 1.9.55A3.5 3.5 0 0 1 12 3.5c.9 0 1.75.35 2.4.95A3.48 3.48 0 0 1 16.5 5.5c1.9 0 3.5 1.5 3.5 3.4 0 1.4-1 2.6-2.3 3.1.05-.2.05-.4.05-.6A3.5 3.5 0 0 1 16.5 5.5Z"
    />
  </svg>
`, Ws = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`, qs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`, Ks = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`, Fs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`, Gs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`, Js = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`, Qs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
    />
  </svg>
`, Xs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
    />
  </svg>
`, Ys = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
    />
  </svg>
`, er = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
    />
  </svg>
`, tr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
    />
  </svg>
`, sr = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
    />
  </svg>
`;
function rr(t) {
  return t.split(".", 1)[0];
}
function ir(t) {
  return !t || t === "unknown" || t === "unavailable" ? "—" : t === "off" || t === "on" ? t : t.replace(/^level_?/i, "l").slice(0, 4);
}
let C = class extends x {
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
      title: "Cabin"
    };
  }
  _slots() {
    return this._config ? we(this.hass, this._config, qt) : {};
  }
  _run(t) {
    this.hass && mt(
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
    const s = Ve(this.hass, e);
    if (s === void 0)
      return;
    const r = Yt(this.hass, e), i = es(this.hass, e), n = ts(this.hass, e), o = Math.min(n, Math.max(i, s + t * r));
    this._run(() => rs(this.hass, e, o));
  }
  _toggleClimate() {
    const t = this._slots().climate;
    if (!this.hass || !t)
      return;
    const e = ze(this.hass, t);
    this._run(
      () => ss(this.hass, t, e ? "off" : "cool")
    );
  }
  _cycleSelect(t) {
    if (!this.hass)
      return;
    const e = ns(this.hass, t);
    if (e.length === 0)
      return;
    const s = y(this.hass, t) ?? e[0], r = e.indexOf(s), i = e[(r + 1) % e.length];
    this._run(() => is(this.hass, t, i));
  }
  _toggleBinary(t) {
    if (!this.hass)
      return;
    const e = y(this.hass, t) === "on";
    this._run(
      () => e ? Ue(this.hass, t) : Le(this.hass, t)
    );
  }
  _hasDirectTpms(t) {
    return this.hass ? Rs.some((e) => {
      const s = t[e];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(t) {
    return this.hass ? Ke.some((e) => {
      const s = e.heat ? t[e.heat] : void 0, r = e.vent ? t[e.vent] : void 0;
      return s && this.hass.states[s] || r && this.hass.states[r];
    }) : !1;
  }
  _seatControl(t, e) {
    var h;
    if (!t || !((h = this.hass) != null && h.states[t]))
      return c;
    const s = y(this.hass, t), r = rr(t), i = e === "H" ? "heat" : "vent", n = e === "H" ? "Heat" : "Vent", o = ir(s), l = r === "select" ? () => this._cycleSelect(t) : () => this._toggleBinary(t);
    return a`
      <button
        type="button"
        class="seat-btn ${i}"
        ?disabled=${this._busy}
        title=${`${n}: ${s ?? "—"}`}
        aria-label=${`${n}: ${s ?? "—"}`}
        @click=${l}
      >
        ${e === "H" ? Fe : Is}
        <span class="seat-state">${o}</span>
      </button>
    `;
  }
  _seatZone(t, e) {
    var i, n;
    const s = t.heat ? e[t.heat] : void 0, r = t.vent ? e[t.vent] : void 0;
    return (!s || !((i = this.hass) != null && i.states[s])) && (!r || !((n = this.hass) != null && n.states[r])) ? c : a`
      <div slot=${t.slot} class="seat-zone">
        ${this._seatControl(s, "H")} ${this._seatControl(r, "V")}
      </div>
    `;
  }
  _sensorBtn(t, e) {
    if (!this.hass || !t || !this.hass.states[t])
      return c;
    const s = $(this.hass, t);
    return a`
      <button
        type="button"
        class=${e}
        @click=${() => k(this, t)}
      >
        ${s}
      </button>
    `;
  }
  _wheelZone(t, e) {
    var l, h;
    const s = e[t.pressure], r = e[t.temp], i = !!(s && ((l = this.hass) != null && l.states[s])), n = !!(r && ((h = this.hass) != null && h.states[r]));
    if (!i && !n)
      return c;
    const o = ct(this.hass, e.tyres_ok, e.tyre_status);
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
    return lt(this.hass, t.charge_mode);
  }
  _hasBodyControls(t) {
    return this._entityExists(t.lock) || this._entityExists(t.engine) || this._entityExists(t.defog) || this._entityExists(t.charge_stop) && this._chargerConnected(t) || this._entityExists(t.trunk);
  }
  _bodyActions(t) {
    const e = t.lock, s = t.engine, r = t.defog, i = t.charge_stop, n = t.trunk, o = this._chargerConnected(t), l = this._entityExists(i) && o;
    if (!e && !s && !r && !l && !n)
      return c;
    const d = y(this.hass, e) === "locked", p = K(this.hass, s), u = K(this.hass, r), v = !!(r != null && r.startsWith("binary_sensor.")), g = y(this.hass, n) === "open";
    return a`
      ${this._entityExists(s) ? a`<div slot="engine" class="map-actions">
            ${f({
      label: p ? "Turn engine off" : "Turn engine on",
      icon: sr,
      disabled: this._busy,
      variant: p ? "ok" : "",
      onClick: () => this._run(
        () => p ? Ue(this.hass, s) : Le(this.hass, s)
      )
    })}
          </div>` : c}
      ${this._entityExists(e) ? a`<div slot="lock" class="map-actions">
            ${f({
      label: d ? "Unlock doors" : "Lock doors",
      icon: d ? Qs : Xs,
      disabled: this._busy,
      variant: d ? "" : "danger",
      onClick: () => this._run(
        () => d ? Jt(this.hass, e) : Gt(this.hass, e)
      )
    })}
          </div>` : c}
      ${this._entityExists(r) ? a`<div slot="defog" class="map-actions">
            ${f({
      label: u ? "Turn defog off" : "Turn defog on",
      icon: Ys,
      disabled: this._busy || v,
      variant: u ? "ok" : "",
      onClick: () => this._run(() => Qt(this.hass, r))
    })}
          </div>` : c}
      ${l ? a`<div slot="charge" class="map-actions">
            ${f({
      label: "Stop charge",
      icon: er,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => Z(this.hass, i))
    })}
          </div>` : c}
      ${this._entityExists(n) ? a`<div slot="trunk" class="map-actions">
            ${f({
      label: g ? "Close trunk" : "Open trunk",
      icon: tr,
      disabled: this._busy,
      variant: g ? "ok" : "",
      onClick: () => this._run(
        () => g ? ge(this.hass, n) : ve(this.hass, n)
      )
    })}
          </div>` : c}
    `;
  }
  _windowsCluster(t) {
    const e = t.windows, s = t.windows_vent, r = this._entityExists(e), i = this._entityExists(s);
    if (!r && !i)
      return c;
    const n = r && Re(this.hass, e);
    return a`
      <div slot="windows" class="map-actions">
        ${r ? f(n ? {
      label: "Close windows",
      icon: qs,
      disabled: this._busy,
      onClick: () => this._run(() => ge(this.hass, e))
    } : {
      label: "Open windows",
      icon: Ws,
      disabled: this._busy,
      onClick: () => this._run(() => ve(this.hass, e))
    }) : c}
        ${i ? f({
      label: "Vent windows",
      icon: Ks,
      disabled: this._busy,
      onClick: () => this._run(() => Z(this.hass, s))
    }) : c}
      </div>
    `;
  }
  _sunroofCluster(t) {
    const e = t.sunroof, s = t.sunroof_tilt, r = this._entityExists(e), i = this._entityExists(s);
    if (!r && !i)
      return c;
    const n = r && Re(this.hass, e);
    return a`
      <div slot="sunroof" class="map-actions">
        ${r ? f(n ? {
      label: "Close sunroof",
      icon: Gs,
      disabled: this._busy,
      onClick: () => this._run(() => ge(this.hass, e))
    } : {
      label: "Open sunroof",
      icon: Fs,
      disabled: this._busy,
      onClick: () => this._run(() => ve(this.hass, e))
    }) : c}
        ${i ? f({
      label: "Tilt sunroof",
      icon: Js,
      disabled: this._busy,
      onClick: () => this._run(() => Z(this.hass, s))
    }) : c}
      </div>
    `;
  }
  render() {
    var b;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((b = this._config.device_id) != null && b.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const t = this._slots(), e = t.climate, s = e ? this.hass.states[e] : void 0, r = ze(this.hass, e), i = Ve(this.hass, e), n = Xt(this.hass, e), o = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), l = this._hasSeats(t), h = this._hasDirectTpms(t), d = this._hasWindowsControls(t), p = this._hasBodyControls(t), u = ht(this.hass, t.image), v = l || h || d || p, g = !!(s || t.quick_cool && this.hass.states[t.quick_cool] || t.quick_heat && this.hass.states[t.quick_heat]);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${g ? a`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? a`
                          ${f({
      label: r ? "Climate off" : "Climate on",
      icon: Vs,
      disabled: this._busy,
      variant: r ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${f({
      label: "Increase temperature",
      icon: zs,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(1)
    })}
                          <span class="setpoint-value" title="Setpoint"
                            >${i !== void 0 ? `${i}${o}` : "—"}</span
                          >
                          ${f({
      label: "Decrease temperature",
      icon: Ds,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : c}
                  </div>
                  <div class="controls-right">
                    ${t.quick_cool && this.hass.states[t.quick_cool] ? f({
      label: "Quick cool",
      icon: js,
      disabled: this._busy,
      onClick: () => this._run(
        () => Z(this.hass, t.quick_cool)
      )
    }) : c}
                    ${t.quick_heat && this.hass.states[t.quick_heat] ? f({
      label: "Quick heat",
      icon: Fe,
      disabled: this._busy,
      onClick: () => this._run(
        () => Z(this.hass, t.quick_heat)
      )
    }) : c}
                  </div>
                </div>
              ` : c}
          ${s && n !== void 0 ? a`
                <div class="current-row">
                  <span class="metric-label">Current</span>
                  <span class="metric-value">${n}${o}</span>
                </div>
              ` : c}
          ${v ? a`
                <carlinko-car-outline .src=${u}>
                  ${this._bodyActions(t)} ${this._windowsCluster(t)}
                  ${this._sunroofCluster(t)}
                  ${Ke.map((V) => this._seatZone(V, t))}
                  ${h ? Us.map((V) => this._wheelZone(V, t)) : c}
                </carlinko-car-outline>
              ` : c}
        </div>
      </ha-card>
    `;
  }
};
C.styles = [
  $e,
  dt,
  ut,
  m`
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
        --ck-seat-heat: #d64545;
        --ck-seat-vent: #3b82c4;
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
      .wheel-zone {
        --ck-tyre-ok: #3d9a5f;
        --ck-tyre-warn: #d97706;
        --ck-tyre-danger: #d64545;
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
    `
];
le([
  T({ attribute: !1 })
], C.prototype, "hass", 2);
le([
  U()
], C.prototype, "_config", 2);
le([
  U()
], C.prototype, "_busy", 2);
C = le([
  _("carlinko-cabin")
], C);
var nr = Object.getOwnPropertyDescriptor, or = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? nr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let G = class extends X {
  extraSchema() {
    return [Os];
  }
};
G = or([
  _("carlinko-cabin-editor")
], G);
var ar = Object.getOwnPropertyDescriptor, lr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ar(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let Ge = class extends C {
  static getConfigElement() {
    return document.createElement("carlinko-climate-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "Climate"
    };
  }
};
Ge = lr([
  _("carlinko-climate")
], Ge);
var cr = Object.getOwnPropertyDescriptor, hr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? cr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let Je = class extends G {
};
Je = hr([
  _("carlinko-climate-editor")
], Je);
var dr = Object.getOwnPropertyDescriptor, ur = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? dr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let Qe = class extends C {
  static getConfigElement() {
    return document.createElement("carlinko-tpms-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "TPMS"
    };
  }
};
Qe = ur([
  _("carlinko-tpms")
], Qe);
var pr = Object.getOwnPropertyDescriptor, vr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? pr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let Xe = class extends G {
};
Xe = vr([
  _("carlinko-tpms-editor")
], Xe);
var gr = Object.getOwnPropertyDescriptor, fr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? gr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let Ye = class extends C {
  static getConfigElement() {
    return document.createElement("carlinko-windows-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "Windows"
    };
  }
};
Ye = fr([
  _("carlinko-windows")
], Ye);
var mr = Object.getOwnPropertyDescriptor, _r = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? mr(e, s) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = o(i) || i);
  return i;
};
let et = class extends G {
};
et = _r([
  _("carlinko-windows-editor")
], et);
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
