import { createContext, useMemo, useState } from "react";


const SearchTagContext = createContext<any>(null!);

function SearchTagProvider({children}: any) {
    const [searchTag, setSearchTag] = useState({tag:'',});

    const updateSearchTag = (newPayload: any) => {
        setSearchTag(newPayload);
    };

    const SearchTagValue = useMemo(
        () => ({
            searchTag,
            updateSearchTag,
        }),
        [searchTag,updateSearchTag],
    );

    console.log("Tag is : ", searchTag.tag); 

    return (
        <SearchTagContext.Provider value={SearchTagValue}>
            {children}
        </SearchTagContext.Provider>
    );
}
export { SearchTagContext, SearchTagProvider };
