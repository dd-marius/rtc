Warning: React has detected a change in the order of Hooks called by Auth. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
1. useContext                 useContext
2. useContext                 useContext
3. useState                   useRef
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    at Auth (http://localhost:5173/src/features/Auth/Auth.jsx?t=1702317846058:530:33)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=6fcc0d63:3507:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=6fcc0d63:3889:5)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=6fcc0d63:3836:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=6fcc0d63:4546:5)
    at AuthContextProvider (http://localhost:5173/src/features/Auth/AuthContext.jsx:18:39)
    at App
printWarning @ react-dom.development.js:86
error @ react-dom.development.js:60
warnOnHookMismatchInDev @ react-dom.development.js:16220
updateHookTypesDev @ react-dom.development.js:16179
useRef @ react-dom.development.js:17905
useRef @ react.development.js:1630
useForm @ useForm.ts:53
AuthRegister @ Auth.jsx:151
Auth @ Auth.jsx:260
renderWithHooks @ react-dom.development.js:16305
updateFunctionComponent @ react-dom.development.js:19588
beginWork @ react-dom.development.js:21601
beginWork$1 @ react-dom.development.js:27426
performUnitOfWork @ react-dom.development.js:26557
workLoopSync @ react-dom.development.js:26466
renderRootSync @ react-dom.development.js:26434
performSyncWorkOnRoot @ react-dom.development.js:26085
flushSyncCallbacks @ react-dom.development.js:12042
(anonymous) @ react-dom.development.js:25651
Show 17 more frames
Show less
react-dom.development.js:16572 Uncaught Error: Should have a queue. This is likely a bug in React. Please file an issue.
    at updateReducer (react-dom.development.js:16572:11)
    at updateState (react-dom.development.js:17004:10)
    at Object.useState (react-dom.development.js:17915:16)
    at Object.useState (react.development.js:1622:21)
    at useForm (useForm.ts:57:46)
    at AuthRegister (Auth.jsx:151:16)
    at Auth (Auth.jsx:260:23)
    at renderWithHooks (react-dom.development.js:16305:18)
    at updateFunctionComponent (react-dom.development.js:19588:20)
    at beginWork (react-dom.development.js:21601:16)
updateReducer @ react-dom.development.js:16572
updateState @ react-dom.development.js:17004
useState @ react-dom.development.js:17915
useState @ react.development.js:1622
useForm @ useForm.ts:57
AuthRegister @ Auth.jsx:151
Auth @ Auth.jsx:260
renderWithHooks @ react-dom.development.js:16305
updateFunctionComponent @ react-dom.development.js:19588
beginWork @ react-dom.development.js:21601
callCallback2 @ react-dom.development.js:4164
invokeGuardedCallbackDev @ react-dom.development.js:4213
invokeGuardedCallback @ react-dom.development.js:4277
beginWork$1 @ react-dom.development.js:27451
performUnitOfWork @ react-dom.development.js:26557
workLoopSync @ react-dom.development.js:26466
renderRootSync @ react-dom.development.js:26434
performSyncWorkOnRoot @ react-dom.development.js:26085
flushSyncCallbacks @ react-dom.development.js:12042
(anonymous) @ react-dom.development.js:25651
Show 18 more frames
Show less
react-dom.development.js:16572 Uncaught Error: Should have a queue. This is likely a bug in React. Please file an issue.
    at updateReducer (react-dom.development.js:16572:11)
    at updateState (react-dom.development.js:17004:10)
    at Object.useState (react-dom.development.js:17915:16)
    at Object.useState (react.development.js:1622:21)
    at useForm (useForm.ts:57:46)
    at AuthRegister (Auth.jsx:151:16)
    at Auth (Auth.jsx:260:23)
    at renderWithHooks (react-dom.development.js:16305:18)
    at updateFunctionComponent (react-dom.development.js:19588:20)
    at beginWork (react-dom.development.js:21601:16)
updateReducer @ react-dom.development.js:16572
updateState @ react-dom.development.js:17004
useState @ react-dom.development.js:17915
useState @ react.development.js:1622
useForm @ useForm.ts:57
AuthRegister @ Auth.jsx:151
Auth @ Auth.jsx:260
renderWithHooks @ react-dom.development.js:16305
updateFunctionComponent @ react-dom.development.js:19588
beginWork @ react-dom.development.js:21601
callCallback2 @ react-dom.development.js:4164
invokeGuardedCallbackDev @ react-dom.development.js:4213
invokeGuardedCallback @ react-dom.development.js:4277
beginWork$1 @ react-dom.development.js:27451
performUnitOfWork @ react-dom.development.js:26557
workLoopSync @ react-dom.development.js:26466
renderRootSync @ react-dom.development.js:26434
recoverFromConcurrentError @ react-dom.development.js:25850
performSyncWorkOnRoot @ react-dom.development.js:26096
flushSyncCallbacks @ react-dom.development.js:12042
(anonymous) @ react-dom.development.js:25651
Show 19 more frames
Show less
react-dom.development.js:18687 The above error occurred in the <Auth> component:

    at Auth (http://localhost:5173/src/features/Auth/Auth.jsx?t=1702317846058:530:33)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=6fcc0d63:3507:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=6fcc0d63:3889:5)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=6fcc0d63:3836:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=6fcc0d63:4546:5)
    at AuthContextProvider (http://localhost:5173/src/features/Auth/AuthContext.jsx:18:39)
    at App

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ react-dom.development.js:18687
update.callback @ react-dom.development.js:18720
callCallback @ react-dom.development.js:13923
commitUpdateQueue @ react-dom.development.js:13944
commitLayoutEffectOnFiber @ react-dom.development.js:23391
commitLayoutMountEffects_complete @ react-dom.development.js:24688
commitLayoutEffects_begin @ react-dom.development.js:24674
commitLayoutEffects @ react-dom.development.js:24612
commitRootImpl @ react-dom.development.js:26823
commitRoot @ react-dom.development.js:26682
performSyncWorkOnRoot @ react-dom.development.js:26117
flushSyncCallbacks @ react-dom.development.js:12042
(anonymous) @ react-dom.development.js:25651
Show 13 more frames
Show less
react-dom.development.js:16572 Uncaught Error: Should have a queue. This is likely a bug in React. Please file an issue.
    at updateReducer (react-dom.development.js:16572:11)
    at updateState (react-dom.development.js:17004:10)
    at Object.useState (react-dom.development.js:17915:16)
    at Object.useState (react.development.js:1622:21)
    at useForm (useForm.ts:57:46)
    at AuthRegister (Auth.jsx:151:16)
    at Auth (Auth.jsx:260:23)
    at renderWithHooks (react-dom.development.js:16305:18)
    at updateFunctionComponent (react-dom.development.js:19588:20)
    at beginWork (react-dom.development.js:21601:16)
updateReducer @ react-dom.development.js:16572
updateState @ react-dom.development.js:17004
useState @ react-dom.development.js:17915
useState @ react.development.js:1622
useForm @ useForm.ts:57
AuthRegister @ Auth.jsx:151
Auth @ Auth.jsx:260
renderWithHooks @ react-dom.development.js:16305
updateFunctionComponent @ react-dom.development.js:19588
beginWork @ react-dom.development.js:21601
beginWork$1 @ react-dom.development.js:27426
performUnitOfWork @ react-dom.development.js:26557
workLoopSync @ react-dom.development.js:26466
renderRootSync @ react-dom.development.js:26434
recoverFromConcurrentError @ react-dom.development.js:25850
performSyncWorkOnRoot @ react-dom.development.js:26096
flushSyncCallbacks @ react-dom.development.js:12042
(anonymous) @ react-dom.development.js:25651
