import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './PlayerCard.module.css';

interface Props {
  playerId: string;
  groupIndex: number;
  playerIndex: number;
  onSwap: (sourceGroupIndex: number, sourcePlayerIndex: number, 
           targetGroupIndex: number, targetPlayerIndex: number) => void;
}

interface DragItem {
  type: string;
  groupIndex: number;
  playerIndex: number;
  playerId: string;
}

export const PlayerCard: React.FC<Props> = ({
  playerId,
  groupIndex,
  playerIndex,
  onSwap,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'PLAYER',
    item: { type: 'PLAYER', groupIndex, playerIndex, playerId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'PLAYER',
    drop: (item: DragItem) => {
      if (item.playerId !== playerId) {
        onSwap(
          item.groupIndex,
          item.playerIndex,
          groupIndex,
          playerIndex
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`${styles.playerCard} ${isDragging ? styles.dragging : ''} ${
        isOver ? styles.dropTarget : ''
      }`}
    >
      <div className={styles.playerInfo}>
        <span className={styles.playerId}>{playerId}</span>
      </div>
    </div>
  );
}; 