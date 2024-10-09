import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ProfileButton({ label, onPress }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#ffab00',
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonLabel: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
});