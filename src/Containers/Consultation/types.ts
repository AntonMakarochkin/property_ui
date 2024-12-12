import { ChangeEvent } from "react";

export type ConsultationFormFields = {
  [key: string]: string | number;
}

export type ChangeFieldProps = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>