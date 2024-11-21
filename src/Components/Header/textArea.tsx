import { HTMLProps } from "react";

export function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea className="w-full rounded-md p-1 font-thin" {...rest}></textarea>
  );
}
