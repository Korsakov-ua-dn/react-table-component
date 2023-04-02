import { typedMemo } from 'shared/hocs';

interface IProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode[];
  classN?: string;
}

const Tr: React.FC<IProps> = ({ children, classN, ...restProps }) => {
  return (
    <tr className={classN} {...restProps}>
      {children}
    </tr>
  );
};

export default typedMemo(Tr);
