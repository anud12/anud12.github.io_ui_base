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

  // src/components/atoms/Link.tsx
  var import_react3, Link;
  var init_Link = __esm({
    "src/components/atoms/Link.tsx"() {
      import_react3 = __toESM(require_react());
      Link = (props) => {
        const [searchParams, setSearchParams] = (0, import_react3.useState)("");
        (0, import_react3.useEffect)(() => {
          setSearchParams(window.location.hash);
          const fn = () => {
            setSearchParams(window.location.hash);
          };
          window.addEventListener("hashchange", fn);
          return () => {
            window.removeEventListener("hashchange", fn);
          };
        }, []);
        return /* @__PURE__ */ import_react3.default.createElement("a", { className: "link", href: props.href + searchParams }, props.children);
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
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
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
        return /* @__PURE__ */ import_react7.default.createElement("html", null, /* @__PURE__ */ import_react7.default.createElement("head", null, /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://anud.ro/ui_base/src/main.css", type: "text/css", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" }), /* @__PURE__ */ import_react7.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://apis.google.com/js/api.js" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://accounts.google.com/gsi/client" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani&display=swap", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap", rel: "stylesheet" })), /* @__PURE__ */ import_react7.default.createElement("body", null, /* @__PURE__ */ import_react7.default.createElement(Comment, null, time), /* @__PURE__ */ import_react7.default.createElement("div", { className: "page", style: {
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
        const formData = JSON.stringify(data);
        const gapi2 = await gapiClientPromise;
        const idToken = gapi2.client.getToken().access_token;
        fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", {
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
          return await apiResponse.headers.get("Location");
        }).then(async (id) => {
          fetch(id ?? "", {
            method: "PUT",
            headers: new Headers({
              "Authorization": `Bearer ${idToken}`,
              "Content-Type": "application/json"
            }),
            body: formData
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
        return /* @__PURE__ */ import_react9.default.createElement(import_react9.Fragment, null, /* @__PURE__ */ import_react9.default.createElement(CardContainer, null, props.title && /* @__PURE__ */ import_react9.default.createElement(Title, null, props.title), /* @__PURE__ */ import_react9.default.createElement("form", { className: "form", onSubmit: uploadFormDataToFolder(props.folderId, state) }, /* @__PURE__ */ import_react9.default.createElement(FormContext.Provider, { value: { state, setState } }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "form-content" }, props.children)), /* @__PURE__ */ import_react9.default.createElement("div", { className: "submit-container" }, /* @__PURE__ */ import_react9.default.createElement(Button, null, "Submit")))));
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
            console.log("onLoad");
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
              console.log("then");
              setState({ ...state, [props.name]: fileData });
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
        return /* @__PURE__ */ import_react10.default.createElement("label", { className: "input" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "input-name" }, lowercaseIgnoringGroups(stringToSentence(props.name))), /* @__PURE__ */ import_react10.default.createElement(
          "select",
          {
            ref,
            name: props.name,
            value: state[props.name] ?? "",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJzcmMvY29tcG9uZW50cy9Db21tZW50LnRzeCIsICJzcmMvY29tcG9uZW50cy9Db250YWluZXIudHN4IiwgInNyYy9jb21wb25lbnRzL2F0b21zL0xpbmsudHN4IiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9jb25maWcudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2xvYWRHb29nbGVEZXBlbmRlbmNpZXMudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZS50cyIsICJzcmMvc2VydmljZS9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2ltcGwvbmV3QXBpLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL0J1dHRvbi50c3giLCAic3JjL2NvbXBvbmVudHMvYXBpL3NpZ25Jbi50c3giLCAic3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJzcmMvY29tcG9uZW50cy9QYWdlLnRzeCIsICJzcmMvc2VydmljZS9nb29nbGUvdXBsb2FkVG9GaWxlLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL1RpdGxlLnRzeCIsICJzcmMvY29tcG9uZW50cy9Gb3JtLnRzeCIsICJzcmMvY29tcG9uZW50cy9hdG9tcy9JbnB1dC50c3giLCAic3JjL2luZGV4X2FkZC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5SZWFjdCIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYDwhLS0gJHtjaGlsZHJlbn0gLS0+YCB9fSAvPlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgQ2FyZENvbnRhaW5lciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyIGNhcmQtY29udGFpbmVyICR7cHJvcHMuY2xhc3NOYW1lID8/IFwiXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW4pID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyYH0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4sIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgaHJlZjogc3RyaW5nLFxufVxuXG5leHBvcnQgY29uc3QgTGluayA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBbc2VhcmNoUGFyYW1zLCBzZXRTZWFyY2hQYXJhbXNdID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHNldFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPGEgY2xhc3NOYW1lPVwibGlua1wiIGhyZWY9e3Byb3BzLmhyZWYgKyBzZWFyY2hQYXJhbXN9PlxuICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgPC9hPlxufSIsICJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGFwaUtleTogXCJBSXphU3lCdFEyV095SVVuYVNXQWhsM3M1UEFfTFprV3RwV3o1aUFcIixcbiAgICBjbGllbnRJZDogXCI5ODUyODA5MDcwMzEtZmZ2Zm5jOHBpMGFuZTk5bHNvOWRibDFtMmw1b2M5bm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIixcbiAgICBzY29wZTogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBcIixcbiAgICBkaXNjb3ZlcnlEb2NzOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzL2RyaXZlL3YzL3Jlc3QnXSxcbn0iLCAiY29uc3QgbG9hZFNjcmlwdCA9IChzcmM6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICAgICAgICBzY3JpcHQuc3JjID0gc3JjO1xuICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4gcmVzb2x2ZSgpO1xuICAgICAgICBzY3JpcHQub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pXG5cbmV4cG9ydCBjb25zdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzID0gUHJvbWlzZS5hbGwoW1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL2FwaS5qcycpLFxuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9nc2kvY2xpZW50JyksXG5dKSIsICJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9sb2FkR29vZ2xlRGVwZW5kZW5jaWVzXCI7XG5cbmV4cG9ydCBjb25zdCBnYXBpQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgYXdhaXQgbG9hZEdvb2dsZURlcGVuZGVuY2llcztcbiAgICBnYXBpLmxvYWQoJ2NsaWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7XG4gICAgICAgICAgICBhcGlLZXk6IGNvbmZpZy5hcGlLZXksXG4gICAgICAgICAgICBkaXNjb3ZlcnlEb2NzOiBjb25maWcuZGlzY292ZXJ5RG9jcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4gZ2FwaS5jbGllbnQubG9hZCgnc2hlZXRzJywgJ3Y0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJlc29sdmUoZ2FwaSk7XG4gICAgfSk7XG59KSIsICJpbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuL2dhcGlDbGllbnRQcm9taXNlXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBpcmF0aW9uRGF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgY29uc3QgdG9rZW4gPSBnYXBpPy5hdXRoPy5nZXRUb2tlbigpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiByZXModW5kZWZpbmVkKSk7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaChgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL3Rva2VuaW5mbz9hY2Nlc3NfdG9rZW49JHt0b2tlbi5hY2Nlc3NfdG9rZW59YClcbiAgICAgICAgLnRoZW4oYXN5bmMgcmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgZ2V0RXhwaXJhdGlvbkRhdGUgc3RhdHVzICR7cmVzLnN0YXR1c31gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChhd2FpdCByZXMuanNvbigpKT8uZXhwaXJlc19pbjtcbiAgICAgICAgfSk7XG59OyIsICJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9sb2FkR29vZ2xlRGVwZW5kZW5jaWVzXCI7XG5cbmV4cG9ydCBjb25zdCB0b2tlbkNsaWVudFByb21pc2UgPSBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIHJlcyA9PiB7XG4gICAgYXdhaXQgbG9hZEdvb2dsZURlcGVuZGVuY2llcztcbiAgICBjb25zdCB0b2tlbkNsaWVudCA9IGdvb2dsZS5hY2NvdW50cy5vYXV0aDIuaW5pdFRva2VuQ2xpZW50KHtcbiAgICAgICAgY2xpZW50X2lkOiBjb25maWcuY2xpZW50SWQsXG4gICAgICAgIHNjb3BlOiBjb25maWcuc2NvcGUsXG4gICAgICAgIHJlZGlyZWN0X3VyaTogXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIixcbiAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVzKHRva2VuQ2xpZW50KTtcbn0pIiwgImltcG9ydCB7IHJlamVjdHMgfSBmcm9tIFwiYXNzZXJ0XCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi4vYXBpXCI7XG5pbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi9nb29nbGUvZ2FwaUNsaWVudFByb21pc2VcIjtcbmltcG9ydCB7IGdldEV4cGlyYXRpb25EYXRlIH0gZnJvbSBcIi4uL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZVwiO1xuaW1wb3J0IHsgdG9rZW5DbGllbnRQcm9taXNlIH0gZnJvbSBcIi4uL2dvb2dsZS90b2tlbkNsaWVudFByb21pc2VcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgdXJsIH0gZnJvbSBcImluc3BlY3RvclwiO1xuZnVuY3Rpb24gYWRkUXVlcnlQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IG5ld1VybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIG5ld1VybC5oYXNoID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCBuZXdVcmwuaHJlZik7XG59XG5cbmV4cG9ydCBjb25zdCBuZXdBcGk6IEFwaSA9IHtcbiAgICBzZXNzaW9uTmFtZTogKCkgPT4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICAgICAgZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgICAncGF0aCc6ICdodHRwczovL3Blb3BsZS5nb29nbGVhcGlzLmNvbS92MS9wZW9wbGUvbWU/cGVyc29uRmllbGRzPW5hbWVzJyxcbiAgICAgICAgICAgICdtZXRob2QnOiAnR0VUJyxcbiAgICAgICAgICAgICdjYWxsYmFjayc6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2U/Lm5hbWVzPy5bMF0/LmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSksXG4gICAgbG9hZEZyb21Vcmw6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBjb25zdCBjcmVkZW50aWFsc0Zyb21VcmwgPSBkZWNvZGVVUkkod2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIiwgXCJcIikpO1xuICAgICAgICBpZiAoY3JlZGVudGlhbHNGcm9tVXJsKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IEpTT04ucGFyc2UoY3JlZGVudGlhbHNGcm9tVXJsKTtcbiAgICAgICAgICAgIGF3YWl0IGdhcGkuY2xpZW50LmluaXQoe30pO1xuICAgICAgICAgICAgZ2FwaS5jbGllbnQuc2V0VG9rZW4oY3JlZGVudGlhbHMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ25ld0FwaS1vbkNoYW5nZScpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBvbkNoYW5nZTogKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNvbnN0IGZuID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJuZXdBcGktb25DaGFuZ2VcIiwgZm4pO1xuICAgICAgICByZXR1cm4gKCkgPT4gZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuZXdBcGktb25DaGFuZ2VcIiwgZm4pO1xuICAgIH0sXG4gICAgbG9nb3V0OiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICAgICAgZ2FwaS5jbGllbnQuc2V0VG9rZW4obnVsbClcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIlwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpXG4gICAgfSxcbiAgICBsb2dpbjogYXN5bmMgKCkgPT4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW5DbGllbnQgPSBhd2FpdCB0b2tlbkNsaWVudFByb21pc2U7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChhd2FpdCBuZXdBcGkubG9hZEZyb21VcmwoKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGdldEV4cGlyYXRpb25EYXRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcblxuICAgICAgICB9XG4gICAgICAgIHRva2VuQ2xpZW50LmNhbGxiYWNrID0gKGNyZWRlbnRpYWxzUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGFkZFF1ZXJ5UGFyYW0oY3JlZGVudGlhbHNSZXNwb25zZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpXG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuQ2xpZW50LnJlcXVlc3RBY2Nlc3NUb2tlbih7IHByb21wdDogJ2NvbnNlbnQnIH0pO1xuICAgIH0pXG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG50eXBlIFByb3BzID0gUmVhY3QuRGV0YWlsZWRIVE1MUHJvcHM8UmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+LCBIVE1MQnV0dG9uRWxlbWVudD5cblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cImJ1dHRvblwiPntwcm9wcy5jaGlsZHJlbn08L2J1dHRvbj5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2dvb2dsZS9nYXBpQ2xpZW50UHJvbWlzZVwiO1xuaW1wb3J0IHsgbmV3QXBpIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaW1wbC9uZXdBcGlcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi9hdG9tcy9CdXR0b25cIjtcblxuZXhwb3J0IGNvbnN0IFNpZ25JbiA9ICgpID0+IHtcbiAgICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBjb25zdCBjYWxsYmFjayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBuZXdBcGkubG9nb3V0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbmV3QXBpLmxvZ2luKCk7XG4gICAgfSwgW3N0YXRlXSlcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBuZXdBcGkuc2Vzc2lvbk5hbWUoKS50aGVuKHNldFN0YXRlKTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSBuZXdBcGkub25DaGFuZ2UoYXN5bmMgZSA9PiB7XG4gICAgICAgICAgICBzZXRTdGF0ZShhd2FpdCBuZXdBcGkuc2Vzc2lvbk5hbWUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXdBcGkubG9hZEZyb21VcmwoKTtcbiAgICAgICAgcmV0dXJuIHVuc3Vic2NyaWJlO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtjYWxsYmFja30+XG4gICAgICAgICAgICB7c3RhdGUgPyBgTG9nb3V0IG9mICR7c3RhdGV9YCA6IFwiTG9naW5cIn1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgPC8+XG59IiwgImltcG9ydCBSZWFjdCwgeyBGcmFnbWVudCwgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENhcmRDb250YWluZXIgfSBmcm9tIFwiLi9Db250YWluZXJcIjtcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwiLi9hdG9tcy9MaW5rXCI7XG5pbXBvcnQgeyBEaXZpZGVySCB9IGZyb20gXCIuL0RpdmlkZXJIXCI7XG5pbXBvcnQgeyBTaWduSW4gfSBmcm9tIFwiLi9hcGkvc2lnbkluXCI7XG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW48e30+O1xuXG5jb25zdCBidWlsZEJhY2sgPSBpbmRleCA9PiBuZXcgQXJyYXkoaW5kZXggKyAxKS5maWxsKFwiLi5cIikuam9pbihcIi9cIilcbmNvbnN0IGJ1aWxkUGF0aCA9ICgpID0+IHtcbiAgICBjb25zdCBocmVmID0gZ2xvYmFsVGhpcz8ud2luZG93Py5sb2NhdGlvbi5ocmVmXG4gICAgY29uc3QgdXJsOiBVUkwgfCB1bmRlZmluZWQgPSBocmVmID8gbmV3IFVSTChocmVmKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwYXRoID0gdXJsPy5wYXRobmFtZT8uc3BsaXQoXCIvXCIpLmZpbHRlcihlID0+IGUpID8/IFtdO1xuICAgIHBhdGgucmV2ZXJzZSgpO1xuICAgIHBhdGguc3BsaWNlKDAsIDEpO1xuICAgIHBhdGgucmV2ZXJzZSgpO1xuICAgIHJldHVybiBwYXRoO1xufVxuZXhwb3J0IGNvbnN0IEhlYWRlciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBwYXRoID0gYnVpbGRQYXRoKCk7XG4gICAgcmV0dXJuIDxGcmFnbWVudD5cbiAgICAgICAgPENhcmRDb250YWluZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJoZWFkZXItY29udGVudFwifT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItbG9naW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPFNpZ25JbiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci10b3AgaGVhZGVyLXVybC1jaGlwc1wiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBIb21lXG4gICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7cGF0aC5yZXZlcnNlKCkubWFwKChlLCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2V9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17YnVpbGRCYWNrKGluZGV4KX0+e2V9PC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApLnJldmVyc2UoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NhcmRDb250YWluZXI+XG4gICAgPC9GcmFnbWVudD5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IENTU1Byb3BlcnRpZXMsIFByb3BzV2l0aENoaWxkcmVuLCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi9Db21tZW50XCI7XG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tIFwiLi9IZWFkZXJcIjtcblxudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuPHtcbiAgICB0aXRsZT86IFJlYWN0Tm9kZSxcbiAgICB0aGVtZT86IHtcbiAgICAgICAgXCItLXByaW1hcnlcIj86IHN0cmluZyxcbiAgICAgICAgXCItLWJhY2tncm91bmQtY29sb3JcIj86IHN0cmluZyxcbiAgICAgICAgXCItLWJvcmRlci1jb2xvclwiPzogc3RyaW5nLFxuICAgIH1cbn0+O1xuY29uc3QgdGltZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbmV4cG9ydCBjb25zdCBQYWdlID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHRoZW1lID0gcHJvcHMudGhlbWUgPz8ge307XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPXtcImh0dHBzOi8vYW51ZC5yby91aV9iYXNlL3NyYy9tYWluLmNzc1wifSB0eXBlPVwidGV4dC9jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TWF0ZXJpYWwrU3ltYm9scytPdXRsaW5lZDpvcHN6LHdnaHQsRklMTCxHUkFEQDQ4LDMwMCwwLC0yNVwiIC8+XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cblxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvYXBpLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vZ3NpL2NsaWVudFwiPjwvc2NyaXB0PlxuXG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmFqZGhhbmkmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmFqZGhhbmk6d2dodEA1MDAmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxDb21tZW50Pnt0aW1lfTwvQ29tbWVudD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBcIi0tcHJpbWFyeVwiOiB0aGVtZVtcIi0tcHJpbWFyeVwiXSA/PyBcIiMwMDc0Y2NcIixcbiAgICAgICAgICAgICAgICAgICAgXCItLWJhY2tncm91bmQtY29sb3JcIjogdGhlbWVbXCItLWJhY2tncm91bmQtY29sb3JcIl0gPz8gXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIi0tYm9yZGVyLWNvbG9yXCI6IHRoZW1lWyctLWJvcmRlci1jb2xvciddID8/IFwiI2M0YzRjNFwiLFxuICAgICAgICAgICAgICAgIH0gYXMgQ1NTUHJvcGVydGllc30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVhZGVyPntwcm9wcy50aXRsZX08L0hlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgIDwvaHRtbD5cblxuICAgIClcbn0iLCAiaW1wb3J0IHsgZ2FwaUNsaWVudFByb21pc2UgfSBmcm9tIFwiLi9nYXBpQ2xpZW50UHJvbWlzZVwiO1xuXG5jb25zdCBmaWxlVG9CYXNlNjQgPSAoZmlsZTogRmlsZSkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKChyZWFkZXI/LnJlc3VsdCBhcyBzdHJpbmcpPy5zcGxpdD8uKCcsJylbMV0pO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gZm9ybURhdGFUb0pzb24oZm9ybURhdGEpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBhd2FpdCBmaWxlVG9CYXNlNjQodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHVwbG9hZEZvcm1EYXRhVG9Gb2xkZXIgPSAocGFyZW50SWQ6IHN0cmluZywgZGF0YSkgPT4gYXN5bmMgKGV2ZW50OiBTdWJtaXRFdmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZXZlbnQudGFyZ2V0IGFzIEhUTUxGb3JtRWxlbWVudCk7XG4gICAgY29uc3QgZm9ybURhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgY29uc3QgaWRUb2tlbiA9IGdhcGkuY2xpZW50LmdldFRva2VuKCkuYWNjZXNzX3Rva2VuXG4gICAgZmV0Y2goXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS91cGxvYWQvZHJpdmUvdjMvZmlsZXM/dXBsb2FkVHlwZT1yZXN1bWFibGVcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtpZFRva2VufWAsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnXG4gICAgICAgIH0pLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBuYW1lOiAnZm9ybS1kYXRhLmpzb24nLFxuICAgICAgICAgICAgcGFyZW50czogW3BhcmVudElkXVxuICAgICAgICB9KVxuICAgIH0pLnRoZW4oYXN5bmMgYXBpUmVzcG9uc2UgPT4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IGFwaVJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdMb2NhdGlvbicpKVxuICAgIH0pLnRoZW4oYXN5bmMgaWQgPT4ge1xuICAgICAgICBmZXRjaChpZCA/PyBcIlwiLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2lkVG9rZW59YCxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgICAgIH0pXG4gICAgICAgIC8vIC50aGVuKHJlcyA9PiBjb25zb2xlLmxvZyhyZXMpKVxuICAgIH0pXG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFByb3BzV2l0aENoaWxkcmVuIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBUaXRsZSA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW48e30+KSA9PiA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e3Byb3BzLmNoaWxkcmVufTwvZGl2PiIsICJpbXBvcnQgUmVhY3QsIHsgRnJhZ21lbnQsIFByb3BzV2l0aENoaWxkcmVuLCBSZWFjdE5vZGUsIGNyZWF0ZUNvbnRleHQsIHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyB1cGxvYWRGb3JtRGF0YVRvRm9sZGVyIH0gZnJvbSBcIi4uL3NlcnZpY2UvZ29vZ2xlL3VwbG9hZFRvRmlsZVwiXG5pbXBvcnQgeyBDYXJkQ29udGFpbmVyIH0gZnJvbSBcIi4vQ29udGFpbmVyXCJcbmltcG9ydCB7IERpdmlkZXJIIH0gZnJvbSBcIi4vRGl2aWRlckhcIlxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIi4vYXRvbXMvQnV0dG9uXCJcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSBcIi4vYXRvbXMvVGl0bGVcIlxuXG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW4gJiB7XG4gICAgdGl0bGU/OiBSZWFjdE5vZGVcbiAgICBmb2xkZXJJZDogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgRm9ybUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KHtcbiAgICBzdGF0ZToge30gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgRmlsZT4sXG4gICAgc2V0U3RhdGU6ICguLi5hcmdzKSA9PiB7IH1cbn0pO1xuXG5leHBvcnQgY29uc3QgRm9ybSA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKHt9KTtcblxuICAgIHJldHVybiA8RnJhZ21lbnQ+XG4gICAgICAgIDxDYXJkQ29udGFpbmVyPlxuICAgICAgICAgICAge3Byb3BzLnRpdGxlICYmXG4gICAgICAgICAgICAgICAgPFRpdGxlPlxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMudGl0bGV9XG4gICAgICAgICAgICAgICAgPC9UaXRsZT59XG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJmb3JtXCIgb25TdWJtaXQ9e3VwbG9hZEZvcm1EYXRhVG9Gb2xkZXIocHJvcHMuZm9sZGVySWQsIHN0YXRlKSBhcyBhbnl9PlxuICAgICAgICAgICAgICAgIDxGb3JtQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBzdGF0ZSwgc2V0U3RhdGUgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRleHQuUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24+U3VibWl0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvQ2FyZENvbnRhaW5lcj5cbiAgICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4sIHVzZUNhbGxiYWNrLCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRm9ybUNvbnRleHQgfSBmcm9tIFwiLi4vRm9ybVwiO1xuXG50eXBlIFByb3BzID0ge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICB0eXBlPzogSFRNTElucHV0RWxlbWVudFsndHlwZSddLFxuICAgIGFjY2VwdD86IHN0cmluZyxcbiAgICBjYXB0dXJlPzogXCJjYW1lcmFcIiB8IFwidXNlclwiO1xufVxuXG5jb25zdCBrZWJhYlRvU2VudGVuY2UgPSAoc3RyOiBzdHJpbmcpID0+IHN0ci5zcGxpdCgnLScpLm1hcCh3b3JkID0+IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKCcgJyk7XG5cbmNvbnN0IGNhbWVsVG9TZW50ZW5jZSA9IChzdHI6IHN0cmluZykgPT4gc3RyLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpLnJlcGxhY2UoL14uLywgc3RyID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcblxuY29uc3Qgc25ha2VUb1NlbnRlbmNlID0gKHN0cjogc3RyaW5nKSA9PiBzdHIuc3BsaXQoJ18nKS5tYXAod29yZCA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSkuam9pbignICcpO1xuXG5jb25zdCBsb3dlcmNhc2VJZ25vcmluZ0dyb3VwcyA9IChzdHI6IHN0cmluZykgPT4gc3RyLnJlcGxhY2VBbGwoLyhbYS16XXxcXHMpKFtBLVpdKShbYS16XXxcXHMpL2csIChtYXRjaCwgcDEsIHAyLCBwMykgPT4gcDEgKyBwMi50b0xvd2VyQ2FzZSgpICsgcDMpO1xuXG5jb25zdCBzdHJpbmdUb1NlbnRlbmNlID0gc3RyID0+IHtcbiAgICBpZiAoc3RyLmluY2x1ZGVzKCctJykpIHtcbiAgICAgICAgcmV0dXJuIGtlYmFiVG9TZW50ZW5jZShzdHIpO1xuICAgIH0gZWxzZSBpZiAoc3RyLmluY2x1ZGVzKCdfJykpIHtcbiAgICAgICAgcmV0dXJuIHNuYWtlVG9TZW50ZW5jZShzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjYW1lbFRvU2VudGVuY2Uoc3RyKTtcbiAgICB9XG59O1xuY29uc3QgZmlsZVRvQmFzZTY0ID0gKGZpbGU6IEZpbGUgfCB1bmRlZmluZWQpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPihyZXNvbHZlID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uTG9hZFwiKTtcbiAgICAgICAgICAgIHJlc29sdmUoKHJlYWRlcj8ucmVzdWx0IGFzIHN0cmluZyk/LnNwbGl0Py4oJywnKVsxXSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuZXhwb3J0IGNvbnN0IElucHV0ID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgc3RhdGUsIHNldFN0YXRlIH0gPSB1c2VDb250ZXh0KEZvcm1Db250ZXh0KTtcbiAgICBjb25zdCByZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChwcm9wcy50eXBlICE9PSBcImZpbGVcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWYuY3VycmVudCkge1xuICAgICAgICAgICAgcmVmLmN1cnJlbnQudmFsdWUgPSBudWxsIGFzIGFueTtcbiAgICAgICAgfVxuXG4gICAgfSwgW3Byb3BzLnR5cGUsIHJlZl0pXG4gICAgY29uc3Qgb25DaGFuZ2UgPSB1c2VDYWxsYmFjaygoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IGU/LnRhcmdldD8uZmlsZXM/LlswXTtcbiAgICAgICAgaWYgKHByb3BzLnR5cGUgPT09IFwiZmlsZVwiKSB7XG4gICAgICAgICAgICBmaWxlVG9CYXNlNjQoZmlsZSkudGhlbihmaWxlRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGVuXCIpO1xuICAgICAgICAgICAgICAgIHNldFN0YXRlKHsgLi4uc3RhdGUsIFtwcm9wcy5uYW1lXTogZmlsZURhdGEgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0U3RhdGUoeyAuLi5zdGF0ZSwgW3Byb3BzLm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgIH0sIFtwcm9wcy50eXBlLCBzZXRTdGF0ZSwgc3RhdGVdKVxuICAgIGNvbnN0IHZhbHVlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGlmIChwcm9wcy50eXBlID09PSBcImZpbGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGVbcHJvcHMubmFtZV07XG4gICAgfSwgW3N0YXRlXSlcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHJlZi5jdXJyZW50ICYmIHNldFN0YXRlKHsgLi4uc3RhdGUsIFtwcm9wcy5uYW1lXTogcmVmLmN1cnJlbnQudmFsdWUgfSk7XG4gICAgfSwgW3JlZi5jdXJyZW50XSk7XG5cbiAgICByZXR1cm4gPGxhYmVsIGNsYXNzTmFtZT1cImlucHV0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LW5hbWVcIj57bG93ZXJjYXNlSWdub3JpbmdHcm91cHMoc3RyaW5nVG9TZW50ZW5jZShwcm9wcy5uYW1lKSl9PC9zcGFuPlxuICAgICAgICA8aW5wdXQgcmVmPXtyZWZ9IHR5cGU9e3Byb3BzLnR5cGUgPz8gXCJ0ZXh0XCJ9XG4gICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICBjYXB0dXJlPXtwcm9wcy5jYXB0dXJlfVxuICAgICAgICAgICAgYWNjZXB0PXtwcm9wcy5hY2NlcHR9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgIC8+XG4gICAgPC9sYWJlbD5cbn1cblxuZXhwb3J0IGNvbnN0IFNlbGVjdCA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW48eyBuYW1lOiBzdHJpbmcgfT4pID0+IHtcbiAgICBjb25zdCB7IHN0YXRlLCBzZXRTdGF0ZSB9ID0gdXNlQ29udGV4dChGb3JtQ29udGV4dCk7XG4gICAgY29uc3QgcmVmID0gdXNlUmVmPEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgcmVmLmN1cnJlbnQgJiYgc2V0U3RhdGUoeyAuLi5zdGF0ZSwgW3Byb3BzLm5hbWVdOiByZWYuY3VycmVudC52YWx1ZSB9KTtcbiAgICB9LCBbcmVmLmN1cnJlbnRdKVxuICAgIHJldHVybiA8bGFiZWwgY2xhc3NOYW1lPVwiaW5wdXRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtbmFtZVwiPntsb3dlcmNhc2VJZ25vcmluZ0dyb3VwcyhzdHJpbmdUb1NlbnRlbmNlKHByb3BzLm5hbWUpKX08L3NwYW4+XG4gICAgICAgIDxzZWxlY3QgcmVmPXtyZWZ9IG5hbWU9e3Byb3BzLm5hbWV9XG4gICAgICAgICAgICB2YWx1ZT17c3RhdGVbcHJvcHMubmFtZV0gYXMgc3RyaW5nID8/IFwiXCJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFN0YXRlKHsgLi4uc3RhdGUsIFtwcm9wcy5uYW1lXTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgPC9sYWJlbCA+XG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IENTU1Byb3BlcnRpZXMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1BhZ2VcIjtcbmltcG9ydCB7IEhlYWRlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvSGVhZGVyXCI7XG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9Db21tZW50XCI7XG5pbXBvcnQgeyBDYXJkQ29udGFpbmVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9Db250YWluZXJcIjtcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9UYWJsZVwiO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gXCIuL2NvbXBvbmVudHMvRm9ybVwiO1xuaW1wb3J0IHsgSW5wdXQsIFNlbGVjdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvYXRvbXMvSW5wdXRcIjtcbmNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5tb2R1bGUuZXhwb3J0cyA9IChcblxuICAgIDxQYWdlIHRpdGxlPVwiQWRkIGJveGVzXCI+XG4gICAgICAgIDxGb3JtIGZvbGRlcklkPVwiMUR3VGJVU1dmNWt6TnE4NEtjMDhiSjlXeXc5aWpmQnVTXCI+XG4gICAgICAgICAgICA8SW5wdXQgbmFtZT1cImNhbWVsQ2FzZVwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICAgIDxJbnB1dCBuYW1lPVwia2ViYWItY2FzZVwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICAgIDxJbnB1dCBuYW1lPVwic25ha2VfY2FzZVwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICAgIDxJbnB1dCBuYW1lPVwic25ha2VfY2FzZSBmaWxlXCIgdHlwZT1cImZpbGVcIiBhY2NlcHQ9XCJpbWFnZS8qXCIgLz5cbiAgICAgICAgICAgIDxTZWxlY3QgbmFtZT1cImNhbWVsQ2FzZSBkZW1vXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbj5WYWx1ZTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9TZWxlY3Q+XG4gICAgICAgIDwvRm9ybT5cbiAgICA8L1BhZ2U+XG4pIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxhQUFPLFVBQVUsV0FBVztBQUFBO0FBQUE7OztBQ0E1QixvQkFFYTtBQUZiO0FBQUE7QUFBQSxxQkFBa0I7QUFFWCxNQUFNLFVBQVUsQ0FBQyxFQUFFLFNBQVMsTUFBTTtBQUNyQyxlQUFPLDZCQUFBQSxRQUFBLGNBQUMsU0FBSSx5QkFBeUIsRUFBRSxRQUFRLFFBQVEsZUFBZSxHQUFHO0FBQUEsTUFDN0U7QUFBQTtBQUFBOzs7QUNKQSxNQUFBQyxlQUlhO0FBSmI7QUFBQTtBQUFBLE1BQUFBLGdCQUF5QztBQUlsQyxNQUFNLGdCQUFnQixDQUFDLFVBQWlCO0FBQzNDLGVBQU8sOEJBQUFDLFFBQUEsY0FBQyxTQUFJLFdBQVUseUJBQ2xCLDhCQUFBQSxRQUFBLGNBQUMsU0FBSSxXQUFXLDRCQUE0QixNQUFNLGFBQWEsS0FBSyxLQUFLLEtBQ3BFLE1BQU0sUUFDWCxDQUNKO0FBQUEsTUFDSjtBQUFBO0FBQUE7OztBQ1ZBLE1BQUFDLGVBS2E7QUFMYjtBQUFBO0FBQUEsTUFBQUEsZ0JBQThEO0FBS3ZELE1BQU0sT0FBTyxDQUFDLFVBQWlCO0FBQ2xDLGNBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFB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LFlBQVk7QUFDcEMsYUFBTyxVQUVILCtCQUFBQyxRQUFBLGNBQUMsUUFBSyxPQUFNLGVBQ1IsK0JBQUFBLFFBQUEsY0FBQyxRQUFLLFVBQVMsdUNBQ1gsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLE1BQUssYUFBWSxNQUFLLFFBQU8sR0FDcEMsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLE1BQUssY0FBYSxNQUFLLFFBQU8sR0FDckMsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLE1BQUssY0FBYSxNQUFLLFFBQU8sR0FDckMsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLE1BQUssbUJBQWtCLE1BQUssUUFBTyxRQUFPLFdBQVUsR0FDM0QsK0JBQUFBLFFBQUEsY0FBQyxVQUFPLE1BQUssb0JBQ1QsK0JBQUFBLFFBQUEsY0FBQyxnQkFBTyxPQUFLLENBQ2pCLENBQ0osQ0FDSjtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAicmVzb2x2ZSIsICJnYXBpIiwgImdhcGkiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImdhcGkiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAic3RyIiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJ0aW1lIiwgIlJlYWN0Il0KfQo=
