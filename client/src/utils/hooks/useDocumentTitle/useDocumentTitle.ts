import { useEffect } from "react";

type Getter = Document['title'];
type Setter = (newTitle: string) => string;

type DocumentTitleHook = (newTitle?: string) => [Getter, Setter]

const useDocumentTitle: DocumentTitleHook = (newTitle) => {
    const title = document.title;
    const setTitle = (newTitle: string) => document.title = newTitle;
    
    useEffect(() => {
        if (newTitle) {
            setTitle(newTitle);
        }
    }, [])
    
    return [ title, setTitle ]
}

export default useDocumentTitle;