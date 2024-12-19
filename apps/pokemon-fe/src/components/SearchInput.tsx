'use client';

import { useState } from 'react';
import { CloseButton, Input, InputProps } from '@mantine/core';

export type SearchInputProps = {
  value: string;
  placeholder?: string;
  size?: InputProps['size'];
  onChange?: (value: string) => void;
  onKeydown?: (value: string) => void;
} & InputProps;

export const SearchInput = ({
  placeholder,
  value,
  size,
  onChange,
  onKeydown,
  ...props
}: SearchInputProps) => {
  // handler
  const onChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  const onClickCloseButton = () => {
    if (onChange) onChange('');
  };

  const onKeydownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onKeydown) {
      onKeydown(value);
    }
  };

  const isHidden = (condtion: boolean) => ({
    display: condtion ? 'none' : undefined,
  });

  return (
    <Input
      size={size || 'xs'}
      placeholder={placeholder}
      value={value}
      onChange={onChangeWrapper}
      onKeyDown={onKeydownWrapper}
      rightSectionPointerEvents="all"
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={onClickCloseButton}
          style={isHidden(value === '')}
        />
      }
      {...props}
    ></Input>
  );
};
