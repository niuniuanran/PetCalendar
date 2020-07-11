export interface IImageInfo {
  urls: {
    regular: string;
  };
  color: string;
  user: {
    name: string;
    username: string;
  };
}

export interface IDialogProps {
  onDialogClose: () => any;
  onDialogOK: (result: any) => any;
  open: boolean | undefined;
}
