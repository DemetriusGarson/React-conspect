import Button from '../Button/Button';
import type { BlockProps } from '../types/Blocks';
import css from './BlockBar.module.css';
import { useState, type ComponentType } from 'react';

interface BlockBarProps {
  blocks: Record<string, ComponentType<BlockProps>>;
}

export default function BlockBar({ blocks }: BlockBarProps) {
  const blockNames = Object.keys(blocks);

  const initialBlocksVisibility = Object.fromEntries(
    blockNames.map((blockName) => [blockName, false]),
  );

  const [isBlock, setIsBlock] = useState(initialBlocksVisibility);

  const handleIsBlockChange = (blockName: string) => {
    setIsBlock((prevIsBlock) => ({
      ...prevIsBlock,
      [blockName]: !prevIsBlock[blockName],
    }));
  };

  const handleBlockClose = (blockName: string) => {
    setIsBlock((prevIsBlock) => ({
      ...prevIsBlock,
      [blockName]: false,
    }));
  };

  return (
    <div className={css.blockBarContainer}>
      <ul className={css.buttonsList}>
        {blockNames.map((blockName) => (
          <li key={blockName}>
            <Button
              text={
                isBlock[blockName] ? `Hide ${blockName}` : `Show ${blockName}`
              }
              variant={isBlock[blockName] ? 'primary' : undefined}
              onClick={() => handleIsBlockChange(blockName)}
            ></Button>
          </li>
        ))}
      </ul>
      <ul>
        {blockNames.map((blockName) => {
          const BlockComponent = blocks[blockName];
          return (
            <li key={blockName}>
              <div className={css.blockNameContainer}>
                <h2>{`BLOCK: ${blockName}`}</h2>

                <Button
                  text={
                    isBlock[blockName]
                      ? `Hide ${blockName}`
                      : `Show ${blockName}`
                  }
                  variant={isBlock[blockName] ? 'primary' : undefined}
                  onClick={() => handleIsBlockChange(blockName)}
                ></Button>
              </div>

              {isBlock[blockName] && (
                <div className={css.blockContainer}>
                  <BlockComponent
                    onClose={() => handleBlockClose(blockName)}
                    blockName={blockName}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
