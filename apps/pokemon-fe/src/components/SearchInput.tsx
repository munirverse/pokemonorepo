import { CloseButton, Input, InputProps } from '@mantine/core';

type SearchInputProps = {
  placeholder: string;
  queryText: string;
  onSetQueryText: (x: any) => any;
  onClearQueryText: () => any;
} & InputProps;

export const SearchInput = ({
  queryText,
  onSetQueryText,
  onClearQueryText,
  placeholder,
  ...props
}: SearchInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      value={queryText}
      onChange={onSetQueryText}
      rightSectionPointerEvents="all"
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={onClearQueryText}
          style={{ display: queryText ? undefined : 'none' }}
        />
      }
      {...props}
    ></Input>
  );
};
