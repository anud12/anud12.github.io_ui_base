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
        return /* @__PURE__ */ import_react7.default.createElement("html", null, /* @__PURE__ */ import_react7.default.createElement("head", null, /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://anud.ro/ui_base/src/main.css", type: "text/css", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" }), /* @__PURE__ */ import_react7.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani&display=swap", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap", rel: "stylesheet" })), /* @__PURE__ */ import_react7.default.createElement("body", null, /* @__PURE__ */ import_react7.default.createElement(Comment, null, time), /* @__PURE__ */ import_react7.default.createElement("div", { className: "page", style: {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJzcmMvY29tcG9uZW50cy9Db21tZW50LnRzeCIsICJzcmMvY29tcG9uZW50cy9Db250YWluZXIudHN4IiwgInNyYy9jb21wb25lbnRzL2F0b21zL0xpbmsudHN4IiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9jb25maWcudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2xvYWRHb29nbGVEZXBlbmRlbmNpZXMudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZS50cyIsICJzcmMvc2VydmljZS9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2ltcGwvbmV3QXBpLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL0J1dHRvbi50c3giLCAic3JjL2NvbXBvbmVudHMvYXBpL3NpZ25Jbi50c3giLCAic3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJzcmMvY29tcG9uZW50cy9QYWdlLnRzeCIsICJzcmMvc2VydmljZS9nb29nbGUvdXBsb2FkVG9GaWxlLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL1RpdGxlLnRzeCIsICJzcmMvY29tcG9uZW50cy9Gb3JtLnRzeCIsICJzcmMvY29tcG9uZW50cy9hdG9tcy9JbnB1dC50c3giLCAic3JjL2luZGV4X2FkZC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5SZWFjdCIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYDwhLS0gJHtjaGlsZHJlbn0gLS0+YCB9fSAvPlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgQ2FyZENvbnRhaW5lciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyIGNhcmQtY29udGFpbmVyICR7cHJvcHMuY2xhc3NOYW1lID8/IFwiXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW4pID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyYH0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4sIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgaHJlZjogc3RyaW5nLFxufVxuXG5leHBvcnQgY29uc3QgTGluayA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBbc2VhcmNoUGFyYW1zLCBzZXRTZWFyY2hQYXJhbXNdID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHNldFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPGEgY2xhc3NOYW1lPVwibGlua1wiIGhyZWY9e3Byb3BzLmhyZWYgKyBzZWFyY2hQYXJhbXN9PlxuICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgPC9hPlxufSIsICJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGFwaUtleTogXCJBSXphU3lCdFEyV095SVVuYVNXQWhsM3M1UEFfTFprV3RwV3o1aUFcIixcbiAgICBjbGllbnRJZDogXCI5ODUyODA5MDcwMzEtZmZ2Zm5jOHBpMGFuZTk5bHNvOWRibDFtMmw1b2M5bm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIixcbiAgICBzY29wZTogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBcIixcbiAgICBkaXNjb3ZlcnlEb2NzOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzL2RyaXZlL3YzL3Jlc3QnXSxcbn0iLCAiY29uc3QgbG9hZFNjcmlwdCA9IChzcmM6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICAgICAgICBzY3JpcHQuc3JjID0gc3JjO1xuICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4gcmVzb2x2ZSgpO1xuICAgICAgICBzY3JpcHQub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pXG5cbmV4cG9ydCBjb25zdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzID0gUHJvbWlzZS5hbGwoW1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL2FwaS5qcycpLFxuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9nc2kvY2xpZW50JyksXG5dKSIsICJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9sb2FkR29vZ2xlRGVwZW5kZW5jaWVzXCI7XG5cbmV4cG9ydCBjb25zdCBnYXBpQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgYXdhaXQgbG9hZEdvb2dsZURlcGVuZGVuY2llcztcbiAgICBnYXBpLmxvYWQoJ2NsaWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7XG4gICAgICAgICAgICBhcGlLZXk6IGNvbmZpZy5hcGlLZXksXG4gICAgICAgICAgICBkaXNjb3ZlcnlEb2NzOiBjb25maWcuZGlzY292ZXJ5RG9jcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4gZ2FwaS5jbGllbnQubG9hZCgnc2hlZXRzJywgJ3Y0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJlc29sdmUoZ2FwaSk7XG4gICAgfSk7XG59KSIsICJpbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuL2dhcGlDbGllbnRQcm9taXNlXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBpcmF0aW9uRGF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgY29uc3QgdG9rZW4gPSBnYXBpPy5hdXRoPy5nZXRUb2tlbigpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiByZXModW5kZWZpbmVkKSk7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaChgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL3Rva2VuaW5mbz9hY2Nlc3NfdG9rZW49JHt0b2tlbi5hY2Nlc3NfdG9rZW59YClcbiAgICAgICAgLnRoZW4oYXN5bmMgcmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgZ2V0RXhwaXJhdGlvbkRhdGUgc3RhdHVzICR7cmVzLnN0YXR1c31gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChhd2FpdCByZXMuanNvbigpKT8uZXhwaXJlc19pbjtcbiAgICAgICAgfSk7XG59OyIsICJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9sb2FkR29vZ2xlRGVwZW5kZW5jaWVzXCI7XG5cbmV4cG9ydCBjb25zdCB0b2tlbkNsaWVudFByb21pc2UgPSBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIHJlcyA9PiB7XG4gICAgYXdhaXQgbG9hZEdvb2dsZURlcGVuZGVuY2llcztcbiAgICBjb25zdCB0b2tlbkNsaWVudCA9IGdvb2dsZS5hY2NvdW50cy5vYXV0aDIuaW5pdFRva2VuQ2xpZW50KHtcbiAgICAgICAgY2xpZW50X2lkOiBjb25maWcuY2xpZW50SWQsXG4gICAgICAgIHNjb3BlOiBjb25maWcuc2NvcGUsXG4gICAgICAgIHJlZGlyZWN0X3VyaTogXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIixcbiAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVzKHRva2VuQ2xpZW50KTtcbn0pIiwgImltcG9ydCB7IHJlamVjdHMgfSBmcm9tIFwiYXNzZXJ0XCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi4vYXBpXCI7XG5pbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi9nb29nbGUvZ2FwaUNsaWVudFByb21pc2VcIjtcbmltcG9ydCB7IGdldEV4cGlyYXRpb25EYXRlIH0gZnJvbSBcIi4uL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZVwiO1xuaW1wb3J0IHsgdG9rZW5DbGllbnRQcm9taXNlIH0gZnJvbSBcIi4uL2dvb2dsZS90b2tlbkNsaWVudFByb21pc2VcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgdXJsIH0gZnJvbSBcImluc3BlY3RvclwiO1xuZnVuY3Rpb24gYWRkUXVlcnlQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IG5ld1VybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIG5ld1VybC5oYXNoID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCBuZXdVcmwuaHJlZik7XG59XG5cbmV4cG9ydCBjb25zdCBuZXdBcGk6IEFwaSA9IHtcbiAgICBzZXNzaW9uTmFtZTogKCkgPT4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICAgICAgZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgICAncGF0aCc6ICdodHRwczovL3Blb3BsZS5nb29nbGVhcGlzLmNvbS92MS9wZW9wbGUvbWU/cGVyc29uRmllbGRzPW5hbWVzJyxcbiAgICAgICAgICAgICdtZXRob2QnOiAnR0VUJyxcbiAgICAgICAgICAgICdjYWxsYmFjayc6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2U/Lm5hbWVzPy5bMF0/LmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSksXG4gICAgbG9hZEZyb21Vcmw6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBjb25zdCBjcmVkZW50aWFsc0Zyb21VcmwgPSBkZWNvZGVVUkkod2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIiwgXCJcIikpO1xuICAgICAgICBpZiAoY3JlZGVudGlhbHNGcm9tVXJsKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IEpTT04ucGFyc2UoY3JlZGVudGlhbHNGcm9tVXJsKTtcbiAgICAgICAgICAgIGF3YWl0IGdhcGkuY2xpZW50LmluaXQoe30pO1xuICAgICAgICAgICAgZ2FwaS5jbGllbnQuc2V0VG9rZW4oY3JlZGVudGlhbHMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ25ld0FwaS1vbkNoYW5nZScpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBvbkNoYW5nZTogKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNvbnN0IGZuID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJuZXdBcGktb25DaGFuZ2VcIiwgZm4pO1xuICAgICAgICByZXR1cm4gKCkgPT4gZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuZXdBcGktb25DaGFuZ2VcIiwgZm4pO1xuICAgIH0sXG4gICAgbG9nb3V0OiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICAgICAgZ2FwaS5jbGllbnQuc2V0VG9rZW4obnVsbClcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIlwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpXG4gICAgfSxcbiAgICBsb2dpbjogYXN5bmMgKCkgPT4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW5DbGllbnQgPSBhd2FpdCB0b2tlbkNsaWVudFByb21pc2U7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChhd2FpdCBuZXdBcGkubG9hZEZyb21VcmwoKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGdldEV4cGlyYXRpb25EYXRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcblxuICAgICAgICB9XG4gICAgICAgIHRva2VuQ2xpZW50LmNhbGxiYWNrID0gKGNyZWRlbnRpYWxzUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGFkZFF1ZXJ5UGFyYW0oY3JlZGVudGlhbHNSZXNwb25zZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpXG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuQ2xpZW50LnJlcXVlc3RBY2Nlc3NUb2tlbih7IHByb21wdDogJ2NvbnNlbnQnIH0pO1xuICAgIH0pXG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG50eXBlIFByb3BzID0gUmVhY3QuRGV0YWlsZWRIVE1MUHJvcHM8UmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+LCBIVE1MQnV0dG9uRWxlbWVudD5cblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cImJ1dHRvblwiPntwcm9wcy5jaGlsZHJlbn08L2J1dHRvbj5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2dvb2dsZS9nYXBpQ2xpZW50UHJvbWlzZVwiO1xuaW1wb3J0IHsgbmV3QXBpIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaW1wbC9uZXdBcGlcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi9hdG9tcy9CdXR0b25cIjtcblxuZXhwb3J0IGNvbnN0IFNpZ25JbiA9ICgpID0+IHtcbiAgICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBjb25zdCBjYWxsYmFjayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBuZXdBcGkubG9nb3V0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbmV3QXBpLmxvZ2luKCk7XG4gICAgfSwgW3N0YXRlXSlcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBuZXdBcGkuc2Vzc2lvbk5hbWUoKS50aGVuKHNldFN0YXRlKTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSBuZXdBcGkub25DaGFuZ2UoYXN5bmMgZSA9PiB7XG4gICAgICAgICAgICBzZXRTdGF0ZShhd2FpdCBuZXdBcGkuc2Vzc2lvbk5hbWUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXdBcGkubG9hZEZyb21VcmwoKTtcbiAgICAgICAgcmV0dXJuIHVuc3Vic2NyaWJlO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtjYWxsYmFja30+XG4gICAgICAgICAgICB7c3RhdGUgPyBgTG9nb3V0IG9mICR7c3RhdGV9YCA6IFwiTG9naW5cIn1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgPC8+XG59IiwgImltcG9ydCBSZWFjdCwgeyBGcmFnbWVudCwgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENhcmRDb250YWluZXIgfSBmcm9tIFwiLi9Db250YWluZXJcIjtcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwiLi9hdG9tcy9MaW5rXCI7XG5pbXBvcnQgeyBEaXZpZGVySCB9IGZyb20gXCIuL0RpdmlkZXJIXCI7XG5pbXBvcnQgeyBTaWduSW4gfSBmcm9tIFwiLi9hcGkvc2lnbkluXCI7XG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW48e30+O1xuXG5jb25zdCBidWlsZEJhY2sgPSBpbmRleCA9PiBuZXcgQXJyYXkoaW5kZXggKyAxKS5maWxsKFwiLi5cIikuam9pbihcIi9cIilcbmNvbnN0IGJ1aWxkUGF0aCA9ICgpID0+IHtcbiAgICBjb25zdCBocmVmID0gZ2xvYmFsVGhpcz8ud2luZG93Py5sb2NhdGlvbi5ocmVmXG4gICAgY29uc3QgdXJsOiBVUkwgfCB1bmRlZmluZWQgPSBocmVmID8gbmV3IFVSTChocmVmKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwYXRoID0gdXJsPy5wYXRobmFtZT8uc3BsaXQoXCIvXCIpLmZpbHRlcihlID0+IGUpID8/IFtdO1xuICAgIHBhdGgucmV2ZXJzZSgpO1xuICAgIHBhdGguc3BsaWNlKDAsIDEpO1xuICAgIHBhdGgucmV2ZXJzZSgpO1xuICAgIHJldHVybiBwYXRoO1xufVxuZXhwb3J0IGNvbnN0IEhlYWRlciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBwYXRoID0gYnVpbGRQYXRoKCk7XG4gICAgcmV0dXJuIDxGcmFnbWVudD5cbiAgICAgICAgPENhcmRDb250YWluZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJoZWFkZXItY29udGVudFwifT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItbG9naW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPFNpZ25JbiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci10b3AgaGVhZGVyLXVybC1jaGlwc1wiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBIb21lXG4gICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7cGF0aC5yZXZlcnNlKCkubWFwKChlLCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2V9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17YnVpbGRCYWNrKGluZGV4KX0+e2V9PC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApLnJldmVyc2UoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NhcmRDb250YWluZXI+XG4gICAgPC9GcmFnbWVudD5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IENTU1Byb3BlcnRpZXMsIFByb3BzV2l0aENoaWxkcmVuLCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi9Db21tZW50XCI7XG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tIFwiLi9IZWFkZXJcIjtcblxudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuPHtcbiAgICB0aXRsZT86IFJlYWN0Tm9kZSxcbiAgICB0aGVtZT86IHtcbiAgICAgICAgXCItLXByaW1hcnlcIj86IHN0cmluZyxcbiAgICAgICAgXCItLWJhY2tncm91bmQtY29sb3JcIj86IHN0cmluZyxcbiAgICAgICAgXCItLWJvcmRlci1jb2xvclwiPzogc3RyaW5nLFxuICAgIH1cbn0+O1xuY29uc3QgdGltZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbmV4cG9ydCBjb25zdCBQYWdlID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHRoZW1lID0gcHJvcHMudGhlbWUgPz8ge307XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPXtcImh0dHBzOi8vYW51ZC5yby91aV9iYXNlL3NyYy9tYWluLmNzc1wifSB0eXBlPVwidGV4dC9jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TWF0ZXJpYWwrU3ltYm9scytPdXRsaW5lZDpvcHN6LHdnaHQsRklMTCxHUkFEQDQ4LDMwMCwwLC0yNVwiIC8+XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cblxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pOndnaHRANTAwJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuXG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICA8Q29tbWVudD57dGltZX08L0NvbW1lbnQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgXCItLXByaW1hcnlcIjogdGhlbWVbXCItLXByaW1hcnlcIl0gPz8gXCIjMDA3NGNjXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiLS1iYWNrZ3JvdW5kLWNvbG9yXCI6IHRoZW1lW1wiLS1iYWNrZ3JvdW5kLWNvbG9yXCJdID8/IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCItLWJvcmRlci1jb2xvclwiOiB0aGVtZVsnLS1ib3JkZXItY29sb3InXSA/PyBcIiNjNGM0YzRcIixcbiAgICAgICAgICAgICAgICB9IGFzIENTU1Byb3BlcnRpZXN9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlYWRlcj57cHJvcHMudGl0bGV9PC9IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+XG5cbiAgICApXG59IiwgImltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4vZ2FwaUNsaWVudFByb21pc2VcIjtcblxuY29uc3QgZmlsZVRvQmFzZTY0ID0gKGZpbGU6IEZpbGUpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgocmVhZGVyPy5yZXN1bHQgYXMgc3RyaW5nKT8uc3BsaXQ/LignLCcpWzFdKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZvcm1EYXRhVG9Kc29uKGZvcm1EYXRhKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZm9ybURhdGEuZW50cmllcygpKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gYXdhaXQgZmlsZVRvQmFzZTY0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG59XG5cbmV4cG9ydCBjb25zdCB1cGxvYWRGb3JtRGF0YVRvRm9sZGVyID0gKHBhcmVudElkOiBzdHJpbmcsIGRhdGEpID0+IGFzeW5jIChldmVudDogU3VibWl0RXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCBhcyBIVE1MRm9ybUVsZW1lbnQpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgIGNvbnN0IGlkVG9rZW4gPSBnYXBpLmNsaWVudC5nZXRUb2tlbigpLmFjY2Vzc190b2tlblxuICAgIGZldGNoKFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vdXBsb2FkL2RyaXZlL3YzL2ZpbGVzP3VwbG9hZFR5cGU9cmVzdW1hYmxlXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7aWRUb2tlbn1gLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04J1xuICAgICAgICB9KSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgbmFtZTogJ2Zvcm0tZGF0YS5qc29uJyxcbiAgICAgICAgICAgIHBhcmVudHM6IFtwYXJlbnRJZF1cbiAgICAgICAgfSlcbiAgICB9KS50aGVuKGFzeW5jIGFwaVJlc3BvbnNlID0+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCBhcGlSZXNwb25zZS5oZWFkZXJzLmdldCgnTG9jYXRpb24nKSlcbiAgICB9KS50aGVuKGFzeW5jIGlkID0+IHtcbiAgICAgICAgZmV0Y2goaWQgPz8gXCJcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtpZFRva2VufWAsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBib2R5OiBmb3JtRGF0YVxuICAgICAgICB9KVxuICAgICAgICAvLyAudGhlbihyZXMgPT4gY29uc29sZS5sb2cocmVzKSlcbiAgICB9KVxufSIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgVGl0bGUgPSAocHJvcHM6IFByb3BzV2l0aENoaWxkcmVuPHt9PikgPT4gPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPntwcm9wcy5jaGlsZHJlbn08L2Rpdj4iLCAiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCBQcm9wc1dpdGhDaGlsZHJlbiwgUmVhY3ROb2RlLCBjcmVhdGVDb250ZXh0LCB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgdXBsb2FkRm9ybURhdGFUb0ZvbGRlciB9IGZyb20gXCIuLi9zZXJ2aWNlL2dvb2dsZS91cGxvYWRUb0ZpbGVcIlxuaW1wb3J0IHsgQ2FyZENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lclwiXG5pbXBvcnQgeyBEaXZpZGVySCB9IGZyb20gXCIuL0RpdmlkZXJIXCJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuL2F0b21zL0J1dHRvblwiXG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gXCIuL2F0b21zL1RpdGxlXCJcblxudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuICYge1xuICAgIHRpdGxlPzogUmVhY3ROb2RlXG4gICAgZm9sZGVySWQ6IHN0cmluZ1xufVxuZXhwb3J0IGNvbnN0IEZvcm1Db250ZXh0ID0gY3JlYXRlQ29udGV4dCh7XG4gICAgc3RhdGU6IHt9IGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IEZpbGU+LFxuICAgIHNldFN0YXRlOiAoLi4uYXJncykgPT4geyB9XG59KTtcblxuZXhwb3J0IGNvbnN0IEZvcm0gPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZSh7fSk7XG5cbiAgICByZXR1cm4gPEZyYWdtZW50PlxuICAgICAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgICAgICAgIHtwcm9wcy50aXRsZSAmJlxuICAgICAgICAgICAgICAgIDxUaXRsZT5cbiAgICAgICAgICAgICAgICAgICAge3Byb3BzLnRpdGxlfVxuICAgICAgICAgICAgICAgIDwvVGl0bGU+fVxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybVwiIG9uU3VibWl0PXt1cGxvYWRGb3JtRGF0YVRvRm9sZGVyKHByb3BzLmZvbGRlcklkLCBzdGF0ZSkgYXMgYW55fT5cbiAgICAgICAgICAgICAgICA8Rm9ybUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgc3RhdGUsIHNldFN0YXRlIH19PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Db250ZXh0LlByb3ZpZGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uPlN1Ym1pdDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L0NhcmRDb250YWluZXI+XG4gICAgPC9GcmFnbWVudD5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IFByb3BzV2l0aENoaWxkcmVuLCB1c2VDYWxsYmFjaywgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEZvcm1Db250ZXh0IH0gZnJvbSBcIi4uL0Zvcm1cIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgdHlwZT86IEhUTUxJbnB1dEVsZW1lbnRbJ3R5cGUnXSxcbiAgICBhY2NlcHQ/OiBzdHJpbmcsXG4gICAgY2FwdHVyZT86IFwiY2FtZXJhXCIgfCBcInVzZXJcIjtcbn1cblxuY29uc3Qga2ViYWJUb1NlbnRlbmNlID0gKHN0cjogc3RyaW5nKSA9PiBzdHIuc3BsaXQoJy0nKS5tYXAod29yZCA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSkuam9pbignICcpO1xuXG5jb25zdCBjYW1lbFRvU2VudGVuY2UgPSAoc3RyOiBzdHJpbmcpID0+IHN0ci5yZXBsYWNlKC8oW0EtWl0pL2csICcgJDEnKS5yZXBsYWNlKC9eLi8sIHN0ciA9PiBzdHIudG9VcHBlckNhc2UoKSk7XG5cbmNvbnN0IHNuYWtlVG9TZW50ZW5jZSA9IChzdHI6IHN0cmluZykgPT4gc3RyLnNwbGl0KCdfJykubWFwKHdvcmQgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpLmpvaW4oJyAnKTtcblxuY29uc3QgbG93ZXJjYXNlSWdub3JpbmdHcm91cHMgPSAoc3RyOiBzdHJpbmcpID0+IHN0ci5yZXBsYWNlQWxsKC8oW2Etel18XFxzKShbQS1aXSkoW2Etel18XFxzKS9nLCAobWF0Y2gsIHAxLCBwMiwgcDMpID0+IHAxICsgcDIudG9Mb3dlckNhc2UoKSArIHAzKTtcblxuY29uc3Qgc3RyaW5nVG9TZW50ZW5jZSA9IHN0ciA9PiB7XG4gICAgaWYgKHN0ci5pbmNsdWRlcygnLScpKSB7XG4gICAgICAgIHJldHVybiBrZWJhYlRvU2VudGVuY2Uoc3RyKTtcbiAgICB9IGVsc2UgaWYgKHN0ci5pbmNsdWRlcygnXycpKSB7XG4gICAgICAgIHJldHVybiBzbmFrZVRvU2VudGVuY2Uoc3RyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FtZWxUb1NlbnRlbmNlKHN0cik7XG4gICAgfVxufTtcbmNvbnN0IGZpbGVUb0Jhc2U2NCA9IChmaWxlOiBGaWxlIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ocmVzb2x2ZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbkxvYWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKChyZWFkZXI/LnJlc3VsdCBhcyBzdHJpbmcpPy5zcGxpdD8uKCcsJylbMV0pO1xuICAgICAgICB9XG4gICAgfSlcbn1cbmV4cG9ydCBjb25zdCBJbnB1dCA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHN0YXRlLCBzZXRTdGF0ZSB9ID0gdXNlQ29udGV4dChGb3JtQ29udGV4dCk7XG4gICAgY29uc3QgcmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAocHJvcHMudHlwZSAhPT0gXCJmaWxlXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJlZi5jdXJyZW50LnZhbHVlID0gbnVsbCBhcyBhbnk7XG4gICAgICAgIH1cblxuICAgIH0sIFtwcm9wcy50eXBlLCByZWZdKVxuICAgIGNvbnN0IG9uQ2hhbmdlID0gdXNlQ2FsbGJhY2soKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBlPy50YXJnZXQ/LmZpbGVzPy5bMF07XG4gICAgICAgIGlmIChwcm9wcy50eXBlID09PSBcImZpbGVcIikge1xuICAgICAgICAgICAgZmlsZVRvQmFzZTY0KGZpbGUpLnRoZW4oZmlsZURhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlblwiKTtcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBbcHJvcHMubmFtZV06IGZpbGVEYXRhIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldFN0YXRlKHsgLi4uc3RhdGUsIFtwcm9wcy5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcbiAgICB9LCBbcHJvcHMudHlwZSwgc2V0U3RhdGUsIHN0YXRlXSlcbiAgICBjb25zdCB2YWx1ZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBpZiAocHJvcHMudHlwZSA9PT0gXCJmaWxlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlW3Byb3BzLm5hbWVdO1xuICAgIH0sIFtzdGF0ZV0pXG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICByZWYuY3VycmVudCAmJiBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBbcHJvcHMubmFtZV06IHJlZi5jdXJyZW50LnZhbHVlIH0pO1xuICAgIH0sIFtyZWYuY3VycmVudF0pO1xuXG4gICAgcmV0dXJuIDxsYWJlbCBjbGFzc05hbWU9XCJpbnB1dFwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1uYW1lXCI+e2xvd2VyY2FzZUlnbm9yaW5nR3JvdXBzKHN0cmluZ1RvU2VudGVuY2UocHJvcHMubmFtZSkpfTwvc3Bhbj5cbiAgICAgICAgPGlucHV0IHJlZj17cmVmfSB0eXBlPXtwcm9wcy50eXBlID8/IFwidGV4dFwifVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgY2FwdHVyZT17cHJvcHMuY2FwdHVyZX1cbiAgICAgICAgICAgIGFjY2VwdD17cHJvcHMuYWNjZXB0fVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgIDwvbGFiZWw+XG59XG5cbmV4cG9ydCBjb25zdCBTZWxlY3QgPSAocHJvcHM6IFByb3BzV2l0aENoaWxkcmVuPHsgbmFtZTogc3RyaW5nIH0+KSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZSwgc2V0U3RhdGUgfSA9IHVzZUNvbnRleHQoRm9ybUNvbnRleHQpO1xuICAgIGNvbnN0IHJlZiA9IHVzZVJlZjxIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHJlZi5jdXJyZW50ICYmIHNldFN0YXRlKHsgLi4uc3RhdGUsIFtwcm9wcy5uYW1lXTogcmVmLmN1cnJlbnQudmFsdWUgfSk7XG4gICAgfSwgW3JlZi5jdXJyZW50XSlcbiAgICByZXR1cm4gPGxhYmVsIGNsYXNzTmFtZT1cImlucHV0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LW5hbWVcIj57bG93ZXJjYXNlSWdub3JpbmdHcm91cHMoc3RyaW5nVG9TZW50ZW5jZShwcm9wcy5uYW1lKSl9PC9zcGFuPlxuICAgICAgICA8c2VsZWN0IHJlZj17cmVmfSBuYW1lPXtwcm9wcy5uYW1lfVxuICAgICAgICAgICAgdmFsdWU9e3N0YXRlW3Byb3BzLm5hbWVdIGFzIHN0cmluZyA/PyBcIlwifVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBbcHJvcHMubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICA+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvc2VsZWN0PlxuICAgIDwvbGFiZWwgPlxufVxuIiwgImltcG9ydCBSZWFjdCwgeyBDU1NQcm9wZXJ0aWVzIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9QYWdlXCI7XG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL0hlYWRlclwiO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvQ29tbWVudFwiO1xuaW1wb3J0IHsgQ2FyZENvbnRhaW5lciB9IGZyb20gXCIuL2NvbXBvbmVudHMvQ29udGFpbmVyXCI7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvVGFibGVcIjtcbmltcG9ydCB7IEZvcm0gfSBmcm9tIFwiLi9jb21wb25lbnRzL0Zvcm1cIjtcbmltcG9ydCB7IElucHV0LCBTZWxlY3QgfSBmcm9tIFwiLi9jb21wb25lbnRzL2F0b21zL0lucHV0XCI7XG5jb25zdCB0aW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xubW9kdWxlLmV4cG9ydHMgPSAoXG5cbiAgICA8UGFnZSB0aXRsZT1cIkFkZCBib3hlc1wiPlxuICAgICAgICA8Rm9ybSBmb2xkZXJJZD1cIjFEd1RiVVNXZjVrek5xODRLYzA4Yko5V3l3OWlqZkJ1U1wiPlxuICAgICAgICAgICAgPElucHV0IG5hbWU9XCJjYW1lbENhc2VcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgICA8SW5wdXQgbmFtZT1cImtlYmFiLWNhc2VcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgICA8SW5wdXQgbmFtZT1cInNuYWtlX2Nhc2VcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgICA8SW5wdXQgbmFtZT1cInNuYWtlX2Nhc2UgZmlsZVwiIHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwiaW1hZ2UvKlwiIC8+XG4gICAgICAgICAgICA8U2VsZWN0IG5hbWU9XCJjYW1lbENhc2UgZGVtb1wiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24+VmFsdWU8L29wdGlvbj5cbiAgICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICA8L0Zvcm0+XG4gICAgPC9QYWdlPlxuKSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsYUFBTyxVQUFVLFdBQVc7QUFBQTtBQUFBOzs7QUNBNUIsb0JBRWE7QUFGYjtBQUFBO0FBQUEscUJBQWtCO0FBRVgsTUFBTSxVQUFVLENBQUMsRUFBRSxTQUFTLE1BQU07QUFDckMsZUFBTyw2QkFBQUEsUUFBQSxjQUFDLFNBQUkseUJBQXlCLEVBQUUsUUFBUSxRQUFRLGVBQWUsR0FBRztBQUFBLE1BQzdFO0FBQUE7QUFBQTs7O0FDSkEsTUFBQUMsZUFJYTtBQUpiO0FBQUE7QUFBQSxNQUFBQSxnQkFBeUM7QUFJbEMsTUFBTSxnQkFBZ0IsQ0FBQyxVQUFpQjtBQUMzQyxlQUFPLDhCQUFBQyxRQUFBLGNBQUMsU0FBSSxXQUFVLHlCQUNsQiw4QkFBQUEsUUFBQSxjQUFDLFNBQUksV0FBVyw0QkFBNEIsTUFBTSxhQUFhLEtBQUssS0FBSyxLQUNwRSxNQUFNLFFBQ1gsQ0FDSjtBQUFBLE1BQ0o7QUFBQTtBQUFBOzs7QUNWQSxNQUFBQyxlQUthO0FBTGI7QUFBQTtBQUFBLE1BQUFBLGdCQUE4RDtBQUt2RCxNQUFNLE9BQU8sQ0FBQyxVQUFpQjtBQUNsQyxjQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQWlCLEVBQUU7QUFDM0QscUNBQVUsTUFBTTtBQUNaLDBCQUFnQixPQUFPLFNBQVMsSUFBSTtBQUNwQyxnQkFBTSxLQUFLLE1BQU07QUFDYiw0QkFBZ0IsT0FBTyxTQUFTLElBQUk7QUFBQSxVQUN4QztBQUNBLGlCQUFPLGlCQUFpQixjQUFjLEVBQUU7QUFDeEMsaUJBQU8sTUFBTTtBQUNU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QSxjQUFDLFNBQU0sTUFBSyxtQkFBa0IsTUFBSyxRQUFPLFFBQU8sV0FBVSxHQUMzRCwrQkFBQUEsUUFBQSxjQUFDLFVBQU8sTUFBSyxvQkFDVCwrQkFBQUEsUUFBQSxjQUFDLGdCQUFPLE9BQUssQ0FDakIsQ0FDSixDQUNKO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJyZXNvbHZlIiwgImdhcGkiLCAiZ2FwaSIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiZ2FwaSIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJzdHIiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInRpbWUiLCAiUmVhY3QiXQp9Cg==
