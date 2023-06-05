import { useEffect, useRef, useState } from "react";
import useAsyncState from "../useAsyncState/useAsyncState";
import { States } from "../useAsyncState/useAsyncState.types";

interface Methods {
    open: () => CloudinaryUploadWidget;
}

interface State extends States<any> {
    result: any
}
/**
 * Documentation: https://cloudinary.com/documentation/upload_widget_reference
 */
const useCloudinaryWidget = (callback?: (event: CloudinaryEvent) => void): [Methods, State] => {
    const instance = useRef<CloudinaryUploadWidget | null>(null);
    const [ result, setResult ] = useState<any>(null);
    const [ states, { cancelWithError, fulfill }] = useAsyncState();
    
    const open = () => {
        const temp = cloudinary.openUploadWidget(
            { 
                cloudName: 'haegepoortersbe', 
                uploadPreset: "ga_avatar_upload",
                sources: ['local', 'camera'],
                multiple: false,
                folder: 'ga_avatars',
                resourceType: 'image',
                theme: 'minimal',
                showCompletedButton: false,
                singleUploadAutoClose: true,
                maxFiles: 1,
                cropping: true,
                croppingAspectRatio: 1,
                showSkipCropButton: false
            }, 
            (error, result) => {
                console.log('Cloudinary status:');
                console.log(error, result);
                    
                callback?.(result);
                    
                if (!!error) cancelWithError(error);
                else if (!!result) {
                    instance.current = temp;
                    fulfill();
                };
                    
                if (result.event === 'success') setResult(result.info);
                else if (result.event === 'close') temp.destroy();
            });
            
        return temp;
    }
    
    useEffect(() => {
        return () => instance.current?.destroy();
    }, []);
    
    return [{
        open,
    }, { ...states, result }];
}

export default useCloudinaryWidget;