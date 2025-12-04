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
| `showLeftDivider` | `boolean` | No | Show vertical divider after leftItem |
| `leftDividerProps` | `DividerProps` | No | Customize the left divider |
| `rightItem` | `ReactNode` | No | Right component (menu, action) |
| `style` | `ViewStyle` | No | Container style |
| `titleStyle` | `TextStyle` | No | Title text style |
| `subtitleStyle` | `TextStyle` | No | Subtitle text style |

### CardBodyProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | No | Body content |
| `description` | `string \| DescriptionConfig` | No | Description text or config object |
| `maxDescriptionLength` | `number` | No | Max chars before "View more" (default: 150) |
| `expandText` | `string` | No | Custom expand text (default: "View more") |
| `collapseText` | `string` | No | Custom collapse text (default: "View less") |
| `descriptionPosition` | `'top' \| 'bottom'` | No | Position relative to children |
| `leftItem` | `ReactNode` | No | Left component |
| `rightItem` | `ReactNode` | No | Right component |
| `borderRadius` | `number` | No | Border radius for body container |
| `backgroundColor` | `string` | No | Background color for body |
| `overlayItems` | `OverlayItemConfig[]` | No | Items to overlay on content |
| `overlayOnChildrenOnly` | `boolean` | No | If true, overlays position relative to children only (e.g., image), not entire body |
| `style` | `ViewStyle` | No | Container style |

### DescriptionConfig (Object format)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | **Yes** | Description text |
| `maxLength` | `number` | No | Max chars before truncation |
| `expandText` | `string` | No | Custom expand button text |
| `collapseText` | `string` | No | Custom collapse button text |

### OverlayItemConfig

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | `ReactNode` | **Yes** | Content to overlay (icon, badge) |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'center'` | No | Position (default: 'top-right') |
| `offsetX` | `number` | No | Horizontal offset from edge |
| `offsetY` | `number` | No | Vertical offset from edge |
| `style` | `ViewStyle` | No | Custom container style |

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
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider direction |
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

### Header with Divider

```tsx
// Show a vertical divider between avatar and title
<CustomCard
  header={{
    leftItem: <Avatar source={...} />,
    showLeftDivider: true,  // 👈 Enable divider
    leftDividerProps: { color: '#3B82F6', thickness: 2 },  // Optional customization
    title: "User Profile",
    subtitle: "Online"
  }}
/>
```

### Description as Object

```tsx
// Use object format for full control over expandable text
<CustomCard
  body={{
    description: {
      text: "This is a very long product description that explains all the amazing features...",
      maxLength: 100,
      expandText: "Read more →",
      collapseText: "← Show less"
    },
    children: <Image source={...} />
  }}
/>
```

### Body Styling

```tsx
// Add borderRadius and backgroundColor to body
<CustomCard
  body={{
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    children: <Text>Styled body content</Text>
  }}
/>
```

### Overlay Items (Badges, Icons)

Overlay items work in both **vertical** and **horizontal** orientations. Use them to add badges, icons, or any content on top of your card body.

#### Vertical Card with Overlays

```tsx
import { Ionicons } from '@expo/vector-icons';

// Overlay favorite icon and discount badge on product image (vertical layout)
<CustomCard
  header={{ title: "Product", subtitle: "$29.99" }}
  body={{
    children: (
      <Image
        source={{ uri: 'https://picsum.photos/300/200' }}
        style={{ width: '100%', height: 200 }}
      />
    ),
    overlayItems: [
      {
        content: (
          <TouchableOpacity onPress={() => console.log('Favorite!')}>
            <Ionicons name="heart" size={24} color="#EF4444" />
          </TouchableOpacity>
        ),
        position: 'top-right',
        offsetX: -8,
        offsetY: 8
      },
      {
        content: (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-20%</Text>
          </View>
        ),
        position: 'top-left',
        offsetX: 8,
        offsetY: 8
      }
    ]
  }}
