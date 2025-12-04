# React Native Custom Card

A comprehensive, customizable card component for React Native with shimmer loading, animations, and flexible layouts.

[![Platform - Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)](https://reactnative.dev/)
[![Platform - iOS](https://img.shields.io/badge/iOS-000000?logo=apple&logoColor=white)](https://reactnative.dev/)
[![Expo Compatible](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## ✨ Features

- 📦 **Modular Structure** - Header, Body, Footer with left/right item slots
- ⏳ **Shimmer Loading** - Built-in adaptive loading state with animated shimmer
- 🎬 **Animations** - Fade, scale, and slide transitions
- 🎨 **Gradient Backgrounds** - Support via `expo-linear-gradient` or `react-native-linear-gradient`
- 📖 **Expandable Text** - Built-in "View more/less" toggle for long content
- 📱 **Responsive Sizing** - Adapts to screen size with configurable breakpoints
- 🔀 **Flexible Layouts** - Horizontal and vertical orientations
- ➖ **Configurable Dividers** - Horizontal and vertical orientations
- ✨ **Fully Customizable** - Colors, fonts, spacing, and more
- 📜 **TypeScript** - Full type definitions included
- 📋 **FlatList Ready** - Optimized for list rendering
- 🌐 **Cross-Platform** - Works on Android, iOS, and Expo

## 📦 Installation

```bash
npm install react-native-custom-card
# or
yarn add react-native-custom-card
```

## 🚀 Quick Start

```tsx
import { CustomCard } from 'react-native-custom-card';

const MyCard = () => (
  <CustomCard
    header={{
      title: "Welcome!",
      subtitle: "Getting started is easy"
    }}
    body={{
      children: <Text>Your content here</Text>
    }}
  />
);
```

## 📖 Props Reference

### CustomCard Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `header` | `CardHeaderProps` | - | No | Header configuration |
| `body` | `CardBodyProps` | - | No | Body content configuration |
| `footer` | `CardFooterProps` | - | No | Footer configuration |
| `isLoading` | `boolean` | `false` | No | Show shimmer loading state |
| `animated` | `boolean` | `false` | No | Enable animations |
| `animationType` | `'fade' \| 'scale' \| 'slide' \| 'none'` | `'fade'` | No | Animation type |
| `animationDuration` | `number` | `300` | No | Animation duration (ms) |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | No | Card layout |
| `showHeaderDivider` | `boolean` | `false` | No | Show divider below header |
| `showFooterDivider` | `boolean` | `false` | No | Show divider above footer |
| `dividerProps` | `DividerProps` | - | No | Divider customization |
| `backgroundColor` | `string` | `'#FFFFFF'` | No | Card background color |
| `borderRadius` | `number` | `12` | No | Card border radius |
| `elevation` | `number` | `3` | No | Shadow elevation (Android) |
| `padding` | `number` | `16` | No | Inner padding |
| `margin` | `number` | - | No | Outer margin |
| `onPress` | `() => void` | - | No | Press handler |
| `testID` | `string` | - | No | Test identifier |

### CardHeaderProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | Main title text |
| `subtitle` | `string` | No | Subtitle text |
| `leftItem` | `ReactNode` | No | Left component (avatar, icon) |
| `rightItem` | `ReactNode` | No | Right component (menu, action) |
| `style` | `ViewStyle` | No | Container style |
| `titleStyle` | `TextStyle` | No | Title text style |
| `subtitleStyle` | `TextStyle` | No | Subtitle text style |

### CardBodyProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | No | Body content |
| `leftItem` | `ReactNode` | No | Left component |
| `rightItem` | `ReactNode` | No | Right component |
| `style` | `ViewStyle` | No | Container style |

### CardFooterProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | No | Footer content (buttons, etc.) |
| `leftItem` | `ReactNode` | No | Left component |
| `rightItem` | `ReactNode` | No | Right component |
| `style` | `ViewStyle` | No | Container style |

### DividerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'#E5E7EB'` | Divider color |
| `thickness` | `number` | `1` | Line thickness |
| `marginHorizontal` | `number` | `0` | Horizontal margin |
| `marginVertical` | `number` | `12` | Vertical margin |

## 📚 Examples

### Basic Card

```tsx
import { CustomCard } from 'react-native-custom-card';

<CustomCard
  header={{
    title: "Product Name",
    subtitle: "$29.99"
  }}
  body={{
    children: <Text>Product description goes here.</Text>
  }}
  footer={{
    children: <Button title="Add to Cart" onPress={() => {}} />
  }}
/>
```

### Card with Avatar and Actions

```tsx
import { CustomCard } from 'react-native-custom-card';
import { Image, TouchableOpacity } from 'react-native';

<CustomCard
  header={{
    title: "John Doe",
    subtitle: "Posted 2 hours ago",
    leftItem: (
      <Image
        source={{ uri: 'https://example.com/avatar.jpg' }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
    ),
    rightItem: (
      <TouchableOpacity>
        <Text>⋮</Text>
      </TouchableOpacity>
    )
  }}
  body={{
    children: (
      <Image
        source={{ uri: 'https://example.com/post.jpg' }}
        style={{ width: '100%', height: 200, borderRadius: 8 }}
      />
    )
  }}
  showHeaderDivider
/>
```

### Loading State with Shimmer

```tsx
import { CustomCard } from 'react-native-custom-card';

const [isLoading, setIsLoading] = useState(true);

<CustomCard
  isLoading={isLoading}
  header={{ title: "Title", subtitle: "Subtitle" }}
  body={{ children: <Text>Content</Text> }}
/>
```

### Animated Card

```tsx
<CustomCard
  animated
  animationType="scale"
  animationDuration={400}
  header={{ title: "Animated Card" }}
  body={{ children: <Text>This card scales in!</Text> }}
/>
```

### Horizontal Layout

```tsx
<CustomCard
  orientation="horizontal"
  header={{ title: "Horizontal Card" }}
  body={{
    leftItem: <Image source={...} style={{ width: 80, height: 80 }} />,
    children: <Text>Content beside the image</Text>
  }}
/>
```

### Using with FlatList

```tsx
import { FlatList } from 'react-native';
import { CustomCard } from 'react-native-custom-card';

const data = [
  { id: '1', title: 'Card 1', description: 'Description 1' },
  { id: '2', title: 'Card 2', description: 'Description 2' },
  { id: '3', title: 'Card 3', description: 'Description 3' },
];

<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <CustomCard
      header={{ title: item.title }}
      body={{ children: <Text>{item.description}</Text> }}
      onPress={() => console.log('Pressed:', item.id)}
    />
  )}
/>
```

### Custom Styling

```tsx
<CustomCard
  backgroundColor="#1F2937"
  borderRadius={20}
  elevation={5}
  padding={24}
  header={{
    title: "Dark Card",
    titleStyle: { color: '#FFFFFF' },
    subtitle: "Custom styled",
    subtitleStyle: { color: '#9CA3AF' }
  }}
  body={{
    children: <Text style={{ color: '#E5E7EB' }}>Dark theme content</Text>
  }}
/>
```

### Using Individual Components

```tsx
import { CardHeader, CardBody, CardFooter, Divider } from 'react-native-custom-card';
import { View } from 'react-native';

<View style={{ backgroundColor: '#FFF', borderRadius: 12, padding: 16 }}>
  <CardHeader title="Custom Layout" subtitle="Build your own" />
  <Divider />
  <CardBody>
    <Text>Custom body content</Text>
  </CardBody>
  <Divider />
  <CardFooter>
    <Button title="Action" />
  </CardFooter>
</View>
```

## 🎨 Customizing Default Styles

Access the default styles to extend or override:

```tsx
import { defaultStyles, colors, spacing } from 'react-native-custom-card';

// Use default colors
const myBackgroundColor = colors.background; // '#FFFFFF'
const myTextColor = colors.text; // '#1A1A1A'

// Use default spacing
const myPadding = spacing.lg; // 16
```

## 📱 Platform Compatibility

This package works on **all React Native platforms**:

| Platform | Gradient Library |
|----------|------------------|
| Expo | `expo-linear-gradient` |
| Native Android/iOS | `react-native-linear-gradient` |

---

### Expo Projects

```bash
npx expo install react-native-custom-card expo-linear-gradient
```

```tsx
import { LinearGradient } from 'expo-linear-gradient';
import { CustomCard } from 'react-native-custom-card';

<CustomCard
  gradient={{ enabled: true, from: '#667eea', to: '#764ba2' }}
  GradientComponent={LinearGradient}
  ...
/>
```

---

### Native React Native (Android/iOS without Expo)

```bash
npm install react-native-custom-card react-native-linear-gradient

# iOS only - install pods
cd ios && pod install && cd ..
```

```tsx
import LinearGradient from 'react-native-linear-gradient';
import { CustomCard } from 'react-native-custom-card';

<CustomCard
  header={{ title: 'Gradient Card', titleStyle: { color: '#FFF' } }}
  body={{ children: <Text style={{ color: '#FFF' }}>Beautiful gradient!</Text> }}
  gradient={{
    enabled: true,
    from: '#667eea',
    to: '#764ba2',
    direction: 'diagonal', // 'to-right' | 'to-left' | 'to-top' | 'to-bottom' | 'diagonal'
  }}
  GradientComponent={LinearGradient}
/>
```

> **Note:** The core package has **zero native dependencies** - only gradients require an external library.

## 📏 Responsive Sizing

Enable responsive sizing for cards that adapt to screen size:

```tsx
<CustomCard
  header={{ title: 'Responsive Card' }}
  body={{ children: <Text>Adapts to screen size</Text> }}
  responsiveSize={{
    enabled: true,
    maxWidth: 500,        // Max width in pixels
    tabletBreakpoint: 768 // Screen width considered tablet
  }}
/>
```

## 📖 Expandable Description

CardBody supports expandable descriptions for long content:

```tsx
<CustomCard
  header={{ title: 'Article' }}
  body={{
    description: 'Very long description text that will be truncated...',
    maxDescriptionLength: 100,
    expandText: 'Read more',
    collapseText: 'Show less',
    descriptionPosition: 'bottom', // 'top' | 'bottom'
  }}
/>
```

Or use the standalone `ExpandableText` component:

```tsx
import { ExpandableText } from 'react-native-custom-card';

<ExpandableText
  text="Long text content here..."
  maxLength={100}
  expandText="Show more"
  collapseText="Show less"
  onToggle={(expanded) => console.log('Expanded:', expanded)}
/>
```

## ➖ Divider Component

Use dividers in horizontal or vertical orientation:

```tsx
import { Divider } from 'react-native-custom-card';

// Horizontal (default)
<Divider color="#E5E7EB" thickness={1} marginVertical={12} />

// Vertical (great for separating inline items)
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text>Left</Text>
  <Divider orientation="vertical" length={20} marginHorizontal={16} />
  <Text>Right</Text>
</View>
```

## 🧪 Testing

### Running Unit Tests

```bash
# Install dependencies
npm install

# Run tests
npm test
```

### Testing on Devices

**Expo Go (Quickest)**
```bash
cd your-expo-app
npx expo start
# Scan QR code with Expo Go app on iOS/Android
```

**iOS Simulator**
```bash
npx expo start --ios
```

**Android Emulator**
```bash
npx expo start --android
```

## 🛠️ Development Setup

### Setting Up Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-native-custom-card.git
   cd react-native-custom-card
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the package:
   ```bash
   npm run build
   ```

4. Test with the included test app:
   ```bash
   cd test-app
   npm install
   npx expo start
   ```

### Linking Local Package for Testing

In your test app's `metro.config.js`:

```javascript
const path = require('path');

module.exports = {
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  watchFolders: [
    path.resolve(__dirname, '..'),
  ],
};
```

## ❓ Troubleshooting

### Common Issues

<details>
<summary><strong>Module not found: react-native-custom-card</strong></summary>

Ensure the package is installed and your Metro bundler is restarted:

```bash
npm install react-native-custom-card
npx expo start -c  # Clear cache and restart
```
</details>

<details>
<summary><strong>Gradient not showing</strong></summary>

Make sure you:
1. Install a gradient library: `npx expo install expo-linear-gradient`  or `npm install react-native-linear-gradient`
2. Pass the component to `GradientComponent` prop
3. Set `gradient.enabled: true`

```tsx
import { LinearGradient } from 'expo-linear-gradient';

<CustomCard
  gradient={{ enabled: true, from: '#667eea', to: '#764ba2', direction: 'to-right' }} // 'to-right' | 'to-left' | 'to-top' | 'to-bottom' | 'diagonal' 
  GradientComponent={LinearGradient}  // Don't forget this!
  ...
/>
```
</details>

<details>
<summary><strong>LayoutAnimation not working on Android</strong></summary>

This package automatically enables LayoutAnimation on Android. If you're having issues, ensure you're using React Native 0.60+. For bare React Native projects, you may need to enable it manually:

```tsx
import { UIManager, Platform } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
```
</details>

<details>
<summary><strong>TypeScript errors with GradientComponent</strong></summary>

If you see type errors when passing LinearGradient, ensure you're using the latest version:

```bash
npm update react-native-custom-card
```

The package's `GradientComponentProps` is designed to be compatible with both `expo-linear-gradient` and `react-native-linear-gradient`.
</details>

<details>
<summary><strong>Shimmer animation performance issues</strong></summary>

The shimmer uses `useNativeDriver: true` for optimal performance. If you experience issues:

1. Ensure you're not running in Debug mode (use Release for performance testing)
2. Reduce the number of simultaneous shimmer components if rendering many cards
</details>

### Platform-Specific Notes

| Platform | Notes |
|----------|-------|
| **Android** | Uses `elevation` for shadows. LayoutAnimation auto-enabled. |
| **iOS** | Uses `shadowColor/shadowOffset/shadowOpacity/shadowRadius` for shadows. |
| **Expo** | Fully compatible. Use `expo-linear-gradient` for gradients. |
| **Web** | Basic support via React Native Web (shadows may differ). |

## 📄 License

MIT © Grish Joshi
