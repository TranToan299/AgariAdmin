import { useState } from 'react';

// @mui
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  useTheme,
} from '@mui/material';

// @types
// components
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Image from 'components/image/Image';
import { useSettingsContext } from 'components/settings';
import { backgroundColor } from 'constants/app.constants';
import { useLocales } from 'locales';
import { Utils } from 'utils/utils';
import { INewsType } from '../../../../@types/news';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';

// ----------------------------------------------------------------------

type Props = {
  row: INewsType;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function NewsTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();

  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';

  const { id, name, description, content, thumbnail, isPublish } = row;

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

  const styleBox = {
    height: 50,
    verticalAlign: 'top',
  };

  return (
    <>
      <TableRow>
        <TableCell
          style={{
            position: 'sticky',
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          padding="checkbox"
        >
          <Checkbox sx={{ marginBottom: '30px' }} checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">
          <Box sx={styleBox}>{id}</Box>
        </TableCell>
        <TableCell align="left">
          <Box sx={styleBox}>{name && Utils.sliceText(name)}</Box>
        </TableCell>
        <TableCell align="left">
          <Box sx={styleBox}>{description && Utils.sliceText(description)}</Box>
        </TableCell>
        <TableCell align="left">
          <Image src={thumbnail} sx={{ height: '150px', width: '250px' }} />
        </TableCell>
        <TableCell align="left">
          <Box sx={styleBox}>
            {isPublish ? <DoneIcon color="success" /> : <ClearIcon color="error" />}
          </Box>
        </TableCell>
        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,

            zIndex: 800,
          }}
          align="right"
        >
          <Box sx={styleBox}>
            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
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
