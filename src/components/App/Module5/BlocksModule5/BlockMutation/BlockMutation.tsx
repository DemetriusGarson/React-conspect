import css from './BlockMutation.module.css';

import Button from '../../../../Button/Button';
import type { BlockProps } from '../../../../types/Blocks';

export default function BlockMutation({ onClose, blockName }: BlockProps) {
  return (
    <>
      <h2>Block: Mutation</h2>
      <div className={css.blockContent}></div>
      <Button
        text={`Hide ${blockName}`}
        variant="primary"
        onClick={onClose}
      ></Button>
    </>
  );
}
