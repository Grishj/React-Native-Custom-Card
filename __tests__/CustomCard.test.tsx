import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, TouchableOpacity } from 'react-native';
import { CustomCard, CardHeader, CardBody, CardFooter, Divider, Shimmer } from '../src';

describe('CustomCard', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(
            <CustomCard
                testID="custom-card"
                header={{ title: 'Test Title' }}
            />
        );
        expect(getByTestId('custom-card')).toBeTruthy();
    });

    it('renders header with title and subtitle', () => {
        const { getByText } = render(
            <CustomCard
                header={{
                    title: 'Test Title',
                    subtitle: 'Test Subtitle',
                }}
            />
        );
        expect(getByText('Test Title')).toBeTruthy();
        expect(getByText('Test Subtitle')).toBeTruthy();
    });

    it('renders body content', () => {
        const { getByText } = render(
            <CustomCard
                body={{
                    children: <Text>Body Content</Text>,
                }}
            />
        );
        expect(getByText('Body Content')).toBeTruthy();
    });

    it('renders footer content', () => {
        const { getByText } = render(
            <CustomCard
                footer={{
                    children: <Text>Footer Content</Text>,
                }}
            />
        );
        expect(getByText('Footer Content')).toBeTruthy();
    });

    it('shows shimmer when loading', () => {
        const { queryByText } = render(
            <CustomCard
                isLoading={true}
                header={{ title: 'Hidden Title' }}
            />
        );
        // Title should not be visible when loading
        expect(queryByText('Hidden Title')).toBeNull();
    });

    it('renders with dividers when enabled', () => {
        const { UNSAFE_getAllByType } = render(
            <CustomCard
                header={{ title: 'Title' }}
                body={{ children: <Text>Body</Text> }}
                footer={{ children: <Text>Footer</Text> }}
                showHeaderDivider
                showFooterDivider
            />
        );
        // Check that dividers are present
        const dividers = UNSAFE_getAllByType(Divider as any);
        expect(dividers.length).toBe(2);
    });
});

describe('CardHeader', () => {
    it('renders title', () => {
        const { getByText } = render(
            <CardHeader title="Header Title" />
        );
        expect(getByText('Header Title')).toBeTruthy();
    });

    it('renders leftItem and rightItem', () => {
        const { getByText } = render(
            <CardHeader
                title="Title"
                leftItem={<Text>Left</Text>}
                rightItem={<Text>Right</Text>}
            />
        );
        expect(getByText('Left')).toBeTruthy();
        expect(getByText('Right')).toBeTruthy();
    });
});

describe('CardBody', () => {
    it('renders children', () => {
        const { getByText } = render(
            <CardBody>
                <Text>Body Text</Text>
            </CardBody>
        );
        expect(getByText('Body Text')).toBeTruthy();
    });

    it('renders leftItem and rightItem', () => {
        const { getByText } = render(
            <CardBody
                leftItem={<Text>Left Item</Text>}
                rightItem={<Text>Right Item</Text>}
            >
                <Text>Content</Text>
            </CardBody>
        );
        expect(getByText('Left Item')).toBeTruthy();
        expect(getByText('Right Item')).toBeTruthy();
    });
});

describe('CardFooter', () => {
    it('renders children', () => {
        const { getByText } = render(
            <CardFooter>
                <Text>Footer Text</Text>
            </CardFooter>
        );
        expect(getByText('Footer Text')).toBeTruthy();
    });
});

describe('Divider', () => {
    it('renders without crashing', () => {
        const { toJSON } = render(<Divider />);
        expect(toJSON()).toBeTruthy();
    });
});

describe('Shimmer', () => {
    it('renders without crashing', () => {
        const { toJSON } = render(<Shimmer width={100} height={20} />);
        expect(toJSON()).toBeTruthy();
    });
});
