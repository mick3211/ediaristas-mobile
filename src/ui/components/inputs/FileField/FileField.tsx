import { useTheme } from '@emotion/react';
import { View, Platform } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Button } from '../Button/Button';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { FileFieldFile } from 'data/@types/FileInterface';

interface FileFieldProps {
    onChange: (file: FileFieldFile) => void;
    defaultValue?: string;
}

export const FileField: React.FC<FileFieldProps> = ({
    onChange,
    defaultValue,
}) => {
    const { colors } = useTheme();
    const [filePath, setFilePath] = useState(defaultValue || '');

    const handleFileChange = (image: ImagePicker.ImageInfo) => {
        setFilePath(image.uri);
        onChange({
            name: 'userPicture.png',
            type: 'image/png',
            uri: Platform.OS === 'android' ? image.uri : 'file://' + image.uri,
        });
    };

    const requestPermission = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        return status === 'granted';
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            handleFileChange(result);
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    return (
        <View style={{ alignItems: 'center' }}>
            {filePath ? (
                <Avatar.Image source={{ uri: filePath }} size={120} />
            ) : (
                <Avatar.Text size={120} label="?" />
            )}
            <Button
                mode="contained"
                color={colors.accent}
                style={{ marginTop: 16 }}
                onPress={pickImage}
            >
                Escolher arquivo
            </Button>
        </View>
    );
};
