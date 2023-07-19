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
              e[key] = value(e);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJzcmMvY29tcG9uZW50cy9Db21tZW50LnRzeCIsICJzcmMvY29tcG9uZW50cy9Db250YWluZXIudHN4IiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9jb25maWcudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2xvYWRHb29nbGVEZXBlbmRlbmNpZXMudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZS50cyIsICJzcmMvc2VydmljZS9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2ltcGwvbmV3QXBpLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL0xpbmsudHN4IiwgInNyYy9jb21wb25lbnRzL2F0b21zL0J1dHRvbi50c3giLCAic3JjL2NvbXBvbmVudHMvYXBpL3NpZ25Jbi50c3giLCAic3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJzcmMvY29tcG9uZW50cy9QYWdlLnRzeCIsICJzcmMvc2VydmljZS9hcnJheVRvT2JqZWN0cy50cyIsICJzcmMvc2VydmljZS9nb29nbGUvbG9hZEZyb21TaGVldC50cyIsICJzcmMvY29tcG9uZW50cy9UYWJsZS50c3giLCAic3JjL2NvbXBvbmVudHMvRGl2aWRlckgudHN4IiwgInNyYy9pbmRleF90YWJsZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5SZWFjdCIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYDwhLS0gJHtjaGlsZHJlbn0gLS0+YCB9fSAvPlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgQ2FyZENvbnRhaW5lciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyIGNhcmQtY29udGFpbmVyICR7cHJvcHMuY2xhc3NOYW1lID8/IFwiXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW4pID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyYH0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufSIsICJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGFwaUtleTogXCJBSXphU3lCdFEyV095SVVuYVNXQWhsM3M1UEFfTFprV3RwV3o1aUFcIixcbiAgICBjbGllbnRJZDogXCI5ODUyODA5MDcwMzEtZmZ2Zm5jOHBpMGFuZTk5bHNvOWRibDFtMmw1b2M5bm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIixcbiAgICBzY29wZTogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBcIixcbiAgICBkaXNjb3ZlcnlEb2NzOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzL2RyaXZlL3YzL3Jlc3QnXSxcbn0iLCAiY29uc3QgbG9hZFNjcmlwdCA9IChzcmM6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIC8vIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgIC8vIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgIC8vIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICAvLyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSlcblxuZXhwb3J0IGNvbnN0IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgPSBQcm9taXNlLmFsbChbXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvYXBpLmpzJyksXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL2dzaS9jbGllbnQnKSxcbl0pIiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IGdhcGlDbGllbnRQcm9taXNlID0gbmV3IFByb21pc2U8YW55Pihhc3luYyByZXNvbHZlID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGdhcGkubG9hZCgnY2xpZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBnYXBpLmNsaWVudC5pbml0KHtcbiAgICAgICAgICAgIGFwaUtleTogY29uZmlnLmFwaUtleSxcbiAgICAgICAgICAgIGRpc2NvdmVyeURvY3M6IGNvbmZpZy5kaXNjb3ZlcnlEb2NzLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiBnYXBpLmNsaWVudC5sb2FkKCdzaGVldHMnLCAndjQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzb2x2ZShnYXBpKTtcbiAgICB9KTtcbn0pIiwgImltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4vZ2FwaUNsaWVudFByb21pc2VcIjtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGlyYXRpb25EYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICBjb25zdCB0b2tlbiA9IGdhcGk/LmF1dGg/LmdldFRva2VuKCk7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcyh1bmRlZmluZWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdG9rZW5pbmZvP2FjY2Vzc190b2tlbj0ke3Rva2VuLmFjY2Vzc190b2tlbn1gKVxuICAgICAgICAudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBnZXRFeHBpcmF0aW9uRGF0ZSBzdGF0dXMgJHtyZXMuc3RhdHVzfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpPy5leHBpcmVzX2luO1xuICAgICAgICB9KTtcbn07IiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IHRva2VuQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGNvbnN0IHRva2VuQ2xpZW50ID0gZ29vZ2xlLmFjY291bnRzLm9hdXRoMi5pbml0VG9rZW5DbGllbnQoe1xuICAgICAgICBjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgc2NvcGU6IGNvbmZpZy5zY29wZSxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXModG9rZW5DbGllbnQpO1xufSkiLCAiaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgZ2FwaUNsaWVudFByb21pc2UgfSBmcm9tIFwiLi4vZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlXCI7XG5pbXBvcnQgeyBnZXRFeHBpcmF0aW9uRGF0ZSB9IGZyb20gXCIuLi9nb29nbGUvZ2V0RXhwaXJhdGlvbkRhdGVcIjtcbmltcG9ydCB7IHRva2VuQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlXCI7XG5mdW5jdGlvbiBhZGRRdWVyeVBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgbmV3VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgbmV3VXJsLmhhc2ggPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIG5ld1VybC5ocmVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld0FwaTogQXBpID0ge1xuICAgIHNlc3Npb25OYW1lOiAoKSA9PiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICdwYXRoJzogJ2h0dHBzOi8vcGVvcGxlLmdvb2dsZWFwaXMuY29tL3YxL3Blb3BsZS9tZT9wZXJzb25GaWVsZHM9bmFtZXMnLFxuICAgICAgICAgICAgJ21ldGhvZCc6ICdHRVQnLFxuICAgICAgICAgICAgJ2NhbGxiYWNrJzogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZT8ubmFtZXM/LlswXT8uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSxcbiAgICBsb2FkRnJvbVVybDogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzRnJvbVVybCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKSk7XG4gICAgICAgIGlmIChjcmVkZW50aWFsc0Zyb21VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gSlNPTi5wYXJzZShjcmVkZW50aWFsc0Zyb21VcmwpO1xuICAgICAgICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7fSk7XG4gICAgICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihjcmVkZW50aWFscyk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIG9uQ2hhbmdlOiAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgZm4gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzPy5kb2N1bWVudD8uYWRkRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiBnbG9iYWxUaGlzPy5kb2N1bWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihudWxsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICB9LFxuICAgIGxvZ2luOiBhc3luYyAoKSA9PiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbkNsaWVudCA9IGF3YWl0IHRva2VuQ2xpZW50UHJvbWlzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGF3YWl0IG5ld0FwaS5sb2FkRnJvbVVybCgpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0RXhwaXJhdGlvbkRhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuXG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5DbGllbnQuY2FsbGJhY2sgPSAoY3JlZGVudGlhbHNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgYWRkUXVlcnlQYXJhbShjcmVkZW50aWFsc1Jlc3BvbnNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW5DbGllbnQucmVxdWVzdEFjY2Vzc1Rva2VuKHsgcHJvbXB0OiAnY29uc2VudCcgfSk7XG4gICAgfSlcbn0iLCAiaW1wb3J0IFJlYWN0LCB7IFByb3BzV2l0aENoaWxkcmVuLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge25ld0FwaX0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaW1wbC9uZXdBcGlcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgaHJlZjogc3RyaW5nLFxufVxuXG5leHBvcnQgY29uc3QgTGluayA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBbc2VhcmNoUGFyYW1zLCBzZXRTZWFyY2hQYXJhbXNdID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHNldFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3QXBpLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgICAgICAgIGZuKClcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbigpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8YSBjbGFzc05hbWU9XCJsaW5rXCIgaHJlZj17cHJvcHMuaHJlZiArIHNlYXJjaFBhcmFtc30+XG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L2E+XG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG50eXBlIFByb3BzID0gUmVhY3QuRGV0YWlsZWRIVE1MUHJvcHM8UmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+LCBIVE1MQnV0dG9uRWxlbWVudD5cblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cImJ1dHRvblwiPntwcm9wcy5jaGlsZHJlbn08L2J1dHRvbj5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtuZXdBcGl9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2ltcGwvbmV3QXBpXCI7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSBcIi4uL2F0b21zL0J1dHRvblwiO1xuXG5leHBvcnQgY29uc3QgU2lnbkluID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIG5ld0FwaS5sb2dvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXdBcGkubG9naW4oKTtcbiAgICB9LCBbc3RhdGVdKVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIG5ld0FwaS5zZXNzaW9uTmFtZSgpLnRoZW4oc2V0U3RhdGUpO1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShhc3luYyBlID0+IHtcbiAgICAgICAgICAgIHNldFN0YXRlKGF3YWl0IG5ld0FwaS5zZXNzaW9uTmFtZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0FwaS5sb2FkRnJvbVVybCgpO1xuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2NhbGxiYWNrfT5cbiAgICAgICAgICAgIHtzdGF0ZSA/IGBMb2dvdXQgb2YgJHtzdGF0ZX1gIDogXCJMb2dpblwifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICA8Lz5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2FyZENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCIuL2F0b21zL0xpbmtcIjtcbmltcG9ydCB7IERpdmlkZXJIIH0gZnJvbSBcIi4vRGl2aWRlckhcIjtcbmltcG9ydCB7IFNpZ25JbiB9IGZyb20gXCIuL2FwaS9zaWduSW5cIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT47XG5cbmNvbnN0IGJ1aWxkQmFjayA9IGluZGV4ID0+IG5ldyBBcnJheShpbmRleCArIDEpLmZpbGwoXCIuLlwiKS5qb2luKFwiL1wiKVxuY29uc3QgYnVpbGRQYXRoID0gKCkgPT4ge1xuICAgIGNvbnN0IGhyZWYgPSBnbG9iYWxUaGlzPy53aW5kb3c/LmxvY2F0aW9uLmhyZWZcbiAgICBjb25zdCB1cmw6IFVSTCB8IHVuZGVmaW5lZCA9IGhyZWYgPyBuZXcgVVJMKGhyZWYpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBhdGggPSB1cmw/LnBhdGhuYW1lPy5zcGxpdChcIi9cIikuZmlsdGVyKGUgPT4gZSkgPz8gW107XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcGF0aC5zcGxpY2UoMCwgMSk7XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5leHBvcnQgY29uc3QgSGVhZGVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBidWlsZFBhdGgoKTtcbiAgICByZXR1cm4gPEZyYWdtZW50PlxuICAgICAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImhlYWRlci1jb250ZW50XCJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgICA8U2lnbkluIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXRvcCBoZWFkZXItdXJsLWNoaXBzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtwYXRoLnJldmVyc2UoKS5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtidWlsZEJhY2soaW5kZXgpfT57ZX08L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkucmV2ZXJzZSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZENvbnRhaW5lcj5cbiAgICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgQ1NTUHJvcGVydGllcywgUHJvcHNXaXRoQ2hpbGRyZW4sIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuL0NvbW1lbnRcIjtcbmltcG9ydCB7IEhlYWRlciB9IGZyb20gXCIuL0hlYWRlclwiO1xuXG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW48e1xuICAgIHRpdGxlPzogUmVhY3ROb2RlLFxuICAgIHRoZW1lPzoge1xuICAgICAgICBcIi0tcHJpbWFyeVwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYmFja2dyb3VuZC1jb2xvclwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYm9yZGVyLWNvbG9yXCI/OiBzdHJpbmcsXG4gICAgfVxufT47XG5jb25zdCB0aW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuZXhwb3J0IGNvbnN0IFBhZ2UgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSBwcm9wcy50aGVtZSA/PyB7fTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9e1wiaHR0cHM6Ly9hbnVkLnJvL3VpX2Jhc2Uvc3JjL21haW4uY3NzXCJ9IHR5cGU9XCJ0ZXh0L2Nzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1NYXRlcmlhbCtTeW1ib2xzK091dGxpbmVkOm9wc3osd2dodCxGSUxMLEdSQURANDgsMzAwLDAsLTI1XCIgLz5cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuXG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9hcGkuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9nc2kvY2xpZW50XCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2l6aXRvYXN0Lm1hcmNlbG9kb2x6YS5jb20vanMvaXppVG9hc3QubWluLmpzP3Y9MTQwYlwiIC8+XG5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9peml0b2FzdC5tYXJjZWxvZG9semEuY29tL2Nzcy9pemlUb2FzdC5taW4uY3NzP3Y9MTQwYVwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pOndnaHRANTAwJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuXG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICA8Q29tbWVudD57dGltZX08L0NvbW1lbnQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgXCItLXByaW1hcnlcIjogdGhlbWVbXCItLXByaW1hcnlcIl0gPz8gXCIjMDA3NGNjXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiLS1iYWNrZ3JvdW5kLWNvbG9yXCI6IHRoZW1lW1wiLS1iYWNrZ3JvdW5kLWNvbG9yXCJdID8/IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCItLWJvcmRlci1jb2xvclwiOiB0aGVtZVsnLS1ib3JkZXItY29sb3InXSA/PyBcIiNjNGM0YzRcIixcbiAgICAgICAgICAgICAgICB9IGFzIENTU1Byb3BlcnRpZXN9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlYWRlcj57cHJvcHMudGl0bGV9PC9IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+XG5cbiAgICApXG59IiwgImV4cG9ydCBmdW5jdGlvbiBhcnJheVRvT2JqZWN0PFQ+KGFycjogQXJyYXk8QXJyYXk8c3RyaW5nPj4pOiBBcnJheTxUPiB7XG4gICAgdmFyIGtleXMgPSBhcnJbMF07XG4gICAgcmV0dXJuIGFyci5zbGljZSgxKS5tYXAoZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5LCBpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHJvd1tpXTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9IGFzIFQpO1xuICAgIH0pO1xufSIsICJpbXBvcnQgeyBhcnJheVRvT2JqZWN0IH0gZnJvbSBcIi4uL2FycmF5VG9PYmplY3RzXCI7XG5pbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuL2dhcGlDbGllbnRQcm9taXNlXCI7XG5cbmV4cG9ydCBjb25zdCBsb2FkRnJvbVNoZWV0ID0gKHNvdXJjZTogc3RyaW5nKTpQcm9taXNlPEFycmF5PGFueT4+ID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB2YXIgdXJsID0gYGh0dHBzOi8vc2hlZXRzLmdvb2dsZWFwaXMuY29tL3Y0L3NwcmVhZHNoZWV0cy8ke3NvdXJjZX0vdmFsdWVzL1NoZWV0MWA7XG4gICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgIHZhciBhY2Nlc3NUb2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpLmFjY2Vzc190b2tlbjtcblxuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIGFjY2Vzc1Rva2VuKTtcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgfTtcblxuICAgIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc3ByZWFkc2hlZXQgZGF0YScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRhdGEudmFsdWVzO1xuICAgICAgICAgICAgcmVzb2x2ZShhcnJheVRvT2JqZWN0KHJhbmdlKSk7XG4gICAgICAgIH0pO1xufSkuY2F0Y2goZSA9PiB7XG4gICAgdGhyb3cgZS5yZXN1bHQuZXJyb3I7XG59KSIsICJpbXBvcnQgUmVhY3QsIHtDU1NQcm9wZXJ0aWVzLCBGcmFnbWVudCwgUmVhY3ROb2RlLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtsb2FkRnJvbVNoZWV0fSBmcm9tIFwiLi4vc2VydmljZS9nb29nbGUvbG9hZEZyb21TaGVldFwiXG5pbXBvcnQge25ld0FwaX0gZnJvbSBcIi4uL3NlcnZpY2UvaW1wbC9uZXdBcGlcIlxuaW1wb3J0IHtDYXJkQ29udGFpbmVyfSBmcm9tIFwiLi9Db250YWluZXJcIlxuXG50eXBlIFByb3BzPFQ+ID0ge1xuICB0aXRsZT86IFJlYWN0Tm9kZVxuICBzb3VyY2U6IHN0cmluZyxcbiAgY29sdW1uT3JkZXI/OiBBcnJheTxrZXlvZiBUPixcbiAgY2VsbFZhbHVlcz86IFJlY29yZDxrZXlvZiBULCAocm93OiBUKSA9PiBSZWFjdE5vZGU+XG59XG5cbmV4cG9ydCBjb25zdCBUYWJsZSA9IDxUIGV4dGVuZHMgYW55Pihwcm9wczogUHJvcHM8VD4pID0+IHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGU8QXJyYXk8YW55Pj4oW10pO1xuICBjb25zdCBsb2FkRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEZyb21TaGVldChwcm9wcy5zb3VyY2UpO1xuICAgIGNvbnN0IGNoYW5nZWREYXRhID0gZGF0YS5tYXAoZSA9PiB7XG4gICAgICBPYmplY3QuZW50cmllcyhwcm9wcy5jZWxsVmFsdWVzID8/IHt9KS5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBlW2tleV0gPSB2YWx1ZShlKTtcbiAgICAgIH0pXG4gICAgICByZXR1cm4gZTtcbiAgICB9KVxuICAgIHNldERhdGEoY2hhbmdlZERhdGEpXG4gIH1cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShsb2FkRGF0YSlcbiAgICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgfSwgW3Byb3BzLnNvdXJjZV0pXG5cbiAgY29uc3QgY29sdW1ucyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtblNldCA9IG5ldyBTZXQoKTtcbiAgICBwcm9wcy5jb2x1bW5PcmRlcj8ubWFwKGUgPT4gY29sdW1uU2V0LmFkZChlKSk7XG4gICAgT2JqZWN0LmtleXMoZGF0YT8uWzBdID8/IHt9KS5tYXAoZSA9PiBjb2x1bW5TZXQuYWRkKChlKSkpO1xuICAgIHJldHVybiBbLi4uY29sdW1uU2V0XTtcbiAgfSwgW2RhdGEsIEpTT04uc3RyaW5naWZ5KHByb3BzLmNvbHVtbk9yZGVyKV0pO1xuXG4gIHJldHVybiA8RnJhZ21lbnQ+XG4gICAgPENhcmRDb250YWluZXI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgICB7ZGF0YSBpbnN0YW5jZW9mIEFycmF5ICYmIGRhdGEubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZVwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgIFwiLS1udW1iZXItb2YtY29sdW1uc1wiOiBjb2x1bW5zLmxlbmd0aCxcbiAgICAgICAgICAgICAgXCItLW51bWJlci1vZi1yb3dzXCI6IFwiMjBcIlxuICAgICAgICAgICAgfSBhcyBDU1NQcm9wZXJ0aWVzfT5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMubWFwKChoZWFkZXIsIGpuZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtqbmRleH0+e2hlYWRlcn08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMubWFwKChjb2x1bW4pID0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2NvbHVtbn0+e2VbY29sdW1uXX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyEoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSAmJiA8cHJlIHN0eWxlPXt7d2hpdGVTcGFjZTogXCJicmVhay1zcGFjZXNcIn19PlxuICAgICAgICAgICAgICAgICAgICBGYWlsZWQgdG8gbG9hZCB0YWJsZSB7cHJvcHMuc291cmNlfSBSZWFzb246XG4gICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAge0pTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpfVxuICAgICAgICAgICAgICAgIDwvcHJlPn1cbiAgICAgIDwvZGl2PlxuICAgIDwvQ2FyZENvbnRhaW5lcj5cblxuICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBEaXZpZGVySCA9ICgpID0+IDxkaXYgY2xhc3NOYW1lPVwiZGl2aWRlclwiIC8+IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1BhZ2VcIjtcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9UYWJsZVwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCIuL2NvbXBvbmVudHMvYXRvbXMvTGlua1wiO1xuaW1wb3J0IHsgRGl2aWRlckggfSBmcm9tIFwiLi9jb21wb25lbnRzL0RpdmlkZXJIXCI7XG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgICA8UGFnZSB0aXRsZT1cIkhlbGxvIHdvcmxkXCIgdGhlbWU9e3tcbiAgICAgICAgXCItLXByaW1hcnlcIjogXCIjNzBhM2M3XCJcbiAgICB9fT5cbiAgICAgICAgPExpbmsgaHJlZj17XCJhZGRcIn0+QWRkPC9MaW5rPlxuICAgICAgICA8VGFibGU8YW55PiBzb3VyY2U9XCIxbWNuVkZZUHRUTXQtVVYwWnZhWHM2UjJNZlNmY1Nic01wS2hwNGRGVzZERVwiXG4gICAgICAgICAgICAgICBjb2x1bW5PcmRlcj17W1wiYWN0aXVuaVwiXX1cbiAgICAgICAgICAgICAgIGNlbGxWYWx1ZXM9e3tcbiAgICAgICAgICAgICAgICBcIm51bWVcIjogKCkgPT4gXCJnaWdpXCIsXG4gICAgICAgICAgICAgICAgIFwiYWN0aXVuaVwiOiByb3cgPT4gPExpbmsgaHJlZj17YC9kZWxldGUvJHtyb3cubnVtZX1gfT5NYW1hPC9MaW5rPlxuICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHRpdGxlPXtcbiAgICAgICAgICAgICAgICA8TGluayBocmVmPXtcImFkZFwifT5BZGQ8L0xpbms+XG4gICAgICAgICAgICB9IC8+XG4gICAgICAgIDxEaXZpZGVySCAvPlxuICAgICAgICA8VGFibGUgc291cmNlPVwiMW1jblZGWVB0VE10LVVWMFp2YVhzNlIyTWZTZmNTYnNNcEtocDRkRlc2REVcIiAvPlxuICAgIDwvUGFnZT5cbikiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLGFBQU8sVUFBVSxXQUFXO0FBQUE7QUFBQTs7O0FDQTVCLG9CQUVhO0FBRmI7QUFBQTtBQUFBLHFCQUFrQjtBQUVYLE1BQU0sVUFBVSxDQUFDLEVBQUUsU0FB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OEJBQUFBLFFBQUEsY0FBQyxTQUFJLEtBQUssT0FBTyxXQUFVLFNBRXZCLFFBQVE7QUFBQSxZQUFJLENBQUMsV0FDWCw4QkFBQUEsUUFBQSxjQUFDLFNBQUksS0FBSyxVQUFTLEVBQUUsTUFBTSxDQUFFO0FBQUEsVUFDL0IsQ0FFSjtBQUFBLFFBQ0YsQ0FDRixHQUVILEVBQUUsZ0JBQWdCLFVBQVUsOEJBQUFBLFFBQUEsY0FBQyxTQUFJLE9BQU8sRUFBQyxZQUFZLGVBQWMsS0FBRyx5QkFDckMsTUFBTSxRQUFPLFlBQ25DLDhCQUFBQSxRQUFBLGNBQUMsVUFBRSxHQUNaLEtBQUssVUFBVSxNQUFNLE1BQU0sQ0FBQyxDQUN2QixDQUNWLENBQ0YsQ0FFRjtBQUFBLE1BQ0Y7QUFBQTtBQUFBOzs7QUN4RUEsTUFBQUMsZUFFYTtBQUZiO0FBQUE7QUFBQSxNQUFBQSxnQkFBa0I7QUFFWCxNQUFNLFdBQVcsTUFBTSw4QkFBQUMsUUFBQSxjQUFDLFNBQUksV0FBVSxXQUFVO0FBQUE7QUFBQTs7O0FDRnZEO0FBQUE7QUFBQSxVQUFBQyxpQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFPLFVBQ0gsK0JBQUFDLFFBQUEsY0FBQyxRQUFLLE9BQU0sZUFBYyxPQUFPO0FBQUEsUUFDN0IsYUFBYTtBQUFBLE1BQ2pCLEtBQ0ksK0JBQUFBLFFBQUEsY0FBQyxRQUFLLE1BQU0sU0FBTyxLQUFHLEdBQ3RCLCtCQUFBQSxRQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFBVyxRQUFPO0FBQUEsVUFDWixhQUFhLENBQUMsU0FBUztBQUFBLFVBQ3ZCLFlBQVk7QUFBQSxZQUNYLFFBQVEsTUFBTTtBQUFBLFlBQ2IsV0FBVyxTQUFPLCtCQUFBQSxRQUFBLGNBQUMsUUFBSyxNQUFNLFdBQVcsSUFBSSxVQUFRLE1BQUk7QUFBQSxVQUMzRDtBQUFBLFVBQ0gsT0FDSSwrQkFBQUEsUUFBQSxjQUFDLFFBQUssTUFBTSxTQUFPLEtBQUc7QUFBQTtBQUFBLE1BQ3hCLEdBQ04sK0JBQUFBLFFBQUEsY0FBQyxjQUFTLEdBQ1YsK0JBQUFBLFFBQUEsY0FBQyxTQUFNLFFBQU8sZ0RBQStDLENBQ2pFO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgInJlc29sdmUiLCAiZ2FwaSIsICJnYXBpIiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiZ2FwaSIsICJpbXBvcnRfcmVhY3QiLCAiZGF0YSIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0Il0KfQo=
