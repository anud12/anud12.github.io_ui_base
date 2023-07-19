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
          cells: {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJzcmMvY29tcG9uZW50cy9Db21tZW50LnRzeCIsICJzcmMvY29tcG9uZW50cy9Db250YWluZXIudHN4IiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9jb25maWcudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2xvYWRHb29nbGVEZXBlbmRlbmNpZXMudHMiLCAic3JjL3NlcnZpY2UvZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZS50cyIsICJzcmMvc2VydmljZS9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlLnRzIiwgInNyYy9zZXJ2aWNlL2ltcGwvbmV3QXBpLnRzIiwgInNyYy9jb21wb25lbnRzL2F0b21zL0xpbmsudHN4IiwgInNyYy9jb21wb25lbnRzL2F0b21zL0J1dHRvbi50c3giLCAic3JjL2NvbXBvbmVudHMvYXBpL3NpZ25Jbi50c3giLCAic3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJzcmMvY29tcG9uZW50cy9QYWdlLnRzeCIsICJzcmMvc2VydmljZS9hcnJheVRvT2JqZWN0cy50cyIsICJzcmMvc2VydmljZS9nb29nbGUvbG9hZEZyb21TaGVldC50cyIsICJzcmMvY29tcG9uZW50cy9UYWJsZS50c3giLCAic3JjL2NvbXBvbmVudHMvRGl2aWRlckgudHN4IiwgInNyYy9pbmRleF90YWJsZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5SZWFjdCIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYDwhLS0gJHtjaGlsZHJlbn0gLS0+YCB9fSAvPlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgQ2FyZENvbnRhaW5lciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyIGNhcmQtY29udGFpbmVyICR7cHJvcHMuY2xhc3NOYW1lID8/IFwiXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW4pID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyYH0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufSIsICJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGFwaUtleTogXCJBSXphU3lCdFEyV095SVVuYVNXQWhsM3M1UEFfTFprV3RwV3o1aUFcIixcbiAgICBjbGllbnRJZDogXCI5ODUyODA5MDcwMzEtZmZ2Zm5jOHBpMGFuZTk5bHNvOWRibDFtMmw1b2M5bm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIixcbiAgICBzY29wZTogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBcIixcbiAgICBkaXNjb3ZlcnlEb2NzOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzL2RyaXZlL3YzL3Jlc3QnXSxcbn0iLCAiY29uc3QgbG9hZFNjcmlwdCA9IChzcmM6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIC8vIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgIC8vIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgIC8vIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICAvLyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSlcblxuZXhwb3J0IGNvbnN0IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgPSBQcm9taXNlLmFsbChbXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvYXBpLmpzJyksXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL2dzaS9jbGllbnQnKSxcbl0pIiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IGdhcGlDbGllbnRQcm9taXNlID0gbmV3IFByb21pc2U8YW55Pihhc3luYyByZXNvbHZlID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGdhcGkubG9hZCgnY2xpZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBnYXBpLmNsaWVudC5pbml0KHtcbiAgICAgICAgICAgIGFwaUtleTogY29uZmlnLmFwaUtleSxcbiAgICAgICAgICAgIGRpc2NvdmVyeURvY3M6IGNvbmZpZy5kaXNjb3ZlcnlEb2NzLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiBnYXBpLmNsaWVudC5sb2FkKCdzaGVldHMnLCAndjQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzb2x2ZShnYXBpKTtcbiAgICB9KTtcbn0pIiwgImltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4vZ2FwaUNsaWVudFByb21pc2VcIjtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGlyYXRpb25EYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICBjb25zdCB0b2tlbiA9IGdhcGk/LmF1dGg/LmdldFRva2VuKCk7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcyh1bmRlZmluZWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdG9rZW5pbmZvP2FjY2Vzc190b2tlbj0ke3Rva2VuLmFjY2Vzc190b2tlbn1gKVxuICAgICAgICAudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBnZXRFeHBpcmF0aW9uRGF0ZSBzdGF0dXMgJHtyZXMuc3RhdHVzfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpPy5leHBpcmVzX2luO1xuICAgICAgICB9KTtcbn07IiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IHRva2VuQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGNvbnN0IHRva2VuQ2xpZW50ID0gZ29vZ2xlLmFjY291bnRzLm9hdXRoMi5pbml0VG9rZW5DbGllbnQoe1xuICAgICAgICBjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgc2NvcGU6IGNvbmZpZy5zY29wZSxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXModG9rZW5DbGllbnQpO1xufSkiLCAiaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgZ2FwaUNsaWVudFByb21pc2UgfSBmcm9tIFwiLi4vZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlXCI7XG5pbXBvcnQgeyBnZXRFeHBpcmF0aW9uRGF0ZSB9IGZyb20gXCIuLi9nb29nbGUvZ2V0RXhwaXJhdGlvbkRhdGVcIjtcbmltcG9ydCB7IHRva2VuQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlXCI7XG5mdW5jdGlvbiBhZGRRdWVyeVBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgbmV3VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgbmV3VXJsLmhhc2ggPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIG5ld1VybC5ocmVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld0FwaTogQXBpID0ge1xuICAgIHNlc3Npb25OYW1lOiAoKSA9PiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICdwYXRoJzogJ2h0dHBzOi8vcGVvcGxlLmdvb2dsZWFwaXMuY29tL3YxL3Blb3BsZS9tZT9wZXJzb25GaWVsZHM9bmFtZXMnLFxuICAgICAgICAgICAgJ21ldGhvZCc6ICdHRVQnLFxuICAgICAgICAgICAgJ2NhbGxiYWNrJzogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZT8ubmFtZXM/LlswXT8uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSxcbiAgICBsb2FkRnJvbVVybDogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzRnJvbVVybCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKSk7XG4gICAgICAgIGlmIChjcmVkZW50aWFsc0Zyb21VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gSlNPTi5wYXJzZShjcmVkZW50aWFsc0Zyb21VcmwpO1xuICAgICAgICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7fSk7XG4gICAgICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihjcmVkZW50aWFscyk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIG9uQ2hhbmdlOiAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgZm4gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzPy5kb2N1bWVudD8uYWRkRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiBnbG9iYWxUaGlzPy5kb2N1bWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihudWxsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICB9LFxuICAgIGxvZ2luOiBhc3luYyAoKSA9PiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbkNsaWVudCA9IGF3YWl0IHRva2VuQ2xpZW50UHJvbWlzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGF3YWl0IG5ld0FwaS5sb2FkRnJvbVVybCgpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0RXhwaXJhdGlvbkRhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuXG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5DbGllbnQuY2FsbGJhY2sgPSAoY3JlZGVudGlhbHNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgYWRkUXVlcnlQYXJhbShjcmVkZW50aWFsc1Jlc3BvbnNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW5DbGllbnQucmVxdWVzdEFjY2Vzc1Rva2VuKHsgcHJvbXB0OiAnY29uc2VudCcgfSk7XG4gICAgfSlcbn0iLCAiaW1wb3J0IFJlYWN0LCB7IFByb3BzV2l0aENoaWxkcmVuLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge25ld0FwaX0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaW1wbC9uZXdBcGlcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgaHJlZjogc3RyaW5nLFxufVxuXG5leHBvcnQgY29uc3QgTGluayA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCBbc2VhcmNoUGFyYW1zLCBzZXRTZWFyY2hQYXJhbXNdID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHNldFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3QXBpLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgICAgICAgIGZuKClcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbigpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8YSBjbGFzc05hbWU9XCJsaW5rXCIgaHJlZj17cHJvcHMuaHJlZiArIHNlYXJjaFBhcmFtc30+XG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L2E+XG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG50eXBlIFByb3BzID0gUmVhY3QuRGV0YWlsZWRIVE1MUHJvcHM8UmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+LCBIVE1MQnV0dG9uRWxlbWVudD5cblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cImJ1dHRvblwiPntwcm9wcy5jaGlsZHJlbn08L2J1dHRvbj5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtuZXdBcGl9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2ltcGwvbmV3QXBpXCI7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSBcIi4uL2F0b21zL0J1dHRvblwiO1xuXG5leHBvcnQgY29uc3QgU2lnbkluID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIG5ld0FwaS5sb2dvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXdBcGkubG9naW4oKTtcbiAgICB9LCBbc3RhdGVdKVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIG5ld0FwaS5zZXNzaW9uTmFtZSgpLnRoZW4oc2V0U3RhdGUpO1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShhc3luYyBlID0+IHtcbiAgICAgICAgICAgIHNldFN0YXRlKGF3YWl0IG5ld0FwaS5zZXNzaW9uTmFtZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0FwaS5sb2FkRnJvbVVybCgpO1xuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2NhbGxiYWNrfT5cbiAgICAgICAgICAgIHtzdGF0ZSA/IGBMb2dvdXQgb2YgJHtzdGF0ZX1gIDogXCJMb2dpblwifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICA8Lz5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2FyZENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCIuL2F0b21zL0xpbmtcIjtcbmltcG9ydCB7IERpdmlkZXJIIH0gZnJvbSBcIi4vRGl2aWRlckhcIjtcbmltcG9ydCB7IFNpZ25JbiB9IGZyb20gXCIuL2FwaS9zaWduSW5cIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT47XG5cbmNvbnN0IGJ1aWxkQmFjayA9IGluZGV4ID0+IG5ldyBBcnJheShpbmRleCArIDEpLmZpbGwoXCIuLlwiKS5qb2luKFwiL1wiKVxuY29uc3QgYnVpbGRQYXRoID0gKCkgPT4ge1xuICAgIGNvbnN0IGhyZWYgPSBnbG9iYWxUaGlzPy53aW5kb3c/LmxvY2F0aW9uLmhyZWZcbiAgICBjb25zdCB1cmw6IFVSTCB8IHVuZGVmaW5lZCA9IGhyZWYgPyBuZXcgVVJMKGhyZWYpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBhdGggPSB1cmw/LnBhdGhuYW1lPy5zcGxpdChcIi9cIikuZmlsdGVyKGUgPT4gZSkgPz8gW107XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcGF0aC5zcGxpY2UoMCwgMSk7XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5leHBvcnQgY29uc3QgSGVhZGVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBidWlsZFBhdGgoKTtcbiAgICByZXR1cm4gPEZyYWdtZW50PlxuICAgICAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImhlYWRlci1jb250ZW50XCJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgICA8U2lnbkluIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXRvcCBoZWFkZXItdXJsLWNoaXBzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtwYXRoLnJldmVyc2UoKS5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtidWlsZEJhY2soaW5kZXgpfT57ZX08L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkucmV2ZXJzZSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZENvbnRhaW5lcj5cbiAgICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgQ1NTUHJvcGVydGllcywgUHJvcHNXaXRoQ2hpbGRyZW4sIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuL0NvbW1lbnRcIjtcbmltcG9ydCB7IEhlYWRlciB9IGZyb20gXCIuL0hlYWRlclwiO1xuXG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW48e1xuICAgIHRpdGxlPzogUmVhY3ROb2RlLFxuICAgIHRoZW1lPzoge1xuICAgICAgICBcIi0tcHJpbWFyeVwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYmFja2dyb3VuZC1jb2xvclwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYm9yZGVyLWNvbG9yXCI/OiBzdHJpbmcsXG4gICAgfVxufT47XG5jb25zdCB0aW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuZXhwb3J0IGNvbnN0IFBhZ2UgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSBwcm9wcy50aGVtZSA/PyB7fTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9e1wiaHR0cHM6Ly9hbnVkLnJvL3VpX2Jhc2Uvc3JjL21haW4uY3NzXCJ9IHR5cGU9XCJ0ZXh0L2Nzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1NYXRlcmlhbCtTeW1ib2xzK091dGxpbmVkOm9wc3osd2dodCxGSUxMLEdSQURANDgsMzAwLDAsLTI1XCIgLz5cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuXG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9hcGkuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9nc2kvY2xpZW50XCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2l6aXRvYXN0Lm1hcmNlbG9kb2x6YS5jb20vanMvaXppVG9hc3QubWluLmpzP3Y9MTQwYlwiIC8+XG5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9peml0b2FzdC5tYXJjZWxvZG9semEuY29tL2Nzcy9pemlUb2FzdC5taW4uY3NzP3Y9MTQwYVwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJhamRoYW5pOndnaHRANTAwJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuXG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICA8Q29tbWVudD57dGltZX08L0NvbW1lbnQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgXCItLXByaW1hcnlcIjogdGhlbWVbXCItLXByaW1hcnlcIl0gPz8gXCIjMDA3NGNjXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiLS1iYWNrZ3JvdW5kLWNvbG9yXCI6IHRoZW1lW1wiLS1iYWNrZ3JvdW5kLWNvbG9yXCJdID8/IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCItLWJvcmRlci1jb2xvclwiOiB0aGVtZVsnLS1ib3JkZXItY29sb3InXSA/PyBcIiNjNGM0YzRcIixcbiAgICAgICAgICAgICAgICB9IGFzIENTU1Byb3BlcnRpZXN9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEhlYWRlcj57cHJvcHMudGl0bGV9PC9IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+XG5cbiAgICApXG59IiwgImV4cG9ydCBmdW5jdGlvbiBhcnJheVRvT2JqZWN0PFQ+KGFycjogQXJyYXk8QXJyYXk8c3RyaW5nPj4pOiBBcnJheTxUPiB7XG4gICAgdmFyIGtleXMgPSBhcnJbMF07XG4gICAgcmV0dXJuIGFyci5zbGljZSgxKS5tYXAoZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5LCBpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHJvd1tpXTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9IGFzIFQpO1xuICAgIH0pO1xufSIsICJpbXBvcnQgeyBhcnJheVRvT2JqZWN0IH0gZnJvbSBcIi4uL2FycmF5VG9PYmplY3RzXCI7XG5pbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuL2dhcGlDbGllbnRQcm9taXNlXCI7XG5cbmV4cG9ydCBjb25zdCBsb2FkRnJvbVNoZWV0ID0gKHNvdXJjZTogc3RyaW5nKTpQcm9taXNlPEFycmF5PGFueT4+ID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB2YXIgdXJsID0gYGh0dHBzOi8vc2hlZXRzLmdvb2dsZWFwaXMuY29tL3Y0L3NwcmVhZHNoZWV0cy8ke3NvdXJjZX0vdmFsdWVzL1NoZWV0MWA7XG4gICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgIHZhciBhY2Nlc3NUb2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpLmFjY2Vzc190b2tlbjtcblxuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIGFjY2Vzc1Rva2VuKTtcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgfTtcblxuICAgIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc3ByZWFkc2hlZXQgZGF0YScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRhdGEudmFsdWVzO1xuICAgICAgICAgICAgcmVzb2x2ZShhcnJheVRvT2JqZWN0KHJhbmdlKSk7XG4gICAgICAgIH0pO1xufSkuY2F0Y2goZSA9PiB7XG4gICAgdGhyb3cgZS5yZXN1bHQuZXJyb3I7XG59KSIsICJpbXBvcnQgUmVhY3QsIHtDU1NQcm9wZXJ0aWVzLCBGcmFnbWVudCwgUmVhY3ROb2RlLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtsb2FkRnJvbVNoZWV0fSBmcm9tIFwiLi4vc2VydmljZS9nb29nbGUvbG9hZEZyb21TaGVldFwiXG5pbXBvcnQge25ld0FwaX0gZnJvbSBcIi4uL3NlcnZpY2UvaW1wbC9uZXdBcGlcIlxuaW1wb3J0IHtDYXJkQ29udGFpbmVyfSBmcm9tIFwiLi9Db250YWluZXJcIlxuXG50eXBlIFByb3BzPFQ+ID0ge1xuICB0aXRsZT86IFJlYWN0Tm9kZVxuICBzb3VyY2U6IHN0cmluZyxcbiAgY29sdW1uT3JkZXI/OiBBcnJheTxrZXlvZiBUPixcbiAgY2VsbFZhbHVlcz86IFJlY29yZDxrZXlvZiBULCAocm93OiBUKSA9PiBSZWFjdE5vZGU+XG59XG5cbmV4cG9ydCBjb25zdCBUYWJsZSA9IDxUIGV4dGVuZHMgYW55Pihwcm9wczogUHJvcHM8VD4pID0+IHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGU8QXJyYXk8YW55Pj4oW10pO1xuICBjb25zdCBsb2FkRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEZyb21TaGVldChwcm9wcy5zb3VyY2UpO1xuICAgIGNvbnN0IGNoYW5nZWREYXRhID0gZGF0YS5tYXAoZSA9PiB7XG4gICAgICBPYmplY3QuZW50cmllcyhwcm9wcy5jZWxsVmFsdWVzID8/IHt9KS5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBlW2tleV0gPSB2YWx1ZShlKTtcbiAgICAgIH0pXG4gICAgICByZXR1cm4gZTtcbiAgICB9KVxuICAgIHNldERhdGEoY2hhbmdlZERhdGEpXG4gIH1cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShsb2FkRGF0YSlcbiAgICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgfSwgW3Byb3BzLnNvdXJjZV0pXG5cbiAgY29uc3QgY29sdW1ucyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtblNldCA9IG5ldyBTZXQoKTtcbiAgICBwcm9wcy5jb2x1bW5PcmRlcj8ubWFwKGUgPT4gY29sdW1uU2V0LmFkZChlKSk7XG4gICAgT2JqZWN0LmtleXMoZGF0YT8uWzBdID8/IHt9KS5tYXAoZSA9PiBjb2x1bW5TZXQuYWRkKChlKSkpO1xuICAgIHJldHVybiBbLi4uY29sdW1uU2V0XTtcbiAgfSwgW2RhdGEsIEpTT04uc3RyaW5naWZ5KHByb3BzLmNvbHVtbk9yZGVyKV0pO1xuXG4gIHJldHVybiA8RnJhZ21lbnQ+XG4gICAgPENhcmRDb250YWluZXI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgICB7ZGF0YSBpbnN0YW5jZW9mIEFycmF5ICYmIGRhdGEubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZVwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgIFwiLS1udW1iZXItb2YtY29sdW1uc1wiOiBjb2x1bW5zLmxlbmd0aCxcbiAgICAgICAgICAgICAgXCItLW51bWJlci1vZi1yb3dzXCI6IFwiMjBcIlxuICAgICAgICAgICAgfSBhcyBDU1NQcm9wZXJ0aWVzfT5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMubWFwKChoZWFkZXIsIGpuZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtqbmRleH0+e2hlYWRlcn08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMubWFwKChjb2x1bW4pID0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2NvbHVtbn0+e2VbY29sdW1uXX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyEoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSAmJiA8cHJlIHN0eWxlPXt7d2hpdGVTcGFjZTogXCJicmVhay1zcGFjZXNcIn19PlxuICAgICAgICAgICAgICAgICAgICBGYWlsZWQgdG8gbG9hZCB0YWJsZSB7cHJvcHMuc291cmNlfSBSZWFzb246XG4gICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAge0pTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpfVxuICAgICAgICAgICAgICAgIDwvcHJlPn1cbiAgICAgIDwvZGl2PlxuICAgIDwvQ2FyZENvbnRhaW5lcj5cblxuICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBEaXZpZGVySCA9ICgpID0+IDxkaXYgY2xhc3NOYW1lPVwiZGl2aWRlclwiIC8+IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL1BhZ2VcIjtcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9UYWJsZVwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCIuL2NvbXBvbmVudHMvYXRvbXMvTGlua1wiO1xuaW1wb3J0IHsgRGl2aWRlckggfSBmcm9tIFwiLi9jb21wb25lbnRzL0RpdmlkZXJIXCI7XG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgICA8UGFnZSB0aXRsZT1cIkhlbGxvIHdvcmxkXCIgdGhlbWU9e3tcbiAgICAgICAgXCItLXByaW1hcnlcIjogXCIjNzBhM2M3XCJcbiAgICB9fT5cbiAgICAgICAgPExpbmsgaHJlZj17XCJhZGRcIn0+QWRkPC9MaW5rPlxuICAgICAgICA8VGFibGU8YW55PiBzb3VyY2U9XCIxbWNuVkZZUHRUTXQtVVYwWnZhWHM2UjJNZlNmY1Nic01wS2hwNGRGVzZERVwiXG4gICAgICAgICAgICAgICBjb2x1bW5PcmRlcj17W1wiYWN0aXVuaVwiXX1cbiAgICAgICAgICAgICAgIGNlbGxzPXt7XG4gICAgICAgICAgICAgICAgXCJudW1lXCI6ICgpID0+IFwiZ2lnaVwiLFxuICAgICAgICAgICAgICAgICBcImFjdGl1bmlcIjogcm93ID0+IDxMaW5rIGhyZWY9e2AvZGVsZXRlLyR7cm93Lm51bWV9YH0+TWFtYTwvTGluaz5cbiAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0aXRsZT17XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj17XCJhZGRcIn0+QWRkPC9MaW5rPlxuICAgICAgICAgICAgfSAvPlxuICAgICAgICA8RGl2aWRlckggLz5cbiAgICAgICAgPFRhYmxlIHNvdXJjZT1cIjFtY25WRllQdFRNdC1VVjBadmFYczZSMk1mU2ZjU2JzTXBLaHA0ZEZXNkRFXCIgLz5cbiAgICA8L1BhZ2U+XG4pIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxhQUFPLFVBQVUsV0FBVztBQUFBO0FBQUE7OztBQ0E1QixvQkFFYTtBQUZiO0FBQUE7QUFBQSxxQkFBa0I7QUFFWCxNQUFNLFVBQVUsQ0FBQyxFQUFFLFNBQVMsTUFB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QSxRQUFBLGNBQUMsU0FBSSxLQUFLLE9BQU8sV0FBVSxTQUV2QixRQUFRO0FBQUEsWUFBSSxDQUFDLFdBQ1gsOEJBQUFBLFFBQUEsY0FBQyxTQUFJLEtBQUssVUFBUyxFQUFFLE1BQU0sQ0FBRTtBQUFBLFVBQy9CLENBRUo7QUFBQSxRQUNGLENBQ0YsR0FFSCxFQUFFLGdCQUFnQixVQUFVLDhCQUFBQSxRQUFBLGNBQUMsU0FBSSxPQUFPLEVBQUMsWUFBWSxlQUFjLEtBQUcseUJBQ3JDLE1BQU0sUUFBTyxZQUNuQyw4QkFBQUEsUUFBQSxjQUFDLFVBQUUsR0FDWixLQUFLLFVBQVUsTUFBTSxNQUFNLENBQUMsQ0FDdkIsQ0FDVixDQUNGLENBRUY7QUFBQSxNQUNGO0FBQUE7QUFBQTs7O0FDeEVBLE1BQUFDLGVBRWE7QUFGYjtBQUFBO0FBQUEsTUFBQUEsZ0JBQWtCO0FBRVgsTUFBTSxXQUFXLE1BQU0sOEJBQUFDLFFBQUEsY0FBQyxTQUFJLFdBQVUsV0FBVTtBQUFBO0FBQUE7OztBQ0Z2RDtBQUFBO0FBQUEsVUFBQUMsaUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBTyxVQUNILCtCQUFBQyxRQUFBLGNBQUMsUUFBSyxPQUFNLGVBQWMsT0FBTztBQUFBLFFBQzdCLGFBQWE7QUFBQSxNQUNqQixLQUNJLCtCQUFBQSxRQUFBLGNBQUMsUUFBSyxNQUFNLFNBQU8sS0FBRyxHQUN0QiwrQkFBQUEsUUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQVcsUUFBTztBQUFBLFVBQ1osYUFBYSxDQUFDLFNBQVM7QUFBQSxVQUN2QixPQUFPO0FBQUEsWUFDTixRQUFRLE1BQU07QUFBQSxZQUNiLFdBQVcsU0FBTywrQkFBQUEsUUFBQSxjQUFDLFFBQUssTUFBTSxXQUFXLElBQUksVUFBUSxNQUFJO0FBQUEsVUFDM0Q7QUFBQSxVQUNILE9BQ0ksK0JBQUFBLFFBQUEsY0FBQyxRQUFLLE1BQU0sU0FBTyxLQUFHO0FBQUE7QUFBQSxNQUN4QixHQUNOLCtCQUFBQSxRQUFBLGNBQUMsY0FBUyxHQUNWLCtCQUFBQSxRQUFBLGNBQUMsU0FBTSxRQUFPLGdEQUErQyxDQUNqRTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJyZXNvbHZlIiwgImdhcGkiLCAiZ2FwaSIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImdhcGkiLCAiaW1wb3J0X3JlYWN0IiwgImRhdGEiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCJdCn0K
