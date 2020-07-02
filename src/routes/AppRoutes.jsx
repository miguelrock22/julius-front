import React from 'react';
import { Route } from 'react-router-dom'

const AppRoute = ({component: Component, ...props}) => {

    return ( 
        <Route { ...props } render={<Component {...props} />} />
    );
}
 
export default AppRoute;