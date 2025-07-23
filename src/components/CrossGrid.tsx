import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import LetterCell from '../components/LetterCell';
import { useAppSelector } from '../stores/hooks';

export default function CrossGrid() {
  const showFilled = useAppSelector(state => state.cross.showFilled);
  const grid = useAppSelector(state => state.cross.currentGrid);
  const gridFilled = useAppSelector(state => state.cross.currentGridFilled);
  return (
    <Table sx={{ width: 'fit-content', margin: 'auto' }}>
      <TableBody>
        {(showFilled ? gridFilled : grid).map((row, rowIdx) => (
          <TableRow key={rowIdx}>
            {row.map((cell, colIdx) => (
              <LetterCell key={`${rowIdx}-${colIdx}`} letter={cell} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
