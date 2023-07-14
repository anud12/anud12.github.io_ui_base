var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  Form: () => Form,
  Input: () => Input,
  Link: () => Link,
  Page: () => Page,
  Table: () => Table
});
module.exports = __toCommonJS(src_exports);

// src/components/Page.tsx
var import_react7 = __toESM(require("react"));

// src/components/Comment.tsx
var import_react = __toESM(require("react"));
var Comment = ({ children }) => {
  return /* @__PURE__ */ import_react.default.createElement("div", { dangerouslySetInnerHTML: { __html: `<!-- ${children} -->` } });
};

// src/components/Header.tsx
var import_react6 = __toESM(require("react"));

// src/components/Container.tsx
var import_react2 = __toESM(require("react"));
var CardContainer = (props) => {
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "container-container" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: `container card-container ${props.className ?? ""}`.trim() }, props.children));
};

// src/components/atoms/Link.tsx
var import_react3 = __toESM(require("react"));

// src/service/google/config.ts
var config = {
  apiKey: "AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA",
  clientId: "985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com",
  scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile ",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
};

// src/service/google/loadGoogleDependencies.ts
var loadScript = (src) => new Promise((resolve, reject) => {
  if (!globalThis.document) {
    return;
  }
  resolve();
});
var loadGoogleDependencies = Promise.all([
  loadScript("https://apis.google.com/js/api.js"),
  loadScript("https://accounts.google.com/gsi/client")
]);

// src/service/google/gapiClientPromise.ts
var gapiClientPromise = new Promise(async (resolve) => {
  await loadGoogleDependencies;
  gapi.load("client", async () => {
    const client = await gapi.client.init({
      apiKey: config.apiKey,
      discoveryDocs: config.discoveryDocs
    });
    await new Promise((resolve2) => gapi.client.load("sheets", "v4", function() {
      resolve2();
    }));
    resolve(gapi);
  });
});

