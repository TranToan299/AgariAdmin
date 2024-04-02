import { useState } from 'react';

// @mui
import { Button, Checkbox, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import { useLocales } from 'locales';
// @types
import { Utils } from 'utils/utils';
import Image from 'components/image/Image';
import { IContact } from '../../../../@types/contact';
// components
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

type Props = {
  row: IContact;
  selected?: boolean;
  onEditRow?: VoidFunction;
  onSelectRow?: VoidFunction;
  onDeleteRow?: VoidFunction;
};

export default function ContactTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  const { fullName, phoneNumber, email, note } = row;

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
        <TableCell align="left">{fullName}</TableCell>
        <TableCell align="left">
          <a href={`tel:${phoneNumber}`}> {phoneNumber}</a>
        </TableCell>
        <TableCell align="left">
          <a href={`mailto:${email}`}>{email}</a>
        </TableCell>
        <TableCell align="left">{note && Utils.sliceText(note)}</TableCell>

        {/* <TableCell
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
        </TableCell> */}
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
            // onEditRow();
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
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
