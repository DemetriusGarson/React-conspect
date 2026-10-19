import css from './ModuleBar.module.css';

import { useState } from 'react';
import Button from '../Button/Button';
import type { Modules } from '../types/Modules';

// import AppModule2 from '../App/Module2/AppModule2';
// import AppModule3 from '../App/Module3/AppModule3';
// import AppModule4 from '../App/Module4/AppModule4';
// import AppModule5 from '../App/Module5/AppModule5';

import module2 from '../App/Module2/AppModule2';
import module3 from '../App/Module3/AppModule3';
import module4 from '../App/Module4/AppModule4';
import module5 from '../App/Module5/AppModule5';

export default function ModuleBar() {
  // const modulesDefault: Modules = {
  //   module2: false,
  //   module3: false,
  //   module4: false,
  //   module5: false,
  // };

  const moduleComponents = {
    module2,
    module3,
    module4,
    module5,
  };

  const moduleNames = Object.keys(
    moduleComponents,
  ) as (keyof typeof moduleComponents)[];

  const initialModules = Object.fromEntries(
    moduleNames.map((name) => [name, false]),
  );

  const [modules, setModules] = useState<Modules>(initialModules);

  const toggleModules = (module: string) => {
    setModules((prevModules) => ({
      ...prevModules,
      [module]: !prevModules[module],
    }));
  };

  return (
    <div>
      <ul className={css.buttonsList}>
        {moduleNames.map((moduleName) => (
          <li key={moduleName}>
            <Button
              text={
                modules[moduleName]
                  ? `Hide ${moduleName}`
                  : `Show ${moduleName}`
              }
              variant={modules[moduleName] ? 'primary' : undefined}
              onClick={() => toggleModules(moduleName)}
            />
          </li>
        ))}
      </ul>

      <ul className={css.modulesList}>
        {moduleNames.map((moduleName) => {
          const Component = moduleComponents[moduleName];
          return (
            <li key={moduleName}>
              {modules[moduleName] && (
                <Component
                  moduleName={moduleName}
                  visibilityHandler={toggleModules}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  // return (
  //   <>
  //     <Button
  //       text={modules.module2 ? 'Hide Module_2' : 'Show Module_2'}
  //       variant={modules.module2 ? 'primary' : undefined}
  //       onClick={() => toggleModules('module2')}
  //     />
  //     <Button
  //       text={modules.module3 ? 'Hide Module_3' : 'Show Module_3'}
  //       variant={modules.module3 ? 'primary' : undefined}
  //       onClick={() => toggleModules('module3')}
  //     />
  //     <Button
  //       text={modules.module4 ? 'Hide Module_4' : 'Show Module_4'}
  //       variant={modules.module4 ? 'primary' : undefined}
  //       onClick={() => toggleModules('module4')}
  //     />
  //     <Button
  //       text={modules.module5 ? 'Hide Module_5' : 'Show Module_5'}
  //       variant={modules.module5 ? 'primary' : undefined}
  //       onClick={() => toggleModules('module5')}
  //     />
  //     {modules.module2 && (
  //       <AppModule2 modules={modules} visibilityHandler={toggleModules} />
  //     )}
  //     {modules.module3 && (
  //       <AppModule3 modules={modules} visibilityHandler={toggleModules} />
  //     )}
  //     {modules.module4 && (
  //       <AppModule4 modules={modules} visibilityHandler={toggleModules} />
  //     )}
  //     {modules.module5 && (
  //       <AppModule5 modules={modules} visibilityHandler={toggleModules} />
  //     )}
  //   </>
  // );
}
