export interface HeaderProps {
  gameOver: boolean;
  resetGrid: () => void;
  validateGrid: () => void;
  areSomeErrors: boolean;
  isSuccess: boolean;
}
