!(function i(s, a, c) {
  function u(e, t) {
    if (!a[e]) {
      if (!s[e]) {
        var n = "function" == typeof require && require;
        if (!t && n) return n(e, !0);
        if (l) return l(e, !0);
        var o = new Error("Cannot find module '" + e + "'");
        throw ((o.code = "MODULE_NOT_FOUND"), o);
      }
      var r = (a[e] = { exports: {} });
      s[e][0].call(
        r.exports,
        function (t) {
          return u(s[e][1][t] || t);
        },
        r,
        r.exports,
        i,
        s,
        a,
        c
      );
    }
    return a[e].exports;
  }
  for (
    var l = "function" == typeof require && require, t = 0;
    t < c.length;
    t++
  )
    u(c[t]);
  return u;
})(
  {
    1: [
      function (t, e, n) {
        "use strict";
        var u = t("./utils");
        function l() {
          var o = {},
            n = 0,
            r = 0,
            i = 0;
          return {
            add: function (t, e) {
              e || ((e = t), (t = 0)),
                r < t ? (r = t) : t < i && (i = t),
                o[t] || (o[t] = []),
                o[t].push(e),
                n++;
            },
            process: function () {
              for (var t = i; t <= r; t++)
                for (var e = o[t], n = 0; n < e.length; n++) {
                  (0, e[n])();
                }
            },
            size: function () {
              return n;
            },
          };
        }
        e.exports = function (t) {
          var e = (t = t || {}).reporter,
            n = u.getOption(t, "async", !0),
            o = u.getOption(t, "auto", !0);
          o &&
            !n &&
            (e &&
              e.warn(
                "Invalid options combination. auto=true and async=false is invalid. Setting async=true."
              ),
            (n = !0));
          var r,
            i = l(),
            s = !1;
          function a() {
            for (s = !0; i.size(); ) {
              var t = i;
              (i = l()), t.process();
            }
            s = !1;
          }
          function c() {
            r = setTimeout(a, 0);
          }
          return {
            add: function (t, e) {
              !s && o && n && 0 === i.size() && c(), i.add(t, e);
            },
            force: function (t) {
              s ||
                (void 0 === t && (t = n),
                r && (clearTimeout(r), (r = null)),
                (t ? c : a)());
            },
          };
        };
      },
      { "./utils": 2 },
    ],
    2: [
      function (t, e, n) {
        "use strict";
        (e.exports = {}).getOption = function (t, e, n) {
          var o = t[e];
          return null != o || void 0 === n ? o : n;
        };
      },
      {},
    ],
    3: [
      function (t, e, n) {
        e.exports = function (t) {
          if ("function" != typeof t)
            throw TypeError(t + " is not a function!");
          return t;
        };
      },
      {},
    ],
    4: [
      function (t, e, n) {
        var o = t("./_wks")("unscopables"),
          r = Array.prototype;
        null == r[o] && t("./_hide")(r, o, {}),
          (e.exports = function (t) {
            r[o][t] = !0;
          });
      },
      { "./_hide": 32, "./_wks": 95 },
    ],
    5: [
      function (t, e, n) {
        "use strict";
        var o = t("./_string-at")(!0);
        e.exports = function (t, e, n) {
          return e + (n ? o(t, e).length : 1);
        };
      },
      { "./_string-at": 77 },
    ],
    6: [
      function (t, e, n) {
        e.exports = function (t, e, n, o) {
          if (!(t instanceof e) || (void 0 !== o && o in t))
            throw TypeError(n + ": incorrect invocation!");
          return t;
        };
      },
      {},
    ],
    7: [
      function (t, e, n) {
        var o = t("./_is-object");
        e.exports = function (t) {
          if (!o(t)) throw TypeError(t + " is not an object!");
          return t;
        };
      },
      { "./_is-object": 40 },
    ],
    8: [
      function (t, e, n) {
        "use strict";
        var l = t("./_to-object"),
          d = t("./_to-absolute-index"),
          f = t("./_to-length");
        e.exports =
          [].copyWithin ||
          function (t, e, n) {
            var o = l(this),
              r = f(o.length),
              i = d(t, r),
              s = d(e, r),
              a = 2 < arguments.length ? n : void 0,
              c = Math.min((void 0 === a ? r : d(a, r)) - s, r - i),
              u = 1;
            for (
              s < i && i < s + c && ((u = -1), (s += c - 1), (i += c - 1));
              0 < c--;

            )
              s in o ? (o[i] = o[s]) : delete o[i], (i += u), (s += u);
            return o;
          };
      },
      { "./_to-absolute-index": 81, "./_to-length": 85, "./_to-object": 86 },
    ],
    9: [
      function (t, e, n) {
        "use strict";
        var u = t("./_to-object"),
          l = t("./_to-absolute-index"),
          d = t("./_to-length");
        e.exports = function (t, e, n) {
          for (
            var o = u(this),
              r = d(o.length),
              i = arguments.length,
              s = l(1 < i ? e : void 0, r),
              a = 2 < i ? n : void 0,
              c = void 0 === a ? r : l(a, r);
            s < c;

          )
            o[s++] = t;
          return o;
        };
      },
      { "./_to-absolute-index": 81, "./_to-length": 85, "./_to-object": 86 },
    ],
    10: [
      function (t, e, n) {
        var c = t("./_to-iobject"),
          u = t("./_to-length"),
          l = t("./_to-absolute-index");
        e.exports = function (a) {
          return function (t, e, n) {
            var o,
              r = c(t),
              i = u(r.length),
              s = l(n, i);
            if (a && e != e) {
              for (; s < i; ) if ((o = r[s++]) != o) return !0;
            } else
              for (; s < i; s++)
                if ((a || s in r) && r[s] === e) return a || s || 0;
            return !a && -1;
          };
        };
      },
      { "./_to-absolute-index": 81, "./_to-iobject": 84, "./_to-length": 85 },
    ],
    11: [
      function (t, e, n) {
        var g = t("./_ctx"),
          b = t("./_iobject"),
          w = t("./_to-object"),
          x = t("./_to-length"),
          o = t("./_array-species-create");
        e.exports = function (d, t) {
          var f = 1 == d,
            p = 2 == d,
            h = 3 == d,
            v = 4 == d,
            y = 6 == d,
            m = 5 == d || y,
            _ = t || o;
          return function (t, e, n) {
            for (
              var o,
                r,
                i = w(t),
                s = b(i),
                a = g(e, n, 3),
                c = x(s.length),
                u = 0,
                l = f ? _(t, c) : p ? _(t, 0) : void 0;
              u < c;
              u++
            )
              if ((m || u in s) && ((r = a((o = s[u]), u, i)), d))
                if (f) l[u] = r;
                else if (r)
                  switch (d) {
                    case 3:
                      return !0;
                    case 5:
                      return o;
                    case 6:
                      return u;
                    case 2:
                      l.push(o);
                  }
                else if (v) return !1;
            return y ? -1 : h || v ? v : l;
          };
        };
      },
      {
        "./_array-species-create": 13,
        "./_ctx": 18,
        "./_iobject": 37,
        "./_to-length": 85,
        "./_to-object": 86,
      },
    ],
    12: [
      function (t, e, n) {
        var o = t("./_is-object"),
          r = t("./_is-array"),
          i = t("./_wks")("species");
        e.exports = function (t) {
          var e;
          return (
            r(t) &&
              ("function" != typeof (e = t.constructor) ||
                (e !== Array && !r(e.prototype)) ||
                (e = void 0),
              o(e) && null === (e = e[i]) && (e = void 0)),
            void 0 === e ? Array : e
          );
        };
      },
      { "./_is-array": 39, "./_is-object": 40, "./_wks": 95 },
    ],
    13: [
      function (t, e, n) {
        var o = t("./_array-species-constructor");
        e.exports = function (t, e) {
          return new (o(t))(e);
        };
      },
      { "./_array-species-constructor": 12 },
    ],
    14: [
      function (t, e, n) {
        var r = t("./_cof"),
          i = t("./_wks")("toStringTag"),
          s =
            "Arguments" ==
            r(
              (function () {
                return arguments;
              })()
            );
        e.exports = function (t) {
          var e, n, o;
          return void 0 === t
            ? "Undefined"
            : null === t
            ? "Null"
            : "string" ==
              typeof (n = (function (t, e) {
                try {
                  return t[e];
                } catch (t) {}
              })((e = Object(t)), i))
            ? n
            : s
            ? r(e)
            : "Object" == (o = r(e)) && "function" == typeof e.callee
            ? "Arguments"
            : o;
        };
      },
      { "./_cof": 15, "./_wks": 95 },
    ],
    15: [
      function (t, e, n) {
        var o = {}.toString;
        e.exports = function (t) {
          return o.call(t).slice(8, -1);
        };
      },
      {},
    ],
    16: [
      function (t, e, n) {
        var o = (e.exports = { version: "2.6.11" });
        "number" == typeof __e && (__e = o);
      },
      {},
    ],
    17: [
      function (t, e, n) {
        "use strict";
        var o = t("./_object-dp"),
          r = t("./_property-desc");
        e.exports = function (t, e, n) {
          e in t ? o.f(t, e, r(0, n)) : (t[e] = n);
        };
      },
      { "./_object-dp": 52, "./_property-desc": 66 },
    ],
    18: [
      function (t, e, n) {
        var i = t("./_a-function");
        e.exports = function (o, r, t) {
          if ((i(o), void 0 === r)) return o;
          switch (t) {
            case 1:
              return function (t) {
                return o.call(r, t);
              };
            case 2:
              return function (t, e) {
                return o.call(r, t, e);
              };
            case 3:
              return function (t, e, n) {
                return o.call(r, t, e, n);
              };
          }
          return function () {
            return o.apply(r, arguments);
          };
        };
      },
      { "./_a-function": 3 },
    ],
    19: [
      function (t, e, n) {
        e.exports = function (t) {
          if (null == t) throw TypeError("Can't call method on  " + t);
          return t;
        };
      },
      {},
    ],
    20: [
      function (t, e, n) {
        e.exports = !t("./_fails")(function () {
          return (
            7 !=
            Object.defineProperty({}, "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        });
      },
      { "./_fails": 25 },
    ],
    21: [
      function (t, e, n) {
        var o = t("./_is-object"),
          r = t("./_global").document,
          i = o(r) && o(r.createElement);
        e.exports = function (t) {
          return i ? r.createElement(t) : {};
        };
      },
      { "./_global": 30, "./_is-object": 40 },
    ],
    22: [
      function (t, e, n) {
        e.exports =
          "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
            ","
          );
      },
      {},
    ],
    23: [
      function (t, e, n) {
        var a = t("./_object-keys"),
          c = t("./_object-gops"),
          u = t("./_object-pie");
        e.exports = function (t) {
          var e = a(t),
            n = c.f;
          if (n)
            for (var o, r = n(t), i = u.f, s = 0; r.length > s; )
              i.call(t, (o = r[s++])) && e.push(o);
          return e;
        };
      },
      { "./_object-gops": 57, "./_object-keys": 60, "./_object-pie": 61 },
    ],
    24: [
      function (t, e, n) {
        var v = t("./_global"),
          y = t("./_core"),
          m = t("./_hide"),
          _ = t("./_redefine"),
          g = t("./_ctx"),
          b = "prototype",
          w = function (t, e, n) {
            var o,
              r,
              i,
              s,
              a = t & w.F,
              c = t & w.G,
              u = t & w.S,
              l = t & w.P,
              d = t & w.B,
              f = c ? v : u ? v[e] || (v[e] = {}) : (v[e] || {})[b],
              p = c ? y : y[e] || (y[e] = {}),
              h = p[b] || (p[b] = {});
            for (o in (c && (n = e), n))
              (i = ((r = !a && f && void 0 !== f[o]) ? f : n)[o]),
                (s =
                  d && r
                    ? g(i, v)
                    : l && "function" == typeof i
                    ? g(Function.call, i)
                    : i),
                f && _(f, o, i, t & w.U),
                p[o] != i && m(p, o, s),
                l && h[o] != i && (h[o] = i);
          };
        (v.core = y),
          (w.F = 1),
          (w.G = 2),
          (w.S = 4),
          (w.P = 8),
          (w.B = 16),
          (w.W = 32),
          (w.U = 64),
          (w.R = 128),
          (e.exports = w);
      },
      {
        "./_core": 16,
        "./_ctx": 18,
        "./_global": 30,
        "./_hide": 32,
        "./_redefine": 68,
      },
    ],
    25: [
      function (t, e, n) {
        e.exports = function (t) {
          try {
            return !!t();
          } catch (t) {
            return !0;
          }
        };
      },
      {},
    ],
    26: [
      function (t, e, n) {
        "use strict";
        t("./es6.regexp.exec");
        var l = t("./_redefine"),
          d = t("./_hide"),
          f = t("./_fails"),
          p = t("./_defined"),
          h = t("./_wks"),
          v = t("./_regexp-exec"),
          y = h("species"),
          m = !f(function () {
            var t = /./;
            return (
              (t.exec = function () {
                var t = [];
                return (t.groups = { a: "7" }), t;
              }),
              "7" !== "".replace(t, "$<a>")
            );
          }),
          _ = (function () {
            var t = /(?:)/,
              e = t.exec;
            t.exec = function () {
              return e.apply(this, arguments);
            };
            var n = "ab".split(t);
            return 2 === n.length && "a" === n[0] && "b" === n[1];
          })();
        e.exports = function (n, t, e) {
          var o = h(n),
            i = !f(function () {
              var t = {};
              return (
                (t[o] = function () {
                  return 7;
                }),
                7 != ""[n](t)
              );
            }),
            r = i
              ? !f(function () {
                  var t = !1,
                    e = /a/;
                  return (
                    (e.exec = function () {
                      return (t = !0), null;
                    }),
                    "split" === n &&
                      ((e.constructor = {}),
                      (e.constructor[y] = function () {
                        return e;
                      })),
                    e[o](""),
                    !t
                  );
                })
              : void 0;
          if (!i || !r || ("replace" === n && !m) || ("split" === n && !_)) {
            var s = /./[o],
              a = e(p, o, ""[n], function (t, e, n, o, r) {
                return e.exec === v
                  ? i && !r
                    ? { done: !0, value: s.call(e, n, o) }
                    : { done: !0, value: t.call(n, e, o) }
                  : { done: !1 };
              }),
              c = a[0],
              u = a[1];
            l(String.prototype, n, c),
              d(
                RegExp.prototype,
                o,
                2 == t
                  ? function (t, e) {
                      return u.call(t, this, e);
                    }
                  : function (t) {
                      return u.call(t, this);
                    }
              );
          }
        };
      },
      {
        "./_defined": 19,
        "./_fails": 25,
        "./_hide": 32,
        "./_redefine": 68,
        "./_regexp-exec": 70,
        "./_wks": 95,
        "./es6.regexp.exec": 106,
      },
    ],
    27: [
      function (t, e, n) {
        "use strict";
        var o = t("./_an-object");
        e.exports = function () {
          var t = o(this),
            e = "";
          return (
            t.global && (e += "g"),
            t.ignoreCase && (e += "i"),
            t.multiline && (e += "m"),
            t.unicode && (e += "u"),
            t.sticky && (e += "y"),
            e
          );
        };
      },
      { "./_an-object": 7 },
    ],
    28: [
      function (t, e, n) {
        var f = t("./_ctx"),
          p = t("./_iter-call"),
          h = t("./_is-array-iter"),
          v = t("./_an-object"),
          y = t("./_to-length"),
          m = t("./core.get-iterator-method"),
          _ = {},
          g = {};
        ((n = e.exports =
          function (t, e, n, o, r) {
            var i,
              s,
              a,
              c,
              u = r
                ? function () {
                    return t;
                  }
                : m(t),
              l = f(n, o, e ? 2 : 1),
              d = 0;
            if ("function" != typeof u)
              throw TypeError(t + " is not iterable!");
            if (h(u)) {
              for (i = y(t.length); d < i; d++)
                if (
                  (c = e ? l(v((s = t[d]))[0], s[1]) : l(t[d])) === _ ||
                  c === g
                )
                  return c;
            } else
              for (a = u.call(t); !(s = a.next()).done; )
                if ((c = p(a, l, s.value, e)) === _ || c === g) return c;
          }).BREAK = _),
          (n.RETURN = g);
      },
      {
        "./_an-object": 7,
        "./_ctx": 18,
        "./_is-array-iter": 38,
        "./_iter-call": 41,
        "./_to-length": 85,
        "./core.get-iterator-method": 96,
      },
    ],
    29: [
      function (t, e, n) {
        e.exports = t("./_shared")(
          "native-function-to-string",
          Function.toString
        );
      },
      { "./_shared": 75 },
    ],
    30: [
      function (t, e, n) {
        var o = (e.exports =
          "undefined" != typeof window && window.Math == Math
            ? window
            : "undefined" != typeof self && self.Math == Math
            ? self
            : Function("return this")());
        "number" == typeof __g && (__g = o);
      },
      {},
    ],
    31: [
      function (t, e, n) {
        var o = {}.hasOwnProperty;
        e.exports = function (t, e) {
          return o.call(t, e);
        };
      },
      {},
    ],
    32: [
      function (t, e, n) {
        var o = t("./_object-dp"),
          r = t("./_property-desc");
        e.exports = t("./_descriptors")
          ? function (t, e, n) {
              return o.f(t, e, r(1, n));
            }
          : function (t, e, n) {
              return (t[e] = n), t;
            };
      },
      { "./_descriptors": 20, "./_object-dp": 52, "./_property-desc": 66 },
    ],
    33: [
      function (t, e, n) {
        var o = t("./_global").document;
        e.exports = o && o.documentElement;
      },
      { "./_global": 30 },
    ],
    34: [
      function (t, e, n) {
        e.exports =
          !t("./_descriptors") &&
          !t("./_fails")(function () {
            return (
              7 !=
              Object.defineProperty(t("./_dom-create")("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a
            );
          });
      },
      { "./_descriptors": 20, "./_dom-create": 21, "./_fails": 25 },
    ],
    35: [
      function (t, e, n) {
        var i = t("./_is-object"),
          s = t("./_set-proto").set;
        e.exports = function (t, e, n) {
          var o,
            r = e.constructor;
          return (
            r !== n &&
              "function" == typeof r &&
              (o = r.prototype) !== n.prototype &&
              i(o) &&
              s &&
              s(t, o),
            t
          );
        };
      },
      { "./_is-object": 40, "./_set-proto": 71 },
    ],
    36: [
      function (t, e, n) {
        e.exports = function (t, e, n) {
          var o = void 0 === n;
          switch (e.length) {
            case 0:
              return o ? t() : t.call(n);
            case 1:
              return o ? t(e[0]) : t.call(n, e[0]);
            case 2:
              return o ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
            case 3:
              return o ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
            case 4:
              return o
                ? t(e[0], e[1], e[2], e[3])
                : t.call(n, e[0], e[1], e[2], e[3]);
          }
          return t.apply(n, e);
        };
      },
      {},
    ],
    37: [
      function (t, e, n) {
        var o = t("./_cof");
        e.exports = Object("z").propertyIsEnumerable(0)
          ? Object
          : function (t) {
              return "String" == o(t) ? t.split("") : Object(t);
            };
      },
      { "./_cof": 15 },
    ],
    38: [
      function (t, e, n) {
        var o = t("./_iterators"),
          r = t("./_wks")("iterator"),
          i = Array.prototype;
        e.exports = function (t) {
          return void 0 !== t && (o.Array === t || i[r] === t);
        };
      },
      { "./_iterators": 46, "./_wks": 95 },
    ],
    39: [
      function (t, e, n) {
        var o = t("./_cof");
        e.exports =
          Array.isArray ||
          function (t) {
            return "Array" == o(t);
          };
      },
      { "./_cof": 15 },
    ],
    40: [
      function (t, e, n) {
        e.exports = function (t) {
          return "object" == typeof t ? null !== t : "function" == typeof t;
        };
      },
      {},
    ],
    41: [
      function (t, e, n) {
        var i = t("./_an-object");
        e.exports = function (e, t, n, o) {
          try {
            return o ? t(i(n)[0], n[1]) : t(n);
          } catch (t) {
            var r = e.return;
            throw (void 0 !== r && i(r.call(e)), t);
          }
        };
      },
      { "./_an-object": 7 },
    ],
    42: [
      function (t, e, n) {
        "use strict";
        var o = t("./_object-create"),
          r = t("./_property-desc"),
          i = t("./_set-to-string-tag"),
          s = {};
        t("./_hide")(s, t("./_wks")("iterator"), function () {
          return this;
        }),
          (e.exports = function (t, e, n) {
            (t.prototype = o(s, { next: r(1, n) })), i(t, e + " Iterator");
          });
      },
      {
        "./_hide": 32,
        "./_object-create": 51,
        "./_property-desc": 66,
        "./_set-to-string-tag": 73,
        "./_wks": 95,
      },
    ],
    43: [
      function (t, e, n) {
        "use strict";
        function g() {
          return this;
        }
        var b = t("./_library"),
          w = t("./_export"),
          x = t("./_redefine"),
          D = t("./_hide"),
          k = t("./_iterators"),
          E = t("./_iter-create"),
          B = t("./_set-to-string-tag"),
          j = t("./_object-gpo"),
          K = t("./_wks")("iterator"),
          C = !([].keys && "next" in [].keys()),
          S = "values";
        e.exports = function (t, e, n, o, r, i, s) {
          E(n, e, o);
          function a(t) {
            if (!C && t in h) return h[t];
            switch (t) {
              case "keys":
              case S:
                return function () {
                  return new n(this, t);
                };
            }
            return function () {
              return new n(this, t);
            };
          }
          var c,
            u,
            l,
            d = e + " Iterator",
            f = r == S,
            p = !1,
            h = t.prototype,
            v = h[K] || h["@@iterator"] || (r && h[r]),
            y = v || a(r),
            m = r ? (f ? a("entries") : y) : void 0,
            _ = ("Array" == e && h.entries) || v;
          if (
            (_ &&
              (l = j(_.call(new t()))) !== Object.prototype &&
              l.next &&
              (B(l, d, !0), b || "function" == typeof l[K] || D(l, K, g)),
            f &&
              v &&
              v.name !== S &&
              ((p = !0),
              (y = function () {
                return v.call(this);
              })),
            (b && !s) || (!C && !p && h[K]) || D(h, K, y),
            (k[e] = y),
            (k[d] = g),
            r)
          )
            if (
              ((c = {
                values: f ? y : a(S),
                keys: i ? y : a("keys"),
                entries: m,
              }),
              s)
            )
              for (u in c) u in h || x(h, u, c[u]);
            else w(w.P + w.F * (C || p), e, c);
          return c;
        };
      },
      {
        "./_export": 24,
        "./_hide": 32,
        "./_iter-create": 42,
        "./_iterators": 46,
        "./_library": 47,
        "./_object-gpo": 58,
        "./_redefine": 68,
        "./_set-to-string-tag": 73,
        "./_wks": 95,
      },
    ],
    44: [
      function (t, e, n) {
        var i = t("./_wks")("iterator"),
          s = !1;
        try {
          var o = [7][i]();
          (o.return = function () {
            s = !0;
          }),
            Array.from(o, function () {
              throw 2;
            });
        } catch (t) {}
        e.exports = function (t, e) {
          if (!e && !s) return !1;
          var n = !1;
          try {
            var o = [7],
              r = o[i]();
            (r.next = function () {
              return { done: (n = !0) };
            }),
              (o[i] = function () {
                return r;
              }),
              t(o);
          } catch (t) {}
          return n;
        };
      },
      { "./_wks": 95 },
    ],
    45: [
      function (t, e, n) {
        e.exports = function (t, e) {
          return { value: e, done: !!t };
        };
      },
      {},
    ],
    46: [
      function (t, e, n) {
        e.exports = {};
      },
      {},
    ],
    47: [
      function (t, e, n) {
        e.exports = !1;
      },
      {},
    ],
    48: [
      function (t, e, n) {
        function o(t) {
          a(t, r, { value: { i: "O" + ++c, w: {} } });
        }
        var r = t("./_uid")("meta"),
          i = t("./_is-object"),
          s = t("./_has"),
          a = t("./_object-dp").f,
          c = 0,
          u =
            Object.isExtensible ||
            function () {
              return !0;
            },
          l = !t("./_fails")(function () {
            return u(Object.preventExtensions({}));
          }),
          d = (e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: function (t, e) {
              if (!i(t))
                return "symbol" == typeof t
                  ? t
                  : ("string" == typeof t ? "S" : "P") + t;
              if (!s(t, r)) {
                if (!u(t)) return "F";
                if (!e) return "E";
                o(t);
              }
              return t[r].i;
            },
            getWeak: function (t, e) {
              if (!s(t, r)) {
                if (!u(t)) return !0;
                if (!e) return !1;
                o(t);
              }
              return t[r].w;
            },
            onFreeze: function (t) {
              return l && d.NEED && u(t) && !s(t, r) && o(t), t;
            },
          });
      },
      {
        "./_fails": 25,
        "./_has": 31,
        "./_is-object": 40,
        "./_object-dp": 52,
        "./_uid": 91,
      },
    ],
    49: [
      function (t, e, n) {
        var a = t("./_global"),
          c = t("./_task").set,
          u = a.MutationObserver || a.WebKitMutationObserver,
          l = a.process,
          d = a.Promise,
          f = "process" == t("./_cof")(l);
        e.exports = function () {
          function t() {
            var t, e;
            for (f && (t = l.domain) && t.exit(); n; ) {
              (e = n.fn), (n = n.next);
              try {
                e();
              } catch (t) {
                throw (n ? r() : (o = void 0), t);
              }
            }
            (o = void 0), t && t.enter();
          }
          var n, o, r;
          if (f)
            r = function () {
              l.nextTick(t);
            };
          else if (!u || (a.navigator && a.navigator.standalone))
            if (d && d.resolve) {
              var e = d.resolve(void 0);
              r = function () {
                e.then(t);
              };
            } else
              r = function () {
                c.call(a, t);
              };
          else {
            var i = !0,
              s = document.createTextNode("");
            new u(t).observe(s, { characterData: !0 }),
              (r = function () {
                s.data = i = !i;
              });
          }
          return function (t) {
            var e = { fn: t, next: void 0 };
            o && (o.next = e), n || ((n = e), r()), (o = e);
          };
        };
      },
      { "./_cof": 15, "./_global": 30, "./_task": 80 },
    ],
    50: [
      function (t, e, n) {
        "use strict";
        var r = t("./_a-function");
        function o(t) {
          var n, o;
          (this.promise = new t(function (t, e) {
            if (void 0 !== n || void 0 !== o)
              throw TypeError("Bad Promise constructor");
            (n = t), (o = e);
          })),
            (this.resolve = r(n)),
            (this.reject = r(o));
        }
        e.exports.f = function (t) {
          return new o(t);
        };
      },
      { "./_a-function": 3 },
    ],
    51: [
      function (o, t, e) {
        function r() {}
        var i = o("./_an-object"),
          s = o("./_object-dps"),
          a = o("./_enum-bug-keys"),
          c = o("./_shared-key")("IE_PROTO"),
          u = "prototype",
          l = function () {
            var t,
              e = o("./_dom-create")("iframe"),
              n = a.length;
            for (
              e.style.display = "none",
                o("./_html").appendChild(e),
                e.src = "javascript:",
                (t = e.contentWindow.document).open(),
                t.write("<script>document.F=Object</script>"),
                t.close(),
                l = t.F;
              n--;

            )
              delete l[u][a[n]];
            return l();
          };
        t.exports =
          Object.create ||
          function (t, e) {
            var n;
            return (
              null !== t
                ? ((r[u] = i(t)), (n = new r()), (r[u] = null), (n[c] = t))
                : (n = l()),
              void 0 === e ? n : s(n, e)
            );
          };
      },
      {
        "./_an-object": 7,
        "./_dom-create": 21,
        "./_enum-bug-keys": 22,
        "./_html": 33,
        "./_object-dps": 53,
        "./_shared-key": 74,
      },
    ],
    52: [
      function (t, e, n) {
        var o = t("./_an-object"),
          r = t("./_ie8-dom-define"),
          i = t("./_to-primitive"),
          s = Object.defineProperty;
        n.f = t("./_descriptors")
          ? Object.defineProperty
          : function (t, e, n) {
              if ((o(t), (e = i(e, !0)), o(n), r))
                try {
                  return s(t, e, n);
                } catch (t) {}
              if ("get" in n || "set" in n)
                throw TypeError("Accessors not supported!");
              return "value" in n && (t[e] = n.value), t;
            };
      },
      {
        "./_an-object": 7,
        "./_descriptors": 20,
        "./_ie8-dom-define": 34,
        "./_to-primitive": 87,
      },
    ],
    53: [
      function (t, e, n) {
        var s = t("./_object-dp"),
          a = t("./_an-object"),
          c = t("./_object-keys");
        e.exports = t("./_descriptors")
          ? Object.defineProperties
          : function (t, e) {
              a(t);
              for (var n, o = c(e), r = o.length, i = 0; i < r; )
                s.f(t, (n = o[i++]), e[n]);
              return t;
            };
      },
      {
        "./_an-object": 7,
        "./_descriptors": 20,
        "./_object-dp": 52,
        "./_object-keys": 60,
      },
    ],
    54: [
      function (t, e, n) {
        var o = t("./_object-pie"),
          r = t("./_property-desc"),
          i = t("./_to-iobject"),
          s = t("./_to-primitive"),
          a = t("./_has"),
          c = t("./_ie8-dom-define"),
          u = Object.getOwnPropertyDescriptor;
        n.f = t("./_descriptors")
          ? u
          : function (t, e) {
              if (((t = i(t)), (e = s(e, !0)), c))
                try {
                  return u(t, e);
                } catch (t) {}
              if (a(t, e)) return r(!o.f.call(t, e), t[e]);
            };
      },
      {
        "./_descriptors": 20,
        "./_has": 31,
        "./_ie8-dom-define": 34,
        "./_object-pie": 61,
        "./_property-desc": 66,
        "./_to-iobject": 84,
        "./_to-primitive": 87,
      },
    ],
    55: [
      function (t, e, n) {
        var o = t("./_to-iobject"),
          r = t("./_object-gopn").f,
          i = {}.toString,
          s =
            "object" == typeof window && window && Object.getOwnPropertyNames
              ? Object.getOwnPropertyNames(window)
              : [];
        e.exports.f = function (t) {
          return s && "[object Window]" == i.call(t)
            ? (function (t) {
                try {
                  return r(t);
                } catch (t) {
                  return s.slice();
                }
              })(t)
            : r(o(t));
        };
      },
      { "./_object-gopn": 56, "./_to-iobject": 84 },
    ],
    56: [
      function (t, e, n) {
        var o = t("./_object-keys-internal"),
          r = t("./_enum-bug-keys").concat("length", "prototype");
        n.f =
          Object.getOwnPropertyNames ||
          function (t) {
            return o(t, r);
          };
      },
      { "./_enum-bug-keys": 22, "./_object-keys-internal": 59 },
    ],
    57: [
      function (t, e, n) {
        n.f = Object.getOwnPropertySymbols;
      },
      {},
    ],
    58: [
      function (t, e, n) {
        var o = t("./_has"),
          r = t("./_to-object"),
          i = t("./_shared-key")("IE_PROTO"),
          s = Object.prototype;
        e.exports =
          Object.getPrototypeOf ||
          function (t) {
            return (
              (t = r(t)),
              o(t, i)
                ? t[i]
                : "function" == typeof t.constructor &&
                  t instanceof t.constructor
                ? t.constructor.prototype
                : t instanceof Object
                ? s
                : null
            );
          };
      },
      { "./_has": 31, "./_shared-key": 74, "./_to-object": 86 },
    ],
    59: [
      function (t, e, n) {
        var s = t("./_has"),
          a = t("./_to-iobject"),
          c = t("./_array-includes")(!1),
          u = t("./_shared-key")("IE_PROTO");
        e.exports = function (t, e) {
          var n,
            o = a(t),
            r = 0,
            i = [];
          for (n in o) n != u && s(o, n) && i.push(n);
          for (; e.length > r; ) s(o, (n = e[r++])) && (~c(i, n) || i.push(n));
          return i;
        };
      },
      {
        "./_array-includes": 10,
        "./_has": 31,
        "./_shared-key": 74,
        "./_to-iobject": 84,
      },
    ],
    60: [
      function (t, e, n) {
        var o = t("./_object-keys-internal"),
          r = t("./_enum-bug-keys");
        e.exports =
          Object.keys ||
          function (t) {
            return o(t, r);
          };
      },
      { "./_enum-bug-keys": 22, "./_object-keys-internal": 59 },
    ],
    61: [
      function (t, e, n) {
        n.f = {}.propertyIsEnumerable;
      },
      {},
    ],
    62: [
      function (t, e, n) {
        var r = t("./_export"),
          i = t("./_core"),
          s = t("./_fails");
        e.exports = function (t, e) {
          var n = (i.Object || {})[t] || Object[t],
            o = {};
          (o[t] = e(n)),
            r(
              r.S +
                r.F *
                  s(function () {
                    n(1);
                  }),
              "Object",
              o
            );
        };
      },
      { "./_core": 16, "./_export": 24, "./_fails": 25 },
    ],
    63: [
      function (t, e, n) {
        var o = t("./_global").parseInt,
          r = t("./_string-trim").trim,
          i = t("./_string-ws"),
          s = /^[-+]?0[xX]/;
        e.exports =
          8 !== o(i + "08") || 22 !== o(i + "0x16")
            ? function (t, e) {
                var n = r(String(t), 3);
                return o(n, e >>> 0 || (s.test(n) ? 16 : 10));
              }
            : o;
      },
      { "./_global": 30, "./_string-trim": 78, "./_string-ws": 79 },
    ],
    64: [
      function (t, e, n) {
        e.exports = function (t) {
          try {
            return { e: !1, v: t() };
          } catch (t) {
            return { e: !0, v: t };
          }
        };
      },
      {},
    ],
    65: [
      function (t, e, n) {
        var o = t("./_an-object"),
          r = t("./_is-object"),
          i = t("./_new-promise-capability");
        e.exports = function (t, e) {
          if ((o(t), r(e) && e.constructor === t)) return e;
          var n = i.f(t);
          return (0, n.resolve)(e), n.promise;
        };
      },
      {
        "./_an-object": 7,
        "./_is-object": 40,
        "./_new-promise-capability": 50,
      },
    ],
    66: [
      function (t, e, n) {
        e.exports = function (t, e) {
          return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e,
          };
        };
      },
      {},
    ],
    67: [
      function (t, e, n) {
        var r = t("./_redefine");
        e.exports = function (t, e, n) {
          for (var o in e) r(t, o, e[o], n);
          return t;
        };
      },
      { "./_redefine": 68 },
    ],
    68: [
      function (t, e, n) {
        var i = t("./_global"),
          s = t("./_hide"),
          a = t("./_has"),
          c = t("./_uid")("src"),
          o = t("./_function-to-string"),
          r = "toString",
          u = ("" + o).split(r);
        (t("./_core").inspectSource = function (t) {
          return o.call(t);
        }),
          (e.exports = function (t, e, n, o) {
            var r = "function" == typeof n;
            r && (a(n, "name") || s(n, "name", e)),
              t[e] !== n &&
                (r &&
                  (a(n, c) || s(n, c, t[e] ? "" + t[e] : u.join(String(e)))),
                t === i
                  ? (t[e] = n)
                  : o
                  ? t[e]
                    ? (t[e] = n)
                    : s(t, e, n)
                  : (delete t[e], s(t, e, n)));
          })(Function.prototype, r, function () {
            return ("function" == typeof this && this[c]) || o.call(this);
          });
      },
      {
        "./_core": 16,
        "./_function-to-string": 29,
        "./_global": 30,
        "./_has": 31,
        "./_hide": 32,
        "./_uid": 91,
      },
    ],
    69: [
      function (t, e, n) {
        "use strict";
        var r = t("./_classof"),
          i = RegExp.prototype.exec;
        e.exports = function (t, e) {
          var n = t.exec;
          if ("function" == typeof n) {
            var o = n.call(t, e);
            if ("object" != typeof o)
              throw new TypeError(
                "RegExp exec method returned something other than an Object or null"
              );
            return o;
          }
          if ("RegExp" !== r(t))
            throw new TypeError("RegExp#exec called on incompatible receiver");
          return i.call(t, e);
        };
      },
      { "./_classof": 14 },
    ],
    70: [
      function (t, e, n) {
        "use strict";
        var o,
          r,
          s = t("./_flags"),
          a = RegExp.prototype.exec,
          c = String.prototype.replace,
          i = a,
          u = "lastIndex",
          l =
            ((o = /a/),
            (r = /b*/g),
            a.call(o, "a"),
            a.call(r, "a"),
            0 !== o[u] || 0 !== r[u]),
          d = void 0 !== /()??/.exec("")[1];
        (l || d) &&
          (i = function (t) {
            var e,
              n,
              o,
              r,
              i = this;
            return (
              d && (n = new RegExp("^" + i.source + "$(?!\\s)", s.call(i))),
              l && (e = i[u]),
              (o = a.call(i, t)),
              l && o && (i[u] = i.global ? o.index + o[0].length : e),
              d &&
                o &&
                1 < o.length &&
                c.call(o[0], n, function () {
                  for (r = 1; r < arguments.length - 2; r++)
                    void 0 === arguments[r] && (o[r] = void 0);
                }),
              o
            );
          }),
          (e.exports = i);
      },
      { "./_flags": 27 },
    ],
    71: [
      function (e, t, n) {
        function r(t, e) {
          if ((i(t), !o(e) && null !== e))
            throw TypeError(e + ": can't set as prototype!");
        }
        var o = e("./_is-object"),
          i = e("./_an-object");
        t.exports = {
          set:
            Object.setPrototypeOf ||
            ("__proto__" in {}
              ? (function (t, n, o) {
                  try {
                    (o = e("./_ctx")(
                      Function.call,
                      e("./_object-gopd").f(Object.prototype, "__proto__").set,
                      2
                    ))(t, []),
                      (n = !(t instanceof Array));
                  } catch (t) {
                    n = !0;
                  }
                  return function (t, e) {
                    return r(t, e), n ? (t.__proto__ = e) : o(t, e), t;
                  };
                })({}, !1)
              : void 0),
          check: r,
        };
      },
      {
        "./_an-object": 7,
        "./_ctx": 18,
        "./_is-object": 40,
        "./_object-gopd": 54,
      },
    ],
    72: [
      function (t, e, n) {
        "use strict";
        var o = t("./_global"),
          r = t("./_object-dp"),
          i = t("./_descriptors"),
          s = t("./_wks")("species");
        e.exports = function (t) {
          var e = o[t];
          i &&
            e &&
            !e[s] &&
            r.f(e, s, {
              configurable: !0,
              get: function () {
                return this;
              },
            });
        };
      },
      {
        "./_descriptors": 20,
        "./_global": 30,
        "./_object-dp": 52,
        "./_wks": 95,
      },
    ],
    73: [
      function (t, e, n) {
        var o = t("./_object-dp").f,
          r = t("./_has"),
          i = t("./_wks")("toStringTag");
        e.exports = function (t, e, n) {
          t &&
            !r((t = n ? t : t.prototype), i) &&
            o(t, i, { configurable: !0, value: e });
        };
      },
      { "./_has": 31, "./_object-dp": 52, "./_wks": 95 },
    ],
    74: [
      function (t, e, n) {
        var o = t("./_shared")("keys"),
          r = t("./_uid");
        e.exports = function (t) {
          return o[t] || (o[t] = r(t));
        };
      },
      { "./_shared": 75, "./_uid": 91 },
    ],
    75: [
      function (t, e, n) {
        var o = t("./_core"),
          r = t("./_global"),
          i = "__core-js_shared__",
          s = r[i] || (r[i] = {});
        (e.exports = function (t, e) {
          return s[t] || (s[t] = void 0 !== e ? e : {});
        })("versions", []).push({
          version: o.version,
          mode: t("./_library") ? "pure" : "global",
          copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
        });
      },
      { "./_core": 16, "./_global": 30, "./_library": 47 },
    ],
    76: [
      function (t, e, n) {
        var r = t("./_an-object"),
          i = t("./_a-function"),
          s = t("./_wks")("species");
        e.exports = function (t, e) {
          var n,
            o = r(t).constructor;
          return void 0 === o || null == (n = r(o)[s]) ? e : i(n);
        };
      },
      { "./_a-function": 3, "./_an-object": 7, "./_wks": 95 },
    ],
    77: [
      function (t, e, n) {
        var c = t("./_to-integer"),
          u = t("./_defined");
        e.exports = function (a) {
          return function (t, e) {
            var n,
              o,
              r = String(u(t)),
              i = c(e),
              s = r.length;
            return i < 0 || s <= i
              ? a
                ? ""
                : void 0
              : (n = r.charCodeAt(i)) < 55296 ||
                56319 < n ||
                i + 1 === s ||
                (o = r.charCodeAt(i + 1)) < 56320 ||
                57343 < o
              ? a
                ? r.charAt(i)
                : n
              : a
              ? r.slice(i, i + 2)
              : o - 56320 + ((n - 55296) << 10) + 65536;
          };
        };
      },
      { "./_defined": 19, "./_to-integer": 83 },
    ],
    78: [
      function (t, e, n) {
        function o(t, e, n) {
          var o = {},
            r = a(function () {
              return !!c[t]() || "​" != "​"[t]();
            }),
            i = (o[t] = r ? e(d) : c[t]);
          n && (o[n] = i), s(s.P + s.F * r, "String", o);
        }
        var s = t("./_export"),
          r = t("./_defined"),
          a = t("./_fails"),
          c = t("./_string-ws"),
          i = "[" + c + "]",
          u = RegExp("^" + i + i + "*"),
          l = RegExp(i + i + "*$"),
          d = (o.trim = function (t, e) {
            return (
              (t = String(r(t))),
              1 & e && (t = t.replace(u, "")),
              2 & e && (t = t.replace(l, "")),
              t
            );
          });
        e.exports = o;
      },
      { "./_defined": 19, "./_export": 24, "./_fails": 25, "./_string-ws": 79 },
    ],
    79: [
      function (t, e, n) {
        e.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";
      },
      {},
    ],
    80: [
      function (t, e, n) {
        function o() {
          var t = +this;
          if (g.hasOwnProperty(t)) {
            var e = g[t];
            delete g[t], e();
          }
        }
        function r(t) {
          o.call(t.data);
        }
        var i,
          s,
          a,
          c = t("./_ctx"),
          u = t("./_invoke"),
          l = t("./_html"),
          d = t("./_dom-create"),
          f = t("./_global"),
          p = f.process,
          h = f.setImmediate,
          v = f.clearImmediate,
          y = f.MessageChannel,
          m = f.Dispatch,
          _ = 0,
          g = {},
          b = "onreadystatechange";
        (h && v) ||
          ((h = function (t) {
            for (var e = [], n = 1; n < arguments.length; )
              e.push(arguments[n++]);
            return (
              (g[++_] = function () {
                u("function" == typeof t ? t : Function(t), e);
              }),
              i(_),
              _
            );
          }),
          (v = function (t) {
            delete g[t];
          }),
          "process" == t("./_cof")(p)
            ? (i = function (t) {
                p.nextTick(c(o, t, 1));
              })
            : m && m.now
            ? (i = function (t) {
                m.now(c(o, t, 1));
              })
            : y
            ? ((a = (s = new y()).port2),
              (s.port1.onmessage = r),
              (i = c(a.postMessage, a, 1)))
            : f.addEventListener &&
              "function" == typeof postMessage &&
              !f.importScripts
            ? ((i = function (t) {
                f.postMessage(t + "", "*");
              }),
              f.addEventListener("message", r, !1))
            : (i =
                b in d("script")
                  ? function (t) {
                      l.appendChild(d("script"))[b] = function () {
                        l.removeChild(this), o.call(t);
                      };
                    }
                  : function (t) {
                      setTimeout(c(o, t, 1), 0);
                    })),
          (e.exports = { set: h, clear: v });
      },
      {
        "./_cof": 15,
        "./_ctx": 18,
        "./_dom-create": 21,
        "./_global": 30,
        "./_html": 33,
        "./_invoke": 36,
      },
    ],
    81: [
      function (t, e, n) {
        var o = t("./_to-integer"),
          r = Math.max,
          i = Math.min;
        e.exports = function (t, e) {
          return (t = o(t)) < 0 ? r(t + e, 0) : i(t, e);
        };
      },
      { "./_to-integer": 83 },
    ],
    82: [
      function (t, e, n) {
        var o = t("./_to-integer"),
          r = t("./_to-length");
        e.exports = function (t) {
          if (void 0 === t) return 0;
          var e = o(t),
            n = r(e);
          if (e !== n) throw RangeError("Wrong length!");
          return n;
        };
      },
      { "./_to-integer": 83, "./_to-length": 85 },
    ],
    83: [
      function (t, e, n) {
        var o = Math.ceil,
          r = Math.floor;
        e.exports = function (t) {
          return isNaN((t = +t)) ? 0 : (0 < t ? r : o)(t);
        };
      },
      {},
    ],
    84: [
      function (t, e, n) {
        var o = t("./_iobject"),
          r = t("./_defined");
        e.exports = function (t) {
          return o(r(t));
        };
      },
      { "./_defined": 19, "./_iobject": 37 },
    ],
    85: [
      function (t, e, n) {
        var o = t("./_to-integer"),
          r = Math.min;
        e.exports = function (t) {
          return 0 < t ? r(o(t), 9007199254740991) : 0;
        };
      },
      { "./_to-integer": 83 },
    ],
    86: [
      function (t, e, n) {
        var o = t("./_defined");
        e.exports = function (t) {
          return Object(o(t));
        };
      },
      { "./_defined": 19 },
    ],
    87: [
      function (t, e, n) {
        var r = t("./_is-object");
        e.exports = function (t, e) {
          if (!r(t)) return t;
          var n, o;
          if (e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
            return o;
          if ("function" == typeof (n = t.valueOf) && !r((o = n.call(t))))
            return o;
          if (
            !e &&
            "function" == typeof (n = t.toString) &&
            !r((o = n.call(t)))
          )
            return o;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      { "./_is-object": 40 },
    ],
    88: [
      function (t, e, n) {
        "use strict";
        if (t("./_descriptors")) {
          var m = t("./_library"),
            _ = t("./_global"),
            g = t("./_fails"),
            b = t("./_export"),
            w = t("./_typed"),
            o = t("./_typed-buffer"),
            h = t("./_ctx"),
            x = t("./_an-instance"),
            r = t("./_property-desc"),
            D = t("./_hide"),
            i = t("./_redefine-all"),
            s = t("./_to-integer"),
            k = t("./_to-length"),
            E = t("./_to-index"),
            a = t("./_to-absolute-index"),
            c = t("./_to-primitive"),
            u = t("./_has"),
            B = t("./_classof"),
            j = t("./_is-object"),
            v = t("./_to-object"),
            y = t("./_is-array-iter"),
            K = t("./_object-create"),
            C = t("./_object-gpo"),
            S = t("./_object-gopn").f,
            O = t("./core.get-iterator-method"),
            l = t("./_uid"),
            d = t("./_wks"),
            f = t("./_array-methods"),
            p = t("./_array-includes"),
            T = t("./_species-constructor"),
            P = t("./es6.array.iterator"),
            M = t("./_iterators"),
            A = t("./_iter-detect"),
            L = t("./_set-species"),
            N = t("./_array-fill"),
            I = t("./_array-copy-within"),
            F = t("./_object-dp"),
            R = t("./_object-gopd"),
            U = F.f,
            z = R.f,
            H = _.RangeError,
            G = _.TypeError,
            V = _.Uint8Array,
            W = "ArrayBuffer",
            q = "Shared" + W,
            Y = "BYTES_PER_ELEMENT",
            X = "prototype",
            J = Array[X],
            $ = o.ArrayBuffer,
            Q = o.DataView,
            Z = f(0),
            tt = f(2),
            et = f(3),
            nt = f(4),
            ot = f(5),
            rt = f(6),
            it = p(!0),
            st = p(!1),
            at = P.values,
            ct = P.keys,
            ut = P.entries,
            lt = J.lastIndexOf,
            dt = J.reduce,
            ft = J.reduceRight,
            pt = J.join,
            ht = J.sort,
            vt = J.slice,
            yt = J.toString,
            mt = J.toLocaleString,
            _t = d("iterator"),
            gt = d("toStringTag"),
            bt = l("typed_constructor"),
            wt = l("def_constructor"),
            xt = w.CONSTR,
            Dt = w.TYPED,
            kt = w.VIEW,
            Et = "Wrong length!",
            Bt = f(1, function (t, e) {
              return Ot(T(t, t[wt]), e);
            }),
            jt = g(function () {
              return 1 === new V(new Uint16Array([1]).buffer)[0];
            }),
            Kt =
              !!V &&
              !!V[X].set &&
              g(function () {
                new V(1).set({});
              }),
            Ct = function (t, e) {
              var n = s(t);
              if (n < 0 || n % e) throw H("Wrong offset!");
              return n;
            },
            St = function (t) {
              if (j(t) && Dt in t) return t;
              throw G(t + " is not a typed array!");
            },
            Ot = function (t, e) {
              if (!(j(t) && bt in t))
                throw G("It is not a typed array constructor!");
              return new t(e);
            },
            Tt = function (t, e) {
              return Pt(T(t, t[wt]), e);
            },
            Pt = function (t, e) {
              for (var n = 0, o = e.length, r = Ot(t, o); n < o; )
                r[n] = e[n++];
              return r;
            },
            Mt = function (t, e, n) {
              U(t, e, {
                get: function () {
                  return this._d[n];
                },
              });
            },
            At = function (t, e, n) {
              var o,
                r,
                i,
                s,
                a,
                c,
                u = v(t),
                l = arguments.length,
                d = 1 < l ? e : void 0,
                f = void 0 !== d,
                p = O(u);
              if (null != p && !y(p)) {
                for (c = p.call(u), i = [], o = 0; !(a = c.next()).done; o++)
                  i.push(a.value);
                u = i;
              }
              for (
                f && 2 < l && (d = h(d, n, 2)),
                  o = 0,
                  r = k(u.length),
                  s = Ot(this, r);
                o < r;
                o++
              )
                s[o] = f ? d(u[o], o) : u[o];
              return s;
            },
            Lt = function () {
              for (var t = 0, e = arguments.length, n = Ot(this, e); t < e; )
                n[t] = arguments[t++];
              return n;
            },
            Nt =
              !!V &&
              g(function () {
                mt.call(new V(1));
              }),
            It = function () {
              return mt.apply(Nt ? vt.call(St(this)) : St(this), arguments);
            },
            Ft = {
              copyWithin: function (t, e, n) {
                return I.call(
                  St(this),
                  t,
                  e,
                  2 < arguments.length ? n : void 0
                );
              },
              every: function (t, e) {
                return nt(St(this), t, 1 < arguments.length ? e : void 0);
              },
              fill: function (t) {
                return N.apply(St(this), arguments);
              },
              filter: function (t, e) {
                return Tt(
                  this,
                  tt(St(this), t, 1 < arguments.length ? e : void 0)
                );
              },
              find: function (t, e) {
                return ot(St(this), t, 1 < arguments.length ? e : void 0);
              },
              findIndex: function (t, e) {
                return rt(St(this), t, 1 < arguments.length ? e : void 0);
              },
              forEach: function (t, e) {
                Z(St(this), t, 1 < arguments.length ? e : void 0);
              },
              indexOf: function (t, e) {
                return st(St(this), t, 1 < arguments.length ? e : void 0);
              },
              includes: function (t, e) {
                return it(St(this), t, 1 < arguments.length ? e : void 0);
              },
              join: function (t) {
                return pt.apply(St(this), arguments);
              },
              lastIndexOf: function (t) {
                return lt.apply(St(this), arguments);
              },
              map: function (t, e) {
                return Bt(St(this), t, 1 < arguments.length ? e : void 0);
              },
              reduce: function (t) {
                return dt.apply(St(this), arguments);
              },
              reduceRight: function (t) {
                return ft.apply(St(this), arguments);
              },
              reverse: function () {
                for (
                  var t,
                    e = this,
                    n = St(e).length,
                    o = Math.floor(n / 2),
                    r = 0;
                  r < o;

                )
                  (t = e[r]), (e[r++] = e[--n]), (e[n] = t);
                return e;
              },
              some: function (t, e) {
                return et(St(this), t, 1 < arguments.length ? e : void 0);
              },
              sort: function (t) {
                return ht.call(St(this), t);
              },
              subarray: function (t, e) {
                var n = St(this),
                  o = n.length,
                  r = a(t, o);
                return new (T(n, n[wt]))(
                  n.buffer,
                  n.byteOffset + r * n.BYTES_PER_ELEMENT,
                  k((void 0 === e ? o : a(e, o)) - r)
                );
              },
            },
            Rt = function (t, e) {
              return Tt(this, vt.call(St(this), t, e));
            },
            Ut = function (t, e) {
              St(this);
              var n = Ct(e, 1),
                o = this.length,
                r = v(t),
                i = k(r.length),
                s = 0;
              if (o < i + n) throw H(Et);
              for (; s < i; ) this[n + s] = r[s++];
            },
            zt = {
              entries: function () {
                return ut.call(St(this));
              },
              keys: function () {
                return ct.call(St(this));
              },
              values: function () {
                return at.call(St(this));
              },
            },
            Ht = function (t, e) {
              return (
                j(t) &&
                t[Dt] &&
                "symbol" != typeof e &&
                e in t &&
                String(+e) == String(e)
              );
            },
            Gt = function (t, e) {
              return Ht(t, (e = c(e, !0))) ? r(2, t[e]) : z(t, e);
            },
            Vt = function (t, e, n) {
              return !(Ht(t, (e = c(e, !0))) && j(n) && u(n, "value")) ||
                u(n, "get") ||
                u(n, "set") ||
                n.configurable ||
                (u(n, "writable") && !n.writable) ||
                (u(n, "enumerable") && !n.enumerable)
                ? U(t, e, n)
                : ((t[e] = n.value), t);
            };
          xt || ((R.f = Gt), (F.f = Vt)),
            b(b.S + b.F * !xt, "Object", {
              getOwnPropertyDescriptor: Gt,
              defineProperty: Vt,
            }),
            g(function () {
              yt.call({});
            }) &&
              (yt = mt =
                function () {
                  return pt.call(this);
                });
          var Wt = i({}, Ft);
          i(Wt, zt),
            D(Wt, _t, zt.values),
            i(Wt, {
              slice: Rt,
              set: Ut,
              constructor: function () {},
              toString: yt,
              toLocaleString: It,
            }),
            Mt(Wt, "buffer", "b"),
            Mt(Wt, "byteOffset", "o"),
            Mt(Wt, "byteLength", "l"),
            Mt(Wt, "length", "e"),
            U(Wt, gt, {
              get: function () {
                return this[Dt];
              },
            }),
            (e.exports = function (t, d, e, i) {
              function f(t, r) {
                U(t, r, {
                  get: function () {
                    return (t = r), (e = this._d).v[n](t * d + e.o, jt);
                    var t, e;
                  },
                  set: function (t) {
                    return (
                      (e = r),
                      (n = t),
                      (o = this._d),
                      i &&
                        (n =
                          (n = Math.round(n)) < 0
                            ? 0
                            : 255 < n
                            ? 255
                            : 255 & n),
                      void o.v[s](e * d + o.o, n, jt)
                    );
                    var e, n, o;
                  },
                  enumerable: !0,
                });
              }
              var p = t + ((i = !!i) ? "Clamped" : "") + "Array",
                n = "get" + t,
                s = "set" + t,
                h = _[p],
                a = h || {},
                o = h && C(h),
                r = !h || !w.ABV,
                c = {},
                u = h && h[X];
              r
                ? ((h = e(function (t, e, n, o) {
                    x(t, h, p, "_d");
                    var r,
                      i,
                      s,
                      a,
                      c = 0,
                      u = 0;
                    if (j(e)) {
                      if (!(e instanceof $ || (a = B(e)) == W || a == q))
                        return Dt in e ? Pt(h, e) : At.call(h, e);
                      (r = e), (u = Ct(n, d));
                      var l = e.byteLength;
                      if (void 0 === o) {
                        if (l % d) throw H(Et);
                        if ((i = l - u) < 0) throw H(Et);
                      } else if (l < (i = k(o) * d) + u) throw H(Et);
                      s = i / d;
                    } else (s = E(e)), (r = new $((i = s * d)));
                    for (
                      D(t, "_d", { b: r, o: u, l: i, e: s, v: new Q(r) });
                      c < s;

                    )
                      f(t, c++);
                  })),
                  (u = h[X] = K(Wt)),
                  D(u, "constructor", h))
                : (g(function () {
                    h(1);
                  }) &&
                    g(function () {
                      new h(-1);
                    }) &&
                    A(function (t) {
                      new h(), new h(null), new h(1.5), new h(t);
                    }, !0)) ||
                  ((h = e(function (t, e, n, o) {
                    var r;
                    return (
                      x(t, h, p),
                      j(e)
                        ? e instanceof $ || (r = B(e)) == W || r == q
                          ? void 0 !== o
                            ? new a(e, Ct(n, d), o)
                            : void 0 !== n
                            ? new a(e, Ct(n, d))
                            : new a(e)
                          : Dt in e
                          ? Pt(h, e)
                          : At.call(h, e)
                        : new a(E(e))
                    );
                  })),
                  Z(
                    o !== Function.prototype ? S(a).concat(S(o)) : S(a),
                    function (t) {
                      t in h || D(h, t, a[t]);
                    }
                  ),
                  (h[X] = u),
                  m || (u.constructor = h));
              var l = u[_t],
                v = !!l && ("values" == l.name || null == l.name),
                y = zt.values;
              D(h, bt, !0),
                D(u, Dt, p),
                D(u, kt, !0),
                D(u, wt, h),
                (i ? new h(1)[gt] == p : gt in u) ||
                  U(u, gt, {
                    get: function () {
                      return p;
                    },
                  }),
                (c[p] = h),
                b(b.G + b.W + b.F * (h != a), c),
                b(b.S, p, { BYTES_PER_ELEMENT: d }),
                b(
                  b.S +
                    b.F *
                      g(function () {
                        a.of.call(h, 1);
                      }),
                  p,
                  { from: At, of: Lt }
                ),
                Y in u || D(u, Y, d),
                b(b.P, p, Ft),
                L(p),
                b(b.P + b.F * Kt, p, { set: Ut }),
                b(b.P + b.F * !v, p, zt),
                m || u.toString == yt || (u.toString = yt),
                b(
                  b.P +
                    b.F *
                      g(function () {
                        new h(1).slice();
                      }),
                  p,
                  { slice: Rt }
                ),
                b(
                  b.P +
                    b.F *
                      (g(function () {
                        return (
                          [1, 2].toLocaleString() !=
                          new h([1, 2]).toLocaleString()
                        );
                      }) ||
                        !g(function () {
                          u.toLocaleString.call([1, 2]);
                        })),
                  p,
                  { toLocaleString: It }
                ),
                (M[p] = v ? l : y),
                m || v || D(u, _t, y);
            });
        } else e.exports = function () {};
      },
      {
        "./_an-instance": 6,
        "./_array-copy-within": 8,
        "./_array-fill": 9,
        "./_array-includes": 10,
        "./_array-methods": 11,
        "./_classof": 14,
        "./_ctx": 18,
        "./_descriptors": 20,
        "./_export": 24,
        "./_fails": 25,
        "./_global": 30,
        "./_has": 31,
        "./_hide": 32,
        "./_is-array-iter": 38,
        "./_is-object": 40,
        "./_iter-detect": 44,
        "./_iterators": 46,
        "./_library": 47,
        "./_object-create": 51,
        "./_object-dp": 52,
        "./_object-gopd": 54,
        "./_object-gopn": 56,
        "./_object-gpo": 58,
        "./_property-desc": 66,
        "./_redefine-all": 67,
        "./_set-species": 72,
        "./_species-constructor": 76,
        "./_to-absolute-index": 81,
        "./_to-index": 82,
        "./_to-integer": 83,
        "./_to-length": 85,
        "./_to-object": 86,
        "./_to-primitive": 87,
        "./_typed": 90,
        "./_typed-buffer": 89,
        "./_uid": 91,
        "./_wks": 95,
        "./core.get-iterator-method": 96,
        "./es6.array.iterator": 99,
      },
    ],
    89: [
      function (t, e, n) {
        "use strict";
        var o = t("./_global"),
          r = t("./_descriptors"),
          i = t("./_library"),
          s = t("./_typed"),
          a = t("./_hide"),
          c = t("./_redefine-all"),
          u = t("./_fails"),
          l = t("./_an-instance"),
          d = t("./_to-integer"),
          f = t("./_to-length"),
          p = t("./_to-index"),
          h = t("./_object-gopn").f,
          v = t("./_object-dp").f,
          y = t("./_array-fill"),
          m = t("./_set-to-string-tag"),
          _ = "ArrayBuffer",
          g = "DataView",
          b = "prototype",
          w = "Wrong index!",
          x = o[_],
          D = o[g],
          k = o.Math,
          E = o.RangeError,
          B = o.Infinity,
          j = x,
          K = k.abs,
          C = k.pow,
          S = k.floor,
          O = k.log,
          T = k.LN2,
          P = "byteLength",
          M = "byteOffset",
          A = r ? "_b" : "buffer",
          L = r ? "_l" : P,
          N = r ? "_o" : M;
        function I(t, e, n) {
          var o,
            r,
            i,
            s = new Array(n),
            a = 8 * n - e - 1,
            c = (1 << a) - 1,
            u = c >> 1,
            l = 23 === e ? C(2, -24) - C(2, -77) : 0,
            d = 0,
            f = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            (t = K(t)) != t || t === B
              ? ((r = t != t ? 1 : 0), (o = c))
              : ((o = S(O(t) / T)),
                t * (i = C(2, -o)) < 1 && (o--, (i *= 2)),
                2 <= (t += 1 <= o + u ? l / i : l * C(2, 1 - u)) * i &&
                  (o++, (i /= 2)),
                c <= o + u
                  ? ((r = 0), (o = c))
                  : 1 <= o + u
                  ? ((r = (t * i - 1) * C(2, e)), (o += u))
                  : ((r = t * C(2, u - 1) * C(2, e)), (o = 0)));
            8 <= e;
            s[d++] = 255 & r, r /= 256, e -= 8
          );
          for (
            o = (o << e) | r, a += e;
            0 < a;
            s[d++] = 255 & o, o /= 256, a -= 8
          );
          return (s[--d] |= 128 * f), s;
        }
        function F(t, e, n) {
          var o,
            r = 8 * n - e - 1,
            i = (1 << r) - 1,
            s = i >> 1,
            a = r - 7,
            c = n - 1,
            u = t[c--],
            l = 127 & u;
          for (u >>= 7; 0 < a; l = 256 * l + t[c], c--, a -= 8);
          for (
            o = l & ((1 << -a) - 1), l >>= -a, a += e;
            0 < a;
            o = 256 * o + t[c], c--, a -= 8
          );
          if (0 === l) l = 1 - s;
          else {
            if (l === i) return o ? NaN : u ? -B : B;
            (o += C(2, e)), (l -= s);
          }
          return (u ? -1 : 1) * o * C(2, l - e);
        }
        function R(t) {
          return (t[3] << 24) | (t[2] << 16) | (t[1] << 8) | t[0];
        }
        function U(t) {
          return [255 & t];
        }
        function z(t) {
          return [255 & t, (t >> 8) & 255];
        }
        function H(t) {
          return [255 & t, (t >> 8) & 255, (t >> 16) & 255, (t >> 24) & 255];
        }
        function G(t) {
          return I(t, 52, 8);
        }
        function V(t) {
          return I(t, 23, 4);
        }
        function W(t, e, n) {
          v(t[b], e, {
            get: function () {
              return this[n];
            },
          });
        }
        function q(t, e, n, o) {
          var r = p(+n);
          if (r + e > t[L]) throw E(w);
          var i = t[A]._b,
            s = r + t[N],
            a = i.slice(s, s + e);
          return o ? a : a.reverse();
        }
        function Y(t, e, n, o, r, i) {
          var s = p(+n);
          if (s + e > t[L]) throw E(w);
          for (var a = t[A]._b, c = s + t[N], u = o(+r), l = 0; l < e; l++)
            a[c + l] = u[i ? l : e - l - 1];
        }
        if (s.ABV) {
          if (
            !u(function () {
              x(1);
            }) ||
            !u(function () {
              new x(-1);
            }) ||
            u(function () {
              return new x(), new x(1.5), new x(NaN), x.name != _;
            })
          ) {
            for (
              var X,
                J = ((x = function (t) {
                  return l(this, x), new j(p(t));
                })[b] = j[b]),
                $ = h(j),
                Q = 0;
              $.length > Q;

            )
              (X = $[Q++]) in x || a(x, X, j[X]);
            i || (J.constructor = x);
          }
          var Z = new D(new x(2)),
            tt = D[b].setInt8;
          Z.setInt8(0, 2147483648),
            Z.setInt8(1, 2147483649),
            (!Z.getInt8(0) && Z.getInt8(1)) ||
              c(
                D[b],
                {
                  setInt8: function (t, e) {
                    tt.call(this, t, (e << 24) >> 24);
                  },
                  setUint8: function (t, e) {
                    tt.call(this, t, (e << 24) >> 24);
                  },
                },
                !0
              );
        } else
          (x = function (t) {
            l(this, x, _);
            var e = p(t);
            (this._b = y.call(new Array(e), 0)), (this[L] = e);
          }),
            (D = function (t, e, n) {
              l(this, D, g), l(t, x, g);
              var o = t[L],
                r = d(e);
              if (r < 0 || o < r) throw E("Wrong offset!");
              if (o < r + (n = void 0 === n ? o - r : f(n)))
                throw E("Wrong length!");
              (this[A] = t), (this[N] = r), (this[L] = n);
            }),
            r &&
              (W(x, P, "_l"),
              W(D, "buffer", "_b"),
              W(D, P, "_l"),
              W(D, M, "_o")),
            c(D[b], {
              getInt8: function (t) {
                return (q(this, 1, t)[0] << 24) >> 24;
              },
              getUint8: function (t) {
                return q(this, 1, t)[0];
              },
              getInt16: function (t, e) {
                var n = q(this, 2, t, e);
                return (((n[1] << 8) | n[0]) << 16) >> 16;
              },
              getUint16: function (t, e) {
                var n = q(this, 2, t, e);
                return (n[1] << 8) | n[0];
              },
              getInt32: function (t, e) {
                return R(q(this, 4, t, e));
              },
              getUint32: function (t, e) {
                return R(q(this, 4, t, e)) >>> 0;
              },
              getFloat32: function (t, e) {
                return F(q(this, 4, t, e), 23, 4);
              },
              getFloat64: function (t, e) {
                return F(q(this, 8, t, e), 52, 8);
              },
              setInt8: function (t, e) {
                Y(this, 1, t, U, e);
              },
              setUint8: function (t, e) {
                Y(this, 1, t, U, e);
              },
              setInt16: function (t, e, n) {
                Y(this, 2, t, z, e, n);
              },
              setUint16: function (t, e, n) {
                Y(this, 2, t, z, e, n);
              },
              setInt32: function (t, e, n) {
                Y(this, 4, t, H, e, n);
              },
              setUint32: function (t, e, n) {
                Y(this, 4, t, H, e, n);
              },
              setFloat32: function (t, e, n) {
                Y(this, 4, t, V, e, n);
              },
              setFloat64: function (t, e, n) {
                Y(this, 8, t, G, e, n);
              },
            });
        m(x, _), m(D, g), a(D[b], s.VIEW, !0), (n[_] = x), (n[g] = D);
      },
      {
        "./_an-instance": 6,
        "./_array-fill": 9,
        "./_descriptors": 20,
        "./_fails": 25,
        "./_global": 30,
        "./_hide": 32,
        "./_library": 47,
        "./_object-dp": 52,
        "./_object-gopn": 56,
        "./_redefine-all": 67,
        "./_set-to-string-tag": 73,
        "./_to-index": 82,
        "./_to-integer": 83,
        "./_to-length": 85,
        "./_typed": 90,
      },
    ],
    90: [
      function (t, e, n) {
        for (
          var o,
            r = t("./_global"),
            i = t("./_hide"),
            s = t("./_uid"),
            a = s("typed_array"),
            c = s("view"),
            u = !(!r.ArrayBuffer || !r.DataView),
            l = u,
            d = 0,
            f =
              "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(
                ","
              );
          d < 9;

        )
          (o = r[f[d++]])
            ? (i(o.prototype, a, !0), i(o.prototype, c, !0))
            : (l = !1);
        e.exports = { ABV: u, CONSTR: l, TYPED: a, VIEW: c };
      },
      { "./_global": 30, "./_hide": 32, "./_uid": 91 },
    ],
    91: [
      function (t, e, n) {
        var o = 0,
          r = Math.random();
        e.exports = function (t) {
          return "Symbol(".concat(
            void 0 === t ? "" : t,
            ")_",
            (++o + r).toString(36)
          );
        };
      },
      {},
    ],
    92: [
      function (t, e, n) {
        var o = t("./_global").navigator;
        e.exports = (o && o.userAgent) || "";
      },
      { "./_global": 30 },
    ],
    93: [
      function (t, e, n) {
        var o = t("./_global"),
          r = t("./_core"),
          i = t("./_library"),
          s = t("./_wks-ext"),
          a = t("./_object-dp").f;
        e.exports = function (t) {
          var e = r.Symbol || (r.Symbol = (!i && o.Symbol) || {});
          "_" == t.charAt(0) || t in e || a(e, t, { value: s.f(t) });
        };
      },
      {
        "./_core": 16,
        "./_global": 30,
        "./_library": 47,
        "./_object-dp": 52,
        "./_wks-ext": 94,
      },
    ],
    94: [
      function (t, e, n) {
        n.f = t("./_wks");
      },
      { "./_wks": 95 },
    ],
    95: [
      function (t, e, n) {
        var o = t("./_shared")("wks"),
          r = t("./_uid"),
          i = t("./_global").Symbol,
          s = "function" == typeof i;
        (e.exports = function (t) {
          return o[t] || (o[t] = (s && i[t]) || (s ? i : r)("Symbol." + t));
        }).store = o;
      },
      { "./_global": 30, "./_shared": 75, "./_uid": 91 },
    ],
    96: [
      function (t, e, n) {
        var o = t("./_classof"),
          r = t("./_wks")("iterator"),
          i = t("./_iterators");
        e.exports = t("./_core").getIteratorMethod = function (t) {
          if (null != t) return t[r] || t["@@iterator"] || i[o(t)];
        };
      },
      { "./_classof": 14, "./_core": 16, "./_iterators": 46, "./_wks": 95 },
    ],
    97: [
      function (t, e, n) {
        var o = t("./_export");
        o(o.P, "Array", { fill: t("./_array-fill") }),
          t("./_add-to-unscopables")("fill");
      },
      { "./_add-to-unscopables": 4, "./_array-fill": 9, "./_export": 24 },
    ],
    98: [
      function (t, e, n) {
        "use strict";
        var h = t("./_ctx"),
          o = t("./_export"),
          v = t("./_to-object"),
          y = t("./_iter-call"),
          m = t("./_is-array-iter"),
          _ = t("./_to-length"),
          g = t("./_create-property"),
          b = t("./core.get-iterator-method");
        o(
          o.S +
            o.F *
              !t("./_iter-detect")(function (t) {
                Array.from(t);
              }),
          "Array",
          {
            from: function (t, e, n) {
              var o,
                r,
                i,
                s,
                a = v(t),
                c = "function" == typeof this ? this : Array,
                u = arguments.length,
                l = 1 < u ? e : void 0,
                d = void 0 !== l,
                f = 0,
                p = b(a);
              if (
                (d && (l = h(l, 2 < u ? n : void 0, 2)),
                null == p || (c == Array && m(p)))
              )
                for (r = new c((o = _(a.length))); f < o; f++)
                  g(r, f, d ? l(a[f], f) : a[f]);
              else
                for (s = p.call(a), r = new c(); !(i = s.next()).done; f++)
                  g(r, f, d ? y(s, l, [i.value, f], !0) : i.value);
              return (r.length = f), r;
            },
          }
        );
      },
      {
        "./_create-property": 17,
        "./_ctx": 18,
        "./_export": 24,
        "./_is-array-iter": 38,
        "./_iter-call": 41,
        "./_iter-detect": 44,
        "./_to-length": 85,
        "./_to-object": 86,
        "./core.get-iterator-method": 96,
      },
    ],
    99: [
      function (t, e, n) {
        "use strict";
        var o = t("./_add-to-unscopables"),
          r = t("./_iter-step"),
          i = t("./_iterators"),
          s = t("./_to-iobject");
        (e.exports = t("./_iter-define")(
          Array,
          "Array",
          function (t, e) {
            (this._t = s(t)), (this._i = 0), (this._k = e);
          },
          function () {
            var t = this._t,
              e = this._k,
              n = this._i++;
            return !t || n >= t.length
              ? ((this._t = void 0), r(1))
              : r(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);
          },
          "values"
        )),
          (i.Arguments = i.Array),
          o("keys"),
          o("values"),
          o("entries");
      },
      {
        "./_add-to-unscopables": 4,
        "./_iter-define": 43,
        "./_iter-step": 45,
        "./_iterators": 46,
        "./_to-iobject": 84,
      },
    ],
    100: [
      function (t, e, n) {
        var o = t("./_object-dp").f,
          r = Function.prototype,
          i = /^\s*function ([^ (]*)/;
        "name" in r ||
          (t("./_descriptors") &&
            o(r, "name", {
              configurable: !0,
              get: function () {
                try {
                  return ("" + this).match(i)[1];
                } catch (t) {
                  return "";
                }
              },
            }));
      },
      { "./_descriptors": 20, "./_object-dp": 52 },
    ],
    101: [
      function (t, e, n) {
        "use strict";
        function o(t) {
          var e = l(t, !1);
          if ("string" == typeof e && 2 < e.length) {
            var n,
              o,
              r,
              i = (e = g ? e.trim() : p(e, 3)).charCodeAt(0);
            if (43 === i || 45 === i) {
              if (88 === (n = e.charCodeAt(2)) || 120 === n) return NaN;
            } else if (48 === i) {
              switch (e.charCodeAt(1)) {
                case 66:
                case 98:
                  (o = 2), (r = 49);
                  break;
                case 79:
                case 111:
                  (o = 8), (r = 55);
                  break;
                default:
                  return +e;
              }
              for (var s, a = e.slice(2), c = 0, u = a.length; c < u; c++)
                if ((s = a.charCodeAt(c)) < 48 || r < s) return NaN;
              return parseInt(a, o);
            }
          }
          return +e;
        }
        var r = t("./_global"),
          i = t("./_has"),
          s = t("./_cof"),
          a = t("./_inherit-if-required"),
          l = t("./_to-primitive"),
          c = t("./_fails"),
          u = t("./_object-gopn").f,
          d = t("./_object-gopd").f,
          f = t("./_object-dp").f,
          p = t("./_string-trim").trim,
          h = "Number",
          v = r[h],
          y = v,
          m = v.prototype,
          _ = s(t("./_object-create")(m)) == h,
          g = "trim" in String.prototype;
        if (!v(" 0o1") || !v("0b1") || v("+0x1")) {
          v = function (t) {
            var e = arguments.length < 1 ? 0 : t,
              n = this;
            return n instanceof v &&
              (_
                ? c(function () {
                    m.valueOf.call(n);
                  })
                : s(n) != h)
              ? a(new y(o(e)), n, v)
              : o(e);
          };
          for (
            var b,
              w = t("./_descriptors")
                ? u(y)
                : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(
                    ","
                  ),
              x = 0;
            w.length > x;
            x++
          )
            i(y, (b = w[x])) && !i(v, b) && f(v, b, d(y, b));
          ((v.prototype = m).constructor = v), t("./_redefine")(r, h, v);
        }
      },
      {
        "./_cof": 15,
        "./_descriptors": 20,
        "./_fails": 25,
        "./_global": 30,
        "./_has": 31,
        "./_inherit-if-required": 35,
        "./_object-create": 51,
        "./_object-dp": 52,
        "./_object-gopd": 54,
        "./_object-gopn": 56,
        "./_redefine": 68,
        "./_string-trim": 78,
        "./_to-primitive": 87,
      },
    ],
    102: [
      function (t, e, n) {
        var o = t("./_export"),
          r = t("./_parse-int");
        o(o.S + o.F * (Number.parseInt != r), "Number", { parseInt: r });
      },
      { "./_export": 24, "./_parse-int": 63 },
    ],
    103: [
      function (t, e, n) {
        var o = t("./_to-object"),
          r = t("./_object-keys");
        t("./_object-sap")("keys", function () {
          return function (t) {
            return r(o(t));
          };
        });
      },
      { "./_object-keys": 60, "./_object-sap": 62, "./_to-object": 86 },
    ],
    104: [
      function (t, e, n) {
        "use strict";
        var o = t("./_classof"),
          r = {};
        (r[t("./_wks")("toStringTag")] = "z"),
          r + "" != "[object z]" &&
            t("./_redefine")(
              Object.prototype,
              "toString",
              function () {
                return "[object " + o(this) + "]";
              },
              !0
            );
      },
      { "./_classof": 14, "./_redefine": 68, "./_wks": 95 },
    ],
    105: [
      function (n, t, e) {
        "use strict";
        function o() {}
        function d(t) {
          var e;
          return !(!y(t) || "function" != typeof (e = t.then)) && e;
        }
        function r(l, n) {
          if (!l._n) {
            l._n = !0;
            var o = l._c;
            x(function () {
              for (
                var c = l._v,
                  u = 1 == l._s,
                  t = 0,
                  e = function (t) {
                    var e,
                      n,
                      o,
                      r = u ? t.ok : t.fail,
                      i = t.resolve,
                      s = t.reject,
                      a = t.domain;
                    try {
                      r
                        ? (u || (2 == l._h && I(l), (l._h = 1)),
                          !0 === r
                            ? (e = c)
                            : (a && a.enter(),
                              (e = r(c)),
                              a && (a.exit(), (o = !0))),
                          e === t.promise
                            ? s(K("Promise-chain cycle"))
                            : (n = d(e))
                            ? n.call(e, i, s)
                            : i(e))
                        : s(c);
                    } catch (t) {
                      a && !o && a.exit(), s(t);
                    }
                  };
                o.length > t;

              )
                e(o[t++]);
              (l._c = []), (l._n = !1), n && !l._h && L(l);
            });
          }
        }
        function i(t) {
          var e = this;
          e._d ||
            ((e._d = !0),
            ((e = e._w || e)._v = t),
            (e._s = 2),
            e._a || (e._a = e._c.slice()),
            r(e, !0));
        }
        var s,
          a,
          c,
          u,
          l = n("./_library"),
          f = n("./_global"),
          p = n("./_ctx"),
          h = n("./_classof"),
          v = n("./_export"),
          y = n("./_is-object"),
          m = n("./_a-function"),
          _ = n("./_an-instance"),
          g = n("./_for-of"),
          b = n("./_species-constructor"),
          w = n("./_task").set,
          x = n("./_microtask")(),
          D = n("./_new-promise-capability"),
          k = n("./_perform"),
          E = n("./_user-agent"),
          B = n("./_promise-resolve"),
          j = "Promise",
          K = f.TypeError,
          C = f.process,
          S = C && C.versions,
          O = (S && S.v8) || "",
          T = f[j],
          P = "process" == h(C),
          M = (a = D.f),
          A = !!(function () {
            try {
              var t = T.resolve(1),
                e = ((t.constructor = {})[n("./_wks")("species")] = function (
                  t
                ) {
                  t(o, o);
                });
              return (
                (P || "function" == typeof PromiseRejectionEvent) &&
                t.then(o) instanceof e &&
                0 !== O.indexOf("6.6") &&
                -1 === E.indexOf("Chrome/66")
              );
            } catch (t) {}
          })(),
          L = function (i) {
            w.call(f, function () {
              var t,
                e,
                n,
                o = i._v,
                r = N(i);
              if (
                (r &&
                  ((t = k(function () {
                    P
                      ? C.emit("unhandledRejection", o, i)
                      : (e = f.onunhandledrejection)
                      ? e({ promise: i, reason: o })
                      : (n = f.console) &&
                        n.error &&
                        n.error("Unhandled promise rejection", o);
                  })),
                  (i._h = P || N(i) ? 2 : 1)),
                (i._a = void 0),
                r && t.e)
              )
                throw t.v;
            });
          },
          N = function (t) {
            return 1 !== t._h && 0 === (t._a || t._c).length;
          },
          I = function (e) {
            w.call(f, function () {
              var t;
              P
                ? C.emit("rejectionHandled", e)
                : (t = f.onrejectionhandled) && t({ promise: e, reason: e._v });
            });
          },
          F = function (t) {
            var n,
              o = this;
            if (!o._d) {
              (o._d = !0), (o = o._w || o);
              try {
                if (o === t) throw K("Promise can't be resolved itself");
                (n = d(t))
                  ? x(function () {
                      var e = { _w: o, _d: !1 };
                      try {
                        n.call(t, p(F, e, 1), p(i, e, 1));
                      } catch (t) {
                        i.call(e, t);
                      }
                    })
                  : ((o._v = t), (o._s = 1), r(o, !1));
              } catch (t) {
                i.call({ _w: o, _d: !1 }, t);
              }
            }
          };
        A ||
          ((T = function (t) {
            _(this, T, j, "_h"), m(t), s.call(this);
            try {
              t(p(F, this, 1), p(i, this, 1));
            } catch (t) {
              i.call(this, t);
            }
          }),
          ((s = function () {
            (this._c = []),
              (this._a = void 0),
              (this._s = 0),
              (this._d = !1),
              (this._v = void 0),
              (this._h = 0),
              (this._n = !1);
          }).prototype = n("./_redefine-all")(T.prototype, {
            then: function (t, e) {
              var n = M(b(this, T));
              return (
                (n.ok = "function" != typeof t || t),
                (n.fail = "function" == typeof e && e),
                (n.domain = P ? C.domain : void 0),
                this._c.push(n),
                this._a && this._a.push(n),
                this._s && r(this, !1),
                n.promise
              );
            },
            catch: function (t) {
              return this.then(void 0, t);
            },
          })),
          (c = function () {
            var t = new s();
            (this.promise = t),
              (this.resolve = p(F, t, 1)),
              (this.reject = p(i, t, 1));
          }),
          (D.f = M =
            function (t) {
              return t === T || t === u ? new c() : a(t);
            })),
          v(v.G + v.W + v.F * !A, { Promise: T }),
          n("./_set-to-string-tag")(T, j),
          n("./_set-species")(j),
          (u = n("./_core")[j]),
          v(v.S + v.F * !A, j, {
            reject: function (t) {
              var e = M(this);
              return (0, e.reject)(t), e.promise;
            },
          }),
          v(v.S + v.F * (l || !A), j, {
            resolve: function (t) {
              return B(l && this === u ? T : this, t);
            },
          }),
          v(
            v.S +
              v.F *
                !(
                  A &&
                  n("./_iter-detect")(function (t) {
                    T.all(t).catch(o);
                  })
                ),
            j,
            {
              all: function (t) {
                var s = this,
                  e = M(s),
                  a = e.resolve,
                  c = e.reject,
                  n = k(function () {
                    var o = [],
                      r = 0,
                      i = 1;
                    g(t, !1, function (t) {
                      var e = r++,
                        n = !1;
                      o.push(void 0),
                        i++,
                        s.resolve(t).then(function (t) {
                          n || ((n = !0), (o[e] = t), --i || a(o));
                        }, c);
                    }),
                      --i || a(o);
                  });
                return n.e && c(n.v), e.promise;
              },
              race: function (t) {
                var e = this,
                  n = M(e),
                  o = n.reject,
                  r = k(function () {
                    g(t, !1, function (t) {
                      e.resolve(t).then(n.resolve, o);
                    });
                  });
                return r.e && o(r.v), n.promise;
              },
            }
          );
      },
      {
        "./_a-function": 3,
        "./_an-instance": 6,
        "./_classof": 14,
        "./_core": 16,
        "./_ctx": 18,
        "./_export": 24,
        "./_for-of": 28,
        "./_global": 30,
        "./_is-object": 40,
        "./_iter-detect": 44,
        "./_library": 47,
        "./_microtask": 49,
        "./_new-promise-capability": 50,
        "./_perform": 64,
        "./_promise-resolve": 65,
        "./_redefine-all": 67,
        "./_set-species": 72,
        "./_set-to-string-tag": 73,
        "./_species-constructor": 76,
        "./_task": 80,
        "./_user-agent": 92,
        "./_wks": 95,
      },
    ],
    106: [
      function (t, e, n) {
        "use strict";
        var o = t("./_regexp-exec");
        t("./_export")(
          { target: "RegExp", proto: !0, forced: o !== /./.exec },
          { exec: o }
        );
      },
      { "./_export": 24, "./_regexp-exec": 70 },
    ],
    107: [
      function (t, e, n) {
        t("./_descriptors") &&
          "g" != /./g.flags &&
          t("./_object-dp").f(RegExp.prototype, "flags", {
            configurable: !0,
            get: t("./_flags"),
          });
      },
      { "./_descriptors": 20, "./_flags": 27, "./_object-dp": 52 },
    ],
    108: [
      function (t, e, n) {
        "use strict";
        var d = t("./_an-object"),
          f = t("./_to-length"),
          p = t("./_advance-string-index"),
          h = t("./_regexp-exec-abstract");
        t("./_fix-re-wks")("match", 1, function (o, r, u, l) {
          return [
            function (t) {
              var e = o(this),
                n = null == t ? void 0 : t[r];
              return void 0 !== n ? n.call(t, e) : new RegExp(t)[r](String(e));
            },
            function (t) {
              var e = l(u, t, this);
              if (e.done) return e.value;
              var n = d(t),
                o = String(this);
              if (!n.global) return h(n, o);
              for (
                var r, i = n.unicode, s = [], a = (n.lastIndex = 0);
                null !== (r = h(n, o));

              ) {
                var c = String(r[0]);
                "" === (s[a] = c) && (n.lastIndex = p(o, f(n.lastIndex), i)),
                  a++;
              }
              return 0 === a ? null : s;
            },
          ];
        });
      },
      {
        "./_advance-string-index": 5,
        "./_an-object": 7,
        "./_fix-re-wks": 26,
        "./_regexp-exec-abstract": 69,
        "./_to-length": 85,
      },
    ],
    109: [
      function (e, t, n) {
        "use strict";
        e("./es6.regexp.flags");
        function o(t) {
          e("./_redefine")(RegExp.prototype, a, t, !0);
        }
        var r = e("./_an-object"),
          i = e("./_flags"),
          s = e("./_descriptors"),
          a = "toString",
          c = /./[a];
        e("./_fails")(function () {
          return "/a/b" != c.call({ source: "a", flags: "b" });
        })
          ? o(function () {
              var t = r(this);
              return "/".concat(
                t.source,
                "/",
                "flags" in t
                  ? t.flags
                  : !s && t instanceof RegExp
                  ? i.call(t)
                  : void 0
              );
            })
          : c.name != a &&
            o(function () {
              return c.call(this);
            });
      },
      {
        "./_an-object": 7,
        "./_descriptors": 20,
        "./_fails": 25,
        "./_flags": 27,
        "./_redefine": 68,
        "./es6.regexp.flags": 107,
      },
    ],
    110: [
      function (t, e, n) {
        "use strict";
        var o = t("./_string-at")(!0);
        t("./_iter-define")(
          String,
          "String",
          function (t) {
            (this._t = String(t)), (this._i = 0);
          },
          function () {
            var t,
              e = this._t,
              n = this._i;
            return n >= e.length
              ? { value: void 0, done: !0 }
              : ((t = o(e, n)), (this._i += t.length), { value: t, done: !1 });
          }
        );
      },
      { "./_iter-define": 43, "./_string-at": 77 },
    ],
    111: [
      function (t, e, n) {
        "use strict";
        function o(t) {
          var e = (q[t] = S(F[z]));
          return (e._k = t), e;
        }
        function r(t, e) {
          k(t);
          for (var n, o = x((e = j(e))), r = 0, i = o.length; r < i; )
            et(t, (n = o[r++]), e[n]);
          return t;
        }
        function i(t) {
          var e = V.call(this, (t = K(t, !0)));
          return (
            !(this === X && l(q, t) && !l(Y, t)) &&
            (!(e || !l(this, t) || !l(q, t) || (l(this, H) && this[H][t])) || e)
          );
        }
        function s(t, e) {
          if (((t = j(t)), (e = K(e, !0)), t !== X || !l(q, e) || l(Y, e))) {
            var n = L(t, e);
            return (
              !n || !l(q, e) || (l(t, H) && t[H][e]) || (n.enumerable = !0), n
            );
          }
        }
        function a(t) {
          for (var e, n = I(j(t)), o = [], r = 0; n.length > r; )
            l(q, (e = n[r++])) || e == H || e == h || o.push(e);
          return o;
        }
        function c(t) {
          for (
            var e, n = t === X, o = I(n ? Y : j(t)), r = [], i = 0;
            o.length > i;

          )
            !l(q, (e = o[i++])) || (n && !l(X, e)) || r.push(q[e]);
          return r;
        }
        var u = t("./_global"),
          l = t("./_has"),
          d = t("./_descriptors"),
          f = t("./_export"),
          p = t("./_redefine"),
          h = t("./_meta").KEY,
          v = t("./_fails"),
          y = t("./_shared"),
          m = t("./_set-to-string-tag"),
          _ = t("./_uid"),
          g = t("./_wks"),
          b = t("./_wks-ext"),
          w = t("./_wks-define"),
          x = t("./_enum-keys"),
          D = t("./_is-array"),
          k = t("./_an-object"),
          E = t("./_is-object"),
          B = t("./_to-object"),
          j = t("./_to-iobject"),
          K = t("./_to-primitive"),
          C = t("./_property-desc"),
          S = t("./_object-create"),
          O = t("./_object-gopn-ext"),
          T = t("./_object-gopd"),
          P = t("./_object-gops"),
          M = t("./_object-dp"),
          A = t("./_object-keys"),
          L = T.f,
          N = M.f,
          I = O.f,
          F = u.Symbol,
          R = u.JSON,
          U = R && R.stringify,
          z = "prototype",
          H = g("_hidden"),
          G = g("toPrimitive"),
          V = {}.propertyIsEnumerable,
          W = y("symbol-registry"),
          q = y("symbols"),
          Y = y("op-symbols"),
          X = Object[z],
          J = "function" == typeof F && !!P.f,
          $ = u.QObject,
          Q = !$ || !$[z] || !$[z].findChild,
          Z =
            d &&
            v(function () {
              return (
                7 !=
                S(
                  N({}, "a", {
                    get: function () {
                      return N(this, "a", { value: 7 }).a;
                    },
                  })
                ).a
              );
            })
              ? function (t, e, n) {
                  var o = L(X, e);
                  o && delete X[e], N(t, e, n), o && t !== X && N(X, e, o);
                }
              : N,
          tt =
            J && "symbol" == typeof F.iterator
              ? function (t) {
                  return "symbol" == typeof t;
                }
              : function (t) {
                  return t instanceof F;
                },
          et = function (t, e, n) {
            return (
              t === X && et(Y, e, n),
              k(t),
              (e = K(e, !0)),
              k(n),
              l(q, e)
                ? (n.enumerable
                    ? (l(t, H) && t[H][e] && (t[H][e] = !1),
                      (n = S(n, { enumerable: C(0, !1) })))
                    : (l(t, H) || N(t, H, C(1, {})), (t[H][e] = !0)),
                  Z(t, e, n))
                : N(t, e, n)
            );
          };
        J ||
          (p(
            (F = function (t) {
              if (this instanceof F)
                throw TypeError("Symbol is not a constructor!");
              var e = _(0 < arguments.length ? t : void 0),
                n = function (t) {
                  this === X && n.call(Y, t),
                    l(this, H) && l(this[H], e) && (this[H][e] = !1),
                    Z(this, e, C(1, t));
                };
              return d && Q && Z(X, e, { configurable: !0, set: n }), o(e);
            })[z],
            "toString",
            function () {
              return this._k;
            }
          ),
          (T.f = s),
          (M.f = et),
          (t("./_object-gopn").f = O.f = a),
          (t("./_object-pie").f = i),
          (P.f = c),
          d && !t("./_library") && p(X, "propertyIsEnumerable", i, !0),
          (b.f = function (t) {
            return o(g(t));
          })),
          f(f.G + f.W + f.F * !J, { Symbol: F });
        for (
          var nt =
              "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
                ","
              ),
            ot = 0;
          nt.length > ot;

        )
          g(nt[ot++]);
        for (var rt = A(g.store), it = 0; rt.length > it; ) w(rt[it++]);
        f(f.S + f.F * !J, "Symbol", {
          for: function (t) {
            return l(W, (t += "")) ? W[t] : (W[t] = F(t));
          },
          keyFor: function (t) {
            if (!tt(t)) throw TypeError(t + " is not a symbol!");
            for (var e in W) if (W[e] === t) return e;
          },
          useSetter: function () {
            Q = !0;
          },
          useSimple: function () {
            Q = !1;
          },
        }),
          f(f.S + f.F * !J, "Object", {
            create: function (t, e) {
              return void 0 === e ? S(t) : r(S(t), e);
            },
            defineProperty: et,
            defineProperties: r,
            getOwnPropertyDescriptor: s,
            getOwnPropertyNames: a,
            getOwnPropertySymbols: c,
          });
        var st = v(function () {
          P.f(1);
        });
        f(f.S + f.F * st, "Object", {
          getOwnPropertySymbols: function (t) {
            return P.f(B(t));
          },
        }),
          R &&
            f(
              f.S +
                f.F *
                  (!J ||
                    v(function () {
                      var t = F();
                      return (
                        "[null]" != U([t]) ||
                        "{}" != U({ a: t }) ||
                        "{}" != U(Object(t))
                      );
                    })),
              "JSON",
              {
                stringify: function (t) {
                  for (var e, n, o = [t], r = 1; r < arguments.length; )
                    o.push(arguments[r++]);
                  if (((n = e = o[1]), (E(e) || void 0 !== t) && !tt(t)))
                    return (
                      D(e) ||
                        (e = function (t, e) {
                          if (
                            ("function" == typeof n && (e = n.call(this, t, e)),
                            !tt(e))
                          )
                            return e;
                        }),
                      (o[1] = e),
                      U.apply(R, o)
                    );
                },
              }
            ),
          F[z][G] || t("./_hide")(F[z], G, F[z].valueOf),
          m(F, "Symbol"),
          m(Math, "Math", !0),
          m(u.JSON, "JSON", !0);
      },
      {
        "./_an-object": 7,
        "./_descriptors": 20,
        "./_enum-keys": 23,
        "./_export": 24,
        "./_fails": 25,
        "./_global": 30,
        "./_has": 31,
        "./_hide": 32,
        "./_is-array": 39,
        "./_is-object": 40,
        "./_library": 47,
        "./_meta": 48,
        "./_object-create": 51,
        "./_object-dp": 52,
        "./_object-gopd": 54,
        "./_object-gopn": 56,
        "./_object-gopn-ext": 55,
        "./_object-gops": 57,
        "./_object-keys": 60,
        "./_object-pie": 61,
        "./_property-desc": 66,
        "./_redefine": 68,
        "./_set-to-string-tag": 73,
        "./_shared": 75,
        "./_to-iobject": 84,
        "./_to-object": 86,
        "./_to-primitive": 87,
        "./_uid": 91,
        "./_wks": 95,
        "./_wks-define": 93,
        "./_wks-ext": 94,
      },
    ],
    112: [
      function (t, e, n) {
        t("./_typed-array")("Float32", 4, function (o) {
          return function (t, e, n) {
            return o(this, t, e, n);
          };
        });
      },
      { "./_typed-array": 88 },
    ],
    113: [
      function (t, e, n) {
        t("./_typed-array")("Uint8", 1, function (o) {
          return function (t, e, n) {
            return o(this, t, e, n);
          };
        });
      },
      { "./_typed-array": 88 },
    ],
    114: [
      function (t, e, n) {
        t("./_typed-array")(
          "Uint8",
          1,
          function (o) {
            return function (t, e, n) {
              return o(this, t, e, n);
            };
          },
          !0
        );
      },
      { "./_typed-array": 88 },
    ],
    115: [
      function (t, e, n) {
        t("./_wks-define")("asyncIterator");
      },
      { "./_wks-define": 93 },
    ],
    116: [
      function (t, e, n) {
        for (
          var o = t("./es6.array.iterator"),
            r = t("./_object-keys"),
            i = t("./_redefine"),
            s = t("./_global"),
            a = t("./_hide"),
            c = t("./_iterators"),
            u = t("./_wks"),
            l = u("iterator"),
            d = u("toStringTag"),
            f = c.Array,
            p = {
              CSSRuleList: !0,
              CSSStyleDeclaration: !1,
              CSSValueList: !1,
              ClientRectList: !1,
              DOMRectList: !1,
              DOMStringList: !1,
              DOMTokenList: !0,
              DataTransferItemList: !1,
              FileList: !1,
              HTMLAllCollection: !1,
              HTMLCollection: !1,
              HTMLFormElement: !1,
              HTMLSelectElement: !1,
              MediaList: !0,
              MimeTypeArray: !1,
              NamedNodeMap: !1,
              NodeList: !0,
              PaintRequestList: !1,
              Plugin: !1,
              PluginArray: !1,
              SVGLengthList: !1,
              SVGNumberList: !1,
              SVGPathSegList: !1,
              SVGPointList: !1,
              SVGStringList: !1,
              SVGTransformList: !1,
              SourceBufferList: !1,
              StyleSheetList: !0,
              TextTrackCueList: !1,
              TextTrackList: !1,
              TouchList: !1,
            },
            h = r(p),
            v = 0;
          v < h.length;
          v++
        ) {
          var y,
            m = h[v],
            _ = p[m],
            g = s[m],
            b = g && g.prototype;
          if (b && (b[l] || a(b, l, f), b[d] || a(b, d, m), (c[m] = f), _))
            for (y in o) b[y] || i(b, y, o[y], !0);
        }
      },
      {
        "./_global": 30,
        "./_hide": 32,
        "./_iterators": 46,
        "./_object-keys": 60,
        "./_redefine": 68,
        "./_wks": 95,
        "./es6.array.iterator": 99,
      },
    ],
    117: [
      function (t, e, n) {
        "use strict";
        var o = (e.exports = {});
        (o.isIE = function (t) {
          return (
            (-1 !== (e = navigator.userAgent.toLowerCase()).indexOf("msie") ||
              -1 !== e.indexOf("trident") ||
              -1 !== e.indexOf(" edge/")) &&
            (!t ||
              t ===
                (function () {
                  for (
                    var t = 3,
                      e = document.createElement("div"),
                      n = e.getElementsByTagName("i");
                    (e.innerHTML =
                      "\x3c!--[if gt IE " + ++t + "]><i></i><![endif]--\x3e"),
                      n[0];

                  );
                  return 4 < t ? t : void 0;
                })())
          );
          var e;
        }),
          (o.isLegacyOpera = function () {
            return !!window.opera;
          });
      },
      {},
    ],
    118: [
      function (t, e, n) {
        "use strict";
        (e.exports = {}).forEach = function (t, e) {
          for (var n = 0; n < t.length; n++) {
            var o = e(t[n]);
            if (o) return o;
          }
        };
      },
      {},
    ],
    119: [
      function (t, e, n) {
        "use strict";
        var m = t("../browser-detector");
        e.exports = function (p) {
          var h = (p = p || {}).reporter,
            v = p.batchProcessor,
            y = p.stateHandler.getState;
          if (!h) throw new Error("Missing required dependency: reporter.");
          function r(t) {
            return y(t).object;
          }
          return {
            makeDetectable: function (i, t, e) {
              var n, o, r, s, a, c, u, l, d;
              function f() {
                function t() {
                  if ("static" === u.position) {
                    n.style.setProperty(
                      "position",
                      "relative",
                      i.important ? "important" : ""
                    );
                    var t = function (t, e, n, o) {
                      var r = n[o];
                      "auto" !== r &&
                        "0" !== r.replace(/[^-\d\.]/g, "") &&
                        (t.warn(
                          "An element that is positioned static has style." +
                            o +
                            "=" +
                            r +
                            " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." +
                            o +
                            " will be set to 0. Element: ",
                          e
                        ),
                        e.style.setProperty(
                          o,
                          "0",
                          i.important ? "important" : ""
                        ));
                    };
                    t(h, n, u, "top"),
                      t(h, n, u, "right"),
                      t(h, n, u, "bottom"),
                      t(h, n, u, "left");
                  }
                }
                "" !== u.position && (t(), (c = !0));
                var e = document.createElement("object");
                (e.style.cssText = a),
                  (e.tabIndex = -1),
                  (e.type = "text/html"),
                  e.setAttribute("aria-hidden", "true"),
                  (e.onload = function () {
                    c || t(),
                      (function t(e, n) {
                        if (!e.contentDocument) {
                          var o = y(e);
                          return (
                            o.checkForObjectDocumentTimeoutId &&
                              window.clearTimeout(
                                o.checkForObjectDocumentTimeoutId
                              ),
                            void (o.checkForObjectDocumentTimeoutId =
                              setTimeout(function () {
                                (o.checkForObjectDocumentTimeoutId = 0),
                                  t(e, n);
                              }, 100))
                          );
                        }
                        n(e.contentDocument);
                      })(this, function () {
                        o(n);
                      });
                  }),
                  m.isIE() || (e.data = "about:blank"),
                  y(n) &&
                    (n.appendChild(e),
                    (y(n).object = e),
                    m.isIE() && (e.data = "about:blank"));
              }
              e || ((e = t), (t = i), (i = null)),
                (i = i || {}),
                m.isIE(8)
                  ? e(t)
                  : ((n = t),
                    (o = e),
                    (r = [
                      "display: block",
                      "position: absolute",
                      "top: 0",
                      "left: 0",
                      "width: 100%",
                      "height: 100%",
                      "border: none",
                      "padding: 0",
                      "margin: 0",
                      "opacity: 0",
                      "z-index: -1000",
                      "pointer-events: none",
                    ]),
                    (s = p.important ? " !important; " : "; "),
                    (a = (r.join(s) + s).trim()),
                    (c = !1),
                    (u = window.getComputedStyle(n)),
                    (l = n.offsetWidth),
                    (d = n.offsetHeight),
                    (y(n).startSize = { width: l, height: d }),
                    v ? v.add(f) : f());
            },
            addListener: function (t, e) {
              function n() {
                e(t);
              }
              if (m.isIE(8))
                (y(t).object = { proxy: n }), t.attachEvent("onresize", n);
              else {
                var o = r(t);
                if (!o)
                  throw new Error(
                    "Element is not detectable by this strategy."
                  );
                o.contentDocument.defaultView.addEventListener("resize", n);
              }
            },
            uninstall: function (t) {
              if (y(t)) {
                var e = r(t);
                e &&
                  (m.isIE(8)
                    ? t.detachEvent("onresize", e.proxy)
                    : t.removeChild(e),
                  y(t).checkForObjectDocumentTimeoutId &&
                    window.clearTimeout(y(t).checkForObjectDocumentTimeoutId),
                  delete y(t).object);
              }
            },
          };
        };
      },
      { "../browser-detector": 117 },
    ],
    120: [
      function (t, e, n) {
        "use strict";
        var O = t("../collection-utils").forEach;
        e.exports = function (n) {
          var E = (n = n || {}).reporter,
            m = n.batchProcessor,
            B = n.stateHandler.getState,
            _ = (n.stateHandler.hasState, n.idHandler);
          if (!m)
            throw new Error("Missing required dependency: batchProcessor");
          if (!E) throw new Error("Missing required dependency: reporter.");
          var j = (function () {
              var t = document.createElement("div");
              t.style.cssText = C([
                "position: absolute",
                "width: 1000px",
                "height: 1000px",
                "visibility: hidden",
                "margin: 0",
                "padding: 0",
              ]);
              var e = document.createElement("div");
              (e.style.cssText = C([
                "position: absolute",
                "width: 500px",
                "height: 500px",
                "overflow: scroll",
                "visibility: none",
                "top: -1500px",
                "left: -1500px",
                "visibility: hidden",
                "margin: 0",
                "padding: 0",
              ])),
                e.appendChild(t),
                document.body.insertBefore(e, document.body.firstChild);
              var n = 500 - e.clientWidth,
                o = 500 - e.clientHeight;
              return document.body.removeChild(e), { width: n, height: o };
            })(),
            K = "erd_scroll_detection_container";
          function t(t) {
            !(function (o, r, t) {
              if (!o.getElementById(r)) {
                var e = t + "_animation",
                  n = t + "_animation_active",
                  i = "/* Created by the element-resize-detector library. */\n";
                (i +=
                  "." +
                  t +
                  " > div::-webkit-scrollbar { " +
                  C(["display: none"]) +
                  " }\n\n"),
                  (i +=
                    "." +
                    n +
                    " { " +
                    C([
                      "-webkit-animation-duration: 0.1s",
                      "animation-duration: 0.1s",
                      "-webkit-animation-name: " + e,
                      "animation-name: " + e,
                    ]) +
                    " }\n"),
                  (i +=
                    "@-webkit-keyframes " +
                    e +
                    " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n"),
                  (function (t, e) {
                    e =
                      e ||
                      function (t) {
                        o.head.appendChild(t);
                      };
                    var n = o.createElement("style");
                    (n.innerHTML = t), (n.id = r), e(n);
                  })(
                    (i +=
                      "@keyframes " +
                      e +
                      " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }")
                  );
              }
            })(t, "erd_scroll_detection_scrollbar_style", K);
          }
          function C(t) {
            var e = n.important ? " !important; " : "; ";
            return (t.join(e) + e).trim();
          }
          function S(t, e, n) {
            if (t.addEventListener) t.addEventListener(e, n);
            else {
              if (!t.attachEvent)
                return E.error(
                  "[scroll] Don't know how to add event listeners."
                );
              t.attachEvent("on" + e, n);
            }
          }
          function o(t, e, n) {
            if (t.removeEventListener) t.removeEventListener(e, n);
            else {
              if (!t.detachEvent)
                return E.error(
                  "[scroll] Don't know how to remove event listeners."
                );
              t.detachEvent("on" + e, n);
            }
          }
          function g(t) {
            return B(t).container.childNodes[0].childNodes[0].childNodes[0];
          }
          function b(t) {
            return B(t).container.childNodes[0].childNodes[0].childNodes[1];
          }
          return (
            t(window.document),
            {
              makeDetectable: function (w, x, t) {
                function D() {
                  if (w.debug) {
                    var t = Array.prototype.slice.call(arguments);
                    if ((t.unshift(_.get(x), "Scroll: "), E.log.apply))
                      E.log.apply(null, t);
                    else for (var e = 0; e < t.length; e++) E.log(t[e]);
                  }
                }
                function r(t) {
                  var e = B(t).container.childNodes[0],
                    n = window.getComputedStyle(e);
                  return !n.width || -1 === n.width.indexOf("px");
                }
                function e() {
                  var t = window.getComputedStyle(x),
                    e = {};
                  return (
                    (e.position = t.position),
                    (e.width = x.offsetWidth),
                    (e.height = x.offsetHeight),
                    (e.top = t.top),
                    (e.right = t.right),
                    (e.bottom = t.bottom),
                    (e.left = t.left),
                    (e.widthCSS = t.width),
                    (e.heightCSS = t.height),
                    e
                  );
                }
                function n() {
                  if ((D("storeStyle invoked."), B(x))) {
                    var t = e();
                    B(x).style = t;
                  } else D("Aborting because element has been uninstalled");
                }
                function a(t, e, n) {
                  (B(t).lastWidth = e), (B(t).lastHeight = n);
                }
                function u() {
                  return 2 * j.width + 1;
                }
                function l() {
                  return 2 * j.height + 1;
                }
                function d(t) {
                  return t + 10 + u();
                }
                function f(t) {
                  return t + 10 + l();
                }
                function c(t, e, n) {
                  var o = g(t),
                    r = b(t),
                    i = d(e),
                    s = f(n),
                    a = 2 * e + u(),
                    c = 2 * n + l();
                  (o.scrollLeft = i),
                    (o.scrollTop = s),
                    (r.scrollLeft = a),
                    (r.scrollTop = c);
                }
                function k() {
                  var t = B(x).container;
                  if (!t) {
                    ((t = document.createElement("div")).className = K),
                      (t.style.cssText = C([
                        "visibility: hidden",
                        "display: inline",
                        "width: 0px",
                        "height: 0px",
                        "z-index: -1",
                        "overflow: hidden",
                        "margin: 0",
                        "padding: 0",
                      ])),
                      (B(x).container = t),
                      (t.className += " " + K + "_animation_active"),
                      x.appendChild(t);
                    var e = function () {
                      B(x).onRendered && B(x).onRendered();
                    };
                    S(t, "animationstart", e), (B(x).onAnimationStart = e);
                  }
                  return t;
                }
                function o() {
                  if ((D("Injecting elements"), B(x))) {
                    !(function () {
                      var t = B(x).style;
                      if ("static" === t.position) {
                        x.style.setProperty(
                          "position",
                          "relative",
                          w.important ? "important" : ""
                        );
                        var e = function (t, e, n, o) {
                          var r = n[o];
                          "auto" !== r &&
                            "0" !== r.replace(/[^-\d\.]/g, "") &&
                            (t.warn(
                              "An element that is positioned static has style." +
                                o +
                                "=" +
                                r +
                                " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." +
                                o +
                                " will be set to 0. Element: ",
                              e
                            ),
                            (e.style[o] = 0));
                        };
                        e(E, x, t, "top"),
                          e(E, x, t, "right"),
                          e(E, x, t, "bottom"),
                          e(E, x, t, "left");
                      }
                    })();
                    var t = B(x).container;
                    t = t || k();
                    var e,
                      n,
                      o,
                      r,
                      i = j.width,
                      s = j.height,
                      a = C([
                        "position: absolute",
                        "flex: none",
                        "overflow: hidden",
                        "z-index: -1",
                        "visibility: hidden",
                        "width: 100%",
                        "height: 100%",
                        "left: 0px",
                        "top: 0px",
                      ]),
                      c = C(
                        [
                          "position: absolute",
                          "flex: none",
                          "overflow: hidden",
                          "z-index: -1",
                          "visibility: hidden",
                        ].concat([
                          "left: " + (e = (e = -(1 + i)) ? e + "px" : "0"),
                          "top: " + (n = (n = -(1 + s)) ? n + "px" : "0"),
                          "right: " + (r = (r = -i) ? r + "px" : "0"),
                          "bottom: " + (o = (o = -s) ? o + "px" : "0"),
                        ])
                      ),
                      u = C([
                        "position: absolute",
                        "flex: none",
                        "overflow: scroll",
                        "z-index: -1",
                        "visibility: hidden",
                        "width: 100%",
                        "height: 100%",
                      ]),
                      l = C([
                        "position: absolute",
                        "flex: none",
                        "overflow: scroll",
                        "z-index: -1",
                        "visibility: hidden",
                        "width: 100%",
                        "height: 100%",
                      ]),
                      d = C(["position: absolute", "left: 0", "top: 0"]),
                      f = C([
                        "position: absolute",
                        "width: 200%",
                        "height: 200%",
                      ]),
                      p = document.createElement("div"),
                      h = document.createElement("div"),
                      v = document.createElement("div"),
                      y = document.createElement("div"),
                      m = document.createElement("div"),
                      _ = document.createElement("div");
                    (p.dir = "ltr"),
                      (p.style.cssText = a),
                      (p.className = K),
                      (h.className = K),
                      (h.style.cssText = c),
                      (v.style.cssText = u),
                      (y.style.cssText = d),
                      (m.style.cssText = l),
                      (_.style.cssText = f),
                      v.appendChild(y),
                      m.appendChild(_),
                      h.appendChild(v),
                      h.appendChild(m),
                      p.appendChild(h),
                      t.appendChild(p),
                      S(v, "scroll", g),
                      S(m, "scroll", b),
                      (B(x).onExpandScroll = g),
                      (B(x).onShrinkScroll = b);
                  } else D("Aborting because element has been uninstalled");
                  function g() {
                    B(x).onExpand && B(x).onExpand();
                  }
                  function b() {
                    B(x).onShrink && B(x).onShrink();
                  }
                }
                function i() {
                  function i(t, e, n) {
                    var o = g(t).childNodes[0],
                      r = d(e),
                      i = f(n);
                    o.style.setProperty(
                      "width",
                      r + "px",
                      w.important ? "important" : ""
                    ),
                      o.style.setProperty(
                        "height",
                        i + "px",
                        w.important ? "important" : ""
                      );
                  }
                  function n(t) {
                    var n = x.offsetWidth,
                      o = x.offsetHeight,
                      r = n !== B(x).lastWidth || o !== B(x).lastHeight;
                    D("Storing current size", n, o),
                      a(x, n, o),
                      m.add(0, function () {
                        if (r)
                          if (B(x))
                            if (s()) {
                              if (w.debug) {
                                var t = x.offsetWidth,
                                  e = x.offsetHeight;
                                (t === n && e === o) ||
                                  E.warn(
                                    _.get(x),
                                    "Scroll: Size changed before updating detector elements."
                                  );
                              }
                              i(x, n, o);
                            } else
                              D(
                                "Aborting because element container has not been initialized"
                              );
                          else
                            D("Aborting because element has been uninstalled");
                      }),
                      m.add(1, function () {
                        B(x)
                          ? s()
                            ? c(x, n, o)
                            : D(
                                "Aborting because element container has not been initialized"
                              )
                          : D("Aborting because element has been uninstalled");
                      }),
                      r &&
                        t &&
                        m.add(2, function () {
                          B(x)
                            ? s()
                              ? t()
                              : D(
                                  "Aborting because element container has not been initialized"
                                )
                            : D(
                                "Aborting because element has been uninstalled"
                              );
                        });
                  }
                  function s() {
                    return B(x).container;
                  }
                  function o() {
                    D("notifyListenersIfNeeded invoked");
                    var t = B(x);
                    return void 0 === B(x).lastNotifiedWidth &&
                      t.lastWidth === t.startSize.width &&
                      t.lastHeight === t.startSize.height
                      ? D(
                          "Not notifying: Size is the same as the start size, and there has been no notification yet."
                        )
                      : t.lastWidth === t.lastNotifiedWidth &&
                        t.lastHeight === t.lastNotifiedHeight
                      ? D("Not notifying: Size already notified")
                      : (D("Current size not notified, notifying..."),
                        (t.lastNotifiedWidth = t.lastWidth),
                        (t.lastNotifiedHeight = t.lastHeight),
                        void O(B(x).listeners, function (t) {
                          t(x);
                        }));
                  }
                  function t() {
                    D("Scroll detected."),
                      r(x)
                        ? D("Scroll event fired while unrendered. Ignoring...")
                        : n(o);
                  }
                  if (
                    (D("registerListenersAndPositionElements invoked."), B(x))
                  ) {
                    (B(x).onRendered = function () {
                      if ((D("startanimation triggered."), r(x)))
                        D("Ignoring since element is still unrendered...");
                      else {
                        D("Element rendered.");
                        var t = g(x),
                          e = b(x);
                        (0 !== t.scrollLeft &&
                          0 !== t.scrollTop &&
                          0 !== e.scrollLeft &&
                          0 !== e.scrollTop) ||
                          (D(
                            "Scrollbars out of sync. Updating detector elements..."
                          ),
                          n(o));
                      }
                    }),
                      (B(x).onExpand = t),
                      (B(x).onShrink = t);
                    var e = B(x).style;
                    i(x, e.width, e.height);
                  } else D("Aborting because element has been uninstalled");
                }
                function s() {
                  if ((D("finalizeDomMutation invoked."), B(x))) {
                    var t = B(x).style;
                    a(x, t.width, t.height), c(x, t.width, t.height);
                  } else D("Aborting because element has been uninstalled");
                }
                function p() {
                  t(x);
                }
                function h() {
                  var t;
                  D("Installing..."),
                    (B(x).listeners = []),
                    (t = e()),
                    (B(x).startSize = { width: t.width, height: t.height }),
                    D("Element start size", B(x).startSize),
                    m.add(0, n),
                    m.add(1, o),
                    m.add(2, i),
                    m.add(3, s),
                    m.add(4, p);
                }
                var v, y;
                t || ((t = x), (x = w), (w = null)),
                  (w = w || {}),
                  D("Making detectable..."),
                  ((y = v = x) !== y.ownerDocument.body &&
                    !y.ownerDocument.body.contains(y)) ||
                  null === window.getComputedStyle(v)
                    ? (D("Element is detached"),
                      k(),
                      D("Waiting until element is attached..."),
                      (B(x).onRendered = function () {
                        D("Element is now attached"), h();
                      }))
                    : h();
              },
              addListener: function (t, e) {
                if (!B(t).listeners.push)
                  throw new Error(
                    "Cannot add listener to an element that is not detectable."
                  );
                B(t).listeners.push(e);
              },
              uninstall: function (t) {
                var e = B(t);
                e &&
                  (e.onExpandScroll && o(g(t), "scroll", e.onExpandScroll),
                  e.onShrinkScroll && o(b(t), "scroll", e.onShrinkScroll),
                  e.onAnimationStart &&
                    o(e.container, "animationstart", e.onAnimationStart),
                  e.container && t.removeChild(e.container));
              },
              initDocument: t,
            }
          );
        };
      },
      { "../collection-utils": 118 },
    ],
    121: [
      function (t, e, n) {
        "use strict";
        var b = t("./collection-utils").forEach,
          a = t("./element-utils"),
          c = t("./listener-handler"),
          u = t("./id-generator"),
          l = t("./id-handler"),
          d = t("./reporter"),
          f = t("./browser-detector"),
          w = t("batch-processor"),
          x = t("./state-handler"),
          D = t("./detection-strategy/object.js"),
          k = t("./detection-strategy/scroll.js");
        function E(t) {
          return Array.isArray(t) || void 0 !== t.length;
        }
        function B(t) {
          if (Array.isArray(t)) return t;
          var e = [];
          return (
            b(t, function (t) {
              e.push(t);
            }),
            e
          );
        }
        function j(t) {
          return t && 1 === t.nodeType;
        }
        function K(t, e, n) {
          var o = t[e];
          return null == o && void 0 !== n ? n : o;
        }
        e.exports = function (e) {
          var n;
          if ((e = e || {}).idHandler)
            n = {
              get: function (t) {
                return e.idHandler.get(t, !0);
              },
              set: e.idHandler.set,
            };
          else {
            var t = u(),
              o = l({ idGenerator: t, stateHandler: x });
            n = o;
          }
          var p = e.reporter;
          p = p || d(!1 === p);
          var r = K(e, "batchProcessor", w({ reporter: p })),
            h = {};
          (h.callOnAdd = !!K(e, "callOnAdd", !0)),
            (h.debug = !!K(e, "debug", !1));
          var v,
            y = c(n),
            m = a({ stateHandler: x }),
            i = K(e, "strategy", "object"),
            _ = K(e, "important", !1),
            s = {
              reporter: p,
              batchProcessor: r,
              stateHandler: x,
              idHandler: n,
              important: _,
            };
          if (
            ("scroll" === i &&
              (f.isLegacyOpera()
                ? (p.warn(
                    "Scroll strategy is not supported on legacy Opera. Changing to object strategy."
                  ),
                  (i = "object"))
                : f.isIE(9) &&
                  (p.warn(
                    "Scroll strategy is not supported on IE9. Changing to object strategy."
                  ),
                  (i = "object"))),
            "scroll" === i)
          )
            v = k(s);
          else {
            if ("object" !== i) throw new Error("Invalid strategy name: " + i);
            v = D(s);
          }
          var g = {};
          return {
            listenTo: function (t, i, s) {
              function a(e) {
                var t = y.get(e);
                b(t, function (t) {
                  t(e);
                });
              }
              function c(t, e, n) {
                y.add(e, n), t && n(e);
              }
              if ((s || ((s = i), (i = t), (t = {})), !i))
                throw new Error("At least one element required.");
              if (!s) throw new Error("Listener required.");
              if (j(i)) i = [i];
              else {
                if (!E(i))
                  return p.error(
                    "Invalid arguments. Must be a DOM element or a collection of DOM elements."
                  );
                i = B(i);
              }
              var u = 0,
                l = K(t, "callOnAdd", h.callOnAdd),
                d = K(t, "onReady", function () {}),
                f = K(t, "debug", h.debug);
              b(i, function (t) {
                x.getState(t) || (x.initState(t), n.set(t));
                var r = n.get(t);
                if (
                  (f && p.log("Attaching listener to element", r, t),
                  !m.isDetectable(t))
                )
                  return (
                    f && p.log(r, "Not detectable."),
                    m.isBusy(t)
                      ? (f && p.log(r, "System busy making it detectable"),
                        c(l, t, s),
                        (g[r] = g[r] || []),
                        void g[r].push(function () {
                          ++u === i.length && d();
                        }))
                      : (f && p.log(r, "Making detectable..."),
                        m.markBusy(t, !0),
                        v.makeDetectable(
                          { debug: f, important: _ },
                          t,
                          function (t) {
                            if (
                              (f && p.log(r, "onElementDetectable"),
                              x.getState(t))
                            ) {
                              m.markAsDetectable(t),
                                m.markBusy(t, !1),
                                v.addListener(t, a),
                                c(l, t, s);
                              var e = x.getState(t);
                              if (e && e.startSize) {
                                var n = t.offsetWidth,
                                  o = t.offsetHeight;
                                (e.startSize.width === n &&
                                  e.startSize.height === o) ||
                                  a(t);
                              }
                              g[r] &&
                                b(g[r], function (t) {
                                  t();
                                });
                            } else
                              f &&
                                p.log(
                                  r,
                                  "Element uninstalled before being detectable."
                                );
                            delete g[r], ++u === i.length && d();
                          }
                        ))
                  );
                f && p.log(r, "Already detecable, adding listener."),
                  c(l, t, s),
                  u++;
              }),
                u === i.length && d();
            },
            removeListener: y.removeListener,
            removeAllListeners: y.removeAllListeners,
            uninstall: function (t) {
              if (!t) return p.error("At least one element is required.");
              if (j(t)) t = [t];
              else {
                if (!E(t))
                  return p.error(
                    "Invalid arguments. Must be a DOM element or a collection of DOM elements."
                  );
                t = B(t);
              }
              b(t, function (t) {
                y.removeAllListeners(t), v.uninstall(t), x.cleanState(t);
              });
            },
            initDocument: function (t) {
              v.initDocument && v.initDocument(t);
            },
          };
        };
      },
      {
        "./browser-detector": 117,
        "./collection-utils": 118,
        "./detection-strategy/object.js": 119,
        "./detection-strategy/scroll.js": 120,
        "./element-utils": 122,
        "./id-generator": 123,
        "./id-handler": 124,
        "./listener-handler": 125,
        "./reporter": 126,
        "./state-handler": 127,
        "batch-processor": 1,
      },
    ],
    122: [
      function (t, e, n) {
        "use strict";
        e.exports = function (t) {
          var n = t.stateHandler.getState;
          return {
            isDetectable: function (t) {
              var e = n(t);
              return e && !!e.isDetectable;
            },
            markAsDetectable: function (t) {
              n(t).isDetectable = !0;
            },
            isBusy: function (t) {
              return !!n(t).busy;
            },
            markBusy: function (t, e) {
              n(t).busy = !!e;
            },
          };
        };
      },
      {},
    ],
    123: [
      function (t, e, n) {
        "use strict";
        e.exports = function () {
          var t = 1;
          return {
            generate: function () {
              return t++;
            },
          };
        };
      },
      {},
    ],
    124: [
      function (t, e, n) {
        "use strict";
        e.exports = function (t) {
          var o = t.idGenerator,
            r = t.stateHandler.getState;
          return {
            get: function (t) {
              var e = r(t);
              return e && void 0 !== e.id ? e.id : null;
            },
            set: function (t) {
              var e = r(t);
              if (!e)
                throw new Error(
                  "setId required the element to have a resize detection state."
                );
              var n = o.generate();
              return (e.id = n);
            },
          };
        };
      },
      {},
    ],
    125: [
      function (t, e, n) {
        "use strict";
        e.exports = function (o) {
          var r = {};
          function i(t) {
            var e = o.get(t);
            return (void 0 !== e && r[e]) || [];
          }
          return {
            get: i,
            add: function (t, e) {
              var n = o.get(t);
              r[n] || (r[n] = []), r[n].push(e);
            },
            removeListener: function (t, e) {
              for (var n = i(t), o = 0, r = n.length; o < r; ++o)
                if (n[o] === e) {
                  n.splice(o, 1);
                  break;
                }
            },
            removeAllListeners: function (t) {
              var e = i(t);
              e && (e.length = 0);
            },
          };
        };
      },
      {},
    ],
    126: [
      function (t, e, n) {
        "use strict";
        e.exports = function (t) {
          function e() {}
          var n = { log: e, warn: e, error: e };
          if (!t && window.console) {
            var o = function (t, n) {
              t[n] = function () {
                var t = console[n];
                if (t.apply) t.apply(console, arguments);
                else for (var e = 0; e < arguments.length; e++) t(arguments[e]);
              };
            };
            o(n, "log"), o(n, "warn"), o(n, "error");
          }
          return n;
        };
      },
      {},
    ],
    127: [
      function (t, e, n) {
        "use strict";
        var o = "_erd";
        function r(t) {
          return t[o];
        }
        e.exports = {
          initState: function (t) {
            return (t[o] = {}), r(t);
          },
          getState: r,
          cleanState: function (t) {
            delete t[o];
          },
        };
      },
      {},
    ],
    128: [
      function (t, e, n) {
        var o, r;
        (o = window),
          (r = function () {
            return (
              (o = {}),
              (r.m = n =
                [
                  function (t, e, n) {
                    "use strict";
                    n.r(e);
                    function D(t, e) {
                      var n = e.x - t.x,
                        o = e.y - t.y;
                      return Math.sqrt(n * n + o * o);
                    }
                    function k(t) {
                      return t * (Math.PI / 180);
                    }
                    function r(t, e, n) {
                      for (
                        var o, r = e.split(/[ ,]+/g), i = 0;
                        i < r.length;
                        i += 1
                      )
                        (o = r[i]),
                          t.addEventListener
                            ? t.addEventListener(o, n, !1)
                            : t.attachEvent && t.attachEvent(o, n);
                    }
                    function o(t, e, n) {
                      for (
                        var o, r = e.split(/[ ,]+/g), i = 0;
                        i < r.length;
                        i += 1
                      )
                        (o = r[i]),
                          t.removeEventListener
                            ? t.removeEventListener(o, n)
                            : t.detachEvent && t.detachEvent(o, n);
                    }
                    function i(t) {
                      return (
                        t.preventDefault(),
                        t.type.match(/^touch/) ? t.changedTouches : t
                      );
                    }
                    function E() {
                      return {
                        x:
                          void 0 !== window.pageXOffset
                            ? window.pageXOffset
                            : (
                                document.documentElement ||
                                document.body.parentNode ||
                                document.body
                              ).scrollLeft,
                        y:
                          void 0 !== window.pageYOffset
                            ? window.pageYOffset
                            : (
                                document.documentElement ||
                                document.body.parentNode ||
                                document.body
                              ).scrollTop,
                      };
                    }
                    function B(t, e) {
                      e.top || e.right || e.bottom || e.left
                        ? ((t.style.top = e.top),
                          (t.style.right = e.right),
                          (t.style.bottom = e.bottom),
                          (t.style.left = e.left))
                        : ((t.style.left = e.x + "px"),
                          (t.style.top = e.y + "px"));
                    }
                    function s(t, e, n) {
                      var o = l(t);
                      for (var r in o)
                        if (o.hasOwnProperty(r))
                          if ("string" == typeof e) o[r] = e + " " + n;
                          else {
                            for (var i = "", s = 0, a = e.length; s < a; s += 1)
                              i += e[s] + " " + n + ", ";
                            o[r] = i.slice(0, -2);
                          }
                      return o;
                    }
                    function a(t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                      return t;
                    }
                    function c(t, e) {
                      if (t.length)
                        for (var n = 0, o = t.length; n < o; n += 1) e(t[n]);
                      else e(t);
                    }
                    var u,
                      l = function (e) {
                        var n = {};
                        return (
                          (n[e] = ""),
                          ["webkit", "Moz", "o"].forEach(function (t) {
                            n[t + e.charAt(0).toUpperCase() + e.slice(1)] = "";
                          }),
                          n
                        );
                      },
                      d = !!("ontouchstart" in window),
                      f = !!window.PointerEvent,
                      p = !!window.MSPointerEvent,
                      h = {
                        start: "mousedown",
                        move: "mousemove",
                        end: "mouseup",
                      },
                      v = {};
                    function y() {}
                    f
                      ? (u = {
                          start: "pointerdown",
                          move: "pointermove",
                          end: "pointerup, pointercancel",
                        })
                      : p
                      ? (u = {
                          start: "MSPointerDown",
                          move: "MSPointerMove",
                          end: "MSPointerUp",
                        })
                      : d
                      ? ((u = {
                          start: "touchstart",
                          move: "touchmove",
                          end: "touchend, touchcancel",
                        }),
                        (v = h))
                      : (u = h),
                      (y.prototype.on = function (t, e) {
                        var n,
                          o = t.split(/[ ,]+/g);
                        this._handlers_ = this._handlers_ || {};
                        for (var r = 0; r < o.length; r += 1)
                          (n = o[r]),
                            (this._handlers_[n] = this._handlers_[n] || []),
                            this._handlers_[n].push(e);
                        return this;
                      }),
                      (y.prototype.off = function (t, e) {
                        return (
                          (this._handlers_ = this._handlers_ || {}),
                          void 0 === t
                            ? (this._handlers_ = {})
                            : void 0 === e
                            ? (this._handlers_[t] = null)
                            : this._handlers_[t] &&
                              0 <= this._handlers_[t].indexOf(e) &&
                              this._handlers_[t].splice(
                                this._handlers_[t].indexOf(e),
                                1
                              ),
                          this
                        );
                      }),
                      (y.prototype.trigger = function (t, e) {
                        var n,
                          o = this,
                          r = t.split(/[ ,]+/g);
                        o._handlers_ = o._handlers_ || {};
                        for (var i = 0; i < r.length; i += 1)
                          (n = r[i]),
                            o._handlers_[n] &&
                              o._handlers_[n].length &&
                              o._handlers_[n].forEach(function (t) {
                                t.call(o, { type: n, target: o }, e);
                              });
                      }),
                      (y.prototype.config = function (t) {
                        (this.options = this.defaults || {}),
                          t &&
                            (this.options = (function (t, e) {
                              var n = {};
                              for (var o in t)
                                t.hasOwnProperty(o) && e.hasOwnProperty(o)
                                  ? (n[o] = e[o])
                                  : t.hasOwnProperty(o) && (n[o] = t[o]);
                              return n;
                            })(this.options, t));
                      }),
                      (y.prototype.bindEvt = function (t, e) {
                        var n = this;
                        return (
                          (n._domHandlers_ = n._domHandlers_ || {}),
                          (n._domHandlers_[e] = function () {
                            "function" == typeof n["on" + e]
                              ? n["on" + e].apply(n, arguments)
                              : console.warn(
                                  '[WARNING] : Missing "on' + e + '" handler.'
                                );
                          }),
                          r(t, u[e], n._domHandlers_[e]),
                          v[e] && r(t, v[e], n._domHandlers_[e]),
                          n
                        );
                      }),
                      (y.prototype.unbindEvt = function (t, e) {
                        return (
                          (this._domHandlers_ = this._domHandlers_ || {}),
                          o(t, u[e], this._domHandlers_[e]),
                          v[e] && o(t, v[e], this._domHandlers_[e]),
                          delete this._domHandlers_[e],
                          this
                        );
                      });
                    var m = y;
                    function _(t, e) {
                      return (
                        (this.identifier = e.identifier),
                        (this.position = e.position),
                        (this.frontPosition = e.frontPosition),
                        (this.collection = t),
                        (this.defaults = {
                          size: 100,
                          threshold: 0.1,
                          color: "white",
                          fadeTime: 250,
                          dataOnly: !1,
                          restJoystick: !0,
                          restOpacity: 0.5,
                          mode: "dynamic",
                          zone: document.body,
                          lockX: !1,
                          lockY: !1,
                        }),
                        this.config(e),
                        "dynamic" === this.options.mode &&
                          (this.options.restOpacity = 0),
                        (this.id = _.id),
                        (_.id += 1),
                        this.buildEl().stylize(),
                        (this.instance = {
                          el: this.ui.el,
                          on: this.on.bind(this),
                          off: this.off.bind(this),
                          show: this.show.bind(this),
                          hide: this.hide.bind(this),
                          add: this.addToDom.bind(this),
                          remove: this.removeFromDom.bind(this),
                          destroy: this.destroy.bind(this),
                          setPosition: this.setPosition.bind(this),
                          resetDirection: this.resetDirection.bind(this),
                          computeDirection: this.computeDirection.bind(this),
                          trigger: this.trigger.bind(this),
                          position: this.position,
                          frontPosition: this.frontPosition,
                          ui: this.ui,
                          identifier: this.identifier,
                          id: this.id,
                          options: this.options,
                        }),
                        this.instance
                      );
                    }
                    (_.prototype = new m()),
                      ((_.constructor = _).id = 0),
                      (_.prototype.buildEl = function (t) {
                        return (
                          (this.ui = {}),
                          this.options.dataOnly ||
                            ((this.ui.el = document.createElement("div")),
                            (this.ui.back = document.createElement("div")),
                            (this.ui.front = document.createElement("div")),
                            (this.ui.el.className =
                              "nipple collection_" + this.collection.id),
                            (this.ui.back.className = "back"),
                            (this.ui.front.className = "front"),
                            this.ui.el.setAttribute(
                              "id",
                              "nipple_" + this.collection.id + "_" + this.id
                            ),
                            this.ui.el.appendChild(this.ui.back),
                            this.ui.el.appendChild(this.ui.front)),
                          this
                        );
                      }),
                      (_.prototype.stylize = function () {
                        if (this.options.dataOnly) return this;
                        var t = this.options.fadeTime + "ms",
                          e = (function () {
                            var t = l("borderRadius");
                            for (var e in t)
                              t.hasOwnProperty(e) && (t[e] = "50%");
                            return t;
                          })(),
                          n = s("transition", "opacity", t),
                          o = {};
                        return (
                          (o.el = {
                            position: "absolute",
                            opacity: this.options.restOpacity,
                            display: "block",
                            zIndex: 999,
                          }),
                          (o.back = {
                            position: "absolute",
                            display: "block",
                            width: this.options.size + "px",
                            height: this.options.size + "px",
                            marginLeft: -this.options.size / 2 + "px",
                            marginTop: -this.options.size / 2 + "px",
                            background: this.options.color,
                            opacity: ".5",
                          }),
                          (o.front = {
                            width: this.options.size / 2 + "px",
                            height: this.options.size / 2 + "px",
                            position: "absolute",
                            display: "block",
                            marginLeft: -this.options.size / 4 + "px",
                            marginTop: -this.options.size / 4 + "px",
                            background: this.options.color,
                            opacity: ".5",
                          }),
                          a(o.el, n),
                          a(o.back, e),
                          a(o.front, e),
                          this.applyStyles(o),
                          this
                        );
                      }),
                      (_.prototype.applyStyles = function (t) {
                        for (var e in this.ui)
                          if (this.ui.hasOwnProperty(e))
                            for (var n in t[e]) this.ui[e].style[n] = t[e][n];
                        return this;
                      }),
                      (_.prototype.addToDom = function () {
                        return (
                          this.options.dataOnly ||
                            document.body.contains(this.ui.el) ||
                            this.options.zone.appendChild(this.ui.el),
                          this
                        );
                      }),
                      (_.prototype.removeFromDom = function () {
                        return (
                          this.options.dataOnly ||
                            !document.body.contains(this.ui.el) ||
                            this.options.zone.removeChild(this.ui.el),
                          this
                        );
                      }),
                      (_.prototype.destroy = function () {
                        clearTimeout(this.removeTimeout),
                          clearTimeout(this.showTimeout),
                          clearTimeout(this.restTimeout),
                          this.trigger("destroyed", this.instance),
                          this.removeFromDom(),
                          this.off();
                      }),
                      (_.prototype.show = function (t) {
                        var e = this;
                        return (
                          e.options.dataOnly ||
                            (clearTimeout(e.removeTimeout),
                            clearTimeout(e.showTimeout),
                            clearTimeout(e.restTimeout),
                            e.addToDom(),
                            e.restCallback(),
                            setTimeout(function () {
                              e.ui.el.style.opacity = 1;
                            }, 0),
                            (e.showTimeout = setTimeout(function () {
                              e.trigger("shown", e.instance),
                                "function" == typeof t && t.call(this);
                            }, e.options.fadeTime))),
                          e
                        );
                      }),
                      (_.prototype.hide = function (e) {
                        var n = this;
                        return (
                          n.options.dataOnly ||
                            ((n.ui.el.style.opacity = n.options.restOpacity),
                            clearTimeout(n.removeTimeout),
                            clearTimeout(n.showTimeout),
                            clearTimeout(n.restTimeout),
                            (n.removeTimeout = setTimeout(function () {
                              var t =
                                "dynamic" === n.options.mode ? "none" : "block";
                              (n.ui.el.style.display = t),
                                "function" == typeof e && e.call(n),
                                n.trigger("hidden", n.instance);
                            }, n.options.fadeTime)),
                            n.options.restJoystick &&
                              n.setPosition(e, { x: 0, y: 0 })),
                          n
                        );
                      }),
                      (_.prototype.setPosition = function (t, e) {
                        var n = this;
                        n.frontPosition = { x: e.x, y: e.y };
                        var o = n.options.fadeTime + "ms",
                          r = {};
                        r.front = s("transition", ["top", "left"], o);
                        var i = { front: {} };
                        (i.front = {
                          left: n.frontPosition.x + "px",
                          top: n.frontPosition.y + "px",
                        }),
                          n.applyStyles(r),
                          n.applyStyles(i),
                          (n.restTimeout = setTimeout(function () {
                            "function" == typeof t && t.call(n),
                              n.restCallback();
                          }, n.options.fadeTime));
                      }),
                      (_.prototype.restCallback = function () {
                        var t = {};
                        (t.front = s("transition", "none", "")),
                          this.applyStyles(t),
                          this.trigger("rested", this.instance);
                      }),
                      (_.prototype.resetDirection = function () {
                        this.direction = { x: !1, y: !1, angle: !1 };
                      }),
                      (_.prototype.computeDirection = function (t) {
                        var e,
                          n,
                          o,
                          r = t.angle.radian,
                          i = Math.PI / 4,
                          s = Math.PI / 2;
                        if (
                          (i < r && r < 3 * i && !t.lockX
                            ? (e = "up")
                            : -i < r && r <= i && !t.lockY
                            ? (e = "left")
                            : 3 * -i < r && r <= -i && !t.lockX
                            ? (e = "down")
                            : t.lockY || (e = "right"),
                          t.lockY || (n = -s < r && r < s ? "left" : "right"),
                          t.lockX || (o = 0 < r ? "up" : "down"),
                          t.force > this.options.threshold)
                        ) {
                          var a,
                            c = {};
                          for (a in this.direction)
                            this.direction.hasOwnProperty(a) &&
                              (c[a] = this.direction[a]);
                          var u = {};
                          for (a in ((this.direction = {
                            x: n,
                            y: o,
                            angle: e,
                          }),
                          (t.direction = this.direction),
                          c))
                            c[a] === this.direction[a] && (u[a] = !0);
                          if (u.x && u.y && u.angle) return t;
                          (u.x && u.y) || this.trigger("plain", t),
                            u.x || this.trigger("plain:" + n, t),
                            u.y || this.trigger("plain:" + o, t),
                            u.angle || this.trigger("dir dir:" + e, t);
                        } else this.resetDirection();
                        return t;
                      });
                    var g = _;
                    function b(t, e) {
                      return (
                        (this.nipples = []),
                        (this.idles = []),
                        (this.actives = []),
                        (this.ids = []),
                        (this.pressureIntervals = {}),
                        (this.manager = t),
                        (this.id = b.id),
                        (b.id += 1),
                        (this.defaults = {
                          zone: document.body,
                          multitouch: !1,
                          maxNumberOfNipples: 10,
                          mode: "dynamic",
                          position: { top: 0, left: 0 },
                          catchDistance: 200,
                          size: 100,
                          threshold: 0.1,
                          color: "white",
                          fadeTime: 250,
                          dataOnly: !1,
                          restJoystick: !0,
                          restOpacity: 0.5,
                          lockX: !1,
                          lockY: !1,
                          dynamicPage: !1,
                        }),
                        this.config(e),
                        ("static" !== this.options.mode &&
                          "semi" !== this.options.mode) ||
                          (this.options.multitouch = !1),
                        this.options.multitouch ||
                          (this.options.maxNumberOfNipples = 1),
                        this.updateBox(),
                        this.prepareNipples(),
                        this.bindings(),
                        this.begin(),
                        this.nipples
                      );
                    }
                    (b.prototype = new m()),
                      ((b.constructor = b).id = 0),
                      (b.prototype.prepareNipples = function () {
                        var o = this.nipples;
                        (o.on = this.on.bind(this)),
                          (o.off = this.off.bind(this)),
                          (o.options = this.options),
                          (o.destroy = this.destroy.bind(this)),
                          (o.ids = this.ids),
                          (o.id = this.id),
                          (o.processOnMove = this.processOnMove.bind(this)),
                          (o.processOnEnd = this.processOnEnd.bind(this)),
                          (o.get = function (t) {
                            if (void 0 === t) return o[0];
                            for (var e = 0, n = o.length; e < n; e += 1)
                              if (o[e].identifier === t) return o[e];
                            return !1;
                          });
                      }),
                      (b.prototype.bindings = function () {
                        this.bindEvt(this.options.zone, "start"),
                          (this.options.zone.style.touchAction = "none"),
                          (this.options.zone.style.msTouchAction = "none");
                      }),
                      (b.prototype.begin = function () {
                        var t = this.options;
                        if ("static" === t.mode) {
                          var e = this.createNipple(
                            t.position,
                            this.manager.getIdentifier()
                          );
                          e.add(), this.idles.push(e);
                        }
                      }),
                      (b.prototype.createNipple = function (t, e) {
                        var n = E(),
                          o = {},
                          r = this.options;
                        if (t.x && t.y)
                          o = {
                            x: t.x - (n.x + this.box.left),
                            y: t.y - (n.y + this.box.top),
                          };
                        else if (t.top || t.right || t.bottom || t.left) {
                          var i = document.createElement("DIV");
                          (i.style.display = "hidden"),
                            (i.style.top = t.top),
                            (i.style.right = t.right),
                            (i.style.bottom = t.bottom),
                            (i.style.left = t.left),
                            (i.style.position = "absolute"),
                            r.zone.appendChild(i);
                          var s = i.getBoundingClientRect();
                          r.zone.removeChild(i),
                            (o = t),
                            (t = { x: s.left + n.x, y: s.top + n.y });
                        }
                        var a = new g(this, {
                          color: r.color,
                          size: r.size,
                          threshold: r.threshold,
                          fadeTime: r.fadeTime,
                          dataOnly: r.dataOnly,
                          restJoystick: r.restJoystick,
                          restOpacity: r.restOpacity,
                          mode: r.mode,
                          identifier: e,
                          position: t,
                          zone: r.zone,
                          frontPosition: { x: 0, y: 0 },
                        });
                        return (
                          r.dataOnly ||
                            (B(a.ui.el, o), B(a.ui.front, a.frontPosition)),
                          this.nipples.push(a),
                          this.trigger("added " + a.identifier + ":added", a),
                          this.manager.trigger(
                            "added " + a.identifier + ":added",
                            a
                          ),
                          this.bindNipple(a),
                          a
                        );
                      }),
                      (b.prototype.updateBox = function () {
                        this.box = this.options.zone.getBoundingClientRect();
                      }),
                      (b.prototype.bindNipple = function (t) {
                        function e(t, e) {
                          (n = t.type + " " + e.id + ":" + t.type),
                            o.trigger(n, e);
                        }
                        var n,
                          o = this;
                        t.on("destroyed", o.onDestroyed.bind(o)),
                          t.on("shown hidden rested dir plain", e),
                          t.on("dir:up dir:right dir:down dir:left", e),
                          t.on("plain:up plain:right plain:down plain:left", e);
                      }),
                      (b.prototype.pressureFn = function (e, n, t) {
                        var o = this,
                          r = 0;
                        clearInterval(o.pressureIntervals[t]),
                          (o.pressureIntervals[t] = setInterval(
                            function () {
                              var t =
                                e.force || e.pressure || e.webkitForce || 0;
                              t !== r &&
                                (n.trigger("pressure", t),
                                o.trigger(
                                  "pressure " + n.identifier + ":pressure",
                                  t
                                ),
                                (r = t));
                            }.bind(o),
                            100
                          ));
                      }),
                      (b.prototype.onstart = function (n) {
                        var o = this,
                          e = o.options,
                          r = n;
                        return (
                          (n = i(n)),
                          o.updateBox(),
                          c(n, function (t) {
                            o.actives.length < e.maxNumberOfNipples
                              ? o.processOnStart(t)
                              : r.type.match(/^touch/) &&
                                (Object.keys(o.manager.ids).forEach(function (
                                  e
                                ) {
                                  if (
                                    Object.values(r.touches).findIndex(
                                      function (t) {
                                        return t.identifier === e;
                                      }
                                    ) < 0
                                  ) {
                                    var t = [n[0]];
                                    (t.identifier = e), o.processOnEnd(t);
                                  }
                                }),
                                o.actives.length < e.maxNumberOfNipples &&
                                  o.processOnStart(t));
                          }),
                          o.manager.bindDocument(),
                          !1
                        );
                      }),
                      (b.prototype.processOnStart = function (e) {
                        var t,
                          n = this,
                          o = n.options,
                          r = n.manager.getIdentifier(e),
                          i = e.force || e.pressure || e.webkitForce || 0,
                          s = { x: e.pageX, y: e.pageY },
                          a = n.getOrCreate(r, s);
                        a.identifier !== r &&
                          n.manager.removeIdentifier(a.identifier),
                          (a.identifier = r);
                        function c(t) {
                          t.trigger("start", t),
                            n.trigger("start " + t.id + ":start", t),
                            t.show(),
                            0 < i && n.pressureFn(e, t, t.identifier),
                            n.processOnMove(e);
                        }
                        if (
                          (0 <= (t = n.idles.indexOf(a)) &&
                            n.idles.splice(t, 1),
                          n.actives.push(a),
                          n.ids.push(a.identifier),
                          "semi" !== o.mode)
                        )
                          c(a);
                        else {
                          if (!(D(s, a.position) <= o.catchDistance))
                            return a.destroy(), void n.processOnStart(e);
                          c(a);
                        }
                        return a;
                      }),
                      (b.prototype.getOrCreate = function (t, e) {
                        var n,
                          o = this.options;
                        return /(semi|static)/.test(o.mode)
                          ? (n = this.idles[0])
                            ? (this.idles.splice(0, 1), n)
                            : "semi" === o.mode
                            ? this.createNipple(e, t)
                            : (console.warn("Coudln't find the needed nipple."),
                              !1)
                          : (n = this.createNipple(e, t));
                      }),
                      (b.prototype.processOnMove = function (t) {
                        var e,
                          n = this.options,
                          o = this.manager.getIdentifier(t),
                          r = this.nipples.get(o);
                        if (
                          ((e = t),
                          isNaN(e.buttons) ? 0 !== e.pressure : 0 !== e.buttons)
                        ) {
                          if (!r)
                            return (
                              console.error(
                                "Found zombie joystick with ID " + o
                              ),
                              void this.manager.removeIdentifier(o)
                            );
                          if (n.dynamicPage) {
                            var i = E();
                            (a = r.el.getBoundingClientRect()),
                              (r.position = {
                                x: i.x + a.left,
                                y: i.y + a.top,
                              });
                          }
                          r.identifier = o;
                          var s = r.options.size / 2,
                            a = { x: t.pageX, y: t.pageY };
                          n.lockX && (a.y = r.position.y),
                            n.lockY && (a.x = r.position.x);
                          var c,
                            u,
                            l,
                            d,
                            f,
                            p,
                            h,
                            v = D(a, r.position),
                            y =
                              ((u = (c = r.position).x - a.x),
                              (l = c.y - a.y),
                              Math.atan2(l, u) * (180 / Math.PI)),
                            m = k(y),
                            _ = v / s,
                            g = { distance: v, position: a };
                          s < v &&
                            ((v = s),
                            (d = r.position),
                            (f = v),
                            (h = { x: 0, y: 0 }),
                            (p = k((p = y))),
                            (h.x = d.x - f * Math.cos(p)),
                            (h.y = d.y - f * Math.sin(p)),
                            (a = h));
                          var b = a.x - r.position.x,
                            w = a.y - r.position.y;
                          (r.frontPosition = { x: b, y: w }),
                            n.dataOnly || B(r.ui.front, r.frontPosition);
                          var x = {
                            identifier: r.identifier,
                            position: a,
                            force: _,
                            pressure:
                              t.force || t.pressure || t.webkitForce || 0,
                            distance: v,
                            angle: { radian: m, degree: y },
                            vector: { x: b / s, y: -w / s },
                            raw: g,
                            instance: r,
                            lockX: n.lockX,
                            lockY: n.lockY,
                          };
                          ((x = r.computeDirection(x)).angle = {
                            radian: k(180 - y),
                            degree: 180 - y,
                          }),
                            r.trigger("move", x),
                            this.trigger("move " + r.id + ":move", x);
                        } else this.processOnEnd(t);
                      }),
                      (b.prototype.processOnEnd = function (t) {
                        var e = this,
                          n = e.options,
                          o = e.manager.getIdentifier(t),
                          r = e.nipples.get(o),
                          i = e.manager.removeIdentifier(r.identifier);
                        r &&
                          (n.dataOnly ||
                            r.hide(function () {
                              "dynamic" === n.mode &&
                                (r.trigger("removed", r),
                                e.trigger("removed " + r.id + ":removed", r),
                                e.manager.trigger(
                                  "removed " + r.id + ":removed",
                                  r
                                ),
                                r.destroy());
                            }),
                          clearInterval(e.pressureIntervals[r.identifier]),
                          r.resetDirection(),
                          r.trigger("end", r),
                          e.trigger("end " + r.id + ":end", r),
                          0 <= e.ids.indexOf(r.identifier) &&
                            e.ids.splice(e.ids.indexOf(r.identifier), 1),
                          0 <= e.actives.indexOf(r) &&
                            e.actives.splice(e.actives.indexOf(r), 1),
                          /(semi|static)/.test(n.mode)
                            ? e.idles.push(r)
                            : 0 <= e.nipples.indexOf(r) &&
                              e.nipples.splice(e.nipples.indexOf(r), 1),
                          e.manager.unbindDocument(),
                          /(semi|static)/.test(n.mode) &&
                            (e.manager.ids[i.id] = i.identifier));
                      }),
                      (b.prototype.onDestroyed = function (t, e) {
                        0 <= this.nipples.indexOf(e) &&
                          this.nipples.splice(this.nipples.indexOf(e), 1),
                          0 <= this.actives.indexOf(e) &&
                            this.actives.splice(this.actives.indexOf(e), 1),
                          0 <= this.idles.indexOf(e) &&
                            this.idles.splice(this.idles.indexOf(e), 1),
                          0 <= this.ids.indexOf(e.identifier) &&
                            this.ids.splice(this.ids.indexOf(e.identifier), 1),
                          this.manager.removeIdentifier(e.identifier),
                          this.manager.unbindDocument();
                      }),
                      (b.prototype.destroy = function () {
                        for (var t in (this.unbindEvt(
                          this.options.zone,
                          "start"
                        ),
                        this.nipples.forEach(function (t) {
                          t.destroy();
                        }),
                        this.pressureIntervals))
                          this.pressureIntervals.hasOwnProperty(t) &&
                            clearInterval(this.pressureIntervals[t]);
                        this.trigger("destroyed", this.nipples),
                          this.manager.unbindDocument(),
                          this.off();
                      });
                    var w = b;
                    function x(t) {
                      var e,
                        o = this;
                      return (
                        (o.ids = {}),
                        (o.index = 0),
                        (o.collections = []),
                        o.config(t),
                        o.prepareCollections(),
                        r(window, "resize", function (t) {
                          clearTimeout(e),
                            (e = setTimeout(function () {
                              var e,
                                n = E();
                              o.collections.forEach(function (t) {
                                t.forEach(function (t) {
                                  (e = t.el.getBoundingClientRect()),
                                    (t.position = {
                                      x: n.x + e.left,
                                      y: n.y + e.top,
                                    });
                                });
                              });
                            }, 100));
                        }),
                        o.collections
                      );
                    }
                    (x.prototype = new m()),
                      ((x.constructor = x).prototype.prepareCollections =
                        function () {
                          var t = this;
                          (t.collections.create = t.create.bind(t)),
                            (t.collections.on = t.on.bind(t)),
                            (t.collections.off = t.off.bind(t)),
                            (t.collections.destroy = t.destroy.bind(t)),
                            (t.collections.get = function (e) {
                              var n;
                              return (
                                t.collections.every(function (t) {
                                  return !(n = t.get(e));
                                }),
                                n
                              );
                            });
                        }),
                      (x.prototype.create = function (t) {
                        return this.createCollection(t);
                      }),
                      (x.prototype.createCollection = function (t) {
                        var e = new w(this, t);
                        return (
                          this.bindCollection(e), this.collections.push(e), e
                        );
                      }),
                      (x.prototype.bindCollection = function (t) {
                        function e(t, e) {
                          (n = t.type + " " + e.id + ":" + t.type),
                            o.trigger(n, e);
                        }
                        var n,
                          o = this;
                        t.on("destroyed", o.onDestroyed.bind(o)),
                          t.on("shown hidden rested dir plain", e),
                          t.on("dir:up dir:right dir:down dir:left", e),
                          t.on("plain:up plain:right plain:down plain:left", e);
                      }),
                      (x.prototype.bindDocument = function () {
                        this.binded ||
                          (this.bindEvt(document, "move").bindEvt(
                            document,
                            "end"
                          ),
                          (this.binded = !0));
                      }),
                      (x.prototype.unbindDocument = function (t) {
                        (Object.keys(this.ids).length && !0 !== t) ||
                          (this.unbindEvt(document, "move").unbindEvt(
                            document,
                            "end"
                          ),
                          (this.binded = !1));
                      }),
                      (x.prototype.getIdentifier = function (t) {
                        var e;
                        return (
                          t
                            ? void 0 ===
                                (e =
                                  void 0 === t.identifier
                                    ? t.pointerId
                                    : t.identifier) && (e = this.latest || 0)
                            : (e = this.index),
                          void 0 === this.ids[e] &&
                            ((this.ids[e] = this.index), (this.index += 1)),
                          (this.latest = e),
                          this.ids[e]
                        );
                      }),
                      (x.prototype.removeIdentifier = function (t) {
                        var e = {};
                        for (var n in this.ids)
                          if (this.ids[n] === t) {
                            (e.id = n),
                              (e.identifier = this.ids[n]),
                              delete this.ids[n];
                            break;
                          }
                        return e;
                      }),
                      (x.prototype.onmove = function (t) {
                        return this.onAny("move", t), !1;
                      }),
                      (x.prototype.onend = function (t) {
                        return this.onAny("end", t), !1;
                      }),
                      (x.prototype.oncancel = function (t) {
                        return this.onAny("end", t), !1;
                      }),
                      (x.prototype.onAny = function (t, e) {
                        var n,
                          o = this,
                          r =
                            "processOn" +
                            t.charAt(0).toUpperCase() +
                            t.slice(1);
                        return (
                          (e = i(e)),
                          c(e, function (t) {
                            (n = o.getIdentifier(t)),
                              c(
                                o.collections,
                                function (t, e, n) {
                                  0 <= n.ids.indexOf(e) &&
                                    (n[r](t), (t._found_ = !0));
                                }.bind(null, t, n)
                              ),
                              t._found_ || o.removeIdentifier(n);
                          }),
                          !1
                        );
                      }),
                      (x.prototype.destroy = function () {
                        this.unbindDocument(!0),
                          (this.ids = {}),
                          (this.index = 0),
                          this.collections.forEach(function (t) {
                            t.destroy();
                          }),
                          this.off();
                      }),
                      (x.prototype.onDestroyed = function (t, e) {
                        if (this.collections.indexOf(e) < 0) return !1;
                        this.collections.splice(this.collections.indexOf(e), 1);
                      });
                    var j = new x();
                    e.default = {
                      create: function (t) {
                        return j.create(t);
                      },
                      factory: j,
                    };
                  },
                ]),
              (r.c = o),
              (r.d = function (t, e, n) {
                r.o(t, e) ||
                  Object.defineProperty(t, e, { enumerable: !0, get: n });
              }),
              (r.r = function (t) {
                "undefined" != typeof Symbol &&
                  Symbol.toStringTag &&
                  Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module",
                  }),
                  Object.defineProperty(t, "__esModule", { value: !0 });
              }),
              (r.t = function (e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule)
                  return e;
                var n = Object.create(null);
                if (
                  (r.r(n),
                  Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e,
                  }),
                  2 & t && "string" != typeof e)
                )
                  for (var o in e)
                    r.d(
                      n,
                      o,
                      function (t) {
                        return e[t];
                      }.bind(null, o)
                    );
                return n;
              }),
              (r.n = function (t) {
                var e =
                  t && t.__esModule
                    ? function () {
                        return t.default;
                      }
                    : function () {
                        return t;
                      };
                return r.d(e, "a", e), e;
              }),
              (r.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
              }),
              (r.p = ""),
              r((r.s = 0)).default
            );
            function r(t) {
              if (o[t]) return o[t].exports;
              var e = (o[t] = { i: t, l: !1, exports: {} });
              return (
                n[t].call(e.exports, e, e.exports, r), (e.l = !0), e.exports
              );
            }
            var n, o;
          }),
          "object" == typeof n && "object" == typeof e
            ? (e.exports = r())
            : "function" == typeof define && define.amd
            ? define("nipplejs", [], r)
            : "object" == typeof n
            ? (n.nipplejs = r())
            : (o.nipplejs = r());
      },
      {},
    ],
    129: [
      function (t, e, y) {
        "use strict";
        Object.defineProperty(y, "__esModule", { value: !0 });
        var n,
          r = function () {
            return (r =
              Object.assign ||
              function (t) {
                for (var e, n = 1, o = arguments.length; n < o; n++)
                  for (var r in (e = arguments[n]))
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t;
              }).apply(this, arguments);
          },
          i =
            ((o.prototype.on = function (t, e) {
              var n = this.listeners[t] || [];
              this.listeners[t] = n.concat([e]);
            }),
            (o.prototype.triggerEvent = function (t, e) {
              var n = this;
              (this.listeners[t] || []).forEach(function (t) {
                return t({ target: n, event: e });
              });
            }),
            o);
        function o(t) {
          (this.options = t), (this.listeners = {});
        }
        ((n = y.NotyfArrayEvent || (y.NotyfArrayEvent = {}))[(n.Add = 0)] =
          "Add"),
          (n[(n.Remove = 1)] = "Remove");
        var s,
          a =
            ((c.prototype.push = function (t) {
              this.notifications.push(t),
                this.updateFn(t, y.NotyfArrayEvent.Add, this.notifications);
            }),
            (c.prototype.splice = function (t, e) {
              var n = this.notifications.splice(t, e)[0];
              return (
                this.updateFn(n, y.NotyfArrayEvent.Remove, this.notifications),
                n
              );
            }),
            (c.prototype.indexOf = function (t) {
              return this.notifications.indexOf(t);
            }),
            (c.prototype.onUpdate = function (t) {
              this.updateFn = t;
            }),
            c);
        function c() {
          this.notifications = [];
        }
        (s = y.NotyfEvent || (y.NotyfEvent = {})).Dismiss = "dismiss";
        var u = {
            types: [
              {
                type: "success",
                className: "notyf__toast--success",
                backgroundColor: "#3dc763",
                icon: { className: "notyf__icon--success", tagName: "i" },
              },
              {
                type: "error",
                className: "notyf__toast--error",
                backgroundColor: "#ed3d3d",
                icon: { className: "notyf__icon--error", tagName: "i" },
              },
            ],
            duration: 2e3,
            ripple: !0,
            position: { x: "right", y: "bottom" },
            dismissible: !(s.Click = "click"),
          },
          l =
            ((d.prototype.on = function (t, e) {
              var n;
              this.events = r(r({}, this.events), (((n = {})[t] = e), n));
            }),
            (d.prototype.update = function (t, e) {
              e === y.NotyfArrayEvent.Add
                ? this.addNotification(t)
                : e === y.NotyfArrayEvent.Remove && this.removeNotification(t);
            }),
            (d.prototype.removeNotification = function (t) {
              var e,
                n,
                o = this,
                r = this._popRenderedNotification(t);
              r &&
                ((e = r.node).classList.add("notyf__toast--disappear"),
                e.addEventListener(
                  this.animationEndEventName,
                  (n = function (t) {
                    t.target === e &&
                      (e.removeEventListener(o.animationEndEventName, n),
                      o.container.removeChild(e));
                  })
                ));
            }),
            (d.prototype.addNotification = function (t) {
              var e = this._renderNotification(t);
              this.notifications.push({ notification: t, node: e }),
                this._announce(t.options.message || "Notification");
            }),
            (d.prototype._renderNotification = function (t) {
              var e,
                n = this._buildNotificationCard(t),
                o = t.options.className;
              return (
                o && (e = n.classList).add.apply(e, o.split(" ")),
                this.container.appendChild(n),
                n
              );
            }),
            (d.prototype._popRenderedNotification = function (t) {
              for (
                var e = -1, n = 0;
                n < this.notifications.length && e < 0;
                n++
              )
                this.notifications[n].notification === t && (e = n);
              if (-1 !== e) return this.notifications.splice(e, 1)[0];
            }),
            (d.prototype.getXPosition = function (t) {
              var e;
              return (
                (null === (e = null == t ? void 0 : t.position) || void 0 === e
                  ? void 0
                  : e.x) || "right"
              );
            }),
            (d.prototype.getYPosition = function (t) {
              var e;
              return (
                (null === (e = null == t ? void 0 : t.position) || void 0 === e
                  ? void 0
                  : e.y) || "bottom"
              );
            }),
            (d.prototype.adjustContainerAlignment = function (t) {
              var e = this.X_POSITION_FLEX_MAP[this.getXPosition(t)],
                n = this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],
                o = this.container.style;
              o.setProperty("justify-content", n),
                o.setProperty("align-items", e);
            }),
            (d.prototype._buildNotificationCard = function (o) {
              var t,
                r = this,
                e = o.options,
                n = e.icon;
              this.adjustContainerAlignment(e);
              var i = this._createHTLMElement({
                  tagName: "div",
                  className: "notyf__toast",
                }),
                s = this._createHTLMElement({
                  tagName: "div",
                  className: "notyf__ripple",
                }),
                a = this._createHTLMElement({
                  tagName: "div",
                  className: "notyf__wrapper",
                }),
                c = this._createHTLMElement({
                  tagName: "div",
                  className: "notyf__message",
                });
              c.innerHTML = e.message || "";
              var u = e.background || e.backgroundColor;
              if (n && "object" == typeof n) {
                var l = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__icon",
                  }),
                  d = this._createHTLMElement({
                    tagName: n.tagName || "i",
                    className: n.className,
                    text: n.text,
                  }),
                  f = null !== (t = n.color) && void 0 !== t ? t : u;
                f && (d.style.color = f), l.appendChild(d), a.appendChild(l);
              }
              if (
                (a.appendChild(c),
                i.appendChild(a),
                u &&
                  (e.ripple
                    ? ((s.style.background = u), i.appendChild(s))
                    : (i.style.background = u)),
                e.dismissible)
              ) {
                var p = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__dismiss",
                  }),
                  h = this._createHTLMElement({
                    tagName: "button",
                    className: "notyf__dismiss-btn",
                  });
                p.appendChild(h),
                  a.appendChild(p),
                  i.classList.add("notyf__toast--dismissible"),
                  h.addEventListener("click", function (t) {
                    var e, n;
                    null !== (n = (e = r.events)[y.NotyfEvent.Dismiss]) &&
                      void 0 !== n &&
                      n.call(e, { target: o, event: t }),
                      t.stopPropagation();
                  });
              }
              i.addEventListener("click", function (t) {
                var e, n;
                return null === (n = (e = r.events)[y.NotyfEvent.Click]) ||
                  void 0 === n
                  ? void 0
                  : n.call(e, { target: o, event: t });
              });
              var v = "top" === this.getYPosition(e) ? "upper" : "lower";
              return i.classList.add("notyf__toast--" + v), i;
            }),
            (d.prototype._createHTLMElement = function (t) {
              var e = t.tagName,
                n = t.className,
                o = t.text,
                r = document.createElement(e);
              return n && (r.className = n), (r.textContent = o || null), r;
            }),
            (d.prototype._createA11yContainer = function () {
              var t = this._createHTLMElement({
                tagName: "div",
                className: "notyf-announcer",
              });
              t.setAttribute("aria-atomic", "true"),
                t.setAttribute("aria-live", "polite"),
                (t.style.border = "0"),
                (t.style.clip = "rect(0 0 0 0)"),
                (t.style.height = "1px"),
                (t.style.margin = "-1px"),
                (t.style.overflow = "hidden"),
                (t.style.padding = "0"),
                (t.style.position = "absolute"),
                (t.style.width = "1px"),
                (t.style.outline = "0"),
                document.body.appendChild(t),
                (this.a11yContainer = t);
            }),
            (d.prototype._announce = function (t) {
              var e = this;
              (this.a11yContainer.textContent = ""),
                setTimeout(function () {
                  e.a11yContainer.textContent = t;
                }, 100);
            }),
            (d.prototype._getAnimationEndEventName = function () {
              var t,
                e = document.createElement("_fake"),
                n = {
                  MozTransition: "animationend",
                  OTransition: "oAnimationEnd",
                  WebkitTransition: "webkitAnimationEnd",
                  transition: "animationend",
                };
              for (t in n) if (void 0 !== e.style[t]) return n[t];
              return "animationend";
            }),
            d);
        function d() {
          (this.notifications = []),
            (this.events = {}),
            (this.X_POSITION_FLEX_MAP = {
              left: "flex-start",
              center: "center",
              right: "flex-end",
            }),
            (this.Y_POSITION_FLEX_MAP = {
              top: "flex-start",
              center: "center",
              bottom: "flex-end",
            });
          var t = document.createDocumentFragment(),
            e = this._createHTLMElement({ tagName: "div", className: "notyf" });
          t.appendChild(e),
            document.body.appendChild(t),
            (this.container = e),
            (this.animationEndEventName = this._getAnimationEndEventName()),
            this._createA11yContainer();
        }
        var f =
          ((p.prototype.error = function (t) {
            var e = this.normalizeOptions("error", t);
            return this.open(e);
          }),
          (p.prototype.success = function (t) {
            var e = this.normalizeOptions("success", t);
            return this.open(e);
          }),
          (p.prototype.open = function (e) {
            var t =
                this.options.types.find(function (t) {
                  return t.type === e.type;
                }) || {},
              n = r(r({}, t), e);
            this.assignProps(["ripple", "position", "dismissible"], n);
            var o = new i(n);
            return this._pushNotification(o), o;
          }),
          (p.prototype.dismissAll = function () {
            for (; this.notifications.splice(0, 1); );
          }),
          (p.prototype.assignProps = function (t, e) {
            var n = this;
            t.forEach(function (t) {
              e[t] = null == e[t] ? n.options[t] : e[t];
            });
          }),
          (p.prototype._pushNotification = function (t) {
            var e = this;
            this.notifications.push(t);
            var n =
              void 0 !== t.options.duration
                ? t.options.duration
                : this.options.duration;
            n &&
              setTimeout(function () {
                return e._removeNotification(t);
              }, n);
          }),
          (p.prototype._removeNotification = function (t) {
            var e = this.notifications.indexOf(t);
            -1 !== e && this.notifications.splice(e, 1);
          }),
          (p.prototype.normalizeOptions = function (t, e) {
            var n = { type: t };
            return (
              "string" == typeof e
                ? (n.message = e)
                : "object" == typeof e && (n = r(r({}, n), e)),
              n
            );
          }),
          (p.prototype.registerTypes = function (t) {
            var e = ((t && t.types) || []).slice();
            return u.types
              .map(function (n) {
                var o = -1;
                e.forEach(function (t, e) {
                  t.type === n.type && (o = e);
                });
                var t = -1 !== o ? e.splice(o, 1)[0] : {};
                return r(r({}, n), t);
              })
              .concat(e);
          }),
          p);
        function p(t) {
          var o = this;
          (this.dismiss = this._removeNotification),
            (this.notifications = new a()),
            (this.view = new l());
          var e = this.registerTypes(t);
          (this.options = r(r({}, u), t)),
            (this.options.types = e),
            this.notifications.onUpdate(function (t, e) {
              return o.view.update(t, e);
            }),
            this.view.on(y.NotyfEvent.Dismiss, function (t) {
              var e = t.target,
                n = t.event;
              o._removeNotification(e), e.triggerEvent(y.NotyfEvent.Dismiss, n);
            }),
            this.view.on(y.NotyfEvent.Click, function (t) {
              var e = t.target,
                n = t.event;
              return e.triggerEvent(y.NotyfEvent.Click, n);
            });
        }
        (y.DEFAULT_OPTIONS = u),
          (y.Notyf = f),
          (y.NotyfArray = a),
          (y.NotyfNotification = i),
          (y.NotyfView = l);
      },
      {},
    ],
    130: [
      function (t, e, n) {
        var o = (function (s) {
          "use strict";
          var c,
            t = Object.prototype,
            l = t.hasOwnProperty,
            e = "function" == typeof Symbol ? Symbol : {},
            r = e.iterator || "@@iterator",
            n = e.asyncIterator || "@@asyncIterator",
            o = e.toStringTag || "@@toStringTag";
          function a(t, e, n, o) {
            var i,
              s,
              a,
              c,
              r = e && e.prototype instanceof m ? e : m,
              u = Object.create(r.prototype),
              l = new j(o || []);
            return (
              (u._invoke =
                ((i = t),
                (s = n),
                (a = l),
                (c = f),
                function (t, e) {
                  if (c === h) throw new Error("Generator is already running");
                  if (c === v) {
                    if ("throw" === t) throw e;
                    return C();
                  }
                  for (a.method = t, a.arg = e; ; ) {
                    var n = a.delegate;
                    if (n) {
                      var o = k(n, a);
                      if (o) {
                        if (o === y) continue;
                        return o;
                      }
                    }
                    if ("next" === a.method) a.sent = a._sent = a.arg;
                    else if ("throw" === a.method) {
                      if (c === f) throw ((c = v), a.arg);
                      a.dispatchException(a.arg);
                    } else "return" === a.method && a.abrupt("return", a.arg);
                    c = h;
                    var r = d(i, s, a);
                    if ("normal" === r.type) {
                      if (((c = a.done ? v : p), r.arg === y)) continue;
                      return { value: r.arg, done: a.done };
                    }
                    "throw" === r.type &&
                      ((c = v), (a.method = "throw"), (a.arg = r.arg));
                  }
                })),
              u
            );
          }
          function d(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          s.wrap = a;
          var f = "suspendedStart",
            p = "suspendedYield",
            h = "executing",
            v = "completed",
            y = {};
          function m() {}
          function i() {}
          function u() {}
          var _ = {};
          _[r] = function () {
            return this;
          };
          var g = Object.getPrototypeOf,
            b = g && g(g(K([])));
          b && b !== t && l.call(b, r) && (_ = b);
          var w = (u.prototype = m.prototype = Object.create(_));
          function x(t) {
            ["next", "throw", "return"].forEach(function (e) {
              t[e] = function (t) {
                return this._invoke(e, t);
              };
            });
          }
          function D(c, u) {
            var e;
            this._invoke = function (n, o) {
              function t() {
                return new u(function (t, e) {
                  !(function e(t, n, o, r) {
                    var i = d(c[t], c, n);
                    if ("throw" !== i.type) {
                      var s = i.arg,
                        a = s.value;
                      return a && "object" == typeof a && l.call(a, "__await")
                        ? u.resolve(a.__await).then(
                            function (t) {
                              e("next", t, o, r);
                            },
                            function (t) {
                              e("throw", t, o, r);
                            }
                          )
                        : u.resolve(a).then(
                            function (t) {
                              (s.value = t), o(s);
                            },
                            function (t) {
                              return e("throw", t, o, r);
                            }
                          );
                    }
                    r(i.arg);
                  })(n, o, t, e);
                });
              }
              return (e = e ? e.then(t, t) : t());
            };
          }
          function k(t, e) {
            var n = t.iterator[e.method];
            if (n === c) {
              if (((e.delegate = null), "throw" === e.method)) {
                if (
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = c),
                  k(t, e),
                  "throw" === e.method)
                )
                  return y;
                (e.method = "throw"),
                  (e.arg = new TypeError(
                    "The iterator does not provide a 'throw' method"
                  ));
              }
              return y;
            }
            var o = d(n, t.iterator, e.arg);
            if ("throw" === o.type)
              return (
                (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), y
              );
            var r = o.arg;
            return r
              ? r.done
                ? ((e[t.resultName] = r.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method && ((e.method = "next"), (e.arg = c)),
                  (e.delegate = null),
                  y)
                : r
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                y);
          }
          function E(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function B(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function j(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(E, this),
              this.reset(!0);
          }
          function K(e) {
            if (e) {
              var t = e[r];
              if (t) return t.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var n = -1,
                  o = function t() {
                    for (; ++n < e.length; )
                      if (l.call(e, n))
                        return (t.value = e[n]), (t.done = !1), t;
                    return (t.value = c), (t.done = !0), t;
                  };
                return (o.next = o);
              }
            }
            return { next: C };
          }
          function C() {
            return { value: c, done: !0 };
          }
          return (
            (i.prototype = w.constructor = u),
            (u.constructor = i),
            (u[o] = i.displayName = "GeneratorFunction"),
            (s.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === i || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (s.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, u)
                  : ((t.__proto__ = u), o in t || (t[o] = "GeneratorFunction")),
                (t.prototype = Object.create(w)),
                t
              );
            }),
            (s.awrap = function (t) {
              return { __await: t };
            }),
            x(D.prototype),
            (D.prototype[n] = function () {
              return this;
            }),
            (s.AsyncIterator = D),
            (s.async = function (t, e, n, o, r) {
              void 0 === r && (r = Promise);
              var i = new D(a(t, e, n, o), r);
              return s.isGeneratorFunction(e)
                ? i
                : i.next().then(function (t) {
                    return t.done ? t.value : i.next();
                  });
            }),
            x(w),
            (w[o] = "Generator"),
            (w[r] = function () {
              return this;
            }),
            (w.toString = function () {
              return "[object Generator]";
            }),
            (s.keys = function (n) {
              var o = [];
              for (var t in n) o.push(t);
              return (
                o.reverse(),
                function t() {
                  for (; o.length; ) {
                    var e = o.pop();
                    if (e in n) return (t.value = e), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (s.values = K),
            (j.prototype = {
              constructor: j,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = c),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = c),
                  this.tryEntries.forEach(B),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      l.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = c);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (n) {
                if (this.done) throw n;
                var o = this;
                function t(t, e) {
                  return (
                    (i.type = "throw"),
                    (i.arg = n),
                    (o.next = t),
                    e && ((o.method = "next"), (o.arg = c)),
                    !!e
                  );
                }
                for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                  var r = this.tryEntries[e],
                    i = r.completion;
                  if ("root" === r.tryLoc) return t("end");
                  if (r.tryLoc <= this.prev) {
                    var s = l.call(r, "catchLoc"),
                      a = l.call(r, "finallyLoc");
                    if (s && a) {
                      if (this.prev < r.catchLoc) return t(r.catchLoc, !0);
                      if (this.prev < r.finallyLoc) return t(r.finallyLoc);
                    } else if (s) {
                      if (this.prev < r.catchLoc) return t(r.catchLoc, !0);
                    } else {
                      if (!a)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < r.finallyLoc) return t(r.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    l.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var r = o;
                    break;
                  }
                }
                r &&
                  ("break" === t || "continue" === t) &&
                  r.tryLoc <= e &&
                  e <= r.finallyLoc &&
                  (r = null);
                var i = r ? r.completion : {};
                return (
                  (i.type = t),
                  (i.arg = e),
                  r
                    ? ((this.method = "next"), (this.next = r.finallyLoc), y)
                    : this.complete(i)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  y
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), B(n), y;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var o = n.completion;
                    if ("throw" === o.type) {
                      var r = o.arg;
                      B(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, n) {
                return (
                  (this.delegate = {
                    iterator: K(t),
                    resultName: e,
                    nextLoc: n,
                  }),
                  "next" === this.method && (this.arg = c),
                  y
                );
              },
            }),
            s
          );
        })("object" == typeof e ? e.exports : {});
        try {
          regeneratorRuntime = o;
        } catch (t) {
          Function("r", "regeneratorRuntime = r")(o);
        }
      },
      {},
    ],
    131: [
      function (t, e, n) {
        var o, r;
        (o = this),
          (r = function () {
            return (
              (o = {}),
              (r.m = n =
                [
                  function (t, e, n) {
                    t.exports = n(1);
                  },
                  function (t, e, n) {
                    "use strict";
                    function c(t, e) {
                      (null == e || e > t.length) && (e = t.length);
                      for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
                      return o;
                    }
                    function a(t) {
                      return (a =
                        "function" == typeof Symbol &&
                        "symbol" == typeof Symbol.iterator
                          ? function (t) {
                              return typeof t;
                            }
                          : function (t) {
                              return t &&
                                "function" == typeof Symbol &&
                                t.constructor === Symbol &&
                                t !== Symbol.prototype
                                ? "symbol"
                                : typeof t;
                            })(t);
                    }
                    function o(t, e) {
                      for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        (o.enumerable = o.enumerable || !1),
                          (o.configurable = !0),
                          "value" in o && (o.writable = !0),
                          Object.defineProperty(t, o.key, o);
                      }
                    }
                    n.r(e);
                    var r,
                      i,
                      s,
                      u,
                      l =
                        ((u = [
                          {
                            key: "bindMethods",
                            value: function (t, e) {
                              var n,
                                o = (function (t, e) {
                                  var n;
                                  if (
                                    "undefined" == typeof Symbol ||
                                    null == t[Symbol.iterator]
                                  ) {
                                    if (
                                      Array.isArray(t) ||
                                      (n = (function (t) {
                                        if (t) {
                                          if ("string" == typeof t)
                                            return c(t, void 0);
                                          var e = Object.prototype.toString
                                            .call(t)
                                            .slice(8, -1);
                                          return (
                                            "Object" === e &&
                                              t.constructor &&
                                              (e = t.constructor.name),
                                            "Map" === e || "Set" === e
                                              ? Array.from(t)
                                              : "Arguments" === e ||
                                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                                  e
                                                )
                                              ? c(t, void 0)
                                              : void 0
                                          );
                                        }
                                      })(t)) ||
                                      (e && t && "number" == typeof t.length)
                                    ) {
                                      n && (t = n);
                                      var o = 0,
                                        r = function () {};
                                      return {
                                        s: r,
                                        n: function () {
                                          return o >= t.length
                                            ? { done: !0 }
                                            : { done: !1, value: t[o++] };
                                        },
                                        e: function (t) {
                                          throw t;
                                        },
                                        f: r,
                                      };
                                    }
                                    throw new TypeError(
                                      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                                    );
                                  }
                                  var i,
                                    s = !0,
                                    a = !1;
                                  return {
                                    s: function () {
                                      n = t[Symbol.iterator]();
                                    },
                                    n: function () {
                                      var t = n.next();
                                      return (s = t.done), t;
                                    },
                                    e: function (t) {
                                      (a = !0), (i = t);
                                    },
                                    f: function () {
                                      try {
                                        s || null == n.return || n.return();
                                      } finally {
                                        if (a) throw i;
                                      }
                                    },
                                  };
                                })(Object.getOwnPropertyNames(t.prototype));
                              try {
                                for (o.s(); !(n = o.n()).done; ) {
                                  var r = n.value;
                                  "constructor" === r ||
                                    "bindMethods" === r ||
                                    (e[r] = e[r].bind(e));
                                }
                              } catch (t) {
                                o.e(t);
                              } finally {
                                o.f();
                              }
                            },
                          },
                        ]),
                        o((s = d).prototype, [
                          {
                            key: "getButtonClass",
                            value: function (t) {
                              var e =
                                  t.includes("{") &&
                                  t.includes("}") &&
                                  "{//}" !== t
                                    ? "functionBtn"
                                    : "standardBtn",
                                n = t.replace("{", "").replace("}", ""),
                                o = "";
                              return (
                                "standardBtn" != e &&
                                  (o = " hg-button-".concat(n)),
                                "hg-".concat(e).concat(o)
                              );
                            },
                          },
                          {
                            key: "getDefaultDiplay",
                            value: function () {
                              return {
                                "{bksp}": "backspace",
                                "{backspace}": "backspace",
                                "{enter}": "< enter",
                                "{shift}": "shift",
                                "{shiftleft}": "shift",
                                "{shiftright}": "shift",
                                "{alt}": "alt",
                                "{s}": "shift",
                                "{tab}": "tab",
                                "{lock}": "caps",
                                "{capslock}": "caps",
                                "{accept}": "Submit",
                                "{space}": " ",
                                "{//}": " ",
                                "{esc}": "esc",
                                "{escape}": "esc",
                                "{f1}": "f1",
                                "{f2}": "f2",
                                "{f3}": "f3",
                                "{f4}": "f4",
                                "{f5}": "f5",
                                "{f6}": "f6",
                                "{f7}": "f7",
                                "{f8}": "f8",
                                "{f9}": "f9",
                                "{f10}": "f10",
                                "{f11}": "f11",
                                "{f12}": "f12",
                                "{numpaddivide}": "/",
                                "{numlock}": "lock",
                                "{arrowup}": "↑",
                                "{arrowleft}": "←",
                                "{arrowdown}": "↓",
                                "{arrowright}": "→",
                                "{prtscr}": "print",
                                "{scrolllock}": "scroll",
                                "{pause}": "pause",
                                "{insert}": "ins",
                                "{home}": "home",
                                "{pageup}": "up",
                                "{delete}": "del",
                                "{end}": "end",
                                "{pagedown}": "down",
                                "{numpadmultiply}": "*",
                                "{numpadsubtract}": "-",
                                "{numpadadd}": "+",
                                "{numpadenter}": "enter",
                                "{period}": ".",
                                "{numpaddecimal}": ".",
                                "{numpad0}": "0",
                                "{numpad1}": "1",
                                "{numpad2}": "2",
                                "{numpad3}": "3",
                                "{numpad4}": "4",
                                "{numpad5}": "5",
                                "{numpad6}": "6",
                                "{numpad7}": "7",
                                "{numpad8}": "8",
                                "{numpad9}": "9",
                              };
                            },
                          },
                          {
                            key: "getButtonDisplayName",
                            value: function (t, e, n) {
                              return (
                                (e = n
                                  ? Object.assign(
                                      {},
                                      this.getDefaultDiplay(),
                                      e
                                    )
                                  : e || this.getDefaultDiplay())[t] || t
                              );
                            },
                          },
                          {
                            key: "getUpdatedInput",
                            value: function (t, e, n) {
                              var o =
                                  3 < arguments.length &&
                                  void 0 !== arguments[3]
                                    ? arguments[3]
                                    : n,
                                r =
                                  4 < arguments.length &&
                                  void 0 !== arguments[4] &&
                                  arguments[4],
                                i = this.getOptions(),
                                s = [n, o, r],
                                a = e;
                              return (
                                ("{bksp}" === t || "{backspace}" === t) &&
                                0 < a.length
                                  ? (a = this.removeAt.apply(
                                      this,
                                      [a].concat(s)
                                    ))
                                  : "{space}" === t
                                  ? (a = this.addStringAt.apply(
                                      this,
                                      [a, " "].concat(s)
                                    ))
                                  : "{tab}" !== t ||
                                    ("boolean" == typeof i.tabCharOnTab &&
                                      !1 === i.tabCharOnTab)
                                  ? ("{enter}" !== t &&
                                      "{numpadenter}" !== t) ||
                                    !i.newLineOnEnter
                                    ? t.includes("numpad") &&
                                      Number.isInteger(Number(t[t.length - 2]))
                                      ? (a = this.addStringAt.apply(
                                          this,
                                          [a, t[t.length - 2]].concat(s)
                                        ))
                                      : "{numpaddivide}" === t
                                      ? (a = this.addStringAt.apply(
                                          this,
                                          [a, "/"].concat(s)
                                        ))
                                      : "{numpadmultiply}" === t
                                      ? (a = this.addStringAt.apply(
                                          this,
                                          [a, "*"].concat(s)
                                        ))
                                      : "{numpadsubtract}" === t
                                      ? (a = this.addStringAt.apply(
                                          this,
                                          [a, "-"].concat(s)
                                        ))
                                      : "{numpadadd}" === t
                                      ? (a = this.addStringAt.apply(
                                          this,
                                          [a, "+"].concat(s)
                                        ))
                                      : "{numpaddecimal}" === t
                                      ? (a = this.addStringAt.apply(
                                          this,
                                          [a, "."].concat(s)
                                        ))
                                      : ("{" !== t &&
                                          "}" !== t &&
                                          (t.includes("{") ||
                                            t.includes("}"))) ||
                                        (a = this.addStringAt.apply(
                                          this,
                                          [a, t].concat(s)
                                        ))
                                    : (a = this.addStringAt.apply(
                                        this,
                                        [a, "\n"].concat(s)
                                      ))
                                  : (a = this.addStringAt.apply(
                                      this,
                                      [a, "\t"].concat(s)
                                    )),
                                a
                              );
                            },
                          },
                          {
                            key: "updateCaretPos",
                            value: function (t, e) {
                              var n = this.updateCaretPosAction(t, e);
                              this.dispatch(function (t) {
                                t.setCaretPosition(n);
                              });
                            },
                          },
                          {
                            key: "updateCaretPosAction",
                            value: function (t, e) {
                              var n = this.getOptions(),
                                o = this.getCaretPosition();
                              return (
                                e ? 0 < o && (o -= t) : (o += t),
                                n.debug &&
                                  console.log(
                                    "Caret at:",
                                    o,
                                    "(".concat(this.keyboardDOMClass, ")")
                                  ),
                                o
                              );
                            },
                          },
                          {
                            key: "addStringAt",
                            value: function (t, e) {
                              var n,
                                o =
                                  2 < arguments.length &&
                                  void 0 !== arguments[2]
                                    ? arguments[2]
                                    : t.length,
                                r =
                                  3 < arguments.length &&
                                  void 0 !== arguments[3]
                                    ? arguments[3]
                                    : t.length,
                                i =
                                  4 < arguments.length &&
                                  void 0 !== arguments[4] &&
                                  arguments[4];
                              return (
                                o || 0 === o
                                  ? ((n = [t.slice(0, o), e, t.slice(r)].join(
                                      ""
                                    )),
                                    this.isMaxLengthReached() ||
                                      (i && this.updateCaretPos(e.length)))
                                  : (n = t + e),
                                n
                              );
                            },
                          },
                          {
                            key: "removeAt",
                            value: function (t) {
                              var e,
                                n =
                                  1 < arguments.length &&
                                  void 0 !== arguments[1]
                                    ? arguments[1]
                                    : t.length,
                                o =
                                  2 < arguments.length &&
                                  void 0 !== arguments[2]
                                    ? arguments[2]
                                    : t.length,
                                r =
                                  3 < arguments.length &&
                                  void 0 !== arguments[3] &&
                                  arguments[3];
                              if (0 === n && 0 === o) return t;
                              if (n === o) {
                                var i = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;
                                n && 0 <= n
                                  ? t.substring(n - 2, n).match(i)
                                    ? ((e = t.substr(0, n - 2) + t.substr(n)),
                                      r && this.updateCaretPos(2, !0))
                                    : ((e = t.substr(0, n - 1) + t.substr(n)),
                                      r && this.updateCaretPos(1, !0))
                                  : t.slice(-2).match(i)
                                  ? ((e = t.slice(0, -2)),
                                    r && this.updateCaretPos(2, !0))
                                  : ((e = t.slice(0, -1)),
                                    r && this.updateCaretPos(1, !0));
                              } else
                                (e = t.slice(0, n) + t.slice(o)),
                                  r &&
                                    this.dispatch(function (t) {
                                      t.setCaretPosition(n);
                                    });
                              return e;
                            },
                          },
                          {
                            key: "handleMaxLength",
                            value: function (t, e) {
                              var n = this.getOptions(),
                                o = n.maxLength,
                                r = t[n.inputName],
                                i = e.length - 1 >= o;
                              if (e.length <= r.length) return !1;
                              if (Number.isInteger(o))
                                return (
                                  n.debug &&
                                    console.log("maxLength (num) reached:", i),
                                  (this.maxLengthReached = i)
                                );
                              if ("object" === a(o)) {
                                var s = e.length - 1 >= o[n.inputName];
                                return (
                                  n.debug &&
                                    console.log("maxLength (obj) reached:", s),
                                  (this.maxLengthReached = s)
                                );
                              }
                            },
                          },
                          {
                            key: "isMaxLengthReached",
                            value: function () {
                              return Boolean(this.maxLengthReached);
                            },
                          },
                          {
                            key: "isTouchDevice",
                            value: function () {
                              return (
                                "ontouchstart" in window ||
                                navigator.maxTouchPoints
                              );
                            },
                          },
                          {
                            key: "pointerEventsSupported",
                            value: function () {
                              return window.PointerEvent;
                            },
                          },
                          {
                            key: "camelCase",
                            value: function (t) {
                              return (
                                !!t &&
                                t
                                  .toLowerCase()
                                  .trim()
                                  .split(/[.\-_\s]/g)
                                  .reduce(function (t, e) {
                                    return e.length
                                      ? t + e[0].toUpperCase() + e.slice(1)
                                      : t;
                                  })
                              );
                            },
                          },
                        ]),
                        o(s, u),
                        d);
                    function d(t) {
                      var e = t.getOptions,
                        n = t.getCaretPosition,
                        o = t.getCaretPositionEnd,
                        r = t.dispatch;
                      !(function (t) {
                        if (!(t instanceof d))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      })(this),
                        (this.getOptions = e),
                        (this.getCaretPosition = n),
                        (this.getCaretPositionEnd = o),
                        (this.dispatch = r),
                        d.bindMethods(d, this);
                    }
                    (i = function () {}),
                      "noop" in (r = l)
                        ? Object.defineProperty(r, "noop", {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                          })
                        : (r.noop = i);
                    var f = l;
                    function p(t, e) {
                      for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        (o.enumerable = o.enumerable || !1),
                          (o.configurable = !0),
                          "value" in o && (o.writable = !0),
                          Object.defineProperty(t, o.key, o);
                      }
                    }
                    var h =
                      (p(v.prototype, [
                        {
                          key: "handleHighlightKeyDown",
                          value: function (t) {
                            var n = this.getOptions(),
                              o = this.getSimpleKeyboardLayoutKey(t);
                            this.dispatch(function (t) {
                              var e =
                                t.getButtonElement(o) ||
                                t.getButtonElement("{".concat(o, "}"));
                              e &&
                                ((e.style.backgroundColor =
                                  n.physicalKeyboardHighlightBgColor ||
                                  "#dadce4"),
                                (e.style.color =
                                  n.physicalKeyboardHighlightTextColor ||
                                  "black"),
                                n.physicalKeyboardHighlightPress &&
                                  (
                                    e.onpointerdown ||
                                    e.onmousedown ||
                                    e.ontouchstart ||
                                    f.noop
                                  )());
                            });
                          },
                        },
                        {
                          key: "handleHighlightKeyUp",
                          value: function (t) {
                            var n = this.getOptions(),
                              o = this.getSimpleKeyboardLayoutKey(t);
                            this.dispatch(function (t) {
                              var e =
                                t.getButtonElement(o) ||
                                t.getButtonElement("{".concat(o, "}"));
                              e &&
                                e.removeAttribute &&
                                (e.removeAttribute("style"),
                                n.physicalKeyboardHighlightPress &&
                                  (
                                    e.onpointerup ||
                                    e.onmouseup ||
                                    e.ontouchend ||
                                    f.noop
                                  )());
                            });
                          },
                        },
                        {
                          key: "getSimpleKeyboardLayoutKey",
                          value: function (t) {
                            var e;
                            return (
                              ((e =
                                t.code.includes("Numpad") ||
                                t.code.includes("Shift") ||
                                t.code.includes("Space") ||
                                t.code.includes("Backspace") ||
                                t.code.includes("Control") ||
                                t.code.includes("Alt") ||
                                t.code.includes("Meta")
                                  ? t.code
                                  : t.key) !== e.toUpperCase() ||
                                ("F" === t.code[0] &&
                                  Number.isInteger(Number(t.code[1])) &&
                                  t.code.length <= 3)) &&
                                (e = e.toLowerCase()),
                              e
                            );
                          },
                        },
                      ]),
                      v);
                    function v(t) {
                      var e = t.dispatch,
                        n = t.getOptions;
                      !(function (t) {
                        if (!(t instanceof v))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      })(this),
                        (this.dispatch = e),
                        (this.getOptions = n),
                        f.bindMethods(v, this);
                    }
                    function g(t) {
                      return (
                        (function (t) {
                          if (Array.isArray(t)) return y(t);
                        })(t) ||
                        (function (t) {
                          if (
                            "undefined" != typeof Symbol &&
                            Symbol.iterator in Object(t)
                          )
                            return Array.from(t);
                        })(t) ||
                        (function (t) {
                          if (t) {
                            if ("string" == typeof t) return y(t, void 0);
                            var e = Object.prototype.toString
                              .call(t)
                              .slice(8, -1);
                            return (
                              "Object" === e &&
                                t.constructor &&
                                (e = t.constructor.name),
                              "Map" === e || "Set" === e
                                ? Array.from(t)
                                : "Arguments" === e ||
                                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                    e
                                  )
                                ? y(t, void 0)
                                : void 0
                            );
                          }
                        })(t) ||
                        (function () {
                          throw new TypeError(
                            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                          );
                        })()
                      );
                    }
                    function y(t, e) {
                      (null == e || e > t.length) && (e = t.length);
                      for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
                      return o;
                    }
                    function m(t, e) {
                      for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        (o.enumerable = o.enumerable || !1),
                          (o.configurable = !0),
                          "value" in o && (o.writable = !0),
                          Object.defineProperty(t, o.key, o);
                      }
                    }
                    function _(t, e, n) {
                      return (
                        e in t
                          ? Object.defineProperty(t, e, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                            })
                          : (t[e] = n),
                        t
                      );
                    }
                    var b =
                      (m(w.prototype, [
                        {
                          key: "setCaretPosition",
                          value: function (t, e) {
                            (this.caretPosition = t),
                              (this.caretPositionEnd = e || t);
                          },
                        },
                        {
                          key: "handleButtonClicked",
                          value: function (t) {
                            var e = this.options.debug;
                            if ("{//}" === t) return !1;
                            "function" == typeof this.options.onKeyPress &&
                              this.options.onKeyPress(t),
                              this.input[this.options.inputName] ||
                                (this.input[this.options.inputName] = "");
                            var n = this.utilities.getUpdatedInput(
                              t,
                              this.input[this.options.inputName],
                              this.caretPosition,
                              this.caretPositionEnd
                            );
                            if (
                              this.input[this.options.inputName] !== n &&
                              (!this.options.inputPattern ||
                                (this.options.inputPattern &&
                                  this.inputPatternIsValid(n)))
                            ) {
                              if (
                                this.options.maxLength &&
                                this.utilities.handleMaxLength(this.input, n)
                              )
                                return !1;
                              (this.input[this.options.inputName] =
                                this.utilities.getUpdatedInput(
                                  t,
                                  this.input[this.options.inputName],
                                  this.caretPosition,
                                  this.caretPositionEnd,
                                  !0
                                )),
                                e &&
                                  console.log(
                                    "Input changed:",
                                    this.getAllInputs()
                                  ),
                                this.options.debug &&
                                  console.log(
                                    "Caret at: ",
                                    this.getCaretPosition(),
                                    this.getCaretPositionEnd(),
                                    "(".concat(this.keyboardDOMClass, ")")
                                  ),
                                this.options.syncInstanceInputs &&
                                  this.syncInstanceInputs(),
                                "function" == typeof this.options.onChange &&
                                  this.options.onChange(
                                    this.getInput(this.options.inputName, !0)
                                  ),
                                "function" == typeof this.options.onChangeAll &&
                                  this.options.onChangeAll(this.getAllInputs());
                            }
                            e && console.log("Key pressed:", t);
                          },
                        },
                        {
                          key: "handleButtonMouseDown",
                          value: function (t, e) {
                            var n = this;
                            this.options.preventMouseDownDefault &&
                              e.preventDefault(),
                              this.options.stopMouseDownPropagation &&
                                e.stopPropagation(),
                              e &&
                                e.target.classList.add(this.activeButtonClass),
                              this.holdInteractionTimeout &&
                                clearTimeout(this.holdInteractionTimeout),
                              this.holdTimeout &&
                                clearTimeout(this.holdTimeout),
                              (this.isMouseHold = !0),
                              this.options.disableButtonHold ||
                                (this.holdTimeout = setTimeout(function () {
                                  ((!n.isMouseHold ||
                                    ((t.includes("{") || t.includes("}")) &&
                                      "{delete}" !== t &&
                                      "{backspace}" !== t &&
                                      "{bksp}" !== t &&
                                      "{space}" !== t &&
                                      "{tab}" !== t)) &&
                                    "{arrowright}" !== t &&
                                    "{arrowleft}" !== t &&
                                    "{arrowup}" !== t &&
                                    "{arrowdown}" !== t) ||
                                    (n.options.debug &&
                                      console.log("Button held:", t),
                                    n.handleButtonHold(t, e)),
                                    clearTimeout(n.holdTimeout);
                                }, 500));
                          },
                        },
                        {
                          key: "handleButtonMouseUp",
                          value: function () {
                            var e = this,
                              t =
                                0 < arguments.length && void 0 !== arguments[0]
                                  ? arguments[0]
                                  : null,
                              n =
                                1 < arguments.length && void 0 !== arguments[1]
                                  ? arguments[1]
                                  : null;
                            n &&
                              (this.options.preventMouseUpDefault &&
                                n.preventDefault(),
                              this.options.stopMouseUpPropagation &&
                                n.stopPropagation()),
                              this.recurseButtons(function (t) {
                                t.classList.remove(e.activeButtonClass);
                              }),
                              (this.isMouseHold = !1),
                              this.holdInteractionTimeout &&
                                clearTimeout(this.holdInteractionTimeout),
                              t &&
                                "function" ==
                                  typeof this.options.onKeyReleased &&
                                this.options.onKeyReleased(t);
                          },
                        },
                        {
                          key: "handleKeyboardContainerMouseDown",
                          value: function (t) {
                            this.options.preventMouseDownDefault &&
                              t.preventDefault();
                          },
                        },
                        {
                          key: "handleButtonHold",
                          value: function (t) {
                            var e = this;
                            this.holdInteractionTimeout &&
                              clearTimeout(this.holdInteractionTimeout),
                              (this.holdInteractionTimeout = setTimeout(
                                function () {
                                  e.isMouseHold
                                    ? (e.handleButtonClicked(t),
                                      e.handleButtonHold(t))
                                    : clearTimeout(e.holdInteractionTimeout);
                                },
                                100
                              ));
                          },
                        },
                        {
                          key: "syncInstanceInputs",
                          value: function () {
                            var e = this;
                            this.dispatch(function (t) {
                              t.replaceInput(e.input),
                                t.setCaretPosition(
                                  e.caretPosition,
                                  e.caretPositionEnd
                                );
                            });
                          },
                        },
                        {
                          key: "clearInput",
                          value: function (t) {
                            (t = t || this.options.inputName),
                              (this.input[t] = ""),
                              this.setCaretPosition(0),
                              this.options.syncInstanceInputs &&
                                this.syncInstanceInputs();
                          },
                        },
                        {
                          key: "getInput",
                          value: function (t) {
                            var e =
                              1 < arguments.length &&
                              void 0 !== arguments[1] &&
                              arguments[1];
                            return (
                              (t = t || this.options.inputName),
                              this.options.syncInstanceInputs &&
                                !e &&
                                this.syncInstanceInputs(),
                              this.options.rtl
                                ? "‫" +
                                  this.input[t]
                                    .replace("‫", "")
                                    .replace("‬", "") +
                                  "‬"
                                : this.input[t]
                            );
                          },
                        },
                        {
                          key: "getAllInputs",
                          value: function () {
                            var e = this,
                              n = {};
                            return (
                              Object.keys(this.input).forEach(function (t) {
                                n[t] = e.getInput(t, !0);
                              }),
                              n
                            );
                          },
                        },
                        {
                          key: "setInput",
                          value: function (t, e) {
                            (e = e || this.options.inputName),
                              (this.input[e] = t),
                              this.options.syncInstanceInputs &&
                                this.syncInstanceInputs();
                          },
                        },
                        {
                          key: "replaceInput",
                          value: function (t) {
                            this.input = t;
                          },
                        },
                        {
                          key: "setOptions",
                          value: function () {
                            var t =
                                0 < arguments.length && void 0 !== arguments[0]
                                  ? arguments[0]
                                  : {},
                              e = this.changedOptions(t);
                            (this.options = Object.assign(this.options, t)),
                              e.length &&
                                (this.options.debug &&
                                  console.log("changedOptions", e),
                                this.onSetOptions(t),
                                this.render());
                          },
                        },
                        {
                          key: "changedOptions",
                          value: function (e) {
                            var n = this;
                            return Object.keys(e).filter(function (t) {
                              return (
                                JSON.stringify(e[t]) !==
                                JSON.stringify(n.options[t])
                              );
                            });
                          },
                        },
                        {
                          key: "onSetOptions",
                          value: function (t) {
                            t.inputName &&
                              (this.options.debug &&
                                console.log(
                                  "inputName changed. caretPosition reset."
                                ),
                              this.setCaretPosition(null));
                          },
                        },
                        {
                          key: "clear",
                          value: function () {
                            (this.keyboardDOM.innerHTML = ""),
                              (this.keyboardDOM.className =
                                this.keyboardDOMClass),
                              (this.buttonElements = {});
                          },
                        },
                        {
                          key: "dispatch",
                          value: function (e) {
                            if (!window.SimpleKeyboardInstances)
                              throw (
                                (console.warn(
                                  "SimpleKeyboardInstances is not defined. Dispatch cannot be called."
                                ),
                                new Error("INSTANCES_VAR_ERROR"))
                              );
                            return Object.keys(
                              window.SimpleKeyboardInstances
                            ).forEach(function (t) {
                              e(window.SimpleKeyboardInstances[t], t);
                            });
                          },
                        },
                        {
                          key: "addButtonTheme",
                          value: function (t, e) {
                            var i = this;
                            if (!e || !t) return !1;
                            t.split(" ").forEach(function (r) {
                              e.split(" ").forEach(function (n) {
                                i.options.buttonTheme ||
                                  (i.options.buttonTheme = []);
                                var o = !1;
                                i.options.buttonTheme.map(function (t) {
                                  if (t.class.split(" ").includes(n)) {
                                    o = !0;
                                    var e = t.buttons.split(" ");
                                    e.includes(r) ||
                                      ((o = !0),
                                      e.push(r),
                                      (t.buttons = e.join(" ")));
                                  }
                                  return t;
                                }),
                                  o ||
                                    i.options.buttonTheme.push({
                                      class: n,
                                      buttons: t,
                                    });
                              });
                            }),
                              this.render();
                          },
                        },
                        {
                          key: "removeButtonTheme",
                          value: function (t, r) {
                            var i = this;
                            if (!t && !r)
                              return (
                                (this.options.buttonTheme = []),
                                this.render(),
                                !1
                              );
                            t &&
                              Array.isArray(this.options.buttonTheme) &&
                              this.options.buttonTheme.length &&
                              (t.split(" ").forEach(function (o) {
                                i.options.buttonTheme.map(function (t, e) {
                                  if ((r && r.includes(t.class)) || !r) {
                                    var n = t.buttons
                                      .split(" ")
                                      .filter(function (t) {
                                        return t !== o;
                                      });
                                    n.length
                                      ? (t.buttons = n.join(" "))
                                      : (i.options.buttonTheme.splice(e, 1),
                                        (t = null));
                                  }
                                  return t;
                                });
                              }),
                              this.render());
                          },
                        },
                        {
                          key: "getButtonElement",
                          value: function (t) {
                            var e,
                              n = this.buttonElements[t];
                            return n && (e = 1 < n.length ? n : n[0]), e;
                          },
                        },
                        {
                          key: "inputPatternIsValid",
                          value: function (t) {
                            var e,
                              n = this.options.inputPattern;
                            if (
                              (e =
                                n instanceof RegExp
                                  ? n
                                  : n[this.options.inputName]) &&
                              t
                            ) {
                              var o = e.test(t);
                              return (
                                this.options.debug &&
                                  console.log(
                                    'inputPattern ("'
                                      .concat(e, '"): ')
                                      .concat(o ? "passed" : "did not pass!")
                                  ),
                                o
                              );
                            }
                            return !0;
                          },
                        },
                        {
                          key: "setEventListeners",
                          value: function () {
                            (!this.isFirstKeyboardInstance &&
                              this.allKeyboardInstances) ||
                              (this.options.debug &&
                                console.log(
                                  "Caret handling started (".concat(
                                    this.keyboardDOMClass,
                                    ")"
                                  )
                                ),
                              document.addEventListener(
                                "keyup",
                                this.handleKeyUp
                              ),
                              document.addEventListener(
                                "keydown",
                                this.handleKeyDown
                              ),
                              document.addEventListener(
                                "mouseup",
                                this.handleMouseUp
                              ),
                              document.addEventListener(
                                "touchend",
                                this.handleTouchEnd
                              ));
                          },
                        },
                        {
                          key: "handleKeyUp",
                          value: function (t) {
                            this.caretEventHandler(t),
                              this.options.physicalKeyboardHighlight &&
                                this.physicalKeyboard.handleHighlightKeyUp(t);
                          },
                        },
                        {
                          key: "handleKeyDown",
                          value: function (t) {
                            this.options.physicalKeyboardHighlight &&
                              this.physicalKeyboard.handleHighlightKeyDown(t);
                          },
                        },
                        {
                          key: "handleMouseUp",
                          value: function (t) {
                            this.caretEventHandler(t);
                          },
                        },
                        {
                          key: "handleTouchEnd",
                          value: function (t) {
                            this.caretEventHandler(t);
                          },
                        },
                        {
                          key: "caretEventHandler",
                          value: function (n) {
                            var o;
                            n.target.tagName &&
                              (o = n.target.tagName.toLowerCase()),
                              this.dispatch(function (t) {
                                var e =
                                  n.target === t.keyboardDOM ||
                                  (n.target &&
                                    t.keyboardDOM.contains(n.target));
                                t.isMouseHold && (t.isMouseHold = !1),
                                  ("textarea" !== o && "input" !== o) ||
                                  t.options.disableCaretPositioning
                                    ? (!t.options.disableCaretPositioning &&
                                        e) ||
                                      t.setCaretPosition(null)
                                    : (t.setCaretPosition(
                                        n.target.selectionStart,
                                        n.target.selectionEnd
                                      ),
                                      t.options.debug &&
                                        console.log(
                                          "Caret at: ",
                                          t.getCaretPosition(),
                                          t.getCaretPositionEnd(),
                                          n && n.target.tagName.toLowerCase(),
                                          "(".concat(t.keyboardDOMClass, ")")
                                        ));
                              });
                          },
                        },
                        {
                          key: "recurseButtons",
                          value: function (e) {
                            var n = this;
                            if (!e) return !1;
                            Object.keys(this.buttonElements).forEach(function (
                              t
                            ) {
                              return n.buttonElements[t].forEach(e);
                            });
                          },
                        },
                        {
                          key: "destroy",
                          value: function () {
                            this.options.debug &&
                              console.log(
                                "Destroying simple-keyboard instance: ".concat(
                                  this.currentInstanceName
                                )
                              ),
                              document.removeEventListener(
                                "keyup",
                                this.handleKeyUp
                              ),
                              document.removeEventListener(
                                "keydown",
                                this.handleKeyDown
                              ),
                              document.removeEventListener(
                                "mouseup",
                                this.handleMouseUp
                              ),
                              document.removeEventListener(
                                "touchend",
                                this.handleTouchEnd
                              ),
                              (document.onpointerup = null),
                              (document.ontouchend = null),
                              (document.ontouchcancel = null),
                              (document.onmouseup = null);
                            var t = function (t) {
                              (t.onpointerdown = null),
                                (t.onpointerup = null),
                                (t.onpointercancel = null),
                                (t.ontouchstart = null),
                                (t.ontouchend = null),
                                (t.ontouchcancel = null),
                                (t.onclick = null),
                                (t.onmousedown = null),
                                (t.onmouseup = null),
                                t.remove(),
                                (t = null);
                            };
                            this.recurseButtons(t),
                              (t = this.recurseButtons = null),
                              (this.keyboardDOM.onpointerdown = null),
                              (this.keyboardDOM.ontouchstart = null),
                              (this.keyboardDOM.onmousedown = null),
                              this.clear(),
                              (window.SimpleKeyboardInstances[
                                this.currentInstanceName
                              ] = null),
                              delete window.SimpleKeyboardInstances[
                                this.currentInstanceName
                              ],
                              (this.initialized = !1);
                          },
                        },
                        {
                          key: "getButtonThemeClasses",
                          value: function (n) {
                            var t = this.options.buttonTheme,
                              o = [];
                            return (
                              Array.isArray(t) &&
                                t.forEach(function (t) {
                                  if (
                                    t.class &&
                                    "string" == typeof t.class &&
                                    t.buttons &&
                                    "string" == typeof t.buttons
                                  ) {
                                    var e = t.class.split(" ");
                                    t.buttons.split(" ").includes(n) &&
                                      (o = [].concat(g(o), g(e)));
                                  } else console.warn('Incorrect "buttonTheme". Please check the documentation.', t);
                                }),
                              o
                            );
                          },
                        },
                        {
                          key: "setDOMButtonAttributes",
                          value: function (e, n) {
                            var t = this.options.buttonAttributes;
                            Array.isArray(t) &&
                              t.forEach(function (t) {
                                t.attribute &&
                                "string" == typeof t.attribute &&
                                t.value &&
                                "string" == typeof t.value &&
                                t.buttons &&
                                "string" == typeof t.buttons
                                  ? t.buttons.split(" ").includes(e) &&
                                    n(t.attribute, t.value)
                                  : console.warn(
                                      'Incorrect "buttonAttributes". Please check the documentation.',
                                      t
                                    );
                              });
                          },
                        },
                        {
                          key: "onTouchDeviceDetected",
                          value: function () {
                            this.processAutoTouchEvents(),
                              this.disableContextualWindow();
                          },
                        },
                        {
                          key: "disableContextualWindow",
                          value: function () {
                            window.oncontextmenu = function (t) {
                              if (t.target.classList.contains("hg-button"))
                                return (
                                  t.preventDefault(), t.stopPropagation(), !1
                                );
                            };
                          },
                        },
                        {
                          key: "processAutoTouchEvents",
                          value: function () {
                            this.options.autoUseTouchEvents &&
                              ((this.options.useTouchEvents = !0),
                              this.options.debug &&
                                console.log(
                                  "autoUseTouchEvents: Touch device detected, useTouchEvents enabled."
                                ));
                          },
                        },
                        {
                          key: "onInit",
                          value: function () {
                            this.options.debug &&
                              console.log(
                                "".concat(this.keyboardDOMClass, " Initialized")
                              ),
                              this.setEventListeners(),
                              "function" == typeof this.options.onInit &&
                                this.options.onInit();
                          },
                        },
                        {
                          key: "beforeFirstRender",
                          value: function () {
                            this.utilities.isTouchDevice() &&
                              this.onTouchDeviceDetected(),
                              "function" ==
                                typeof this.options.beforeFirstRender &&
                                this.options.beforeFirstRender(),
                              this.isFirstKeyboardInstance &&
                                this.utilities.pointerEventsSupported() &&
                                !this.options.useTouchEvents &&
                                !this.options.useMouseEvents &&
                                this.options.debug &&
                                console.log(
                                  "Using PointerEvents as it is supported by this browser"
                                ),
                              this.options.useTouchEvents &&
                                this.options.debug &&
                                console.log(
                                  "useTouchEvents has been enabled. Only touch events will be used."
                                );
                          },
                        },
                        {
                          key: "beforeRender",
                          value: function () {
                            "function" == typeof this.options.beforeRender &&
                              this.options.beforeRender();
                          },
                        },
                        {
                          key: "onRender",
                          value: function () {
                            "function" == typeof this.options.onRender &&
                              this.options.onRender();
                          },
                        },
                        {
                          key: "onModulesLoaded",
                          value: function () {
                            "function" == typeof this.options.onModulesLoaded &&
                              this.options.onModulesLoaded(this);
                          },
                        },
                        {
                          key: "loadModules",
                          value: function () {
                            var e = this;
                            Array.isArray(this.options.modules) &&
                              (this.options.modules.forEach(function (t) {
                                new t().init(e);
                              }),
                              (this.keyboardPluginClasses = "modules-loaded"),
                              this.render(),
                              this.onModulesLoaded());
                          },
                        },
                        {
                          key: "getModuleProp",
                          value: function (t, e) {
                            return !!this.modules[t] && this.modules[t][e];
                          },
                        },
                        {
                          key: "getModulesList",
                          value: function () {
                            return Object.keys(this.modules);
                          },
                        },
                        {
                          key: "parseRowDOMContainers",
                          value: function (c, u, t, l) {
                            var d = this,
                              f = Array.from(c.children),
                              p = 0;
                            return (
                              f.length &&
                                t.forEach(function (t, e) {
                                  var n = l[e];
                                  if (!(n && t < n)) return !1;
                                  var o = t - p,
                                    r = n - p,
                                    i = document.createElement("div");
                                  i.className += "hg-button-container";
                                  var s = ""
                                    .concat(d.options.layoutName, "-r")
                                    .concat(u, "c")
                                    .concat(e);
                                  i.setAttribute("data-skUID", s);
                                  var a = f.splice(o, r - o + 1);
                                  (p = r - o),
                                    a.forEach(function (t) {
                                      return i.appendChild(t);
                                    }),
                                    f.splice(o, 0, i),
                                    (c.innerHTML = ""),
                                    f.forEach(function (t) {
                                      return c.appendChild(t);
                                    }),
                                    d.options.debug &&
                                      console.log(
                                        "rowDOMContainer",
                                        a,
                                        o,
                                        r,
                                        p + 1
                                      );
                                }),
                              c
                            );
                          },
                        },
                        {
                          key: "render",
                          value: function () {
                            var v = this;
                            this.clear(),
                              this.initialized || this.beforeFirstRender(),
                              this.beforeRender();
                            var t = "hg-layout-".concat(
                                this.options.layoutName
                              ),
                              e = this.options.layout || {
                                default: [
                                  "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                                  "{tab} q w e r t y u i o p [ ] \\",
                                  "{lock} a s d f g h j k l ; ' {enter}",
                                  "{shift} z x c v b n m , . / {shift}",
                                  ".com @ {space}",
                                ],
                                shift: [
                                  "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                                  "{tab} Q W E R T Y U I O P { } |",
                                  '{lock} A S D F G H J K L : " {enter}',
                                  "{shift} Z X C V B N M < > ? {shift}",
                                  ".com @ {space}",
                                ],
                              },
                              y = this.options.useTouchEvents || !1,
                              n = y ? "hg-touch-events" : "",
                              m = this.options.useMouseEvents || !1,
                              _ = this.options.disableRowButtonContainers;
                            (this.keyboardDOM.className =
                              this.getKeyboardClassString(
                                this.options.theme,
                                t,
                                this.keyboardPluginClasses,
                                n
                              )),
                              e[this.options.layoutName].forEach(function (
                                t,
                                d
                              ) {
                                var e = t.split(" "),
                                  f = document.createElement("div");
                                f.className += "hg-row";
                                var p = [],
                                  h = [];
                                e.forEach(function (e, t) {
                                  var n,
                                    o =
                                      !_ &&
                                      "string" == typeof e &&
                                      1 < e.length &&
                                      0 === e.indexOf("["),
                                    r =
                                      !_ &&
                                      "string" == typeof e &&
                                      1 < e.length &&
                                      e.indexOf("]") === e.length - 1;
                                  o && (p.push(t), (e = e.replace(/\[/g, ""))),
                                    r &&
                                      (h.push(t), (e = e.replace(/\]/g, "")));
                                  var i = v.utilities.getButtonClass(e),
                                    s = v.utilities.getButtonDisplayName(
                                      e,
                                      v.options.display,
                                      v.options.mergeDisplay
                                    ),
                                    a = v.options.useButtonTag
                                      ? "button"
                                      : "div",
                                    c = document.createElement(a);
                                  (c.className += "hg-button ".concat(i)),
                                    (n = c.classList).add.apply(
                                      n,
                                      g(v.getButtonThemeClasses(e))
                                    ),
                                    v.setDOMButtonAttributes(
                                      e,
                                      function (t, e) {
                                        c.setAttribute(t, e);
                                      }
                                    ),
                                    (v.activeButtonClass = "hg-activeButton"),
                                    !v.utilities.pointerEventsSupported() ||
                                    y ||
                                    m
                                      ? y
                                        ? ((c.ontouchstart = function (t) {
                                            v.handleButtonClicked(e),
                                              v.handleButtonMouseDown(e, t);
                                          }),
                                          (c.ontouchend = function (t) {
                                            v.handleButtonMouseUp(e, t);
                                          }),
                                          (c.ontouchcancel = function (t) {
                                            v.handleButtonMouseUp(e, t);
                                          }))
                                        : ((c.onclick = function () {
                                            (v.isMouseHold = !1),
                                              v.handleButtonClicked(e);
                                          }),
                                          (c.onmousedown = function (t) {
                                            v.handleButtonMouseDown(e, t);
                                          }),
                                          (c.onmouseup = function (t) {
                                            v.handleButtonMouseUp(e, t);
                                          }))
                                      : ((c.onpointerdown = function (t) {
                                          v.handleButtonClicked(e),
                                            v.handleButtonMouseDown(e, t);
                                        }),
                                        (c.onpointerup = function (t) {
                                          v.handleButtonMouseUp(e, t);
                                        }),
                                        (c.onpointercancel = function (t) {
                                          v.handleButtonMouseUp(e, t);
                                        })),
                                    c.setAttribute("data-skBtn", e);
                                  var u = ""
                                    .concat(v.options.layoutName, "-r")
                                    .concat(d, "b")
                                    .concat(t);
                                  c.setAttribute("data-skBtnUID", u);
                                  var l = document.createElement("span");
                                  (l.innerHTML = s),
                                    c.appendChild(l),
                                    v.buttonElements[e] ||
                                      (v.buttonElements[e] = []),
                                    v.buttonElements[e].push(c),
                                    f.appendChild(c);
                                }),
                                  (f = v.parseRowDOMContainers(f, d, p, h)),
                                  v.keyboardDOM.appendChild(f);
                              }),
                              this.onRender(),
                              this.initialized ||
                                ((this.initialized = !0),
                                !this.utilities.pointerEventsSupported() ||
                                y ||
                                m
                                  ? y
                                    ? ((document.ontouchend = function () {
                                        return v.handleButtonMouseUp();
                                      }),
                                      (document.ontouchcancel = function () {
                                        return v.handleButtonMouseUp();
                                      }),
                                      (this.keyboardDOM.ontouchstart =
                                        function (t) {
                                          return v.handleKeyboardContainerMouseDown(
                                            t
                                          );
                                        }))
                                    : y ||
                                      ((document.onmouseup = function () {
                                        return v.handleButtonMouseUp();
                                      }),
                                      (this.keyboardDOM.onmousedown = function (
                                        t
                                      ) {
                                        return v.handleKeyboardContainerMouseDown(
                                          t
                                        );
                                      }))
                                  : ((document.onpointerup = function () {
                                      return v.handleButtonMouseUp();
                                    }),
                                    (this.keyboardDOM.onpointerdown = function (
                                      t
                                    ) {
                                      return v.handleKeyboardContainerMouseDown(
                                        t
                                      );
                                    })),
                                this.onInit());
                          },
                        },
                      ]),
                      w);
                    function w() {
                      var o = this;
                      (function (t, e) {
                        if (!(t instanceof e))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      })(this, w),
                        _(this, "handleParams", function (t) {
                          var e, n, o;
                          if ("string" == typeof t[0])
                            (e = t[0].split(".").join("")),
                              (n = document.querySelector(".".concat(e))),
                              (o = t[1]);
                          else if (t[0] instanceof HTMLDivElement) {
                            if (!t[0].className)
                              throw (
                                (console.warn(
                                  "Any DOM element passed as parameter must have a class."
                                ),
                                new Error("KEYBOARD_DOM_CLASS_ERROR"))
                              );
                            (e = t[0].className.split(" ")[0]),
                              (n = t[0]),
                              (o = t[1]);
                          } else
                            (e = "simple-keyboard"),
                              (n = document.querySelector(".".concat(e))),
                              (o = t[0]);
                          return {
                            keyboardDOMClass: e,
                            keyboardDOM: n,
                            options: o,
                          };
                        }),
                        _(this, "getOptions", function () {
                          return o.options;
                        }),
                        _(this, "getCaretPosition", function () {
                          return o.caretPosition;
                        }),
                        _(this, "getCaretPositionEnd", function () {
                          return o.caretPositionEnd;
                        }),
                        _(this, "registerModule", function (t, e) {
                          o.modules[t] || (o.modules[t] = {}), e(o.modules[t]);
                        }),
                        _(this, "getKeyboardClassString", function () {
                          for (
                            var t = arguments.length, e = new Array(t), n = 0;
                            n < t;
                            n++
                          )
                            e[n] = arguments[n];
                          return [o.keyboardDOMClass]
                            .concat(e)
                            .filter(function (t) {
                              return !!t;
                            })
                            .join(" ");
                        });
                      for (
                        var t = arguments.length, e = new Array(t), n = 0;
                        n < t;
                        n++
                      )
                        e[n] = arguments[n];
                      var r = this.handleParams(e),
                        i = r.keyboardDOMClass,
                        s = r.keyboardDOM,
                        a = r.options,
                        c = void 0 === a ? {} : a;
                      if (
                        ((this.utilities = new f({
                          getOptions: this.getOptions,
                          getCaretPosition: this.getCaretPosition,
                          getCaretPositionEnd: this.getCaretPositionEnd,
                          dispatch: this.dispatch,
                        })),
                        (this.caretPosition = null),
                        (this.caretPositionEnd = null),
                        (this.keyboardDOM = s),
                        (this.options = c),
                        (this.options.layoutName =
                          this.options.layoutName || "default"),
                        (this.options.theme =
                          this.options.theme || "hg-theme-default"),
                        (this.options.inputName =
                          this.options.inputName || "default"),
                        (this.options.preventMouseDownDefault =
                          this.options.preventMouseDownDefault || !1),
                        (this.keyboardPluginClasses = ""),
                        f.bindMethods(w, this),
                        (this.input = {}),
                        (this.input[this.options.inputName] = ""),
                        (this.keyboardDOMClass = i),
                        (this.buttonElements = {}),
                        window.SimpleKeyboardInstances ||
                          (window.SimpleKeyboardInstances = {}),
                        (this.currentInstanceName = this.utilities.camelCase(
                          this.keyboardDOMClass
                        )),
                        ((window.SimpleKeyboardInstances[
                          this.currentInstanceName
                        ] = this).allKeyboardInstances =
                          window.SimpleKeyboardInstances),
                        (this.keyboardInstanceNames = Object.keys(
                          window.SimpleKeyboardInstances
                        )),
                        (this.isFirstKeyboardInstance =
                          this.keyboardInstanceNames[0] ===
                          this.currentInstanceName),
                        (this.physicalKeyboard = new h({
                          dispatch: this.dispatch,
                          getOptions: this.getOptions,
                        })),
                        !this.keyboardDOM)
                      )
                        throw (
                          (console.warn(
                            '".'.concat(i, '" was not found in the DOM.')
                          ),
                          new Error("KEYBOARD_DOM_ERROR"))
                        );
                      this.render(), (this.modules = {}), this.loadModules();
                    }
                    e.default = b;
                  },
                ]),
              (r.c = o),
              (r.d = function (t, e, n) {
                r.o(t, e) ||
                  Object.defineProperty(t, e, { enumerable: !0, get: n });
              }),
              (r.r = function (t) {
                "undefined" != typeof Symbol &&
                  Symbol.toStringTag &&
                  Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module",
                  }),
                  Object.defineProperty(t, "__esModule", { value: !0 });
              }),
              (r.t = function (e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule)
                  return e;
                var n = Object.create(null);
                if (
                  (r.r(n),
                  Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e,
                  }),
                  2 & t && "string" != typeof e)
                )
                  for (var o in e)
                    r.d(
                      n,
                      o,
                      function (t) {
                        return e[t];
                      }.bind(null, o)
                    );
                return n;
              }),
              (r.n = function (t) {
                var e =
                  t && t.__esModule
                    ? function () {
                        return t.default;
                      }
                    : function () {
                        return t;
                      };
                return r.d(e, "a", e), e;
              }),
              (r.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
              }),
              (r.p = "/"),
              r((r.s = 0))
            );
            function r(t) {
              if (o[t]) return o[t].exports;
              var e = (o[t] = { i: t, l: !1, exports: {} });
              return (
                n[t].call(e.exports, e, e.exports, r), (e.l = !0), e.exports
              );
            }
            var n, o;
          }),
          "object" == typeof n && "object" == typeof e
            ? (e.exports = r())
            : "function" == typeof define && define.amd
            ? define("SimpleKeyboard", [], r)
            : "object" == typeof n
            ? (n.SimpleKeyboard = r())
            : (o.SimpleKeyboard = r());
      },
      {},
    ],
    132: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.Build = {
            short: "0.0.60",
            version: "0.0.60 (bf96ffa016ed72ddcf859c70e4097786)",
            buildSeed: 1618537882638,
          });
      },
      {},
    ],
    133: [
      function (t, e, K) {
        "use strict";
        function C(t) {
          if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
            if (
              Array.isArray(t) ||
              (t = (function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return a(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if (
                  "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                )
                  return a(t, e);
              })(t))
            ) {
              var e = 0,
                n = function () {};
              return {
                s: n,
                n: function () {
                  return e >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[e++] };
                },
                e: function (t) {
                  throw t;
                },
                f: n,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var o,
            r,
            i = !0,
            s = !1;
          return {
            s: function () {
              o = t[Symbol.iterator]();
            },
            n: function () {
              var t = o.next();
              return (i = t.done), t;
            },
            e: function (t) {
              (s = !0), (r = t);
            },
            f: function () {
              try {
                i || null == o.return || o.return();
              } finally {
                if (s) throw r;
              }
            },
          };
        }
        function a(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
          return o;
        }
        t("core-js/modules/es7.symbol.async-iterator"),
          t("core-js/modules/es6.symbol"),
          t("core-js/modules/es6.string.iterator"),
          t("core-js/modules/es6.array.from"),
          t("core-js/modules/es6.function.name"),
          t("core-js/modules/es6.regexp.to-string"),
          t("core-js/modules/web.dom.iterable"),
          t("core-js/modules/es6.array.iterator"),
          t("core-js/modules/es6.object.to-string"),
          t("core-js/modules/es6.object.keys"),
          Object.defineProperty(K, "__esModule", { value: !0 });
        var w = t("../dom/keys"),
          S = t("./pointer"),
          r = t("./mouse");
        K.ButtonSize = 54;
        var n = (function () {
          for (
            var t = {}, e = 0, n = Object.keys(w.namedKeyCodes);
            e < n.length;
            e++
          ) {
            var o = n[e];
            t[w.namedKeyCodes[o]] = o.substr(4, 2);
          }
          return t;
        })();
        function x(t, e, n) {
          var o = Math.round(Math.max(16, K.ButtonSize * n)),
            r = Math.round(o / 1.8),
            i = T[t.toLowerCase()],
            s = void 0 === i ? t : "",
            a = O("emulator-button-touch-zone"),
            c = O("emulator-button", void 0 === s ? "□" : s);
          void 0 !== i && (c.style.backgroundImage = 'url("' + i + '")'),
            (c.style.width = r + "px"),
            (c.style.height = r + "px"),
            (c.style.lineHeight = r + "px"),
            (c.style.fontSize = Math.round(r / 2) + "px"),
            (a.style.width = o + "px"),
            (a.style.height = o + "px"),
            (a.style.lineHeight = o + "px"),
            (a.style.fontSize = Math.round(o / 2) + "px"),
            (a.style.borderWidth = Math.max(1, Math.round(o / 20)) + "px"),
            a.appendChild(c);
          function u(t) {
            void 0 !== e.onDown && e.onDown(),
              void 0 !== e.onClick && e.onClick(),
              t.stopPropagation(),
              t.preventDefault();
          }
          function l(t) {
            void 0 !== e.onUp && e.onUp(),
              t.stopPropagation(),
              t.preventDefault();
          }
          function d(t) {
            t.stopPropagation(), t.preventDefault();
          }
          var f,
            p = { capture: !0 },
            h = C(S.pointer.starters);
          try {
            for (h.s(); !(f = h.n()).done; ) {
              var v = f.value;
              a.addEventListener(v, u, p);
            }
          } catch (t) {
            h.e(t);
          } finally {
            h.f();
          }
          var y,
            m = C(S.pointer.enders);
          try {
            for (m.s(); !(y = m.n()).done; ) {
              var _ = y.value;
              a.addEventListener(_, l, p);
            }
          } catch (t) {
            m.e(t);
          } finally {
            m.f();
          }
          var g,
            b = C(S.pointer.changers);
          try {
            for (b.s(); !(g = b.n()).done; ) {
              var w = g.value;
              a.addEventListener(w, d, p);
            }
          } catch (t) {
            b.e(t);
          } finally {
            b.f();
          }
          var x,
            D = C(S.pointer.leavers);
          try {
            for (D.s(); !(x = D.n()).done; ) {
              var k = x.value;
              a.addEventListener(k, d, p);
            }
          } catch (t) {
            D.e(t);
          } finally {
            D.f();
          }
          var E,
            B = C(S.pointer.prevents);
          try {
            for (B.s(); !(E = B.n()).done; ) {
              var j = E.value;
              a.addEventListener(j, d, p);
            }
          } catch (t) {
            B.e(t);
          } finally {
            B.f();
          }
          return a;
        }
        function O(t, e) {
          var n = document.createElement("div");
          return (n.className = t), void 0 !== e && (n.innerHTML = e), n;
        }
        function D(t) {
          return "number" == typeof t ? n[t] : t;
        }
        function k(t, e, n) {
          if ("number" != typeof t.mapTo)
            return {
              onDown: function () {
                switch (t.mapTo) {
                  case "mouseScreenMover":
                    n.mode = r.MouseMode.SCREEN_MOVER;
                    break;
                  case "mouseRightButton":
                    n.pointerButton = 1;
                }
              },
              onUp: function () {
                switch (t.mapTo) {
                  case "mouseScreenMover":
                    n.mode = r.MouseMode.DEFAULT;
                    break;
                  case "mouseRightButton":
                    n.pointerButton = 0;
                }
              },
            };
          var o = t.mapTo;
          return "click" === t.action
            ? {
                onClick: function () {
                  return e.fireKeyPress(o);
                },
              }
            : {
                onDown: function () {
                  return e.fireKeyDown(o);
                },
                onUp: function () {
                  return e.fireKeyUp(o);
                },
              };
        }
        (K.createButton = x),
          (K.button = function (o, t, e, n) {
            var r,
              i = o.getScale(),
              s = Math.round(K.ButtonSize * i),
              a = Math.round(s / 4),
              c = [],
              u = C(e);
            try {
              for (u.s(); !(r = u.n()).done; ) {
                var l = r.value;
                if (l.mapTo !== w.KBD_NONE) {
                  var d = x(
                    (l.symbol || D(l.mapTo)).toUpperCase(),
                    k(l, o, n),
                    i
                  );
                  d.style.position = "absolute";
                  var f = l.style;
                  if (f)
                    for (var p = 0, h = Object.keys(f); p < h.length; p++) {
                      var v = h[p];
                      d.style[v] = f[v];
                    }
                  if (void 0 !== l.position) {
                    var y = l.position.left,
                      m = l.position.top,
                      _ = l.position.bottom,
                      g = l.position.right;
                    void 0 !== y && (d.style.left = a * y + s * (y - 1) + "px"),
                      void 0 !== g &&
                        (d.style.right = a * g + s * (g - 1) + "px"),
                      void 0 !== m &&
                        (d.style.top = a * m + s * (m - 1) + "px"),
                      void 0 !== _ &&
                        (d.style.bottom = a * _ + s * (_ - 1) + "px");
                  }
                  o.mouseOverlay.appendChild(d), c.push(d);
                }
              }
            } catch (t) {
              u.e(t);
            } finally {
              u.f();
            }
            function b() {
              var t,
                e = C(c);
              try {
                for (e.s(); !(t = e.n()).done; ) {
                  var n = t.value;
                  n.parentElement === o.mouseOverlay &&
                    o.mouseOverlay.removeChild(n);
                }
              } catch (t) {
                e.e(t);
              } finally {
                e.f();
              }
            }
            return t.events().onExit(b), b;
          });
        var o =
            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' fill='%23FFF' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Ctitle%3EShape%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg id='Page-1' sketch:type='MSPage'%3E%3Cg id='Artboard-1' transform='translate(-3.000000, -1.000000)' sketch:type='MSArtboardGroup'%3E%3Cpath id='Shape' sketch:type='MSShapeGroup' d='M19,12c-0.3,0-0.5,0.1-0.7,0.3L14,16.6V3c0-0.5-0.4-1-1-1s-1,0.5-1,1v13.6 l-4.3-4.3C7.5,12.1,7.3,12,7,12c-0.5,0-1,0.4-1,1c0,0.3,0.1,0.5,0.3,0.7l6,6c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3l6-6 c0.2-0.2,0.3-0.4,0.3-0.7C20,12.4,19.5,12,19,12L19,12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
          i =
            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' enable-background='new 0 0 20 20' fill='%23FFF' xml:space='preserve'%3E%3Cg id='left_arrow_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18,9H4.41l4.29-4.29C8.89,4.53,9,4.28,9,4c0-0.55-0.45-1-1-1 C7.72,3,7.47,3.11,7.29,3.29l-6,6C1.11,9.47,1,9.72,1,10c0,0.28,0.11,0.53,0.29,0.71l6,6C7.47,16.89,7.72,17,8,17 c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L4.41,11H18c0.55,0,1-0.45,1-1C19,9.45,18.55,9,18,9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
          s =
            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' fill='%23fff' viewBox='0 0 20 20' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Cg id='right_arrow_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.71,9.29l-6-6C12.53,3.11,12.28,3,12,3c-0.55,0-1,0.45-1,1 c0,0.28,0.11,0.53,0.29,0.71L15.59,9H2c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h13.59l-4.29,4.29C11.11,15.47,11,15.72,11,16 c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l6-6C18.89,10.53,19,10.28,19,10C19,9.72,18.89,9.47,18.71,9.29z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
          c =
            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' fill='%23fff' viewBox='0 0 20 20' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Cg id='key_enter_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18,2c-0.55,0-1,0.45-1,1v5c0,2.21-1.79,4-4,4H4.41l2.29-2.29 C6.89,9.53,7,9.28,7,9c0-0.55-0.45-1-1-1C5.72,8,5.47,8.11,5.29,8.29l-4,4C1.11,12.47,1,12.72,1,13c0,0.28,0.11,0.53,0.29,0.71 l4,4C5.47,17.89,5.72,18,6,18c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L4.41,14H13c3.31,0,6-2.69,6-6V3C19,2.45,18.55,2,18,2 z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
          T = {
            fullscreen:
              "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cg id='maximize_1_' fill='%23FFFFFF'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.99,8.99c-0.28,0-0.53,0.11-0.71,0.29l-3.29,3.29v-1.59c0-0.55-0.45-1-1-1 s-1,0.45-1,1v4c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1s-0.45-1-1-1H3.41L6.7,10.7c0.18-0.18,0.29-0.43,0.29-0.71 C6.99,9.44,6.54,8.99,5.99,8.99z M14.99-0.01h-4c-0.55,0-1,0.45-1,1s0.45,1,1,1h1.59L9.28,5.29C9.1,5.47,8.99,5.72,8.99,5.99 c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l3.29-3.29v1.59c0,0.55,0.45,1,1,1s1-0.45,1-1v-4C15.99,0.44,15.54-0.01,14.99-0.01 z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            save: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' fill='%23FFFFFF' xml:space='preserve'%3E%3Cg id='floppy_disk'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.71,2.29l-2-2C13.53,0.11,13.28,0,13,0h-1v6H4V0H1C0.45,0,0,0.45,0,1v14 c0,0.55,0.45,1,1,1h14c0.55,0,1-0.45,1-1V3C16,2.72,15.89,2.47,15.71,2.29z M14,15H2V9c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1V15 z M11,1H9v4h2V1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A",
            options:
              "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' enable-background='new 0 0 20 20' fill='%23FFF' xml:space='preserve'%3E%3Cg id='cog_2_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19,8h-2.31c-0.14-0.46-0.33-0.89-0.56-1.3l1.7-1.7c0.39-0.39,0.39-1.02,0-1.41 l-1.41-1.41c-0.39-0.39-1.02-0.39-1.41,0l-1.7,1.7c-0.41-0.22-0.84-0.41-1.3-0.55V1c0-0.55-0.45-1-1-1H9C8.45,0,8,0.45,8,1v2.33 C7.52,3.47,7.06,3.67,6.63,3.91L5,2.28c-0.37-0.37-0.98-0.37-1.36,0L2.28,3.64C1.91,4.02,1.91,4.63,2.28,5l1.62,1.62 C3.66,7.06,3.46,7.51,3.31,8H1C0.45,8,0,8.45,0,9v2c0,0.55,0.45,1,1,1h2.31c0.14,0.46,0.33,0.89,0.56,1.3L2.17,15 c-0.39,0.39-0.39,1.02,0,1.41l1.41,1.41c0.39,0.39,1.02,0.39,1.41,0l1.7-1.7c0.41,0.22,0.84,0.41,1.3,0.55V19c0,0.55,0.45,1,1,1h2 c0.55,0,1-0.45,1-1v-2.33c0.48-0.14,0.94-0.35,1.37-0.59L15,17.72c0.37,0.37,0.98,0.37,1.36,0l1.36-1.36 c0.37-0.37,0.37-0.98,0-1.36l-1.62-1.62c0.24-0.43,0.45-0.89,0.6-1.38H19c0.55,0,1-0.45,1-1V9C20,8.45,19.55,8,19,8z M10,14 c-2.21,0-4-1.79-4-4c0-2.21,1.79-4,4-4s4,1.79,4,4C14,12.21,12.21,14,10,14z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            keyboard:
              "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cg id='manually_entered_data_2_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' fill-rule='evenodd' clip-rule='evenodd' d='M1,8h3.76l2-2H1C0.45,6,0,6.45,0,7C0,7.55,0.45,8,1,8z M15.49,3.99 C15.8,3.67,16,3.23,16,2.75C16,1.78,15.22,1,14.25,1c-0.48,0-0.92,0.2-1.24,0.51l-1.44,1.44l2.47,2.47L15.49,3.99z M1,4h7.76l2-2 H1C0.45,2,0,2.45,0,3C0,3.55,0.45,4,1,4z M1,10c-0.55,0-1,0.45-1,1c0,0.48,0.35,0.86,0.8,0.96L2.76,10H1z M10.95,3.57l-6.69,6.69 l2.47,2.47l6.69-6.69L10.95,3.57z M15.2,6.04L13.24,8H15c0.55,0,1-0.45,1-1C16,6.52,15.65,6.14,15.2,6.04z M2,15l3.86-1.39 l-2.46-2.44L2,15z M15,10h-3.76l-2,2H15c0.55,0,1-0.45,1-1C16,10.45,15.55,10,15,10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            up: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' fill='%23FFF' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Ctitle%3EShape%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg id='Page-1' sketch:type='MSPage'%3E%3Cg id='Artboard-1' transform='translate(-3.000000, -1.000000)' sketch:type='MSArtboardGroup'%3E%3Cpath id='Shape' sketch:type='MSShapeGroup' d='M19.7,8.3l-6-6C13.5,2.1,13.3,2,13,2s-0.5,0.1-0.7,0.3l-6,6C6.1,8.5,6,8.7,6,9 c0,0.6,0.5,1,1,1c0.3,0,0.5-0.1,0.7-0.3L12,5.4V19c0,0.5,0.4,1,1,1s1-0.5,1-1V5.4l4.3,4.3C18.5,9.9,18.7,10,19,10c0.5,0,1-0.4,1-1 C20,8.7,19.9,8.5,19.7,8.3L19.7,8.3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            down: o,
            do: o,
            dw: o,
            dwn: o,
            left: i,
            le: i,
            lft: i,
            right: s,
            ri: s,
            rght: s,
            rgh: s,
            enter: c,
            en: c,
            enr: c,
            ent: c,
            entr: c,
          };
      },
      {
        "../dom/keys": 139,
        "./mouse": 135,
        "./pointer": 138,
        "core-js/modules/es6.array.from": 98,
        "core-js/modules/es6.array.iterator": 99,
        "core-js/modules/es6.function.name": 100,
        "core-js/modules/es6.object.keys": 103,
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.regexp.to-string": 109,
        "core-js/modules/es6.string.iterator": 110,
        "core-js/modules/es6.symbol": 111,
        "core-js/modules/es7.symbol.async-iterator": 115,
        "core-js/modules/web.dom.iterable": 116,
      },
    ],
    134: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.keyboard = function (t, e, n) {
            var o = n || {};
            function r(t) {
              return void 0 !== o[t] ? o[t] : t;
            }
            function i() {
              t.setOnKeyDown(function (t) {}),
                t.setOnKeyUp(function (t) {}),
                t.setOnKeyPress(function (t) {});
            }
            return (
              t.setOnKeyDown(function (t) {
                e.sendKeyEvent(r(t), !0);
              }),
              t.setOnKeyUp(function (t) {
                e.sendKeyEvent(r(t), !1);
              }),
              t.setOnKeyPress(function (t) {
                e.simulateKeyPress(r(t));
              }),
              e.events().onExit(i),
              i
            );
          });
      },
      {},
    ],
    135: [
      function (t, e, n) {
        "use strict";
        function K(t) {
          if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
            if (
              Array.isArray(t) ||
              (t = (function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return a(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if (
                  "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                )
                  return a(t, e);
              })(t))
            ) {
              var e = 0,
                n = function () {};
              return {
                s: n,
                n: function () {
                  return e >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[e++] };
                },
                e: function (t) {
                  throw t;
                },
                f: n,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var o,
            r,
            i = !0,
            s = !1;
          return {
            s: function () {
              o = t[Symbol.iterator]();
            },
            n: function () {
              var t = o.next();
              return (i = t.done), t;
            },
            e: function (t) {
              (s = !0), (r = t);
            },
            f: function () {
              try {
                i || null == o.return || o.return();
              } finally {
                if (s) throw r;
              }
            },
          };
        }
        function a(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
          return o;
        }
        t("core-js/modules/web.dom.iterable"),
          t("core-js/modules/es7.symbol.async-iterator"),
          t("core-js/modules/es6.symbol"),
          t("core-js/modules/es6.string.iterator"),
          t("core-js/modules/es6.array.from"),
          t("core-js/modules/es6.function.name"),
          t("core-js/modules/es6.regexp.to-string"),
          t("core-js/modules/es6.object.to-string"),
          Object.defineProperty(n, "__esModule", { value: !0 });
        var C,
          o,
          S = t("./pointer");
        ((o = C = n.MouseMode || (n.MouseMode = {}))[(o.DEFAULT = 0)] =
          "DEFAULT"),
          (o[(o.SCREEN_MOVER = 1)] = "SCREEN_MOVER"),
          (n.mouse = function (p, h, l) {
            var v = 0.01;
            function d(t, e) {
              var n = h.width(),
                o = h.height(),
                r = p.width,
                i = p.height,
                s = n / o,
                a = r,
                c = r / s;
              i < c && (a = (c = i) * s);
              var u = (i - c) / 2,
                l = (r - a) / 2,
                d = Math.max(0, Math.min(1, (t - l) / a)),
                f = Math.max(0, Math.min(1, (e - u) / c));
              return (
                d <= v && (d = 0),
                1 - v <= d && (d = 1),
                f <= v && (f = 0),
                1 - v <= f && (f = 1),
                { x: d, y: f }
              );
            }
            var y = p.mouseOverlay;
            function m(t) {
              if (t.target === y) {
                var e,
                  n,
                  o,
                  r,
                  i = S.getPointerState(t, y);
                l.mode === C.SCREEN_MOVER
                  ? h.sendMouseMotion(0.5, 0.5)
                  : ((e = i.x),
                    (n = i.y),
                    (o = i.button || l.pointerButton),
                    (r = d(e, n)),
                    h.sendMouseMotion(r.x, r.y),
                    h.sendMouseButton(o, !0)),
                  t.stopPropagation();
              }
            }
            function _(t) {
              if (t.target === y) {
                var e,
                  n,
                  o,
                  r = S.getPointerState(t, y);
                if (l.mode === C.SCREEN_MOVER) {
                  var i = d(r.x, r.y),
                    s = i.x,
                    a = i.y,
                    c = s < 0.3 ? 0 : 0.7 < s ? 1 : 0.5,
                    u = a < 0.3 ? 0 : 0.7 < a ? 1 : 0.5;
                  h.sendMouseMotion(c, u);
                } else
                  (e = r.x),
                    (n = r.y),
                    (o = d(e, n)),
                    h.sendMouseMotion(o.x, o.y);
                t.stopPropagation();
              }
            }
            function g(t) {
              var e,
                n = S.getPointerState(t, y);
              l.mode === C.SCREEN_MOVER
                ? h.sendMouseMotion(0.5, 0.5)
                : (n.x,
                  n.y,
                  (e = n.button || l.pointerButton),
                  h.sendMouseButton(e, !1)),
                t.stopPropagation();
            }
            function b(t) {
              if (t.target === y) {
                var e,
                  n,
                  o,
                  r = S.getPointerState(t, y);
                (e = r.x),
                  (n = r.y),
                  (o = d(e, n)),
                  h.sendMouseMotion(o.x, o.y),
                  t.stopPropagation();
              }
            }
            function w(t) {
              t.stopPropagation();
            }
            var t,
              x = { capture: !1 },
              e = K(S.pointer.starters);
            try {
              for (e.s(); !(t = e.n()).done; ) {
                var n = t.value;
                y.addEventListener(n, m, x);
              }
            } catch (t) {
              e.e(t);
            } finally {
              e.f();
            }
            var o,
              r = K(S.pointer.changers);
            try {
              for (r.s(); !(o = r.n()).done; ) {
                var i = o.value;
                y.addEventListener(i, _, x);
              }
            } catch (t) {
              r.e(t);
            } finally {
              r.f();
            }
            var s,
              a = K(S.pointer.enders);
            try {
              for (a.s(); !(s = a.n()).done; ) {
                var c = s.value;
                y.addEventListener(c, g, x);
              }
            } catch (t) {
              a.e(t);
            } finally {
              a.f();
            }
            var u,
              f = K(S.pointer.prevents);
            try {
              for (f.s(); !(u = f.n()).done; ) {
                var D = u.value;
                y.addEventListener(D, w, x);
              }
            } catch (t) {
              f.e(t);
            } finally {
              f.f();
            }
            var k,
              E = K(S.pointer.leavers);
            try {
              for (E.s(); !(k = E.n()).done; ) {
                var B = k.value;
                y.addEventListener(B, b, x);
              }
            } catch (t) {
              E.e(t);
            } finally {
              E.f();
            }
            function j() {
              var t,
                e = K(S.pointer.starters);
              try {
                for (e.s(); !(t = e.n()).done; ) {
                  var n = t.value;
                  y.removeEventListener(n, m, x);
                }
              } catch (t) {
                e.e(t);
              } finally {
                e.f();
              }
              var o,
                r = K(S.pointer.changers);
              try {
                for (r.s(); !(o = r.n()).done; ) {
                  var i = o.value;
                  y.removeEventListener(i, _, x);
                }
              } catch (t) {
                r.e(t);
              } finally {
                r.f();
              }
              var s,
                a = K(S.pointer.enders);
              try {
                for (a.s(); !(s = a.n()).done; ) {
                  var c = s.value;
                  y.removeEventListener(c, g, x);
                }
              } catch (t) {
                a.e(t);
              } finally {
                a.f();
              }
              var u,
                l = K(S.pointer.prevents);
              try {
                for (l.s(); !(u = l.n()).done; ) {
                  var d = u.value;
                  y.removeEventListener(d, w, x);
                }
              } catch (t) {
                l.e(t);
              } finally {
                l.f();
              }
              var f,
                p = K(S.pointer.leavers);
              try {
                for (p.s(); !(f = p.n()).done; ) {
                  var h = f.value;
                  y.removeEventListener(h, b, x);
                }
              } catch (t) {
                p.e(t);
              } finally {
                p.f();
              }
            }
            return h.events().onExit(j), j;
          });
      },
      {
        "./pointer": 138,
        "core-js/modules/es6.array.from": 98,
        "core-js/modules/es6.function.name": 100,
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.regexp.to-string": 109,
        "core-js/modules/es6.string.iterator": 110,
        "core-js/modules/es6.symbol": 111,
        "core-js/modules/es7.symbol.async-iterator": 115,
        "core-js/modules/web.dom.iterable": 116,
      },
    ],
    136: [
      function (t, e, n) {
        "use strict";
        function h(t) {
          if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
            if (
              Array.isArray(t) ||
              (t = (function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return a(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if (
                  "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                )
                  return a(t, e);
              })(t))
            ) {
              var e = 0,
                n = function () {};
              return {
                s: n,
                n: function () {
                  return e >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[e++] };
                },
                e: function (t) {
                  throw t;
                },
                f: n,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var o,
            r,
            i = !0,
            s = !1;
          return {
            s: function () {
              o = t[Symbol.iterator]();
            },
            n: function () {
              var t = o.next();
              return (i = t.done), t;
            },
            e: function (t) {
              (s = !0), (r = t);
            },
            f: function () {
              try {
                i || null == o.return || o.return();
              } finally {
                if (s) throw r;
              }
            },
          };
        }
        function a(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
          return o;
        }
        t("core-js/modules/web.dom.iterable"),
          t("core-js/modules/es7.symbol.async-iterator"),
          t("core-js/modules/es6.symbol"),
          t("core-js/modules/es6.string.iterator"),
          t("core-js/modules/es6.array.from"),
          t("core-js/modules/es6.function.name"),
          t("core-js/modules/es6.regexp.to-string"),
          t("core-js/modules/es6.object.to-string"),
          Object.defineProperty(n, "__esModule", { value: !0 });
        var v = t("nipplejs"),
          y = t("../dom/keys");
        n.nipple = function (n, t, e) {
          function o() {
            -1 !== s && (n.fireKeyUp(s), (s = -1));
          }
          var r,
            i = v.create({
              zone: n.mouseOverlay,
              multitouch: !0,
              maxNumberOfNipples: 2,
            }),
            s = -1,
            a = {},
            c = {},
            u = {},
            l = h(e);
          try {
            var d = function () {
              var e = r.value;
              "end:release" === e.event
                ? (a[e.joystickId] = !0)
                : e.mapTo !== y.KBD_NONE &&
                  ("tap" === e.event
                    ? (c[e.joystickId] = e.mapTo)
                    : i.on(e.event, function () {
                        var t;
                        (u[e.joystickId] = Date.now()),
                          o(),
                          (t = e.mapTo),
                          n.fireKeyDown(t),
                          (s = t);
                      }));
            };
            for (l.s(); !(r = l.n()).done; ) d();
          } catch (t) {
            l.e(t);
          } finally {
            l.f();
          }
          var f = {};
          function p() {
            return i.destroy();
          }
          return (
            i.on("start", function () {
              var t = i.ids.length - 1;
              f[t] = Date.now();
            }),
            i.on("end", function () {
              var t = i.ids.length - 1,
                e = Date.now() - f[t];
              !0 === a[t] && o(),
                c[t] && e < 500 && u[t] < f[t] && n.fireKeyPress(c[t]);
            }),
            t.events().onExit(p),
            p
          );
        };
      },
      {
        "../dom/keys": 139,
        "core-js/modules/es6.array.from": 98,
        "core-js/modules/es6.function.name": 100,
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.regexp.to-string": 109,
        "core-js/modules/es6.string.iterator": 110,
        "core-js/modules/es6.symbol": 111,
        "core-js/modules/es7.symbol.async-iterator": 115,
        "core-js/modules/web.dom.iterable": 116,
        nipplejs: 128,
      },
    ],
    137: [
      function (t, e, n) {
        "use strict";
        function w(t) {
          if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
            if (
              Array.isArray(t) ||
              (t = (function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return a(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if (
                  "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                )
                  return a(t, e);
              })(t))
            ) {
              var e = 0,
                n = function () {};
              return {
                s: n,
                n: function () {
                  return e >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[e++] };
                },
                e: function (t) {
                  throw t;
                },
                f: n,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var o,
            r,
            i = !0,
            s = !1;
          return {
            s: function () {
              o = t[Symbol.iterator]();
            },
            n: function () {
              var t = o.next();
              return (i = t.done), t;
            },
            e: function (t) {
              (s = !0), (r = t);
            },
            f: function () {
              try {
                i || null == o.return || o.return();
              } finally {
                if (s) throw r;
              }
            },
          };
        }
        function a(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
          return o;
        }
        t("core-js/modules/web.dom.iterable"),
          t("core-js/modules/es7.symbol.async-iterator"),
          t("core-js/modules/es6.symbol"),
          t("core-js/modules/es6.string.iterator"),
          t("core-js/modules/es6.array.from"),
          t("core-js/modules/es6.function.name"),
          t("core-js/modules/es6.regexp.to-string"),
          t("core-js/modules/es6.object.to-string");
        var o = function (t) {
          return t && t.__esModule ? t : { default: t };
        };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var x = t("./button"),
          v = t("./pointer"),
          D = o(t("simple-keyboard")),
          k = t("../dom/keys");
        function E(t, e) {
          function n(t) {
            t.stopPropagation();
          }
          function o(t) {
            t.stopPropagation(), i && t.preventDefault();
          }
          var r,
            i = !(1 < arguments.length && void 0 !== e) || e,
            s = { capture: !1 },
            a = w(v.pointer.starters);
          try {
            for (a.s(); !(r = a.n()).done; ) {
              var c = r.value;
              t.addEventListener(c, n, s);
            }
          } catch (t) {
            a.e(t);
          } finally {
            a.f();
          }
          var u,
            l = w(v.pointer.enders);
          try {
            for (l.s(); !(u = l.n()).done; ) {
              var d = u.value;
              t.addEventListener(d, n, s);
            }
          } catch (t) {
            l.e(t);
          } finally {
            l.f();
          }
          var f,
            p = w(v.pointer.prevents);
          try {
            for (p.s(); !(f = p.n()).done; ) {
              var h = f.value;
              t.addEventListener(h, o, s);
            }
          } catch (t) {
            p.e(t);
          } finally {
            p.f();
          }
        }
        function B(t, e) {
          var n = document.createElement("div");
          return (n.className = t), void 0 !== e && (n.innerHTML = e), n;
        }
        n.options = function (n, t, e, o) {
          var r = n.getScale(),
            i = Math.round(x.ButtonSize * r),
            s = Math.round(i / 4),
            a = !1,
            c = !1,
            u = B("emulator-keyboard");
          function l() {
            var t = (c = !c) ? "block" : "none";
            return (
              (u.style.display = t),
              c
                ? y.classList.add("emulator-control-close-icon")
                : y.classList.remove("emulator-control-close-icon"),
              c
            );
          }
          function d() {
            var t,
              e = a ? "flex" : "none",
              n = w(p);
            try {
              for (n.s(); !(t = n.n()).done; ) {
                var o = t.value;
                o != h && (o.style.display = e);
              }
            } catch (t) {
              n.e(t);
            } finally {
              n.f();
            }
          }
          function f() {
            !(a = !a) && c && l(), d();
          }
          (u.style.display = "none"),
            E(u),
            new D.default(u, {
              layout: j,
              onKeyPress: function (t) {
                var e = (function (t) {
                  var e = 0;
                  1 < t.length
                    ? "{enter}" === t
                      ? (e = k.KBD_enter)
                      : "{shift}" === t
                      ? (e = k.KBD_leftshift)
                      : "{bksp}" === t
                      ? (e = k.KBD_backspace)
                      : "{lock}" === t
                      ? (e = k.KBD_capslock)
                      : "{tab}" === t
                      ? (e = k.KBD_tab)
                      : "{space}" === t
                      ? (e = k.KBD_space)
                      : "{esc}" === t
                      ? (e = k.KBD_esc)
                      : "ctrl" === t
                      ? (e = k.KBD_leftctrl)
                      : "{alt}" === t
                      ? (e = k.KBD_leftalt)
                      : console.warn("Unknown button", t)
                    : (e = k.domToKeyCode(t.toUpperCase().charCodeAt(0)));
                  return e;
                })(t);
                0 !== e && n.fireKeyPress(e);
              },
              preventMouseDownDefault: !0,
              preventMouseUpDefault: !0,
              stopMouseDownPropagation: !0,
              stopMouseUpPropagation: !0,
              autoUseTouchEvents: !0,
              useMouseEvents: !0,
            });
          var p = [
              (function (t, n) {
                if (t.length <= 1) return document.createElement("div");
                var e = document.createElement("select");
                e.classList.add("emulator-control-select");
                var o,
                  r = w(t);
                try {
                  for (r.s(); !(o = r.n()).done; ) {
                    var i = o.value,
                      s = document.createElement("option");
                    (s.value = i), (s.innerHTML = i), e.appendChild(s);
                  }
                } catch (t) {
                  r.e(t);
                } finally {
                  r.f();
                }
                return (
                  (e.onchange = function (t) {
                    var e = t.target.value;
                    n(e);
                  }),
                  E(e, !1),
                  e
                );
              })(e, o),
              x.createButton(
                "keyboard",
                {
                  onClick: function () {
                    l(), a && !c && ((a = !1), d());
                  },
                },
                r
              ),
              x.createButton(
                "save",
                {
                  onClick: function () {
                    n.save(), a && f();
                  },
                },
                r
              ),
              x.createButton(
                "fullscreen",
                {
                  onClick: function () {
                    n.toggleFullscreen(), a && f();
                  },
                },
                r
              ),
              x.createButton("options", { onClick: f }, r),
            ],
            h = p[p.length - 1],
            v = p[p.length - 2].children[0],
            y = p[p.length - 4].children[0];
          n.setOnFullscreen(function (t) {
            t
              ? v.classList.contains("emulator-control-exit-fullscreen-icon") ||
                v.classList.add("emulator-control-exit-fullscreen-icon")
              : v.classList.remove("emulator-control-exit-fullscreen-icon");
          });
          for (var m = B("emulator-options"), _ = 0, g = p; _ < g.length; _++) {
            var b = g[_];
            b !== h && b.classList.add("emulator-button-control"),
              (b.style.marginRight = s + "px"),
              (b.style.marginBottom = s + "px"),
              b !== h && (b.style.display = "none"),
              m.appendChild(b);
          }
          (m.style.position = "absolute"),
            (m.style.right = "0"),
            (m.style.top = s + "px"),
            n.mouseOverlay.appendChild(m),
            n.mouseOverlay.appendChild(u),
            (n.toggleKeyboard = l),
            t.events().onExit(function () {
              (n.toggleKeyboard = function () {
                return !1;
              }),
                n.mouseOverlay.removeChild(m),
                n.mouseOverlay.removeChild(u),
                n.setOnFullscreen(function () {});
            });
        };
        var j = {
          default: [
            "{esc} ` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
            "q w e r t y u i o p [ ] \\",
            "a s d f g h j k l ; ' {enter}",
            "z x c v b n m , . / {space}",
          ],
        };
      },
      {
        "../dom/keys": 139,
        "./button": 133,
        "./pointer": 138,
        "core-js/modules/es6.array.from": 98,
        "core-js/modules/es6.function.name": 100,
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.regexp.to-string": 109,
        "core-js/modules/es6.string.iterator": 110,
        "core-js/modules/es6.symbol": 111,
        "core-js/modules/es7.symbol.async-iterator": 115,
        "core-js/modules/web.dom.iterable": 116,
        "simple-keyboard": 131,
      },
    ],
    138: [
      function (t, e, n) {
        "use strict";
        t("core-js/modules/es6.regexp.match"),
          Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.pointer = (function () {
            var t = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
              e = t && !!("ontouchstart" in window),
              n = t && !!window.PointerEvent,
              o = t && !!window.MSPointerEvent,
              r = [],
              i = [],
              s = [],
              a = [],
              c = [];
            n
              ? (r.push("pointerdown"),
                s.push("pointerup", "pointercancel"),
                i.push("pointermove"),
                c.push("touchstart", "touchmove", "touchend"))
              : o
              ? (r.push("MSPointerDown"),
                i.push("MSPointerMove"),
                s.push("MSPointerUp"))
              : e
              ? (r.push("touchstart", "mousedown"),
                i.push("touchmove"),
                s.push("touchend", "touchcancel", "mouseup"))
              : (r.push("mousedown"),
                i.push("mousemove"),
                s.push("mouseup"),
                a.push("mouseleave"));
            return {
              starters: r,
              changers: i,
              enders: s,
              prevents: c,
              leavers: a,
            };
          })()),
          (n.getPointerState = function (t, e) {
            if (t.type.match(/^touch/)) {
              var n = t,
                o = e.getBoundingClientRect();
              return {
                x: n.targetTouches[0].clientX - o.x,
                y: n.targetTouches[0].clientY - o.y,
              };
            }
            if (t.type.match(/^pointer/)) {
              return { x: t.offsetX, y: t.offsetY };
            }
            return {
              x: t.offsetX,
              y: t.offsetY,
              button: 0 === t.button ? 0 : 1,
            };
          });
      },
      { "core-js/modules/es6.regexp.match": 108 },
    ],
    139: [
      function (t, e, n) {
        "use strict";
        t("core-js/modules/es6.number.constructor"),
          t("core-js/modules/es6.number.parse-int"),
          t("core-js/modules/web.dom.iterable"),
          t("core-js/modules/es6.array.iterator"),
          t("core-js/modules/es6.object.to-string"),
          t("core-js/modules/es6.object.keys"),
          Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.KBD_NONE = 0),
          (n.KBD_0 = 48),
          (n.KBD_1 = 49),
          (n.KBD_2 = 50),
          (n.KBD_3 = 51),
          (n.KBD_4 = 52),
          (n.KBD_5 = 53),
          (n.KBD_6 = 54),
          (n.KBD_7 = 55),
          (n.KBD_8 = 56),
          (n.KBD_9 = 57),
          (n.KBD_a = 65),
          (n.KBD_b = 66),
          (n.KBD_c = 67),
          (n.KBD_d = 68),
          (n.KBD_e = 69),
          (n.KBD_f = 70),
          (n.KBD_g = 71),
          (n.KBD_h = 72),
          (n.KBD_i = 73),
          (n.KBD_j = 74),
          (n.KBD_k = 75),
          (n.KBD_l = 76),
          (n.KBD_m = 77),
          (n.KBD_n = 78),
          (n.KBD_o = 79),
          (n.KBD_p = 80),
          (n.KBD_q = 81),
          (n.KBD_r = 82),
          (n.KBD_s = 83),
          (n.KBD_t = 84),
          (n.KBD_u = 85),
          (n.KBD_v = 86),
          (n.KBD_w = 87),
          (n.KBD_x = 88),
          (n.KBD_y = 89),
          (n.KBD_z = 90),
          (n.KBD_f1 = 290),
          (n.KBD_f2 = 291),
          (n.KBD_f3 = 292),
          (n.KBD_f4 = 293),
          (n.KBD_f5 = 294),
          (n.KBD_f6 = 295),
          (n.KBD_f7 = 296),
          (n.KBD_f8 = 297),
          (n.KBD_f9 = 298),
          (n.KBD_f10 = 299),
          (n.KBD_f11 = 300),
          (n.KBD_f12 = 301),
          (n.KBD_kp0 = 320),
          (n.KBD_kp1 = 321),
          (n.KBD_kp2 = 322),
          (n.KBD_kp3 = 323),
          (n.KBD_kp4 = 324),
          (n.KBD_kp5 = 325),
          (n.KBD_kp6 = 326),
          (n.KBD_kp7 = 327),
          (n.KBD_kp8 = 328),
          (n.KBD_kp9 = 329),
          (n.KBD_kpperiod = 330),
          (n.KBD_kpdivide = 331),
          (n.KBD_kpmultiply = 332),
          (n.KBD_kpminus = 333),
          (n.KBD_kpplus = 334),
          (n.KBD_kpenter = 335),
          (n.KBD_esc = 256),
          (n.KBD_tab = 258),
          (n.KBD_backspace = 259),
          (n.KBD_enter = 257),
          (n.KBD_space = 32),
          (n.KBD_leftalt = 342),
          (n.KBD_rightalt = 346),
          (n.KBD_leftctrl = 341),
          (n.KBD_rightctrl = 345),
          (n.KBD_leftshift = 340),
          (n.KBD_rightshift = 344),
          (n.KBD_capslock = 280),
          (n.KBD_scrolllock = 281),
          (n.KBD_numlock = 282),
          (n.KBD_grave = 96),
          (n.KBD_minus = 45),
          (n.KBD_equals = 61),
          (n.KBD_backslash = 92),
          (n.KBD_leftbracket = 91),
          (n.KBD_rightbracket = 93),
          (n.KBD_semicolon = 59),
          (n.KBD_quote = 39),
          (n.KBD_period = 46),
          (n.KBD_comma = 44),
          (n.KBD_slash = 47),
          (n.KBD_printscreen = 283),
          (n.KBD_pause = 284),
          (n.KBD_insert = 260),
          (n.KBD_home = 268),
          (n.KBD_pageup = 266),
          (n.KBD_delete = 261),
          (n.KBD_end = 269),
          (n.KBD_pagedown = 267),
          (n.KBD_left = 263),
          (n.KBD_up = 265),
          (n.KBD_down = 264),
          (n.KBD_right = 262),
          (n.KBD_extra_lt_gt = 348),
          (n.domToKeyCodes = {
            8: n.KBD_backspace,
            9: n.KBD_tab,
            13: n.KBD_enter,
            16: n.KBD_leftshift,
            17: n.KBD_leftctrl,
            18: n.KBD_leftalt,
            19: n.KBD_pause,
            27: n.KBD_esc,
            32: n.KBD_space,
            33: n.KBD_pageup,
            34: n.KBD_pagedown,
            35: n.KBD_end,
            36: n.KBD_home,
            37: n.KBD_left,
            38: n.KBD_up,
            39: n.KBD_right,
            40: n.KBD_down,
            45: n.KBD_insert,
            46: n.KBD_delete,
            48: n.KBD_0,
            49: n.KBD_1,
            50: n.KBD_2,
            51: n.KBD_3,
            52: n.KBD_4,
            53: n.KBD_5,
            54: n.KBD_6,
            55: n.KBD_7,
            56: n.KBD_8,
            57: n.KBD_9,
            59: n.KBD_semicolon,
            64: n.KBD_equals,
            65: n.KBD_a,
            66: n.KBD_b,
            67: n.KBD_c,
            68: n.KBD_d,
            69: n.KBD_e,
            70: n.KBD_f,
            71: n.KBD_g,
            72: n.KBD_h,
            73: n.KBD_i,
            74: n.KBD_j,
            75: n.KBD_k,
            76: n.KBD_l,
            77: n.KBD_m,
            78: n.KBD_n,
            79: n.KBD_o,
            80: n.KBD_p,
            81: n.KBD_q,
            82: n.KBD_r,
            83: n.KBD_s,
            84: n.KBD_t,
            85: n.KBD_u,
            86: n.KBD_v,
            87: n.KBD_w,
            88: n.KBD_x,
            89: n.KBD_y,
            90: n.KBD_z,
            96: n.KBD_kp0,
            97: n.KBD_kp1,
            98: n.KBD_kp2,
            99: n.KBD_kp3,
            100: n.KBD_kp4,
            101: n.KBD_kp5,
            102: n.KBD_kp6,
            103: n.KBD_kp7,
            104: n.KBD_kp8,
            105: n.KBD_kp9,
            111: n.KBD_kpdivide,
            112: n.KBD_f1,
            113: n.KBD_f2,
            114: n.KBD_f3,
            115: n.KBD_f4,
            116: n.KBD_f5,
            117: n.KBD_f6,
            118: n.KBD_f7,
            119: n.KBD_f8,
            120: n.KBD_f9,
            121: n.KBD_f10,
            122: n.KBD_f11,
            123: n.KBD_f12,
            144: n.KBD_numlock,
            145: n.KBD_scrolllock,
            173: n.KBD_minus,
            186: n.KBD_semicolon,
            187: n.KBD_equals,
            188: n.KBD_comma,
            189: n.KBD_minus,
            190: n.KBD_period,
            191: n.KBD_slash,
            219: n.KBD_leftbracket,
            220: n.KBD_backslash,
            221: n.KBD_rightbracket,
          }),
          (n.namedKeyCodes = {
            KBD_NONE: n.KBD_NONE,
            KBD_0: n.KBD_0,
            KBD_1: n.KBD_1,
            KBD_2: n.KBD_2,
            KBD_3: n.KBD_3,
            KBD_4: n.KBD_4,
            KBD_5: n.KBD_5,
            KBD_6: n.KBD_6,
            KBD_7: n.KBD_7,
            KBD_8: n.KBD_8,
            KBD_9: n.KBD_9,
            KBD_a: n.KBD_a,
            KBD_b: n.KBD_b,
            KBD_c: n.KBD_c,
            KBD_d: n.KBD_d,
            KBD_e: n.KBD_e,
            KBD_f: n.KBD_f,
            KBD_g: n.KBD_g,
            KBD_h: n.KBD_h,
            KBD_i: n.KBD_i,
            KBD_j: n.KBD_j,
            KBD_k: n.KBD_k,
            KBD_l: n.KBD_l,
            KBD_m: n.KBD_m,
            KBD_n: n.KBD_n,
            KBD_o: n.KBD_o,
            KBD_p: n.KBD_p,
            KBD_q: n.KBD_q,
            KBD_r: n.KBD_r,
            KBD_s: n.KBD_s,
            KBD_t: n.KBD_t,
            KBD_u: n.KBD_u,
            KBD_v: n.KBD_v,
            KBD_w: n.KBD_w,
            KBD_x: n.KBD_x,
            KBD_y: n.KBD_y,
            KBD_z: n.KBD_z,
            KBD_f1: n.KBD_f1,
            KBD_f2: n.KBD_f2,
            KBD_f3: n.KBD_f3,
            KBD_f4: n.KBD_f4,
            KBD_f5: n.KBD_f5,
            KBD_f6: n.KBD_f6,
            KBD_f7: n.KBD_f7,
            KBD_f8: n.KBD_f8,
            KBD_f9: n.KBD_f9,
            KBD_f10: n.KBD_f10,
            KBD_f11: n.KBD_f11,
            KBD_f12: n.KBD_f12,
            KBD_kp0: n.KBD_kp0,
            KBD_kp1: n.KBD_kp1,
            KBD_kp2: n.KBD_kp2,
            KBD_kp3: n.KBD_kp3,
            KBD_kp4: n.KBD_kp4,
            KBD_kp5: n.KBD_kp5,
            KBD_kp6: n.KBD_kp6,
            KBD_kp7: n.KBD_kp7,
            KBD_kp8: n.KBD_kp8,
            KBD_kp9: n.KBD_kp9,
            KBD_kpperiod: n.KBD_kpperiod,
            KBD_kpdivide: n.KBD_kpdivide,
            KBD_kpmultiply: n.KBD_kpmultiply,
            KBD_kpminus: n.KBD_kpminus,
            KBD_kpplus: n.KBD_kpplus,
            KBD_kpenter: n.KBD_kpenter,
            KBD_esc: n.KBD_esc,
            KBD_tab: n.KBD_tab,
            KBD_backspace: n.KBD_backspace,
            KBD_enter: n.KBD_enter,
            KBD_space: n.KBD_space,
            KBD_leftalt: n.KBD_leftalt,
            KBD_rightalt: n.KBD_rightalt,
            KBD_leftctrl: n.KBD_leftctrl,
            KBD_rightctrl: n.KBD_rightctrl,
            KBD_leftshift: n.KBD_leftshift,
            KBD_rightshift: n.KBD_rightshift,
            KBD_capslock: n.KBD_capslock,
            KBD_scrolllock: n.KBD_scrolllock,
            KBD_numlock: n.KBD_numlock,
            KBD_grave: n.KBD_grave,
            KBD_minus: n.KBD_minus,
            KBD_equals: n.KBD_equals,
            KBD_backslash: n.KBD_backslash,
            KBD_leftbracket: n.KBD_leftbracket,
            KBD_rightbracket: n.KBD_rightbracket,
            KBD_semicolon: n.KBD_semicolon,
            KBD_quote: n.KBD_quote,
            KBD_period: n.KBD_period,
            KBD_comma: n.KBD_comma,
            KBD_slash: n.KBD_slash,
            KBD_printscreen: n.KBD_printscreen,
            KBD_pause: n.KBD_pause,
            KBD_insert: n.KBD_insert,
            KBD_home: n.KBD_home,
            KBD_pageup: n.KBD_pageup,
            KBD_delete: n.KBD_delete,
            KBD_end: n.KBD_end,
            KBD_pagedown: n.KBD_pagedown,
            KBD_left: n.KBD_left,
            KBD_up: n.KBD_up,
            KBD_down: n.KBD_down,
            KBD_right: n.KBD_right,
            KBD_extra_lt_gt: n.KBD_extra_lt_gt,
          }),
          (n.keyCodesToDom = {});
        for (var o = 0, r = Object.keys(n.domToKeyCodes); o < r.length; o++) {
          var i = r[o],
            s = Number.parseInt(i, 10);
          n.keyCodesToDom[n.domToKeyCodes[s]] = s;
        }
        n.domToKeyCode = function (t) {
          return n.domToKeyCodes[t] || 0;
        };
      },
      {
        "core-js/modules/es6.array.iterator": 99,
        "core-js/modules/es6.number.constructor": 101,
        "core-js/modules/es6.number.parse-int": 102,
        "core-js/modules/es6.object.keys": 103,
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/web.dom.iterable": 116,
      },
    ],
    140: [
      function (t, e, n) {
        "use strict";
        function r(t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o);
          }
        }
        t("core-js/modules/es6.promise"),
          t("core-js/modules/es6.object.to-string"),
          Object.defineProperty(n, "__esModule", { value: !0 });
        var i = t("./keys"),
          s = t("notyf"),
          a = t("element-resize-detector")({});
        n.layers = function (t, e) {
          return new o(t, e || { scale: 1 });
        };
        var o = (function () {
          function o(e, t) {
            var n = this;
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, o),
              (this.notyf = new s.Notyf()),
              (this.toggleKeyboard = function () {
                return !1;
              }),
              (this.fullscreen = !1),
              (this.onFullscreenChanged = function () {}),
              (this.scale = t.scale),
              (this.root = e),
              this.root.classList.add("emulator-root"),
              (this.canvas = document.createElement("canvas")),
              (this.canvas.className = "emulator-canvas"),
              (this.video = document.createElement("video")),
              this.video.setAttribute("autoplay", ""),
              this.video.setAttribute("playsinline", ""),
              (this.video.className = "emulator-video"),
              (this.loading = c(
                "emulator-loading",
                "\n<div class='emulator-loading-inner'>\n<pre class='emulator-loading-pre-1'>\n        _                __\n       (_)____      ____/ /___  _____ _________  ____ ___\n      / / ___/_____/ __  / __ \\/ ___// ___/ __ \\/ __ `__ \\\n     / (__  )_____/ /_/ / /_/ (__  )/ /__/ /_/ / / / / / /\n  __/ /____/      \\__,_/\\____/____(_)___/\\____/_/ /_/ /_/\n /___/\n</pre>\n<pre class='emulator-loading-pre-2'>\n</pre>\n<div class='emulator-loader'>\n</div>\n</div>\n"
              )),
              (this.loaderText = this.loading.querySelector(
                ".emulator-loading-pre-2"
              )),
              (this.mouseOverlay = c("emulator-mouse-overlay", "")),
              (this.clickToStart = c(
                "emulator-click-to-start-overlay",
                '\n<div class="emulator-click-to-start-text">Press to start</div>\n<div class="emulator-click-to-start-icon"></div>\n'
              )),
              (this.clickToStart.onclick = function () {
                (n.clickToStart.style.display = "none"), n.video.play();
              }),
              this.root.appendChild(this.canvas),
              this.root.appendChild(this.video),
              this.root.appendChild(this.mouseOverlay),
              this.root.appendChild(this.clickToStart),
              this.root.appendChild(this.loading),
              (this.width = e.offsetWidth),
              (this.height = e.offsetHeight),
              (this.onResize = function () {}),
              (this.onKeyDown = function () {}),
              (this.onKeyUp = function () {}),
              (this.onKeyPress = function () {}),
              (this.onSave = function () {
                return Promise.reject(new Error("Not implemented"));
              }),
              a.listenTo(this.root, function (t) {
                t === e &&
                  ((n.width = t.offsetWidth),
                  (n.height = t.offsetHeight),
                  n.onResize(n.width, n.height));
              }),
              this.initKeyEvents(),
              this.preventContextMenu(),
              (this.root.onfullscreenchange = function () {
                document.fullscreenElement !== n.root &&
                  ((n.fullscreen = !1), n.onFullscreenChanged(n.fullscreen));
              });
          }
          var t, e, n;
          return (
            (t = o),
            (e = [
              {
                key: "initKeyEvents",
                value: function () {
                  var n = this;
                  window.addEventListener("keydown", function (t) {
                    var e = i.domToKeyCode(t.keyCode);
                    n.onKeyDown(e);
                  }),
                    window.addEventListener("keyup", function (t) {
                      var e = i.domToKeyCode(t.keyCode);
                      n.onKeyUp(e);
                    });
                },
              },
              {
                key: "preventContextMenu",
                value: function () {
                  this.root.addEventListener("contextmenu", function (t) {
                    return t.stopPropagation(), t.preventDefault(), !1;
                  });
                },
              },
              {
                key: "setOnResize",
                value: function (t) {
                  this.onResize = t;
                },
              },
              {
                key: "setOnKeyDown",
                value: function (t) {
                  this.onKeyDown = t;
                },
              },
              {
                key: "fireKeyDown",
                value: function (t) {
                  this.onKeyDown(t);
                },
              },
              {
                key: "setOnKeyUp",
                value: function (t) {
                  this.onKeyUp = t;
                },
              },
              {
                key: "fireKeyUp",
                value: function (t) {
                  this.onKeyUp(t);
                },
              },
              {
                key: "setOnKeyPress",
                value: function (t) {
                  this.onKeyPress = t;
                },
              },
              {
                key: "fireKeyPress",
                value: function (t) {
                  this.onKeyPress(t);
                },
              },
              {
                key: "toggleFullscreen",
                value: function () {
                  if (this.fullscreen)
                    (this.fullscreen = !1),
                      this.root.classList.contains(
                        "emulator-fullscreen-workaround"
                      )
                        ? this.root.classList.remove(
                            "emulator-fullscreen-workaround"
                          )
                        : document.exitFullscreen
                        ? document.exitFullscreen()
                        : document.webkitExitFullscreen
                        ? document.webkitExitFullscreen()
                        : document.webkitExitFullscreen
                        ? document.mozCancelFullScreen()
                        : document.msExitFullscreen &&
                          document.msExitFullscreen(),
                      this.onFullscreenChanged(!1);
                  else {
                    this.fullscreen = !0;
                    var t = this.root;
                    t.requestFullscreen
                      ? t.requestFullscreen()
                      : t.webkitRequestFullscreen
                      ? t.webkitRequestFullscreen()
                      : t.mozRequestFullScreen
                      ? t.mozRequestFullScreen()
                      : t.msRequestFullscreen
                      ? t.msRequestFullscreen()
                      : t.webkitEnterFullscreen
                      ? t.webkitEnterFullscreen()
                      : this.root.classList.add(
                          "emulator-fullscreen-workaround"
                        ),
                      this.onFullscreenChanged(!0);
                  }
                },
              },
              {
                key: "setOnFullscreen",
                value: function (t) {
                  this.onFullscreenChanged = t;
                },
              },
              {
                key: "save",
                value: function () {
                  var e = this;
                  return this.onSave()
                    .then(function () {
                      e.notyf.success("Saved");
                    })
                    .catch(function (t) {
                      e.notyf.error(t.message);
                    });
                },
              },
              {
                key: "setOnSave",
                value: function (t) {
                  this.onSave = t;
                },
              },
              {
                key: "hideLoadingLayer",
                value: function () {
                  this.loading.style.visibility = "hidden";
                },
              },
              {
                key: "showLoadingLayer",
                value: function () {
                  this.loading.style.visibility = "visible";
                },
              },
              {
                key: "setLoadingMessage",
                value: function (t) {
                  this.loaderText.innerHTML = t;
                },
              },
              {
                key: "switchToVideo",
                value: function () {
                  (this.video.style.display = "block"),
                    (this.canvas.style.display = "none");
                },
              },
              {
                key: "showClickToStart",
                value: function () {
                  this.clickToStart.style.display = "flex";
                },
              },
              {
                key: "getScale",
                value: function () {
                  return this.scale;
                },
              },
            ]) && r(t.prototype, e),
            n && r(t, n),
            o
          );
        })();
        function c(t, e) {
          var n = document.createElement("div");
          return (n.className = t), (n.innerHTML = e), n;
        }
        n.Layers = o;
      },
      {
        "./keys": 139,
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.promise": 105,
        "element-resize-detector": 121,
        notyf: 129,
      },
    ],
    141: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 });
        function o() {
          var n = this;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, o),
            (this.dom = { layers: r.layers }),
            (this.network = { resolveBundle: i.resolveBundle }),
            (this.graphics = { webGl: a.webGl, _2d: s._2d, video: c.video }),
            (this.sound = { audioNode: v.audioNode }),
            (this.persist = { save: m.save, load: m.load }),
            (this.controls = {
              namedKeyCodes: h.namedKeyCodes,
              domToKeyCodes: h.domToKeyCodes,
              domToKeyCode: h.domToKeyCode,
              keyCodesToDom: h.keyCodesToDom,
              keyboard: u.keyboard,
              mouse: l.mouse,
              nipple: d.nipple,
              button: f.button,
              options: p.options,
            }),
            (this.notifications = { notyf: y.notyf }),
            (this.dos = function (t, e) {
              return new _.DosInstance(t, n, e || {});
            });
        }
        var r = t("./dom/layers"),
          i = t("./network/xhr"),
          s = t("./graphics/_2d"),
          a = t("./graphics/webgl"),
          c = t("./graphics/video"),
          u = t("./controls/keyboard"),
          l = t("./controls/mouse"),
          d = t("./controls/nipple"),
          f = t("./controls/button"),
          p = t("./controls/options"),
          h = t("./dom/keys"),
          v = t("./sound/audio-node"),
          y = t("./notification/notyf"),
          m = t("./persist/save-load"),
          _ = t("./js-dos"),
          g = new (n.EmulatorsUi = o)();
        (window.emulatorsUi = g), (window.Dos = g.dos);
      },
      {
        "./controls/button": 133,
        "./controls/keyboard": 134,
        "./controls/mouse": 135,
        "./controls/nipple": 136,
        "./controls/options": 137,
        "./dom/keys": 139,
        "./dom/layers": 140,
        "./graphics/_2d": 142,
        "./graphics/video": 143,
        "./graphics/webgl": 144,
        "./js-dos": 145,
        "./network/xhr": 146,
        "./notification/notyf": 147,
        "./persist/save-load": 148,
        "./sound/audio-node": 149,
      },
    ],
    142: [
      function (t, e, n) {
        "use strict";
        t("core-js/modules/es6.typed.uint8-clamped-array"),
          Object.defineProperty(n, "__esModule", { value: !0 }),
          (n._2d = function (t, e) {
            var o = t.canvas,
              r = o.getContext("2d");
            if (null === r)
              throw new Error("Unable to create 2d context on given canvas");
            function n() {
              var t = a / c,
                e = i,
                n = i / t;
              s < n && (e = (n = s) * t),
                (o.style.position = "relative"),
                (o.style.top = (s - n) / 2 + "px"),
                (o.style.left = (i - e) / 2 + "px"),
                (o.style.width = e + "px"),
                (o.style.height = n + "px");
            }
            var i = t.width,
              s = t.height,
              a = 0,
              c = 0;
            function u(t, e) {
              (a = t),
                (c = e),
                (o.width = a),
                (o.height = c),
                (l = new Uint8ClampedArray(t * e * 4)),
                n();
            }
            t.setOnResize(function (t, e) {
              (i = t), (s = e), n();
            });
            var l = new Uint8ClampedArray(0);
            e.events().onFrameSize(u),
              e.events().onFrame(function (t) {
                for (var e = 0, n = 0; n < l.length; )
                  (l[n++] = t[e++]),
                    (l[n++] = t[e++]),
                    (l[n++] = t[e++]),
                    (l[n++] = 255);
                r.putImageData(new ImageData(l, a, c), 0, 0);
              }),
              u(e.width(), e.height()),
              e.events().onExit(function () {
                t.setOnResize(function () {});
              });
          });
      },
      { "core-js/modules/es6.typed.uint8-clamped-array": 114 },
    ],
    143: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.video = function (n, t) {
            n.switchToVideo(),
              t.events().onMessage(function (t, e) {
                "onremotestream" === t &&
                  window.Janus.attachMediaStream(n.video, e);
              });
          });
      },
      {},
    ],
    144: [
      function (t, e, n) {
        "use strict";
        t("core-js/modules/es6.typed.float32-array"),
          t("core-js/modules/es6.typed.uint8-array"),
          Object.defineProperty(n, "__esModule", { value: !0 });
        function y(t, e, n) {
          var o = t.createShader(e);
          if (
            (t.shaderSource(o, n),
            t.compileShader(o),
            t.getShaderParameter(o, t.COMPILE_STATUS))
          )
            return o;
          var r = t.getShaderInfoLog(o);
          throw (
            (t.deleteShader(o),
            new Error("An error occurred compiling the shaders: " + r))
          );
        }
        n.webGl = function (t, e) {
          var o = t.canvas,
            n = o.getContext("webgl");
          if (null === n)
            throw new Error("Unable to create webgl context on given canvas");
          var r = (function (t, e, n) {
              var o = y(t, t.VERTEX_SHADER, e),
                r = y(t, t.FRAGMENT_SHADER, n),
                i = t.createProgram();
              if (
                (t.attachShader(i, o),
                t.attachShader(i, r),
                t.linkProgram(i),
                t.getProgramParameter(i, t.LINK_STATUS))
              )
                return i;
              throw new Error(
                "Unable to initialize the shader program: " +
                  t.getProgramInfoLog(i)
              );
            })(
              n,
              "\nattribute vec4 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nvarying highp vec2 vTextureCoord;\n\nvoid main(void) {\n  gl_Position = aVertexPosition;\n  vTextureCoord = aTextureCoord;\n}\n",
              "\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\n\nvoid main(void) {\n  highp vec4 color = texture2D(uSampler, vTextureCoord);\n  gl_FragColor = vec4(color.r, color.g, color.b, 1.0);\n}\n"
            ),
            i = n.getAttribLocation(r, "aVertexPosition"),
            s = n.getAttribLocation(r, "aTextureCoord"),
            a = n.getUniformLocation(r, "uSampler");
          !(function (t, e, n) {
            var o = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, o);
            t.bufferData(
              t.ARRAY_BUFFER,
              new Float32Array([
                -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
              ]),
              t.STATIC_DRAW
            ),
              t.vertexAttribPointer(e, 3, t.FLOAT, !1, 0, 0),
              t.enableVertexAttribArray(e);
            var r = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, r);
            t.bufferData(
              t.ARRAY_BUFFER,
              new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]),
              t.STATIC_DRAW
            ),
              t.vertexAttribPointer(n, 2, t.FLOAT, !1, 0, 0),
              t.enableVertexAttribArray(n);
          })(n, i, s);
          var c = n.createTexture();
          n.bindTexture(n.TEXTURE_2D, c),
            n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE),
            n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE),
            n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR),
            n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR);
          var u = new Uint8Array([0, 0, 0]);
          function l() {
            var t = p / h,
              e = d,
              n = d / t;
            f < n && (e = (n = f) * t),
              (o.style.position = "relative"),
              (o.style.top = (f - n) / 2 + "px"),
              (o.style.left = (d - e) / 2 + "px"),
              (o.style.width = e + "px"),
              (o.style.height = n + "px");
          }
          n.texImage2D(
            n.TEXTURE_2D,
            0,
            n.RGB,
            1,
            1,
            0,
            n.RGB,
            n.UNSIGNED_BYTE,
            u
          ),
            n.useProgram(r),
            n.activeTexture(n.TEXTURE0),
            n.uniform1i(a, 0);
          var d = t.width,
            f = t.height,
            p = 0,
            h = 0;
          function v(t, e) {
            (p = t),
              (h = e),
              (o.width = p),
              (o.height = h),
              n.viewport(0, 0, p, h),
              l();
          }
          t.setOnResize(function (t, e) {
            (d = t), (f = e), l();
          }),
            e.events().onFrameSize(v),
            e.events().onFrame(function (t) {
              n.texImage2D(
                n.TEXTURE_2D,
                0,
                n.RGB,
                p,
                h,
                0,
                n.RGB,
                n.UNSIGNED_BYTE,
                t
              ),
                n.drawArrays(n.TRIANGLES, 0, 6);
            }),
            v(e.width(), e.height()),
            e.events().onExit(function () {
              t.setOnResize(function () {});
            });
        };
      },
      {
        "core-js/modules/es6.typed.float32-array": 112,
        "core-js/modules/es6.typed.uint8-array": 113,
      },
    ],
    145: [
      function (t, e, n) {
        "use strict";
        function c(t, e, n, o, r, i, s) {
          try {
            var a = t[i](s),
              c = a.value;
          } catch (t) {
            return void n(t);
          }
          a.done ? e(c) : Promise.resolve(c).then(o, r);
        }
        function s(a) {
          return function () {
            var t = this,
              s = arguments;
            return new Promise(function (e, n) {
              var o = a.apply(t, s);
              function r(t) {
                c(o, e, n, r, i, "next", t);
              }
              function i(t) {
                c(o, e, n, r, i, "throw", t);
              }
              r(void 0);
            });
          };
        }
        function a(t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o);
          }
        }
        t("core-js/modules/es6.promise"),
          t("core-js/modules/web.dom.iterable"),
          t("core-js/modules/es6.array.iterator"),
          t("core-js/modules/es6.object.to-string"),
          t("core-js/modules/es6.object.keys"),
          t("regenerator-runtime/runtime"),
          Object.defineProperty(n, "__esModule", { value: !0 });
        var u = t("./build"),
          m = t("./controls/mouse"),
          o = (function () {
            function o(t, e, n) {
              if (
                (!(function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, o),
                (this.enableMobileControls = function () {}),
                (this.disableMobileControls = function () {}),
                o.initialRun &&
                  ((emulators.cacheSeed += " ui (" + u.Build.short + ")"),
                  (o.initialRun = !1)),
                (this.emulatorsUi = e),
                (this.emulatorFunction = n.emulatorFunction || "dosboxWorker"),
                (this.clickToStart = n.clickToStart || !1),
                (this.layers = this.emulatorsUi.dom.layers(t, n.layersOptions)),
                this.layers.showLoadingLayer(),
                (this.createTransportLayer = n.createTransportLayer),
                "backend" === this.emulatorFunction &&
                  void 0 === this.createTransportLayer)
              )
                throw new Error(
                  "Emulator function set to 'backend' but 'createTransportLayer' is not a function"
                );
            }
            var t, e, n, r, i;
            return (
              (t = o),
              (e = [
                {
                  key: "run",
                  value:
                    ((i = s(
                      regeneratorRuntime.mark(function t(e, n) {
                        var o,
                          r,
                          i,
                          s,
                          a,
                          c,
                          u,
                          l,
                          d,
                          f,
                          p,
                          h,
                          v,
                          y = this;
                        return regeneratorRuntime.wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (t.next = 2), this.stop();
                                case 2:
                                  if (
                                    ((o = this.emulatorsUi),
                                    (r = e + ".changes"),
                                    "janus" !== this.emulatorFunction)
                                  ) {
                                    t.next = 9;
                                    break;
                                  }
                                  this.layers.setLoadingMessage(
                                    "Connecting..."
                                  ),
                                    (this.ciPromise = emulators.janus(e)),
                                    (t.next = 33);
                                  break;
                                case 9:
                                  if (
                                    (this.layers.setLoadingMessage(
                                      "Downloading bundle ..."
                                    ),
                                    (i = o.network.resolveBundle(e, {
                                      onprogress: function (t) {
                                        return y.layers.setLoadingMessage(
                                          "Downloading bundle " + t + "%"
                                        );
                                      },
                                    })),
                                    (t.prev = 11),
                                    null != n && 0 < n.length)
                                  )
                                    return (
                                      (t.next = 15),
                                      o.network.resolveBundle(
                                        n + "?dt=" + Date.now(),
                                        { httpCache: !1 }
                                      )
                                    );
                                  t.next = 18;
                                  break;
                                case 15:
                                  (s = t.sent), (t.next = 21);
                                  break;
                                case 18:
                                  return (
                                    (t.next = 20), o.persist.load(r, emulators)
                                  );
                                case 20:
                                  s = t.sent;
                                case 21:
                                  return (t.next = 23), i;
                                case 23:
                                  (a = t.sent),
                                    "backend" === this.emulatorFunction
                                      ? (this.ciPromise = emulators.backend(
                                          [a, s],
                                          this.createTransportLayer()
                                        ))
                                      : (this.ciPromise = emulators[
                                          this.emulatorFunction
                                        ]([a, s])),
                                    (t.next = 33);
                                  break;
                                case 27:
                                  return (
                                    (t.prev = 27),
                                    (t.t0 = t.catch(11)),
                                    (t.next = 31),
                                    i
                                  );
                                case 31:
                                  (c = t.sent),
                                    "backend" === this.emulatorFunction
                                      ? (this.ciPromise = emulators.backend(
                                          [c],
                                          this.createTransportLayer()
                                        ))
                                      : (this.ciPromise = emulators[
                                          this.emulatorFunction
                                        ]([c]));
                                case 33:
                                  return (
                                    (t.prev = 33),
                                    this.layers.setLoadingMessage(
                                      "Starting..."
                                    ),
                                    (t.next = 37),
                                    this.ciPromise
                                  );
                                case 37:
                                  (u = t.sent), (t.next = 46);
                                  break;
                                case 40:
                                  throw (
                                    ((t.prev = 40),
                                    (t.t1 = t.catch(33)),
                                    this.layers.setLoadingMessage(
                                      "Unexpected error occured..."
                                    ),
                                    this.layers.notyf.error({
                                      message:
                                        "Can't start emulator look browser logs for more info",
                                    }),
                                    console.error(t.t1),
                                    t.t1)
                                  );
                                case 46:
                                  if ("janus" === this.emulatorFunction)
                                    o.graphics.video(this.layers, u);
                                  else {
                                    o.persist.save(
                                      r,
                                      this.layers,
                                      u,
                                      emulators
                                    );
                                    try {
                                      o.graphics.webGl(this.layers, u);
                                    } catch (t) {
                                      console.error(
                                        "Unable to create webgl canvas, fallback to 2d rendering"
                                      ),
                                        o.graphics._2d(this.layers, u);
                                    }
                                    o.sound.audioNode(u);
                                  }
                                  return (
                                    this.layers.setLoadingMessage(
                                      "Waiting for config..."
                                    ),
                                    (t.next = 50),
                                    u.config()
                                  );
                                case 50:
                                  return (
                                    (l = t.sent),
                                    (d = _(l)),
                                    (f = Object.keys(d)),
                                    (p = {
                                      keyboard: function () {},
                                      mouse: function () {},
                                      gestures: function () {},
                                      buttons: function () {},
                                    }),
                                    (h = ""),
                                    (v = function (t) {
                                      p.keyboard(),
                                        p.mouse(),
                                        p.gestures(),
                                        p.buttons(),
                                        (p.keyboard = function () {}),
                                        (p.mouse = function () {}),
                                        (p.gestures = function () {}),
                                        (p.buttons = function () {});
                                      var e = d[(h = t)];
                                      if (void 0 !== e) {
                                        var n = {
                                          pointerButton: 0,
                                          mode: m.MouseMode.DEFAULT,
                                        };
                                        (p.keyboard = o.controls.keyboard(
                                          y.layers,
                                          u,
                                          e.mapper
                                        )),
                                          void 0 !== e.gestures &&
                                          0 < e.gestures.length
                                            ? (p.gestures = o.controls.nipple(
                                                y.layers,
                                                u,
                                                e.gestures
                                              ))
                                            : (p.mouse = o.controls.mouse(
                                                y.layers,
                                                u,
                                                n
                                              )),
                                          void 0 !== e.buttons &&
                                            e.buttons.length &&
                                            (p.buttons = o.controls.button(
                                              y.layers,
                                              u,
                                              e.buttons,
                                              n
                                            ));
                                      }
                                    }),
                                    (this.disableMobileControls = function () {
                                      p.gestures(),
                                        p.buttons(),
                                        (p.gestures = function () {}),
                                        (p.buttons = function () {});
                                    }),
                                    (this.enableMobileControls = function () {
                                      v(h);
                                    }),
                                    o.controls.options(this.layers, u, f, v),
                                    v("default"),
                                    this.layers.setLoadingMessage("Ready"),
                                    this.layers.hideLoadingLayer(),
                                    this.clickToStart &&
                                      this.layers.showClickToStart(),
                                    t.abrupt("return", u)
                                  );
                                case 64:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          this,
                          [
                            [11, 27],
                            [33, 40],
                          ]
                        );
                      })
                    )),
                    function (t, e) {
                      return i.apply(this, arguments);
                    }),
                },
                {
                  key: "stop",
                  value:
                    ((r = s(
                      regeneratorRuntime.mark(function t() {
                        var e;
                        return regeneratorRuntime.wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (
                                    (this.layers.showLoadingLayer(),
                                    void 0 === this.ciPromise)
                                  )
                                    return t.abrupt("return");
                                  t.next = 3;
                                  break;
                                case 3:
                                  return (t.next = 5), this.ciPromise;
                                case 5:
                                  return (
                                    (e = t.sent),
                                    delete this.ciPromise,
                                    (t.next = 9),
                                    e.exit()
                                  );
                                case 9:
                                  return t.abrupt("return");
                                case 10:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          this
                        );
                      })
                    )),
                    function () {
                      return r.apply(this, arguments);
                    }),
                },
              ]) && a(t.prototype, e),
              n && a(t, n),
              o
            );
          })();
        function _(t) {
          return void 0 !== t.layers
            ? t.layers
            : {
                default: {
                  name: "fallback",
                  gestures: t.gestures || [],
                  buttons: t.buttons || [],
                  mapper: t.mapper || {},
                },
              };
        }
        (n.DosInstance = o).initialRun = !0;
      },
      {
        "./build": 132,
        "./controls/mouse": 135,
        "core-js/modules/es6.array.iterator": 99,
        "core-js/modules/es6.object.keys": 103,
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.promise": 105,
        "core-js/modules/web.dom.iterable": 116,
        "regenerator-runtime/runtime": 130,
      },
    ],
    146: [
      function (t, e, n) {
        "use strict";
        function c(t, e, n, o, r, i, s) {
          try {
            var a = t[i](s),
              c = a.value;
          } catch (t) {
            return void n(t);
          }
          a.done ? e(c) : Promise.resolve(c).then(o, r);
        }
        function o() {
          var a;
          return (
            (a = regeneratorRuntime.mark(function t(o, e) {
              var n, r, i, s, a;
              return regeneratorRuntime.wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (
                          ((n = (null == e ? void 0 : e.cache) || null),
                          (r = null == e ? void 0 : e.onprogress),
                          (i = !(!1 === (null == e ? void 0 : e.httpCache))),
                          (t.prev = 3),
                          null === n)
                        )
                          throw new Error("no-cache");
                        t.next = 6;
                        break;
                      case 6:
                        if (((t.t0 = n), t.t0)) {
                          t.next = 11;
                          break;
                        }
                        return (t.next = 10), emulators.cache();
                      case 10:
                        t.t0 = t.sent;
                      case 11:
                        return (s = t.t0), (t.next = 14), s.get(o);
                      case 14:
                        return (
                          (a = t.sent),
                          void 0 !== r && r(100),
                          t.abrupt("return", new Uint8Array(a))
                        );
                      case 19:
                        return (
                          (t.prev = 19),
                          (t.t1 = t.catch(3)),
                          t.abrupt(
                            "return",
                            new Promise(function (t, e) {
                              var n = new XMLHttpRequest();
                              n.open("GET", o, !0),
                                n.overrideMimeType(
                                  "text/plain; charset=x-user-defined"
                                ),
                                n.addEventListener("error", function (t) {
                                  e(
                                    new Error(
                                      "Network error, can't download " + o
                                    )
                                  );
                                }),
                                n.addEventListener(
                                  "abort",
                                  function () {
                                    e(
                                      new Error("Request canceled for url " + o)
                                    );
                                  },
                                  !1
                                ),
                                (n.responseType = "arraybuffer"),
                                (n.onreadystatechange = function () {
                                  4 === n.readyState &&
                                    (200 === n.status
                                      ? (void 0 !== r && r(100),
                                        t(new Uint8Array(n.response)))
                                      : e(
                                          new Error(
                                            "Network error, can't download " + o
                                          )
                                        ));
                                }),
                                void 0 !== r &&
                                  (n.onprogress = function (t) {
                                    if (t.total && 0 < t.total) {
                                      var e =
                                        Math.round((1e4 * t.loaded) / t.total) /
                                        100;
                                      r(e);
                                    }
                                  }),
                                !1 === i &&
                                  (n.setRequestHeader(
                                    "Cache-Control",
                                    "no-cache, no-store, max-age=0"
                                  ),
                                  n.setRequestHeader(
                                    "Expires",
                                    "Tue, 01 Jan 1980 1:00:00 GMT"
                                  ),
                                  n.setRequestHeader("Pragma", "no-cache")),
                                n.send();
                            })
                          )
                        );
                      case 22:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                null,
                [[3, 19]]
              );
            })),
            (o = function () {
              var t = this,
                s = arguments;
              return new Promise(function (e, n) {
                var o = a.apply(t, s);
                function r(t) {
                  c(o, e, n, r, i, "next", t);
                }
                function i(t) {
                  c(o, e, n, r, i, "throw", t);
                }
                r(void 0);
              });
            }).apply(this, arguments)
          );
        }
        t("core-js/modules/es6.typed.uint8-array"),
          t("regenerator-runtime/runtime"),
          t("core-js/modules/es6.promise"),
          t("core-js/modules/es6.object.to-string"),
          Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.resolveBundle = function (t, e) {
            return o.apply(this, arguments);
          });
      },
      {
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.promise": 105,
        "core-js/modules/es6.typed.uint8-array": 113,
        "regenerator-runtime/runtime": 130,
      },
    ],
    147: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.notyf = function (t, e) {
            var r = t.notyf;
            e.events().onMessage(function (t) {
              if ("error" === t) {
                for (
                  var e = arguments.length,
                    n = new Array(1 < e ? e - 1 : 0),
                    o = 1;
                  o < e;
                  o++
                )
                  n[o - 1] = arguments[o];
                r.error({ message: JSON.stringify(n) });
              }
            });
          });
      },
      {},
    ],
    148: [
      function (t, e, n) {
        "use strict";
        function c(t, e, n, o, r, i, s) {
          try {
            var a = t[i](s),
              c = a.value;
          } catch (t) {
            return void n(t);
          }
          a.done ? e(c) : Promise.resolve(c).then(o, r);
        }
        function s(a) {
          return function () {
            var t = this,
              s = arguments;
            return new Promise(function (e, n) {
              var o = a.apply(t, s);
              function r(t) {
                c(o, e, n, r, i, "next", t);
              }
              function i(t) {
                c(o, e, n, r, i, "throw", t);
              }
              r(void 0);
            });
          };
        }
        t("core-js/modules/es6.typed.uint8-array"),
          t("core-js/modules/es6.promise"),
          t("core-js/modules/es6.object.to-string"),
          t("regenerator-runtime/runtime"),
          Object.defineProperty(n, "__esModule", { value: !0 });
        var a = "emulators-ui-saves";
        function o() {
          return (o = s(
            regeneratorRuntime.mark(function t(e, n) {
              var o;
              return regeneratorRuntime.wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (t.next = 2), n.cache(a);
                    case 2:
                      return (
                        (o = t.sent),
                        t.abrupt(
                          "return",
                          o.get(e).then(function (t) {
                            return new Uint8Array(t);
                          })
                        )
                      );
                    case 4:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        (n.save = function (o, t, r, i) {
          t.setOnSave(
            s(
              regeneratorRuntime.mark(function t() {
                var e, n;
                return regeneratorRuntime.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), i.cache(a);
                      case 2:
                        return (e = t.sent), (t.next = 5), r.persist();
                      case 5:
                        return (
                          (n = t.sent), t.abrupt("return", e.put(o, n.buffer))
                        );
                      case 7:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            )
          );
        }),
          (n.load = function (t, e) {
            return o.apply(this, arguments);
          });
      },
      {
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.promise": 105,
        "core-js/modules/es6.typed.uint8-array": 113,
        "regenerator-runtime/runtime": 130,
      },
    ],
    149: [
      function (t, e, n) {
        "use strict";
        function r(t) {
          if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
            if (
              Array.isArray(t) ||
              (t = (function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return a(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if (
                  "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                )
                  return a(t, e);
              })(t))
            ) {
              var e = 0,
                n = function () {};
              return {
                s: n,
                n: function () {
                  return e >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[e++] };
                },
                e: function (t) {
                  throw t;
                },
                f: n,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var o,
            r,
            i = !0,
            s = !1;
          return {
            s: function () {
              o = t[Symbol.iterator]();
            },
            n: function () {
              var t = o.next();
              return (i = t.done), t;
            },
            e: function (t) {
              (s = !0), (r = t);
            },
            f: function () {
              try {
                i || null == o.return || o.return();
              } finally {
                if (s) throw r;
              }
            },
          };
        }
        function a(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
          return o;
        }
        function i(t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o);
          }
        }
        t("core-js/modules/web.dom.iterable"),
          t("core-js/modules/es7.symbol.async-iterator"),
          t("core-js/modules/es6.symbol"),
          t("core-js/modules/es6.string.iterator"),
          t("core-js/modules/es6.array.from"),
          t("core-js/modules/es6.function.name"),
          t("core-js/modules/es6.regexp.to-string"),
          t("core-js/modules/es6.object.to-string"),
          t("core-js/modules/es6.array.fill"),
          Object.defineProperty(n, "__esModule", { value: !0 });
        var c = (function () {
          function t() {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.samplesQueue = []);
          }
          var e, n, o;
          return (
            (e = t),
            (n = [
              {
                key: "push",
                value: function (t) {
                  this.samplesQueue.push(t);
                },
              },
              {
                key: "length",
                value: function () {
                  var t,
                    e = 0,
                    n = r(this.samplesQueue);
                  try {
                    for (n.s(); !(t = n.n()).done; ) {
                      e += t.value.length;
                    }
                  } catch (t) {
                    n.e(t);
                  } finally {
                    n.f();
                  }
                  return e;
                },
              },
              {
                key: "writeTo",
                value: function (t, e) {
                  for (var n = 0; 0 < this.samplesQueue.length; ) {
                    var o = this.samplesQueue[0],
                      r = Math.min(e - n, o.length);
                    if (
                      (r === o.length
                        ? (t.set(o, n), this.samplesQueue.shift())
                        : (t.set(o.slice(0, r), n),
                          (this.samplesQueue[0] = o.slice(r))),
                      (n += r) === e)
                    )
                      break;
                  }
                  n < e && t.fill(0, n);
                },
              },
            ]) && i(e.prototype, n),
            o && i(e, o),
            t
          );
        })();
        n.audioNode = function (t) {
          var e = t.soundFrequency();
          if (0 !== e) {
            var n = null;
            if (
              ("undefined" != typeof AudioContext
                ? (n = new AudioContext({
                    sampleRate: e,
                    latencyHint: "interactive",
                  }))
                : void 0 !== window.webkitAudioContext &&
                  (n = new window.webkitAudioContext({
                    sampleRate: e,
                    latencyHint: "interactive",
                  })),
              null != n)
            ) {
              var s = new c();
              t.events().onSoundPush(function (t) {
                s.length() < 6144 && s.push(t);
              });
              var o = n.createScriptProcessor(2048, 0, 1),
                a = !1;
              (o.onaudioprocess = function (t) {
                var e = t.outputBuffer.length,
                  n = t.outputBuffer.numberOfChannels,
                  o = s.length();
                if ((a = a || 2048 <= o) && !(o < e))
                  for (var r = 0; r < n; r++) {
                    var i = t.outputBuffer.getChannelData(r);
                    s.writeTo(i, e);
                  }
              }),
                o.connect(n.destination);
              var r = function () {
                null !== n && "suspended" === n.state && n.resume();
              };
              document.addEventListener("click", r, { once: !0 }),
                document.addEventListener("touchstart", r, { once: !0 }),
                document.addEventListener("keydown", r, { once: !0 }),
                t.events().onExit(function () {
                  null !== n && (o.disconnect(), n.close()),
                    document.removeEventListener("click", r),
                    document.removeEventListener("touchstart", r),
                    document.removeEventListener("keydown", r);
                });
            }
          } else
            console.warn(
              "Can't create audio node with sampleRate === 0, ingnoring"
            );
        };
      },
      {
        "core-js/modules/es6.array.fill": 97,
        "core-js/modules/es6.array.from": 98,
        "core-js/modules/es6.function.name": 100,
        "core-js/modules/es6.object.to-string": 104,
        "core-js/modules/es6.regexp.to-string": 109,
        "core-js/modules/es6.string.iterator": 110,
        "core-js/modules/es6.symbol": 111,
        "core-js/modules/es7.symbol.async-iterator": 115,
        "core-js/modules/web.dom.iterable": 116,
      },
    ],
  },
  {},
  [141]
);
!(function i(s, a, u) {
  function c(t, e) {
    if (!a[t]) {
      if (!s[t]) {
        var r = "function" == typeof require && require;
        if (!e && r) return r(t, !0);
        if (l) return l(t, !0);
        var n = new Error("Cannot find module '" + t + "'");
        throw ((n.code = "MODULE_NOT_FOUND"), n);
      }
      var o = (a[t] = { exports: {} });
      s[t][0].call(
        o.exports,
        function (e) {
          return c(s[t][1][e] || e);
        },
        o,
        o.exports,
        i,
        s,
        a,
        u
      );
    }
    return a[t].exports;
  }
  for (
    var l = "function" == typeof require && require, e = 0;
    e < u.length;
    e++
  )
    c(u[e]);
  return c;
})(
  {
    1: [
      function (e, t, r) {
        t.exports = function (e) {
          if ("function" != typeof e)
            throw TypeError(e + " is not a function!");
          return e;
        };
      },
      {},
    ],
    2: [
      function (e, t, r) {
        var n = e("./_wks")("unscopables"),
          o = Array.prototype;
        null == o[n] && e("./_hide")(o, n, {}),
          (t.exports = function (e) {
            o[n][e] = !0;
          });
      },
      { "./_hide": 31, "./_wks": 99 },
    ],
    3: [
      function (e, t, r) {
        "use strict";
        var n = e("./_string-at")(!0);
        t.exports = function (e, t, r) {
          return t + (r ? n(e, t).length : 1);
        };
      },
      { "./_string-at": 80 },
    ],
    4: [
      function (e, t, r) {
        t.exports = function (e, t, r, n) {
          if (!(e instanceof t) || (void 0 !== n && n in e))
            throw TypeError(r + ": incorrect invocation!");
          return e;
        };
      },
      {},
    ],
    5: [
      function (e, t, r) {
        var n = e("./_is-object");
        t.exports = function (e) {
          if (!n(e)) throw TypeError(e + " is not an object!");
          return e;
        };
      },
      { "./_is-object": 39 },
    ],
    6: [
      function (e, t, r) {
        "use strict";
        var l = e("./_to-object"),
          f = e("./_to-absolute-index"),
          d = e("./_to-length");
        t.exports =
          [].copyWithin ||
          function (e, t, r) {
            var n = l(this),
              o = d(n.length),
              i = f(e, o),
              s = f(t, o),
              a = 2 < arguments.length ? r : void 0,
              u = Math.min((void 0 === a ? o : f(a, o)) - s, o - i),
              c = 1;
            for (
              s < i && i < s + u && ((c = -1), (s += u - 1), (i += u - 1));
              0 < u--;

            )
              s in n ? (n[i] = n[s]) : delete n[i], (i += c), (s += c);
            return n;
          };
      },
      { "./_to-absolute-index": 85, "./_to-length": 89, "./_to-object": 90 },
    ],
    7: [
      function (e, t, r) {
        "use strict";
        var c = e("./_to-object"),
          l = e("./_to-absolute-index"),
          f = e("./_to-length");
        t.exports = function (e, t, r) {
          for (
            var n = c(this),
              o = f(n.length),
              i = arguments.length,
              s = l(1 < i ? t : void 0, o),
              a = 2 < i ? r : void 0,
              u = void 0 === a ? o : l(a, o);
            s < u;

          )
            n[s++] = e;
          return n;
        };
      },
      { "./_to-absolute-index": 85, "./_to-length": 89, "./_to-object": 90 },
    ],
    8: [
      function (e, t, r) {
        var u = e("./_to-iobject"),
          c = e("./_to-length"),
          l = e("./_to-absolute-index");
        t.exports = function (a) {
          return function (e, t, r) {
            var n,
              o = u(e),
              i = c(o.length),
              s = l(r, i);
            if (a && t != t) {
              for (; s < i; ) if ((n = o[s++]) != n) return !0;
            } else
              for (; s < i; s++)
                if ((a || s in o) && o[s] === t) return a || s || 0;
            return !a && -1;
          };
        };
      },
      { "./_to-absolute-index": 85, "./_to-iobject": 88, "./_to-length": 89 },
    ],
    9: [
      function (e, t, r) {
        var g = e("./_ctx"),
          b = e("./_iobject"),
          w = e("./_to-object"),
          j = e("./_to-length"),
          n = e("./_array-species-create");
        t.exports = function (f, e) {
          var d = 1 == f,
            p = 2 == f,
            h = 3 == f,
            m = 4 == f,
            v = 6 == f,
            y = 5 == f || v,
            _ = e || n;
          return function (e, t, r) {
            for (
              var n,
                o,
                i = w(e),
                s = b(i),
                a = g(t, r, 3),
                u = j(s.length),
                c = 0,
                l = d ? _(e, u) : p ? _(e, 0) : void 0;
              c < u;
              c++
            )
              if ((y || c in s) && ((o = a((n = s[c]), c, i)), f))
                if (d) l[c] = o;
                else if (o)
                  switch (f) {
                    case 3:
                      return !0;
                    case 5:
                      return n;
                    case 6:
                      return c;
                    case 2:
                      l.push(n);
                  }
                else if (m) return !1;
            return v ? -1 : h || m ? m : l;
          };
        };
      },
      {
        "./_array-species-create": 11,
        "./_ctx": 16,
        "./_iobject": 36,
        "./_to-length": 89,
        "./_to-object": 90,
      },
    ],
    10: [
      function (e, t, r) {
        var n = e("./_is-object"),
          o = e("./_is-array"),
          i = e("./_wks")("species");
        t.exports = function (e) {
          var t;
          return (
            o(e) &&
              ("function" != typeof (t = e.constructor) ||
                (t !== Array && !o(t.prototype)) ||
                (t = void 0),
              n(t) && null === (t = t[i]) && (t = void 0)),
            void 0 === t ? Array : t
          );
        };
      },
      { "./_is-array": 38, "./_is-object": 39, "./_wks": 99 },
    ],
    11: [
      function (e, t, r) {
        var n = e("./_array-species-constructor");
        t.exports = function (e, t) {
          return new (n(e))(t);
        };
      },
      { "./_array-species-constructor": 10 },
    ],
    12: [
      function (e, t, r) {
        var o = e("./_cof"),
          i = e("./_wks")("toStringTag"),
          s =
            "Arguments" ==
            o(
              (function () {
                return arguments;
              })()
            );
        t.exports = function (e) {
          var t, r, n;
          return void 0 === e
            ? "Undefined"
            : null === e
            ? "Null"
            : "string" ==
              typeof (r = (function (e, t) {
                try {
                  return e[t];
                } catch (e) {}
              })((t = Object(e)), i))
            ? r
            : s
            ? o(t)
            : "Object" == (n = o(t)) && "function" == typeof t.callee
            ? "Arguments"
            : n;
        };
      },
      { "./_cof": 13, "./_wks": 99 },
    ],
    13: [
      function (e, t, r) {
        var n = {}.toString;
        t.exports = function (e) {
          return n.call(e).slice(8, -1);
        };
      },
      {},
    ],
    14: [
      function (e, t, r) {
        var n = (t.exports = { version: "2.6.11" });
        "number" == typeof __e && (__e = n);
      },
      {},
    ],
    15: [
      function (e, t, r) {
        "use strict";
        var n = e("./_object-dp"),
          o = e("./_property-desc");
        t.exports = function (e, t, r) {
          t in e ? n.f(e, t, o(0, r)) : (e[t] = r);
        };
      },
      { "./_object-dp": 54, "./_property-desc": 69 },
    ],
    16: [
      function (e, t, r) {
        var i = e("./_a-function");
        t.exports = function (n, o, e) {
          if ((i(n), void 0 === o)) return n;
          switch (e) {
            case 1:
              return function (e) {
                return n.call(o, e);
              };
            case 2:
              return function (e, t) {
                return n.call(o, e, t);
              };
            case 3:
              return function (e, t, r) {
                return n.call(o, e, t, r);
              };
          }
          return function () {
            return n.apply(o, arguments);
          };
        };
      },
      { "./_a-function": 1 },
    ],
    17: [
      function (e, t, r) {
        t.exports = function (e) {
          if (null == e) throw TypeError("Can't call method on  " + e);
          return e;
        };
      },
      {},
    ],
    18: [
      function (e, t, r) {
        t.exports = !e("./_fails")(function () {
          return (
            7 !=
            Object.defineProperty({}, "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        });
      },
      { "./_fails": 24 },
    ],
    19: [
      function (e, t, r) {
        var n = e("./_is-object"),
          o = e("./_global").document,
          i = n(o) && n(o.createElement);
        t.exports = function (e) {
          return i ? o.createElement(e) : {};
        };
      },
      { "./_global": 29, "./_is-object": 39 },
    ],
    20: [
      function (e, t, r) {
        t.exports =
          "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
            ","
          );
      },
      {},
    ],
    21: [
      function (e, t, r) {
        var a = e("./_object-keys"),
          u = e("./_object-gops"),
          c = e("./_object-pie");
        t.exports = function (e) {
          var t = a(e),
            r = u.f;
          if (r)
            for (var n, o = r(e), i = c.f, s = 0; o.length > s; )
              i.call(e, (n = o[s++])) && t.push(n);
          return t;
        };
      },
      { "./_object-gops": 59, "./_object-keys": 62, "./_object-pie": 63 },
    ],
    22: [
      function (e, t, r) {
        var m = e("./_global"),
          v = e("./_core"),
          y = e("./_hide"),
          _ = e("./_redefine"),
          g = e("./_ctx"),
          b = "prototype",
          w = function (e, t, r) {
            var n,
              o,
              i,
              s,
              a = e & w.F,
              u = e & w.G,
              c = e & w.S,
              l = e & w.P,
              f = e & w.B,
              d = u ? m : c ? m[t] || (m[t] = {}) : (m[t] || {})[b],
              p = u ? v : v[t] || (v[t] = {}),
              h = p[b] || (p[b] = {});
            for (n in (u && (r = t), r))
              (i = ((o = !a && d && void 0 !== d[n]) ? d : r)[n]),
                (s =
                  f && o
                    ? g(i, m)
                    : l && "function" == typeof i
                    ? g(Function.call, i)
                    : i),
                d && _(d, n, i, e & w.U),
                p[n] != i && y(p, n, s),
                l && h[n] != i && (h[n] = i);
          };
        (m.core = v),
          (w.F = 1),
          (w.G = 2),
          (w.S = 4),
          (w.P = 8),
          (w.B = 16),
          (w.W = 32),
          (w.U = 64),
          (w.R = 128),
          (t.exports = w);
      },
      {
        "./_core": 14,
        "./_ctx": 16,
        "./_global": 29,
        "./_hide": 31,
        "./_redefine": 71,
      },
    ],
    23: [
      function (e, t, r) {
        var n = e("./_wks")("match");
        t.exports = function (t) {
          var r = /./;
          try {
            "/./"[t](r);
          } catch (e) {
            try {
              return (r[n] = !1), !"/./"[t](r);
            } catch (e) {}
          }
          return !0;
        };
      },
      { "./_wks": 99 },
    ],
    24: [
      function (e, t, r) {
        t.exports = function (e) {
          try {
            return !!e();
          } catch (e) {
            return !0;
          }
        };
      },
      {},
    ],
    25: [
      function (e, t, r) {
        "use strict";
        e("./es6.regexp.exec");
        var l = e("./_redefine"),
          f = e("./_hide"),
          d = e("./_fails"),
          p = e("./_defined"),
          h = e("./_wks"),
          m = e("./_regexp-exec"),
          v = h("species"),
          y = !d(function () {
            var e = /./;
            return (
              (e.exec = function () {
                var e = [];
                return (e.groups = { a: "7" }), e;
              }),
              "7" !== "".replace(e, "$<a>")
            );
          }),
          _ = (function () {
            var e = /(?:)/,
              t = e.exec;
            e.exec = function () {
              return t.apply(this, arguments);
            };
            var r = "ab".split(e);
            return 2 === r.length && "a" === r[0] && "b" === r[1];
          })();
        t.exports = function (r, e, t) {
          var n = h(r),
            i = !d(function () {
              var e = {};
              return (
                (e[n] = function () {
                  return 7;
                }),
                7 != ""[r](e)
              );
            }),
            o = i
              ? !d(function () {
                  var e = !1,
                    t = /a/;
                  return (
                    (t.exec = function () {
                      return (e = !0), null;
                    }),
                    "split" === r &&
                      ((t.constructor = {}),
                      (t.constructor[v] = function () {
                        return t;
                      })),
                    t[n](""),
                    !e
                  );
                })
              : void 0;
          if (!i || !o || ("replace" === r && !y) || ("split" === r && !_)) {
            var s = /./[n],
              a = t(p, n, ""[r], function (e, t, r, n, o) {
                return t.exec === m
                  ? i && !o
                    ? { done: !0, value: s.call(t, r, n) }
                    : { done: !0, value: e.call(r, t, n) }
                  : { done: !1 };
              }),
              u = a[0],
              c = a[1];
            l(String.prototype, r, u),
              f(
                RegExp.prototype,
                n,
                2 == e
                  ? function (e, t) {
                      return c.call(e, this, t);
                    }
                  : function (e) {
                      return c.call(e, this);
                    }
              );
          }
        };
      },
      {
        "./_defined": 17,
        "./_fails": 24,
        "./_hide": 31,
        "./_redefine": 71,
        "./_regexp-exec": 73,
        "./_wks": 99,
        "./es6.regexp.exec": 115,
      },
    ],
    26: [
      function (e, t, r) {
        "use strict";
        var n = e("./_an-object");
        t.exports = function () {
          var e = n(this),
            t = "";
          return (
            e.global && (t += "g"),
            e.ignoreCase && (t += "i"),
            e.multiline && (t += "m"),
            e.unicode && (t += "u"),
            e.sticky && (t += "y"),
            t
          );
        };
      },
      { "./_an-object": 5 },
    ],
    27: [
      function (e, t, r) {
        var d = e("./_ctx"),
          p = e("./_iter-call"),
          h = e("./_is-array-iter"),
          m = e("./_an-object"),
          v = e("./_to-length"),
          y = e("./core.get-iterator-method"),
          _ = {},
          g = {};
        ((r = t.exports =
          function (e, t, r, n, o) {
            var i,
              s,
              a,
              u,
              c = o
                ? function () {
                    return e;
                  }
                : y(e),
              l = d(r, n, t ? 2 : 1),
              f = 0;
            if ("function" != typeof c)
              throw TypeError(e + " is not iterable!");
            if (h(c)) {
              for (i = v(e.length); f < i; f++)
                if (
                  (u = t ? l(m((s = e[f]))[0], s[1]) : l(e[f])) === _ ||
                  u === g
                )
                  return u;
            } else
              for (a = c.call(e); !(s = a.next()).done; )
                if ((u = p(a, l, s.value, t)) === _ || u === g) return u;
          }).BREAK = _),
          (r.RETURN = g);
      },
      {
        "./_an-object": 5,
        "./_ctx": 16,
        "./_is-array-iter": 37,
        "./_iter-call": 41,
        "./_to-length": 89,
        "./core.get-iterator-method": 100,
      },
    ],
    28: [
      function (e, t, r) {
        t.exports = e("./_shared")(
          "native-function-to-string",
          Function.toString
        );
      },
      { "./_shared": 78 },
    ],
    29: [
      function (e, t, r) {
        var n = (t.exports =
          "undefined" != typeof window && window.Math == Math
            ? window
            : "undefined" != typeof self && self.Math == Math
            ? self
            : Function("return this")());
        "number" == typeof __g && (__g = n);
      },
      {},
    ],
    30: [
      function (e, t, r) {
        var n = {}.hasOwnProperty;
        t.exports = function (e, t) {
          return n.call(e, t);
        };
      },
      {},
    ],
    31: [
      function (e, t, r) {
        var n = e("./_object-dp"),
          o = e("./_property-desc");
        t.exports = e("./_descriptors")
          ? function (e, t, r) {
              return n.f(e, t, o(1, r));
            }
          : function (e, t, r) {
              return (e[t] = r), e;
            };
      },
      { "./_descriptors": 18, "./_object-dp": 54, "./_property-desc": 69 },
    ],
    32: [
      function (e, t, r) {
        var n = e("./_global").document;
        t.exports = n && n.documentElement;
      },
      { "./_global": 29 },
    ],
    33: [
      function (e, t, r) {
        t.exports =
          !e("./_descriptors") &&
          !e("./_fails")(function () {
            return (
              7 !=
              Object.defineProperty(e("./_dom-create")("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a
            );
          });
      },
      { "./_descriptors": 18, "./_dom-create": 19, "./_fails": 24 },
    ],
    34: [
      function (e, t, r) {
        var i = e("./_is-object"),
          s = e("./_set-proto").set;
        t.exports = function (e, t, r) {
          var n,
            o = t.constructor;
          return (
            o !== r &&
              "function" == typeof o &&
              (n = o.prototype) !== r.prototype &&
              i(n) &&
              s &&
              s(e, n),
            e
          );
        };
      },
      { "./_is-object": 39, "./_set-proto": 74 },
    ],
    35: [
      function (e, t, r) {
        t.exports = function (e, t, r) {
          var n = void 0 === r;
          switch (t.length) {
            case 0:
              return n ? e() : e.call(r);
            case 1:
              return n ? e(t[0]) : e.call(r, t[0]);
            case 2:
              return n ? e(t[0], t[1]) : e.call(r, t[0], t[1]);
            case 3:
              return n ? e(t[0], t[1], t[2]) : e.call(r, t[0], t[1], t[2]);
            case 4:
              return n
                ? e(t[0], t[1], t[2], t[3])
                : e.call(r, t[0], t[1], t[2], t[3]);
          }
          return e.apply(r, t);
        };
      },
      {},
    ],
    36: [
      function (e, t, r) {
        var n = e("./_cof");
        t.exports = Object("z").propertyIsEnumerable(0)
          ? Object
          : function (e) {
              return "String" == n(e) ? e.split("") : Object(e);
            };
      },
      { "./_cof": 13 },
    ],
    37: [
      function (e, t, r) {
        var n = e("./_iterators"),
          o = e("./_wks")("iterator"),
          i = Array.prototype;
        t.exports = function (e) {
          return void 0 !== e && (n.Array === e || i[o] === e);
        };
      },
      { "./_iterators": 46, "./_wks": 99 },
    ],
    38: [
      function (e, t, r) {
        var n = e("./_cof");
        t.exports =
          Array.isArray ||
          function (e) {
            return "Array" == n(e);
          };
      },
      { "./_cof": 13 },
    ],
    39: [
      function (e, t, r) {
        t.exports = function (e) {
          return "object" == typeof e ? null !== e : "function" == typeof e;
        };
      },
      {},
    ],
    40: [
      function (e, t, r) {
        var n = e("./_is-object"),
          o = e("./_cof"),
          i = e("./_wks")("match");
        t.exports = function (e) {
          var t;
          return n(e) && (void 0 !== (t = e[i]) ? !!t : "RegExp" == o(e));
        };
      },
      { "./_cof": 13, "./_is-object": 39, "./_wks": 99 },
    ],
    41: [
      function (e, t, r) {
        var i = e("./_an-object");
        t.exports = function (t, e, r, n) {
          try {
            return n ? e(i(r)[0], r[1]) : e(r);
          } catch (e) {
            var o = t.return;
            throw (void 0 !== o && i(o.call(t)), e);
          }
        };
      },
      { "./_an-object": 5 },
    ],
    42: [
      function (e, t, r) {
        "use strict";
        var n = e("./_object-create"),
          o = e("./_property-desc"),
          i = e("./_set-to-string-tag"),
          s = {};
        e("./_hide")(s, e("./_wks")("iterator"), function () {
          return this;
        }),
          (t.exports = function (e, t, r) {
            (e.prototype = n(s, { next: o(1, r) })), i(e, t + " Iterator");
          });
      },
      {
        "./_hide": 31,
        "./_object-create": 53,
        "./_property-desc": 69,
        "./_set-to-string-tag": 76,
        "./_wks": 99,
      },
    ],
    43: [
      function (e, t, r) {
        "use strict";
        function g() {
          return this;
        }
        var b = e("./_library"),
          w = e("./_export"),
          j = e("./_redefine"),
          x = e("./_hide"),
          k = e("./_iterators"),
          S = e("./_iter-create"),
          P = e("./_set-to-string-tag"),
          E = e("./_object-gpo"),
          M = e("./_wks")("iterator"),
          O = !([].keys && "next" in [].keys()),
          I = "values";
        t.exports = function (e, t, r, n, o, i, s) {
          S(r, t, n);
          function a(e) {
            if (!O && e in h) return h[e];
            switch (e) {
              case "keys":
              case I:
                return function () {
                  return new r(this, e);
                };
            }
            return function () {
              return new r(this, e);
            };
          }
          var u,
            c,
            l,
            f = t + " Iterator",
            d = o == I,
            p = !1,
            h = e.prototype,
            m = h[M] || h["@@iterator"] || (o && h[o]),
            v = m || a(o),
            y = o ? (d ? a("entries") : v) : void 0,
            _ = ("Array" == t && h.entries) || m;
          if (
            (_ &&
              (l = E(_.call(new e()))) !== Object.prototype &&
              l.next &&
              (P(l, f, !0), b || "function" == typeof l[M] || x(l, M, g)),
            d &&
              m &&
              m.name !== I &&
              ((p = !0),
              (v = function () {
                return m.call(this);
              })),
            (b && !s) || (!O && !p && h[M]) || x(h, M, v),
            (k[t] = v),
            (k[f] = g),
            o)
          )
            if (
              ((u = {
                values: d ? v : a(I),
                keys: i ? v : a("keys"),
                entries: y,
              }),
              s)
            )
              for (c in u) c in h || j(h, c, u[c]);
            else w(w.P + w.F * (O || p), t, u);
          return u;
        };
      },
      {
        "./_export": 22,
        "./_hide": 31,
        "./_iter-create": 42,
        "./_iterators": 46,
        "./_library": 47,
        "./_object-gpo": 60,
        "./_redefine": 71,
        "./_set-to-string-tag": 76,
        "./_wks": 99,
      },
    ],
    44: [
      function (e, t, r) {
        var i = e("./_wks")("iterator"),
          s = !1;
        try {
          var n = [7][i]();
          (n.return = function () {
            s = !0;
          }),
            Array.from(n, function () {
              throw 2;
            });
        } catch (e) {}
        t.exports = function (e, t) {
          if (!t && !s) return !1;
          var r = !1;
          try {
            var n = [7],
              o = n[i]();
            (o.next = function () {
              return { done: (r = !0) };
            }),
              (n[i] = function () {
                return o;
              }),
              e(n);
          } catch (e) {}
          return r;
        };
      },
      { "./_wks": 99 },
    ],
    45: [
      function (e, t, r) {
        t.exports = function (e, t) {
          return { value: t, done: !!e };
        };
      },
      {},
    ],
    46: [
      function (e, t, r) {
        t.exports = {};
      },
      {},
    ],
    47: [
      function (e, t, r) {
        t.exports = !1;
      },
      {},
    ],
    48: [
      function (e, t, r) {
        var i = e("./_math-sign"),
          n = Math.pow,
          s = n(2, -52),
          a = n(2, -23),
          u = n(2, 127) * (2 - a),
          c = n(2, -126);
        t.exports =
          Math.fround ||
          function (e) {
            var t,
              r,
              n = Math.abs(e),
              o = i(e);
            return n < c
              ? o * (n / c / a + 1 / s - 1 / s) * c * a
              : u < (r = (t = (1 + a / s) * n) - (t - n)) || r != r
              ? o * (1 / 0)
              : o * r;
          };
      },
      { "./_math-sign": 49 },
    ],
    49: [
      function (e, t, r) {
        t.exports =
          Math.sign ||
          function (e) {
            return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1;
          };
      },
      {},
    ],
    50: [
      function (e, t, r) {
        function n(e) {
          a(e, o, { value: { i: "O" + ++u, w: {} } });
        }
        var o = e("./_uid")("meta"),
          i = e("./_is-object"),
          s = e("./_has"),
          a = e("./_object-dp").f,
          u = 0,
          c =
            Object.isExtensible ||
            function () {
              return !0;
            },
          l = !e("./_fails")(function () {
            return c(Object.preventExtensions({}));
          }),
          f = (t.exports = {
            KEY: o,
            NEED: !1,
            fastKey: function (e, t) {
              if (!i(e))
                return "symbol" == typeof e
                  ? e
                  : ("string" == typeof e ? "S" : "P") + e;
              if (!s(e, o)) {
                if (!c(e)) return "F";
                if (!t) return "E";
                n(e);
              }
              return e[o].i;
            },
            getWeak: function (e, t) {
              if (!s(e, o)) {
                if (!c(e)) return !0;
                if (!t) return !1;
                n(e);
              }
              return e[o].w;
            },
            onFreeze: function (e) {
              return l && f.NEED && c(e) && !s(e, o) && n(e), e;
            },
          });
      },
      {
        "./_fails": 24,
        "./_has": 30,
        "./_is-object": 39,
        "./_object-dp": 54,
        "./_uid": 95,
      },
    ],
    51: [
      function (e, t, r) {
        var a = e("./_global"),
          u = e("./_task").set,
          c = a.MutationObserver || a.WebKitMutationObserver,
          l = a.process,
          f = a.Promise,
          d = "process" == e("./_cof")(l);
        t.exports = function () {
          function e() {
            var e, t;
            for (d && (e = l.domain) && e.exit(); r; ) {
              (t = r.fn), (r = r.next);
              try {
                t();
              } catch (e) {
                throw (r ? o() : (n = void 0), e);
              }
            }
            (n = void 0), e && e.enter();
          }
          var r, n, o;
          if (d)
            o = function () {
              l.nextTick(e);
            };
          else if (!c || (a.navigator && a.navigator.standalone))
            if (f && f.resolve) {
              var t = f.resolve(void 0);
              o = function () {
                t.then(e);
              };
            } else
              o = function () {
                u.call(a, e);
              };
          else {
            var i = !0,
              s = document.createTextNode("");
            new c(e).observe(s, { characterData: !0 }),
              (o = function () {
                s.data = i = !i;
              });
          }
          return function (e) {
            var t = { fn: e, next: void 0 };
            n && (n.next = t), r || ((r = t), o()), (n = t);
          };
        };
      },
      { "./_cof": 13, "./_global": 29, "./_task": 84 },
    ],
    52: [
      function (e, t, r) {
        "use strict";
        var o = e("./_a-function");
        function n(e) {
          var r, n;
          (this.promise = new e(function (e, t) {
            if (void 0 !== r || void 0 !== n)
              throw TypeError("Bad Promise constructor");
            (r = e), (n = t);
          })),
            (this.resolve = o(r)),
            (this.reject = o(n));
        }
        t.exports.f = function (e) {
          return new n(e);
        };
      },
      { "./_a-function": 1 },
    ],
    53: [
      function (n, e, t) {
        function o() {}
        var i = n("./_an-object"),
          s = n("./_object-dps"),
          a = n("./_enum-bug-keys"),
          u = n("./_shared-key")("IE_PROTO"),
          c = "prototype",
          l = function () {
            var e,
              t = n("./_dom-create")("iframe"),
              r = a.length;
            for (
              t.style.display = "none",
                n("./_html").appendChild(t),
                t.src = "javascript:",
                (e = t.contentWindow.document).open(),
                e.write("<script>document.F=Object</script>"),
                e.close(),
                l = e.F;
              r--;

            )
              delete l[c][a[r]];
            return l();
          };
        e.exports =
          Object.create ||
          function (e, t) {
            var r;
            return (
              null !== e
                ? ((o[c] = i(e)), (r = new o()), (o[c] = null), (r[u] = e))
                : (r = l()),
              void 0 === t ? r : s(r, t)
            );
          };
      },
      {
        "./_an-object": 5,
        "./_dom-create": 19,
        "./_enum-bug-keys": 20,
        "./_html": 32,
        "./_object-dps": 55,
        "./_shared-key": 77,
      },
    ],
    54: [
      function (e, t, r) {
        var n = e("./_an-object"),
          o = e("./_ie8-dom-define"),
          i = e("./_to-primitive"),
          s = Object.defineProperty;
        r.f = e("./_descriptors")
          ? Object.defineProperty
          : function (e, t, r) {
              if ((n(e), (t = i(t, !0)), n(r), o))
                try {
                  return s(e, t, r);
                } catch (e) {}
              if ("get" in r || "set" in r)
                throw TypeError("Accessors not supported!");
              return "value" in r && (e[t] = r.value), e;
            };
      },
      {
        "./_an-object": 5,
        "./_descriptors": 18,
        "./_ie8-dom-define": 33,
        "./_to-primitive": 91,
      },
    ],
    55: [
      function (e, t, r) {
        var s = e("./_object-dp"),
          a = e("./_an-object"),
          u = e("./_object-keys");
        t.exports = e("./_descriptors")
          ? Object.defineProperties
          : function (e, t) {
              a(e);
              for (var r, n = u(t), o = n.length, i = 0; i < o; )
                s.f(e, (r = n[i++]), t[r]);
              return e;
            };
      },
      {
        "./_an-object": 5,
        "./_descriptors": 18,
        "./_object-dp": 54,
        "./_object-keys": 62,
      },
    ],
    56: [
      function (e, t, r) {
        var n = e("./_object-pie"),
          o = e("./_property-desc"),
          i = e("./_to-iobject"),
          s = e("./_to-primitive"),
          a = e("./_has"),
          u = e("./_ie8-dom-define"),
          c = Object.getOwnPropertyDescriptor;
        r.f = e("./_descriptors")
          ? c
          : function (e, t) {
              if (((e = i(e)), (t = s(t, !0)), u))
                try {
                  return c(e, t);
                } catch (e) {}
              if (a(e, t)) return o(!n.f.call(e, t), e[t]);
            };
      },
      {
        "./_descriptors": 18,
        "./_has": 30,
        "./_ie8-dom-define": 33,
        "./_object-pie": 63,
        "./_property-desc": 69,
        "./_to-iobject": 88,
        "./_to-primitive": 91,
      },
    ],
    57: [
      function (e, t, r) {
        var n = e("./_to-iobject"),
          o = e("./_object-gopn").f,
          i = {}.toString,
          s =
            "object" == typeof window && window && Object.getOwnPropertyNames
              ? Object.getOwnPropertyNames(window)
              : [];
        t.exports.f = function (e) {
          return s && "[object Window]" == i.call(e)
            ? (function (e) {
                try {
                  return o(e);
                } catch (e) {
                  return s.slice();
                }
              })(e)
            : o(n(e));
        };
      },
      { "./_object-gopn": 58, "./_to-iobject": 88 },
    ],
    58: [
      function (e, t, r) {
        var n = e("./_object-keys-internal"),
          o = e("./_enum-bug-keys").concat("length", "prototype");
        r.f =
          Object.getOwnPropertyNames ||
          function (e) {
            return n(e, o);
          };
      },
      { "./_enum-bug-keys": 20, "./_object-keys-internal": 61 },
    ],
    59: [
      function (e, t, r) {
        r.f = Object.getOwnPropertySymbols;
      },
      {},
    ],
    60: [
      function (e, t, r) {
        var n = e("./_has"),
          o = e("./_to-object"),
          i = e("./_shared-key")("IE_PROTO"),
          s = Object.prototype;
        t.exports =
          Object.getPrototypeOf ||
          function (e) {
            return (
              (e = o(e)),
              n(e, i)
                ? e[i]
                : "function" == typeof e.constructor &&
                  e instanceof e.constructor
                ? e.constructor.prototype
                : e instanceof Object
                ? s
                : null
            );
          };
      },
      { "./_has": 30, "./_shared-key": 77, "./_to-object": 90 },
    ],
    61: [
      function (e, t, r) {
        var s = e("./_has"),
          a = e("./_to-iobject"),
          u = e("./_array-includes")(!1),
          c = e("./_shared-key")("IE_PROTO");
        t.exports = function (e, t) {
          var r,
            n = a(e),
            o = 0,
            i = [];
          for (r in n) r != c && s(n, r) && i.push(r);
          for (; t.length > o; ) s(n, (r = t[o++])) && (~u(i, r) || i.push(r));
          return i;
        };
      },
      {
        "./_array-includes": 8,
        "./_has": 30,
        "./_shared-key": 77,
        "./_to-iobject": 88,
      },
    ],
    62: [
      function (e, t, r) {
        var n = e("./_object-keys-internal"),
          o = e("./_enum-bug-keys");
        t.exports =
          Object.keys ||
          function (e) {
            return n(e, o);
          };
      },
      { "./_enum-bug-keys": 20, "./_object-keys-internal": 61 },
    ],
    63: [
      function (e, t, r) {
        r.f = {}.propertyIsEnumerable;
      },
      {},
    ],
    64: [
      function (e, t, r) {
        var o = e("./_export"),
          i = e("./_core"),
          s = e("./_fails");
        t.exports = function (e, t) {
          var r = (i.Object || {})[e] || Object[e],
            n = {};
          (n[e] = t(r)),
            o(
              o.S +
                o.F *
                  s(function () {
                    r(1);
                  }),
              "Object",
              n
            );
        };
      },
      { "./_core": 14, "./_export": 22, "./_fails": 24 },
    ],
    65: [
      function (e, t, r) {
        var n = e("./_object-gopn"),
          o = e("./_object-gops"),
          i = e("./_an-object"),
          s = e("./_global").Reflect;
        t.exports =
          (s && s.ownKeys) ||
          function (e) {
            var t = n.f(i(e)),
              r = o.f;
            return r ? t.concat(r(e)) : t;
          };
      },
      {
        "./_an-object": 5,
        "./_global": 29,
        "./_object-gopn": 58,
        "./_object-gops": 59,
      },
    ],
    66: [
      function (e, t, r) {
        var n = e("./_global").parseInt,
          o = e("./_string-trim").trim,
          i = e("./_string-ws"),
          s = /^[-+]?0[xX]/;
        t.exports =
          8 !== n(i + "08") || 22 !== n(i + "0x16")
            ? function (e, t) {
                var r = o(String(e), 3);
                return n(r, t >>> 0 || (s.test(r) ? 16 : 10));
              }
            : n;
      },
      { "./_global": 29, "./_string-trim": 82, "./_string-ws": 83 },
    ],
    67: [
      function (e, t, r) {
        t.exports = function (e) {
          try {
            return { e: !1, v: e() };
          } catch (e) {
            return { e: !0, v: e };
          }
        };
      },
      {},
    ],
    68: [
      function (e, t, r) {
        var n = e("./_an-object"),
          o = e("./_is-object"),
          i = e("./_new-promise-capability");
        t.exports = function (e, t) {
          if ((n(e), o(t) && t.constructor === e)) return t;
          var r = i.f(e);
          return (0, r.resolve)(t), r.promise;
        };
      },
      {
        "./_an-object": 5,
        "./_is-object": 39,
        "./_new-promise-capability": 52,
      },
    ],
    69: [
      function (e, t, r) {
        t.exports = function (e, t) {
          return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t,
          };
        };
      },
      {},
    ],
    70: [
      function (e, t, r) {
        var o = e("./_redefine");
        t.exports = function (e, t, r) {
          for (var n in t) o(e, n, t[n], r);
          return e;
        };
      },
      { "./_redefine": 71 },
    ],
    71: [
      function (e, t, r) {
        var i = e("./_global"),
          s = e("./_hide"),
          a = e("./_has"),
          u = e("./_uid")("src"),
          n = e("./_function-to-string"),
          o = "toString",
          c = ("" + n).split(o);
        (e("./_core").inspectSource = function (e) {
          return n.call(e);
        }),
          (t.exports = function (e, t, r, n) {
            var o = "function" == typeof r;
            o && (a(r, "name") || s(r, "name", t)),
              e[t] !== r &&
                (o &&
                  (a(r, u) || s(r, u, e[t] ? "" + e[t] : c.join(String(t)))),
                e === i
                  ? (e[t] = r)
                  : n
                  ? e[t]
                    ? (e[t] = r)
                    : s(e, t, r)
                  : (delete e[t], s(e, t, r)));
          })(Function.prototype, o, function () {
            return ("function" == typeof this && this[u]) || n.call(this);
          });
      },
      {
        "./_core": 14,
        "./_function-to-string": 28,
        "./_global": 29,
        "./_has": 30,
        "./_hide": 31,
        "./_uid": 95,
      },
    ],
    72: [
      function (e, t, r) {
        "use strict";
        var o = e("./_classof"),
          i = RegExp.prototype.exec;
        t.exports = function (e, t) {
          var r = e.exec;
          if ("function" == typeof r) {
            var n = r.call(e, t);
            if ("object" != typeof n)
              throw new TypeError(
                "RegExp exec method returned something other than an Object or null"
              );
            return n;
          }
          if ("RegExp" !== o(e))
            throw new TypeError("RegExp#exec called on incompatible receiver");
          return i.call(e, t);
        };
      },
      { "./_classof": 12 },
    ],
    73: [
      function (e, t, r) {
        "use strict";
        var n,
          o,
          s = e("./_flags"),
          a = RegExp.prototype.exec,
          u = String.prototype.replace,
          i = a,
          c = "lastIndex",
          l =
            ((n = /a/),
            (o = /b*/g),
            a.call(n, "a"),
            a.call(o, "a"),
            0 !== n[c] || 0 !== o[c]),
          f = void 0 !== /()??/.exec("")[1];
        (l || f) &&
          (i = function (e) {
            var t,
              r,
              n,
              o,
              i = this;
            return (
              f && (r = new RegExp("^" + i.source + "$(?!\\s)", s.call(i))),
              l && (t = i[c]),
              (n = a.call(i, e)),
              l && n && (i[c] = i.global ? n.index + n[0].length : t),
              f &&
                n &&
                1 < n.length &&
                u.call(n[0], r, function () {
                  for (o = 1; o < arguments.length - 2; o++)
                    void 0 === arguments[o] && (n[o] = void 0);
                }),
              n
            );
          }),
          (t.exports = i);
      },
      { "./_flags": 26 },
    ],
    74: [
      function (t, e, r) {
        function o(e, t) {
          if ((i(e), !n(t) && null !== t))
            throw TypeError(t + ": can't set as prototype!");
        }
        var n = t("./_is-object"),
          i = t("./_an-object");
        e.exports = {
          set:
            Object.setPrototypeOf ||
            ("__proto__" in {}
              ? (function (e, r, n) {
                  try {
                    (n = t("./_ctx")(
                      Function.call,
                      t("./_object-gopd").f(Object.prototype, "__proto__").set,
                      2
                    ))(e, []),
                      (r = !(e instanceof Array));
                  } catch (e) {
                    r = !0;
                  }
                  return function (e, t) {
                    return o(e, t), r ? (e.__proto__ = t) : n(e, t), e;
                  };
                })({}, !1)
              : void 0),
          check: o,
        };
      },
      {
        "./_an-object": 5,
        "./_ctx": 16,
        "./_is-object": 39,
        "./_object-gopd": 56,
      },
    ],
    75: [
      function (e, t, r) {
        "use strict";
        var n = e("./_global"),
          o = e("./_object-dp"),
          i = e("./_descriptors"),
          s = e("./_wks")("species");
        t.exports = function (e) {
          var t = n[e];
          i &&
            t &&
            !t[s] &&
            o.f(t, s, {
              configurable: !0,
              get: function () {
                return this;
              },
            });
        };
      },
      {
        "./_descriptors": 18,
        "./_global": 29,
        "./_object-dp": 54,
        "./_wks": 99,
      },
    ],
    76: [
      function (e, t, r) {
        var n = e("./_object-dp").f,
          o = e("./_has"),
          i = e("./_wks")("toStringTag");
        t.exports = function (e, t, r) {
          e &&
            !o((e = r ? e : e.prototype), i) &&
            n(e, i, { configurable: !0, value: t });
        };
      },
      { "./_has": 30, "./_object-dp": 54, "./_wks": 99 },
    ],
    77: [
      function (e, t, r) {
        var n = e("./_shared")("keys"),
          o = e("./_uid");
        t.exports = function (e) {
          return n[e] || (n[e] = o(e));
        };
      },
      { "./_shared": 78, "./_uid": 95 },
    ],
    78: [
      function (e, t, r) {
        var n = e("./_core"),
          o = e("./_global"),
          i = "__core-js_shared__",
          s = o[i] || (o[i] = {});
        (t.exports = function (e, t) {
          return s[e] || (s[e] = void 0 !== t ? t : {});
        })("versions", []).push({
          version: n.version,
          mode: e("./_library") ? "pure" : "global",
          copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
        });
      },
      { "./_core": 14, "./_global": 29, "./_library": 47 },
    ],
    79: [
      function (e, t, r) {
        var o = e("./_an-object"),
          i = e("./_a-function"),
          s = e("./_wks")("species");
        t.exports = function (e, t) {
          var r,
            n = o(e).constructor;
          return void 0 === n || null == (r = o(n)[s]) ? t : i(r);
        };
      },
      { "./_a-function": 1, "./_an-object": 5, "./_wks": 99 },
    ],
    80: [
      function (e, t, r) {
        var u = e("./_to-integer"),
          c = e("./_defined");
        t.exports = function (a) {
          return function (e, t) {
            var r,
              n,
              o = String(c(e)),
              i = u(t),
              s = o.length;
            return i < 0 || s <= i
              ? a
                ? ""
                : void 0
              : (r = o.charCodeAt(i)) < 55296 ||
                56319 < r ||
                i + 1 === s ||
                (n = o.charCodeAt(i + 1)) < 56320 ||
                57343 < n
              ? a
                ? o.charAt(i)
                : r
              : a
              ? o.slice(i, i + 2)
              : n - 56320 + ((r - 55296) << 10) + 65536;
          };
        };
      },
      { "./_defined": 17, "./_to-integer": 87 },
    ],
    81: [
      function (e, t, r) {
        var n = e("./_is-regexp"),
          o = e("./_defined");
        t.exports = function (e, t, r) {
          if (n(t)) throw TypeError("String#" + r + " doesn't accept regex!");
          return String(o(e));
        };
      },
      { "./_defined": 17, "./_is-regexp": 40 },
    ],
    82: [
      function (e, t, r) {
        function n(e, t, r) {
          var n = {},
            o = a(function () {
              return !!u[e]() || "​" != "​"[e]();
            }),
            i = (n[e] = o ? t(f) : u[e]);
          r && (n[r] = i), s(s.P + s.F * o, "String", n);
        }
        var s = e("./_export"),
          o = e("./_defined"),
          a = e("./_fails"),
          u = e("./_string-ws"),
          i = "[" + u + "]",
          c = RegExp("^" + i + i + "*"),
          l = RegExp(i + i + "*$"),
          f = (n.trim = function (e, t) {
            return (
              (e = String(o(e))),
              1 & t && (e = e.replace(c, "")),
              2 & t && (e = e.replace(l, "")),
              e
            );
          });
        t.exports = n;
      },
      { "./_defined": 17, "./_export": 22, "./_fails": 24, "./_string-ws": 83 },
    ],
    83: [
      function (e, t, r) {
        t.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";
      },
      {},
    ],
    84: [
      function (e, t, r) {
        function n() {
          var e = +this;
          if (g.hasOwnProperty(e)) {
            var t = g[e];
            delete g[e], t();
          }
        }
        function o(e) {
          n.call(e.data);
        }
        var i,
          s,
          a,
          u = e("./_ctx"),
          c = e("./_invoke"),
          l = e("./_html"),
          f = e("./_dom-create"),
          d = e("./_global"),
          p = d.process,
          h = d.setImmediate,
          m = d.clearImmediate,
          v = d.MessageChannel,
          y = d.Dispatch,
          _ = 0,
          g = {},
          b = "onreadystatechange";
        (h && m) ||
          ((h = function (e) {
            for (var t = [], r = 1; r < arguments.length; )
              t.push(arguments[r++]);
            return (
              (g[++_] = function () {
                c("function" == typeof e ? e : Function(e), t);
              }),
              i(_),
              _
            );
          }),
          (m = function (e) {
            delete g[e];
          }),
          "process" == e("./_cof")(p)
            ? (i = function (e) {
                p.nextTick(u(n, e, 1));
              })
            : y && y.now
            ? (i = function (e) {
                y.now(u(n, e, 1));
              })
            : v
            ? ((a = (s = new v()).port2),
              (s.port1.onmessage = o),
              (i = u(a.postMessage, a, 1)))
            : d.addEventListener &&
              "function" == typeof postMessage &&
              !d.importScripts
            ? ((i = function (e) {
                d.postMessage(e + "", "*");
              }),
              d.addEventListener("message", o, !1))
            : (i =
                b in f("script")
                  ? function (e) {
                      l.appendChild(f("script"))[b] = function () {
                        l.removeChild(this), n.call(e);
                      };
                    }
                  : function (e) {
                      setTimeout(u(n, e, 1), 0);
                    })),
          (t.exports = { set: h, clear: m });
      },
      {
        "./_cof": 13,
        "./_ctx": 16,
        "./_dom-create": 19,
        "./_global": 29,
        "./_html": 32,
        "./_invoke": 35,
      },
    ],
    85: [
      function (e, t, r) {
        var n = e("./_to-integer"),
          o = Math.max,
          i = Math.min;
        t.exports = function (e, t) {
          return (e = n(e)) < 0 ? o(e + t, 0) : i(e, t);
        };
      },
      { "./_to-integer": 87 },
    ],
    86: [
      function (e, t, r) {
        var n = e("./_to-integer"),
          o = e("./_to-length");
        t.exports = function (e) {
          if (void 0 === e) return 0;
          var t = n(e),
            r = o(t);
          if (t !== r) throw RangeError("Wrong length!");
          return r;
        };
      },
      { "./_to-integer": 87, "./_to-length": 89 },
    ],
    87: [
      function (e, t, r) {
        var n = Math.ceil,
          o = Math.floor;
        t.exports = function (e) {
          return isNaN((e = +e)) ? 0 : (0 < e ? o : n)(e);
        };
      },
      {},
    ],
    88: [
      function (e, t, r) {
        var n = e("./_iobject"),
          o = e("./_defined");
        t.exports = function (e) {
          return n(o(e));
        };
      },
      { "./_defined": 17, "./_iobject": 36 },
    ],
    89: [
      function (e, t, r) {
        var n = e("./_to-integer"),
          o = Math.min;
        t.exports = function (e) {
          return 0 < e ? o(n(e), 9007199254740991) : 0;
        };
      },
      { "./_to-integer": 87 },
    ],
    90: [
      function (e, t, r) {
        var n = e("./_defined");
        t.exports = function (e) {
          return Object(n(e));
        };
      },
      { "./_defined": 17 },
    ],
    91: [
      function (e, t, r) {
        var o = e("./_is-object");
        t.exports = function (e, t) {
          if (!o(e)) return e;
          var r, n;
          if (t && "function" == typeof (r = e.toString) && !o((n = r.call(e))))
            return n;
          if ("function" == typeof (r = e.valueOf) && !o((n = r.call(e))))
            return n;
          if (
            !t &&
            "function" == typeof (r = e.toString) &&
            !o((n = r.call(e)))
          )
            return n;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      { "./_is-object": 39 },
    ],
    92: [
      function (e, t, r) {
        "use strict";
        if (e("./_descriptors")) {
          var y = e("./_library"),
            _ = e("./_global"),
            g = e("./_fails"),
            b = e("./_export"),
            w = e("./_typed"),
            n = e("./_typed-buffer"),
            h = e("./_ctx"),
            j = e("./_an-instance"),
            o = e("./_property-desc"),
            x = e("./_hide"),
            i = e("./_redefine-all"),
            s = e("./_to-integer"),
            k = e("./_to-length"),
            S = e("./_to-index"),
            a = e("./_to-absolute-index"),
            u = e("./_to-primitive"),
            c = e("./_has"),
            P = e("./_classof"),
            E = e("./_is-object"),
            m = e("./_to-object"),
            v = e("./_is-array-iter"),
            M = e("./_object-create"),
            O = e("./_object-gpo"),
            I = e("./_object-gopn").f,
            A = e("./core.get-iterator-method"),
            l = e("./_uid"),
            f = e("./_wks"),
            d = e("./_array-methods"),
            p = e("./_array-includes"),
            T = e("./_species-constructor"),
            R = e("./es6.array.iterator"),
            C = e("./_iterators"),
            F = e("./_iter-detect"),
            D = e("./_set-species"),
            L = e("./_array-fill"),
            N = e("./_array-copy-within"),
            z = e("./_object-dp"),
            W = e("./_object-gopd"),
            U = z.f,
            q = W.f,
            B = _.RangeError,
            H = _.TypeError,
            G = _.Uint8Array,
            V = "ArrayBuffer",
            K = "Shared" + V,
            Y = "BYTES_PER_ELEMENT",
            $ = "prototype",
            J = Array[$],
            Q = n.ArrayBuffer,
            X = n.DataView,
            Z = d(0),
            ee = d(2),
            te = d(3),
            re = d(4),
            ne = d(5),
            oe = d(6),
            ie = p(!0),
            se = p(!1),
            ae = R.values,
            ue = R.keys,
            ce = R.entries,
            le = J.lastIndexOf,
            fe = J.reduce,
            de = J.reduceRight,
            pe = J.join,
            he = J.sort,
            me = J.slice,
            ve = J.toString,
            ye = J.toLocaleString,
            _e = f("iterator"),
            ge = f("toStringTag"),
            be = l("typed_constructor"),
            we = l("def_constructor"),
            je = w.CONSTR,
            xe = w.TYPED,
            ke = w.VIEW,
            Se = "Wrong length!",
            Pe = d(1, function (e, t) {
              return Ae(T(e, e[we]), t);
            }),
            Ee = g(function () {
              return 1 === new G(new Uint16Array([1]).buffer)[0];
            }),
            Me =
              !!G &&
              !!G[$].set &&
              g(function () {
                new G(1).set({});
              }),
            Oe = function (e, t) {
              var r = s(e);
              if (r < 0 || r % t) throw B("Wrong offset!");
              return r;
            },
            Ie = function (e) {
              if (E(e) && xe in e) return e;
              throw H(e + " is not a typed array!");
            },
            Ae = function (e, t) {
              if (!(E(e) && be in e))
                throw H("It is not a typed array constructor!");
              return new e(t);
            },
            Te = function (e, t) {
              return Re(T(e, e[we]), t);
            },
            Re = function (e, t) {
              for (var r = 0, n = t.length, o = Ae(e, n); r < n; )
                o[r] = t[r++];
              return o;
            },
            Ce = function (e, t, r) {
              U(e, t, {
                get: function () {
                  return this._d[r];
                },
              });
            },
            Fe = function (e, t, r) {
              var n,
                o,
                i,
                s,
                a,
                u,
                c = m(e),
                l = arguments.length,
                f = 1 < l ? t : void 0,
                d = void 0 !== f,
                p = A(c);
              if (null != p && !v(p)) {
                for (u = p.call(c), i = [], n = 0; !(a = u.next()).done; n++)
                  i.push(a.value);
                c = i;
              }
              for (
                d && 2 < l && (f = h(f, r, 2)),
                  n = 0,
                  o = k(c.length),
                  s = Ae(this, o);
                n < o;
                n++
              )
                s[n] = d ? f(c[n], n) : c[n];
              return s;
            },
            De = function () {
              for (var e = 0, t = arguments.length, r = Ae(this, t); e < t; )
                r[e] = arguments[e++];
              return r;
            },
            Le =
              !!G &&
              g(function () {
                ye.call(new G(1));
              }),
            Ne = function () {
              return ye.apply(Le ? me.call(Ie(this)) : Ie(this), arguments);
            },
            ze = {
              copyWithin: function (e, t, r) {
                return N.call(
                  Ie(this),
                  e,
                  t,
                  2 < arguments.length ? r : void 0
                );
              },
              every: function (e, t) {
                return re(Ie(this), e, 1 < arguments.length ? t : void 0);
              },
              fill: function (e) {
                return L.apply(Ie(this), arguments);
              },
              filter: function (e, t) {
                return Te(
                  this,
                  ee(Ie(this), e, 1 < arguments.length ? t : void 0)
                );
              },
              find: function (e, t) {
                return ne(Ie(this), e, 1 < arguments.length ? t : void 0);
              },
              findIndex: function (e, t) {
                return oe(Ie(this), e, 1 < arguments.length ? t : void 0);
              },
              forEach: function (e, t) {
                Z(Ie(this), e, 1 < arguments.length ? t : void 0);
              },
              indexOf: function (e, t) {
                return se(Ie(this), e, 1 < arguments.length ? t : void 0);
              },
              includes: function (e, t) {
                return ie(Ie(this), e, 1 < arguments.length ? t : void 0);
              },
              join: function (e) {
                return pe.apply(Ie(this), arguments);
              },
              lastIndexOf: function (e) {
                return le.apply(Ie(this), arguments);
              },
              map: function (e, t) {
                return Pe(Ie(this), e, 1 < arguments.length ? t : void 0);
              },
              reduce: function (e) {
                return fe.apply(Ie(this), arguments);
              },
              reduceRight: function (e) {
                return de.apply(Ie(this), arguments);
              },
              reverse: function () {
                for (
                  var e,
                    t = this,
                    r = Ie(t).length,
                    n = Math.floor(r / 2),
                    o = 0;
                  o < n;

                )
                  (e = t[o]), (t[o++] = t[--r]), (t[r] = e);
                return t;
              },
              some: function (e, t) {
                return te(Ie(this), e, 1 < arguments.length ? t : void 0);
              },
              sort: function (e) {
                return he.call(Ie(this), e);
              },
              subarray: function (e, t) {
                var r = Ie(this),
                  n = r.length,
                  o = a(e, n);
                return new (T(r, r[we]))(
                  r.buffer,
                  r.byteOffset + o * r.BYTES_PER_ELEMENT,
                  k((void 0 === t ? n : a(t, n)) - o)
                );
              },
            },
            We = function (e, t) {
              return Te(this, me.call(Ie(this), e, t));
            },
            Ue = function (e, t) {
              Ie(this);
              var r = Oe(t, 1),
                n = this.length,
                o = m(e),
                i = k(o.length),
                s = 0;
              if (n < i + r) throw B(Se);
              for (; s < i; ) this[r + s] = o[s++];
            },
            qe = {
              entries: function () {
                return ce.call(Ie(this));
              },
              keys: function () {
                return ue.call(Ie(this));
              },
              values: function () {
                return ae.call(Ie(this));
              },
            },
            Be = function (e, t) {
              return (
                E(e) &&
                e[xe] &&
                "symbol" != typeof t &&
                t in e &&
                String(+t) == String(t)
              );
            },
            He = function (e, t) {
              return Be(e, (t = u(t, !0))) ? o(2, e[t]) : q(e, t);
            },
            Ge = function (e, t, r) {
              return !(Be(e, (t = u(t, !0))) && E(r) && c(r, "value")) ||
                c(r, "get") ||
                c(r, "set") ||
                r.configurable ||
                (c(r, "writable") && !r.writable) ||
                (c(r, "enumerable") && !r.enumerable)
                ? U(e, t, r)
                : ((e[t] = r.value), e);
            };
          je || ((W.f = He), (z.f = Ge)),
            b(b.S + b.F * !je, "Object", {
              getOwnPropertyDescriptor: He,
              defineProperty: Ge,
            }),
            g(function () {
              ve.call({});
            }) &&
              (ve = ye =
                function () {
                  return pe.call(this);
                });
          var Ve = i({}, ze);
          i(Ve, qe),
            x(Ve, _e, qe.values),
            i(Ve, {
              slice: We,
              set: Ue,
              constructor: function () {},
              toString: ve,
              toLocaleString: Ne,
            }),
            Ce(Ve, "buffer", "b"),
            Ce(Ve, "byteOffset", "o"),
            Ce(Ve, "byteLength", "l"),
            Ce(Ve, "length", "e"),
            U(Ve, ge, {
              get: function () {
                return this[xe];
              },
            }),
            (t.exports = function (e, f, t, i) {
              function d(e, o) {
                U(e, o, {
                  get: function () {
                    return (e = o), (t = this._d).v[r](e * f + t.o, Ee);
                    var e, t;
                  },
                  set: function (e) {
                    return (
                      (t = o),
                      (r = e),
                      (n = this._d),
                      i &&
                        (r =
                          (r = Math.round(r)) < 0
                            ? 0
                            : 255 < r
                            ? 255
                            : 255 & r),
                      void n.v[s](t * f + n.o, r, Ee)
                    );
                    var t, r, n;
                  },
                  enumerable: !0,
                });
              }
              var p = e + ((i = !!i) ? "Clamped" : "") + "Array",
                r = "get" + e,
                s = "set" + e,
                h = _[p],
                a = h || {},
                n = h && O(h),
                o = !h || !w.ABV,
                u = {},
                c = h && h[$];
              o
                ? ((h = t(function (e, t, r, n) {
                    j(e, h, p, "_d");
                    var o,
                      i,
                      s,
                      a,
                      u = 0,
                      c = 0;
                    if (E(t)) {
                      if (!(t instanceof Q || (a = P(t)) == V || a == K))
                        return xe in t ? Re(h, t) : Fe.call(h, t);
                      (o = t), (c = Oe(r, f));
                      var l = t.byteLength;
                      if (void 0 === n) {
                        if (l % f) throw B(Se);
                        if ((i = l - c) < 0) throw B(Se);
                      } else if (l < (i = k(n) * f) + c) throw B(Se);
                      s = i / f;
                    } else (s = S(t)), (o = new Q((i = s * f)));
                    for (
                      x(e, "_d", { b: o, o: c, l: i, e: s, v: new X(o) });
                      u < s;

                    )
                      d(e, u++);
                  })),
                  (c = h[$] = M(Ve)),
                  x(c, "constructor", h))
                : (g(function () {
                    h(1);
                  }) &&
                    g(function () {
                      new h(-1);
                    }) &&
                    F(function (e) {
                      new h(), new h(null), new h(1.5), new h(e);
                    }, !0)) ||
                  ((h = t(function (e, t, r, n) {
                    var o;
                    return (
                      j(e, h, p),
                      E(t)
                        ? t instanceof Q || (o = P(t)) == V || o == K
                          ? void 0 !== n
                            ? new a(t, Oe(r, f), n)
                            : void 0 !== r
                            ? new a(t, Oe(r, f))
                            : new a(t)
                          : xe in t
                          ? Re(h, t)
                          : Fe.call(h, t)
                        : new a(S(t))
                    );
                  })),
                  Z(
                    n !== Function.prototype ? I(a).concat(I(n)) : I(a),
                    function (e) {
                      e in h || x(h, e, a[e]);
                    }
                  ),
                  (h[$] = c),
                  y || (c.constructor = h));
              var l = c[_e],
                m = !!l && ("values" == l.name || null == l.name),
                v = qe.values;
              x(h, be, !0),
                x(c, xe, p),
                x(c, ke, !0),
                x(c, we, h),
                (i ? new h(1)[ge] == p : ge in c) ||
                  U(c, ge, {
                    get: function () {
                      return p;
                    },
                  }),
                (u[p] = h),
                b(b.G + b.W + b.F * (h != a), u),
                b(b.S, p, { BYTES_PER_ELEMENT: f }),
                b(
                  b.S +
                    b.F *
                      g(function () {
                        a.of.call(h, 1);
                      }),
                  p,
                  { from: Fe, of: De }
                ),
                Y in c || x(c, Y, f),
                b(b.P, p, ze),
                D(p),
                b(b.P + b.F * Me, p, { set: Ue }),
                b(b.P + b.F * !m, p, qe),
                y || c.toString == ve || (c.toString = ve),
                b(
                  b.P +
                    b.F *
                      g(function () {
                        new h(1).slice();
                      }),
                  p,
                  { slice: We }
                ),
                b(
                  b.P +
                    b.F *
                      (g(function () {
                        return (
                          [1, 2].toLocaleString() !=
                          new h([1, 2]).toLocaleString()
                        );
                      }) ||
                        !g(function () {
                          c.toLocaleString.call([1, 2]);
                        })),
                  p,
                  { toLocaleString: Ne }
                ),
                (C[p] = m ? l : v),
                y || m || x(c, _e, v);
            });
        } else t.exports = function () {};
      },
      {
        "./_an-instance": 4,
        "./_array-copy-within": 6,
        "./_array-fill": 7,
        "./_array-includes": 8,
        "./_array-methods": 9,
        "./_classof": 12,
        "./_ctx": 16,
        "./_descriptors": 18,
        "./_export": 22,
        "./_fails": 24,
        "./_global": 29,
        "./_has": 30,
        "./_hide": 31,
        "./_is-array-iter": 37,
        "./_is-object": 39,
        "./_iter-detect": 44,
        "./_iterators": 46,
        "./_library": 47,
        "./_object-create": 53,
        "./_object-dp": 54,
        "./_object-gopd": 56,
        "./_object-gopn": 58,
        "./_object-gpo": 60,
        "./_property-desc": 69,
        "./_redefine-all": 70,
        "./_set-species": 75,
        "./_species-constructor": 79,
        "./_to-absolute-index": 85,
        "./_to-index": 86,
        "./_to-integer": 87,
        "./_to-length": 89,
        "./_to-object": 90,
        "./_to-primitive": 91,
        "./_typed": 94,
        "./_typed-buffer": 93,
        "./_uid": 95,
        "./_wks": 99,
        "./core.get-iterator-method": 100,
        "./es6.array.iterator": 103,
      },
    ],
    93: [
      function (e, t, r) {
        "use strict";
        var n = e("./_global"),
          o = e("./_descriptors"),
          i = e("./_library"),
          s = e("./_typed"),
          a = e("./_hide"),
          u = e("./_redefine-all"),
          c = e("./_fails"),
          l = e("./_an-instance"),
          f = e("./_to-integer"),
          d = e("./_to-length"),
          p = e("./_to-index"),
          h = e("./_object-gopn").f,
          m = e("./_object-dp").f,
          v = e("./_array-fill"),
          y = e("./_set-to-string-tag"),
          _ = "ArrayBuffer",
          g = "DataView",
          b = "prototype",
          w = "Wrong index!",
          j = n[_],
          x = n[g],
          k = n.Math,
          S = n.RangeError,
          P = n.Infinity,
          E = j,
          M = k.abs,
          O = k.pow,
          I = k.floor,
          A = k.log,
          T = k.LN2,
          R = "byteLength",
          C = "byteOffset",
          F = o ? "_b" : "buffer",
          D = o ? "_l" : R,
          L = o ? "_o" : C;
        function N(e, t, r) {
          var n,
            o,
            i,
            s = new Array(r),
            a = 8 * r - t - 1,
            u = (1 << a) - 1,
            c = u >> 1,
            l = 23 === t ? O(2, -24) - O(2, -77) : 0,
            f = 0,
            d = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
          for (
            (e = M(e)) != e || e === P
              ? ((o = e != e ? 1 : 0), (n = u))
              : ((n = I(A(e) / T)),
                e * (i = O(2, -n)) < 1 && (n--, (i *= 2)),
                2 <= (e += 1 <= n + c ? l / i : l * O(2, 1 - c)) * i &&
                  (n++, (i /= 2)),
                u <= n + c
                  ? ((o = 0), (n = u))
                  : 1 <= n + c
                  ? ((o = (e * i - 1) * O(2, t)), (n += c))
                  : ((o = e * O(2, c - 1) * O(2, t)), (n = 0)));
            8 <= t;
            s[f++] = 255 & o, o /= 256, t -= 8
          );
          for (
            n = (n << t) | o, a += t;
            0 < a;
            s[f++] = 255 & n, n /= 256, a -= 8
          );
          return (s[--f] |= 128 * d), s;
        }
        function z(e, t, r) {
          var n,
            o = 8 * r - t - 1,
            i = (1 << o) - 1,
            s = i >> 1,
            a = o - 7,
            u = r - 1,
            c = e[u--],
            l = 127 & c;
          for (c >>= 7; 0 < a; l = 256 * l + e[u], u--, a -= 8);
          for (
            n = l & ((1 << -a) - 1), l >>= -a, a += t;
            0 < a;
            n = 256 * n + e[u], u--, a -= 8
          );
          if (0 === l) l = 1 - s;
          else {
            if (l === i) return n ? NaN : c ? -P : P;
            (n += O(2, t)), (l -= s);
          }
          return (c ? -1 : 1) * n * O(2, l - t);
        }
        function W(e) {
          return (e[3] << 24) | (e[2] << 16) | (e[1] << 8) | e[0];
        }
        function U(e) {
          return [255 & e];
        }
        function q(e) {
          return [255 & e, (e >> 8) & 255];
        }
        function B(e) {
          return [255 & e, (e >> 8) & 255, (e >> 16) & 255, (e >> 24) & 255];
        }
        function H(e) {
          return N(e, 52, 8);
        }
        function G(e) {
          return N(e, 23, 4);
        }
        function V(e, t, r) {
          m(e[b], t, {
            get: function () {
              return this[r];
            },
          });
        }
        function K(e, t, r, n) {
          var o = p(+r);
          if (o + t > e[D]) throw S(w);
          var i = e[F]._b,
            s = o + e[L],
            a = i.slice(s, s + t);
          return n ? a : a.reverse();
        }
        function Y(e, t, r, n, o, i) {
          var s = p(+r);
          if (s + t > e[D]) throw S(w);
          for (var a = e[F]._b, u = s + e[L], c = n(+o), l = 0; l < t; l++)
            a[u + l] = c[i ? l : t - l - 1];
        }
        if (s.ABV) {
          if (
            !c(function () {
              j(1);
            }) ||
            !c(function () {
              new j(-1);
            }) ||
            c(function () {
              return new j(), new j(1.5), new j(NaN), j.name != _;
            })
          ) {
            for (
              var $,
                J = ((j = function (e) {
                  return l(this, j), new E(p(e));
                })[b] = E[b]),
                Q = h(E),
                X = 0;
              Q.length > X;

            )
              ($ = Q[X++]) in j || a(j, $, E[$]);
            i || (J.constructor = j);
          }
          var Z = new x(new j(2)),
            ee = x[b].setInt8;
          Z.setInt8(0, 2147483648),
            Z.setInt8(1, 2147483649),
            (!Z.getInt8(0) && Z.getInt8(1)) ||
              u(
                x[b],
                {
                  setInt8: function (e, t) {
                    ee.call(this, e, (t << 24) >> 24);
                  },
                  setUint8: function (e, t) {
                    ee.call(this, e, (t << 24) >> 24);
                  },
                },
                !0
              );
        } else
          (j = function (e) {
            l(this, j, _);
            var t = p(e);
            (this._b = v.call(new Array(t), 0)), (this[D] = t);
          }),
            (x = function (e, t, r) {
              l(this, x, g), l(e, j, g);
              var n = e[D],
                o = f(t);
              if (o < 0 || n < o) throw S("Wrong offset!");
              if (n < o + (r = void 0 === r ? n - o : d(r)))
                throw S("Wrong length!");
              (this[F] = e), (this[L] = o), (this[D] = r);
            }),
            o &&
              (V(j, R, "_l"),
              V(x, "buffer", "_b"),
              V(x, R, "_l"),
              V(x, C, "_o")),
            u(x[b], {
              getInt8: function (e) {
                return (K(this, 1, e)[0] << 24) >> 24;
              },
              getUint8: function (e) {
                return K(this, 1, e)[0];
              },
              getInt16: function (e, t) {
                var r = K(this, 2, e, t);
                return (((r[1] << 8) | r[0]) << 16) >> 16;
              },
              getUint16: function (e, t) {
                var r = K(this, 2, e, t);
                return (r[1] << 8) | r[0];
              },
              getInt32: function (e, t) {
                return W(K(this, 4, e, t));
              },
              getUint32: function (e, t) {
                return W(K(this, 4, e, t)) >>> 0;
              },
              getFloat32: function (e, t) {
                return z(K(this, 4, e, t), 23, 4);
              },
              getFloat64: function (e, t) {
                return z(K(this, 8, e, t), 52, 8);
              },
              setInt8: function (e, t) {
                Y(this, 1, e, U, t);
              },
              setUint8: function (e, t) {
                Y(this, 1, e, U, t);
              },
              setInt16: function (e, t, r) {
                Y(this, 2, e, q, t, r);
              },
              setUint16: function (e, t, r) {
                Y(this, 2, e, q, t, r);
              },
              setInt32: function (e, t, r) {
                Y(this, 4, e, B, t, r);
              },
              setUint32: function (e, t, r) {
                Y(this, 4, e, B, t, r);
              },
              setFloat32: function (e, t, r) {
                Y(this, 4, e, G, t, r);
              },
              setFloat64: function (e, t, r) {
                Y(this, 8, e, H, t, r);
              },
            });
        y(j, _), y(x, g), a(x[b], s.VIEW, !0), (r[_] = j), (r[g] = x);
      },
      {
        "./_an-instance": 4,
        "./_array-fill": 7,
        "./_descriptors": 18,
        "./_fails": 24,
        "./_global": 29,
        "./_hide": 31,
        "./_library": 47,
        "./_object-dp": 54,
        "./_object-gopn": 58,
        "./_redefine-all": 70,
        "./_set-to-string-tag": 76,
        "./_to-index": 86,
        "./_to-integer": 87,
        "./_to-length": 89,
        "./_typed": 94,
      },
    ],
    94: [
      function (e, t, r) {
        for (
          var n,
            o = e("./_global"),
            i = e("./_hide"),
            s = e("./_uid"),
            a = s("typed_array"),
            u = s("view"),
            c = !(!o.ArrayBuffer || !o.DataView),
            l = c,
            f = 0,
            d =
              "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(
                ","
              );
          f < 9;

        )
          (n = o[d[f++]])
            ? (i(n.prototype, a, !0), i(n.prototype, u, !0))
            : (l = !1);
        t.exports = { ABV: c, CONSTR: l, TYPED: a, VIEW: u };
      },
      { "./_global": 29, "./_hide": 31, "./_uid": 95 },
    ],
    95: [
      function (e, t, r) {
        var n = 0,
          o = Math.random();
        t.exports = function (e) {
          return "Symbol(".concat(
            void 0 === e ? "" : e,
            ")_",
            (++n + o).toString(36)
          );
        };
      },
      {},
    ],
    96: [
      function (e, t, r) {
        var n = e("./_global").navigator;
        t.exports = (n && n.userAgent) || "";
      },
      { "./_global": 29 },
    ],
    97: [
      function (e, t, r) {
        var n = e("./_global"),
          o = e("./_core"),
          i = e("./_library"),
          s = e("./_wks-ext"),
          a = e("./_object-dp").f;
        t.exports = function (e) {
          var t = o.Symbol || (o.Symbol = (!i && n.Symbol) || {});
          "_" == e.charAt(0) || e in t || a(t, e, { value: s.f(e) });
        };
      },
      {
        "./_core": 14,
        "./_global": 29,
        "./_library": 47,
        "./_object-dp": 54,
        "./_wks-ext": 98,
      },
    ],
    98: [
      function (e, t, r) {
        r.f = e("./_wks");
      },
      { "./_wks": 99 },
    ],
    99: [
      function (e, t, r) {
        var n = e("./_shared")("wks"),
          o = e("./_uid"),
          i = e("./_global").Symbol,
          s = "function" == typeof i;
        (t.exports = function (e) {
          return n[e] || (n[e] = (s && i[e]) || (s ? i : o)("Symbol." + e));
        }).store = n;
      },
      { "./_global": 29, "./_shared": 78, "./_uid": 95 },
    ],
    100: [
      function (e, t, r) {
        var n = e("./_classof"),
          o = e("./_wks")("iterator"),
          i = e("./_iterators");
        t.exports = e("./_core").getIteratorMethod = function (e) {
          if (null != e) return e[o] || e["@@iterator"] || i[n(e)];
        };
      },
      { "./_classof": 12, "./_core": 14, "./_iterators": 46, "./_wks": 99 },
    ],
    101: [
      function (e, t, r) {
        "use strict";
        var n = e("./_export"),
          o = e("./_array-methods")(5),
          i = "find",
          s = !0;
        i in [] &&
          Array(1)[i](function () {
            s = !1;
          }),
          n(n.P + n.F * s, "Array", {
            find: function (e, t) {
              return o(this, e, 1 < arguments.length ? t : void 0);
            },
          }),
          e("./_add-to-unscopables")(i);
      },
      { "./_add-to-unscopables": 2, "./_array-methods": 9, "./_export": 22 },
    ],
    102: [
      function (e, t, r) {
        "use strict";
        var h = e("./_ctx"),
          n = e("./_export"),
          m = e("./_to-object"),
          v = e("./_iter-call"),
          y = e("./_is-array-iter"),
          _ = e("./_to-length"),
          g = e("./_create-property"),
          b = e("./core.get-iterator-method");
        n(
          n.S +
            n.F *
              !e("./_iter-detect")(function (e) {
                Array.from(e);
              }),
          "Array",
          {
            from: function (e, t, r) {
              var n,
                o,
                i,
                s,
                a = m(e),
                u = "function" == typeof this ? this : Array,
                c = arguments.length,
                l = 1 < c ? t : void 0,
                f = void 0 !== l,
                d = 0,
                p = b(a);
              if (
                (f && (l = h(l, 2 < c ? r : void 0, 2)),
                null == p || (u == Array && y(p)))
              )
                for (o = new u((n = _(a.length))); d < n; d++)
                  g(o, d, f ? l(a[d], d) : a[d]);
              else
                for (s = p.call(a), o = new u(); !(i = s.next()).done; d++)
                  g(o, d, f ? v(s, l, [i.value, d], !0) : i.value);
              return (o.length = d), o;
            },
          }
        );
      },
      {
        "./_create-property": 15,
        "./_ctx": 16,
        "./_export": 22,
        "./_is-array-iter": 37,
        "./_iter-call": 41,
        "./_iter-detect": 44,
        "./_to-length": 89,
        "./_to-object": 90,
        "./core.get-iterator-method": 100,
      },
    ],
    103: [
      function (e, t, r) {
        "use strict";
        var n = e("./_add-to-unscopables"),
          o = e("./_iter-step"),
          i = e("./_iterators"),
          s = e("./_to-iobject");
        (t.exports = e("./_iter-define")(
          Array,
          "Array",
          function (e, t) {
            (this._t = s(e)), (this._i = 0), (this._k = t);
          },
          function () {
            var e = this._t,
              t = this._k,
              r = this._i++;
            return !e || r >= e.length
              ? ((this._t = void 0), o(1))
              : o(0, "keys" == t ? r : "values" == t ? e[r] : [r, e[r]]);
          },
          "values"
        )),
          (i.Arguments = i.Array),
          n("keys"),
          n("values"),
          n("entries");
      },
      {
        "./_add-to-unscopables": 2,
        "./_iter-define": 43,
        "./_iter-step": 45,
        "./_iterators": 46,
        "./_to-iobject": 88,
      },
    ],
    104: [
      function (e, t, r) {
        var n = e("./_object-dp").f,
          o = Function.prototype,
          i = /^\s*function ([^ (]*)/;
        "name" in o ||
          (e("./_descriptors") &&
            n(o, "name", {
              configurable: !0,
              get: function () {
                try {
                  return ("" + this).match(i)[1];
                } catch (e) {
                  return "";
                }
              },
            }));
      },
      { "./_descriptors": 18, "./_object-dp": 54 },
    ],
    105: [
      function (e, t, r) {
        var n = e("./_export");
        n(n.S, "Math", {
          clz32: function (e) {
            return (e >>>= 0)
              ? 31 - Math.floor(Math.log(e + 0.5) * Math.LOG2E)
              : 32;
          },
        });
      },
      { "./_export": 22 },
    ],
    106: [
      function (e, t, r) {
        var n = e("./_export");
        n(n.S, "Math", { fround: e("./_math-fround") });
      },
      { "./_export": 22, "./_math-fround": 48 },
    ],
    107: [
      function (e, t, r) {
        var n = e("./_export"),
          o = Math.imul;
        n(
          n.S +
            n.F *
              e("./_fails")(function () {
                return -5 != o(4294967295, 5) || 2 != o.length;
              }),
          "Math",
          {
            imul: function (e, t) {
              var r = 65535,
                n = +e,
                o = +t,
                i = r & n,
                s = r & o;
              return (
                0 |
                (i * s +
                  ((((r & (n >>> 16)) * s + i * (r & (o >>> 16))) << 16) >>> 0))
              );
            },
          }
        );
      },
      { "./_export": 22, "./_fails": 24 },
    ],
    108: [
      function (e, t, r) {
        var n = e("./_export");
        n(n.S, "Math", {
          trunc: function (e) {
            return (0 < e ? Math.floor : Math.ceil)(e);
          },
        });
      },
      { "./_export": 22 },
    ],
    109: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t = l(e, !1);
          if ("string" == typeof t && 2 < t.length) {
            var r,
              n,
              o,
              i = (t = g ? t.trim() : p(t, 3)).charCodeAt(0);
            if (43 === i || 45 === i) {
              if (88 === (r = t.charCodeAt(2)) || 120 === r) return NaN;
            } else if (48 === i) {
              switch (t.charCodeAt(1)) {
                case 66:
                case 98:
                  (n = 2), (o = 49);
                  break;
                case 79:
                case 111:
                  (n = 8), (o = 55);
                  break;
                default:
                  return +t;
              }
              for (var s, a = t.slice(2), u = 0, c = a.length; u < c; u++)
                if ((s = a.charCodeAt(u)) < 48 || o < s) return NaN;
              return parseInt(a, n);
            }
          }
          return +t;
        }
        var o = e("./_global"),
          i = e("./_has"),
          s = e("./_cof"),
          a = e("./_inherit-if-required"),
          l = e("./_to-primitive"),
          u = e("./_fails"),
          c = e("./_object-gopn").f,
          f = e("./_object-gopd").f,
          d = e("./_object-dp").f,
          p = e("./_string-trim").trim,
          h = "Number",
          m = o[h],
          v = m,
          y = m.prototype,
          _ = s(e("./_object-create")(y)) == h,
          g = "trim" in String.prototype;
        if (!m(" 0o1") || !m("0b1") || m("+0x1")) {
          m = function (e) {
            var t = arguments.length < 1 ? 0 : e,
              r = this;
            return r instanceof m &&
              (_
                ? u(function () {
                    y.valueOf.call(r);
                  })
                : s(r) != h)
              ? a(new v(n(t)), r, m)
              : n(t);
          };
          for (
            var b,
              w = e("./_descriptors")
                ? c(v)
                : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(
                    ","
                  ),
              j = 0;
            w.length > j;
            j++
          )
            i(v, (b = w[j])) && !i(m, b) && d(m, b, f(v, b));
          ((m.prototype = y).constructor = m), e("./_redefine")(o, h, m);
        }
      },
      {
        "./_cof": 13,
        "./_descriptors": 18,
        "./_fails": 24,
        "./_global": 29,
        "./_has": 30,
        "./_inherit-if-required": 34,
        "./_object-create": 53,
        "./_object-dp": 54,
        "./_object-gopd": 56,
        "./_object-gopn": 58,
        "./_redefine": 71,
        "./_string-trim": 82,
        "./_to-primitive": 91,
      },
    ],
    110: [
      function (e, t, r) {
        var n = e("./_export"),
          o = e("./_parse-int");
        n(n.S + n.F * (Number.parseInt != o), "Number", { parseInt: o });
      },
      { "./_export": 22, "./_parse-int": 66 },
    ],
    111: [
      function (e, t, r) {
        var n = e("./_to-object"),
          o = e("./_object-keys");
        e("./_object-sap")("keys", function () {
          return function (e) {
            return o(n(e));
          };
        });
      },
      { "./_object-keys": 62, "./_object-sap": 64, "./_to-object": 90 },
    ],
    112: [
      function (e, t, r) {
        "use strict";
        var n = e("./_classof"),
          o = {};
        (o[e("./_wks")("toStringTag")] = "z"),
          o + "" != "[object z]" &&
            e("./_redefine")(
              Object.prototype,
              "toString",
              function () {
                return "[object " + n(this) + "]";
              },
              !0
            );
      },
      { "./_classof": 12, "./_redefine": 71, "./_wks": 99 },
    ],
    113: [
      function (r, e, t) {
        "use strict";
        function n() {}
        function f(e) {
          var t;
          return !(!v(e) || "function" != typeof (t = e.then)) && t;
        }
        function o(l, r) {
          if (!l._n) {
            l._n = !0;
            var n = l._c;
            j(function () {
              for (
                var u = l._v,
                  c = 1 == l._s,
                  e = 0,
                  t = function (e) {
                    var t,
                      r,
                      n,
                      o = c ? e.ok : e.fail,
                      i = e.resolve,
                      s = e.reject,
                      a = e.domain;
                    try {
                      o
                        ? (c || (2 == l._h && N(l), (l._h = 1)),
                          !0 === o
                            ? (t = u)
                            : (a && a.enter(),
                              (t = o(u)),
                              a && (a.exit(), (n = !0))),
                          t === e.promise
                            ? s(M("Promise-chain cycle"))
                            : (r = f(t))
                            ? r.call(t, i, s)
                            : i(t))
                        : s(u);
                    } catch (e) {
                      a && !n && a.exit(), s(e);
                    }
                  };
                n.length > e;

              )
                t(n[e++]);
              (l._c = []), (l._n = !1), r && !l._h && D(l);
            });
          }
        }
        function i(e) {
          var t = this;
          t._d ||
            ((t._d = !0),
            ((t = t._w || t)._v = e),
            (t._s = 2),
            t._a || (t._a = t._c.slice()),
            o(t, !0));
        }
        var s,
          a,
          u,
          c,
          l = r("./_library"),
          d = r("./_global"),
          p = r("./_ctx"),
          h = r("./_classof"),
          m = r("./_export"),
          v = r("./_is-object"),
          y = r("./_a-function"),
          _ = r("./_an-instance"),
          g = r("./_for-of"),
          b = r("./_species-constructor"),
          w = r("./_task").set,
          j = r("./_microtask")(),
          x = r("./_new-promise-capability"),
          k = r("./_perform"),
          S = r("./_user-agent"),
          P = r("./_promise-resolve"),
          E = "Promise",
          M = d.TypeError,
          O = d.process,
          I = O && O.versions,
          A = (I && I.v8) || "",
          T = d[E],
          R = "process" == h(O),
          C = (a = x.f),
          F = !!(function () {
            try {
              var e = T.resolve(1),
                t = ((e.constructor = {})[r("./_wks")("species")] = function (
                  e
                ) {
                  e(n, n);
                });
              return (
                (R || "function" == typeof PromiseRejectionEvent) &&
                e.then(n) instanceof t &&
                0 !== A.indexOf("6.6") &&
                -1 === S.indexOf("Chrome/66")
              );
            } catch (e) {}
          })(),
          D = function (i) {
            w.call(d, function () {
              var e,
                t,
                r,
                n = i._v,
                o = L(i);
              if (
                (o &&
                  ((e = k(function () {
                    R
                      ? O.emit("unhandledRejection", n, i)
                      : (t = d.onunhandledrejection)
                      ? t({ promise: i, reason: n })
                      : (r = d.console) &&
                        r.error &&
                        r.error("Unhandled promise rejection", n);
                  })),
                  (i._h = R || L(i) ? 2 : 1)),
                (i._a = void 0),
                o && e.e)
              )
                throw e.v;
            });
          },
          L = function (e) {
            return 1 !== e._h && 0 === (e._a || e._c).length;
          },
          N = function (t) {
            w.call(d, function () {
              var e;
              R
                ? O.emit("rejectionHandled", t)
                : (e = d.onrejectionhandled) && e({ promise: t, reason: t._v });
            });
          },
          z = function (e) {
            var r,
              n = this;
            if (!n._d) {
              (n._d = !0), (n = n._w || n);
              try {
                if (n === e) throw M("Promise can't be resolved itself");
                (r = f(e))
                  ? j(function () {
                      var t = { _w: n, _d: !1 };
                      try {
                        r.call(e, p(z, t, 1), p(i, t, 1));
                      } catch (e) {
                        i.call(t, e);
                      }
                    })
                  : ((n._v = e), (n._s = 1), o(n, !1));
              } catch (e) {
                i.call({ _w: n, _d: !1 }, e);
              }
            }
          };
        F ||
          ((T = function (e) {
            _(this, T, E, "_h"), y(e), s.call(this);
            try {
              e(p(z, this, 1), p(i, this, 1));
            } catch (e) {
              i.call(this, e);
            }
          }),
          ((s = function () {
            (this._c = []),
              (this._a = void 0),
              (this._s = 0),
              (this._d = !1),
              (this._v = void 0),
              (this._h = 0),
              (this._n = !1);
          }).prototype = r("./_redefine-all")(T.prototype, {
            then: function (e, t) {
              var r = C(b(this, T));
              return (
                (r.ok = "function" != typeof e || e),
                (r.fail = "function" == typeof t && t),
                (r.domain = R ? O.domain : void 0),
                this._c.push(r),
                this._a && this._a.push(r),
                this._s && o(this, !1),
                r.promise
              );
            },
            catch: function (e) {
              return this.then(void 0, e);
            },
          })),
          (u = function () {
            var e = new s();
            (this.promise = e),
              (this.resolve = p(z, e, 1)),
              (this.reject = p(i, e, 1));
          }),
          (x.f = C =
            function (e) {
              return e === T || e === c ? new u() : a(e);
            })),
          m(m.G + m.W + m.F * !F, { Promise: T }),
          r("./_set-to-string-tag")(T, E),
          r("./_set-species")(E),
          (c = r("./_core")[E]),
          m(m.S + m.F * !F, E, {
            reject: function (e) {
              var t = C(this);
              return (0, t.reject)(e), t.promise;
            },
          }),
          m(m.S + m.F * (l || !F), E, {
            resolve: function (e) {
              return P(l && this === c ? T : this, e);
            },
          }),
          m(
            m.S +
              m.F *
                !(
                  F &&
                  r("./_iter-detect")(function (e) {
                    T.all(e).catch(n);
                  })
                ),
            E,
            {
              all: function (e) {
                var s = this,
                  t = C(s),
                  a = t.resolve,
                  u = t.reject,
                  r = k(function () {
                    var n = [],
                      o = 0,
                      i = 1;
                    g(e, !1, function (e) {
                      var t = o++,
                        r = !1;
                      n.push(void 0),
                        i++,
                        s.resolve(e).then(function (e) {
                          r || ((r = !0), (n[t] = e), --i || a(n));
                        }, u);
                    }),
                      --i || a(n);
                  });
                return r.e && u(r.v), t.promise;
              },
              race: function (e) {
                var t = this,
                  r = C(t),
                  n = r.reject,
                  o = k(function () {
                    g(e, !1, function (e) {
                      t.resolve(e).then(r.resolve, n);
                    });
                  });
                return o.e && n(o.v), r.promise;
              },
            }
          );
      },
      {
        "./_a-function": 1,
        "./_an-instance": 4,
        "./_classof": 12,
        "./_core": 14,
        "./_ctx": 16,
        "./_export": 22,
        "./_for-of": 27,
        "./_global": 29,
        "./_is-object": 39,
        "./_iter-detect": 44,
        "./_library": 47,
        "./_microtask": 51,
        "./_new-promise-capability": 52,
        "./_perform": 67,
        "./_promise-resolve": 68,
        "./_redefine-all": 70,
        "./_set-species": 75,
        "./_set-to-string-tag": 76,
        "./_species-constructor": 79,
        "./_task": 84,
        "./_user-agent": 96,
        "./_wks": 99,
      },
    ],
    114: [
      function (e, t, r) {
        var n = e("./_global"),
          i = e("./_inherit-if-required"),
          o = e("./_object-dp").f,
          s = e("./_object-gopn").f,
          a = e("./_is-regexp"),
          u = e("./_flags"),
          c = n.RegExp,
          l = c,
          f = c.prototype,
          d = /a/g,
          p = /a/g,
          h = new c(d) !== d;
        if (
          e("./_descriptors") &&
          (!h ||
            e("./_fails")(function () {
              return (
                (p[e("./_wks")("match")] = !1),
                c(d) != d || c(p) == p || "/a/i" != c(d, "i")
              );
            }))
        ) {
          c = function (e, t) {
            var r = this instanceof c,
              n = a(e),
              o = void 0 === t;
            return !r && n && e.constructor === c && o
              ? e
              : i(
                  h
                    ? new l(n && !o ? e.source : e, t)
                    : l(
                        (n = e instanceof c) ? e.source : e,
                        n && o ? u.call(e) : t
                      ),
                  r ? this : f,
                  c
                );
          };
          function m(t) {
            t in c ||
              o(c, t, {
                configurable: !0,
                get: function () {
                  return l[t];
                },
                set: function (e) {
                  l[t] = e;
                },
              });
          }
          for (var v = s(l), y = 0; v.length > y; ) m(v[y++]);
          ((f.constructor = c).prototype = f), e("./_redefine")(n, "RegExp", c);
        }
        e("./_set-species")("RegExp");
      },
      {
        "./_descriptors": 18,
        "./_fails": 24,
        "./_flags": 26,
        "./_global": 29,
        "./_inherit-if-required": 34,
        "./_is-regexp": 40,
        "./_object-dp": 54,
        "./_object-gopn": 58,
        "./_redefine": 71,
        "./_set-species": 75,
        "./_wks": 99,
      },
    ],
    115: [
      function (e, t, r) {
        "use strict";
        var n = e("./_regexp-exec");
        e("./_export")(
          { target: "RegExp", proto: !0, forced: n !== /./.exec },
          { exec: n }
        );
      },
      { "./_export": 22, "./_regexp-exec": 73 },
    ],
    116: [
      function (e, t, r) {
        e("./_descriptors") &&
          "g" != /./g.flags &&
          e("./_object-dp").f(RegExp.prototype, "flags", {
            configurable: !0,
            get: e("./_flags"),
          });
      },
      { "./_descriptors": 18, "./_flags": 26, "./_object-dp": 54 },
    ],
    117: [
      function (e, t, r) {
        "use strict";
        var k = e("./_an-object"),
          n = e("./_to-object"),
          S = e("./_to-length"),
          P = e("./_to-integer"),
          E = e("./_advance-string-index"),
          M = e("./_regexp-exec-abstract"),
          O = Math.max,
          I = Math.min,
          d = Math.floor,
          p = /\$([$&`']|\d\d?|<[^>]*>)/g,
          h = /\$([$&`']|\d\d?)/g;
        e("./_fix-re-wks")("replace", 2, function (o, i, w, j) {
          return [
            function (e, t) {
              var r = o(this),
                n = null == e ? void 0 : e[i];
              return void 0 !== n ? n.call(e, r, t) : w.call(String(r), e, t);
            },
            function (e, t) {
              var r = j(w, e, this, t);
              if (r.done) return r.value;
              var n = k(e),
                o = String(this),
                i = "function" == typeof t;
              i || (t = String(t));
              var s = n.global;
              if (s) {
                var a = n.unicode;
                n.lastIndex = 0;
              }
              for (var u = []; ; ) {
                var c = M(n, o);
                if (null === c) break;
                if ((u.push(c), !s)) break;
                "" === String(c[0]) && (n.lastIndex = E(o, S(n.lastIndex), a));
              }
              for (var l, f = "", d = 0, p = 0; p < u.length; p++) {
                c = u[p];
                for (
                  var h = String(c[0]),
                    m = O(I(P(c.index), o.length), 0),
                    v = [],
                    y = 1;
                  y < c.length;
                  y++
                )
                  v.push(void 0 === (l = c[y]) ? l : String(l));
                var _ = c.groups;
                if (i) {
                  var g = [h].concat(v, m, o);
                  void 0 !== _ && g.push(_);
                  var b = String(t.apply(void 0, g));
                } else b = x(h, o, m, v, _, t);
                d <= m && ((f += o.slice(d, m) + b), (d = m + h.length));
              }
              return f + o.slice(d);
            },
          ];
          function x(i, s, a, u, c, e) {
            var l = a + i.length,
              f = u.length,
              t = h;
            return (
              void 0 !== c && ((c = n(c)), (t = p)),
              w.call(e, t, function (e, t) {
                var r;
                switch (t.charAt(0)) {
                  case "$":
                    return "$";
                  case "&":
                    return i;
                  case "`":
                    return s.slice(0, a);
                  case "'":
                    return s.slice(l);
                  case "<":
                    r = c[t.slice(1, -1)];
                    break;
                  default:
                    var n = +t;
                    if (0 == n) return e;
                    if (f < n) {
                      var o = d(n / 10);
                      return 0 === o
                        ? e
                        : o <= f
                        ? void 0 === u[o - 1]
                          ? t.charAt(1)
                          : u[o - 1] + t.charAt(1)
                        : e;
                    }
                    r = u[n - 1];
                }
                return void 0 === r ? "" : r;
              })
            );
          }
        });
      },
      {
        "./_advance-string-index": 3,
        "./_an-object": 5,
        "./_fix-re-wks": 25,
        "./_regexp-exec-abstract": 72,
        "./_to-integer": 87,
        "./_to-length": 89,
        "./_to-object": 90,
      },
    ],
    118: [
      function (e, t, r) {
        "use strict";
        var f = e("./_is-regexp"),
          g = e("./_an-object"),
          b = e("./_species-constructor"),
          w = e("./_advance-string-index"),
          j = e("./_to-length"),
          x = e("./_regexp-exec-abstract"),
          d = e("./_regexp-exec"),
          n = e("./_fails"),
          k = Math.min,
          p = [].push,
          s = "split",
          h = "length",
          m = "lastIndex",
          S = 4294967295,
          P = !n(function () {
            RegExp(S, "y");
          });
        e("./_fix-re-wks")("split", 2, function (o, i, v, y) {
          var _;
          return (
            (_ =
              "c" == "abbc"[s](/(b)*/)[1] ||
              4 != "test"[s](/(?:)/, -1)[h] ||
              2 != "ab"[s](/(?:ab)*/)[h] ||
              4 != "."[s](/(.?)(.?)/)[h] ||
              1 < "."[s](/()()/)[h] ||
              ""[s](/.?/)[h]
                ? function (e, t) {
                    var r = String(this);
                    if (void 0 === e && 0 === t) return [];
                    if (!f(e)) return v.call(r, e, t);
                    for (
                      var n,
                        o,
                        i,
                        s = [],
                        a =
                          (e.ignoreCase ? "i" : "") +
                          (e.multiline ? "m" : "") +
                          (e.unicode ? "u" : "") +
                          (e.sticky ? "y" : ""),
                        u = 0,
                        c = void 0 === t ? S : t >>> 0,
                        l = new RegExp(e.source, a + "g");
                      (n = d.call(l, r)) &&
                      !(
                        u < (o = l[m]) &&
                        (s.push(r.slice(u, n.index)),
                        1 < n[h] && n.index < r[h] && p.apply(s, n.slice(1)),
                        (i = n[0][h]),
                        (u = o),
                        s[h] >= c)
                      );

                    )
                      l[m] === n.index && l[m]++;
                    return (
                      u === r[h]
                        ? (!i && l.test("")) || s.push("")
                        : s.push(r.slice(u)),
                      s[h] > c ? s.slice(0, c) : s
                    );
                  }
                : "0"[s](void 0, 0)[h]
                ? function (e, t) {
                    return void 0 === e && 0 === t ? [] : v.call(this, e, t);
                  }
                : v),
            [
              function (e, t) {
                var r = o(this),
                  n = null == e ? void 0 : e[i];
                return void 0 !== n ? n.call(e, r, t) : _.call(String(r), e, t);
              },
              function (e, t) {
                var r = y(_, e, this, t, _ !== v);
                if (r.done) return r.value;
                var n = g(e),
                  o = String(this),
                  i = b(n, RegExp),
                  s = n.unicode,
                  a =
                    (n.ignoreCase ? "i" : "") +
                    (n.multiline ? "m" : "") +
                    (n.unicode ? "u" : "") +
                    (P ? "y" : "g"),
                  u = new i(P ? n : "^(?:" + n.source + ")", a),
                  c = void 0 === t ? S : t >>> 0;
                if (0 == c) return [];
                if (0 === o.length) return null === x(u, o) ? [o] : [];
                for (var l = 0, f = 0, d = []; f < o.length; ) {
                  u.lastIndex = P ? f : 0;
                  var p,
                    h = x(u, P ? o : o.slice(f));
                  if (
                    null === h ||
                    (p = k(j(u.lastIndex + (P ? 0 : f)), o.length)) === l
                  )
                    f = w(o, f, s);
                  else {
                    if ((d.push(o.slice(l, f)), d.length === c)) return d;
                    for (var m = 1; m <= h.length - 1; m++)
                      if ((d.push(h[m]), d.length === c)) return d;
                    f = l = p;
                  }
                }
                return d.push(o.slice(l)), d;
              },
            ]
          );
        });
      },
      {
        "./_advance-string-index": 3,
        "./_an-object": 5,
        "./_fails": 24,
        "./_fix-re-wks": 25,
        "./_is-regexp": 40,
        "./_regexp-exec": 73,
        "./_regexp-exec-abstract": 72,
        "./_species-constructor": 79,
        "./_to-length": 89,
      },
    ],
    119: [
      function (t, e, r) {
        "use strict";
        t("./es6.regexp.flags");
        function n(e) {
          t("./_redefine")(RegExp.prototype, a, e, !0);
        }
        var o = t("./_an-object"),
          i = t("./_flags"),
          s = t("./_descriptors"),
          a = "toString",
          u = /./[a];
        t("./_fails")(function () {
          return "/a/b" != u.call({ source: "a", flags: "b" });
        })
          ? n(function () {
              var e = o(this);
              return "/".concat(
                e.source,
                "/",
                "flags" in e
                  ? e.flags
                  : !s && e instanceof RegExp
                  ? i.call(e)
                  : void 0
              );
            })
          : u.name != a &&
            n(function () {
              return u.call(this);
            });
      },
      {
        "./_an-object": 5,
        "./_descriptors": 18,
        "./_fails": 24,
        "./_flags": 26,
        "./_redefine": 71,
        "./es6.regexp.flags": 116,
      },
    ],
    120: [
      function (e, t, r) {
        "use strict";
        var n = e("./_string-at")(!0);
        e("./_iter-define")(
          String,
          "String",
          function (e) {
            (this._t = String(e)), (this._i = 0);
          },
          function () {
            var e,
              t = this._t,
              r = this._i;
            return r >= t.length
              ? { value: void 0, done: !0 }
              : ((e = n(t, r)), (this._i += e.length), { value: e, done: !1 });
          }
        );
      },
      { "./_iter-define": 43, "./_string-at": 80 },
    ],
    121: [
      function (e, t, r) {
        "use strict";
        var n = e("./_export"),
          i = e("./_to-length"),
          s = e("./_string-context"),
          a = "startsWith",
          u = ""[a];
        n(n.P + n.F * e("./_fails-is-regexp")(a), "String", {
          startsWith: function (e, t) {
            var r = s(this, e, a),
              n = i(Math.min(1 < arguments.length ? t : void 0, r.length)),
              o = String(e);
            return u ? u.call(r, o, n) : r.slice(n, n + o.length) === o;
          },
        });
      },
      {
        "./_export": 22,
        "./_fails-is-regexp": 23,
        "./_string-context": 81,
        "./_to-length": 89,
      },
    ],
    122: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t = (K[e] = I(z[q]));
          return (t._k = e), t;
        }
        function o(e, t) {
          k(e);
          for (var r, n = j((t = E(t))), o = 0, i = n.length; o < i; )
            te(e, (r = n[o++]), t[r]);
          return e;
        }
        function i(e) {
          var t = G.call(this, (e = M(e, !0)));
          return (
            !(this === $ && l(K, e) && !l(Y, e)) &&
            (!(t || !l(this, e) || !l(K, e) || (l(this, B) && this[B][e])) || t)
          );
        }
        function s(e, t) {
          if (((e = E(e)), (t = M(t, !0)), e !== $ || !l(K, t) || l(Y, t))) {
            var r = D(e, t);
            return (
              !r || !l(K, t) || (l(e, B) && e[B][t]) || (r.enumerable = !0), r
            );
          }
        }
        function a(e) {
          for (var t, r = N(E(e)), n = [], o = 0; r.length > o; )
            l(K, (t = r[o++])) || t == B || t == h || n.push(t);
          return n;
        }
        function u(e) {
          for (
            var t, r = e === $, n = N(r ? Y : E(e)), o = [], i = 0;
            n.length > i;

          )
            !l(K, (t = n[i++])) || (r && !l($, t)) || o.push(K[t]);
          return o;
        }
        var c = e("./_global"),
          l = e("./_has"),
          f = e("./_descriptors"),
          d = e("./_export"),
          p = e("./_redefine"),
          h = e("./_meta").KEY,
          m = e("./_fails"),
          v = e("./_shared"),
          y = e("./_set-to-string-tag"),
          _ = e("./_uid"),
          g = e("./_wks"),
          b = e("./_wks-ext"),
          w = e("./_wks-define"),
          j = e("./_enum-keys"),
          x = e("./_is-array"),
          k = e("./_an-object"),
          S = e("./_is-object"),
          P = e("./_to-object"),
          E = e("./_to-iobject"),
          M = e("./_to-primitive"),
          O = e("./_property-desc"),
          I = e("./_object-create"),
          A = e("./_object-gopn-ext"),
          T = e("./_object-gopd"),
          R = e("./_object-gops"),
          C = e("./_object-dp"),
          F = e("./_object-keys"),
          D = T.f,
          L = C.f,
          N = A.f,
          z = c.Symbol,
          W = c.JSON,
          U = W && W.stringify,
          q = "prototype",
          B = g("_hidden"),
          H = g("toPrimitive"),
          G = {}.propertyIsEnumerable,
          V = v("symbol-registry"),
          K = v("symbols"),
          Y = v("op-symbols"),
          $ = Object[q],
          J = "function" == typeof z && !!R.f,
          Q = c.QObject,
          X = !Q || !Q[q] || !Q[q].findChild,
          Z =
            f &&
            m(function () {
              return (
                7 !=
                I(
                  L({}, "a", {
                    get: function () {
                      return L(this, "a", { value: 7 }).a;
                    },
                  })
                ).a
              );
            })
              ? function (e, t, r) {
                  var n = D($, t);
                  n && delete $[t], L(e, t, r), n && e !== $ && L($, t, n);
                }
              : L,
          ee =
            J && "symbol" == typeof z.iterator
              ? function (e) {
                  return "symbol" == typeof e;
                }
              : function (e) {
                  return e instanceof z;
                },
          te = function (e, t, r) {
            return (
              e === $ && te(Y, t, r),
              k(e),
              (t = M(t, !0)),
              k(r),
              l(K, t)
                ? (r.enumerable
                    ? (l(e, B) && e[B][t] && (e[B][t] = !1),
                      (r = I(r, { enumerable: O(0, !1) })))
                    : (l(e, B) || L(e, B, O(1, {})), (e[B][t] = !0)),
                  Z(e, t, r))
                : L(e, t, r)
            );
          };
        J ||
          (p(
            (z = function (e) {
              if (this instanceof z)
                throw TypeError("Symbol is not a constructor!");
              var t = _(0 < arguments.length ? e : void 0),
                r = function (e) {
                  this === $ && r.call(Y, e),
                    l(this, B) && l(this[B], t) && (this[B][t] = !1),
                    Z(this, t, O(1, e));
                };
              return f && X && Z($, t, { configurable: !0, set: r }), n(t);
            })[q],
            "toString",
            function () {
              return this._k;
            }
          ),
          (T.f = s),
          (C.f = te),
          (e("./_object-gopn").f = A.f = a),
          (e("./_object-pie").f = i),
          (R.f = u),
          f && !e("./_library") && p($, "propertyIsEnumerable", i, !0),
          (b.f = function (e) {
            return n(g(e));
          })),
          d(d.G + d.W + d.F * !J, { Symbol: z });
        for (
          var re =
              "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
                ","
              ),
            ne = 0;
          re.length > ne;

        )
          g(re[ne++]);
        for (var oe = F(g.store), ie = 0; oe.length > ie; ) w(oe[ie++]);
        d(d.S + d.F * !J, "Symbol", {
          for: function (e) {
            return l(V, (e += "")) ? V[e] : (V[e] = z(e));
          },
          keyFor: function (e) {
            if (!ee(e)) throw TypeError(e + " is not a symbol!");
            for (var t in V) if (V[t] === e) return t;
          },
          useSetter: function () {
            X = !0;
          },
          useSimple: function () {
            X = !1;
          },
        }),
          d(d.S + d.F * !J, "Object", {
            create: function (e, t) {
              return void 0 === t ? I(e) : o(I(e), t);
            },
            defineProperty: te,
            defineProperties: o,
            getOwnPropertyDescriptor: s,
            getOwnPropertyNames: a,
            getOwnPropertySymbols: u,
          });
        var se = m(function () {
          R.f(1);
        });
        d(d.S + d.F * se, "Object", {
          getOwnPropertySymbols: function (e) {
            return R.f(P(e));
          },
        }),
          W &&
            d(
              d.S +
                d.F *
                  (!J ||
                    m(function () {
                      var e = z();
                      return (
                        "[null]" != U([e]) ||
                        "{}" != U({ a: e }) ||
                        "{}" != U(Object(e))
                      );
                    })),
              "JSON",
              {
                stringify: function (e) {
                  for (var t, r, n = [e], o = 1; o < arguments.length; )
                    n.push(arguments[o++]);
                  if (((r = t = n[1]), (S(t) || void 0 !== e) && !ee(e)))
                    return (
                      x(t) ||
                        (t = function (e, t) {
                          if (
                            ("function" == typeof r && (t = r.call(this, e, t)),
                            !ee(t))
                          )
                            return t;
                        }),
                      (n[1] = t),
                      U.apply(W, n)
                    );
                },
              }
            ),
          z[q][H] || e("./_hide")(z[q], H, z[q].valueOf),
          y(z, "Symbol"),
          y(Math, "Math", !0),
          y(c.JSON, "JSON", !0);
      },
      {
        "./_an-object": 5,
        "./_descriptors": 18,
        "./_enum-keys": 21,
        "./_export": 22,
        "./_fails": 24,
        "./_global": 29,
        "./_has": 30,
        "./_hide": 31,
        "./_is-array": 38,
        "./_is-object": 39,
        "./_library": 47,
        "./_meta": 50,
        "./_object-create": 53,
        "./_object-dp": 54,
        "./_object-gopd": 56,
        "./_object-gopn": 58,
        "./_object-gopn-ext": 57,
        "./_object-gops": 59,
        "./_object-keys": 62,
        "./_object-pie": 63,
        "./_property-desc": 69,
        "./_redefine": 71,
        "./_set-to-string-tag": 76,
        "./_shared": 78,
        "./_to-iobject": 88,
        "./_to-object": 90,
        "./_to-primitive": 91,
        "./_uid": 95,
        "./_wks": 99,
        "./_wks-define": 97,
        "./_wks-ext": 98,
      },
    ],
    123: [
      function (e, t, r) {
        e("./_typed-array")("Uint8", 1, function (n) {
          return function (e, t, r) {
            return n(this, e, t, r);
          };
        });
      },
      { "./_typed-array": 92 },
    ],
    124: [
      function (e, t, r) {
        e("./_typed-array")(
          "Uint8",
          1,
          function (n) {
            return function (e, t, r) {
              return n(this, e, t, r);
            };
          },
          !0
        );
      },
      { "./_typed-array": 92 },
    ],
    125: [
      function (e, t, r) {
        var n = e("./_export"),
          u = e("./_own-keys"),
          c = e("./_to-iobject"),
          l = e("./_object-gopd"),
          f = e("./_create-property");
        n(n.S, "Object", {
          getOwnPropertyDescriptors: function (e) {
            for (
              var t, r, n = c(e), o = l.f, i = u(n), s = {}, a = 0;
              i.length > a;

            )
              void 0 !== (r = o(n, (t = i[a++]))) && f(s, t, r);
            return s;
          },
        });
      },
      {
        "./_create-property": 15,
        "./_export": 22,
        "./_object-gopd": 56,
        "./_own-keys": 65,
        "./_to-iobject": 88,
      },
    ],
    126: [
      function (e, t, r) {
        e("./_wks-define")("asyncIterator");
      },
      { "./_wks-define": 97 },
    ],
    127: [
      function (e, t, r) {
        for (
          var n = e("./es6.array.iterator"),
            o = e("./_object-keys"),
            i = e("./_redefine"),
            s = e("./_global"),
            a = e("./_hide"),
            u = e("./_iterators"),
            c = e("./_wks"),
            l = c("iterator"),
            f = c("toStringTag"),
            d = u.Array,
            p = {
              CSSRuleList: !0,
              CSSStyleDeclaration: !1,
              CSSValueList: !1,
              ClientRectList: !1,
              DOMRectList: !1,
              DOMStringList: !1,
              DOMTokenList: !0,
              DataTransferItemList: !1,
              FileList: !1,
              HTMLAllCollection: !1,
              HTMLCollection: !1,
              HTMLFormElement: !1,
              HTMLSelectElement: !1,
              MediaList: !0,
              MimeTypeArray: !1,
              NamedNodeMap: !1,
              NodeList: !0,
              PaintRequestList: !1,
              Plugin: !1,
              PluginArray: !1,
              SVGLengthList: !1,
              SVGNumberList: !1,
              SVGPathSegList: !1,
              SVGPointList: !1,
              SVGStringList: !1,
              SVGTransformList: !1,
              SourceBufferList: !1,
              StyleSheetList: !0,
              TextTrackCueList: !1,
              TextTrackList: !1,
              TouchList: !1,
            },
            h = o(p),
            m = 0;
          m < h.length;
          m++
        ) {
          var v,
            y = h[m],
            _ = p[y],
            g = s[y],
            b = g && g.prototype;
          if (b && (b[l] || a(b, l, d), b[f] || a(b, f, y), (u[y] = d), _))
            for (v in n) b[v] || i(b, v, n[v], !0);
        }
      },
      {
        "./_global": 29,
        "./_hide": 31,
        "./_iterators": 46,
        "./_object-keys": 62,
        "./_redefine": 71,
        "./_wks": 99,
        "./es6.array.iterator": 103,
      },
    ],
    128: [
      function (e, t, r) {
        var n = (function (s) {
          "use strict";
          var u,
            e = Object.prototype,
            l = e.hasOwnProperty,
            t = "function" == typeof Symbol ? Symbol : {},
            o = t.iterator || "@@iterator",
            r = t.asyncIterator || "@@asyncIterator",
            n = t.toStringTag || "@@toStringTag";
          function a(e, t, r, n) {
            var i,
              s,
              a,
              u,
              o = t && t.prototype instanceof y ? t : y,
              c = Object.create(o.prototype),
              l = new E(n || []);
            return (
              (c._invoke =
                ((i = e),
                (s = r),
                (a = l),
                (u = d),
                function (e, t) {
                  if (u === h) throw new Error("Generator is already running");
                  if (u === m) {
                    if ("throw" === e) throw t;
                    return O();
                  }
                  for (a.method = e, a.arg = t; ; ) {
                    var r = a.delegate;
                    if (r) {
                      var n = k(r, a);
                      if (n) {
                        if (n === v) continue;
                        return n;
                      }
                    }
                    if ("next" === a.method) a.sent = a._sent = a.arg;
                    else if ("throw" === a.method) {
                      if (u === d) throw ((u = m), a.arg);
                      a.dispatchException(a.arg);
                    } else "return" === a.method && a.abrupt("return", a.arg);
                    u = h;
                    var o = f(i, s, a);
                    if ("normal" === o.type) {
                      if (((u = a.done ? m : p), o.arg === v)) continue;
                      return { value: o.arg, done: a.done };
                    }
                    "throw" === o.type &&
                      ((u = m), (a.method = "throw"), (a.arg = o.arg));
                  }
                })),
              c
            );
          }
          function f(e, t, r) {
            try {
              return { type: "normal", arg: e.call(t, r) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          s.wrap = a;
          var d = "suspendedStart",
            p = "suspendedYield",
            h = "executing",
            m = "completed",
            v = {};
          function y() {}
          function i() {}
          function c() {}
          var _ = {};
          _[o] = function () {
            return this;
          };
          var g = Object.getPrototypeOf,
            b = g && g(g(M([])));
          b && b !== e && l.call(b, o) && (_ = b);
          var w = (c.prototype = y.prototype = Object.create(_));
          function j(e) {
            ["next", "throw", "return"].forEach(function (t) {
              e[t] = function (e) {
                return this._invoke(t, e);
              };
            });
          }
          function x(u, c) {
            var t;
            this._invoke = function (r, n) {
              function e() {
                return new c(function (e, t) {
                  !(function t(e, r, n, o) {
                    var i = f(u[e], u, r);
                    if ("throw" !== i.type) {
                      var s = i.arg,
                        a = s.value;
                      return a && "object" == typeof a && l.call(a, "__await")
                        ? c.resolve(a.__await).then(
                            function (e) {
                              t("next", e, n, o);
                            },
                            function (e) {
                              t("throw", e, n, o);
                            }
                          )
                        : c.resolve(a).then(
                            function (e) {
                              (s.value = e), n(s);
                            },
                            function (e) {
                              return t("throw", e, n, o);
                            }
                          );
                    }
                    o(i.arg);
                  })(r, n, e, t);
                });
              }
              return (t = t ? t.then(e, e) : e());
            };
          }
          function k(e, t) {
            var r = e.iterator[t.method];
            if (r === u) {
              if (((t.delegate = null), "throw" === t.method)) {
                if (
                  e.iterator.return &&
                  ((t.method = "return"),
                  (t.arg = u),
                  k(e, t),
                  "throw" === t.method)
                )
                  return v;
                (t.method = "throw"),
                  (t.arg = new TypeError(
                    "The iterator does not provide a 'throw' method"
                  ));
              }
              return v;
            }
            var n = f(r, e.iterator, t.arg);
            if ("throw" === n.type)
              return (
                (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), v
              );
            var o = n.arg;
            return o
              ? o.done
                ? ((t[e.resultName] = o.value),
                  (t.next = e.nextLoc),
                  "return" !== t.method && ((t.method = "next"), (t.arg = u)),
                  (t.delegate = null),
                  v)
                : o
              : ((t.method = "throw"),
                (t.arg = new TypeError("iterator result is not an object")),
                (t.delegate = null),
                v);
          }
          function S(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function P(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function E(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(S, this),
              this.reset(!0);
          }
          function M(t) {
            if (t) {
              var e = t[o];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var r = -1,
                  n = function e() {
                    for (; ++r < t.length; )
                      if (l.call(t, r))
                        return (e.value = t[r]), (e.done = !1), e;
                    return (e.value = u), (e.done = !0), e;
                  };
                return (n.next = n);
              }
            }
            return { next: O };
          }
          function O() {
            return { value: u, done: !0 };
          }
          return (
            (i.prototype = w.constructor = c),
            (c.constructor = i),
            (c[n] = i.displayName = "GeneratorFunction"),
            (s.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === i || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (s.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, c)
                  : ((e.__proto__ = c), n in e || (e[n] = "GeneratorFunction")),
                (e.prototype = Object.create(w)),
                e
              );
            }),
            (s.awrap = function (e) {
              return { __await: e };
            }),
            j(x.prototype),
            (x.prototype[r] = function () {
              return this;
            }),
            (s.AsyncIterator = x),
            (s.async = function (e, t, r, n, o) {
              void 0 === o && (o = Promise);
              var i = new x(a(e, t, r, n), o);
              return s.isGeneratorFunction(t)
                ? i
                : i.next().then(function (e) {
                    return e.done ? e.value : i.next();
                  });
            }),
            j(w),
            (w[n] = "Generator"),
            (w[o] = function () {
              return this;
            }),
            (w.toString = function () {
              return "[object Generator]";
            }),
            (s.keys = function (r) {
              var n = [];
              for (var e in r) n.push(e);
              return (
                n.reverse(),
                function e() {
                  for (; n.length; ) {
                    var t = n.pop();
                    if (t in r) return (e.value = t), (e.done = !1), e;
                  }
                  return (e.done = !0), e;
                }
              );
            }),
            (s.values = M),
            (E.prototype = {
              constructor: E,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = u),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = u),
                  this.tryEntries.forEach(P),
                  !e)
                )
                  for (var t in this)
                    "t" === t.charAt(0) &&
                      l.call(this, t) &&
                      !isNaN(+t.slice(1)) &&
                      (this[t] = u);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (r) {
                if (this.done) throw r;
                var n = this;
                function e(e, t) {
                  return (
                    (i.type = "throw"),
                    (i.arg = r),
                    (n.next = e),
                    t && ((n.method = "next"), (n.arg = u)),
                    !!t
                  );
                }
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                  var o = this.tryEntries[t],
                    i = o.completion;
                  if ("root" === o.tryLoc) return e("end");
                  if (o.tryLoc <= this.prev) {
                    var s = l.call(o, "catchLoc"),
                      a = l.call(o, "finallyLoc");
                    if (s && a) {
                      if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return e(o.finallyLoc);
                    } else if (s) {
                      if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                    } else {
                      if (!a)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return e(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
                  var n = this.tryEntries[r];
                  if (
                    n.tryLoc <= this.prev &&
                    l.call(n, "finallyLoc") &&
                    this.prev < n.finallyLoc
                  ) {
                    var o = n;
                    break;
                  }
                }
                o &&
                  ("break" === e || "continue" === e) &&
                  o.tryLoc <= t &&
                  t <= o.finallyLoc &&
                  (o = null);
                var i = o ? o.completion : {};
                return (
                  (i.type = e),
                  (i.arg = t),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), v)
                    : this.complete(i)
                );
              },
              complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return (
                  "break" === e.type || "continue" === e.type
                    ? (this.next = e.arg)
                    : "return" === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === e.type && t && (this.next = t),
                  v
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                  var r = this.tryEntries[t];
                  if (r.finallyLoc === e)
                    return this.complete(r.completion, r.afterLoc), P(r), v;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                  var r = this.tryEntries[t];
                  if (r.tryLoc === e) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      P(r);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, t, r) {
                return (
                  (this.delegate = {
                    iterator: M(e),
                    resultName: t,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = u),
                  v
                );
              },
            }),
            s
          );
        })("object" == typeof t ? t.exports : {});
        try {
          regeneratorRuntime = n;
        } catch (e) {
          Function("r", "regeneratorRuntime = r")(n);
        }
      },
      {},
    ],
    129: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.Build = {
            version: "0.0.62 (01b63fb7a6b01a1b85b57237eb49c342)",
            buildSeed: 1618470048493,
            "wdosbox.wasm": { size: 1465588, gzSize: 489857 },
            "wdosbox.js": { size: 125693, gzSize: 32504 },
            "wlibzip.wasm": { size: 114289, gzSize: 53512 },
            "wlibzip.js": { size: 100116, gzSize: 25840 },
          });
      },
      {},
    ],
    130: [
      function (e, t, r) {
        "use strict";
        function s(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function n(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        function o(e, t, r) {
          return t && n(e.prototype, t), r && n(e, r), e;
        }
        e("core-js/modules/es6.regexp.to-string"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function () {
          function e() {
            s(this, e);
          }
          return (
            o(e, [
              { key: "close", value: function () {} },
              {
                key: "put",
                value: function () {
                  return Promise.resolve();
                },
              },
              {
                key: "get",
                value: function (e, t) {
                  return void 0 !== t
                    ? Promise.resolve(t)
                    : Promise.reject("Cache is not supported on this host");
                },
              },
              {
                key: "forEach",
                value: function (e, t) {
                  t();
                },
              },
            ]),
            e
          );
        })();
        (r.CacheNoop = i),
          (r.CacheDb = function (e, r) {
            return new Promise(function (t) {
              new a(e, t, function (e) {
                r.onErr(e), t(new i());
              });
            });
          });
        var a = (function () {
          function i(e, t, r) {
            var n = this;
            if (
              (s(this, i),
              (this.storeName = "files"),
              (this.db = null),
              (this.version = e),
              (this.indexedDB =
                "undefined" == typeof window
                  ? void 0
                  : window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB),
              this.indexedDB)
            ) {
              var o = this.indexedDB.open("js-dos-cache (" + e + ")", 1);
              (o.onerror = function (e) {
                var t;
                r(
                  "Can't open cache database: " +
                    (null === (t = o.error) || void 0 === t
                      ? void 0
                      : t.message)
                );
              }),
                (o.onsuccess = function (e) {
                  (n.db = o.result), t(n);
                }),
                (o.onupgradeneeded = function (e) {
                  try {
                    (n.db = o.result),
                      (n.db.onerror = function (e) {
                        r("Can't upgrade cache database");
                      }),
                      n.db.createObjectStore(n.storeName);
                  } catch (e) {
                    r("Can't upgrade cache database");
                  }
                });
            } else r("Indexed db is not supported on this host");
          }
          return (
            o(i, [
              {
                key: "close",
                value: function () {
                  null !== this.db && (this.db.close(), (this.db = null));
                },
              },
              {
                key: "put",
                value: function (r, n) {
                  var o = this;
                  return new Promise(function (e) {
                    if (null !== o.db) {
                      var t = o.db.transaction(o.storeName, "readwrite");
                      (t.oncomplete = function () {
                        return e();
                      }),
                        t.objectStore(o.storeName).put(n, r);
                    } else e();
                  });
                },
              },
              {
                key: "get",
                value: function (o, i) {
                  var s = this;
                  return new Promise(function (t, r) {
                    function e(e) {
                      void 0 === i ? r(new Error(e)) : t(i);
                    }
                    if (null !== s.db) {
                      var n = s.db
                        .transaction(s.storeName, "readonly")
                        .objectStore(s.storeName)
                        .get(o);
                      (n.onerror = function () {
                        return r(
                          new Error("Can't read value for key '" + o + "'")
                        );
                      }),
                        (n.onsuccess = function () {
                          n.result
                            ? t(n.result)
                            : e(
                                "Result is empty for key '" +
                                  o +
                                  "', result: " +
                                  n.result
                              );
                        });
                    } else e("db is not initalized");
                  });
                },
              },
              {
                key: "forEach",
                value: function (r, n) {
                  if (null !== this.db) {
                    var e = this.db
                      .transaction(this.storeName, "readonly")
                      .objectStore(this.storeName)
                      .openCursor();
                    (e.onerror = function () {
                      return n();
                    }),
                      (e.onsuccess = function (e) {
                        var t = e.target.result;
                        t ? (r(t.key.toString(), t.value), t.continue()) : n();
                      });
                  } else n();
                },
              },
            ]),
            i
          );
        })();
      },
      {
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "core-js/modules/es6.regexp.to-string": 119,
      },
    ],
    131: [
      function (e, t, r) {
        "use strict";
        function v(e) {
          if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
            if (Array.isArray(e) || (e = a(e))) {
              var t = 0,
                r = function () {};
              return {
                s: r,
                n: function () {
                  return t >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[t++] };
                },
                e: function (e) {
                  throw e;
                },
                f: r,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var n,
            o,
            i = !0,
            s = !1;
          return {
            s: function () {
              n = e[Symbol.iterator]();
            },
            n: function () {
              var e = n.next();
              return (i = e.done), e;
            },
            e: function (e) {
              (s = !0), (o = e);
            },
            f: function () {
              try {
                i || null == n.return || n.return();
              } finally {
                if (s) throw o;
              }
            },
          };
        }
        function u(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        function i(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return n(e);
            })(e) ||
            (function (e) {
              if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                return Array.from(e);
            })(e) ||
            a(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function a(e, t) {
          if (e) {
            if ("string" == typeof e) return n(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === r && e.constructor && (r = e.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(e)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? n(e, t)
                : void 0
            );
          }
        }
        function n(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        function s(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        e("core-js/modules/es6.function.name"),
          e("core-js/modules/es6.regexp.to-string"),
          e("core-js/modules/es6.array.from"),
          e("core-js/modules/es7.symbol.async-iterator"),
          e("core-js/modules/es6.symbol"),
          e("core-js/modules/es6.typed.uint8-array"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/web.dom.iterable"),
          e("core-js/modules/es6.array.iterator"),
          e("core-js/modules/es6.object.to-string"),
          e("core-js/modules/es6.string.iterator"),
          e("regenerator-runtime/runtime");
        var o = function (e) {
          return e && e.__esModule ? e : { default: e };
        };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var y = e("./dos-conf"),
          _ = o(e("../../libzip/libzip")),
          g = e("../../http"),
          c = (function () {
            function r(e, t) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, r),
                (this.config = y.createDosConfig()),
                (this.sources = []),
                (this.libzipWasm = e),
                (this.cache = t);
            }
            var e, t, n, a, o;
            return (
              (e = r),
              (t = [
                {
                  key: "autoexec",
                  value: function () {
                    for (
                      var e = arguments.length, t = new Array(e), r = 0;
                      r < e;
                      r++
                    )
                      t[r] = arguments[r];
                    return (
                      (this.config.autoexec.options.script.value =
                        t.join("\n")),
                      this
                    );
                  },
                },
                {
                  key: "cycles",
                  value: function (e) {
                    return (this.config.cpu.options.cycles.value = e), this;
                  },
                },
                {
                  key: "extract",
                  value: function (e, t, r) {
                    var n = 1 < arguments.length && void 0 !== t ? t : "/",
                      o = 2 < arguments.length && void 0 !== r ? r : "zip";
                    return this.extractAll([{ url: e, path: n, type: o }]);
                  },
                },
                {
                  key: "extractAll",
                  value: function (e) {
                    var t;
                    return (t = this.sources).push.apply(t, i(e)), this;
                  },
                },
                {
                  key: "toUint8Array",
                  value:
                    ((a = regeneratorRuntime.mark(function e() {
                      var t,
                        r,
                        n,
                        o,
                        i,
                        s,
                        a,
                        u,
                        c,
                        l,
                        f,
                        d,
                        p,
                        h = this,
                        m = arguments;
                      return regeneratorRuntime.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (t = 0 < m.length && void 0 !== m[0] && m[0]),
                                  (r = {}),
                                  (e.next = 4),
                                  this.libzipWasm.instantiate(r)
                                );
                              case 4:
                                return (
                                  (n = new _.default(r, "/home/web_user")),
                                  (e.next = 7),
                                  y.toDosboxConf(this.config)
                                );
                              case 7:
                                (o = e.sent), (i = []), (s = v(this.sources));
                                try {
                                  for (
                                    u = function () {
                                      var t = a.value;
                                      if ("zip" !== t.type)
                                        throw new Error(
                                          "Only Zip is supported"
                                        );
                                      var e = g
                                        .HTTPRequest(t.url, {
                                          cache: h.cache,
                                          responseType: "arraybuffer",
                                        })
                                        .then(function (e) {
                                          return {
                                            source: t,
                                            data: new Uint8Array(e),
                                          };
                                        });
                                      i.push(e);
                                    },
                                      s.s();
                                    !(a = s.n()).done;

                                  )
                                    u();
                                } catch (e) {
                                  s.e(e);
                                } finally {
                                  s.f();
                                }
                                if (t) {
                                  e.next = 18;
                                  break;
                                }
                                return (
                                  (e.next = 14),
                                  n.writeFile(".jsdos/dosbox.conf", o)
                                );
                              case 14:
                                return (
                                  (e.next = 16),
                                  n.writeFile(".jsdos/readme.txt", b)
                                );
                              case 16:
                                return (
                                  (e.next = 18),
                                  n.writeFile(
                                    ".jsdos/jsdos.json",
                                    JSON.stringify(this.config, null, 2)
                                  )
                                );
                              case 18:
                                return (e.next = 20), Promise.all(i);
                              case 20:
                                (c = e.sent), (l = v(c));
                                try {
                                  for (l.s(); !(f = l.n()).done; )
                                    (d = f.value),
                                      n.zipToFs(d.data, d.source.path);
                                } catch (e) {
                                  l.e(e);
                                } finally {
                                  l.f();
                                }
                                if (t)
                                  return (
                                    (e.next = 26),
                                    n.writeFile(".jsdos/dosbox.conf", o)
                                  );
                                e.next = 30;
                                break;
                              case 26:
                                return (
                                  (e.next = 28),
                                  n.writeFile(".jsdos/readme.txt", b)
                                );
                              case 28:
                                return (
                                  (e.next = 30),
                                  n.writeFile(
                                    ".jsdos/jsdos.json",
                                    JSON.stringify(this.config, null, 2)
                                  )
                                );
                              case 30:
                                return (e.next = 32), n.zipFromFs();
                              case 32:
                                return (
                                  (p = e.sent),
                                  n.destroy(),
                                  e.abrupt("return", p)
                                );
                              case 35:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })),
                    (o = function () {
                      var e = this,
                        s = arguments;
                      return new Promise(function (t, r) {
                        var n = a.apply(e, s);
                        function o(e) {
                          u(n, t, r, o, i, "next", e);
                        }
                        function i(e) {
                          u(n, t, r, o, i, "throw", e);
                        }
                        o(void 0);
                      });
                    }),
                    function () {
                      return o.apply(this, arguments);
                    }),
                },
              ]) && s(e.prototype, t),
              n && s(e, n),
              r
            );
          })();
        r.default = c;
        var b =
          "\nPlease visit our website:\n\n        _                __\n       (_)____      ____/ /___  _____ _________  ____ ___\n      / / ___/_____/ __  / __ \\/ ___// ___/ __ \\/ __ `__ \\\n     / (__  )_____/ /_/ / /_/ (__  )/ /__/ /_/ / / / / / /\n  __/ /____/      \\__,_/\\____/____(_)___/\\____/_/ /_/ /_/\n /___/\n";
      },
      {
        "../../http": 136,
        "../../libzip/libzip": 141,
        "./dos-conf": 132,
        "core-js/modules/es6.array.from": 102,
        "core-js/modules/es6.array.iterator": 103,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "core-js/modules/es6.regexp.to-string": 119,
        "core-js/modules/es6.string.iterator": 120,
        "core-js/modules/es6.symbol": 122,
        "core-js/modules/es6.typed.uint8-array": 123,
        "core-js/modules/es7.symbol.async-iterator": 126,
        "core-js/modules/web.dom.iterable": 127,
        "regenerator-runtime/runtime": 128,
      },
    ],
    132: [
      function (e, t, r) {
        "use strict";
        function n(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function c(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? n(Object(r), !0).forEach(function (e) {
                  o(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : n(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
          }
          return t;
        }
        function o(e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        function s(e) {
          if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
            if (
              Array.isArray(e) ||
              (e = (function (e, t) {
                if (!e) return;
                if ("string" == typeof e) return a(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r) return Array.from(e);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return a(e, t);
              })(e))
            ) {
              var t = 0,
                r = function () {};
              return {
                s: r,
                n: function () {
                  return t >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[t++] };
                },
                e: function (e) {
                  throw e;
                },
                f: r,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var n,
            o,
            i = !0,
            s = !1;
          return {
            s: function () {
              n = e[Symbol.iterator]();
            },
            n: function () {
              var e = n.next();
              return (i = e.done), e;
            },
            e: function (e) {
              (s = !0), (o = e);
            },
            f: function () {
              try {
                i || null == n.return || n.return();
              } finally {
                if (s) throw o;
              }
            },
          };
        }
        function a(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        function u(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        function i(a) {
          return function () {
            var e = this,
              s = arguments;
            return new Promise(function (t, r) {
              var n = a.apply(e, s);
              function o(e) {
                u(n, t, r, o, i, "next", e);
              }
              function i(e) {
                u(n, t, r, o, i, "throw", e);
              }
              o(void 0);
            });
          };
        }
        function h(e) {
          return (h =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        function l(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        e("core-js/modules/es7.object.get-own-property-descriptors"),
          e("core-js/modules/es6.string.iterator"),
          e("core-js/modules/es6.array.from"),
          e("core-js/modules/es6.regexp.to-string"),
          e("regenerator-runtime/runtime"),
          e("core-js/modules/es7.symbol.async-iterator"),
          e("core-js/modules/es6.symbol"),
          e("core-js/modules/es6.number.constructor"),
          e("core-js/modules/es6.number.parse-int"),
          e("core-js/modules/es6.string.starts-with"),
          e("core-js/modules/es6.array.find"),
          e("core-js/modules/web.dom.iterable"),
          e("core-js/modules/es6.array.iterator"),
          e("core-js/modules/es6.object.keys"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          e("core-js/modules/es6.function.name"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var f = function e() {
          l(this, e),
            (this.name = "sdl"),
            (this.description =
              "This section contains all of the low level system settings for how DOSBox interacts with your real hardware. You can define what resolutions are emulated, how DOSBox should treat errors or listen to your keyboard and mouse. You can often achieve a fair level of optimization by working with these setting, though for the most part leaving them at their default settings will create the best experience. These settings are passed on to the SDL Library which handles low level things like input and thread priority."),
            (this.options = {
              autolock: {
                name: "autolock",
                description:
                  "Mouse will automatically lock, if you click on the screen.",
                value: !1,
                allowedValues: [!0, !1],
              },
            });
        };
        r.OutputCategory = f;
        var d = function e() {
          l(this, e),
            (this.name = "dosbox"),
            (this.description =
              "The [dosbox] section contains various settings that do not pertain to any other section (e.g. setting the language used in DOSBox help texts, where to store screen captures, etc.)"),
            (this.options = {
              machine: {
                name: "machine",
                description: "The type of machine tries to emulate.",
                value: "svga_s3",
                allowedValues: [
                  "hercules",
                  "cga",
                  "tandy",
                  "pcjr",
                  "ega",
                  "vgaonly",
                  "svga_s3",
                  "svga_et3000",
                  "svga_et4000",
                  "svga_paradise",
                  "vesa_nolfb",
                  "vesa_oldvbe",
                ],
              },
            });
        };
        r.DosboxCategory = d;
        var p = function e() {
          l(this, e),
            (this.name = "cpu"),
            (this.description =
              "The CPU section controls how DOSBox tries to emulate the CPU, how fast the emulation should be, and to adjust it. DOSBox offers 4 different methods of CPU emulation."),
            (this.options = {
              core: {
                name: "core",
                description:
                  "CPU Core used in emulation. auto will switch to dynamic if available and appropriate.",
                value: "auto",
                allowedValues: ["auto", "normal", "simple"],
              },
              cputype: {
                name: "cputype",
                description:
                  "CPU Type used in emulation. auto is the fastest choice.",
                value: "auto",
                allowedValues: [
                  "auto",
                  "386",
                  "386_slow",
                  "486_slow",
                  "pentium_slow",
                  "386_prefetch",
                ],
              },
              cycles: {
                name: "cycles",
                description:
                  "Amount of instructions DOSBox tries to emulate each millisecond. Setting this value too high results in sound dropouts and lags.\nCycles can be set in 3 ways:\n'auto'          tries to guess what a game needs.\n                It usually works, but can fail for certain games.\n'fixed #number' will set a fixed amount of cycles. This is what you usually need if 'auto' fails.\n                (Example: fixed 4000).\n'max'           will allocate as much cycles as your computer is able to handle.\n",
                value: "auto",
                allowedValues: ["auto", "fixed", "max"],
              },
            });
        };
        r.CpuCategory = p;
        var m = function e() {
          l(this, e),
            (this.name = "mixer"),
            (this.description =
              "Here you can define the quality of emulated audio."),
            (this.options = {
              rate: {
                name: "rate",
                description: "Frequency rate of sound",
                value: 44100,
                allowedValues: [],
              },
              nosound: {
                name: "nosound",
                description:
                  "Enable silent mode, sound is still emulated though.",
                value: !1,
                allowedValues: [!0, !1],
              },
            });
        };
        r.MixerCategory = m;
        var v = function e() {
          l(this, e),
            (this.name = "autoexec"),
            (this.description = "Lines in this section will be run at startup"),
            (this.options = {
              script: {
                name: "lines",
                description: "Use \\n to separate lines",
                value: "",
                allowedValues: [],
              },
            });
        };
        function y() {
          return {
            output: new f(),
            dosbox: new d(),
            cpu: new p(),
            mixer: new m(),
            autoexec: new v(),
          };
        }
        function _(f, d) {
          var p = "sdl" === d.name ? "output" : d.name;
          return new Promise(function (e, n) {
            if (f)
              if (f.name === d.name) {
                for (var t = 0, r = Object.keys(f.options); t < r.length; t++) {
                  var o = r[t],
                    i = f.options[o],
                    s = d.options[o];
                  if (void 0 === s)
                    return void n(
                      new Error(
                        "Unknown option '" +
                          (i.name || o) +
                          "' in '" +
                          f.name +
                          "'"
                      )
                    );
                  if (0 < s.allowedValues.length) {
                    var a = (function () {
                      var t = i.value,
                        e = s.allowedValues.find(function (e) {
                          return e === t;
                        });
                      if (
                        "cpu" === p &&
                        "cycles" === i.name &&
                        (t + "").startsWith("fixed ")
                      ) {
                        var r = Number.parseInt(t.substr("fixed ".length), 10);
                        if (isNaN(r))
                          return (
                            n(new Error("Fixed value should conatain number")),
                            { v: void 0 }
                          );
                      } else if (void 0 === e)
                        return (
                          n(
                            new Error(
                              "Incorrect value '" +
                                t +
                                "' for '" +
                                f.name +
                                "." +
                                (i.name || o) +
                                "' allowed is " +
                                JSON.stringify(s.allowedValues)
                            )
                          ),
                          { v: void 0 }
                        );
                    })();
                    if ("object" === h(a)) return a.v;
                  }
                }
                for (var u = 0, c = Object.keys(d.options); u < c.length; u++) {
                  var l = c[u];
                  if (!(l in f.options))
                    return void n(
                      new Error("Option '" + l + "' is missed in '" + p + "'")
                    );
                }
                e();
              } else
                n(
                  new Error(
                    "Incorrect category name '" +
                      f.name +
                      "' should be '" +
                      d.name +
                      "'"
                  )
                );
            else {
              d.name;
              n(new Error("Category '" + p + "' is missed"));
            }
          });
        }
        function g() {
          return b.apply(this, arguments);
        }
        function b() {
          return (b = i(
            regeneratorRuntime.mark(function e(t) {
              var r, n, o, i;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (r = y()), (n = 0), (o = Object.keys(r));
                    case 2:
                      if (n < o.length)
                        return (i = o[n]), (e.next = 6), _(t[i], r[i]);
                      e.next = 9;
                      break;
                    case 6:
                      n++, (e.next = 2);
                      break;
                    case 9:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        function w() {
          return j.apply(this, arguments);
        }
        function j() {
          return (j = i(
            regeneratorRuntime.mark(function e(t, r) {
              var n, o, i, s, a, u;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (void 0 === t) return e.abrupt("return");
                      e.next = 2;
                      break;
                    case 2:
                      (n = 0), (o = Object.keys(t.options || {}));
                    case 3:
                      if (!(n < o.length)) {
                        e.next = 16;
                        break;
                      }
                      if (
                        ((i = o[n]),
                        "string" != typeof (s = t.options[i]) &&
                          "number" != typeof s &&
                          !Array.isArray(s))
                      ) {
                        e.next = 13;
                        break;
                      }
                      if ((a = r.options[i])) {
                        e.next = 10;
                        break;
                      }
                      return e.abrupt("continue", 13);
                    case 10:
                      (u = s),
                        (t.options[i] = c({}, a)),
                        (t.options[i].value = u);
                    case 13:
                      n++, (e.next = 3);
                      break;
                    case 16:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        function x() {
          return k.apply(this, arguments);
        }
        function k() {
          return (k = i(
            regeneratorRuntime.mark(function e(t) {
              var r, n, o, i;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (r = y()), (n = 0), (o = Object.keys(r));
                    case 2:
                      if (n < o.length)
                        return (i = o[n]), (e.next = 6), w(t[i], r[i]);
                      e.next = 9;
                      break;
                    case 6:
                      n++, (e.next = 2);
                      break;
                    case 9:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        function S() {
          return (S = i(
            regeneratorRuntime.mark(function e(r) {
              var n;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), x(r);
                    case 2:
                      return (e.next = 4), g(r);
                    case 4:
                      return (
                        (n =
                          P(r.output) +
                          "\nfullscreen=false\nfulldouble=false\nfullresolution=original\nwindowresolution=original\noutput=surface\nsensitivity=100\nwaitonerror=true\npriority=higher,normal\nmapperfile=mapper-jsdos.map\nusescancodes=true\nvsync=false\n" +
                          P(r.dosbox) +
                          "\nlanguage=\ncaptures=capture\nmemsize=16\n" +
                          P(r.cpu) +
                          "\ncycleup=10\ncycledown=20\n" +
                          P(r.mixer) +
                          "\nblocksize=1024\nprebuffer=20\n\n[render]\n# frameskip: How many frames DOSBox skips before drawing one.\n#    aspect: Do aspect correction, if your output method doesn't support scaling this can slow things down!.\n#    scaler: Scaler used to enlarge/enhance low resolution modes.\n#              If 'forced' is appended, then the scaler will be used even if the result might not be desired.\n#            Possible values: none, normal2x, normal3x, advmame2x, advmame3x, advinterp2x, advinterp3x, hq2x, hq3x, 2xsai, super2xsai, supereagle, tv2x, tv3x, rgb2x, rgb3x, scan2x, scan3x.\n\nframeskip=0\naspect=false\nscaler=none\n\n[midi]\n#     mpu401: Type of MPU-401 to emulate.\n#             Possible values: intelligent, uart, none.\n# mididevice: Device that will receive the MIDI data from MPU-401.\n#             Possible values: default, win32, alsa, oss, coreaudio, coremidi, none.\n# midiconfig: Special configuration options for the device driver. This is usually the id of the device you want to use.\n#               See the README/Manual for more details.\n\nmpu401=intelligent\nmididevice=default\nmidiconfig=\n\n[sblaster]\n#  sbtype: Type of Soundblaster to emulate. gb is Gameblaster.\n#          Possible values: sb1, sb2, sbpro1, sbpro2, sb16, gb, none.\n#  sbbase: The IO address of the soundblaster.\n#          Possible values: 220, 240, 260, 280, 2a0, 2c0, 2e0, 300.\n#     irq: The IRQ number of the soundblaster.\n#          Possible values: 7, 5, 3, 9, 10, 11, 12.\n#     dma: The DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n#    hdma: The High DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n# sbmixer: Allow the soundblaster mixer to modify the DOSBox mixer.\n# oplmode: Type of OPL emulation. On 'auto' the mode is determined by sblaster type. All OPL modes are Adlib-compatible, except for 'cms'.\n#          Possible values: auto, cms, opl2, dualopl2, opl3, none.\n#  oplemu: Provider for the OPL emulation. compat might provide better quality (see oplrate as well).\n#          Possible values: default, compat, fast.\n# oplrate: Sample rate of OPL music emulation. Use 49716 for highest quality (set the mixer rate accordingly).\n#          Possible values: 44100, 49716, 48000, 32000, 22050, 16000, 11025, 8000.\n\nsbtype=sb16\nsbbase=220\nirq=7\ndma=1\nhdma=5\nsbmixer=true\noplmode=auto\noplemu=default\noplrate=44100\n\n[gus]\n#      gus: Enable the Gravis Ultrasound emulation.\n#  gusrate: Sample rate of Ultrasound emulation.\n#           Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#  gusbase: The IO base address of the Gravis Ultrasound.\n#           Possible values: 240, 220, 260, 280, 2a0, 2c0, 2e0, 300.\n#   gusirq: The IRQ number of the Gravis Ultrasound.\n#           Possible values: 5, 3, 7, 9, 10, 11, 12.\n#   gusdma: The DMA channel of the Gravis Ultrasound.\n#           Possible values: 3, 0, 1, 5, 6, 7.\n# ultradir: Path to Ultrasound directory. In this directory\n#           there should be a MIDI directory that contains\n#           the patch files for GUS playback. Patch sets used\n#           with Timidity should work fine.\n\ngus=false\ngusrate=44100\ngusbase=240\ngusirq=5\ngusdma=3\nultradir=C:ULTRASND\n\n[speaker]\n# pcspeaker: Enable PC-Speaker emulation.\n#    pcrate: Sample rate of the PC-Speaker sound generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#     tandy: Enable Tandy Sound System emulation. For 'auto', emulation is present only if machine is set to 'tandy'.\n#            Possible values: auto, on, off.\n# tandyrate: Sample rate of the Tandy 3-Voice generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#    disney: Enable Disney Sound Source emulation. (Covox Voice Master and Speech Thing compatible).\n\npcspeaker=true\npcrate=44100\ntandy=auto\ntandyrate=44100\ndisney=true\n\n[joystick]\n# joysticktype: Type of joystick to emulate: auto (default), none,\n#               2axis (supports two joysticks),\n#               4axis (supports one joystick, first joystick used),\n#               4axis_2 (supports one joystick, second joystick used),\n#               fcs (Thrustmaster), ch (CH Flightstick).\n#               none disables joystick emulation.\n#               auto chooses emulation depending on real joystick(s).\n#               (Remember to reset dosbox's mapperfile if you saved it earlier)\n#               Possible values: auto, 2axis, 4axis, 4axis_2, fcs, ch, none.\n#        timed: enable timed intervals for axis. Experiment with this option, if your joystick drifts (away).\n#     autofire: continuously fires as long as you keep the button pressed.\n#       swap34: swap the 3rd and the 4th axis. can be useful for certain joysticks.\n#   buttonwrap: enable button wrapping at the number of emulated buttons.\n\njoysticktype=auto\ntimed=true\nautofire=false\nswap34=false\nbuttonwrap=false\n\n[serial]\n# serial1: set type of device connected to com port.\n#          Can be disabled, dummy, modem, nullmodem, directserial.\n#          Additional parameters must be in the same line in the form of\n#          parameter:value. Parameter for all types is irq (optional).\n#          for directserial: realport (required), rxdelay (optional).\n#                           (realport:COM1 realport:ttyS0).\n#          for modem: listenport (optional).\n#          for nullmodem: server, rxdelay, txdelay, telnet, usedtr,\n#                         transparent, port, inhsocket (all optional).\n#          Example: serial1=modem listenport:5000\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial2: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial3: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial4: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n\nserial1=dummy\nserial2=dummy\nserial3=disabled\nserial4=disabled\n\n[dos]\n#            xms: Enable XMS support.\n#            ems: Enable EMS support.\n#            umb: Enable UMB support.\n# keyboardlayout: Language code of the keyboard layout (or none).\n\nxms=true\nems=true\numb=true\nkeyboardlayout=auto\n\n[ipx]\n# ipx: Enable ipx over UDP/IP emulation.\n\nipx=false\n" +
                          ((t = r.autoexec),
                          "[autoexec]\necho off\nmount c .\nc:\n\ntype jsdos~1/readme.txt\necho on\n\n".concat(
                            t.options.script.value,
                            "\n\n# Generated using https://js-dos.com\n# █▀▀▀▀▀█ █  ▄▄▄▀▀█ █▀▀▀▀▀█\n# █ ███ █ ██▄ █ ▀ ▄ █ ███ █\n# █ ▀▀▀ █ ▄██ ▀ ▀▀█ █ ▀▀▀ █\n# ▀▀▀▀▀▀▀ ▀ █▄▀▄▀ █ ▀▀▀▀▀▀▀\n# █▀▄▄█▀▀▄▄ ▀ ▀█▄▄▄▄ ▀▄█▀█▀\n# █▀ ▀ ▀▀▄ █▀ ▄ ▄▀▀▀▄ █▀█▄\n# ▄ ▄▄ █▀▀▄ ▄▀▄▀▀█  ▀▀▄▀▀█▀\n#   ▄▀▀█▀▀ █▀█▀█▀▀▄ ▀██▀█▄\n# ▀▀▀ ▀ ▀ █▄█ ▀█▄▄█▀▀▀█▀▀\n# █▀▀▀▀▀█ ▄▄▄ ▄ ▄ █ ▀ █▄▄▄▄\n# █ ███ █ ▀█▀▀▄▀▀▄████▀▀█▄█\n# █ ▀▀▀ █ ▄▀▀█▀█▀▄ ▀▀▄▄█▄█\n# ▀▀▀▀▀▀▀ ▀   ▀▀ ▀  ▀   ▀▀▀\n"
                          ))),
                        e.abrupt("return", Promise.resolve(n))
                      );
                    case 6:
                    case "end":
                      return e.stop();
                  }
                var t;
              }, e);
            })
          )).apply(this, arguments);
        }
        function P(e) {
          var t = "";
          t += "[".concat(e.name, "]\n");
          var r,
            n = s(Object.keys(e.options).sort());
          try {
            for (n.s(); !(r = n.n()).done; ) {
              var o = r.value,
                i = e.options[o];
              t += "".concat(i.name, "=").concat(i.value, "\n");
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
          return t;
        }
        (r.AutoexecCategory = v),
          (r.createDosConfig = y),
          (r.toDosboxConf = function (e) {
            return S.apply(this, arguments);
          });
      },
      {
        "core-js/modules/es6.array.find": 101,
        "core-js/modules/es6.array.from": 102,
        "core-js/modules/es6.array.iterator": 103,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.number.constructor": 109,
        "core-js/modules/es6.number.parse-int": 110,
        "core-js/modules/es6.object.keys": 111,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "core-js/modules/es6.regexp.to-string": 119,
        "core-js/modules/es6.string.iterator": 120,
        "core-js/modules/es6.string.starts-with": 121,
        "core-js/modules/es6.symbol": 122,
        "core-js/modules/es7.object.get-own-property-descriptors": 125,
        "core-js/modules/es7.symbol.async-iterator": 126,
        "core-js/modules/web.dom.iterable": 127,
        "regenerator-runtime/runtime": 128,
      },
    ],
    133: [
      function (e, t, r) {
        "use strict";
        function u(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        e("core-js/modules/es6.function.name"),
          e("regenerator-runtime/runtime"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var l = e("../../../protocol/messages-queue");
        function n() {
          var a;
          return (
            (a = regeneratorRuntime.mark(function e(t, r) {
              var n, o, i, s, a, u, c;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (n = new l.MessagesQueue()),
                        (o = n.handler.bind(n)),
                        (i = ""),
                        (a = {
                          err: (s = function () {
                            for (
                              var e,
                                t = arguments.length,
                                r = new Array(t),
                                n = 0;
                              n < t;
                              n++
                            )
                              r[n] = arguments[n];
                            (e = console).error.apply(e, r),
                              (i += JSON.stringify(r) + "\n");
                          }),
                          printErr: s,
                          postMessage: function (e, t) {
                            o(e, t);
                          },
                        }),
                        (u = function (e) {
                          var t = e.data;
                          "ws-sync-sleep" === (null == t ? void 0 : t.name) &&
                            t.props.sessionId === r &&
                            postMessage(
                              { name: "wc-sync-sleep", props: t.props },
                              "*"
                            );
                        }),
                        (c = {
                          sessionId: r,
                          sendMessageToServer: function (e, t) {
                            a.messageHandler({ data: { name: e, props: t } });
                          },
                          initMessageHandler: function (e) {
                            (o = e), n.sendTo(o);
                          },
                          exit: function () {
                            "undefined" != typeof window &&
                              window.removeEventListener("message", u);
                          },
                        }),
                        "undefined" != typeof window &&
                          window.addEventListener("message", u, {
                            passive: !0,
                          }),
                        (e.next = 11),
                        t.instantiate(a)
                      );
                    case 11:
                      if (0 < i.length)
                        throw (
                          (c.sendMessageToServer("wc-exit", {}), new Error(i))
                        );
                      e.next = 14;
                      break;
                    case 14:
                      return (
                        (a.err = console.error),
                        (a.printErr = console.error),
                        a.callMain([r]),
                        e.abrupt("return", c)
                      );
                    case 18:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })),
            (n = function () {
              var e = this,
                s = arguments;
              return new Promise(function (t, r) {
                var n = a.apply(e, s);
                function o(e) {
                  u(n, t, r, o, i, "next", e);
                }
                function i(e) {
                  u(n, t, r, o, i, "throw", e);
                }
                o(void 0);
              });
            }).apply(this, arguments)
          );
        }
        r.dosDirect = function (e, t) {
          return n.apply(this, arguments);
        };
      },
      {
        "../../../protocol/messages-queue": 142,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "regenerator-runtime/runtime": 128,
      },
    ],
    134: [
      function (e, t, r) {
        "use strict";
        function u(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        e("core-js/modules/es6.function.name"),
          e("regenerator-runtime/runtime"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var c = e("../../../protocol/messages-queue");
        function n() {
          var a;
          return (
            (a = regeneratorRuntime.mark(function e(t, r, n) {
              var o, i, s, a;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (o = new c.MessagesQueue()),
                        (i = o.handler.bind(o)),
                        ((s = new Worker(t)).onerror = function (e) {
                          i("ws-err", {
                            type: e.type,
                            filename: e.filename,
                            message: e.message,
                          });
                        }),
                        (s.onmessage = function (e) {
                          var t = e.data;
                          void 0 !== (null == t ? void 0 : t.name) &&
                            i(t.name, t.props);
                        }),
                        (e.next = 7),
                        r.instantiate({})
                      );
                    case 7:
                      a = {
                        sessionId: n,
                        sendMessageToServer: function (e, t) {
                          s.postMessage({ name: e, props: t });
                        },
                        initMessageHandler: function (e) {
                          (i = e), o.sendTo(i);
                        },
                        exit: function () {
                          s.terminate();
                        },
                      };
                      try {
                        a.sendMessageToServer("wc-install", {
                          module: r.wasmModule,
                          sessionId: n,
                        });
                      } catch (e) {
                        a.sendMessageToServer("wc-install", { sessionId: n });
                      }
                      return e.abrupt("return", a);
                    case 10:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })),
            (n = function () {
              var e = this,
                s = arguments;
              return new Promise(function (t, r) {
                var n = a.apply(e, s);
                function o(e) {
                  u(n, t, r, o, i, "next", e);
                }
                function i(e) {
                  u(n, t, r, o, i, "throw", e);
                }
                o(void 0);
              });
            }).apply(this, arguments)
          );
        }
        r.dosWorker = function (e, t, r) {
          return n.apply(this, arguments);
        };
      },
      {
        "../../../protocol/messages-queue": 142,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "regenerator-runtime/runtime": 128,
      },
    ],
    135: [
      function (n, e, o) {
        (function (e) {
          "use strict";
          var t = function (e) {
            return e && e.__esModule ? e : { default: e };
          };
          Object.defineProperty(o, "__esModule", { value: !0 });
          var r = t(n("./impl/emulators-impl"));
          "undefined" != typeof window && (window.emulators = r.default),
            void 0 !== e && (e.emulators = r.default);
        }).call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        );
      },
      { "./impl/emulators-impl": 138 },
    ],
    136: [
      function (e, t, r) {
        "use strict";
        function o(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        function n(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function i(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? n(Object(r), !0).forEach(function (e) {
                  s(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : n(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
          }
          return t;
        }
        function s(e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        e("core-js/modules/es7.object.get-own-property-descriptors"),
          e("core-js/modules/es6.symbol"),
          e("core-js/modules/web.dom.iterable"),
          e("core-js/modules/es6.array.iterator"),
          e("core-js/modules/es6.object.keys"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var a = e("./cache");
        r.HTTPRequest = function (r, n) {
          return new Promise(function (e, t) {
            new u(
              r,
              i(
                i({}, n),
                {},
                {
                  success: e,
                  fail: function (e) {
                    t(new Error(e));
                  },
                }
              )
            );
          });
        };
        var u = (function () {
          function n(e, t) {
            var r = this;
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, n),
              (this.xhr = null),
              (this.total = 0),
              (this.loaded = 0),
              (this.resource = e),
              (this.options = t),
              (this.options.method = t.method || "GET"),
              (this.cache = t.cache || new a.CacheNoop()),
              "GET" === this.options.method &&
                this.cache
                  .get(this.resource)
                  .then(function (e) {
                    void 0 !== r.options.success && r.options.success(e);
                  })
                  .catch(function () {
                    r.makeHttpRequest();
                  });
          }
          var e, t, r;
          return (
            (e = n),
            (t = [
              {
                key: "makeHttpRequest",
                value: function () {
                  var e,
                    t,
                    r = this;
                  (this.xhr = new XMLHttpRequest()),
                    this.xhr.open(
                      this.options.method || "GET",
                      this.resource,
                      !0
                    ),
                    "POST" === this.options.method &&
                      this.xhr.setRequestHeader(
                        "Content-type",
                        "application/x-www-form-urlencoded"
                      ),
                    this.xhr.overrideMimeType(
                      "text/plain; charset=x-user-defined"
                    ),
                    "function" == typeof (e = this.xhr).addEventListener &&
                      e.addEventListener("progress", function (e) {
                        if (
                          ((r.total = e.total),
                          (r.loaded = e.loaded),
                          r.options.progress)
                        )
                          return r.options.progress(e.total, e.loaded);
                      }),
                    "function" == typeof (t = this.xhr).addEventListener &&
                      t.addEventListener("error", function (e) {
                        if (r.options.fail)
                          return (
                            r.options.fail(
                              "Unalbe to download '" +
                                r.resource +
                                "', code: " +
                                r.xhr.status
                            ),
                            delete r.options.fail
                          );
                      }),
                    (this.xhr.onreadystatechange = function () {
                      return r.onReadyStateChange();
                    }),
                    this.options.responseType &&
                      (this.xhr.responseType = this.options.responseType),
                    this.xhr.send(this.options.data);
                },
              },
              {
                key: "onReadyStateChange",
                value: function () {
                  var e = this.xhr;
                  if (4 === e.readyState)
                    if (200 === e.status) {
                      if (this.options.success) {
                        var t = Math.max(this.total, this.loaded);
                        return (
                          void 0 !== this.options.progress &&
                            this.options.progress(t, t),
                          "GET" === this.options.method &&
                            this.resource.indexOf("?") < 0 &&
                            this.cache.put(this.resource, e.response),
                          this.options.success(e.response)
                        );
                      }
                    } else if (this.options.fail)
                      return (
                        this.options.fail(
                          "Unable to download '" +
                            this.resource +
                            "', code: " +
                            e.status
                        ),
                        delete this.options.fail
                      );
                },
              },
            ]) && o(e.prototype, t),
            r && o(e, r),
            n
          );
        })();
      },
      {
        "./cache": 130,
        "core-js/modules/es6.array.iterator": 103,
        "core-js/modules/es6.object.keys": 111,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "core-js/modules/es6.symbol": 122,
        "core-js/modules/es7.object.get-own-property-descriptors": 125,
        "core-js/modules/web.dom.iterable": 127,
      },
    ],
    137: [
      function (e, t, r) {
        "use strict";
        function a(e) {
          if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
            if (
              Array.isArray(e) ||
              (e = (function (e, t) {
                if (!e) return;
                if ("string" == typeof e) return u(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r) return Array.from(e);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return u(e, t);
              })(e))
            ) {
              var t = 0,
                r = function () {};
              return {
                s: r,
                n: function () {
                  return t >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[t++] };
                },
                e: function (e) {
                  throw e;
                },
                f: r,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var n,
            o,
            i = !0,
            s = !1;
          return {
            s: function () {
              n = e[Symbol.iterator]();
            },
            n: function () {
              var e = n.next();
              return (i = e.done), e;
            },
            e: function (e) {
              (s = !0), (o = e);
            },
            f: function () {
              try {
                i || null == n.return || n.return();
              } finally {
                if (s) throw o;
              }
            },
          };
        }
        function u(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        e("core-js/modules/web.dom.iterable"),
          e("core-js/modules/es7.symbol.async-iterator"),
          e("core-js/modules/es6.symbol"),
          e("core-js/modules/es6.string.iterator"),
          e("core-js/modules/es6.array.from"),
          e("core-js/modules/es6.function.name"),
          e("core-js/modules/es6.regexp.to-string"),
          e("core-js/modules/es6.object.to-string"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        r.CommandInterfaceEventsImpl = function e() {
          var s = this;
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.delayedStdout = []),
            (this.onStdoutConsumers = []),
            (this.onFrameSizeConsumers = []),
            (this.onFrameConsumers = []),
            (this.onSoundPushConsumers = []),
            (this.onExitConsumers = []),
            (this.onMessageConsumers = []),
            (this.onStdout = function (e) {
              if (
                (s.onStdoutConsumers.push(e), 1 === s.onStdoutConsumers.length)
              ) {
                var t,
                  r = a(s.delayedStdout);
                try {
                  for (r.s(); !(t = r.n()).done; ) {
                    var n = t.value;
                    s.fireStdout(n);
                  }
                } catch (e) {
                  r.e(e);
                } finally {
                  r.f();
                }
                s.delayedStdout = [];
              }
            }),
            (this.onFrameSize = function (e) {
              s.onFrameSizeConsumers.push(e);
            }),
            (this.onFrame = function (e) {
              s.onFrameConsumers.push(e);
            }),
            (this.onSoundPush = function (e) {
              s.onSoundPushConsumers.push(e);
            }),
            (this.onExit = function (e) {
              s.onExitConsumers.push(e);
            }),
            (this.onMessage = function (e) {
              s.onMessageConsumers.push(e);
            }),
            (this.fireStdout = function (e) {
              if (0 !== s.onStdoutConsumers.length) {
                var t,
                  r = a(s.onStdoutConsumers);
                try {
                  for (r.s(); !(t = r.n()).done; ) {
                    (0, t.value)(e);
                  }
                } catch (e) {
                  r.e(e);
                } finally {
                  r.f();
                }
              } else s.delayedStdout.push(e);
            }),
            (this.fireFrameSize = function (e, t) {
              var r,
                n = a(s.onFrameSizeConsumers);
              try {
                for (n.s(); !(r = n.n()).done; ) {
                  (0, r.value)(e, t);
                }
              } catch (e) {
                n.e(e);
              } finally {
                n.f();
              }
            }),
            (this.fireFrame = function (e) {
              var t,
                r = a(s.onFrameConsumers);
              try {
                for (r.s(); !(t = r.n()).done; ) {
                  (0, t.value)(e);
                }
              } catch (e) {
                r.e(e);
              } finally {
                r.f();
              }
            }),
            (this.fireSoundPush = function (e) {
              var t,
                r = a(s.onSoundPushConsumers);
              try {
                for (r.s(); !(t = r.n()).done; ) {
                  (0, t.value)(e);
                }
              } catch (e) {
                r.e(e);
              } finally {
                r.f();
              }
            }),
            (this.fireExit = function () {
              var e,
                t = a(s.onExitConsumers);
              try {
                for (t.s(); !(e = t.n()).done; ) {
                  (0, e.value)();
                }
              } catch (e) {
                t.e(e);
              } finally {
                t.f();
              }
              (s.onStdoutConsumers = []),
                (s.onFrameSizeConsumers = []),
                (s.onFrameConsumers = []),
                (s.onSoundPushConsumers = []),
                (s.onExitConsumers = []),
                (s.onMessageConsumers = []);
            }),
            (this.fireMessage = function (e) {
              for (
                var t = arguments.length,
                  r = new Array(1 < t ? t - 1 : 0),
                  n = 1;
                n < t;
                n++
              )
                r[n - 1] = arguments[n];
              var o,
                i = a(s.onMessageConsumers);
              try {
                for (i.s(); !(o = i.n()).done; ) {
                  o.value.apply(void 0, [e].concat(r));
                }
              } catch (e) {
                i.e(e);
              } finally {
                i.f();
              }
            });
        };
      },
      {
        "core-js/modules/es6.array.from": 102,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.regexp.to-string": 119,
        "core-js/modules/es6.string.iterator": 120,
        "core-js/modules/es6.symbol": 122,
        "core-js/modules/es7.symbol.async-iterator": 126,
        "core-js/modules/web.dom.iterable": 127,
      },
    ],
    138: [
      function (e, t, r) {
        "use strict";
        function u(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        function d(a) {
          return function () {
            var e = this,
              s = arguments;
            return new Promise(function (t, r) {
              var n = a.apply(e, s);
              function o(e) {
                u(n, t, r, o, i, "next", e);
              }
              function i(e) {
                u(n, t, r, o, i, "throw", e);
              }
              o(void 0);
            });
          };
        }
        function p(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          e("regenerator-runtime/runtime");
        var n = function (e) {
          return e && e.__esModule ? e : { default: e };
        };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var h = e("../build"),
          m = e("../cache"),
          v = e("./modules"),
          y = n(e("../dos/bundle/dos-bundle")),
          _ = e("../dos/dosbox/ts/direct"),
          g = e("../dos/dosbox/ts/worker"),
          b = n(e("../janus/janus-impl")),
          w = e("../protocol/protocol"),
          o = new ((function () {
            function e() {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.pathPrefix = ""),
                (this.cacheSeed = ""),
                (this.cachePromises = {});
            }
            var t, r, n, o, i, s, a, u, c, l, f;
            return (
              (t = e),
              (r = [
                {
                  key: "cache",
                  value: function (e) {
                    if (
                      ((null != e && 0 !== e.length) ||
                        (e = h.Build.version + " " + this.cacheSeed),
                      void 0 === this.cachePromises[e])
                    ) {
                      var t = m.CacheDb(e, { onErr: console.error });
                      this.cachePromises[e] = t;
                    }
                    return this.cachePromises[e];
                  },
                },
                {
                  key: "dosBundle",
                  value:
                    ((f = d(
                      regeneratorRuntime.mark(function e() {
                        var t, r, n;
                        return regeneratorRuntime.wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), this.wasmModules();
                                case 2:
                                  return (t = e.sent), (e.next = 5), t.libzip();
                                case 5:
                                  return (
                                    (r = e.sent), (e.next = 8), this.cache()
                                  );
                                case 8:
                                  return (
                                    (n = e.sent),
                                    e.abrupt("return", new y.default(r, n))
                                  );
                                case 10:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function () {
                      return f.apply(this, arguments);
                    }),
                },
                {
                  key: "dosboxNode",
                  value:
                    ((l = d(
                      regeneratorRuntime.mark(function e(t) {
                        return regeneratorRuntime.wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return e.abrupt(
                                    "return",
                                    this.dosboxDirect(t)
                                  );
                                case 1:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e) {
                      return l.apply(this, arguments);
                    }),
                },
                {
                  key: "dosboxDirect",
                  value:
                    ((c = d(
                      regeneratorRuntime.mark(function e(t) {
                        var r, n, o;
                        return regeneratorRuntime.wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), this.wasmModules();
                                case 2:
                                  return (r = e.sent), (e.next = 5), r.dosbox();
                                case 5:
                                  return (
                                    (n = e.sent),
                                    (e.next = 8),
                                    _.dosDirect(n, "session-" + Date.now())
                                  );
                                case 8:
                                  return (
                                    (o = e.sent),
                                    e.abrupt("return", this.backend(t, o))
                                  );
                                case 10:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e) {
                      return c.apply(this, arguments);
                    }),
                },
                {
                  key: "dosboxWorker",
                  value:
                    ((u = d(
                      regeneratorRuntime.mark(function e(t) {
                        var r, n, o;
                        return regeneratorRuntime.wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), this.wasmModules();
                                case 2:
                                  return (r = e.sent), (e.next = 5), r.dosbox();
                                case 5:
                                  return (
                                    (n = e.sent),
                                    (e.next = 8),
                                    g.dosWorker(
                                      this.pathPrefix + "wdosbox.js",
                                      n,
                                      "session-" + Date.now()
                                    )
                                  );
                                case 8:
                                  return (
                                    (o = e.sent),
                                    e.abrupt("return", this.backend(t, o))
                                  );
                                case 10:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e) {
                      return u.apply(this, arguments);
                    }),
                },
                {
                  key: "janus",
                  value:
                    ((a = d(
                      regeneratorRuntime.mark(function e(t) {
                        return regeneratorRuntime.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt("return", b.default(t));
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    )),
                    function (e) {
                      return a.apply(this, arguments);
                    }),
                },
                {
                  key: "backend",
                  value:
                    ((s = d(
                      regeneratorRuntime.mark(function e(o, i) {
                        return regeneratorRuntime.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt(
                                  "return",
                                  new Promise(function (t, r) {
                                    var n =
                                      new w.CommandInterfaceOverTransportLayer(
                                        Array.isArray(o) ? o : [o],
                                        i,
                                        function (e) {
                                          null !== e
                                            ? r(e)
                                            : setTimeout(function () {
                                                return t(n);
                                              }, 4);
                                        }
                                      );
                                  })
                                );
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    )),
                    function (e, t) {
                      return s.apply(this, arguments);
                    }),
                },
                {
                  key: "wasmModules",
                  value: function () {
                    var r = this;
                    if (void 0 !== this.wasmModulesPromise)
                      return this.wasmModulesPromise;
                    var e = (function () {
                      var e = d(
                        regeneratorRuntime.mark(function e() {
                          var t;
                          return regeneratorRuntime.wrap(function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), r.cache();
                                case 2:
                                  return (
                                    (t = e.sent),
                                    e.abrupt(
                                      "return",
                                      new v.WasmModulesImpl(r.pathPrefix, t)
                                    )
                                  );
                                case 4:
                                case "end":
                                  return e.stop();
                              }
                          }, e);
                        })
                      );
                      return function () {
                        return e.apply(this, arguments);
                      };
                    })();
                    return (
                      (this.wasmModulesPromise = e()), this.wasmModulesPromise
                    );
                  },
                },
                {
                  key: "dosDirect",
                  value:
                    ((i = d(
                      regeneratorRuntime.mark(function e(t) {
                        return regeneratorRuntime.wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return e.abrupt(
                                    "return",
                                    this.dosboxDirect(t)
                                  );
                                case 1:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e) {
                      return i.apply(this, arguments);
                    }),
                },
                {
                  key: "dosWorker",
                  value:
                    ((o = d(
                      regeneratorRuntime.mark(function e(t) {
                        return regeneratorRuntime.wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return e.abrupt(
                                    "return",
                                    this.dosboxWorker(t)
                                  );
                                case 1:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e) {
                      return o.apply(this, arguments);
                    }),
                },
              ]) && p(t.prototype, r),
              n && p(t, n),
              e
            );
          })())();
        r.default = o;
      },
      {
        "../build": 129,
        "../cache": 130,
        "../dos/bundle/dos-bundle": 131,
        "../dos/dosbox/ts/direct": 133,
        "../dos/dosbox/ts/worker": 134,
        "../janus/janus-impl": 140,
        "../protocol/protocol": 143,
        "./modules": 139,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "regenerator-runtime/runtime": 128,
      },
    ],
    139: [
      function (o, e, y) {
        "use strict";
        function _(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              if (
                "undefined" == typeof Symbol ||
                !(Symbol.iterator in Object(e))
              )
                return;
              var r = [],
                n = !0,
                o = !1,
                i = void 0;
              try {
                for (
                  var s, a = e[Symbol.iterator]();
                  !(n = (s = a.next()).done) &&
                  (r.push(s.value), !t || r.length !== t);
                  n = !0
                );
              } catch (e) {
                (o = !0), (i = e);
              } finally {
                try {
                  n || null == a.return || a.return();
                } finally {
                  if (o) throw i;
                }
              }
              return r;
            })(e, t) ||
            (function (e, t) {
              if (!e) return;
              if ("string" == typeof e) return n(e, t);
              var r = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === r && e.constructor && (r = e.constructor.name);
              if ("Map" === r || "Set" === r) return Array.from(e);
              if (
                "Arguments" === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              )
                return n(e, t);
            })(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function n(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        function u(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        function i(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        function s(e, t, r) {
          return t && i(e.prototype, t), r && i(e, r), e;
        }
        function r(e) {
          return (r =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        function a(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        o("core-js/modules/es6.array.from"),
          o("core-js/modules/es6.function.name"),
          o("core-js/modules/es6.regexp.to-string"),
          o("core-js/modules/web.dom.iterable"),
          o("core-js/modules/es6.array.iterator"),
          o("core-js/modules/es6.string.iterator"),
          o("core-js/modules/es6.regexp.replace"),
          o("regenerator-runtime/runtime"),
          o("core-js/modules/es6.promise"),
          o("core-js/modules/es6.object.to-string"),
          o("core-js/modules/es7.symbol.async-iterator"),
          o("core-js/modules/es6.symbol"),
          o("core-js/modules/es6.math.trunc"),
          o("core-js/modules/es6.math.clz32"),
          o("core-js/modules/es6.math.fround"),
          o("core-js/modules/es6.math.imul"),
          o("core-js/modules/es6.typed.uint8-array"),
          Object.defineProperty(y, "__esModule", { value: !0 });
        var g = o("../http");
        y.host = new (function e() {
          if (
            (a(this, e),
            (this.wasmSupported = !1),
            (this.globals = "undefined" == typeof window ? {} : window),
            this.globals.exports || (this.globals.exports = {}),
            this.globals.compiled || (this.globals.compiled = {}),
            "object" ===
              ("undefined" == typeof WebAssembly
                ? "undefined"
                : r(WebAssembly)) &&
              "function" == typeof WebAssembly.instantiate &&
              "function" == typeof WebAssembly.compile)
          ) {
            var t = new WebAssembly.Module(
              Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0)
            );
            t instanceof WebAssembly.Module &&
              (this.wasmSupported =
                new WebAssembly.Instance(t) instanceof WebAssembly.Instance);
          }
          (Math.imul && -5 === Math.imul(4294967295, 5)) ||
            (Math.imul = function (e, t) {
              var r = 65535 & e,
                n = 65535 & t;
              return (r * n + (((e >>> 16) * n + r * (t >>> 16)) << 16)) | 0;
            }),
            (Math.imul = Math.imul),
            Math.fround ||
              (Math.fround = function (e) {
                return e;
              }),
            (Math.fround = Math.fround),
            Math.clz32 ||
              (Math.clz32 = function (e) {
                e >>>= 0;
                for (var t = 0; t < 32; t++) if (e & (1 << (31 - t))) return t;
                return 32;
              }),
            (Math.clz32 = Math.clz32),
            Math.trunc ||
              (Math.trunc = function (e) {
                return e < 0 ? Math.ceil(e) : Math.floor(e);
              }),
            (Math.trunc = Math.trunc);
        })();
        var t = (function () {
          function r(e, t) {
            a(this, r),
              (this.wasmSupported = !1),
              0 < e.length && "/" !== e[e.length - 1] && (e += "/"),
              (this.pathPrefix = e),
              (this.cache = t);
          }
          return (
            s(r, [
              {
                key: "libzip",
                value: function () {
                  return (
                    void 0 !== this.libzipPromise ||
                      (this.libzipPromise = this.loadModule(
                        this.pathPrefix + "wlibzip.js",
                        "WLIBZIP"
                      )),
                    this.libzipPromise
                  );
                },
              },
              {
                key: "dosbox",
                value: function () {
                  return (
                    void 0 !== this.dosboxPromise ||
                      (this.dosboxPromise = this.loadModule(
                        this.pathPrefix + "wdosbox.js",
                        "WDOSBOX"
                      )),
                    this.dosboxPromise
                  );
                },
              },
              {
                key: "loadModule",
                value: function (e, t) {
                  return c(e, t, this.cache, function () {});
                },
              },
            ]),
            r
          );
        })();
        function c(e, t, r, n) {
          return "undefined" == typeof XMLHttpRequest
            ? (function (e, t) {
                if (void 0 !== y.host.globals.compiled[t])
                  return y.host.globals.compiled[t];
                var r = o(e),
                  n = Promise.resolve(new l(r));
                t && (y.host.globals.compiled[t] = n);
                return n;
              })(e, t)
            : (function (p, h, m, v) {
                if (void 0 !== y.host.globals.compiled[h])
                  return y.host.globals.compiled[h];
                function e() {
                  var a;
                  return (
                    (a = regeneratorRuntime.mark(function e() {
                      var t, r, n, o, i, s, a, u, c, l, f, d;
                      return regeneratorRuntime.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((t = p.lastIndexOf("/")),
                                (r = p.indexOf("w", t)),
                                (n = r === t + 1 && 0 <= r),
                                y.host.wasmSupported && n)
                              ) {
                                e.next = 5;
                                break;
                              }
                              throw new Error(
                                "Starting from js-dos 6.22.60 js environment is not supported"
                              );
                            case 5:
                              return (
                                (o = p.replace(".js", ".wasm")),
                                (i = g.HTTPRequest(o, {
                                  cache: m,
                                  responseType: "arraybuffer",
                                  progress: function (e, t) {
                                    v("Resolving DosBox (" + p + ")", e, t);
                                  },
                                })),
                                (s = g.HTTPRequest(p, {
                                  cache: m,
                                  progress: function (e, t) {
                                    v("Resolving DosBox", e, t);
                                  },
                                })),
                                (e.next = 10),
                                Promise.all([i, s])
                              );
                            case 10:
                              return (
                                (a = e.sent),
                                (u = _(a, 2)),
                                (c = u[0]),
                                (l = u[1]),
                                (e.next = 16),
                                WebAssembly.compile(c)
                              );
                            case 16:
                              return (
                                (f = e.sent),
                                (d = function (e, t) {
                                  (e.env = e.env || {}),
                                    WebAssembly.instantiate(f, e).then(
                                      function (e) {
                                        return t(e, f);
                                      }
                                    );
                                }),
                                eval.call(window, l),
                                e.abrupt(
                                  "return",
                                  new b(f, y.host.globals.exports[h], d)
                                )
                              );
                            case 20:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })),
                    (e = function () {
                      var e = this,
                        s = arguments;
                      return new Promise(function (t, r) {
                        var n = a.apply(e, s);
                        function o(e) {
                          u(n, t, r, o, i, "next", e);
                        }
                        function i(e) {
                          u(n, t, r, o, i, "throw", e);
                        }
                        o(void 0);
                      });
                    }).apply(this, arguments)
                  );
                }
                var t = (function () {
                  return e.apply(this, arguments);
                })();
                h && (y.host.globals.compiled[h] = t);
                return t;
              })(e, t, r, n);
        }
        (y.WasmModulesImpl = t), (y.loadWasmModule = c);
        var l = (function () {
            function t(e) {
              a(this, t), (this.emModule = e);
            }
            return (
              s(t, [
                {
                  key: "instantiate",
                  value: function (t) {
                    var r = this;
                    return new Promise(function (e) {
                      (t.onRuntimeInitialized = function () {
                        e();
                      }),
                        new r.emModule(t);
                    });
                  },
                },
              ]),
              t
            );
          })(),
          b = (function () {
            function n(e, t, r) {
              a(this, n),
                (this.wasmModule = e),
                (this.module = t),
                (this.instantiateWasm = r);
            }
            return (
              s(n, [
                {
                  key: "instantiate",
                  value: function (t) {
                    var r = this;
                    return new Promise(function (e) {
                      (t.instantiateWasm = r.instantiateWasm),
                        (t.onRuntimeInitialized = function () {
                          e();
                        }),
                        new r.module(t);
                    });
                  },
                },
              ]),
              n
            );
          })();
      },
      {
        "../http": 136,
        "core-js/modules/es6.array.from": 102,
        "core-js/modules/es6.array.iterator": 103,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.math.clz32": 105,
        "core-js/modules/es6.math.fround": 106,
        "core-js/modules/es6.math.imul": 107,
        "core-js/modules/es6.math.trunc": 108,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "core-js/modules/es6.regexp.replace": 117,
        "core-js/modules/es6.regexp.to-string": 119,
        "core-js/modules/es6.string.iterator": 120,
        "core-js/modules/es6.symbol": 122,
        "core-js/modules/es6.typed.uint8-array": 123,
        "core-js/modules/es7.symbol.async-iterator": 126,
        "core-js/modules/web.dom.iterable": 127,
        "regenerator-runtime/runtime": 128,
      },
    ],
    140: [
      function (e, t, r) {
        "use strict";
        function u(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        function c(a) {
          return function () {
            var e = this,
              s = arguments;
            return new Promise(function (t, r) {
              var n = a.apply(e, s);
              function o(e) {
                u(n, t, r, o, i, "next", e);
              }
              function i(e) {
                u(n, t, r, o, i, "throw", e);
              }
              o(void 0);
            });
          };
        }
        function m(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              if (
                "undefined" == typeof Symbol ||
                !(Symbol.iterator in Object(e))
              )
                return;
              var r = [],
                n = !0,
                o = !1,
                i = void 0;
              try {
                for (
                  var s, a = e[Symbol.iterator]();
                  !(n = (s = a.next()).done) &&
                  (r.push(s.value), !t || r.length !== t);
                  n = !0
                );
              } catch (e) {
                (o = !0), (i = e);
              } finally {
                try {
                  n || null == a.return || a.return();
                } finally {
                  if (o) throw i;
                }
              }
              return r;
            })(e, t) ||
            (function (e, t) {
              if (!e) return;
              if ("string" == typeof e) return n(e, t);
              var r = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === r && e.constructor && (r = e.constructor.name);
              if ("Map" === r || "Set" === r) return Array.from(e);
              if (
                "Arguments" === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              )
                return n(e, t);
            })(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function n(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        function s(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        e("core-js/modules/es6.string.iterator"),
          e("core-js/modules/es6.array.from"),
          e("core-js/modules/es6.function.name"),
          e("core-js/modules/es6.regexp.to-string"),
          e("core-js/modules/web.dom.iterable"),
          e("core-js/modules/es7.symbol.async-iterator"),
          e("core-js/modules/es6.symbol"),
          e("regenerator-runtime/runtime"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          e("core-js/modules/es6.number.constructor"),
          e("core-js/modules/es6.number.parse-int"),
          e("core-js/modules/es6.regexp.split"),
          e("core-js/modules/es6.string.starts-with"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var a = e("../impl/ci-impl");
        var l = (function () {
          function r(e, t) {
            var h = this;
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, r),
              (this.live = !0),
              (this.startedAt = Date.now()),
              (this.exitResolveFn = function () {}),
              (this.configResolveFn = function () {}),
              (this.handleResolveFn = function () {}),
              (this.keyMatrix = {}),
              (this.frameWidth = 0),
              (this.frameHeight = 0),
              (this.eventQueue = ""),
              (this.eventIntervalId = -1),
              (this.rttIntervalId = -1),
              (this.logIntervalId = -1),
              (this.logColor = "not set"),
              (this.logWhiteMs = 0),
              (this.logRedMs = 0),
              (this.logYellowMs = 0),
              (this.onDataMessage = function (e) {
                if (e.startsWith("config="))
                  h.configResolveFn(JSON.parse(e.substr("config=".length)));
                else if (e.startsWith("frame=")) {
                  var t = m(e.substr("frame=".length).split("x"), 2),
                    r = t[0],
                    n = t[1];
                  (h.frameWidth = Number.parseInt(r, 10) || 0),
                    (h.frameHeight = Number.parseInt(n, 10) || 0);
                } else if (e.startsWith("rtt=")) {
                  var o,
                    i = m(e.substr("rtt=".length).split(" "), 3),
                    s = i[0],
                    a = i[1],
                    u = i[2],
                    c = Number.parseInt(a, 10),
                    l = Number.parseInt(u, 10),
                    f = Date.now(),
                    d =
                      (null === (o = h.handle) || void 0 === o
                        ? void 0
                        : o.getBitrate()) || "0 kbits/sec",
                    p = Number.parseInt(d.split(" ")[0], 10);
                  h.sendPipeMessage("rtt-data", Date.now(), c, l, f, p),
                    s === h.opaqueId &&
                      h.eventsImpl.fireStdout("rtt-data=" + (f - c) + " " + p);
                } else if (e.startsWith("log-visual-"))
                  switch (e) {
                    case "log-visual-white":
                      h.eventsImpl.fireStdout(
                        "yellow-frame:" + (Date.now() - h.logYellowMs)
                      );
                      break;
                    case "log-visual-red":
                      h.eventsImpl.fireStdout(
                        "white-frame:" + (Date.now() - h.logWhiteMs)
                      );
                      break;
                    case "log-visual-yellow":
                      h.eventsImpl.fireStdout(
                        "red-frame:" + (Date.now() - h.logRedMs)
                      );
                  }
                else if (e.startsWith("log-command-"))
                  switch (e) {
                    case "log-command-white":
                      h.eventsImpl.fireStdout(
                        "yellow-pipe:" + (Date.now() - h.logYellowMs)
                      );
                      break;
                    case "log-command-red":
                      h.eventsImpl.fireStdout(
                        "white-pipe:" + (Date.now() - h.logWhiteMs)
                      );
                      break;
                    case "log-command-yellow":
                      h.eventsImpl.fireStdout(
                        "red-pipe:" + (Date.now() - h.logRedMs)
                      );
                  }
                else h.eventsImpl.fireStdout(e);
              }),
              (this.onJanusMessage = function (t, e, r) {
                null != r &&
                  t.createAnswer({
                    jsep: r,
                    media: { audioSend: !1, videoSend: !1, data: !0 },
                    success: function (e) {
                      h.fireMessage("started"),
                        t.send({ message: { request: "start" }, jsep: e });
                    },
                    error: h.onError,
                  });
              }),
              (this.onError = function (e) {
                h.fireMessage("error", e);
              }),
              (this.eventsImpl = new a.CommandInterfaceEventsImpl()),
              (this.janus = e),
              (this.opaqueId = t),
              (this.exitPromise = new Promise(function (e) {
                h.exitResolveFn = e;
              })),
              (this.configPromise = new Promise(function (e) {
                h.configResolveFn = e;
              })),
              (this.handlePromise = new Promise(function (t, r) {
                h.handleResolveFn = function (e) {
                  (h.handle = e),
                    h.live
                      ? (setTimeout(function () {
                          h.live &&
                            e.data({ text: "pipe " + h.opaqueId + " config" });
                        }, 1e3),
                        h.config().then(function () {
                          h.live &&
                            ((h.eventIntervalId = setInterval(function () {
                              h.sendEventsData(e);
                            }, 8)),
                            (h.rttIntervalId = setInterval(function () {
                              h.sendPipeMessage("rtt", Date.now());
                            }, 1e3)));
                        }),
                        t(e))
                      : r(new Error("exit() was called"));
                };
              })),
              this.attach();
          }
          var e, t, n, o, i;
          return (
            (e = r),
            (t = [
              {
                key: "fireMessage",
                value: function (e) {
                  for (
                    var t,
                      r = arguments.length,
                      n = new Array(1 < r ? r - 1 : 0),
                      o = 1;
                    o < r;
                    o++
                  )
                    n[o - 1] = arguments[o];
                  (t = this.eventsImpl).fireMessage.apply(t, [e].concat(n));
                },
              },
              {
                key: "attach",
                value: function () {
                  var r,
                    o,
                    i,
                    s,
                    n = this;
                  this.janus.attach({
                    plugin: "janus.plugin.streaming",
                    opaqueId: this.opaqueId,
                    error: this.onError,
                    success: function (e) {
                      (r = e),
                        n.fireMessage("attached"),
                        e.send({ message: { request: "watch", id: 1 } });
                    },
                    onmessage: function (e, t) {
                      n.onJanusMessage(r, e, t);
                    },
                    onremotestream: function (e) {
                      n.fireMessage("onremotestream", e);
                    },
                    ondataopen: function () {
                      return n.handleResolveFn(r);
                    },
                    ondata:
                      ((o = this.onDataMessage),
                      (i = this.onError),
                      (s = ""),
                      function e(t) {
                        var r = t.indexOf("\n");
                        if (-1 == r) s += t;
                        else {
                          var n = s + t.substr(0, r);
                          s = "";
                          try {
                            o(atob(n));
                          } catch (e) {
                            i(e);
                          }
                          e(t.substr(r + 1));
                        }
                      }),
                  });
                },
              },
              {
                key: "onDestroyed",
                value: function () {
                  this.fireMessage("destroyed"), this.exitResolveFn();
                },
              },
              {
                key: "config",
                value:
                  ((i = c(
                    regeneratorRuntime.mark(function e() {
                      return regeneratorRuntime.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return e.abrupt("return", this.configPromise);
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  )),
                  function () {
                    return i.apply(this, arguments);
                  }),
              },
              {
                key: "width",
                value: function () {
                  return this.frameWidth;
                },
              },
              {
                key: "height",
                value: function () {
                  return this.frameHeight;
                },
              },
              {
                key: "soundFrequency",
                value: function () {
                  return 44100;
                },
              },
              {
                key: "screenshot",
                value: function () {
                  return Promise.reject(new Error("Not supported"));
                },
              },
              {
                key: "simulateKeyPress",
                value: function () {
                  for (
                    var t = this,
                      r = Date.now() - this.startedAt,
                      e = arguments.length,
                      n = new Array(e),
                      o = 0;
                    o < e;
                    o++
                  )
                    n[o] = arguments[o];
                  n.forEach(function (e) {
                    return t.addKey(e, !0, r);
                  }),
                    n.forEach(function (e) {
                      return t.addKey(e, !1, 16 + r);
                    });
                },
              },
              {
                key: "sendKeyEvent",
                value: function (e, t) {
                  this.addKey(e, t, Date.now() - this.startedAt);
                },
              },
              {
                key: "addKey",
                value: function (e, t, r) {
                  if (
                    (!0 === this.keyMatrix[e]) !== t &&
                    ((this.keyMatrix[e] = t),
                    this.sendPipeMessage("k" + (t ? "down" : "up"), e, r),
                    -1 !== this.logIntervalId && t)
                  )
                    switch (this.logColor) {
                      case "white":
                        this.logWhiteMs = Date.now();
                        break;
                      case "red":
                        this.logRedMs = Date.now();
                        break;
                      case "yellow":
                        this.logYellowMs = Date.now();
                    }
                },
              },
              {
                key: "sendMouseMotion",
                value: function (e, t) {
                  this.sendPipeMessage(
                    "mmove",
                    e,
                    t,
                    Date.now() - this.startedAt
                  );
                },
              },
              {
                key: "sendMouseButton",
                value: function (e, t) {
                  this.sendPipeMessage(
                    "m" + (t ? "down" : "up"),
                    e,
                    Date.now() - this.startedAt
                  );
                },
              },
              {
                key: "logVisual",
                value: function (s) {
                  var a = this;
                  this.sendPipeMessage("log-visual-on");
                  var e = document.createElement("canvas"),
                    u = e.getContext("2d");
                  (e.width = 1),
                    (e.height = 1),
                    (this.logIntervalId = setInterval(
                      c(
                        regeneratorRuntime.mark(function e() {
                          var t, r, n, o, i;
                          return regeneratorRuntime.wrap(function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (
                                    ((r = Date.now()),
                                    null != u &&
                                      u.drawImage(s, 0, 0, 1, 1, 0, 0, 1, 1),
                                    (n =
                                      null == u ||
                                      null ===
                                        (t = u.getImageData(0, 0, 1, 1)) ||
                                      void 0 === t
                                        ? void 0
                                        : t.data),
                                    (o = Date.now() - r),
                                    (i = "not set"),
                                    200 < n[0] && 200 < n[1] && 200 < n[2]
                                      ? (i = "white")
                                      : 200 < n[0] && n[1] < 200 && n[2] < 200
                                      ? (i = "red")
                                      : 200 < n[0] &&
                                        200 < n[1] &&
                                        n[2] < 200 &&
                                        (i = "yellow"),
                                    i === a.logColor)
                                  ) {
                                    e.next = 17;
                                    break;
                                  }
                                  (e.t0 = i),
                                    (e.next =
                                      "white" === e.t0
                                        ? 10
                                        : "red" === e.t0
                                        ? 12
                                        : "yellow" === e.t0
                                        ? 14
                                        : 16);
                                  break;
                                case 10:
                                  return (
                                    a.eventsImpl.fireStdout(
                                      "yellow-stream:" +
                                        (Date.now() - a.logYellowMs - o)
                                    ),
                                    e.abrupt("break", 16)
                                  );
                                case 12:
                                  return (
                                    a.eventsImpl.fireStdout(
                                      "white-stream:" +
                                        (Date.now() - a.logWhiteMs - o)
                                    ),
                                    e.abrupt("break", 16)
                                  );
                                case 14:
                                  return (
                                    a.eventsImpl.fireStdout(
                                      "red-stream:" +
                                        (Date.now() - a.logRedMs - o)
                                    ),
                                    e.abrupt("break", 16)
                                  );
                                case 16:
                                  a.logColor = i;
                                case 17:
                                case "end":
                                  return e.stop();
                              }
                          }, e);
                        })
                      ),
                      16
                    ));
                },
              },
              {
                key: "sendPipeMessage",
                value: function () {
                  this.eventQueue += "pipe " + this.opaqueId;
                  for (
                    var e = arguments.length, t = new Array(e), r = 0;
                    r < e;
                    r++
                  )
                    t[r] = arguments[r];
                  for (var n = 0, o = t; n < o.length; n++) {
                    var i = o[n];
                    this.eventQueue += " " + i;
                  }
                  this.eventQueue += "\n";
                },
              },
              {
                key: "sendEventsData",
                value:
                  ((o = c(
                    regeneratorRuntime.mark(function e(t) {
                      return regeneratorRuntime.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (0 === this.eventQueue.length)
                                  return e.abrupt("return");
                                e.next = 2;
                                break;
                              case 2:
                                t.data({ text: this.eventQueue }),
                                  (this.eventQueue = "");
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  )),
                  function (e) {
                    return o.apply(this, arguments);
                  }),
              },
              {
                key: "persist",
                value: function () {
                  return Promise.reject(new Error("Not supported"));
                },
              },
              {
                key: "exit",
                value: function () {
                  return (
                    (this.live = !1),
                    clearInterval(this.logIntervalId),
                    (this.logIntervalId = -1),
                    clearInterval(this.eventIntervalId),
                    (this.eventIntervalId = -1),
                    clearInterval(this.rttIntervalId),
                    (this.rttIntervalId = -1),
                    this.janus.destroy(),
                    this.exitPromise
                  );
                },
              },
              {
                key: "events",
                value: function () {
                  return this.eventsImpl;
                },
              },
            ]) && s(e.prototype, t),
            n && s(e, n),
            r
          );
        })();
        r.default = function (s, e) {
          var a = e || window.Janus;
          return void 0 === a
            ? Promise.reject(
                new Error(
                  "Janus is not defined, you should load janus.js before this"
                )
              )
            : a.isWebrtcSupported()
            ? new Promise(function (e, t) {
                var r = null,
                  n = {
                    error: function (e) {
                      null === r ? t(e) : r.onError(e);
                    },
                    destroyed: function () {
                      null !== r && r.onDestroyed();
                    },
                  },
                  o = {
                    server: s,
                    success: function () {
                      (r = new l(i, "js-dos-" + a.randomString(12))), e(r);
                    },
                    error: n.error,
                    destroyed: n.destroyed,
                    destroyOnUnload: !0,
                  },
                  i = new a(o);
              })
            : Promise.reject(new Error("WebRTC not supported"));
        };
      },
      {
        "../impl/ci-impl": 137,
        "core-js/modules/es6.array.from": 102,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.number.constructor": 109,
        "core-js/modules/es6.number.parse-int": 110,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "core-js/modules/es6.regexp.split": 118,
        "core-js/modules/es6.regexp.to-string": 119,
        "core-js/modules/es6.string.iterator": 120,
        "core-js/modules/es6.string.starts-with": 121,
        "core-js/modules/es6.symbol": 122,
        "core-js/modules/es7.symbol.async-iterator": 126,
        "core-js/modules/web.dom.iterable": 127,
        "regenerator-runtime/runtime": 128,
      },
    ],
    141: [
      function (e, t, r) {
        "use strict";
        function u(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        function i(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        e("core-js/modules/es6.regexp.constructor"),
          e("core-js/modules/es6.regexp.replace"),
          e("regenerator-runtime/runtime"),
          e("core-js/modules/es6.typed.uint8-array"),
          e("core-js/modules/es6.regexp.split"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var n = (function () {
          function r(e, t) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, r),
              (this.module = e),
              (this.home = t),
              this.module.callMain([]),
              this.chdirToHome();
          }
          var e, t, n, a, o;
          return (
            (e = r),
            (t = [
              {
                key: "zipFromFs",
                value: function (e) {
                  var t = 0 < arguments.length && void 0 !== e ? e : -1;
                  this.chdirToHome();
                  var r = this.module._zip_from_fs(t);
                  if (0 === r)
                    return Promise.reject(
                      new Error("Can't create zip, see more info in logs")
                    );
                  var n = this.module.HEAPU32[r / 4],
                    o = this.module.HEAPU8.slice(r + 4, r + 4 + n);
                  return this.module._free(r), Promise.resolve(o);
                },
              },
              {
                key: "zipToFs",
                value: function (e, t) {
                  var r = 1 < arguments.length && void 0 !== t ? t : "/";
                  r = this.normalizeFilename(r);
                  var n = this.normalizeFilename(r).split("/");
                  this.createPath(n, 0, n.length), this.chdir(r);
                  var o = new Uint8Array(e),
                    i = this.module._malloc(o.length);
                  this.module.HEAPU8.set(o, i);
                  var s = this.module._zip_to_fs(i, o.length);
                  return (
                    this.module._free(i),
                    this.chdirToHome(),
                    0 === s
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "Can't extract zip, retcode " +
                              s +
                              ", see more info in logs"
                          )
                        )
                  );
                },
              },
              {
                key: "writeFile",
                value: function (e, t) {
                  (e = this.normalizeFilename(e)),
                    t instanceof ArrayBuffer && (t = new Uint8Array(t));
                  var r = e.split("/");
                  if (0 === r.length)
                    throw new Error(
                      "Can't create file '" +
                        e +
                        "', because it's not valid file path"
                    );
                  var n = r[r.length - 1].trim();
                  if (0 === n.length)
                    throw new Error(
                      "Can't create file '" +
                        e +
                        "', because file name is empty"
                    );
                  var o = this.createPath(r, 0, r.length - 1);
                  this.module.FS.writeFile(o + "/" + n, t);
                },
              },
              {
                key: "readFile",
                value:
                  ((a = regeneratorRuntime.mark(function e(t) {
                    var r,
                      n = arguments;
                    return regeneratorRuntime.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (r =
                                  1 < n.length && void 0 !== n[1]
                                    ? n[1]
                                    : "utf8"),
                                (t = this.normalizeFilename(t)),
                                e.abrupt(
                                  "return",
                                  this.module.FS.readFile(t, { encoding: r })
                                )
                              );
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })),
                  (o = function () {
                    var e = this,
                      s = arguments;
                    return new Promise(function (t, r) {
                      var n = a.apply(e, s);
                      function o(e) {
                        u(n, t, r, o, i, "next", e);
                      }
                      function i(e) {
                        u(n, t, r, o, i, "throw", e);
                      }
                      o(void 0);
                    });
                  }),
                  function (e) {
                    return o.apply(this, arguments);
                  }),
              },
              {
                key: "exists",
                value: function (e) {
                  e = this.normalizeFilename(e);
                  try {
                    return this.module.FS.lookupPath(e), !0;
                  } catch (e) {
                    return !1;
                  }
                },
              },
              {
                key: "destroy",
                value: function () {
                  try {
                    this.module._libzip_destroy();
                  } catch (e) {
                    return e;
                  }
                },
              },
              {
                key: "normalizeFilename",
                value: function (e) {
                  for (
                    e = e
                      .replace(new RegExp("^[a-zA-z]+:"), "")
                      .replace(new RegExp("\\\\", "g"), "/");
                    "/" === e[0];

                  )
                    e = e.substr(1);
                  return e;
                },
              },
              {
                key: "createPath",
                value: function (e, t, r) {
                  for (var n = ".", o = t; o < r; ++o) {
                    var i = e[o].trim();
                    0 !== i.length &&
                      (this.module.FS.createPath(n, i, !0, !0),
                      (n = n + "/" + i));
                  }
                  return n;
                },
              },
              {
                key: "chdirToHome",
                value: function () {
                  this.module.FS.chdir(this.home);
                },
              },
              {
                key: "chdir",
                value: function (e) {
                  this.module.FS.chdir(this.home + "/" + e);
                },
              },
            ]) && i(e.prototype, t),
            n && i(e, n),
            r
          );
        })();
        r.default = n;
      },
      {
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "core-js/modules/es6.regexp.constructor": 114,
        "core-js/modules/es6.regexp.replace": 117,
        "core-js/modules/es6.regexp.split": 118,
        "core-js/modules/es6.typed.uint8-array": 123,
        "regenerator-runtime/runtime": 128,
      },
    ],
    142: [
      function (e, t, r) {
        "use strict";
        function o(e) {
          if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
            if (
              Array.isArray(e) ||
              (e = (function (e, t) {
                if (!e) return;
                if ("string" == typeof e) return a(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r) return Array.from(e);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return a(e, t);
              })(e))
            ) {
              var t = 0,
                r = function () {};
              return {
                s: r,
                n: function () {
                  return t >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[t++] };
                },
                e: function (e) {
                  throw e;
                },
                f: r,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var n,
            o,
            i = !0,
            s = !1;
          return {
            s: function () {
              n = e[Symbol.iterator]();
            },
            n: function () {
              var e = n.next();
              return (i = e.done), e;
            },
            e: function (e) {
              (s = !0), (o = e);
            },
            f: function () {
              try {
                i || null == n.return || n.return();
              } finally {
                if (s) throw o;
              }
            },
          };
        }
        function a(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        function i(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        e("core-js/modules/web.dom.iterable"),
          e("core-js/modules/es7.symbol.async-iterator"),
          e("core-js/modules/es6.symbol"),
          e("core-js/modules/es6.string.iterator"),
          e("core-js/modules/es6.array.from"),
          e("core-js/modules/es6.regexp.to-string"),
          e("core-js/modules/es6.object.to-string"),
          e("core-js/modules/es6.function.name"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var n = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.messages = []);
          }
          var t, r, n;
          return (
            (t = e),
            (r = [
              {
                key: "handler",
                value: function (e, t) {
                  this.messages.push({ name: e, props: t });
                },
              },
              {
                key: "sendTo",
                value: function (e) {
                  var t,
                    r = o(this.messages);
                  try {
                    for (r.s(); !(t = r.n()).done; ) {
                      var n = t.value;
                      e(n.name, n.props);
                    }
                  } catch (e) {
                    r.e(e);
                  } finally {
                    r.f();
                  }
                  this.messages = [];
                },
              },
            ]) && i(t.prototype, r),
            n && i(t, n),
            e
          );
        })();
        r.MessagesQueue = n;
      },
      {
        "core-js/modules/es6.array.from": 102,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.regexp.to-string": 119,
        "core-js/modules/es6.string.iterator": 120,
        "core-js/modules/es6.symbol": 122,
        "core-js/modules/es7.symbol.async-iterator": 126,
        "core-js/modules/web.dom.iterable": 127,
      },
    ],
    143: [
      function (e, t, r) {
        "use strict";
        function i(e) {
          if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
            if (
              Array.isArray(e) ||
              (e = (function (e, t) {
                if (!e) return;
                if ("string" == typeof e) return a(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === r && e.constructor && (r = e.constructor.name);
                if ("Map" === r || "Set" === r) return Array.from(e);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return a(e, t);
              })(e))
            ) {
              var t = 0,
                r = function () {};
              return {
                s: r,
                n: function () {
                  return t >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[t++] };
                },
                e: function (e) {
                  throw e;
                },
                f: r,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var n,
            o,
            i = !0,
            s = !1;
          return {
            s: function () {
              n = e[Symbol.iterator]();
            },
            n: function () {
              var e = n.next();
              return (i = e.done), e;
            },
            e: function (e) {
              (s = !0), (o = e);
            },
            f: function () {
              try {
                i || null == n.return || n.return();
              } finally {
                if (s) throw o;
              }
            },
          };
        }
        function a(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        function n(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        e("core-js/modules/web.dom.iterable"),
          e("core-js/modules/es7.symbol.async-iterator"),
          e("core-js/modules/es6.symbol"),
          e("core-js/modules/es6.string.iterator"),
          e("core-js/modules/es6.array.from"),
          e("core-js/modules/es6.function.name"),
          e("core-js/modules/es6.regexp.to-string"),
          e("core-js/modules/es6.typed.uint8-clamped-array"),
          e("core-js/modules/es6.promise"),
          e("core-js/modules/es6.object.to-string"),
          e("core-js/modules/es6.typed.uint8-array"),
          Object.defineProperty(r, "__esModule", { value: !0 });
        var s = e("../impl/ci-impl"),
          o = (function () {
            function o(e, t, r) {
              var n = this;
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, o),
                (this.startedAt = Date.now()),
                (this.frameWidth = 0),
                (this.frameHeight = 0),
                (this.rgb = new Uint8Array()),
                (this.freq = 0),
                (this.eventsImpl = new s.CommandInterfaceEventsImpl()),
                (this.keyMatrix = {}),
                (this.configResolve = function () {}),
                (this.startupErrorLog = ""),
                (this.bundles = e),
                (this.transport = t),
                (this.ready = r),
                (this.configPromise = new Promise(function (e) {
                  return (n.configResolve = e);
                })),
                this.transport.initMessageHandler(
                  this.onServerMessage.bind(this)
                );
            }
            var e, t, r;
            return (
              (e = o),
              (t = [
                {
                  key: "sendClientMessage",
                  value: function (e, t) {
                    ((t = t || {}).sessionId =
                      t.sessionId || this.transport.sessionId),
                      this.transport.sendMessageToServer(e, t);
                  },
                },
                {
                  key: "onServerMessage",
                  value: function (e, t) {
                    if (
                      !(
                        void 0 === e ||
                        e.length < 3 ||
                        "w" !== e[0] ||
                        "s" !== e[1] ||
                        "-" !== e[2]
                      ) &&
                      void 0 !== t &&
                      t.sessionId === this.transport.sessionId
                    )
                      switch (e) {
                        case "ws-ready":
                          this.sendClientMessage("wc-run", {
                            bundles: this.bundles,
                          }),
                            delete this.bundles;
                          break;
                        case "ws-server-ready":
                          0 < (this.startupErrorLog || "").length
                            ? (void 0 !== this.transport.exit &&
                                this.transport.exit(),
                              this.ready(new Error(this.startupErrorLog)))
                            : (delete this.startupErrorLog, this.ready(null)),
                            delete this.ready;
                          break;
                        case "ws-frame-set-size":
                          this.onFrameSize(t.width, t.height);
                          break;
                        case "ws-update-lines":
                          this.onFrameLines(t.lines);
                          break;
                        case "ws-exit":
                          this.onExit();
                          break;
                        case "ws-log":
                          this.onLog.apply(this, t.args);
                          break;
                        case "ws-warn":
                          this.onWarn.apply(this, t.args);
                          break;
                        case "ws-err":
                          this.onErr.apply(this, t.args);
                          break;
                        case "ws-stdout":
                          this.onStdout(t.message);
                          break;
                        case "ws-persist":
                          this.onPersist(t.bundle);
                          break;
                        case "ws-sound-init":
                          this.onSoundInit(t.freq);
                          break;
                        case "ws-sound-push":
                          this.onSoundPush(t.samples);
                          break;
                        case "ws-config":
                          this.onConfig(JSON.parse(t.content));
                          break;
                        case "ws-sync-sleep":
                          this.sendClientMessage("wc-sync-sleep", t);
                          break;
                        default:
                          console.log("Unknown server message (ws):", e);
                      }
                  },
                },
                {
                  key: "onConfig",
                  value: function (e) {
                    this.configResolve(e);
                  },
                },
                {
                  key: "onFrameSize",
                  value: function (e, t) {
                    (this.frameWidth === e && this.frameHeight === t) ||
                      ((this.frameWidth = e),
                      (this.frameHeight = t),
                      (this.rgb = new Uint8Array(e * t * 3)),
                      this.eventsImpl.fireFrameSize(e, t));
                  },
                },
                {
                  key: "onFrameLines",
                  value: function (e) {
                    var t,
                      r = i(e);
                    try {
                      for (r.s(); !(t = r.n()).done; ) {
                        var n = t.value;
                        this.rgb.set(n.heapu8, n.start * this.frameWidth * 3);
                      }
                    } catch (e) {
                      r.e(e);
                    } finally {
                      r.f();
                    }
                    this.eventsImpl.fireFrame(this.rgb);
                  },
                },
                {
                  key: "onSoundInit",
                  value: function (e) {
                    this.freq = e;
                  },
                },
                {
                  key: "onSoundPush",
                  value: function (e) {
                    this.eventsImpl.fireSoundPush(e);
                  },
                },
                {
                  key: "onLog",
                  value: function () {
                    for (
                      var e, t = arguments.length, r = new Array(t), n = 0;
                      n < t;
                      n++
                    )
                      r[n] = arguments[n];
                    (e = this.eventsImpl).fireMessage.apply(
                      e,
                      ["log"].concat(r)
                    );
                  },
                },
                {
                  key: "onWarn",
                  value: function () {
                    for (
                      var e, t = arguments.length, r = new Array(t), n = 0;
                      n < t;
                      n++
                    )
                      r[n] = arguments[n];
                    (e = this.eventsImpl).fireMessage.apply(
                      e,
                      ["warn"].concat(r)
                    );
                  },
                },
                {
                  key: "onErr",
                  value: function () {
                    for (
                      var e, t = arguments.length, r = new Array(t), n = 0;
                      n < t;
                      n++
                    )
                      r[n] = arguments[n];
                    (e = this.eventsImpl).fireMessage.apply(
                      e,
                      ["error"].concat(r)
                    ),
                      void 0 !== this.startupErrorLog &&
                        (this.startupErrorLog += JSON.stringify(r) + "\n");
                  },
                },
                {
                  key: "onStdout",
                  value: function (e) {
                    this.eventsImpl.fireStdout(e);
                  },
                },
                {
                  key: "config",
                  value: function () {
                    return this.configPromise;
                  },
                },
                {
                  key: "width",
                  value: function () {
                    return this.frameWidth;
                  },
                },
                {
                  key: "height",
                  value: function () {
                    return this.frameHeight;
                  },
                },
                {
                  key: "soundFrequency",
                  value: function () {
                    return this.freq;
                  },
                },
                {
                  key: "screenshot",
                  value: function () {
                    for (
                      var e = new Uint8ClampedArray((this.rgb.length / 3) * 4),
                        t = 0,
                        r = 0;
                      r < e.length;

                    )
                      (e[r++] = this.rgb[t++]),
                        (e[r++] = this.rgb[t++]),
                        (e[r++] = this.rgb[t++]),
                        (e[r++] = 255);
                    return Promise.resolve(
                      new ImageData(e, this.frameWidth, this.frameHeight)
                    );
                  },
                },
                {
                  key: "simulateKeyPress",
                  value: function () {
                    for (
                      var t = this,
                        r = Date.now() - this.startedAt,
                        e = arguments.length,
                        n = new Array(e),
                        o = 0;
                      o < e;
                      o++
                    )
                      n[o] = arguments[o];
                    n.forEach(function (e) {
                      return t.addKey(e, !0, r);
                    }),
                      n.forEach(function (e) {
                        return t.addKey(e, !1, 16 + r);
                      });
                  },
                },
                {
                  key: "sendKeyEvent",
                  value: function (e, t) {
                    this.addKey(e, t, Date.now() - this.startedAt);
                  },
                },
                {
                  key: "addKey",
                  value: function (e, t, r) {
                    (!0 === this.keyMatrix[e]) !== t &&
                      ((this.keyMatrix[e] = t),
                      this.sendClientMessage("wc-add-key", {
                        key: e,
                        pressed: t,
                        timeMs: r,
                      }));
                  },
                },
                {
                  key: "sendMouseMotion",
                  value: function (e, t) {
                    this.sendClientMessage("wc-mouse-move", {
                      x: e,
                      y: t,
                      timeMs: Date.now() - this.startedAt,
                    });
                  },
                },
                {
                  key: "sendMouseButton",
                  value: function (e, t) {
                    this.sendClientMessage("wc-mouse-button", {
                      button: e,
                      pressed: t,
                      timeMs: Date.now() - this.startedAt,
                    });
                  },
                },
                {
                  key: "persist",
                  value: function () {
                    var t = this;
                    if (void 0 !== this.persistPromise)
                      return this.persistPromise;
                    var e = new Promise(function (e) {
                      return (t.persistResolve = e);
                    });
                    return (
                      (this.persistPromise = e),
                      this.sendClientMessage("wc-pack-fs-to-bundle"),
                      e
                    );
                  },
                },
                {
                  key: "onPersist",
                  value: function (e) {
                    this.persistResolve &&
                      (this.persistResolve(e),
                      delete this.persistPromise,
                      delete this.persistResolve);
                  },
                },
                {
                  key: "exit",
                  value: function () {
                    var t = this;
                    return (
                      void 0 !== this.exitPromise ||
                        ((this.exitPromise = new Promise(function (e) {
                          return (t.exitResolve = e);
                        })),
                        this.exitPromise.then(function () {
                          t.events().fireExit();
                        }),
                        this.sendClientMessage("wc-exit")),
                      this.exitPromise
                    );
                  },
                },
                {
                  key: "onExit",
                  value: function () {
                    void 0 !== this.transport.exit && this.transport.exit(),
                      this.exitResolve &&
                        (this.exitResolve(),
                        delete this.exitPromise,
                        delete this.exitResolve);
                  },
                },
                {
                  key: "events",
                  value: function () {
                    return this.eventsImpl;
                  },
                },
              ]) && n(e.prototype, t),
              r && n(e, r),
              o
            );
          })();
        r.CommandInterfaceOverTransportLayer = o;
      },
      {
        "../impl/ci-impl": 137,
        "core-js/modules/es6.array.from": 102,
        "core-js/modules/es6.function.name": 104,
        "core-js/modules/es6.object.to-string": 112,
        "core-js/modules/es6.promise": 113,
        "core-js/modules/es6.regexp.to-string": 119,
        "core-js/modules/es6.string.iterator": 120,
        "core-js/modules/es6.symbol": 122,
        "core-js/modules/es6.typed.uint8-array": 123,
        "core-js/modules/es6.typed.uint8-clamped-array": 124,
        "core-js/modules/es7.symbol.async-iterator": 126,
        "core-js/modules/web.dom.iterable": 127,
      },
    ],
  },
  {},
  [135]
);
