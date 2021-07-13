import React, { lazy, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

export default function Routes(){

    const Home = lazy(() => import('../pages/Home'));

    return(
        <Suspense fallback={<h1>Carregando...</h1>}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/404' component={<h1>Error 404</h1>} />
                <Redirect to='/404'/>
            </Switch>
        </Suspense>
    )
}