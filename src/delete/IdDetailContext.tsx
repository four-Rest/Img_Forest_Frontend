import { createContext, useMemo, useState } from "react";



const IdDetailContext = createContext<any>(null!);

function IdDetailProvider({children}: any) {
    const [idDetail, setIdDetail] = useState({

        id: 0,

    });


    const updateIdDetail = (newPayload: any) => {

        setIdDetail(newPayload);
    };


    const IdDetailValue = useMemo(

        () => ({
            idDetail,
            updateIdDetail,
        }),
        [idDetail,updateIdDetail],
    );
    console.log("Id is : " , idDetail.id);

    return (
        <IdDetailContext.Provider value = {IdDetailValue}>
            {children}
        </IdDetailContext.Provider>
    );
}

export { IdDetailContext, IdDetailProvider };

