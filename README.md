# Testing Micro Frontend with Module Federation

Follow the steps below to set up and start developing with Module Federation:

**Folder Structure (just for this demo)**
```
This Repo
├── host
│   ├── src
│   │   └── App.tsx
│   └── webpack.config.js
├── remote
│   ├── src
│   │   └── App.tsx
│   └── webpack.config.js
└── README.md
```
*Ideally you want to have different repositories for different applications.*

*(e.g.) `host` is a another repo and `remote` is also another repo*

### Command to Start MF App

```bash
npx create-mf-app
```

1. Create a `host` application
2. Create a `remote` application
3. Create a sample Component (e.g. <strong style="color:lightgreen">Counter</strong>) in `remote` application
4. Add to `expose` the Component to `webpack.config.js` of `remote` application:

<div style=" margin:20px;">
exposes: { <br/>"./<strong style="color:lightgreen">Component Name</strong>" : "./<strong style="color:lightgreen">Component Path</strong>"<br/>}
</div>

```ts
// This is REMOTE application
...
new ModuleFederationPlugin({
  name: "remote", // Remote Module Federation name
  filename: "remoteEntry.js", // Remote Entry File Name
  remotes: {},
  exposes: {
    "./Counter": "./src/Counter.tsx"
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
}),
...
```

5. Add to `remotes` the link / entry url of `remote` component to `webpack.config.js` of `host` application:

<div style="margin:20px;">
remotes: { <br/>"./<strong style="color:lightgreen">Name You Want</strong>" : "./<strong style="color:lightgreen">Remote Module Federation name</strong>@<strong style="color:lightgreen">Remote URL</strong>/<strong style="color:lightgreen">Remote Entry File Name</strong>"<br/>}
</div>

```ts
// This is HOST application
...
new ModuleFederationPlugin({
  name: "host",
  filename: "remoteEntry.js",
  remotes: {
    "remote": "remote@http://localhost:3020/remoteEntry.js"
  },
  exposes: {},
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
}),
...
```
**Make sure to `RESTART` the applications whenever changing the `webpack.config.js`**.

6. You can now import the Component from `remote` app to `host` app with:
```ts
import Counter from 'remote/Counter';
```

<div style="margin:20px;">
import Counter from <strong style="color:lightgreen">Name You Want</strong>/<strong style="color:lightgreen">Component Name</strong>
</div>



```ts
// This is App in HOST
import Counter from 'remote/Counter';

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: host</div>
    <Counter/> 
  </div>
)
```

## For typescript:
Add a type declaration file for your imported component: `remote.d.ts`
```
host
├── src
│   ├── App.tsx
│   └── remote.d.ts
└── webpack.config.js

```
```ts
declare module 'remote/Counter';
```