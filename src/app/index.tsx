import { LangSelect } from 'features/lang-select';
import { Routing } from 'pages';
import { Header } from 'widgets/header';

import { withProviders } from './providers';

const App = () => {
  return (
    <>
      <Header>
        <LangSelect />
      </Header>

      <Routing />
    </>
  );
};

export default withProviders(App);
