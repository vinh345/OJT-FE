import React from "react";
import { Card, Rate } from "antd";

const testimonials = [
  {
    name: "Robert Fox",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/50?img=1",
    rating: 5,
    quote:
      "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
  },
  {
    name: "Bessie Cooper",
    role: "Creative Director",
    image: "https://i.pravatar.cc/50?img=2",
    rating: 5,
    quote:
      "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante.",
  },
  {
    name: "Jane Cooper",
    role: "Photographer",
    image: "https://i.pravatar.cc/50?img=3",
    rating: 5,
    quote:
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci.",
  },
];

const Testimonial = () => {
  return (
    <section className="py-12 mb-36">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-16">
          Clients Testimonial
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="rounded-lg shadow-lg overflow-hidden bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-center mb-4">
                  <Rate
                    disabled
                    defaultValue={testimonial.rating}
                    className="text-yellow-500"
                  />
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center mt-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
