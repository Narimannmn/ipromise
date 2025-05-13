import { t } from "i18next";

const informationalStatusCodes = {
  100: t("100", { defaultValue: "Continue", ns: "apiResponseStatuses" }),
  101: t("101", {
    defaultValue: "Switching Protocols",
    ns: "apiResponseStatuses",
  }),
  102: t("102", { defaultValue: "Processing", ns: "apiResponseStatuses" }),
  103: t("103", { defaultValue: "Early Hints", ns: "apiResponseStatuses" }),
};

const successStatusCodes = {
  200: t("200", { defaultValue: "OK", ns: "apiResponseStatuses" }),
  201: t("201", { defaultValue: "Created", ns: "apiResponseStatuses" }),
  202: t("202", { defaultValue: "Accepted", ns: "apiResponseStatuses" }),
  203: t("203", {
    defaultValue: "Non-Authoritative Information",
    ns: "apiResponseStatuses",
  }),
  204: t("204", { defaultValue: "No Content", ns: "apiResponseStatuses" }),
  205: t("205", { defaultValue: "Reset Content", ns: "apiResponseStatuses" }),
  206: t("206", { defaultValue: "Partial Content", ns: "apiResponseStatuses" }),
  207: t("207", { defaultValue: "Multi-Status", ns: "apiResponseStatuses" }),
  208: t("208", {
    defaultValue: "Already Reported",
    ns: "apiResponseStatuses",
  }),
  226: t("226", { defaultValue: "IM Used", ns: "apiResponseStatuses" }),
};

const redirectionStatusCodes = {
  300: t("300", {
    defaultValue: "Multiple Choices",
    ns: "apiResponseStatuses",
  }),
  301: t("301", {
    defaultValue: "Moved Permanently",
    ns: "apiResponseStatuses",
  }),
  302: t("302", { defaultValue: "Found", ns: "apiResponseStatuses" }),
  303: t("303", { defaultValue: "See Other", ns: "apiResponseStatuses" }),
  304: t("304", { defaultValue: "Not Modified", ns: "apiResponseStatuses" }),
  305: t("305", { defaultValue: "Use Proxy", ns: "apiResponseStatuses" }),
  306: t("306", { defaultValue: "Switch Proxy", ns: "apiResponseStatuses" }),
  307: t("307", {
    defaultValue: "Temporary Redirect",
    ns: "apiResponseStatuses",
  }),
  308: t("308", {
    defaultValue: "Permanent Redirect",
    ns: "apiResponseStatuses",
  }),
};

const clientStatusCodes = {
  400: t("400", { defaultValue: "Bad Request", ns: "apiResponseStatuses" }),
  401: t("401", { defaultValue: "Unauthorized", ns: "apiResponseStatuses" }),
  402: t("402", {
    defaultValue: "Payment Required",
    ns: "apiResponseStatuses",
  }),
  403: t("403", { defaultValue: "Forbidden", ns: "apiResponseStatuses" }),
  404: t("404", { defaultValue: "Not Found", ns: "apiResponseStatuses" }),
  405: t("405", {
    defaultValue: "Method Not Allowed",
    ns: "apiResponseStatuses",
  }),
  406: t("406", { defaultValue: "Not Acceptable", ns: "apiResponseStatuses" }),
  407: t("407", {
    defaultValue: "Proxy Authentication Required",
    ns: "apiResponseStatuses",
  }),
  408: t("408", { defaultValue: "Request Timeout", ns: "apiResponseStatuses" }),
  409: t("409", { defaultValue: "Conflict", ns: "apiResponseStatuses" }),
  410: t("410", { defaultValue: "Gone", ns: "apiResponseStatuses" }),
  411: t("411", { defaultValue: "Length Required", ns: "apiResponseStatuses" }),
  412: t("412", {
    defaultValue: "Precondition Failed",
    ns: "apiResponseStatuses",
  }),
  413: t("413", {
    defaultValue: "Payload Too Large",
    ns: "apiResponseStatuses",
  }),
  414: t("414", { defaultValue: "URI Too Long", ns: "apiResponseStatuses" }),
  415: t("415", {
    defaultValue: "Unsupported Media Type",
    ns: "apiResponseStatuses",
  }),
  416: t("416", {
    defaultValue: "Range Not Satisfiable",
    ns: "apiResponseStatuses",
  }),
  417: t("417", {
    defaultValue: "Expectation Failed",
    ns: "apiResponseStatuses",
  }),
  418: t("418", { defaultValue: "I'm a teapot", ns: "apiResponseStatuses" }),
  421: t("421", {
    defaultValue: "Misdirected Request",
    ns: "apiResponseStatuses",
  }),
  422: t("422", {
    defaultValue: "Unprocessable Entity",
    ns: "apiResponseStatuses",
  }),
  423: t("423", { defaultValue: "Locked", ns: "apiResponseStatuses" }),
  424: t("424", {
    defaultValue: "Failed Dependency",
    ns: "apiResponseStatuses",
  }),
  425: t("425", { defaultValue: "Too Early", ns: "apiResponseStatuses" }),
  426: t("426", {
    defaultValue: "Upgrade Required",
    ns: "apiResponseStatuses",
  }),
  428: t("428", {
    defaultValue: "Precondition Required",
    ns: "apiResponseStatuses",
  }),
  429: t("429", {
    defaultValue: "Too Many Requests",
    ns: "apiResponseStatuses",
  }),
  431: t("431", {
    defaultValue: "Request Header Fields Too Large",
    ns: "apiResponseStatuses",
  }),
  451: t("451", {
    defaultValue: "Unavailable For Legal Reasons",
    ns: "apiResponseStatuses",
  }),
};

const serverStatusCodes = {
  500: t("500", {
    defaultValue: "Internal Server Error",
    ns: "apiResponseStatuses",
  }),
  501: t("501", { defaultValue: "Not Implemented", ns: "apiResponseStatuses" }),
  502: t("502", { defaultValue: "Bad Gateway", ns: "apiResponseStatuses" }),
  503: t("503", {
    defaultValue: "Service Unavailable",
    ns: "apiResponseStatuses",
  }),
  504: t("504", { defaultValue: "Gateway Timeout", ns: "apiResponseStatuses" }),
  505: t("505", {
    defaultValue: "HTTP Version Not Supported",
    ns: "apiResponseStatuses",
  }),
  506: t("506", {
    defaultValue: "Variant Also Negotiates",
    ns: "apiResponseStatuses",
  }),
  507: t("507", {
    defaultValue: "Insufficient Storage",
    ns: "apiResponseStatuses",
  }),
  508: t("508", { defaultValue: "Loop Detected", ns: "apiResponseStatuses" }),
  510: t("510", { defaultValue: "Not Extended", ns: "apiResponseStatuses" }),
  511: t("511", {
    defaultValue: "Network Authentication Required",
    ns: "apiResponseStatuses",
  }),
};

const customStatusCodes = {
  0: "Network Error",
};

export const statusCodes: Record<number, string> = {
  ...informationalStatusCodes,
  ...successStatusCodes,
  ...redirectionStatusCodes,
  ...clientStatusCodes,
  ...serverStatusCodes,
  ...customStatusCodes,
};
