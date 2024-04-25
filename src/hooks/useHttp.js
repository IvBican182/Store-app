import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest (url, config) {
    const response = await fetch(url, config);

    const resData = await response.json();

    if(!response.ok) {
        throw new Error(resData.message || "Something went wrong..failed to send rewuest");
    }

    return resData;

}

export default function useHttp (url, config, initialValue) {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function clearData() {
        setData(initialValue);
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true)
            try {
               const resData = await sendHttpRequest(url, {...config,body: data});
               setData(resData);

            }catch(error) {
                setError(error.message || "something went wrong");

            }
            setIsLoading(false);
        }, [url, config]
    )

    useEffect(() => {
        if(config && (config.method === "GET" || !config.method) || !config) {
            sendRequest();
        }
    }, [sendRequest]);

    return {
        data,
        error,
        isLoading,
        sendRequest,
        clearData
    }

}