// src/service/google/getExpirationDate.ts
var getExpirationDate = async () => {
  const gapi2 = await gapiClientPromise;
  const token = gapi2?.auth?.getToken();
  if (!token) {
    return new Promise((res) => res(void 0));
  }
  return fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token.access_token}`).then(async (res) => {
    if (res.status !== 200) {
      throw Error(`getExpirationDate status ${res.status}`);
    }
    return (await res.json())?.expires_in;
  });
};

// src/service/google/tokenClientPromise.ts
var tokenClientPromise = new Promise(async (res) => {
  await loadGoogleDependencies;
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: config.clientId,
    scope: config.scope,
    redirect_uri: "http://localhost:8080",
    callback: () => {
    }
  });
  res(tokenClient);
});

// src/service/impl/newApi.ts
function addQueryParam(value) {
  const newUrl = new URL(window.location.href);
  newUrl.hash = JSON.stringify(value);
  window.history.replaceState(null, "", newUrl.href);
}
var newApi = {
  sessionName: () => new Promise(async (resolve) => {
    const gapi2 = await gapiClientPromise;
    gapi2.client.request({
      "path": "https://people.googleapis.com/v1/people/me?personFields=names",
      "method": "GET",
      "callback": function(response) {
        resolve(response?.names?.[0]?.displayName);
      }
    });
  }),
  loadFromUrl: async () => {
    const gapi2 = await gapiClientPromise;
    const credentialsFromUrl = decodeURI(window.location.hash.replace("#", ""));
    if (credentialsFromUrl) {
      const credentials = JSON.parse(credentialsFromUrl);
      await gapi2.client.init({});
      gapi2.client.setToken(credentials);
      document.dispatchEvent(new CustomEvent("newApi-onChange"));
    }
    return false;
  },
  onChange: (callback) => {
    const fn = (event) => {
      callback(event);
    };
    globalThis?.document?.addEventListener("newApi-onChange", fn);
    return () => globalThis?.document?.removeEventListener("newApi-onChange", fn);
  },
  logout: async () => {
    const gapi2 = await gapiClientPromise;
    gapi2.client.setToken(null);
    window.location.hash = "";
    document.dispatchEvent(new CustomEvent("newApi-onChange"));
  },
  login: async () => new Promise(async (resolve) => {
    const tokenClient = await tokenClientPromise;
    try {
      if (await newApi.loadFromUrl()) {
        await getExpirationDate();
        return;
      }
    } catch {
    }
    tokenClient.callback = (credentialsResponse) => {
      addQueryParam(credentialsResponse);
      document.dispatchEvent(new CustomEvent("newApi-onChange"));
      resolve();
    };
    tokenClient.requestAccessToken({ prompt: "consent" });
  })
};

// src/components/atoms/Link.tsx
var Link = (props) => {
  const [searchParams, setSearchParams] = (0, import_react3.useState)("");
  (0, import_react3.useEffect)(() => {
    setSearchParams(window.location.hash);
    const fn = () => {
      setSearchParams(window.location.hash);
    };
    const subscription = newApi.onChange(() => {
      fn();
    });
    window.addEventListener("hashchange", fn);
    return () => {
      window.removeEventListener("hashchange", fn);
      subscription();
    };
  }, []);
  return /* @__PURE__ */ import_react3.default.createElement("a", { className: "link", href: props.href + searchParams }, props.children);
};

// src/components/api/signIn.tsx
var import_react5 = __toESM(require("react"));

// src/components/atoms/Button.tsx
var import_react4 = __toESM(require("react"));
var Button = (props) => {
  return /* @__PURE__ */ import_react4.default.createElement("button", { ...props, className: "button" }, props.children);
};

// src/components/api/signIn.tsx
var SignIn = () => {
  const [state, setState] = (0, import_react5.useState)(void 0);
  const callback = (0, import_react5.useCallback)(() => {
    if (state) {
      newApi.logout();
      return;
    }
    newApi.login();
  }, [state]);
  (0, import_react5.useEffect)(() => {
    newApi.sessionName().then(setState);
    const unsubscribe = newApi.onChange(async (e) => {
      setState(await newApi.sessionName());
    });
    newApi.loadFromUrl();
    return unsubscribe;
  }, []);
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Button, { onClick: callback }, state ? `Logout of ${state}` : "Login"));
};

// src/components/Header.tsx
var buildBack = (index) => new Array(index + 1).fill("..").join("/");
var buildPath = () => {
  const href = globalThis?.window?.location.href;
  const url = href ? new URL(href) : void 0;
  const path = url?.pathname?.split("/").filter((e) => e) ?? [];
  path.reverse();
  path.splice(0, 1);
  path.reverse();
  return path;
};
var Header = (props) => {
  const path = buildPath();
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(CardContainer, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-content" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-title" }, props.children), /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-login" }, /* @__PURE__ */ import_react6.default.createElement(SignIn, null))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "border-top header-url-chips" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(Link, { href: "/" }, "Home")), path.reverse().map(
    (e, index) => /* @__PURE__ */ import_react6.default.createElement("div", { key: e }, /* @__PURE__ */ import_react6.default.createElement(Link, { href: buildBack(index) }, e))
  ).reverse())));
};

// src/components/Page.tsx
var time = (/* @__PURE__ */ new Date()).toISOString();
var Page = (props) => {
  const theme = props.theme ?? {};
  return /* @__PURE__ */ import_react7.default.createElement("html", null, /* @__PURE__ */ import_react7.default.createElement("head", null, /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://anud.ro/ui_base/src/main.css", type: "text/css", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" }), /* @__PURE__ */ import_react7.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://apis.google.com/js/api.js" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://accounts.google.com/gsi/client" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://izitoast.marcelodolza.com/js/iziToast.min.js?v=140b" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://izitoast.marcelodolza.com/css/iziToast.min.css?v=140a", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani&display=swap", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap", rel: "stylesheet" })), /* @__PURE__ */ import_react7.default.createElement("body", null, /* @__PURE__ */ import_react7.default.createElement(Comment, null, time), /* @__PURE__ */ import_react7.default.createElement("div", { className: "page", style: {
    "--primary": theme["--primary"] ?? "#0074cc",
    "--background-color": theme["--background-color"] ?? "white",
    "--border-color": theme["--border-color"] ?? "#c4c4c4"
  } }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "page-content" }, /* @__PURE__ */ import_react7.default.createElement(Header, null, props.title), props.children))));
};

// src/components/Table.tsx
var import_react8 = __toESM(require("react"));

// src/service/arrayToObjects.ts
function arrayToObject(arr) {
  var keys = arr[0];
  return arr.slice(1).map(function(row) {
    return keys.reduce(function(obj, key, i) {
      obj[key] = row[i];
      return obj;
    }, {});
  });
}

// src/service/google/loadFromSheet.ts
var loadFromSheet = (source) => new Promise(async (resolve, reject) => {
  var url = `https://sheets.googleapis.com/v4/spreadsheets/${source}/values/Sheet1`;
  const gapi2 = await gapiClientPromise;
  var accessToken = gapi2.auth.getToken().access_token;
  var headers = new Headers();
  headers.append("Authorization", "Bearer " + accessToken);
  var options = {
    method: "GET",
    headers
  };
  fetch(url, options).then(function(response) {
    if (!response.ok) {
      throw new Error("Failed to fetch spreadsheet data");
    }
    return response.json();
  }).then(function(data) {
    var range = data.values;
    resolve(arrayToObject(range));
  });
}).catch((e) => {
  throw e.result.error;
});

