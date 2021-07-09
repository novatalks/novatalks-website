import { DarkMode } from 'use-dark-mode';

import * as switcherStyle from './Styles';

export default function Switcher({ darkMode }: SwitchProps) {
  return (
    <>
      <switcherStyle.Switch>
        <switcherStyle.SwitchInput
          onClick={darkMode.toggle}
          onChange={() => {}}
          checked={!darkMode.value}
          type="checkbox"
          id="Switch"
        />
        <switcherStyle.SwitchLabel for="Switch">
          <switcherStyle.SwitchIndicator />
          <switcherStyle.SwitchDecoration />
        </switcherStyle.SwitchLabel>
      </switcherStyle.Switch>
    </>
  );
}

interface SwitchProps {
  darkMode: DarkMode;
}
