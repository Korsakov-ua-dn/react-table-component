import { LangSelect } from 'features/lang-select';
import { Routing } from 'pages';
import { Header } from 'widgets/header';

import { withProviders } from './providers';

import './index.scss';

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
