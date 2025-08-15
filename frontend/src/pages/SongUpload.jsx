import { useState } from "react";

export default function SongUpload() {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const BASE_URL = "http://localhost:5000";
  const categories = [
    "Praise",
    "Worship",
    "Thanksgiving",
    "Repentance",
    "Communion",
    "Christmas",
    "Easter",
    "Gospel",
    "Lent",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setUploadedUrl("");

    if (!songFile) {
      setStatus({ type: "error", message: "Please select an audio file." });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("number", number);
      formData.append("category", category);
      formData.append("song", songFile); // must be "song" to match backend

      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData, // do NOT set Content-Type manually
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Upload failed");
      }

      setUploadedUrl(data?.song?.url || "");
      setStatus({ type: "success", message: "Uploaded successfully!" });

      // optional: reset form
      setTitle("");
      setNumber("");
      setCategory("");
      setSongFile(null);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white/90 border border-blue-200 rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-700">
          🎵 Upload Song
        </h2>
        <p className="text-center text-pink-700 mt-2">
          Upload large audio files directly to Cloudinary via the backend
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Song Title
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="e.g., Amazing Grace"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isUploading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Song Number
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="e.g., 101"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                disabled={isUploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Category
              </label>
              <select
                className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={isUploading}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Audio File
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setSongFile(e.target.files?.[0] || null)}
              className="block w-full text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-gradient-to-r file:from-blue-400 file:to-pink-500 hover:file:opacity-90 cursor-pointer"
              required
              disabled={isUploading}
            />
            {songFile && (
              <p className="mt-2 text-xs text-blue-700">
                Selected: <span className="font-semibold">{songFile.name}</span>{" "}
                ({Math.ceil(songFile.size / (1024 * 1024))} MB)
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold py-3 shadow-md hover:shadow-lg transition disabled:opacity-60"
          >
            {isUploading ? "Uploading…" : "Upload"}
          </button>
        </form>

        {status.message && (
          <div
            className={`mt-4 rounded-lg px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {status.message}
            {status.type === "success" && uploadedUrl && (
              <div className="mt-2">
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline break-all"
                >
                  {uploadedUrl}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
