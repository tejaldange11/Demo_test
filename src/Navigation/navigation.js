

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Pagination from "../Pagination";
import Details from "../Details";
import Filter from "../Filter";
const NaviAppStack = createStackNavigator({

    Pagination:Pagination,
    Details:Details,
    Filter:Filter,
},{
    initialRouteName: "Pagination"


});

export default createAppContainer(NaviAppStack);
