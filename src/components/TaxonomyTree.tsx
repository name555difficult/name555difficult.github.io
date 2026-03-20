import { useEffect, useState } from "react";
import { hierarchy, tree } from "d3";
import type { TaxonomyNode } from "@/lib/taxonomy";

type TaxonomyTreeProps = {
  data: TaxonomyNode;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));

const findNodeByPath = (
  node: TaxonomyNode,
  path: string
): TaxonomyNode | undefined => {
  if (node.path === path) return node;

  for (const child of node.children) {
    const result = findNodeByPath(child, path);

    if (result) return result;
  }

  return undefined;
};

export default function TaxonomyTree({ data }: TaxonomyTreeProps) {
  const [selectedPath, setSelectedPath] = useState(
    data.children[0]?.path ?? ""
  );
  const root = tree<TaxonomyNode>().nodeSize([74, 250])(hierarchy(data));
  const nodes = root.descendants();
  const links = root.links();
  const width = Math.max(...nodes.map(node => node.y), 760) + 220;
  const height = Math.max(...nodes.map(node => node.x), 420) + 140;
  const selectedNode = findNodeByPath(data, selectedPath) ?? data;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focus = params.get("focus");

    if (focus) {
      setSelectedPath(decodeURIComponent(focus));
    }
  }, []);

  const updateSelection = (path: string) => {
    setSelectedPath(path);

    const query = path ? `?focus=${encodeURIComponent(path)}` : "";
    window.history.replaceState({}, "", `${window.location.pathname}${query}`);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.95fr)]">
      <section className="overflow-hidden surface-panel-strong p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-label">Hierarchy</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Auto-generated taxonomy tree
            </h2>
          </div>
          <button
            type="button"
            className="reader-action self-start"
            onClick={() => updateSelection("")}
          >
            Reset focus
          </button>
        </div>

        <div className="overflow-x-auto pb-2">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label="Taxonomy tree"
          >
            <g transform="translate(44,44)">
              {links.map(link => (
                <path
                  key={`${link.source.data.path}->${link.target.data.path}`}
                  d={`M${link.source.y},${link.source.x} C${link.source.y + 90},${link.source.x} ${link.target.y - 90},${link.target.x} ${link.target.y},${link.target.x}`}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.16}
                  strokeWidth={1.5}
                />
              ))}

              {nodes.map(node => {
                const isSelected = node.data.path === selectedNode.path;

                return (
                  <g
                    key={node.data.path || "root"}
                    transform={`translate(${node.y},${node.x})`}
                    className="cursor-pointer"
                    onClick={() => updateSelection(node.data.path)}
                  >
                    <circle
                      r={node.depth === 0 ? 14 : 11}
                      fill={
                        isSelected ? "var(--accent)" : "var(--surface-strong)"
                      }
                      stroke="var(--border)"
                      strokeWidth={1.5}
                    />
                    <text
                      x={22}
                      y={-4}
                      fill={isSelected ? "var(--accent)" : "var(--foreground)"}
                      fontSize="15"
                      fontWeight={600}
                    >
                      {node.data.name}
                    </text>
                    <text
                      x={22}
                      y={14}
                      fill="var(--foreground)"
                      opacity="0.56"
                      fontSize="12"
                    >
                      {node.data.count} post{node.data.count > 1 ? "s" : ""}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </section>

      <aside className="surface-panel px-5 py-6 sm:px-6">
        <div className="section-label">Selected Node</div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          {selectedNode.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-foreground/68">
          {selectedNode.path
            ? `${selectedNode.path.split("/").join(" / ")} · ${selectedNode.count} linked posts`
            : `${selectedNode.count} posts are currently mapped in the site-wide taxonomy.`}
        </p>

        <div className="mt-6 space-y-4">
          {selectedNode.posts.map(post => (
            <article
              key={`${selectedNode.path}-${post.slug}`}
              className="rounded-3xl border border-border bg-background/70 p-4"
            >
              <a
                href={post.href}
                className="text-base font-semibold tracking-tight hover:text-accent"
              >
                {post.title}
              </a>
              <div className="mt-2 text-xs tracking-[0.18em] text-foreground/45 uppercase">
                {formatDate(post.date)}
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground/72">
                {post.summary}
              </p>
            </article>
          ))}
        </div>
      </aside>
    </div>
  );
}
