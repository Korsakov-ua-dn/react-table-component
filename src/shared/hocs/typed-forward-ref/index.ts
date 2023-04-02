import { forwardRef } from 'react';

export const typedForwardRef: <RefValue, Props extends object = object>(
  render: (props: Props, ref: React.Ref<RefValue>) => React.ReactElement | null
) => (
  props: Props & React.RefAttributes<RefValue>
) => React.ReactElement | null = forwardRef as any;
