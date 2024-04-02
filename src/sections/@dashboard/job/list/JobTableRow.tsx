import { useState } from 'react';

// @mui
import { Button, Checkbox, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
// @types
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { Utils } from 'utils/utils';

// components
import { useTheme } from '@mui/system';
import { backgroundColor } from 'constants/app.constants';
import { ICareer } from '../../../../@types/job';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';

// ----------------------------------------------------------------------

type Props = {
  row: ICareer;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function JobTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }: Props) {
  const { t } = useLocales();
  const {
    id,
    brand_id,
    province_id,
    name,
    field,
    jobType,
    content,
    description,
    isPublish,
    brandName,
    provinceName,
    isHighlight,
  } = row;
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';

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

            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          padding="checkbox"
        >
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">{brandName}</TableCell>
        <TableCell align="left">{provinceName}</TableCell>
        <TableCell align="left" sx={{ wordWrap: 'break-word' }}>
          {' '}
          {name && Utils.sliceText(name)}
        </TableCell>
        <TableCell align="left" sx={{ wordWrap: 'break-word' }}>
          {' '}
          {field && Utils.sliceText(field)}
        </TableCell>
        <TableCell align="left">{jobType}</TableCell>
        {/* <TableCell align="left">{content}</TableCell> */}
        <TableCell sx={{ wordWrap: 'break-word' }} align="left">
          {description && Utils.sliceText(description)}
        </TableCell>
        <TableCell align="left">
          {isPublish ? <DoneIcon color="success" /> : <ClearIcon color="error" />}
        </TableCell>
        {/* <TableCell align="left">
          {isHighlight ? <DoneIcon color="success" /> : <ClearIcon color="error" />}
        </TableCell> */}

        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
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
