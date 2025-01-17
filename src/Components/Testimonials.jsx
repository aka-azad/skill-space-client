import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Student",
      image: "https://i.ibb.co.com/X738pZj/sample-profile.webp",
      text: "This platform has transformed my learning experience. The classes are engaging and the teachers are fantastic!",
    },
    {
      name: "John Smith",
      role: "Teacher",
      image: "https://i.ibb.co.com/X738pZj/sample-profile.webp",
      text: "Teaching on this platform has been a rewarding experience. I love being able to reach so many students.",
    },
  ];

  return (
    <div className="py-12 bg-base-200">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What People Say About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">{testimonial.name}</h3>
              <p className=" italic">{testimonial.role}</p>
              <FaQuoteLeft className="text-accent text-3xl mx-auto my-4" />
              <p className="text-lg">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
