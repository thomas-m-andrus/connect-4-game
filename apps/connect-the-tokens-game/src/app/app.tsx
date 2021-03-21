import React from 'react';

import styles from './app.module.scss';

import { FourByFourGame } from '@connect-the-tokens-game/wrapper';

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <h1>Connect the Tokens Game!!!</h1>
      </header>
      <main>
        <FourByFourGame></FourByFourGame>
      </main>
    </div>
  );
}

export default App;
