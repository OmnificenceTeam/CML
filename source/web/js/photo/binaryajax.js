var BinaryFile = function (f, c, b) {
    var d = f;
    var a = c || 0;
    var e = 0;
    this.getRawData = function () {
        return d
    };
    if (typeof f == "string") {
        e = b || d.length;
        this.getByteAt = function (g) {
            return d.charCodeAt(g + a) & 255
        };
        this.getBytesAt = function (k, j) {
            var g = [];
            for (var h = 0; h < j; h++) {
                g[h] = d.charCodeAt((k + h) + a) & 255
            }
            return g
        }
    } else {
        if (typeof f == "unknown") {
            e = b || IEBinary_getLength(d);
            this.getByteAt = function (g) {
                return IEBinary_getByteAt(d, g + a)
            };
            this.getBytesAt = function (h, g) {
                return new VBArray(IEBinary_getBytesAt(d, h + a, g)).toArray()
            }
        }
    }
    this.getLength = function () {
        return e
    };
    this.getSByteAt = function (h) {
        var g = this.getByteAt(h);
        if (g > 127) {
            return g - 256
        } else {
            return g
        }
    };
    this.getShortAt = function (i, g) {
        var h = g ? (this.getByteAt(i) << 8) + this.getByteAt(i + 1) : (this.getByteAt(i + 1) << 8) + this.getByteAt(i);
        if (h < 0) {
            h += 65536
        }
        return h
    };
    this.getSShortAt = function (i, h) {
        var g = this.getShortAt(i, h);
        if (g > 32767) {
            return g - 65536
        } else {
            return g
        }
    };
    this.getLongAt = function (l, h) {
        var k = this.getByteAt(l),
            j = this.getByteAt(l + 1),
            i = this.getByteAt(l + 2),
            g = this.getByteAt(l + 3);
        var m = h ? (((((k << 8) + j) << 8) + i) << 8) + g : (((((g << 8) + i) << 8) + j) << 8) + k;
        if (m < 0) {
            m += 4294967296
        }
        return m
    };
    this.getSLongAt = function (i, g) {
        var h = this.getLongAt(i, g);
        if (h > 2147483647) {
            return h - 4294967296
        } else {
            return h
        }
    };
    this.getStringAt = function (l, k) {
        var h = [];
        var g = this.getBytesAt(l, k);
        for (var i = 0; i < k; i++) {
            h[i] = String.fromCharCode(g[i])
        }
        return h.join("")
    };
    this.getCharAt = function (g) {
        return String.fromCharCode(this.getByteAt(g))
    };
    this.toBase64 = function () {
        return window.btoa(d)
    };
    this.fromBase64 = function (g) {
        d = window.atob(g)
    }
};
var BinaryAjax = (function () {
    function b() {
        var d = null;
        if (window.ActiveXObject) {
            d = new ActiveXObject("Microsoft.XMLHTTP")
        } else {
            if (window.XMLHttpRequest) {
                d = new XMLHttpRequest()
            }
        }
        return d
    }

    function c(g, d, f) {
        var e = b();
        if (e) {
            if (d) {
                if (typeof (e.onload) != "undefined") {
                    e.onload = function () {
                        if (e.status == "200") {
                            d(this)
                        } else {
                            if (f) {
                                f()
                            }
                        }
                        e = null
                    }
                } else {
                    e.onreadystatechange = function () {
                        if (e.readyState == 4) {
                            if (e.status == "200") {
                                d(this)
                            } else {
                                if (f) {
                                    f()
                                }
                            }
                            e = null
                        }
                    }
                }
            }
            e.open("HEAD", g, true);
            e.send(null)
        } else {
            if (f) {
                f()
            }
        }
    }

    function a(e, h, g, d, i, j) {
        var f = b();
        if (f) {
            var k = 0;
            if (d && !i) {
                k = d[0]
            }
            var l = 0;
            if (d) {
                l = d[1] - d[0] + 1
            }
            if (h) {
                if (typeof (f.onload) != "undefined") {
                    f.onload = function () {
                        if (f.status == "200" || f.status == "206" || f.status == "0") {
                            f.binaryResponse = new BinaryFile(f.responseText, k, l);
                            f.fileSize = j || f.getResponseHeader("Content-Length");
                            h(f)
                        } else {
                            if (g) {
                                g()
                            }
                        }
                        f = null
                    }
                } else {
                    f.onreadystatechange = function () {
                        if (f.readyState == 4) {
                            if (f.status == "200" || f.status == "206" || f.status == "0") {
                                var m = {
                                    status: f.status,
                                    binaryResponse: new BinaryFile(typeof f.responseBody == "unknown" ? f.responseBody : f.responseText, k, l),
                                    fileSize: j || f.getResponseHeader("Content-Length")
                                };
                                h(m)
                            } else {
                                if (g) {
                                    g()
                                }
                            }
                            f = null
                        }
                    }
                }
            }
            f.open("GET", e, true);
            if (f.overrideMimeType) {
                f.overrideMimeType("text/plain; charset=x-user-defined")
            }
            if (d && i) {
                f.setRequestHeader("Range", "bytes=" + d[0] + "-" + d[1])
            }
            f.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1970 00:00:00 GMT");
            f.send(null)
        } else {
            if (g) {
                g()
            }
        }
    }
    return function (g, d, f, e) {
        if (e) {
            c(g, function (j) {
                var l = parseInt(j.getResponseHeader("Content-Length"), 10);
                var k = j.getResponseHeader("Accept-Ranges");
                var i, h;
                i = e[0];
                if (e[0] < 0) {
                    i += l
                }
                h = i + e[1] - 1;
                a(g, d, f, [i, h], (k == "bytes"), l)
            })
        } else {
            a(g, d, f)
        }
    }
}());
document.write("<script type='text/vbscript'>\r\nFunction IEBinary_getByteAt(strBinary, iOffset)\r\n	IEBinary_getByteAt = AscB(MidB(strBinary, iOffset + 1, 1))\r\nEnd Function\r\nFunction IEBinary_getBytesAt(strBinary, iOffset, iLength)\r\n  Dim aBytes()\r\n  ReDim aBytes(iLength - 1)\r\n  For i = 0 To iLength - 1\r\n   aBytes(i) = IEBinary_getByteAt(strBinary, iOffset + i)\r\n  Next\r\n  IEBinary_getBytesAt = aBytes\r\nEnd Function\r\nFunction IEBinary_getLength(strBinary)\r\n	IEBinary_getLength = LenB(strBinary)\r\nEnd Function\r\n<\/script>\r\n");