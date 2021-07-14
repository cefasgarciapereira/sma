import React, { lazy, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { ResponsiveDrawer } from 'components';

export default function Routes() {

    const Lda = lazy(() => import('pages/Lda'));
    const Wordcloud = lazy(() => import('pages/Wordcloud'));

    return (
        <ResponsiveDrawer>
            <Suspense fallback={<h1>Carregando...</h1>}>
                <Switch>
                    <Route exact path='/' component={Lda} />
                    <Route exact path='/wordcloud' component={Wordcloud} />
                    <Route exact path='/404' component={<h1>Error 404</h1>} />
                    <Redirect to='/404' />
                </Switch>
            </Suspense>
        </ResponsiveDrawer>
    )
}