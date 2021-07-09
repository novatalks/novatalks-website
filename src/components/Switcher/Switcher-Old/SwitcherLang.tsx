import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IPage } from '../../../helpers/interfaces';

import {
  linkResolver,
  hrefResolver,
  localePrismicToPath,
  localePos,
} from '../../../helpers/prismic';
import * as switcherStyle from './StylesLang';

interface Props {
  pageType: IPage;
}

export default function Switcher({ pageType }: Props) {
  const [isChecked, setIsChecked] = useState(
    localePos(pageType.page.currentLang) !== 0
  );

  // one alternative language, could be altered for multiple
  if (
    pageType.page.alternativeLangs === null ||
    pageType.page.alternativeLangs[0] === null
  )
    return <>{}</>;
  const altLang = pageType.page.alternativeLangs[0];

  const router = useRouter();
  const handleHandler = altLang => {
    event.preventDefault();
    setIsChecked(localePos(pageType.page.currentLang) === 0);
    router.push(hrefResolver(pageType), linkResolver(pageType), {
      locale: localePrismicToPath(altLang.lang),
    });
    return (event: React.MouseEvent) => {};
  };

  return (
    <>
      <a
        onClick={() => {
          handleHandler(altLang);
        }}
      >
        <switcherStyle.Switch>
          <switcherStyle.SwitchInput
            onChange={() => {}}
            checked={isChecked}
            type="checkbox"
            id="Switch"
          />
          <switcherStyle.SwitchLabel>
            <switcherStyle.SwitchIndicator />
          </switcherStyle.SwitchLabel>
        </switcherStyle.Switch>
      </a>
    </>
  );
}
