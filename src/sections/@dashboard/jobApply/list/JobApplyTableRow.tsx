import ArticleIcon from '@mui/icons-material/Article';
import moment from 'moment';
import { useState } from 'react';
// @mui
import { Button, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useLocales } from 'locales';
// @types
// components
import { ApplyCareer } from '../../../../@types/applyCareer';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';

// ----------------------------------------------------------------------

type Props = {
  row: ApplyCareer;
  selected?: boolean;
  onEditRow?: VoidFunction;
  onSelectRow?: VoidFunction;
  onDeleteRow?: VoidFunction;
};

export default function JobApplyTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  const {
    fullName,
    phoneNumber,
    dateOfBirth,
    experience,
    career_id,
    id,
    url,
    provinceName,
    careerName,
    districtName,
  } = row;

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

  const handleClick = () => {
    window.open(url);
  };

  return (
    <>
      <TableRow>
        <TableCell align="left">{fullName}</TableCell>
        <TableCell align="left">{provinceName}</TableCell>
        <TableCell align="left">{districtName}</TableCell>

        <TableCell align="left">{phoneNumber}</TableCell>
        <TableCell align="left">{moment(new Date(dateOfBirth)).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="left">{experience}</TableCell>
        <TableCell align="left">{careerName}</TableCell>

        <TableCell align="left">
          <Typography
            variant="overline"
            onClick={() => {
              handleClick();
            }}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {url && <ArticleIcon />}
          </Typography>
        </TableCell>

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
