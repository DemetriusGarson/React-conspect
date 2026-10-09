import Button from '../../Button/Button';
import type { ModuleOptions, Modules } from '../../types/Modules';

interface AppModule2Props {
  modules: Modules;
  visibilityHandler: (module: ModuleOptions) => void;
}
export default function AppModule2({
  modules,
  visibilityHandler,
}: AppModule2Props) {
  return (
    <>
      {modules.module2 && (
        <>
          <h1>MODULE_2</h1>
          <Button
            text={modules.module2 ? 'Hide Module_2' : 'Show Module_2'}
            variant={modules.module2 ? 'primary' : undefined}
            onClick={() => visibilityHandler('module2')}
          />
        </>
      )}
    </>
  );
}
