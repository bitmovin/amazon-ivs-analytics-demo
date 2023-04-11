declare type CustomElement<P> = Omit<JSX.Element, "props"> & {
  props: P;
};
