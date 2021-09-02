

import React, { useEffect, useState } from "react";


export function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue)
    function handleChange(e) {
        setValue(e)
    }
    return {
        value,
        onChangeText: handleChange
    }
}




