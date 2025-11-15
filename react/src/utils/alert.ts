export const showErrorMessage = (e?: any) => {
    const errorMsg = getErrorMessage(e);
    console.error(errorMsg);
    return;
};


export const getErrorMessage = (e?: Error | any) => {

    if (!e) {
        return 'Something went wrong. Please try again later.';
    }

    if (e instanceof Error) {
        return e.message
    }
    else if (typeof e === 'string') {
        return e;
    }
    else if (typeof e === 'object' && e !== null && 'message' in e) {
        return (e as { message: string }).message;
    }
    else {
        return 'Something went wrong.';
    };

};

