// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CalendarPickerView, DatePicker } from '@mui/x-date-pickers';
import { useLocales } from 'locales';
import { useSettingsContext } from 'components/settings';
import { backgroundColor, textColor } from 'constants/app.constants';

type Props = {
  name: string;
  label?: string;
  isRequired?: boolean;
  size?: 'small' | 'medium';
  shrink?: boolean;
  disabled?: boolean;
  handleChange?: any;
  onlyYear?: boolean;
  views? : CalendarPickerView[];
};

const RHFDatePicker = ({
  label,
  name,
  isRequired,
  size,
  handleChange,
  shrink = true,
  disabled = false,
  onlyYear = false,
  views =  ['year', 'month', 'day'],
}: Props) => {
  const { control } = useFormContext();
  const { t } = useLocales();
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          views={onlyYear ? ['year'] : views}
          label={
            <>
              {label}
              {isRequired && <span className="required">*</span>}
            </>
          }
          // inputFormat="dd/MM/yyyy"
          value={field.value}
          onChange={(date) => {
            if (typeof handleChange === 'function') {
              handleChange(date);
              field.onChange(date);
            }
            field.onChange(date);
          }}
        
          renderInput={(rest) => (
            <TextField
              disabled={disabled}
              size={size}
              InputLabelProps={{
                // eslint-disable-next-line object-shorthand
                shrink: shrink,
                sx: {
                  color: isDark ? textColor.white : textColor.black,
                },
              }}
              sx={{
                backgroundColor: () => {
                  return isDark ? theme.palette.mode : backgroundColor.white;
                },
                borderRadius: '10px',
              }}
              {...rest}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          )}
        />
      )}
    />
  );
};

export default RHFDatePicker;
