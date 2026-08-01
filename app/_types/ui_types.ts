import { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { ReactNode } from "react";
import {
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export interface IText {
  text: string;
  extra?: ReactNode;
  style?: string;
}

export interface IHeader extends IText {
  text: string;
  type: Text_Type;
}

export interface IParagraph extends IHeader {
  type: "para" | "dashText";
}

export type Text_Type =
  | "title"
  | "subhead"
  | "cardhead"
  | "mini"
  | "dashTitle"
  | "dashSub"
  | "dashCard"
  | "dashText"
  | "para";

export interface IButton {
  text: string;
  icon?: ReactNode;
  btnStyle?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface IApp_Modal {
  onClose: () => void;
  children: ReactNode;
  text: string;
}

export interface IImg {
  src: StaticImport | string;
  alt: string;
  style?: string;
  imgContainerStyle?: string;
  extra?: ReactNode;
}

export interface IDoubleText {
  header?: IHeader;
  para?: IParagraph;
  textContentStyle?: string;
}

export interface IFullText {
  text: IDoubleText;
  btn?: IButton;
  containerStyle?: string;
  extra?: ReactNode;
}

export interface IGrouped {
  full_text: IFullText;
  img: IImg;
  groupStyle: string;
}

export interface IAppInput<T extends Record<string, any>> {
  name: Path<T>;
  errors?: FieldErrors<T>;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  className?: string;
  placeholder?: string;
  containerStyle?: string;
  icon1?: ReactNode;
  icon2?: ReactNode;
  showLabel?: boolean;
  basic?: boolean;
  onChange?: () => {};
}
