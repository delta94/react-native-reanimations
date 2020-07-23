// RootNavigation.js
import React, { createRef } from 'react';

export const navigationRef = createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack(params) {
  navigationRef.current?.goBack(params);
}
