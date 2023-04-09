import { useMemo } from "react";
import { useDevice } from "use-ua-parser-js";

const useDeviceProperties = () => {
    const device = useDevice();
    
    const isTouch = useMemo(() => {
        return device.type === 'mobile' || device.type === 'tablet';
    }, [device.type]);
    
    return {
        isTouch
    }
}

export default useDeviceProperties;