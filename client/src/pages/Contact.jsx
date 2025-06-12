import React, { useState } from 'react';
import { toast } from 'react-hot-toast';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
      toast.success('Message sent successfully!');
      alert('Thank you for contacting us! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
   
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-8 font-volgue">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  12, Samanalawewa Road,<br />
                  Belihuloya, Sri Lanka<br />
                  Postal Code: 12098
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+94 11 234 5678</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@raafathtea.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-full text-secondaryColor bg-primaryColor hover:opacity-65 duration-300 transition-opacity mt-4 text-[18px] font-light h-[55px]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