// src/components/Table.tsx
var Table = (props) => {
  const [data, setData] = (0, import_react8.useState)([]);
  const loadData = async () => {
    const data2 = await loadFromSheet(props.source).catch((e) => e);
    setData(data2);
  };
  (0, import_react8.useEffect)(() => {
    const unsubscribe = newApi.onChange(loadData);
    return () => unsubscribe();
  }, [props.source]);
  return /* @__PURE__ */ import_react8.default.createElement(import_react8.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(CardContainer, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "table-container" }, data instanceof Array && /* @__PURE__ */ import_react8.default.createElement("div", { className: "table", style: { "--number-of-columns": Object.keys(data?.[0] ?? {}).length, "--number-of-rows": "20" } }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "row" }, Object.keys(data?.[0] ?? {}).map(
    (header, jndex) => /* @__PURE__ */ import_react8.default.createElement("div", { key: jndex }, header)
  )), data.map(
    (e, index) => /* @__PURE__ */ import_react8.default.createElement("div", { key: index, className: "row" }, Object.values(e).map(
      (column, jndex) => /* @__PURE__ */ import_react8.default.createElement("div", { key: jndex }, String(column))
    ))
  )), !(data instanceof Array) && /* @__PURE__ */ import_react8.default.createElement("pre", { style: { whiteSpace: "break-spaces" } }, "Failed to load table ", props.source, " Reason:", /* @__PURE__ */ import_react8.default.createElement("br", null), JSON.stringify(data, null, 2)))));
};

// src/components/Form.tsx
var import_react10 = __toESM(require("react"));

// src/service/google/uploadToFile.ts
var uploadFormDataToFolder = (parentId, data) => async (event) => {
  event.preventDefault();
  const gapi2 = await gapiClientPromise;
  const idToken = gapi2.client.getToken().access_token;
  return fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", {
    method: "POST",
    headers: new Headers({
      "Authorization": `Bearer ${idToken}`,
      "Content-Type": "application/json; charset=UTF-8"
    }),
    body: JSON.stringify({
      name: "form-data.json",
      parents: [parentId]
    })
  }).then(async (apiResponse) => {
    return fetch(await apiResponse.headers.get("Location") ?? "", {
      method: "PUT",
      headers: new Headers({
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data)
    });
  });
};

