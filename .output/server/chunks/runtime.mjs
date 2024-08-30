import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import vt, { Server as Server$1 } from 'node:http';
import Bs, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const { pathname } = parseURL(info.url || "/");
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new vt.Agent(agentOptions);
  const httpsAgent = new Bs.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
createFetch$1({ fetch, Headers: Headers$1, AbortController });

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "d0edfed5-9247-4a7d-bc74-21a94bbebe21",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "baseApiCMSUrl": "http://localhost:8108/api",
    "hostBaseUrl": "http://localhost:8108",
    "baseApiPortal": "http://localhost:8103/api"
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Users\\admin\\Documents\\GitHub\\finra_Capi\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2-uoq1oCgLlTqpdDX/iUbLy7J1Wic\"",
    "mtime": "2024-08-30T04:21:57.680Z",
    "size": 2,
    "path": "../public/robots.txt"
  },
  "/_nuxt/0oM6UeaO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45d6-oiyYg0W2nf5WyqKQSU0r+yJ8Cjw\"",
    "mtime": "2024-08-30T06:40:19.545Z",
    "size": 17878,
    "path": "../public/_nuxt/0oM6UeaO.js"
  },
  "/_nuxt/22Ks45e5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27e7-mp8PShmj2+HrnxaopWbzQq5LPSU\"",
    "mtime": "2024-08-30T06:40:19.545Z",
    "size": 10215,
    "path": "../public/_nuxt/22Ks45e5.js"
  },
  "/_nuxt/about1.DYJw-N59.png": {
    "type": "image/png",
    "etag": "\"18143d-8wL8G9lZ3glyc5VbkFRvJwpZHDA\"",
    "mtime": "2024-08-30T06:40:19.538Z",
    "size": 1578045,
    "path": "../public/_nuxt/about1.DYJw-N59.png"
  },
  "/_nuxt/aGAtPcTK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"76-RXI7nXg7+KQLbgjB7ghovNRemew\"",
    "mtime": "2024-08-30T06:40:19.541Z",
    "size": 118,
    "path": "../public/_nuxt/aGAtPcTK.js"
  },
  "/_nuxt/arrow.BDVLlJnA.png": {
    "type": "image/png",
    "etag": "\"28b4-f+N0a1ef0DlyvI3OVaFuXzWq6lk\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 10420,
    "path": "../public/_nuxt/arrow.BDVLlJnA.png"
  },
  "/_nuxt/BEvplj0U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19a-JACcqht52jdeOt1/jna6PMOqUKM\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 410,
    "path": "../public/_nuxt/BEvplj0U.js"
  },
  "/_nuxt/Bg0qK2rG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae9-Z4IPyzffb/dF1WEVaTOytZ/70l0\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 2793,
    "path": "../public/_nuxt/Bg0qK2rG.js"
  },
  "/_nuxt/bidv_logo.COiTvVpu.svg": {
    "type": "image/svg+xml",
    "etag": "\"2164-YZYOAw+Od4h5Xc/LIvYUiNiqk8Q\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 8548,
    "path": "../public/_nuxt/bidv_logo.COiTvVpu.svg"
  },
  "/_nuxt/B_eKUHAn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c5b-kcXFlAMkN2AyqkNwntX7ZM3IrVM\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 3163,
    "path": "../public/_nuxt/B_eKUHAn.js"
  },
  "/_nuxt/C3_OzwoU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ac-lplRaqGtpQ63ZMp9Bkr8pczKGGo\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 172,
    "path": "../public/_nuxt/C3_OzwoU.js"
  },
  "/_nuxt/C41YhD29.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b71-wAVxUxqbXBb5pkw1C8EindmTZJA\"",
    "mtime": "2024-08-30T06:40:19.545Z",
    "size": 7025,
    "path": "../public/_nuxt/C41YhD29.js"
  },
  "/_nuxt/CEVOeGI6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29f69-ugguat7L57wNqUvpAXB0FPlhDqg\"",
    "mtime": "2024-08-30T06:40:19.545Z",
    "size": 171881,
    "path": "../public/_nuxt/CEVOeGI6.js"
  },
  "/_nuxt/Cl1ioU9O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47888-CF0mn3FPQxCBjNgspy/+Ior9bY4\"",
    "mtime": "2024-08-30T06:40:19.545Z",
    "size": 293000,
    "path": "../public/_nuxt/Cl1ioU9O.js"
  },
  "/_nuxt/clound.B5oQCtjL.png": {
    "type": "image/png",
    "etag": "\"2c09-jRKgQAecHWIgchaCENiXpguf6aA\"",
    "mtime": "2024-08-30T06:40:19.533Z",
    "size": 11273,
    "path": "../public/_nuxt/clound.B5oQCtjL.png"
  },
  "/_nuxt/CmZhnKk7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1e-91plU+oIHon/wuuGu+6SkgZ0qyw\"",
    "mtime": "2024-08-30T06:40:19.544Z",
    "size": 3358,
    "path": "../public/_nuxt/CmZhnKk7.js"
  },
  "/_nuxt/CTzlUXOl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a4-3aqT4nhUIfA66dfykpKdNU3kNCs\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 164,
    "path": "../public/_nuxt/CTzlUXOl.js"
  },
  "/_nuxt/CUJJflJ5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e09-mk0xdszy513PWCstMd8NKuNrf5I\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 11785,
    "path": "../public/_nuxt/CUJJflJ5.js"
  },
  "/_nuxt/C_IzgoUR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e06-jScKFBFeDQYt2Bp8x1UepFsm8GU\"",
    "mtime": "2024-08-30T06:40:19.543Z",
    "size": 11782,
    "path": "../public/_nuxt/C_IzgoUR.js"
  },
  "/_nuxt/D8sp3El8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65-DRSyaDxrU1ascGdtj6GNEW8oLeQ\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 101,
    "path": "../public/_nuxt/D8sp3El8.js"
  },
  "/_nuxt/default.f2hyolzM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f8-n+ZwBg+eOLMAwSmqHBGOHmqTmIg\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 1272,
    "path": "../public/_nuxt/default.f2hyolzM.css"
  },
  "/_nuxt/DFCeLTEt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1431-w+JV8HX3sJlWMAEElzCYwQYPOcI\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 5169,
    "path": "../public/_nuxt/DFCeLTEt.js"
  },
  "/_nuxt/Dj6lD6A_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"70-spcAmsizwQ7fSx8NrH6YLaDnGIA\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 112,
    "path": "../public/_nuxt/Dj6lD6A_.js"
  },
  "/_nuxt/DjzSdiaA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"113-Q8yHQLiPnhLBZfel2AoY85gZDgg\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 275,
    "path": "../public/_nuxt/DjzSdiaA.js"
  },
  "/_nuxt/DmIAkvcd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"219-+Z5lfR6+Tp29cP/wf/qkWIfrKnI\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 537,
    "path": "../public/_nuxt/DmIAkvcd.js"
  },
  "/_nuxt/Dr2E9yr-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e33-h6xLtjZDB36CIIiEDA4jhFdVvT4\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 11827,
    "path": "../public/_nuxt/Dr2E9yr-.js"
  },
  "/_nuxt/error-404.DzR6_J7u.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-4stDWMEXC+k0LfXXt6c3KJM0XyU\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.DzR6_J7u.css"
  },
  "/_nuxt/error-500.CiTchFXo.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-l13P4nfqNbsZe/SD7lD8k+FnGYY\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.CiTchFXo.css"
  },
  "/_nuxt/f1_logo.BpUfssxC.svg": {
    "type": "image/svg+xml",
    "etag": "\"2679-gOsYkmQx+ph/91ZiO2DZbZqmxuY\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 9849,
    "path": "../public/_nuxt/f1_logo.BpUfssxC.svg"
  },
  "/_nuxt/index.-oW9s9d3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3ff-iSz3KdQkA4HZ3mFIflTY840RlQ0\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 1023,
    "path": "../public/_nuxt/index.-oW9s9d3.css"
  },
  "/_nuxt/index.BnV_WuET.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2a1-gV65KfK/2IgGQFjQei/N9JUcKtw\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 673,
    "path": "../public/_nuxt/index.BnV_WuET.css"
  },
  "/_nuxt/index.Cgpnvk0l.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5de-0/YlzduMyUABDfz3QgX0xL+K8hM\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 1502,
    "path": "../public/_nuxt/index.Cgpnvk0l.css"
  },
  "/_nuxt/index.DBJIoOXl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c8-dZ4qGltczDIFLMxj8Bu3zIwK01s\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 200,
    "path": "../public/_nuxt/index.DBJIoOXl.css"
  },
  "/_nuxt/index.DQn8mjgg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c8-Mcp26GSq5eZkgRqUtuc+XOs6x6Q\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 200,
    "path": "../public/_nuxt/index.DQn8mjgg.css"
  },
  "/_nuxt/index.DXbpjSW7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"143-8Ngp2W4aJBbdnyc8pTBPGCQOlUw\"",
    "mtime": "2024-08-30T06:40:19.537Z",
    "size": 323,
    "path": "../public/_nuxt/index.DXbpjSW7.css"
  },
  "/_nuxt/index.pA-eyeVz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c8-JPHRUXMDWOWnx2Bb2u6bfYIJq+k\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 200,
    "path": "../public/_nuxt/index.pA-eyeVz.css"
  },
  "/_nuxt/iphone.BCWdYaCf.png": {
    "type": "image/png",
    "etag": "\"26d0f-6TZJtIQESNhV+dUoHXmGUUKQEUA\"",
    "mtime": "2024-08-30T06:40:19.533Z",
    "size": 158991,
    "path": "../public/_nuxt/iphone.BCWdYaCf.png"
  },
  "/_nuxt/logo_wh.BzAx-18N.svg": {
    "type": "image/svg+xml",
    "etag": "\"419a-g+tNNOWLgmKcppIRc2C/MwKHDb8\"",
    "mtime": "2024-08-30T06:40:19.529Z",
    "size": 16794,
    "path": "../public/_nuxt/logo_wh.BzAx-18N.svg"
  },
  "/_nuxt/qTuUuwzK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24e9-VXMqIEcSdDnqc7JTQPgh17wrFbI\"",
    "mtime": "2024-08-30T06:40:19.542Z",
    "size": 9449,
    "path": "../public/_nuxt/qTuUuwzK.js"
  },
  "/_nuxt/shap_img.YpnqcsZ-.png": {
    "type": "image/png",
    "etag": "\"1a76a-I5Jn8KMUEd92gt/TtIrC2L+ICnI\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 108394,
    "path": "../public/_nuxt/shap_img.YpnqcsZ-.png"
  },
  "/_nuxt/star5.J7dUw4uj.png": {
    "type": "image/png",
    "etag": "\"2818-eDsxmVMyXD89tULYG6e1MpTtZ2A\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 10264,
    "path": "../public/_nuxt/star5.J7dUw4uj.png"
  },
  "/_nuxt/swiper-vue.Bs3d9ZnH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"458b-ZRgiK6Rdj9nnlxRPZg+qVlCBZ+k\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 17803,
    "path": "../public/_nuxt/swiper-vue.Bs3d9ZnH.css"
  },
  "/_nuxt/thunder.BT2ulupp.png": {
    "type": "image/png",
    "etag": "\"1f3a-j73MXYQ8lv1zLXwPdRdUPnFd7Ik\"",
    "mtime": "2024-08-30T06:40:19.534Z",
    "size": 7994,
    "path": "../public/_nuxt/thunder.BT2ulupp.png"
  },
  "/_nuxt/uo8GdZgK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34ba-YMTkAaIgsj31QjHV+3KXTAIMXzc\"",
    "mtime": "2024-08-30T06:40:19.543Z",
    "size": 13498,
    "path": "../public/_nuxt/uo8GdZgK.js"
  },
  "/_nuxt/ups_logo.Dbx9ziTU.svg": {
    "type": "image/svg+xml",
    "etag": "\"a7af8-CEuR4/waw2hnFsqwoIr9P9LYQCc\"",
    "mtime": "2024-08-30T06:40:19.536Z",
    "size": 686840,
    "path": "../public/_nuxt/ups_logo.Dbx9ziTU.svg"
  },
  "/resource/billboard_1200_600.jpg": {
    "type": "image/jpeg",
    "etag": "\"ae57b-GPnSkhGdIN7xDX/vKkV4CvXuVG4\"",
    "mtime": "2024-08-30T04:21:56.027Z",
    "size": 714107,
    "path": "../public/resource/billboard_1200_600.jpg"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-kDs+Hrsv17LtR2T1YDJ6+gF6je4\"",
    "mtime": "2024-08-30T06:40:24.532Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/resource/css/all.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"18f51-Sjn7yP+mX6WoQn0P40u4uRaUr3w\"",
    "mtime": "2024-08-30T04:21:56.028Z",
    "size": 102225,
    "path": "../public/resource/css/all.min.css"
  },
  "/resource/css/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2f95a-43KwX0sAj/LLGAc7XlzSZJVaDqY\"",
    "mtime": "2024-08-30T04:21:56.030Z",
    "size": 194906,
    "path": "../public/resource/css/bootstrap.min.css"
  },
  "/resource/css/up_style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"16b2c-srGiJOCE3i88A/9hIdKYDEZGv/g\"",
    "mtime": "2024-08-30T04:21:56.031Z",
    "size": 92972,
    "path": "../public/resource/css/up_style.css"
  },
  "/resource/fonts/icomoon.woff": {
    "type": "font/woff",
    "etag": "\"148c-e8RSSGsFvopqEtUKSZnAG0k6yqc\"",
    "mtime": "2024-08-30T04:21:56.178Z",
    "size": 5260,
    "path": "../public/resource/fonts/icomoon.woff"
  },
  "/resource/fonts/ProximaNova-Light.woff": {
    "type": "font/woff",
    "etag": "\"cc64-fABgqCw3WVkQZWHedyAZpXUzYNo\"",
    "mtime": "2024-08-30T04:21:56.166Z",
    "size": 52324,
    "path": "../public/resource/fonts/ProximaNova-Light.woff"
  },
  "/resource/fonts/ProximaNova-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"8594-/funNRXknkjyLWE1zH2VNl2WWCs\"",
    "mtime": "2024-08-30T04:21:56.167Z",
    "size": 34196,
    "path": "../public/resource/fonts/ProximaNova-Light.woff2"
  },
  "/resource/fonts/ProximaNova-LightIt.ttf": {
    "type": "font/ttf",
    "etag": "\"21f6c-XUvHnfK3q47sFASqJ5A+3D0nlk4\"",
    "mtime": "2024-08-30T04:21:56.168Z",
    "size": 139116,
    "path": "../public/resource/fonts/ProximaNova-LightIt.ttf"
  },
  "/resource/fonts/ProximaNova-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1fe4c-NGygON/mfNOu9gj9jcyqCrBLjuo\"",
    "mtime": "2024-08-30T04:21:56.170Z",
    "size": 130636,
    "path": "../public/resource/fonts/ProximaNova-Regular.ttf"
  },
  "/resource/fonts/ProximaNova-Regular.woff": {
    "type": "font/woff",
    "etag": "\"cc38-LQTBCsnrSHJP/wQaGVGfY1enG0E\"",
    "mtime": "2024-08-30T04:21:56.171Z",
    "size": 52280,
    "path": "../public/resource/fonts/ProximaNova-Regular.woff"
  },
  "/resource/fonts/ProximaNova-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"85e8-vZkdQ7BugbzUSdbj24bz8yZTKUc\"",
    "mtime": "2024-08-30T04:21:56.172Z",
    "size": 34280,
    "path": "../public/resource/fonts/ProximaNova-Regular.woff2"
  },
  "/resource/fonts/ProximaNova-Semibold.ttf": {
    "type": "font/ttf",
    "etag": "\"1fec8-EGCI04XjKjsDebeOyfVvxoRHLXQ\"",
    "mtime": "2024-08-30T04:21:56.175Z",
    "size": 130760,
    "path": "../public/resource/fonts/ProximaNova-Semibold.ttf"
  },
  "/resource/fonts/ProximaNova-Semibold.woff": {
    "type": "font/woff",
    "etag": "\"ca30-GZg//KLXxzhvB6BV+So1i5Uvguk\"",
    "mtime": "2024-08-30T04:21:56.177Z",
    "size": 51760,
    "path": "../public/resource/fonts/ProximaNova-Semibold.woff"
  },
  "/resource/fonts/ProximaNova-Semibold.woff2": {
    "type": "font/woff2",
    "etag": "\"83d0-s7P1dhvtQaZSa8siuQneSHX0MbI\"",
    "mtime": "2024-08-30T04:21:56.177Z",
    "size": 33744,
    "path": "../public/resource/fonts/ProximaNova-Semibold.woff2"
  },
  "/resource/fonts/sukhumvittadmai_bol-webfont.woff": {
    "type": "font/woff",
    "etag": "\"a880-8y0A3f7YQT2T0rEl6peD8cqM//w\"",
    "mtime": "2024-08-30T04:21:56.240Z",
    "size": 43136,
    "path": "../public/resource/fonts/sukhumvittadmai_bol-webfont.woff"
  },
  "/resource/fonts/sukhumvittadmai_med-webfont.woff": {
    "type": "font/woff",
    "etag": "\"adf4-9ieXBYKuR6W1LEkkJ4JrJoP4Gwc\"",
    "mtime": "2024-08-30T04:21:56.242Z",
    "size": 44532,
    "path": "../public/resource/fonts/sukhumvittadmai_med-webfont.woff"
  },
  "/resource/fonts/sukhumvittadmai_regular-webfont.woff": {
    "type": "font/woff",
    "etag": "\"a8e4-QvAKc/xcHDrUWBvzRGxHbt+a8Qk\"",
    "mtime": "2024-08-30T04:21:56.243Z",
    "size": 43236,
    "path": "../public/resource/fonts/sukhumvittadmai_regular-webfont.woff"
  },
  "/resource/webfonts/fa-brands-400.ttf": {
    "type": "font/ttf",
    "etag": "\"330e8-rLvni2OrMJzVYNxxKl3S1TAdFP8\"",
    "mtime": "2024-08-30T04:21:56.593Z",
    "size": 209128,
    "path": "../public/resource/webfonts/fa-brands-400.ttf"
  },
  "/resource/webfonts/fa-brands-400.woff2": {
    "type": "font/woff2",
    "etag": "\"1cc5c-w53XxxOYNwLekbCK4AsZSwvbkAg\"",
    "mtime": "2024-08-30T04:21:56.594Z",
    "size": 117852,
    "path": "../public/resource/webfonts/fa-brands-400.woff2"
  },
  "/resource/webfonts/fa-regular-400.ttf": {
    "type": "font/ttf",
    "etag": "\"10914-G+IiEASpz3UszcDvLH+iEyyu3uc\"",
    "mtime": "2024-08-30T04:21:56.599Z",
    "size": 67860,
    "path": "../public/resource/webfonts/fa-regular-400.ttf"
  },
  "/resource/webfonts/fa-regular-400.woff2": {
    "type": "font/woff2",
    "etag": "\"6330-jJMxvzY4cs2E8tEIm01y/CF4TL0\"",
    "mtime": "2024-08-30T04:21:56.600Z",
    "size": 25392,
    "path": "../public/resource/webfonts/fa-regular-400.woff2"
  },
  "/resource/webfonts/fa-solid-900.ttf": {
    "type": "font/ttf",
    "etag": "\"669ec-z8iV5YJ0qA2n/VvD1inHyRjXDi4\"",
    "mtime": "2024-08-30T04:21:56.608Z",
    "size": 420332,
    "path": "../public/resource/webfonts/fa-solid-900.ttf"
  },
  "/resource/webfonts/fa-solid-900.woff2": {
    "type": "font/woff2",
    "etag": "\"262f0-c+fqv3qK6b4UmoXRlsnz8mYikls\"",
    "mtime": "2024-08-30T04:21:56.610Z",
    "size": 156400,
    "path": "../public/resource/webfonts/fa-solid-900.woff2"
  },
  "/resource/webfonts/fa-v4compatibility.ttf": {
    "type": "font/ttf",
    "etag": "\"2a50-J6dGhc6P8XiiGZ8d6lZxUW5/Z/8\"",
    "mtime": "2024-08-30T04:21:56.611Z",
    "size": 10832,
    "path": "../public/resource/webfonts/fa-v4compatibility.ttf"
  },
  "/resource/webfonts/fa-v4compatibility.woff2": {
    "type": "font/woff2",
    "etag": "\"12b8-gng1uakv9QrLqO9fcA1dM5M956w\"",
    "mtime": "2024-08-30T04:21:56.612Z",
    "size": 4792,
    "path": "../public/resource/webfonts/fa-v4compatibility.woff2"
  },
  "/resource/js/bootstrap.bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13a76-u01cB+3gAUNiSt2uBzaqOlXYeew\"",
    "mtime": "2024-08-30T04:21:56.588Z",
    "size": 80502,
    "path": "../public/resource/js/bootstrap.bundle.min.js"
  },
  "/resource/js/jquery-1.9.1.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"169d9-oc4L+lB/I8xBSpp2NL1zuZS7OzU\"",
    "mtime": "2024-08-30T04:21:56.589Z",
    "size": 92633,
    "path": "../public/resource/js/jquery-1.9.1.min.js"
  },
  "/resource/images/about.jpg": {
    "type": "image/jpeg",
    "etag": "\"101471-Alrl8VTx92plHikRDtE0HSLEMpQ\"",
    "mtime": "2024-08-30T04:21:56.423Z",
    "size": 1053809,
    "path": "../public/resource/images/about.jpg"
  },
  "/resource/images/acct-type-friends-family.png": {
    "type": "image/png",
    "etag": "\"21a7-Ltvu0vIIiSFjtsabbt+ILALjEow\"",
    "mtime": "2024-08-30T04:21:56.424Z",
    "size": 8615,
    "path": "../public/resource/images/acct-type-friends-family.png"
  },
  "/resource/images/acct-type-individual.png": {
    "type": "image/png",
    "etag": "\"135d-A7NEsl3sSdgDgChNgMpsphvzKCE\"",
    "mtime": "2024-08-30T04:21:56.424Z",
    "size": 4957,
    "path": "../public/resource/images/acct-type-individual.png"
  },
  "/resource/images/acct-type-institution.png": {
    "type": "image/png",
    "etag": "\"187d-nZTtx7QK51Zt5THUBiDjXDq0rzw\"",
    "mtime": "2024-08-30T04:21:56.425Z",
    "size": 6269,
    "path": "../public/resource/images/acct-type-institution.png"
  },
  "/resource/images/acct-type-joint.png": {
    "type": "image/png",
    "etag": "\"1c37-HwkvHi0xs0A2WRyKoXbUbIJFh3I\"",
    "mtime": "2024-08-30T04:21:56.425Z",
    "size": 7223,
    "path": "../public/resource/images/acct-type-joint.png"
  },
  "/resource/images/acct-type-retirement-ira.png": {
    "type": "image/png",
    "etag": "\"2432-zhx1xpEPhIWfRBsg5ZXwMT0L294\"",
    "mtime": "2024-08-30T04:21:56.426Z",
    "size": 9266,
    "path": "../public/resource/images/acct-type-retirement-ira.png"
  },
  "/resource/images/accumulate-distribute-set.jpg": {
    "type": "image/jpeg",
    "etag": "\"460b2-gR0auOA9bZX2y/uu6Mqd/81Zq5A\"",
    "mtime": "2024-08-30T04:21:56.429Z",
    "size": 286898,
    "path": "../public/resource/images/accumulate-distribute-set.jpg"
  },
  "/resource/images/ad-has-it-all.jpg": {
    "type": "image/jpeg",
    "etag": "\"13dce-ENOiU3ax35gGHvBeM/gGMcQuywQ\"",
    "mtime": "2024-08-30T04:21:56.430Z",
    "size": 81358,
    "path": "../public/resource/images/ad-has-it-all.jpg"
  },
  "/resource/images/ad-summary-985.jpg": {
    "type": "image/jpeg",
    "etag": "\"651a-0DPGK+GDb0IL7SWUVbkUFQFt8X4\"",
    "mtime": "2024-08-30T04:21:56.431Z",
    "size": 25882,
    "path": "../public/resource/images/ad-summary-985.jpg"
  },
  "/resource/images/ad-team-985.jpg": {
    "type": "image/jpeg",
    "etag": "\"a89e-80gWj3jBPhd+oejry5BQxZnV9M4\"",
    "mtime": "2024-08-30T04:21:56.431Z",
    "size": 43166,
    "path": "../public/resource/images/ad-team-985.jpg"
  },
  "/resource/images/ad-unpredictable.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fd0-j6/ONtu4PElbMgMczUab4TN7ht4\"",
    "mtime": "2024-08-30T04:21:56.432Z",
    "size": 85968,
    "path": "../public/resource/images/ad-unpredictable.jpg"
  },
  "/resource/images/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"17d0-9OFJUJxBnUEGth6R7v+sUArmpvs\"",
    "mtime": "2024-08-30T04:21:56.433Z",
    "size": 6096,
    "path": "../public/resource/images/android-chrome-192x192.png"
  },
  "/resource/images/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"42b1-7b67tzFUrR9getYM4Zndg6L5Kps\"",
    "mtime": "2024-08-30T04:21:56.434Z",
    "size": 17073,
    "path": "../public/resource/images/android-chrome-512x512.png"
  },
  "/resource/images/apple-download-app-store-blk-en.svg": {
    "type": "image/svg+xml",
    "etag": "\"2a62-HOPnvyhTpZ8Pya0GTh/UgmDaDzg\"",
    "mtime": "2024-08-30T04:21:56.435Z",
    "size": 10850,
    "path": "../public/resource/images/apple-download-app-store-blk-en.svg"
  },
  "/resource/images/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"16cc-lCmSEYd3mamVKSDtWT4kwju0AGs\"",
    "mtime": "2024-08-30T04:21:56.435Z",
    "size": 5836,
    "path": "../public/resource/images/apple-touch-icon.png"
  },
  "/resource/images/Arrow-right.svg": {
    "type": "image/svg+xml",
    "etag": "\"e9-n+5HIn2WcJdRe4jJmOWSuMirP3M\"",
    "mtime": "2024-08-30T04:21:56.407Z",
    "size": 233,
    "path": "../public/resource/images/Arrow-right.svg"
  },
  "/resource/images/arrow-scroll-up.png": {
    "type": "image/png",
    "etag": "\"595-bm9wVke3faz/5brDS1os9NzU/5Q\"",
    "mtime": "2024-08-30T04:21:56.436Z",
    "size": 1429,
    "path": "../public/resource/images/arrow-scroll-up.png"
  },
  "/resource/images/award-2024-brokerchooser.png": {
    "type": "image/png",
    "etag": "\"183af-5wbPOz7GxA+LhF+ToUSolfeqa4o\"",
    "mtime": "2024-08-30T04:21:56.437Z",
    "size": 99247,
    "path": "../public/resource/images/award-2024-brokerchooser.png"
  },
  "/resource/images/award-2024-investopedia-best-for-advanced-traders.png": {
    "type": "image/png",
    "etag": "\"2641d-ecT2C3Xs/rfttnEeiLzWqnLRx4Q\"",
    "mtime": "2024-08-30T04:21:56.440Z",
    "size": 156701,
    "path": "../public/resource/images/award-2024-investopedia-best-for-advanced-traders.png"
  },
  "/resource/images/award-barrons-2023-best-online-broker.png": {
    "type": "image/png",
    "etag": "\"9a6d-1Bxb6xrV6RRKEHuFYKPuzHKomrw\"",
    "mtime": "2024-08-30T04:21:56.440Z",
    "size": 39533,
    "path": "../public/resource/images/award-barrons-2023-best-online-broker.png"
  },
  "/resource/images/awards-2024-nerdwallet-best-online-broker-advanced-traders.png": {
    "type": "image/png",
    "etag": "\"c33d-3RkxX8OfQX5Z8lUZxI2oIcvkFHY\"",
    "mtime": "2024-08-30T04:21:56.442Z",
    "size": 49981,
    "path": "../public/resource/images/awards-2024-nerdwallet-best-online-broker-advanced-traders.png"
  },
  "/resource/images/awards-2024-stockbrokers-professionaltrading.png": {
    "type": "image/png",
    "etag": "\"cf8e-kYGiZPPz6Rfz/ZxfwhTPq5wtMaw\"",
    "mtime": "2024-08-30T04:21:56.443Z",
    "size": 53134,
    "path": "../public/resource/images/awards-2024-stockbrokers-professionaltrading.png"
  },
  "/resource/images/banner-home-sp-dv.jpg": {
    "type": "image/jpeg",
    "etag": "\"15b0f0-2gLnO5c8aUJW3AglzviyIH6rr2E\"",
    "mtime": "2024-08-30T04:21:56.456Z",
    "size": 1421552,
    "path": "../public/resource/images/banner-home-sp-dv.jpg"
  },
  "/resource/images/banner_image.png": {
    "type": "image/png",
    "etag": "\"1dca69-lTfHN1MtLOMkPn33Exwp5H8/5Yc\"",
    "mtime": "2024-08-30T04:21:56.468Z",
    "size": 1952361,
    "path": "../public/resource/images/banner_image.png"
  },
  "/resource/images/beautiful-cryptocurrwncy-concept.png": {
    "type": "image/png",
    "etag": "\"83138-rmY5ax13aDUM4sHsPQ0KBPRKNik\"",
    "mtime": "2024-08-30T04:21:56.471Z",
    "size": 536888,
    "path": "../public/resource/images/beautiful-cryptocurrwncy-concept.png"
  },
  "/resource/images/browserconfig.xml": {
    "type": "application/xml",
    "etag": "\"ff-Txz9kN42Z2CaLRkBHbdEgYEy3/8\"",
    "mtime": "2024-08-30T04:21:56.472Z",
    "size": 255,
    "path": "../public/resource/images/browserconfig.xml"
  },
  "/resource/images/candlestick-bkgd.jpg": {
    "type": "image/jpeg",
    "etag": "\"28ef1-88Hig5TAZ4aUcQAOZRI+EXRV6f0\"",
    "mtime": "2024-08-30T04:21:56.474Z",
    "size": 167665,
    "path": "../public/resource/images/candlestick-bkgd.jpg"
  },
  "/resource/images/crd-global-access.svg": {
    "type": "image/svg+xml",
    "etag": "\"9e7-emL2L/Rjm+uUWiLUNzwNHKPT+EI\"",
    "mtime": "2024-08-30T04:21:56.475Z",
    "size": 2535,
    "path": "../public/resource/images/crd-global-access.svg"
  },
  "/resource/images/crd-low-cost.svg": {
    "type": "image/svg+xml",
    "etag": "\"ad2-BJkTvJlKmdbGaHRaxMIasMXPvGs\"",
    "mtime": "2024-08-30T04:21:56.475Z",
    "size": 2770,
    "path": "../public/resource/images/crd-low-cost.svg"
  },
  "/resource/images/crd-technology.svg": {
    "type": "image/svg+xml",
    "etag": "\"ba5-82uVs9+XLZuD2RU8iPwiGgUpuFU\"",
    "mtime": "2024-08-30T04:21:56.475Z",
    "size": 2981,
    "path": "../public/resource/images/crd-technology.svg"
  },
  "/resource/images/crd-vault-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"c53-aReHS/+diGiM+QTvY11DQvtyPZo\"",
    "mtime": "2024-08-30T04:21:56.476Z",
    "size": 3155,
    "path": "../public/resource/images/crd-vault-icon.svg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-lg-rtl.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b9f8-BvM7dlm7mwagNlK/Hd6oPWdG3iE\"",
    "mtime": "2024-08-30T04:21:56.477Z",
    "size": 113144,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-lg-rtl.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-lg.jpg": {
    "type": "image/jpeg",
    "etag": "\"9e3f-jinAxh32Yee0O9n+7bUsYT4q4BI\"",
    "mtime": "2024-08-30T04:21:56.478Z",
    "size": 40511,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-lg.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-lg.webp": {
    "type": "image/webp",
    "etag": "\"9090-FuFTbEai97j8PMxlbiIcHj2F+Oo\"",
    "mtime": "2024-08-30T04:21:56.478Z",
    "size": 37008,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-lg.webp"
  },
  "/resource/images/cta-ibkr-globaltrader-background-md-rtl.jpg": {
    "type": "image/jpeg",
    "etag": "\"128de-2/pYrucOS1bIIdpVw7DKMPwuH78\"",
    "mtime": "2024-08-30T04:21:56.479Z",
    "size": 75998,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-md-rtl.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-md.jpg": {
    "type": "image/jpeg",
    "etag": "\"67c6-u+fm560nH5IXcjAqViwhMs1eus0\"",
    "mtime": "2024-08-30T04:21:56.480Z",
    "size": 26566,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-md.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-md.webp": {
    "type": "image/webp",
    "etag": "\"65c2-GAURfTkOviMb+LnyTVUJEk+5Tw0\"",
    "mtime": "2024-08-30T04:21:56.482Z",
    "size": 26050,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-md.webp"
  },
  "/resource/images/cta-ibkr-globaltrader-background-sm-rtl.jpg": {
    "type": "image/jpeg",
    "etag": "\"a327-oo4eH96Qjcj1EasggzaCJxOa4HE\"",
    "mtime": "2024-08-30T04:21:56.483Z",
    "size": 41767,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-sm-rtl.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-sm.jpg": {
    "type": "image/jpeg",
    "etag": "\"378b-w5fhpotexcnjhgjUCF4POcmkuBQ\"",
    "mtime": "2024-08-30T04:21:56.484Z",
    "size": 14219,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-sm.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-sm.webp": {
    "type": "image/webp",
    "etag": "\"3ab6-4V/sLNPqgrENNhXUHqj8u0Ddr4A\"",
    "mtime": "2024-08-30T04:21:56.485Z",
    "size": 15030,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-sm.webp"
  },
  "/resource/images/cta-ibkr-globaltrader-background-xl-rtl.jpg": {
    "type": "image/jpeg",
    "etag": "\"24ffc-d7eEz37DCAQ1CzMNeZFSUp0E844\"",
    "mtime": "2024-08-30T04:21:56.487Z",
    "size": 151548,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-xl-rtl.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-xl.jpg": {
    "type": "image/jpeg",
    "etag": "\"da29-EqwXGslgpBMFK63hQsCHFBk2skI\"",
    "mtime": "2024-08-30T04:21:56.489Z",
    "size": 55849,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-xl.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-xl.webp": {
    "type": "image/webp",
    "etag": "\"bc0c-EBdbQgdsp+/KaVk3A3xmgfbkYw4\"",
    "mtime": "2024-08-30T04:21:56.489Z",
    "size": 48140,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-xl.webp"
  },
  "/resource/images/cta-ibkr-globaltrader-background-xs-rtl.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c77-oArFuF1oKDDXrobpUr8GINmys4w\"",
    "mtime": "2024-08-30T04:21:56.491Z",
    "size": 27767,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-xs-rtl.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-xs.jpg": {
    "type": "image/jpeg",
    "etag": "\"24ed-5LEpw/HBcQxY1thEanUKBEqqszw\"",
    "mtime": "2024-08-30T04:21:56.491Z",
    "size": 9453,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-xs.jpg"
  },
  "/resource/images/cta-ibkr-globaltrader-background-xs.webp": {
    "type": "image/webp",
    "etag": "\"2638-KeN9T9qVby3HOkJo955KZ4aKEFE\"",
    "mtime": "2024-08-30T04:21:56.492Z",
    "size": 9784,
    "path": "../public/resource/images/cta-ibkr-globaltrader-background-xs.webp"
  },
  "/resource/images/cta-ibkr-mobile-background-lg.jpg": {
    "type": "image/jpeg",
    "etag": "\"ae19-i0AYDadTDaG0HsnSgm1n27h4C5k\"",
    "mtime": "2024-08-30T04:21:56.493Z",
    "size": 44569,
    "path": "../public/resource/images/cta-ibkr-mobile-background-lg.jpg"
  },
  "/resource/images/cta-ibkr-mobile-background-lg.webp": {
    "type": "image/webp",
    "etag": "\"78f6-LTtjsnvEQlS5iC1FGmst8+lW0Lc\"",
    "mtime": "2024-08-30T04:21:56.494Z",
    "size": 30966,
    "path": "../public/resource/images/cta-ibkr-mobile-background-lg.webp"
  },
  "/resource/images/cta-ibkr-mobile-background-md.jpg": {
    "type": "image/jpeg",
    "etag": "\"6f51-OuupaDKWADFaqgJpREjmoY+h4LU\"",
    "mtime": "2024-08-30T04:21:56.495Z",
    "size": 28497,
    "path": "../public/resource/images/cta-ibkr-mobile-background-md.jpg"
  },
  "/resource/images/cta-ibkr-mobile-background-md.webp": {
    "type": "image/webp",
    "etag": "\"55ec-IizsWjoq5s2pyHukxrLaKCZbihg\"",
    "mtime": "2024-08-30T04:21:56.495Z",
    "size": 21996,
    "path": "../public/resource/images/cta-ibkr-mobile-background-md.webp"
  },
  "/resource/images/cta-ibkr-mobile-background-sm.jpg": {
    "type": "image/jpeg",
    "etag": "\"3a22-V8v+YYTvUqc+DatRa9AAxYORHkw\"",
    "mtime": "2024-08-30T04:21:56.497Z",
    "size": 14882,
    "path": "../public/resource/images/cta-ibkr-mobile-background-sm.jpg"
  },
  "/resource/images/cta-ibkr-mobile-background-sm.webp": {
    "type": "image/webp",
    "etag": "\"32bc-jZxUfIjy5L8LjXle2ik6cG66eUQ\"",
    "mtime": "2024-08-30T04:21:56.498Z",
    "size": 12988,
    "path": "../public/resource/images/cta-ibkr-mobile-background-sm.webp"
  },
  "/resource/images/cta-ibkr-mobile-background-xl-rtl.jpg": {
    "type": "image/jpeg",
    "etag": "\"28f2a-mFtCyw4SjO+qeUXBhyVvojVmmPk\"",
    "mtime": "2024-08-30T04:21:56.500Z",
    "size": 167722,
    "path": "../public/resource/images/cta-ibkr-mobile-background-xl-rtl.jpg"
  },
  "/resource/images/cta-ibkr-mobile-background-xl.jpg": {
    "type": "image/jpeg",
    "etag": "\"ed65-f8iHkOQS9DgcD2ihR9GsWF5lXwk\"",
    "mtime": "2024-08-30T04:21:56.501Z",
    "size": 60773,
    "path": "../public/resource/images/cta-ibkr-mobile-background-xl.jpg"
  },
  "/resource/images/cta-ibkr-mobile-background-xl.webp": {
    "type": "image/webp",
    "etag": "\"a742-fVu7Rouz5RuIEamS98QdfhAziXg\"",
    "mtime": "2024-08-30T04:21:56.503Z",
    "size": 42818,
    "path": "../public/resource/images/cta-ibkr-mobile-background-xl.webp"
  },
  "/resource/images/cta-ibkr-mobile-background-xs-rtl.jpg": {
    "type": "image/jpeg",
    "etag": "\"7fca-Furu8cXUNgAGSRZF12YnqY28Phc\"",
    "mtime": "2024-08-30T04:21:56.503Z",
    "size": 32714,
    "path": "../public/resource/images/cta-ibkr-mobile-background-xs-rtl.jpg"
  },
  "/resource/images/cta-ibkr-mobile-background-xs.jpg": {
    "type": "image/jpeg",
    "etag": "\"24aa-ofXQehZ45aEPAuQaVQiB2kFd+qE\"",
    "mtime": "2024-08-30T04:21:56.504Z",
    "size": 9386,
    "path": "../public/resource/images/cta-ibkr-mobile-background-xs.jpg"
  },
  "/resource/images/cta-ibkr-mobile-background-xs.webp": {
    "type": "image/webp",
    "etag": "\"2128-eFznM4gxTDekaQ54oWQzDE1cX4k\"",
    "mtime": "2024-08-30T04:21:56.505Z",
    "size": 8488,
    "path": "../public/resource/images/cta-ibkr-mobile-background-xs.webp"
  },
  "/resource/images/cta-open-account-background-lg.jpg": {
    "type": "image/jpeg",
    "etag": "\"95ef-6Gji9bHQTxrjr0MFGeqCGPgz+Jw\"",
    "mtime": "2024-08-30T04:21:56.505Z",
    "size": 38383,
    "path": "../public/resource/images/cta-open-account-background-lg.jpg"
  },
  "/resource/images/cta-open-account-background-lg.webp": {
    "type": "image/webp",
    "etag": "\"afa8-BioSLy7YIz4ILtazWc0cDaYPE9Q\"",
    "mtime": "2024-08-30T04:21:56.506Z",
    "size": 44968,
    "path": "../public/resource/images/cta-open-account-background-lg.webp"
  },
  "/resource/images/cta-open-account-background-md.jpg": {
    "type": "image/jpeg",
    "etag": "\"5c73-KZxtzzA6Pp3tHlotLJ+gwhjBcKM\"",
    "mtime": "2024-08-30T04:21:56.507Z",
    "size": 23667,
    "path": "../public/resource/images/cta-open-account-background-md.jpg"
  },
  "/resource/images/cta-open-account-background-md.webp": {
    "type": "image/webp",
    "etag": "\"6ca8-lEP2xCeP+MxXtamJvXX0Ke/cROE\"",
    "mtime": "2024-08-30T04:21:56.508Z",
    "size": 27816,
    "path": "../public/resource/images/cta-open-account-background-md.webp"
  },
  "/resource/images/cta-open-account-background-sm.jpg": {
    "type": "image/jpeg",
    "etag": "\"30d1-GsyuaQ3Sn1KsDNbEn6EDnk3QDvw\"",
    "mtime": "2024-08-30T04:21:56.508Z",
    "size": 12497,
    "path": "../public/resource/images/cta-open-account-background-sm.jpg"
  },
  "/resource/images/cta-open-account-background-sm.webp": {
    "type": "image/webp",
    "etag": "\"367a-x8nGm7rDOsF8ygjEJNmv3aihyoQ\"",
    "mtime": "2024-08-30T04:21:56.509Z",
    "size": 13946,
    "path": "../public/resource/images/cta-open-account-background-sm.webp"
  },
  "/resource/images/cta-open-account-background-xl.jpg": {
    "type": "image/jpeg",
    "etag": "\"dca3-Y8zXEs9hMhspRxbgyNhFn+rnNw8\"",
    "mtime": "2024-08-30T04:21:56.509Z",
    "size": 56483,
    "path": "../public/resource/images/cta-open-account-background-xl.jpg"
  },
  "/resource/images/cta-open-account-background-xl.webp": {
    "type": "image/webp",
    "etag": "\"106b2-Tk80NRnSKt5vqq29LSDHTt0KfZs\"",
    "mtime": "2024-08-30T04:21:56.511Z",
    "size": 67250,
    "path": "../public/resource/images/cta-open-account-background-xl.webp"
  },
  "/resource/images/cta-open-account-background-xs.jpg": {
    "type": "image/jpeg",
    "etag": "\"20ca-/LkE02YX2u1nk2LQtKQ3yIgUU54\"",
    "mtime": "2024-08-30T04:21:56.511Z",
    "size": 8394,
    "path": "../public/resource/images/cta-open-account-background-xs.jpg"
  },
  "/resource/images/cta-open-account-background-xs.webp": {
    "type": "image/webp",
    "etag": "\"22ea-w2kefqcSsbVWmKOsKRkYOteOmqI\"",
    "mtime": "2024-08-30T04:21:56.512Z",
    "size": 8938,
    "path": "../public/resource/images/cta-open-account-background-xs.webp"
  },
  "/resource/images/Ellipse 787.png": {
    "type": "image/png",
    "etag": "\"502b-S32yHfaoP107Hz1cQFPptpr1tyk\"",
    "mtime": "2024-08-30T04:21:56.408Z",
    "size": 20523,
    "path": "../public/resource/images/Ellipse 787.png"
  },
  "/resource/images/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"32b-tHDa2mPv7dxRonXg/ntlRjvn3n0\"",
    "mtime": "2024-08-30T04:21:56.512Z",
    "size": 811,
    "path": "../public/resource/images/favicon-16x16.png"
  },
  "/resource/images/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"58a-3igTB3x2dlm9WparSvqi4WIPoK0\"",
    "mtime": "2024-08-30T04:21:56.512Z",
    "size": 1418,
    "path": "../public/resource/images/favicon-32x32.png"
  },
  "/resource/images/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-2VSuETxslCGUt1KjEJ5bQALDxes\"",
    "mtime": "2024-08-30T04:21:56.514Z",
    "size": 15086,
    "path": "../public/resource/images/favicon.ico"
  },
  "/resource/images/favicon.png": {
    "type": "image/png",
    "etag": "\"42b1-7b67tzFUrR9getYM4Zndg6L5Kps\"",
    "mtime": "2024-08-30T04:21:56.515Z",
    "size": 17073,
    "path": "../public/resource/images/favicon.png"
  },
  "/resource/images/finra_fav.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a8-FhyFrP7KMYQrMeqIV6HtARAsV4A\"",
    "mtime": "2024-08-30T04:21:56.516Z",
    "size": 1192,
    "path": "../public/resource/images/finra_fav.svg"
  },
  "/resource/images/futures-traders_1775907056.jpeg": {
    "type": "image/jpeg",
    "etag": "\"251b4-q+n8mtKlRDhTyMR/YNtNNA/8w7A\"",
    "mtime": "2024-08-30T04:21:56.517Z",
    "size": 151988,
    "path": "../public/resource/images/futures-traders_1775907056.jpeg"
  },
  "/resource/images/google-play-badge-blk-en.svg": {
    "type": "image/svg+xml",
    "etag": "\"17a3-RyG3+JUl/fl4msmN4qTdFQ13jfM\"",
    "mtime": "2024-08-30T04:21:56.518Z",
    "size": 6051,
    "path": "../public/resource/images/google-play-badge-blk-en.svg"
  },
  "/resource/images/hero-ad-light.jpg": {
    "type": "image/jpeg",
    "etag": "\"f043-HZ8nQoRoLG4fzovC41/JbpyATJI\"",
    "mtime": "2024-08-30T04:21:56.519Z",
    "size": 61507,
    "path": "../public/resource/images/hero-ad-light.jpg"
  },
  "/resource/images/hero-banner-home-ibkr-desktop-v07-mobile.jpg": {
    "type": "image/jpeg",
    "etag": "\"60f8-h5ZEvwpRacvkSpqTB15kbbwQkTk\"",
    "mtime": "2024-08-30T04:21:56.521Z",
    "size": 24824,
    "path": "../public/resource/images/hero-banner-home-ibkr-desktop-v07-mobile.jpg"
  },
  "/resource/images/hero-banner-home-ibkr-desktop-v07-tablet.jpg": {
    "type": "image/jpeg",
    "etag": "\"11bb8-h5yRIRPUaHqVFwWjaIQQJWcMY5k\"",
    "mtime": "2024-08-30T04:21:56.522Z",
    "size": 72632,
    "path": "../public/resource/images/hero-banner-home-ibkr-desktop-v07-tablet.jpg"
  },
  "/resource/images/hero-banner-home-margin-desktop.jpg": {
    "type": "image/jpeg",
    "etag": "\"d619-OZSIIENvQt5z9fZirctZRacv+eM\"",
    "mtime": "2024-08-30T04:21:56.525Z",
    "size": 54809,
    "path": "../public/resource/images/hero-banner-home-margin-desktop.jpg"
  },
  "/resource/images/hero-banner-home-margin-mobile.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f0c-7UZfX3uIXXgZWXcICyr7t1Hxzo4\"",
    "mtime": "2024-08-30T04:21:56.525Z",
    "size": 16140,
    "path": "../public/resource/images/hero-banner-home-margin-mobile.jpg"
  },
  "/resource/images/hero-banner-home-margin-tablet.jpg": {
    "type": "image/jpeg",
    "etag": "\"9434-LMzf5sLW81Fpw07b/ljDbnzUEt4\"",
    "mtime": "2024-08-30T04:21:56.526Z",
    "size": 37940,
    "path": "../public/resource/images/hero-banner-home-margin-tablet.jpg"
  },
  "/resource/images/hero-banner-home-overnight-trading-desktop.jpg": {
    "type": "image/jpeg",
    "etag": "\"33075-KnIqn4c78jH4N5YlKz041tO4j2E\"",
    "mtime": "2024-08-30T04:21:56.528Z",
    "size": 209013,
    "path": "../public/resource/images/hero-banner-home-overnight-trading-desktop.jpg"
  },
  "/resource/images/hero-banner-home-overnight-trading-mobile.jpg": {
    "type": "image/jpeg",
    "etag": "\"b62b-ZkGZlH2O0MkJxpa8Ndib/4FC+5U\"",
    "mtime": "2024-08-30T04:21:56.529Z",
    "size": 46635,
    "path": "../public/resource/images/hero-banner-home-overnight-trading-mobile.jpg"
  },
  "/resource/images/hero-banner-home-overnight-trading-tablet.jpg": {
    "type": "image/jpeg",
    "etag": "\"38af7-VBabt33wxonZCOcPx0675fdOkXk\"",
    "mtime": "2024-08-30T04:21:56.531Z",
    "size": 232183,
    "path": "../public/resource/images/hero-banner-home-overnight-trading-tablet.jpg"
  },
  "/resource/images/hero-banner-home-screener-world-map.jpg": {
    "type": "image/jpeg",
    "etag": "\"737f6-SpwSrkg04lHICSyXKfddmTZTdkU\"",
    "mtime": "2024-08-30T04:21:56.536Z",
    "size": 473078,
    "path": "../public/resource/images/hero-banner-home-screener-world-map.jpg"
  },
  "/resource/images/hero-margin.jpg": {
    "type": "image/jpeg",
    "etag": "\"192b1-Ejb0RKsFrM6KutseViEl88TXBYw\"",
    "mtime": "2024-08-30T04:21:56.539Z",
    "size": 103089,
    "path": "../public/resource/images/hero-margin.jpg"
  },
  "/resource/images/hero-universal-account-rtl.jpg": {
    "type": "image/jpeg",
    "etag": "\"3c17f-c0fL5cyqE8rPrZd5EzCQTNIhx5w\"",
    "mtime": "2024-08-30T04:21:56.541Z",
    "size": 246143,
    "path": "../public/resource/images/hero-universal-account-rtl.jpg"
  },
  "/resource/images/hero-universal-account.jpg": {
    "type": "image/jpeg",
    "etag": "\"4395f-DV61cu1rvrgFBm2PS/orj72mlpo\"",
    "mtime": "2024-08-30T04:21:56.545Z",
    "size": 276831,
    "path": "../public/resource/images/hero-universal-account.jpg"
  },
  "/resource/images/home-low-cost.jpg": {
    "type": "image/jpeg",
    "etag": "\"21f71-ABF6Ly/j5ZJVeo43jp9rhiQVlEI\"",
    "mtime": "2024-08-30T04:21:56.563Z",
    "size": 139121,
    "path": "../public/resource/images/home-low-cost.jpg"
  },
  "/resource/images/home-security.jpg": {
    "type": "image/jpeg",
    "etag": "\"2fe1b-dQzRTgNQHsM3LtjnY6YKrGbOo8o\"",
    "mtime": "2024-08-30T04:21:56.565Z",
    "size": 196123,
    "path": "../public/resource/images/home-security.jpg"
  },
  "/resource/images/IBKR-Desktop-laptop-web-shadow.png": {
    "type": "image/png",
    "etag": "\"4a8bd-iSbltEEDHj6i5H2cqLbHD1OnDGE\"",
    "mtime": "2024-08-30T04:21:56.412Z",
    "size": 305341,
    "path": "../public/resource/images/IBKR-Desktop-laptop-web-shadow.png"
  },
  "/resource/images/icon-language.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c1-7xZ5QuQ4oW1GPSxzLOgE1WQtZ68\"",
    "mtime": "2024-08-30T04:21:56.566Z",
    "size": 961,
    "path": "../public/resource/images/icon-language.svg"
  },
  "/resource/images/icon-margin-borrow.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e8-ZT8KbcXOWGPcsoD+ANwgdVbxRJo\"",
    "mtime": "2024-08-30T04:21:56.566Z",
    "size": 1256,
    "path": "../public/resource/images/icon-margin-borrow.svg"
  },
  "/resource/images/icon-margin-diversify.svg": {
    "type": "image/svg+xml",
    "etag": "\"3bf-UXopdG2K8OEflQN+hDR83JbfY1o\"",
    "mtime": "2024-08-30T04:21:56.566Z",
    "size": 959,
    "path": "../public/resource/images/icon-margin-diversify.svg"
  },
  "/resource/images/icon-margin-leverage.svg": {
    "type": "image/svg+xml",
    "etag": "\"289-XenMh5t9Ubl1UqHoJqlGJnFBsrA\"",
    "mtime": "2024-08-30T04:21:56.567Z",
    "size": 649,
    "path": "../public/resource/images/icon-margin-leverage.svg"
  },
  "/resource/images/icon-margin-loan.svg": {
    "type": "image/svg+xml",
    "etag": "\"550-bjnEqRnSqn93+GCCOmpBbNDwI0Q\"",
    "mtime": "2024-08-30T04:21:56.567Z",
    "size": 1360,
    "path": "../public/resource/images/icon-margin-loan.svg"
  },
  "/resource/images/icon_zalo.png": {
    "type": "image/png",
    "etag": "\"2b589-4c7K02Mx2qb2ZYv/WGlp8pfV40Q\"",
    "mtime": "2024-08-30T04:21:56.571Z",
    "size": 177545,
    "path": "../public/resource/images/icon_zalo.png"
  },
  "/resource/images/ig-chart-trading-margin-50-shares.png": {
    "type": "image/png",
    "etag": "\"9298-sMWQv6dT40LdsR7WmENobS9AsjI\"",
    "mtime": "2024-08-30T04:21:56.572Z",
    "size": 37528,
    "path": "../public/resource/images/ig-chart-trading-margin-50-shares.png"
  },
  "/resource/images/inifiltti.svg": {
    "type": "image/svg+xml",
    "etag": "\"e70-TosOaFTNxLib7Zfn+4SCj2Yh/OI\"",
    "mtime": "2024-08-30T04:21:56.573Z",
    "size": 3696,
    "path": "../public/resource/images/inifiltti.svg"
  },
  "/resource/images/logo-ctm.png": {
    "type": "image/png",
    "etag": "\"3458-rtj1DKSQhFNXK3wgd3WOIA9/NEI\"",
    "mtime": "2024-08-30T04:21:56.574Z",
    "size": 13400,
    "path": "../public/resource/images/logo-ctm.png"
  },
  "/resource/images/logo-up.png": {
    "type": "image/png",
    "etag": "\"5eef-bSWDeYsocfH9DwfXxyjbyrIjNIw\"",
    "mtime": "2024-08-30T04:21:56.575Z",
    "size": 24303,
    "path": "../public/resource/images/logo-up.png"
  },
  "/resource/images/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"41be-6ZLHh38AZtifP6zJrBxiW1vclKc\"",
    "mtime": "2024-08-30T04:21:56.576Z",
    "size": 16830,
    "path": "../public/resource/images/logo.svg"
  },
  "/resource/images/logo_ups_short.png": {
    "type": "image/png",
    "etag": "\"fe4-4pIDXdcEt5K+EQ6HT5RALikTnFY\"",
    "mtime": "2024-08-30T04:21:56.576Z",
    "size": 4068,
    "path": "../public/resource/images/logo_ups_short.png"
  },
  "/resource/images/map-point-closed.png": {
    "type": "image/png",
    "etag": "\"184-YlFg52eXQq9P1h1VdphEkNjYKxI\"",
    "mtime": "2024-08-30T04:21:56.577Z",
    "size": 388,
    "path": "../public/resource/images/map-point-closed.png"
  },
  "/resource/images/map-point.png": {
    "type": "image/png",
    "etag": "\"194-ngNpZgECmEjTjqstmHlm2lkXw9s\"",
    "mtime": "2024-08-30T04:21:56.577Z",
    "size": 404,
    "path": "../public/resource/images/map-point.png"
  },
  "/resource/images/map-solo-2245664933.png": {
    "type": "image/png",
    "etag": "\"d557-1usfdxKjKE4u9aRoctcm1fztQNE\"",
    "mtime": "2024-08-30T04:21:56.579Z",
    "size": 54615,
    "path": "../public/resource/images/map-solo-2245664933.png"
  },
  "/resource/images/margin-thumbnail-margin-infographic.jpg": {
    "type": "image/jpeg",
    "etag": "\"24978-5zhwnRJxkZe8al1OshEncnWpqd8\"",
    "mtime": "2024-08-30T04:21:56.582Z",
    "size": 149880,
    "path": "../public/resource/images/margin-thumbnail-margin-infographic.jpg"
  },
  "/resource/images/margin-thumbnail-video-rules-based-margin.jpg": {
    "type": "image/jpeg",
    "etag": "\"18b48-ss6WXD83YzLhTO/CoVANNceUGKM\"",
    "mtime": "2024-08-30T04:21:56.583Z",
    "size": 101192,
    "path": "../public/resource/images/margin-thumbnail-video-rules-based-margin.jpg"
  },
  "/resource/images/money_hand.svg": {
    "type": "image/svg+xml",
    "etag": "\"62ac-nDfQDwShEbtFQn5urY6O3qD10lc\"",
    "mtime": "2024-08-30T04:21:56.585Z",
    "size": 25260,
    "path": "../public/resource/images/money_hand.svg"
  },
  "/resource/images/mstile-150x150.png": {
    "type": "image/png",
    "etag": "\"bc1-iRpxA/KLgY6GrCfDsYhanOwo3Qg\"",
    "mtime": "2024-08-30T04:21:56.585Z",
    "size": 3009,
    "path": "../public/resource/images/mstile-150x150.png"
  },
  "/resource/images/pig-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"5be0-ZHh8Coc6dxA4eHD9EM6abYEQ4g0\"",
    "mtime": "2024-08-30T04:21:56.586Z",
    "size": 23520,
    "path": "../public/resource/images/pig-icon.svg"
  },
  "/resource/images/safari-pinned-tab.svg": {
    "type": "image/svg+xml",
    "etag": "\"cad-JDYMIkWCWhwLmhljh0PxNIrcOxA\"",
    "mtime": "2024-08-30T04:21:56.586Z",
    "size": 3245,
    "path": "../public/resource/images/safari-pinned-tab.svg"
  },
  "/resource/images/Search.svg": {
    "type": "image/svg+xml",
    "etag": "\"149-1JWsftEfzb8d6fWnjpAQk2wOxiw\"",
    "mtime": "2024-08-30T04:21:56.413Z",
    "size": 329,
    "path": "../public/resource/images/Search.svg"
  },
  "/resource/images/site.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"1bd-wm8fcq2Wj2AcKvqs51rnJVGIAlQ\"",
    "mtime": "2024-08-30T04:21:56.586Z",
    "size": 445,
    "path": "../public/resource/images/site.webmanifest"
  },
  "/resource1/common/css/common_style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b30b-PQQ378izFQC4cCrTo0fTMAitzSE\"",
    "mtime": "2024-08-30T04:21:56.614Z",
    "size": 45835,
    "path": "../public/resource1/common/css/common_style.css"
  },
  "/resource1/common/img/about1.png": {
    "type": "image/png",
    "etag": "\"18143d-8wL8G9lZ3glyc5VbkFRvJwpZHDA\"",
    "mtime": "2024-08-30T04:21:57.007Z",
    "size": 1578045,
    "path": "../public/resource1/common/img/about1.png"
  },
  "/resource1/common/img/arrow.png": {
    "type": "image/png",
    "etag": "\"28b4-f+N0a1ef0DlyvI3OVaFuXzWq6lk\"",
    "mtime": "2024-08-30T04:21:57.008Z",
    "size": 10420,
    "path": "../public/resource1/common/img/arrow.png"
  },
  "/resource1/common/img/arrow_lg.svg": {
    "type": "image/svg+xml",
    "etag": "\"c7-qbT6wSJtUAqNa2EpRpRBOHT8kMY\"",
    "mtime": "2024-08-30T04:21:57.008Z",
    "size": 199,
    "path": "../public/resource1/common/img/arrow_lg.svg"
  },
  "/resource1/common/img/bidv_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"2164-YZYOAw+Od4h5Xc/LIvYUiNiqk8Q\"",
    "mtime": "2024-08-30T04:21:57.009Z",
    "size": 8548,
    "path": "../public/resource1/common/img/bidv_logo.svg"
  },
  "/resource1/common/img/clound.png": {
    "type": "image/png",
    "etag": "\"2c09-jRKgQAecHWIgchaCENiXpguf6aA\"",
    "mtime": "2024-08-30T04:21:57.009Z",
    "size": 11273,
    "path": "../public/resource1/common/img/clound.png"
  },
  "/resource1/common/img/f1_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"2679-gOsYkmQx+ph/91ZiO2DZbZqmxuY\"",
    "mtime": "2024-08-30T04:21:57.009Z",
    "size": 9849,
    "path": "../public/resource1/common/img/f1_logo.svg"
  },
  "/resource1/common/img/facebook.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c3-FgV9FCJEfBrIio4/x0+z91YMSt8\"",
    "mtime": "2024-08-30T04:21:57.011Z",
    "size": 963,
    "path": "../public/resource1/common/img/facebook.svg"
  },
  "/resource1/common/img/frame_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"5f7-Q2KZ6mmh1OWQjlfvQg5gb/l4e7k\"",
    "mtime": "2024-08-30T04:21:57.013Z",
    "size": 1527,
    "path": "../public/resource1/common/img/frame_logo.svg"
  },
  "/resource1/common/img/heart.png": {
    "type": "image/png",
    "etag": "\"1ecf-kGFz4laZNHw+u3Pu7bdjWwYJ4BA\"",
    "mtime": "2024-08-30T04:21:57.013Z",
    "size": 7887,
    "path": "../public/resource1/common/img/heart.png"
  },
  "/resource1/common/img/iphone.png": {
    "type": "image/png",
    "etag": "\"26d0f-6TZJtIQESNhV+dUoHXmGUUKQEUA\"",
    "mtime": "2024-08-30T04:21:57.016Z",
    "size": 158991,
    "path": "../public/resource1/common/img/iphone.png"
  },
  "/resource1/common/img/logo_icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a8-9B0P5Lt3lYVwvurAP2EpANxGTvg\"",
    "mtime": "2024-08-30T04:21:57.017Z",
    "size": 1192,
    "path": "../public/resource1/common/img/logo_icon.svg"
  },
  "/resource1/common/img/logo_wh.svg": {
    "type": "image/svg+xml",
    "etag": "\"419a-g+tNNOWLgmKcppIRc2C/MwKHDb8\"",
    "mtime": "2024-08-30T04:21:57.017Z",
    "size": 16794,
    "path": "../public/resource1/common/img/logo_wh.svg"
  },
  "/resource1/common/img/menu_shaps1.png": {
    "type": "image/png",
    "etag": "\"2a25-HUNkz+sGG5cehx7810VEGPP2yMs\"",
    "mtime": "2024-08-30T04:21:57.018Z",
    "size": 10789,
    "path": "../public/resource1/common/img/menu_shaps1.png"
  },
  "/resource1/common/img/menu_shaps2.png": {
    "type": "image/png",
    "etag": "\"37f5-I6m5Mfi3Y4FJ/54xaBMlMbCcK90\"",
    "mtime": "2024-08-30T04:21:57.019Z",
    "size": 14325,
    "path": "../public/resource1/common/img/menu_shaps2.png"
  },
  "/resource1/common/img/shap_img.png": {
    "type": "image/png",
    "etag": "\"1a76a-I5Jn8KMUEd92gt/TtIrC2L+ICnI\"",
    "mtime": "2024-08-30T04:21:57.020Z",
    "size": 108394,
    "path": "../public/resource1/common/img/shap_img.png"
  },
  "/resource1/common/img/star5.png": {
    "type": "image/png",
    "etag": "\"2818-eDsxmVMyXD89tULYG6e1MpTtZ2A\"",
    "mtime": "2024-08-30T04:21:57.021Z",
    "size": 10264,
    "path": "../public/resource1/common/img/star5.png"
  },
  "/resource1/common/img/star_green.svg": {
    "type": "image/svg+xml",
    "etag": "\"30e-kBYRTEAM145SjLxCt7MWXHREcQk\"",
    "mtime": "2024-08-30T04:21:57.022Z",
    "size": 782,
    "path": "../public/resource1/common/img/star_green.svg"
  },
  "/resource1/common/img/star_purple.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f5-uxH9S95a5dKZFY/RrEG6kr+Vtv0\"",
    "mtime": "2024-08-30T04:21:57.023Z",
    "size": 757,
    "path": "../public/resource1/common/img/star_purple.svg"
  },
  "/resource1/common/img/thunder.png": {
    "type": "image/png",
    "etag": "\"1f3a-j73MXYQ8lv1zLXwPdRdUPnFd7Ik\"",
    "mtime": "2024-08-30T04:21:57.023Z",
    "size": 7994,
    "path": "../public/resource1/common/img/thunder.png"
  },
  "/resource1/common/img/ups_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"a7af8-CEuR4/waw2hnFsqwoIr9P9LYQCc\"",
    "mtime": "2024-08-30T04:21:57.027Z",
    "size": 686840,
    "path": "../public/resource1/common/img/ups_logo.svg"
  },
  "/resource1/common/img/youtube.svg": {
    "type": "image/svg+xml",
    "etag": "\"393-djeoX6A/CTw4UcVk1hKnQgO4OQY\"",
    "mtime": "2024-08-30T04:21:57.027Z",
    "size": 915,
    "path": "../public/resource1/common/img/youtube.svg"
  },
  "/resource1/common/img/zalo.svg": {
    "type": "image/svg+xml",
    "etag": "\"39ea2-s9y8GFJXmN56/vbqWo53ghi+vhA\"",
    "mtime": "2024-08-30T04:21:57.029Z",
    "size": 237218,
    "path": "../public/resource1/common/img/zalo.svg"
  },
  "/resource1/common/js/common_js.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d6d-EbCRl6R45uvZIek0HgoJ3t5sB98\"",
    "mtime": "2024-08-30T04:21:57.029Z",
    "size": 7533,
    "path": "../public/resource1/common/js/common_js.js"
  },
  "/_nuxt/builds/meta/d0edfed5-9247-4a7d-bc74-21a94bbebe21.json": {
    "type": "application/json",
    "etag": "\"8b-dq9y1u/vaGDff47434uw8smYBO8\"",
    "mtime": "2024-08-30T06:40:24.534Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/d0edfed5-9247-4a7d-bc74-21a94bbebe21.json"
  },
  "/resource/fonts/ttf/BricolageGrotesque-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c624-DEjDjJ+ExA0FdTsY8D5DCASr734\"",
    "mtime": "2024-08-30T04:21:56.245Z",
    "size": 116260,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque-Bold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1cd0c-ELaExUtdry3ZeIPR5CWxk9trCVc\"",
    "mtime": "2024-08-30T04:21:56.247Z",
    "size": 118028,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque-ExtraBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"1bb80-GwcSTvXq+aRZ8tIq/0pgjZAKPxw\"",
    "mtime": "2024-08-30T04:21:56.249Z",
    "size": 113536,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque-ExtraLight.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"1ca04-9vHDjoRjFNJMgzeKr1ZCV35y/d0\"",
    "mtime": "2024-08-30T04:21:56.251Z",
    "size": 117252,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque-Light.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"1c434-ALUnSKsPnW2ct8IO0fQifWevb1A\"",
    "mtime": "2024-08-30T04:21:56.254Z",
    "size": 115764,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque-Medium.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1c014-vRMRF1yBM1fT8SLPrBmRrL0kRRY\"",
    "mtime": "2024-08-30T04:21:56.256Z",
    "size": 114708,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque-Regular.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c868-hxBNVXPzO2o0dISDLAMFmljSAdI\"",
    "mtime": "2024-08-30T04:21:56.259Z",
    "size": 116840,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque-SemiBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12pt-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c6dc-x/uK6615uJ99ukQBLQfDt5zpPM8\"",
    "mtime": "2024-08-30T04:21:56.262Z",
    "size": 116444,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12pt-Bold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12pt-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1ccd4-vTdY7tlUstrzVMi88p90fpa9QkQ\"",
    "mtime": "2024-08-30T04:21:56.263Z",
    "size": 117972,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12pt-ExtraBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12pt-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"1bb44-BdheUeeteaRAlaRvlD/lc5Qbo70\"",
    "mtime": "2024-08-30T04:21:56.265Z",
    "size": 113476,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12pt-ExtraLight.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12pt-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"1ba64-mrfyRURMAcni/VvWYEZc+ebZM8s\"",
    "mtime": "2024-08-30T04:21:56.269Z",
    "size": 113252,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12pt-Light.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12pt-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"1c478-wP4xCWA6XblAV+1l6FpJyiPSaqA\"",
    "mtime": "2024-08-30T04:21:56.272Z",
    "size": 115832,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12pt-Medium.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12pt-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1c048-gnpg7ttYoSmOZyc1zZpDrP+0svQ\"",
    "mtime": "2024-08-30T04:21:56.274Z",
    "size": 114760,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12pt-Regular.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12pt-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c7e4-uLOZzb/1FSsvrHxn/4ZD7un2Tf0\"",
    "mtime": "2024-08-30T04:21:56.276Z",
    "size": 116708,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12pt-SemiBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12ptCondensed-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c9b0-SewFDKFgn8OzTz2AssBp9hLOZXE\"",
    "mtime": "2024-08-30T04:21:56.279Z",
    "size": 117168,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12ptCondensed-Bold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12ptCondensed-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c8dc-/eroExlOgWXAn3m//T5bNPdEr0o\"",
    "mtime": "2024-08-30T04:21:56.282Z",
    "size": 116956,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12ptCondensed-ExtraBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12ptCondensed-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"1baec-OKopa773zpjW7cWt5G3XrqP0o4g\"",
    "mtime": "2024-08-30T04:21:56.285Z",
    "size": 113388,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12ptCondensed-ExtraLight.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12ptCondensed-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"1c2c4-8q87aBGZglBeL7VGQ/OAliqxgEw\"",
    "mtime": "2024-08-30T04:21:56.287Z",
    "size": 115396,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12ptCondensed-Light.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12ptCondensed-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"1c2cc-IhGOl8GzShvJ8d7wK233Or/vWls\"",
    "mtime": "2024-08-30T04:21:56.289Z",
    "size": 115404,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12ptCondensed-Medium.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12ptCondensed-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1c0ac-w/xmVWPox4Zj3adwq/t05e7Q+SA\"",
    "mtime": "2024-08-30T04:21:56.291Z",
    "size": 114860,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12ptCondensed-Regular.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque12ptCondensed-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c4c4-7r1bwu9C65AXOhUOvyGzi5LcnuY\"",
    "mtime": "2024-08-30T04:21:56.294Z",
    "size": 115908,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque12ptCondensed-SemiBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96pt-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"1bfe8-N3S17Eep78Bk7bF7z4qkoGbLfu0\"",
    "mtime": "2024-08-30T04:21:56.297Z",
    "size": 114664,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96pt-Bold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96pt-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c70c-rqj9am6N2CDa3JU379bgkM2/vbA\"",
    "mtime": "2024-08-30T04:21:56.300Z",
    "size": 116492,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96pt-ExtraBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96pt-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"1c140-IvBZJIWwIqRAZBkKBr7qhGkNloY\"",
    "mtime": "2024-08-30T04:21:56.304Z",
    "size": 115008,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96pt-ExtraLight.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96pt-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"1bd58-jFMcTFNhExK3GmvQZJMZZJ9TZQE\"",
    "mtime": "2024-08-30T04:21:56.308Z",
    "size": 114008,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96pt-Light.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96pt-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"1c214-SizQ6CYa7pvWG61puloXz9KDz34\"",
    "mtime": "2024-08-30T04:21:56.310Z",
    "size": 115220,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96pt-Medium.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96pt-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1c570-0SVjYhGj2q2QGXoWZPZkQJutDew\"",
    "mtime": "2024-08-30T04:21:56.311Z",
    "size": 116080,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96pt-Regular.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96pt-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c0e0-qvRp3nYanPKZoefCaZV8UqmsJIE\"",
    "mtime": "2024-08-30T04:21:56.314Z",
    "size": 114912,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96pt-SemiBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96ptCondensed-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c714-Nb6Ou6HbaugWtRhrvNm14YMR/l0\"",
    "mtime": "2024-08-30T04:21:56.316Z",
    "size": 116500,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96ptCondensed-Bold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96ptCondensed-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1c6b8-qOqMhkHo3//KbRNNd6Eyd8Zm3cM\"",
    "mtime": "2024-08-30T04:21:56.317Z",
    "size": 116408,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96ptCondensed-ExtraBold.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96ptCondensed-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"1b96c-rvxziC4F4a/aTTyfCG4I07r8Wyc\"",
    "mtime": "2024-08-30T04:21:56.319Z",
    "size": 113004,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96ptCondensed-ExtraLight.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96ptCondensed-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"1c290-fe4FPPxE/C2XwN872wGEDREbpAA\"",
    "mtime": "2024-08-30T04:21:56.322Z",
    "size": 115344,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96ptCondensed-Light.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96ptCondensed-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"1bfe8-l5ItMvqZQXy8GebgeUa6zTSHSZs\"",
    "mtime": "2024-08-30T04:21:56.323Z",
    "size": 114664,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96ptCondensed-Medium.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96ptCondensed-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1bb48-/KjIgKJGEF5/xoL/JEf4RxiXcYU\"",
    "mtime": "2024-08-30T04:21:56.324Z",
    "size": 113480,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96ptCondensed-Regular.ttf"
  },
  "/resource/fonts/ttf/BricolageGrotesque96ptCondensed-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"1bf64-MVzGoDXT33+KIT3/1vmcdlunijM\"",
    "mtime": "2024-08-30T04:21:56.326Z",
    "size": 114532,
    "path": "../public/resource/fonts/ttf/BricolageGrotesque96ptCondensed-SemiBold.ttf"
  },
  "/resource/fonts/otf/BricolageGrotesque-Bold.otf": {
    "type": "font/otf",
    "etag": "\"1350c-bdvq2cPoPyg3OGs7D/UkGAPimL0\"",
    "mtime": "2024-08-30T04:21:56.180Z",
    "size": 79116,
    "path": "../public/resource/fonts/otf/BricolageGrotesque-Bold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque-ExtraBold.otf": {
    "type": "font/otf",
    "etag": "\"12e24-bCcXqbeRz6RmX0upY3/GlmzY8zM\"",
    "mtime": "2024-08-30T04:21:56.181Z",
    "size": 77348,
    "path": "../public/resource/fonts/otf/BricolageGrotesque-ExtraBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque-ExtraLight.otf": {
    "type": "font/otf",
    "etag": "\"12c00-eWX81b2PqvdCDY8WLyXQMnhxjFo\"",
    "mtime": "2024-08-30T04:21:56.182Z",
    "size": 76800,
    "path": "../public/resource/fonts/otf/BricolageGrotesque-ExtraLight.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque-Light.otf": {
    "type": "font/otf",
    "etag": "\"12fb8-24WRsDH5dxtjK65kOcDBwUBokGY\"",
    "mtime": "2024-08-30T04:21:56.184Z",
    "size": 77752,
    "path": "../public/resource/fonts/otf/BricolageGrotesque-Light.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque-Medium.otf": {
    "type": "font/otf",
    "etag": "\"12fec-DPJzTiCTgSdwpusaOxyswbPsvzM\"",
    "mtime": "2024-08-30T04:21:56.185Z",
    "size": 77804,
    "path": "../public/resource/fonts/otf/BricolageGrotesque-Medium.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque-Regular.otf": {
    "type": "font/otf",
    "etag": "\"13124-5Sbq98Um5LC/u4BkFYvKlV1J9Xc\"",
    "mtime": "2024-08-30T04:21:56.186Z",
    "size": 78116,
    "path": "../public/resource/fonts/otf/BricolageGrotesque-Regular.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque-SemiBold.otf": {
    "type": "font/otf",
    "etag": "\"13290-COY6v4h1tki9YBWaZg1f1Rzehz4\"",
    "mtime": "2024-08-30T04:21:56.187Z",
    "size": 78480,
    "path": "../public/resource/fonts/otf/BricolageGrotesque-SemiBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12pt-Bold.otf": {
    "type": "font/otf",
    "etag": "\"1332c-IOjaF90jnIvo4GPjtKMdeKu6HMA\"",
    "mtime": "2024-08-30T04:21:56.189Z",
    "size": 78636,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12pt-Bold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12pt-ExtraBold.otf": {
    "type": "font/otf",
    "etag": "\"1264c-9zZ1sJVNKAdWVYiwQ4NKem/iVNk\"",
    "mtime": "2024-08-30T04:21:56.189Z",
    "size": 75340,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12pt-ExtraBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12pt-ExtraLight.otf": {
    "type": "font/otf",
    "etag": "\"1268c-P6FNbZG6lp37YtayV0nNcBNTTfY\"",
    "mtime": "2024-08-30T04:21:56.191Z",
    "size": 75404,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12pt-ExtraLight.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12pt-Light.otf": {
    "type": "font/otf",
    "etag": "\"13188-7pFMidJZdYM6JNq3n72gV/8xHDA\"",
    "mtime": "2024-08-30T04:21:56.192Z",
    "size": 78216,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12pt-Light.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12pt-Medium.otf": {
    "type": "font/otf",
    "etag": "\"12d3c-zibhMS3RvubbeqgfxJxnuSf/92Y\"",
    "mtime": "2024-08-30T04:21:56.193Z",
    "size": 77116,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12pt-Medium.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12pt-Regular.otf": {
    "type": "font/otf",
    "etag": "\"12c90-UDFM2qezeqJavX9trPclab2stvo\"",
    "mtime": "2024-08-30T04:21:56.195Z",
    "size": 76944,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12pt-Regular.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12pt-SemiBold.otf": {
    "type": "font/otf",
    "etag": "\"12f30-UtyWm9sdzGGc7RTDDAVZZ+oCDAw\"",
    "mtime": "2024-08-30T04:21:56.196Z",
    "size": 77616,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12pt-SemiBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12ptCondensed-Bold.otf": {
    "type": "font/otf",
    "etag": "\"12e78-JYPgSprH/scHQGA/uDHRXikQcHg\"",
    "mtime": "2024-08-30T04:21:56.198Z",
    "size": 77432,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12ptCondensed-Bold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12ptCondensed-ExtraBold.otf": {
    "type": "font/otf",
    "etag": "\"12488-Dx4pwxjZ86iXkXKLYjA5m7IXnYA\"",
    "mtime": "2024-08-30T04:21:56.200Z",
    "size": 74888,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12ptCondensed-ExtraBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12ptCondensed-ExtraLight.otf": {
    "type": "font/otf",
    "etag": "\"12364-ZdfJu+DikdfBwDXF/iYcFAoEOTg\"",
    "mtime": "2024-08-30T04:21:56.200Z",
    "size": 74596,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12ptCondensed-ExtraLight.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12ptCondensed-Light.otf": {
    "type": "font/otf",
    "etag": "\"12abc-RSEnI/e8l3vFoS+0zp3O/xrwD7M\"",
    "mtime": "2024-08-30T04:21:56.202Z",
    "size": 76476,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12ptCondensed-Light.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12ptCondensed-Medium.otf": {
    "type": "font/otf",
    "etag": "\"128a8-Tjb8Mxk0Ujx1R+T9cGTA4U8rS1Y\"",
    "mtime": "2024-08-30T04:21:56.205Z",
    "size": 75944,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12ptCondensed-Medium.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12ptCondensed-Regular.otf": {
    "type": "font/otf",
    "etag": "\"12788-TJka5+R2N0DZok/2GDDb3kpzayY\"",
    "mtime": "2024-08-30T04:21:56.209Z",
    "size": 75656,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12ptCondensed-Regular.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque12ptCondensed-SemiBold.otf": {
    "type": "font/otf",
    "etag": "\"12a9c-sayYFvonck8k7xjg6m1yvmSolo0\"",
    "mtime": "2024-08-30T04:21:56.212Z",
    "size": 76444,
    "path": "../public/resource/fonts/otf/BricolageGrotesque12ptCondensed-SemiBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96pt-Bold.otf": {
    "type": "font/otf",
    "etag": "\"12f7c-atfSLxJgRUZHBIzJmcSnFOjOH0A\"",
    "mtime": "2024-08-30T04:21:56.214Z",
    "size": 77692,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96pt-Bold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96pt-ExtraBold.otf": {
    "type": "font/otf",
    "etag": "\"126c4-u4+7KnsJFwYJaRsVyE9Qu0Li4qc\"",
    "mtime": "2024-08-30T04:21:56.216Z",
    "size": 75460,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96pt-ExtraBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96pt-ExtraLight.otf": {
    "type": "font/otf",
    "etag": "\"12690-vsDk0K+kenO245YVEp865bQafTM\"",
    "mtime": "2024-08-30T04:21:56.217Z",
    "size": 75408,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96pt-ExtraLight.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96pt-Light.otf": {
    "type": "font/otf",
    "etag": "\"12e34-7wTFR/QWPilobG6cD6SBKOeIvks\"",
    "mtime": "2024-08-30T04:21:56.220Z",
    "size": 77364,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96pt-Light.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96pt-Medium.otf": {
    "type": "font/otf",
    "etag": "\"12a40-W2chjpzKF0srQMpS57SzXYwid3g\"",
    "mtime": "2024-08-30T04:21:56.222Z",
    "size": 76352,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96pt-Medium.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96pt-Regular.otf": {
    "type": "font/otf",
    "etag": "\"12d28-RId3Qn2d2+MPgbsmMs+VAWlt8Yk\"",
    "mtime": "2024-08-30T04:21:56.224Z",
    "size": 77096,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96pt-Regular.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96pt-SemiBold.otf": {
    "type": "font/otf",
    "etag": "\"12dd0-esCTzRlC6OXBTaGzOmVJEo9Iuko\"",
    "mtime": "2024-08-30T04:21:56.225Z",
    "size": 77264,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96pt-SemiBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96ptCondensed-Bold.otf": {
    "type": "font/otf",
    "etag": "\"12d6c-OhCsm8xqPb5kllIGPUwZFfbLtcc\"",
    "mtime": "2024-08-30T04:21:56.227Z",
    "size": 77164,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96ptCondensed-Bold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96ptCondensed-ExtraBold.otf": {
    "type": "font/otf",
    "etag": "\"122d8-RwJ3JH4/wPEwJpKvpgGwJIONeak\"",
    "mtime": "2024-08-30T04:21:56.229Z",
    "size": 74456,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96ptCondensed-ExtraBold.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96ptCondensed-ExtraLight.otf": {
    "type": "font/otf",
    "etag": "\"11fbc-pG7ajvxb/eJv3F+YfTgFhwmdvwQ\"",
    "mtime": "2024-08-30T04:21:56.231Z",
    "size": 73660,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96ptCondensed-ExtraLight.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96ptCondensed-Light.otf": {
    "type": "font/otf",
    "etag": "\"12ad4-eLbSV45gDgirEtyjfVOkeCQnK1A\"",
    "mtime": "2024-08-30T04:21:56.232Z",
    "size": 76500,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96ptCondensed-Light.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96ptCondensed-Medium.otf": {
    "type": "font/otf",
    "etag": "\"12740-3YD8ihbVlGN6djRBukuWmMkedoQ\"",
    "mtime": "2024-08-30T04:21:56.236Z",
    "size": 75584,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96ptCondensed-Medium.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96ptCondensed-Regular.otf": {
    "type": "font/otf",
    "etag": "\"12868-zJCTr7RFh2ilbf2iTKUxcFeO87E\"",
    "mtime": "2024-08-30T04:21:56.237Z",
    "size": 75880,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96ptCondensed-Regular.otf"
  },
  "/resource/fonts/otf/BricolageGrotesque96ptCondensed-SemiBold.otf": {
    "type": "font/otf",
    "etag": "\"12a48-cdeNEyAbB8iAhZCXo7AX27A3btM\"",
    "mtime": "2024-08-30T04:21:56.239Z",
    "size": 76360,
    "path": "../public/resource/fonts/otf/BricolageGrotesque96ptCondensed-SemiBold.otf"
  },
  "/resource/fonts/variable/BricolageGrotesque[opsz,wdth,wght].ttf": {
    "type": "font/ttf",
    "etag": "\"63bb0-60FIS7pTfRA5e8b6dBxTS0wK5ns\"",
    "mtime": "2024-08-30T04:21:56.330Z",
    "size": 408496,
    "path": "../public/resource/fonts/variable/BricolageGrotesque[opsz,wdth,wght].ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Bold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"18230-1ghUEc3pSKYrWDeTYzsBWK2OJ4Y\"",
    "mtime": "2024-08-30T04:21:56.033Z",
    "size": 98864,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Bold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"18134-7zOY4bYGp4WcpqO3AYYuvcVWZSQ\"",
    "mtime": "2024-08-30T04:21:56.035Z",
    "size": 98612,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Bold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Bold.woff": {
    "type": "font/woff",
    "etag": "\"c764-ursvAqHAD88X+2mtIIRh+Dz+BB8\"",
    "mtime": "2024-08-30T04:21:56.037Z",
    "size": 51044,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Bold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"9840-uDomiiRzjGjpmnR9BacLGognVO4\"",
    "mtime": "2024-08-30T04:21:56.038Z",
    "size": 38976,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Bold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1830c-AU0Kw9gvQGBrtc+07RA/lKK8fo8\"",
    "mtime": "2024-08-30T04:21:56.040Z",
    "size": 99084,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"181ec-CtCfwwbHqqdjGxzdYxFNp/OXTHM\"",
    "mtime": "2024-08-30T04:21:56.042Z",
    "size": 98796,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"c4fc-YZQ9RE4BA0E3HamWdWSSGFJnX+w\"",
    "mtime": "2024-08-30T04:21:56.044Z",
    "size": 50428,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"9674-pu+otCjaxSvnDOIGlf2R8t8mE9Y\"",
    "mtime": "2024-08-30T04:21:56.045Z",
    "size": 38516,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"18310-1cZBrjVQpil1Qfq5y4UR/31jXdo\"",
    "mtime": "2024-08-30T04:21:56.047Z",
    "size": 99088,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"181ec-8dVioMmB5QiwoJYch/ratHjcjno\"",
    "mtime": "2024-08-30T04:21:56.048Z",
    "size": 98796,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"c538-UhIPkm2yB81RHdaG8znzDo2PBzc\"",
    "mtime": "2024-08-30T04:21:56.050Z",
    "size": 50488,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"972c-3TqTIBstINakHw3+YCAmasE8yzY\"",
    "mtime": "2024-08-30T04:21:56.051Z",
    "size": 38700,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Light.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"182c8-8gjihceN4rfq2jqKFRmrDHu1IEg\"",
    "mtime": "2024-08-30T04:21:56.053Z",
    "size": 99016,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Light.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"181b8-U2IjiddQ8qSo71IdC+wygWKopis\"",
    "mtime": "2024-08-30T04:21:56.055Z",
    "size": 98744,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Light.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Light.woff": {
    "type": "font/woff",
    "etag": "\"c6ec-LWPSZpjOomyxqvlVjXC6Yk3upng\"",
    "mtime": "2024-08-30T04:21:56.057Z",
    "size": 50924,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Light.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"9840-4qVajcbmdxP36Kn8EEq35G7u6Kg\"",
    "mtime": "2024-08-30T04:21:56.058Z",
    "size": 38976,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Light.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Medium.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"182e0-qky1YXRnLW/V2CVgp2Y+ZdfwEok\"",
    "mtime": "2024-08-30T04:21:56.060Z",
    "size": 99040,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Medium.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"181cc-E0UbjCsxVxGd9cMpxyB0IwewXXc\"",
    "mtime": "2024-08-30T04:21:56.062Z",
    "size": 98764,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Medium.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Medium.woff": {
    "type": "font/woff",
    "etag": "\"c874-w6WeJ6r56iJrYoXO71XM70uNyG8\"",
    "mtime": "2024-08-30T04:21:56.064Z",
    "size": 51316,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Medium.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"9894-+eieiKWoduZaYWa2Hwnom5+ir7M\"",
    "mtime": "2024-08-30T04:21:56.064Z",
    "size": 39060,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Medium.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Regular.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1824c-1Hyy3J/8c/G42tQxv43yDUp90Gs\"",
    "mtime": "2024-08-30T04:21:56.065Z",
    "size": 98892,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Regular.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"18144-0s/JsAhWF07cx/kL5+znyr5fdoY\"",
    "mtime": "2024-08-30T04:21:56.067Z",
    "size": 98628,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Regular.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Regular.woff": {
    "type": "font/woff",
    "etag": "\"c7f4-Igw7Zf3aGao7octiM23FkI0vpQc\"",
    "mtime": "2024-08-30T04:21:56.069Z",
    "size": 51188,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Regular.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"98d0-ffSj8ERoSgngMpOgHCiv6IUJmGI\"",
    "mtime": "2024-08-30T04:21:56.071Z",
    "size": 39120,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-Regular.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"18308-jxME6MF1E0prKXgatFPUt4RWQ9Y\"",
    "mtime": "2024-08-30T04:21:56.072Z",
    "size": 99080,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"181ec-DPxnJus36WnsfyqjYnUHQWBbiIk\"",
    "mtime": "2024-08-30T04:21:56.075Z",
    "size": 98796,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"c820-SMYEGvQ2KK20GWblM3UaUngOuA0\"",
    "mtime": "2024-08-30T04:21:56.076Z",
    "size": 51232,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"9900-OA/pZWqbHqv+so5Q8Ixz3VYbRLg\"",
    "mtime": "2024-08-30T04:21:56.077Z",
    "size": 39168,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Bold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"18278-/Jyd8089wCzVW9qAVCLVcvRKV2Y\"",
    "mtime": "2024-08-30T04:21:56.078Z",
    "size": 98936,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Bold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"18154-zzg3/x7K/DHjyN5xCENCuwpE8Js\"",
    "mtime": "2024-08-30T04:21:56.080Z",
    "size": 98644,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Bold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Bold.woff": {
    "type": "font/woff",
    "etag": "\"c214-JwdP05jWi4CLJqo7YUK3PRm4x3g\"",
    "mtime": "2024-08-30T04:21:56.081Z",
    "size": 49684,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Bold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"9428-KOGvotPiFKVOJz4GJR0EiZEfCZE\"",
    "mtime": "2024-08-30T04:21:56.081Z",
    "size": 37928,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Bold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraBold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"18308-Zj+UU/ZL25wGBoqx7UY1gyjpI2s\"",
    "mtime": "2024-08-30T04:21:56.083Z",
    "size": 99080,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraBold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"181c0-Metl0RK3uz3BAQQO6Q9X/JML9XE\"",
    "mtime": "2024-08-30T04:21:56.085Z",
    "size": 98752,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraBold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"c0c4-vKgPqEZwG/XKgK/8s3UwWpjW108\"",
    "mtime": "2024-08-30T04:21:56.086Z",
    "size": 49348,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraBold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"937c-mdNVojvw2l9b8Uwry52pC+DFe0Y\"",
    "mtime": "2024-08-30T04:21:56.086Z",
    "size": 37756,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraBold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraLight.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"182f0-ojzFu58JQDfRInL3ELfrMOr1l9w\"",
    "mtime": "2024-08-30T04:21:56.088Z",
    "size": 99056,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraLight.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"181a4-YL8SYJAWR/wbeV2oH0xnKjAP1iI\"",
    "mtime": "2024-08-30T04:21:56.091Z",
    "size": 98724,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraLight.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"bd88-Y7SFfVJzW8RH+1NsBMdY07nRfFk\"",
    "mtime": "2024-08-30T04:21:56.091Z",
    "size": 48520,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraLight.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"9180-09WxTteJaUASaRzkAEYyMAVDN1I\"",
    "mtime": "2024-08-30T04:21:56.092Z",
    "size": 37248,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-ExtraLight.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Light.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"182a4-SPjBvf80OWa8Ljsqk/xcrk2j6B0\"",
    "mtime": "2024-08-30T04:21:56.094Z",
    "size": 98980,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Light.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"1816c-48+ke5lQZ1/KzUcoeBwiSTS1MMc\"",
    "mtime": "2024-08-30T04:21:56.096Z",
    "size": 98668,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Light.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Light.woff": {
    "type": "font/woff",
    "etag": "\"c0b0-UB/wReYQQ/1asf617J30AlH6eRQ\"",
    "mtime": "2024-08-30T04:21:56.097Z",
    "size": 49328,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Light.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"93e4-RBZts+rfiQDkx+i7z2VaYgRAFUY\"",
    "mtime": "2024-08-30T04:21:56.098Z",
    "size": 37860,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Light.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Medium.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"182e0-KloS6UjjJ/Gd33BjqN7H8Iu2ptY\"",
    "mtime": "2024-08-30T04:21:56.100Z",
    "size": 99040,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Medium.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"181a4-pq5JCuLUa2WIQxoUyl4c5A0Q+gI\"",
    "mtime": "2024-08-30T04:21:56.101Z",
    "size": 98724,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Medium.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Medium.woff": {
    "type": "font/woff",
    "etag": "\"c294-0L4d6JW97XtZ/IXWseDHgA/yNZc\"",
    "mtime": "2024-08-30T04:21:56.103Z",
    "size": 49812,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Medium.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"9404-F4GTJn/dALMgnlnSE7zHWNsWf0I\"",
    "mtime": "2024-08-30T04:21:56.104Z",
    "size": 37892,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Medium.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Regular.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"182ac-e0yUN5OxNzwL7PzBTR1MbjGrOv8\"",
    "mtime": "2024-08-30T04:21:56.105Z",
    "size": 98988,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Regular.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1817c-k0HdtEfC6v/RJ9TPWxzWtgeqcGc\"",
    "mtime": "2024-08-30T04:21:56.107Z",
    "size": 98684,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Regular.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Regular.woff": {
    "type": "font/woff",
    "etag": "\"c1cc-sXOVuNI4IPOPGCE6Tvx5Rj+4tYI\"",
    "mtime": "2024-08-30T04:21:56.107Z",
    "size": 49612,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Regular.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"93c4-MAT4Be+XYNCUEIq3M8je4zsQEug\"",
    "mtime": "2024-08-30T04:21:56.108Z",
    "size": 37828,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-Regular.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-SemiBold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"182f0-J3DIun2nJLph06d9M8VgqVMwQLk\"",
    "mtime": "2024-08-30T04:21:56.111Z",
    "size": 99056,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-SemiBold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"181ac-8/+BRIE9cWgqnpvMTzPsOqW+SYE\"",
    "mtime": "2024-08-30T04:21:56.113Z",
    "size": 98732,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-SemiBold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"c2cc-J4CHANIlsy31SRdTV+klIoBPeZY\"",
    "mtime": "2024-08-30T04:21:56.115Z",
    "size": 49868,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-SemiBold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"9464-9rqYrJeqO2ctafKIlv1brfEY5K0\"",
    "mtime": "2024-08-30T04:21:56.116Z",
    "size": 37988,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueCondensed-SemiBold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Bold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"18368-lzL8fBlFO3iLHk53NpgwsFJJrC8\"",
    "mtime": "2024-08-30T04:21:56.117Z",
    "size": 99176,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Bold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"18234-hOMW+wMQqEafhU5u5LQaHyh79Tk\"",
    "mtime": "2024-08-30T04:21:56.118Z",
    "size": 98868,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Bold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Bold.woff": {
    "type": "font/woff",
    "etag": "\"c704-NQ0upSe6jvtQO35WYsp9rZUwR3U\"",
    "mtime": "2024-08-30T04:21:56.119Z",
    "size": 50948,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Bold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"97fc-o0wWrG9Wt1MQ7qapysyt+cAcHho\"",
    "mtime": "2024-08-30T04:21:56.119Z",
    "size": 38908,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Bold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraBold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"183e0-iunbNLw+dULqn99WLSTuD4c5VaY\"",
    "mtime": "2024-08-30T04:21:56.121Z",
    "size": 99296,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraBold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18288-5l/raOsJHtOx+aUoDWDR4iKt5a8\"",
    "mtime": "2024-08-30T04:21:56.123Z",
    "size": 98952,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraBold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"c5bc-GdEeiyqjsmjo//JlEH14vhKaAg8\"",
    "mtime": "2024-08-30T04:21:56.125Z",
    "size": 50620,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraBold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"9684-sipm804PniHhjO/fzrpC+mgbQYw\"",
    "mtime": "2024-08-30T04:21:56.127Z",
    "size": 38532,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraBold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraLight.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"183d0-+iMb2AvORC9AZSWk7UbmWarFNNc\"",
    "mtime": "2024-08-30T04:21:56.129Z",
    "size": 99280,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraLight.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"18274-vv7M6zGivcTjsFY5+Dz0PKZHUwA\"",
    "mtime": "2024-08-30T04:21:56.132Z",
    "size": 98932,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraLight.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"c560-Ak09W0VuuYvVT7Ha3GDdr5DwlDo\"",
    "mtime": "2024-08-30T04:21:56.134Z",
    "size": 50528,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraLight.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"9694-K+pphGeOQCH7KhO0Hzk4RDGYgqc\"",
    "mtime": "2024-08-30T04:21:56.135Z",
    "size": 38548,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-ExtraLight.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Light.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1837c-im/Vor2VW8hUfiNkBg+/qhEtQLI\"",
    "mtime": "2024-08-30T04:21:56.137Z",
    "size": 99196,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Light.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"18234-DA464bJrbEUEEyikoQQI0hyCFqw\"",
    "mtime": "2024-08-30T04:21:56.139Z",
    "size": 98868,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Light.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Light.woff": {
    "type": "font/woff",
    "etag": "\"c648-K4JjmyW5eM0keC0ztcgq0SRLgGA\"",
    "mtime": "2024-08-30T04:21:56.141Z",
    "size": 50760,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Light.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"96c4-x7wpyQVcfYc/GPrpd777Kq5WdLA\"",
    "mtime": "2024-08-30T04:21:56.143Z",
    "size": 38596,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Light.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Medium.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"183c0-hmlRs6JqFTlPTaxiCjkitW5teCo\"",
    "mtime": "2024-08-30T04:21:56.146Z",
    "size": 99264,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Medium.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"18274-nQXJF81C7YLMo6JTmT+xRsMzxnU\"",
    "mtime": "2024-08-30T04:21:56.148Z",
    "size": 98932,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Medium.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Medium.woff": {
    "type": "font/woff",
    "etag": "\"c6fc-KyAdthKbtSqoo88QwOTj6yESWAQ\"",
    "mtime": "2024-08-30T04:21:56.150Z",
    "size": 50940,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Medium.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"9878-Vx3CQcvgmkKk4mBAb8Ek7aKgNeI\"",
    "mtime": "2024-08-30T04:21:56.152Z",
    "size": 39032,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Medium.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Regular.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1838c-Qvg9eA1sKJaaNqhw5zaKIpMiHZw\"",
    "mtime": "2024-08-30T04:21:56.153Z",
    "size": 99212,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Regular.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1824c-+WC8caQy75gYoK8IJQ/oKyWdajo\"",
    "mtime": "2024-08-30T04:21:56.156Z",
    "size": 98892,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Regular.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Regular.woff": {
    "type": "font/woff",
    "etag": "\"c6bc-i59YRK10B6T+gmGlDxyLtWA/qhs\"",
    "mtime": "2024-08-30T04:21:56.157Z",
    "size": 50876,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Regular.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"9778-D0jFUSyksrAevSWFk3Hg08uBRFo\"",
    "mtime": "2024-08-30T04:21:56.158Z",
    "size": 38776,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-Regular.woff2"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-SemiBold.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"183d8-vlm0wKQB+vneXCZeUTH1AGwvlCs\"",
    "mtime": "2024-08-30T04:21:56.160Z",
    "size": 99288,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-SemiBold.eot"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18284-Wsq4neVnvSLxaEdhZjV0FTMqMDk\"",
    "mtime": "2024-08-30T04:21:56.161Z",
    "size": 98948,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-SemiBold.ttf"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"c6c0-LqaJf01r+BiCg/vbG7IUvkYQoKg\"",
    "mtime": "2024-08-30T04:21:56.162Z",
    "size": 50880,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-SemiBold.woff"
  },
  "/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"974c-W0yTwOegt2W2f6IsI+K22SwQxms\"",
    "mtime": "2024-08-30T04:21:56.163Z",
    "size": 38732,
    "path": "../public/resource/fonts/BricolageGrotesque/BricolageGrotesqueSemiCondensed-SemiBold.woff2"
  },
  "/resource/fonts/BricolageGrotesque/demo.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"b547-cfUbBftySssNzufNLxRnR46D0l4\"",
    "mtime": "2024-08-30T04:21:56.165Z",
    "size": 46407,
    "path": "../public/resource/fonts/BricolageGrotesque/demo.html"
  },
  "/resource/fonts/BricolageGrotesque/stylesheet.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"31da-dZlwbOKnEEmo9vduyENDirEBK+Q\"",
    "mtime": "2024-08-30T04:21:56.165Z",
    "size": 12762,
    "path": "../public/resource/fonts/BricolageGrotesque/stylesheet.css"
  },
  "/resource/fonts/webfonts/BricolageGrotesque-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b7c4-+1pFuihtqDAMTWNID4G6vXA1KgM\"",
    "mtime": "2024-08-30T04:21:56.333Z",
    "size": 47044,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b718-IacB+Ar3X57GxPGvGz6kT1X3IAo\"",
    "mtime": "2024-08-30T04:21:56.335Z",
    "size": 46872,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"b3cc-OLXLLSqW8KsFCSw/p7WHs2OiJ/0\"",
    "mtime": "2024-08-30T04:21:56.337Z",
    "size": 46028,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b7d0-2B1FHN2asHFxfMsvvSRafdYtYX8\"",
    "mtime": "2024-08-30T04:21:56.338Z",
    "size": 47056,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b75c-LhGadppzrZIsr95MPURtu6j5YFA\"",
    "mtime": "2024-08-30T04:21:56.339Z",
    "size": 46940,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"b5d8-stfK8Ng105y1hME9Zoth9OPAKxk\"",
    "mtime": "2024-08-30T04:21:56.340Z",
    "size": 46552,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b850-sYnzGPQV5wlvityqK6kTgTXheos\"",
    "mtime": "2024-08-30T04:21:56.342Z",
    "size": 47184,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10pt-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b784-nep2IMDwzn64Y+jVLmQMfz15sYI\"",
    "mtime": "2024-08-30T04:21:56.345Z",
    "size": 46980,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10pt-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10pt-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b5a8-7d7Z1YNd/WCLFSmvQ4D/jeSt0dg\"",
    "mtime": "2024-08-30T04:21:56.346Z",
    "size": 46504,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10pt-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10pt-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"b2fc-Cy/NdDAGDu9PEfXqc3ZRy/7AeLY\"",
    "mtime": "2024-08-30T04:21:56.347Z",
    "size": 45820,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10pt-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10pt-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b5e8-pX3Fw+rP75t311/YUwCZt6jwyhU\"",
    "mtime": "2024-08-30T04:21:56.347Z",
    "size": 46568,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10pt-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10pt-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b78c-up43jh7ZIFr9CUqL8CyFa1BqtoM\"",
    "mtime": "2024-08-30T04:21:56.348Z",
    "size": 46988,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10pt-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10pt-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"b628-fErPIv9LmhmvKLbLZAW5V4xX85g\"",
    "mtime": "2024-08-30T04:21:56.350Z",
    "size": 46632,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10pt-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10pt-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b7f4-lxSalJrg2Zs3ugaWb3XYFQjSQAw\"",
    "mtime": "2024-08-30T04:21:56.352Z",
    "size": 47092,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10pt-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b334-Avr6dR1WXAMGeMhjcjnOdZUAeRg\"",
    "mtime": "2024-08-30T04:21:56.353Z",
    "size": 45876,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b0b8-B6Vy4WllLTuRIblA9Qy3Id+jKRc\"",
    "mtime": "2024-08-30T04:21:56.356Z",
    "size": 45240,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"ae48-ZzsnUAQKaALC31yHL9tkQH7riac\"",
    "mtime": "2024-08-30T04:21:56.357Z",
    "size": 44616,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b268-w4ZVY3o2hHVu2xvZIWy5wvPPJUo\"",
    "mtime": "2024-08-30T04:21:56.359Z",
    "size": 45672,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b2dc-5xVJyDeSvDFbesbpXfPy+ftkxZk\"",
    "mtime": "2024-08-30T04:21:56.359Z",
    "size": 45788,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"b260-WXAzqeYD2UEgUIOW75xVkMrLQtI\"",
    "mtime": "2024-08-30T04:21:56.360Z",
    "size": 45664,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b2a8-2fGrozdi6Yi5TIMtfwpFog65bQ0\"",
    "mtime": "2024-08-30T04:21:56.361Z",
    "size": 45736,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque10ptCondensed-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12pt-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b718-gpN6X+CdGgNF9CDhYbsi00mhKsc\"",
    "mtime": "2024-08-30T04:21:56.364Z",
    "size": 46872,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12pt-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12pt-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b5c4-44YqPW4ftthrWKhZ373hBotuU20\"",
    "mtime": "2024-08-30T04:21:56.365Z",
    "size": 46532,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12pt-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12pt-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"b268-ZVvj3SGhssIaV6wjO0zjcMgWigE\"",
    "mtime": "2024-08-30T04:21:56.366Z",
    "size": 45672,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12pt-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12pt-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b550-fluNbLIKnKR+78u0LrekGenZhNw\"",
    "mtime": "2024-08-30T04:21:56.366Z",
    "size": 46416,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12pt-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12pt-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b750-86gMQi2NQl2U+kGu6T9ZoeIaBDk\"",
    "mtime": "2024-08-30T04:21:56.367Z",
    "size": 46928,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12pt-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12pt-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"b650-fSGQVtANysZPuU5/q7aWSLQDnJw\"",
    "mtime": "2024-08-30T04:21:56.370Z",
    "size": 46672,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12pt-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12pt-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b738-Zu54jKnVqB7/BbdRDg4tnQXc2g0\"",
    "mtime": "2024-08-30T04:21:56.371Z",
    "size": 46904,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12pt-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b360-IgNyX0zzmrmo5nuqBsGkBau72Mk\"",
    "mtime": "2024-08-30T04:21:56.372Z",
    "size": 45920,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b08c-as1DOo744vGjJ8G3tqHiYmuZJYI\"",
    "mtime": "2024-08-30T04:21:56.372Z",
    "size": 45196,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"aeb8-9OtYBBZlarCbPhCfyLWoC+8ZNTY\"",
    "mtime": "2024-08-30T04:21:56.374Z",
    "size": 44728,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b2d8-+Ovj76gggZ8UFPDZ7CpwINM54Fg\"",
    "mtime": "2024-08-30T04:21:56.375Z",
    "size": 45784,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b288-NdwMTp98HPYRXuTQmWeCuV6709E\"",
    "mtime": "2024-08-30T04:21:56.375Z",
    "size": 45704,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"b2e4-YI8fKd9dV+RpDo17o1HI5v71Pjk\"",
    "mtime": "2024-08-30T04:21:56.377Z",
    "size": 45796,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b1ec-+Pj6Ld2im77smAA/fQ8IeDf2i1g\"",
    "mtime": "2024-08-30T04:21:56.378Z",
    "size": 45548,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque12ptCondensed-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48pt-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b5c4-/DKOAD5Kk4T2H7r83GlgEvCjtqs\"",
    "mtime": "2024-08-30T04:21:56.379Z",
    "size": 46532,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48pt-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48pt-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b4f8-Tb+BgXh2DwB4e+sscLLFmhRKqxw\"",
    "mtime": "2024-08-30T04:21:56.379Z",
    "size": 46328,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48pt-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48pt-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"b48c-NeBbXZKJfwdERsUTdOInG/Ss1pY\"",
    "mtime": "2024-08-30T04:21:56.380Z",
    "size": 46220,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48pt-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48pt-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b7a8-svoGfGu3+l0HO0NWvWU49r2dQrE\"",
    "mtime": "2024-08-30T04:21:56.381Z",
    "size": 47016,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48pt-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48pt-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b7e0-teMpdpT4jErgoB+BN2vW71hAQn0\"",
    "mtime": "2024-08-30T04:21:56.383Z",
    "size": 47072,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48pt-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48pt-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"b8f0-6zbGmXWkx7uHnwRguKF8Gty8HCQ\"",
    "mtime": "2024-08-30T04:21:56.384Z",
    "size": 47344,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48pt-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48pt-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b678-c+NQ+T3onuon80QjbJtCO0J97RE\"",
    "mtime": "2024-08-30T04:21:56.385Z",
    "size": 46712,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48pt-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b430-iDOnHLRq+SXShnb60XpayKJk7YI\"",
    "mtime": "2024-08-30T04:21:56.385Z",
    "size": 46128,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b198-lh84p9g0bZFcTaPJohLPQHI9IQE\"",
    "mtime": "2024-08-30T04:21:56.386Z",
    "size": 45464,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"aaf8-p2kX+TvRvzdURaMRy5eTYGOJ9AA\"",
    "mtime": "2024-08-30T04:21:56.387Z",
    "size": 43768,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b0ec-Lkg14D+9l/A7uo5AXIAku8L0LMw\"",
    "mtime": "2024-08-30T04:21:56.388Z",
    "size": 45292,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b29c-hFrIs8chLVTcd4tv1sabFIxPOdg\"",
    "mtime": "2024-08-30T04:21:56.391Z",
    "size": 45724,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"b050-QHF3Z0lrJ826GhNEWJlsw51kIRg\"",
    "mtime": "2024-08-30T04:21:56.392Z",
    "size": 45136,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b2d4-Ewiuz95SOEyCTOxSDloJDOvLHdA\"",
    "mtime": "2024-08-30T04:21:56.393Z",
    "size": 45780,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque48ptCondensed-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96pt-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b548-/p/r8+gHUuEt9sM7ehhWvm5JIgQ\"",
    "mtime": "2024-08-30T04:21:56.394Z",
    "size": 46408,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96pt-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96pt-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b528-rCBfXXr9S75jKRMatnY8uKsCu7c\"",
    "mtime": "2024-08-30T04:21:56.395Z",
    "size": 46376,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96pt-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96pt-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"b3c0-CqhkBvkunBIl9ZqO7THepmTVALY\"",
    "mtime": "2024-08-30T04:21:56.395Z",
    "size": 46016,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96pt-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96pt-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b66c-0PQvrVo4VcjCDr4ntPkRoTLPMx8\"",
    "mtime": "2024-08-30T04:21:56.396Z",
    "size": 46700,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96pt-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96pt-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b730-u8ILQIKmLIxtx0VLIYfT6kkWfW8\"",
    "mtime": "2024-08-30T04:21:56.398Z",
    "size": 46896,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96pt-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96pt-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"b7f8-OHXktp33CRDx2X62amstUTR07XA\"",
    "mtime": "2024-08-30T04:21:56.399Z",
    "size": 47096,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96pt-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96pt-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b690-9txeH1j/vkZk7sqHV8A0nDO4tK0\"",
    "mtime": "2024-08-30T04:21:56.400Z",
    "size": 46736,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96pt-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"b43c-2Lx+EKUAUsm+MypCHoSEdKELFEE\"",
    "mtime": "2024-08-30T04:21:56.400Z",
    "size": 46140,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-Bold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b0a4-Q0Ii03WGKP441JOkIuTUteenJkg\"",
    "mtime": "2024-08-30T04:21:56.401Z",
    "size": 45220,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-ExtraBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"ab4c-40Bz7GJgcLMkjnzTIeDj7+FYQDo\"",
    "mtime": "2024-08-30T04:21:56.401Z",
    "size": 43852,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-ExtraLight.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"b078-rnQFVGeYoxao3FZTjgMNItx2xYI\"",
    "mtime": "2024-08-30T04:21:56.403Z",
    "size": 45176,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-Light.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"b170-343gbmxOTdGxBj5GvS3Pl8+WYac\"",
    "mtime": "2024-08-30T04:21:56.403Z",
    "size": 45424,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-Medium.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"afe8-cj5VRJPoJTsF2EKFrkALCd8ters\"",
    "mtime": "2024-08-30T04:21:56.404Z",
    "size": 45032,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-Regular.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"b300-kdtvsKCpCDG0k6gI3faNb4Q88g4\"",
    "mtime": "2024-08-30T04:21:56.405Z",
    "size": 45824,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque96ptCondensed-SemiBold.woff2"
  },
  "/resource/fonts/webfonts/BricolageGrotesque[opsz,wdth,wght].woff2": {
    "type": "font/woff2",
    "etag": "\"31f5c-jDlEfPGodRZv/EV7mXK2H4srLlc\"",
    "mtime": "2024-08-30T04:21:56.407Z",
    "size": 204636,
    "path": "../public/resource/fonts/webfonts/BricolageGrotesque[opsz,wdth,wght].woff2"
  },
  "/resource1/inner_pages/assets/css/inner_pages.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10573-FSOWFz98rUTRhzEe/SfVPNINS2s\"",
    "mtime": "2024-08-30T04:21:57.228Z",
    "size": 66931,
    "path": "../public/resource1/inner_pages/assets/css/inner_pages.css"
  },
  "/resource/images/hieu_suat_dau_tu/image_1.png": {
    "type": "image/png",
    "etag": "\"3a9f0-ykc387ZNlw4AhZ6p4HrQwxfogho\"",
    "mtime": "2024-08-30T04:21:56.547Z",
    "size": 240112,
    "path": "../public/resource/images/hieu_suat_dau_tu/image_1.png"
  },
  "/resource/images/hieu_suat_dau_tu/image_2.png": {
    "type": "image/png",
    "etag": "\"39720-brjf3W4MI3gn4r+4o4cDK04ZbdU\"",
    "mtime": "2024-08-30T04:21:56.550Z",
    "size": 235296,
    "path": "../public/resource/images/hieu_suat_dau_tu/image_2.png"
  },
  "/resource/images/hieu_suat_dau_tu/image_3.png": {
    "type": "image/png",
    "etag": "\"152f3-dnueC5hrGnTV+3Ct6lpsa/kugnU\"",
    "mtime": "2024-08-30T04:21:56.551Z",
    "size": 86771,
    "path": "../public/resource/images/hieu_suat_dau_tu/image_3.png"
  },
  "/resource/images/hieu_suat_dau_tu/image_4.png": {
    "type": "image/png",
    "etag": "\"ac81-KgMIYtY1Ljcvh8VhH7kis8zgJCY\"",
    "mtime": "2024-08-30T04:21:56.553Z",
    "size": 44161,
    "path": "../public/resource/images/hieu_suat_dau_tu/image_4.png"
  },
  "/resource/images/hieu_suat_dau_tu/image_5.png": {
    "type": "image/png",
    "etag": "\"1e46f-IJ3HykzQA/sgA7sy0mxOl2jDMYI\"",
    "mtime": "2024-08-30T04:21:56.555Z",
    "size": 124015,
    "path": "../public/resource/images/hieu_suat_dau_tu/image_5.png"
  },
  "/resource/images/hieu_suat_dau_tu/image_6.png": {
    "type": "image/png",
    "etag": "\"150a7-B5t4mZsOM5ZZ6xe8z4u/75l4UpI\"",
    "mtime": "2024-08-30T04:21:56.557Z",
    "size": 86183,
    "path": "../public/resource/images/hieu_suat_dau_tu/image_6.png"
  },
  "/resource/images/hieu_suat_dau_tu/image_7.png": {
    "type": "image/png",
    "etag": "\"c3d3-BQmCi8+GYok1pxrVhLidEyLc6Cc\"",
    "mtime": "2024-08-30T04:21:56.559Z",
    "size": 50131,
    "path": "../public/resource/images/hieu_suat_dau_tu/image_7.png"
  },
  "/resource/images/hieu_suat_dau_tu/menu_1.png": {
    "type": "image/png",
    "etag": "\"13c-b+8YThVTo6OCSY5M9odI11NAKw8\"",
    "mtime": "2024-08-30T04:21:56.560Z",
    "size": 316,
    "path": "../public/resource/images/hieu_suat_dau_tu/menu_1.png"
  },
  "/resource/images/hieu_suat_dau_tu/small_image_1.png": {
    "type": "image/png",
    "etag": "\"ced-cpl6Z6duS02fyvPP/zEnO9tk9Dc\"",
    "mtime": "2024-08-30T04:21:56.560Z",
    "size": 3309,
    "path": "../public/resource/images/hieu_suat_dau_tu/small_image_1.png"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Black Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5b068-i8pRNzRSDJ/lBx88FbR0J9svw+8\"",
    "mtime": "2024-08-30T04:21:57.234Z",
    "size": 372840,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Black Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Black.ttf": {
    "type": "font/ttf",
    "etag": "\"5a250-elV2FFiBp0jODCovqeE6Djc3utA\"",
    "mtime": "2024-08-30T04:21:57.239Z",
    "size": 369232,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Black.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Bold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c61c-YQvTgNxuw8rSgTr9LBGlQBo1WBo\"",
    "mtime": "2024-08-30T04:21:57.243Z",
    "size": 378396,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Bold Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"5a800-rs3Ktg8Wg7YlmHXzf5D4+hWVaGQ\"",
    "mtime": "2024-08-30T04:21:57.255Z",
    "size": 370688,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Bold.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins ExtraBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c728-4upjqxzgl3Sav/9IoBkfqZaPbn0\"",
    "mtime": "2024-08-30T04:21:57.260Z",
    "size": 378664,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins ExtraBold Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"5903c-w1xAc27o8SwOTbcKWPcld7zkVtM\"",
    "mtime": "2024-08-30T04:21:57.264Z",
    "size": 364604,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins ExtraBold.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins ExtraLight Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"59590-AIq8SH+s/woDUVYZSHnBkhJXDFg\"",
    "mtime": "2024-08-30T04:21:57.268Z",
    "size": 365968,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins ExtraLight Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"56008-Ec5of6Ur1K1xxQm2pfxuEr3R2ok\"",
    "mtime": "2024-08-30T04:21:57.273Z",
    "size": 352264,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins ExtraLight.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c330-56TV8nvvqT2sJweeL6iwyv1qXb4\"",
    "mtime": "2024-08-30T04:21:57.277Z",
    "size": 377648,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Light Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5b468-mbUoZmYUt1YZfyf5IXdaZDHT9rs\"",
    "mtime": "2024-08-30T04:21:57.285Z",
    "size": 373864,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Light Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Light.ttf": {
    "type": "font/ttf",
    "etag": "\"57dc4-ee83srcOC+I+JVnslf5Yp7nga2A\"",
    "mtime": "2024-08-30T04:21:57.288Z",
    "size": 359876,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Light.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Medium Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"59b54-wbMY8JwgWJcO06ElrEeHg4u5cJE\"",
    "mtime": "2024-08-30T04:21:57.293Z",
    "size": 367444,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Medium Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"56878-ey1LJAVfNL3MHqaXgBEFu5E0Oq8\"",
    "mtime": "2024-08-30T04:21:57.297Z",
    "size": 354424,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Medium.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"582c8-JtDW5tMbECwPP69eu72a/ZSb+Ek\"",
    "mtime": "2024-08-30T04:21:57.301Z",
    "size": 361160,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Regular.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins SemiBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"58188-HdxuQaGAU1Lrlsy1+KCsSMZpolI\"",
    "mtime": "2024-08-30T04:21:57.305Z",
    "size": 360840,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins SemiBold Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"57838-R2/OXHzZ7cFi4Kq1XfLNpWrGTfc\"",
    "mtime": "2024-08-30T04:21:57.308Z",
    "size": 358456,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins SemiBold.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Thin Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"57150-tysDbrLURplO9RTaKdTkTyknGq0\"",
    "mtime": "2024-08-30T04:21:57.313Z",
    "size": 356688,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Thin Italic.ttf"
  },
  "/resource1/inner_pages/assets/fonts/SVN-Poppins Thin.ttf": {
    "type": "font/ttf",
    "etag": "\"53334-fySpz34YsUrisPVJMOfKWVgmPSE\"",
    "mtime": "2024-08-30T04:21:57.317Z",
    "size": 340788,
    "path": "../public/resource1/inner_pages/assets/fonts/SVN-Poppins Thin.ttf"
  },
  "/resource1/inner_pages/assets/img/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"47ea1-wboE/MgHLRjog+uTZ57y/xSq67E\"",
    "mtime": "2024-08-30T04:21:57.319Z",
    "size": 294561,
    "path": "../public/resource1/inner_pages/assets/img/1.jpg"
  },
  "/resource1/inner_pages/assets/img/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"e9139-hDSI5ZQmK4zQkHgA33CBzuLAI7c\"",
    "mtime": "2024-08-30T04:21:57.327Z",
    "size": 954681,
    "path": "../public/resource1/inner_pages/assets/img/2.jpg"
  },
  "/resource1/inner_pages/assets/img/404.png": {
    "type": "image/png",
    "etag": "\"2e6b-9L6fcyA2O6BCpsJM+vZCEeuzMyo\"",
    "mtime": "2024-08-30T04:21:57.328Z",
    "size": 11883,
    "path": "../public/resource1/inner_pages/assets/img/404.png"
  },
  "/resource1/inner_pages/assets/img/404_2.png": {
    "type": "image/png",
    "etag": "\"d5d0f-WdtodUp7lROO6xEoAmcsLcvt/jI\"",
    "mtime": "2024-08-30T04:21:57.334Z",
    "size": 875791,
    "path": "../public/resource1/inner_pages/assets/img/404_2.png"
  },
  "/resource1/inner_pages/assets/img/404_bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d3a02-jAYIcLRpkkGKgeIiNINv4ywCRNU\"",
    "mtime": "2024-08-30T04:21:57.349Z",
    "size": 1915394,
    "path": "../public/resource1/inner_pages/assets/img/404_bg.jpg"
  },
  "/resource1/inner_pages/assets/img/ab1.png": {
    "type": "image/png",
    "etag": "\"4275-a8UYPs1r8U86HN0pKNOjK+JzKTA\"",
    "mtime": "2024-08-30T04:21:57.370Z",
    "size": 17013,
    "path": "../public/resource1/inner_pages/assets/img/ab1.png"
  },
  "/resource1/inner_pages/assets/img/about.png": {
    "type": "image/png",
    "etag": "\"85f1c-r0SmonxNavNckHmc71XCBjicY2Y\"",
    "mtime": "2024-08-30T04:21:57.373Z",
    "size": 548636,
    "path": "../public/resource1/inner_pages/assets/img/about.png"
  },
  "/resource1/inner_pages/assets/img/about1.jpg": {
    "type": "image/jpeg",
    "etag": "\"101471-Alrl8VTx92plHikRDtE0HSLEMpQ\"",
    "mtime": "2024-08-30T04:21:57.381Z",
    "size": 1053809,
    "path": "../public/resource1/inner_pages/assets/img/about1.jpg"
  },
  "/resource1/inner_pages/assets/img/arrow.png": {
    "type": "image/png",
    "etag": "\"28b4-f+N0a1ef0DlyvI3OVaFuXzWq6lk\"",
    "mtime": "2024-08-30T04:21:57.382Z",
    "size": 10420,
    "path": "../public/resource1/inner_pages/assets/img/arrow.png"
  },
  "/resource1/inner_pages/assets/img/arrow.svg": {
    "type": "image/svg+xml",
    "etag": "\"c5-O5Bh9d0yV8DW6YO2NW3th9+bpIk\"",
    "mtime": "2024-08-30T04:21:57.382Z",
    "size": 197,
    "path": "../public/resource1/inner_pages/assets/img/arrow.svg"
  },
  "/resource1/inner_pages/assets/img/arrow_2.png": {
    "type": "image/png",
    "etag": "\"2b0-LPFw0WtMj5cwU/pxHIebmFnfMwQ\"",
    "mtime": "2024-08-30T04:21:57.383Z",
    "size": 688,
    "path": "../public/resource1/inner_pages/assets/img/arrow_2.png"
  },
  "/resource1/inner_pages/assets/img/arrow_3.svg": {
    "type": "image/svg+xml",
    "etag": "\"d7-U5u60YPi0fspxOZfxF4rV4as5E0\"",
    "mtime": "2024-08-30T04:21:57.384Z",
    "size": 215,
    "path": "../public/resource1/inner_pages/assets/img/arrow_3.svg"
  },
  "/resource1/inner_pages/assets/img/arrow_wh.svg": {
    "type": "image/svg+xml",
    "etag": "\"d6-/rs5Y5WOlw5y52hWftVwM3cD6uw\"",
    "mtime": "2024-08-30T04:21:57.387Z",
    "size": 214,
    "path": "../public/resource1/inner_pages/assets/img/arrow_wh.svg"
  },
  "/resource1/inner_pages/assets/img/boxes.png": {
    "type": "image/png",
    "etag": "\"1cd5-8RQUYHLgjGiR4Q1EJCbS/FOZDZA\"",
    "mtime": "2024-08-30T04:21:57.388Z",
    "size": 7381,
    "path": "../public/resource1/inner_pages/assets/img/boxes.png"
  },
  "/resource1/inner_pages/assets/img/clound.png": {
    "type": "image/png",
    "etag": "\"2c09-jRKgQAecHWIgchaCENiXpguf6aA\"",
    "mtime": "2024-08-30T04:21:57.451Z",
    "size": 11273,
    "path": "../public/resource1/inner_pages/assets/img/clound.png"
  },
  "/resource1/inner_pages/assets/img/faq.jpg": {
    "type": "image/jpeg",
    "etag": "\"82a90-y37hq1r+wUnl56RwvqHDzBQXZ3c\"",
    "mtime": "2024-08-30T04:21:57.454Z",
    "size": 535184,
    "path": "../public/resource1/inner_pages/assets/img/faq.jpg"
  },
  "/resource1/inner_pages/assets/img/fav.png": {
    "type": "image/png",
    "etag": "\"301-yYXlthS2uPLrbCnH2CFqVPBA7D4\"",
    "mtime": "2024-08-30T04:21:57.456Z",
    "size": 769,
    "path": "../public/resource1/inner_pages/assets/img/fav.png"
  },
  "/resource1/inner_pages/assets/img/fav_line.png": {
    "type": "image/png",
    "etag": "\"1cbe-g9c2/ImY7stzKiL4YuEe1UNvoL8\"",
    "mtime": "2024-08-30T04:21:57.457Z",
    "size": 7358,
    "path": "../public/resource1/inner_pages/assets/img/fav_line.png"
  },
  "/resource1/inner_pages/assets/img/finra_fav.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a8-FhyFrP7KMYQrMeqIV6HtARAsV4A\"",
    "mtime": "2024-08-30T04:21:57.458Z",
    "size": 1192,
    "path": "../public/resource1/inner_pages/assets/img/finra_fav.svg"
  },
  "/resource1/inner_pages/assets/img/foot_shaps.png": {
    "type": "image/png",
    "etag": "\"7216-uIskVoTPPBzSv7yz9lcJzNeI96w\"",
    "mtime": "2024-08-30T04:21:57.459Z",
    "size": 29206,
    "path": "../public/resource1/inner_pages/assets/img/foot_shaps.png"
  },
  "/resource1/inner_pages/assets/img/Formula_image.png": {
    "type": "image/png",
    "etag": "\"2f2b-oQnUWOPIlm1/oCvOoTdSu7jvY/8\"",
    "mtime": "2024-08-30T04:21:57.350Z",
    "size": 12075,
    "path": "../public/resource1/inner_pages/assets/img/Formula_image.png"
  },
  "/resource1/inner_pages/assets/img/Frame_KKH-1.png": {
    "type": "image/png",
    "etag": "\"116b09-VjPceI+aTGKWc291bi0QJDwLcbI\"",
    "mtime": "2024-08-30T04:21:57.355Z",
    "size": 1141513,
    "path": "../public/resource1/inner_pages/assets/img/Frame_KKH-1.png"
  },
  "/resource1/inner_pages/assets/img/Frame_KKH-2.png": {
    "type": "image/png",
    "etag": "\"d684e-Y+ICspEdPFHynpcqOJkVZj9T2Is\"",
    "mtime": "2024-08-30T04:21:57.360Z",
    "size": 878670,
    "path": "../public/resource1/inner_pages/assets/img/Frame_KKH-2.png"
  },
  "/resource1/inner_pages/assets/img/Frame_TLCK.png": {
    "type": "image/png",
    "etag": "\"6c433-oF62kjqXOwrzTScUl4Sywl/DcHc\"",
    "mtime": "2024-08-30T04:21:57.363Z",
    "size": 443443,
    "path": "../public/resource1/inner_pages/assets/img/Frame_TLCK.png"
  },
  "/resource1/inner_pages/assets/img/Frame_TLHT.png": {
    "type": "image/png",
    "etag": "\"107d6a-nF/I07RWvcKcrbuN/Dlbwmfur1w\"",
    "mtime": "2024-08-30T04:21:57.369Z",
    "size": 1080682,
    "path": "../public/resource1/inner_pages/assets/img/Frame_TLHT.png"
  },
  "/resource1/inner_pages/assets/img/header_shaps.png": {
    "type": "image/png",
    "etag": "\"ae5-1lwMdJrEEhdVaOeIox4nourrSnc\"",
    "mtime": "2024-08-30T04:21:57.459Z",
    "size": 2789,
    "path": "../public/resource1/inner_pages/assets/img/header_shaps.png"
  },
  "/resource1/inner_pages/assets/img/heart.png": {
    "type": "image/png",
    "etag": "\"1ecf-kGFz4laZNHw+u3Pu7bdjWwYJ4BA\"",
    "mtime": "2024-08-30T04:21:57.460Z",
    "size": 7887,
    "path": "../public/resource1/inner_pages/assets/img/heart.png"
  },
  "/resource1/inner_pages/assets/img/ksa.svg": {
    "type": "image/svg+xml",
    "etag": "\"340f-RnLjd1KwT5nem3/GhUbyTIxc4jo\"",
    "mtime": "2024-08-30T04:21:57.471Z",
    "size": 13327,
    "path": "../public/resource1/inner_pages/assets/img/ksa.svg"
  },
  "/resource1/inner_pages/assets/img/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"41be-6ZLHh38AZtifP6zJrBxiW1vclKc\"",
    "mtime": "2024-08-30T04:21:57.472Z",
    "size": 16830,
    "path": "../public/resource1/inner_pages/assets/img/logo.svg"
  },
  "/resource1/inner_pages/assets/img/logo_icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a8-9B0P5Lt3lYVwvurAP2EpANxGTvg\"",
    "mtime": "2024-08-30T04:21:57.473Z",
    "size": 1192,
    "path": "../public/resource1/inner_pages/assets/img/logo_icon.svg"
  },
  "/resource1/inner_pages/assets/img/logo_wh.svg": {
    "type": "image/svg+xml",
    "etag": "\"fcb-EH1UueeHjGx8QAbkr3OT3Hh7Fzg\"",
    "mtime": "2024-08-30T04:21:57.474Z",
    "size": 4043,
    "path": "../public/resource1/inner_pages/assets/img/logo_wh.svg"
  },
  "/resource1/inner_pages/assets/img/man.png": {
    "type": "image/png",
    "etag": "\"6c43f-qLisluAGP5BGpBv68n/aD2yog3E\"",
    "mtime": "2024-08-30T04:21:57.477Z",
    "size": 443455,
    "path": "../public/resource1/inner_pages/assets/img/man.png"
  },
  "/resource1/inner_pages/assets/img/niem-tin.svg": {
    "type": "image/svg+xml",
    "etag": "\"13c2-TOD1M2JbEV4MNB3E4iFml3rCb+E\"",
    "mtime": "2024-08-30T04:21:57.478Z",
    "size": 5058,
    "path": "../public/resource1/inner_pages/assets/img/niem-tin.svg"
  },
  "/resource1/inner_pages/assets/img/post.jpg": {
    "type": "image/jpeg",
    "etag": "\"171f88-5G6DBHb8NxmmBF7EnxtL96QSACI\"",
    "mtime": "2024-08-30T04:21:57.561Z",
    "size": 1515400,
    "path": "../public/resource1/inner_pages/assets/img/post.jpg"
  },
  "/resource1/inner_pages/assets/img/quote_left.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b1-ztI5AGer3zsl65s9JAApqg27KnI\"",
    "mtime": "2024-08-30T04:21:57.586Z",
    "size": 1201,
    "path": "../public/resource1/inner_pages/assets/img/quote_left.svg"
  },
  "/resource1/inner_pages/assets/img/quote_right.svg": {
    "type": "image/svg+xml",
    "etag": "\"4ad-x9GDvmPFB5bTUEq7KsEAGcceRvA\"",
    "mtime": "2024-08-30T04:21:57.587Z",
    "size": 1197,
    "path": "../public/resource1/inner_pages/assets/img/quote_right.svg"
  },
  "/resource1/inner_pages/assets/img/shap_img.png": {
    "type": "image/png",
    "etag": "\"1a76a-I5Jn8KMUEd92gt/TtIrC2L+ICnI\"",
    "mtime": "2024-08-30T04:21:57.633Z",
    "size": 108394,
    "path": "../public/resource1/inner_pages/assets/img/shap_img.png"
  },
  "/resource1/inner_pages/assets/img/star5.png": {
    "type": "image/png",
    "etag": "\"2818-eDsxmVMyXD89tULYG6e1MpTtZ2A\"",
    "mtime": "2024-08-30T04:21:57.633Z",
    "size": 10264,
    "path": "../public/resource1/inner_pages/assets/img/star5.png"
  },
  "/resource1/inner_pages/assets/img/star_green.svg": {
    "type": "image/svg+xml",
    "etag": "\"30e-kBYRTEAM145SjLxCt7MWXHREcQk\"",
    "mtime": "2024-08-30T04:21:57.634Z",
    "size": 782,
    "path": "../public/resource1/inner_pages/assets/img/star_green.svg"
  },
  "/resource1/inner_pages/assets/img/star_purple.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ce-2juNdjhXpCNbQhmubrvlGteeSg4\"",
    "mtime": "2024-08-30T04:21:57.634Z",
    "size": 462,
    "path": "../public/resource1/inner_pages/assets/img/star_purple.svg"
  },
  "/resource1/inner_pages/assets/img/subs_shapes.png": {
    "type": "image/png",
    "etag": "\"2406-0U8ngVfvZd+vMNVAi8Pr18EBm0c\"",
    "mtime": "2024-08-30T04:21:57.635Z",
    "size": 9222,
    "path": "../public/resource1/inner_pages/assets/img/subs_shapes.png"
  },
  "/resource1/inner_pages/assets/img/subs_shapes1.png": {
    "type": "image/png",
    "etag": "\"632c-NV4LbkSdXprOjeLSatVHaCi0gV8\"",
    "mtime": "2024-08-30T04:21:57.636Z",
    "size": 25388,
    "path": "../public/resource1/inner_pages/assets/img/subs_shapes1.png"
  },
  "/resource1/inner_pages/assets/img/testi.png": {
    "type": "image/png",
    "etag": "\"2dbf5-PsveKDOeLMx+cWJ/Cbfk1r9+EuQ\"",
    "mtime": "2024-08-30T04:21:57.664Z",
    "size": 187381,
    "path": "../public/resource1/inner_pages/assets/img/testi.png"
  },
  "/resource1/inner_pages/assets/img/thunder.png": {
    "type": "image/png",
    "etag": "\"1f3a-j73MXYQ8lv1zLXwPdRdUPnFd7Ik\"",
    "mtime": "2024-08-30T04:21:57.665Z",
    "size": 7994,
    "path": "../public/resource1/inner_pages/assets/img/thunder.png"
  },
  "/resource1/inner_pages/assets/img/ukr.svg": {
    "type": "image/svg+xml",
    "etag": "\"132-XfN0nhBQRHG2AWx/Ek+OOC8ODRY\"",
    "mtime": "2024-08-30T04:21:57.665Z",
    "size": 306,
    "path": "../public/resource1/inner_pages/assets/img/ukr.svg"
  },
  "/resource1/inner_pages/assets/img/usa.svg": {
    "type": "image/svg+xml",
    "etag": "\"10e22-X7VyBtbjdKTrXnGEgKoyoGTJuzc\"",
    "mtime": "2024-08-30T04:21:57.666Z",
    "size": 69154,
    "path": "../public/resource1/inner_pages/assets/img/usa.svg"
  },
  "/resource1/inner_pages/assets/img/vec1.png": {
    "type": "image/png",
    "etag": "\"354-tWo5UMLLZn5TAz1GGCk3urgPEB8\"",
    "mtime": "2024-08-30T04:21:57.666Z",
    "size": 852,
    "path": "../public/resource1/inner_pages/assets/img/vec1.png"
  },
  "/resource1/inner_pages/assets/img/vec3.svg": {
    "type": "image/svg+xml",
    "etag": "\"1d9-j7WWPnqCZIJVUWLOthqqdXuhcU4\"",
    "mtime": "2024-08-30T04:21:57.666Z",
    "size": 473,
    "path": "../public/resource1/inner_pages/assets/img/vec3.svg"
  },
  "/resource1/inner_pages/assets/img/vec6.svg": {
    "type": "image/svg+xml",
    "etag": "\"c4-mo0hJALm8JWHfDWq+Aga+wbIhXc\"",
    "mtime": "2024-08-30T04:21:57.667Z",
    "size": 196,
    "path": "../public/resource1/inner_pages/assets/img/vec6.svg"
  },
  "/resource1/inner_pages/assets/img/vec8.svg": {
    "type": "image/svg+xml",
    "etag": "\"127-1f321jsI6d30ohOBAMj7JtQyB88\"",
    "mtime": "2024-08-30T04:21:57.668Z",
    "size": 295,
    "path": "../public/resource1/inner_pages/assets/img/vec8.svg"
  },
  "/resource1/inner_pages/assets/img/vec9.png": {
    "type": "image/png",
    "etag": "\"1b4-Avhl273Hrk6pQw+XjsJPz/6UaNI\"",
    "mtime": "2024-08-30T04:21:57.668Z",
    "size": 436,
    "path": "../public/resource1/inner_pages/assets/img/vec9.png"
  },
  "/resource1/inner_pages/assets/img/vid_bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d076b-FgS4jxfqxCUroYMIcbG7m8Z0XWc\"",
    "mtime": "2024-08-30T04:21:57.678Z",
    "size": 1902443,
    "path": "../public/resource1/inner_pages/assets/img/vid_bg.jpg"
  },
  "/resource1/inner_pages/assets/js/innerPages.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14cf-iOzXJEMgdSa/JUFfZIEF2qS008o\"",
    "mtime": "2024-08-30T04:21:57.680Z",
    "size": 5327,
    "path": "../public/resource1/inner_pages/assets/js/innerPages.js"
  },
  "/resource1/home1_creativeAgency/assets/css/home_1_style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d632-9UP+1kfVoeF0R0QWZiLmpPUI0Y8\"",
    "mtime": "2024-08-30T04:21:57.045Z",
    "size": 54834,
    "path": "../public/resource1/home1_creativeAgency/assets/css/home_1_style.css"
  },
  "/resource1/home1_creativeAgency/assets/img/1_2_cir.png": {
    "type": "image/png",
    "etag": "\"1e0f-QoEpQtDZtgS5rcosEZO/b3uNei0\"",
    "mtime": "2024-08-30T04:21:57.046Z",
    "size": 7695,
    "path": "../public/resource1/home1_creativeAgency/assets/img/1_2_cir.png"
  },
  "/resource1/home1_creativeAgency/assets/img/1_4_cir.png": {
    "type": "image/png",
    "etag": "\"f5f-E9vQv4YoCYOtf0PbhduDgZKyFjI\"",
    "mtime": "2024-08-30T04:21:57.048Z",
    "size": 3935,
    "path": "../public/resource1/home1_creativeAgency/assets/img/1_4_cir.png"
  },
  "/resource1/home1_creativeAgency/assets/img/about_float_imgs.png": {
    "type": "image/png",
    "etag": "\"5404f-IVHaozKVqmsNGcnb9CkfZu9DF70\"",
    "mtime": "2024-08-30T04:21:57.052Z",
    "size": 344143,
    "path": "../public/resource1/home1_creativeAgency/assets/img/about_float_imgs.png"
  },
  "/resource1/home1_creativeAgency/assets/img/arrow.svg": {
    "type": "image/svg+xml",
    "etag": "\"c5-O5Bh9d0yV8DW6YO2NW3th9+bpIk\"",
    "mtime": "2024-08-30T04:21:57.054Z",
    "size": 197,
    "path": "../public/resource1/home1_creativeAgency/assets/img/arrow.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/arrow_wh.svg": {
    "type": "image/svg+xml",
    "etag": "\"d6-/rs5Y5WOlw5y52hWftVwM3cD6uw\"",
    "mtime": "2024-08-30T04:21:57.055Z",
    "size": 214,
    "path": "../public/resource1/home1_creativeAgency/assets/img/arrow_wh.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/banner_image.png": {
    "type": "image/png",
    "etag": "\"1dca69-lTfHN1MtLOMkPn33Exwp5H8/5Yc\"",
    "mtime": "2024-08-30T04:21:57.062Z",
    "size": 1952361,
    "path": "../public/resource1/home1_creativeAgency/assets/img/banner_image.png"
  },
  "/resource1/home1_creativeAgency/assets/img/bidv_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b69-TiPrkOSbr2aleVeqSf8FNYevAO0\"",
    "mtime": "2024-08-30T04:21:57.063Z",
    "size": 7017,
    "path": "../public/resource1/home1_creativeAgency/assets/img/bidv_logo.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/cir1.png": {
    "type": "image/png",
    "etag": "\"1f4c-Z12tm2O/J7QO4qBMSUNoD6/yurw\"",
    "mtime": "2024-08-30T04:21:57.074Z",
    "size": 8012,
    "path": "../public/resource1/home1_creativeAgency/assets/img/cir1.png"
  },
  "/resource1/home1_creativeAgency/assets/img/f1_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"207e-2+SdHV99tjWfjSOsUUpAU7I/ma0\"",
    "mtime": "2024-08-30T04:21:57.087Z",
    "size": 8318,
    "path": "../public/resource1/home1_creativeAgency/assets/img/f1_logo.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/facebook.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c3-FgV9FCJEfBrIio4/x0+z91YMSt8\"",
    "mtime": "2024-08-30T04:21:57.088Z",
    "size": 963,
    "path": "../public/resource1/home1_creativeAgency/assets/img/facebook.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/fav.png": {
    "type": "image/png",
    "etag": "\"301-yYXlthS2uPLrbCnH2CFqVPBA7D4\"",
    "mtime": "2024-08-30T04:21:57.088Z",
    "size": 769,
    "path": "../public/resource1/home1_creativeAgency/assets/img/fav.png"
  },
  "/resource1/home1_creativeAgency/assets/img/fav_line.png": {
    "type": "image/png",
    "etag": "\"1cbe-g9c2/ImY7stzKiL4YuEe1UNvoL8\"",
    "mtime": "2024-08-30T04:21:57.089Z",
    "size": 7358,
    "path": "../public/resource1/home1_creativeAgency/assets/img/fav_line.png"
  },
  "/resource1/home1_creativeAgency/assets/img/finra_fav.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a8-FhyFrP7KMYQrMeqIV6HtARAsV4A\"",
    "mtime": "2024-08-30T04:21:57.091Z",
    "size": 1192,
    "path": "../public/resource1/home1_creativeAgency/assets/img/finra_fav.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/foot_shaps.png": {
    "type": "image/png",
    "etag": "\"7216-uIskVoTPPBzSv7yz9lcJzNeI96w\"",
    "mtime": "2024-08-30T04:21:57.093Z",
    "size": 29206,
    "path": "../public/resource1/home1_creativeAgency/assets/img/foot_shaps.png"
  },
  "/resource1/home1_creativeAgency/assets/img/hero.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ec19-r64VBbrKJbGYjIBxrwPwlS8ILwc\"",
    "mtime": "2024-08-30T04:21:57.097Z",
    "size": 125977,
    "path": "../public/resource1/home1_creativeAgency/assets/img/hero.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/hero_shap.png": {
    "type": "image/png",
    "etag": "\"80198-CGEaTAi01x0nt8F3rstX7/YtJAQ\"",
    "mtime": "2024-08-30T04:21:57.101Z",
    "size": 524696,
    "path": "../public/resource1/home1_creativeAgency/assets/img/hero_shap.png"
  },
  "/resource1/home1_creativeAgency/assets/img/h_num.jpg": {
    "type": "image/jpeg",
    "etag": "\"29e3-odPhKoDk24zZrlVHmh8K0bnTN+k\"",
    "mtime": "2024-08-30T04:21:57.094Z",
    "size": 10723,
    "path": "../public/resource1/home1_creativeAgency/assets/img/h_num.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/ksa.svg": {
    "type": "image/svg+xml",
    "etag": "\"340f-RnLjd1KwT5nem3/GhUbyTIxc4jo\"",
    "mtime": "2024-08-30T04:21:57.112Z",
    "size": 13327,
    "path": "../public/resource1/home1_creativeAgency/assets/img/ksa.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"41be-6ZLHh38AZtifP6zJrBxiW1vclKc\"",
    "mtime": "2024-08-30T04:21:57.112Z",
    "size": 16830,
    "path": "../public/resource1/home1_creativeAgency/assets/img/logo.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/logo_icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a8-9B0P5Lt3lYVwvurAP2EpANxGTvg\"",
    "mtime": "2024-08-30T04:21:57.113Z",
    "size": 1192,
    "path": "../public/resource1/home1_creativeAgency/assets/img/logo_icon.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/logo_wh copy 2.svg": {
    "type": "image/svg+xml",
    "etag": "\"419a-g+tNNOWLgmKcppIRc2C/MwKHDb8\"",
    "mtime": "2024-08-30T04:21:57.113Z",
    "size": 16794,
    "path": "../public/resource1/home1_creativeAgency/assets/img/logo_wh copy 2.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/logo_wh copy.svg": {
    "type": "image/svg+xml",
    "etag": "\"419a-g+tNNOWLgmKcppIRc2C/MwKHDb8\"",
    "mtime": "2024-08-30T04:21:57.114Z",
    "size": 16794,
    "path": "../public/resource1/home1_creativeAgency/assets/img/logo_wh copy.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/logo_wh.svg": {
    "type": "image/svg+xml",
    "etag": "\"419a-g+tNNOWLgmKcppIRc2C/MwKHDb8\"",
    "mtime": "2024-08-30T04:21:57.115Z",
    "size": 16794,
    "path": "../public/resource1/home1_creativeAgency/assets/img/logo_wh.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/post1.jpg": {
    "type": "image/jpeg",
    "etag": "\"e9139-hDSI5ZQmK4zQkHgA33CBzuLAI7c\"",
    "mtime": "2024-08-30T04:21:57.122Z",
    "size": 954681,
    "path": "../public/resource1/home1_creativeAgency/assets/img/post1.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/post2.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b233-QeAx7KrHmw0Yz5PEsn3Czuc5zQo\"",
    "mtime": "2024-08-30T04:21:57.124Z",
    "size": 242227,
    "path": "../public/resource1/home1_creativeAgency/assets/img/post2.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/post3.jpg": {
    "type": "image/jpeg",
    "etag": "\"5676d-g30Z+4bykhT8b0lk5IQzOqM5aCo\"",
    "mtime": "2024-08-30T04:21:57.128Z",
    "size": 354157,
    "path": "../public/resource1/home1_creativeAgency/assets/img/post3.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/product_item_1.png": {
    "type": "image/png",
    "etag": "\"c48a1-k+KD+cA/sEu0fwEJO7H6oWQpHgw\"",
    "mtime": "2024-08-30T04:21:57.133Z",
    "size": 805025,
    "path": "../public/resource1/home1_creativeAgency/assets/img/product_item_1.png"
  },
  "/resource1/home1_creativeAgency/assets/img/product_item_2.png": {
    "type": "image/png",
    "etag": "\"f0189-q0vQ7UyIEkjpVlweL4QsIT8VIcA\"",
    "mtime": "2024-08-30T04:21:57.137Z",
    "size": 983433,
    "path": "../public/resource1/home1_creativeAgency/assets/img/product_item_2.png"
  },
  "/resource1/home1_creativeAgency/assets/img/product_item_3.png": {
    "type": "image/png",
    "etag": "\"f0d94-Xd7l7LKiRkNKwzen8ABbW0DlbHA\"",
    "mtime": "2024-08-30T04:21:57.142Z",
    "size": 986516,
    "path": "../public/resource1/home1_creativeAgency/assets/img/product_item_3.png"
  },
  "/resource1/home1_creativeAgency/assets/img/signatures.svg": {
    "type": "image/svg+xml",
    "etag": "\"a7d32-QJMlBK+SnQ2Fuw02xrAEIo0iqjs\"",
    "mtime": "2024-08-30T04:21:57.147Z",
    "size": 687410,
    "path": "../public/resource1/home1_creativeAgency/assets/img/signatures.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/slider-1.png": {
    "type": "image/png",
    "etag": "\"12643f-0SRjGA1VP7Vj0ynI6f1gAXxgrfQ\"",
    "mtime": "2024-08-30T04:21:57.155Z",
    "size": 1205311,
    "path": "../public/resource1/home1_creativeAgency/assets/img/slider-1.png"
  },
  "/resource1/home1_creativeAgency/assets/img/slider-2.png": {
    "type": "image/png",
    "etag": "\"50f9a-bC1DtXxPvBqkBHX+EikG5ezbltQ\"",
    "mtime": "2024-08-30T04:21:57.158Z",
    "size": 331674,
    "path": "../public/resource1/home1_creativeAgency/assets/img/slider-2.png"
  },
  "/resource1/home1_creativeAgency/assets/img/slider-3.png": {
    "type": "image/png",
    "etag": "\"1f266b-eK6mDIPTt8P7LB+ebDFoe2H6YxY\"",
    "mtime": "2024-08-30T04:21:57.166Z",
    "size": 2041451,
    "path": "../public/resource1/home1_creativeAgency/assets/img/slider-3.png"
  },
  "/resource1/home1_creativeAgency/assets/img/testimonials_banner.png": {
    "type": "image/png",
    "etag": "\"600bd-41xRUElSJgqsS8C1V7R1HZVw3lI\"",
    "mtime": "2024-08-30T04:21:57.189Z",
    "size": 393405,
    "path": "../public/resource1/home1_creativeAgency/assets/img/testimonials_banner.png"
  },
  "/resource1/home1_creativeAgency/assets/img/ukr.svg": {
    "type": "image/svg+xml",
    "etag": "\"132-XfN0nhBQRHG2AWx/Ek+OOC8ODRY\"",
    "mtime": "2024-08-30T04:21:57.191Z",
    "size": 306,
    "path": "../public/resource1/home1_creativeAgency/assets/img/ukr.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/ups_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"a74fd-QhVkh6/5CviQYky6esbJRzgCcpM\"",
    "mtime": "2024-08-30T04:21:57.196Z",
    "size": 685309,
    "path": "../public/resource1/home1_creativeAgency/assets/img/ups_logo.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/usa.svg": {
    "type": "image/svg+xml",
    "etag": "\"10e22-X7VyBtbjdKTrXnGEgKoyoGTJuzc\"",
    "mtime": "2024-08-30T04:21:57.198Z",
    "size": 69154,
    "path": "../public/resource1/home1_creativeAgency/assets/img/usa.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/vec1.png": {
    "type": "image/png",
    "etag": "\"354-tWo5UMLLZn5TAz1GGCk3urgPEB8\"",
    "mtime": "2024-08-30T04:21:57.199Z",
    "size": 852,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec1.png"
  },
  "/resource1/home1_creativeAgency/assets/img/vec2.png": {
    "type": "image/png",
    "etag": "\"4fad-q2MN1j/7ROzwF+F7BHZLqCnaYjI\"",
    "mtime": "2024-08-30T04:21:57.200Z",
    "size": 20397,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec2.png"
  },
  "/resource1/home1_creativeAgency/assets/img/vec3.svg": {
    "type": "image/svg+xml",
    "etag": "\"4de-rCDvPBEur/KL/BrItlV3y/Ad8KA\"",
    "mtime": "2024-08-30T04:21:57.200Z",
    "size": 1246,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec3.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/vec4.png": {
    "type": "image/png",
    "etag": "\"2b1-LUbeenPFe78nEhyrYtE4aXfhBwU\"",
    "mtime": "2024-08-30T04:21:57.201Z",
    "size": 689,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec4.png"
  },
  "/resource1/home1_creativeAgency/assets/img/vec5.png": {
    "type": "image/png",
    "etag": "\"735-GAjRipRDPgQEA6/V5ltWUtRNooM\"",
    "mtime": "2024-08-30T04:21:57.204Z",
    "size": 1845,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec5.png"
  },
  "/resource1/home1_creativeAgency/assets/img/vec6.svg": {
    "type": "image/svg+xml",
    "etag": "\"c4-mo0hJALm8JWHfDWq+Aga+wbIhXc\"",
    "mtime": "2024-08-30T04:21:57.204Z",
    "size": 196,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec6.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/vec7.png": {
    "type": "image/png",
    "etag": "\"32d-kypjAKcbzzi8k0lKm1LG48q/k18\"",
    "mtime": "2024-08-30T04:21:57.205Z",
    "size": 813,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec7.png"
  },
  "/resource1/home1_creativeAgency/assets/img/vec8.svg": {
    "type": "image/svg+xml",
    "etag": "\"127-1f321jsI6d30ohOBAMj7JtQyB88\"",
    "mtime": "2024-08-30T04:21:57.205Z",
    "size": 295,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec8.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/vec9.png": {
    "type": "image/png",
    "etag": "\"1b4-Avhl273Hrk6pQw+XjsJPz/6UaNI\"",
    "mtime": "2024-08-30T04:21:57.206Z",
    "size": 436,
    "path": "../public/resource1/home1_creativeAgency/assets/img/vec9.png"
  },
  "/resource1/home1_creativeAgency/assets/img/video copy.jpg": {
    "type": "image/jpeg",
    "etag": "\"1964e-6qP0iUp6fV4SVj++PhGwi5MuX6o\"",
    "mtime": "2024-08-30T04:21:57.207Z",
    "size": 104014,
    "path": "../public/resource1/home1_creativeAgency/assets/img/video copy.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/video.jpg": {
    "type": "image/jpeg",
    "etag": "\"1964e-6qP0iUp6fV4SVj++PhGwi5MuX6o\"",
    "mtime": "2024-08-30T04:21:57.208Z",
    "size": 104014,
    "path": "../public/resource1/home1_creativeAgency/assets/img/video.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/youtube.svg": {
    "type": "image/svg+xml",
    "etag": "\"393-djeoX6A/CTw4UcVk1hKnQgO4OQY\"",
    "mtime": "2024-08-30T04:21:57.222Z",
    "size": 915,
    "path": "../public/resource1/home1_creativeAgency/assets/img/youtube.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/zalo.svg": {
    "type": "image/svg+xml",
    "etag": "\"39ea2-s9y8GFJXmN56/vbqWo53ghi+vhA\"",
    "mtime": "2024-08-30T04:21:57.224Z",
    "size": 237218,
    "path": "../public/resource1/home1_creativeAgency/assets/img/zalo.svg"
  },
  "/resource1/home1_creativeAgency/assets/js/home_1_scripts.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1198-L8y3od5+OiaP6mrlHegTq4EdudI\"",
    "mtime": "2024-08-30T04:21:57.225Z",
    "size": 4504,
    "path": "../public/resource1/home1_creativeAgency/assets/js/home_1_scripts.js"
  },
  "/resource1/common/fonts/mona/MonaSans-Black.ttf": {
    "type": "font/ttf",
    "etag": "\"10758-xtas+mKdfx2aQMmEwGtGBLbxJXA\"",
    "mtime": "2024-08-30T04:21:56.873Z",
    "size": 67416,
    "path": "../public/resource1/common/fonts/mona/MonaSans-Black.ttf"
  },
  "/resource1/common/fonts/mona/MonaSans-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"10504-ImEfZp43B2DdqqbsPXBXEPgYMPk\"",
    "mtime": "2024-08-30T04:21:56.874Z",
    "size": 66820,
    "path": "../public/resource1/common/fonts/mona/MonaSans-Bold.ttf"
  },
  "/resource1/common/fonts/mona/MonaSans-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"fe3c-bE0UOKjG8uVszGSnwk3XScqf+G4\"",
    "mtime": "2024-08-30T04:21:56.875Z",
    "size": 65084,
    "path": "../public/resource1/common/fonts/mona/MonaSans-Light.ttf"
  },
  "/resource1/common/fonts/mona/MonaSans-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"fb64-VeCUpn1sglNvk2OpQ/HM04a6eBM\"",
    "mtime": "2024-08-30T04:21:56.877Z",
    "size": 64356,
    "path": "../public/resource1/common/fonts/mona/MonaSans-Medium.ttf"
  },
  "/resource1/common/fonts/mona/MonaSans-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"fb80-jJJBbHHYOTs1UMh2B8fMR5gRNfw\"",
    "mtime": "2024-08-30T04:21:56.879Z",
    "size": 64384,
    "path": "../public/resource1/common/fonts/mona/MonaSans-Regular.ttf"
  },
  "/resource1/common/fonts/mona/MonaSans-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"fc44-aL52BUw/yQmLNW769uiCC6oVMfY\"",
    "mtime": "2024-08-30T04:21:56.880Z",
    "size": 64580,
    "path": "../public/resource1/common/fonts/mona/MonaSans-SemiBold.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Black Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5b068-i8pRNzRSDJ/lBx88FbR0J9svw+8\"",
    "mtime": "2024-08-30T04:21:56.884Z",
    "size": 372840,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Black Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Black.ttf": {
    "type": "font/ttf",
    "etag": "\"5a250-elV2FFiBp0jODCovqeE6Djc3utA\"",
    "mtime": "2024-08-30T04:21:56.888Z",
    "size": 369232,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Black.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Bold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c61c-YQvTgNxuw8rSgTr9LBGlQBo1WBo\"",
    "mtime": "2024-08-30T04:21:56.893Z",
    "size": 378396,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Bold Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"5a800-rs3Ktg8Wg7YlmHXzf5D4+hWVaGQ\"",
    "mtime": "2024-08-30T04:21:56.897Z",
    "size": 370688,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Bold.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins ExtraBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c728-4upjqxzgl3Sav/9IoBkfqZaPbn0\"",
    "mtime": "2024-08-30T04:21:56.901Z",
    "size": 378664,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins ExtraBold Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"5903c-w1xAc27o8SwOTbcKWPcld7zkVtM\"",
    "mtime": "2024-08-30T04:21:56.905Z",
    "size": 364604,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins ExtraBold.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins ExtraLight Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"59590-AIq8SH+s/woDUVYZSHnBkhJXDFg\"",
    "mtime": "2024-08-30T04:21:56.908Z",
    "size": 365968,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins ExtraLight Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"56008-Ec5of6Ur1K1xxQm2pfxuEr3R2ok\"",
    "mtime": "2024-08-30T04:21:56.912Z",
    "size": 352264,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins ExtraLight.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c330-56TV8nvvqT2sJweeL6iwyv1qXb4\"",
    "mtime": "2024-08-30T04:21:56.916Z",
    "size": 377648,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Light Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5b468-mbUoZmYUt1YZfyf5IXdaZDHT9rs\"",
    "mtime": "2024-08-30T04:21:56.919Z",
    "size": 373864,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Light Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Light.ttf": {
    "type": "font/ttf",
    "etag": "\"57dc4-ee83srcOC+I+JVnslf5Yp7nga2A\"",
    "mtime": "2024-08-30T04:21:56.923Z",
    "size": 359876,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Light.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Medium Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"59b54-wbMY8JwgWJcO06ElrEeHg4u5cJE\"",
    "mtime": "2024-08-30T04:21:56.926Z",
    "size": 367444,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Medium Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"56878-ey1LJAVfNL3MHqaXgBEFu5E0Oq8\"",
    "mtime": "2024-08-30T04:21:56.930Z",
    "size": 354424,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Medium.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"582c8-JtDW5tMbECwPP69eu72a/ZSb+Ek\"",
    "mtime": "2024-08-30T04:21:56.934Z",
    "size": 361160,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Regular.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins SemiBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"58188-HdxuQaGAU1Lrlsy1+KCsSMZpolI\"",
    "mtime": "2024-08-30T04:21:56.937Z",
    "size": 360840,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins SemiBold Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"57838-R2/OXHzZ7cFi4Kq1XfLNpWrGTfc\"",
    "mtime": "2024-08-30T04:21:56.941Z",
    "size": 358456,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins SemiBold.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Thin Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"57150-tysDbrLURplO9RTaKdTkTyknGq0\"",
    "mtime": "2024-08-30T04:21:56.945Z",
    "size": 356688,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Thin Italic.ttf"
  },
  "/resource1/common/fonts/popin/SVN-Poppins Thin.ttf": {
    "type": "font/ttf",
    "etag": "\"53334-fySpz34YsUrisPVJMOfKWVgmPSE\"",
    "mtime": "2024-08-30T04:21:56.949Z",
    "size": 340788,
    "path": "../public/resource1/common/fonts/popin/SVN-Poppins Thin.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Black Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.814Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Black Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Black.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.815Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Black.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Bold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.816Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Bold Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.816Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Bold.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins ExtraBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.817Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins ExtraBold Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.817Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins ExtraBold.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins ExtraLight Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.817Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins ExtraLight Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.818Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins ExtraLight.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.818Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Light Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.818Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Light Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Light.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.819Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Light.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Medium Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.819Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Medium Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.819Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Medium.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.820Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Regular.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins SemiBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.820Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins SemiBold Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.821Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins SemiBold.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Thin Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.821Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Thin Italic.ttf"
  },
  "/resource1/common/fonts/TTF/._SVN-Poppins Thin.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.822Z",
    "size": 180,
    "path": "../public/resource1/common/fonts/TTF/._SVN-Poppins Thin.ttf"
  },
  "/resource1/common/fonts/webfonts/fa-brands-400.ttf": {
    "type": "font/ttf",
    "etag": "\"2ee64-AeP0YihsUEYnk5VwQIBGu8hZIWs\"",
    "mtime": "2024-08-30T04:21:56.952Z",
    "size": 192100,
    "path": "../public/resource1/common/fonts/webfonts/fa-brands-400.ttf"
  },
  "/resource1/common/fonts/webfonts/fa-duotone-900.ttf": {
    "type": "font/ttf",
    "etag": "\"13566c-QuUUHXQQoyjn9bbisEKg8WlkFxc\"",
    "mtime": "2024-08-30T04:21:56.964Z",
    "size": 1267308,
    "path": "../public/resource1/common/fonts/webfonts/fa-duotone-900.ttf"
  },
  "/resource1/common/fonts/webfonts/fa-light-300.ttf": {
    "type": "font/ttf",
    "etag": "\"11acf4-RXCBWVrCU4lZQb6tCGOcHPG5N70\"",
    "mtime": "2024-08-30T04:21:56.974Z",
    "size": 1158388,
    "path": "../public/resource1/common/fonts/webfonts/fa-light-300.ttf"
  },
  "/resource1/common/fonts/webfonts/fa-regular-400.ttf": {
    "type": "font/ttf",
    "etag": "\"fd6b4-reS0082om31XmOkgafM8h5/ElJE\"",
    "mtime": "2024-08-30T04:21:56.980Z",
    "size": 1038004,
    "path": "../public/resource1/common/fonts/webfonts/fa-regular-400.ttf"
  },
  "/resource1/common/fonts/webfonts/fa-solid-900.ttf": {
    "type": "font/ttf",
    "etag": "\"dd9b0-IJgK+NEEO1GUAunV+ud1o4oh5eQ\"",
    "mtime": "2024-08-30T04:21:56.985Z",
    "size": 907696,
    "path": "../public/resource1/common/fonts/webfonts/fa-solid-900.ttf"
  },
  "/resource1/common/fonts/webfonts/fa-thin-100.ttf": {
    "type": "font/ttf",
    "etag": "\"135e58-LO88e6WghmZY9fwfx0V/PZJNX78\"",
    "mtime": "2024-08-30T04:21:56.998Z",
    "size": 1269336,
    "path": "../public/resource1/common/fonts/webfonts/fa-thin-100.ttf"
  },
  "/resource1/common/fonts/webfonts/fa-v4compatibility.ttf": {
    "type": "font/ttf",
    "etag": "\"27bc-pM1cSoufytmIu9KuSyGmgOu6UzY\"",
    "mtime": "2024-08-30T04:21:56.999Z",
    "size": 10172,
    "path": "../public/resource1/common/fonts/webfonts/fa-v4compatibility.ttf"
  },
  "/resource1/common/fonts/WOFF/SVN-Poppins.woff": {
    "type": "font/woff",
    "etag": "\"25f58-ToitwIAaGJz5rl5BdoFKdk5fqUg\"",
    "mtime": "2024-08-30T04:21:56.824Z",
    "size": 155480,
    "path": "../public/resource1/common/fonts/WOFF/SVN-Poppins.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-Poppins.woff2": {
    "type": "font/woff2",
    "etag": "\"1a690-tKvcXHVtOtoVXHgsEc/nJCDCzNI\"",
    "mtime": "2024-08-30T04:21:56.825Z",
    "size": 108176,
    "path": "../public/resource1/common/fonts/WOFF/SVN-Poppins.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsBlack.woff": {
    "type": "font/woff",
    "etag": "\"25b18-lxiUWVChXprXhDdfX3GeEJdcw0s\"",
    "mtime": "2024-08-30T04:21:56.826Z",
    "size": 154392,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsBlack.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsBlack.woff2": {
    "type": "font/woff2",
    "etag": "\"1a894-XjXPCINYf6aU64fN4rxkLQTQZxE\"",
    "mtime": "2024-08-30T04:21:56.827Z",
    "size": 108692,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsBlack.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsBlackItalic.woff": {
    "type": "font/woff",
    "etag": "\"26ee8-HO97M68H2y3BlYbEOiCoetKVN6s\"",
    "mtime": "2024-08-30T04:21:56.829Z",
    "size": 159464,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsBlackItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsBlackItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1b03c-hrjUvP5a64jXVQzZLT+GVUhzokE\"",
    "mtime": "2024-08-30T04:21:56.830Z",
    "size": 110652,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsBlackItalic.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsBold.woff": {
    "type": "font/woff",
    "etag": "\"25f04-dj2T+YDWv4G2G12oaLRM2RC4lkQ\"",
    "mtime": "2024-08-30T04:21:56.831Z",
    "size": 155396,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsBold.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsBold.woff2": {
    "type": "font/woff2",
    "etag": "\"1a934-iW3rfeSH+kMPyl7hBQ8fzvYAMAk\"",
    "mtime": "2024-08-30T04:21:56.833Z",
    "size": 108852,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsBold.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"281cc-pFDAj1cZYyCzs5ZMTQxxJ7a1awg\"",
    "mtime": "2024-08-30T04:21:56.836Z",
    "size": 164300,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsBoldItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1bed8-DT7uTyF95/1iMWPz34v3ja/o6HA\"",
    "mtime": "2024-08-30T04:21:56.837Z",
    "size": 114392,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsBoldItalic.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"25b78-dYdGepj+d+XKtuhBId54xy0ZV7w\"",
    "mtime": "2024-08-30T04:21:56.839Z",
    "size": 154488,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsExtraBold.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"1a880-1elgrAozhaUzBPdoe5CwN8smFyo\"",
    "mtime": "2024-08-30T04:21:56.842Z",
    "size": 108672,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsExtraBold.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsExtraBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"27de0-cmj55OC08o97dcPtYp9FAuCsdG8\"",
    "mtime": "2024-08-30T04:21:56.843Z",
    "size": 163296,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsExtraBoldItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsExtraBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1bb94-FbC8Wj1qIPRBWjbzMjnqD2NKxTs\"",
    "mtime": "2024-08-30T04:21:56.845Z",
    "size": 113556,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsExtraBoldItalic.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"24ec0-Dg2R2EEeAHy4DBNn202D5kEtle8\"",
    "mtime": "2024-08-30T04:21:56.846Z",
    "size": 151232,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsExtraLight.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"19780-E2V6xj/fy6zm+B/IAmS/lSsZh9U\"",
    "mtime": "2024-08-30T04:21:56.848Z",
    "size": 104320,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsExtraLight.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsExtraLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"27224-7g4ZgTSwPQ8Za4D9mee9xfkBih0\"",
    "mtime": "2024-08-30T04:21:56.850Z",
    "size": 160292,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsExtraLightItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsExtraLightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1ae70-OgoY3rhwbnv/wReIuKeXuS5UjJg\"",
    "mtime": "2024-08-30T04:21:56.850Z",
    "size": 110192,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsExtraLightItalic.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsItalic.woff": {
    "type": "font/woff",
    "etag": "\"28804-6Z/0AzN2OHYCRMlzelWdc4SUWeE\"",
    "mtime": "2024-08-30T04:21:56.852Z",
    "size": 165892,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1c190-fwAxjv6WCE81WwS7fvz/55mT8sk\"",
    "mtime": "2024-08-30T04:21:56.853Z",
    "size": 115088,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsItalic.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsLight.woff": {
    "type": "font/woff",
    "etag": "\"257b4-0DtuomW6XdsedHb18abY+8LtClc\"",
    "mtime": "2024-08-30T04:21:56.856Z",
    "size": 153524,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsLight.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsLight.woff2": {
    "type": "font/woff2",
    "etag": "\"1a084-GFPjKJqDRQ6HDJ+ReG8AbrbdTHA\"",
    "mtime": "2024-08-30T04:21:56.857Z",
    "size": 106628,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsLight.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"27c9c-H+3SYtFLZ3jTYSK/sZ2GHhclRc0\"",
    "mtime": "2024-08-30T04:21:56.858Z",
    "size": 162972,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsLightItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsLightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1b75c-MAeKuffcgJPq2hpcTPBuCJPVPME\"",
    "mtime": "2024-08-30T04:21:56.860Z",
    "size": 112476,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsLightItalic.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsMedium.woff": {
    "type": "font/woff",
    "etag": "\"25784-nP7sc38MWnnSAyV+9qA3+Z1LIiE\"",
    "mtime": "2024-08-30T04:21:56.861Z",
    "size": 153476,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsMedium.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsMedium.woff2": {
    "type": "font/woff2",
    "etag": "\"1a040-cJ/I6wFeKea5rTkR/QVju6qoBaw\"",
    "mtime": "2024-08-30T04:21:56.862Z",
    "size": 106560,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsMedium.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsMediumItalic.woff": {
    "type": "font/woff",
    "etag": "\"27b68-Fv83F9bAOX3PM1ZhOOKhUR1bHW4\"",
    "mtime": "2024-08-30T04:21:56.863Z",
    "size": 162664,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsMediumItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsMediumItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1b6c4-ojuLFaqgLzKYkvq/RFfvp1LPu5A\"",
    "mtime": "2024-08-30T04:21:56.864Z",
    "size": 112324,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsMediumItalic.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsSemiBold.woff": {
    "type": "font/woff",
    "etag": "\"25ed0-xMlv/MpSl2sBdj0wpbJZoKb7MXA\"",
    "mtime": "2024-08-30T04:21:56.865Z",
    "size": 155344,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsSemiBold.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsSemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"1a814-Du+mDcp0BfONqjPLdj7ZFBIZ3CA\"",
    "mtime": "2024-08-30T04:21:56.866Z",
    "size": 108564,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsSemiBold.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsSemiBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"278ac-4c7JMFhzQMbVAou2xQee6BOzqUw\"",
    "mtime": "2024-08-30T04:21:56.867Z",
    "size": 161964,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsSemiBoldItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsSemiBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1b8c0-BhKRmfhh0LZd+lbjVGPawSSz+w0\"",
    "mtime": "2024-08-30T04:21:56.868Z",
    "size": 112832,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsSemiBoldItalic.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsThin.woff": {
    "type": "font/woff",
    "etag": "\"231bc-ZnKf5hcfpg8nOVArqSYGTAIzI3g\"",
    "mtime": "2024-08-30T04:21:56.869Z",
    "size": 143804,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsThin.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsThin.woff2": {
    "type": "font/woff2",
    "etag": "\"182e8-HPx66rfNk7WQy+UiYr6U8+TVtSE\"",
    "mtime": "2024-08-30T04:21:56.870Z",
    "size": 99048,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsThin.woff2"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsThinItalic.woff": {
    "type": "font/woff",
    "etag": "\"25ca0-cGNUHy32jDCYH1uUmgCSjlvYMi4\"",
    "mtime": "2024-08-30T04:21:56.872Z",
    "size": 154784,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsThinItalic.woff"
  },
  "/resource1/common/fonts/WOFF/SVN-PoppinsThinItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"19c04-B32pV/DN+HB5VvqbkvYNZhhsXj8\"",
    "mtime": "2024-08-30T04:21:56.873Z",
    "size": 105476,
    "path": "../public/resource1/common/fonts/WOFF/SVN-PoppinsThinItalic.woff2"
  },
  "/resource1/common/css/lib/all.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7ca3d-Wlou+g2hZHcrEY/5InQSEgXmPyI\"",
    "mtime": "2024-08-30T04:21:56.807Z",
    "size": 510525,
    "path": "../public/resource1/common/css/lib/all.css"
  },
  "/resource1/common/css/lib/animate.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13de5-Lvj7rBa0qI0bZYs5SteJngDOBoI\"",
    "mtime": "2024-08-30T04:21:56.809Z",
    "size": 81381,
    "path": "../public/resource1/common/css/lib/animate.css"
  },
  "/resource1/common/css/lib/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"38d9c-ZZP/2pJI8STblhSxLedii6SvOvI\"",
    "mtime": "2024-08-30T04:21:56.809Z",
    "size": 232860,
    "path": "../public/resource1/common/css/lib/bootstrap.min.css"
  },
  "/resource1/common/css/lib/jquery.fancybox.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2be1-TEjFR2BBbgM0iJcHkpjPYELmQwQ\"",
    "mtime": "2024-08-30T04:21:56.811Z",
    "size": 11233,
    "path": "../public/resource1/common/css/lib/jquery.fancybox.css"
  },
  "/resource1/common/css/lib/lity.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"113a-funh0pMVQMeJwF6hCQ8GqAqTjng\"",
    "mtime": "2024-08-30T04:21:56.811Z",
    "size": 4410,
    "path": "../public/resource1/common/css/lib/lity.css"
  },
  "/resource1/common/css/lib/swiper8.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3dd6-yjHBT1pxUEvfkf2Z+EHiQfNzGRk\"",
    "mtime": "2024-08-30T04:21:56.812Z",
    "size": 15830,
    "path": "../public/resource1/common/css/lib/swiper8.min.css"
  },
  "/resource1/common/js/lib/bootstrap.bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13b22-gcP1KEkSwPlFMCjKyJ40IiPxkQM\"",
    "mtime": "2024-08-30T04:21:57.034Z",
    "size": 80674,
    "path": "../public/resource1/common/js/lib/bootstrap.bundle.min.js"
  },
  "/resource1/common/js/lib/jquery-3.0.0.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15d9f-TNXdxBOzAk17VjMcDQ0LK9kz8n8\"",
    "mtime": "2024-08-30T04:21:57.036Z",
    "size": 89503,
    "path": "../public/resource1/common/js/lib/jquery-3.0.0.min.js"
  },
  "/resource1/common/js/lib/jquery-migrate-3.0.0.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bac-zynD2M8c4o9lx8H6ELQ236+ESMw\"",
    "mtime": "2024-08-30T04:21:57.037Z",
    "size": 7084,
    "path": "../public/resource1/common/js/lib/jquery-migrate-3.0.0.min.js"
  },
  "/resource1/common/js/lib/jquery.counterup.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45b-/5Bhf4XdaepyxRIYLisvtozUxLY\"",
    "mtime": "2024-08-30T04:21:57.037Z",
    "size": 1115,
    "path": "../public/resource1/common/js/lib/jquery.counterup.js"
  },
  "/resource1/common/js/lib/jquery.fancybox.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f273-4KzYKxxi2tHd6dNlzprDSY7rhZ0\"",
    "mtime": "2024-08-30T04:21:57.039Z",
    "size": 62067,
    "path": "../public/resource1/common/js/lib/jquery.fancybox.js"
  },
  "/resource1/common/js/lib/jquery.waypoints.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"234c-q2ckl9qtU9Jwg7sED61Sl+3exxY\"",
    "mtime": "2024-08-30T04:21:57.039Z",
    "size": 9036,
    "path": "../public/resource1/common/js/lib/jquery.waypoints.min.js"
  },
  "/resource1/common/js/lib/lity.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"485b-8C0an3s1dxz3RlyIdoMU/gCT8Wc\"",
    "mtime": "2024-08-30T04:21:57.040Z",
    "size": 18523,
    "path": "../public/resource1/common/js/lib/lity.js"
  },
  "/resource1/common/js/lib/parallaxie.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"872-7sKwPwHbuB5xm4onDswRYkR+FHc\"",
    "mtime": "2024-08-30T04:21:57.041Z",
    "size": 2162,
    "path": "../public/resource1/common/js/lib/parallaxie.js"
  },
  "/resource1/common/js/lib/swiper8-bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22076-rV0J4iGB+Z3frBedsrkVQxHq+Wc\"",
    "mtime": "2024-08-30T04:21:57.043Z",
    "size": 139382,
    "path": "../public/resource1/common/js/lib/swiper8-bundle.min.js"
  },
  "/resource1/common/js/lib/wow.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20e0-4pcgdAT+qZhjrqYKHc03cPjs3e4\"",
    "mtime": "2024-08-30T04:21:57.043Z",
    "size": 8416,
    "path": "../public/resource1/common/js/lib/wow.min.js"
  },
  "/resource1/common/js/gsap_lib/gsap.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"116d8-nXR3+f0D8boWxkVMLap7uIAWA0I\"",
    "mtime": "2024-08-30T04:21:57.034Z",
    "size": 71384,
    "path": "../public/resource1/common/js/gsap_lib/gsap.min.js"
  },
  "/resource1/common/js/gsap_lib/ScrollSmoother.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f9c-eFL7pS4SZ21OtkNgMsF+MwLumrM\"",
    "mtime": "2024-08-30T04:21:57.030Z",
    "size": 12188,
    "path": "../public/resource1/common/js/gsap_lib/ScrollSmoother.min.js"
  },
  "/resource1/common/js/gsap_lib/ScrollTrigger.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a169-AuMgdWb0+tY65QmLLJQZJ+wPbX0\"",
    "mtime": "2024-08-30T04:21:57.032Z",
    "size": 41321,
    "path": "../public/resource1/common/js/gsap_lib/ScrollTrigger.min.js"
  },
  "/resource1/common/js/gsap_lib/SplitText.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3cd3-S6BS6X/GROL/ExhTGhz0L49F+fk\"",
    "mtime": "2024-08-30T04:21:57.033Z",
    "size": 15571,
    "path": "../public/resource1/common/js/gsap_lib/SplitText.min.js"
  },
  "/resource1/inner_pages/assets/img/careers/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"15b0f0-2gLnO5c8aUJW3AglzviyIH6rr2E\"",
    "mtime": "2024-08-30T04:21:57.399Z",
    "size": 1421552,
    "path": "../public/resource1/inner_pages/assets/img/careers/1.jpg"
  },
  "/resource1/inner_pages/assets/img/careers/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"286e2c-QnJ9eawTAtY2kYFcCsH4v9wtKBc\"",
    "mtime": "2024-08-30T04:21:57.413Z",
    "size": 2649644,
    "path": "../public/resource1/inner_pages/assets/img/careers/2.jpg"
  },
  "/resource1/inner_pages/assets/img/careers/ab2.jpg": {
    "type": "image/jpeg",
    "etag": "\"100f8f-7u1IlXPeOMYM3mufQ0aD1Tbl8c0\"",
    "mtime": "2024-08-30T04:21:57.423Z",
    "size": 1052559,
    "path": "../public/resource1/inner_pages/assets/img/careers/ab2.jpg"
  },
  "/resource1/inner_pages/assets/img/careers/ab_mask1.png": {
    "type": "image/png",
    "etag": "\"134eb1-DRf+V8Xbgos0GcYLENbMXMyvDe8\"",
    "mtime": "2024-08-30T04:21:57.430Z",
    "size": 1265329,
    "path": "../public/resource1/inner_pages/assets/img/careers/ab_mask1.png"
  },
  "/resource1/inner_pages/assets/img/careers/Frame_carrers_detail.png": {
    "type": "image/png",
    "etag": "\"73ff8-krDsskC9WfXv3rQQ5LDJIQgZTLU\"",
    "mtime": "2024-08-30T04:21:57.418Z",
    "size": 475128,
    "path": "../public/resource1/inner_pages/assets/img/careers/Frame_carrers_detail.png"
  },
  "/resource1/inner_pages/assets/img/careers/tuyendung.png": {
    "type": "image/png",
    "etag": "\"1d5449-rwXPg4T/iYG08pux7AzrOc19pHQ\"",
    "mtime": "2024-08-30T04:21:57.441Z",
    "size": 1922121,
    "path": "../public/resource1/inner_pages/assets/img/careers/tuyendung.png"
  },
  "/resource1/inner_pages/assets/img/clients/1.svg": {
    "type": "image/svg+xml",
    "etag": "\"1820-ufum53XnStc/SoEHfp3CG9HGBMA\"",
    "mtime": "2024-08-30T04:21:57.442Z",
    "size": 6176,
    "path": "../public/resource1/inner_pages/assets/img/clients/1.svg"
  },
  "/resource1/inner_pages/assets/img/clients/10.svg": {
    "type": "image/svg+xml",
    "etag": "\"3735-UrTtFj9zt6M0/4DExenmP6oQq5M\"",
    "mtime": "2024-08-30T04:21:57.443Z",
    "size": 14133,
    "path": "../public/resource1/inner_pages/assets/img/clients/10.svg"
  },
  "/resource1/inner_pages/assets/img/clients/11.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f5d-uJhUPrnZSwsnjmDNiPnHNf7lwBI\"",
    "mtime": "2024-08-30T04:21:57.443Z",
    "size": 8029,
    "path": "../public/resource1/inner_pages/assets/img/clients/11.svg"
  },
  "/resource1/inner_pages/assets/img/clients/12.svg": {
    "type": "image/svg+xml",
    "etag": "\"1820-O3h4Q/cPDLGCG3/r8WxVL9S77FQ\"",
    "mtime": "2024-08-30T04:21:57.445Z",
    "size": 6176,
    "path": "../public/resource1/inner_pages/assets/img/clients/12.svg"
  },
  "/resource1/inner_pages/assets/img/clients/2.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f5d-fF2UMz7z02aYR07rLD9o1ojAzxo\"",
    "mtime": "2024-08-30T04:21:57.445Z",
    "size": 8029,
    "path": "../public/resource1/inner_pages/assets/img/clients/2.svg"
  },
  "/resource1/inner_pages/assets/img/clients/3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3735-6gjWgn/r8RhxbPCBPJu6L+sfRWw\"",
    "mtime": "2024-08-30T04:21:57.445Z",
    "size": 14133,
    "path": "../public/resource1/inner_pages/assets/img/clients/3.svg"
  },
  "/resource1/inner_pages/assets/img/clients/4.svg": {
    "type": "image/svg+xml",
    "etag": "\"44a9-K6DgIPQjc1O+x89zOS9bXAc9cf0\"",
    "mtime": "2024-08-30T04:21:57.445Z",
    "size": 17577,
    "path": "../public/resource1/inner_pages/assets/img/clients/4.svg"
  },
  "/resource1/inner_pages/assets/img/clients/5.svg": {
    "type": "image/svg+xml",
    "etag": "\"1110-yExFM0U1/ybyz8ceAX4SndgMA5U\"",
    "mtime": "2024-08-30T04:21:57.446Z",
    "size": 4368,
    "path": "../public/resource1/inner_pages/assets/img/clients/5.svg"
  },
  "/resource1/inner_pages/assets/img/clients/6.svg": {
    "type": "image/svg+xml",
    "etag": "\"21ad5-VrMEfWp4cVepGzTOrdaGJ4z20i0\"",
    "mtime": "2024-08-30T04:21:57.448Z",
    "size": 137941,
    "path": "../public/resource1/inner_pages/assets/img/clients/6.svg"
  },
  "/resource1/inner_pages/assets/img/clients/7.svg": {
    "type": "image/svg+xml",
    "etag": "\"21ad5-OhOSvO4Az64ztJ5pFYJjSFxRPEA\"",
    "mtime": "2024-08-30T04:21:57.449Z",
    "size": 137941,
    "path": "../public/resource1/inner_pages/assets/img/clients/7.svg"
  },
  "/resource1/inner_pages/assets/img/clients/8.svg": {
    "type": "image/svg+xml",
    "etag": "\"44a9-/Eo139nqrxD0MAsAw8rJl+NWWMA\"",
    "mtime": "2024-08-30T04:21:57.450Z",
    "size": 17577,
    "path": "../public/resource1/inner_pages/assets/img/clients/8.svg"
  },
  "/resource1/inner_pages/assets/img/clients/9.svg": {
    "type": "image/svg+xml",
    "etag": "\"1110-zeN44no1KPfoNsDldys3zUEiZJM\"",
    "mtime": "2024-08-30T04:21:57.450Z",
    "size": 4368,
    "path": "../public/resource1/inner_pages/assets/img/clients/9.svg"
  },
  "/resource1/inner_pages/assets/img/icons/arrow_down.svg": {
    "type": "image/svg+xml",
    "etag": "\"da-fOM8X5SOS92w8eSL9eywJjWFenQ\"",
    "mtime": "2024-08-30T04:21:57.461Z",
    "size": 218,
    "path": "../public/resource1/inner_pages/assets/img/icons/arrow_down.svg"
  },
  "/resource1/inner_pages/assets/img/icons/arrow_lg.svg": {
    "type": "image/svg+xml",
    "etag": "\"c7-qbT6wSJtUAqNa2EpRpRBOHT8kMY\"",
    "mtime": "2024-08-30T04:21:57.461Z",
    "size": 199,
    "path": "../public/resource1/inner_pages/assets/img/icons/arrow_lg.svg"
  },
  "/resource1/inner_pages/assets/img/icons/c1.svg": {
    "type": "image/svg+xml",
    "etag": "\"578f-aZsJnx8bcw7uKXNRnrD8Kp6YJx4\"",
    "mtime": "2024-08-30T04:21:57.462Z",
    "size": 22415,
    "path": "../public/resource1/inner_pages/assets/img/icons/c1.svg"
  },
  "/resource1/inner_pages/assets/img/icons/c2.svg": {
    "type": "image/svg+xml",
    "etag": "\"2dca-PyYCg9f4yfmljgUZSrVsJVQ0XwY\"",
    "mtime": "2024-08-30T04:21:57.462Z",
    "size": 11722,
    "path": "../public/resource1/inner_pages/assets/img/icons/c2.svg"
  },
  "/resource1/inner_pages/assets/img/icons/c3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3267-Ht9J6bgQ/hzvGCwgurfq9aA/les\"",
    "mtime": "2024-08-30T04:21:57.464Z",
    "size": 12903,
    "path": "../public/resource1/inner_pages/assets/img/icons/c3.svg"
  },
  "/resource1/inner_pages/assets/img/icons/qt.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ac-fonp0r99jeQU9A6vMM2n28cRb9c\"",
    "mtime": "2024-08-30T04:21:57.464Z",
    "size": 428,
    "path": "../public/resource1/inner_pages/assets/img/icons/qt.svg"
  },
  "/resource1/inner_pages/assets/img/icons/qt1.svg": {
    "type": "image/svg+xml",
    "etag": "\"c7-FnLRENzNbe3FlkhYk1RUInyWBoc\"",
    "mtime": "2024-08-30T04:21:57.465Z",
    "size": 199,
    "path": "../public/resource1/inner_pages/assets/img/icons/qt1.svg"
  },
  "/resource1/inner_pages/assets/img/icons/ser1.svg": {
    "type": "image/svg+xml",
    "etag": "\"696-UWdQpidQlrKIlBCs9LT/IRC7EqQ\"",
    "mtime": "2024-08-30T04:21:57.465Z",
    "size": 1686,
    "path": "../public/resource1/inner_pages/assets/img/icons/ser1.svg"
  },
  "/resource1/inner_pages/assets/img/icons/ser2.svg": {
    "type": "image/svg+xml",
    "etag": "\"486-8CKj4MwPP0Pun4WWeaNxNl40H9A\"",
    "mtime": "2024-08-30T04:21:57.465Z",
    "size": 1158,
    "path": "../public/resource1/inner_pages/assets/img/icons/ser2.svg"
  },
  "/resource1/inner_pages/assets/img/icons/ser3.svg": {
    "type": "image/svg+xml",
    "etag": "\"422f-+uLT0wgdD/MdlxvEimOWq/phHik\"",
    "mtime": "2024-08-30T04:21:57.467Z",
    "size": 16943,
    "path": "../public/resource1/inner_pages/assets/img/icons/ser3.svg"
  },
  "/resource1/inner_pages/assets/img/icons/ser4.svg": {
    "type": "image/svg+xml",
    "etag": "\"9dd-jZrERSjsVKQwhQnAWH6o4yp/4L0\"",
    "mtime": "2024-08-30T04:21:57.468Z",
    "size": 2525,
    "path": "../public/resource1/inner_pages/assets/img/icons/ser4.svg"
  },
  "/resource1/inner_pages/assets/img/icons/tit_ico.svg": {
    "type": "image/svg+xml",
    "etag": "\"b6a-6HlYFsKtkm5ckgTjjMIJSQ7BUHs\"",
    "mtime": "2024-08-30T04:21:57.468Z",
    "size": 2922,
    "path": "../public/resource1/inner_pages/assets/img/icons/tit_ico.svg"
  },
  "/resource1/inner_pages/assets/img/icons/tit_ico2.svg": {
    "type": "image/svg+xml",
    "etag": "\"bcb-nqaMKuyQMRHzWUBo5yoXsiIDJGs\"",
    "mtime": "2024-08-30T04:21:57.469Z",
    "size": 3019,
    "path": "../public/resource1/inner_pages/assets/img/icons/tit_ico2.svg"
  },
  "/resource1/inner_pages/assets/img/icons/vec1.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a4-2OjqAKVek0RsRlmo/+Ws8dgZ2Gc\"",
    "mtime": "2024-08-30T04:21:57.469Z",
    "size": 420,
    "path": "../public/resource1/inner_pages/assets/img/icons/vec1.svg"
  },
  "/resource1/inner_pages/assets/img/portfolio/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"5c284-GvEtdnGw4RKE0qWnoRxTpeGreGI\"",
    "mtime": "2024-08-30T04:21:57.483Z",
    "size": 377476,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/1.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"76a29-CVu57GVW/23//Tx7etSEJzozOQ8\"",
    "mtime": "2024-08-30T04:21:57.488Z",
    "size": 485929,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/10.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"a7d73-YCPrPwqJ8jj29fQies8/rQGgYQE\"",
    "mtime": "2024-08-30T04:21:57.491Z",
    "size": 687475,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/11.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"90708-d4k+tW5I+Xxo5ZaHatGVvTKcoKQ\"",
    "mtime": "2024-08-30T04:21:57.495Z",
    "size": 591624,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/12.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e43d-7ki/UUjHtp62XGN5OyC3z/SSUUg\"",
    "mtime": "2024-08-30T04:21:57.501Z",
    "size": 517181,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/2.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"12a625-BzlziVsCGj0Xz06dM0NpSvlttyU\"",
    "mtime": "2024-08-30T04:21:57.511Z",
    "size": 1222181,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/3.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"e53af-W4VFeoUq5sihirm14A73AFZ9ss4\"",
    "mtime": "2024-08-30T04:21:57.518Z",
    "size": 938927,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/4.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"10ba93-LHyLcIcsaR1oHsNydvlPrtJyCpI\"",
    "mtime": "2024-08-30T04:21:57.526Z",
    "size": 1096339,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/5.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"6df26-ixQsnv5Ov/9a47HJYpGQRs8PoYw\"",
    "mtime": "2024-08-30T04:21:57.530Z",
    "size": 450342,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/6.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d9ae3-bQ/jEo8NWFy/j7wauQF6ffW9vLg\"",
    "mtime": "2024-08-30T04:21:57.541Z",
    "size": 1940195,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/7.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"b9dbd-x5U36vcIOI9wnQW1zoqaYlBBtdE\"",
    "mtime": "2024-08-30T04:21:57.549Z",
    "size": 761277,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/8.jpg"
  },
  "/resource1/inner_pages/assets/img/portfolio/9.png": {
    "type": "image/png",
    "etag": "\"12d2-OLiZD7xliEGqlOyTiVedlU2k2r4\"",
    "mtime": "2024-08-30T04:21:57.550Z",
    "size": 4818,
    "path": "../public/resource1/inner_pages/assets/img/portfolio/9.png"
  },
  "/resource1/inner_pages/assets/img/posts/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"37691-3EHx9VzAEtqLl2WkkBWEadeqZPM\"",
    "mtime": "2024-08-30T04:21:57.564Z",
    "size": 226961,
    "path": "../public/resource1/inner_pages/assets/img/posts/1.jpg"
  },
  "/resource1/inner_pages/assets/img/posts/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"37425-kmSA4/EHTMU3F7QK9KjrMh101Ac\"",
    "mtime": "2024-08-30T04:21:57.569Z",
    "size": 226341,
    "path": "../public/resource1/inner_pages/assets/img/posts/2.jpg"
  },
  "/resource1/inner_pages/assets/img/posts/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"40ba9-ONPOrpuBZ35J01h8+CNQJ+HmRyo\"",
    "mtime": "2024-08-30T04:21:57.572Z",
    "size": 265129,
    "path": "../public/resource1/inner_pages/assets/img/posts/3.jpg"
  },
  "/resource1/inner_pages/assets/img/posts/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"234a6-BfFQXKYPlT6E0/7v/XDy0a5IkUU\"",
    "mtime": "2024-08-30T04:21:57.575Z",
    "size": 144550,
    "path": "../public/resource1/inner_pages/assets/img/posts/4.jpg"
  },
  "/resource1/inner_pages/assets/img/posts/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"3c61d-pxBFhpmC7ZGTUNzpr4pDW4zU1kg\"",
    "mtime": "2024-08-30T04:21:57.576Z",
    "size": 247325,
    "path": "../public/resource1/inner_pages/assets/img/posts/5.jpg"
  },
  "/resource1/inner_pages/assets/img/posts/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"2978f-5qcfRsGN9j1uq/MBw1v+2S/3bmg\"",
    "mtime": "2024-08-30T04:21:57.578Z",
    "size": 169871,
    "path": "../public/resource1/inner_pages/assets/img/posts/6.jpg"
  },
  "/resource1/inner_pages/assets/img/posts/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"48f80-wJjaevI5WNAKKK7g6gyQi3k52CE\"",
    "mtime": "2024-08-30T04:21:57.580Z",
    "size": 298880,
    "path": "../public/resource1/inner_pages/assets/img/posts/7.jpg"
  },
  "/resource1/inner_pages/assets/img/posts/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"5c017-kflNFbq+XJgRwWAPEhZm7/HZY98\"",
    "mtime": "2024-08-30T04:21:57.583Z",
    "size": 376855,
    "path": "../public/resource1/inner_pages/assets/img/posts/8.jpg"
  },
  "/resource1/inner_pages/assets/img/posts/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"3904c-lqRi5liAsDsDrXPYc+RPDkgtM/M\"",
    "mtime": "2024-08-30T04:21:57.586Z",
    "size": 233548,
    "path": "../public/resource1/inner_pages/assets/img/posts/9.jpg"
  },
  "/resource1/inner_pages/assets/img/services_page/head1.jpg": {
    "type": "image/jpeg",
    "etag": "\"72a6f-Wg8agW08vbBwzC+fTiaHScT7d6U\"",
    "mtime": "2024-08-30T04:21:57.621Z",
    "size": 469615,
    "path": "../public/resource1/inner_pages/assets/img/services_page/head1.jpg"
  },
  "/resource1/inner_pages/assets/img/services_page/head2.jpg": {
    "type": "image/jpeg",
    "etag": "\"f9a9-aHCzGKbVLEiaT9MTC8V3d2aZk0c\"",
    "mtime": "2024-08-30T04:21:57.622Z",
    "size": 63913,
    "path": "../public/resource1/inner_pages/assets/img/services_page/head2.jpg"
  },
  "/resource1/inner_pages/assets/img/services_page/ser1.png": {
    "type": "image/png",
    "etag": "\"196b7-xS7WoTrpOG4rjLtA274qNCrYd4c\"",
    "mtime": "2024-08-30T04:21:57.630Z",
    "size": 104119,
    "path": "../public/resource1/inner_pages/assets/img/services_page/ser1.png"
  },
  "/resource1/inner_pages/assets/img/services_page/ser2.png": {
    "type": "image/png",
    "etag": "\"17026-pi5l1sz52IJqv2/eQ2dJSLpYNFU\"",
    "mtime": "2024-08-30T04:21:57.631Z",
    "size": 94246,
    "path": "../public/resource1/inner_pages/assets/img/services_page/ser2.png"
  },
  "/resource1/inner_pages/assets/img/services_page/ser3.png": {
    "type": "image/png",
    "etag": "\"110cf-OoP3/+zRbJfDJ/5wDafixp8fzGw\"",
    "mtime": "2024-08-30T04:21:57.632Z",
    "size": 69839,
    "path": "../public/resource1/inner_pages/assets/img/services_page/ser3.png"
  },
  "/resource1/inner_pages/assets/img/service_details/img2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1090a1-u7DFTzsTspjELFjYgZ8Mx8xC88g\"",
    "mtime": "2024-08-30T04:21:57.596Z",
    "size": 1085601,
    "path": "../public/resource1/inner_pages/assets/img/service_details/img2.jpg"
  },
  "/resource1/inner_pages/assets/img/service_details/img3.jpg": {
    "type": "image/jpeg",
    "etag": "\"55745-D6x78OXQ5jC1qWXBxTq97+HEnOw\"",
    "mtime": "2024-08-30T04:21:57.599Z",
    "size": 350021,
    "path": "../public/resource1/inner_pages/assets/img/service_details/img3.jpg"
  },
  "/resource1/inner_pages/assets/img/service_details/main-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"23e2aa-780tEj8ODIjG3Wy6uh4V78F+2pU\"",
    "mtime": "2024-08-30T04:21:57.615Z",
    "size": 2351786,
    "path": "../public/resource1/inner_pages/assets/img/service_details/main-img.jpg"
  },
  "/resource1/inner_pages/assets/img/team/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"50a11-Ls9EgjHHW1rPGEelupjz6FBORZA\"",
    "mtime": "2024-08-30T04:21:57.639Z",
    "size": 330257,
    "path": "../public/resource1/inner_pages/assets/img/team/1.jpg"
  },
  "/resource1/inner_pages/assets/img/team/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ca36-yEXvmkhdXoB/zr+aqJHnqLahcDo\"",
    "mtime": "2024-08-30T04:21:57.641Z",
    "size": 117302,
    "path": "../public/resource1/inner_pages/assets/img/team/10.jpg"
  },
  "/resource1/inner_pages/assets/img/team/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d011-oPfkHFydH85+AEMzYZb/gHVCV1U\"",
    "mtime": "2024-08-30T04:21:57.645Z",
    "size": 380945,
    "path": "../public/resource1/inner_pages/assets/img/team/2.jpg"
  },
  "/resource1/inner_pages/assets/img/team/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"68cc3-VN5+FjEQfhFQIOX7E9r3TP32wes\"",
    "mtime": "2024-08-30T04:21:57.651Z",
    "size": 429251,
    "path": "../public/resource1/inner_pages/assets/img/team/3.jpg"
  },
  "/resource1/inner_pages/assets/img/team/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"4dd53-McxgR7ndcMr8MNMBK3NVGCOw1mM\"",
    "mtime": "2024-08-30T04:21:57.654Z",
    "size": 318803,
    "path": "../public/resource1/inner_pages/assets/img/team/4.jpg"
  },
  "/resource1/inner_pages/assets/img/team/header1.jpg": {
    "type": "image/jpeg",
    "etag": "\"e7abd-S3tSAH6yrF7AE9NBX8PCtZMr69Y\"",
    "mtime": "2024-08-30T04:21:57.663Z",
    "size": 948925,
    "path": "../public/resource1/inner_pages/assets/img/team/header1.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/accordion/1.png": {
    "type": "image/png",
    "etag": "\"1e451-paf6hPfMF3rHdme+IigJIu7pe74\"",
    "mtime": "2024-08-30T04:21:57.054Z",
    "size": 123985,
    "path": "../public/resource1/home1_creativeAgency/assets/img/accordion/1.png"
  },
  "/resource1/home1_creativeAgency/assets/img/blog/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"47ea1-wboE/MgHLRjog+uTZ57y/xSq67E\"",
    "mtime": "2024-08-30T04:21:57.065Z",
    "size": 294561,
    "path": "../public/resource1/home1_creativeAgency/assets/img/blog/1.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/blog/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"e9139-hDSI5ZQmK4zQkHgA33CBzuLAI7c\"",
    "mtime": "2024-08-30T04:21:57.072Z",
    "size": 954681,
    "path": "../public/resource1/home1_creativeAgency/assets/img/blog/2.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/clients/1.svg": {
    "type": "image/svg+xml",
    "etag": "\"181e-BdMp8lI6jiaWmVeGfBctmZVSwH4\"",
    "mtime": "2024-08-30T04:21:57.076Z",
    "size": 6174,
    "path": "../public/resource1/home1_creativeAgency/assets/img/clients/1.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/clients/2.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f5b-4KvKXAhiXfw2CC7cp6YNZSztJ8s\"",
    "mtime": "2024-08-30T04:21:57.078Z",
    "size": 8027,
    "path": "../public/resource1/home1_creativeAgency/assets/img/clients/2.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/clients/3.svg": {
    "type": "image/svg+xml",
    "etag": "\"372f-h809Oxhs72HzsKnbycrdgZXfj+4\"",
    "mtime": "2024-08-30T04:21:57.079Z",
    "size": 14127,
    "path": "../public/resource1/home1_creativeAgency/assets/img/clients/3.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/clients/4.svg": {
    "type": "image/svg+xml",
    "etag": "\"110c-aEXGhcolyKQgaX7vBFyv3E3wlIw\"",
    "mtime": "2024-08-30T04:21:57.081Z",
    "size": 4364,
    "path": "../public/resource1/home1_creativeAgency/assets/img/clients/4.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/clients/5.svg": {
    "type": "image/svg+xml",
    "etag": "\"44a5-pqH8w8LdqBsJrdzbgRRS9JxLd9U\"",
    "mtime": "2024-08-30T04:21:57.082Z",
    "size": 17573,
    "path": "../public/resource1/home1_creativeAgency/assets/img/clients/5.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/clients/6.svg": {
    "type": "image/svg+xml",
    "etag": "\"21ad1-8sPJZoA3/rdSXd18M0kWcvknMLU\"",
    "mtime": "2024-08-30T04:21:57.085Z",
    "size": 137937,
    "path": "../public/resource1/home1_creativeAgency/assets/img/clients/6.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/qt.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ac-fonp0r99jeQU9A6vMM2n28cRb9c\"",
    "mtime": "2024-08-30T04:21:57.102Z",
    "size": 428,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/qt.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/ser1.svg": {
    "type": "image/svg+xml",
    "etag": "\"696-UWdQpidQlrKIlBCs9LT/IRC7EqQ\"",
    "mtime": "2024-08-30T04:21:57.102Z",
    "size": 1686,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/ser1.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/ser2.svg": {
    "type": "image/svg+xml",
    "etag": "\"486-8CKj4MwPP0Pun4WWeaNxNl40H9A\"",
    "mtime": "2024-08-30T04:21:57.104Z",
    "size": 1158,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/ser2.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/ser3.svg": {
    "type": "image/svg+xml",
    "etag": "\"422f-+uLT0wgdD/MdlxvEimOWq/phHik\"",
    "mtime": "2024-08-30T04:21:57.104Z",
    "size": 16943,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/ser3.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/ser4.svg": {
    "type": "image/svg+xml",
    "etag": "\"9dd-jZrERSjsVKQwhQnAWH6o4yp/4L0\"",
    "mtime": "2024-08-30T04:21:57.105Z",
    "size": 2525,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/ser4.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/star1.svg": {
    "type": "image/svg+xml",
    "etag": "\"13d-+akc/PbcbiW+rWYEyarEvXueyp0\"",
    "mtime": "2024-08-30T04:21:57.105Z",
    "size": 317,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/star1.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/tit_ico.svg": {
    "type": "image/svg+xml",
    "etag": "\"b6a-6HlYFsKtkm5ckgTjjMIJSQ7BUHs\"",
    "mtime": "2024-08-30T04:21:57.106Z",
    "size": 2922,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/tit_ico.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/tit_ico2.svg": {
    "type": "image/svg+xml",
    "etag": "\"bcb-nqaMKuyQMRHzWUBo5yoXsiIDJGs\"",
    "mtime": "2024-08-30T04:21:57.108Z",
    "size": 3019,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/tit_ico2.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/un2.svg": {
    "type": "image/svg+xml",
    "etag": "\"279-ocfFckoh28oaFRsGk9SW+S+mGgY\"",
    "mtime": "2024-08-30T04:21:57.110Z",
    "size": 633,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/un2.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/icons/union.svg": {
    "type": "image/svg+xml",
    "etag": "\"298-VRn2cDCGe+CwtFe4z8C244TJCfM\"",
    "mtime": "2024-08-30T04:21:57.111Z",
    "size": 664,
    "path": "../public/resource1/home1_creativeAgency/assets/img/icons/union.svg"
  },
  "/resource1/home1_creativeAgency/assets/img/team/t1.jpg": {
    "type": "image/jpeg",
    "etag": "\"3560f-HSxUoiWqRHWLKTH/D6ydlLae3Gw\"",
    "mtime": "2024-08-30T04:21:57.169Z",
    "size": 218639,
    "path": "../public/resource1/home1_creativeAgency/assets/img/team/t1.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/team/t2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2a47f-VtvroZZcVkCOjfJYpNREcPDIIX0\"",
    "mtime": "2024-08-30T04:21:57.172Z",
    "size": 173183,
    "path": "../public/resource1/home1_creativeAgency/assets/img/team/t2.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/team/t3.jpg": {
    "type": "image/jpeg",
    "etag": "\"3c7dd-LFJotpXiMNP4KwWDw1oTuWvXLEI\"",
    "mtime": "2024-08-30T04:21:57.174Z",
    "size": 247773,
    "path": "../public/resource1/home1_creativeAgency/assets/img/team/t3.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/team/t4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b706-I9fK7oXP+hdLKrx6hJtrO7kvfhg\"",
    "mtime": "2024-08-30T04:21:57.175Z",
    "size": 112390,
    "path": "../public/resource1/home1_creativeAgency/assets/img/team/t4.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/testi/man.png": {
    "type": "image/png",
    "etag": "\"6c43f-qLisluAGP5BGpBv68n/aD2yog3E\"",
    "mtime": "2024-08-30T04:21:57.178Z",
    "size": 443455,
    "path": "../public/resource1/home1_creativeAgency/assets/img/testi/man.png"
  },
  "/resource1/home1_creativeAgency/assets/img/testi/testi_bg.png": {
    "type": "image/png",
    "etag": "\"12de95-kKFwumq3fudBUlJoM26KdpdRb8E\"",
    "mtime": "2024-08-30T04:21:57.185Z",
    "size": 1236629,
    "path": "../public/resource1/home1_creativeAgency/assets/img/testi/testi_bg.png"
  },
  "/resource1/home1_creativeAgency/assets/img/works/w1.jpg": {
    "type": "image/jpeg",
    "etag": "\"b080a-NkzW93Aym3VGCohpKJo0DGVa29c\"",
    "mtime": "2024-08-30T04:21:57.214Z",
    "size": 722954,
    "path": "../public/resource1/home1_creativeAgency/assets/img/works/w1.jpg"
  },
  "/resource1/home1_creativeAgency/assets/img/works/w2.jpg": {
    "type": "image/jpeg",
    "etag": "\"c2b15-IN4hJXb+8lEW18LJpFRC9E8BHYc\"",
    "mtime": "2024-08-30T04:21:57.221Z",
    "size": 797461,
    "path": "../public/resource1/home1_creativeAgency/assets/img/works/w2.jpg"
  },
  "/resource1/common/css/fonts/mona/MonaSans-Black.ttf": {
    "type": "font/ttf",
    "etag": "\"10758-xtas+mKdfx2aQMmEwGtGBLbxJXA\"",
    "mtime": "2024-08-30T04:21:56.671Z",
    "size": 67416,
    "path": "../public/resource1/common/css/fonts/mona/MonaSans-Black.ttf"
  },
  "/resource1/common/css/fonts/mona/MonaSans-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"10504-ImEfZp43B2DdqqbsPXBXEPgYMPk\"",
    "mtime": "2024-08-30T04:21:56.672Z",
    "size": 66820,
    "path": "../public/resource1/common/css/fonts/mona/MonaSans-Bold.ttf"
  },
  "/resource1/common/css/fonts/mona/MonaSans-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"fe3c-bE0UOKjG8uVszGSnwk3XScqf+G4\"",
    "mtime": "2024-08-30T04:21:56.674Z",
    "size": 65084,
    "path": "../public/resource1/common/css/fonts/mona/MonaSans-Light.ttf"
  },
  "/resource1/common/css/fonts/mona/MonaSans-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"fb64-VeCUpn1sglNvk2OpQ/HM04a6eBM\"",
    "mtime": "2024-08-30T04:21:56.676Z",
    "size": 64356,
    "path": "../public/resource1/common/css/fonts/mona/MonaSans-Medium.ttf"
  },
  "/resource1/common/css/fonts/mona/MonaSans-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"fb80-jJJBbHHYOTs1UMh2B8fMR5gRNfw\"",
    "mtime": "2024-08-30T04:21:56.677Z",
    "size": 64384,
    "path": "../public/resource1/common/css/fonts/mona/MonaSans-Regular.ttf"
  },
  "/resource1/common/css/fonts/mona/MonaSans-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"fc44-aL52BUw/yQmLNW769uiCC6oVMfY\"",
    "mtime": "2024-08-30T04:21:56.677Z",
    "size": 64580,
    "path": "../public/resource1/common/css/fonts/mona/MonaSans-SemiBold.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Black Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5b068-i8pRNzRSDJ/lBx88FbR0J9svw+8\"",
    "mtime": "2024-08-30T04:21:56.682Z",
    "size": 372840,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Black Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Black.ttf": {
    "type": "font/ttf",
    "etag": "\"5a250-elV2FFiBp0jODCovqeE6Djc3utA\"",
    "mtime": "2024-08-30T04:21:56.686Z",
    "size": 369232,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Black.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Bold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c61c-YQvTgNxuw8rSgTr9LBGlQBo1WBo\"",
    "mtime": "2024-08-30T04:21:56.691Z",
    "size": 378396,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Bold Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"5a800-rs3Ktg8Wg7YlmHXzf5D4+hWVaGQ\"",
    "mtime": "2024-08-30T04:21:56.694Z",
    "size": 370688,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Bold.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins ExtraBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c728-4upjqxzgl3Sav/9IoBkfqZaPbn0\"",
    "mtime": "2024-08-30T04:21:56.698Z",
    "size": 378664,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins ExtraBold Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"5903c-w1xAc27o8SwOTbcKWPcld7zkVtM\"",
    "mtime": "2024-08-30T04:21:56.702Z",
    "size": 364604,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins ExtraBold.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins ExtraLight Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"59590-AIq8SH+s/woDUVYZSHnBkhJXDFg\"",
    "mtime": "2024-08-30T04:21:56.706Z",
    "size": 365968,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins ExtraLight Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"56008-Ec5of6Ur1K1xxQm2pfxuEr3R2ok\"",
    "mtime": "2024-08-30T04:21:56.709Z",
    "size": 352264,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins ExtraLight.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5c330-56TV8nvvqT2sJweeL6iwyv1qXb4\"",
    "mtime": "2024-08-30T04:21:56.713Z",
    "size": 377648,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Light Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"5b468-mbUoZmYUt1YZfyf5IXdaZDHT9rs\"",
    "mtime": "2024-08-30T04:21:56.717Z",
    "size": 373864,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Light Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Light.ttf": {
    "type": "font/ttf",
    "etag": "\"57dc4-ee83srcOC+I+JVnslf5Yp7nga2A\"",
    "mtime": "2024-08-30T04:21:56.720Z",
    "size": 359876,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Light.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Medium Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"59b54-wbMY8JwgWJcO06ElrEeHg4u5cJE\"",
    "mtime": "2024-08-30T04:21:56.725Z",
    "size": 367444,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Medium Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"56878-ey1LJAVfNL3MHqaXgBEFu5E0Oq8\"",
    "mtime": "2024-08-30T04:21:56.730Z",
    "size": 354424,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Medium.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"582c8-JtDW5tMbECwPP69eu72a/ZSb+Ek\"",
    "mtime": "2024-08-30T04:21:56.735Z",
    "size": 361160,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Regular.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins SemiBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"58188-HdxuQaGAU1Lrlsy1+KCsSMZpolI\"",
    "mtime": "2024-08-30T04:21:56.740Z",
    "size": 360840,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins SemiBold Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"57838-R2/OXHzZ7cFi4Kq1XfLNpWrGTfc\"",
    "mtime": "2024-08-30T04:21:56.745Z",
    "size": 358456,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins SemiBold.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Thin Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"57150-tysDbrLURplO9RTaKdTkTyknGq0\"",
    "mtime": "2024-08-30T04:21:56.750Z",
    "size": 356688,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Thin Italic.ttf"
  },
  "/resource1/common/css/fonts/popin/SVN-Poppins Thin.ttf": {
    "type": "font/ttf",
    "etag": "\"53334-fySpz34YsUrisPVJMOfKWVgmPSE\"",
    "mtime": "2024-08-30T04:21:56.754Z",
    "size": 340788,
    "path": "../public/resource1/common/css/fonts/popin/SVN-Poppins Thin.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Black Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.614Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Black Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Black.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.615Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Black.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Bold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.615Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Bold Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.615Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Bold.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins ExtraBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.616Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins ExtraBold Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.616Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins ExtraBold.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins ExtraLight Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.617Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins ExtraLight Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.617Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins ExtraLight.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.618Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Light Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.618Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Light Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Light.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.619Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Light.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Medium Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.619Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Medium Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.619Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Medium.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.620Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Regular.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins SemiBold Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.620Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins SemiBold Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.620Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins SemiBold.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Thin Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.621Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Thin Italic.ttf"
  },
  "/resource1/common/css/fonts/TTF/._SVN-Poppins Thin.ttf": {
    "type": "font/ttf",
    "etag": "\"b4-O7T7L2I/wxYS6WAvmSs3ju9S+9k\"",
    "mtime": "2024-08-30T04:21:56.621Z",
    "size": 180,
    "path": "../public/resource1/common/css/fonts/TTF/._SVN-Poppins Thin.ttf"
  },
  "/resource1/common/css/fonts/webfonts/fa-brands-400.ttf": {
    "type": "font/ttf",
    "etag": "\"2ee64-AeP0YihsUEYnk5VwQIBGu8hZIWs\"",
    "mtime": "2024-08-30T04:21:56.757Z",
    "size": 192100,
    "path": "../public/resource1/common/css/fonts/webfonts/fa-brands-400.ttf"
  },
  "/resource1/common/css/fonts/webfonts/fa-duotone-900.ttf": {
    "type": "font/ttf",
    "etag": "\"13566c-QuUUHXQQoyjn9bbisEKg8WlkFxc\"",
    "mtime": "2024-08-30T04:21:56.769Z",
    "size": 1267308,
    "path": "../public/resource1/common/css/fonts/webfonts/fa-duotone-900.ttf"
  },
  "/resource1/common/css/fonts/webfonts/fa-light-300.ttf": {
    "type": "font/ttf",
    "etag": "\"11acf4-RXCBWVrCU4lZQb6tCGOcHPG5N70\"",
    "mtime": "2024-08-30T04:21:56.781Z",
    "size": 1158388,
    "path": "../public/resource1/common/css/fonts/webfonts/fa-light-300.ttf"
  },
  "/resource1/common/css/fonts/webfonts/fa-regular-400.ttf": {
    "type": "font/ttf",
    "etag": "\"fd6b4-reS0082om31XmOkgafM8h5/ElJE\"",
    "mtime": "2024-08-30T04:21:56.787Z",
    "size": 1038004,
    "path": "../public/resource1/common/css/fonts/webfonts/fa-regular-400.ttf"
  },
  "/resource1/common/css/fonts/webfonts/fa-solid-900.ttf": {
    "type": "font/ttf",
    "etag": "\"dd9b0-IJgK+NEEO1GUAunV+ud1o4oh5eQ\"",
    "mtime": "2024-08-30T04:21:56.792Z",
    "size": 907696,
    "path": "../public/resource1/common/css/fonts/webfonts/fa-solid-900.ttf"
  },
  "/resource1/common/css/fonts/webfonts/fa-thin-100.ttf": {
    "type": "font/ttf",
    "etag": "\"135e58-LO88e6WghmZY9fwfx0V/PZJNX78\"",
    "mtime": "2024-08-30T04:21:56.804Z",
    "size": 1269336,
    "path": "../public/resource1/common/css/fonts/webfonts/fa-thin-100.ttf"
  },
  "/resource1/common/css/fonts/webfonts/fa-v4compatibility.ttf": {
    "type": "font/ttf",
    "etag": "\"27bc-pM1cSoufytmIu9KuSyGmgOu6UzY\"",
    "mtime": "2024-08-30T04:21:56.804Z",
    "size": 10172,
    "path": "../public/resource1/common/css/fonts/webfonts/fa-v4compatibility.ttf"
  },
  "/resource1/common/css/fonts/WOFF/SVN-Poppins.woff": {
    "type": "font/woff",
    "etag": "\"25f58-ToitwIAaGJz5rl5BdoFKdk5fqUg\"",
    "mtime": "2024-08-30T04:21:56.624Z",
    "size": 155480,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-Poppins.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-Poppins.woff2": {
    "type": "font/woff2",
    "etag": "\"1a690-tKvcXHVtOtoVXHgsEc/nJCDCzNI\"",
    "mtime": "2024-08-30T04:21:56.625Z",
    "size": 108176,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-Poppins.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsBlack.woff": {
    "type": "font/woff",
    "etag": "\"25b18-lxiUWVChXprXhDdfX3GeEJdcw0s\"",
    "mtime": "2024-08-30T04:21:56.627Z",
    "size": 154392,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsBlack.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsBlack.woff2": {
    "type": "font/woff2",
    "etag": "\"1a894-XjXPCINYf6aU64fN4rxkLQTQZxE\"",
    "mtime": "2024-08-30T04:21:56.628Z",
    "size": 108692,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsBlack.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsBlackItalic.woff": {
    "type": "font/woff",
    "etag": "\"26ee8-HO97M68H2y3BlYbEOiCoetKVN6s\"",
    "mtime": "2024-08-30T04:21:56.629Z",
    "size": 159464,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsBlackItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsBlackItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1b03c-hrjUvP5a64jXVQzZLT+GVUhzokE\"",
    "mtime": "2024-08-30T04:21:56.631Z",
    "size": 110652,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsBlackItalic.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsBold.woff": {
    "type": "font/woff",
    "etag": "\"25f04-dj2T+YDWv4G2G12oaLRM2RC4lkQ\"",
    "mtime": "2024-08-30T04:21:56.632Z",
    "size": 155396,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsBold.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsBold.woff2": {
    "type": "font/woff2",
    "etag": "\"1a934-iW3rfeSH+kMPyl7hBQ8fzvYAMAk\"",
    "mtime": "2024-08-30T04:21:56.634Z",
    "size": 108852,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsBold.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"281cc-pFDAj1cZYyCzs5ZMTQxxJ7a1awg\"",
    "mtime": "2024-08-30T04:21:56.635Z",
    "size": 164300,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsBoldItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1bed8-DT7uTyF95/1iMWPz34v3ja/o6HA\"",
    "mtime": "2024-08-30T04:21:56.637Z",
    "size": 114392,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsBoldItalic.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"25b78-dYdGepj+d+XKtuhBId54xy0ZV7w\"",
    "mtime": "2024-08-30T04:21:56.638Z",
    "size": 154488,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraBold.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"1a880-1elgrAozhaUzBPdoe5CwN8smFyo\"",
    "mtime": "2024-08-30T04:21:56.639Z",
    "size": 108672,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraBold.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"27de0-cmj55OC08o97dcPtYp9FAuCsdG8\"",
    "mtime": "2024-08-30T04:21:56.640Z",
    "size": 163296,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraBoldItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1bb94-FbC8Wj1qIPRBWjbzMjnqD2NKxTs\"",
    "mtime": "2024-08-30T04:21:56.642Z",
    "size": 113556,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraBoldItalic.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"24ec0-Dg2R2EEeAHy4DBNn202D5kEtle8\"",
    "mtime": "2024-08-30T04:21:56.644Z",
    "size": 151232,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraLight.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"19780-E2V6xj/fy6zm+B/IAmS/lSsZh9U\"",
    "mtime": "2024-08-30T04:21:56.645Z",
    "size": 104320,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraLight.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"27224-7g4ZgTSwPQ8Za4D9mee9xfkBih0\"",
    "mtime": "2024-08-30T04:21:56.646Z",
    "size": 160292,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraLightItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraLightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1ae70-OgoY3rhwbnv/wReIuKeXuS5UjJg\"",
    "mtime": "2024-08-30T04:21:56.648Z",
    "size": 110192,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsExtraLightItalic.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsItalic.woff": {
    "type": "font/woff",
    "etag": "\"28804-6Z/0AzN2OHYCRMlzelWdc4SUWeE\"",
    "mtime": "2024-08-30T04:21:56.649Z",
    "size": 165892,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1c190-fwAxjv6WCE81WwS7fvz/55mT8sk\"",
    "mtime": "2024-08-30T04:21:56.651Z",
    "size": 115088,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsItalic.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsLight.woff": {
    "type": "font/woff",
    "etag": "\"257b4-0DtuomW6XdsedHb18abY+8LtClc\"",
    "mtime": "2024-08-30T04:21:56.652Z",
    "size": 153524,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsLight.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsLight.woff2": {
    "type": "font/woff2",
    "etag": "\"1a084-GFPjKJqDRQ6HDJ+ReG8AbrbdTHA\"",
    "mtime": "2024-08-30T04:21:56.653Z",
    "size": 106628,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsLight.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"27c9c-H+3SYtFLZ3jTYSK/sZ2GHhclRc0\"",
    "mtime": "2024-08-30T04:21:56.655Z",
    "size": 162972,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsLightItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsLightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1b75c-MAeKuffcgJPq2hpcTPBuCJPVPME\"",
    "mtime": "2024-08-30T04:21:56.656Z",
    "size": 112476,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsLightItalic.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsMedium.woff": {
    "type": "font/woff",
    "etag": "\"25784-nP7sc38MWnnSAyV+9qA3+Z1LIiE\"",
    "mtime": "2024-08-30T04:21:56.657Z",
    "size": 153476,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsMedium.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsMedium.woff2": {
    "type": "font/woff2",
    "etag": "\"1a040-cJ/I6wFeKea5rTkR/QVju6qoBaw\"",
    "mtime": "2024-08-30T04:21:56.657Z",
    "size": 106560,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsMedium.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsMediumItalic.woff": {
    "type": "font/woff",
    "etag": "\"27b68-Fv83F9bAOX3PM1ZhOOKhUR1bHW4\"",
    "mtime": "2024-08-30T04:21:56.658Z",
    "size": 162664,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsMediumItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsMediumItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1b6c4-ojuLFaqgLzKYkvq/RFfvp1LPu5A\"",
    "mtime": "2024-08-30T04:21:56.659Z",
    "size": 112324,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsMediumItalic.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsSemiBold.woff": {
    "type": "font/woff",
    "etag": "\"25ed0-xMlv/MpSl2sBdj0wpbJZoKb7MXA\"",
    "mtime": "2024-08-30T04:21:56.660Z",
    "size": 155344,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsSemiBold.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsSemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"1a814-Du+mDcp0BfONqjPLdj7ZFBIZ3CA\"",
    "mtime": "2024-08-30T04:21:56.661Z",
    "size": 108564,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsSemiBold.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsSemiBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"278ac-4c7JMFhzQMbVAou2xQee6BOzqUw\"",
    "mtime": "2024-08-30T04:21:56.662Z",
    "size": 161964,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsSemiBoldItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsSemiBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"1b8c0-BhKRmfhh0LZd+lbjVGPawSSz+w0\"",
    "mtime": "2024-08-30T04:21:56.663Z",
    "size": 112832,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsSemiBoldItalic.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsThin.woff": {
    "type": "font/woff",
    "etag": "\"231bc-ZnKf5hcfpg8nOVArqSYGTAIzI3g\"",
    "mtime": "2024-08-30T04:21:56.665Z",
    "size": 143804,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsThin.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsThin.woff2": {
    "type": "font/woff2",
    "etag": "\"182e8-HPx66rfNk7WQy+UiYr6U8+TVtSE\"",
    "mtime": "2024-08-30T04:21:56.666Z",
    "size": 99048,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsThin.woff2"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsThinItalic.woff": {
    "type": "font/woff",
    "etag": "\"25ca0-cGNUHy32jDCYH1uUmgCSjlvYMi4\"",
    "mtime": "2024-08-30T04:21:56.667Z",
    "size": 154784,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsThinItalic.woff"
  },
  "/resource1/common/css/fonts/WOFF/SVN-PoppinsThinItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"19c04-B32pV/DN+HB5VvqbkvYNZhhsXj8\"",
    "mtime": "2024-08-30T04:21:56.668Z",
    "size": 105476,
    "path": "../public/resource1/common/css/fonts/WOFF/SVN-PoppinsThinItalic.woff2"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/f1.svg": {
    "type": "image/svg+xml",
    "etag": "\"577d-NVhjZoLqRjGNg6ph00HXpLqpRiA\"",
    "mtime": "2024-08-30T04:21:57.622Z",
    "size": 22397,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/f1.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/f2.svg": {
    "type": "image/svg+xml",
    "etag": "\"2db8-u/2+RG2Z85j7sORJQ3dc22zOoXI\"",
    "mtime": "2024-08-30T04:21:57.623Z",
    "size": 11704,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/f2.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/f3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3255-g/Brfe+6SL/MOLeeDjHghScoOIM\"",
    "mtime": "2024-08-30T04:21:57.623Z",
    "size": 12885,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/f3.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/f4.svg": {
    "type": "image/svg+xml",
    "etag": "\"4dd4-VU7lVIk+An7zApjjHZBtISLXufc\"",
    "mtime": "2024-08-30T04:21:57.624Z",
    "size": 19924,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/f4.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/f5.svg": {
    "type": "image/svg+xml",
    "etag": "\"8c7b-sbaaopmOy3LH/zvZmpAdszARejo\"",
    "mtime": "2024-08-30T04:21:57.627Z",
    "size": 35963,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/f5.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/f6.svg": {
    "type": "image/svg+xml",
    "etag": "\"1fc4-Am6vMFJn61OmLbZC5TH7MZOEPUg\"",
    "mtime": "2024-08-30T04:21:57.627Z",
    "size": 8132,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/f6.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/f7.svg": {
    "type": "image/svg+xml",
    "etag": "\"1940-T8CneCOHJ9jnHCIqyvlAeebu/lY\"",
    "mtime": "2024-08-30T04:21:57.627Z",
    "size": 6464,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/f7.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/f8.svg": {
    "type": "image/svg+xml",
    "etag": "\"5e46-EXTrT55Pb6e6mafsG0dI2eLr/6w\"",
    "mtime": "2024-08-30T04:21:57.628Z",
    "size": 24134,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/f8.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/sr1.svg": {
    "type": "image/svg+xml",
    "etag": "\"46e-EYo1NvufnI/cmVXHM6UYqfit/kg\"",
    "mtime": "2024-08-30T04:21:57.629Z",
    "size": 1134,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/sr1.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/sr2.svg": {
    "type": "image/svg+xml",
    "etag": "\"508-jDSCx2lmWDBomWZBbaJGqs9MTSI\"",
    "mtime": "2024-08-30T04:21:57.629Z",
    "size": 1288,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/sr2.svg"
  },
  "/resource1/inner_pages/assets/img/services_page/icons/sr3.svg": {
    "type": "image/svg+xml",
    "etag": "\"50d-G6IVZB05BrPe6leStfHfCCGpmDM\"",
    "mtime": "2024-08-30T04:21:57.629Z",
    "size": 1293,
    "path": "../public/resource1/inner_pages/assets/img/services_page/icons/sr3.svg"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_WAWvyq = () => import('./routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_WAWvyq, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_WAWvyq, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof vt.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { send as a, setResponseStatus as b, useNitroApp as c, setResponseHeaders as d, eventHandler as e, getQuery as f, getResponseStatus as g, createError$1 as h, getRouteRules as i, joinRelativeURL as j, getResponseStatusText as k, sanitizeStatusCode as l, createHooks as m, createRouter$1 as n, nodeServer as o, setResponseHeader as s, toRouteMatcher as t, useRuntimeConfig as u };
//# sourceMappingURL=runtime.mjs.map
