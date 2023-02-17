! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t || self).d3Timescale = {})
}(this, function(t) {
    var e = {
        value: () => {}
    };

    function n() {
        for (var t, e = 0, n = arguments.length, a = {}; e < n; ++e) {
            if (!(t = arguments[e] + "") || t in a || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
            a[t] = []
        }
        return new r(a)
    }

    function r(t) {
        this._ = t
    }

    function a(t, e) {
        return t.trim().split(/^|\s+/).map(function(t) {
            var n = "",
                r = t.indexOf(".");
            if (r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), t && !e.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            return {
                type: t,
                name: n
            }
        })
    }

    function i(t, e) {
        for (var n, r = 0, a = t.length; r < a; ++r)
            if ((n = t[r]).name === e) return n.value
    }

    function o(t, n, r) {
        for (var a = 0, i = t.length; a < i; ++a)
            if (t[a].name === n) {
                t[a] = e, t = t.slice(0, a).concat(t.slice(a + 1));
                break
            } return null != r && t.push({
            name: n,
            value: r
        }), t
    }
    r.prototype = n.prototype = {
        constructor: r,
        on: function(t, e) {
            var n, r = this._,
                l = a(t + "", r),
                u = -1,
                s = l.length;
            if (!(arguments.length < 2)) {
                if (null != e && "function" != typeof e) throw new Error("invalid callback: " + e);
                for (; ++u < s;)
                    if (n = (t = l[u]).type) r[n] = o(r[n], t.name, e);
                    else if (null == e)
                    for (n in r) r[n] = o(r[n], t.name, null);
                return this
            }
            for (; ++u < s;)
                if ((n = (t = l[u]).type) && (n = i(r[n], t.name))) return n
        },
        copy: function() {
            var t = {},
                e = this._;
            for (var n in e) t[n] = e[n].slice();
            return new r(t)
        },
        call: function(t, e) {
            if ((n = arguments.length - 2) > 0)
                for (var n, r, a = new Array(n), i = 0; i < n; ++i) a[i] = arguments[i + 2];
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (i = 0, n = (r = this._[t]).length; i < n; ++i) r[i].value.apply(e, a)
        },
        apply: function(t, e, n) {
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (var r = this._[t], a = 0, i = r.length; a < i; ++a) r[a].value.apply(e, n)
        }
    };
    var l = "http://www.w3.org/1999/xhtml",
        u = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: l,
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };

    function s(t) {
        var e = t += "",
            n = e.indexOf(":");
        return n >= 0 && "xmlns" !== (e = t.slice(0, n)) && (t = t.slice(n + 1)), u.hasOwnProperty(e) ? {
            space: u[e],
            local: t
        } : t
    }

    function c(t) {
        return function() {
            var e = this.ownerDocument,
                n = this.namespaceURI;
            return n === l && e.documentElement.namespaceURI === l ? e.createElement(t) : e.createElementNS(n, t)
        }
    }

    function h(t) {
        return function() {
            return this.ownerDocument.createElementNS(t.space, t.local)
        }
    }

    function f(t) {
        var e = s(t);
        return (e.local ? h : c)(e)
    }

    function d() {}

    function p(t) {
        return null == t ? d : function() {
            return this.querySelector(t)
        }
    }

    function v(t) {
        return null == t ? [] : Array.isArray(t) ? t : Array.from(t)
    }

    function m() {
        return []
    }

    function g(t) {
        return null == t ? m : function() {
            return this.querySelectorAll(t)
        }
    }

    function y(t) {
        return function() {
            return this.matches(t)
        }
    }

    function _(t) {
        return function(e) {
            return e.matches(t)
        }
    }
    var w = Array.prototype.find;

    function x() {
        return this.firstElementChild
    }
    var b = Array.prototype.filter;

    function I() {
        return Array.from(this.children)
    }

    function C(t) {
        return new Array(t.length)
    }

    function F(t, e) {
        this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e
    }

    function E(t) {
        return function() {
            return t
        }
    }

    function A(t, e, n, r, a, i) {
        for (var o, l = 0, u = e.length, s = i.length; l < s; ++l)(o = e[l]) ? (o.__data__ = i[l], r[l] = o) : n[l] = new F(t, i[l]);
        for (; l < u; ++l)(o = e[l]) && (a[l] = o)
    }

    function B(t, e, n, r, a, i, o) {
        var l, u, s, c = new Map,
            h = e.length,
            f = i.length,
            d = new Array(h);
        for (l = 0; l < h; ++l)(u = e[l]) && (d[l] = s = o.call(u, u.__data__, l, e) + "", c.has(s) ? a[l] = u : c.set(s, u));
        for (l = 0; l < f; ++l) s = o.call(t, i[l], l, i) + "", (u = c.get(s)) ? (r[l] = u, u.__data__ = i[l], c.delete(s)) : n[l] = new F(t, i[l]);
        for (l = 0; l < h; ++l)(u = e[l]) && c.get(d[l]) === u && (a[l] = u)
    }

    function k(t) {
        return t.__data__
    }

    function D(t) {
        return "object" == typeof t && "length" in t ? t : Array.from(t)
    }

    function M(t, e) {
        return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
    }

    function z(t) {
        return function() {
            this.removeAttribute(t)
        }
    }

    function N(t) {
        return function() {
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function S(t, e) {
        return function() {
            this.setAttribute(t, e)
        }
    }

    function T(t, e) {
        return function() {
            this.setAttributeNS(t.space, t.local, e)
        }
    }

    function P(t, e) {
        return function() {
            var n = e.apply(this, arguments);
            null == n ? this.removeAttribute(t) : this.setAttribute(t, n)
        }
    }

    function X(t, e) {
        return function() {
            var n = e.apply(this, arguments);
            null == n ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n)
        }
    }

    function q(t) {
        return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
    }

    function L(t) {
        return function() {
            this.style.removeProperty(t)
        }
    }

    function O(t, e, n) {
        return function() {
            this.style.setProperty(t, e, n)
        }
    }

    function R(t, e, n) {
        return function() {
            var r = e.apply(this, arguments);
            null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, n)
        }
    }

    function Y(t, e) {
        return t.style.getPropertyValue(e) || q(t).getComputedStyle(t, null).getPropertyValue(e)
    }

    function j(t) {
        return function() {
            delete this[t]
        }
    }

    function H(t, e) {
        return function() {
            this[t] = e
        }
    }

    function V(t, e) {
        return function() {
            var n = e.apply(this, arguments);
            null == n ? delete this[t] : this[t] = n
        }
    }

    function G(t) {
        return t.trim().split(/^|\s+/)
    }

    function K(t) {
        return t.classList || new $(t)
    }

    function $(t) {
        this._node = t, this._names = G(t.getAttribute("class") || "")
    }

    function U(t, e) {
        for (var n = K(t), r = -1, a = e.length; ++r < a;) n.add(e[r])
    }

    function J(t, e) {
        for (var n = K(t), r = -1, a = e.length; ++r < a;) n.remove(e[r])
    }

    function W(t) {
        return function() {
            U(this, t)
        }
    }

    function Q(t) {
        return function() {
            J(this, t)
        }
    }

    function Z(t, e) {
        return function() {
            (e.apply(this, arguments) ? U : J)(this, t)
        }
    }

    function tt() {
        this.textContent = ""
    }

    function et(t) {
        return function() {
            this.textContent = t
        }
    }

    function nt(t) {
        return function() {
            var e = t.apply(this, arguments);
            this.textContent = null == e ? "" : e
        }
    }

    function rt() {
        this.innerHTML = ""
    }

    function at(t) {
        return function() {
            this.innerHTML = t
        }
    }

    function it(t) {
        return function() {
            var e = t.apply(this, arguments);
            this.innerHTML = null == e ? "" : e
        }
    }

    function ot() {
        this.nextSibling && this.parentNode.appendChild(this)
    }

    function lt() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }

    function ut() {
        return null
    }

    function st() {
        var t = this.parentNode;
        t && t.removeChild(this)
    }

    function ct() {
        var t = this.cloneNode(!1),
            e = this.parentNode;
        return e ? e.insertBefore(t, this.nextSibling) : t
    }

    function ht() {
        var t = this.cloneNode(!0),
            e = this.parentNode;
        return e ? e.insertBefore(t, this.nextSibling) : t
    }

    function ft(t) {
        return t.trim().split(/^|\s+/).map(function(t) {
            var e = "",
                n = t.indexOf(".");
            return n >= 0 && (e = t.slice(n + 1), t = t.slice(0, n)), {
                type: t,
                name: e
            }
        })
    }

    function dt(t) {
        return function() {
            var e = this.__on;
            if (e) {
                for (var n, r = 0, a = -1, i = e.length; r < i; ++r) n = e[r], t.type && n.type !== t.type || n.name !== t.name ? e[++a] = n : this.removeEventListener(n.type, n.listener, n.options);
                ++a ? e.length = a : delete this.__on
            }
        }
    }

    function pt(t, e, n) {
        return function() {
            var r, a = this.__on,
                i = function(t) {
                    return function(e) {
                        t.call(this, e, this.__data__)
                    }
                }(e);
            if (a)
                for (var o = 0, l = a.length; o < l; ++o)
                    if ((r = a[o]).type === t.type && r.name === t.name) return this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = i, r.options = n), void(r.value = e);
            this.addEventListener(t.type, i, n), r = {
                type: t.type,
                name: t.name,
                value: e,
                listener: i,
                options: n
            }, a ? a.push(r) : this.__on = [r]
        }
    }

    function vt(t, e, n) {
        var r = q(t),
            a = r.CustomEvent;
        "function" == typeof a ? a = new a(e, n) : (a = r.document.createEvent("Event"), n ? (a.initEvent(e, n.bubbles, n.cancelable), a.detail = n.detail) : a.initEvent(e, !1, !1)), t.dispatchEvent(a)
    }

    function mt(t, e) {
        return function() {
            return vt(this, t, e)
        }
    }

    function gt(t, e) {
        return function() {
            return vt(this, t, e.apply(this, arguments))
        }
    }
    F.prototype = {
        constructor: F,
        appendChild: function(t) {
            return this._parent.insertBefore(t, this._next)
        },
        insertBefore: function(t, e) {
            return this._parent.insertBefore(t, e)
        },
        querySelector: function(t) {
            return this._parent.querySelector(t)
        },
        querySelectorAll: function(t) {
            return this._parent.querySelectorAll(t)
        }
    }, $.prototype = {
        add: function(t) {
            this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")))
        },
        remove: function(t) {
            var e = this._names.indexOf(t);
            e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")))
        },
        contains: function(t) {
            return this._names.indexOf(t) >= 0
        }
    };
    var yt = [null];

    function _t(t, e) {
        this._groups = t, this._parents = e
    }

    function wt() {
        return new _t([
            [document.documentElement]
        ], yt)
    }

    function xt(t) {
        return "string" == typeof t ? new _t([
            [document.querySelector(t)]
        ], [document.documentElement]) : new _t([
            [t]
        ], yt)
    }

    function bt(t, e) {
        if (t = function(t) {
                let e;
                for (; e = t.sourceEvent;) t = e;
                return t
            }(t), void 0 === e && (e = t.currentTarget), e) {
            var n = e.ownerSVGElement || e;
            if (n.createSVGPoint) {
                var r = n.createSVGPoint();
                return r.x = t.clientX, r.y = t.clientY, [(r = r.matrixTransform(e.getScreenCTM().inverse())).x, r.y]
            }
            if (e.getBoundingClientRect) {
                var a = e.getBoundingClientRect();
                return [t.clientX - a.left - e.clientLeft, t.clientY - a.top - e.clientTop]
            }
        }
        return [t.pageX, t.pageY]
    }
    _t.prototype = wt.prototype = {
        constructor: _t,
        select: function(t) {
            "function" != typeof t && (t = p(t));
            for (var e = this._groups, n = e.length, r = new Array(n), a = 0; a < n; ++a)
                for (var i, o, l = e[a], u = l.length, s = r[a] = new Array(u), c = 0; c < u; ++c)(i = l[c]) && (o = t.call(i, i.__data__, c, l)) && ("__data__" in i && (o.__data__ = i.__data__), s[c] = o);
            return new _t(r, this._parents)
        },
        selectAll: function(t) {
            t = "function" == typeof t ? function(t) {
                return function() {
                    return v(t.apply(this, arguments))
                }
            }(t) : g(t);
            for (var e = this._groups, n = e.length, r = [], a = [], i = 0; i < n; ++i)
                for (var o, l = e[i], u = l.length, s = 0; s < u; ++s)(o = l[s]) && (r.push(t.call(o, o.__data__, s, l)), a.push(o));
            return new _t(r, a)
        },
        selectChild: function(t) {
            return this.select(null == t ? x : function(t) {
                return function() {
                    return w.call(this.children, t)
                }
            }("function" == typeof t ? t : _(t)))
        },
        selectChildren: function(t) {
            return this.selectAll(null == t ? I : function(t) {
                return function() {
                    return b.call(this.children, t)
                }
            }("function" == typeof t ? t : _(t)))
        },
        filter: function(t) {
            "function" != typeof t && (t = y(t));
            for (var e = this._groups, n = e.length, r = new Array(n), a = 0; a < n; ++a)
                for (var i, o = e[a], l = o.length, u = r[a] = [], s = 0; s < l; ++s)(i = o[s]) && t.call(i, i.__data__, s, o) && u.push(i);
            return new _t(r, this._parents)
        },
        data: function(t, e) {
            if (!arguments.length) return Array.from(this, k);
            var n = e ? B : A,
                r = this._parents,
                a = this._groups;
            "function" != typeof t && (t = E(t));
            for (var i = a.length, o = new Array(i), l = new Array(i), u = new Array(i), s = 0; s < i; ++s) {
                var c = r[s],
                    h = a[s],
                    f = h.length,
                    d = D(t.call(c, c && c.__data__, s, r)),
                    p = d.length,
                    v = l[s] = new Array(p),
                    m = o[s] = new Array(p),
                    g = u[s] = new Array(f);
                n(c, h, v, m, g, d, e);
                for (var y, _, w = 0, x = 0; w < p; ++w)
                    if (y = v[w]) {
                        for (w >= x && (x = w + 1); !(_ = m[x]) && ++x < p;);
                        y._next = _ || null
                    }
            }
            return (o = new _t(o, r))._enter = l, o._exit = u, o
        },
        enter: function() {
            return new _t(this._enter || this._groups.map(C), this._parents)
        },
        exit: function() {
            return new _t(this._exit || this._groups.map(C), this._parents)
        },
        join: function(t, e, n) {
            var r = this.enter(),
                a = this,
                i = this.exit();
            return "function" == typeof t ? (r = t(r)) && (r = r.selection()) : r = r.append(t + ""), null != e && (a = e(a)) && (a = a.selection()), null == n ? i.remove() : n(i), r && a ? r.merge(a).order() : a
        },
        merge: function(t) {
            for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, a = n.length, i = Math.min(a, r.length), o = new Array(a), l = 0; l < i; ++l)
                for (var u, s = n[l], c = r[l], h = s.length, f = o[l] = new Array(h), d = 0; d < h; ++d)(u = s[d] || c[d]) && (f[d] = u);
            for (; l < a; ++l) o[l] = n[l];
            return new _t(o, this._parents)
        },
        selection: function() {
            return this
        },
        order: function() {
            for (var t = this._groups, e = -1, n = t.length; ++e < n;)
                for (var r, a = t[e], i = a.length - 1, o = a[i]; --i >= 0;)(r = a[i]) && (o && 4 ^ r.compareDocumentPosition(o) && o.parentNode.insertBefore(r, o), o = r);
            return this
        },
        sort: function(t) {
            function e(e, n) {
                return e && n ? t(e.__data__, n.__data__) : !e - !n
            }
            t || (t = M);
            for (var n = this._groups, r = n.length, a = new Array(r), i = 0; i < r; ++i) {
                for (var o, l = n[i], u = l.length, s = a[i] = new Array(u), c = 0; c < u; ++c)(o = l[c]) && (s[c] = o);
                s.sort(e)
            }
            return new _t(a, this._parents).order()
        },
        call: function() {
            var t = arguments[0];
            return arguments[0] = this, t.apply(null, arguments), this
        },
        nodes: function() {
            return Array.from(this)
        },
        node: function() {
            for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
                for (var r = t[e], a = 0, i = r.length; a < i; ++a) {
                    var o = r[a];
                    if (o) return o
                }
            return null
        },
        size: function() {
            let t = 0;
            for (const e of this) ++t;
            return t
        },
        empty: function() {
            return !this.node()
        },
        each: function(t) {
            for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
                for (var a, i = e[n], o = 0, l = i.length; o < l; ++o)(a = i[o]) && t.call(a, a.__data__, o, i);
            return this
        },
        attr: function(t, e) {
            var n = s(t);
            if (arguments.length < 2) {
                var r = this.node();
                return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n)
            }
            return this.each((null == e ? n.local ? N : z : "function" == typeof e ? n.local ? X : P : n.local ? T : S)(n, e))
        },
        style: function(t, e, n) {
            return arguments.length > 1 ? this.each((null == e ? L : "function" == typeof e ? R : O)(t, e, null == n ? "" : n)) : Y(this.node(), t)
        },
        property: function(t, e) {
            return arguments.length > 1 ? this.each((null == e ? j : "function" == typeof e ? V : H)(t, e)) : this.node()[t]
        },
        classed: function(t, e) {
            var n = G(t + "");
            if (arguments.length < 2) {
                for (var r = K(this.node()), a = -1, i = n.length; ++a < i;)
                    if (!r.contains(n[a])) return !1;
                return !0
            }
            return this.each(("function" == typeof e ? Z : e ? W : Q)(n, e))
        },
        text: function(t) {
            return arguments.length ? this.each(null == t ? tt : ("function" == typeof t ? nt : et)(t)) : this.node().textContent
        },
        html: function(t) {
            return arguments.length ? this.each(null == t ? rt : ("function" == typeof t ? it : at)(t)) : this.node().innerHTML
        },
        raise: function() {
            return this.each(ot)
        },
        lower: function() {
            return this.each(lt)
        },
        append: function(t) {
            var e = "function" == typeof t ? t : f(t);
            return this.select(function() {
                return this.appendChild(e.apply(this, arguments))
            })
        },
        insert: function(t, e) {
            var n = "function" == typeof t ? t : f(t),
                r = null == e ? ut : "function" == typeof e ? e : p(e);
            return this.select(function() {
                return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null)
            })
        },
        remove: function() {
            return this.each(st)
        },
        clone: function(t) {
            return this.select(t ? ht : ct)
        },
        datum: function(t) {
            return arguments.length ? this.property("__data__", t) : this.node().__data__
        },
        on: function(t, e, n) {
            var r, a, i = ft(t + ""),
                o = i.length;
            if (!(arguments.length < 2)) {
                for (l = e ? pt : dt, r = 0; r < o; ++r) this.each(l(i[r], e, n));
                return this
            }
            var l = this.node().__on;
            if (l)
                for (var u, s = 0, c = l.length; s < c; ++s)
                    for (r = 0, u = l[s]; r < o; ++r)
                        if ((a = i[r]).type === u.type && a.name === u.name) return u.value
        },
        dispatch: function(t, e) {
            return this.each(("function" == typeof e ? gt : mt)(t, e))
        },
        [Symbol.iterator]: function*() {
            for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
                for (var r, a = t[e], i = 0, o = a.length; i < o; ++i)(r = a[i]) && (yield r)
        }
    };
    const It = {
        capture: !0,
        passive: !1
    };

    function Ct(t) {
        t.preventDefault(), t.stopImmediatePropagation()
    }

    function Ft(t) {
        var e = t.document.documentElement,
            n = xt(t).on("dragstart.drag", Ct, It);
        "onselectstart" in e ? n.on("selectstart.drag", Ct, It) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none")
    }

    function Et(t, e) {
        var n = t.document.documentElement,
            r = xt(t).on("dragstart.drag", null);
        e && (r.on("click.drag", Ct, It), setTimeout(function() {
            r.on("click.drag", null)
        }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect)
    }

    function At(t, e, n) {
        t.prototype = e.prototype = n, n.constructor = t
    }

    function Bt(t, e) {
        var n = Object.create(t.prototype);
        for (var r in e) n[r] = e[r];
        return n
    }

    function kt() {}
    var Dt = .7,
        Mt = 1 / Dt,
        zt = "\\s*([+-]?\\d+)\\s*",
        Nt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        St = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        Tt = /^#([0-9a-f]{3,8})$/,
        Pt = new RegExp("^rgb\\(" + [zt, zt, zt] + "\\)$"),
        Xt = new RegExp("^rgb\\(" + [St, St, St] + "\\)$"),
        qt = new RegExp("^rgba\\(" + [zt, zt, zt, Nt] + "\\)$"),
        Lt = new RegExp("^rgba\\(" + [St, St, St, Nt] + "\\)$"),
        Ot = new RegExp("^hsl\\(" + [Nt, St, St] + "\\)$"),
        Rt = new RegExp("^hsla\\(" + [Nt, St, St, Nt] + "\\)$"),
        Yt = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };

    function jt() {
        return this.rgb().formatHex()
    }

    function Ht() {
        return this.rgb().formatRgb()
    }

    function Vt(t) {
        var e, n;
        return t = (t + "").trim().toLowerCase(), (e = Tt.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), 6 === n ? Gt(e) : 3 === n ? new Jt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | 240 & e, (15 & e) << 4 | 15 & e, 1) : 8 === n ? Kt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (255 & e) / 255) : 4 === n ? Kt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | 240 & e, ((15 & e) << 4 | 15 & e) / 255) : null) : (e = Pt.exec(t)) ? new Jt(e[1], e[2], e[3], 1) : (e = Xt.exec(t)) ? new Jt(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, 1) : (e = qt.exec(t)) ? Kt(e[1], e[2], e[3], e[4]) : (e = Lt.exec(t)) ? Kt(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, e[4]) : (e = Ot.exec(t)) ? te(e[1], e[2] / 100, e[3] / 100, 1) : (e = Rt.exec(t)) ? te(e[1], e[2] / 100, e[3] / 100, e[4]) : Yt.hasOwnProperty(t) ? Gt(Yt[t]) : "transparent" === t ? new Jt(NaN, NaN, NaN, 0) : null
    }

    function Gt(t) {
        return new Jt(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
    }

    function Kt(t, e, n, r) {
        return r <= 0 && (t = e = n = NaN), new Jt(t, e, n, r)
    }

    function $t(t) {
        return t instanceof kt || (t = Vt(t)), t ? new Jt((t = t.rgb()).r, t.g, t.b, t.opacity) : new Jt
    }

    function Ut(t, e, n, r) {
        return 1 === arguments.length ? $t(t) : new Jt(t, e, n, null == r ? 1 : r)
    }

    function Jt(t, e, n, r) {
        this.r = +t, this.g = +e, this.b = +n, this.opacity = +r
    }

    function Wt() {
        return "#" + Zt(this.r) + Zt(this.g) + Zt(this.b)
    }

    function Qt() {
        var t = this.opacity;
        return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
    }

    function Zt(t) {
        return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16)
    }

    function te(t, e, n, r) {
        return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new ne(t, e, n, r)
    }

    function ee(t) {
        if (t instanceof ne) return new ne(t.h, t.s, t.l, t.opacity);
        if (t instanceof kt || (t = Vt(t)), !t) return new ne;
        if (t instanceof ne) return t;
        var e = (t = t.rgb()).r / 255,
            n = t.g / 255,
            r = t.b / 255,
            a = Math.min(e, n, r),
            i = Math.max(e, n, r),
            o = NaN,
            l = i - a,
            u = (i + a) / 2;
        return l ? (o = e === i ? (n - r) / l + 6 * (n < r) : n === i ? (r - e) / l + 2 : (e - n) / l + 4, l /= u < .5 ? i + a : 2 - i - a, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new ne(o, l, u, t.opacity)
    }

    function ne(t, e, n, r) {
        this.h = +t, this.s = +e, this.l = +n, this.opacity = +r
    }

    function re(t, e, n) {
        return 255 * (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e)
    }
    At(kt, Vt, {
        copy: function(t) {
            return Object.assign(new this.constructor, this, t)
        },
        displayable: function() {
            return this.rgb().displayable()
        },
        hex: jt,
        formatHex: jt,
        formatHsl: function() {
            return ee(this).formatHsl()
        },
        formatRgb: Ht,
        toString: Ht
    }), At(Jt, Ut, Bt(kt, {
        brighter: function(t) {
            return t = null == t ? Mt : Math.pow(Mt, t), new Jt(this.r * t, this.g * t, this.b * t, this.opacity)
        },
        darker: function(t) {
            return t = null == t ? Dt : Math.pow(Dt, t), new Jt(this.r * t, this.g * t, this.b * t, this.opacity)
        },
        rgb: function() {
            return this
        },
        displayable: function() {
            return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
        },
        hex: Wt,
        formatHex: Wt,
        formatRgb: Qt,
        toString: Qt
    })), At(ne, function(t, e, n, r) {
        return 1 === arguments.length ? ee(t) : new ne(t, e, n, null == r ? 1 : r)
    }, Bt(kt, {
        brighter: function(t) {
            return t = null == t ? Mt : Math.pow(Mt, t), new ne(this.h, this.s, this.l * t, this.opacity)
        },
        darker: function(t) {
            return t = null == t ? Dt : Math.pow(Dt, t), new ne(this.h, this.s, this.l * t, this.opacity)
        },
        rgb: function() {
            var t = this.h % 360 + 360 * (this.h < 0),
                e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                n = this.l,
                r = n + (n < .5 ? n : 1 - n) * e,
                a = 2 * n - r;
            return new Jt(re(t >= 240 ? t - 240 : t + 120, a, r), re(t, a, r), re(t < 120 ? t + 240 : t - 120, a, r), this.opacity)
        },
        displayable: function() {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        },
        formatHsl: function() {
            var t = this.opacity;
            return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === t ? ")" : ", " + t + ")")
        }
    }));
    var ae = t => () => t;

    function ie(t, e) {
        var n = e - t;
        return n ? function(t, e) {
            return function(n) {
                return t + n * e
            }
        }(t, n) : ae(isNaN(t) ? e : t)
    }
    var oe = function t(e) {
        var n = function(t) {
            return 1 == (t = +t) ? ie : function(e, n) {
                return n - e ? function(t, e, n) {
                    return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n,
                        function(r) {
                            return Math.pow(t + r * e, n)
                        }
                }(e, n, t) : ae(isNaN(e) ? n : e)
            }
        }(e);

        function r(t, e) {
            var r = n((t = Ut(t)).r, (e = Ut(e)).r),
                a = n(t.g, e.g),
                i = n(t.b, e.b),
                o = ie(t.opacity, e.opacity);
            return function(e) {
                return t.r = r(e), t.g = a(e), t.b = i(e), t.opacity = o(e), t + ""
            }
        }
        return r.gamma = t, r
    }(1);

    function le(t, e) {
        return t = +t, e = +e,
            function(n) {
                return t * (1 - n) + e * n
            }
    }
    var ue = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        se = new RegExp(ue.source, "g");

    function ce(t, e) {
        var n, r, a, i = ue.lastIndex = se.lastIndex = 0,
            o = -1,
            l = [],
            u = [];
        for (t += "", e += "";
            (n = ue.exec(t)) && (r = se.exec(e));)(a = r.index) > i && (a = e.slice(i, a), l[o] ? l[o] += a : l[++o] = a), (n = n[0]) === (r = r[0]) ? l[o] ? l[o] += r : l[++o] = r : (l[++o] = null, u.push({
            i: o,
            x: le(n, r)
        })), i = se.lastIndex;
        return i < e.length && (a = e.slice(i), l[o] ? l[o] += a : l[++o] = a), l.length < 2 ? u[0] ? function(t) {
            return function(e) {
                return t(e) + ""
            }
        }(u[0].x) : function(t) {
            return function() {
                return t
            }
        }(e) : (e = u.length, function(t) {
            for (var n, r = 0; r < e; ++r) l[(n = u[r]).i] = n.x(t);
            return l.join("")
        })
    }
    var he, fe = 180 / Math.PI,
        de = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1
        };

    function pe(t, e, n, r, a, i) {
        var o, l, u;
        return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (u = t * n + e * r) && (n -= t * u, r -= e * u), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, u /= l), t * r < e * n && (t = -t, e = -e, u = -u, o = -o), {
            translateX: a,
            translateY: i,
            rotate: Math.atan2(e, t) * fe,
            skewX: Math.atan(u) * fe,
            scaleX: o,
            scaleY: l
        }
    }

    function ve(t, e, n, r) {
        function a(t) {
            return t.length ? t.pop() + " " : ""
        }
        return function(i, o) {
            var l = [],
                u = [];
            return i = t(i), o = t(o),
                function(t, r, a, i, o, l) {
                    if (t !== a || r !== i) {
                        var u = o.push("translate(", null, e, null, n);
                        l.push({
                            i: u - 4,
                            x: le(t, a)
                        }, {
                            i: u - 2,
                            x: le(r, i)
                        })
                    } else(a || i) && o.push("translate(" + a + e + i + n)
                }(i.translateX, i.translateY, o.translateX, o.translateY, l, u),
                function(t, e, n, i) {
                    t !== e ? (t - e > 180 ? e += 360 : e - t > 180 && (t += 360), i.push({
                        i: n.push(a(n) + "rotate(", null, r) - 2,
                        x: le(t, e)
                    })) : e && n.push(a(n) + "rotate(" + e + r)
                }(i.rotate, o.rotate, l, u),
                function(t, e, n, i) {
                    t !== e ? i.push({
                        i: n.push(a(n) + "skewX(", null, r) - 2,
                        x: le(t, e)
                    }) : e && n.push(a(n) + "skewX(" + e + r)
                }(i.skewX, o.skewX, l, u),
                function(t, e, n, r, i, o) {
                    if (t !== n || e !== r) {
                        var l = i.push(a(i) + "scale(", null, ",", null, ")");
                        o.push({
                            i: l - 4,
                            x: le(t, n)
                        }, {
                            i: l - 2,
                            x: le(e, r)
                        })
                    } else 1 === n && 1 === r || i.push(a(i) + "scale(" + n + "," + r + ")")
                }(i.scaleX, i.scaleY, o.scaleX, o.scaleY, l, u), i = o = null,
                function(t) {
                    for (var e, n = -1, r = u.length; ++n < r;) l[(e = u[n]).i] = e.x(t);
                    return l.join("")
                }
        }
    }
    var me = ve(function(t) {
            const e = new("function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix)(t + "");
            return e.isIdentity ? de : pe(e.a, e.b, e.c, e.d, e.e, e.f)
        }, "px, ", "px)", "deg)"),
        ge = ve(function(t) {
            return null == t ? de : (he || (he = document.createElementNS("http://www.w3.org/2000/svg", "g")), he.setAttribute("transform", t), (t = he.transform.baseVal.consolidate()) ? pe((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : de)
        }, ", ", ")", ")");

    function ye(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
    }
    var _e, we, xe = function t(e, n, r) {
            function a(t, a) {
                var i, o, l = t[0],
                    u = t[1],
                    s = t[2],
                    c = a[2],
                    h = a[0] - l,
                    f = a[1] - u,
                    d = h * h + f * f;
                if (d < 1e-12) o = Math.log(c / s) / e, i = function(t) {
                    return [l + t * h, u + t * f, s * Math.exp(e * t * o)]
                };
                else {
                    var p = Math.sqrt(d),
                        v = (c * c - s * s + r * d) / (2 * s * n * p),
                        m = (c * c - s * s - r * d) / (2 * c * n * p),
                        g = Math.log(Math.sqrt(v * v + 1) - v),
                        y = Math.log(Math.sqrt(m * m + 1) - m);
                    o = (y - g) / e, i = function(t) {
                        var r, a = t * o,
                            i = ye(g),
                            c = s / (n * p) * (i * (r = e * a + g, ((r = Math.exp(2 * r)) - 1) / (r + 1)) - function(t) {
                                return ((t = Math.exp(t)) - 1 / t) / 2
                            }(g));
                        return [l + c * h, u + c * f, s * i / ye(e * a + g)]
                    }
                }
                return i.duration = 1e3 * o * e / Math.SQRT2, i
            }
            return a.rho = function(e) {
                var n = Math.max(.001, +e),
                    r = n * n;
                return t(n, r, r * r)
            }, a
        }(Math.SQRT2, 2, 4),
        be = 0,
        Ie = 0,
        Ce = 0,
        Fe = 0,
        Ee = 0,
        Ae = 0,
        Be = "object" == typeof performance && performance.now ? performance : Date,
        ke = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
            setTimeout(t, 17)
        };

    function De() {
        return Ee || (ke(Me), Ee = Be.now() + Ae)
    }

    function Me() {
        Ee = 0
    }

    function ze() {
        this._call = this._time = this._next = null
    }

    function Ne(t, e, n) {
        var r = new ze;
        return r.restart(t, e, n), r
    }

    function Se() {
        Ee = (Fe = Be.now()) + Ae, be = Ie = 0;
        try {
            ! function() {
                De(), ++be;
                for (var t, e = _e; e;)(t = Ee - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
                --be
            }()
        } finally {
            be = 0,
                function() {
                    for (var t, e, n = _e, r = Infinity; n;) n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : _e = e);
                    we = t, Pe(r)
                }(), Ee = 0
        }
    }

    function Te() {
        var t = Be.now(),
            e = t - Fe;
        e > 1e3 && (Ae -= e, Fe = t)
    }

    function Pe(t) {
        be || (Ie && (Ie = clearTimeout(Ie)), t - Ee > 24 ? (t < Infinity && (Ie = setTimeout(Se, t - Be.now() - Ae)), Ce && (Ce = clearInterval(Ce))) : (Ce || (Fe = Be.now(), Ce = setInterval(Te, 1e3)), be = 1, ke(Se)))
    }

    function Xe(t, e, n) {
        var r = new ze;
        return r.restart(n => {
            r.stop(), t(n + e)
        }, e = null == e ? 0 : +e, n), r
    }
    ze.prototype = Ne.prototype = {
        constructor: ze,
        restart: function(t, e, n) {
            if ("function" != typeof t) throw new TypeError("callback is not a function");
            n = (null == n ? De() : +n) + (null == e ? 0 : +e), this._next || we === this || (we ? we._next = this : _e = this, we = this), this._call = t, this._time = n, Pe()
        },
        stop: function() {
            this._call && (this._call = null, this._time = Infinity, Pe())
        }
    };
    var qe = n("start", "end", "cancel", "interrupt"),
        Le = [];

    function Oe(t, e, n, r, a, i) {
        var o = t.__transition;
        if (o) {
            if (n in o) return
        } else t.__transition = {};
        ! function(t, e, n) {
            var r, a = t.__transition;

            function i(u) {
                var s, c, h, f;
                if (1 !== n.state) return l();
                for (s in a)
                    if ((f = a[s]).name === n.name) {
                        if (3 === f.state) return Xe(i);
                        4 === f.state ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", t, t.__data__, f.index, f.group), delete a[s]) : +s < e && (f.state = 6, f.timer.stop(), f.on.call("cancel", t, t.__data__, f.index, f.group), delete a[s])
                    } if (Xe(function() {
                        3 === n.state && (n.state = 4, n.timer.restart(o, n.delay, n.time), o(u))
                    }), n.state = 2, n.on.call("start", t, t.__data__, n.index, n.group), 2 === n.state) {
                    for (n.state = 3, r = new Array(h = n.tween.length), s = 0, c = -1; s < h; ++s)(f = n.tween[s].value.call(t, t.__data__, n.index, n.group)) && (r[++c] = f);
                    r.length = c + 1
                }
            }

            function o(e) {
                for (var a = e < n.duration ? n.ease.call(null, e / n.duration) : (n.timer.restart(l), n.state = 5, 1), i = -1, o = r.length; ++i < o;) r[i].call(t, a);
                5 === n.state && (n.on.call("end", t, t.__data__, n.index, n.group), l())
            }

            function l() {
                for (var r in n.state = 6, n.timer.stop(), delete a[e], a) return;
                delete t.__transition
            }
            a[e] = n, n.timer = Ne(function(t) {
                n.state = 1, n.timer.restart(i, n.delay, n.time), n.delay <= t && i(t - n.delay)
            }, 0, n.time)
        }(t, n, {
            name: e,
            index: r,
            group: a,
            on: qe,
            tween: Le,
            time: i.time,
            delay: i.delay,
            duration: i.duration,
            ease: i.ease,
            timer: null,
            state: 0
        })
    }

    function Re(t, e) {
        var n = je(t, e);
        if (n.state > 0) throw new Error("too late; already scheduled");
        return n
    }

    function Ye(t, e) {
        var n = je(t, e);
        if (n.state > 3) throw new Error("too late; already running");
        return n
    }

    function je(t, e) {
        var n = t.__transition;
        if (!n || !(n = n[e])) throw new Error("transition not found");
        return n
    }

    function He(t, e) {
        var n, r, a, i = t.__transition,
            o = !0;
        if (i) {
            for (a in e = null == e ? null : e + "", i)(n = i[a]).name === e ? (r = n.state > 2 && n.state < 5, n.state = 6, n.timer.stop(), n.on.call(r ? "interrupt" : "cancel", t, t.__data__, n.index, n.group), delete i[a]) : o = !1;
            o && delete t.__transition
        }
    }

    function Ve(t, e) {
        var n, r;
        return function() {
            var a = Ye(this, t),
                i = a.tween;
            if (i !== n)
                for (var o = 0, l = (r = n = i).length; o < l; ++o)
                    if (r[o].name === e) {
                        (r = r.slice()).splice(o, 1);
                        break
                    } a.tween = r
        }
    }

    function Ge(t, e, n) {
        var r, a;
        if ("function" != typeof n) throw new Error;
        return function() {
            var i = Ye(this, t),
                o = i.tween;
            if (o !== r) {
                a = (r = o).slice();
                for (var l = {
                        name: e,
                        value: n
                    }, u = 0, s = a.length; u < s; ++u)
                    if (a[u].name === e) {
                        a[u] = l;
                        break
                    } u === s && a.push(l)
            }
            i.tween = a
        }
    }

    function Ke(t, e, n) {
        var r = t._id;
        return t.each(function() {
                var t = Ye(this, r);
                (t.value || (t.value = {}))[e] = n.apply(this, arguments)
            }),
            function(t) {
                return je(t, r).value[e]
            }
    }

    function $e(t, e) {
        var n;
        return ("number" == typeof e ? le : e instanceof Vt ? oe : (n = Vt(e)) ? (e = n, oe) : ce)(t, e)
    }

    function Ue(t) {
        return function() {
            this.removeAttribute(t)
        }
    }

    function Je(t) {
        return function() {
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function We(t, e, n) {
        var r, a, i = n + "";
        return function() {
            var o = this.getAttribute(t);
            return o === i ? null : o === r ? a : a = e(r = o, n)
        }
    }

    function Qe(t, e, n) {
        var r, a, i = n + "";
        return function() {
            var o = this.getAttributeNS(t.space, t.local);
            return o === i ? null : o === r ? a : a = e(r = o, n)
        }
    }

    function Ze(t, e, n) {
        var r, a, i;
        return function() {
            var o, l, u = n(this);
            if (null != u) return (o = this.getAttribute(t)) === (l = u + "") ? null : o === r && l === a ? i : (a = l, i = e(r = o, u));
            this.removeAttribute(t)
        }
    }

    function tn(t, e, n) {
        var r, a, i;
        return function() {
            var o, l, u = n(this);
            if (null != u) return (o = this.getAttributeNS(t.space, t.local)) === (l = u + "") ? null : o === r && l === a ? i : (a = l, i = e(r = o, u));
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function en(t, e) {
        return function(n) {
            this.setAttribute(t, e.call(this, n))
        }
    }

    function nn(t, e) {
        return function(n) {
            this.setAttributeNS(t.space, t.local, e.call(this, n))
        }
    }

    function rn(t, e) {
        var n, r;

        function a() {
            var a = e.apply(this, arguments);
            return a !== r && (n = (r = a) && nn(t, a)), n
        }
        return a._value = e, a
    }

    function an(t, e) {
        var n, r;

        function a() {
            var a = e.apply(this, arguments);
            return a !== r && (n = (r = a) && en(t, a)), n
        }
        return a._value = e, a
    }

    function on(t, e) {
        return function() {
            Re(this, t).delay = +e.apply(this, arguments)
        }
    }

    function ln(t, e) {
        return e = +e,
            function() {
                Re(this, t).delay = e
            }
    }

    function un(t, e) {
        return function() {
            Ye(this, t).duration = +e.apply(this, arguments)
        }
    }

    function sn(t, e) {
        return e = +e,
            function() {
                Ye(this, t).duration = e
            }
    }

    function cn(t, e) {
        if ("function" != typeof e) throw new Error;
        return function() {
            Ye(this, t).ease = e
        }
    }

    function hn(t, e, n) {
        var r, a, i = function(t) {
            return (t + "").trim().split(/^|\s+/).every(function(t) {
                var e = t.indexOf(".");
                return e >= 0 && (t = t.slice(0, e)), !t || "start" === t
            })
        }(e) ? Re : Ye;
        return function() {
            var o = i(this, t),
                l = o.on;
            l !== r && (a = (r = l).copy()).on(e, n), o.on = a
        }
    }
    var fn = wt.prototype.constructor;

    function dn(t) {
        return function() {
            this.style.removeProperty(t)
        }
    }

    function pn(t, e, n) {
        return function(r) {
            this.style.setProperty(t, e.call(this, r), n)
        }
    }

    function vn(t, e, n) {
        var r, a;

        function i() {
            var i = e.apply(this, arguments);
            return i !== a && (r = (a = i) && pn(t, i, n)), r
        }
        return i._value = e, i
    }

    function mn(t) {
        return function(e) {
            this.textContent = t.call(this, e)
        }
    }

    function gn(t) {
        var e, n;

        function r() {
            var r = t.apply(this, arguments);
            return r !== n && (e = (n = r) && mn(r)), e
        }
        return r._value = t, r
    }
    var yn = 0;

    function _n(t, e, n, r) {
        this._groups = t, this._parents = e, this._name = n, this._id = r
    }

    function wn(t) {
        return wt().transition(t)
    }

    function xn() {
        return ++yn
    }
    var bn = wt.prototype;
    _n.prototype = wn.prototype = {
        constructor: _n,
        select: function(t) {
            var e = this._name,
                n = this._id;
            "function" != typeof t && (t = p(t));
            for (var r = this._groups, a = r.length, i = new Array(a), o = 0; o < a; ++o)
                for (var l, u, s = r[o], c = s.length, h = i[o] = new Array(c), f = 0; f < c; ++f)(l = s[f]) && (u = t.call(l, l.__data__, f, s)) && ("__data__" in l && (u.__data__ = l.__data__), h[f] = u, Oe(h[f], e, n, f, h, je(l, n)));
            return new _n(i, this._parents, e, n)
        },
        selectAll: function(t) {
            var e = this._name,
                n = this._id;
            "function" != typeof t && (t = g(t));
            for (var r = this._groups, a = r.length, i = [], o = [], l = 0; l < a; ++l)
                for (var u, s = r[l], c = s.length, h = 0; h < c; ++h)
                    if (u = s[h]) {
                        for (var f, d = t.call(u, u.__data__, h, s), p = je(u, n), v = 0, m = d.length; v < m; ++v)(f = d[v]) && Oe(f, e, n, v, d, p);
                        i.push(d), o.push(u)
                    } return new _n(i, o, e, n)
        },
        selectChild: bn.selectChild,
        selectChildren: bn.selectChildren,
        filter: function(t) {
            "function" != typeof t && (t = y(t));
            for (var e = this._groups, n = e.length, r = new Array(n), a = 0; a < n; ++a)
                for (var i, o = e[a], l = o.length, u = r[a] = [], s = 0; s < l; ++s)(i = o[s]) && t.call(i, i.__data__, s, o) && u.push(i);
            return new _n(r, this._parents, this._name, this._id)
        },
        merge: function(t) {
            if (t._id !== this._id) throw new Error;
            for (var e = this._groups, n = t._groups, r = e.length, a = Math.min(r, n.length), i = new Array(r), o = 0; o < a; ++o)
                for (var l, u = e[o], s = n[o], c = u.length, h = i[o] = new Array(c), f = 0; f < c; ++f)(l = u[f] || s[f]) && (h[f] = l);
            for (; o < r; ++o) i[o] = e[o];
            return new _n(i, this._parents, this._name, this._id)
        },
        selection: function() {
            return new fn(this._groups, this._parents)
        },
        transition: function() {
            for (var t = this._name, e = this._id, n = xn(), r = this._groups, a = r.length, i = 0; i < a; ++i)
                for (var o, l = r[i], u = l.length, s = 0; s < u; ++s)
                    if (o = l[s]) {
                        var c = je(o, e);
                        Oe(o, t, n, s, l, {
                            time: c.time + c.delay + c.duration,
                            delay: 0,
                            duration: c.duration,
                            ease: c.ease
                        })
                    } return new _n(r, this._parents, t, n)
        },
        call: bn.call,
        nodes: bn.nodes,
        node: bn.node,
        size: bn.size,
        empty: bn.empty,
        each: bn.each,
        on: function(t, e) {
            var n = this._id;
            return arguments.length < 2 ? je(this.node(), n).on.on(t) : this.each(hn(n, t, e))
        },
        attr: function(t, e) {
            var n = s(t),
                r = "transform" === n ? ge : $e;
            return this.attrTween(t, "function" == typeof e ? (n.local ? tn : Ze)(n, r, Ke(this, "attr." + t, e)) : null == e ? (n.local ? Je : Ue)(n) : (n.local ? Qe : We)(n, r, e))
        },
        attrTween: function(t, e) {
            var n = "attr." + t;
            if (arguments.length < 2) return (n = this.tween(n)) && n._value;
            if (null == e) return this.tween(n, null);
            if ("function" != typeof e) throw new Error;
            var r = s(t);
            return this.tween(n, (r.local ? rn : an)(r, e))
        },
        style: function(t, e, n) {
            var r = "transform" == (t += "") ? me : $e;
            return null == e ? this.styleTween(t, function(t, e) {
                var n, r, a;
                return function() {
                    var i = Y(this, t),
                        o = (this.style.removeProperty(t), Y(this, t));
                    return i === o ? null : i === n && o === r ? a : a = e(n = i, r = o)
                }
            }(t, r)).on("end.style." + t, dn(t)) : "function" == typeof e ? this.styleTween(t, function(t, e, n) {
                var r, a, i;
                return function() {
                    var o = Y(this, t),
                        l = n(this),
                        u = l + "";
                    return null == l && (this.style.removeProperty(t), u = l = Y(this, t)), o === u ? null : o === r && u === a ? i : (a = u, i = e(r = o, l))
                }
            }(t, r, Ke(this, "style." + t, e))).each(function(t, e) {
                var n, r, a, i, o = "style." + e,
                    l = "end." + o;
                return function() {
                    var u = Ye(this, t),
                        s = u.on,
                        c = null == u.value[o] ? i || (i = dn(e)) : void 0;
                    s === n && a === c || (r = (n = s).copy()).on(l, a = c), u.on = r
                }
            }(this._id, t)) : this.styleTween(t, function(t, e, n) {
                var r, a, i = n + "";
                return function() {
                    var o = Y(this, t);
                    return o === i ? null : o === r ? a : a = e(r = o, n)
                }
            }(t, r, e), n).on("end.style." + t, null)
        },
        styleTween: function(t, e, n) {
            var r = "style." + (t += "");
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == e) return this.tween(r, null);
            if ("function" != typeof e) throw new Error;
            return this.tween(r, vn(t, e, null == n ? "" : n))
        },
        text: function(t) {
            return this.tween("text", "function" == typeof t ? function(t) {
                return function() {
                    var e = t(this);
                    this.textContent = null == e ? "" : e
                }
            }(Ke(this, "text", t)) : function(t) {
                return function() {
                    this.textContent = t
                }
            }(null == t ? "" : t + ""))
        },
        textTween: function(t) {
            var e = "text";
            if (arguments.length < 1) return (e = this.tween(e)) && e._value;
            if (null == t) return this.tween(e, null);
            if ("function" != typeof t) throw new Error;
            return this.tween(e, gn(t))
        },
        remove: function() {
            return this.on("end.remove", function(t) {
                return function() {
                    var e = this.parentNode;
                    for (var n in this.__transition)
                        if (+n !== t) return;
                    e && e.removeChild(this)
                }
            }(this._id))
        },
        tween: function(t, e) {
            var n = this._id;
            if (t += "", arguments.length < 2) {
                for (var r, a = je(this.node(), n).tween, i = 0, o = a.length; i < o; ++i)
                    if ((r = a[i]).name === t) return r.value;
                return null
            }
            return this.each((null == e ? Ve : Ge)(n, t, e))
        },
        delay: function(t) {
            var e = this._id;
            return arguments.length ? this.each(("function" == typeof t ? on : ln)(e, t)) : je(this.node(), e).delay
        },
        duration: function(t) {
            var e = this._id;
            return arguments.length ? this.each(("function" == typeof t ? un : sn)(e, t)) : je(this.node(), e).duration
        },
        ease: function(t) {
            var e = this._id;
            return arguments.length ? this.each(cn(e, t)) : je(this.node(), e).ease
        },
        easeVarying: function(t) {
            if ("function" != typeof t) throw new Error;
            return this.each(function(t, e) {
                return function() {
                    var n = e.apply(this, arguments);
                    if ("function" != typeof n) throw new Error;
                    Ye(this, t).ease = n
                }
            }(this._id, t))
        },
        end: function() {
            var t, e, n = this,
                r = n._id,
                a = n.size();
            return new Promise(function(i, o) {
                var l = {
                        value: o
                    },
                    u = {
                        value: function() {
                            0 == --a && i()
                        }
                    };
                n.each(function() {
                    var n = Ye(this, r),
                        a = n.on;
                    a !== t && ((e = (t = a).copy())._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)), n.on = e
                }), 0 === a && i()
            })
        },
        [Symbol.iterator]: bn[Symbol.iterator]
    };
    var In = {
        time: null,
        delay: 0,
        duration: 250,
        ease: function(t) {
            return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
        }
    };

    function Cn(t, e) {
        for (var n; !(n = t.__transition) || !(n = n[e]);)
            if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`);
        return n
    }
    wt.prototype.interrupt = function(t) {
        return this.each(function() {
            He(this, t)
        })
    }, wt.prototype.transition = function(t) {
        var e, n;
        t instanceof _n ? (e = t._id, t = t._name) : (e = xn(), (n = In).time = De(), t = null == t ? null : t + "");
        for (var r = this._groups, a = r.length, i = 0; i < a; ++i)
            for (var o, l = r[i], u = l.length, s = 0; s < u; ++s)(o = l[s]) && Oe(o, t, e, s, l, n || Cn(o, e));
        return new _n(r, this._parents, t, e)
    };
    var Fn = t => () => t;

    function En(t, {
        sourceEvent: e,
        target: n,
        transform: r,
        dispatch: a
    }) {
        Object.defineProperties(this, {
            type: {
                value: t,
                enumerable: !0,
                configurable: !0
            },
            sourceEvent: {
                value: e,
                enumerable: !0,
                configurable: !0
            },
            target: {
                value: n,
                enumerable: !0,
                configurable: !0
            },
            transform: {
                value: r,
                enumerable: !0,
                configurable: !0
            },
            _: {
                value: a
            }
        })
    }

    function An(t, e, n) {
        this.k = t, this.x = e, this.y = n
    }
    An.prototype = {
        constructor: An,
        scale: function(t) {
            return 1 === t ? this : new An(this.k * t, this.x, this.y)
        },
        translate: function(t, e) {
            return 0 === t & 0 === e ? this : new An(this.k, this.x + this.k * t, this.y + this.k * e)
        },
        apply: function(t) {
            return [t[0] * this.k + this.x, t[1] * this.k + this.y]
        },
        applyX: function(t) {
            return t * this.k + this.x
        },
        applyY: function(t) {
            return t * this.k + this.y
        },
        invert: function(t) {
            return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
        },
        invertX: function(t) {
            return (t - this.x) / this.k
        },
        invertY: function(t) {
            return (t - this.y) / this.k
        },
        rescaleX: function(t) {
            return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
        },
        rescaleY: function(t) {
            return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
        },
        toString: function() {
            return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
        }
    };
    var Bn = new An(1, 0, 0);

    function kn(t) {
        t.stopImmediatePropagation()
    }

    function Dn(t) {
        t.preventDefault(), t.stopImmediatePropagation()
    }

    function Mn(t) {
        return !(t.ctrlKey && "wheel" !== t.type || t.button)
    }

    function zn() {
        var t = this;
        return t instanceof SVGElement ? (t = t.ownerSVGElement || t).hasAttribute("viewBox") ? [
            [(t = t.viewBox.baseVal).x, t.y],
            [t.x + t.width, t.y + t.height]
        ] : [
            [0, 0],
            [t.width.baseVal.value, t.height.baseVal.value]
        ] : [
            [0, 0],
            [t.clientWidth, t.clientHeight]
        ]
    }

    function Nn() {
        return this.__zoom || Bn
    }

    function Sn(t) {
        return -t.deltaY * (1 === t.deltaMode ? .05 : t.deltaMode ? 1 : .002) * (t.ctrlKey ? 10 : 1)
    }

    function Tn() {
        return navigator.maxTouchPoints || "ontouchstart" in this
    }

    function Pn(t, e, n) {
        var r = t.invertX(e[0][0]) - n[0][0],
            a = t.invertX(e[1][0]) - n[1][0],
            i = t.invertY(e[0][1]) - n[0][1],
            o = t.invertY(e[1][1]) - n[1][1];
        return t.translate(a > r ? (r + a) / 2 : Math.min(0, r) || Math.max(0, a), o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o))
    }

    function Xn(t) {
        var e = 0,
            n = t.children,
            r = n && n.length;
        if (r)
            for (; --r >= 0;) e += n[r].value;
        else e = 1;
        t.value = e
    }

    function qn(t, e) {
        t instanceof Map ? (t = [void 0, t], void 0 === e && (e = On)) : void 0 === e && (e = Ln);
        for (var n, r, a, i, o, l = new jn(t), u = [l]; n = u.pop();)
            if ((a = e(n.data)) && (o = (a = Array.from(a)).length))
                for (n.children = a, i = o - 1; i >= 0; --i) u.push(r = a[i] = new jn(a[i])), r.parent = n, r.depth = n.depth + 1;
        return l.eachBefore(Yn)
    }

    function Ln(t) {
        return t.children
    }

    function On(t) {
        return Array.isArray(t) ? t[1] : null
    }

    function Rn(t) {
        void 0 !== t.data.value && (t.value = t.data.value), t.data = t.data.data
    }

    function Yn(t) {
        var e = 0;
        do {
            t.height = e
        } while ((t = t.parent) && t.height < ++e)
    }

    function jn(t) {
        this.data = t, this.depth = this.height = 0, this.parent = null
    }

    function Hn(t) {
        if ("function" != typeof t) throw new Error;
        return t
    }

    function Vn(t) {
        t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1)
    }
    jn.prototype = qn.prototype = {
        constructor: jn,
        count: function() {
            return this.eachAfter(Xn)
        },
        each: function(t, e) {
            let n = -1;
            for (const r of this) t.call(e, r, ++n, this);
            return this
        },
        eachAfter: function(t, e) {
            for (var n, r, a, i = this, o = [i], l = [], u = -1; i = o.pop();)
                if (l.push(i), n = i.children)
                    for (r = 0, a = n.length; r < a; ++r) o.push(n[r]);
            for (; i = l.pop();) t.call(e, i, ++u, this);
            return this
        },
        eachBefore: function(t, e) {
            for (var n, r, a = this, i = [a], o = -1; a = i.pop();)
                if (t.call(e, a, ++o, this), n = a.children)
                    for (r = n.length - 1; r >= 0; --r) i.push(n[r]);
            return this
        },
        find: function(t, e) {
            let n = -1;
            for (const r of this)
                if (t.call(e, r, ++n, this)) return r
        },
        sum: function(t) {
            return this.eachAfter(function(e) {
                for (var n = +t(e.data) || 0, r = e.children, a = r && r.length; --a >= 0;) n += r[a].value;
                e.value = n
            })
        },
        sort: function(t) {
            return this.eachBefore(function(e) {
                e.children && e.children.sort(t)
            })
        },
        path: function(t) {
            for (var e = this, n = function(t, e) {
                    if (t === e) return t;
                    var n = t.ancestors(),
                        r = e.ancestors(),
                        a = null;
                    for (t = n.pop(), e = r.pop(); t === e;) a = t, t = n.pop(), e = r.pop();
                    return a
                }(e, t), r = [e]; e !== n;) r.push(e = e.parent);
            for (var a = r.length; t !== n;) r.splice(a, 0, t), t = t.parent;
            return r
        },
        ancestors: function() {
            for (var t = this, e = [t]; t = t.parent;) e.push(t);
            return e
        },
        descendants: function() {
            return Array.from(this)
        },
        leaves: function() {
            var t = [];
            return this.eachBefore(function(e) {
                e.children || t.push(e)
            }), t
        },
        links: function() {
            var t = this,
                e = [];
            return t.each(function(n) {
                n !== t && e.push({
                    source: n.parent,
                    target: n
                })
            }), e
        },
        copy: function() {
            return qn(this).eachBefore(Rn)
        },
        [Symbol.iterator]: function*() {
            var t, e, n, r, a = this,
                i = [a];
            do {
                for (t = i.reverse(), i = []; a = t.pop();)
                    if (yield a, e = a.children)
                        for (n = 0, r = e.length; n < r; ++n) i.push(e[n])
            } while (i.length)
        }
    };
    var Gn = {
            depth: -1
        },
        Kn = {};

    function $n(t) {
        return t.id
    }

    function Un(t) {
        return t.parentId
    }
    var Jn = function(t) {
            return +(t.x1 - t.x0 > 14)
        },
        Wn = function() {
            var t = $n,
                e = Un;

            function n(n) {
                var r, a, i, o, l, u, s, c = Array.from(n),
                    h = c.length,
                    f = new Map;
                for (a = 0; a < h; ++a) l = c[a] = new jn(r = c[a]), null != (u = t(r, a, n)) && (u += "") && (s = l.id = u, f.set(s, f.has(s) ? Kn : l)), null != (u = e(r, a, n)) && (u += "") && (l.parent = u);
                for (a = 0; a < h; ++a)
                    if (u = (l = c[a]).parent) {
                        if (!(o = f.get(u))) throw new Error("missing: " + u);
                        if (o === Kn) throw new Error("ambiguous: " + u);
                        o.children ? o.children.push(l) : o.children = [l], l.parent = o
                    } else {
                        if (i) throw new Error("multiple roots");
                        i = l
                    } if (!i) throw new Error("no root");
                if (i.parent = Gn, i.eachBefore(function(t) {
                        t.depth = t.parent.depth + 1, --h
                    }).eachBefore(Yn), i.parent = null, h > 0) throw new Error("cycle");
                return i
            }
            return n.id = function(e) {
                return arguments.length ? (t = Hn(e), n) : t
            }, n.parentId = function(t) {
                return arguments.length ? (e = Hn(t), n) : e
            }, n
        }()([{
            id: 0,
            name: "Geologic Time",
            textColor: "white",
            color: "#000",
            end: 0,
            start: 4e3
        }, {
            id: 753,
            name: "Archean",
            level: 1,
            parentId: 0,
            color: "#F0047F",
            end: 2500,
            start: 4e3
        }, {
            id: 752,
            name: "Proterozoic",
            level: 1,
            parentId: 0,
            color: "#F73563",
            end: 541,
            start: 2500
        }, {
            id: 751,
            name: "Phanerozoic",
            level: 1,
            parentId: 0,
            color: "#9AD9DD",
            end: 0,
            start: 541
        }, {
            id: 760,
            name: "Eoarchean",
            level: 2,
            leaf: !0,
            parentId: 753,
            color: "#DA037F",
            end: 3600,
            start: 4e3
        }, {
            id: 759,
            name: "Paleoarchean",
            level: 2,
            leaf: !0,
            parentId: 753,
            color: "#F444A9",
            end: 3200,
            start: 3600
        }, {
            id: 758,
            name: "Mesoarchean",
            level: 2,
            leaf: !0,
            parentId: 753,
            color: "#F768A9",
            end: 2800,
            start: 3200
        }, {
            id: 757,
            name: "Neoarchean",
            level: 2,
            leaf: !0,
            parentId: 753,
            color: "#F99BC1",
            end: 2500,
            start: 2800
        }, {
            id: 756,
            name: "Paleoproterozoic",
            level: 2,
            parentId: 752,
            color: "#F74370",
            end: 1600,
            start: 2500
        }, {
            id: 755,
            name: "Mesoproterozoic",
            level: 2,
            parentId: 752,
            color: "#FDB462",
            end: 1e3,
            start: 1600
        }, {
            id: 754,
            name: "Neoproterozoic",
            level: 2,
            parentId: 752,
            color: "#FEB342",
            end: 541,
            start: 1e3
        }, {
            id: 3,
            name: "Paleozoic",
            abbr: "Pz",
            level: 2,
            parentId: 751,
            color: "#99C08D",
            end: 252.2,
            start: 541
        }, {
            id: 2,
            name: "Mesozoic",
            abbr: "Mz",
            level: 2,
            parentId: 751,
            color: "#67C5CA",
            end: 66,
            start: 252.2
        }, {
            id: 1,
            name: "Cenozoic",
            abbr: "Cz",
            level: 2,
            parentId: 751,
            color: "#F2F91D",
            end: 0,
            start: 66
        }, {
            id: 770,
            name: "Siderian",
            level: 3,
            leaf: !0,
            parentId: 756,
            color: "#F74F7C",
            end: 2300,
            start: 2500
        }, {
            id: 769,
            name: "Rhyacian",
            level: 3,
            leaf: !0,
            parentId: 756,
            color: "#F75B89",
            end: 2050,
            start: 2300
        }, {
            id: 768,
            name: "Orosirian",
            level: 3,
            leaf: !0,
            parentId: 756,
            color: "#F76898",
            end: 1800,
            start: 2050
        }, {
            id: 767,
            name: "Statherian",
            level: 3,
            leaf: !0,
            parentId: 756,
            color: "#F875A7",
            end: 1600,
            start: 1800
        }, {
            id: 766,
            name: "Calymmian",
            level: 3,
            leaf: !0,
            parentId: 755,
            color: "#FDC07A",
            end: 1400,
            start: 1600
        }, {
            id: 765,
            name: "Ectasian",
            level: 3,
            leaf: !0,
            parentId: 755,
            color: "#F3CC8A",
            end: 1200,
            start: 1400
        }, {
            id: 764,
            name: "Stenian",
            level: 3,
            leaf: !0,
            parentId: 755,
            color: "#FED99A",
            end: 1e3,
            start: 1200
        }, {
            id: 763,
            name: "Tonian",
            level: 3,
            leaf: !0,
            parentId: 754,
            color: "#FEBF4E",
            end: 850,
            start: 1e3
        }, {
            id: 762,
            name: "Cryogenian",
            level: 3,
            leaf: !0,
            parentId: 754,
            color: "#FECC5C",
            end: 635,
            start: 850
        }, {
            id: 761,
            name: "Ediacaran",
            level: 3,
            leaf: !0,
            parentId: 754,
            color: "#FED96A",
            end: 541,
            start: 635
        }, {
            id: 22,
            name: "Cambrian",
            abbr: "Cm",
            level: 3,
            parentId: 3,
            textColor: "white",
            color: "#7FA056",
            end: 485.4,
            start: 541
        }, {
            id: 21,
            name: "Ordovician",
            abbr: "O",
            level: 3,
            parentId: 3,
            textColor: "white",
            color: "#009270",
            end: 443.4,
            start: 485.4
        }, {
            id: 20,
            name: "Silurian",
            abbr: "S",
            level: 3,
            parentId: 3,
            color: "#B3E1B6",
            end: 419.2,
            start: 443.4
        }, {
            id: 19,
            name: "Devonian",
            abbr: "D",
            level: 3,
            parentId: 3,
            color: "#CB8C37",
            end: 358.9,
            start: 419.2
        }, {
            id: 18,
            name: "Carboniferous",
            abbr: "C",
            level: 3,
            parentId: 3,
            textColor: "white",
            color: "#67A599",
            end: 298.9,
            start: 358.9
        }, {
            id: 17,
            name: "Permian",
            abbr: "P",
            level: 3,
            parentId: 3,
            color: "#F04028",
            end: 252.2,
            start: 298.9
        }, {
            id: 16,
            name: "Triassic",
            abbr: "Tr",
            level: 3,
            parentId: 2,
            textColor: "white",
            color: "#812B92",
            end: 201.3,
            start: 252.2
        }, {
            id: 15,
            name: "Jurassic",
            abbr: "J",
            level: 3,
            parentId: 2,
            textColor: "white",
            color: "#34B2C9",
            end: 145,
            start: 201.3
        }, {
            id: 14,
            name: "Cretaceous",
            abbr: "K",
            level: 3,
            parentId: 2,
            color: "#7FC64E",
            end: 66,
            start: 145
        }, {
            id: 26,
            name: "Paleogene",
            abbr: "Pg",
            level: 3,
            parentId: 1,
            color: "#FD9A52",
            end: 23.03,
            start: 66
        }, {
            id: 25,
            name: "Neogene",
            abbr: "Ng",
            level: 3,
            parentId: 1,
            color: "#FFE619",
            end: 2.588,
            start: 23.03
        }, {
            id: 12,
            name: "Quaternary",
            level: 3,
            parentId: 1,
            color: "#F9F97F",
            end: 0,
            start: 2.588
        }, {
            id: 1111,
            name: "Terreneuvian",
            level: 4,
            parentId: 22,
            color: "#8CB06C",
            end: 521,
            start: 541
        }, {
            id: 1110,
            name: "Series 2",
            level: 4,
            parentId: 22,
            color: "#99C078",
            end: 509,
            start: 521
        }, {
            id: 1109,
            name: "Series 3",
            level: 4,
            parentId: 22,
            color: "#A6CF86",
            end: 497,
            start: 509
        }, {
            id: 780,
            name: "Furongian",
            level: 4,
            parentId: 22,
            color: "#B3E095",
            end: 485.4,
            start: 497
        }, {
            id: 31,
            name: "Early Ordovician",
            level: 4,
            parentId: 21,
            textColor: "white",
            color: "#1A9D6F",
            end: 470,
            start: 485.4
        }, {
            id: 30,
            name: "Middle Ordovician",
            level: 4,
            parentId: 21,
            textColor: "white",
            color: "#4DB47E",
            end: 458.4,
            start: 470
        }, {
            id: 29,
            name: "Late Ordovician",
            level: 4,
            parentId: 21,
            color: "#7FCA93",
            end: 443.4,
            start: 458.4
        }, {
            id: 62,
            name: "Llandovery",
            level: 4,
            parentId: 20,
            color: "#99D7B3",
            end: 433.4,
            start: 443.4
        }, {
            id: 61,
            name: "Wenlock",
            level: 4,
            parentId: 20,
            color: "#B3E1C2",
            end: 427.4,
            start: 433.4
        }, {
            id: 60,
            name: "Ludlow",
            level: 4,
            parentId: 20,
            color: "#BFE6CF",
            end: 423,
            start: 427.4
        }, {
            id: 59,
            name: "Pridoli",
            level: 4,
            parentId: 20,
            color: "#E6F5E1",
            end: 419.2,
            start: 423
        }, {
            id: 58,
            name: "Early Devonian",
            level: 4,
            parentId: 19,
            color: "#E5AC4D",
            end: 393.3,
            start: 419.2
        }, {
            id: 57,
            name: "Middle Devonian",
            level: 4,
            parentId: 19,
            color: "#F1C868",
            end: 382.7,
            start: 393.3
        }, {
            id: 56,
            name: "Late Devonian",
            level: 4,
            parentId: 19,
            color: "#F1E19D",
            end: 358.9,
            start: 382.7
        }, {
            id: 28,
            name: "Mississippian",
            level: 4,
            parentId: 18,
            textColor: "white",
            color: "#678F66",
            end: 323.2,
            start: 358.9
        }, {
            id: 27,
            name: "Pennsylvanian",
            level: 4,
            parentId: 18,
            color: "#99C2B5",
            end: 298.9,
            start: 323.2
        }, {
            id: 773,
            name: "Cisuralian",
            level: 4,
            parentId: 17,
            color: "#EF5845",
            end: 272.3,
            start: 298.9
        }, {
            id: 772,
            name: "Guadalupian",
            level: 4,
            parentId: 17,
            color: "#FB745C",
            end: 259.9,
            start: 272.3
        }, {
            id: 771,
            name: "Lopingian",
            level: 4,
            parentId: 17,
            color: "#FBA794",
            end: 252.2,
            start: 259.9
        }, {
            id: 46,
            name: "Early Triassic",
            level: 4,
            parentId: 16,
            textColor: "white",
            color: "#983999",
            end: 247.2,
            start: 252.2
        }, {
            id: 45,
            name: "Middle Triassic",
            level: 4,
            parentId: 16,
            textColor: "white",
            color: "#B168B1",
            end: 237,
            start: 247.2
        }, {
            id: 44,
            name: "Late Triassic",
            level: 4,
            parentId: 16,
            textColor: "white",
            color: "#BD8CC3",
            end: 201.3,
            start: 237
        }, {
            id: 43,
            name: "Early Jurassic",
            level: 4,
            parentId: 15,
            textColor: "white",
            color: "#42AED0",
            end: 174.1,
            start: 201.3
        }, {
            id: 42,
            name: "Middle Jurassic",
            level: 4,
            parentId: 15,
            color: "#80CFD8",
            end: 163.5,
            start: 174.1
        }, {
            id: 41,
            name: "Late Jurassic",
            level: 4,
            parentId: 15,
            color: "#B3E3EE",
            end: 145,
            start: 163.5
        }, {
            id: 40,
            name: "Early Cretaceous",
            level: 4,
            parentId: 14,
            color: "#8CCD57",
            end: 100.5,
            start: 145
        }, {
            id: 39,
            name: "Late Cretaceous",
            level: 4,
            parentId: 14,
            color: "#A6D84A",
            end: 66,
            start: 100.5
        }, {
            id: 38,
            name: "Paleocene",
            level: 4,
            parentId: 26,
            color: "#FDA75F",
            end: 56,
            start: 66
        }, {
            id: 37,
            name: "Eocene",
            level: 4,
            parentId: 26,
            color: "#FDB46C",
            end: 33.9,
            start: 56
        }, {
            id: 36,
            name: "Oligocene",
            level: 4,
            parentId: 26,
            color: "#FDC07A",
            end: 23.03,
            start: 33.9
        }, {
            id: 35,
            name: "Miocene",
            level: 4,
            parentId: 25,
            color: "#FFFF00",
            end: 5.333,
            start: 23.03
        }, {
            id: 34,
            name: "Pliocene",
            level: 4,
            parentId: 25,
            color: "#FFFF99",
            end: 2.588,
            start: 5.333
        }, {
            id: 33,
            name: "Pleistocene",
            level: 4,
            parentId: 12,
            color: "#FFF2AE",
            end: .0117,
            start: 2.588
        }, {
            id: 32,
            name: "Holocene",
            level: 4,
            parentId: 12,
            color: "#FEF2E0",
            end: 0,
            start: .0117
        }, {
            id: 1121,
            name: "Fortunian",
            level: 5,
            leaf: !0,
            parentId: 1111,
            color: "#99B575",
            end: 529,
            start: 541
        }, {
            id: 1120,
            name: "Stage 2",
            level: 5,
            leaf: !0,
            parentId: 1111,
            color: "#A6BA80",
            end: 521,
            start: 529
        }, {
            id: 1119,
            name: "Stage 3",
            level: 5,
            leaf: !0,
            parentId: 1110,
            color: "#A6C583",
            end: 514,
            start: 521
        }, {
            id: 1118,
            name: "Stage 4",
            level: 5,
            leaf: !0,
            parentId: 1110,
            color: "#B3CA8E",
            end: 509,
            start: 514
        }, {
            id: 1117,
            name: "Stage 5",
            level: 5,
            leaf: !0,
            parentId: 1109,
            color: "#B3D492",
            end: 504.5,
            start: 509
        }, {
            id: 1116,
            name: "Drumian",
            level: 5,
            leaf: !0,
            parentId: 1109,
            color: "#BFD99D",
            end: 500.5,
            start: 504.5
        }, {
            id: 1087,
            name: "Guzhangian",
            level: 5,
            leaf: !0,
            parentId: 1109,
            color: "#CCDFAA",
            end: 497,
            start: 500.5
        }, {
            id: 1114,
            name: "Paibian",
            level: 5,
            leaf: !0,
            parentId: 780,
            color: "#CCEBAE",
            end: 494,
            start: 497
        }, {
            id: 1113,
            name: "Jiangshanian",
            level: 5,
            leaf: !0,
            parentId: 780,
            color: "#D9F0BB",
            end: 489.5,
            start: 494
        }, {
            id: 1112,
            name: "Stage 10",
            level: 5,
            leaf: !0,
            parentId: 780,
            color: "#E6F5C9",
            end: 485.4,
            start: 489.5
        }, {
            id: 559,
            name: "Tremadocian",
            level: 5,
            leaf: !0,
            parentId: 31,
            textColor: "white",
            color: "#33A97E",
            end: 477.7,
            start: 485.4
        }, {
            id: 1010,
            name: "Floian",
            level: 5,
            leaf: !0,
            parentId: 31,
            textColor: "white",
            color: "#41B087",
            end: 470,
            start: 477.7
        }, {
            id: 1079,
            name: "Dapingian",
            level: 5,
            leaf: !0,
            parentId: 30,
            textColor: "white",
            color: "#66C092",
            end: 467.3,
            start: 470
        }, {
            id: 556,
            name: "Darriwilian",
            level: 5,
            leaf: !0,
            parentId: 30,
            textColor: "white",
            color: "#74C69C",
            end: 458.4,
            start: 467.3
        }, {
            id: 1009,
            name: "Sandbian",
            level: 5,
            leaf: !0,
            parentId: 29,
            color: "#8CD094",
            end: 453,
            start: 458.4
        }, {
            id: 1008,
            name: "Katian",
            level: 5,
            leaf: !0,
            parentId: 29,
            color: "#99D69F",
            end: 445.2,
            start: 453
        }, {
            id: 192,
            name: "Hirnantian",
            level: 5,
            leaf: !0,
            parentId: 29,
            color: "#A6DBAB",
            end: 443.4,
            start: 445.2
        }, {
            id: 191,
            name: "Rhuddanian",
            level: 5,
            leaf: !0,
            parentId: 62,
            color: "#A6DCB5",
            end: 440.8,
            start: 443.4
        }, {
            id: 190,
            name: "Aeronian",
            level: 5,
            leaf: !0,
            parentId: 62,
            color: "#B3E1C2",
            end: 438.5,
            start: 440.8
        }, {
            id: 189,
            name: "Telychian",
            level: 5,
            leaf: !0,
            parentId: 62,
            color: "#BFE6D1",
            end: 433.4,
            start: 438.5
        }, {
            id: 188,
            name: "Sheinwoodian",
            level: 5,
            leaf: !0,
            parentId: 61,
            color: "#BFE6C3",
            end: 430.5,
            start: 433.4
        }, {
            id: 785,
            name: "Homerian",
            level: 5,
            leaf: !0,
            parentId: 61,
            color: "#CCEBD1",
            end: 427.4,
            start: 430.5
        }, {
            id: 185,
            name: "Gorstian",
            level: 5,
            leaf: !0,
            parentId: 60,
            color: "#CCECDD",
            end: 425.6,
            start: 427.4
        }, {
            id: 184,
            name: "Ludfordian",
            level: 5,
            leaf: !0,
            parentId: 60,
            color: "#D9F0DF",
            end: 423,
            start: 425.6
        }, {
            id: 3001,
            name: "Pridoli",
            level: 5,
            leaf: !0,
            parentId: 59,
            color: "#E6F5E1",
            end: 419.2,
            start: 423
        }, {
            id: 183,
            name: "Lochkovian",
            level: 5,
            leaf: !0,
            parentId: 58,
            color: "#E5B75A",
            end: 410.8,
            start: 419.2
        }, {
            id: 182,
            name: "Pragian",
            level: 5,
            leaf: !0,
            parentId: 58,
            color: "#E5C468",
            end: 407.6,
            start: 410.8
        }, {
            id: 181,
            name: "Emsian",
            level: 5,
            leaf: !0,
            parentId: 58,
            color: "#E5D075",
            end: 393.3,
            start: 407.6
        }, {
            id: 180,
            name: "Eifelian",
            level: 5,
            leaf: !0,
            parentId: 57,
            color: "#F1D576",
            end: 387.7,
            start: 393.3
        }, {
            id: 179,
            name: "Givetian",
            level: 5,
            leaf: !0,
            parentId: 57,
            color: "#F1E185",
            end: 382.7,
            start: 387.7
        }, {
            id: 178,
            name: "Frasnian",
            level: 5,
            leaf: !0,
            parentId: 56,
            color: "#F2EDAD",
            end: 372.2,
            start: 382.7
        }, {
            id: 177,
            name: "Famennian",
            level: 5,
            leaf: !0,
            parentId: 56,
            color: "#F2EDC5",
            end: 358.9,
            start: 372.2
        }, {
            id: 55,
            name: "Tournaisian",
            level: 5,
            leaf: !0,
            parentId: 28,
            color: "#8CB06C",
            end: 346.7,
            start: 358.9
        }, {
            id: 54,
            name: "Visean",
            level: 5,
            leaf: !0,
            parentId: 28,
            color: "#A6B96C",
            end: 330.9,
            start: 346.7
        }, {
            id: 53,
            name: "Serpukhovian",
            level: 5,
            leaf: !0,
            parentId: 28,
            color: "#BFC26B",
            end: 323.2,
            start: 330.9
        }, {
            id: 52,
            name: "Bashkirian",
            level: 5,
            leaf: !0,
            parentId: 27,
            color: "#99C2B6",
            end: 315.2,
            start: 323.2
        }, {
            id: 51,
            name: "Moscovian",
            level: 5,
            leaf: !0,
            parentId: 27,
            color: "#B3CBB9",
            end: 307,
            start: 315.2
        }, {
            id: 50,
            name: "Kasimovian",
            level: 5,
            leaf: !0,
            parentId: 27,
            color: "#BFD0C5",
            end: 303.7,
            start: 307
        }, {
            id: 49,
            name: "Gzhelian",
            level: 5,
            leaf: !0,
            parentId: 27,
            color: "#CCD4C7",
            end: 298.9,
            start: 303.7
        }, {
            id: 151,
            name: "Asselian",
            level: 5,
            leaf: !0,
            parentId: 773,
            color: "#E36350",
            end: 295.5,
            start: 298.9
        }, {
            id: 150,
            name: "Sakmarian",
            level: 5,
            leaf: !0,
            parentId: 773,
            color: "#E36F5C",
            end: 290.1,
            start: 295.5
        }, {
            id: 149,
            name: "Artinskian",
            level: 5,
            leaf: !0,
            parentId: 773,
            color: "#E37B68",
            end: 279.3,
            start: 290.1
        }, {
            id: 148,
            name: "Kungurian",
            level: 5,
            leaf: !0,
            parentId: 773,
            color: "#E38776",
            end: 272.3,
            start: 279.3
        }, {
            id: 717,
            name: "Roadian",
            level: 5,
            leaf: !0,
            parentId: 772,
            color: "#FB8069",
            end: 268.8,
            start: 272.3
        }, {
            id: 146,
            name: "Wordian",
            level: 5,
            leaf: !0,
            parentId: 772,
            color: "#FB8D76",
            end: 265.1,
            start: 268.8
        }, {
            id: 145,
            name: "Capitanian",
            level: 5,
            leaf: !0,
            parentId: 772,
            color: "#FB9A85",
            end: 259.9,
            start: 265.1
        }, {
            id: 716,
            name: "Wuchiapingian",
            level: 5,
            leaf: !0,
            parentId: 771,
            color: "#FCB4A2",
            end: 254.2,
            start: 259.9
        }, {
            id: 715,
            name: "Changhsingian",
            level: 5,
            leaf: !0,
            parentId: 771,
            color: "#FCC0B2",
            end: 252.2,
            start: 254.2
        }, {
            id: 653,
            name: "Induan",
            level: 5,
            leaf: !0,
            parentId: 46,
            textColor: "white",
            color: "#A4469F",
            end: 251.2,
            start: 252.2
        }, {
            id: 652,
            name: "Olenekian",
            level: 5,
            leaf: !0,
            parentId: 46,
            textColor: "white",
            color: "#B051A5",
            end: 247.2,
            start: 251.2
        }, {
            id: 139,
            name: "Anisian",
            level: 5,
            leaf: !0,
            parentId: 45,
            textColor: "white",
            color: "#BC75B7",
            end: 242,
            start: 247.2
        }, {
            id: 138,
            name: "Ladinian",
            level: 5,
            leaf: !0,
            parentId: 45,
            textColor: "white",
            color: "#C983BF",
            end: 237,
            start: 242
        }, {
            id: 137,
            name: "Carnian",
            level: 5,
            leaf: !0,
            parentId: 44,
            color: "#C99BCB",
            end: 228,
            start: 237
        }, {
            id: 136,
            name: "Norian",
            level: 5,
            leaf: !0,
            parentId: 44,
            color: "#D6AAD3",
            end: 208.5,
            start: 228
        }, {
            id: 135,
            name: "Rhaetian",
            level: 5,
            leaf: !0,
            parentId: 44,
            textColor: "white",
            color: "#E3B9DB",
            end: 201.3,
            start: 208.5
        }, {
            id: 134,
            name: "Hettangian",
            level: 5,
            leaf: !0,
            parentId: 43,
            textColor: "white",
            color: "#4EB3D3",
            end: 199.3,
            start: 201.3
        }, {
            id: 133,
            name: "Sinemurian",
            level: 5,
            leaf: !0,
            parentId: 43,
            textColor: "white",
            color: "#67BCD8",
            end: 190.8,
            start: 199.3
        }, {
            id: 132,
            name: "Pliensbachian",
            level: 5,
            leaf: !0,
            parentId: 43,
            textColor: "white",
            color: "#80C5DD",
            end: 182.7,
            start: 190.8
        }, {
            id: 131,
            name: "Toarcian",
            level: 5,
            leaf: !0,
            parentId: 43,
            color: "#99CEE3",
            end: 174.1,
            start: 182.7
        }, {
            id: 130,
            name: "Aalenian",
            level: 5,
            leaf: !0,
            parentId: 42,
            color: "#9AD9DD",
            end: 170.3,
            start: 174.1
        }, {
            id: 129,
            name: "Bajocian",
            level: 5,
            leaf: !0,
            parentId: 42,
            color: "#A6DDE0",
            end: 168.3,
            start: 170.3
        }, {
            id: 128,
            name: "Bathonian",
            level: 5,
            leaf: !0,
            parentId: 42,
            color: "#B3E2E3",
            end: 166.1,
            start: 168.3
        }, {
            id: 127,
            name: "Callovian",
            level: 5,
            leaf: !0,
            parentId: 42,
            color: "#BFE7E5",
            end: 163.5,
            start: 166.1
        }, {
            id: 126,
            name: "Oxfordian",
            level: 5,
            leaf: !0,
            parentId: 41,
            color: "#BFE7F1",
            end: 157.3,
            start: 163.5
        }, {
            id: 125,
            name: "Kimmeridgian",
            level: 5,
            leaf: !0,
            parentId: 41,
            color: "#CCECF4",
            end: 152.1,
            start: 157.3
        }, {
            id: 124,
            name: "Tithonian",
            level: 5,
            leaf: !0,
            parentId: 41,
            color: "#D9F1F7",
            end: 145,
            start: 152.1
        }, {
            id: 123,
            name: "Berriasian",
            level: 5,
            leaf: !0,
            parentId: 40,
            color: "#8CCD60",
            end: 139.8,
            start: 145
        }, {
            id: 122,
            name: "Valanginian",
            level: 5,
            leaf: !0,
            parentId: 40,
            color: "#99D36A",
            end: 132.9,
            start: 139.8
        }, {
            id: 121,
            name: "Hauterivian",
            level: 5,
            leaf: !0,
            parentId: 40,
            color: "#A6D975",
            end: 129.4,
            start: 132.9
        }, {
            id: 120,
            name: "Barremian",
            level: 5,
            leaf: !0,
            parentId: 40,
            color: "#B3DF7F",
            end: 125,
            start: 129.4
        }, {
            id: 119,
            name: "Aptian",
            level: 5,
            leaf: !0,
            parentId: 40,
            color: "#BFE48A",
            end: 113,
            start: 125
        }, {
            id: 118,
            name: "Albian",
            level: 5,
            leaf: !0,
            parentId: 40,
            color: "#CCEA97",
            end: 100.5,
            start: 113
        }, {
            id: 117,
            name: "Cenomanian",
            level: 5,
            leaf: !0,
            parentId: 39,
            color: "#B3DE53",
            end: 93.9,
            start: 100.5
        }, {
            id: 116,
            name: "Turonian",
            level: 5,
            leaf: !0,
            parentId: 39,
            color: "#BFE35D",
            end: 89.8,
            start: 93.9
        }, {
            id: 115,
            name: "Coniacian",
            level: 5,
            leaf: !0,
            parentId: 39,
            color: "#CCE968",
            end: 86.3,
            start: 89.8
        }, {
            id: 114,
            name: "Santonian",
            level: 5,
            leaf: !0,
            parentId: 39,
            color: "#D9EF74",
            end: 83.6,
            start: 86.3
        }, {
            id: 113,
            name: "Campanian",
            level: 5,
            leaf: !0,
            parentId: 39,
            color: "#E6F47F",
            end: 72.1,
            start: 83.6
        }, {
            id: 112,
            name: "Maastrichtian",
            level: 5,
            leaf: !0,
            parentId: 39,
            color: "#F2FA8C",
            end: 66,
            start: 72.1
        }, {
            id: 111,
            name: "Danian",
            level: 5,
            leaf: !0,
            parentId: 38,
            color: "#FDB462",
            end: 61.6,
            start: 66
        }, {
            id: 743,
            name: "Selandian",
            level: 5,
            leaf: !0,
            parentId: 38,
            color: "#FEBF65",
            end: 59.2,
            start: 61.6
        }, {
            id: 110,
            name: "Thanetian",
            level: 5,
            leaf: !0,
            parentId: 38,
            color: "#FDBF6F",
            end: 56,
            start: 59.2
        }, {
            id: 109,
            name: "Ypresian",
            level: 5,
            leaf: !0,
            parentId: 37,
            color: "#FCA773",
            end: 47.8,
            start: 56
        }, {
            id: 108,
            name: "Lutetian",
            level: 5,
            leaf: !0,
            parentId: 37,
            color: "#FCB482",
            end: 41.3,
            start: 47.8
        }, {
            id: 107,
            name: "Bartonian",
            level: 5,
            leaf: !0,
            parentId: 37,
            color: "#FDC091",
            end: 38,
            start: 41.3
        }, {
            id: 106,
            name: "Priabonian",
            level: 5,
            leaf: !0,
            parentId: 37,
            color: "#FDCDA1",
            end: 33.9,
            start: 38
        }, {
            id: 105,
            name: "Rupelian",
            level: 5,
            leaf: !0,
            parentId: 36,
            color: "#FED99A",
            end: 28.1,
            start: 33.9
        }, {
            id: 104,
            name: "Chattian",
            level: 5,
            leaf: !0,
            parentId: 36,
            color: "#FEE6AA",
            end: 23.03,
            start: 28.1
        }, {
            id: 103,
            name: "Aquitanian",
            level: 5,
            leaf: !0,
            parentId: 35,
            color: "#FFFF33",
            end: 20.44,
            start: 23.03
        }, {
            id: 102,
            name: "Burdigalian",
            level: 5,
            leaf: !0,
            parentId: 35,
            color: "#FFFF41",
            end: 15.97,
            start: 20.44
        }, {
            id: 101,
            name: "Langhian",
            level: 5,
            leaf: !0,
            parentId: 35,
            color: "#FFFF4D",
            end: 13.82,
            start: 15.97
        }, {
            id: 100,
            name: "Serravallian",
            level: 5,
            leaf: !0,
            parentId: 35,
            color: "#FFFF59",
            end: 11.62,
            start: 13.82
        }, {
            id: 99,
            name: "Tortonian",
            level: 5,
            leaf: !0,
            parentId: 35,
            color: "#FFFF66",
            end: 7.246,
            start: 11.62
        }, {
            id: 98,
            name: "Messinian",
            level: 5,
            leaf: !0,
            parentId: 35,
            color: "#FFFF73",
            end: 5.333,
            start: 7.246
        }, {
            id: 97,
            name: "Zanclean",
            level: 5,
            leaf: !0,
            parentId: 34,
            color: "#FFFFB3",
            end: 3.6,
            start: 5.333
        }, {
            id: 96,
            name: "Piacenzian",
            level: 5,
            leaf: !0,
            parentId: 34,
            color: "#FFFFBF",
            end: 2.588,
            start: 3.6
        }, {
            id: 741,
            name: "Gelasian",
            level: 5,
            leaf: !0,
            parentId: 33,
            color: "#FFEDB3",
            end: 1.806,
            start: 2.588
        }, {
            id: 740,
            name: "Calabbrian",
            level: 5,
            leaf: !0,
            parentId: 33,
            color: "#FFF2BA",
            end: .781,
            start: 1.806
        }, {
            id: 923,
            name: "Chibanian",
            level: 5,
            leaf: !0,
            parentId: 33,
            color: "#FFF2C7",
            end: .126,
            start: .781
        }, {
            id: 922,
            name: "Late Pleistocene",
            level: 5,
            leaf: !0,
            parentId: 33,
            color: "#FFF2D3",
            end: .0117,
            start: .126
        }, {
            id: 3002,
            name: "Greenlandian",
            level: 5,
            leaf: !0,
            parentId: 32,
            color: "#FEECDB",
            end: .008,
            start: .0117
        }, {
            id: 3003,
            name: "Northgrippian",
            level: 5,
            leaf: !0,
            parentId: 32,
            color: "#FDECE4",
            end: .004,
            start: .008
        }, {
            id: 3004,
            name: "Meghalayan",
            level: 5,
            leaf: !0,
            parentId: 32,
            color: "#FDEDEC",
            end: 0,
            start: .004
        }]).sum(function(t) {
            return t.leaf ? t.start - t.end : 0
        });

    function Qn(t, e) {
        var n;
        void 0 === e && (e = 960);
        var r = new Set(t.descendants().map(function(t) {
                return t.data.start
            })),
            a = Array.from(r).map(function(e) {
                return t.descendants().find(function(t) {
                    return t.data.start === e
                })
            }).map(function(t) {
                var e;
                return {
                    x: t.x0,
                    depth: t.depth,
                    targetX: (null == t || null == (e = t.target) ? void 0 : e.x0) || 0,
                    text: t.data.start
                }
            }),
            i = {
                x: t.x1,
                depth: 0,
                targetX: (null == t || null == (n = t.target) ? void 0 : n.x1) || e,
                text: 0
            };
        return a.push(i), a
    }

    function Zn(t, e) {
        var n = (Zn.canvas || (Zn.canvas = document.createElement("canvas"))).getContext("2d");
        return n.font = e, n.measureText(t).width
    }
    t.geoTimescale = function t(e, r) {
        void 0 === r && (r = {});
        var a, i = r.tickLength,
            o = void 0 === i ? 10 : i,
            l = r.width,
            u = void 0 === l ? 960 : l,
            s = r.height,
            c = void 0 === s ? 400 : s,
            h = r.neighborWidth,
            f = void 0 === h ? 25 : h,
            d = r.fontSize,
            p = void 0 === d ? 12 : d,
            v = p + "px sans-serif",
            m = (a = Wn, function() {
                var t = 1,
                    e = 1,
                    n = 0,
                    r = !1;

                function a(a) {
                    var i = a.height + 1;
                    return a.x0 = a.y0 = n, a.x1 = t, a.y1 = e / i, a.eachBefore(function(t, e) {
                        return function(r) {
                            r.children && function(t, e, n, r, a) {
                                for (var i, o = t.children, l = -1, u = o.length, s = t.value && (r - e) / t.value; ++l < u;)(i = o[l]).y0 = n, i.y1 = a, i.x0 = e, i.x1 = e += i.value * s
                            }(r, r.x0, t * (r.depth + 1) / e, r.x1, t * (r.depth + 2) / e);
                            var a = r.x0,
                                i = r.y0,
                                o = r.x1 - n,
                                l = r.y1 - n;
                            o < a && (a = o = (a + o) / 2), l < i && (i = l = (i + l) / 2), r.x0 = a, r.y0 = i, r.x1 = o, r.y1 = l
                        }
                    }(e, i)), r && a.eachBefore(Vn), a
                }
                return a.round = function(t) {
                    return arguments.length ? (r = !!t, a) : r
                }, a.size = function(n) {
                    return arguments.length ? (t = +n[0], e = +n[1], a) : [t, e]
                }, a.padding = function(t) {
                    return arguments.length ? (n = +t, a) : n
                }, a
            }().size([u, c - 65]).padding(0)(a)),
            g = xt(e).append("svg").attr("viewBox", [0, 0, u, c]).style("font", v),
            y = g.append("g").attr("cursor", "grab");
        g.call(function() {
            var t, e, r, a = Mn,
                i = zn,
                o = Pn,
                l = Sn,
                u = Tn,
                s = [0, Infinity],
                c = [
                    [-Infinity, -Infinity],
                    [Infinity, Infinity]
                ],
                h = 250,
                f = xe,
                d = n("start", "zoom", "end"),
                p = 500,
                v = 0,
                m = 10;

            function g(t) {
                t.property("__zoom", Nn).on("wheel.zoom", C, {
                    passive: !1
                }).on("mousedown.zoom", F).on("dblclick.zoom", E).filter(u).on("touchstart.zoom", A).on("touchmove.zoom", B).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
            }

            function y(t, e) {
                return (e = Math.max(s[0], Math.min(s[1], e))) === t.k ? t : new An(e, t.x, t.y)
            }

            function _(t, e, n) {
                var r = e[0] - n[0] * t.k,
                    a = e[1] - n[1] * t.k;
                return r === t.x && a === t.y ? t : new An(t.k, r, a)
            }

            function w(t) {
                return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]
            }

            function x(t, e, n, r) {
                t.on("start.zoom", function() {
                    b(this, arguments).event(r).start()
                }).on("interrupt.zoom end.zoom", function() {
                    b(this, arguments).event(r).end()
                }).tween("zoom", function() {
                    var t = this,
                        a = arguments,
                        o = b(t, a).event(r),
                        l = i.apply(t, a),
                        u = null == n ? w(l) : "function" == typeof n ? n.apply(t, a) : n,
                        s = Math.max(l[1][0] - l[0][0], l[1][1] - l[0][1]),
                        c = t.__zoom,
                        h = "function" == typeof e ? e.apply(t, a) : e,
                        d = f(c.invert(u).concat(s / c.k), h.invert(u).concat(s / h.k));
                    return function(t) {
                        if (1 === t) t = h;
                        else {
                            var e = d(t),
                                n = s / e[2];
                            t = new An(n, u[0] - e[0] * n, u[1] - e[1] * n)
                        }
                        o.zoom(null, t)
                    }
                })
            }

            function b(t, e, n) {
                return !n && t.__zooming || new I(t, e)
            }

            function I(t, e) {
                this.that = t, this.args = e, this.active = 0, this.sourceEvent = null, this.extent = i.apply(t, e), this.taps = 0
            }

            function C(t, ...e) {
                if (a.apply(this, arguments)) {
                    var n = b(this, e).event(t),
                        r = this.__zoom,
                        i = Math.max(s[0], Math.min(s[1], r.k * Math.pow(2, l.apply(this, arguments)))),
                        u = bt(t);
                    if (n.wheel) n.mouse[0][0] === u[0] && n.mouse[0][1] === u[1] || (n.mouse[1] = r.invert(n.mouse[0] = u)), clearTimeout(n.wheel);
                    else {
                        if (r.k === i) return;
                        n.mouse = [u, r.invert(u)], He(this), n.start()
                    }
                    Dn(t), n.wheel = setTimeout(h, 150), n.zoom("mouse", o(_(y(r, i), n.mouse[0], n.mouse[1]), n.extent, c))
                }

                function h() {
                    n.wheel = null, n.end()
                }
            }

            function F(t, ...e) {
                if (!r && a.apply(this, arguments)) {
                    var n = t.currentTarget,
                        i = b(this, e, !0).event(t),
                        l = xt(t.view).on("mousemove.zoom", f, !0).on("mouseup.zoom", d, !0),
                        u = bt(t, n),
                        s = t.clientX,
                        h = t.clientY;
                    Ft(t.view), kn(t), i.mouse = [u, this.__zoom.invert(u)], He(this), i.start()
                }

                function f(t) {
                    if (Dn(t), !i.moved) {
                        var e = t.clientX - s,
                            r = t.clientY - h;
                        i.moved = e * e + r * r > v
                    }
                    i.event(t).zoom("mouse", o(_(i.that.__zoom, i.mouse[0] = bt(t, n), i.mouse[1]), i.extent, c))
                }

                function d(t) {
                    l.on("mousemove.zoom mouseup.zoom", null), Et(t.view, i.moved), Dn(t), i.event(t).end()
                }
            }

            function E(t, ...e) {
                if (a.apply(this, arguments)) {
                    var n = this.__zoom,
                        r = bt(t.changedTouches ? t.changedTouches[0] : t, this),
                        l = n.invert(r),
                        u = o(_(y(n, n.k * (t.shiftKey ? .5 : 2)), r, l), i.apply(this, e), c);
                    Dn(t), h > 0 ? xt(this).transition().duration(h).call(x, u, r, t) : xt(this).call(g.transform, u, r, t)
                }
            }

            function A(n, ...r) {
                if (a.apply(this, arguments)) {
                    var i, o, l, u, s = n.touches,
                        c = s.length,
                        h = b(this, r, n.changedTouches.length === c).event(n);
                    for (kn(n), o = 0; o < c; ++o) u = [u = bt(l = s[o], this), this.__zoom.invert(u), l.identifier], h.touch0 ? h.touch1 || h.touch0[2] === u[2] || (h.touch1 = u, h.taps = 0) : (h.touch0 = u, i = !0, h.taps = 1 + !!t);
                    t && (t = clearTimeout(t)), i && (h.taps < 2 && (e = u[0], t = setTimeout(function() {
                        t = null
                    }, p)), He(this), h.start())
                }
            }

            function B(t, ...e) {
                if (this.__zooming) {
                    var n, r, a, i, l = b(this, e).event(t),
                        u = t.changedTouches,
                        s = u.length;
                    for (Dn(t), n = 0; n < s; ++n) a = bt(r = u[n], this), l.touch0 && l.touch0[2] === r.identifier ? l.touch0[0] = a : l.touch1 && l.touch1[2] === r.identifier && (l.touch1[0] = a);
                    if (r = l.that.__zoom, l.touch1) {
                        var h = l.touch0[0],
                            f = l.touch0[1],
                            d = l.touch1[0],
                            p = l.touch1[1],
                            v = (v = d[0] - h[0]) * v + (v = d[1] - h[1]) * v,
                            m = (m = p[0] - f[0]) * m + (m = p[1] - f[1]) * m;
                        r = y(r, Math.sqrt(v / m)), a = [(h[0] + d[0]) / 2, (h[1] + d[1]) / 2], i = [(f[0] + p[0]) / 2, (f[1] + p[1]) / 2]
                    } else {
                        if (!l.touch0) return;
                        a = l.touch0[0], i = l.touch0[1]
                    }
                    l.zoom("touch", o(_(r, a, i), l.extent, c))
                }
            }

            function k(t, ...n) {
                if (this.__zooming) {
                    var a, i, o = b(this, n).event(t),
                        l = t.changedTouches,
                        u = l.length;
                    for (kn(t), r && clearTimeout(r), r = setTimeout(function() {
                            r = null
                        }, p), a = 0; a < u; ++a) i = l[a], o.touch0 && o.touch0[2] === i.identifier ? delete o.touch0 : o.touch1 && o.touch1[2] === i.identifier && delete o.touch1;
                    if (o.touch1 && !o.touch0 && (o.touch0 = o.touch1, delete o.touch1), o.touch0) o.touch0[1] = this.__zoom.invert(o.touch0[0]);
                    else if (o.end(), 2 === o.taps && (i = bt(i, this), Math.hypot(e[0] - i[0], e[1] - i[1]) < m)) {
                        var s = xt(this).on("dblclick.zoom");
                        s && s.apply(this, arguments)
                    }
                }
            }
            return g.transform = function(t, e, n, r) {
                var a = t.selection ? t.selection() : t;
                a.property("__zoom", Nn), t !== a ? x(t, e, n, r) : a.interrupt().each(function() {
                    b(this, arguments).event(r).start().zoom(null, "function" == typeof e ? e.apply(this, arguments) : e).end()
                })
            }, g.scaleBy = function(t, e, n, r) {
                g.scaleTo(t, function() {
                    return this.__zoom.k * ("function" == typeof e ? e.apply(this, arguments) : e)
                }, n, r)
            }, g.scaleTo = function(t, e, n, r) {
                g.transform(t, function() {
                    var t = i.apply(this, arguments),
                        r = this.__zoom,
                        a = null == n ? w(t) : "function" == typeof n ? n.apply(this, arguments) : n,
                        l = r.invert(a),
                        u = "function" == typeof e ? e.apply(this, arguments) : e;
                    return o(_(y(r, u), a, l), t, c)
                }, n, r)
            }, g.translateBy = function(t, e, n, r) {
                g.transform(t, function() {
                    return o(this.__zoom.translate("function" == typeof e ? e.apply(this, arguments) : e, "function" == typeof n ? n.apply(this, arguments) : n), i.apply(this, arguments), c)
                }, null, r)
            }, g.translateTo = function(t, e, n, r, a) {
                g.transform(t, function() {
                    var t = i.apply(this, arguments),
                        a = this.__zoom,
                        l = null == r ? w(t) : "function" == typeof r ? r.apply(this, arguments) : r;
                    return o(Bn.translate(l[0], l[1]).scale(a.k).translate("function" == typeof e ? -e.apply(this, arguments) : -e, "function" == typeof n ? -n.apply(this, arguments) : -n), t, c)
                }, r, a)
            }, I.prototype = {
                event: function(t) {
                    return t && (this.sourceEvent = t), this
                },
                start: function() {
                    return 1 == ++this.active && (this.that.__zooming = this, this.emit("start")), this
                },
                zoom: function(t, e) {
                    return this.mouse && "mouse" !== t && (this.mouse[1] = e.invert(this.mouse[0])), this.touch0 && "touch" !== t && (this.touch0[1] = e.invert(this.touch0[0])), this.touch1 && "touch" !== t && (this.touch1[1] = e.invert(this.touch1[0])), this.that.__zoom = e, this.emit("zoom"), this
                },
                end: function() {
                    return 0 == --this.active && (delete this.that.__zooming, this.emit("end")), this
                },
                emit: function(t) {
                    var e = xt(this.that).datum();
                    d.call(t, this.that, new En(t, {
                        sourceEvent: this.sourceEvent,
                        target: g,
                        type: t,
                        transform: this.that.__zoom,
                        dispatch: d
                    }), e)
                }
            }, g.wheelDelta = function(t) {
                return arguments.length ? (l = "function" == typeof t ? t : Fn(+t), g) : l
            }, g.filter = function(t) {
                return arguments.length ? (a = "function" == typeof t ? t : Fn(!!t), g) : a
            }, g.touchable = function(t) {
                return arguments.length ? (u = "function" == typeof t ? t : Fn(!!t), g) : u
            }, g.extent = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : Fn([
                    [+t[0][0], +t[0][1]],
                    [+t[1][0], +t[1][1]]
                ]), g) : i
            }, g.scaleExtent = function(t) {
                return arguments.length ? (s[0] = +t[0], s[1] = +t[1], g) : [s[0], s[1]]
            }, g.translateExtent = function(t) {
                return arguments.length ? (c[0][0] = +t[0][0], c[1][0] = +t[1][0], c[0][1] = +t[0][1], c[1][1] = +t[1][1], g) : [
                    [c[0][0], c[0][1]],
                    [c[1][0], c[1][1]]
                ]
            }, g.constrain = function(t) {
                return arguments.length ? (o = t, g) : o
            }, g.duration = function(t) {
                return arguments.length ? (h = +t, g) : h
            }, g.interpolate = function(t) {
                return arguments.length ? (f = t, g) : f
            }, g.on = function() {
                var t = d.on.apply(d, arguments);
                return t === d ? g : t
            }, g.clickDistance = function(t) {
                return arguments.length ? (v = (t = +t) * t, g) : Math.sqrt(v)
            }, g.tapDistance = function(t) {
                return arguments.length ? (m = +t, g) : m
            }, g
        }().extent([
            [0, 0],
            [u, c]
        ]).scaleExtent([1, 8]).on("zoom", function(t) {
            if (m.target) {
                var e = t.transform.x;
                e + m.target.x0 > 0 || m.x1 - e > m.target.x1 || (y.attr("cursor", "grabbing"), y.attr("transform", "translate(" + e + ",0)"))
            }
        }).on("end", function() {
            y.attr("cursor", "grab")
        }));
        var _ = m;
        t.focus = _, t.sequence = [];
        var w = !0,
            x = y.append("g").attr("id", "cells").selectAll("g").data(m.descendants()).join("g").attr("transform", function(t) {
                return "translate(" + t.x0 + "," + t.y0 + ")"
            }),
            b = x.append("rect").attr("width", function(t) {
                return t.x1 - t.x0
            }).attr("height", function(t) {
                return t.y1 - t.y0
            }).attr("fill", function(t) {
                return t.data.color
            }).attr("stroke", "white").attr("stroke-width", .5).attr("cursor", "pointer").on("pointerenter", function(e, n) {
                var r = n.ancestors().reverse();
                x.attr("fill-opacity", function(t) {
                    return r.includes(t) ? 1 : .5
                }), t.sequence = r
            }).on("click", function(e, n) {
                t.focus = _ = n === _ ? n.parent : n, w = [0, 1].includes(_.depth);
                var r = _.ancestors().slice(1),
                    a = e ? wn().duration(450) : null,
                    i = _.data.start === m.data.start ? 0 : f,
                    o = _.data.end === m.data.end ? 0 : f;
                m.each(function(t) {
                    var e = u - o - i,
                        n = _.x1 - _.x0;
                    t.target = {
                        x0: i + (t.x0 - _.x0) / n * e,
                        x1: i + (t.x1 - _.x0) / n * e,
                        y0: t.y0,
                        y1: t.y1
                    }
                }), y.transition(a).attr("transform", "translate(0,0)"), x.transition(a).attr("transform", function(t) {
                    return "translate(" + t.target.x0 + "," + t.target.y0 + ")"
                }), b.transition(a).attr("width", function(t) {
                    return +(t.target.x1 - t.target.x0)
                }).attr("stroke", "white").attr("stroke-width", 1), e && (xt(this).transition(a).attr("stroke", "black").attr("stroke-width", 1.5), xt(this.parentNode).raise()), I.transition(a).attr("fill-opacity", function(t) {
                    return r.includes(t) ? 1 : Jn(t.target)
                }).attr("x", function(t) {
                    if (r.includes(t)) return u / 2 - t.target.x0;
                    var e = (t.target.x1 - t.target.x0) / 2;
                    return Number.isNaN(e) ? -10 : e
                }).text(function(t) {
                    var e = t.target.x1 - t.target.x0,
                        n = Zn(t.data.name, v),
                        r = t.data.abbr || t.data.name.charAt(0);
                    return e - 8 < n ? r : t.data.name
                }), C.call(function(t) {
                    return F(t, Qn(m), w, a)
                })
            });
        g.on("pointerleave", function() {
            x.attr("fill-opacity", 1), t.sequence = []
        }), x.append("title").text(function(t) {
            return "" + t.ancestors().map(function(t) {
                return t.data.name
            }).reverse().join(" > ")
        });
        var I = x.append("text").style("user-select", "none").attr("pointer-events", "none").attr("x", function(t) {
                var e = (t.x1 - t.x0) / 2;
                return Number.isNaN(e) ? 0 : e
            }).attr("y", function(t) {
                return (t.y1 - t.y0) / 2
            }).attr("fill", function(t) {
                var e;
                return null != (e = t.data.textColor) ? e : "black"
            }).attr("fill-opacity", Jn).attr("text-anchor", "middle").attr("dominant-baseline", "middle").text(function(t) {
                var e = t.x1 - t.x0,
                    n = Zn(t.data.name, v),
                    r = t.data.abbr || t.data.name.charAt(0);
                return e - 10 < n ? r : t.data.name
            }),
            C = y.append("g").attr("id", "ticks").attr("transform", "translate(0," + (c - 65) + ")");

        function F(t, e, n, r) {
            t.selectAll("g").data(e).join(function(t) {
                var e = t.append("g").attr("transform", function(t) {
                    return "translate(" + t.x + ", 0)"
                }).attr("text-anchor", function(t) {
                    return 0 === t.x ? "start" : t.x === u ? "end" : "middle"
                }).attr("opacity", function(t) {
                    return [4, 5].includes(t.depth) && n ? 0 : 1
                });
                e.append("line").attr("stroke", "#555").attr("stroke-width", 1).attr("x1", 0).attr("y1", 2).attr("x2", 0).attr("y2", function(t) {
                    return 65 - t.depth * o - p
                }), e.append("text").attr("x", 0).attr("y", function(t) {
                    return 65 - t.depth * o - p / 2
                }).attr("dominant-baseline", "middle").attr("font-size", function(t) {
                    return 1 - .05 * t.depth + "em"
                }).text(function(t) {
                    return t.text
                }).clone(!0).lower().attr("stroke-linejoin", "round").attr("stroke-width", 2).attr("stroke", "white")
            }, function(t) {
                return t.transition(r).attr("opacity", function(t) {
                    return [4, 5].includes(t.depth) && n ? 0 : 1
                }).attr("transform", function(t) {
                    return "translate(" + t.targetX + ", 0)"
                }).attr("dominant-baseline", "hanging").attr("text-anchor", function(t) {
                    return 0 === t.targetX ? "start" : t.targetX === u ? "end" : "middle"
                })
            })
        }
        C.call(function(t) {
            return F(t, Qn(m), w)
        })
    }
});
//# sourceMappingURL=index.umd.js.map