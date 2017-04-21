var EXIF = {};
(function () {
    var h = false;
    EXIF.Tags = {
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubsecTime",
        37521: "SubsecTimeOriginal",
        37522: "SubsecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "ISOSpeedRatings",
        34856: "OECF",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRation",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        40965: "InteroperabilityIFDPointer",
        42016: "ImageUniqueID"
    };
    EXIF.TiffTags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright"
    };
    EXIF.GPSTags = {
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential"
    };
    EXIF.StringValues = {
        ExposureProgram: {
            0: "Not defined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Not defined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        SceneType: {
            1: "Directly photographed"
        },
        CustomRendered: {
            0: "Normal process",
            1: "Custom process"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
        },
        FileSource: {
            3: "DSC"
        },
        Components: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
        }
    };

    function d(j, l, k) {
        if (j.addEventListener) {
            j.addEventListener(l, k, false)
        } else {
            if (j.attachEvent) {
                j.attachEvent("on" + l, k)
            }
        }
    }

    function c(j) {
        return !!(j.exifdata)
    }

    function e(k, j) {
        BinaryAjax(k.src, function (l) {
            var m = a(l.binaryResponse);
            k.exifdata = m || {};
            if (j) {
                j()
            }
        })
    }

    function a(m) {
        var j = [];
        if (m.getByteAt(0) != 255 || m.getByteAt(1) != 216) {
            return false
        }
        var l = 2;
        var k = m.getLength();
        while (l < k) {
            if (m.getByteAt(l) != 255) {
                if (h) {
                    console.log("Not a valid marker at offset " + l + ", found: " + m.getByteAt(l))
                }
                return false
            }
            var n = m.getByteAt(l + 1);
            if (n == 22400) {
                if (h) {
                    console.log("Found 0xFFE1 marker")
                }
                return g(m, l + 4, m.getShortAt(l + 2, true) - 2);
                l += 2 + m.getShortAt(l + 2, true)
            } else {
                if (n == 225) {
                    if (h) {
                        console.log("Found 0xFFE1 marker")
                    }
                    return g(m, l + 4, m.getShortAt(l + 2, true) - 2)
                } else {
                    l += 2 + m.getShortAt(l + 2, true)
                }
            }
        }
    }

    function f(q, n, s, k, p) {
        var j = q.getShortAt(s, p);
        var o = {};
        for (var l = 0; l < j; l++) {
            var r = s + l * 12 + 2;
            var m = k[q.getShortAt(r, p)];
            if (!m && h) {
                console.log("Unknown tag: " + q.getShortAt(r, p))
            }
            o[m] = b(q, r, n, s, p)
        }
        return o
    }

    function b(t, v, o, u, q) {
        var r = t.getShortAt(v + 2, q);
        var s = t.getLongAt(v + 4, q);
        var l = t.getLongAt(v + 8, q) + o;
        switch (r) {
            case 1:
            case 7:
                if (s == 1) {
                    return t.getByteAt(v + 8, q)
                } else {
                    var j = s > 4 ? l : (v + 8);
                    var p = [];
                    for (var k = 0; k < s; k++) {
                        p[k] = t.getByteAt(j + k)
                    }
                    return p
                }
                break;
            case 2:
                var m = s > 4 ? l : (v + 8);
                return t.getStringAt(m, s - 1);
                break;
            case 3:
                if (s == 1) {
                    return t.getShortAt(v + 8, q)
                } else {
                    var j = s > 2 ? l : (v + 8);
                    var p = [];
                    for (var k = 0; k < s; k++) {
                        p[k] = t.getShortAt(j + 2 * k, q)
                    }
                    return p
                }
                break;
            case 4:
                if (s == 1) {
                    return t.getLongAt(v + 8, q)
                } else {
                    var p = [];
                    for (var k = 0; k < s; k++) {
                        p[k] = t.getLongAt(l + 4 * k, q)
                    }
                    return p
                }
                break;
            case 5:
                if (s == 1) {
                    return t.getLongAt(l, q) / t.getLongAt(l + 4, q)
                } else {
                    var p = [];
                    for (var k = 0; k < s; k++) {
                        p[k] = t.getLongAt(l + 8 * k, q) / t.getLongAt(l + 4 + 8 * k, q)
                    }
                    return p
                }
                break;
            case 9:
                if (s == 1) {
                    return t.getSLongAt(v + 8, q)
                } else {
                    var p = [];
                    for (var k = 0; k < s; k++) {
                        p[k] = t.getSLongAt(l + 4 * k, q)
                    }
                    return p
                }
                break;
            case 10:
                if (s == 1) {
                    return t.getSLongAt(l, q) / t.getSLongAt(l + 4, q)
                } else {
                    var p = [];
                    for (var k = 0; k < s; k++) {
                        p[k] = t.getSLongAt(l + 8 * k, q) / t.getSLongAt(l + 4 + 8 * k, q)
                    }
                    return p
                }
                break
        }
    }

    function g(r, j, l) {
        if (r.getStringAt(j, 4) != "Exif") {
            if (h) {
                console.log("Not valid EXIF data! " + r.getStringAt(j, 4))
            }
            return false
        }
        var p;
        var m = j + 6;
        if (r.getShortAt(m) == 18761) {
            p = false
        } else {
            if (r.getShortAt(m) == 19789) {
                p = true
            } else {
                if (h) {
                    console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)")
                }
                return false
            }
        }
        if (r.getShortAt(m + 2, p) != 42) {
            if (h) {
                console.log("Not valid TIFF data! (no 0x002A)")
            }
            return false
        }
        if (r.getLongAt(m + 4, p) != 8) {
            if (h) {
                console.log("Not valid TIFF data! (First offset not 8)", r.getShortAt(m + 4, p))
            }
            return false
        }
        var o = f(r, m, m + 8, EXIF.TiffTags, p);
        if (o.ExifIFDPointer) {
            var q = f(r, m, m + o.ExifIFDPointer, EXIF.Tags, p);
            for (var n in q) {
                switch (n) {
                    case "LightSource":
                    case "Flash":
                    case "MeteringMode":
                    case "ExposureProgram":
                    case "SensingMethod":
                    case "SceneCaptureType":
                    case "SceneType":
                    case "CustomRendered":
                    case "WhiteBalance":
                    case "GainControl":
                    case "Contrast":
                    case "Saturation":
                    case "Sharpness":
                    case "SubjectDistanceRange":
                    case "FileSource":
                        q[n] = EXIF.StringValues[n][q[n]];
                        break;
                    case "ExifVersion":
                    case "FlashpixVersion":
                        q[n] = String.fromCharCode(q[n][0], q[n][1], q[n][2], q[n][3]);
                        break;
                    case "ComponentsConfiguration":
                        q[n] = EXIF.StringValues.Components[q[n][0]] + EXIF.StringValues.Components[q[n][1]] + EXIF.StringValues.Components[q[n][2]] + EXIF.StringValues.Components[q[n][3]];
                        break
                }
                o[n] = q[n]
            }
        }
        if (o.GPSInfoIFDPointer) {
            var k = f(r, m, m + o.GPSInfoIFDPointer, EXIF.GPSTags, p);
            for (var n in k) {
                switch (n) {
                    case "GPSVersionID":
                        k[n] = k[n][0] + "." + k[n][1] + "." + k[n][2] + "." + k[n][3];
                        break
                }
                o[n] = k[n]
            }
        }
        return o
    }
    EXIF.getData = function (k, j) {
        if (!k.complete) {
            return false
        }
        if (!c(k)) {
            e(k, j)
        } else {
            if (j) {
                j()
            }
        }
        return true
    };
    EXIF.getTag = function (k, j) {
        if (!c(k)) {
            return
        }
        return k.exifdata[j]
    };
    EXIF.getAllTags = function (l) {
        if (!c(l)) {
            return {}
        }
        var m = l.exifdata;
        var k = {};
        for (var j in m) {
            if (m.hasOwnProperty(j)) {
                k[j] = m[j]
            }
        }
        return k
    };
    EXIF.pretty = function (l) {
        if (!c(l)) {
            return ""
        }
        var m = l.exifdata;
        var k = "";
        for (var j in m) {
            if (m.hasOwnProperty(j)) {
                if (typeof m[j] == "object") {
                    k += j + " : [" + m[j].length + " values]\r\n"
                } else {
                    k += j + " : " + m[j] + "\r\n"
                }
            }
        }
        return k
    };
    EXIF.readFromBinaryFile = function (j) {
        return a(j)
    };

    function i() {
        var k = document.getElementsByTagName("img");
        for (var j = 0; j < k.length; j++) {
            if (k[j].getAttribute("exif") == "true") {
                if (!k[j].complete) {
                    d(k[j], "load", function () {
                        EXIF.getData(this)
                    })
                } else {
                    EXIF.getData(k[j])
                }
            }
        }
    }
    d(window, "load", i)
})();