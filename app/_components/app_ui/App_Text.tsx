import { cn } from "@/lib/utils";
import { IHeader, Text_Type } from "@/app/_types";
import { JSX } from "react";

const baseStyles: Record<Text_Type, string> = {
  title: "font-bold font-heading text-3xl md:text-5xl xl:text-7xl",
  subhead: "text-2xl font-heading md:text-4xl font-semibold xl:text-5xl",
  mini: "text-base font-heading font-bold",
  cardhead: "text-xl font-heading md:text-2xl",
  para: "text-base md:text-lg lg:text-xl text-gray-600",
  dashTitle: "text-lg md:text-xl lg:text-2xl font-bold",
  dashSub: "text-base md:text-lg font-semibold",
  dashCard: "font-semibold md:text-lg l",
  dashText: "text-sm text-priText",
};

const tagMap: Record<Text_Type, keyof JSX.IntrinsicElements> = {
  title: "h1",
  subhead: "h2",
  mini: "h3",
  cardhead: "h4",
  para: "p",
  dashTitle: "h1",
  dashSub: "h2",
  dashCard: "h4",
  dashText: "p",
};

const App_Text = ({ text, type, extra, style }: IHeader) => {
  const Header = tagMap[type];

  return (
    <Header className={cn(baseStyles[type], style)}>
      {text} {extra}
    </Header>
  );
};

export default App_Text;
