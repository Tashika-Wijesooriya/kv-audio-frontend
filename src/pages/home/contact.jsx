export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-700 to-indigo-600 py-12">
      <div className="max-w-4xl mx-auto text-center text-white px-6">
        <h1 className="text-5xl font-extrabold mb-6">Get in Touch</h1>
        <p className="text-xl mb-8 text-gray-200">
          We’d love to hear from you! Whether you have a question, feedback, or
          just want to say hi, drop us a message.
        </p>

        {/* Contact Form */}
        <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg">
          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-200">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-200">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-200">
                Your Message
              </label>
              <textarea
                rows="4"
                placeholder="Tell us your thoughts..."
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="mt-16 text-gray-200">
          <h2 className="text-3xl font-semibold mb-6">Contact Info</h2>
          <div className="flex justify-center space-x-8">
            <div className="space-y-4">
              <p className="text-lg font-medium">Email</p>
              <p className="text-xl">contact@musicwebsite.com</p>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-medium">Phone</p>
              <p className="text-xl">+1 234 567 890</p>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-medium">Address</p>
              <p className="text-xl">123 Music St, Los Angeles, CA</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-16 flex justify-center space-x-8 text-white">
          <a
            href="#"
            className="text-3xl hover:text-indigo-400 transition-colors"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="#"
            className="text-3xl hover:text-indigo-400 transition-colors"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-3xl hover:text-indigo-400 transition-colors"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
