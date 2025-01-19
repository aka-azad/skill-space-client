import SectionTitle from "./SectionTitle";

const UpcomingEvents = () => {
  const events = [
    {
      title: "Web Development Workshop",
      date: "January 30, 2025",
      description:
        "Join us for an in-depth workshop on modern web development practices.",
    },
    {
      title: "Teacher Training Session",
      date: "February 15, 2025",
      description:
        "A training session for new teachers to get started on our platform.",
    },
  ];

  return (
    <div className="py-12 bg-accent bg-opacity-65">
      <div className="container max-w-[1280px] mx-auto">
        <SectionTitle  title="Upcoming Events" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-base-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className=" mb-4">{event.date}</p>
              <p className="text-lg">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
