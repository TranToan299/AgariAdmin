// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { useRef } from 'react';

// ----------------------------------------------------------------------
type ColorType = '#ccc' | '#fff' | '#000';
type BackgroundColorType = '#ccc' | '#333' | '#000' | '#CED8DD' | '#F6D2CB' | '#fff';
type PlaceholderColorType = '#fff' | '#333' | '#000';
interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  handleChange?: any;
  shrink?: boolean;
  isRequired?: boolean;
  inputColor?: ColorType;
  backgroundColor?: BackgroundColorType;
  placeholderColor?: PlaceholderColorType;
  handleScroll?: any;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  handleChange,
  isRequired,
  inputColor,
  shrink,
  backgroundColor,
  placeholderColor,
  handleScroll,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();
  const colorValue = inputColor ?? 'auto';
  const backgroundColorValue = backgroundColor ?? 'auto';
  const placeholderColorValue = placeholderColor ?? 'auto';
  const debounceSearch = useRef<any>(null);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
          }}
          ListboxProps={{
            onScroll: (event: React.SyntheticEvent) => {
              const listboxNode = event.currentTarget;
              if (
                listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 1 &&
                handleScroll
              ) {
                if (debounceSearch.current) {
                  clearTimeout(debounceSearch.current);
                }
                debounceSearch.current = setTimeout(() => {
                  handleScroll();
                }, 1000);
              }
            },
          }}
          renderInput={(params) => (
            <TextField
              inputRef={ref}
              {...field}
              label={
                <>
                  {label}
                  {isRequired && <span className="required">*</span>}
                </>
              }
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
              InputProps={{
                ...params.InputProps,
                style: { color: colorValue, backgroundColor: backgroundColorValue },
              }}
              InputLabelProps={{
                style: {
                  color: placeholderColorValue,
                },
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
