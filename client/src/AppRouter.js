import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';

import main from './pages/main';

const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={main} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;