// src/components/atoms/Title.tsx
var import_react9 = __toESM(require("react"));
var Title = (props) => /* @__PURE__ */ import_react9.default.createElement("div", { className: "title" }, props.children);

// src/components/Form.tsx
var FormContext = (0, import_react10.createContext)({
  state: {},
  setState: (...args) => {
  }
});
var Form = (props) => {
  const [state, setState] = (0, import_react10.useState)({});
  const onSubmit = (0, import_react10.useCallback)((event) => {
    uploadFormDataToFolder(props.folderId, state)(event).then(() => {
      if (!globalThis.document) {
        return;
      }
      iziToast.success({
        icon: "icon-person",
        title: "Upload succesfull",
        position: "bottomRight"
      });
    }).catch((e) => {
      if (!globalThis.document) {
        return;
      }
      iziToast.error({
        timeout: 2e4,
        title: `${e.name}:${e.message}`,
        position: "bottomRight"
      });
    });
  }, [state]);
  return /* @__PURE__ */ import_react10.default.createElement(import_react10.Fragment, null, /* @__PURE__ */ import_react10.default.createElement(CardContainer, null, props.title && /* @__PURE__ */ import_react10.default.createElement(Title, null, props.title), /* @__PURE__ */ import_react10.default.createElement("form", { className: "form", onSubmit: (e) => onSubmit(e) }, /* @__PURE__ */ import_react10.default.createElement(FormContext.Provider, { value: { state, setState } }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "form-content" }, props.children)), /* @__PURE__ */ import_react10.default.createElement("div", { className: "submit-container" }, /* @__PURE__ */ import_react10.default.createElement(Button, null, "Submit")))));
};

// src/components/atoms/Input.tsx
var import_react11 = __toESM(require("react"));
var kebabToSentence = (str) => str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
var camelToSentence = (str) => str.replace(/([A-Z])/g, " $1").replace(/^./, (str2) => str2.toUpperCase());
var snakeToSentence = (str) => str.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
var lowercaseIgnoringGroups = (str) => str.replaceAll(/([a-z]|\s)([A-Z])([a-z]|\s)/g, (match, p1, p2, p3) => p1 + p2.toLowerCase() + p3);
var stringToSentence = (str) => {
  if (str.includes("-")) {
    return kebabToSentence(str);
  } else if (str.includes("_")) {
    return snakeToSentence(str);
  } else {
    return camelToSentence(str);
  }
};
var fileToBase64 = (file) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(void 0);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader?.result?.split?.(",")[1]);
    };
  });
};
var Input = (props) => {
  const { state, setState } = (0, import_react11.useContext)(FormContext);
  const ref = (0, import_react11.useRef)(null);
  (0, import_react11.useEffect)(() => {
    if (props.type !== "file") {
      return;
    }
    if (ref.current) {
      ref.current.value = null;
    }
  }, [props.type, ref]);
  const onChange = (0, import_react11.useCallback)((e) => {
    const file = e?.target?.files?.[0];
    if (props.type === "file") {
      fileToBase64(file).then((fileData) => {
        setState({ ...state, [props.name]: { data: fileData, mimeType: file.type } });
      });
      return;
    }
    setState({ ...state, [props.name]: e.target.value });
  }, [props.type, setState, state]);
  const value = (0, import_react11.useMemo)(() => {
    if (props.type === "file") {
      return void 0;
    }
    return state[props.name];
  }, [state]);
  (0, import_react11.useEffect)(() => {
    ref.current && setState({ ...state, [props.name]: ref.current.value });
  }, [ref.current]);
  return /* @__PURE__ */ import_react11.default.createElement("label", { className: "input" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "input-name" }, lowercaseIgnoringGroups(stringToSentence(props.name))), /* @__PURE__ */ import_react11.default.createElement(
    "input",
    {
      ref,
      type: props.type ?? "text",
      value,
      required: props.isOptional && false || true,
      capture: props.capture,
      accept: props.accept,
      onChange
    }
  ));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Form,
  Input,
  Link,
  Page,
  Table
});
