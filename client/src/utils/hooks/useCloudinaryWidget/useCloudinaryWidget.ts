import { useRef, useState } from "react";
import useAsyncState from "../useAsyncState/useAsyncState";
import useEffectOnce from "../useEffectOnce/useEffectOnce";
import { States } from "../useAsyncState/useAsyncState.types";

const useCloudinaryWidget = (callback?: (event: CloudinaryEvent) => void): [CloudinaryUploadWidget | null, States<any> & { result: any }] => {
    const instance = useRef<CloudinaryUploadWidget | null>(null);
    const [ result, setResult ] = useState<any>(null);
    const [ states, { cancelWithError, fulfill }] = useAsyncState();
    
    useEffectOnce(() => {
        instance.current = cloudinary.createUploadWidget(
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
                else if (!!result) fulfill();
                
                if (result.event === 'success') setResult(result.info);
            });
            
        return () => instance.current?.destroy();
    });
    
    return [instance.current, { ...states, result }];
}

export default useCloudinaryWidget;