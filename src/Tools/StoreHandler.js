


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'


export function getStoreValue(initialValue) {
    const StoreValue = useSelector((state) => state[initialValue]);
    console.log(StoreValue)
    return StoreValue
}

