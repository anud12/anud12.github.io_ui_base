var mainComponent = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

  // external-global-plugin:react
  var require_react = __commonJS({
    "external-global-plugin:react"(exports, module) {
      module.exports = globalThis.React;
    }
  });

  // src/components/Comment.tsx
  var import_react, Comment;
  var init_Comment = __esm({
    "src/components/Comment.tsx"() {
      import_react = __toESM(require_react());
      Comment = ({ children }) => {
        return /* @__PURE__ */ import_react.default.createElement("div", { dangerouslySetInnerHTML: { __html: `<!-- ${children} -->` } });
      };
    }
  });

  // src/components/Container.tsx
  var import_react2, CardContainer;
  var init_Container = __esm({
    "src/components/Container.tsx"() {
      import_react2 = __toESM(require_react());
      CardContainer = (props) => {
        return /* @__PURE__ */ import_react2.default.createElement("div", { className: "container-container" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: `container card-container ${props.className ?? ""}`.trim() }, props.children));
      };
    }
  });

  // src/service/google/config.ts
  var config;
  var init_config = __esm({
    "src/service/google/config.ts"() {
      config = {
        apiKey: "AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA",
        clientId: "985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile ",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
      };
    }
  });

  // src/service/google/loadGoogleDependencies.ts
  var loadScript, loadGoogleDependencies;
  var init_loadGoogleDependencies = __esm({
    "src/service/google/loadGoogleDependencies.ts"() {
      loadScript = (src) => new Promise((resolve, reject) => {
        if (!globalThis.document) {
          return;
        }
        resolve();
      });
      loadGoogleDependencies = Promise.all([
        loadScript("https://apis.google.com/js/api.js"),
        loadScript("https://accounts.google.com/gsi/client")
      ]);
    }
  });

  // src/service/google/gapiClientPromise.ts
  var gapiClientPromise;
  var init_gapiClientPromise = __esm({
    "src/service/google/gapiClientPromise.ts"() {
      init_config();
      init_loadGoogleDependencies();
      gapiClientPromise = new Promise(async (resolve) => {
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
    }
  });

  // src/service/google/getExpirationDate.ts
  var getExpirationDate;
  var init_getExpirationDate = __esm({
    "src/service/google/getExpirationDate.ts"() {
      init_gapiClientPromise();
      getExpirationDate = async () => {
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
    }
  });

  // src/service/google/tokenClientPromise.ts
  var tokenClientPromise;
  var init_tokenClientPromise = __esm({
    "src/service/google/tokenClientPromise.ts"() {
      init_config();
      init_loadGoogleDependencies();
      tokenClientPromise = new Promise(async (res) => {
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
    }
  });

  // src/service/impl/newApi.ts
  function addQueryParam(value) {
    const newUrl = new URL(window.location.href);
    newUrl.hash = JSON.stringify(value);
    window.history.replaceState(null, "", newUrl.href);
  }
  var newApi;
  var init_newApi = __esm({
    "src/service/impl/newApi.ts"() {
      init_gapiClientPromise();
      init_getExpirationDate();
      init_tokenClientPromise();
      newApi = {
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
    }
  });

  // src/components/atoms/Link.tsx
  var import_react3, Link;
  var init_Link = __esm({
    "src/components/atoms/Link.tsx"() {
      import_react3 = __toESM(require_react());
      init_newApi();
      Link = (props) => {
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
    }
  });

  // src/components/atoms/Button.tsx
  var import_react4, Button;
  var init_Button = __esm({
    "src/components/atoms/Button.tsx"() {
      import_react4 = __toESM(require_react());
      Button = (props) => {
        return /* @__PURE__ */ import_react4.default.createElement("button", { ...props, className: "button" }, props.children);
      };
    }
  });

  // src/components/api/signIn.tsx
  var import_react5, SignIn;
  var init_signIn = __esm({
    "src/components/api/signIn.tsx"() {
      import_react5 = __toESM(require_react());
      init_newApi();
      init_Button();
      SignIn = () => {
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
    }
  });

  // src/components/Header.tsx
  var import_react6, buildBack, buildPath, Header;
  var init_Header = __esm({
    "src/components/Header.tsx"() {
      import_react6 = __toESM(require_react());
      init_Container();
      init_Link();
      init_signIn();
      buildBack = (index) => new Array(index + 1).fill("..").join("/");
      buildPath = () => {
        const href = globalThis?.window?.location.href;
        const url = href ? new URL(href) : void 0;
        const path = url?.pathname?.split("/").filter((e) => e) ?? [];
        path.reverse();
        path.splice(0, 1);
        path.reverse();
        return path;
      };
      Header = (props) => {
        const path = buildPath();
        return /* @__PURE__ */ import_react6.default.createElement(import_react6.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(CardContainer, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-content" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-title" }, props.children), /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-login" }, /* @__PURE__ */ import_react6.default.createElement(SignIn, null))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "border-top header-url-chips" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(Link, { href: "/" }, "Home")), path.reverse().map(
          (e, index) => /* @__PURE__ */ import_react6.default.createElement("div", { key: e }, /* @__PURE__ */ import_react6.default.createElement(Link, { href: buildBack(index) }, e))
        ).reverse())));
      };
    }
  });

  // src/components/Page.tsx
  var import_react7, time, Page;
  var init_Page = __esm({
    "src/components/Page.tsx"() {
      import_react7 = __toESM(require_react());
      init_Comment();
      init_Header();
      time = (/* @__PURE__ */ new Date()).toISOString();
      Page = (props) => {
        const theme = props.theme ?? {};
        return /* @__PURE__ */ import_react7.default.createElement("html", null, /* @__PURE__ */ import_react7.default.createElement("head", null, /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://anud.ro/ui_base/src/main.css", type: "text/css", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" }), /* @__PURE__ */ import_react7.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://apis.google.com/js/api.js" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://accounts.google.com/gsi/client" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://izitoast.marcelodolza.com/js/iziToast.min.js?v=140b" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://izitoast.marcelodolza.com/css/iziToast.min.css?v=140a", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani&display=swap", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap", rel: "stylesheet" })), /* @__PURE__ */ import_react7.default.createElement("body", null, /* @__PURE__ */ import_react7.default.createElement(Comment, null, time), /* @__PURE__ */ import_react7.default.createElement("div", { className: "page", style: {
          "--primary": theme["--primary"] ?? "#0074cc",
          "--background-color": theme["--background-color"] ?? "white",
          "--border-color": theme["--border-color"] ?? "#c4c4c4"
        } }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "page-content" }, /* @__PURE__ */ import_react7.default.createElement(Header, null, props.title), props.children))));
      };
    }
  });

  // src/service/google/uploadToFile.ts
  var uploadFormDataToFolder;
  var init_uploadToFile = __esm({
    "src/service/google/uploadToFile.ts"() {
      init_gapiClientPromise();
      uploadFormDataToFolder = (parentId, data) => async (event) => {
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
    }
  });

  // src/components/atoms/Title.tsx
  var import_react8, Title;
  var init_Title = __esm({
    "src/components/atoms/Title.tsx"() {
      import_react8 = __toESM(require_react());
      Title = (props) => /* @__PURE__ */ import_react8.default.createElement("div", { className: "title" }, props.children);
    }
  });

  // src/components/Form.tsx
  var import_react9, FormContext, Form;
  var init_Form = __esm({
    "src/components/Form.tsx"() {
      import_react9 = __toESM(require_react());
      init_uploadToFile();
      init_Container();
      init_Button();
      init_Title();
      FormContext = (0, import_react9.createContext)({
        state: {},
        setState: (...args) => {
        }
      });
      Form = (props) => {
        const [state, setState] = (0, import_react9.useState)({});
        const onSubmit = (0, import_react9.useCallback)((event) => {
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
        return /* @__PURE__ */ import_react9.default.createElement(import_react9.Fragment, null, /* @__PURE__ */ import_react9.default.createElement(CardContainer, null, props.title && /* @__PURE__ */ import_react9.default.createElement(Title, null, props.title), /* @__PURE__ */ import_react9.default.createElement("form", { className: "form", onSubmit: (e) => onSubmit(e) }, /* @__PURE__ */ import_react9.default.createElement(FormContext.Provider, { value: { state, setState } }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "form-content" }, props.children)), /* @__PURE__ */ import_react9.default.createElement("div", { className: "submit-container" }, /* @__PURE__ */ import_react9.default.createElement(Button, null, "Submit")))));
      };
    }
  });

  // src/components/atoms/Input.tsx
  var import_react10, kebabToSentence, camelToSentence, snakeToSentence, lowercaseIgnoringGroups, stringToSentence, fileToBase64, Input, Select;
  var init_Input = __esm({
    "src/components/atoms/Input.tsx"() {
      import_react10 = __toESM(require_react());
      init_Form();
      kebabToSentence = (str) => str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      camelToSentence = (str) => str.replace(/([A-Z])/g, " $1").replace(/^./, (str2) => str2.toUpperCase());
      snakeToSentence = (str) => str.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      lowercaseIgnoringGroups = (str) => str.replaceAll(/([a-z]|\s)([A-Z])([a-z]|\s)/g, (match, p1, p2, p3) => p1 + p2.toLowerCase() + p3);
      stringToSentence = (str) => {
        if (str.includes("-")) {
          return kebabToSentence(str);
        } else if (str.includes("_")) {
          return snakeToSentence(str);
        } else {
          return camelToSentence(str);
        }
      };
      fileToBase64 = (file) => {
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
      Input = (props) => {
        const { state, setState } = (0, import_react10.useContext)(FormContext);
        const ref = (0, import_react10.useRef)(null);
        (0, import_react10.useEffect)(() => {
          if (props.type !== "file") {
            return;
          }
          if (ref.current) {
            ref.current.value = null;
          }
        }, [props.type, ref]);
        const onChange = (0, import_react10.useCallback)((e) => {
          const file = e?.target?.files?.[0];
          if (props.type === "file") {
            fileToBase64(file).then((fileData) => {
              setState({ ...state, [props.name]: { data: fileData, mimeType: file.type } });
            });
            return;
          }
          setState({ ...state, [props.name]: e.target.value });
        }, [props.type, setState, state]);
        const value = (0, import_react10.useMemo)(() => {
          if (props.type === "file") {
            return void 0;
          }
          return state[props.name];
        }, [state]);
        (0, import_react10.useEffect)(() => {
          ref.current && setState({ ...state, [props.name]: ref.current.value });
        }, [ref.current]);
        return /* @__PURE__ */ import_react10.default.createElement("label", { className: "input" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "input-name" }, lowercaseIgnoringGroups(stringToSentence(props.name))), /* @__PURE__ */ import_react10.default.createElement(
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
      Select = (props) => {
        const { state, setState } = (0, import_react10.useContext)(FormContext);
        const ref = (0, import_react10.useRef)(null);
        (0, import_react10.useEffect)(() => {
          ref.current && setState({ ...state, [props.name]: ref.current.value });
        }, [ref.current]);
        return /* @__PURE__ */ import_react10.default.createElement("label", { className: "input" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "input-name" }, lowercaseIgnoringGroups(stringToSentence(props.name)), !props.isOptional && "*"), /* @__PURE__ */ import_react10.default.createElement(
          "select",
          {
            ref,
            name: props.name,
            value: state[props.name] ?? "",
            required: props.isOptional && false || true,
            onChange: (e) => setState({ ...state, [props.name]: e.target.value })
          },
          props.children
        ));
      };
    }
  });

  // src/index_add.tsx
  var require_index_add = __commonJS({
    "src/index_add.tsx"(exports, module) {
      var import_react11 = __toESM(require_react());
      init_Page();
      init_Form();
      init_Input();
      var time2 = (/* @__PURE__ */ new Date()).toISOString();
      module.exports = /* @__PURE__ */ import_react11.default.createElement(Page, { title: "Add boxes" }, /* @__PURE__ */ import_react11.default.createElement(Form, { folderId: "1DwTbUSWf5kzNq84Kc08bJ9Wyw9ijfBuS" }, /* @__PURE__ */ import_react11.default.createElement(Input, { name: "camelCase", type: "text" }), /* @__PURE__ */ import_react11.default.createElement(Input, { name: "kebab-case", type: "text" }), /* @__PURE__ */ import_react11.default.createElement(Input, { name: "snake_case", type: "text" }), /* @__PURE__ */ import_react11.default.createElement(Input, { name: "snake_case file", type: "file", accept: "image/*" }), /* @__PURE__ */ import_react11.default.createElement(Select, { name: "camelCase demo" }, /* @__PURE__ */ import_react11.default.createElement("option", null, "Value"))));
    }
  });
  return require_index_add();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJzcmMvY29tcG9uZW50cy9Db21tZW50LnRzeCIsICJzcmMvY29tcG9uZW50cy9Db250YWluZXIudHN4IiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9jb25maWcudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2xvYWRHb29nbGVEZXBlbmRlbmNpZXMudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZS50cyIsICJzcmMvc2VydmljZS9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2ltcGwvbmV3QXBpLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL0xpbmsudHN4IiwgInNyYy9jb21wb25lbnRzL2F0b21zL0J1dHRvbi50c3giLCAic3JjL2NvbXBvbmVudHMvYXBpL3NpZ25Jbi50c3giLCAic3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJzcmMvY29tcG9uZW50cy9QYWdlLnRzeCIsICJzcmMvc2VydmljZS9nb29nbGUvdXBsb2FkVG9GaWxlLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL1RpdGxlLnRzeCIsICJzcmMvY29tcG9uZW50cy9Gb3JtLnRzeCIsICJzcmMvY29tcG9uZW50cy9hdG9tcy9JbnB1dC50c3giLCAic3JjL2luZGV4X2FkZC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5SZWFjdCIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYDwhLS0gJHtjaGlsZHJlbn0gLS0+YCB9fSAvPlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgQ2FyZENvbnRhaW5lciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyIGNhcmQtY29udGFpbmVyICR7cHJvcHMuY2xhc3NOYW1lID8/IFwiXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW4pID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyYH0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufSIsICJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGFwaUtleTogXCJBSXphU3lCdFEyV095SVVuYVNXQWhsM3M1UEFfTFprV3RwV3o1aUFcIixcbiAgICBjbGllbnRJZDogXCI5ODUyODA5MDcwMzEtZmZ2Zm5jOHBpMGFuZTk5bHNvOWRibDFtMmw1b2M5bm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIixcbiAgICBzY29wZTogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBcIixcbiAgICBkaXNjb3ZlcnlEb2NzOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzL2RyaXZlL3YzL3Jlc3QnXSxcbn0iLCAiY29uc3QgbG9hZFNjcmlwdCA9IChzcmM6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIC8vIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgIC8vIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgIC8vIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICAvLyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSlcblxuZXhwb3J0IGNvbnN0IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgPSBQcm9taXNlLmFsbChbXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvYXBpLmpzJyksXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL2dzaS9jbGllbnQnKSxcbl0pIiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IGdhcGlDbGllbnRQcm9taXNlID0gbmV3IFByb21pc2U8YW55Pihhc3luYyByZXNvbHZlID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGdhcGkubG9hZCgnY2xpZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBnYXBpLmNsaWVudC5pbml0KHtcbiAgICAgICAgICAgIGFwaUtleTogY29uZmlnLmFwaUtleSxcbiAgICAgICAgICAgIGRpc2NvdmVyeURvY3M6IGNvbmZpZy5kaXNjb3ZlcnlEb2NzLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiBnYXBpLmNsaWVudC5sb2FkKCdzaGVldHMnLCAndjQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzb2x2ZShnYXBpKTtcbiAgICB9KTtcbn0pIiwgImltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4vZ2FwaUNsaWVudFByb21pc2VcIjtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGlyYXRpb25EYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICBjb25zdCB0b2tlbiA9IGdhcGk/LmF1dGg/LmdldFRva2VuKCk7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcyh1bmRlZmluZWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdG9rZW5pbmZvP2FjY2Vzc190b2tlbj0ke3Rva2VuLmFjY2Vzc190b2tlbn1gKVxuICAgICAgICAudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBnZXRFeHBpcmF0aW9uRGF0ZSBzdGF0dXMgJHtyZXMuc3RhdHVzfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpPy5leHBpcmVzX2luO1xuICAgICAgICB9KTtcbn07IiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IHRva2VuQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGNvbnN0IHRva2VuQ2xpZW50ID0gZ29vZ2xlLmFjY291bnRzLm9hdXRoMi5pbml0VG9rZW5DbGllbnQoe1xuICAgICAgICBjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgc2NvcGU6IGNvbmZpZy5zY29wZSxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXModG9rZW5DbGllbnQpO1xufSkiLCAiaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgZ2FwaUNsaWVudFByb21pc2UgfSBmcm9tIFwiLi4vZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlXCI7XG5pbXBvcnQgeyBnZXRFeHBpcmF0aW9uRGF0ZSB9IGZyb20gXCIuLi9nb29nbGUvZ2V0RXhwaXJhdGlvbkRhdGVcIjtcbmltcG9ydCB7IHRva2VuQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlXCI7XG5mdW5jdGlvbiBhZGRRdWVyeVBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgbmV3VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgbmV3VXJsLmhhc2ggPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIG5ld1VybC5ocmVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld0FwaTogQXBpID0ge1xuICAgIHNlc3Npb25OYW1lOiAoKSA9PiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICdwYXRoJzogJ2h0dHBzOi8vcGVvcGxlLmdvb2dsZWFwaXMuY29tL3YxL3Blb3BsZS9tZT9wZXJzb25GaWVsZHM9bmFtZXMnLFxuICAgICAgICAgICAgJ21ldGhvZCc6ICdHRVQnLFxuICAgICAgICAgICAgJ2NhbGxiYWNrJzogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZT8ubmFtZXM/LlswXT8uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSxcbiAgICBsb2FkRnJvbVVybDogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzRnJvbVVybCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKSk7XG4gICAgICAgIGlmIChjcmVkZW50aWFsc0Zyb21VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gSlNPTi5wYXJzZShjcmVkZW50aWFsc0Zyb21VcmwpO1xuICAgICAgICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7fSk7XG4gICAgICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihjcmVkZW50aWFscyk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIG9uQ2hhbmdlOiAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgZm4gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzPy5kb2N1bWVudD8uYWRkRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiBnbG9iYWxUaGlzPy5kb2N1bWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihudWxsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICB9LFxuICAgIGxvZ2luOiBhc3luYyAoKSA9PiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbkNsaWVudCA9IGF3YWl0IHRva2VuQ2xpZW50UHJvbWlzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGF3YWl0IG5ld0FwaS5sb2FkRnJvbVVybCgpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0RXhwaXJhdGlvbkRhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuXG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5DbGllbnQuY2FsbGJhY2sgPSAoY3JlZGVudGlhbHNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgYWRkUXVlcnlQYXJhbShjcmVkZW50aWFsc1Jlc3BvbnNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW5DbGllbnQucmVxdWVzdEFjY2Vzc1Rva2VuKHsgcHJvbXB0OiAnY29uc2VudCcgfSk7XG4gICAgfSlcbn0iLCAiaW1wb3J0IFJlYWN0LCB7IFByb3BzV2l0aENoaWxkcmVuLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge25ld0FwaX0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaW1wbC9uZXdBcGlcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgaHJlZjogc3RyaW5nLFxufVxuXG5leHBvcnQgY29uc3QgTGluayA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBbc2VhcmNoUGFyYW1zLCBzZXRTZWFyY2hQYXJhbXNdID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHNldFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3QXBpLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgICAgICAgIGZuKClcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbigpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8YSBjbGFzc05hbWU9XCJsaW5rXCIgaHJlZj17cHJvcHMuaHJlZiArIHNlYXJjaFBhcmFtc30+XG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L2E+XG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG50eXBlIFByb3BzID0gUmVhY3QuRGV0YWlsZWRIVE1MUHJvcHM8UmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+LCBIVE1MQnV0dG9uRWxlbWVudD5cblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cImJ1dHRvblwiPntwcm9wcy5jaGlsZHJlbn08L2J1dHRvbj5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtuZXdBcGl9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2ltcGwvbmV3QXBpXCI7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSBcIi4uL2F0b21zL0J1dHRvblwiO1xuXG5leHBvcnQgY29uc3QgU2lnbkluID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIG5ld0FwaS5sb2dvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXdBcGkubG9naW4oKTtcbiAgICB9LCBbc3RhdGVdKVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIG5ld0FwaS5zZXNzaW9uTmFtZSgpLnRoZW4oc2V0U3RhdGUpO1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShhc3luYyBlID0+IHtcbiAgICAgICAgICAgIHNldFN0YXRlKGF3YWl0IG5ld0FwaS5zZXNzaW9uTmFtZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0FwaS5sb2FkRnJvbVVybCgpO1xuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2NhbGxiYWNrfT5cbiAgICAgICAgICAgIHtzdGF0ZSA/IGBMb2dvdXQgb2YgJHtzdGF0ZX1gIDogXCJMb2dpblwifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICA8Lz5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2FyZENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCIuL2F0b21zL0xpbmtcIjtcbmltcG9ydCB7IERpdmlkZXJIIH0gZnJvbSBcIi4vRGl2aWRlckhcIjtcbmltcG9ydCB7IFNpZ25JbiB9IGZyb20gXCIuL2FwaS9zaWduSW5cIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT47XG5cbmNvbnN0IGJ1aWxkQmFjayA9IGluZGV4ID0+IG5ldyBBcnJheShpbmRleCArIDEpLmZpbGwoXCIuLlwiKS5qb2luKFwiL1wiKVxuY29uc3QgYnVpbGRQYXRoID0gKCkgPT4ge1xuICAgIGNvbnN0IGhyZWYgPSBnbG9iYWxUaGlzPy53aW5kb3c/LmxvY2F0aW9uLmhyZWZcbiAgICBjb25zdCB1cmw6IFVSTCB8IHVuZGVmaW5lZCA9IGhyZWYgPyBuZXcgVVJMKGhyZWYpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBhdGggPSB1cmw/LnBhdGhuYW1lPy5zcGxpdChcIi9cIikuZmlsdGVyKGUgPT4gZSkgPz8gW107XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcGF0aC5zcGxpY2UoMCwgMSk7XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5leHBvcnQgY29uc3QgSGVhZGVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBidWlsZFBhdGgoKTtcbiAgICByZXR1cm4gPEZyYWdtZW50PlxuICAgICAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImhlYWRlci1jb250ZW50XCJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgICA8U2lnbkluIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXRvcCBoZWFkZXItdXJsLWNoaXBzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtwYXRoLnJldmVyc2UoKS5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtidWlsZEJhY2soaW5kZXgpfT57ZX08L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkucmV2ZXJzZSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZENvbnRhaW5lcj5cbiAgICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgQ1NTUHJvcGVydGllcywgUHJvcHNXaXRoQ2hpbGRyZW4sIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuL0NvbW1lbnRcIjtcbmltcG9ydCB7IEhlYWRlciB9IGZyb20gXCIuL0hlYWRlclwiO1xuXG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW48e1xuICAgIHRpdGxlPzogUmVhY3ROb2RlLFxuICAgIHRoZW1lPzoge1xuICAgICAgICBcIi0tcHJpbWFyeVwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYmFja2dyb3VuZC1jb2xvclwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYm9yZGVyLWNvbG9yXCI/OiBzdHJpbmcsXG4gICAgfVxufT47XG5jb25zdCB0aW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuZXhwb3J0IGNvbnN0IFBhZ2UgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSBwcm9wcy50aGVtZSA/PyB7fTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9e1wiaHR0cHM6Ly9hbnVkLnJvL3VpX2Jhc2Uvc3JjL21haW4uY3NzXCJ9IHR5cGU9XCJ0ZXh0L2Nzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1NYXRlcmlhbCtTeW1ib2xzK091dGxpbmVkOm9wc3osd2dodCxGSUxMLEdSQURANDgsMzAwLDAsLTI1XCIgLz5cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuXG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9hcGkuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9nc2kvY2xpZW50XCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2l6aXRvYXN0Lm1hcmNlbG9kb2x6YS5jb20vanMvaXppVG9hc3QubWluLmpzP3Y9MTQwYlwiIC8+XG5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9peml0b2FzdC5tYXJjZWxvZG9semEuY29tL2Nzcy9pemlUb2FzdC5taW4uY3NzP3Y9MTQwYVwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pOndnaHRANTAwJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuXG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICA8Q29tbWVudD57dGltZX08L0NvbW1lbnQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgXCItLXByaW1hcnlcIjogdGhlbWVbXCItLXByaW1hcnlcIl0gPz8gXCIjMDA3NGNjXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiLS1iYWNrZ3JvdW5kLWNvbG9yXCI6IHRoZW1lW1wiLS1iYWNrZ3JvdW5kLWNvbG9yXCJdID8/IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCItLWJvcmRlci1jb2xvclwiOiB0aGVtZVsnLS1ib3JkZXItY29sb3InXSA/PyBcIiNjNGM0YzRcIixcbiAgICAgICAgICAgICAgICB9IGFzIENTU1Byb3BlcnRpZXN9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlYWRlcj57cHJvcHMudGl0bGV9PC9IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+XG5cbiAgICApXG59IiwgImltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4vZ2FwaUNsaWVudFByb21pc2VcIjtcblxuY29uc3QgZmlsZVRvQmFzZTY0ID0gKGZpbGU6IEZpbGUpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgocmVhZGVyPy5yZXN1bHQgYXMgc3RyaW5nKT8uc3BsaXQ/LignLCcpWzFdKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZvcm1EYXRhVG9Kc29uKGZvcm1EYXRhKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZm9ybURhdGEuZW50cmllcygpKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gYXdhaXQgZmlsZVRvQmFzZTY0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG59XG5cbmV4cG9ydCBjb25zdCB1cGxvYWRGb3JtRGF0YVRvRm9sZGVyID0gKHBhcmVudElkOiBzdHJpbmcsIGRhdGEpID0+IGFzeW5jIChldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxGb3JtRWxlbWVudD4pID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCBhcyBIVE1MRm9ybUVsZW1lbnQpO1xuICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICBjb25zdCBpZFRva2VuID0gZ2FwaS5jbGllbnQuZ2V0VG9rZW4oKS5hY2Nlc3NfdG9rZW47XG5cbiAgICByZXR1cm4gZmV0Y2goXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS91cGxvYWQvZHJpdmUvdjMvZmlsZXM/dXBsb2FkVHlwZT1yZXN1bWFibGVcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtpZFRva2VufWAsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnXG4gICAgICAgIH0pLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBuYW1lOiAnZm9ybS1kYXRhLmpzb24nLFxuICAgICAgICAgICAgcGFyZW50czogW3BhcmVudElkXVxuICAgICAgICB9KVxuICAgIH0pLnRoZW4oYXN5bmMgYXBpUmVzcG9uc2UgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXdhaXQgYXBpUmVzcG9uc2UuaGVhZGVycy5nZXQoJ0xvY2F0aW9uJykgPz8gXCJcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtpZFRva2VufWAsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICB9KVxuICAgIH0pXG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFByb3BzV2l0aENoaWxkcmVuIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBUaXRsZSA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW48e30+KSA9PiA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e3Byb3BzLmNoaWxkcmVufTwvZGl2PiIsICJpbXBvcnQgUmVhY3QsIHsgRnJhZ21lbnQsIFByb3BzV2l0aENoaWxkcmVuLCBSZWFjdE5vZGUsIGNyZWF0ZUNvbnRleHQsIHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyB1cGxvYWRGb3JtRGF0YVRvRm9sZGVyIH0gZnJvbSBcIi4uL3NlcnZpY2UvZ29vZ2xlL3VwbG9hZFRvRmlsZVwiXG5pbXBvcnQgeyBDYXJkQ29udGFpbmVyIH0gZnJvbSBcIi4vQ29udGFpbmVyXCJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuL2F0b21zL0J1dHRvblwiXG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gXCIuL2F0b21zL1RpdGxlXCJcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbiAmIHtcbiAgICB0aXRsZT86IFJlYWN0Tm9kZVxuICAgIGZvbGRlcklkOiBzdHJpbmdcbn1cbmV4cG9ydCBjb25zdCBGb3JtQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe1xuICAgIHN0YXRlOiB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBGaWxlPixcbiAgICBzZXRTdGF0ZTogKC4uLmFyZ3MpID0+IHsgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBGb3JtID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoe30pO1xuXG4gICAgY29uc3Qgb25TdWJtaXQgPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0LkZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIHVwbG9hZEZvcm1EYXRhVG9Gb2xkZXIocHJvcHMuZm9sZGVySWQsIHN0YXRlKShldmVudCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWdsb2JhbFRoaXMuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpemlUb2FzdC5zdWNjZXNzKHtcbiAgICAgICAgICAgICAgICBpY29uOiAnaWNvbi1wZXJzb24nLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnVXBsb2FkIHN1Y2Nlc2Z1bGwnLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tUmlnaHQnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KS5jYXRjaCgoZTogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmICghZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgaXppVG9hc3QuZXJyb3Ioe1xuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBgJHtlLm5hbWV9OiR7ZS5tZXNzYWdlfWAsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b21SaWdodCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSwgW3N0YXRlXSlcbiAgICByZXR1cm4gPEZyYWdtZW50PlxuICAgICAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgICAgICAgIHtwcm9wcy50aXRsZSAmJlxuICAgICAgICAgICAgICAgIDxUaXRsZT5cbiAgICAgICAgICAgICAgICAgICAge3Byb3BzLnRpdGxlfVxuICAgICAgICAgICAgICAgIDwvVGl0bGU+fVxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybVwiIG9uU3VibWl0PXsoZSkgPT4gb25TdWJtaXQoZSl9PlxuICAgICAgICAgICAgICAgIDxGb3JtQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBzdGF0ZSwgc2V0U3RhdGUgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRleHQuUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24+U3VibWl0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvQ2FyZENvbnRhaW5lcj5cbiAgICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4sIHVzZUNhbGxiYWNrLCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRm9ybUNvbnRleHQgfSBmcm9tIFwiLi4vRm9ybVwiO1xuXG50eXBlIFByb3BzID0ge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICB0eXBlPzogSFRNTElucHV0RWxlbWVudFsndHlwZSddLFxuICAgIGFjY2VwdD86IHN0cmluZyxcbiAgICBpc09wdGlvbmFsPzogYm9vbGVhblxuICAgIGNhcHR1cmU/OiBcImVudmlyb25tZW50XCIgfCBcInVzZXJcIjtcbn1cblxuY29uc3Qga2ViYWJUb1NlbnRlbmNlID0gKHN0cjogc3RyaW5nKSA9PiBzdHIuc3BsaXQoJy0nKS5tYXAod29yZCA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSkuam9pbignICcpO1xuXG5jb25zdCBjYW1lbFRvU2VudGVuY2UgPSAoc3RyOiBzdHJpbmcpID0+IHN0ci5yZXBsYWNlKC8oW0EtWl0pL2csICcgJDEnKS5yZXBsYWNlKC9eLi8sIHN0ciA9PiBzdHIudG9VcHBlckNhc2UoKSk7XG5cbmNvbnN0IHNuYWtlVG9TZW50ZW5jZSA9IChzdHI6IHN0cmluZykgPT4gc3RyLnNwbGl0KCdfJykubWFwKHdvcmQgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpLmpvaW4oJyAnKTtcblxuY29uc3QgbG93ZXJjYXNlSWdub3JpbmdHcm91cHMgPSAoc3RyOiBzdHJpbmcpID0+IHN0ci5yZXBsYWNlQWxsKC8oW2Etel18XFxzKShbQS1aXSkoW2Etel18XFxzKS9nLCAobWF0Y2gsIHAxLCBwMiwgcDMpID0+IHAxICsgcDIudG9Mb3dlckNhc2UoKSArIHAzKTtcblxuY29uc3Qgc3RyaW5nVG9TZW50ZW5jZSA9IHN0ciA9PiB7XG4gICAgaWYgKHN0ci5pbmNsdWRlcygnLScpKSB7XG4gICAgICAgIHJldHVybiBrZWJhYlRvU2VudGVuY2Uoc3RyKTtcbiAgICB9IGVsc2UgaWYgKHN0ci5pbmNsdWRlcygnXycpKSB7XG4gICAgICAgIHJldHVybiBzbmFrZVRvU2VudGVuY2Uoc3RyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FtZWxUb1NlbnRlbmNlKHN0cik7XG4gICAgfVxufTtcbmNvbnN0IGZpbGVUb0Jhc2U2NCA9IChmaWxlOiBGaWxlIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ocmVzb2x2ZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgocmVhZGVyPy5yZXN1bHQgYXMgc3RyaW5nKT8uc3BsaXQ/LignLCcpWzFdKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5leHBvcnQgY29uc3QgSW5wdXQgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZSwgc2V0U3RhdGUgfSA9IHVzZUNvbnRleHQoRm9ybUNvbnRleHQpO1xuICAgIGNvbnN0IHJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLnR5cGUgIT09IFwiZmlsZVwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICByZWYuY3VycmVudC52YWx1ZSA9IG51bGwgYXMgYW55O1xuICAgICAgICB9XG5cbiAgICB9LCBbcHJvcHMudHlwZSwgcmVmXSlcbiAgICBjb25zdCBvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICBjb25zdCBmaWxlID0gZT8udGFyZ2V0Py5maWxlcz8uWzBdO1xuICAgICAgICBpZiAocHJvcHMudHlwZSA9PT0gXCJmaWxlXCIpIHtcbiAgICAgICAgICAgIGZpbGVUb0Jhc2U2NChmaWxlKS50aGVuKGZpbGVEYXRhID0+IHtcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBbcHJvcHMubmFtZV06IHsgZGF0YTogZmlsZURhdGEsIG1pbWVUeXBlOiBmaWxlLnR5cGUgfSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBbcHJvcHMubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgfSwgW3Byb3BzLnR5cGUsIHNldFN0YXRlLCBzdGF0ZV0pXG4gICAgY29uc3QgdmFsdWUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLnR5cGUgPT09IFwiZmlsZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZVtwcm9wcy5uYW1lXTtcbiAgICB9LCBbc3RhdGVdKVxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgcmVmLmN1cnJlbnQgJiYgc2V0U3RhdGUoeyAuLi5zdGF0ZSwgW3Byb3BzLm5hbWVdOiByZWYuY3VycmVudC52YWx1ZSB9KTtcbiAgICB9LCBbcmVmLmN1cnJlbnRdKTtcblxuICAgIHJldHVybiA8bGFiZWwgY2xhc3NOYW1lPVwiaW5wdXRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtbmFtZVwiPntsb3dlcmNhc2VJZ25vcmluZ0dyb3VwcyhzdHJpbmdUb1NlbnRlbmNlKHByb3BzLm5hbWUpKX08L3NwYW4+XG4gICAgICAgIDxpbnB1dCByZWY9e3JlZn0gdHlwZT17cHJvcHMudHlwZSA/PyBcInRleHRcIn1cbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZSBhcyBzdHJpbmd9XG4gICAgICAgICAgICByZXF1aXJlZD17cHJvcHMuaXNPcHRpb25hbCAmJiBmYWxzZSB8fCB0cnVlfVxuICAgICAgICAgICAgY2FwdHVyZT17cHJvcHMuY2FwdHVyZX1cbiAgICAgICAgICAgIGFjY2VwdD17cHJvcHMuYWNjZXB0fVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgIDwvbGFiZWw+XG59XG5cbmV4cG9ydCBjb25zdCBTZWxlY3QgPSAocHJvcHM6IFByb3BzV2l0aENoaWxkcmVuPHsgbmFtZTogc3RyaW5nLCBpc09wdGlvbmFsOiBib29sZWFuIH0+KSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZSwgc2V0U3RhdGUgfSA9IHVzZUNvbnRleHQoRm9ybUNvbnRleHQpO1xuICAgIGNvbnN0IHJlZiA9IHVzZVJlZjxIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHJlZi5jdXJyZW50ICYmIHNldFN0YXRlKHsgLi4uc3RhdGUsIFtwcm9wcy5uYW1lXTogcmVmLmN1cnJlbnQudmFsdWUgfSk7XG4gICAgfSwgW3JlZi5jdXJyZW50XSlcbiAgICByZXR1cm4gPGxhYmVsIGNsYXNzTmFtZT1cImlucHV0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LW5hbWVcIj57bG93ZXJjYXNlSWdub3JpbmdHcm91cHMoc3RyaW5nVG9TZW50ZW5jZShwcm9wcy5uYW1lKSl9eyFwcm9wcy5pc09wdGlvbmFsICYmIFwiKlwifTwvc3Bhbj5cbiAgICAgICAgPHNlbGVjdCByZWY9e3JlZn1cbiAgICAgICAgICAgIG5hbWU9e3Byb3BzLm5hbWV9XG4gICAgICAgICAgICB2YWx1ZT17c3RhdGVbcHJvcHMubmFtZV0gYXMgc3RyaW5nID8/IFwiXCJ9XG4gICAgICAgICAgICByZXF1aXJlZD17cHJvcHMuaXNPcHRpb25hbCAmJiBmYWxzZSB8fCB0cnVlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBbcHJvcHMubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICA+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvc2VsZWN0PlxuICAgIDwvbGFiZWw+XG59XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9jb21wb25lbnRzL1BhZ2VcIjtcbmltcG9ydCB7Rm9ybX0gZnJvbSBcIi4vY29tcG9uZW50cy9Gb3JtXCI7XG5pbXBvcnQge0lucHV0LCBTZWxlY3R9IGZyb20gXCIuL2NvbXBvbmVudHMvYXRvbXMvSW5wdXRcIjtcblxuY29uc3QgdGltZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbm1vZHVsZS5leHBvcnRzID0gKFxuXG4gICAgPFBhZ2UgdGl0bGU9XCJBZGQgYm94ZXNcIj5cbiAgICAgICAgPEZvcm0gZm9sZGVySWQ9XCIxRHdUYlVTV2Y1a3pOcTg0S2MwOGJKOVd5dzlpamZCdVNcIj5cbiAgICAgICAgICAgIDxJbnB1dCBuYW1lPVwiY2FtZWxDYXNlXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgICAgPElucHV0IG5hbWU9XCJrZWJhYi1jYXNlXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgICAgPElucHV0IG5hbWU9XCJzbmFrZV9jYXNlXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgICAgPElucHV0IG5hbWU9XCJzbmFrZV9jYXNlIGZpbGVcIiB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cImltYWdlLypcIiAvPlxuICAgICAgICAgICAgPFNlbGVjdCBuYW1lPVwiY2FtZWxDYXNlIGRlbW9cIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uPlZhbHVlPC9vcHRpb24+XG4gICAgICAgICAgICA8L1NlbGVjdD5cbiAgICAgICAgPC9Gb3JtPlxuICAgIDwvUGFnZT5cbikiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLGFBQU8sVUFBVSxXQUFXO0FBQUE7QUFBQTs7O0FDQTVCLG9CQUVhO0FBRmI7QUFBQTtBQUFBLHFCQUFrQjtBQUVYLE1BQU0sVUFBVSxDQUFDLEVBQUUsU0FBUyxNQUFNO0FBQ3JDLGVBQU8sNkJBQUFBLFFBQUEsY0FBQyxTQUFJLHlCQUF5QixFQUFFLFFBQVEsUUFBUSxlQUFlLEdBQUc7QUFBQSxNQUM3RTtBQUFBO0FBQUE7OztBQ0pBLE1BQUFDLGVBSWE7QUFKYjtBQUFBO0FBQUEsTUFBQUEsZ0JBQXlDO0FBSWxDLE1BQU0sZ0JBQWdCLENBQUMsVUFBaUI7QUFDM0MsZUFBTyw4QkFBQUMsUUFBQSxjQUFDLFNBQUksV0FBVSx5QkFDbEIsOEJBQUFBLFFBQUEsY0FBQyxTQUFJLFdBQVcsNEJBQTRCLE1BQU0sYUFBYSxLQUFLLEtBQUssS0FDcEUsTUFBTSxRQUNYLENBQ0o7QUFBQSxNQUNKO0FBQUE7QUFBQTs7O0FDVkEsTUFBYTtBQUFiO0FBQUE7QUFBTyxNQUFNLFNBQVM7QUFBQSxRQUNsQixRQUFRO0FBQUEsUUFDUixVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxlQUFlLENBQUMsNERBQTREO0FBQUEsTUFDaEY7QUFBQTtBQUFBOzs7QUNMQSxNQUFNLFlBZU87QUFmYjtBQUFBO0FBQUEsTUFBTSxhQUFhLENBQUMsUUFDaEIsSUFBSSxRQUFjLENBQUMsU0FBUyxXQUFXO0FBQ25DLFlBQUksQ0FBQyxXQUFXLFVBQVU7QUFDdEI7QUFBQSxRQUNKO0FBQ0EsZ0JBQVE7QUFBQSxNQVFaLENBQUM7QUFFRSxNQUFN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TTtBQUFBLFlBQ1osT0FBTyxNQUFNLE1BQU0sSUFBSSxLQUFlO0FBQUEsWUFDdEMsVUFBVSxNQUFNLGNBQWMsU0FBUztBQUFBLFlBQ3ZDLFVBQVUsQ0FBQyxNQUFNLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLE9BQU8sTUFBTSxDQUFDO0FBQUE7QUFBQSxVQUVuRSxNQUFNO0FBQUEsUUFDWCxDQUNKO0FBQUEsTUFDSjtBQUFBO0FBQUE7OztBQ3ZHQTtBQUFBO0FBQUEsVUFBQUMsaUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUVBLFVBQU1DLFNBQU8sb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFDcEMsYUFBTyxVQUVILCtCQUFBQyxRQUFBLGNBQUMsUUFBSyxPQUFNLGVBQ1IsK0JBQUFBLFFBQUEsY0FBQyxRQUFLLFVBQVMsdUNBQ1gsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLE1BQUssYUFBWSxNQUFLLFFBQU8sR0FDcEMsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLE1BQUssY0FBYSxNQUFLLFFBQU8sR0FDckMsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLE1BQUssY0FBYSxNQUFLLFFBQU8sR0FDckMsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLE1BQUssbUJBQWtCLE1BQUssUUFBTyxRQUFPLFdBQVUsR0FDM0QsK0JBQUFBLFFBQUEsY0FBQyxVQUFPLE1BQUssb0JBQ1QsK0JBQUFBLFFBQUEsY0FBQyxnQkFBTyxPQUFLLENBQ2pCLENBQ0osQ0FDSjtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJyZXNvbHZlIiwgImdhcGkiLCAiZ2FwaSIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImdhcGkiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAic3RyIiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJ0aW1lIiwgIlJlYWN0Il0KfQo=
