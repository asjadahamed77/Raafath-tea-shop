import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-8 font-volgue">About Raafath Tea</h1>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Raafath Tea was founded with a passion for bringing the finest tea experiences to our customers. 
            Our journey began in the heart of Sri Lanka, where we discovered the perfect blend of tradition 
            and innovation in tea making.
          </p>
          <p className="text-gray-600">
            Today, we continue to source the highest quality tea leaves and create unique blends that 
            delight tea enthusiasts around the world. Our commitment to quality and customer satisfaction 
            has made us a trusted name in the tea industry.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide our customers with the finest quality tea products while promoting sustainable 
              practices and supporting local tea growers. We strive to create memorable tea experiences 
              that bring joy and comfort to our customers' daily lives.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading tea brand known for exceptional quality, innovation, and customer 
              service. We aim to expand our reach while maintaining our commitment to sustainability 
              and traditional tea-making practices.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We are committed to sourcing and providing only the highest quality tea products.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We practice and promote sustainable tea farming and production methods.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to create unique and delightful tea experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Expert Tea Masters</h3>
              <p className="text-gray-600">
                Our team of experienced tea masters brings decades of combined expertise in tea 
                selection, blending, and quality control.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
              <p className="text-gray-600">
                Our dedicated customer service team ensures that every customer receives 
                personalized attention and support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
