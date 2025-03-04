import React, { useRef } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);

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

  // Combine drag and drop refs
  drag(drop(ref));

  return (
    <div
      ref={ref}
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