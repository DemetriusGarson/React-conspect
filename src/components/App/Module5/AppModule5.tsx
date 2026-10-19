// import css from './AppModule5.module.css'

import Button from '../../Button/Button';
import type { ModuleOptions, Modules } from '../../types/Modules';

interface AppModule5Props {
  modules: Modules;
  visibilityHandler: (module: ModuleOptions) => void;
}

export default function AppModule5({
  modules,
  visibilityHandler,
}: AppModule5Props) {
  return (
    <>
      {modules.module5 && (
        <>
          <h1>MODULE_5 Mutations</h1>
          <Button
            text={modules.module5 ? 'Hide Module_5' : 'Show Module_5'}
            variant={modules.module5 ? 'primary' : undefined}
            onClick={() => visibilityHandler('module5')}
          />
        </>
      )}
    </>
  );
}
