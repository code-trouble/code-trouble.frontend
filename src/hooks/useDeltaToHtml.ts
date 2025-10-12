import { useMemo, useCallback } from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

interface QuillOp {
  insert: string | Record<string, any>;
  attributes?: Record<string, any>;
}

interface QuillDelta {
  ops: QuillOp[];
}

interface QuillBody {
  ops?: QuillOp[];
  text?: {
    ops?: QuillOp[];
  };
  description?: QuillDelta;
}

interface UseQuillToHtmlOptions {
  inlineStyles?: boolean;
  paragraphTag?: string;
  linkTarget?: string;
}

export const useQuillToHtml = (options: UseQuillToHtmlOptions = {}) => {
  const defaultOptions = useMemo(
    () => ({
      inlineStyles: true,
      ...options,
    }),
    [options],
  );

  const convertDelta = useCallback(
    (ops: QuillOp[] | null | undefined): string => {
      if (!ops || !Array.isArray(ops)) return "";

      try {
        const converter = new QuillDeltaToHtmlConverter(ops, defaultOptions);
        return converter.convert();
      } catch (err) {
        console.error("Erro ao converter Delta:", err);
        return "";
      }
    },
    [defaultOptions],
  );

  const convertBody = useCallback(
    (body: QuillBody | QuillDelta | string | null | undefined): string => {
      if (!body) return "";

      if (typeof body === "string") return body;

      if ((body as QuillDelta).ops && Array.isArray((body as QuillDelta).ops)) {
        return convertDelta((body as QuillDelta).ops);
      }

      const bodyAsQuillBody = body as QuillBody;
      if (bodyAsQuillBody.description?.ops) {
        return convertDelta(bodyAsQuillBody.description.ops);
      }

      const bodyWithText = body as QuillBody;
      if (bodyWithText.text?.ops && Array.isArray(bodyWithText.text.ops)) {
        return bodyWithText.text.ops
          .map((op: QuillOp) =>
            typeof op.insert === "string" ? op.insert : "",
          )
          .join("");
      }

      return "";
    },
    [convertDelta],
  );

  const convertDescription = useCallback(
    (
      body: QuillBody | QuillDelta | string | null | undefined,
      maxChars: number = 200,
    ): string => {
      if (!body) return "";

      if (typeof body === "string") {
        const stripped = body.replace(/<[^>]*>/g, "");
        return stripped.length > maxChars
          ? stripped.substring(0, maxChars) + "..."
          : stripped;
      }

      let ops: QuillOp[] = [];
      const bodyAsDelta = body as QuillDelta;
      const bodyAsQuillBody = body as QuillBody;

      if (bodyAsDelta.ops && Array.isArray(bodyAsDelta.ops)) {
        ops = bodyAsDelta.ops;
      } else if (bodyAsQuillBody.description?.ops) {
        ops = bodyAsQuillBody.description.ops;
      } else if (
        bodyAsQuillBody.text?.ops &&
        Array.isArray(bodyAsQuillBody.text.ops)
      ) {
        ops = bodyAsQuillBody.text.ops;
      }

      const firstTextOp = ops.find((op) => typeof op.insert === "string");

      if (!firstTextOp) return "";

      const text = firstTextOp.insert as string;

      return text.length > maxChars
        ? text.substring(0, maxChars).trim() + "..."
        : text;
    },
    [],
  );

  const extractPlainText = useCallback(
    (body: QuillBody | QuillDelta | string | null | undefined): string => {
      if (!body) return "";

      if (typeof body === "string") {
        return body.replace(/<[^>]*>/g, "");
      }

      let ops: QuillOp[] = [];
      const bodyAsDelta = body as QuillDelta;
      const bodyAsQuillBody = body as QuillBody;

      if (bodyAsDelta.ops && Array.isArray(bodyAsDelta.ops)) {
        ops = bodyAsDelta.ops;
      } else if (bodyAsQuillBody.description?.ops) {
        ops = bodyAsQuillBody.description.ops;
      } else if (
        bodyAsQuillBody.text?.ops &&
        Array.isArray(bodyAsQuillBody.text.ops)
      ) {
        ops = bodyAsQuillBody.text.ops;
      }

      return ops
        .filter((op) => typeof op.insert === "string")
        .map((op) => op.insert as string)
        .join("");
    },
    [],
  );

  return {
    convertBody,
    convertDescription,
    convertDelta,
    extractPlainText,
  };
};
