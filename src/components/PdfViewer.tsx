import { useEffect, useRef, useState } from "react";
import {
  GlobalWorkerOptions,
  getDocument,
  type PDFDocumentProxy,
} from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

type PdfViewerProps = {
  pdfUrl: string;
  viewerId?: string;
};

GlobalWorkerOptions.workerSrc = workerSrc;

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.5;

export default function PdfViewer({
  pdfUrl,
  viewerId = "pdf-reader-panel",
}: PdfViewerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [status, setStatus] = useState("Loading PDF...");
  const [error, setError] = useState("");
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadDocument() {
      setStatus("Loading PDF...");
      setError("");

      try {
        const loadingTask = getDocument(pdfUrl);
        const documentProxy = await loadingTask.promise;

        if (ignore) {
          await documentProxy.destroy();
          return;
        }

        setPdf(documentProxy);
        setPageCount(documentProxy.numPages);
        setPageInput("1");
        setStatus("Rendering pages...");
      } catch {
        if (!ignore) {
          setError("The PDF viewer could not load this file.");
          setStatus("");
        }
      }
    }

    loadDocument();

    return () => {
      ignore = true;
    };
  }, [pdfUrl]);

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) return;

    const updateWidth = () => {
      setContainerWidth(element.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pdf || !containerWidth) return;

    let cancelled = false;
    const documentProxy = pdf;

    async function renderPages() {
      setStatus("Rendering pages...");

      for (
        let pageNumber = 1;
        pageNumber <= documentProxy.numPages;
        pageNumber += 1
      ) {
        const pageHost = pageRefs.current[pageNumber - 1];

        if (!pageHost) continue;

        pageHost.innerHTML = "";

        const page = await documentProxy.getPage(pageNumber);

        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const targetWidth = Math.max(containerWidth - 24, 280);
        const scale = (targetWidth / baseViewport.width) * zoom;
        const viewport = page.getViewport({ scale });
        const devicePixelRatio = window.devicePixelRatio || 1;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) continue;

        canvas.width = Math.floor(viewport.width * devicePixelRatio);
        canvas.height = Math.floor(viewport.height * devicePixelRatio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

        await page.render({ canvas, canvasContext: context, viewport }).promise;

        if (cancelled) return;

        pageHost.appendChild(canvas);
      }

      if (!cancelled) {
        setStatus("");
      }
    }

    renderPages();

    return () => {
      cancelled = true;
    };
  }, [containerWidth, pdf, zoom]);

  const scrollToPage = (pageNumber: number) => {
    const safePageNumber = Math.min(Math.max(pageNumber, 1), pageCount || 1);
    const target = pageRefs.current[safePageNumber - 1];

    setPageInput(String(safePageNumber));

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleFullscreen = async () => {
    const target = document.getElementById(viewerId);

    if (!target) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await target.requestFullscreen();
  };

  return (
    <div
      id={viewerId}
      ref={wrapperRef}
      className="rounded-[26px] border border-border bg-muted/35 p-3 sm:p-4"
    >
      <div className="sticky top-3 z-10 mb-4 flex flex-wrap items-center gap-3 rounded-3xl border border-border bg-surface px-3 py-3 backdrop-blur-xl">
        <button
          type="button"
          className="reader-action"
          onClick={() => setZoom(current => Math.max(MIN_ZOOM, current - 0.15))}
        >
          Zoom out
        </button>
        <button
          type="button"
          className="reader-action"
          onClick={() => setZoom(1)}
        >
          Fit width
        </button>
        <button
          type="button"
          className="reader-action"
          onClick={() => setZoom(current => Math.min(MAX_ZOOM, current + 0.15))}
        >
          Zoom in
        </button>
        <form
          className="flex items-center gap-2 text-sm"
          onSubmit={event => {
            event.preventDefault();
            scrollToPage(Number(pageInput));
          }}
        >
          <label htmlFor="pdf-page-input" className="text-foreground/65">
            Page
          </label>
          <input
            id="pdf-page-input"
            inputMode="numeric"
            value={pageInput}
            onChange={event =>
              setPageInput(event.target.value.replace(/[^\d]/g, ""))
            }
            className="w-18 rounded-full border border-border bg-background px-3 py-2 text-center"
          />
          <span className="text-foreground/55">/ {pageCount || "--"}</span>
        </form>
        <button
          type="button"
          className="reader-action"
          onClick={toggleFullscreen}
        >
          Fullscreen
        </button>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/6 px-4 py-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {status && (
        <div className="mb-4 rounded-3xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground/65">
          {status}
        </div>
      )}

      <div className="space-y-4">
        {Array.from({ length: pageCount }, (_, index) => (
          <div
            key={`page-${index + 1}`}
            ref={element => {
              pageRefs.current[index] = element;
            }}
            className="overflow-hidden rounded-[24px] border border-border bg-surface-strong p-3 shadow-[0_8px_28px_rgba(15,22,33,0.08)]"
          >
            <div className="mb-3 text-xs tracking-[0.22em] text-foreground/45 uppercase">
              Page {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
