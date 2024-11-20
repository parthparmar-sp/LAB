function Featurecard() {
  const features = [
    {
      title: 'Login',
      description: 'Access your account and manage your lab-related activities.',
      link: '/auth',
    },
    {
      title: 'Lab Schedule',
      description: 'Stay updated with the current lab schedule and timings.',
      link: '/lab-schedule',
    },
    {
      title: 'File a Complaint',
      description: 'Report any issues or problems directly to the lab assistant.',
      link: '/complain',
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg p-8 text-center border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">{feature.title}</h3>
            <p className="text-gray-600 mb-6">{feature.description}</p>
            <a
              href={feature.link}
              className="inline-block px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Featurecard;
