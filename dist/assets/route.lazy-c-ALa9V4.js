import{aA as s,a7 as x,u as p,r as v,j as e,h as f,i as m,k as g,l as j,S as u,ao as y,F as r,y as N,a1 as b,ap as k,aq as M,ar as S,as as I,at as w,au as z,av as F,c as P}from"./index-BG0uviZH.js";import{I as C}from"./IconPhone-DlUs4gXm.js";/**
 * @license @tabler/icons-react v3.31.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var R=s("outline","briefcase","IconBriefcase",[["path",{d:"M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2",key:"svg-1"}],["path",{d:"M12 12l0 .01",key:"svg-2"}],["path",{d:"M3 13a20 20 0 0 0 18 0",key:"svg-3"}]]);/**
 * @license @tabler/icons-react v3.31.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var V=s("outline","file","IconFile",[["path",{d:"M14 3v4a1 1 0 0 0 1 1h4",key:"svg-0"}],["path",{d:"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z",key:"svg-1"}]]);/**
 * @license @tabler/icons-react v3.31.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var A=s("outline","map","IconMap",[["path",{d:"M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13",key:"svg-0"}],["path",{d:"M9 4v13",key:"svg-1"}],["path",{d:"M15 7v13",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.31.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var L=s("outline","user","IconUser",[["path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",key:"svg-0"}],["path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",key:"svg-1"}]]);function T({className:n,items:l,...c}){const{pathname:t}=x(),o=p(),[i,d]=v.useState(t??"/settings"),h=a=>{d(a),o({to:a})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"p-1 md:hidden",children:e.jsxs(f,{value:i,onValueChange:h,children:[e.jsx(m,{className:"h-12 sm:w-48",children:e.jsx(g,{placeholder:"Theme"})}),e.jsx(j,{children:l.map(a=>e.jsx(u,{value:a.href,children:e.jsxs("div",{className:"flex gap-x-4 px-2 py-1",children:[e.jsx("span",{className:"scale-125",children:a.icon}),e.jsx("span",{className:"text-md",children:a.title})]})},a.href))})]})}),e.jsx(y,{orientation:"horizontal",type:"always",className:"hidden w-full min-w-40 bg-background px-1 py-2 md:block",children:e.jsx("nav",{className:r("flex space-x-2 py-1 lg:flex-col lg:space-x-0 lg:space-y-1",n),...c,children:l.map(a=>e.jsxs(N,{to:a.href,className:r(b({variant:"ghost"}),t===a.href?"bg-muted hover:bg-muted":"hover:bg-transparent hover:underline","justify-start"),children:[e.jsx("span",{className:"mr-2",children:a.icon}),a.title]},a.href))})})]})}function B(){return e.jsxs(e.Fragment,{children:[e.jsxs(k,{children:[e.jsx(M,{}),e.jsxs("div",{className:"ml-auto flex items-center space-x-4",children:[e.jsx(S,{}),e.jsx(I,{})]})]}),e.jsxs(w,{fixed:!0,children:[e.jsxs("div",{className:"space-y-0.5",children:[e.jsx("h1",{className:"text-2xl font-bold tracking-tight md:text-3xl",children:"Profile"}),e.jsx("p",{className:"text-muted-foreground",children:"Manage your account settings and set e-mail preferences."})]}),e.jsx(z,{className:"my-4 lg:my-6"}),e.jsxs("div",{className:"flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0",children:[e.jsx("aside",{className:"top-0 lg:sticky lg:w-1/5",children:e.jsx(T,{items:D})}),e.jsx("div",{className:"flex w-full overflow-y-hidden p-1 pr-4",children:e.jsx(F,{})})]})]})]})}const D=[{title:"Personal",icon:e.jsx(L,{size:18}),href:"/dashboard/profile"},{title:"Contact",icon:e.jsx(C,{size:18}),href:"/dashboard/profile/contact"},{title:"Address",icon:e.jsx(A,{size:18}),href:"/dashboard/profile/address"},{title:"Documents",icon:e.jsx(V,{size:18}),href:"/dashboard/profile/document"},{title:"Professional",icon:e.jsx(R,{size:18}),href:"/dashboard/profile/professional"}],q=P("/dashboard/profile")({component:B});export{q as Route};
