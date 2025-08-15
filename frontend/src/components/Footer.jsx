export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About / Ministry Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">CJRM Ministries</h3>
          <p className="text-sm text-blue-200">
            Sharing worship songs and building a community of praise.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/songs" className="hover:underline">Songs</a>
            </li>
            <li>
              <a href="/setlists" className="hover:underline">Download Songs</a>
            </li>
            <li>
              <a href="/about" className="hover:underline">About / Contact</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-300">Facebook</a>
            <a href="#" className="hover:text-blue-300">Instagram</a>
            <a href="#" className="hover:text-blue-300">YouTube</a>
          </div>
        </div>

      </div>

      <div className="bg-blue-800 text-blue-200 text-sm text-center py-4">
        &copy; {new Date().getFullYear()} CJRM Ministries. All rights reserved.
      </div>
    </footer>
  );
}
