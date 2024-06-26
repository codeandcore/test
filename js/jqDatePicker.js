! function (a, b) {
    "object" == typeof exports ? module.exports = b(a) : "function" == typeof define && define.amd ? define("calendar", [], function () {
        return b(a)
    }) : a.Calendar = b(a)
}(this, function (a, b) {
    "use strict";

    function c(a, b) {
        var c = a.at || a.start;
        return a._start = c ? e(c).valueOf() : -1e15, a._end = a.at ? e(c, !0).valueOf() : a.end ? e(a.end, !a.end.split(" ")[1]).valueOf() : 1e15, a._id = b, a
    }

    function d(a) {
        return a.replace(/(:?^\s+|\s+$)/g, "").replace(/(?:\s\s+)/g, " ")
    }

    function e(a, b) {
        var c = a.split(" "),
            d = c[1] || (b ? "23:59:59.999" : "00:00:00");
        return new Date(Date.parse(c[0] + "T" + d + k))
    }

    function f(a) {
        var b, c = new Date(a.getDate && a.valueOf() || a),
            d = (a.getDay() + 6) % 7;
        return c.setDate(c.getDate() - d + 3), b = c.valueOf(), c.setMonth(0, 1), 4 !== c.getDay() && c.setMonth(0, 1 + (4 - c.getDay() + 7) % 7), 1 + Math.ceil((b - c) / 6048e5)
    }

    function g(a) {
        for (var b = a.template, c = 0, e = [], f = a.renderWeekNo ? -1 : 0; f < 7; f++) c = f + (a.sundayBased ? 0 : 6 === f ? -6 : 1), e.push(b.daysOfWeek.replace(/class="(.*?)"/, function (b, e) {
            return 'class="' + d(e + " " + (f < 0 ? "" : a.weekDayClass || "") + " " + (f < 0 ? "" : a.workingDays.indexOf(c) === -1 ? a.weekEndClass : "")) + '"'
        }).replace(/{{day}}/g, f < 0 ? b.daysOfWeekHead : a.weekDays[c]));
        return b.daysOfWeekStart + e.join("") + b.daysOfWeekEnd
    }

    function h(a, b, c) {
        var e = (e = a.getDay() - !c.options.sundayBased) < 0 ? 7 + e : e,
            h = c.options,
            i = h.equalHight ? 6 : Math.ceil((e + new Date(a.getFullYear(), a.getMonth() + 1, 0).getDate()) / 7),
            j = h.template,
            k = h.renderWeekNo,
            l = (new Date).toDateString(),
            m = [],
            n = [],
            o = !1,
            p = !1,
            q = 0,
            r = a,
            s = r.getMonth(),
            t = r.getFullYear(),
            u = 0,
            v = 0,
            w = !1,
            x = [],
            y = h.events,
            z = null,
            A = [];
        r.setDate(-e);
        for (var B = 0; B < i; B++)
            if (b && b !== B + 1) r.setDate(r.getDate() + 7);
            else {
                m = [];
                for (var C = 0, D = k ? 8 : 7; C < D; C++) {
                    if (r.setDate(r.getDate() + 1), o = k && 0 === C, !o && (q = r.getDate(), z = r.getMonth(), w = r.toDateString() === l, p = z < s && !(0 === z && 11 === s) || 11 === z && 0 === s, y)) {
                        x = [], u = r.valueOf(), v = u + 86399e3, A = [];
                        for (var E = 0, F = y.length; E < F; E++)(y[E]._start <= u && y[E]._end >= v || y[E]._start >= u && y[E]._end <= v) && (x.push(y[E]), A.push(y[E].className || ""))
                            }
                    m.push(j[o ? "weekNo" : "row"].replace(/class="(.*?)"/, function (a, b) {
                        return 'class="' + d(b + " " + (o ? h.weekNoClass : (z === s ? h.currentMonthClass : p ? h.prevMonthClass : h.nextMonthClass) + " " + (A.join(" ").replace(/(\b\w+\s+)*\1/g, "$1") || "") + " " + (w ? h.todayClass : "") + " " + (h.workingDays.indexOf(r.getDay()) === -1 ? h.weekEndClass : ""))) + '"'
                    }).replace(/{{day}}/g, o ? f(r) : q).replace(/{{day-event}}/g, q && j.day.call(c, q, r, x) || q).replace(/{{month}}/g, z + 1).replace(/{{year}}/g, r.getFullYear()).replace(/{{today}}/g, w && j.today.call(c, q, r) || "").replace(/{{event}}/g, x.length && j.event.call(c, q, r, x) || "")), o && r.setDate(r.getDate() - 1)
                }
                n.push(m.join(""))
            }
        return j.start.call(c, s + 1, t, b).replace("{{days}}", h.renderDaysOfWeek ? g(h) : "") + n.join(j.colGlue) + j.end.call(c, s + 1, t, b)
    }
    var i = function () {
        return ""
    },
        j = function (a) {
            this.options = {
                sundayBased: !0,
                renderWeekNo: !1,
                renderDaysOfWeek: !0,
                equalHight: !1,
                useCache: !0,
                months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                workingDays: [1, 2, 3, 4, 5],
                events: [],
                template: {
                    start: function () {
                        return '<table class="cal-month">{{days}}<tbody><tr>'
                    },
                    daysOfWeekStart: "<thead><tr>",
                    daysOfWeek: '<th class="">{{day}}</th>',
                    daysOfWeekEnd: "</tr></thead>",
                    daysOfWeekHead: "",
                    colGlue: "</tr><tr>",
                    weekNo: '<td class="">{{day}}</td>',
                    row: '<td class="">{{day}}</td>',
                    end: function () {
                        return "</tr></tbody></table>"
                    },
                    today: i,
                    day: i,
                    event: i
                },
                todayClass: "today",
                weekEndClass: "week-end",
                weekDayClass: "week-day",
                prevMonthClass: "previous-month",
                nextMonthClass: "next-month",
                currentMonthClass: "current-month",
                weekNoClass: "week-no"
            }, l(this, a || {})
        },
        k = "",
        l = function (a, b) {
            for (var d in b) {
                var e = b[d];
                if ("events" === d)
                    for (var f = e.length; f--;) c(e[f], e[f]._id || f);
                if ("template" === d)
                    for (var g in e) a.options[d][g] = e[g];
                else a.options[d] = e
                    }
            k = (-((new Date).getTimezoneOffset() / 60) + "").replace(/([-]*)(\d)(\d*)/, function (a, b, c, d) {
                return (b || "+") + (d ? c + d : "0" + c)
            }) + ":00", a.html = {}
        };
    return j.prototype.addEvent = function (a, b) {
        this.options.events.push(c(a, b))
    }, j.prototype.removeEvent = function (a) {
        for (var b = this.options.events, c = b.length; c--;) b[c]._id === a && b.splice(c, 1)
            }, j.prototype.getMonth = function (a, b, c) {
        var d = new Date((+a), +b - 1, 1),
            e = a + "-" + b + (c ? "-" + c : ""),
            f = this.html[e] || h(d, c, this);
        return this.options.useCache && (this.html[e] = f), {
            html: f,
            date: e
        }
    }, j.prototype.getWeekNumber = f, j.prototype.convertDateString = e, j
}),
    function (a, b) {
    "object" == typeof exports ? module.exports = b(a, require("calendar")) : "function" == typeof define && define.amd ? define("datePicker", ["calendar"], function (c) {
        return b(a, c)
    }) : a.DatePicker = b(a, a.Calendar)
}(this, function (a, b, c) {
    "use strict";

    function d(a, d) {
        for (var h = d.path || [{}], j = d.target, k = a.options, m = "datePicker"; !d.path && j;) h.push(j), j = j.parentNode;
        if ([].indexOf.call(k.elements, d.target) !== -1) {
            if (a.isOpen && "focus" !== d.type) return;
            a.datePicker || (a.calendar = new b(k), a.calendar.picker = a, a.datePicker = g(a, k, a.calendar)), a.calendar.removeEvent(m), a.date = e(a, k, d.target), a.isOpen = !0, a.toggled = a.currentInput !== d.target, a.currentInput = d.target, a.currentPartner = l(a, d.target), a.currentDate = r(s(a.date)), f(a, k, d.target, a.currentPartner, m), i(a, d.target, a.date), a.toggled = !1
        } else a.isOpen && a.datePicker && h.indexOf(a.datePicker) === -1 && 1 !== h[h.length - 1].nodeType && (a.isOpen = !1, a.toggled = !0, n(a), a.calendar.removeEvent(m), a.currentInput = a.currentPartner = a.currentDate = a.date = c)
            }

    function e(a, b, d) {
        var e = b.readValue.call(a, d),
            f = r(e || t(new Date, !0)),
            g = d.getAttribute(b.timeFormatAttribute),
            h = !1,
            i = !1;
        return g = null !== g ? g : b.timeFormat, !e && g ? (h = /\s+(?:A|P)M/.test(g), i = h ? +f.hour >= 12 : c, f.second = /:SS/.test(g) ? f.second : c, f.AMPM = h ? i ? "PM" : "AM" : c, f.hour = h && i ? y(12 === +f.hour ? 12 : +f.hour - 12) : f.hour) : e || g || (f.hour = c), f
    }

    function f(a, b, d, e, f) {
        var g = [d.getAttribute(b.minDateAttribute) || b.minDate, d.getAttribute(b.maxDateAttribute) || b.maxDate, e && e.value.split(" ")[0]];
        g = g[2] ? q(g[2], e.hasAttribute(b.rangeStartAttribute) ? g[1] : g[0]) : g, a.minDate = r(g[0]), a.maxDate = r(g[1]), o(a, c, g[0], f), o(a, g[1], c, f)
    }

    function g(a, b, c) {
        var d = c.options.template,
            e = b.body.appendChild(document.createElement("div"));
        return d.row = d.row.replace(/<(.*?)>/, "<$1 " + b.pickerAttribute + '="{{year}}-{{month}}-{{day}}">'), e.className = b.datePickerClass, v(e, "click", function (b) {
            j(a, b)
        }, !1, a), v(e, "change", function (b) {
            k(a, b)
        }, !1, a), e
    }

    function h(a, b) {
        var c = a.minDate,
            d = a.maxDate,
            e = 0;
        return b.minMonth = +b.year <= +c.year ? +c.month : 1, b.maxMonth = +b.year >= +d.year ? +d.month : 12, e = +(b.year + b.month), b.isMinDate = e <= +(c.year + c.month), b.isMaxDate = e >= +(d.year + d.month), b.isMinDate ? (b.year = c.year, b.month = c.month) : b.isMaxDate && (b.year = d.year, b.month = d.month), b
    }

    function i(a, b, c) {
        var d = a.options,
            e = a.calendar,
            f = a.datePicker,
            g = {};
        c = h(a, c), f.innerHTML = (c.year ? d.header.replace("{{year}}", c.year).replace("{{years}}", u(+a.minDate.year, +a.maxDate.year, c.year)).replace("{{month}}", e.options.months[c.month - 1]).replace("{{months}}", u(c.minMonth, c.maxMonth, c.month, e.options.months, 1)).replace("{{day}}", c.day).replace("{{next}}", d.nextLabel).replace("{{prev}}", d.prevLabel).replace("{{disable-next}}", c.isMaxDate ? ' disabled=""' : "").replace("{{disable-prev}}", c.isMinDate ? ' disabled=""' : "") : "") + (c.year && c.day ? e.getMonth(c.year, c.month).html : "") + (c.hour && d.footer ? d.footer.replace("{{hour}}", c.hour).replace("{{hours}}", u(0, d.doAMPM || c.AMPM ? 12 : 24, c.hour)).replace("{{minute}}", " : " + c.minute).replace("{{minutes}}", u(0, 59, c.minute, null, null, d.minuteSteps)).replace("{{second}}", c.second ? " : " + c.second : "").replace("{{seconds}}", c.second ? u(0, 59, c.second, null, null, d.secondSteps) : "").replace("{{am-pm}}", c.AMPM || "").replace("{{am-pms}}", c.AMPM ? u(0, 1, d.AMPM.indexOf(c.AMPM), d.AMPM) : "") : ""), g = f.querySelector("[" + d.pickerAttribute + '="' + s(a.currentDate, !0).replace(/-0/g, "-") + '"]'), g && (g.className += " " + d.selectedDayClass), n(a)
    }

    function j(a, b) {
        for (var c = a.options, d = "", e = a.date, f = b.target, g = x(b.target, c.prevButtonClass), h = !g && x(b.target, c.nextButtonClass); !g && !h && f !== document.body && !(d = f.getAttribute(c.pickerAttribute));) f = f.parentNode;
        d && !x(f, c.disabledClass) ? (d = r(d), e.year = d.year, e.month = d.month, e.day = d.day, m(a), a.toggle(!c.closeOnSelect)) : (g || h) && (b.stopPropagation(), e.month = +e.month + (g ? -1 : h ? 1 : 0), e.year = 0 === e.month ? y(+e.year - 1) : 13 === e.month ? y(+e.year + 1) : e.year, e.month = 0 === e.month ? "12" : 13 === e.month ? "01" : y(e.month), e.day || m(a), i(a, a.currentInput, e))
    }

    function k(a, b) {
        for (var c = a.date, d = ["year", "month", "hour", "minute", "second", "AMPM"], e = "";
             (e = d.shift()) && !x(b.target, a.options["select" + e.charAt(0).toUpperCase() + e.slice(1) + "Class"]););
        c[e] = "AMPM" === e ? a.options.AMPM[b.target.value] : y(b.target.value), !/^(?:ho|mi|se|AM)/.test(e) && c.day || (a.currentDate[e] = c[e], m(a, s(c.day ? a.currentDate : a.date))), i(a, a.currentInput, c)
    }

    function l(a, b) {
        for (var c = a.options, d = b.getAttribute(c.rangeStartAttribute) || b.getAttribute(c.rangeEndAttribute), e = document.querySelectorAll("[" + c.rangeStartAttribute + '="' + d + '"],[' + c.rangeEndAttribute + '="' + d + '"],[name="' + d + '"]'), f = e.length; f--;)
            if (e[f] && e[f] !== b) return e[f]
                }

    function m(a, b) {
        var c = b || s(a.date),
            d = a.options.renderValue.call(a, a.datePicker, a.currentInput, c),
            e = d && 1 === d.nodeType ? d : a.currentInput;
        d && (e.value = c)
    }

    function n(b) {
        var c = b.options.renderCallback.call(b, b.datePicker, b.currentInput, b.toggled),
            d = c && 1 === c.nodeType ? c : b.currentInput,
            e = {};
        c && (e = d.getBoundingClientRect(), b.datePicker.style.cssText = b.isOpen ? "left:" + (a.pageXOffset + e.left) + "px;top:" + (a.pageYOffset + d.offsetHeight + e.top) + "px;" : "display: none")
    }

    function o(a, b, c, d) {
        a.calendar.addEvent({
            className: a.options.disabledClass,
            type: a.options.disabledClass,
            isLimiter: !0,
            start: b ? p(a, b, 1) : b,
            end: c ? p(a, c, -1, !0) : c
        }, d)
    }

    function p(a, b, c, d) {
        return b = a.calendar.convertDateString(b, d), b.setDate(b.getDate() + c), t(b)
    }

    function q(a, b) {
        return a < b ? [a || b, b] : [b, a]
    }

    function r(a) {
        return a = ((a.indexOf("-") !== -1 ? "" : "--- ") + a).split(/(?:\s+|T)/), a[0] = a[0].split("-"), a[1] = (a[1] || "").split(":"), {
            year: a[0][0],
            month: y(a[0][1]),
            day: y(a[0][2]),
            hour: y(a[1][0]),
            minute: y(a[1][1]),
            second: y(a[1][2]),
            AMPM: a[2]
        }
    }

    function s(a, b) {
        return (a.year ? a.year + "-" + a.month + (a.day ? "-" + a.day : "") : "") + (a.hour && !b ? (a.year ? " " : "") + a.hour + ":" + a.minute + (a.second ? ":" + a.second : "") + (a.AMPM ? " " + a.AMPM : "") : "")
    }

    function t(a, b) {
        return a.getFullYear() + "-" + y(a.getMonth() + 1) + "-" + y(a.getDate()) + (b ? " " + a.toTimeString().split(" ")[0] : "")
    }

    function u(a, b, c, d, e, f) {
        for (var g = []; a <= b; a += f || 1) g.push('<option value="' + a + '"' + (+c === a ? " selected" : "") + ">" + (d ? d[a - (e || 0)] : a) + "</option>");
        return g.join("")
    }

    function v(a, b, c, d, e) {
        v.events = v.events || [], v.events.push({
            e: a,
            t: b,
            f: c,
            c: d,
            i: e || this
        }), a.addEventListener(b, c, d)
    }

    function w(a) {
        for (var b = {}, c = (v.events || []).length; c--;) b = v.events[c], b.i === (a || this) && (b.e.removeEventListener(b.t, b.f, b.c), v.events.splice(c, 1))
            }

    function x(a, b) {
        return (" " + a.className + " ").indexOf(" " + b + " ") !== -1
    }

    function y(a) {
        return a ? (+a + "").replace(/^(\d)$/, "0$1") : c
    }
    var z = function (a, b) {
        this.options = {
            useCache: !1,
            closeOnSelect: !0,
            elements: [],
            body: document.body,
            pickerAttribute: "data-picker",
            datePickerClass: "date-picker",
            selectedDayClass: "selected-day",
            disabledClass: "disabled",
            initCallback: function (a) {},
            renderCallback: function (a, b, c) {
                return !0
            },
            renderValue: function (a, b, c) {
                return !0
            },
            readValue: function (a) {
                return a.value
            },
            header: '<div class="dp-title"><button class="dp-prev" type="button"{{disable-prev}}>{{prev}}</button><button class="dp-next" type="button"{{disable-next}}>{{next}}</button><div class="dp-label dp-label-month">{{month}}<select class="dp-select dp-select-month" tabindex="-1">{{months}}</select></div><div class="dp-label dp-label-year">{{year}}<select class="dp-select dp-select-year" tabindex="-1">{{years}}</select></div></div>',
            nextLabel: "Next month",
            prevLabel: "Previous month",
            minDate: "2000-11-18",
            maxDate: "2050-12-31",
            minDateAttribute: "data-mindate",
            maxDateAttribute: "data-maxdate",
            nextButtonClass: "dp-next",
            prevButtonClass: "dp-prev",
            selectYearClass: "dp-select-year",
            selectMonthClass: "dp-select-month",
            footer: '<div class="dp-footer"><div class="dp-label">{{hour}}<select class="dp-select dp-select-hour" tabindex="-1">{{hours}}</select></div><div class="dp-label">{{minute}}<select class="dp-select dp-select-minute" tabindex="-1">{{minutes}}</select></div><div class="dp-label">{{second}}<select class="dp-select dp-select-second" tabindex="-1">{{seconds}}</select></div><div class="dp-label">{{am-pm}}<select class="dp-select dp-select-am-pm" tabindex="-1">{{am-pms}}</select></div></div>',
            timeFormat: "",
            timeFormatAttribute: "data-timeformat",
            doAMPM: !1,
            minuteSteps: 5,
            secondSteps: 10,
            AMPM: ["AM", "PM"],
            selectHourClass: "dp-select-hour",
            selectMinuteClass: "dp-select-minute",
            selectSecondClass: "dp-select-second",
            selectAMPMClass: "dp-select-am-pm",
            rangeStartAttribute: "data-from",
            rangeEndAttribute: "data-to"
        }, A(this, a || [], b || {})
    },
        A = function (b, e, f) {
            var g = function (a) {
                d(b, a)
            };
            f.elements = "string" == typeof e ? document.querySelectorAll(e) : e;
            for (var h in f) b.options[h] = f[h];
            v(a, "resize", function (a) {
                b.toggled = c, b.isOpen && n(b)
            }, !1, b), v(document.body, "focus", g, !0, b), v(document.body, "click", g, !1, b), b.options.initCallback.call(b, f.elements)
        };
    return z.prototype.destroy = function () {
        w(this), this.datePicker && this.datePicker.parentNode.removeChild(this.datePicker);
        for (var a in this) this[a] = null
            }, z.prototype.toggle = function (a, b) {
        a && a.year !== c ? i(this, b || this.currentInput, a) : d(this, a ? {
            target: b || this.currentInput,
            type: "focus"
        } : {})
    }, z
}),
    function (a, b) {
    "object" == typeof exports ? module.exports = b(a, require("jquery"), require("datePicker")) : "function" == typeof define && define.amd ? define(["jquery", "datePicker"], function (c, d) {
        return b(a, c, d)
    }) : b(a, a.jQuery, a.DatePicker)
}(this, function (a, b, c, d) {
    "use strict";
    b.fn.datePicker = function (a) {
        return this.datePicker = new c(this, a), this
    }
});
//# sourceMappingURL=jqDatePicker.min.js.map