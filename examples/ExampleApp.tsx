import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Button,
} from 'react-native';
import { CustomCard, CardHeader, CardBody, CardFooter, Divider } from '../src';

/**
 * Example data for FlatList demo
 */
const sampleCards = [
    { id: '1', title: 'Card 1', subtitle: 'First card', content: 'This is the first card content.' },
    { id: '2', title: 'Card 2', subtitle: 'Second card', content: 'This is the second card content.' },
    { id: '3', title: 'Card 3', subtitle: 'Third card', content: 'This is the third card content.' },
];

/**
 * Basic Card Example
 */
const BasicCardExample: React.FC = () => (
    <CustomCard
        header={{
            title: 'Basic Card',
            subtitle: 'Simple example',
        }}
        body={{
            children: <Text>This is a basic card with header and body content.</Text>,
        }}
    />
);

/**
 * Card with Avatar and Actions
 */
const AvatarCardExample: React.FC = () => (
    <CustomCard
        header={{
            title: 'John Doe',
            subtitle: '2 hours ago',
            leftItem: (
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>JD</Text>
                </View>
            ),
            rightItem: (
                <TouchableOpacity>
                    <Text style={styles.menuIcon}>⋮</Text>
                </TouchableOpacity>
            ),
        }}
        body={{
            children: (
                <Text>
                    Just finished building an amazing React Native app! 🚀
                </Text>
            ),
        }}
        footer={{
            children: (
                <View style={styles.footerActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text>👍 Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text>💬 Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text>↗️ Share</Text>
                    </TouchableOpacity>
                </View>
            ),
        }}
        showHeaderDivider
        showFooterDivider
    />
);

/**
 * Loading Card with Shimmer
 */
const LoadingCardExample: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View>
            <CustomCard
                isLoading={isLoading}
                header={{
                    title: 'Loaded Content',
                    subtitle: 'Data fetched successfully',
                }}
                body={{
                    children: <Text>This content appears after loading!</Text>,
                }}
            />
            <Button
                title={isLoading ? 'Simulate Load Complete' : 'Simulate Loading'}
                onPress={() => setIsLoading(!isLoading)}
            />
        </View>
    );
};

/**
 * Animated Card Example
 */
const AnimatedCardExample: React.FC = () => (
    <CustomCard
        animated
        animationType="scale"
        animationDuration={400}
        header={{
            title: 'Animated Card',
            subtitle: 'Scale animation',
        }}
        body={{
            children: <Text>This card animates in with a scale effect!</Text>,
        }}
        backgroundColor="#EEF2FF"
        borderRadius={16}
    />
);

/**
 * Custom Styled Card
 */
const CustomStyledCard: React.FC = () => (
    <CustomCard
        backgroundColor="#1F2937"
        borderRadius={20}
        elevation={8}
        padding={20}
        header={{
            title: 'Dark Theme Card',
            titleStyle: { color: '#FFFFFF', fontSize: 18 },
            subtitle: 'Custom styling example',
            subtitleStyle: { color: '#9CA3AF' },
        }}
        body={{
            children: (
                <Text style={{ color: '#E5E7EB', lineHeight: 22 }}>
                    This card demonstrates dark theme styling with custom colors,
                    border radius, and padding.
                </Text>
            ),
        }}
        footer={{
            children: (
                <TouchableOpacity style={styles.darkButton}>
                    <Text style={{ color: '#FFFFFF' }}>Learn More</Text>
                </TouchableOpacity>
            ),
        }}
    />
);

/**
 * Horizontal Layout Card
 */
const HorizontalCardExample: React.FC = () => (
    <CustomCard
        orientation="horizontal"
        header={{
            title: 'Horizontal Layout',
        }}
        body={{
            leftItem: (
                <View style={styles.thumbnailPlaceholder}>
                    <Text>📷</Text>
                </View>
            ),
            children: (
                <Text>
                    This card uses horizontal orientation for a side-by-side layout.
                </Text>
            ),
        }}
    />
);

/**
 * Pressable Card Example
 */
const PressableCardExample: React.FC = () => (
    <CustomCard
        header={{
            title: 'Pressable Card',
            subtitle: 'Tap me!',
        }}
        body={{
            children: <Text>This card can be pressed to trigger an action.</Text>,
        }}
        onPress={() => console.log('Card pressed!')}
    />
);

/**
 * FlatList Integration Example
 */
const FlatListExample: React.FC = () => (
    <FlatList
        data={sampleCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <CustomCard
                animated
                animationType="fade"
                header={{
                    title: item.title,
                    subtitle: item.subtitle,
                }}
                body={{
                    children: <Text>{item.content}</Text>,
                }}
                onPress={() => console.log(`Pressed: ${item.id}`)}
            />
        )}
        contentContainerStyle={{ padding: 8 }}
    />
);

/**
 * Using Individual Components
 */
const IndividualComponentsExample: React.FC = () => (
    <View style={styles.customCard}>
        <CardHeader
            title="Custom Composition"
            subtitle="Using individual components"
        />
        <Divider color="#E5E7EB" />
        <CardBody>
            <Text>Mix and match components as needed!</Text>
        </CardBody>
        <Divider color="#E5E7EB" />
        <CardFooter
            leftItem={<Text style={styles.timestamp}>Just now</Text>}
            rightItem={
                <TouchableOpacity>
                    <Text style={styles.link}>View Details →</Text>
                </TouchableOpacity>
            }
        />
    </View>
);

/**
 * Main Example App Component
 */
const ExampleApp: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[
                    { key: 'basic', component: <BasicCardExample /> },
                    { key: 'avatar', component: <AvatarCardExample /> },
                    { key: 'loading', component: <LoadingCardExample /> },
                    { key: 'animated', component: <AnimatedCardExample /> },
                    { key: 'custom', component: <CustomStyledCard /> },
                    { key: 'horizontal', component: <HorizontalCardExample /> },
                    { key: 'pressable', component: <PressableCardExample /> },
                    { key: 'individual', component: <IndividualComponentsExample /> },
                ]}
                renderItem={({ item }) => <View style={styles.exampleContainer}>{item.component}</View>}
                keyExtractor={(item) => item.key}
                ListHeaderComponent={
                    <Text style={styles.title}>CustomCard Examples</Text>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        textAlign: 'center',
    },
    exampleContainer: {
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    menuIcon: {
        fontSize: 20,
        padding: 8,
    },
    footerActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        padding: 8,
    },
    darkButton: {
        backgroundColor: '#4F46E5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    thumbnailPlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#E5E7EB',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    timestamp: {
        color: '#6B7280',
        fontSize: 12,
    },
    link: {
        color: '#4F46E5',
        fontWeight: '600',
    },
});

export default ExampleApp;
