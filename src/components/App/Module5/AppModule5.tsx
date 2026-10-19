// import css from './AppModule5.module.css'

import Button from '../../Button/Button';
import type { ModuleProps } from '../../types/Modules';
import BlockMutation from './BlocksModule5/BlockMutation/BlockMutation';
import BlockBar from '../../BlockBar/BlockBar';

export default function AppModule5({
  moduleName,
  visibilityHandler,
}: ModuleProps) {
  const blockComponents = {
    BlockMutation,
  };

  return (
    <div>
      <h1>MODULE_5 Mutations</h1>
      <BlockBar blocks={blockComponents} />

      <Button
        text={`Hide ${moduleName}`}
        variant="primary"
        onClick={() => visibilityHandler(moduleName)}
      />
    </div>
  );
}
