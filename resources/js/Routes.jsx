import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default () => {

	return (
		<Suspense fallback={<></>}>
            <BrowserRouter>
				<Switch>
					<Route path="/" component={lazy(() => import(/* webpackPrefetch: true, webpackChunkName: 'home' */'~/views/pages/Home'))} />
				</Switch>
			</BrowserRouter>
		</Suspense>
	);
};