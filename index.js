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
  var init_arrayToObjects = __esm({
    "src/service/arrayToObjects.ts"() {
    }
  });

  // src/service/google/loadFromSheet.ts
  var loadFromSheet;
  var init_loadFromSheet = __esm({
    "src/service/google/loadFromSheet.ts"() {
      init_arrayToObjects();
      init_gapiClientPromise();
      loadFromSheet = (source) => new Promise(async (resolve, reject) => {
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
    }
  });

  // src/components/Table.tsx
  var import_react8, Table;
  var init_Table = __esm({
    "src/components/Table.tsx"() {
      import_react8 = __toESM(require_react());
      init_loadFromSheet();
      init_newApi();
      init_Container();
      Table = (props) => {
        const [data, setData] = (0, import_react8.useState)([]);
        const loadData = async () => {
          const data2 = await loadFromSheet(props.source);
          const changedData = data2.map((e) => {
            Object.entries(props.cellValues ?? {}).map(([key, value]) => {
              const func = value;
              e[key] = func(e);
            });
            return e;
          });
          setData(changedData);
        };
        (0, import_react8.useEffect)(() => {
          const unsubscribe = newApi.onChange(loadData);
          return () => unsubscribe();
        }, [props.source]);
        const columns = (0, import_react8.useMemo)(() => {
          const columnSet = /* @__PURE__ */ new Set();
          props.columnOrder?.map((e) => columnSet.add(e));
          Object.keys(data?.[0] ?? {}).map((e) => columnSet.add(e));
          return [...columnSet];
        }, [data, JSON.stringify(props.columnOrder)]);
        return /* @__PURE__ */ import_react8.default.createElement(import_react8.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(CardContainer, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "table-container" }, data instanceof Array && data.length > 0 && /* @__PURE__ */ import_react8.default.createElement("div", { className: "table", style: {
          "--number-of-columns": columns.length,
          "--number-of-rows": "20"
        } }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "row" }, columns.map(
          (header, jndex) => /* @__PURE__ */ import_react8.default.createElement("div", { key: jndex }, header)
        )), data.map(
          (e, index) => /* @__PURE__ */ import_react8.default.createElement("div", { key: index, className: "row" }, columns.map(
            (column) => /* @__PURE__ */ import_react8.default.createElement("div", { key: column }, e[column])
          ))
        )), !(data instanceof Array) && /* @__PURE__ */ import_react8.default.createElement("pre", { style: { whiteSpace: "break-spaces" } }, "Failed to load table ", props.source, " Reason:", /* @__PURE__ */ import_react8.default.createElement("br", null), JSON.stringify(data, null, 2)))));
      };
    }
  });

  // src/components/DividerH.tsx
  var import_react9, DividerH;
  var init_DividerH = __esm({
    "src/components/DividerH.tsx"() {
      import_react9 = __toESM(require_react());
      DividerH = () => /* @__PURE__ */ import_react9.default.createElement("div", { className: "divider" });
    }
  });

  // src/index_table.tsx
  var require_index_table = __commonJS({
    "src/index_table.tsx"(exports, module) {
      var import_react10 = __toESM(require_react());
      init_Page();
      init_Table();
      init_Link();
      init_DividerH();
      module.exports = /* @__PURE__ */ import_react10.default.createElement(Page, { title: "Hello world", theme: {
        "--primary": "#70a3c7"
      } }, /* @__PURE__ */ import_react10.default.createElement(Link, { href: "add" }, "Add"), /* @__PURE__ */ import_react10.default.createElement(
        Table,
        {
          source: "1mcnVFYPtTMt-UV0ZvaXs6R2MfSfcSbsMpKhp4dFW6DE",
          columnOrder: ["actiuni"],
          cellValues: {
            "nume": () => "gigi",
            "actiuni": (row) => /* @__PURE__ */ import_react10.default.createElement(Link, { href: `/delete/${row.nume}` }, "Mama")
          },
          title: /* @__PURE__ */ import_react10.default.createElement(Link, { href: "add" }, "Add")
        }
      ), /* @__PURE__ */ import_react10.default.createElement(DividerH, null), /* @__PURE__ */ import_react10.default.createElement(Table, { source: "1mcnVFYPtTMt-UV0ZvaXs6R2MfSfcSbsMpKhp4dFW6DE" }));
    }
  });
  return require_index_table();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJzcmMvY29tcG9uZW50cy9Db21tZW50LnRzeCIsICJzcmMvY29tcG9uZW50cy9Db250YWluZXIudHN4IiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9jb25maWcudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2xvYWRHb29nbGVEZXBlbmRlbmNpZXMudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZS50cyIsICJzcmMvc2VydmljZS9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2ltcGwvbmV3QXBpLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL0xpbmsudHN4IiwgInNyYy9jb21wb25lbnRzL2F0b21zL0J1dHRvbi50c3giLCAic3JjL2NvbXBvbmVudHMvYXBpL3NpZ25Jbi50c3giLCAic3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJzcmMvY29tcG9uZW50cy9QYWdlLnRzeCIsICJzcmMvc2VydmljZS9hcnJheVRvT2JqZWN0cy50cyIsICJzcmMvc2VydmljZS9nb29nbGUvbG9hZEZyb21TaGVldC50cyIsICJzcmMvY29tcG9uZW50cy9UYWJsZS50c3giLCAic3JjL2NvbXBvbmVudHMvRGl2aWRlckgudHN4IiwgInNyYy9pbmRleF90YWJsZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5SZWFjdCIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYDwhLS0gJHtjaGlsZHJlbn0gLS0+YCB9fSAvPlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgQ2FyZENvbnRhaW5lciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyIGNhcmQtY29udGFpbmVyICR7cHJvcHMuY2xhc3NOYW1lID8/IFwiXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW4pID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyYH0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufSIsICJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGFwaUtleTogXCJBSXphU3lCdFEyV095SVVuYVNXQWhsM3M1UEFfTFprV3RwV3o1aUFcIixcbiAgICBjbGllbnRJZDogXCI5ODUyODA5MDcwMzEtZmZ2Zm5jOHBpMGFuZTk5bHNvOWRibDFtMmw1b2M5bm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIixcbiAgICBzY29wZTogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBcIixcbiAgICBkaXNjb3ZlcnlEb2NzOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzL2RyaXZlL3YzL3Jlc3QnXSxcbn0iLCAiY29uc3QgbG9hZFNjcmlwdCA9IChzcmM6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIC8vIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgIC8vIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgIC8vIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICAvLyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSlcblxuZXhwb3J0IGNvbnN0IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgPSBQcm9taXNlLmFsbChbXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvYXBpLmpzJyksXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL2dzaS9jbGllbnQnKSxcbl0pIiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IGdhcGlDbGllbnRQcm9taXNlID0gbmV3IFByb21pc2U8YW55Pihhc3luYyByZXNvbHZlID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGdhcGkubG9hZCgnY2xpZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBnYXBpLmNsaWVudC5pbml0KHtcbiAgICAgICAgICAgIGFwaUtleTogY29uZmlnLmFwaUtleSxcbiAgICAgICAgICAgIGRpc2NvdmVyeURvY3M6IGNvbmZpZy5kaXNjb3ZlcnlEb2NzLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiBnYXBpLmNsaWVudC5sb2FkKCdzaGVldHMnLCAndjQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzb2x2ZShnYXBpKTtcbiAgICB9KTtcbn0pIiwgImltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4vZ2FwaUNsaWVudFByb21pc2VcIjtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGlyYXRpb25EYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICBjb25zdCB0b2tlbiA9IGdhcGk/LmF1dGg/LmdldFRva2VuKCk7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcyh1bmRlZmluZWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdG9rZW5pbmZvP2FjY2Vzc190b2tlbj0ke3Rva2VuLmFjY2Vzc190b2tlbn1gKVxuICAgICAgICAudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBnZXRFeHBpcmF0aW9uRGF0ZSBzdGF0dXMgJHtyZXMuc3RhdHVzfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpPy5leHBpcmVzX2luO1xuICAgICAgICB9KTtcbn07IiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IHRva2VuQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGNvbnN0IHRva2VuQ2xpZW50ID0gZ29vZ2xlLmFjY291bnRzLm9hdXRoMi5pbml0VG9rZW5DbGllbnQoe1xuICAgICAgICBjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgc2NvcGU6IGNvbmZpZy5zY29wZSxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXModG9rZW5DbGllbnQpO1xufSkiLCAiaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgZ2FwaUNsaWVudFByb21pc2UgfSBmcm9tIFwiLi4vZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlXCI7XG5pbXBvcnQgeyBnZXRFeHBpcmF0aW9uRGF0ZSB9IGZyb20gXCIuLi9nb29nbGUvZ2V0RXhwaXJhdGlvbkRhdGVcIjtcbmltcG9ydCB7IHRva2VuQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlXCI7XG5mdW5jdGlvbiBhZGRRdWVyeVBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgbmV3VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgbmV3VXJsLmhhc2ggPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIG5ld1VybC5ocmVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld0FwaTogQXBpID0ge1xuICAgIHNlc3Npb25OYW1lOiAoKSA9PiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICdwYXRoJzogJ2h0dHBzOi8vcGVvcGxlLmdvb2dsZWFwaXMuY29tL3YxL3Blb3BsZS9tZT9wZXJzb25GaWVsZHM9bmFtZXMnLFxuICAgICAgICAgICAgJ21ldGhvZCc6ICdHRVQnLFxuICAgICAgICAgICAgJ2NhbGxiYWNrJzogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZT8ubmFtZXM/LlswXT8uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSxcbiAgICBsb2FkRnJvbVVybDogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzRnJvbVVybCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKSk7XG4gICAgICAgIGlmIChjcmVkZW50aWFsc0Zyb21VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gSlNPTi5wYXJzZShjcmVkZW50aWFsc0Zyb21VcmwpO1xuICAgICAgICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7fSk7XG4gICAgICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihjcmVkZW50aWFscyk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIG9uQ2hhbmdlOiAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgZm4gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzPy5kb2N1bWVudD8uYWRkRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiBnbG9iYWxUaGlzPy5kb2N1bWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihudWxsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICB9LFxuICAgIGxvZ2luOiBhc3luYyAoKSA9PiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbkNsaWVudCA9IGF3YWl0IHRva2VuQ2xpZW50UHJvbWlzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGF3YWl0IG5ld0FwaS5sb2FkRnJvbVVybCgpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0RXhwaXJhdGlvbkRhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuXG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5DbGllbnQuY2FsbGJhY2sgPSAoY3JlZGVudGlhbHNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgYWRkUXVlcnlQYXJhbShjcmVkZW50aWFsc1Jlc3BvbnNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW5DbGllbnQucmVxdWVzdEFjY2Vzc1Rva2VuKHsgcHJvbXB0OiAnY29uc2VudCcgfSk7XG4gICAgfSlcbn0iLCAiaW1wb3J0IFJlYWN0LCB7IFByb3BzV2l0aENoaWxkcmVuLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge25ld0FwaX0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaW1wbC9uZXdBcGlcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgaHJlZjogc3RyaW5nLFxufVxuXG5leHBvcnQgY29uc3QgTGluayA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBbc2VhcmNoUGFyYW1zLCBzZXRTZWFyY2hQYXJhbXNdID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHNldFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3QXBpLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgICAgICAgIGZuKClcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbigpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8YSBjbGFzc05hbWU9XCJsaW5rXCIgaHJlZj17cHJvcHMuaHJlZiArIHNlYXJjaFBhcmFtc30+XG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L2E+XG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG50eXBlIFByb3BzID0gUmVhY3QuRGV0YWlsZWRIVE1MUHJvcHM8UmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+LCBIVE1MQnV0dG9uRWxlbWVudD5cblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cImJ1dHRvblwiPntwcm9wcy5jaGlsZHJlbn08L2J1dHRvbj5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtuZXdBcGl9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2ltcGwvbmV3QXBpXCI7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSBcIi4uL2F0b21zL0J1dHRvblwiO1xuXG5leHBvcnQgY29uc3QgU2lnbkluID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIG5ld0FwaS5sb2dvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXdBcGkubG9naW4oKTtcbiAgICB9LCBbc3RhdGVdKVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIG5ld0FwaS5zZXNzaW9uTmFtZSgpLnRoZW4oc2V0U3RhdGUpO1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShhc3luYyBlID0+IHtcbiAgICAgICAgICAgIHNldFN0YXRlKGF3YWl0IG5ld0FwaS5zZXNzaW9uTmFtZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0FwaS5sb2FkRnJvbVVybCgpO1xuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2NhbGxiYWNrfT5cbiAgICAgICAgICAgIHtzdGF0ZSA/IGBMb2dvdXQgb2YgJHtzdGF0ZX1gIDogXCJMb2dpblwifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICA8Lz5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2FyZENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCIuL2F0b21zL0xpbmtcIjtcbmltcG9ydCB7IERpdmlkZXJIIH0gZnJvbSBcIi4vRGl2aWRlckhcIjtcbmltcG9ydCB7IFNpZ25JbiB9IGZyb20gXCIuL2FwaS9zaWduSW5cIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT47XG5cbmNvbnN0IGJ1aWxkQmFjayA9IGluZGV4ID0+IG5ldyBBcnJheShpbmRleCArIDEpLmZpbGwoXCIuLlwiKS5qb2luKFwiL1wiKVxuY29uc3QgYnVpbGRQYXRoID0gKCkgPT4ge1xuICAgIGNvbnN0IGhyZWYgPSBnbG9iYWxUaGlzPy53aW5kb3c/LmxvY2F0aW9uLmhyZWZcbiAgICBjb25zdCB1cmw6IFVSTCB8IHVuZGVmaW5lZCA9IGhyZWYgPyBuZXcgVVJMKGhyZWYpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBhdGggPSB1cmw/LnBhdGhuYW1lPy5zcGxpdChcIi9cIikuZmlsdGVyKGUgPT4gZSkgPz8gW107XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcGF0aC5zcGxpY2UoMCwgMSk7XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5leHBvcnQgY29uc3QgSGVhZGVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBidWlsZFBhdGgoKTtcbiAgICByZXR1cm4gPEZyYWdtZW50PlxuICAgICAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImhlYWRlci1jb250ZW50XCJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgICA8U2lnbkluIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXRvcCBoZWFkZXItdXJsLWNoaXBzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtwYXRoLnJldmVyc2UoKS5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtidWlsZEJhY2soaW5kZXgpfT57ZX08L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkucmV2ZXJzZSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZENvbnRhaW5lcj5cbiAgICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgQ1NTUHJvcGVydGllcywgUHJvcHNXaXRoQ2hpbGRyZW4sIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuL0NvbW1lbnRcIjtcbmltcG9ydCB7IEhlYWRlciB9IGZyb20gXCIuL0hlYWRlclwiO1xuXG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW48e1xuICAgIHRpdGxlPzogUmVhY3ROb2RlLFxuICAgIHRoZW1lPzoge1xuICAgICAgICBcIi0tcHJpbWFyeVwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYmFja2dyb3VuZC1jb2xvclwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYm9yZGVyLWNvbG9yXCI/OiBzdHJpbmcsXG4gICAgfVxufT47XG5jb25zdCB0aW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuZXhwb3J0IGNvbnN0IFBhZ2UgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSBwcm9wcy50aGVtZSA/PyB7fTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9e1wiaHR0cHM6Ly9hbnVkLnJvL3VpX2Jhc2Uvc3JjL21haW4uY3NzXCJ9IHR5cGU9XCJ0ZXh0L2Nzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1NYXRlcmlhbCtTeW1ib2xzK091dGxpbmVkOm9wc3osd2dodCxGSUxMLEdSQURANDgsMzAwLDAsLTI1XCIgLz5cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuXG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9hcGkuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9nc2kvY2xpZW50XCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2l6aXRvYXN0Lm1hcmNlbG9kb2x6YS5jb20vanMvaXppVG9hc3QubWluLmpzP3Y9MTQwYlwiIC8+XG5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9peml0b2FzdC5tYXJjZWxvZG9semEuY29tL2Nzcy9pemlUb2FzdC5taW4uY3NzP3Y9MTQwYVwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pOndnaHRANTAwJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuXG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICA8Q29tbWVudD57dGltZX08L0NvbW1lbnQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgXCItLXByaW1hcnlcIjogdGhlbWVbXCItLXByaW1hcnlcIl0gPz8gXCIjMDA3NGNjXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiLS1iYWNrZ3JvdW5kLWNvbG9yXCI6IHRoZW1lW1wiLS1iYWNrZ3JvdW5kLWNvbG9yXCJdID8/IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCItLWJvcmRlci1jb2xvclwiOiB0aGVtZVsnLS1ib3JkZXItY29sb3InXSA/PyBcIiNjNGM0YzRcIixcbiAgICAgICAgICAgICAgICB9IGFzIENTU1Byb3BlcnRpZXN9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlYWRlcj57cHJvcHMudGl0bGV9PC9IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+XG5cbiAgICApXG59IiwgImV4cG9ydCBmdW5jdGlvbiBhcnJheVRvT2JqZWN0PFQ+KGFycjogQXJyYXk8QXJyYXk8c3RyaW5nPj4pOiBBcnJheTxUPiB7XG4gICAgdmFyIGtleXMgPSBhcnJbMF07XG4gICAgcmV0dXJuIGFyci5zbGljZSgxKS5tYXAoZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5LCBpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHJvd1tpXTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9IGFzIFQpO1xuICAgIH0pO1xufSIsICJpbXBvcnQgeyBhcnJheVRvT2JqZWN0IH0gZnJvbSBcIi4uL2FycmF5VG9PYmplY3RzXCI7XG5pbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuL2dhcGlDbGllbnRQcm9taXNlXCI7XG5cbmV4cG9ydCBjb25zdCBsb2FkRnJvbVNoZWV0ID0gKHNvdXJjZTogc3RyaW5nKTpQcm9taXNlPEFycmF5PGFueT4+ID0+IG5ldyBQcm9taXNlPEFycmF5PGFueT4+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB2YXIgdXJsID0gYGh0dHBzOi8vc2hlZXRzLmdvb2dsZWFwaXMuY29tL3Y0L3NwcmVhZHNoZWV0cy8ke3NvdXJjZX0vdmFsdWVzL1NoZWV0MWA7XG4gICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgIHZhciBhY2Nlc3NUb2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpLmFjY2Vzc190b2tlbjtcblxuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIGFjY2Vzc1Rva2VuKTtcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgfTtcblxuICAgIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc3ByZWFkc2hlZXQgZGF0YScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRhdGEudmFsdWVzO1xuICAgICAgICAgICAgcmVzb2x2ZShhcnJheVRvT2JqZWN0KHJhbmdlKSk7XG4gICAgICAgIH0pO1xufSkuY2F0Y2goZSA9PiB7XG4gICAgdGhyb3cgZS5yZXN1bHQuZXJyb3I7XG59KSBhcyBhbnkiLCAiaW1wb3J0IFJlYWN0LCB7Q1NTUHJvcGVydGllcywgRnJhZ21lbnQsIFJlYWN0Tm9kZSwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZX0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7bG9hZEZyb21TaGVldH0gZnJvbSBcIi4uL3NlcnZpY2UvZ29vZ2xlL2xvYWRGcm9tU2hlZXRcIlxuaW1wb3J0IHtuZXdBcGl9IGZyb20gXCIuLi9zZXJ2aWNlL2ltcGwvbmV3QXBpXCJcbmltcG9ydCB7Q2FyZENvbnRhaW5lcn0gZnJvbSBcIi4vQ29udGFpbmVyXCJcblxudHlwZSBQcm9wczxUPiA9IHtcbiAgdGl0bGU/OiBSZWFjdE5vZGVcbiAgc291cmNlOiBzdHJpbmcsXG4gIGNvbHVtbk9yZGVyPzogQXJyYXk8a2V5b2YgVD4sXG4gIGNlbGxWYWx1ZXM/OiBSZWNvcmQ8a2V5b2YgVCwgKHJvdzogVCkgPT4gUmVhY3ROb2RlPlxufVxuXG5leHBvcnQgY29uc3QgVGFibGUgPSA8VCBleHRlbmRzIGFueT4ocHJvcHM6IFByb3BzPFQ+KSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlPEFycmF5PGFueT4+KFtdKTtcbiAgY29uc3QgbG9hZERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWRGcm9tU2hlZXQocHJvcHMuc291cmNlKTtcbiAgICBjb25zdCBjaGFuZ2VkRGF0YSA9IGRhdGEubWFwKGUgPT4ge1xuICAgICAgT2JqZWN0LmVudHJpZXMocHJvcHMuY2VsbFZhbHVlcyA/PyB7fSkubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgZnVuYzpGdW5jdGlvbiA9IHZhbHVlIGFzIGFueTtcbiAgICAgICAgZVtrZXldID0gZnVuYyhlKTtcbiAgICAgIH0pXG4gICAgICByZXR1cm4gZTtcbiAgICB9KVxuICAgIHNldERhdGEoY2hhbmdlZERhdGEpXG4gIH1cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShsb2FkRGF0YSlcbiAgICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgfSwgW3Byb3BzLnNvdXJjZV0pXG5cbiAgY29uc3QgY29sdW1uczpBcnJheTxhbnk+ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgY29sdW1uU2V0ID0gbmV3IFNldCgpO1xuICAgIHByb3BzLmNvbHVtbk9yZGVyPy5tYXAoZSA9PiBjb2x1bW5TZXQuYWRkKGUpKTtcbiAgICBPYmplY3Qua2V5cyhkYXRhPy5bMF0gPz8ge30pLm1hcChlID0+IGNvbHVtblNldC5hZGQoKGUpKSk7XG4gICAgcmV0dXJuIFsuLi5jb2x1bW5TZXRdO1xuICB9LCBbZGF0YSwgSlNPTi5zdHJpbmdpZnkocHJvcHMuY29sdW1uT3JkZXIpXSk7XG5cbiAgcmV0dXJuIDxGcmFnbWVudD5cbiAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGUtY29udGFpbmVyXCI+XG4gICAgICAgIHtkYXRhIGluc3RhbmNlb2YgQXJyYXkgJiYgZGF0YS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgXCItLW51bWJlci1vZi1jb2x1bW5zXCI6IGNvbHVtbnMubGVuZ3RoLFxuICAgICAgICAgICAgICBcIi0tbnVtYmVyLW9mLXJvd3NcIjogXCIyMFwiXG4gICAgICAgICAgICB9IGFzIENTU1Byb3BlcnRpZXN9PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5tYXAoKGhlYWRlciwgam5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2puZGV4fT57aGVhZGVyfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtkYXRhLm1hcCgoZSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5tYXAoKGNvbHVtbikgPT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y29sdW1ufT57ZVtjb2x1bW5dfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7IShkYXRhIGluc3RhbmNlb2YgQXJyYXkpICYmIDxwcmUgc3R5bGU9e3t3aGl0ZVNwYWNlOiBcImJyZWFrLXNwYWNlc1wifX0+XG4gICAgICAgICAgICAgICAgICAgIEZhaWxlZCB0byBsb2FkIHRhYmxlIHtwcm9wcy5zb3VyY2V9IFJlYXNvbjpcbiAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICB7SlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMil9XG4gICAgICAgICAgICAgICAgPC9wcmU+fVxuICAgICAgPC9kaXY+XG4gICAgPC9DYXJkQ29udGFpbmVyPlxuXG4gIDwvRnJhZ21lbnQ+XG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IERpdmlkZXJIID0gKCkgPT4gPGRpdiBjbGFzc05hbWU9XCJkaXZpZGVyXCIgLz4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvUGFnZVwiO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tIFwiLi9jb21wb25lbnRzL1RhYmxlXCI7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcIi4vY29tcG9uZW50cy9hdG9tcy9MaW5rXCI7XG5pbXBvcnQgeyBEaXZpZGVySCB9IGZyb20gXCIuL2NvbXBvbmVudHMvRGl2aWRlckhcIjtcbm1vZHVsZS5leHBvcnRzID0gKFxuICAgIDxQYWdlIHRpdGxlPVwiSGVsbG8gd29ybGRcIiB0aGVtZT17e1xuICAgICAgICBcIi0tcHJpbWFyeVwiOiBcIiM3MGEzYzdcIlxuICAgIH19PlxuICAgICAgICA8TGluayBocmVmPXtcImFkZFwifT5BZGQ8L0xpbms+XG4gICAgICAgIDxUYWJsZTxhbnk+IHNvdXJjZT1cIjFtY25WRllQdFRNdC1VVjBadmFYczZSMk1mU2ZjU2JzTXBLaHA0ZEZXNkRFXCJcbiAgICAgICAgICAgICAgIGNvbHVtbk9yZGVyPXtbXCJhY3RpdW5pXCJdfVxuICAgICAgICAgICAgICAgY2VsbFZhbHVlcz17e1xuICAgICAgICAgICAgICAgIFwibnVtZVwiOiAoKSA9PiBcImdpZ2lcIixcbiAgICAgICAgICAgICAgICAgXCJhY3RpdW5pXCI6IHJvdyA9PiA8TGluayBocmVmPXtgL2RlbGV0ZS8ke3Jvdy5udW1lfWB9Pk1hbWE8L0xpbms+XG4gICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgdGl0bGU9e1xuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e1wiYWRkXCJ9PkFkZDwvTGluaz5cbiAgICAgICAgICAgIH0gLz5cbiAgICAgICAgPERpdmlkZXJIIC8+XG4gICAgICAgIDxUYWJsZSBzb3VyY2U9XCIxbWNuVkZZUHRUTXQtVVYwWnZhWHM2UjJNZlNmY1Nic01wS2hwNGRGVzZERVwiIC8+XG4gICAgPC9QYWdlPlxuKSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsYUFBTyxVQUFVLFdBQVc7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VUFDbkIsOEJBQUFBLFFBQUEsY0FBQyxTQUFJLEtBQUssU0FBUSxNQUFPO0FBQUEsUUFDM0IsQ0FFSixHQUNELEtBQUs7QUFBQSxVQUFJLENBQUMsR0FBRyxVQUNaLDhCQUFBQSxRQUFBLGNBQUMsU0FBSSxLQUFLLE9BQU8sV0FBVSxTQUV2QixRQUFRO0FBQUEsWUFBSSxDQUFDLFdBQ1gsOEJBQUFBLFFBQUEsY0FBQyxTQUFJLEtBQUssVUFBUyxFQUFFLE1BQU0sQ0FBRTtBQUFBLFVBQy9CLENBRUo7QUFBQSxRQUNGLENBQ0YsR0FFSCxFQUFFLGdCQUFnQixVQUFVLDhCQUFBQSxRQUFBLGNBQUMsU0FBSSxPQUFPLEVBQUMsWUFBWSxlQUFjLEtBQUcseUJBQ3JDLE1BQU0sUUFBTyxZQUNuQyw4QkFBQUEsUUFBQSxjQUFDLFVBQUUsR0FDWixLQUFLLFVBQVUsTUFBTSxNQUFNLENBQUMsQ0FDdkIsQ0FDVixDQUNGLENBRUY7QUFBQSxNQUNGO0FBQUE7QUFBQTs7O0FDekVBLE1BQUFDLGVBRWE7QUFGYjtBQUFBO0FBQUEsTUFBQUEsZ0JBQWtCO0FBRVgsTUFBTSxXQUFXLE1BQU0sOEJBQUFDLFFBQUEsY0FBQyxTQUFJLFdBQVUsV0FBVTtBQUFBO0FBQUE7OztBQ0Z2RDtBQUFBO0FBQUEsVUFBQUMsaUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBTyxVQUNILCtCQUFBQyxRQUFBLGNBQUMsUUFBSyxPQUFNLGVBQWMsT0FBTztBQUFBLFFBQzdCLGFBQWE7QUFBQSxNQUNqQixLQUNJLCtCQUFBQSxRQUFBLGNBQUMsUUFBSyxNQUFNLFNBQU8sS0FBRyxHQUN0QiwrQkFBQUEsUUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQVcsUUFBTztBQUFBLFVBQ1osYUFBYSxDQUFDLFNBQVM7QUFBQSxVQUN2QixZQUFZO0FBQUEsWUFDWCxRQUFRLE1BQU07QUFBQSxZQUNiLFdBQVcsU0FBTywrQkFBQUEsUUFBQSxjQUFDLFFBQUssTUFBTSxXQUFXLElBQUksVUFBUSxNQUFJO0FBQUEsVUFDM0Q7QUFBQSxVQUNILE9BQ0ksK0JBQUFBLFFBQUEsY0FBQyxRQUFLLE1BQU0sU0FBTyxLQUFHO0FBQUE7QUFBQSxNQUN4QixHQUNOLCtCQUFBQSxRQUFBLGNBQUMsY0FBUyxHQUNWLCtCQUFBQSxRQUFBLGNBQUMsU0FBTSxRQUFPLGdEQUErQyxDQUNqRTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJyZXNvbHZlIiwgImdhcGkiLCAiZ2FwaSIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImdhcGkiLCAiaW1wb3J0X3JlYWN0IiwgImRhdGEiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCJdCn0K
