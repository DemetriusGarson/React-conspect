import { useState } from 'react';
import Button from '../Button/Button';
import type { ModuleOptions, Modules } from '../types/Modules';
import AppModule1 from '../App/Module1/AppModule1';
import AppModule2 from '../App/Module2/AppModule2';

export default function ModuleBar() {
  const modulesDefault: Modules = {
    module1: false,
    module2: false,
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
        text={modules.module1 ? 'Hide Module_1' : 'Show Module_1'}
        variant={modules.module1 ? 'primary' : undefined}
        onClick={() => toggleModules('module1')}
      />
      <Button
        text={modules.module2 ? 'Hide Module_2' : 'Show Module_2'}
        variant={modules.module2 ? 'primary' : undefined}
        onClick={() => toggleModules('module2')}
      />
      {modules.module1 && (
        <AppModule1 modules={modules} visibilityHandler={toggleModules} />
      )}
      {modules.module2 && (
        <AppModule2 modules={modules} visibilityHandler={toggleModules} />
      )}
    </>
  );
}