/>
```

#### Horizontal Card with Overlays

```tsx
// Overlay items on horizontal layout - great for list items with status badges
<CustomCard
  orientation="horizontal"
  body={{
    leftItem: (
      <Image
        source={{ uri: 'https://picsum.photos/100/100' }}
        style={{ width: 80, height: 80, borderRadius: 8 }}
      />
    ),
    children: (
      <View>
        <Text style={{ fontWeight: 'bold' }}>Product Name</Text>
        <Text style={{ color: '#6B7280' }}>Description here</Text>
      </View>
    ),
    overlayItems: [
      {
        content: (
          <View style={{ backgroundColor: '#10B981', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
            <Text style={{ color: '#FFF', fontSize: 10 }}>NEW</Text>
          </View>
        ),
        position: 'top-left',
        offsetX: 4,
        offsetY: 4
      },
      {
        content: <Ionicons name="heart-outline" size={20} color="#9CA3AF" />,
        position: 'top-right',
        offsetX: -4,
        offsetY: 4
      }
    ]
  }}
  onPress={() => console.log('Card pressed')}
/>
```

### Overlay on Image Only

When you have both a description and an image, use `overlayOnChildrenOnly` to position overlays relative to the image only:

```tsx
// Without overlayOnChildrenOnly: overlays position relative to entire body (image + description)
// With overlayOnChildrenOnly: overlays stay within the image bounds
<CustomCard
  body={{
    children: (
      <Image
        source={{ uri: 'https://picsum.photos/300/200' }}
        style={{ width: '100%', height: 200 }}
      />
    ),
    overlayItems: [
      {
        content: <TouchableOpacity onPress={() => console.log('Heart pressed!')}>
        <Ionicons name="heart" size={24} color="#EF4444" />
      </TouchableOpacity>
        position: 'top-right',
        offsetX: -8,
        offsetY: 8
      },
      {
        content: (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-20%</Text>
          </View>
        ),
        position: 'bottom-left',
        offsetX: 8,
        offsetY: -8
      }
    ],
    overlayOnChildrenOnly: true,  // 👈 Key prop!
    description: "Product description that appears below the image",
    descriptionPosition: 'bottom'
  }}
/>
```

### Loading State with Shimmer

The shimmer loading state works in both **vertical** and **horizontal** orientations. It automatically adapts to your card structure.

#### Vertical Card with Shimmer

```tsx
import { CustomCard } from 'react-native-custom-card';

const [isLoading, setIsLoading] = useState(true);

// Basic shimmer
<CustomCard
  isLoading={isLoading}
  header={{ title: "Title", subtitle: "Subtitle" }}
  body={{ children: <Text>Content</Text> }}
/>

// Shimmer with avatar and content type
<CustomCard
  isLoading={isLoading}
  header={{
    title: "John Doe",
    subtitle: "2 minutes ago",
    leftItem: <Avatar source={...} />,
    rightItem: <MenuIcon />
  }}
  body={{
    children: <Image source={...} style={{ width: '100%', height: 200 }} />,
    contentType: 'image',  // 'text' | 'image' | 'mixed'
    description: "Post caption here"
  }}
  footer={{
    children: <ActionButtons />
  }}
/>
```

#### Horizontal Card with Shimmer

```tsx
// Shimmer adapts to horizontal layout automatically
<CustomCard
  orientation="horizontal"
  isLoading={isLoading}
  body={{
    leftItem: (
      <Image source={...} style={{ width: 80, height: 80, borderRadius: 8 }} />
    ),
    children: (
      <View>
        <Text style={{ fontWeight: 'bold' }}>Product Name</Text>
        <Text>Description text</Text>
        <Text>$29.99</Text>
      </View>
    ),
    contentType: 'mixed'
  }}
/>
```

#### Content Type Options

The `contentType` prop controls how the shimmer appears for body content:

| contentType | Shimmer Appearance |
|-------------|-------------------|
| `text` (default) | Multiple text line placeholders |
| `image` | Large rectangular image placeholder |
| `mixed` | Image placeholder + text lines below |

#### Standalone Shimmer Component

Use the `Shimmer` component directly for custom loading states:

```tsx
import { Shimmer } from 'react-native-custom-card';

// Different shapes
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Shimmer width={50} height={50} contentShape="circle" />
  <Shimmer width={100} height={20} contentShape="rounded" />
  <Shimmer width={80} height={30} contentShape="rectangle" />
</View>

// Custom styling
<Shimmer 
  width="100%" 
  height={200} 
  borderRadius={12}
  backgroundColor="#E5E7EB"
  highlightColor="#F3F4F6"
  duration={1200}
/>
```

| Shape | Description |
|-------|-------------|
| `circle` | Circular shimmer (avatars, icons) |
| `rounded` | Rounded rectangle (buttons, tags) |
| `rectangle` | Sharp corners (images, containers) |

### Animated Card

Animations work in both **vertical** and **horizontal** orientations. Available types: `fade`, `scale`, `slide`.

#### Vertical Card with Animation

```tsx
// Fade animation (default)
<CustomCard
  animated
  animationType="fade"
  header={{ title: "Fade In Card" }}
  body={{ children: <Text>This card fades in!</Text> }}
/>

// Scale animation
<CustomCard
  animated
  animationType="scale"
  animationDuration={400}
  header={{ title: "Scale Card" }}
  body={{ children: <Text>This card scales in!</Text> }}
/>
```

#### Horizontal Card with Animation

```tsx
// Slide animation on horizontal layout - perfect for list items
<CustomCard
  orientation="horizontal"
  animated
  animationType="slide"
  animationDuration={300}
  body={{
    leftItem: (
      <Image 
        source={{ uri: 'https://example.com/avatar.jpg' }} 
        style={{ width: 60, height: 60, borderRadius: 30 }} 
      />
    ),
    children: (
      <View>
        <Text style={{ fontWeight: 'bold' }}>Notification</Text>
        <Text>You have a new message</Text>
      </View>
    )
  }}
  onPress={() => console.log('Notification pressed')}
/>
```

| Animation Type | Effect |
|----------------|--------|
| `fade` | Opacity from 0 to 1 |
| `scale` | Scales from small to full size |
| `slide` | Slides in from the side |

### Card Orientation

Cards support two orientations: **vertical** (default) and **horizontal**. 

#### Vertical Layout (Default)

The default vertical layout stacks header, body, and footer from top to bottom:

```tsx
// orientation="vertical" is the default, no need to specify
<CustomCard
  header={{ 
    title: "Vertical Card",
    subtitle: "Default layout"
  }}
  body={{
    children: (
      <Image 
        source={{ uri: 'https://example.com/image.jpg' }} 
        style={{ width: '100%', height: 200 }} 
      />
    ),
    description: "Content stacks vertically below the header"
  }}
  footer={{
    children: <Button title="Action" onPress={() => {}} />
  }}
/>
```

#### Horizontal Layout

Use `orientation="horizontal"` for side-by-side layouts, ideal for list items, product cards, or media rows:

```tsx
<CustomCard
  orientation="horizontal"
  header={{ title: "Horizontal Card" }}
  body={{
    leftItem: (
      <Image 
        source={{ uri: 'https://example.com/thumbnail.jpg' }} 
        style={{ width: 80, height: 80, borderRadius: 8 }} 
      />
    ),
    children: (
      <View>
        <Text style={{ fontWeight: 'bold' }}>Product Name</Text>
        <Text>Content appears beside the image</Text>
        <Text style={{ color: '#10B981' }}>$29.99</Text>
      </View>
    )
  }}
  onPress={() => console.log('Card pressed')}
/>
```

| Orientation | Use Case |
|-------------|----------|
| `vertical` (default) | Blog posts, product details, social media cards, full-width content |
| `horizontal` | List items, compact product rows, media lists, notifications |

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

---

### Gradient with Orientation

Gradients work beautifully with both **vertical** and **horizontal** card orientations.

#### Vertical Card with Gradient

```tsx
import { LinearGradient } from 'expo-linear-gradient';

<CustomCard
  header={{ 
    title: 'Premium Feature',
    subtitle: 'Unlock now',
    titleStyle: { color: '#FFF' },
    subtitleStyle: { color: 'rgba(255,255,255,0.8)' }
  }}
  body={{
    children: <Text style={{ color: '#FFF' }}>Stunning vertical gradient card!</Text>
  }}
  gradient={{
    enabled: true,
    from: '#667eea',
    to: '#764ba2',
    direction: 'diagonal'
  }}
  GradientComponent={LinearGradient}
/>
```

#### Horizontal Card with Gradient

```tsx
// Gradient on horizontal layout - perfect for featured list items
<CustomCard
  orientation="horizontal"
  header={{ title: 'Featured', titleStyle: { color: '#FFF' } }}
  body={{
    leftItem: (
      <View style={{ width: 50, height: 50, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24 }}>⭐</Text>
      </View>
    ),
    children: (
      <View>
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Premium Item</Text>
        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Special gradient highlight</Text>
      </View>
    )
  }}
  gradient={{
    enabled: true,
    from: '#f093fb',
    to: '#f5576c',
    direction: 'to-right'
  }}
  GradientComponent={LinearGradient}
  onPress={() => console.log('Featured item pressed')}
/>
```

| Direction | Effect |
|-----------|--------|
| `to-right` | Left to right gradient |
| `to-left` | Right to left gradient |
| `to-top` | Bottom to top gradient |
| `to-bottom` | Top to bottom gradient |
| `diagonal` | Corner to corner gradient |

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
