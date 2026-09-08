/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, Rt = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Nt = Symbol(), Ft = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== Nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Rt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Ft.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ft.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ne = (e) => new ye(typeof e == "string" ? e : e + "", void 0, Nt), C = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new ye(s, e, Nt);
}, Ue = (e, t) => {
  if (Rt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = pt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, Zt = Rt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Ne(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: He, defineProperty: De, getOwnPropertyDescriptor: Be, getOwnPropertyNames: je, getOwnPropertySymbols: ze, getPrototypeOf: Ie } = Object, U = globalThis, Jt = U.trustedTypes, qe = Jt ? Jt.emptyScript : "", kt = U.reactiveElementPolyfillSupport, X = (e, t) => e, gt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? qe : null;
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
} }, Ut = (e, t) => !He(e, t), Gt = { attribute: !0, type: String, converter: gt, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), U.litPropertyMetadata ?? (U.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Gt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && De(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: r } = Be(this.prototype, t) ?? { get() {
      return this[s];
    }, set(n) {
      this[s] = n;
    } };
    return { get: o, set(n) {
      const l = o == null ? void 0 : o.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Gt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const t = Ie(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const s = this.properties, i = [...je(s), ...ze(s)];
      for (const o of i) this.createProperty(o, s[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, o] of s) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const o = this._$Eu(s, i);
      o !== void 0 && this._$Eh.set(o, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) s.unshift(Zt(o));
    } else t !== void 0 && s.push(Zt(t));
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
    return Ue(t, this.constructor.elementStyles), t;
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
    var r;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : gt).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var r, n;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const l = i.getPropertyOptions(o), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : gt;
      this._$Em = o;
      const p = a.fromAttribute(s, l.type);
      this[o] = p ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, r) {
    var n;
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (r = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? Ut)(r, s) || i.useDefault && i.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: o, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? s ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: l } = n, a = this[r];
        l !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, n, a);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(s)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[X("elementProperties")] = /* @__PURE__ */ new Map(), F[X("finalized")] = /* @__PURE__ */ new Map(), kt == null || kt({ ReactiveElement: F }), (U.reactiveElementVersions ?? (U.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis, Yt = (e) => e, _t = tt.trustedTypes, Qt = _t ? _t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, we = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, ke = "?" + R, We = `<${ke}>`, q = document, et = () => q.createComment(""), st = (e) => e === null || typeof e != "object" && typeof e != "function", Ht = Array.isArray, Ke = (e) => Ht(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", $t = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Xt = /-->/g, te = />/g, D = RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ee = /'/g, se = /"/g, $e = /^(?:script|style|textarea|title)$/i, Ve = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), h = Ve(1), W = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), ie = /* @__PURE__ */ new WeakMap(), j = q.createTreeWalker(q, 129);
function xe(e, t) {
  if (!Ht(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Qt !== void 0 ? Qt.createHTML(t) : t;
}
const Fe = (e, t) => {
  const s = e.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Q;
  for (let l = 0; l < s; l++) {
    const a = e[l];
    let p, f, u = -1, g = 0;
    for (; g < a.length && (n.lastIndex = g, f = n.exec(a), f !== null); ) g = n.lastIndex, n === Q ? f[1] === "!--" ? n = Xt : f[1] !== void 0 ? n = te : f[2] !== void 0 ? ($e.test(f[2]) && (o = RegExp("</" + f[2], "g")), n = D) : f[3] !== void 0 && (n = D) : n === D ? f[0] === ">" ? (n = o ?? Q, u = -1) : f[1] === void 0 ? u = -2 : (u = n.lastIndex - f[2].length, p = f[1], n = f[3] === void 0 ? D : f[3] === '"' ? se : ee) : n === se || n === ee ? n = D : n === Xt || n === te ? n = Q : (n = D, o = void 0);
    const m = n === D && e[l + 1].startsWith("/>") ? " " : "";
    r += n === Q ? a + We : u >= 0 ? (i.push(p), a.slice(0, u) + we + a.slice(u) + R + m) : a + R + (u === -2 ? l : m);
  }
  return [xe(e, r + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class it {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [p, f] = Fe(t, s);
    if (this.el = it.createElement(p, i), j.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = j.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(we)) {
          const g = f[n++], m = o.getAttribute(u).split(R), b = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: r, name: b[2], strings: m, ctor: b[1] === "." ? Je : b[1] === "?" ? Ge : b[1] === "@" ? Ye : mt }), o.removeAttribute(u);
        } else u.startsWith(R) && (a.push({ type: 6, index: r }), o.removeAttribute(u));
        if ($e.test(o.tagName)) {
          const u = o.textContent.split(R), g = u.length - 1;
          if (g > 0) {
            o.textContent = _t ? _t.emptyScript : "";
            for (let m = 0; m < g; m++) o.append(u[m], et()), j.nextNode(), a.push({ type: 2, index: ++r });
            o.append(u[g], et());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ke) a.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(R, u + 1)) !== -1; ) a.push({ type: 7, index: r }), u += R.length - 1;
      }
      r++;
    }
  }
  static createElement(t, s) {
    const i = q.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Z(e, t, s = e, i) {
  var n, l;
  if (t === W) return t;
  let o = i !== void 0 ? (n = s._$Co) == null ? void 0 : n[i] : s._$Cl;
  const r = st(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = Z(e, o._$AS(e, t.values), o, i)), t;
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
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? q).importNode(s, !0);
    j.currentNode = o;
    let r = j.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new at(r, r.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (p = new Qe(r, this, t)), this._$AV.push(p), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (r = j.nextNode(), n++);
    }
    return j.currentNode = q, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class at {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, o) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = Z(this, t, s), st(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ke(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && st(this._$AH) ? this._$AA.nextSibling.data = t : this.T(q.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = it.createElement(xe(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(s);
    else {
      const n = new Ze(o, this), l = n.u(this.options);
      n.p(s), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = ie.get(t.strings);
    return s === void 0 && ie.set(t.strings, s = new it(t)), s;
  }
  k(t) {
    Ht(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const r of t) o === s.length ? s.push(i = new at(this.O(et()), this.O(et()), this, this.options)) : i = s[o], i._$AI(r), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const o = Yt(t).nextSibling;
      Yt(t).remove(), t = o;
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
  constructor(t, s, i, o, r) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, s = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = Z(this, t, s, 0), n = !st(t) || t !== this._$AH && t !== W, n && (this._$AH = t);
    else {
      const l = t;
      let a, p;
      for (t = r[0], a = 0; a < r.length - 1; a++) p = Z(this, l[i + a], s, a), p === W && (p = this._$AH[a]), n || (n = !st(p) || p !== this._$AH[a]), p === c ? t = c : t !== c && (t += (p ?? "") + r[a + 1]), this._$AH[a] = p;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Je extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Ge extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Ye extends mt {
  constructor(t, s, i, o, r) {
    super(t, s, i, o, r), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = Z(this, t, s, 0) ?? c) === W) return;
    const i = this._$AH, o = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== c && (i === c || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Qe {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Z(this, t);
  }
}
const xt = tt.litHtmlPolyfillSupport;
xt == null || xt(it, at), (tt.litHtmlVersions ?? (tt.litHtmlVersions = [])).push("3.3.3");
const Xe = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new at(t.insertBefore(et(), r), r, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis;
let T = class extends F {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Xe(s, this.renderRoot, this.renderOptions);
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
    return W;
  }
};
var be;
T._$litElement$ = !0, T.finalized = !0, (be = I.litElementHydrateSupport) == null || be.call(I, { LitElement: T });
const Ct = I.litElementPolyfillSupport;
Ct == null || Ct({ LitElement: T });
(I.litElementVersions ?? (I.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ts = { attribute: !0, type: String, converter: gt, reflect: !1, hasChanged: Ut }, es = (e = ts, t, s) => {
  const { kind: i, metadata: o } = s;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(s.name, e), i === "accessor") {
    const { name: n } = s;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, e, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = s;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function V(e) {
  return (t, s) => typeof s == "object" ? es(e, t, s) : ((i, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(e) {
  return V({ ...e, state: !0, attribute: !1 });
}
const ss = {
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
    windshield_heat_on: "Turn windshield heat on",
    windshield_heat_off: "Turn windshield heat off",
    steer_heat_on: "Turn steering wheel heat on",
    steer_heat_off: "Turn steering wheel heat off",
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
}, is = {
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
    defrost_cmd: "Defog",
    windshield_heat: "Windshield heat",
    steer_heat: "Steering wheel heat"
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
}, L = {
  off: "Off",
  l1: "Low",
  l2: "Medium",
  l3: "High"
}, os = {
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
    seat_heat_l: L,
    seat_heat_r: L,
    seat_heat_lr: L,
    seat_heat_rr: L,
    seat_vent_l: L,
    seat_vent_r: L,
    seat_vent_lr: L,
    seat_vent_rr: L
  }
}, Dt = "carlinko";
let oe = !1, ut;
function rs(e) {
  const [t, s] = e.split(".", 2), i = ss[t];
  return (i == null ? void 0 : i[s]) ?? e;
}
function Ce(e, t) {
  var i;
  const s = (i = e == null ? void 0 : e.localize) == null ? void 0 : i.call(e, t);
  if (!(typeof s != "string" || !s.trim()) && !(s === t || s.startsWith("component.carlinko.")))
    return s;
}
function d(e, t) {
  return rs(t);
}
function k(e, t, s) {
  var r;
  const i = `component.${Dt}.entity.${t}.${s}.name`, o = Ce(e, i);
  return o || (((r = is[t]) == null ? void 0 : r[s]) ?? s);
}
function N(e, t, s, i) {
  var l, a;
  if (!i)
    return "—";
  const o = i.toLowerCase(), r = `component.${Dt}.entity.${t}.${s}.state.${o}`, n = Ce(e, r);
  return n || (((a = (l = os[t]) == null ? void 0 : l[s]) == null ? void 0 : a[o]) ?? i);
}
function ns(e, t) {
  const s = d(e, "status.hv_prefix"), i = N(
    e,
    "sensor",
    "hv_state",
    t || "unknown"
  );
  return `${s} ${i}`;
}
async function Bt(e) {
  return !(e != null && e.loadBackendTranslation) || oe ? !1 : (ut || (ut = e.loadBackendTranslation("entity", Dt).then(() => (oe = !0, !0)).catch((t) => (console.warn("carlinko-card: failed to load entity translations", t), ut = void 0, !1))), ut);
}
const re = "carlinko";
function as(e, t) {
  if (e.translation_key === t)
    return !0;
  const s = e.unique_id;
  if (s && (s === t || s.endsWith(`_${t}`) || s.startsWith("carlinko_") && s.endsWith(`_${t}`)))
    return !0;
  const i = e.entity_id.split(".", 2)[1] ?? "";
  return i === t || i.endsWith(`_${t}`);
}
function cs(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function ls(e, t) {
  return !!(t && e.states[t]);
}
function hs(e) {
  return !!(e.disabled_by || e.hidden_by || e.hidden);
}
function ds(e, t, s, i) {
  const o = e.entities;
  if (!o)
    return;
  const r = [];
  for (const a of Object.values(o)) {
    if (!(a != null && a.entity_id) || a.device_id !== t || hs(a))
      continue;
    const p = a.entity_id.split(".", 1)[0];
    i.includes(p) && as(a, s) && r.push(a);
  }
  if (r.length === 0)
    return;
  const n = [...r].sort((a, p) => {
    const f = a.platform === re ? 0 : 1, u = p.platform === re ? 0 : 1;
    return f - u;
  });
  return (n.find((a) => ls(e, a.entity_id)) ?? n[0]).entity_id;
}
function us(e, t, s) {
  var n, l;
  if (!e)
    return;
  const i = (n = t.entities) == null ? void 0 : n[s.slot];
  if (i)
    return i;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const o = (l = t.device_id) == null ? void 0 : l.trim();
  if (!o)
    return;
  const r = [s.key, ...s.fallbackKeys ?? []];
  for (const a of r) {
    const p = cs(s.domain, a), f = ds(e, o, a, p);
    if (f)
      return f;
  }
}
function ps(e, t, s) {
  const i = {};
  for (const o of s)
    i[o.slot] = us(e, t, o);
  return i;
}
function jt(e, t, s) {
  if (e === t)
    return !1;
  if (!e || !t)
    return !0;
  for (const i of s)
    if (i && e.states[i] !== t.states[i])
      return !0;
  return !1;
}
class zt {
  invalidate() {
    this._map = void 0, this._deviceId = void 0, this._imageEntity = void 0, this._entitiesJson = void 0, this._entitiesRef = void 0;
  }
  /** Last resolved map, if any (for shouldUpdate without re-resolve). */
  peek() {
    return this._map;
  }
  get(t, s, i) {
    const o = s.device_id ?? "", r = s.image_entity ?? "", n = JSON.stringify(s.entities ?? null), l = t == null ? void 0 : t.entities;
    return this._map && this._deviceId === o && this._imageEntity === r && this._entitiesJson === n && this._entitiesRef === l ? this._map : (this._map = ps(t, s, i), this._deviceId = o, this._imageEntity = r, this._entitiesJson = n, this._entitiesRef = l, this._map);
  }
}
const fs = [
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
], gs = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], _s = [
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
  { slot: "windshield_heat", key: "windshield_heat", domain: "switch" },
  { slot: "steer_heat", key: "steer_heat", domain: "switch" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" },
  { slot: "trunk", key: "liftgate", domain: "cover" }
];
function Y(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function $(e, t) {
  var s;
  return (s = Y(e, t)) == null ? void 0 : s.state;
}
function ot(e, t) {
  const s = $(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const i = Number(s);
  return Number.isFinite(i) ? i : void 0;
}
function z(e, t) {
  const s = $(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function Se(e, t) {
  const s = $(e, t);
  return s === "ac" || s === "dc";
}
function ms(e, t) {
  const s = Y(e, t);
  if (!s)
    return !1;
  const i = s.state === "on";
  return s.attributes.device_class === "problem" ? i : !i;
}
function Ee(e, t, s) {
  return ms(e, t) ? "danger" : $(e, s) === "check_tyres" ? "warn" : "ok";
}
function E(e, t, s = "—") {
  const i = Y(e, t);
  if (!i || i.state === "unknown" || i.state === "unavailable")
    return s;
  const o = i.attributes.unit_of_measurement;
  return o ? `${i.state} ${o}` : String(i.state);
}
function vs(e, t, s = "—") {
  const i = ot(e, t);
  if (i === void 0 || i < 0)
    return s;
  const o = Math.round(i), r = Math.floor(o / 60), n = o % 60;
  return r <= 0 ? `${n}m` : n <= 0 ? `${r}h` : `${r}h ${n}m`;
}
function St(e, t) {
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
function Ae(e, t) {
  const s = Y(e, t);
  if (!s)
    return;
  const i = s.attributes.entity_picture;
  if (typeof i == "string" && i)
    return St(e, i);
  const o = s.attributes.access_token;
  return typeof o == "string" && o ? St(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(o)}`
  ) : St(e, `/api/image_proxy/${t}`);
}
async function A(e, t, s, i, o = {}) {
  await e.callService(t, s, { ...o, entity_id: i });
}
async function bs(e, t) {
  await A(e, "lock", "lock", t);
}
async function ys(e, t) {
  await A(e, "lock", "unlock", t);
}
async function ne(e, t) {
  const s = t.split(".", 1)[0];
  await A(e, s, "turn_on", t);
}
async function Et(e, t) {
  const s = t.split(".", 1)[0];
  await A(e, s, "turn_off", t);
}
async function At(e, t) {
  const s = t.split(".", 1)[0];
  await A(e, s, "toggle", t);
}
async function Ot(e, t) {
  await A(e, "cover", "open_cover", t);
}
async function Tt(e, t) {
  await A(e, "cover", "close_cover", t);
}
function ae(e, t) {
  const s = $(e, t);
  return s === "open" || s === "opening";
}
async function B(e, t) {
  await A(e, "button", "press", t);
}
function ct(e, t, s) {
  const i = Y(e, t);
  if (!i)
    return;
  const o = i.attributes[s];
  if (o == null)
    return;
  const r = Number(o);
  return Number.isFinite(r) ? r : void 0;
}
function ce(e, t) {
  return ct(e, t, "temperature");
}
function ws(e, t) {
  return ct(e, t, "current_temperature");
}
function ks(e, t) {
  return ct(e, t, "target_temp_step") ?? 1;
}
function $s(e, t) {
  return ct(e, t, "min_temp") ?? 16;
}
function xs(e, t) {
  return ct(e, t, "max_temp") ?? 30;
}
function le(e, t) {
  const s = $(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function Cs(e, t, s) {
  await A(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function Ss(e, t, s) {
  await A(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function he(e, t, s) {
  await A(e, "select", "select_option", t, {
    option: s
  });
}
function de(e, t) {
  const s = Y(e, t), i = s == null ? void 0 : s.attributes.options;
  return Array.isArray(i) ? i.map(String) : [];
}
function w(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
const It = C`
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
`, Oe = C`
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
`, Te = C`
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
`, Es = C`
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
`, As = C`
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
`, Os = C`
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
`, Ts = C`
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
`, Ps = C`
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
function ue(e, t, s, i, o) {
  if (!t || !i || !t.states[i])
    return c;
  let r = E(t, i);
  if (o != null && o.numeric) {
    const n = ot(t, i);
    if (n === void 0)
      return c;
    r = o.suffix ? `${n}${o.suffix}` : String(n);
  } else if (o != null && o.stateKey) {
    const n = $(t, i);
    n && n !== "unknown" && n !== "unavailable" && (r = N(t, o.stateKey.domain, o.stateKey.key, n));
  }
  return h`
    <button
      type="button"
      class="metric"
      @click=${() => w(e, i)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${r}</span>
    </button>
  `;
}
function y(e) {
  const t = e.variant || "", s = !!(e.icon && e.showLabel), i = !!(e.icon && !e.showLabel), o = [
    "action",
    t,
    i ? "icon" : "",
    s ? "with-icon" : ""
  ].filter(Boolean).join(" ");
  return h`
    <button
      type="button"
      class=${o}
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
const Ms = {
  signal: "mdi:car-wireless",
  hv: "mdi:car-electric",
  tyre: "mdi:tire"
};
function Pt(e) {
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
      ${_(Ms[e.icon])}
    </button>
  `;
}
function pe(e) {
  const {
    percent: t,
    primary: s,
    secondary: i,
    meta: o,
    onPercentClick: r,
    onSecondaryClick: n,
    onMetaClick: l
  } = e;
  if (t === void 0 && !s && !i && !o)
    return c;
  const a = e.tone ?? "ok", p = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), f = p !== void 0 ? `${Math.round(p)}%` : void 0, u = h`
    <div
      class="hlevel-bar-wrap"
      aria-hidden=${p === void 0 ? "true" : "false"}
    >
      ${p !== void 0 ? h`<div class="hlevel-bar" style="width:${p}%"></div>` : c}
    </div>
  `, g = r && (f !== void 0 || p !== void 0) ? h`<button
          type="button"
          class="hlevel-percent"
          aria-label=${f ?? s ?? "level"}
          @click=${r}
        >
          ${f !== void 0 ? h`<div class="hlevel-pct">${f}</div>` : c}
          ${u}
        </button>` : h`
          ${f !== void 0 ? h`<div class="hlevel-pct">${f}</div>` : c}
          ${u}
        `, m = i ? n ? h`<button
          type="button"
          class="hlevel-secondary"
          @click=${n}
        >
          ${i}
        </button>` : h`<span class="hlevel-secondary">${i}</span>` : c, b = o ? l ? h`<button type="button" class="hlevel-meta" @click=${l}>
          ${o}
        </button>` : h`<span class="hlevel-meta">${o}</span>` : c;
  return h`
    <div class="hlevel tone-${a}">
      ${s ? h`<div class="hlevel-primary">${s}</div>` : c}
      ${g}
      ${i || o ? h`<div class="hlevel-details">${m}${b}</div>` : c}
    </div>
  `;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ls = { ATTRIBUTE: 1 }, Rs = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Ns = class {
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
const Pe = "important", Us = " !" + Pe, Hs = Rs(class extends Ns {
  constructor(e) {
    var t;
    if (super(e), e.type !== Ls.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
      const o = t[i];
      if (o != null) {
        this.ft.add(i);
        const r = typeof o == "string" && o.endsWith(Us);
        i.includes("-") || r ? s.setProperty(i, r ? o.slice(0, -11) : o, r ? Pe : "") : s[i] = o;
      }
    }
    return W;
  }
});
function Ds(e) {
  const { percent: t, onClick: s } = e, i = e.socLabel ?? "SoC";
  if (t === void 0 && !s)
    return c;
  const o = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), r = o === void 0 ? 0 : Math.round(o), n = o !== void 0 ? `${r}% ${i}` : i, l = o !== void 0 ? Hs({ "--ck-soc-pct": `${r}%` }) : c, a = h`
    <div
      class="soc-ring-meter ${o === void 0 ? "empty" : ""}"
      style=${l}
      aria-hidden="true"
    ></div>
    <div class="soc-ring-center">
      ${o !== void 0 ? h`<span class="soc-ring-pct">${r}%</span>` : h`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">${i}</span>
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
function Bs(e) {
  const t = e.charging ?? !1, s = e.batteryLabel ?? "Battery", i = e.chargingLabel ?? "charging", o = e.percent === void 0 || Number.isNaN(e.percent) ? void 0 : Math.max(0, Math.min(100, e.percent));
  return h`
    <div
      class="charge-power ${t ? "is-charging" : "is-idle"}"
      role="img"
      aria-label=${t ? `${i}${o !== void 0 ? `, ${s} ${Math.round(o)}%` : ""}` : `${i}: off`}
    >
      <span class="charge-power-bolt"
        >${_("mdi:lightning-bolt")}</span
      >
    </div>
  `;
}
var js = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, vt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? zs(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && js(t, s, o), o;
};
let J = class extends T {
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
J.styles = C`
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
vt([
  V({ type: String })
], J.prototype, "src", 2);
vt([
  P()
], J.prototype, "_imageReady", 2);
vt([
  P()
], J.prototype, "_imageFailed", 2);
J = vt([
  H("carlinko-car-outline")
], J);
var Is = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, qt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? qs(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Is(t, s, o), o;
};
let rt = class extends T {
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
rt.styles = C`
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
qt([
  V({ type: String })
], rt.prototype, "src", 2);
qt([
  P()
], rt.prototype, "_imageReady", 2);
rt = qt([
  H("carlinko-vehicle-stage")
], rt);
var Ws = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, Wt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ks(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Ws(t, s, o), o;
};
function Vs(e, t) {
  const s = (t || "unknown").toLowerCase(), i = ns(e, s);
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
let nt = class extends T {
  constructor() {
    super(...arguments), this._slotCache = new zt();
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
      return s ? jt(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Bt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, fs) : {};
  }
  render() {
    var M;
    if (!this._config)
      return h`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((M = this._config.device_id) != null && M.trim()))
      return h`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = Ae(this.hass, e.image), s = z(this.hass, e.engine), i = z(this.hass, e.online), o = ot(this.hass, e.battery), r = ot(this.hass, e.fuel), n = e.odometer && this.hass.states[e.odometer] ? E(this.hass, e.odometer) : void 0, l = e.total_range && this.hass.states[e.total_range] ? E(this.hass, e.total_range) : void 0, a = s && e.engine && e.speed && this.hass.states[e.speed] ? E(this.hass, e.speed) : void 0, p = e.range && this.hass.states[e.range] ? E(this.hass, e.range) : void 0, f = e.fuel_range && this.hass.states[e.fuel_range] ? E(this.hass, e.fuel_range) : void 0, u = $(this.hass, e.hv_state), g = e.hv_state ? Vs(this.hass, u) : void 0, m = e.consumption && this.hass.states[e.consumption] ? E(this.hass, e.consumption) : void 0, b = e.fuel_consumption && this.hass.states[e.fuel_consumption] ? E(this.hass, e.fuel_consumption) : void 0, x = !!(n || l || a), v = e.tyres_ok || e.tyre_status ? Ee(this.hass, e.tyres_ok, e.tyre_status) : void 0, S = v === "danger" ? k(this.hass, "binary_sensor", "tyres_ok") : v === "warn" ? N(this.hass, "sensor", "tyre_status", "check_tyres") : d(this.hass, "status.tyres_ok"), O = e.tyres_ok ?? e.tyre_status;
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
                          @click=${() => w(this, e.odometer)}
                        >
                          <span class="odo-label"
                            >${k(
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
                          @click=${() => w(this, e.total_range)}
                        >
                          <span class="range-label"
                            >${k(
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
                          @click=${() => w(this, e.speed)}
                        >
                          <span class="speed-label"
                            >${k(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${a}</span>
                        </button>` : c}
                  </div>` : c}
              ${e.online ? h`<div slot="online">
                    ${Pt({
      icon: "signal",
      label: i ? k(this.hass, "binary_sensor", "online") : d(this.hass, "status.offline"),
      tone: i ? "ok" : "muted",
      onClick: () => w(this, e.online)
    })}
                  </div>` : c}
              ${e.hv_state && g ? h`<div slot="hv">
                    ${Pt({
      icon: "hv",
      label: g.label,
      tone: g.tone,
      onClick: () => w(this, e.hv_state)
    })}
                  </div>` : c}
              ${v && O ? h`<div slot="tyres">
                    ${Pt({
      icon: "tyre",
      label: S,
      tone: v,
      onClick: () => w(this, O)
    })}
                  </div>` : c}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${pe({
      percent: o,
      primary: o !== void 0 || p ? d(this.hass, "status.soc") : void 0,
      secondary: p,
      meta: m,
      tone: "ok",
      onPercentClick: e.battery && this.hass.states[e.battery] ? () => w(this, e.battery) : void 0,
      onSecondaryClick: e.range && this.hass.states[e.range] ? () => w(this, e.range) : void 0,
      onMetaClick: e.consumption && this.hass.states[e.consumption] ? () => w(this, e.consumption) : void 0
    })}
              ${pe({
      percent: r,
      primary: r !== void 0 || f ? k(this.hass, "sensor", "fuel") : void 0,
      secondary: f,
      meta: b,
      tone: "info",
      onPercentClick: e.fuel && this.hass.states[e.fuel] ? () => w(this, e.fuel) : void 0,
      onSecondaryClick: e.fuel_range && this.hass.states[e.fuel_range] ? () => w(this, e.fuel_range) : void 0,
      onMetaClick: e.fuel_consumption && this.hass.states[e.fuel_consumption] ? () => w(this, e.fuel_consumption) : void 0
    })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
nt.styles = [
  It,
  Es,
  As,
  C`
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
Wt([
  V({ attribute: !1 })
], nt.prototype, "hass", 2);
Wt([
  P()
], nt.prototype, "_config", 2);
nt = Wt([
  H("carlinko-overview")
], nt);
var Fs = Object.defineProperty, Me = (e, t, s, i) => {
  for (var o = void 0, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = n(t, s, o) || o);
  return o && Fs(t, s, o), o;
};
const Zs = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, Le = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class lt extends T {
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
        const s = t === Le;
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
Me([
  V({ attribute: !1 })
], lt.prototype, "hass");
Me([
  P()
], lt.prototype, "_config");
var Js = Object.getOwnPropertyDescriptor, Gs = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Js(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = n(o) || o);
  return o;
};
let fe = class extends lt {
  extraSchema() {
    return [Zs];
  }
};
fe = Gs([
  H("carlinko-overview-editor")
], fe);
async function Re(e, t, s, i) {
  if (e())
    return !1;
  t(!0);
  try {
    return await s(), !0;
  } catch (o) {
    return i == null || i(o), !1;
  } finally {
    t(!1);
  }
}
var Ys = Object.defineProperty, Qs = Object.getOwnPropertyDescriptor, bt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Qs(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Ys(t, s, o), o;
};
let G = class extends T {
  constructor() {
    super(...arguments), this._busy = !1, this._slotCache = new zt();
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
      return s ? jt(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Bt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, gs) : {};
  }
  _run(e) {
    this.hass && Re(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-charging action failed", t)
    );
  }
  _metaRow(e, t, s, i) {
    var o;
    return !s || !((o = this.hass) != null && o.states[s]) ? c : h`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => w(this, s)}
      >
        <span class="charge-meta-label">${e}:</span>
        <span class="charge-meta-value${i ? ` ${i}` : ""}"
          >${t}</span
        >
      </button>
    `;
  }
  render() {
    var v;
    if (!this._config)
      return h`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((v = this._config.device_id) != null && v.trim()))
      return h`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = z(this.hass, e.charging), s = ot(this.hass, e.battery), i = !!(e.battery && this.hass.states[e.battery]), o = !!(e.charging && this.hass.states[e.charging]), r = !!(e.charge_power && this.hass.states[e.charge_power]), n = !!(e.charge_remaining && this.hass.states[e.charge_remaining]), l = e.charge_state && this.hass.states[e.charge_state] || e.charge_mode && this.hass.states[e.charge_mode], a = !!(e.charge_stop && this.hass.states[e.charge_stop]) && Se(this.hass, e.charge_mode), p = i || o || r || n, f = t ? k(this.hass, "binary_sensor", "charging") : d(this.hass, "status.not_charging"), u = t ? "ok" : "muted", g = E(this.hass, e.charge_power), m = vs(this.hass, e.charge_remaining), b = k(this.hass, "sensor", "battery"), x = d(this.hass, "status.soc");
    return h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${p ? h`
                <div class="charge-hero">
                  ${i ? Ds({
      percent: s,
      socLabel: x,
      onClick: () => w(this, e.battery)
    }) : c}
                  ${i ? h`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${Bs({
      percent: s,
      charging: t,
      batteryLabel: b,
      chargingLabel: k(
        this.hass,
        "binary_sensor",
        "charging"
      )
    })}` : c}
                  <div class="charge-hero-meta">
                    ${o ? this._metaRow(
      d(this.hass, "status.plugged"),
      f,
      e.charging,
      u
    ) : c}
                    ${r ? this._metaRow(
      d(this.hass, "status.power"),
      g,
      e.charge_power
    ) : c}
                    ${n ? this._metaRow(
      d(this.hass, "status.time"),
      m,
      e.charge_remaining
    ) : c}
                  </div>
                </div>
              ` : c}
          ${l ? h`
                <div class="charge-secondary">
                  ${ue(
      this,
      this.hass,
      k(this.hass, "sensor", "charge_state"),
      e.charge_state,
      { stateKey: { domain: "sensor", key: "charge_state" } }
    )}
                  ${ue(
      this,
      this.hass,
      k(this.hass, "sensor", "charge_mode"),
      e.charge_mode,
      { stateKey: { domain: "sensor", key: "charge_mode" } }
    )}
                </div>
              ` : c}
        </div>
        ${a ? h`
              <div class="actions">
                ${y({
      label: k(this.hass, "button", "charge_stop"),
      icon: _("mdi:stop"),
      showLabel: !0,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => B(this.hass, e.charge_stop))
    })}
              </div>
            ` : c}
      </ha-card>
    `;
  }
};
G.styles = [
  It,
  Oe,
  Te,
  Os,
  Ts,
  Ps
];
bt([
  V({ attribute: !1 })
], G.prototype, "hass", 2);
bt([
  P()
], G.prototype, "_config", 2);
bt([
  P()
], G.prototype, "_busy", 2);
G = bt([
  H("carlinko-charging")
], G);
var Xs = Object.getOwnPropertyDescriptor, ti = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Xs(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = n(o) || o);
  return o;
};
let ge = class extends lt {
};
ge = ti([
  H("carlinko-charging-editor")
], ge);
var ei = Object.defineProperty, si = Object.getOwnPropertyDescriptor, ht = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? si(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && ei(t, s, o), o;
};
const _e = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], ii = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], me = [
  { slot: "door-fl", door: "door_fl", key: "door_driver" },
  { slot: "door-fr", door: "door_fr", key: "door_passenger" },
  { slot: "door-rl", door: "door_rl", key: "door_rear_left" },
  { slot: "door-rr", door: "door_rr", key: "door_rear_right" }
], oi = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"];
function Mt(e) {
  return e.split(".", 1)[0];
}
function ri(e) {
  if (!e)
    return !0;
  const t = e.toLowerCase();
  return t === "off" || t === "unavailable";
}
function ft(e) {
  return (e == null ? void 0 : e.toLowerCase()) === "unknown";
}
function Lt(e) {
  return !!e && !ri(e) && !ft(e);
}
let K = class extends T {
  constructor() {
    super(...arguments), this._busy = !1, this._openSeatMenu = null, this._slotCache = new zt(), this._onDocPointerDown = (e) => {
      if (!this._openSeatMenu)
        return;
      e.composedPath().some(
        (i) => i instanceof HTMLElement && (i.classList.contains("seat-icon") || i.classList.contains("seat-menu"))
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
      title: d(void 0, "stub.cabin")
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
      return s ? jt(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Bt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, _s) : {};
  }
  _run(e) {
    this.hass && Re(
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
    const s = ce(this.hass, t);
    if (s === void 0)
      return;
    const i = ks(this.hass, t), o = $s(this.hass, t), r = xs(this.hass, t), n = Math.min(r, Math.max(o, s + e * i));
    this._run(() => Ss(this.hass, t, n));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = le(this.hass, e);
    this._run(
      () => Cs(this.hass, e, t ? "off" : "cool")
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
    return de(this.hass, e).find(
      (t) => t.toLowerCase() === "off"
    );
  }
  async _turnSeatOff(e) {
    var s;
    if (!((s = this.hass) != null && s.states[e]))
      return;
    const t = $(this.hass, e);
    if (Lt(t)) {
      if (Mt(e) === "select") {
        const i = this._offSelectOption(e);
        if (!i)
          return;
        await he(this.hass, e, i);
        return;
      }
      await Et(this.hass, e);
    }
  }
  _setSeatLevel(e, t, s) {
    this.hass && this._run(async () => {
      t.toLowerCase() !== "off" && s && await this._turnSeatOff(s), await he(this.hass, e, t);
    });
  }
  _toggleSeatBinary(e, t) {
    if (!this.hass)
      return;
    const s = $(this.hass, e) === "on";
    this._run(async () => {
      !s && t && await this._turnSeatOff(t), s ? await Et(this.hass, e) : await ne(this.hass, e);
    });
  }
  _seatStateLabel(e, t, s) {
    return Mt(e) === "select" ? N(this.hass, "select", t, s) : s === "on" ? "On" : N(this.hass, "select", t, "off");
  }
  _hasDirectTpms(e) {
    return this.hass ? oi.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(e) {
    return this.hass ? _e.some((t) => {
      const s = t.heat ? e[t.heat] : void 0, i = t.vent ? e[t.vent] : void 0;
      return s && this.hass.states[s] || i && this.hass.states[i];
    }) : !1;
  }
  _seatIcon(e, t, s, i, o, r) {
    var v;
    const n = $(this.hass, s), l = Mt(s), a = t === "heat" ? d(this.hass, "status.heat") : d(this.hass, "status.vent"), p = this._seatStateLabel(s, i, n), f = ((v = this._openSeatMenu) == null ? void 0 : v.slot) === e.slot && this._openSeatMenu.kind === t, u = l === "select", g = u ? (S) => {
      S.stopPropagation(), this._toggleSeatMenu(e.slot, t);
    } : () => this._toggleSeatBinary(s, o), m = e.slot === "seat-rl" || e.slot === "seat-rr", b = e.slot === "seat-fr" || e.slot === "seat-rr", x = u ? de(this.hass, s) : [];
    return h`
      <div
        class="seat-icon-wrap"
        @mouseenter=${() => {
      u && !this._busy && (this._openSeatMenu = { slot: e.slot, kind: t });
    }}
        @mouseleave=${() => {
      u && this._closeSeatMenu();
    }}
      >
        <button
          type="button"
          class="seat-icon ${t}${r ? " active" : ""}${f ? " open" : ""}"
          ?disabled=${this._busy}
          title=${`${a}: ${p}`}
          aria-label=${`${a}: ${p}`}
          aria-haspopup=${u ? "listbox" : c}
          aria-expanded=${u ? String(f) : c}
          @click=${g}
        >
          ${_(t === "heat" ? "mdi:car-seat-heater" : "mdi:car-seat-cooler")}
        </button>
        ${f && u ? h`
              <div
                class="seat-menu ${t}${m ? " up" : ""}${b ? " end" : ""}"
                role="listbox"
                aria-label=${a}
              >
                ${x.map((S) => {
      const O = S === n, M = S.toLowerCase() === "off", dt = N(
        this.hass,
        "select",
        i,
        S
      );
      return h`
                    <button
                      type="button"
                      class="seat-option${M ? " off" : ""}${O ? " current" : ""}"
                      role="option"
                      aria-selected=${String(O)}
                      ?disabled=${this._busy}
                      @click=${(yt) => {
        yt.stopPropagation(), this._closeSeatMenu(), this._setSeatLevel(s, S, o);
      }}
                    >
                      ${dt}
                    </button>
                  `;
    })}
              </div>
            ` : c}
      </div>
    `;
  }
  _seatZone(e, t) {
    var m, b, x;
    const s = e.heat ? t[e.heat] : void 0, i = e.vent ? t[e.vent] : void 0, o = s && ((m = this.hass) != null && m.states[s]) ? s : void 0, r = i && ((b = this.hass) != null && b.states[i]) ? i : void 0;
    if (!o && !r)
      return c;
    const n = o ? $(this.hass, o) : void 0, l = r ? $(this.hass, r) : void 0, a = Lt(n), p = Lt(l);
    let f = "off", u = N(this.hass, "select", "seat_heat_l", "off");
    if (a && e.heat)
      f = "heat", u = this._seatStateLabel(o, e.heat, n);
    else if (p && e.vent)
      f = "vent", u = this._seatStateLabel(r, e.vent, l);
    else if (ft(n) || ft(l)) {
      f = "unknown";
      const v = e.heat ?? e.vent ?? "seat_heat_l", S = ft(n) ? n : l;
      u = N(this.hass, "select", v, S);
    }
    const g = ((x = this._openSeatMenu) == null ? void 0 : x.slot) === e.slot;
    return h`
      <div
        slot=${e.slot}
        class="seat-chip${g ? " menu-open" : ""}"
      >
        <div class="seat-icons">
          ${o && e.heat ? this._seatIcon(e, "heat", o, e.heat, r, a) : c}
          ${r && e.vent ? this._seatIcon(e, "vent", r, e.vent, o, p) : c}
        </div>
        <span class="seat-state ${f}">${u}</span>
      </div>
    `;
  }
  _wheelChip(e, t, s) {
    if (!this.hass)
      return c;
    const i = !!(e && this.hass.states[e]), o = !!(t && this.hass.states[t]);
    if (!i && !o)
      return c;
    const r = i ? E(this.hass, e) : void 0, n = o ? E(this.hass, t) : void 0, l = i ? e : t, a = [r, n].filter(Boolean).join(", ");
    return h`
      <button
        type="button"
        class="wheel-chip tone-${s}"
        title=${a}
        aria-label=${a}
        @click=${() => w(this, l)}
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
    const s = t[e.pressure], i = t[e.temp], o = !!(s && ((l = this.hass) != null && l.states[s])), r = !!(i && ((a = this.hass) != null && a.states[i]));
    if (!o && !r)
      return c;
    const n = Ee(this.hass, t.tyres_ok, t.tyre_status);
    return h`
      <div slot=${e.slot} class="wheel-zone">
        ${this._wheelChip(s, i, n)}
      </div>
    `;
  }
  _entityExists(e) {
    var t;
    return !!(e && ((t = this.hass) != null && t.states[e]));
  }
  _hasDoorSensors(e) {
    return me.some((t) => this._entityExists(e[t.door]));
  }
  _doorZone(e, t) {
    const s = t[e.door];
    if (!this._entityExists(s))
      return c;
    const i = $(this.hass, s), o = i === "on", r = o || i === "off", n = r ? o ? "danger" : "ok" : "muted", l = r ? d(this.hass, o ? "status.door_open" : "status.door_closed") : d(this.hass, "status.door_unknown"), a = `${k(this.hass, "binary_sensor", e.key)}: ${l}`;
    return h`
      <div slot=${e.slot} class="door-zone">
        <button
          type="button"
          class="door-dot tone-${n}"
          title=${a}
          aria-label=${a}
          @click=${() => w(this, s)}
        ></button>
      </div>
    `;
  }
  _hasWindowsControls(e) {
    return this._entityExists(e.windows) || this._entityExists(e.windows_vent) || this._entityExists(e.sunroof) || this._entityExists(e.sunroof_tilt);
  }
  _chargerConnected(e) {
    return Se(this.hass, e.charge_mode);
  }
  _hasBodyControls(e) {
    return this._entityExists(e.lock) || this._entityExists(e.engine) || this._entityExists(e.find) || this._entityExists(e.defog) || this._entityExists(e.windshield_heat) || this._entityExists(e.steer_heat) || this._entityExists(e.charge_stop) && this._chargerConnected(e) || this._entityExists(e.trunk);
  }
  _bodyActions(e) {
    const t = e.lock, s = e.engine, i = e.find, o = e.defog, r = e.windshield_heat, n = e.steer_heat, l = e.charge_stop, a = e.trunk, p = this._chargerConnected(e), f = this._entityExists(l) && p, u = this._entityExists(t), g = this._entityExists(s), m = this._entityExists(i), b = this._entityExists(o), x = this._entityExists(r), v = this._entityExists(n);
    if (!t && !g && !m && !b && !x && !v && !f && !a)
      return c;
    const O = $(this.hass, t) === "locked", M = z(this.hass, s), dt = z(this.hass, o), yt = !!(o != null && o.startsWith("binary_sensor.")), Kt = z(this.hass, r), Vt = z(this.hass, n), wt = $(this.hass, a) === "open";
    return h`
      ${u || g || m ? h`<div slot="engine" class="map-actions">
            ${u ? y({
      label: O ? d(this.hass, "action.unlock_doors") : d(this.hass, "action.lock_doors"),
      icon: _(O ? "mdi:car-door-lock" : "mdi:lock-open-variant"),
      disabled: this._busy,
      variant: O ? "ok" : "danger",
      onClick: () => this._run(
        () => O ? ys(this.hass, t) : bs(this.hass, t)
      )
    }) : c}
            ${g ? y({
      label: M ? d(this.hass, "action.engine_off") : d(this.hass, "action.engine_on"),
      icon: _("mdi:engine"),
      disabled: this._busy,
      variant: M ? "ok" : "",
      onClick: () => this._run(
        () => M ? Et(this.hass, s) : ne(this.hass, s)
      )
    }) : c}
            ${m ? y({
      label: k(this.hass, "button", "find"),
      icon: _("mdi:map-marker"),
      disabled: this._busy,
      onClick: () => this._run(() => B(this.hass, i))
    }) : c}
          </div>` : c}
      ${b || x || v ? h`<div slot="defog" class="map-actions">
            ${v ? y({
      label: Vt ? d(this.hass, "action.steer_heat_off") : d(this.hass, "action.steer_heat_on"),
      icon: _("mdi:steering"),
      disabled: this._busy,
      variant: Vt ? "heat" : "",
      onClick: () => this._run(() => At(this.hass, n))
    }) : c}
            ${b ? y({
      label: dt ? d(this.hass, "action.defog_off") : d(this.hass, "action.defog_on"),
      icon: _("mdi:car-defrost-front"),
      disabled: this._busy || yt,
      variant: dt ? "danger" : "",
      onClick: () => this._run(() => At(this.hass, o))
    }) : c}
            ${x ? y({
      label: Kt ? d(this.hass, "action.windshield_heat_off") : d(this.hass, "action.windshield_heat_on"),
      icon: _("mdi:car-windshield"),
      disabled: this._busy,
      variant: Kt ? "heat" : "",
      onClick: () => this._run(
        () => At(this.hass, r)
      )
    }) : c}
          </div>` : c}
      ${f ? h`<div slot="charge" class="map-actions">
            ${y({
      label: k(this.hass, "button", "charge_stop"),
      icon: _("mdi:ev-station"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => B(this.hass, l))
    })}
          </div>` : c}
      ${this._entityExists(a) ? h`<div slot="trunk" class="map-actions">
            ${y({
      label: wt ? d(this.hass, "action.close_trunk") : d(this.hass, "action.open_trunk"),
      icon: _("mdi:car-back"),
      disabled: this._busy,
      variant: wt ? "danger" : "ok",
      onClick: () => this._run(
        () => wt ? Tt(this.hass, a) : Ot(this.hass, a)
      )
    })}
          </div>` : c}
    `;
  }
  _windowsCluster(e) {
    const t = e.windows, s = e.windows_vent, i = this._entityExists(t), o = this._entityExists(s);
    if (!i && !o)
      return c;
    const r = i && ae(this.hass, t);
    return h`
      <div slot="windows" class="map-actions map-actions-stack">
        ${i ? y(r ? {
      label: d(this.hass, "action.close_windows"),
      icon: _("mdi:window-closed"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => Tt(this.hass, t))
    } : {
      label: d(this.hass, "action.open_windows"),
      icon: _("mdi:window-open"),
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => Ot(this.hass, t))
    }) : c}
        ${o ? y({
      label: d(this.hass, "action.vent_windows"),
      icon: _("mdi:window-open-variant"),
      disabled: this._busy,
      onClick: () => this._run(() => B(this.hass, s))
    }) : c}
      </div>
    `;
  }
  _sunroofCluster(e) {
    const t = e.sunroof, s = e.sunroof_tilt, i = this._entityExists(t), o = this._entityExists(s);
    if (!i && !o)
      return c;
    const r = i && ae(this.hass, t);
    return h`
      <div slot="sunroof" class="map-actions">
        ${i ? y(r ? {
      label: d(this.hass, "action.close_sunroof"),
      icon: _("mdi:window-closed"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => Tt(this.hass, t))
    } : {
      label: d(this.hass, "action.open_sunroof"),
      icon: _("mdi:window-open"),
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => Ot(this.hass, t))
    }) : c}
        ${o ? y({
      label: d(this.hass, "action.tilt_sunroof"),
      icon: _("mdi:angle-acute"),
      disabled: this._busy,
      onClick: () => this._run(() => B(this.hass, s))
    }) : c}
      </div>
    `;
  }
  render() {
    var x;
    if (!this._config)
      return h`<ha-card
        ><div class="pad">${d(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((x = this._config.device_id) != null && x.trim()))
      return h`<ha-card
        ><div class="pad">${d(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card
        ><div class="pad">${d(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, i = le(this.hass, t), o = ce(this.hass, t), r = ws(this.hass, t), n = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), l = this._hasSeats(e), a = this._hasDirectTpms(e), p = this._hasWindowsControls(e), f = this._hasBodyControls(e), u = this._hasDoorSensors(e), g = Ae(this.hass, e.image), m = l || a || p || f || u, b = !!(s || e.quick_cool && this.hass.states[e.quick_cool] || e.quick_heat && this.hass.states[e.quick_heat]);
    return h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${b ? h`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? h`
                          ${y({
      label: i ? d(this.hass, "climate.off") : d(this.hass, "climate.on"),
      icon: _("mdi:power"),
      disabled: this._busy,
      variant: i ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${y({
      label: d(this.hass, "climate.increase_temp"),
      icon: _("mdi:plus"),
      disabled: this._busy || o === void 0,
      variant: "heat",
      onClick: () => this._nudgeTemp(1)
    })}
                          <span
                            class="setpoint-value"
                            title=${d(this.hass, "climate.setpoint")}
                            >${o !== void 0 ? `${o}${n}` : "—"}</span
                          >
                          ${y({
      label: d(this.hass, "climate.decrease_temp"),
      icon: _("mdi:minus"),
      disabled: this._busy || o === void 0,
      variant: "cool",
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : c}
                  </div>
                  <div class="controls-right">
                    ${e.quick_cool && this.hass.states[e.quick_cool] ? y({
      label: k(this.hass, "button", "quick_cool"),
      icon: _("mdi:snowflake"),
      disabled: this._busy,
      variant: "cool",
      onClick: () => this._run(
        () => B(this.hass, e.quick_cool)
      )
    }) : c}
                    ${e.quick_heat && this.hass.states[e.quick_heat] ? y({
      label: k(this.hass, "button", "quick_heat"),
      icon: _("mdi:fire"),
      disabled: this._busy,
      variant: "heat",
      onClick: () => this._run(
        () => B(this.hass, e.quick_heat)
      )
    }) : c}
                  </div>
                </div>
              ` : c}
          ${s && r !== void 0 ? h`
                <div class="current-row">
                  <span class="metric-label"
                    >${d(this.hass, "climate.current")}</span
                  >
                  <span class="metric-value">${r}${n}</span>
                </div>
              ` : c}
          ${m ? h`
                <carlinko-car-outline .src=${g}>
                  ${this._bodyActions(e)} ${this._windowsCluster(e)}
                  ${this._sunroofCluster(e)}
                  ${_e.map((v) => this._seatZone(v, e))}
                  ${me.map((v) => this._doorZone(v, e))}
                  ${a ? ii.map((v) => this._wheelZone(v, e)) : c}
                </carlinko-car-outline>
              ` : c}
        </div>
      </ha-card>
    `;
  }
};
K.styles = [
  It,
  Oe,
  Te,
  C`
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
ht([
  V({ attribute: !1 })
], K.prototype, "hass", 2);
ht([
  P()
], K.prototype, "_config", 2);
ht([
  P()
], K.prototype, "_busy", 2);
ht([
  P()
], K.prototype, "_openSeatMenu", 2);
K = ht([
  H("carlinko-cabin")
], K);
var ni = Object.getOwnPropertyDescriptor, ai = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ni(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = n(o) || o);
  return o;
};
let ve = class extends lt {
  extraSchema() {
    return [Le];
  }
};
ve = ai([
  H("carlinko-cabin-editor")
], ve);
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
  "%c CARLINKO-CARD %c 0.1.10 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
