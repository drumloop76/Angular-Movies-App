import { modalTemplateOptions } from "../models/modalOptions";

export function createTemplateOptions(
  title: string,
  message: string,
  confirmBtnText: string,
  dismissBtnText: string
): modalTemplateOptions {
  return {
    title,
    message,
    confirmBtnText,
    dismissBtnText
  };
}