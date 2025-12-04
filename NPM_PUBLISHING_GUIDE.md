# NPM Publishing Guide

A step-by-step guide to publish your `react-native-custom-card` package to NPM.

## Prerequisites

1. **Node.js** installed (v14 or higher)
2. **NPM account** - [Create one here](https://www.npmjs.com/signup)

## Step 1: Prepare Your Package

### 1.1 Update package.json

Make sure your `package.json` has these required fields:

```json
{
  "name": "react-native-custom-card",
  "version": "1.0.0",
  "description": "A customizable card component for React Native",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "author": "Grish Joshi <joshigrish068@gmail.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/grishj/react-native-custom-card"
  }
}
```

### 1.2 Check Package Name Availability

```bash
npm search react-native-custom-card
```

If the name is taken, choose a unique name or use a scoped package:
```json
{
  "name": "@grish/react-native-custom-card"
}
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Build the Package

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### Verify the build:
- Check that `dist/` folder exists
- Contains `.js` files and `.d.ts` type definitions

## Step 4: Test Locally (Optional but Recommended)

### 4.1 Link the package locally

```bash
npm link
```

### 4.2 In a test React Native project

```bash
npm link react-native-custom-card
```

### 4.3 Test the import

```tsx
import { CustomCard } from 'react-native-custom-card';
```

## Step 5: Run Tests

```bash
npm test
```

Ensure all tests pass before publishing.

## Step 6: Login to NPM

```bash
npm login
```

Enter your NPM username, password, and email.

### Verify login:
```bash
npm whoami
```

## Step 7: Publish the Package

### First-time publish:
```bash
npm publish
```

### For scoped packages (public):
```bash
npm publish --access public
```

## Step 8: Verify Publication

1. Visit `https://www.npmjs.com/package/react-native-custom-card`
2. Try installing in a new project:
   ```bash
   npm install react-native-custom-card
   ```

---

## Version Management

### Semantic Versioning (SemVer)

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

### Updating Version

```bash
# Patch update (bug fixes)
npm version patch

# Minor update (new features)
npm version minor

# Major update (breaking changes)
npm version major
```

### Publish Update

```bash
npm run build
npm publish
```

---

## Common Issues

### "Package name already exists"
- Use a scoped name: `@yourusername/package-name`
- Or choose a different unique name

### "You must be logged in"
```bash
npm login
```

### "Cannot publish over existing version"
- Bump the version number first
- `npm version patch` then `npm publish`

### Build errors
```bash
npm run clean
npm install
npm run build
```

---

## Best Practices

1. **Always test before publishing**
2. **Keep README updated** with examples
3. **Use `.npmignore`** to exclude unnecessary files
4. **Add `prepublishOnly` script** to auto-build
5. **Tag releases** on GitHub matching NPM versions

---

## Files Included in Package

The `files` field in package.json determines what's published:

```json
{
  "files": [
    "dist",
    "README.md"
  ]
}
```

This keeps the package size small by only including:
- Compiled JavaScript (`dist/`)
- Documentation (`README.md`)

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript |
| `npm run clean` | Remove dist folder |
| `npm test` | Run tests |
| `npm login` | Login to NPM |
| `npm publish` | Publish package |
| `npm version patch` | Bump patch version |
| `npm version minor` | Bump minor version |
| `npm version major` | Bump major version |
