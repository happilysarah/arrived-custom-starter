"use client";

import { useActionState, useEffect } from "react";

import {
  type RegistrationState,
  submitRegistration,
} from "@/app/actions/register";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  HappilyEnv,
  PublicForm,
  RegistrationFormType,
} from "@/lib/happily/types";

type RegistrationFormProps = {
  eventId: string;
  env: HappilyEnv;
  form: PublicForm;
  formType?: RegistrationFormType;
  redirectTo?: string;
  buttonText?: string | null;
  onSuccess?: () => void;
};

const initialState: RegistrationState = {
  ok: false,
};

/**
 * Shared brutalist field skin. Composed onto the shadcn primitives rather than
 * baked into them, so `components/ui/` stays upgrade-safe. tailwind-merge
 * resolves the conflicts (rounded-md → rounded-none, border → border-[3px]).
 */
const FIELD_CLASS =
  "h-12 w-full rounded-none border-[3px] border-(--jaipur-ink) bg-(--jaipur-plaster) px-3 text-base text-(--jaipur-ink) shadow-none placeholder:text-(--jaipur-ink)/45 focus-visible:border-(--jaipur-ink) focus-visible:ring-0 focus-visible:shadow-[4px_4px_0_0_var(--jaipur-ink)]";

// The field skin above is pinned to plaster-and-ink, so the labels are too —
// this form renders on the marigold register band and inside the livestream
// dialog, and shouldn't change colour between them.
const LABEL_CLASS = "brut-label text-(--jaipur-ink)";

function fieldInputType(inputType: string) {
  if (inputType === "email") return "email";
  if (inputType === "phone") return "tel";
  if (inputType === "number") return "number";
  if (inputType === "date") return "date";
  return "text";
}

function fieldName(id: string) {
  if (id === "emailAddress" || id === "email_address") {
    return "email";
  }

  return id;
}

/** Closed / at-capacity notices share one hard-framed panel. */
function FormNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="brut-display brut-frame bg-(--jaipur-plaster) px-6 py-5 text-center text-xl text-(--jaipur-ink)">
      {children}
    </p>
  );
}

export function RegistrationForm({
  eventId,
  env,
  form,
  formType = 2,
  redirectTo,
  buttonText,
  onSuccess,
}: RegistrationFormProps) {
  const action = submitRegistration.bind(null, {
    eventId,
    env,
    formId: form.id,
    formType,
    redirectTo,
  });
  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.ok && onSuccess) {
      onSuccess();
    }
  }, [state.ok, onSuccess]);

  const schema = form.content.formSchema;
  const fields = form.content.fieldOrder
    .map((fieldKey) => schema.properties[fieldKey])
    .filter((field) => field?.enabled);

  if (!form.is_active) {
    return <FormNotice>Registration is closed</FormNotice>;
  }

  if (form.at_capacity) {
    return <FormNotice>Every room is taken</FormNotice>;
  }

  const singleField = fields.length === 1;

  return (
    <form
      action={formAction}
      className={
        singleField
          ? "mx-auto flex w-full max-w-lg flex-col gap-5 text-left"
          : "flex w-full flex-col gap-x-5 gap-y-4 text-left md:grid md:grid-cols-2"
      }
    >
      {fields.map((field) => {
        const name = fieldName(field.id);

        return (
          <div key={field.id} className="grid w-full gap-2">
            <Label htmlFor={field.id} className={LABEL_CLASS}>
              {field.title}
              {field.required ? " *" : ""}
            </Label>

            {field.inputType === "textarea" ? (
              <Textarea
                id={field.id}
                name={name}
                required={field.required}
                placeholder={field.title}
                rows={4}
                className={`${FIELD_CLASS} h-auto min-h-28 py-3`}
              />
            ) : field.inputType === "select" ||
              field.inputType === "radio" ||
              field.inputType === "dropdown" ? (
              <Select name={name} required={field.required}>
                <SelectTrigger id={field.id} className={FIELD_CLASS}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[3px] border-(--jaipur-ink) bg-(--jaipur-plaster) text-(--jaipur-ink)">
                  {field.items?.enum?.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="rounded-none focus:bg-(--jaipur-marigold)"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.inputType === "checkbox" && field.items?.enum?.length ? (
              <div className="grid gap-3 border-[3px] border-(--jaipur-ink) bg-(--jaipur-plaster) p-4">
                {field.items.enum.map((option) => (
                  <div key={option} className="flex items-center gap-3">
                    <Checkbox
                      id={`${field.id}-${option}`}
                      name={name}
                      value={option}
                      className="size-5 rounded-none border-[3px] border-(--jaipur-ink) data-[state=checked]:bg-(--jaipur-pink) data-[state=checked]:text-(--jaipur-plaster)"
                    />
                    <Label
                      htmlFor={`${field.id}-${option}`}
                      className="text-sm font-normal text-(--jaipur-ink)"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <Input
                id={field.id}
                name={name}
                type={fieldInputType(field.inputType)}
                required={field.required}
                placeholder={field.title}
                className={FIELD_CLASS}
              />
            )}
          </div>
        );
      })}

      {state.message ? (
        <p
          role="status"
          aria-live="polite"
          className={`brut-label col-span-2 border-[3px] border-(--jaipur-ink) px-4 py-3 leading-relaxed ${
            state.ok
              ? "bg-(--jaipur-emerald) text-(--jaipur-plaster)"
              : "bg-(--jaipur-pink) text-(--jaipur-plaster)"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="col-span-2 mt-3 flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="brut-display brut-frame brut-lift min-w-64 bg-(--event-primary-bg) px-8 py-4 text-xl text-(--event-primary-text) disabled:cursor-not-allowed disabled:opacity-60 sm:text-2xl"
        >
          {isPending
            ? "Sending…"
            : buttonText || form.form_button_text || "Register"}
        </button>
      </div>
    </form>
  );
}
