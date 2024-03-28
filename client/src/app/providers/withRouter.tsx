import { Spin } from 'antd';
import { ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Spin delay={300} className="overlay" size="large" />}>
        {component()}
      </Suspense>
    </BrowserRouter>
  );
