import { useState } from 'react';

// @mui
import { Button, Checkbox, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
// @types
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Utils } from 'utils/utils';
import { useLocales } from 'locales';
// components
import { ICareer } from '../../../../@types/job';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { BrandModal } from '../../../../@types/brand.model';

// ----------------------------------------------------------------------

type Props = {
  row: BrandModal;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function BrandTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  const { id, objectName, objectCode } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow>
        <TableCell
          style={{
            position: 'sticky',
            left: 0,
            // backgroundColor: 'white',
            zIndex: 800,
          }}
          padding="checkbox"
        >
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">{objectCode && Utils.sliceText(objectCode.toString())}</TableCell>
        <TableCell align="left">{objectName && Utils.sliceText(objectName)}</TableCell>

        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            // backgroundColor: 'white',
            zIndex: 800,
          }}
          align="right"
        >
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          {t('delete')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          {t('edit')}
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={t('delete')}
        content={t('deleteConfirm')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('delete')}
          </Button>
        }
      />
    </>
  );
}
