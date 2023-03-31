import { LangSelect } from 'features/lang-select';
import { Routing } from 'pages';
import { Header } from 'widgets/header';

import { withProviders } from './providers';

import './index.scss';

export const App = withProviders(() => {
  return (
    <>
      <Header>
        <LangSelect />
      </Header>

      <Routing />
    </>
  );
});
