import { useState } from 'react';
import Button from '../Button/Button';
import type { ModuleOptions, Modules } from '../types/Modules';

import AppModule2 from '../App/Module2/AppModule2';
import AppModule3 from '../App/Module3/AppModule3';
import AppModule4 from '../App/Module4/AppModule4';

export default function ModuleBar() {
  const modulesDefault: Modules = {
    module2: false,
    module3: false,
    module4: false,
  };
  const [modules, setModules] = useState<Modules>(modulesDefault);

  const toggleModules = (module: ModuleOptions) => {
    setModules({
      ...modules,
      [module]: !modules[module],
    });
  };

  return (
    <>
      <Button
        text={modules.module2 ? 'Hide Module_2' : 'Show Module_2'}
        variant={modules.module2 ? 'primary' : undefined}
        onClick={() => toggleModules('module2')}
      />
      <Button
        text={modules.module3 ? 'Hide Module_3' : 'Show Module_3'}
        variant={modules.module3 ? 'primary' : undefined}
        onClick={() => toggleModules('module3')}
      />
      <Button
        text={modules.module4 ? 'Hide Module_4' : 'Show Module_4'}
        variant={modules.module4 ? 'primary' : undefined}
        onClick={() => toggleModules('module4')}
      />
      {modules.module2 && (
        <AppModule2 modules={modules} visibilityHandler={toggleModules} />
      )}
      {modules.module3 && (
        <AppModule3 modules={modules} visibilityHandler={toggleModules} />
      )}
      {modules.module4 && (
        <AppModule4 modules={modules} visibilityHandler={toggleModules} />
      )}
    </>
  );
}
