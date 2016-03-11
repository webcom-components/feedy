# Feedy

[![Build Status](https://travis-ci.org/webcom-components/feedy.svg?branch=master)](https://travis-ci.org/webcom-components/feedy)
[![Dependency Status](https://david-dm.org/webcom-components/feedy.svg)](https://david-dm.org/webcom-components/feedy)
[![devDependency Status](https://david-dm.org/webcom-components/feedy/dev-status.svg)](https://david-dm.org/webcom-components/feedy#info=devDependencies)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)


Feedback widget for your web apps. Made with [Webcom][webcom-link]

## Features

- [x] Send feedback
  - [x] Make screenshot on demand
  - [x] Save useragent
  - [ ] Add custom data
- Authentication
  - [x] Authentication into [Webcom][webcom-link]
  - [ ] Authentication with third-party
  - [ ] Anonymous user (give arbitrary email)
- [ ] Secure namespace
- [ ] Comments on feedbacks
- [x] [Admin website][admin-link]
  - [ ] Deactivate widget if needed

## How to use it

Add this markup into your website

```html
<script src="https://npmcdn.com/feedy/dist/feedy.js"></script>
```

Add this markup at the end of &lt;body&gt;

```html
<script>
feedy({
	// optional, default is 'https://webcom.orange.com/base/feedy'
	namespaceUrl: 'https://webcom.orange.com/base/<YOUR_NAMESPACE>',
	// optional, default is 'general'
	appName: '<YOUR_APP_NAME>' 
});
</script>
```

## How to contribute

Ensure you have [node][node-link] greater than version 4 (Code contains es6 syntax)

### Installation

1. Get repo with `git clone https://github.com/webcom-components/feedy.git`

2. Run `npm install` to install the dependencies

### Development server (with hot reload)

```bash
npm start
```

Go to `http://localhost:8080` and you should see the app running!

### Build for production

```bash
npm run build
```

Output files are copied to `dist` folder

### Serve production files

```bash
npm run serve
```

## License

This project is licensed under the MIT license

[webcom-link]: https://webcom.orange.com/
[admin-link]: https://github.com/webcom-components/feedy-admin
