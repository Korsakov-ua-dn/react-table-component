import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PageLayout } from 'shared/ui/page-layout';

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<PageLayout>Loading...</PageLayout>}>
        {component()}
      </Suspense>
    </BrowserRouter>
  );
