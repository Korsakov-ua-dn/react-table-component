import { LanguageSelect } from 'features/language-change';
import { Routing } from 'pages';
import { Header } from 'widgets/header';

import { withProviders } from './providers';

import './index.scss';

export const App = withProviders(() => {
  return (
    <>
      <Header>
        <LanguageSelect />
      </Header>

      <Routing />
    </>
  );
});
