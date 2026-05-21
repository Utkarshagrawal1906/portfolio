const certificateModules = import.meta.glob(
  "../assets/certificates/*.{pdf,png,jpg,jpeg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const prettifyFileName = (path) => {
  const fileName = path.split("/").pop() || "Certificate";
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const certificates = Object.entries(certificateModules)
  .map(([path, url]) => {
    const fileName = path.split("/").pop() || "";
    const extension = path.split(".").pop()?.toLowerCase() || "";
    const isPdf = extension === "pdf";

    return {
      fileName,
      title: prettifyFileName(path),
      searchText: `${fileName} ${prettifyFileName(path)}`.toLowerCase(),
      url,
      extension,
      type: isPdf ? "pdf" : "image",
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export default certificates;
